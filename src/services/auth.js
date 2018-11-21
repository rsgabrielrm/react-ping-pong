//Ref: https://blog.rocketseat.com.br/reactjs-autenticacao/
export const KEY = "@ping-pongToken";

export const isAuthenticated = () => localStorage.getItem(KEY) !== null;

export const getToken = () => localStorage.getItem(KEY);

export const login = token => {
  localStorage.setItem(KEY, token.token);
  localStorage.setItem('name', token.name);
  localStorage.setItem('email', token.email);
  localStorage.setItem('id', token.id);
  localStorage.setItem('ranking', token.rating);
};

export const logout = () => {
  localStorage.removeItem(KEY);
  localStorage.removeItem('name');
  localStorage.removeItem('email');
  localStorage.removeItem('id');
  localStorage.removeItem('ranking');
  return true;
};

export const getUserLocal = () => {
    const name = localStorage.getItem('name');
    const email = localStorage.getItem('email');
    const id = localStorage.getItem('id');
    const ranking = localStorage.getItem('ranking');
    return {name, email, id, ranking};
}
