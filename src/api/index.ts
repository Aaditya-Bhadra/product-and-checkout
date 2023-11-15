import apiClient from "../axios";


export const product = {
    allProduct: (limit: number) => `/products?limit=${limit}`,
    productById: (id: number | string) => `/products/${id}/`,
  };

  const api = {  
    //POSTS
    getProduct: (limit: number) => apiClient.get(product.allProduct(limit)),
    getProductById: (id: number | string) => apiClient.get(product.productById(id)),
  };

  export default api;
