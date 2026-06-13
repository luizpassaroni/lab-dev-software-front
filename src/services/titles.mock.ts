import { SearchResponse, TitleDetail } from '@/types/api';

export async function search(q: string, page: number): Promise<SearchResponse> {
  await delay();
  return {
    results: [
      {
        tmdbId: 550,
        type: 'movie',
        title: 'Clube da Luta',
        poster: 'https://image.tmdb.org/t/p/w500/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg',
        year: 1999,
      },
      {
        tmdbId: 1396,
        type: 'tv',
        title: 'Breaking Bad',
        poster: 'https://image.tmdb.org/t/p/w500/ggFHVNu6YYI5L9pCfOacjizRGt.jpg',
        year: 2008,
      },
      {
        tmdbId: 27205,
        type: 'movie',
        title: 'A Origem',
        poster: 'https://image.tmdb.org/t/p/w500/edv5CZvWj09upOsy2Y6IwDhK8bt.jpg',
        year: 2010,
      },
      {
        tmdbId: 1399,
        type: 'tv',
        title: 'Game of Thrones',
        poster: 'https://image.tmdb.org/t/p/w500/1XS1oqL89opfnbLl8WnZY1O1uJx.jpg',
        year: 2011,
      },
      {
        tmdbId: 13,
        type: 'movie',
        title: 'Forrest Gump',
        poster: 'https://image.tmdb.org/t/p/w500/saHP97rTPS5eLmrLQEcANmKrsFl.jpg',
        year: 1994,
      },
    ],
    page,
    totalPages: 3,
    hasMore: page < 3,
  };
}

export async function ficha(type: 'movie' | 'tv', id: number): Promise<TitleDetail> {
  await delay();

  // Caso sem provedores BR
  if (id === 13) {
    return {
      tmdbId: 13,
      type: 'movie',
      title: 'Forrest Gump',
      overview: 'A vida é como uma caixa de chocolates.',
      poster: 'https://image.tmdb.org/t/p/w500/saHP97rTPS5eLmrLQEcANmKrsFl.jpg',
      genres: ['Drama', 'Romance'],
      releaseDate: '1994-07-06',
      watchProvidersBR: [],
    };
  }

  return {
    tmdbId: id,
    type,
    title: 'Clube da Luta',
    overview: 'Um homem insone forma um clube de luta clandestino com um vendedor de sabão.',
    poster: 'https://image.tmdb.org/t/p/w500/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg',
    genres: ['Drama', 'Thriller'],
    releaseDate: '1999-10-15',
    watchProvidersBR: [
      { id: 8, name: 'Netflix', logo: 'https://image.tmdb.org/t/p/original/t2yyOv40HZeVlLjYsCsPHnWLk4W.jpg' },
      { id: 337, name: 'Disney+', logo: 'https://image.tmdb.org/t/p/original/7rwgEs15tFwyR9NPQ5vpzxTj19d.jpg' },
    ],
  };
}

function delay(ms = 300) {
  return new Promise((res) => setTimeout(res, ms));
}