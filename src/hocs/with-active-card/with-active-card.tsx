import * as React from 'react';
import {Subtract} from 'utility-types';

import {InjectingProps, IWithActiveCardState} from './types';

const withActiveCard = (Component) => {
  type P = React.ComponentProps<typeof Component>;

  type T = Subtract<P, InjectingProps>;

  class WithActiveItem extends React.PureComponent<T, IWithActiveCardState> {
    constructor(props: T) {
      super(props);

      this.state = {
        activeCard: null,
      };

      this.handleCardMouseEnter = this.handleCardMouseEnter.bind(this);
      this.handleCardMouseLeave = this.handleCardMouseLeave.bind(this);
    }

    private handleCardMouseEnter(id: number): void {
      this.setState({
        activeCard: id,
      });
    }

    private handleCardMouseLeave(): void {
      this.setState({
        activeCard: null,
      });
    }

    public render(): React.ReactNode {
      const {activeCard} = this.state;

      return (
        <Component
          {...this.props}
          activeCard={activeCard}
          onCardMouseEnter={this.handleCardMouseEnter}
          onCardMouseLeave={this.handleCardMouseLeave}
        />
      );
    }
  }

  return WithActiveItem;
};

export default withActiveCard;
