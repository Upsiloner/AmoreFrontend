import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    token: localStorage.getItem("token"),
    uid: '',
    username: '',
    email: '',
  }),

  actions: {
    setUserInfo(payload: { token: string; uid: string; username: string; email: string }) {
      this.token = payload.token;
      this.uid = payload.uid;
      this.username = payload.username;
      this.email = payload.email;

      localStorage.setItem("token", payload.token);
    },

    clearUserInfo() {
      this.token = '';
      this.uid = '';
      this.username = '';
      this.email = '';
      localStorage.removeItem("token");
    }
  }
});
