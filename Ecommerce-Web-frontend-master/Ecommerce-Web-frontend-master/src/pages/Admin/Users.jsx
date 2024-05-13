import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import useCategory from "../../hooks/useCategory";

function Users() {
  const categories = useCategory();
  return (
    <Layout title={"Admin Users Page- Ecommerce app"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Users</h1>
          </div>
          <div>
            
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Users;
