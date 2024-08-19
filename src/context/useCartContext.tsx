import {useContext} from 'react';
import {CartContext} from './cart.context';

export const useCart = () => {
  const {
    addProductToCart,
    cart,
    clear,
    decrease,
    increment,
    remove,
    loadStorage,
  } = useContext(CartContext);

  return {
    addProductToCart,
    cart,
    clear,
    decrease,
    increment,
    remove,
    loadStorage,
  };
};
