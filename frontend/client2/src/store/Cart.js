// Trong file store/modules/cart.js
import http from "../common/http";
import { handle } from "../common/promise";

const state = {
    productsThanhToan: [],
};

const mutations = {
    setProductsThanhToan(state, products) {
        state.productsThanhToan = products;
    },
};

const actions = {
    updateProductsThanhToan({ commit }, products) {
        commit('setProductsThanhToan', products);
    },
};

const getters = {
    getProductsThanhToan: (state) => state.productsThanhToan,
};

export const cart = {
    state,
    mutations,
    actions,
    getters
};
