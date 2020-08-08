import {Film, Reviews} from '../../../../common/types';

export interface IStateToMovieReviewsProps {
  reviews: Reviews,
  film: Film,
  isLoadingComments: boolean
}

export interface IDispatchToMovieReviewsProps {
  getFilmComments: (id: number) => void
}

export type MovieReviewProps = IStateToMovieReviewsProps & IDispatchToMovieReviewsProps
