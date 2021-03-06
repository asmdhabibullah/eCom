import Link from 'next/link';
import Image from 'next/image';
import { MenuIcon, SearchIcon, ShoppingCartIcon } from '@heroicons/react/outline'
import { signIn, signOut, useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

import { selectItems } from '../slices/basketSlice';

function Header() {
    const [session, loading] = useSession();
    const router = useRouter();
    const items = useSelector(selectItems);

    return (
        <header>
            {/* top nav */}

            <div className="flex items-center bg-amazon_blue p-1 flex-grow py-2">
                <div className="mt-2 flex items-center flex-grow sm:flex-grow-0">
                    <Image
                        onClick={() => router.push('/')}
                        src="https://links.papareact.com/f90"
                        width={150}
                        height={40}
                        objectFit="contain"
                        className="cursor-pointer"
                        alt="Logo"
                    />
                </div>

                {/* search */}

                <div className="hidden sm:flex items-center h-10 rounded-md cursor-pointer flex-grow bg-yellow-400 hover:bg-yellow-500">
                    <input
                        className="p-2 h-full w-6 flex-grow flex-shrink rounded-l-md focus:outline-none"
                        type="text"
                    />
                    <SearchIcon className="h-12 p-4 " />
                </div>

                {/* Right */}
                <div className="text-white flex items-center text-xs space-x-6 mx-6 whitespace-nowrap">

                    {
                        !session ? (
                            <>

                                <div className="link" onClick={!session ? signIn : signOut}>
                                    <p>
                                        {session ? `Hello, ${session.user.name}` : 'Sign in'}
                                    </p>
                                </div>
                                <div className="link" onClick={() => router.push("./registration")}>
                                    <p>Sign up</p>
                                </div>
                            </>
                        ) : (
                            <>
                                {
                                    session && (
                                        <Link
                                            href="/orders/[user]"
                                            as={`/orders/${session.user.image}`}
                                        >
                                            <div className="link">
                                                <p>Returns</p>
                                                <p className="font-extrabold md:text-sm">& Orders</p>
                                            </div>
                                        </Link>
                                    )
                                }
                                <div onClick={() => router.push('/checkout')} className="relative link flex items-center">
                                    <span className="absolute top-0 right-0 md:right-10 h-4 w-4 bg-yellow-400 text-center rounded-full text-black font-bold">
                                        {items.length}
                                    </span>
                                    <ShoppingCartIcon className="h-10" />
                                    <p className="hidden md:inline font-extrabold md:text-sm mt-2">Basket</p>
                                </div>
                                <div className="link" onClick={session ? signOut : signIn}>
                                    <p className="font-extrabold md:text-sm">
                                        Sign out
                                    </p>
                                </div>
                            </>
                        )
                    }
                </div>
            </div>

            {/* Bottom nav */}

            <div className="flex items-center space-x-3 p-2 pl-6 bg-amazon_blue-light text-white text-sm">
                <p className="link flex items-center">
                    <MenuIcon className="h-6 mr-1" />
                    All
                </p>
                <p className="link">Prime video</p>
                <p className="link">Amazon Business</p>
                <p className="link">Today's Deal</p>
                <p className="link hidden lg:inline-flex">Food & Grocery</p>
                <p className="link hidden lg:inline-flex">Electronis</p>
                <p className="link hidden lg:inline-flex">Prime</p>
                <p className="link hidden lg:inline-flex">Buy Again</p>
                <p className="link hidden lg:inline-flex">Shopper Toolkit</p>
                <p className="link hidden lg:inline-flex">Health & Beauty</p>
            </div>
        </header >
    )
}

export default Header
