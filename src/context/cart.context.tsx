import React, {createContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type cartProduct = {
  name: string;
  description: string;
  price: number;
  quant: number;
  id: string;
  image: string;
};

type TCartContext = {
  cart: cartProduct[];
  addProductToCart: (product: cartProduct) => void;
  loadStorage: () => void;
  increment: (index: number) => void;
  decrease: (index: number) => void;
  remove: (id: string) => void;
  clear: () => void;
};

export const CartContext = createContext({} as TCartContext);

export const CartProvider = ({children}: React.ReactNode) => {
  const [cart, setCart] = useState<cartProduct[]>([]);

  useEffect(() => {
    loadStorage();
  }, []);

  const loadStorage = async () => {
    const storage = await AsyncStorage.getItem('cart_key');
    if (storage) {
      setCart(JSON.parse(storage));
    }
  };

  const addProductToCart = async (product: cartProduct) => {
    const exists = cart.findIndex(item => item.id === product.id);
    if (exists < 0) {
      const newCart = [...cart, {...product, quant: 1}];
      await AsyncStorage.setItem('cart_key', JSON.stringify(newCart));
      return setCart(newCart);
    }

    return increment(exists);
  };

  const increment = async (index: number) => {
    const product = {
      ...cart[index],
      quant: cart[index].quant + 1,
    };
    const newProducts = cart;
    newProducts[index] = product;
    await AsyncStorage.setItem('cart_key', JSON.stringify([...newProducts]));
    return setCart([...newProducts]);
  };

  const decrease = async (index: number) => {
    const product = {
      ...cart[index],
      quant: cart[index].quant - 1,
    };
    if (product.quant === 0) {
      return remove(product.id);
    }
    const newProducts = cart;
    newProducts[index] = product;
    await AsyncStorage.setItem('cart_key', JSON.stringify([...newProducts]));
    return setCart([...newProducts]);
  };

  const remove = async (id: string) => {
    const filteredProducts = cart.filter(item => item.id !== id);
    await AsyncStorage.setItem(
      'cart_key',
      JSON.stringify([...filteredProducts]),
    );
    return setCart(filteredProducts);
  };

  const clear = async () => {
    setCart([]);
    await AsyncStorage.removeItem('cart_key');
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        loadStorage,
        addProductToCart,
        increment,
        decrease,
        clear,
        remove,
      }}>
      {children}
    </CartContext.Provider>
  );
};
