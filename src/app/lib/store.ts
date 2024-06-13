// storeConfig.ts
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";

import storage from "./storage";
import loginreducer from "./Reducers/loginreducer";
import cartReducer from "./Reducers/cartReducer";
const persistConfig = {
  key: "root",
  storage: storage,
};

const rootReducer = combineReducers({
  login: persistReducer(persistConfig, loginreducer),
  cart: cartReducer,
});

export const makeStore = () => {
  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: ["persist/PERSIST"],
        },
      }),
  });

  const persistor = persistStore(store);

  return { store, persistor };
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["store"]["getState"]>;
export type AppDispatch = AppStore["store"]["dispatch"];
