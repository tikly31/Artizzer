import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
const { Option } = Select;
import { useNavigate, useParams } from "react-router-dom";

function UpdateProducts() {
  const [categories, setCategories] = useState([]);
  const [photo, setPhoto] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState(false);
  const [id, setId] = useState("");

  const navigate = useNavigate();
  const params = useParams();

  //get single product
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_APP_SERVER_HOST}/api/v1/product/get-product/${
          params.slug
        }`
      );
      setName(data?.product?.name);
      setId(data?.product?._id);
      setDescription(data?.product?.description);
      setPrice(data?.product?.price);
      setCategory(data?.product?.category?._id);
      setQuantity(data?.product?.quantity);
      setShipping(data?.product?.shipping);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSingleProduct();
    // eslint-disable-next-line
  }, []);

  // get all categories
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

  // Handle update product
  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("quantity", quantity);
    formData.append("shipping", shipping);
    photo && formData.append("photo", photo);

    try {
      const { data } = await axios.put(
        `${import.meta.env.VITE_APP_SERVER_HOST}/api/v1/product/update-product/${id}`,
        formData
      );
      if (data?.success) {
        toast.success(data?.message);
        navigate("/dashboard/admin/products");
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to update product");
    }
  };

  // Handle delete product
  const handleDeleteProduct = async () => {
    try {
      let confirm = window.prompt("Are you sure you want to delete this product?");
      if (!confirm) {
        return;
      }
      const { data } = await axios.delete(
        `${import.meta.env.VITE_APP_SERVER_HOST}/api/v1/product/delete-product/${id}`
      );
      if (data?.success) {
        toast.success(data?.message);
        navigate("/dashboard/admin/products");
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete product");
    }
  };


  return (
    <Layout title={"Update Product - Ecommerce app"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Update Product</h1>
            <div className="m-1 w-75">
              <Select
                bordered={false}
                placeholder="SELECT A CATEGORY"
                size="large"
                showSearch
                className="form-select mb-3"
                onChange={(value) => {
                  setCategory(value);
                }}
                value={category}
              >
                {categories.map((c) => (
                  <Option key={c._id} value={c._id}>
                    {c.name}
                  </Option>
                ))}
              </Select>
              <div className="mb-3">
                <label className="btn btn-outline-secondary col-md-12">
                  {photo ? photo.name : "Upload Image"}
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files[0])}
                    hidden
                  />
                </label>
              </div>
              <div className="mb-3">
                {photo ? (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt={photo.name}
                      style={{ height: "200px" }}
                      className="img img-responsive"
                    />
                  </div>
                ) : (
                  <div className="text-center">
                    <img
                      src={`${
                        import.meta.env.VITE_APP_SERVER_HOST
                      }/api/v1/product/product-photo/${id}`}
                      alt={photo.name}
                      style={{ height: "200px" }}
                      className="img img-responsive"
                    />
                  </div>
                )}
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={name}
                  placeholder="write a name"
                  className="form-control"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <textarea
                  name=""
                  id=""
                  cols="30"
                  rows="5"
                  value={description}
                  placeholder="write a description"
                  className="form-control"
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  value={price}
                  placeholder="write a price"
                  className="form-control"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  value={quantity}
                  placeholder="write a quantity"
                  className="form-control"
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <Select
                  bordered={false}
                  className="form-select mb-3"
                  size="large"
                  showSearch
                  placeholder="SELECT SHIPPING"
                  onChange={(e) => setShipping(e.target.value)}
                  value={shipping ? "YES" : "NO"}
                >
                  <Option value="true">Yes</Option>
                  <Option value="false">No</Option>
                </Select>
              </div>
              <div className="mb-3">
                <button
                  className="btn btn-success w-100"
                  onClick={handleUpdateProduct}
                >
                  UPDATE PRODUCT
                </button>
              </div>
              <div className="mb-3">
                <button
                  className="btn btn-danger w-100"
                  onClick={handleDeleteProduct}
                >
                  DELETE PRODUCT
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default UpdateProducts;
