import { createStore } from "redux";
import InstagramUser from "./User/reducers";

const store = createStore(InstagramUser);

export default store;