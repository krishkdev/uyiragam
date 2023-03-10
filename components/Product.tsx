import { urlFor } from "@/lib/client";
import { ProductType } from "@/models/Product";
import Image from "next/image";
import Link from "next/link";

import styles from "../styles/Product.module.css";
import React from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { useStateContext } from "@/context/StateContext";

const Product = (props: ProductType) => {
  const { _id, image, name, slug, price, details } = props;
  const { qty,onAdd, setShowCart } = useStateContext();
  const src = urlFor(image && image[0]).url();
  const handleBuyNow = () => {
    onAdd({...props}, qty);
    setShowCart(true);
  }
  const Truncate = (string: string, number: number) => {
    if (!string) {
      return null;
    }
    if (string.length <= number) {
      return string;
    }
    return string.slice(0, number) + "...";
  };
  return (
    <div className={styles.card}>
      <Link href={`/product/${slug.current}`}>
        <div className={styles.card_image}>
          <Image
            loader={() => src}
            src={src}
            width={150}
            height={150}
            alt={name}
          />
        </div>
        <div className={styles.card_body}>
          <h5 className={styles.card_title} title={name}>
            {Truncate(name, 25)}
          </h5>
          <p className={styles.card_description}>{Truncate(details, 65)}</p>
          <p className={styles.card_price}>
            <span className={styles.card_price_rupee}>₹</span>
            {price} <span className={styles.card_price_old}>{price + 50}</span>
          </p>
        </div>
      </Link>
      <div className={styles.card_buttons}>
        <div className={styles.buttons}>
          <button
            type="button"
            className={styles.add_to_cart}
            onClick={() => onAdd({...props}, qty)}
          >
            Add to Cart
          </button>
          <button type="button" className={styles.buy_now} onClick={handleBuyNow}>
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
