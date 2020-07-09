import React from 'react';
import PropTypes from 'prop-types';

import {TABS} from '../../common/consts';

const setActiveClass = (activeTab, tab) => {
  return activeTab === tab ? `movie-nav__item--active` : ``;
};

const getTab = (tab, i, activeTab, onTabClick) => {
  const navClass = `movie-nav__item ${setActiveClass(activeTab, tab)}`;
  const key = `${tab} + ${i}`;

  const handleTabClick = () => {
    return (evt) => {
      evt.preventDefault();
      onTabClick(tab);
    };
  };

  return (
    <li
      className={navClass}
      key={key}
    >
      <a onClick={handleTabClick()} href="#" className="movie-nav__link">{tab}</a>
    </li>
  );
};

const Tabs = ({activeTab, onTabClick}) => {
  const renderTabs = () => {
    return TABS.map((tab, i) => getTab(tab, i, activeTab, onTabClick));
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
