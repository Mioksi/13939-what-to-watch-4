import {RouteProps} from 'react-router-dom';
import * as React from 'react';

export interface IStateToPrivateRouterProps {
  authorizationStatus: string
}

export type IPrivateRouteProps = RouteProps & IStateToPrivateRouterProps & {
  render: () => React.ReactNode
}
