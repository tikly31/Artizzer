import { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function CategoryProducts() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);

  const navigate = useNavigate();
  const params = useParams();

  const getProducts = async () => {
    try {
      const { data } = await axios.get(
        `${
          import.meta.env.VITE_APP_SERVER_HOST
        }/api/v1/product/category-wise-products/${params.slug}`
      );
      if (data?.success) {
        setProducts(data?.products);
        setCategory(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (params?.slug) {
      getProducts();
    }
  }, [params?.slug]);

  return (
    <Layout title={"Category Products"}>
      <div className="container mt-3">
        <h1 className="text-center">{category?.name}</h1>
        <div className="row">
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
                    <button className="btn btn-secondary ms-1">
                      ADD TO CART
                    </button>
                  </div>
                </div>
              </>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default CategoryProducts;
