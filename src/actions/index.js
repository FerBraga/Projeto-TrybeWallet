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
