/** Provider de streaming (BR), normalizado pelo backend para a UI. */
export type TProvider = {
  name: string;
  logoUrl: string | null;
};

/** Elenco resumido exibido na ficha. */
export type TCastMember = {
  name: string;
  character: string;
  profileUrl: string | null;
};

/**
 * Payload da ficha do título (`GET /api/titles/:type/:id`). Consumido pela
 * tela de Ficha (FRONT-11) e pelo componente "Onde assistir" (FRONT-12).
 */
export type TTitleDetail = {
  tmdbId: number;
  tmdbType: "MOVIE" | "TV";
  title: string;
  year: number | null;
  overview: string;
  posterUrl: string | null;
  backdropUrl: string | null;
  runtime: number | null;
  seasons: number | null;
  tmdbRating: number;
  genres: string[];
  cast: TCastMember[];
  providers: {
    flatrate: TProvider[];
    rent: TProvider[];
    buy: TProvider[];
  };
  userState?: {
    rating: number | null;
    watched: boolean;
    favorite: boolean;
  };
};
