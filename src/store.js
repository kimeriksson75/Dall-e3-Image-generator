// store.js
import { createStore } from "vuex";
const server = process.env.VUE_APP_API_BASE_URL || "http://localhost:3000";
const version = process.env.VUE_APP_VERSION || "v1";
export const store = createStore({
  state: {
    hasNavigation: false,
    user: localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null,
    isLoggedIn: !!localStorage.getItem("user"),
    previousImages: localStorage.getItem("previousImages")
      ? JSON.parse(localStorage.getItem("previousImages"))
      : [],
    devtools: process.env.NODE_ENV === "development",
  },

  mutations: {
    toggleNavigation(state, value = null) {
      console.log("value", value);
      state.hasNavigation = value ?? !state.hasNavigation;
    },
    login(state, user) {
      state.isLoggedIn = true;
      state.user = user;
      localStorage.setItem("user", JSON.stringify(user));
      console.log(`User ${user.username} has logged in`);
    },
    logout(state) {
      localStorage.removeItem("user");
      state.isLoggedIn = false;
      state.user = null;
    },
    createdUser(state, user) {
      state.isLoggedIn = false;
      state.user = null;
      console.log(`User ${user.username} has created an account`);
    },
    addToPreviousImages(state, image) {
      state.previousImages = [...state.previousImages, image];
      localStorage.setItem(
        "previousImages",
        JSON.stringify(state.previousImages)
      );
    },
    removeImage(state, image) {
      state.previousImages = state.previousImages.filter((i) => i !== image);
      localStorage.setItem(
        "previousImages",
        JSON.stringify(state.previousImages)
      );
    },
  },
  actions: {
    toggleNavigation({ commit }, value) {
      commit("toggleNavigation", value);
    },
    async loginUser({ commit }, user) {
      console.log({ user });
      try {
        const response = await fetch(`${server}/api/${version}/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        });
        const data = await response.json();
        if (response.ok) {
          commit("login", data);
          return response;
        } else {
          console.error(data);
          return data;
        }
      } catch (error) {
        return error;
      }
    },
    async createUser({ commit }, user) {
      try {
        const response = await fetch(`${server}/api/${version}/auth/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        });
        const data = await response.json();
        if (response.ok) {
          commit("createdUser", data);
          return response;
        } else {
          return data;
        }
      } catch (error) {
        return error;
      }
    },
    logoutUser({ commit }) {
      // Perform logout logic (if needed)
      // Upon logout, commit the 'logout' mutation
      commit("logout");
    },
    addImage({ commit }, image) {
      commit("addToPreviousImages", image);
    },
    removeImage({ commit }, image) {
      commit("removeImage", image);
    },
  },
  getters: {
    hasNavigation: (state) => state.hasNavigation,
    isLoggedIn: (state) => state.isLoggedIn,
    user: (state) => state.user,
    previousImages: (state) => state.previousImages,
  },
  methods: {},
});
