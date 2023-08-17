'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { SafeReservations, SafeUser } from '../types';
import Container from '../components/Container';
import Heading from '../components/Heading';
import { useCallback } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import ListingCard from '../components/listings/ListingCard';

interface PartidasClientProps {
    reservations: SafeReservations[];
    currentUser?: SafeUser | null;
}

const PartidasClient: React.FC<PartidasClientProps> = ({
    reservations,
    currentUser
}) => {
    const router = useRouter();
    const [deletingId, setDeletingId] = useState('');
    const [showPastEvents, setShowPastEvents] = useState(false);

    const currentDate = new Date();

    const onCancel = useCallback((id: string) => {
        setDeletingId(id);

        axios.delete(`/api/reservations/${id}`)
            .then(() => {
                toast.success("Presença cancelada");
                router.refresh();
            })
            .catch((error) => {
                toast.error(error?.response?.data?.error);
            })
            .finally(() => {
                setDeletingId('');
            });
    }, [router]);

    const handleMarkEventNotOccurred = useCallback((reservationId: string) => {
        console.log(typeof reservationId)
        axios.post('/api/nao_ocorreu', { reservationId })
            .then(() => {
                toast.success("Evento marcado como não ocorrido");
                router.refresh();
            })
            .catch((error) => {
                toast.error(error?.response?.data?.error);
            })
    }, [router]);

    const handleMarkEventOccurred = useCallback((reservationId: string) => {
        console.log(typeof reservationId)
        axios.post('/api/ocorreu', { reservationId })
            .then(() => {
                toast.success("Evento marcado como ocorrido");
                router.refresh();
            })
            .catch((error) => {
                toast.error(error?.response?.data?.error);
            })
    }, [router]);

    return (
        <Container>
            <Heading
                title='Partidas'
                subtitle='Partidas que você jogou ou irá jogar'
            />
            <div className='flex justify-center mt-4'>
                <button
                    className='px-4 py-2 bg-purple-800 text-white rounded-md hover:bg-purple-800'
                    onClick={() => setShowPastEvents(!showPastEvents)}
                >
                    {showPastEvents ? 'Mostrar Próximos Eventos' : 'Mostrar Eventos Passados'}
                </button>
            </div>
            <div
                className='
                    mt-10
                    grid
                    grid-cols-1
                    sm:grid-cols-2
                    md:grid-cols-3
                    lg:grid-cols-4
                    xl:grid-cols-5
                    2xl:grid-cols-6
                    gap-8
                '
            >
                {reservations
                    .filter(reservation => (showPastEvents ? new Date(reservation.eventos.data) < currentDate : new Date(reservation.eventos.data) >= currentDate))
                    .map((reservation) => {
                        const reservationId = reservation.id;
                        return (
                            <div key={reservation.id} className="relative">
                                <ListingCard
                                    data={reservation.eventos}
                                    confirmation={reservation}
                                    actionId={reservation.id}
                                    onAction={onCancel}
                                    disabled={deletingId === reservation.id}
                                    currentUser={currentUser}
                                    actionLabel={showPastEvents ? undefined : 'Cancelar presença no evento'}
                                />
                                {showPastEvents && (
                                    <div className="mt-2 ml-4 flex justify-start space-x-4">
                                        <button
                                            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                                            onClick={() => {
                                                handleMarkEventNotOccurred(reservationId);
                                            }}
                                        >

                                            Não Ocorreu
                                        </button>
                                        <button
                                            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                                            onClick={() => {
                                                handleMarkEventOccurred(reservationId);
                                            }}
                                        >
                                            Ocorreu
                                        </button>
                                    </div>
                                )}
                            </div>
                        );
                    })}
            </div>
        </Container>
    );
}

export default PartidasClient;
