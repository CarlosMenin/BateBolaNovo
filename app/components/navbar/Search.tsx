'use client';

import useSearchModal from '@/app/hooks/useSearchModal';
import { BiSearch } from 'react-icons/bi';

const Search = () => {
    const searchModal = useSearchModal();
    return (
      <div
        onClick={searchModal.onOpen}
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
          <div className="hidden sm:block px-6 border-x-[1px] text-sm font-semibold px-6">
            Qualquer Lugar
          </div>
          <div className="hidden sm:block px-6 border-x-[1px] text-sm font-semibold px-6">
            Qualquer Dia
          </div>
          <div className="hidden sm:block px-6 border-x-[1px] text-sm font-semibold px-6">
            Nº Vagas
          </div>
          <div className="hidden sm:block px-6 text-sm font-semibold px-6">
            Preço
          </div>
          <div className="text-sm pl-6 pr-2 text-gray-600 flex flex-row items-center gap-3">
            <div className="p-2 bg-purple-900 rounded-full text-white">
              <BiSearch size={18} />
            </div>
          </div>
        </div>
      </div>
    );
}

export default Search