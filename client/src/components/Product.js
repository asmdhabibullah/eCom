import Link from "next/link";
import Image from 'next/image';
import { useState } from 'react';
import { StarIcon } from '@heroicons/react/solid';
import Currency from 'react-currency-formatter';
import { useDispatch } from 'react-redux';
import { addToBasket } from '../slices/basketSlice';

const MAX_RATING = 5;
const MIN_RATING = 1;

function Product({ id, title, price, description, category, image }) {
    const dispatch = useDispatch();

    // console.log(id);

    const [rating] = useState(
        Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1)) + MIN_RATING
    );

    const [hasPrime] = useState(
        Math.random() < 0.5
    );

    const addItemToBasket = () => {
        const product = {
            id, title, price, description, category, image, rating, hasPrime
        };
        // Sending the product as an action to the redux store
        dispatch(addToBasket(product));
    }

    return (
        <div key={id} className="relative flex flex-col m-5 bg-white z-30 p-10">
            <p className="absolute top-2 right-2 text-xs italic text-gray-400">{category}</p>

            <Link
                href={{
                    pathname: "/product/title",
                    query: {
                        id: id,
                        title: title
                    }
                }}
                as={`/product/${title}`}
            >
                <Image src={image} height={200} width={200} objectFit="contain" alt={title} />
            </Link>

            <Link
                href={{
                    pathname: "/product/title",
                    query: {
                        id: id,
                        title: title
                    }
                }}
                as={`/product/${title}`}
            >
                <h4 className="my-3 ">{title}</h4>
            </Link>


            <div className="flex">
                {Array(rating)
                    .fill()
                    .map((_, i) => (
                        <StarIcon key={i} className="h-5 text-yellow-500" />
                    ))}
            </div>
            <p className="text-xs my-2 line-clamp-2">{description}</p>
            <div className="mb-5">
                <Currency quantity={price} currency="GBP" />
            </div>
            {
                hasPrime && (
                    <div className="flex items-center space-x-2 -mt-5">
                        <img className="w-12" src="https://links.papareact.com/fdw" alt={title} />
                        <p className="text-xs text-gray-500">FREE Next-day delivery</p>
                    </div>
                )}
            <button onClick={addItemToBasket} className="mt-auto button">Add to basket</button>
        </div>

    )
}

export default Product