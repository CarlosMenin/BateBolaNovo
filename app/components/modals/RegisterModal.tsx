'use client';

import axios from 'axios';
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { useCallback, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import useRegisterModal from '@/app/hooks/useRegisterModal';
import Modal from './Modal';
import Heading from '../Heading';
import Input from '../inputs/Input';
import { toast } from 'react-hot-toast'
import Button from '../Button';
import { signIn } from 'next-auth/react';
import useLoginModal from '@/app/hooks/useLoginModal';


const RegisterModal = () => {
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const [isLoading, setIsLoading] = useState(false);
    const [isNormalUser, setIsNormalUser] = useState(true);
    const [isArenaUser, setIsArenaUser] = useState(false);


    const {
        register,
        handleSubmit,
        formState: {
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: '',
            isArena: false
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        data.isArena = isArenaUser;

        axios.post('/api/register', data)
            .then(() => {
                registerModal.onClose();
            })
            .catch((error) => {
                toast.error('Algo deu errado');
            })
            .finally(() => {
                setIsLoading(false);
            })
    };

    const toggle = useCallback(() => {
        registerModal.onClose();
        loginModal.onOpen();
    }, [loginModal, registerModal]);

    const bodyContent = (
        <div className='flex flex-col gap-4'>
            <Heading
                title="Bem vindo ao BateBola"
                subtitle='Criar uma conta'
            />
            <Input
                id="email"
                label="Email"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <Input
                id="name"
                label="Nome Completo"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <Input
                id="password"
                type="password"
                label="Senha"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <div className="flex flex-col gap-2">
                <label className="text-neutral-800">Tipo de Usuário:</label>
                <label className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        checked={isNormalUser}
                        onChange={() => {
                            setIsNormalUser(true);
                            setIsArenaUser(false);
                        }}
                    />
                    Usuário Normal
                </label>
                <label className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        checked={isArenaUser}
                        onChange={() => {
                            setIsNormalUser(false);
                            setIsArenaUser(true);
                        }}
                    />
                    Usuário Arena
                </label>
            </div>
        </div>
    )

    const footerContent = (
        <div className='flex flex-col gap-4 mt-3'>
            <hr />
            <Button
                outline
                label="Continuar com Google"
                icon={FcGoogle}
                onClick={() => signIn('google')}
            />
            <Button
                outline
                label="Continuar com GitHub"
                icon={AiFillGithub}
                onClick={() => signIn('github')}
            />
            <div className='text-neutral-500 text-center mt-4 font-light'>
                <div className='justify-center text-center flex flex-row items-center gap-2'>
                    Já possui cadastro?
                </div>
                <div
                    onClick={toggle}
                    className='text-neutral-800 cursor-pointer hover:underline'>
                    Logar
                </div>
            </div>
        </div>
    )

    return (
        <Modal
            disabled={isLoading}
            isOpen={registerModal.isOpen}
            title="Registrar"
            actionLabel="Continuar"
            onClose={registerModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            footer={footerContent}
        />
    )
}

export default RegisterModal