import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {CustomButton} from './button';
import IconAD from 'react-native-vector-icons/AntDesign';
import {cartProduct} from '../context/cart.context';
import {useCart} from '../context/useCartContext';

interface IProductCard {
  product: cartProduct;
}

export const ProductCard = ({product}: IProductCard) => {
  const {addProductToCart} = useCart();
  return (
    <View style={style.cardBody}>
      <View style={style.imageSection}>
        <Image source={{uri: product.image}} style={style.image} />
      </View>
      <View style={style.infoCard}>
        <CustomButton
          title={
            <View style={style.cartIcon}>
              <Text style={style.whiteText}>Send to cart</Text>
              <IconAD name="arrowright" size={20} style={style.whiteText} />
            </View>
          }
          onPress={() => addProductToCart(product)}
        />
        <Text>Name: </Text>
        <Text>{product.name}</Text>
        <Text>Price: </Text>
        <Text>{product.price} $</Text>
        <Text>Description: </Text>
        <Text numberOfLines={4} ellipsizeMode="tail">
          {product.description.split('.')[0]}
        </Text>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  cardBody: {
    width: '100%',
    height: 230,
    borderColor: '#007299',
    borderWidth: 1,
    borderStyle: 'solid',
    marginTop: 10,
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'row',
  },
  cartIcon: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#007299',
    width: '48%',
    padding: 5,
    borderRadius: 6,
    marginLeft: 'auto',
  },
  infoCard: {
    width: '60%',
    height: '100%',
    display: 'flex',
    paddingLeft: 8,
  },
  iconColor: {
    color: 'white',
  },
  imageSection: {
    width: '40%',
    margin: 'auto',
  },
  buttonStyle: {
    width: 30,
    height: 30,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  whiteText: {
    color: 'white',
  },
  buttonDanger: {
    backgroundColor: 'red',
  },
  buttonSuccess: {
    backgroundColor: 'blue',
  },
  image: {
    width: '100%',
    height: undefined,
    aspectRatio: 1,
    borderColor: 'black',
    borderWidth: 1,
  },
});
