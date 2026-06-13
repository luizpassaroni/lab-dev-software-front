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
  tmdbType: "movie" | "tv";
  title: string;
  year: number | null;
  posterUrl: string | null;
};

export type SearchResponse = {
  results: SearchResult[];
  page: number;
  totalPages: number;
  hasMore: boolean;
};

// Provisorio: o shape final vem da ISSUE-BACK-18 (#26), ainda em definicao no back.
// Ajustar quando a #26 fechar o contrato de GET /titles/{type}/{id}.
export type Provider = {
  providerId: number;
  name: string;
  logoUrl: string | null;
};

export type TitleProviders = {
  flatrate: Provider[];
  rent: Provider[];
  buy: Provider[];
};

export type TitleDetail = {
  tmdbId: number;
  tmdbType: "movie" | "tv";
  title: string;
  overview: string;
  posterUrl: string | null;
  providers: TitleProviders;
};
