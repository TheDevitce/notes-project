import { defineStore } from 'pinia';

export const useAuthData = defineStore('useAuthData', {
  state: () => ({
    name: 'Edu',
  }),
});