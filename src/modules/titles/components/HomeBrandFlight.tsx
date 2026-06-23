"use client";

import { useEffect, useRef } from "react";

const HERO_TITLE_ID = "plot-twist-hero-title";
const HEADER_TARGET_ID = "plot-twist-header-target";

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

const lerp = (start: number, end: number, progress: number) =>
  start + (end - start) * progress;

const easeOutQuint = (value: number) => 1 - (1 - value) ** 5;

const HomeBrandFlight = () => {
  const brandRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const brand = brandRef.current;
    const heroTitle = document.getElementById(HERO_TITLE_ID);
    const headerTarget = document.getElementById(HEADER_TARGET_ID);

    if (!brand || !heroTitle || !headerTarget) {
      return;
    }

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const previousHeroColor = heroTitle.style.color;
    let frame = 0;

    const update = () => {
      frame = 0;

      const heroRect = heroTitle.getBoundingClientRect();
      const targetRect = headerTarget.getBoundingClientRect();
      const headerBottom =
        document.querySelector("header")?.getBoundingClientRect().bottom ?? 56;
      const heroFontSize = Number.parseFloat(
        window.getComputedStyle(heroTitle).fontSize,
      );
      const targetFontSize = Number.parseFloat(
        window.getComputedStyle(headerTarget).fontSize,
      );
      const travelStart = headerBottom + 74;
      const travelEnd = headerBottom - 18;
      const rawProgress =
        (travelStart - heroRect.bottom) / (travelStart - travelEnd);
      const progress = clamp(rawProgress, 0, 1);
      const easedProgress = motionQuery.matches
        ? Number(progress >= 1)
        : easeOutQuint(progress);
      const targetScale = targetFontSize / heroFontSize;
      const scale = lerp(1, targetScale, easedProgress);
      const x = lerp(heroRect.left, targetRect.left, easedProgress);
      const y = lerp(heroRect.top, targetRect.top, easedProgress);

      brand.style.fontSize = `${heroFontSize}px`;
      brand.style.opacity = "1";
      brand.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale})`;
      brand.dataset.docked = String(progress >= 0.98);
    };

    const requestUpdate = () => {
      if (frame) {
        return;
      }

      frame = window.requestAnimationFrame(update);
    };

    const activate = () => {
      heroTitle.dataset.brandFlightReady = "true";
      heroTitle.style.color = "transparent";
      update();
    };
    const activationTimer = window.setTimeout(
      activate,
      motionQuery.matches ? 0 : 560,
    );

    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    motionQuery.addEventListener("change", requestUpdate);

    return () => {
      if (frame) {
        window.cancelAnimationFrame(frame);
      }

      window.clearTimeout(activationTimer);
      heroTitle.removeAttribute("data-brand-flight-ready");
      heroTitle.style.color = previousHeroColor;
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      motionQuery.removeEventListener("change", requestUpdate);
    };
  }, []);

  return (
    <span
      ref={brandRef}
      aria-hidden="true"
      className="plot-twist-brand-flight font-display font-semibold text-foreground"
    >
      Plot Twist
    </span>
  );
};

HomeBrandFlight.displayName = "HomeBrandFlight";

export { HomeBrandFlight };
