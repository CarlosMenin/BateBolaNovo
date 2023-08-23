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

  return (
    <Container>
      <div className="max-2-screen-lg mx-auto">
        <div className="flex flex-col gap-6">
          <ProfileHead
            name={currentUser.name || ''}
            imageSrc={currentUser.image || ''}
          />

          <div className="grid grid-cols-1 md:grid-cols-7 md:gap-40 mt-6">
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
    </Container>
  );
};

export default ListingProfile;