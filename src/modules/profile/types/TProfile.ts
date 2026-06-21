export type TProfileItem = {
  tmdbId: number;
  tmdbType: "MOVIE" | "TV";
  title: string;
  year: number | null;
  posterUrl: string | null;
};

export type TRatedItem = TProfileItem & { score: number };

export type TProfile = {
  totais: { vistos: number; avaliados: number; favoritos: number };
  vistos: TProfileItem[];
  avaliados: TRatedItem[];
  favoritos: TProfileItem[];
};
