import { create } from 'zustand'

export type SortOption =
  | 'recent'
  | 'price-asc'
  | 'price-desc'
  | 'name-asc'
  | 'name-desc'

export type SizeOption = 'XXS' | 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL'

export interface Product {
  id: string
  name: string
  brand: string
  price: number
  currency: string
  size: SizeOption
  color: string
  image: string
  itemsLeft: number
  addedAt: string
  isNewArrival: boolean
}

export interface Filters {
  searchText: string
  brands: string[]
  colors: string[]
  sizes: SizeOption[]
  minPrice: number
  maxPrice: number
  sortBy: SortOption
}

export interface CartItem {
  productId: string
  quantity: number
}

export interface CartLine {
  product: Product
  quantity: number
  subtotal: number
}

interface ShopState {
  products: Product[]
  filters: Filters
  likes: string[]
  cart: CartItem[]
  isCartOpen: boolean
  isMobileFilterOpen: boolean
  readonly minCatalogPrice: number
  readonly maxCatalogPrice: number
  brandFilterQuery: string
  expandedSections: Record<'brand' | 'price' | 'size' | 'color', boolean>
  viewMode: 'grid' | 'list'
  setSearchText: (value: string) => void
  toggleBrand: (brand: string) => void
  setPriceRange: (min: number, max: number) => void
  toggleColor: (color: string) => void
  toggleSize: (size: SizeOption) => void
  setSortBy: (sort: SortOption) => void
  resetFilters: () => void
  toggleLike: (productId: string) => void
  addToCart: (productId: string) => void
  incrementCartItem: (productId: string) => void
  decrementCartItem: (productId: string) => void
  removeFromCart: (productId: string) => void
  clearCart: () => void
  setCartOpen: (open: boolean) => void
  setMobileFilterOpen: (open: boolean) => void
  setBrandFilterQuery: (value: string) => void
  toggleSection: (section: keyof ShopState['expandedSections']) => void
  setViewMode: (mode: 'grid' | 'list') => void
}

const DISPLAY_MIN_PRICE = 1
const DISPLAY_MAX_PRICE = 300000

