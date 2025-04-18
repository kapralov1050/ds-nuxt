export interface Film {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  }

  export interface movieRating {
    id: number;
    rating: number;
  }

  export interface movieWatchList {
    id: number;
  }

  export interface paginationParams {
    page: number;
    totalresults: number;
  }

  export interface userData {
    avatar: {}
    id: number
    iso_639_1: string
    iso_3166_1: string
    name: string
    include_adult: boolean
    ussername: string
  }

  export interface WatchListResponse {
    page: number;
    results: Film[];
    total_pages: number;
    total_results: number;
  }