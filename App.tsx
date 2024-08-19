/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  TextInput,
  useColorScheme,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Cart} from './src/components/cart';
import {cartProduct, CartProvider} from './src/context/cart.context';
import {searchProducts} from './src/service/products.service';
import {ProductCard} from './src/components/productCard';
import {CardSkeleton} from './src/components/cardSkeleton';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [inputField, setInputField] = useState('');
  const [productList, setProductList] = useState<cartProduct[]>([]);

  const handleSearchProducts = async (searchInput: string) => {
    const products = await searchProducts(searchInput);
    setProductList(products);
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      handleSearchProducts(inputField);
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [inputField]);

  return (
    <SafeAreaView>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <CartProvider>
        <View style={style.body}>
          <View style={style.header}>
            <Cart />
            <View style={style.searchSection}>
              <View style={style.search}>
                <TextInput
                  style={style.searchBar}
                  onChangeText={text => setInputField(text)}
                  value={inputField}
                  placeholder="Search for a product (ex: phones)"
                />
                <Icon
                  style={style.searchIcon}
                  name="search"
                  size={20}
                  color="#000"
                />
              </View>
            </View>
          </View>
          <ScrollView style={style.scrollBody}>
            {productList.length === 0 ? (
              <CardSkeleton />
            ) : (
              productList.map(item => (
                <ProductCard product={item} key={item.name} />
              ))
            )}
          </ScrollView>
        </View>
      </CartProvider>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  body: {
    height: '100%',
    paddingHorizontal: 0,
  },
  header: {
    display: 'flex',
  },
  scrollBody: {
    paddingHorizontal: 10,
  },
  searchSection: {
    marginTop: 5,
  },
  searchBar: {
    width: '85%',
    marginLeft: 15,

    marginTop: 5,
    paddingLeft: 5,
  },
  searchIcon: {
    paddingTop: 15,
    paddingLeft: 5,
    marginTop: 2,
    borderRadius: 15,
    width: '10%',
  },
  search: {
    width: '95%',
    display: 'flex',
    flexDirection: 'row',
    borderRadius: 15,
    borderWidth: 1,
    marginLeft: 10,
    borderColor: '#007299',
  },
});

export default App;
