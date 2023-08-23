'use client';

import { SafeUser } from "@/app/types";
import Heading from "../Heading";
import Image from 'next/image'

interface ProfileHeadProps{
    name: string;
    imageSrc: string;
}

const ProfileHead: React.FC<ProfileHeadProps> = ({
    name,
    imageSrc,
}) => {

  return (
    <>
        <Heading
            title={name}
        />
        <div className="w-full h-[30vh] overflow-hidden rounded-xl relative">
            <Image
                className='rounded-full'
                height="250"
                width="250"
                alt="Avatar"
                src={imageSrc || '/images/placeholder.jpg'}
            />
        </div>
    </>
  )
}

export default ProfileHead