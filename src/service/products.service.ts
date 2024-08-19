import { getAnyProducts, searchProductsByName } from "./products.routes"

export const loadProducts = async () => {
    const result = await getAnyProducts();
    console.log(result)
}

export const searchProducts = async (searchParam: string) => {
    const result = await searchProductsByName(searchParam)
    
    const products = result.products.map(item => ({
        id: item.id,
        name: item.title,
        description: item.description,
        price: item.price,
        image: item.thumbnail
    }));

    return products
}