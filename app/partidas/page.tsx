import React from 'react';
import EmptyState from '../components/EmptyState';
import ClientOnly from '../components/ClientOnly';
import getCurrentUser from '../actions/getCurrentUser';
import getReservations from '../actions/getReservations';
import PartidasClient from './PartidasClient';

const PartidasPage = async () => {
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

    const reservations = await getReservations({
        userId: currentUser.id,
    });

    return (
        <ClientOnly>
            <PartidasClient
                reservations={reservations}
                currentUser={currentUser}
            />
        </ClientOnly>
    );
}

export default PartidasPage;