const productData: Product[] = [
  {
    id: 'uniqlo-soft-shirt',
    name: 'Shirt Soft Cotton',
    brand: 'Uniqlo',
    price: 40000,
    currency: 'SAR',
    size: 'M',
    color: 'Pebble Gray',
    image:
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=700&q=80',
    itemsLeft: 12,
    addedAt: '2025-02-11T09:00:00Z',
    isNewArrival: true,
  },
  {
    id: 'uniqlo-zip-neck',
    name: 'Zip Up Neck Shirt',
    brand: 'Uniqlo',
    price: 42000,
    currency: 'SAR',
    size: 'L',
    color: 'Mist Gray',
    image:
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=700&q=80',
    itemsLeft: 8,
    addedAt: '2025-02-13T10:00:00Z',
    isNewArrival: true,
  },
  {
    id: 'uniqlo-long-sleeve',
    name: 'Classic Long Sleeve',
    brand: 'Uniqlo',
    price: 41000,
    currency: 'SAR',
    size: 'L',
    color: 'Slate Gray',
    image:
      'data:image/jpeg;base64,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',
    itemsLeft: 5,
    addedAt: '2025-02-05T08:00:00Z',
    isNewArrival: false,
  },
  {
    id: 'nike-dry-fit',
    name: 'Dry Fit Tee',
    brand: 'Nike',
    price: 43050,
    currency: 'SAR',
    size: 'S',
    color: 'Pearl White',
    image:
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=80',
    itemsLeft: 9,
    addedAt: '2025-01-29T07:30:00Z',
    isNewArrival: true,
  },
  {
    id: 'adidas-relaxed-tee',
    name: 'Relaxed Fit Tee',
    brand: 'Adidas',
    price: 40050,
    currency: 'SAR',
    size: 'M',
    color: 'Sand Beige',
    image:
      'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=700&q=80',
    itemsLeft: 15,
    addedAt: '2025-02-01T11:15:00Z',
    isNewArrival: false,
  },
  {
    id: 'new-balance-crew',
    name: 'Athletic Crew Shirt',
    brand: 'New Balance',
    price: 45050,
    currency: 'SAR',
    size: 'XL',
    color: 'Charcoal',
    image:
      'data:image/jpeg;base64,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',
    itemsLeft: 6,
    addedAt: '2025-02-15T12:00:00Z',
    isNewArrival: true,
  },
  {
    id: 'apple-air-tee',
    name: 'Air Tee',
    brand: 'Apple',
    price: 48000,
    currency: 'SAR',
    size: 'M',
    color: 'Frost White',
    image:
      'https://images.unsplash.com/photo-1522444195799-478538b28823?auto=format&fit=crop&w=700&q=80',
    itemsLeft: 3,
    addedAt: '2025-02-18T15:45:00Z',
    isNewArrival: true,
  },
  {
    id: 'puma-active',
    name: 'Active Essentials Tee',
    brand: 'Puma',
    price: 39800,
    currency: 'SAR',
    size: 'S',
    color: 'Ocean Blue',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8623Lg6KAvX9fX97Pa4VTqCRHOndp-gwHnA&s',
    itemsLeft: 18,
    addedAt: '2025-02-03T09:30:00Z',
    isNewArrival: false,
  },
  {
    id: 'nike-polo',
    name: 'Heritage Polo',
    brand: 'Nike',
    price: 44075,
    currency: 'SAR',
    size: 'L',
    color: 'Olive Green',
    image:
      'https://images.unsplash.com/photo-1521412644187-c49fa049e84d?auto=format&fit=crop&w=700&q=80',
    itemsLeft: 11,
    addedAt: '2025-02-09T14:20:00Z',
    isNewArrival: false,
  },
  {
    id: 'uniqlo-pique',
    name: 'Pique Polo',
    brand: 'Uniqlo',
    price: 40080,
    currency: 'SAR',
    size: 'XL',
    color: 'Soft Blue',
    image:
      'https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0?auto=format&fit=crop&w=700&q=80',
    itemsLeft: 7,
    addedAt: '2025-02-12T13:00:00Z',
    isNewArrival: true,
  },
]
const minCatalogPrice = Math.min(
  DISPLAY_MIN_PRICE,
  ...productData.map((product) => product.price),
)

const maxCatalogPrice = Math.max(
  DISPLAY_MAX_PRICE,
  ...productData.map((product) => product.price),
)

const toggleValue = <T extends string>(collection: T[], value: T) =>
  collection.includes(value)
    ? collection.filter((item) => item !== value)
    : [...collection, value]

const sortProducts = (items: Product[], sortBy: SortOption): Product[] => {
  const copy = [...items]

  switch (sortBy) {
    case 'recent':
      return copy.sort(
        (a, b) => new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime(),
      )
    case 'price-asc':
      return copy.sort((a, b) => a.price - b.price)
    case 'price-desc':
      return copy.sort((a, b) => b.price - a.price)
    case 'name-asc':
      return copy.sort((a, b) => a.name.localeCompare(b.name))
    case 'name-desc':
      return copy.sort((a, b) => b.name.localeCompare(a.name))
    default:
      return copy
  }
}

