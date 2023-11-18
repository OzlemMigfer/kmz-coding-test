export const getProducts = () => {
  return async dispatch => {
    dispatch({type: 'GET_PRODUCTS'});

    try {
      const response = await fetch(
        'https://apiv5.akilliticaretim.com/api/v5/sf/product/categories',
        {
          method: 'GET',
          headers: {
            GUID: '24BE-DB0E-D75E-4060',
            'Content-Type': 'application/json',
          },
        },
      );

      if (!response.status) {
        throw new Error('Get Products Api Veri Hata');
      }

      const data = await response.json();

      dispatch({type: 'GET_PRODUCTS_SUCCESS', payload: data});
    } catch (error) {
      dispatch({type: 'GET_PRODUCTS_ERROR', payload: error.message});
      console.log('Get Product Hata:',error.message);
    }
  };
};

export const getProductsList = () => {
  return async dispatch => {
    dispatch({type: 'GET_PRODUCTS_LIST'});

    try {
      const response = await fetch(
        'https://apiv5.akilliticaretim.com/api/v5/sf/product/category_products?Id=74&PageNumber=1&PageSize=10',
        {
          method: 'GET',
          headers: {
            GUID: '24BE-DB0E-D75E-4060',
            'Content-Type': 'application/json',
          },
        },
      );

      if (!response.status) {
        throw new Error('Get Products List Api Veri Hata');
      }

      const data = await response.json();

      dispatch({type: 'GET_PRODUCTS_LIST_SUCCESS', payload: data});
    } catch (error) {
      dispatch({type: 'GET_PRODUCTS_LIST_ERROR', payload: error.message});
      console.log('Get Product List Hata:',error.message);
    }
  };
};