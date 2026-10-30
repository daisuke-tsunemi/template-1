"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./index.module.scss";

export default function ShowMoreCandidates() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0 && scrollY / docHeight > 0.3) {
        setShow(true);
      } else {
        setShow(false);
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`${styles.scrollTop} ${show ? styles.show : ""}`}
      style={{
        position: "fixed",
        bottom: "10px",
        right: "10px",
        zIndex: 10,
        transition: "opacity 0.5s",
        opacity: show ? 1 : 0,
        pointerEvents: show ? "auto" : "none",
      }}
    >
      <a href="#top" className={`${styles.scrollTop__btn} ${"c-btn__lineBlack bg-white"}`}>
        <Image src='/icon/chevron_up.svg' alt="上向きアイコン" width='56' height='56' loading='lazy' />
      </a>
    </div>
  );
} 