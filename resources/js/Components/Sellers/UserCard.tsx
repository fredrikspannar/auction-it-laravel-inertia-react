import { User } from "@/types";
import { Link } from '@inertiajs/react'

// create types for component, this is only used here
interface UserCardProps {
    user:User;
}

export function UserCard({user}:UserCardProps) {

    // handler for broken images, fallback to empty
    const brokenImageFallback = (e:React.SyntheticEvent<EventTarget>) => {
        // event e needs to be casted as HTMLInputElement or else TS will show this as an error
        let target = e.target as HTMLInputElement;
        target.src = "/images/empty_user.png";
    }

    return (
        <Link href={route('sellerUser', user.username)}>
            <div className="flex flex-col bg-slate-100 m-4 w-48 border-[1px] border-slate-200 rounded-md hover:opacity-60">
                <p><img src={`/storage/${user.profile_image}`} className="w-full" onError={brokenImageFallback} alt={user.username} /></p>
                <div className="py-4 px-2 flex flex-col">
                    <p>{user.username}</p>
                    <p>Auctions: {user.selling_items_count}</p>
                </div>
            </div>
        </Link>
    )
}