"use client";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@shared/components/ui/InputGroup";
import { SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const INPUT_ID = "home-search";
const HEADER_TARGET_ID = "home-search-header-target";

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

const lerp = (start: number, end: number, progress: number) =>
  start + (end - start) * progress;

const easeOutQuint = (value: number) => 1 - (1 - value) ** 5;

export function HomeSearch() {
  const router = useRouter();
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);
  const shellRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const shell = shellRef.current;
    const form = formRef.current;
    const target = document.getElementById(HEADER_TARGET_ID);

    if (!shell || !form || !target) {
      return;
    }

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;

    const update = () => {
      frame = 0;

      const originRect = shell.getBoundingClientRect();
      const targetRect = target.getBoundingClientRect();
      const headerBottom =
        document.querySelector("header")?.getBoundingClientRect().bottom ?? 56;
      const travelStart = headerBottom + 118;
      const travelEnd = headerBottom + 8;
      const rawProgress =
        (travelStart - originRect.top) / (travelStart - travelEnd);
      const progress = clamp(rawProgress, 0, 1);
      const easedProgress = motionQuery.matches
        ? Number(progress >= 1)
        : easeOutQuint(progress);
      const x = lerp(originRect.left, targetRect.left, easedProgress);
      const y = lerp(originRect.top, targetRect.top, easedProgress);
      const scaleX = lerp(
        1,
        targetRect.width / originRect.width,
        easedProgress,
      );
      const scaleY = lerp(
        1,
        targetRect.height / originRect.height,
        easedProgress,
      );

      shell.style.height = `${originRect.height}px`;
      form.style.width = `${originRect.width}px`;
      form.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scaleX}, ${scaleY})`;
      form.style.filter =
        progress >= 0.98
          ? "drop-shadow(0 10px 18px oklch(0 0 0 / 0.18))"
          : "none";
      form.dataset.docked = String(progress >= 0.98);
    };

    const requestUpdate = () => {
      if (frame) {
        return;
      }

      frame = window.requestAnimationFrame(update);
    };

    const activationTimer = window.setTimeout(() => {
      const originRect = form.getBoundingClientRect();

      shell.style.height = `${originRect.height}px`;
      shell.dataset.searchFlightReady = "true";
      form.dataset.searchFlightReady = "true";
      form.style.width = `${originRect.width}px`;
      form.style.position = "fixed";
      form.style.top = "0";
      form.style.left = "0";
      form.style.zIndex = "55";
      form.style.margin = "0";
      form.style.maxWidth = "none";
      form.style.transformOrigin = "top left";
      form.style.transition = motionQuery.matches
        ? "none"
        : "transform 260ms cubic-bezier(0.16, 1, 0.3, 1), filter 180ms ease-out";
      form.style.willChange = "transform";
      update();
    }, 120);

    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    motionQuery.addEventListener("change", requestUpdate);

    return () => {
      if (frame) {
        window.cancelAnimationFrame(frame);
      }

      window.clearTimeout(activationTimer);
      shell.removeAttribute("data-search-flight-ready");
      shell.style.height = "";
      form.removeAttribute("data-search-flight-ready");
      form.removeAttribute("data-docked");
      form.style.position = "";
      form.style.top = "";
      form.style.left = "";
      form.style.zIndex = "";
      form.style.margin = "";
      form.style.maxWidth = "";
      form.style.width = "";
      form.style.transform = "";
      form.style.transformOrigin = "";
      form.style.transition = "";
      form.style.willChange = "";
      form.style.filter = "";
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      motionQuery.removeEventListener("change", requestUpdate);
    };
  }, []);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const query = value.trim();
    if (!query) {
      setError(true);
      document.getElementById(INPUT_ID)?.focus();
      return;
    }
    router.push(`/busca?q=${encodeURIComponent(query)}`);
  };

  return (
    <div ref={shellRef} className="home-search-flight-shell mx-auto max-w-2xl">
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="home-search-flight-form mx-auto w-full max-w-2xl"
      >
        <InputGroup className="h-12 border-primary/25 bg-card/90 shadow-md transition-[border-color,box-shadow,background-color] duration-200 has-[[data-slot=input-group-control]:focus-visible]:border-primary/60 has-[[data-slot=input-group-control]:focus-visible]:shadow-[0_0_0_1px_oklch(0.7686_0.1647_70.0804_/_0.35),0_4px_8px_-1px_hsl(0_0%_0%_/_0.1)] dark:border-primary/30 dark:bg-card/80">
          <InputGroupAddon align="inline-start">
            <SearchIcon className="text-primary" />
          </InputGroupAddon>
          <InputGroupInput
            id={INPUT_ID}
            name="q"
            type="search"
            value={value}
            autoComplete="off"
            aria-label="Buscar filme ou série"
            aria-invalid={error}
            placeholder="Buscar filme ou série..."
            className="text-base"
            onChange={(event) => {
              setValue(event.target.value);
              if (error) {
                setError(false);
              }
            }}
          />
          <InputGroupAddon align="inline-end">
            <InputGroupButton
              type="submit"
              variant="default"
              size="sm"
              className="h-9 px-4"
            >
              Buscar
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
        {error ? (
          <p role="alert" className="mt-2 text-destructive text-sm">
            Digite algo para buscar.
          </p>
        ) : null}
      </form>
    </div>
  );
}
