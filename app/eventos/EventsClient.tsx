'use client';

import toast from "react-hot-toast";
import axios from "axios";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { SafeListing, SafeUser } from "../types";

import Heading from "../components/Heading";
import Container from "../components/Container";
import ListingCard from "../components/listings/ListingCard";

interface EventsClientProps {
    listings: SafeListing[];
    currentUser?: SafeUser | null;
}

const EventsClient: React.FC<EventsClientProps> = ({
    listings,
    currentUser
}) => {
    const router = useRouter();
    const [deletingId, setDeletingId] = useState('');

    const onCancel = useCallback((id: string) => {
        setDeletingId(id);

        axios.delete(`/api/listings/${id}`)
            .then(() => {
                toast.success("Evento cancelado");
                router.refresh();
            })
            .catch(() => {
                toast.error("Algo deu errado");
            })
            .finally(() => {
                setDeletingId('');
            })
    }, [router]);
    return (
        <Container>
            <Heading
                title="Eventos"
                subtitle="Eventos criados por você"
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
                {listings.map((listing) => (
                    <ListingCard
                        key={listing.id}
                        data={listing}
                        actionId={listing.id}
                        onAction={onCancel}
                        disabled={deletingId === listing.id}
                        actionLabel="Cancelar evento"
                        currentUser={currentUser}
                    />
                ))}
            </div>
        </Container>
    )
}

export default EventsClient;