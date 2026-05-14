'use client';

import Image from "next/image";
import css from "./header.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation"; // 1. Імпортуємо хук

export default function Header() {
  const pathname = usePathname(); // 2. Отримуємо шлях

  return (
    <header className={css.header}>
      <Image
        src="/RentalCar.png"
        alt="RentalCar Logo"
        width={101}
        height={16}
        className={css.logo_link}
        priority
      />
      <nav className={css.nav}>
        {/* 3. Перевіряємо шлях для кожного посилання прямо в класі */}
        <Link 
          href="/" 
          className={pathname === "/" ? css.activeNavLink : css.navLink}
        >
          Home
        </Link>
        
        <Link 
          href="/catalog" 
          className={pathname === "/catalog" ? css.activeNavLink : css.navLink}
        >
          Catalog
        </Link>
      </nav>
    </header>
  );
}