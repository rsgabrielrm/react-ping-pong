//Ref: https://blog.rocketseat.com.br/reactjs-autenticacao/
export const KEY = "@ping-pongToken";

export const isAuthenticated = () => localStorage.getItem(KEY) !== null;

export const getToken = () => localStorage.getItem(KEY);

export const login = token => {
  localStorage.setItem(KEY, token);
};

export const logout = () => {
  localStorage.removeItem(KEY);
};
