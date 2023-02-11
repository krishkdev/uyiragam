import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import { Inter } from "@next/font/google";
import { client } from "../lib/client";
import Product from "../components/Product";
import { ProductType } from "@/models/Product";
const inter = Inter({ subsets: ["latin"] });

interface HomeProps {
  products: ProductType[];
}

export default function Home({ products }: HomeProps): JSX.Element {
  return (
    <div className="root_container">
      {/* code starts here */}
        <section className="product">
          <div className="product_section_title">Our Products <hr/></div>
          <div className="container">
            <div className="grid">
              {products?.map((product: ProductType) => (
                <Product key={product._id} {...product} />
              ))}
            </div>
          </div>
        </section>
    </div>
  );
}

export const getServerSideProps = async () => {
  const query = '*[_type == "product"]';
  const products = await client.fetch(query);

  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);

  return {
    props: { products, bannerData },
  };
};
