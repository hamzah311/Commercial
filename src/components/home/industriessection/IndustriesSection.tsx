"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./IndustriesSection.module.css";

const INDUSTRIES = [
  {
    title: "Corporate Offices",
    image: "/images/industries/office1.png",
  },
  {
    title: "Hotels & Resorts",
    image: "/images/industries/hotel.png",
  },
  {
    title: "Shopping Malls",
    image: "/images/industries/mall.png",
  },
  {
    title: "Hospitals",
    image: "/images/industries/hospital3.png",
  },
  {
    title: "Warehouses",
    image: "/images/industries/warehouse.png",
  },
  {
    title: "Residential Towers",
    image: "/images/industries/residential.png",
  },
];

export default function IndustriesSection() {
  const gridRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     if (!gridRef.current) return;

  //     const nextIndex = (activeIndex + 1) % INDUSTRIES.length;

  //     const card = gridRef.current.children[nextIndex] as HTMLElement;

  //     const cardWidth = card.offsetWidth + 20;

  //     gridRef.current.scrollTo({
  //       left: nextIndex * cardWidth,
  //       behavior: "smooth",
  //     });

  //     setActiveIndex(nextIndex);
  //   }, 3500);

  //   return () => clearInterval(interval);
  // }, [activeIndex]);


  useEffect(() => {
    const grid = gridRef.current;
  
    if (!grid) return;
  
    // Auto scroll
    const interval = setInterval(() => {
      const nextIndex = (activeIndex + 1) % INDUSTRIES.length;
  
      const card = grid.children[nextIndex] as HTMLElement;
  
      const cardWidth = card.offsetWidth + 20;
  
      grid.scrollTo({
        left: nextIndex * cardWidth,
        behavior: "smooth",
      });
  
      setActiveIndex(nextIndex);
    }, 3500);
  
    // Manual scroll detection
    const handleScroll = () => {
      const cardWidth =
        (grid.children[0] as HTMLElement).offsetWidth + 20;
  
      const index = Math.round(grid.scrollLeft / cardWidth);
  
      setActiveIndex(index);
    };
  
    grid.addEventListener("scroll", handleScroll);
  
    return () => {
      clearInterval(interval);
      grid.removeEventListener("scroll", handleScroll);
    };
  }, [activeIndex]);


  return (
    <section className={styles.wrapper}>
      <div className={styles.headingRow}>
        <h2 className={styles.heading}>Industries We Serve</h2>
      </div>

      <p className={styles.subheading}>
        Commercial lift solutions designed for modern business environments.
      </p>

      <div className={styles.grid} ref={gridRef}>
        {INDUSTRIES.map((item, index) => (
          <div className={styles.card} key={index}>
            <img src={item.image} alt={item.title} className={styles.image} />

            <div className={styles.overlay} />

            <div className={styles.content}>
              <h3>{item.title}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Dots */}
      <div className={styles.dots}>
        {INDUSTRIES.map((_, index) => (
          <span
            key={index}
            className={`${styles.dot} ${
              activeIndex === index ? styles.activeDot : ""
            }`}
          />
        ))}
      </div>
    </section>
  );
}
