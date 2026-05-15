'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getCarFilters } from '@/services/carsApi';
import css from './page.module.css';

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
  const prices = filterData ? generatePriceOptions(filterData.price.min, filterData.price.max) : [];

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

  return (
    <div className={css.filterContainer}>
      
   
      <div className={css.filterGroup}>
        <label className={css.label}>Car brand</label>
        <div className={css.selectWrapper}>
          <select 
            value={brand} 
            onChange={(e) => setBrand(e.target.value)}
            className={css.selectBrand}
            disabled={isLoading} 
          >
            <option value="" disabled hidden>
              {isLoading ? 'Loading... ' : 'Choose a brand'}
            </option>
            {brands.map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
        </div>
      </div>

      
      <div className={css.filterGroup}>
        <label className={css.label}>Price/ 1 hour</label>
        <div className={css.selectWrapper}>
          <select 
            value={price} 
            onChange={(e) => setPrice(e.target.value)}
            className={css.selectPrice}
            disabled={isLoading}
          >
            <option value="" disabled hidden>
               {isLoading ? 'Loading... ' : 'Choose a price'}
            </option>
            {prices.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </div>
      </div>

      <div className={css.filterGroup}>
        <label className={css.label}>Car mileage / km</label>
        <div className={css.mileageWrapper}>
          <input 
            type="number" 
            placeholder="From" 
            value={minMileage}
            onChange={(e) => setMinMileage(e.target.value)}
            className={css.inputFrom} 
          />
          <input 
            type="number" 
            placeholder="To" 
            value={maxMileage}
            onChange={(e) => setMaxMileage(e.target.value)}
            className={css.inputTo} 
          />
        </div>
      </div>

      <div className={css.buttonsWrapper}>
        <button onClick={handleSearch} className={css.searchBtn}>
          Search
        </button>
        <button onClick={handleClear} className={css.clearBtn}>
          Clear filters
        </button>
      </div>

    </div>
  );
}