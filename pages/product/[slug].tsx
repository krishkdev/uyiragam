import React from "react";
//Types import
import { GetStaticPaths, GetStaticProps } from 'next'
import { ParsedUrlQuery } from 'querystring'
//Utils import
import { client, urlFor } from "../../lib/client";
import { ProductType } from "@/models/Product";
//Assets import
import Image from "next/image";
import styles from "../../styles/ProductDetail.module.css";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiFillStar,
  AiOutlineStar,
} from "react-icons/ai";
import { useStateContext } from "@/context/StateContext";
import Product from "@/components/Product";

interface IParams extends ParsedUrlQuery {
  slug: string
}

interface ProductTypes {
  product: ProductType;
  products: ProductType[];
}

const ProductDetails = ({ product, products }: ProductTypes) => {
  const { image, name, details, price } = product;
  const { decQty, incQty, qty, onAdd, setShowCart } = useStateContext();
  const src = urlFor(image && image[0]).url();

  const handleBuyNow = () => {
    onAdd(product, qty);
    setShowCart(true);
  }
  //console.log(product);
  return (
    <div>
      <div className={styles.product_detail_container}>
        <div>
          <div className={styles.image_container}>
            <Image
              loader={() => src}
              src={src}
              className={styles.product_detail_image}
              alt="prod-detail"
              width={150}
              height={150}
            />
          </div>
        </div>
        <div className={styles.product_detail_desc}>
          <h1>{name}</h1>
          <div className={styles.reviews}>
            {/* <div>
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
            </div>
            <p>(20)</p> */}
          </div>
          <h4>Details: </h4>
          <p>{details}</p>
          <p className={styles.price}>
            ₹{price} <span className={styles.card_price_old}>{price + 50}</span>
          </p>
          

          <div className={styles.quantity}>
            <h3>Quantity:</h3>
            <p className={styles.quantity_desc}>
              <span className={styles.minus} onClick={decQty} ><AiOutlineMinus /></span>
              <span className={styles.num}>{qty}</span>
              <span className={styles.plus}  onClick={incQty} ><AiOutlinePlus /></span>
            </p>
            </div>
            <div className={styles.buttons}>
            <button type="button" className={styles.add_to_cart} onClick={() =>onAdd(product,qty)} >Add to Cart</button>
            <button type="button" className={styles.buy_now} onClick={handleBuyNow}>Buy Now</button>
          </div>

        </div>
      </div>
      <div className={styles.maylike_products_wrapper}>
          <h2>You may also like</h2><div className = "line"></div>
          <div className={styles.marquee}>
            <div className={`${styles.maylike_products_container} ${styles.track}`}>
              {products?.map((item) => (
                <Product key={item._id} {...item} />
              ))}
            </div>
          </div>
      </div>
    </div>
  );
};

export const getStaticPaths : GetStaticPaths = async () => {
  const query = `*[_type == "product"] {
    slug {
      current
    }
  }
  `;

  const products = await client.fetch(query);
  const paths = products.map((product: ProductType) => ({
    params: {
      slug: product.slug.current,
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps : GetStaticProps = async (context) => {
  const { slug } = context.params as IParams;
  const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
  //console.log(slug);
  const productsQuery = '*[_type == "product"]';

  const product = await client.fetch(query);
  const products = await client.fetch(productsQuery);

  return {
    props: { products, product },
  };
};

export default ProductDetails;
