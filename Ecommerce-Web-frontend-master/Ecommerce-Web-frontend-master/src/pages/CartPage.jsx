import Layout from "../components/Layout/Layout";
import { useCart } from "../context/Cart";
import { useAuth } from "../context/Auth";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import DropIn from "braintree-web-drop-in-react";
import toast from "react-hot-toast";

function CartPage() {
  const [cart, setCart] = useCart();
  const [auth, setAuth] = useAuth();

  const navigate = useNavigate();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);

  //total price
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((p) => {
        total += p.price;
      });
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "BDT",
      });
    } catch (error) {
      console.log(error);
    }
  };
  // Remove cart item
  const removeCartItem = (id) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((p) => p._id === id);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

  //get payment token
  const getClientToken = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_APP_SERVER_HOST}/api/v1/product/braintree/token`
      );
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getClientToken();
  }, [auth?.token]);

  //handle payment
  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post(
        `${
          import.meta.env.VITE_APP_SERVER_HOST
        }/api/v1/product/braintree/payment`,
        {
          nonce,
          cart,
        }
      );
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/orders");
      toast.success("PAYMENT SUCCESSFUL");
    } catch (error) {
      console.log(error);
      setLoading(false); // stop loading
    }
  };

  return (
    <Layout title={"Cart Page"}>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center bg-light p-2">
              {`Hello ${auth?.token && auth?.user?.name}`}
            </h1>
            <h4 className="text-center">
              {cart.length > 0
                ? `You have ${cart.length} products in your cart ${
                    auth?.token ? "" : "Please login in to continue"
                  }`
                : "No products in cart"}
            </h4>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8">
            {cart?.map((p) => (
              <div className="row mb-2 card flex-row" key={p._id}>
                <div className="col-md-4">
                  <img
                    src={`${
                      import.meta.env.VITE_APP_SERVER_HOST
                    }/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                    width={"150px"}
                    height={"150px"}
                  />
                </div>
                <div className="col-md-8">
                  <h4>{p.name}</h4>
                  <p>{p.description.substring(0, 20)}</p>
                  <h4>Price: {p.price} Tk</h4>
                  <button
                    className="btn btn-danger mt-2 mb-1"
                    onClick={() => removeCartItem(p._id)}
                  >
                    REMOVE
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="col-md-3 text-center">
            <h2>CART SUMMARY</h2>
            <p>TOTAL | CHECKOUT | PAYMENT</p>

            <hr />
            <h4>TOTAL: {totalPrice()}</h4>
            {auth?.user?.address ? (
              <>
                <div className="mb-3">
                  <h4>Current Address : </h4>
                  <h5>{auth?.user?.address}</h5>
                  <button
                    className="btn btn-warning"
                    onClick={() => navigate("/dashboard/user/profile")}
                  >
                    UPDATE ADDRESS
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="mb-3">
                  {auth?.token ? (
                    <button
                      className="btn btn-warning"
                      onClick={() => navigate("/dashboard/user/profile")}
                    >
                      UPDATE ADDRESS
                    </button>
                  ) : (
                    <button
                      className="btn btn-warning"
                      onClick={() =>
                        navigate("/login", {
                          state: "/cart",
                        })
                      }
                    >
                      PLEASE LOGIN TO CHECKOUT
                    </button>
                  )}
                </div>
              </>
            )}
            <div className="mt-2">
              {!clientToken || !cart?.length ? (
                ""
              ) : (
                <>
                  <DropIn
                    options={{
                      authorization: clientToken,
                      paypal: {
                        flow: "vault",
                      },
                    }}
                    onInstance={(instance) => setInstance(instance)}
                  />
                  <button
                    className="btn btn-primary mb-2"
                    onClick={handlePayment}
                    disabled={loading || !instance || !auth?.user?.address}
                  >
                    {loading ? "PROCESSING..." : "MAKE PAYMENT"}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default CartPage;
