'use client';

import useCountries from "@/app/hooks/useCountries";
import { SafeUser } from "@/app/types";
import { IconType } from "react-icons";
import Avatar from "../Avatar";
import ListingCategory from "./ListingCategory";
import dynamic from "next/dynamic";
import { format } from "date-fns";

const Map = dynamic(() => import('../Map'), {
    ssr: false
});

interface ListingInfoProps {
    user: SafeUser;
    description: string;
    numPessoas: number;
    category: {
        icon: IconType;
        label: string;
        description: string;
    } | undefined
    locationValue: string;
    endereco: string;
    horario: Date;
    data: Date;
    chavePix: string;
    grupo: string;
}


const ListingInfo: React.FC<ListingInfoProps> = ({
    user,
    description,
    numPessoas,
    category,
    locationValue,
    endereco,
    horario,
    data,
    grupo,
}) => {
    const { getByValue } = useCountries();

    const coordinates = getByValue(locationValue)?.latlng;
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
                    <div>Evento criado por {user?.name}</div>
                    <Avatar src={user?.image} />
                </div>
                <div className="flex flex-row items-center gap-4 font-light text-neutral-500">
                    <div>
                        Número máximo de participantes: {numPessoas} pessoas
                    </div>
                </div>
            </div>
            <hr />
            {category && (
                <ListingCategory
                    icon={category.icon}
                    label={category.label}
                    description={category.description}
                />
            )}
            <hr />
            <div className="text-lg font-semibold text-neutral-800">
                Data: {format(data, "dd/MM")}
            </div>
            <hr />
            <div className="text-lg font-semibold text-neutral-800">
                Horário: {format(horario, "HH:mm")}
            </div>
            <hr />
            <div className="text-lg font-semibold text-neutral-800">
                Endereço: {endereco}
            </div>
            <hr />
            <div className="text-lg font-light text-neutral-800">
                Grupo do evento: {grupo}
            </div>
            <hr />
            <div className="text-lg font-light text-neutral-800">
                {description}
            </div>
            <hr />
            <Map center={coordinates} />
        </div>
    )
}

export default ListingInfo