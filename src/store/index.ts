import { combineReducers, configureStore } from "@reduxjs/toolkit";
// ...
import globalReducer from "./slice/globalSlice";
import userSlice from "./slice/userSlice";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import orderSlice from "./slice/orderSlice";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  blacklist: ['user']
};

const rootReducer = combineReducers({
  global: globalReducer,
  user: userSlice,
  order: orderSlice
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

const persistor = persistStore(store);
export { store, persistor };

// export const store = configureStore({
//   reducer: {
//     global: globalReducer,
//     user: userSlice
//   },
// })

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
