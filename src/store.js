// store.js
import { createStore } from "vuex";
const apiURL = "http://192.168.0.121:3000/api/v1";
export const store = createStore({
  state: {
    isLoggedIn: false,
    user: null,
    previousImages: localStorage.getItem("previousImages")
      ? JSON.parse(localStorage.getItem("previousImages"))
      : [],
    devtools: process.env.NODE_ENV === "development",
  },
  mutations: {
    login(state, user) {
      state.isLoggedIn = true;
      state.user = user;
      console.log(`User ${user.username} has logged in`);
    },
    logout(state) {
      state.isLoggedIn = false;
      state.user = null;
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
    async loginUser({ commit }, user) {
      console.log({ user });
      try {
        const response = await fetch(`${apiURL}/auth`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        });
        const data = await response.json();
        console.log(response);
        if (response.ok) {
          commit("login", data);
        } else {
          console.error(data);
        }
      } catch (error) {
        console.error(error);
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
    isLoggedIn: (state) => state.isLoggedIn,
    user: (state) => state.user,
    previousImages: (state) => state.previousImages,
  },
  methods: {},
});