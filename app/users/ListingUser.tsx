"use client";

import Container from "@/app/components/Container";
import UserHead from "@/app/components/listings/UserHead";
import UserInfo from "@/app/components/listings/UserInfo";
import { SafeUser } from "@/app/types";
import axios from "axios";
import { useRouter } from "next/navigation";
import Button from "../components/Button";
import { useCallback } from "react";
import toast from "react-hot-toast";

interface ListingUserProps {
  user: SafeUser;
  currentUser?: SafeUser | null;
}

const ListingUser: React.FC<ListingUserProps> = ({ user, currentUser }) => {
  const router = useRouter();

  const isCurrentUser = currentUser?.id === user.id;

  const addFriend = useCallback(() => {
    const userId = user.id;
    if (currentUser) {
      axios.post('/api/adicionar', { currentUserId: currentUser.id, userId })
        .then(() => {
          toast.success("Amigo adicionado");
          router.refresh();
        })
        .catch((error) => {
          toast.error(error?.response?.data?.error);
        });
    }
  }, [router, currentUser, user]);

  const removeFriend = useCallback(() => {
    const userId = user.id;
    if (currentUser) {
      axios.post('/api/remover', { currentUserId: currentUser.id, userId })
        .then(() => {
          toast.success("Amigo removido");
          router.refresh();
        })
        .catch((error) => {
          toast.error(error?.response?.data?.error);
        });
    }
  }, [router, currentUser, user]);

  const blockUser = useCallback(() => {
    const userId = user.id;
    if (currentUser) {
      axios.post('/api/bloquear', { currentUserId: currentUser.id, userId })
        .then(() => {
          toast.success("Usuário bloqueado");
          router.refresh();
        })
        .catch((error) => {
          toast.error(error?.response?.data?.error);
        });
    }
  }, [router, currentUser, user]);

  const unblockUser = useCallback(() => {
    const userId = user.id;
    if (currentUser) {
      axios.post('/api/desbloquear', { currentUserId: currentUser.id, userId })
        .then(() => {
          toast.success("Usuário desbloqueado");
          router.refresh();
        })
        .catch((error) => {
          toast.error(error?.response?.data?.error);
        });
    }
  }, [router, currentUser, user]);

  const isFriend = currentUser?.friends.includes(user.id);
  const isBlock = currentUser?.blockedUsers.includes(user.id);

  return (
    <Container>
      <div className="max-2-screen-lg mx-auto">
        <div className="flex flex-col gap-6">
          <UserHead
            name={user.name || ''}
            imageSrc={user.image || ''}
          />


          <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
            <UserInfo
              user={user}
              isArena={user.isArena || false}
              TipoUsuario={"Normal"}
            />

            <div
              className="
                  order-first
                  mb-10
                  md:order-last
                  md: col-span-3
              "
            >
              <div className="mt-7">
                {!isCurrentUser && (
                  <>
                    {isFriend ? (
                      <Button
                        label="Remover Amigo"
                        onClick={removeFriend}
                      />
                    ) : (
                      <Button
                        label="Adicionar como Amigo"
                        onClick={addFriend}
                      />
                    )}
                  </>
                )}
              </div>
              <div className="mt-7">
                {!isCurrentUser && (
                  <>
                    {isBlock ? (
                      <Button
                        label="Desbloquear Usuário"
                        onClick={unblockUser}
                      />
                    ) : (
                      <Button
                        label="Bloquear Usuário"
                        onClick={blockUser}
                      />
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ListingUser;