import { getCars } from '@/services/carsApi';
import css from './page.module.css';
import Header from '@/components/header/header';

export default async function CatalogPage() {

  const cars = await getCars();

  return (
    <>
      <Header />
          <div className={css.carsContainer}>
            {cars.map((car) => (
              <div key={car.id} className={css.card}>
                <h3>{car.model}</h3>
                <p>Year: {car.year}</p>
                <p>Price: {car.rentalPrice}</p>
              </div>
            ))}
          </div>
    </>
  );
}