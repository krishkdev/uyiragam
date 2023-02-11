import React, { useEffect, useState } from "react";
import Link from "next/link";
import { AiOutlineShopping } from "react-icons/ai";
import styles from "../styles/Navbar.module.css";
import { Cart } from './Cart';
import { useStateContext} from '../context/StateContext';

const Navbar = () => {
    const { showCart, setShowCart, totalQuantities } = useStateContext();
    const [cartQuantity, setCartQuantity] = useState(0); // To avoid React hydration error

    useEffect(() => setCartQuantity(totalQuantities), [totalQuantities]);
  return (
    <div className={styles.navbar_container}>
      <p className={styles.logo}>
        <Link href="/">Uyiragam</Link>
      </p>

      <button type="button" className={styles.cart_icon} onClick={() => setShowCart(!showCart)}>
        <AiOutlineShopping />
        <span className={styles.cart_item_qty}>{cartQuantity}</span>
      </button>

      {showCart && <Cart />}
    </div>
  );
};

export default Navbar;
