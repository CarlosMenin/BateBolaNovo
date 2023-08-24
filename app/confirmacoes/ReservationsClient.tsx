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

    const sortedReservations = reservations
        .sort((a, b) => new Date(a.eventos.data).getTime() - new Date(b.eventos.data).getTime());

    return (
        <Container>
            <Heading
                title="Pagamentos"
                subtitle="Pagamentos realizados"
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
                        <div>
                            <ListingCard
                                key={reservation.id}
                                data={reservation.eventos}
                                confirmation={reservation}
                                actionId={reservation.id}
                                disabled={deletingId === reservation.id}
                                currentUser={currentUser}
                            />
                            <div className="mt-2">
                                <button
                                    className={`text-white font-semibold px-4 py-2 rounded ${reservation.isPaid ? 'bg-green-500' : 'bg-red-500'
                                        }`}
                                >
                                    {reservation.isPaid ? 'Realizado' : 'Reembolsado'}
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </Container>
    )
}

export default ReservationsClient;
