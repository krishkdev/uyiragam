import React, { useRef, useState } from "react";
import styles from "../styles/Modal.module.css";
import { RiCloseLine } from "react-icons/ri";
//import emailjs from "@emailjs/browser";delete this package
import { toast } from "react-hot-toast";
import { useStateContext } from "@/context/StateContext";
import { useRouter } from "next/router";

const Modal = ({ setIsOpen }) => {
  const form = useRef();
  const router = useRouter();
  const { totalPrice, cartItems, setShowCart } = useStateContext();

  const [fullname, setFullname] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");

  const [errors, setErrors] = useState({});
  const [buttonText, setButtonText] = useState("Send");

  const handleValidation = () => {
    let tempErrors = {};
    let isValid = true;

    if (fullname.length <= 0) {
      tempErrors["fullname"] = true;
      isValid = false;
    }
    if (contact.length <= 0) {
      tempErrors["contact"] = true;
      isValid = false;
    }
    if (address.length <= 0) {
      tempErrors["address"] = true;
      isValid = false;
    }

    setErrors({ ...tempErrors });
    console.log("errors", errors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let isValidForm = handleValidation();

    if (isValidForm) {
      setButtonText("Sending...");
      const res = await fetch("/api/sendgrid", {
        body: JSON.stringify({
          contact: contact,
          fullname: fullname,
          address: address,
          cartItems: cartItems,
          totalPrice: totalPrice,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });

      const { error } = await res.json();
      if (error) {
        console.log(error);
        toast.error("Something went wrong");
        // Reset form fields
        setButtonText("Send");
        setFullname("");
        setContact("");
        setAddress("");
        return;
      }
      toast.success("Order sent successfully.");
      // Reset form fields
      setButtonText("Send");
      setFullname("");
      setContact("");
      setAddress("");
      setIsOpen(false);
      setShowCart(false);
      router.push("/success");
    }
    console.log(fullname, contact, address, cartItems);
  };

  return (
    <>
      <div className={styles.darkBG} onClick={() => setIsOpen(false)} />
      <div className={styles.centered}>
        <div className={styles.modal}>
          <div className={styles.modalHeader}>
            <h2 className={styles.heading}>Checkout details</h2>
          </div>
          <button className={styles.closeBtn} onClick={() => setIsOpen(false)}>
            <RiCloseLine style={{ marginBottom: "-3px" }} />
          </button>
          <div className={styles.modalContent}>
            <form
              id="form"
              className={styles.modalForm}
              onSubmit={handleSubmit}
              ref={form}
            >
              <input
                id="name"
                type="text"
                value={fullname}
                placeholder="Full Name"
                className={styles.modalFormName}
                onChange={(e) => {
                  setFullname(e.target.value);
                }}
              />
              <input
                id="email"
                type="text"
                value={contact}
                placeholder="Email or Phone"
                onChange={(e) => {
                  setContact(e.target.value);
                }}
              />
              <textarea
                id="address"
                value={address}
                placeholder="Address"
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
              ></textarea>
              <input
                type="submit"
                value={buttonText}
                className={styles.deleteBtn}
              />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
