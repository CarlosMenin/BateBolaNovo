'use client';

import Container from '../Container';
import Categories from './Categories';
import Logo from './Logo';
import Search from './Search';
import CleanFilter from './CleanFilter';
import UserMenu from './UserMenu';
import { SafeUser } from '@/app/types';
import UserSearch from './UserSearch';
import { useRouter } from 'next/navigation';

interface NavbarProps{
    currentUser?: SafeUser | null;
}

const Navbar: React.FC<NavbarProps> = ({
    currentUser
}) => {
    const router = useRouter();
    return (
        <div className='fixed w-full bg-white z-10 shadow-sm'>
            <div className='py-4 border-b-[1px]'>
                <Container>
                    <div className='
                        flex
                        flex-row
                        items-center
                        justify-between
                        gap-3
                        md:gap-0
                    '>
                        <Logo />
                        <Search />
                        <CleanFilter/>
                        <UserSearch />
                        <UserMenu currentUser={currentUser} />
                    </div>
                </Container>
            </div>
            <Categories />
        </div>
    )
}

export default Navbar;