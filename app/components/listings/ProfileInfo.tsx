'use client';

import { SafeUser } from "@/app/types";
import Avatar from "../Avatar";
import dynamic from "next/dynamic";

interface ProfileInfoProps {
    currentUser?: SafeUser;
    isArena: boolean;
    TipoUsuario: string;
}


const ProfileInfo: React.FC<ProfileInfoProps> = ({
    currentUser,
    isArena,
    TipoUsuario
}) => {

    if (isArena) {
        TipoUsuario = "Arena"
    }

    return (
        <div className="col-span-4 flex flex-col gap-8">
            <div className="flex flex-col gap-2">
                <div
                    className="
                text-xl
                font-semibold
                flex
                flex-row
                items-center
                gap-2
                "
                >
                    <div>Usuário: {currentUser?.name}</div>
                </div>
                <div className="flex flex-row items-center gap-4 font-light text-neutral-500">
                    <div>
                        email: {currentUser?.email}
                    </div>
                </div>
            </div>
            <hr />
            <div className="text-lg font-semibold text-neutral-800">
                Usuário {TipoUsuario}
            </div>
            <hr />
            <div className="text-lg font-semibold text-neutral-800">
                Eventos Criados: {currentUser?.numCreated}
            </div>
            <hr />
            <div className="text-lg font-semibold text-neutral-800">
                Avaliação: {currentUser?.rating} {currentUser?.numAvaliacoes && `(${currentUser.numAvaliacoes} avaliações)`}
            </div>
        </div>
    )
}

export default ProfileInfo