import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { BsBagCheckFill } from 'react-icons/bs';
import styles from '../styles/Success.module.css'
import { useStateContext } from '../context/StateContext';

const Success = () => {
  const { setCartItems, setTotalPrice, setTotalQuantities } = useStateContext();
  
  useEffect(() => {
    localStorage.clear();
    setCartItems([]);
    setTotalPrice(0);
    setTotalQuantities(0);
  }, []);

  return (
    <div className={styles.success_wrapper}>
      <div className={styles.success}>
        <p className={styles.icon}>
          <BsBagCheckFill />
        </p>
        <h2>Thank you for your order!</h2>
        <p className={styles.email_msg}>Check your email inbox for the receipt.</p>
        <p className={styles.description}>
          If you have any questions, please email
          <a className={styles.email} href="krishkumarv2001@gmail.com">
          krishkumarv2001@gmail.com
          </a>
        </p>
        <Link href="/">
          <button type="button" className={styles.btn}>
            Continue Shopping
          </button>
        </Link>
      </div>
    </div>
  )
}

export default Success


