export interface IPropsAuth {
  setUserName:  (value: string) => void;
  setPassword:  (value: string) => void;
  navigate: (to: string) => void;
  openSnackbar: boolean;
  snackbarMessage: string[];
  setOpenSnackbar: (value: boolean) => void;
}

export interface IAuthState {
  user: IPublicUser,
  isLogged: boolean
}

interface IPublicUser {
  userName: string
}

export interface ISnackbar {
  state: boolean;
  time: number;
  snackbarMessage: string[] | string;
  setOpenSnackbar: (value: boolean) => void;
}