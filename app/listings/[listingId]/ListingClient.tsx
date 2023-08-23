'use client';

import Container from "@/app/components/Container";
import ListingHead from "@/app/components/listings/ListingHead";
import ListingInfo from "@/app/components/listings/ListingInfo";
import ListingReservation from "@/app/components/listings/ListingReservation";
import { categories } from "@/app/components/navbar/Categories";
import useLoginModal from "@/app/hooks/useLoginModal";
import { SafeListing, SafeUser, SafeReservations } from "@/app/types"
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";


interface ListingClientProps {
    reservations?: SafeReservations[],
    listing: SafeListing & {
        user: SafeUser
    };
    currentUser?: SafeUser | null;
}

const ListingClient: React.FC<ListingClientProps> = ({
    listing,
    currentUser,
    reservations = [],
}) => {
    const loginModal = useLoginModal();
    const router = useRouter();

    const [isLoading, setIsLoading] = useState(false);

    const onCreateReservation = useCallback(() => {
        if (!currentUser) {
            return loginModal.onOpen();
        }

        if (listing.numConfirmados === listing.numPessoas) {
            toast.error("Evento lotado! Não é possível realizar mais reservas.");
            return;
        }

        const hasConfirmed = reservations.some(reservation => reservation.userId === currentUser.id);

        if (hasConfirmed) {
            toast.error("Você já confirmou sua presença para este evento.");
            return;
        }
        setIsLoading(true);

        axios
            .post("/api/reservations", {
                price: listing.preco,
                listingid: listing?.id,
                eventDate: listing.data,
                eventTime: listing.horario,
                name: currentUser.name,
                hasPaid: false,
            })
            .then(() => {
                toast.success("Presença confirmada");

                listing.numConfirmados = listing.numConfirmados + 1;

                router.push('/partidas');
            })
            .catch(() => {
                toast.error("Algo deu errado");
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [currentUser, listing, loginModal, reservations, router]);

    const category = useMemo(() => {
        return categories.find((item) => item.label === listing.category);
    }, [listing.category]);

    const userNames = reservations.map(reservation => reservation.userName ?? "Nome Desconhecido");

    return (
        <Container>
            <div className="max-2-screen-lg mx-auto">
                <div className="flex flex-col gap-6">
                    <ListingHead
                        title={listing.title}
                        imageSrc={listing.imageSrc}
                        locationValue={listing.local}
                        id={listing.id}
                        currentUser={currentUser}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
                        <ListingInfo
                            user={listing.user}
                            category={category}
                            description={listing.description}
                            numPessoas={listing.numPessoas}
                            endereco={listing.endereco}
                            locationValue={listing.local}
                            horario={listing.horario}
                            data={listing.data}
                            chavePix={listing.chavePix}
                            grupo={listing.grupo}
                        />
                        <div
                            className="
                  order-first
                  mb-10
                  md:order-last
                  md: col-span-3
              "
                        >
                            <ListingReservation
                                preco={listing.preco}
                                numPessoas={listing.numPessoas}
                                numConfirmados={listing.numConfirmados}
                                chavePix={listing.chavePix}
                                confirmed={userNames}
                                onSubmit={onCreateReservation}
                                disabled={isLoading}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default ListingClient;