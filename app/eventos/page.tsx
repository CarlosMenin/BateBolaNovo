import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";

import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";
import EventsClient from "./EventsClient";
import getListings from "../actions/getListings";

const EventsPage = async () => {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return (
            <ClientOnly>
                <EmptyState
                    title="Não autorizado"
                    subtitle="Por favor, faça login"
                />
            </ClientOnly>
        )
    }

    const listings = await getListings({
        userId: currentUser.id
    });
    if (listings.length === 0) {
        return (
            <ClientOnly>
                <EmptyState
                    title="Nenhum evento encontrado"
                    subtitle="Parece que você não criou nenhum evento"
                />
            </ClientOnly>
        )
    }

    return (
        <ClientOnly>
            <EventsClient
                listings={listings}
                currentUser={currentUser}
            />
        </ClientOnly>
    )
};

export default EventsPage;