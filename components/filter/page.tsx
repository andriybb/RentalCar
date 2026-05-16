'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getCarFilters } from '@/services/carsApi';

import css from './page.module.css'; // Або Filter.module.css (залежить від вашої назви)
import CustomSelect from '../customSelect/page';

export interface FilterValues {
  brand: string;
  price: string;
  minMileage: string;
  maxMileage: string;
}

interface FilterProps {
  onSearch: (filters: FilterValues) => void;
  onClear: () => void;
}

export default function Filter({ onSearch, onClear }: FilterProps) {
  const [brand, setBrand] = useState('');
  const [price, setPrice] = useState('');
  const [minMileage, setMinMileage] = useState('');
  const [maxMileage, setMaxMileage] = useState('');

  const { data: filterData, isLoading } = useQuery({
    queryKey: ['carFilters'],
    queryFn: getCarFilters,
  });

  const generatePriceOptions = (min: number, max: number, step = 10) => {
    const options = [];
    const start = Math.ceil(min / step) * step;
    for (let i = start; i <= max; i += step) {
      options.push(i);
    }
    return options;
  };

  const brands = filterData?.brands || [];
  const prices = filterData ? generatePriceOptions(filterData.rentalPrice.min, filterData.rentalPrice.max) : [];

  const handleSearch = () => {
    onSearch({ brand, price, minMileage, maxMileage });
  };

  const handleClear = () => {
    setBrand('');
    setPrice('');
    setMinMileage('');
    setMaxMileage('');
    onClear();
  };

  const hasActiveFilters = brand !== '' || price !== '' || minMileage !== '' || maxMileage !== '';

  return (
    <section className={css.filterContainer}>
      <div className={css.filterGroup}>
        <label className={css.label}>Car brand</label>
        <CustomSelect
          options={brands}
          value={brand}
          onChange={setBrand}
          placeholder={isLoading ? 'Loading...' : 'Choose a brand'}
          width="204px"
        />
      </div>

      <div className={css.filterGroup}>
        <label className={css.label}>Price/ 1 hour</label>
        <CustomSelect
          options={prices}
          value={price}
          onChange={setPrice}
          placeholder={isLoading ? 'Loading...' : 'Choose a price'}
          prefix="To $"
          width="196px"
        />
      </div>

      <div className={css.filterGroup}>
        <label id="minMileage" className={css.label}>
          Car mileage / km
        </label>
        <div className={css.mileageWrapper}>
          <input
            id="minMileage"
            type="number"
            min="0"
            placeholder="From"
            value={minMileage}
            onChange={e => setMinMileage(e.target.value)}
            className={css.inputFrom}
          />
          <input
            type="number"
            min="0"
            placeholder="To"
            value={maxMileage}
            onChange={e => setMaxMileage(e.target.value)}
            className={css.inputTo}
          />
        </div>
      </div>

      <div className={css.buttonsWrapper}>
        <button onClick={handleSearch} className={css.searchBtn}>
          Search
        </button>
        {hasActiveFilters && (
          <button onClick={handleClear} className={css.clearBtn}>
            Clear filters
          </button>
        )}
      </div>
    </section>
  );
}
