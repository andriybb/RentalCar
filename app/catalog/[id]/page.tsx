import Image from 'next/image';
import { getCarById } from '@/services/carsApi';
import css from './page.module.css';
import BookingForm from '@/components/BookingForm/page';

export default async function CarDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const car = await getCarById(resolvedParams.id);

  if (!car) {
    return <div>Car not found</div>;
  }

  return (
    <section className={css.carPersonalContainer}>
      <div className={css.leftColumn}>
        <div className={css.imageCar}>
          <Image
            src={car.img}
            alt={car.description}
            priority
            className={css.mainImage}
            width={640}
            height={512}
          />
        </div>
        <BookingForm carId={car.id} />
      </div>
      <div className={css.rightColumn}>
        <div className={css.infoTitle}>
          <div className={css.labelNew}>
            <h1 className={css.nameCar}>
              {car.brand} {car.model}, {car.year}
            </h1>
            <span className={css.article}>Article: {car.stockNumber} </span>
          </div>
          <div className={css.priceLocation}>
            <div className={css.location}>
              <svg className={css.locationIcon} width="16" height="16">
                <use href="/icons.svg#icon-googlemaps"></use>
              </svg>
              <span>
                {car.location.city}, {car.location.country}
              </span>
            </div>
            <p className={css.price}>${car.rentalPrice}</p>
          </div>
          <p className={css.description}>{car.description}</p>
        </div>
        <ul className={css.infoList}>
          <ul className={css.section}>
            <h3 className={css.InfoListTitle}>Rental Conditions:</h3>
            {car.rentalConditions.map((condition, index) => (
              <li key={index} className={css.ListObject}>
                <svg className={css.locationIcon} width="16" height="16">
                  <use href="/icons.svg#icon-yes"></use>
                </svg>
                {condition}
              </li>
            ))}
          </ul>
          <ul className={css.section}>
            <h3 className={css.InfoListTitle}>Car Specifications:</h3>
            
              <li className={css.ListObject}>
                <svg className={css.locationIcon} width="16" height="16">
                  <use href="/icons.svg#icon-calendar"></use>
                </svg>{' '}
                Year: {car.year}
              </li>
              <li className={css.ListObject}>
                <svg className={css.locationIcon} width="16" height="16">
                  <use href="/icons.svg#icon-car"></use>
                </svg>{' '}
                Type: {car.type}
              </li>
              <li className={css.ListObject}>
                <svg className={css.locationIcon} width="16" height="16">
                  <use href="/icons.svg#icon-gasstation"></use>
                </svg>{' '}
                Fuel Consumption: {car.fuelConsumption}
              </li>
              <li className={css.ListObject}>
                <svg className={css.locationIcon} width="16" height="16">
                  <use href="/icons.svg#icon-mechanics"></use>
                </svg>{' '}
                Engine: {car.engine}
              </li>
              <li className={css.ListObject}>
                <svg className={css.locationIcon} width="16" height="16">
                  <use href="/icons.svg#icon-Property-1ph_road-horizon"></use>
                </svg>{' '}
                Mileage: {car.mileage} km
              </li>
            
          </ul>
          <ul className={css.section}>
            <h3 className={css.InfoListTitle}>Features:</h3>
            {car.features.map((feature, index) => (
              <li key={index} className={css.ListObject}>
                <svg className={css.Icon} width="16" height="16">
                  <use href="/icons.svg#icon-yes"></use>
                </svg>
                {feature}
              </li>
            ))}
          </ul>
        </ul>
      </div>
   
    </section>
  );
}
