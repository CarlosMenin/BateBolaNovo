'use client';

import useUserSearchModal from '@/app/hooks/useUserSearchModal';
import { BiSearch } from 'react-icons/bi';

const UserSearch = () => {
    const userSearchModal = useUserSearchModal();
    return (
        <div
            onClick={userSearchModal.onOpen}
            className="
                border-[1px]
                w-full
                md:w-auto
                py-2
                rounded-full
                shadow-sm
                hover:shadow-md
                transition
                cursor-pointer
            "
        >
            <div className="flex flex-row items-center justify-between">
                <div className="text-sm font-semibold px-6">
                    Pesquisar Usuário
                </div>
                <div className="text-sm pl-6 pr-2 text-gray-600 flex flex-row items-center gap-3">
                    <div className="p-2 bg-purple-900 rounded-full text-white">
                        <BiSearch size={18} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserSearch