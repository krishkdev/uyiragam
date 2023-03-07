/* eslint-disable react/jsx-key */
import { FormEvent, useState } from "react";
import { CheckoutForm } from "./CheckoutForm";
import { AddressForm } from "./AddressForm";
import { useMultistepForm } from "../../hooks/useMultistepForm";
import { UserForm } from "./UserForm";
import { toast } from "react-hot-toast";
import ProgressBar from "@ramonak/react-progress-bar";
import { useStateContext } from "@/context/StateContext";

type FormData = {
  firstName: string;
  lastName: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  email: string;
  password: string;
};

const INITIAL_DATA: FormData = {
  firstName: "",
  lastName: "",
  phone: "",
  street: "",
  city: "",
  state: "",
  zip: "",
  email: "",
  password: "",
};

function FormModal() {
  const { cartItems, totalPrice } = useStateContext();
  const [data, setData] = useState(INITIAL_DATA);
  function updateFields(fields: Partial<FormData>) {
    setData((prev) => {
      return { ...prev, ...fields };
    });
  }
  const { steps, currentStepIndex, step, isFirstStep, isLastStep, back, next } =
    useMultistepForm([
      <UserForm {...data} updateFields={updateFields} />,
      <AddressForm {...data} updateFields={updateFields} />,
      <CheckoutForm {...data} updateFields={updateFields} />,
    ]);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!isLastStep) return next();
    const res = await fetch("/api/sendgrid", {
      body: JSON.stringify({
        contact: data.email,
        fullname: data.firstName + " " + data.lastName,
        address:
          data.street +
          " , " +
          data.city +
          " , " +
          data.state +
          " , " +
          data.zip,
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
      return;
    }
    toast.success("Order placed Successfully");
    // ------------- Log ------------
    console.log(data);
  }

  return (
    <div className="formModalContainer">
      <ProgressBar
        completed={currentStepIndex + 1}
        maxCompleted={steps.length}
        bgColor="#ff3e4e"
        customLabel={currentStepIndex + 1 + " of " + steps.length}
      />
      <br />
      <form onSubmit={onSubmit}>
        {step}
        <div
          style={{
            marginTop: "1rem",
            display: "flex",
            gap: ".5rem",
            justifyContent: "flex-end",
          }}
        >
          {!isFirstStep && (
            <button className="btn" type="button" onClick={back}>
              Back
            </button>
          )}
          <button className="btn btn-primary" type="submit">
            {isLastStep ? "Order Now" : "Next"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default FormModal;
