import { cryptoData, cryptoAssets } from './data';

export const fakeFetchCrypto = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(cryptoData);
    }, 100);
  });
};

// export const fetchAssets = () => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve(cryptoAssets);
//     }, 100);
//   });
// };

export const fetchAssets = () => {
  const assets = JSON.parse(localStorage.getItem('assets'));

  return assets;
};
