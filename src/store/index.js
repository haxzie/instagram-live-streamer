import { createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import InstagramUser from "./User/reducers";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, InstagramUser);

let store = createStore(persistedReducer);
let persistor = persistStore(store);
export { store, persistor };
