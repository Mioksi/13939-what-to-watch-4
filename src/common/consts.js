export const VIDEO_DELAY = 1000;
export const MAX_SIMILAR_MOVIES = 4;
export const MAX_GENRES = 10;
export const MAX_MOVIES = 8;
export const TIMEOUT = 5000;
export const RATING_COUNT = 5;

export const MovieRating = {
  BAD: 0,
  NORMAL: 3,
  GOOD: 5,
  VERY_GOOD: 8,
  AWESOME: 10
};

export const RatingType = {
  BAD: `Bad`,
  NORMAL: `Normal`,
  GOOD: `Good`,
  VERY_GOOD: `Very good`,
  AWESOME: `Awesome`
};

export const TabType = {
  OVERVIEW: `Overview`,
  DETAILS: `Details`,
  REVIEWS: `Reviews`
};

export const Error = {
  UNAUTHORIZED: 401
};

export const AuthorizationStatus = {
  AUTH: `AUTH`,
  NO_AUTH: `NO_AUTH`
};

export const ReviewLength = {
  MIN: 50,
  MAX: 400
};

export const AppRoute = {
  ADD_REVIEW: `/review`,
  FILM: `/films`,
  LOGIN: `/login`,
  MY_LIST: `/mylist`,
  PLAYER: `/player`,
  ROOT: `/`
};

export const RoutePath = {
  FILM: `${AppRoute.FILM}/:id`,
  PLAYER: `${AppRoute.PLAYER}/:id`,
  ADD_REVIEW: `${AppRoute.FILM}/:id${AppRoute.ADD_REVIEW}`
};

export const dateOptions = {
  year: `numeric`,
  month: `long`,
  day: `numeric`
};

export const dateInnerOptions = {
  year: `numeric`,
  month: `numeric`,
  day: `numeric`
};

export const Time = {
  SECONDS_IN_MINUTE: 60,
  SECONDS_IN_HOUR: 3600
};

export const TABS = Object.values(TabType);
export const ALL_GENRES = `All genres`;
export const VIDEO_CLASS = `player__video`;

export const URL = `https://4.react.pages.academy/wtw`;
