import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    uid: '',
    username: '',
    email: '',
  }),

  actions: {
    setUserInfo(payload: { token: string; uid: string; username: string; email: string }) {
      this.uid = payload.uid;
      this.username = payload.username;
      this.email = payload.email;
    },

    clearUserInfo() {
      this.uid = '';
      this.username = '';
      this.email = '';
    }
  }
});
