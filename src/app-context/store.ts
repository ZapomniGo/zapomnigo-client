import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import someSlice from "./someSlice";
import navigationSlice from "./navigationSlice";

const store = configureStore({
  reducer: {
    someSliceReducer: someSlice,
    navigationReducer: navigationSlice
  },
});

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

const useAppDispatch: () => AppDispatch = useDispatch;
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export { store, useAppDispatch, useAppSelector };
//global api from which we call the slice