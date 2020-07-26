import NameSpace from '../name-space';

export const getAuthorizationStatus = (state) => state[NameSpace.USER].authorizationStatus;

export const getErrorAuthorizationStatus = (state) => state[NameSpace.USER].isErrorAuth;