export const useShopStore = create<ShopState>((set) => ({
  products: productData,
  filters: {
    searchText: '',
    brands: [],
    colors: [],
    sizes: [],
    minPrice: minCatalogPrice,
    maxPrice: maxCatalogPrice,
    sortBy: 'recent',
  },
  likes: [],
  cart: [],
  isCartOpen: false,
  isMobileFilterOpen: false,
  minCatalogPrice,
  maxCatalogPrice,
  brandFilterQuery: '',
  expandedSections: {
    brand: true,
    price: true,
    size: true,
    color: true,
  },
  viewMode: 'grid',
  setSearchText: (value) =>
    set((state) => ({
      filters: { ...state.filters, searchText: value },
    })),
  toggleBrand: (brand) =>
    set((state) => ({
      filters: { ...state.filters, brands: toggleValue(state.filters.brands, brand) },
    })),
  setPriceRange: (min, max) =>
    set((state) => ({
      filters: {
        ...state.filters,
        minPrice: Math.max(minCatalogPrice, Math.min(min, max)),
        maxPrice: Math.min(maxCatalogPrice, Math.max(min, max)),
      },
    })),
  toggleColor: (color) =>
    set((state) => ({
      filters: { ...state.filters, colors: toggleValue(state.filters.colors, color) },
    })),
  toggleSize: (size) =>
    set((state) => ({
      filters: { ...state.filters, sizes: toggleValue(state.filters.sizes, size) },
    })),
  setSortBy: (sortBy) =>
    set((state) => ({
      filters: { ...state.filters, sortBy },
    })),
  resetFilters: () =>
    set(() => ({
      filters: {
        searchText: '',
        brands: [],
        colors: [],
        sizes: [],
        minPrice: minCatalogPrice,
        maxPrice: maxCatalogPrice,
        sortBy: 'recent',
      },
      brandFilterQuery: '',
    })),
  toggleLike: (productId) =>
    set((state) => ({
      likes: toggleValue(state.likes, productId),
    })),
  addToCart: (productId) =>
    set((state) => {
      const existing = state.cart.find((line) => line.productId === productId)

      if (existing) {
        return {
          cart: state.cart.map((line) =>
            line.productId === productId
              ? { ...line, quantity: line.quantity + 1 }
              : line,
          ),
          isCartOpen: true,
        }
      }

      return {
        cart: [...state.cart, { productId, quantity: 1 }],
        isCartOpen: true,
      }
    }),
  incrementCartItem: (productId) =>
    set((state) => ({
      cart: state.cart.map((line) =>
        line.productId === productId
          ? { ...line, quantity: line.quantity + 1 }
          : line,
      ),
    })),
  decrementCartItem: (productId) =>
    set((state) => ({
      cart: state.cart
        .map((line) =>
          line.productId === productId
            ? { ...line, quantity: line.quantity - 1 }
            : line,
        )
        .filter((line) => line.quantity > 0),
    })),
  removeFromCart: (productId) =>
    set((state) => ({
      cart: state.cart.filter((line) => line.productId !== productId),
    })),
  clearCart: () =>
    set(() => ({
      cart: [],
    })),
  setCartOpen: (open) => set({ isCartOpen: open }),
  setMobileFilterOpen: (open) => set({ isMobileFilterOpen: open }),
  setBrandFilterQuery: (value) => set({ brandFilterQuery: value }),
  toggleSection: (section) =>
    set((state) => ({
      expandedSections: {
        ...state.expandedSections,
        [section]: !state.expandedSections[section],
      },
    })),
  setViewMode: (mode) => set({ viewMode: mode }),
}))

export const computeFilteredProducts = (products: Product[], filters: Filters): Product[] => {
  const filtered = products.filter((product) => {
    const matchesSearch = filters.searchText
      ? product.name.toLowerCase().includes(filters.searchText.toLowerCase()) ||
        product.brand.toLowerCase().includes(filters.searchText.toLowerCase())
      : true

    const matchesBrand = filters.brands.length === 0 || filters.brands.includes(product.brand)
    const matchesColor = filters.colors.length === 0 || filters.colors.includes(product.color)
    const matchesSize = filters.sizes.length === 0 || filters.sizes.includes(product.size)
    const matchesPrice = product.price >= filters.minPrice && product.price <= filters.maxPrice

    return matchesSearch && matchesBrand && matchesColor && matchesSize && matchesPrice
  })

  return sortProducts(filtered, filters.sortBy)
}

export const buildCartLines = (products: Product[], cart: CartItem[]): CartLine[] =>
  cart
    .map((line) => {
      const product = products.find((item) => item.id === line.productId)
      if (!product) {
        return undefined
      }

      return {
        product,
        quantity: line.quantity,
        subtotal: getProductPriceSar(product) * line.quantity,
      }
    })
    .filter((line): line is CartLine => Boolean(line))

export const computeCartSummary = (cartLines: CartLine[]) =>
  cartLines.reduce(
    (acc, line) => ({
      totalItems: acc.totalItems + line.quantity,
      totalPrice: acc.totalPrice + line.subtotal,
    }),
    { totalItems: 0, totalPrice: 0 },
  )

export const getProductPriceSar = (product: Product) => product.price / 100

export const formatSar = (value: number) =>
  new Intl.NumberFormat('en-SA', {
    style: 'currency',
    currency: 'SAR',
    minimumFractionDigits: 2,
  }).format(value)




