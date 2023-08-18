'use client';

import { SafeUser } from "@/app/types";
import Avatar from "../Avatar";
import dynamic from "next/dynamic";

interface UserInfoProps {
    user: SafeUser;
    isArena: boolean;
    TipoUsuario: string;
}


const UserInfo: React.FC<UserInfoProps> = ({
    user,
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
                    <div>Usuário: {user?.name}</div>
                    <Avatar src={user?.image} />
                </div>
                <div className="flex flex-row items-center gap-4 font-light text-neutral-500">
                    <div>
                        email: {user?.email}
                    </div>
                </div>
            </div>
            <hr />
            <div className="text-lg font-semibold text-neutral-800">
                Usuário {TipoUsuario}
            </div>
            <hr />
            <div className="text-lg font-semibold text-neutral-800">
                Eventos Criados: {user?.numCreated}
            </div>
            <hr />
            <div className="text-lg font-semibold text-neutral-800">
                Avaliação: {user?.rating} {user?.numAvaliacoes && `(${user.numAvaliacoes} avaliações)`}
            </div>
        </div>
    )
}

export default UserInfo