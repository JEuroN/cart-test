const API_URL = 'https://dummyjson.com'

export const getAnyProducts = () => fetch(API_URL + '/products')
.then(res => res.json())
.then(res => res)
.catch(err => console.log(err))

export const searchProductsByName = (searchParam: string) => fetch(`${API_URL}/products/search?q=${searchParam}`)
.then(res => res.json())
.then(res => res)
.catch(err => console.log(err));

