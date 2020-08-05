import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {getAuthorizationStatus} from '../../reducer/user/selectors';

import {AuthorizationStatus, AppRoute} from '../../common/consts';

const PrivateRoute = (props) => {
  const {render, path, exact, authorizationStatus} = props;

  const getStatus = (routeProps) => {
    return (
      authorizationStatus === AuthorizationStatus.AUTH
        ? render(routeProps)
        : <Redirect to={AppRoute.LOGIN} />
    );
  };

  return (
    <Route
      path={path}
      exact={exact}
      render={getStatus}
    />
  );
};

PrivateRoute.propTypes = {
  authorizationStatus: PropTypes.string.isRequired,
  exact: PropTypes.bool.isRequired,
  path: PropTypes.string.isRequired,
  render: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
});

export {PrivateRoute};
export default connect(mapStateToProps)(PrivateRoute);
