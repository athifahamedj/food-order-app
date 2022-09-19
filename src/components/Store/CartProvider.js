import React, { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCart = {
	items: [],
	totalAmount: 0,
};

const cartReducer = (state, action) => {
	if (action.type === "ADD") {
		// console.log(action.item);

		const updatedTotalAmount =
			state.totalAmount + action.item.price * action.item.amount;
		const existingCartItemIndex = state.items.findIndex(
			(item) => item.id === action.item.id
		);
		const existingCartItem = state.items[existingCartItemIndex];

		let updatedItems;
		if (existingCartItem) {
			// let updatedItem;
			const updatedItem = {
				...existingCartItem,
				amount: existingCartItem.amount + action.item.amount,
			};
			updatedItems = [...state.items];
			updatedItems[existingCartItemIndex] = updatedItem;
		} else {
			// updatedItems = [...action.item];
			updatedItems = state.items.concat(action.item);
		}
		// const UpdatedItems = state.items.concat(action.item);
		return {
			items: updatedItems,
			totalAmount: updatedTotalAmount,
		};
	}
	return defaultCart;
};
const CartProvider = (props) => {
	const [cartState, dispatchCart] = useReducer(cartReducer, defaultCart);
	const addItemToCartHandler = (item) => {
		dispatchCart({ type: "ADD", item: item });
	};
	const removeItemFromCartHandler = (id) => {
		dispatchCart({ type: "REMOVE", id: id });
	};
	const cartContext = {
		items: cartState.items,
		totalAmount: cartState.totalAmount,
		addItem: addItemToCartHandler,
		removeItem: removeItemFromCartHandler,
	};
	return (
		<CartContext.Provider value={cartContext}>
			{props.children}
		</CartContext.Provider>
	);
};

export default CartProvider;
