'use client';

import css from './page.module.css';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Loader } from '../loader/page';
import { Car, CarsFilters, getCars } from '@/services/carsApi';
import Link from 'next/link';
import { useInfiniteQuery } from '@tanstack/react-query'; 
import toast from 'react-hot-toast';
import Filter, { FilterValues } from '../filter/page';

export default function CarCard() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [activeFilters, setActiveFilters] = useState<CarsFilters>({});
  const toggleFavorite = (carId: string) => {
    const isAlreadyFavorite = favorites.includes(carId);
    if (isAlreadyFavorite) {
      toast('Removed from favorites', { icon: '💔' });
      setFavorites(prevFavorites => prevFavorites.filter(id => id !== carId));
    } else {
      toast.success('Added to favorites!', { icon: '❤️' });
      setFavorites(prevFavorites => [...prevFavorites, carId]);
    }
  };

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isError } = useInfiniteQuery({
    queryKey: ['cars', activeFilters],
    queryFn: ({ pageParam }) => getCars(pageParam, activeFilters),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length === 12 ? allPages.length + 1 : undefined;
    },
  });
  const cars = data?.pages.flat() || [];
  const handleApplyFilters = (newFilters: FilterValues) => {
    const formattedFilters: CarsFilters = {};

    if (newFilters.brand) formattedFilters.brand = newFilters.brand;
    if (newFilters.price) formattedFilters.price = Number(newFilters.price);
    if (newFilters.minMileage) formattedFilters.minMileage = Number(newFilters.minMileage);
    if (newFilters.maxMileage) formattedFilters.maxMileage = Number(newFilters.maxMileage);

    setActiveFilters(formattedFilters);
  };

  const handleClearFilters = () => {
    setActiveFilters({});
  };
  useEffect(() => {
    if (isError) {
        toast.error('Failed to load cars');
    }
}, [isError]);


  return (
    <>
      <section className={css.filterContainer}>
        <Filter onSearch={handleApplyFilters} onClear={handleClearFilters} />
      </section>
      <section className={css.carsContainer}>
        <div className={css.cards}>
          {cars.length > 0 ? (
            cars.map((car: Car, index: number) => {
              const isFavorite = favorites.includes(car.id);
              const city = car.location.city;
              const country = car.location.country;
              const formattedMileage = car.mileage.toLocaleString('en-US').replace(/,/g, ' ');
              const delay = (index % 12) * 0.1;
              return (
                <div key={car.id} className={css.card} style={{ animationDelay: `${delay}s` }}>
                  <div className={css.imageWrapper}>
                    <Image
                      src={car.img}
                      alt={car.description}
                      className={css.carImage}
                      priority={true}
                      fill
                      sizes="(max-width: 768px) 100vw, 276px"
                    />
                    <div className={css.favoriteBtn} onClick={() => toggleFavorite(car.id)}>
                      <svg
                        className={`${css.heartIcon} ${isFavorite ? css.active : ''}`}
                        width="16"
                        height="16"
                      >
                        <use href="/icons.svg#icon-heart"></use>
                      </svg>
                    </div>
                  </div>

                  <h3 className={css.titlecar}>
                    <p className={css.brandModel}>
                      {car.brand} <span className={css.model}>{car.model}</span>, {car.year}
                    </p>
                    <span className={css.rentalPrice}>${car.rentalPrice}</span>
                  </h3>

                  <div className={css.description}>
                    <div className={css.carInfoContainer}>
                      <span className={css.infoItem}>{city}</span>
                      <span className={css.infoItem}>{country}</span>
                      <span className={css.infoItem}>{car.rentalCompany}</span>

                      <span className={css.infoItem}>{car.type}</span>
                      <span className={css.infoItem}>{formattedMileage} km</span>
                    </div>
                  </div>

                  <Link
                    href={`/catalog/${car.id}`}
                    className={css.learnMoreBtn}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Read more
                  </Link>
                </div>
              );
            })
          ) : (
            <div className={css.noResults}>
              <p>No cars found matching your criteria.</p>
              <p>We sorry, we working on it.</p>
            </div>
          )}
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
      </section>
    </>
  );
}
