export interface IStateToSignInProps {
  isErrorAuth: boolean
}

export interface IDispatchToSignInProps {
  onSubmit: (authData: object) => void
}

export type SignInProps = IStateToSignInProps & IDispatchToSignInProps
