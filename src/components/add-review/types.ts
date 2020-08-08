import {Film} from '../../common/types'

export interface IAddReviewProps {
  rating: number,
  onRatingChange: () => void,
  onCommentChange: () => void,
  onSubmit: () => void
}

export interface IStateToAddReviewProps {
  film: Film,
  isErrorLoading: boolean,
  isFormDisabled: boolean
}

export type AddReviewProps = IAddReviewProps & IStateToAddReviewProps
