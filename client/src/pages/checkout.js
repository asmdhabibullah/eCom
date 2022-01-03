import { useSession } from 'next-auth/client';
import Image from 'next/image';
import Currency from 'react-currency-formatter';
import { useSelector } from 'react-redux';
import { config } from '../../helper/config';
import CheckOutProduct from '../components/CheckOutProduct';

import Header from "../components/Header"
import { selectItems, selectTotal } from '../slices/basketSlice';

function Checkout() {
    const [session] = useSession();
    const items = useSelector(selectItems);
    const total = useSelector(selectTotal);

    // console.log(session);

    const handleConfirmOrder = async () => {
        const data = { items, total, email: session.user.email };
        // console.log("data", data);

        const res = await fetch(`${config.API}/api/confirm/order`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { "Content-Type": "application/json" }
        });

        if (res) {
            console.log(res);
        }
    }

    return (
        <div className="bg-gray-100">
            <Header />

            <main className="lg:flex max-w-screen-2xl mx-auto">
                {/* left */}
                <div className="flex-grow m-5 shadow-sm">
                    <Image src="https://links.papareact.com/ikj" width={1020} height={250} objectFit="contain" alt="Banner image" />

                    <div className="flex flex-col p-5 space-y-10 bg-white">
                        <h1 className="text-3xl border-b pb-4">
                            {items.length === 0 ? 'Your basket is empty' : 'Shopping basket'}
                        </h1>

                        {items.map((item, i) => (
                            <CheckOutProduct
                                key={i}
                                id={item.id}
                                title={item.title}
                                rating={item.rating}
                                price={item.price}
                                description={item.description}
                                category={item.category}
                                image={item.image}
                                hasPrime={item.hasPrime}
                            />
                        ))}
                    </div>
                </div>
                {/* right */}
                <div className="flex flex-col bg-white p-10 shadow-md">
                    {items.length > 0 && (
                        <>
                            <h2>Subtotal ({items.length} items) :
                                <span className="font-bold ">
                                    <Currency quantity={total} currency="GBP" />
                                </span>
                            </h2>
                            <button
                                disabled={!session}
                                className={`button mt-2 
                                ${!session && 'from-gray-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed'}`}

                                onClick={handleConfirmOrder}
                            >
                                {!session ? 'Sign in to checkout' : 'Proceed to checkout'}
                            </button>
                        </>
                    )}
                </div>
            </main>
        </div>
    )
}

export default Checkout
