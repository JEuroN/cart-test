import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {CustomButton} from './button';
import IconFA from 'react-native-vector-icons/FontAwesome';
import {cartProduct} from '../context/cart.context';
import {useCart} from '../context/useCartContext';

interface IProductCard {
  product: cartProduct;
  index: number;
}

export const Card = ({product, index}: IProductCard) => {
  const {increment, decrease, remove} = useCart();

  return (
    <View style={style.cardBody}>
      <View style={style.productInfo}>
        <View style={style.imageSection}>
          <Image source={{uri: product.image}} style={style.image} />
        </View>
        <View style={style.infoCard}>
          <Text>Name:</Text>
          <Text>{product.name}</Text>
          <Text>Price: </Text>
          <Text>{product.price} $</Text>
          <Text>Description: </Text>
          <Text numberOfLines={4} ellipsizeMode="tail">
            {product.description.split('.')[0]}
          </Text>
        </View>
      </View>
      <View style={style.buttonSection}>
        <CustomButton
          title={<IconFA style={style.iconColor} name={'trash-o'} size={20} />}
          onPress={() => remove(product.id)}
          buttonStyle={{...style.buttonStyle, ...style.buttonDanger}}
          textStyle={style.whiteText}
        />
        <View style={style.middleButtonSection}>
          <CustomButton
            title={<IconFA style={style.iconColor} name={'minus'} size={20} />}
            onPress={() => decrease(index)}
            buttonStyle={{...style.buttonStyle, ...style.buttonDanger}}
            textStyle={style.whiteText}
          />
          <Text style={style.buttonSectionText}>{product.quant}</Text>
          <CustomButton
            title={<IconFA style={style.iconColor} name={'plus'} size={20} />}
            onPress={() => increment(index)}
            buttonStyle={{...style.buttonStyle, ...style.buttonSuccess}}
            textStyle={style.whiteText}
          />
        </View>
        <Text style={style.buttonSectionText}>
          {(product.price * product.quant).toFixed(2)} $
        </Text>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  cardBody: {
    width: '100%',
    height: 240,
    borderColor: '#007299',
    borderWidth: 1,
    borderStyle: 'solid',
    marginTop: 10,
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderRadius: 10,
  },
  infoCard: {
    width: '60%',
    height: '100%',
    display: 'flex',
  },
  image: {
    width: 100,
    margin: 'auto',
    height: undefined,
    aspectRatio: 1,
    borderColor: 'black',
    borderWidth: 1,
  },
  iconColor: {
    color: 'white',
  },
  imageSection: {
    width: '40%',
    margin: 'auto',
  },
  productInfo: {
    display: 'flex',
    flexDirection: 'row',
    height: '80%',
  },
  buttonSection: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingTop: 5,
  },
  middleButtonSection: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonSectionText: {
    paddingHorizontal: 5,
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
});
