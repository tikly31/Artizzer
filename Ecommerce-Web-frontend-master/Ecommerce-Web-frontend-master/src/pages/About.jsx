import Layout from "../components/Layout/Layout";


function About() {
  return (
    <Layout title={'About us - Ecommerce app'}>
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="https://t3.ftcdn.net/jpg/01/35/70/90/360_F_135709080_2XHH0eeTGZ6rAaxgyuLKKdTaUCZAgPCZ.jpg"
            alt="contactus"
            style={{ width: "90%" }}
          />
        </div>
        <div className="col-md-4">
          <h1>About Us</h1>
          <p className="text-justify mt-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus
            officiis obcaecati esse tempore unde ratione, eveniet mollitia,
            perferendis eius temporibus dicta blanditiis doloremque explicabo
            quasi sunt vero optio cum aperiam vel consectetur! Laborum enim
            accusantium atque, excepturi sapiente amet! Tenetur ducimus aut
            commodi illum quidem neque tempora nam.
          </p>
        </div>
      </div>
    </Layout>
  );
}

export default About;
