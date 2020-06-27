import React from 'react';
import PropTypes from 'prop-types';

import {TabType} from '../../common/consts';

const Tabs = ({activeTab, onTabClick}) => {
  const toggleActiveClass = (tab) => activeTab === tab ? `movie-nav__item--active` : ``;

  const handleTabClick = (tab) => {
    return (evt) => {
      evt.preventDefault();
      onTabClick(tab);
    };
  };

  return (
    <nav className="movie-nav movie-card__nav">
      <ul className="movie-nav__list">
        <li className={`movie-nav__item ${toggleActiveClass(TabType.OVERVIEW)}`}>
          <a onClick={handleTabClick(TabType.OVERVIEW)} href="#" className="movie-nav__link">Overview</a>
        </li>
        <li className={`movie-nav__item ${toggleActiveClass(TabType.DETAILS)}`}>
          <a onClick={handleTabClick(TabType.DETAILS)} href="#" className="movie-nav__link">Details</a>
        </li>
        <li className={`movie-nav__item ${toggleActiveClass(TabType.REVIEWS)}`}>
          <a onClick={handleTabClick(TabType.REVIEWS)} href="#" className="movie-nav__link">Reviews</a>
        </li>
      </ul>
    </nav>
  );
};

Tabs.propTypes = {
  activeTab: PropTypes.string.isRequired,
  onTabClick: PropTypes.func.isRequired
};

export default Tabs;
