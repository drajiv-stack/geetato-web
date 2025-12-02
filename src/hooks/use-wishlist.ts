"use client"

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface Product {
  id: number
  name: string
  category: string
  image: string
  price: string
  badge: string
}

interface WishlistStore {
  items: Product[]
  addItem: (product: Product) => void
  removeItem: (productId: number) => void
  isInWishlist: (productId: number) => boolean
  clearWishlist: () => void
}

export const useWishlist = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product) => {
        const { items } = get()
        if (!items.find(item => item.id === product.id)) {
          set({ items: [...items, product] })
        }
      },
      removeItem: (productId) => {
        set({ items: get().items.filter(item => item.id !== productId) })
      },
      isInWishlist: (productId) => {
        return get().items.some(item => item.id === productId)
      },
      clearWishlist: () => {
        set({ items: [] })
      }
    }),
    {
      name: 'geetato-wishlist'
    }
  )
)
