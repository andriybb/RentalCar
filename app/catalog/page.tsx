import CarCard from '@/components/carcard/page';
import css from './page.module.css';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Catalog',
  description:
    'Browse our extensive catalog of cars. Filter by brand, price, and mileage to find your perfect match.',
};
export default function CatalogPage() {
  const queryClient = new QueryClient();
  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <CarCard />
        <p className={css.footer}>для нижнього відступу на сторінках </p>
      </HydrationBoundary>
    </>
  );
}
