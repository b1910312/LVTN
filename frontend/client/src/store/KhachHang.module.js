import http from "../common/http";
import { handle } from "../common/promise";

const state = {
    khachhang: {
        TKKH_MaKH: String,
        TKKH_Ten: String,
        TKKH_Email: String,
        TKKH_MatKhau: String,
        TKKH_HangMuc: String,
        TKKH_TrangThai: Number,
        TKKH_Logined: Boolean
    },
    statusEmployee: {
        loggedInkhachhang: Boolean
    }
};
const mutations = {
    //employee
    initEmployeeState(state) {
        state.khachhang = JSON.parse(localStorage.getItem("khachhang"));
        state.statusEmployee.loggedInkhachhang = !!state.khachhang;
    },
    loginEmployee(state, khachhang) {
        state.statusEmployee.loggedInkhachhang = true;
        state.khachhang = khachhang;
        localStorage.setItem("khachhang", JSON.stringify(khachhang));
    },
    logoutEmployee(state) {
        state.statusEmployee.loggedInkhachhang = false;
        state.khachhang = null;
        localStorage.removeItem("khachhang");
    },
    clearLoginStatusEmployee(state) {
        state.status.loggedInkhachhang = false;
    },
};
const actions = {
    async loginEmloyee({ commit }, khachhang) {
        console.log("Alo");
        let [error, response] = await handle(
            http.post("/khachhang/signin", {
                TKKH_MaKH: khachhang.TKKH_MaKH,
                TKKH_Email: khachhang.TKKH_Email,
                TKKH_MatKhau: khachhang.TKKH_MatKhau,
                TKKH_HangMuc: khachhang.TKKH_HangMuc,
                TKKH_Logined: khachhang.TKKH_Logined,
                TKKH_TrangThai: khachhang.TKKH_TrangThai
            })
        );
        if (error || !response.data.accessToken) {
            commit("logoutEmployee");
            if (!error) {
                error = new Error("Whoops, no access token found!");
            }
            throw error;
        }
        commit("loginEmployee", response.data);
        return response.data;
    },
};
const getters = {
  
    khachhangLoggedIn(state) {
        return state.statusEmployee.loggedInkhachhang;
    },
    loggedInkhachhang(state) {
        return state.khachhang;
    }
};
export const user = {
    state,
    mutations,
    actions,
    getters
};
