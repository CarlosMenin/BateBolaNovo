'use client';

import useCountries from "@/app/hooks/useCountries";
import { SafeUser } from "@/app/types";
import { Confirmacoes, Eventos } from "@prisma/client"
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import {format} from 'date-fns';
import Image from "next/image";
import HeartButton from "../HeartButton";
import Button from "../Button";


interface ListingCardProps{
    data: Eventos;
    confirmation?: Confirmacoes;
    onAction?: (id: string) => void;
    disabled?: boolean;
    actionLabel?: string;
    actionId?: string;
    currentUser?: SafeUser | null;
}

const ListingCard: React.FC<ListingCardProps> = ({
    data,
    confirmation,
    onAction,
    disabled,
    actionId="",
    actionLabel,
    currentUser
}) => {
    const router = useRouter();
    const {getByValue} = useCountries();

    const location = getByValue(data.local);

    const handleCancel = useCallback(
        (e: React.MouseEvent<HTMLButtonElement>) => {
            e.stopPropagation();

            if (disabled){
                return;
            }

            onAction?.(actionId);
        },
    [onAction,actionId,disabled]);
    
    const preco = useMemo(()=>{
        if(confirmation){
            return confirmation.preco;
        }
        
        return data.preco;
    },[confirmation,data.preco]);

    const confirmationDate = useMemo(()=>{
        if(!confirmation){
            return null;
        }

        const eventDate = new Date(confirmation.dataEvento);

        return `${format(eventDate,'PP')}`
    },[confirmation])
  return (
    <div
        onClick={() => router.push(`/listings/${data.id}`)}
        className="
            col-span-1 cursor-pointer group
        "
    >
        <div className="flex flex-col gap-2 w-full">
            <div
                className="
                    aspect-square
                    w-full
                    relative
                    overflow-hidden
                    rounded-xl
                "
            >
                <Image
                    fill
                    alt="Eventos"
                    src={data.imageSrc}
                    className="
                        object-cover
                        h-full
                        w-full
                        group-hover:scale-110
                        transition
                    "
                />
                <div className="absolute top-3 right-3">
                    <HeartButton 
                        listingId={data.id}
                        currentUser={currentUser}
                />
                </div>
            </div>
            <div className="font-semibold text-lg">
                {data.cidade}, {location?.label}
            </div>
            <div className="font-light text-neutral-800">
                {data.category}, {format(data.data, 'dd/MM')}, {format(data.horario, 'HH:mm')}
            </div>
            <div className="flex flex-row items-center gap-1">
                <div className="font-semibold">
                    $ {preco}
                </div>
            </div>
            {onAction && actionLabel && (
                <Button
                    disabled={disabled}
                    small
                    onClick={handleCancel}
                    label={actionLabel}
                />
            )}
        </div>
    </div>
  )
}

export default ListingCard