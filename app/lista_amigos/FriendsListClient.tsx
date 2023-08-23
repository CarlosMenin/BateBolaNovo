

import { SafeUser } from "../types";
import Avatar from '@/app/components/Avatar';

interface FriendsListClientProps {
    friends: any[];
    currentUser: SafeUser;
}

const FriendsListClient: React.FC<FriendsListClientProps> = ({ friends, currentUser }) => {
    return (
        <div className="mx-4"> {/* Adiciona margem em ambos os lados (esquerda e direita) */}
            <h2 className="font-bold text-xl">Lista de Amigos</h2>
            <ul>
                {friends.map(friend => (
                    <li key={friend.id} className="mb-2">
                        <div className="flex items-center p-2 border rounded">
                            <Avatar src={friend?.image} />
                            <span className="ml-2">{friend.name}</span>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}


export default FriendsListClient;
