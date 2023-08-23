'use client';

import React, { useState } from 'react';
import Modal from './Modal';
import QRCode from 'qrcode.react';

interface PaymentModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    qrCodeValue: string;
}

const PaymentModal: React.FC<PaymentModalProps> = ({
    isOpen,
    onClose,
    onConfirm,
    qrCodeValue
}) => {
    const [confirming, setConfirming] = useState(false);

    const handleConfirm = () => {
        setConfirming(true);
        setTimeout(() => {
            onConfirm();
            setConfirming(false);
        }, 1000);
    };

    return (
        <Modal
            isOpen={isOpen}
            title="Confirmação de Pagamento"
            onClose={onClose}
            actionLabel={confirming ? "Aguardando Confirmação" : "Confirmar Pagamento"}
            onSubmit={handleConfirm}
            secondaryActionLabel="Cancelar"
            secondaryAction={onClose}
            body={
                <div className="flex flex-col gap-4">
                    <p>Este evento é pago. Deseja confirmar o pagamento?</p>
                    <div className="flex justify-center items-center">
                        <QRCode value={qrCodeValue} size={200} />
                    </div>
                </div>
            }
        />
    );
};

export default PaymentModal;
