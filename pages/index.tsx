import { useEffect, useState } from "react";
import { Inter } from "@next/font/google";
import { client } from "../lib/client";
import Product from "../components/Product";
import { ProductType } from "@/models/Product";

interface HomeProps {
  products: ProductType[];
}

export default function Home({ products }: HomeProps): JSX.Element {
  const [category, setCategory] = useState("all");
  const [IsAllCategory, setIsAllCategory] = useState(true);
  const [NewProducts, setNewProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    const filteredProducts = products.filter(
      (product) => category === product.catogory
    );
    console.log(filteredProducts);
    if (category !== "all") {
      setIsAllCategory(false);
    } else {
      setIsAllCategory(true);
    }
    setNewProducts(filteredProducts);
  }, [category, products]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setCategory(e.target.value);
    if (e.target.value === "") {
      setCategory("all");
    }
  };
  return (
    <div className="root_container">
      {/* code starts here */}
      <section className="product">
        <div className="flex">
          <div className="product_section_title">
            Our Products <hr />
          </div>
          <div className="product_section_category">
            <select id="category" value={category} onChange={handleChange}>
              <option value="">All</option>
              <option value="Rices">Rices</option>
              <option value="Sugar">Sugar</option>
              <option value="Oil">Oil</option>
              <option value="Pulses">Pulses</option>
              <option value="Salt">Salt</option>
              <option value="Nuts">Nuts</option>
            </select>
          </div>
        </div>
        <div className="grid">
          {IsAllCategory
            ? products?.map((product: ProductType) => (
                <Product key={product._id} {...product} />
              ))
            : NewProducts?.map((product: ProductType) => (
                <Product key={product._id} {...product} />
              ))}
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
