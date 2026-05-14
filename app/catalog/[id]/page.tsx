import Image from 'next/image';
import { getCarById } from '@/services/carsApi';
import css from './page.module.css'; 


export default async function CarDetailsPage({ params }: { params: { id: string } }) {

  const car = await getCarById(params.id);


  if (!car) {
    return <div>Car not found</div>;
  }

  return (
    <>
      <div className={css.pageContainer}>
        
        <div className={css.imageWrapper}>
          <Image
            src={car.img}
            alt={car.description || `${car.brand} ${car.model}`}
            fill 
            priority 
            className={css.mainImage}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>


        <div className={css.infoWrapper}>
          <h1>
            {car.brand} <span className={css.modelBlue}>{car.model}</span>, {car.year}
          </h1>
          <p className={css.description}>{car.description}</p>
          
         
        </div>
      </div>
    </>
  );
}