'use client';

import { usePathname, useSearchParams } from "next/navigation";
import CategoryBox from "../CategoryBox";
import Container from "../Container";
import {TbBallBasketball, TbBallBowling, TbBallFootball, TbBallTennis, TbBallVolleyball, TbBeach} from 'react-icons/tb'
import { IoMdFootball } from "react-icons/io";

export const categories = [
    {
        label: 'Beach Tennis',
        icon: TbBallTennis,
        description: "A modalidade deste evento é beach tennis"
    },
    {
        label: 'Basquete',
        icon: TbBallBasketball,
        description: "A modalidade deste evento é basquete"
    },
    {
        label: 'Boliche',
        icon: TbBallBowling,
        description: "A modalidade deste evento é boliche"
    },
    {
        label: 'Futebol',
        icon: TbBallFootball,
        description: "A modalidade deste evento é futebol"
    },
    {
        label: 'Futsal',
        icon: TbBallFootball,
        description: "A modalidade deste evento é futsal"
    },
    {
        label: 'Volei',
        icon: TbBallVolleyball,
        description: "A modalidade deste evento é volei"
    },
    {
        label: 'Society',
        icon: IoMdFootball,
        description: "A modalidade deste evento é society"
    },
]

const Categories = () => {
    const params = useSearchParams();
    const category = params?.get('category');
    const pathname = usePathname();

    const isMainPage = pathname == '/';

    if(!isMainPage){
        return null;
    }

    return(
        <Container>
            <div
                className="
                    pt-4
                    flex
                    flex-row
                    items-center
                    justify-between
                    overflow-x-auto
                "    
            >
                {categories.map((item) => (
                    <CategoryBox 
                        key={item.label}
                        label={item.label}
                        selected={category == item.label}
                        icon={item.icon}
                    />
                ))}
            </div>
        </Container>
    );
}

export default Categories;
