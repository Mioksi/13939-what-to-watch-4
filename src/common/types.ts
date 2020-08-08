export interface Film {
  id: number;
  name: string;
  genre: string;
  run_time: number;
  released: number;
  preview_image: string;
  background_color: string;
  background_image: string;
  poster_image: string;
  description: string;
  rating: number;
  scores_count: number;
  preview_video_link: string;
  video_link: string;
  director: string;
  starring: string[];
  is_favorite: boolean;
}

export interface Review {
  id: number;
  user: {
    id: number;
    name: string;
  };
  rating: number;
  comment: string;
  date: string;
}

export type Films = Film[]

export type Reviews = Review[]
