import { createStore } from "vuex";
import { user } from "./NhanVien.module";

const store = createStore({
    modules: {
        nhanvien: user,
    },
});
export default store;