/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useMemo, useState} from 'react';
import {Animated, ScrollView, StyleSheet, Text, View} from 'react-native';
import {Card} from './card';
import {CustomButton} from './button';
import IconAD from 'react-native-vector-icons/AntDesign';
import IconFA from 'react-native-vector-icons/FontAwesome';
import {useCart} from '../context/useCartContext';

export const Cart = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [heightValue] = useState(new Animated.Value(0));
  const {cart, clear} = useCart();
  const handleCartOpen = () => {
    setIsCartOpen(!isCartOpen);
  };

  useEffect(() => {
    const newHeight = isCartOpen ? 1 : 0;
    Animated.timing(heightValue, {
      toValue: newHeight,
      duration: 150,
      useNativeDriver: false,
    }).start();
  }, [isCartOpen]);

  const productCards = useMemo(
    () =>
      cart.map((item, index) => (
        <Card key={item.id + index * +item.id} product={item} index={index} />
      )),
    [cart],
  );

  const totalValue = useMemo(
    () => cart.reduce((a, b) => a + b.price * b.quant, 0).toFixed(2),
    [cart],
  );

  return (
    <View style={{backgroundColor: '#007299'}}>
      <View style={style.header}>
        <Text style={style.headerText}>Welcome to the market!</Text>
        <CustomButton
          title={<IconAD name="shoppingcart" size={30} />}
          onPress={handleCartOpen}
          buttonStyle={style.cartButton}
        />
      </View>
      <View
        style={{
          ...style.arrow,
          opacity: isCartOpen ? 1 : 0,
        }}
      />
      <Animated.View
        style={{
          ...style.cartContent,
          height: heightValue.interpolate({
            inputRange: [0, 1],
            outputRange: ['0%', '91%'],
          }),
          opacity: heightValue,
        }}>
        <ScrollView style={style.scrollPadding}>{productCards}</ScrollView>
        <View style={style.footer}>
          <CustomButton
            title={
              <CustomButton
                title={
                  <View style={{display: 'flex', flexDirection: 'row'}}>
                    <Text style={{color: 'white'}}>Clear</Text>
                    <IconFA
                      style={{color: 'white', paddingLeft: 5}}
                      name={'trash-o'}
                      size={25}
                    />
                  </View>
                }
                onPress={() => clear()}
                buttonStyle={style.clearButton}
              />
            }
            onPress={() => {}}
          />
          <Text style={{...style.footerText}}>Total: {totalValue} $</Text>
        </View>
      </Animated.View>
    </View>
  );
};

const style = StyleSheet.create({
  header: {
    display: 'flex',
    flexDirection: 'row',
  },
  headerText: {
    color: 'white',
    marginLeft: 10,
    fontSize: 20,
    marginTop: 25,
  },
  arrow: {
    borderTopWidth: 1,
    borderLeftWidth: 1,
    backgroundColor: '#EDEDED',
    borderColor: '#007299',
    width: 10,
    height: 10,
    marginLeft: 'auto',
    top: 55,
    right: 38,
    marginBottom: -5,
    transform: [{rotate: '45deg'}],
    zIndex: 1,
    position: 'absolute',
  },
  cartContent: {
    width: '100%',
    backgroundColor: '#EDEDED',
    borderStyle: 'solid',
    borderColor: '#007299',
    paddingVertical: 10,
    borderTopWidth: 1,
    overflow: 'hidden',
  },
  scrollPadding: {
    paddingHorizontal: 10,
  },
  footer: {
    height: '8%',
    marginTop: 'auto',
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#007299',
    paddingHorizontal: 10,
    display: 'flex',
    flexDirection: 'row',
  },
  footerText: {
    fontSize: 20,
    marginLeft: 'auto',
  },
  cartButton: {
    borderRadius: 50,
    height: 50,
    width: 50,
    backgroundColor: '#D1D2D2',
    marginLeft: 'auto',
    marginRight: 20,
    marginTop: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  clearButton: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '55%',
    backgroundColor: 'red',
    paddingVertical: 4,
    borderRadius: 10,
  },
});
