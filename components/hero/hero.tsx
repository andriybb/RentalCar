import Link from "next/link";
import css from "./hero.module.css";

export default function Hero() {
  return (
    <section className={css.hero}>
      <h1 className={css.heroTitle}>Find your perfect rental car</h1>
      <p className={css.heroDescription}>Reliable and budget-friendly rentals for any journey</p>
      <Link href="/catalog" className={css.heroButton}>
        View catalog
      </Link>
    </section>
  );
}