export interface Movie {
    id: number;
    title: string;
    overview: string;
    poster_path: string;
    backdrop_path: string;
    vote_average: number;
    vote_count: number;
    release_date: string;
    media_type: string;
    // Add other properties as needed
  };


  export interface Show {
    id: number;
    name: string;
    overview: string;
    poster_path: string;
    backdrop_path: string;
    vote_average: number;
    vote_count: number;
    release_date: string;
    media_type: string;
    first_air_date: string;
    // Add other properties as needed
  };

  export type ShowEp = {
    id: number;
    name: string;
    episode_count: number;
    season_number: number;
  }

export type ApiResponse = {
    page: number;
    results: Movie[];
    total_pages: number;
    total_results: number;
  };

  export interface Review {
    id: string;
    author: string;
    author_details: {username: string, avatar_path: string | null, rating: number | null};
    content: string;
    created_at: string;
    updated_at: string;
    url: string;
  }