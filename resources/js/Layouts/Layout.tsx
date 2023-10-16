
import { Link } from '@inertiajs/react';
import { PageProps } from '@/types';
import { usePage } from '@inertiajs/react'

export default function Layout({ auth, children }: PageProps) {

    const { url } = usePage();

    console.log('Layout auth = ',auth);


    return (
        <>
            <div className="w-full header-bg flex flex-col">
                <div className="header-top flex flex-col lg:w-3/4 lg:mx-auto">
                    <div className="flex justify-between h-2/3">
                        <div className="logo flex items-center w-1/4 ml-2 lg:ml-6"><img src="/images/auctionit.webp" alt="" /></div>
                        <div className="flex items-center justify-center w-3/4">
                            [ SEARCHBOX ]
                        </div>
                    </div>
                    <div className="navbar flex justify-between h-1/3 ml-2 lg:ml-6 mr-2 lg:mr-6 items-center">
                        <ul className="flex flex-row space-x-6">
                            <li><Link href='/' className={url === '/' ? 'active' : ''}>Home</Link></li>
                            <li><Link href={route('categories')} className={url.includes('/categories') ? 'active' : ''}>Categories</Link></li>
                            <li><Link href={route('sellers')} className={url.includes('/sellers') ? 'active' : ''}>Browse Sellers</Link></li>
                            <li><Link href={route('statistics')} className={url.includes('/statistics') ? 'active' : ''}>Statistics</Link></li>
                        </ul>
                        {/* !auth.user && (
                            <ul className="user not-logged-in flex flex-row space-x-6">
                                <li><Link href={route('login')}>Login</Link></li>
                                <li><Link href={route('register')}>Register</Link></li>
                            </ul>                    
                        )*/}
                    </div>
                </div>
            </div>
            <div className="mainContent">
                {children}
            </div>
        </>
    )

}