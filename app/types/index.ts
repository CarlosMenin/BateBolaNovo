import { Confirmacoes, Eventos, User } from "@prisma/client";

export type SafeListing = Omit<
    Eventos,
    "created_at"
> & {
    created_at: string;
    numConfirmados: number;
}

export type SafeReservations = Omit<
    Confirmacoes,
    "created_at" | "dataEvento" | "horarioEvento" | "eventos"
> & {
    created_at: string;
    dataEvento: string;
    horarioEvento: string;
    eventos: SafeListing;
}

export type SafeUser = Omit<
    User,
    "createdAt" | "updatedAt" | "emailVerified"
> & {
    createdAt: string;
    updatedAt: string;
    emailVerified: string | null;
};