import Layout from "../components/Layout/Layout";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

function ProductDetails() {
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const params = useParams();

  //get product details
  const getProductDetails = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_APP_SERVER_HOST}/api/v1/product/get-product/${
          params.slug
        }`
      );
      if (data?.success) {
        setProduct(data?.product);
        getRelatedProducts(data?.product?._id , data?.product?.category?._id);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to load product details");
    }
  };

  useEffect(() => {
    if (params?.slug) {
      getProductDetails();
    }
  }, [params?.slug]);

  //get related products
  const getRelatedProducts = async (pid , cid) => {
    try {
      const { data } = await axios.get(
        `${
          import.meta.env.VITE_APP_SERVER_HOST
        }/api/v1/product/related-products/${pid}/${cid}`
      );
      if (data?.success) {
        setRelatedProducts(data?.products);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to load related products");
    }
  };

  

  return (
    <Layout title={"Product Details"}>
      <div className="row container mt-2">
        <div className="col-md-6">
          <img
            src={`${
              import.meta.env.VITE_APP_SERVER_HOST
            }/api/v1/product/product-photo/${product._id}`}
            className="card-img-top"
            alt={product.name}
            height={450}
            width={400}
          />
        </div>
        <div className="col-md-6">
          <h1 className="text-center">Product Details</h1>
          <h5>Name : {product.name}</h5>
          <h5>Description : {product.description}</h5>
          <h5>Price : {product.price}</h5>
          <h5>Category : {product.category?.name}</h5>
          <h5>Quantity : {product.quantity}</h5>
          <button className="btn btn-secondary ms-1">ADD TO CART</button>
        </div>
      </div>
      <hr />
      <div className="row">
        <h4>Similar Producrs</h4>
        {relatedProducts?.length < 1 && <h4 className="text-center">No Similar Products Found</h4>}
        <div className="d-flex flex-wrap">
            {relatedProducts?.map((p) => (
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
                      <p className="card-text">{p.description.substring(0 , 20)}</p>
                      <p className="card-text">Price: {p.price} Tk</p>
                      <button className="btn btn-secondary ms-1">ADD TO CART</button>
                    </div>
                  </div>
              </>
            ))}
          </div>
      </div>
    </Layout>
  );
}

export default ProductDetails;
