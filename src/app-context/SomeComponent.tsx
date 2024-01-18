import { reducer2 } from "./someSlice";
import { useAppDispatch, useAppSelector } from "./store";

export const SomeComponent = () => {
  const someSliceManager = useAppSelector((state) => state.someSliceReducer);
  const dispatch = useAppDispatch();

  const handleOnClick = () => {
    dispatch(reducer2({ someProp1: true }));
  };

  return <div onClick={handleOnClick}>{someSliceManager.someProp1}</div>;
};
