import {create} from 'zustand'

 export const useAuthStore= create((set)=>({
    user: JSON.parse(localStorage.getItem('user-info')) ?? null,
    login:(user)=>set({user}),
    logout:()=>set({user:null}),
    setUser:(user)=>set({user}),
}))

