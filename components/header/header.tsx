import css from "./header.module.css";
export default function Header() {
  return (
    <header className={css.header}>
      <h1 className={css.logo}>Rental<span className={css['logo-car']}>Car</span></h1>
      <nav className={css.nav}>
        <a href="#" className={css.navLink}>Home</a>
        <a href="#" className={css.navLink}>Catalog</a>
      </nav>
    </header>
  );
}