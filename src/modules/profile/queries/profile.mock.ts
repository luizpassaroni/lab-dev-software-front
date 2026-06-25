import "server-only";

import type { TProfile } from "@/modules/profile/types/TProfile";

export const PROFILE_MOCK: TProfile = {
  totais: { vistos: 47, avaliados: 23, favoritos: 15 },
  vistos: [
    {
      tmdbId: 872585,
      tmdbType: "MOVIE",
      title: "Oppenheimer",
      year: 2023,
      posterUrl: null,
    },
    {
      tmdbId: 693134,
      tmdbType: "MOVIE",
      title: "Duna: Parte 2",
      year: 2024,
      posterUrl: null,
    },
    {
      tmdbId: 136315,
      tmdbType: "TV",
      title: "The Bear",
      year: 2022,
      posterUrl: null,
    },
    {
      tmdbId: 496243,
      tmdbType: "MOVIE",
      title: "Parasita",
      year: 2019,
      posterUrl: null,
    },
    {
      tmdbId: 79744,
      tmdbType: "TV",
      title: "Succession",
      year: 2018,
      posterUrl: null,
    },
  ],
  avaliados: [
    {
      tmdbId: 872585,
      tmdbType: "MOVIE",
      title: "Oppenheimer",
      year: 2023,
      posterUrl: null,
      score: 9.2,
    },
    {
      tmdbId: 693134,
      tmdbType: "MOVIE",
      title: "Duna: Parte 2",
      year: 2024,
      posterUrl: null,
      score: 8.5,
    },
    {
      tmdbId: 136315,
      tmdbType: "TV",
      title: "The Bear",
      year: 2022,
      posterUrl: null,
      score: 9.8,
    },
    {
      tmdbId: 496243,
      tmdbType: "MOVIE",
      title: "Parasita",
      year: 2019,
      posterUrl: null,
      score: 9.5,
    },
    {
      tmdbId: 79744,
      tmdbType: "TV",
      title: "Succession",
      year: 2018,
      posterUrl: null,
      score: 8.1,
    },
  ],
  favoritos: [
    {
      tmdbId: 872585,
      tmdbType: "MOVIE",
      title: "Oppenheimer",
      year: 2023,
      posterUrl: null,
    },
    {
      tmdbId: 136315,
      tmdbType: "TV",
      title: "The Bear",
      year: 2022,
      posterUrl: null,
    },
    {
      tmdbId: 496243,
      tmdbType: "MOVIE",
      title: "Parasita",
      year: 2019,
      posterUrl: null,
    },
  ],
};
