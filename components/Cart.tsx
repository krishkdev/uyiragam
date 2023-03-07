import React, { useRef, useState } from "react";
import Link from "next/link";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineLeft,
  AiOutlineShopping,
  AiOutlineDelete,
} from "react-icons/ai";
import styles from "../styles/Cart.module.css";
import { useStateContext } from "../context/StateContext";
import { urlFor } from "../lib/client";
import { CartItem } from "@/models/CartItem";
import Image from "next/image";
import { useRouter } from "next/router";

export const Cart = () => {
  const router = useRouter();
  const cartRef = useRef<HTMLElement>();
  const {
    totalPrice,
    totalQuantities,
    cartItems,
    setShowCart,
    toggleCartItemQuanitity,
    onRemove,
  } = useStateContext();
  return (
    <div
      className={styles.cart_wrapper}
      ref={cartRef as React.RefObject<HTMLDivElement>}
    >
      <div className={styles.cart_container}>
        <button
          type="button"
          className={styles.cart_heading}
          onClick={() => setShowCart(false)}
        >
          <AiOutlineLeft />
          <span className={styles.heading}>Your Cart</span>
          <span className={styles.cart_num_items}>
            ({totalQuantities} items)
          </span>
        </button>

        {/* If no items are present */}
        {cartItems.length < 1 && (
          <div className={styles.empty_cart}>
            <AiOutlineShopping size={150} />
            <h3>Your shopping bag is empty</h3>
            <Link href="/">
              <button
                type="button"
                onClick={() => setShowCart(false)}
                className={styles.btn}
              >
                Continue Shopping
              </button>
            </Link>
          </div>
        )}
        {/* If items are present */}
        <div className={styles.product_container}>
          {cartItems.length >= 1 &&
            cartItems?.map((item: CartItem) => {
              const src = urlFor(item?.image[0]).url();
              return (
                <div className={styles.product} key={item._id}>
                  <Image
                    loader={() => src}
                    src={src}
                    className={styles.cart_product_image}
                    alt="cart-img"
                    width={200}
                    height={200}
                  />
                  <div className={styles.item_desc}>
                    <div className={`${styles.flex} ${styles.top}`}>
                      <h5>{item.name}</h5>
                      <h4>₹ {item.price}</h4>
                    </div>
                    <div className={`${styles.flex} ${styles.bottom}`}>
                      <div>
                        <p className={styles.quantity_desc}>
                          <span
                            className={styles.minus}
                            onClick={() =>
                              toggleCartItemQuanitity(item._id, "dec")
                            }
                          >
                            <AiOutlineMinus />
                          </span>
                          <span className={styles.num}>{item.quantity}</span>
                          <span
                            className={styles.plus}
                            onClick={() =>
                              toggleCartItemQuanitity(item._id, "inc")
                            }
                          >
                            <AiOutlinePlus />
                          </span>
                        </p>
                      </div>
                      <button
                        type="button"
                        className={styles.remove_item}
                        onClick={() => onRemove(item)}
                      >
                        <AiOutlineDelete />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
        {/* Cart Bottom */}
        {cartItems.length >= 1 && (
          <div className={styles.cart_bottom}>
            <div className={styles.total}>
              <h3>Subtotal:</h3>
              <h3>₹ {totalPrice}</h3>
            </div>
            <div className={styles.btn_container}>
              <button
                type="button"
                className={styles.btn}
                onClick={() => {
                  router.push("/checkout");
                  setShowCart(false);
                }}
              >
                Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
