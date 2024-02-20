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
  const [assets, setAssets] = useState(JSON.parse(localStorage.getItem('assets')) || []);

  localStorage.setItem('assets', JSON.stringify(assets));

  const mapAssets = (assets, result) => {
    return assets.map((asset) => {
      const coin = result.find((c) => c.id === asset.id);

      return {
        grow: asset.price < coin.price,
        growPercent: percentDifference(asset.price, coin.price),
        totalAmount: asset.amount * coin.price,
        totalProfit: asset.amount * coin.price - asset.amount * asset.price,
        name: coin.name,
        ...asset,
      };
    });
  };

  useEffect(() => {
    const preload = async () => {
      setLoading(true);

      const { result } = await fakeFetchCrypto();

      if (assets.length) {
        const dataAssets = await fetchAssets();
        setAssets(mapAssets(dataAssets, result));
      }

      setCrypto(result);

      setLoading(false);
    };

    preload();
  }, []);

  const addAsset = (newAsset) => {
    setAssets((prev) => mapAssets([...prev, newAsset], crypto));
  };

  const removeAsset = (coin) => {
    setAssets((prev) => prev.filter((p) => p.id !== coin.id));
  };

  return (
    <cryptoContext.Provider value={{ loading, crypto, assets, addAsset, removeAsset }}>
      {children}
    </cryptoContext.Provider>
  );
};

export const useCrypto = () => {
  return useContext(cryptoContext);
};
