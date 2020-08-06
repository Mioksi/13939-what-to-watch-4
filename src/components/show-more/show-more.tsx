import * as React from 'react';

import {IShowMoreProps} from './types';

const ShowMore: React.FC<IShowMoreProps> = ({onShowMoreButtonClick}: IShowMoreProps) => {
  return (
    <div className="catalog__more">
      <button onClick={onShowMoreButtonClick} className="catalog__button" type="button">Show more</button>
    </div>
  );
};

export default ShowMore;
