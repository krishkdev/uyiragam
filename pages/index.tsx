import { useEffect, useState } from "react";
import { Inter } from "@next/font/google";
import { client } from "../lib/client";
import Product from "../components/Product";
import { ProductType } from "@/models/Product";
import Select, { ActionMeta, SingleValue } from "react-select";
import CarouselComponent from "../components/CarouselComponent";

interface HomeProps {
  products: ProductType[];
}

interface Option {
  value: string;
  label: string;
}

const categories = [
  { value: "all", label: "All" },
  { value: "Rices", label: "Rices" },
  { value: "Sugar", label: "Sugar" },
  { value: "Oil", label: "Oil" },
  { value: "Pulses", label: "Pulses" },
  { value: "Salt", label: "Salt" },
  { value: "Nuts", label: "Nuts" },
];

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

  const handleChange = (
    option: SingleValue<Option>,
    actionMeta: ActionMeta<Option>
  ): void => {
    setCategory(option!.value);
    //alert(JSON.stringify(e));
    if (option?.value === "") {
      setCategory("all");
    }
  };
  return (
    <div className="root_container">
      <CarouselComponent />
      {/* code starts here */}
      <section className="product">
        <div className="flex">
          <div className="product_section_title">
            {" "}
            {/* !!!Slug marquee also uses this */}
            Our Products <hr />
          </div>
          <div className="product_section_category select-wrapper">
            <Select
              options={categories}
              id="category"
              className="category"
              onChange={handleChange}
            />
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
