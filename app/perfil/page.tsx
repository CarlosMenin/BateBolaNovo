import React from 'react';
import getUsers from "@/app/actions/getUsers";
import ClientOnly from "@/app/components/ClientOnly";
import EmptyState from '@/app/components/EmptyState';
import ListingProfile from "./ListingProfile"
import getCurrentUser from "@/app/actions/getCurrentUser";

const PerfilPage = async () => {
  const currentUser = await getCurrentUser();
  
  if (!currentUser) {
    return (
        <ClientOnly>
            <EmptyState
                title="Não autorizado"
                subtitle="Por favor, faça login"
            />
        </ClientOnly>
    );
}
  return (
    <ClientOnly>
        <ListingProfile
            currentUser={currentUser}
        />
      </ClientOnly>
  );
};

export default PerfilPage;
