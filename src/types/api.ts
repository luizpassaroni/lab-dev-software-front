export interface User {
  id: number;
  name: string;
  email: string;
  createdAt: string;
}

export interface RegisterBody {
  name: string;
  email: string;
  password: string;
}

export interface RegisterResponse {
  user: User;
}

export interface LoginBody {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: User;
}

export interface SearchResult {
  tmdbId: number;
  type: 'movie' | 'tv';
  title: string;
  poster: string;
  year: number;
}

export interface SearchResponse {
  results: SearchResult[];
  page: number;
  totalPages: number;
}

export interface Provider {
  id: number;
  name: string;
  logo: string;
}

export interface TitleDetail {
  tmdbId: number;
  type: 'movie' | 'tv';
  title: string;
  overview: string;
  poster: string;
  genres: string[];
  releaseDate: string;
  watchProvidersBR: Provider[];
}