import * as React from 'react';

import {TABS} from '../../common/consts';
import {ITabsProps} from './types';

const setActiveClass = (activeTab: string, tab: string): string => {
  return activeTab === tab ? `movie-nav__item--active` : ``;
};

const getTab = (tab: string, i: number, activeTab: string, onTabClick: (tab: string) => void): React.ReactNode => {
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

const Tabs: React.FC<ITabsProps> = ({activeTab, onTabClick}: ITabsProps) => {
  const renderTabs = (): React.ReactNodeArray => {
    return TABS.map((tab: string, i: number) => getTab(tab, i, activeTab, onTabClick));
  };

  return (
    <nav className="movie-nav movie-card__nav">
      <ul className="movie-nav__list">
        {renderTabs()}
      </ul>
    </nav>
  );
};

export default Tabs;
