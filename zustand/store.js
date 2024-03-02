import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useStore = create(
  persist(
    (set) => ({
      mobile: false,
      loginUser: null,
      userCredential: null,
      selectedChatroom: null,
      toggleMobile: () => set((state) => ({ mobile: !state.mobile })), 
      setMobile: (newMobile) => set(() => ({ mobile: newMobile })),
      setLoginUser: (newLoginUser) => set(() => ({ loginUser: newLoginUser })),
      setUserCredential: (newUserCredential) => set(() => ({ userCredential: newUserCredential })),
      setSelectedChatroom: (newSelectedChatroom) => set(() => ({ selectedChatroom: newSelectedChatroom })),
    }),
    {
      // name of the item in the storage (must be unique)
      name: "chat2chat", 
      // (optional) by default, 'localStorage' is used
      // storage: createJSONStorage(() => sessionStorage), 
    }
  )
);
