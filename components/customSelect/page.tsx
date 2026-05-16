'use client';

import { useState, useRef, useEffect } from 'react';
import css from './page.module.css';

interface CustomSelectProps {
  options: (string | number)[];
  value: string | number;
  onChange: (value: string) => void;
  placeholder: string;
  prefix?: string;
  width?: string;
}

export default function CustomSelect({
  options,
  value,
  onChange,
  placeholder,
  prefix = '',
  width,
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  // Додаємо рефи та стани для кастомного скролбару
  const listRef = useRef<HTMLUListElement>(null);
  const [thumbHeight, setThumbHeight] = useState(0);
  const [thumbTop, setThumbTop] = useState(0);

  // Закриття при кліку поза елементом
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Вираховуємо розмір повзунка, коли список відкривається
  useEffect(() => {
    if (isOpen && listRef.current) {
      const { clientHeight, scrollHeight } = listRef.current;
      // Показуємо скролбар тільки якщо контенту більше, ніж висота списку
      if (scrollHeight > clientHeight) {
        // Трек має відступи по 12px зверху і знизу, тому його висота = clientHeight - 24
        const trackHeight = clientHeight - 24;
        const newThumbHeight = (clientHeight / scrollHeight) * trackHeight;
        setThumbHeight(newThumbHeight);
      } else {
        setThumbHeight(0);
      }
    }
  }, [isOpen, options]);

  // Функція, яка рухає повзунок під час скролу
  const handleScroll = () => {
    if (listRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listRef.current;
      const trackHeight = clientHeight - 24;

      // Визначаємо відсоток прокрутки
      const scrollRatio = scrollTop / (scrollHeight - clientHeight);
      // Рахуємо нову позицію для повзунка
      const newThumbTop = scrollRatio * (trackHeight - thumbHeight);

      setThumbTop(newThumbTop);
    }
  };

  const handleSelect = (option: string | number) => {
    onChange(option.toString());
    setIsOpen(false);
  };

  return (
    <div className={css.selectContainer} ref={selectRef} style={{ width: width || 'auto' }}>
      <div
        className={`${css.selectHeader} ${isOpen ? css.open : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={value ? css.selectedText : css.placeholder}>
          {value ? `${prefix}${value}` : placeholder}
        </span>
        {/* */}
        <svg
          className={`${css.arrow} ${isOpen ? css.arrowUp : ''}`}
          viewBox="0 0 59 32"
          width="16"
          height="10"
        >
          <use href="/icons.svg#icon-V"></use>
        </svg>
      </div>

      {isOpen && (
        <div className={css.listWrapper}>
          <ul
            className={css.optionsList}
            ref={listRef}
            onScroll={handleScroll} 
          >
            {options.map((option, index) => {
              const isActive = value.toString() === option.toString();
              return (
                <li
                  key={index}
                  className={`${css.optionItem} ${isActive ? css.activeOption : ''}`}
                  onClick={() => handleSelect(option)}
                >
                  {option}
                </li>
              );
            })}
          </ul>

          {thumbHeight > 0 && (
            <div className={css.customScrollbar}>
              <div
                className={css.customThumb}
                style={{
                  height: `${thumbHeight}px`,
                  transform: `translateY(${thumbTop}px)`,
                }}
              ></div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
