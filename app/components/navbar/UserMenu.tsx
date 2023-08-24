'use client';

import { AiOutlineMenu } from 'react-icons/ai'
import Avatar from '../Avatar';
import { useCallback, useState } from 'react';
import MenuItem from './MenuItem';
import useRegisterModal from '@/app/hooks/useRegisterModal';
import useLoginModal from '@/app/hooks/useLoginModal';
import { signOut } from 'next-auth/react';
import { SafeUser } from '@/app/types';
import useRentModal from '@/app/hooks/useRentModal';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import axios from 'axios';

interface UserMenuProps {
    currentUser?: SafeUser | null;
}

const UserMenu: React.FC<UserMenuProps> = ({
    currentUser
}) => {
    const router = useRouter();
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const rentModal = useRentModal();
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = useCallback(() => {
        setIsOpen((value) => !value);

    }, []);

    const onRent = useCallback(async () => {
        if (!currentUser) {
            return loginModal.onOpen();
        }

        if (!currentUser.isArena) {
            axios.post('/api/canrent')
                .then(response => {
                    const listing = response.data;

                    if (listing && Array.isArray(listing)) {
                        const numberOfEvents = listing.length;

                        if (numberOfEvents > 0) {
                            toast.error("Usuário já tem eventos futuros criados");
                        } else {
                            rentModal.onOpen();
                        }
                    } else {
                        console.error("Invalid response format:", listing);
                    }
                })
                .catch(error => {
                    console.error("Error fetching canRent data:", error);
                });

        }
        else {
            rentModal.onOpen();
        }

    }, [currentUser, loginModal, rentModal])
    return (
        <div className="relative">
            <div className="flex flex-row items-center gap-3">
                <div
                    onClick={onRent}
                    className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
                >
                    Criar Evento
                </div>
                <div
                    onClick={toggleOpen}
                    className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
                >
                    <AiOutlineMenu />
                    <div className='hidden md:block'>
                        <Avatar src={currentUser?.image} />
                    </div>
                </div>
            </div>

            {isOpen && (
                <div className='absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm'>
                    <div className='flex flex-col cursor-pointer'>
                        {currentUser ? (
                            <>
                                <MenuItem
                                    onClick={() => router.push('/eventos')}
                                    label="Meus Eventos"
                                />
                                <MenuItem
                                    onClick={() => router.push('/lista_amigos')}
                                    label="Lista de Amigos"
                                />
                                <MenuItem
                                    onClick={() => router.push('/favoritos')}
                                    label="Eventos Favoritados"
                                />
                                <MenuItem
                                    onClick={() => router.push("/confirmacoes")}
                                    label="Pagamentos"
                                />
                                <MenuItem
                                    onClick={() => router.push("/partidas")}

                                    label="Minhas Partidas"
                                />
                                <MenuItem
                                    onClick={() => router.push("/perfil")}

                                    label="Meu Perfil"
                                />
                                <hr />
                                <MenuItem
                                    onClick={() => signOut()}
                                    label="Logout"
                                />
                            </>

                        ) : (
                            <>
                                <MenuItem
                                    onClick={loginModal.onOpen}
                                    label="Login"
                                />
                                <MenuItem
                                    onClick={registerModal.onOpen}
                                    label="Cadastrar-se"
                                />
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

export default UserMenu
