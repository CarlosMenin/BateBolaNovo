"use client";

import Container from "@/app/components/Container";
import ProfileHead from "@/app/components/listings/ProfileHead";
import ProfileInfo from "@/app/components/listings/ProfileInfo";
import { SafeUser } from "@/app/types";
import Button from "../components/Button";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import toast from "react-hot-toast";

interface ListingProfileProps {
  currentUser: SafeUser;
}

const ListingProfile: React.FC<ListingProfileProps> = ({ currentUser }) => {
  const router = useRouter();

  const changeImage = useCallback(() => {
    const userId = currentUser.id;
    if (currentUser) {
      axios.post('/api/trocarimagem', { currentUserId: currentUser.id})
        .then(() => {
          toast.success("Imagem trocada");
          router.refresh();
        })
        .catch((error) => {
          toast.error(error?.response?.data?.error);
        });
    }
  }, [router, currentUser]);

  return (
    <Container>
      <div className="max-2-screen-lg mx-auto">
        <div className="flex flex-col gap-6">
          <ProfileHead
            name={currentUser.name || ''}
            imageSrc={currentUser.image || ''}
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
                <Button
                label="Mudar Foto"
                onClick={changeImage}
            />

          <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
            <ProfileInfo
              currentUser={currentUser}
              isArena={currentUser.isArena || false}
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

            </div>
            </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ListingProfile;