import Image from "next/image";
import css from "./header.module.css";
export default function Header() {
  return (
    <header className={css.header}>
      {/* <h1 className={css.logo}>Rental<span className={css['logo-car']}>Car</span></h1> */}
      <Image
      src="/RentalCar.png" 
      alt="RentalCar Logo"
      width={101} 
      height={16}  
        className={css.logo_link}
        priority
    />
      <nav className={css.nav}>
        <a href="./" className={css.navLink}>Home</a>
        <a href="/catalog" className={css.navLink}>Catalog</a>
      </nav>
    </header>
  );
}