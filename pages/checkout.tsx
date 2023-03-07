import FormModal from "@/components/checkoutForm/FormModal";
import React from "react";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import { useRouter } from "next/router";
import styles from "@/styles/Checkout.module.css";
import Logo from "../public/logoneat.png";
import Image from "next/image";

const checkout = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = useRouter();
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <BsFillArrowLeftCircleFill
          className={styles.icon}
          onClick={() => router.push("/")}
        />
        <div style={{ fontSize: 24, marginLeft: 10, fontWeight: "bold" }}>
          Continue Shopping
        </div>
      </div>
      <div>
        <Image src={Logo} alt="Logo" width={200} height={150} />
      </div>
      <FormModal />
    </div>
  );
};

export default checkout;
