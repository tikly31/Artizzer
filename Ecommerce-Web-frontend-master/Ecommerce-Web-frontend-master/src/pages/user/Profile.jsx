import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/Auth";
import axios from "axios";
import toast from "react-hot-toast";

function Profile() {
  const [auth, setAuth] = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    if (auth?.token) {
      setName(auth?.user?.name);
      setEmail(auth?.user?.email);
      setPhone(auth?.user?.phone);
      setAddress(auth?.user?.address);
    }
    // eslint-disable-next-line
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    //console.log(name, email, password, phone, address);
    try {
      const {data} = await axios.put(
        `${import.meta.env.VITE_APP_SERVER_HOST}/api/v1/auth/update-profile`,
        {
          name,
          email,
          password,
          phone,
          address,
        }
      );
      if( data?.error ){
        toast.error(data?.error)
      } else{
        setAuth({...auth , user: data?.updatedUser});
        let ls = localStorage.getItem('auth');
        ls = JSON.parse(ls);
        ls.user = data.updatedUser;
        localStorage.setItem('auth' , JSON.stringify(ls));
        toast.success("PROFILE UPDATED SUCCESSFULLY");
      }
    } catch (error) {
      console.log(error);
      toast.error("SOMETHING WENT WRONG");
    }
  };

  return (
    <Layout title={"Create Category - Ecommerce app"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <h2>USER PROFILE</h2>
            <form onSubmit={handleSubmit} className="m-5">
              <div className="mb-3">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="form-control"
                  id="exampleInputname"
                  placeholder="Enter Your Name"
                />
              </div>
              <div className="mb-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-control"
                  id="exampleInputEmail"
                  placeholder="Enter Your Email"
                  disabled
                />
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-control"
                  id="exampleInputPassword"
                  placeholder="Enter Your Password"
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="form-control"
                  id="exampleInputPhone"
                  placeholder="Enter Your Phone Number"
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="form-control"
                  id="exampleInputAddress"
                  placeholder="Enter Your Address"
                />
              </div>

              <button type="submit" className="btn btn-primary">
                UPDATE PROFILE
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Profile;
