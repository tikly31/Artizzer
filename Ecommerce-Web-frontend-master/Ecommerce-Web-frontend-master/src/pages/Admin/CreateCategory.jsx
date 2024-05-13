import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import CategoryForm from "../../components/Form/CategoryForm";
import { Modal } from "antd";

function CreateCategory() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updateName, setUpdateName] = useState("");

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${
          import.meta.env.VITE_APP_SERVER_HOST
        }/api/v1/category/create-category`,
        { name }
      );
      if (data?.success) {
        toast.success(data.message);
        getAllCategories();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to create category");
    }
  };

  // Load categories
  const getAllCategories = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_APP_SERVER_HOST}/api/v1/category/categories`
      );
      if (data.success) {
        setCategories(data.categories);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to load categories");
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  // Handle update category
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `${
          import.meta.env.VITE_APP_SERVER_HOST
        }/api/v1/category/update-category/${selected._id}`,
        { name: updateName }
      );
      if (data?.success) {
        toast.success(data.message);
        setVisible(false);
        setUpdateName("");
        setSelected(null);
        getAllCategories();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to update category");
    }
  };

  // Handle delete category
  const handleDelete = async (pid) => {
    try {
      const confirm = window.prompt(
        "Are you sure you want to delete this category?"
      );
      if (!confirm) return;

      const { data } = await axios.delete(
        `${
          import.meta.env.VITE_APP_SERVER_HOST
        }/api/v1/category/delete-category/${pid}`
      );
      if (data?.success) {
        toast.success(data.message);
        getAllCategories();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to Delete category");
    }
  };

  return (
    <Layout title={"Create Category - Ecommerce app"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Manage Category</h1>
            <div className="p-3 w-75">
              <CategoryForm
                hadleSubmit={handleSubmit}
                value={name}
                setValue={setName}
              />
            </div>
            <div className="w-75">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categories?.map((category) => (
                    <>
                      <tr key={category._id}>
                        <td>{category.name}</td>
                        <td>
                          <button
                            className="btn btn-success"
                            onClick={() => {
                              setVisible(true);
                              setUpdateName(category.name);
                              setSelected(category);
                            }}
                          >
                            EDIT
                          </button>
                          <button
                            className="btn btn-danger m-1"
                            onClick={() => handleDelete(category._id)}
                          >
                            DELETE
                          </button>
                        </td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <Modal
            onCancel={() => setVisible(false)}
            footer={null}
            visible={visible}
          >
            <CategoryForm
              value={updateName}
              setValue={setUpdateName}
              hadleSubmit={handleUpdate}
            />
          </Modal>
        </div>
      </div>
    </Layout>
  );
}

export default CreateCategory;
