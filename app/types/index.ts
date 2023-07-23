import { Eventos, User } from "@prisma/client";

export type SafeListing = Omit<
    Eventos,
    "created_at"
> & {
    created_at: string;
}

export type SafeUser = Omit<
    User,
    "createdAt" | "updatedAt" | "emailVerified"
> & {
    createdAt: string;
    updatedAt: string;
    emailVerified: string | null;
};