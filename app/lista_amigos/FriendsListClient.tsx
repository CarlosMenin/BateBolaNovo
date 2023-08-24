

import { SafeUser } from "../types";
import Avatar from '@/app/components/Avatar';

interface FriendsListClientProps {
    friends: any[];
    currentUser: SafeUser;
}

const FriendsListClient: React.FC<FriendsListClientProps> = ({ friends, currentUser }) => {
    return (
        <div className="flex flex-col items-center mx-auto w-1/3 mt-4">
            <h2 className="font-bold text-xl mb-4">Lista de Amigos</h2>
            <ul className="w-full">
                {friends.map(friend => (
                    <li key={friend.id} className="mb-2">
                        <div className="flex items-center p-2 border rounded">
                            <Avatar src={friend?.image} />
                            <div className="flex-grow ml-2 flex items-center justify-between">
                                <span>{friend.name}</span>
                                <div className="border-r border-gray-300 h-5 mx-2"></div>
                                <span>{friend.email}</span>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}


export default FriendsListClient;
