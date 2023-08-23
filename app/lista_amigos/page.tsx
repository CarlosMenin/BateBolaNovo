

import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";
import getCurrentUser from "../actions/getCurrentUser";
import FriendsListClient from "./FriendsListClient";
import getFriendsList from "../actions/getFriendsList";


const FriendsListPage = async () => {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return (
            <ClientOnly>
                <div className="flex flex-col items-center justify-center h-screen">
                    <EmptyState
                        title="Não autorizado"
                        subtitle="Por favor, faça o login"
                    />
                </div>
            </ClientOnly>
        )
    }

    const friends = await getFriendsList({ userId: currentUser.id });
    //console.log(friends)
    if (!friends || friends.length === 0) {
        return (
            <ClientOnly>
                <div className="flex flex-col items-center justify-center h-screen">
                    <EmptyState
                        title="Nenhum amigo encontrado"
                        subtitle="Parece que você ainda não adicionou nenhum amigo"
                    />
                </div>
            </ClientOnly>
        )
    }
    

    return (
        <ClientOnly>
            <FriendsListClient
                friends={friends}
                currentUser={currentUser}
            />
        </ClientOnly>
    )
};

export default FriendsListPage;
