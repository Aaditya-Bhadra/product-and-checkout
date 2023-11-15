import { AnyAction, createSlice } from "@reduxjs/toolkit";
import { Dispatch } from "redux";
import { DataState } from "../../types/data";
import api from "../../api";

const initialState: DataState = {
  data: [],
  cartObjs: [],
  loading: false,
  error: [],
};

const slice = createSlice({
  name: "data",
  initialState,
  reducers: {
    onLoading(state) {
      state.loading = true;
    },
    getPostsSuccess(state, action) {
      state.loading = false;
      state.data = action.payload.products;
    },
    onError(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    addItemInCart(state, action) {
      state.cartObjs = state.cartObjs.concat(action.payload);
    },
    deleteItemCart(state, action) {
      state.cartObjs = action.payload;
    },
  },
});

export const getPostsAction = (limit: number) => {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      dispatch(slice.actions.onLoading());
      const response = await api.getProduct(limit);
      dispatch(
        slice.actions.getPostsSuccess({
          products: response?.data,
        })
      );
    } catch (err: any) {
      dispatch(slice.actions.onError(err?.response?.data));
    }
  };
};

export const AddItemToCart = (data: any) => {
  return (dispatch: Dispatch<AnyAction>) => {
    try {
      dispatch(
        slice.actions.addItemInCart({
          data: data,
        })
      );
    } catch (err: any) {
      dispatch(slice.actions.onError("something wents wrong"));
    }
  };
};

export const DeleteItemFromCart = (data: any) => {
  return (dispatch: Dispatch<AnyAction>) => {
    try {
      dispatch(slice.actions.deleteItemCart([...data]));
    } catch (err: any) {
      dispatch(slice.actions.onError("something wents wrong"));
    }
  };
};

export default slice.reducer;
