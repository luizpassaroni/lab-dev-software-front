export type User = {
  id: number;
  name: string;
  email: string;
  createdAt?: string;
};

export type RegisterBody = {
  name: string;
  email: string;
  password: string;
};

export type RegisterResponse = {
  id: number;
  name: string;
  email: string;
};

export type LoginBody = {
  email: string;
  password: string;
};

// Sem access_token no browser: a sessao vive em cookie HttpOnly setado pelo BFF.
export type LoginResponse = {
  user: User;
};

export type SearchResult = {
  tmdbId: number;
  tmdbType: "MOVIE" | "TV";
  title: string;
  year: number | null;
  posterUrl: string | null;
  badge: "Filme" | "Série";
};

export type SearchResponse = {
  results: SearchResult[];
  page: number;
  totalPages: number;
  hasMore: boolean;
};

export type Provider = {
  name: string;
  logoUrl: string | null;
};

export type TitleProviders = {
  flatrate: Provider[];
  rent: Provider[];
  buy: Provider[];
};

export type CastMember = {
  name: string;
  character: string;
  profileUrl: string | null;
};

export type TitleDetail = {
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
  cast: CastMember[];
  providers: TitleProviders;
};
