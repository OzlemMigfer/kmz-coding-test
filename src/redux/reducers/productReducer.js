const initialState = {
  products: [],
  productsList: [],
  loading: false,
  error: null,
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_PRODUCTS':
      return {...state, loading: true, error: null};

    case 'GET_PRODUCTS_SUCCESS':
      return {...state, loading: false, products: action.payload};

    case 'GET_PRODUCTS_ERROR':
      return {...state, loading: false, error: action.payload};

    case 'GET_PRODUCTS_LIST':
      return {...state, loading: true, error: null};

    case 'GET_PRODUCTS_LIST_SUCCESS':
      return {...state, loading: false, productsList: action.payload};

    case 'GET_PRODUCTS_LIST_ERROR':
      return {...state, loading: false, error: action.payload};
      
    default:
      return state;
  }
};

export default productReducer;
