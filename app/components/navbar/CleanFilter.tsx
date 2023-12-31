'use client';
import { useRouter } from 'next/navigation';


const CleanFilter = () => {
    const router = useRouter();
    const currentUrl: string = window.location.href;
    console.log(currentUrl);

    return (
        <div
            onClick={() => router.push('/')}
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
                    Página Inicial
                </div>
            </div>
        </div>
    )
}

export default CleanFilter