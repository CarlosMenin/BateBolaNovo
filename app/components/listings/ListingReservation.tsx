'use client';

import Button from "../Button";

interface ListingReservationProps {
    preco: number;
    numPessoas: number;
    numConfirmados: number;
    confirmed: string[];
    onSubmit: () => void;
    disabled: boolean;
}

const ListingReservation: React.FC<ListingReservationProps> = ({
    preco,
    numPessoas,
    numConfirmados,
    confirmed,
    onSubmit,
    disabled
}) => {


    return (
        <div
            className="
                bg-white
                rounded-xl
                border-[1px]
                border-neutral-200
                overflow-hidden
            "
        >
            <div className="
                flex flex-row items-center gap-1 p-4    
            ">
                <div className="text-2xl font-semibold">
                    $ {preco}
                </div>
                <div className="font-light text-neutral-600">
                    pessoa
                </div>
            </div>
            <hr />
            <div className="p-4">
                <Button
                    disabled={disabled}
                    label="Confirmar presença"
                    onClick={onSubmit}
                />
            </div>
            <div className="
                p-4
                flex
                flex-row
                items-center
                justify-between
                font-semibold
                text-lg
            ">
                <div>
                    Número de Participantes
                </div>
                <div>
                    {numConfirmados}/{numPessoas}
                </div>
            </div>
            <div className="p-4">
                <div className="font-semibold text-lg">
                    Participantes Confirmados:
                </div>
                <ul className="font-semibold text-lg">
                    {confirmed.map((name, index) => (
                        <li key={index}>{index + 1}. {name}</li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default ListingReservation