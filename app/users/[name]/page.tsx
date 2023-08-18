import React from 'react';
import getUsers from "@/app/actions/getUsers";
import ClientOnly from "@/app/components/ClientOnly";
import ListingUser from "@/app/users/ListingUser"
import getCurrentUser from "@/app/actions/getCurrentUser";

interface IParams {
  name?: string;
}

const UserPage = async ({ params }: { params: IParams }) => {
  const user = await getUsers(params);
  const currentUser = await getCurrentUser();
  
  const frases = ["Da próxima vez, chute a bola mais forte!",
                  "A bola caiu no vizinho... Tente de novo!",
                  "Gol perdido. Tente novamente!",
                  "Caiu no drible... Busque de novo!",
                  "Chute novamente!",
                  "Não desista em sua busca... Receba!",
                  "O jogo ainda não acabou. Busque novamente!",
                  "Enquanto não ouvir o apito, siga pesquisando!",
                  "Segue o jogo!",
                  "Lance limpo. Procure novamente!",
                  "Siga na busca e faça o gol!"];
  const fraseAleatoria = frases[Math.floor(Math.random() * frases.length)];

  if (user === null) {
    return (
      <div className="flex items-center justify-center h-screen flex-col">
        <div className="text-xl font-semibold mb-4">
          Nenhum usuário encontrado.
        </div>
        <img src="/images/Bola_centralizada.png" alt="Bola" className="mb-4 w-32" />
        <div className="text-xl font-semibold mb-4">
          {fraseAleatoria}
        </div>
      </div>
    );
  }
    
  return (
    <ClientOnly>
        <ListingUser
            user={user}
            currentUser={currentUser}
        />
      </ClientOnly>
  );
};

export default UserPage;
