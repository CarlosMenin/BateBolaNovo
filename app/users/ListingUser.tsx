"use client";

import Container from "@/app/components/Container";
import UserHead from "@/app/components/listings/UserHead";
import UserInfo from "@/app/components/listings/UserInfo";
import { SafeUser } from "@/app/types";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

interface ListingUserProps {
  user: SafeUser;
  currentUser?: SafeUser | null;
}

const ListingUser: React.FC<ListingUserProps> = ({ user, currentUser }) => {
  const router = useRouter();

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
            ></div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ListingUser;
