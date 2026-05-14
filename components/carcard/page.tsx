'use client';

import css from './page.module.css';
import Image from 'next/image';
import { useState } from 'react';
import { Loader } from '../loader/page';
import { Car, getCars } from '@/services/carsApi';
import Link from 'next/link';
import { useInfiniteQuery } from '@tanstack/react-query'; // Імпортуємо хук
import toast from 'react-hot-toast';
export default function CarCard() {
    const [favorites, setFavorites] = useState<string[]>([]);

    const toggleFavorite = (carId: string) => {
        const isAlreadyFavorite = favorites.includes(carId);
        if (isAlreadyFavorite) {
            toast('Removed from favorites', { icon: '💔' });
            setFavorites((prevFavorites) => prevFavorites.filter((id) => id !== carId));
        } else {
            toast.success('Added to favorites!', { icon: '❤️' });
            setFavorites((prevFavorites) => [...prevFavorites, carId]);
        }
    };


    const {
        data,
        fetchNextPage,       
        hasNextPage,         
        isFetchingNextPage, 
        isLoading,           
        isError              
    } = useInfiniteQuery({
        queryKey: ['cars'],
        queryFn: ({ pageParam }) => getCars(pageParam),
        initialPageParam: 1, // Початкова сторінка
        getNextPageParam: (lastPage, allPages) => {
            return lastPage.length === 12 ? allPages.length + 1 : undefined;
        },
    });
    const cars = data?.pages.flat() || [];

    if (isLoading) return <Loader />;
    if (isError) {
        toast.error('Failed to load cars');
        return <div>Error loading cars. Please try again.</div>;
    }

    return (
        <div className={css.carsContainer}>
            <div className={css.cards}>
                {cars.map((car: Car) => {
                    const isFavorite = favorites.includes(car.id);
                    const addressParts = car.address.split(',');
                    const city = addressParts[1]?.trim();
                    const country = addressParts[2]?.trim();
                    const formattedMileage = car.mileage.toLocaleString('en-US').replace(/,/g, ' ');

                    return (
                        <div key={car.id} className={css.card}>
                            <div className={css.imageWrapper}>
                                <Image
                                    src={car.img}
                                    alt={car.description}
                                    className={css.carImage}
                                    width={276}
                                    height={268}
                                />
                                <div className={css.favoriteBtn} onClick={() => toggleFavorite(car.id)}>
                                    <svg className={`${css.heartIcon} ${isFavorite ? css.active : ''}`} width="16" height="16">
                                        <use href="/icons.svg#icon-heart"></use>
                                    </svg>
                                </div>
                            </div>
                            
                            <h3 className={css.titlecar}>
                                {car.brand} <span className={css.model}>{car.model}</span>, {car.year}
                                <span className={css.rentalPrice}>${car.rentalPrice}</span>
                            </h3>

                            <div className={css.carInfoContainer}>
                                <span className={css.infoItem}>{city}</span>
                                <span className={css.infoItem}>{country}</span>
                                <span className={css.infoItem}>{car.rentalCompany}</span>
                            </div>

                            <div className={css.carInfoContainer}>
                                <span className={css.infoItem}>{car.type}</span>
                                <span className={css.infoItem}>{formattedMileage} km</span>
                            </div>

                            <Link href={`/catalog/${car.id}`} className={css.learnMoreBtn}>
                                Read more
                            </Link>
                        </div>
                    );
                })}
            </div>
            {hasNextPage && (
                <button
                    className={css.loadMoreBtn}
                    onClick={() => fetchNextPage()}
                    disabled={isFetchingNextPage}
                >
                    {isFetchingNextPage ? <Loader /> : 'Load more'}
                </button>
            )}
        </div>
    );
}