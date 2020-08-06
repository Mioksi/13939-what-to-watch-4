import * as React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import {getErrorAuthorizationStatus} from '../../reducer/user/selectors';
import {Operation as UserOperation} from '../../reducer/user/user';

import Footer from '../footer/footer';

import {IDispatchToSignInProps, IStateToSignInProps, SignInProps} from './types';

import {AppRoute} from '../../common/consts';

class SignIn extends React.PureComponent<SignInProps> {
  private readonly loginRef: React.RefObject<HTMLInputElement>;
  private readonly passwordRef: React.RefObject<HTMLInputElement>;

  constructor(props: SignInProps) {
    super(props);

    this.loginRef = React.createRef();
    this.passwordRef = React.createRef();

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  private getErrorMessage(): React.ReactElement {
    return (
      <div className="sign-in__message">
        <p>We can’t recognize this email <br/> and password combination. Please try again.</p>
      </div>
    );
  }

  private renderErrorMessage(): React.ReactElement {
    const {isErrorAuth} = this.props;

    return isErrorAuth ? this.getErrorMessage() : null;
  }

  private handleSubmit(evt): void {
    const {onSubmit} = this.props;

    evt.preventDefault();

    onSubmit({
      login: this.loginRef.current.value,
      password: this.passwordRef.current.value,
    });
  }

  public render(): React.ReactElement {
    return (
      <div className="user-page">
        <header className="page-header user-page__head">
          <div className="logo">
            <Link to={AppRoute.ROOT} className="logo__link">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </Link>
          </div>
          <h1 className="page-title user-page__title">Sign in</h1>
        </header>
        <div className="sign-in user-page__content">
          <form action="#" className="sign-in__form" onSubmit={this.handleSubmit}>
            {this.renderErrorMessage()}
            <div className="sign-in__fields">
              <div className="sign-in__field">
                <input
                  className="sign-in__input"
                  type="email"
                  placeholder="Email address"
                  name="user-email"
                  id="user-email"
                  required
                  ref={this.loginRef}
                />
                <label className="sign-in__label visually-hidden" htmlFor="user-email">Email address</label>
              </div>
              <div className="sign-in__field">
                <input
                  className="sign-in__input"
                  type="password"
                  placeholder="Password"
                  name="user-password"
                  id="user-password"
                  required
                  ref={this.passwordRef}
                />
                <label className="sign-in__label visually-hidden" htmlFor="user-password">Password</label>
              </div>
            </div>
            <div className="sign-in__submit">
              <button className="sign-in__btn" type="submit">Sign in</button>
            </div>
          </form>
        </div>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state): IStateToSignInProps => ({
  isErrorAuth: getErrorAuthorizationStatus(state)
});

const mapDispatchToProps = (dispatch): IDispatchToSignInProps => ({
  onSubmit: (authData: object) => dispatch(UserOperation.login(authData))
});

export {SignIn};
export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
