import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Hadith } from '@/types/api';

interface FavoritesState {
  favorites: Hadith[];
  addFavorite: (hadith: Hadith) => void;
  removeFavorite: (id: number) => void;
  isFavorite: (id: number) => boolean;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],
      addFavorite: (hadith) => set((state) => ({
        favorites: [...state.favorites, hadith],
      })),
      removeFavorite: (id) => set((state) => ({
        favorites: state.favorites.filter((h) => h.id !== id),
      })),
      isFavorite: (id) => get().favorites.some((h) => h.id === id),
    }),
    {
      name: 'favorites-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);