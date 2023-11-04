import http from "../common/http";
import { handle } from "../common/promise";

const state = {
    nhanvien: {
        TKNV_MaNV: String,
        TKNV_Ten: String,
        TKNV_MatKhau: String,
        TKNV_VaiTro: String,
        TKNV_TrangThai: Number,
        TKNV_Logined: Boolean
    },
    statusEmployee: {
        loggedInNhanVien: Boolean
    }
};
const mutations = {
    //employee
    initEmployeeState(state) {
        state.nhanvien = JSON.parse(localStorage.getItem("nhanvien"));
        state.statusEmployee.loggedInNhanVien = !!state.nhanvien;
    },
    loginEmployee(state, nhanvien) {
        state.statusEmployee.loggedInNhanVien = true;
        state.nhanvien = nhanvien;
        localStorage.setItem("nhanvien", JSON.stringify(nhanvien));
    },
    logoutEmployee(state) {
        state.statusEmployee.loggedInNhanVien = false;
        state.nhanvien = null;
        localStorage.removeItem("nhanvien");
    },
    clearLoginStatusEmployee(state) {
        state.status.loggedInNhanVien = false;
    },
};
const actions = {
    async loginEmloyee({ commit }, nhanvien) {
        console.log("Alo");
        let [error, response] = await handle(
            http.post("/nhanvien/signin", {
                TKNV_MaNV: nhanvien.TKNV_MaNV,
                TKNV_MatKhau: nhanvien.TKNV_MatKhau,
                TKNV_VaiTro: nhanvien.TKNV_VaiTro,
                TKNV_Logined: nhanvien.TKNV_Logined,
                TKNV_TrangThai: nhanvien.TKNV_TrangThai
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
  
    nhanvienLoggedIn(state) {
        return state.statusEmployee.loggedInNhanVien;
    },
    loggedInNhanVien(state) {
        return state.nhanvien;
    }
};
export const user = {
    state,
    mutations,
    actions,
    getters
};
