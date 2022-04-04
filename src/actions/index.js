export const INFO_USER = 'INFO_USER';
export const INFO_WALLET = 'INFO_WALLET';

export const userInfo = (payload) => ({
  type: INFO_USER,
  payload,
});

export const walletInfo = (payload) => ({
  type: INFO_WALLET,
  payload,
});

export function fetchCurrency() {
  return async (dispatch) => {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const resultado = await response.json();
    const novo = Object.keys(resultado);
    const final = novo.splice(1, 1);
    console.log(final);
    dispatch(walletInfo(novo));
  };
}
