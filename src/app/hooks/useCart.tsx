"use client";
import React, {
  useReducer,
  createContext,
  useContext,
  ReactNode,
  useEffect,
} from "react";

type CartLengthAction = { type: "UPDATE_LENGTH"; length: number };

interface CartContextProps {
  length: number;
  dispatchLength: React.Dispatch<CartLengthAction>;
}

const CartLengthContext = createContext<CartContextProps | undefined>(
  undefined,
);

const lengthReducer = (state: number, action: CartLengthAction): number => {
  switch (action.type) {
    case "UPDATE_LENGTH":
      return action.length;
    default:
      console.error("Error in Length Reducer");
      return state;
  }
};

export const CartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [length, dispatchLength] = useReducer(lengthReducer, 0);

  useEffect(() => {
    // You can perform any side effect here if needed
  }, [length]);

  return (
    <CartLengthContext.Provider value={{ length, dispatchLength }}>
      {children}
    </CartLengthContext.Provider>
  );
};

export const useCartLength = (): CartContextProps => {
  const context = useContext(CartLengthContext);
  if (!context) {
    throw new Error("useCartLength must be used within a CartProvider");
  }
  return context;
};
