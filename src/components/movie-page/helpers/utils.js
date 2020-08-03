import {MovieRating, RatingType} from '../../../common/consts';

export const getFormatRating = (rating) => rating.toString().replace(`.`, `,`);

export const getTextRating = (rating) => {
  let textRating;

  if (rating >= MovieRating.BAD && rating < MovieRating.NORMAL) {
    textRating = RatingType.BAD;
  } else if (rating >= MovieRating.NORMAL && rating < MovieRating.GOOD) {
    textRating = RatingType.NORMAL;
  } else if (rating >= MovieRating.GOOD && rating < MovieRating.VERY_GOOD) {
    textRating = RatingType.GOOD;
  } else if (rating >= MovieRating.VERY_GOOD && rating < MovieRating.AWESOME) {
    textRating = RatingType.VERY_GOOD;
  } else if (rating === MovieRating.AWESOME) {
    textRating = RatingType.AWESOME;
  }

  return textRating;
};

export const getFormatDate = (date, options) => {
  return new Intl.DateTimeFormat(`en-US`, options).format(new Date(date));
};

export const getFormatInnerDate = (date, options) => {
  const newDate = new Intl.DateTimeFormat(`en-US`, options).formatToParts(new Date(date));
  const [{value: day},, {value: month},, {value: year}] = newDate;

  return `${year}-${month}-${day}`;
};
