import { createSlice } from "@reduxjs/toolkit"

const loadCartFromStorage = () => {
    try {
        const serializedCart = localStorage.getItem("cart")
        if (serializedCart === null) {
            return {
                items: [],
                totalQuantity: 0,
                totalAmount: 0,
                isOpen: false,
            }
        }
        return JSON.parse(serializedCart)
    } catch (err) {
        return {
            items: [],
            totalQuantity: 0,
            totalAmount: 0,
            isOpen: false,
            err
        }
    }
}

const saveCartToStorage = (state) => {
    try {
        const serializedCart = JSON.stringify({
            items: state.items,
            totalQuantity: state.totalQuantity,
            totalAmount: state.totalAmount,
            isOpen: false, // Don't persist cart open state
        })
        localStorage.setItem("cart", serializedCart)
    } catch (err) {
        // Ignore write errors
        console.log(err);
    }
}

const initialState = loadCartFromStorage()

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const { product, variant, quantity = 1 } = action.payload
            const cartItemId = `${product._id}-${variant.weight}`

            const existingItem = state.items.find((item) => item.id === cartItemId)

            if (existingItem) {
                existingItem.quantity += quantity
                existingItem.totalPrice = existingItem.quantity * existingItem.price
            } else {
                state.items.push({
                    id: cartItemId,
                    productId: product._id,
                    name: product.name,
                    image: product.image,
                    price: variant.price,
                    weight: variant.weight,
                    quantity,
                    totalPrice: variant.price * quantity,
                })
            }

            cartSlice.caseReducers.calculateTotals(state)
            saveCartToStorage(state)
        },

        removeFromCart: (state, action) => {
            const itemId = action.payload
            state.items = state.items.filter((item) => item.id !== itemId)
            cartSlice.caseReducers.calculateTotals(state)
            saveCartToStorage(state)
        },

        updateQuantity: (state, action) => {
            const { itemId, quantity } = action.payload
            const item = state.items.find((item) => item.id === itemId)

            if (item && quantity > 0) {
                item.quantity = quantity
                item.totalPrice = item.price * quantity
                cartSlice.caseReducers.calculateTotals(state)
                saveCartToStorage(state)
            }
        },

        clearCart: (state) => {
            state.items = []
            state.totalQuantity = 0
            state.totalAmount = 0
            saveCartToStorage(state)
        },

        toggleCart: (state) => {
            state.isOpen = !state.isOpen
            // Note: Don't save isOpen state to localStorage
        },

        calculateTotals: (state) => {
            state.totalQuantity = state.items.reduce((total, item) => total + item.quantity, 0)
            state.totalAmount = state.items.reduce((total, item) => total + item.totalPrice, 0)
        },
    },
})

export const { addToCart, removeFromCart, updateQuantity, clearCart, toggleCart } = cartSlice.actions

// Selectors
export const selectCartItems = (state) => state.cart.items
export const selectCartTotalQuantity = (state) => state.cart.totalQuantity
export const selectCartTotalAmount = (state) => state.cart.totalAmount
export const selectCartIsOpen = (state) => state.cart.isOpen
export const selectCartItemById = (state, itemId) => state.cart.items.find((item) => item.id === itemId)

export default cartSlice.reducer
