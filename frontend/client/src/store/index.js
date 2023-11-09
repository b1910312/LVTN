import { createStore } from "vuex";
import { user } from "./KhachHang.module";

const store = createStore({
    modules: {
        khachhang: user,
    },
});
export default store;