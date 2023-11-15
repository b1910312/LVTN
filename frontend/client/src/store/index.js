import { createStore } from "vuex";
import { user } from "./KhachHang.module";
import { cart } from "./Cart";

const store = createStore({
    modules: {
        khachhang: user,
        Cart: cart
    },
});
export default store;