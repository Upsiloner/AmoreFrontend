import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    uid: '',
    username: '',
    email: '',
    gender: 0,
    bio: '',
    points: 0,
    avatar: '',
  }),

  actions: {
    setUserInfo(payload: { 
      uid: string; 
      username: string; 
      email: string;
      gender: number,
      bio: string,
      points: number,
      avatar: string,
    }) {
      this.uid = payload.uid;
      this.username = payload.username;
      this.email = payload.email;
      this.gender = payload.gender;
      this.bio = payload.bio;
      this.points = payload.points;
      this.avatar = payload.avatar;
    },

    clearUserInfo() {
      this.uid = '';
      this.username = '';
      this.email = '';
      this.gender = 0;
      this.bio = '';
      this.points = 0;
      this.avatar = '';
    }
  }
});
