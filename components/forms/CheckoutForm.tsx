import { FormWrapper } from "./FormWrapper";
import cartstyles from "@/styles/Cart.module.css";
import Image from "next/image";
import { urlFor } from "@/lib/client";
import { CartItem } from "@/models/CartItem";
import { useStateContext } from "../../context/StateContext";
type AccountData = {
  email: string;
  password: string;
};

type AccountFormProps = AccountData & {
  updateFields: (fields: Partial<AccountData>) => void;
};

export function CheckoutForm({
  email,
  password,
  updateFields,
}: AccountFormProps) {
  const { cartItems, totalPrice } = useStateContext();
  
  return (
    <div>
      <h2 style={{ textAlign: "center", margin: 0, marginBottom: "2rem" }}>
        Order Summary
      </h2>
      <div>
        <div className={cartstyles.product_container}>
          {cartItems.length >= 1 &&
            cartItems?.map((item: CartItem) => {
              const src = urlFor(item?.image[0]).url();
              return (
                <div className={cartstyles.product} key={item._id}>
                  <Image
                    loader={() => src}
                    src={src}
                    className={cartstyles.cart_product_image}
                    alt="cart-img"
                    width={200}
                    height={200}
                  />
                  <div className={cartstyles.item_desc}>
                    <div className={`${cartstyles.flex} ${cartstyles.top}`}>
                      <h5>{item.name}</h5>
                      <h3>₹ {item.price}</h3>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
        {cartItems.length >= 1 && (
          <div className={cartstyles.cart_bottom}>
            <div className={cartstyles.total}>
              <h3>Subtotal:</h3>
              <h3>₹ {totalPrice}</h3>
            </div>
          </div>
        )}
        <div className={cartstyles.cart_bottom}>
          <h2>Payment Method:</h2>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: 10,
              margin: 20,
            }}
          >
            <div>
              <input type="radio" value="Male" name="gender" /> Cash On Delivery
            </div>
            <div>
              <input type="radio" value="Other" name="gender" disabled /> Pay
              with RazorPay (Coming soon)
            </div>
          </div>
        </div>
      </div>
      {/* <label>Email</label>
      <input
        autoFocus
        required
        type="email"
        value={email}
        onChange={e => updateFields({ email: e.target.value })}
      />
      <label>Password</label>
      <input
        required
        type="password"
        value={password}
        onChange={e => updateFields({ password: e.target.value })}
      /> */}
    </div>
  );
}
