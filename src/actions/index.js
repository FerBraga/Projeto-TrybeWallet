export const INFO_USER = 'INFO_USER';
export const INFO_WALLET = 'INFO_WALLET';
export const INFO_DESPESA = 'INFO_DESPESA';
export const INFO_ACUMULADA = 'INFO_ACUMULADA';

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
    novo.splice(1, 1);
    dispatch(walletInfo(novo));
  };
}

export const despesaInfo = (payload) => ({
  type: INFO_DESPESA,
  payload,
});

export function fetchAll() {
  return async (dispatch) => {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const resultado = await response.json();
    dispatch(despesaInfo(resultado));
  };
}
