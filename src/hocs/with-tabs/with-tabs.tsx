import * as React from 'react';
import {Subtract} from 'utility-types';

import Tabs from '../../components/tabs/tabs';

import {IWithTabsState, InjectingProps} from './types';

import {TabType} from '../../common/consts';

const withTabs = (Component) => {
  type P = React.ComponentProps<typeof Component>;
  type T = Subtract<P, InjectingProps>;

  class WithTabs extends React.PureComponent<T, IWithTabsState> {
    constructor(props: T) {
      super(props);

      this.state = {
        activeTab: TabType.OVERVIEW,
      };

      this.getTabs = this.getTabs.bind(this);
      this.handleTabClick = this.handleTabClick.bind(this);
    }

    private getTabs(): React.ReactElement {
      const {activeTab} = this.state;

      return (
        <Tabs
          activeTab={activeTab}
          onTabClick={this.handleTabClick}
        />
      );
    }

    private handleTabClick(currentTab: string): void {
      this.setState({
        activeTab: currentTab
      });
    }

    public render(): React.ReactElement {
      const {activeTab} = this.state;

      return <Component
        {...this.props}
        renderTabs={this.getTabs}
        activeTab={activeTab}
      />;
    }
  }

  return WithTabs;
};

export default withTabs;
