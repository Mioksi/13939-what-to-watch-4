import React from 'react';
import PropTypes from 'prop-types';

import {TABS} from '../../common/consts';

const Tabs = ({activeTab, onTabClick}) => {
  const setActiveClass = (tab) => activeTab === tab ? `movie-nav__item--active` : ``;

  const getTab = (tab, i) => {
    const navClass = `movie-nav__item ${setActiveClass(tab)}`;
    const key = `${tab} + ${i}`;

    return (
      <li
        className={navClass}
        key={key}
      >
        <a onClick={handleTabClick(tab)} href="#" className="movie-nav__link">{tab}</a>
      </li>
    );
  };

  const renderTabs = () => TABS.map(getTab);

  const handleTabClick = (tab) => {
    return (evt) => {
      evt.preventDefault();
      onTabClick(tab);
    };
  };

  return (
    <nav className="movie-nav movie-card__nav">
      <ul className="movie-nav__list">
        {renderTabs()}
      </ul>
    </nav>
  );
};

Tabs.propTypes = {
  activeTab: PropTypes.string.isRequired,
  onTabClick: PropTypes.func.isRequired
};

export default Tabs;
