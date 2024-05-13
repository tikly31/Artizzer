import Layout from "../components/Layout/Layout";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/Cart";

function HomePage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const [cart, setCart] = useCart();

  // Load categories
  const getAllCategories = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_APP_SERVER_HOST}/api/v1/category/categories`
      );
      if (data?.success) {
        setCategories(data?.categories);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to load categories");
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  // Load all products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${
          import.meta.env.VITE_APP_SERVER_HOST
        }/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      if (data?.success) {
        setProducts(data?.products);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error("Failed to load products");
    }
  };

  // Handle filter
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id); // add to array
    } else {
      all = all.filter((c) => c !== id); // remove from array
    }
    setChecked(all);
  };

  console.log(checked, radio);
  useEffect(() => {
    if (!checked.length || !radio.length) {
      getAllProducts();
    }
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) {
      filterProducts();
    }
  }, [checked, radio]);

  // Filter products
  const filterProducts = async () => {
    try {
      const { data } = await axios.post(
        `${
          import.meta.env.VITE_APP_SERVER_HOST
        }/api/v1/product/products-filters`,
        { checked, radio }
      );
      if (data?.success) {
        setProducts(data?.products);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to filter products");
    }
  };

  //get product count
  const getTotals = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_APP_SERVER_HOST}/api/v1/product/product-count`
      );
      if (data?.success) {
        setTotal(data?.total);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to get product count");
    }
  };

  useEffect(() => {
    getTotals();
  }, []);

  //load more products
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${
          import.meta.env.VITE_APP_SERVER_HOST
        }/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      if (data?.success) {
        setProducts([...products, ...data.products]);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error("Failed to load more products");
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  return (
    <Layout title={"All Products - Ecommerce app"}>
      <div className="row mt-3">
        <div className="col-md-3">
          <h3 className="text-center">Filter by category</h3>
          <div className="d-flex flex-column">
            {categories?.map((c) => (
              <>
                <Checkbox
                  key={c._id}
                  onChange={(e) => handleFilter(e.target.checked, c._id)}
                >
                  {c.name}
                </Checkbox>
              </>
            ))}
          </div>
          <h3 className="text-center mt-3">Filter by Prices</h3>
          <div className="d-flex flex-column">
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Prices.map((p) => (
                <div key={p._id}>
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
          <div className="d-flex flex-column mt-3">
            <button
              className="btn btn-danger"
              onClick={() => window.location.reload()}
            >
              RESET FILTERS
            </button>
          </div>
        </div>
        <div className="col-md-9">
          {/* {JSON.stringify(radio , null , 4)} */}
          <h1 className="text-center">All Products</h1>
          <div className="d-flex flex-wrap">
            {products?.map((p) => (
              <>
                <div className="card m-2" style={{ width: "18rem" }}>
                  <img
                    src={`${
                      import.meta.env.VITE_APP_SERVER_HOST
                    }/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{p.name}</h5>
                    <p className="card-text">
                      {p.description.substring(0, 20)}
                    </p>
                    <p className="card-text">Price: {p.price} Tk</p>
                    <button
                      className="btn btn-primary"
                      onClick={() => navigate(`/product/${p.slug}`)}
                    >
                      More Details
                    </button>
                    <button
                      className="btn btn-secondary ms-1"
                      onClick={() => {
                        setCart([...cart, p])
                        localStorage.setItem("cart", JSON.stringify([...cart, p]));
                        toast.success("PRODUCT ADDED TO CART");
                      }}
                    >
                      ADD TO CART
                    </button>
                  </div>
                </div>
              </>
            ))}
          </div>
          <div className="m-2 p-3">
            {products && products.length < total && (
              <button
                className="btn btn-warning"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? "Loading..." : "Load More"}
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default HomePage;
