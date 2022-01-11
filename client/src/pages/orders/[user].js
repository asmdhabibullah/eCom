import Image from "next/image";
import Currency from 'react-currency-formatter';
import { config } from '../../../helper/config';
import Banner from '../../components/Banner'
import Header from '../../components/Header'

export default function Home({ orders }) {

    // console.log(orders);

    return (
        <div className="bg-gray-100">
            <Header />

            <main className="max-w-screen-2xl mx-auto">
                <Banner />
                {

                    orders && orders.map((order, key) => {

                        // console.log(order);
                        const { orderId, totalAmount, products } = order;

                        // console.log(products);

                        return (
                            <div key={key} className="relative flex flex-col m-5 bg-white z-30 p-10">

                                <h2>Order id: {orderId.toUpperCase()}</h2>
                                <h2>Total amount: {totalAmount.toUpperCase()}</h2>
                                {
                                    products.map((product, id) => {
                                        // console.log(product);

                                        const { productId, productTitle, productPrice, productDescription, productCategory, productImage } = product;

                                        return (
                                            <div key={id}>
                                                <p className="absolute top-2 right-2 text-xs italic text-gray-400">{productCategory}</p>
                                                {
                                                    productImage && (
                                                        <Image
                                                            src={productImage} height={400} width={400}
                                                            objectFit="contain" alt={productTitle}
                                                        />
                                                    )
                                                }

                                                <h4 className="my-3 ">{productTitle}</h4>

                                                {/* <div className="flex">
                                                    {Array(rating)
                                                        .fill()
                                                        .map((_, i) => (
                                                            <StarIcon key={i} className="h-5 text-yellow-500" />
                                                        ))}
                                                </div> */}
                                                <p className="text-xs my-2 line-clamp-2">{productDescription}</p>
                                                <div className="mb-5">
                                                    <Currency quantity={productPrice} currency="GBP" />
                                                </div>
                                                {/* {
                                                    hasPrime && (
                                                        <div className="flex items-center space-x-2 -mt-5">
                                                            <img className="w-12" src="https://links.papareact.com/fdw" alt={productTitle} />
                                                            <p className="text-xs text-gray-500">FREE Next-day delivery</p>
                                                        </div>
                                                    )} */}
                                            </div>
                                        )
                                    })
                                }

                            </div>
                        )
                    })
                }

            </main>
        </div>
    )
}


export async function getServerSideProps({ query }) {
    // const [session] = useSession();
    // console.log(query);
    const orders = await fetch(`${config.API}/api/orders/${query.user}`).then(
        (res) => res.json()
    );

    return {
        props: {
            orders: orders.message
        }
    }
}