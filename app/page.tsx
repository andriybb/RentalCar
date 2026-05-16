import { Metadata } from 'next';
import Hero from '../components/hero/hero';

export const metadata: Metadata = {
  title: 'Home',
  description: 'Welcome to Car Rental. The easiest way to rent a car online.',
};
export default function Home() {
  return (
    <>
      <Hero />
    </>
  );
}
