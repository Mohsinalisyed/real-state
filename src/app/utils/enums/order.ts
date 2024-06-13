export enum OrderStatus {
  CONFIRMED = "CONFIRMED",
  PENDING = "PENDING",
  PROCESSING = "PROCESSING",
  READY_TO_SHIP = "READY_TO_SHIP",
  REFUNDED = "REFUNDED",
  SHIPPED = "SHIPPED",
  INVOICE = "INVOICE",
  CANCELLED = "CANCELLED",
  DELIVERED = "DELIVERED",
}
export enum OrderType {
  CART = "add_to_cart",
  BUY_NOW = "buy",
}
