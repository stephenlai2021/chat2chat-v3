import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useStore = create(
  persist(
    (set) => ({
      mobile: false,
      userDataStore: null,
      loginUser: null,
      userCredential: null,
      selectedChatroom: null,
      toggleMobile: () => set((state) => ({ mobile: !state.mobile })), 
      setMobile: (newMobile) => set(() => ({ mobile: newMobile })),
      setUserDataStore: (newUserDataStore) => set(() => ({ userDataStore: newUserDataStore })),
      setLoginUser: (newLoginUser) => set(() => ({ loginUser: newLoginUser })),
      setUserCredential: (newUserCredential) => set(() => ({ userCredential: newUserCredential })),
      setSelectedChatroom: (newSelectedChatroom) => set(() => ({ selectedChatroom: newSelectedChatroom })),
    }),
    {
      name: "chat2chat", // localstorage
    }
  )
);
