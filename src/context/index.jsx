import { createContext, useState, useEffect, useContext } from 'react';
import { fakeFetchCrypto, fetchAssets } from '../api';
import { percentDifference } from '../utils';

const cryptoContext = createContext({
  assets: [],
  crypto: [],
  loading: false,
});

export const CryptoContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [crypto, setCrypto] = useState([]);
  const [assets, setAssets] = useState([]);

  const mapAssets = (assets, result) => {
    return assets.map((asset) => {
      const coin = result.find((c) => c.id === asset.id);

      return {
        grow: asset.price < coin.price,
        growPercent: percentDifference(asset.price, coin.price),
        totalAmount: asset.amount * coin.price,
        totalProfit: asset.amount * coin.price - asset.amount * asset.price,
        ...asset,
      };
    });
  };

  useEffect(() => {
    const preload = async () => {
      setLoading(true);

      const { result } = await fakeFetchCrypto();
      const dataAssets = await fetchAssets();

      setCrypto(result);

      setAssets(mapAssets(dataAssets, result));

      setLoading(false);
    };

    preload();
  }, []);

  const addAsset = (newAsset) => {
    setAssets((prev) => mapAssets([...prev, newAsset], crypto));
  };

  return (
    <cryptoContext.Provider value={{ loading, crypto, assets, addAsset }}>
      {children}
    </cryptoContext.Provider>
  );
};

export const useCrypto = () => {
  return useContext(cryptoContext);
};
