'use client';

import toast from "react-hot-toast";
import axios from "axios";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { SafeReservations, SafeUser } from "../types";

import Heading from "../components/Heading";
import Container from "../components/Container";
import ListingCard from "../components/listings/ListingCard";

interface ReservationsClientProps {
    reservations: SafeReservations[];
    currentUser?: SafeUser | null;
}

const ReservationsClient: React.FC<ReservationsClientProps> = ({
    reservations,
    currentUser
}) => {
    const router = useRouter();
    const [deletingId, setDeletingId] = useState('');

    const onCancel = useCallback((id: string) => {
        setDeletingId(id);

        axios.delete(`/api/reservations/${id}`)
            .then(() => {
                toast.success("Confirmação cancelada");
                router.refresh();
            })
            .catch(() => {
                toast.error("Algo deu errado");
            })
            .finally(() => {
                setDeletingId('');
            })
    }, [router]);

    const currentDate = new Date();

    const sortedReservations = reservations
        .filter(reservation => (!currentUser || reservation.userId !== currentUser.id) && new Date(reservation.eventos.data) >= currentDate)
        .sort((a, b) => new Date(a.eventos.data).getTime() - new Date(b.eventos.data).getTime());

    return (
        <Container>
            <Heading
                title="Confirmações"
                subtitle="Jogadores interessados em seu evento"
            />
            <div
                className="
          mt-10
          grid
          grid-cols-1
          sm:grid-cols-2
          md:grid-cols-3
          lg:grid-cols-4
          xl:grid-cols-5
          2xl:grid-cols-6
          gap-8
        "
            >
                {sortedReservations.map((reservation) => (
                    <div key={reservation.id}>
                        {currentUser && (
                            <div>
                                Nome do Usuário: {reservation.userName}
                                <ListingCard
                                    key={reservation.id}
                                    data={reservation.eventos}
                                    confirmation={reservation}
                                    actionId={reservation.id}
                                    onAction={onCancel}
                                    disabled={deletingId === reservation.id}
                                    actionLabel="Cancelar participação do usuário"
                                    currentUser={currentUser}
                                />
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </Container>
    )
}

export default ReservationsClient;
