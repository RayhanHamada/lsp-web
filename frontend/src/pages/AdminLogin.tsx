import Header from '../components/Header';

const AdminLogin: React.FC = (_props) => {
  return (
    <div className="w-full">
      <Header />

      {/* content */}
      <div className="w-full flex flex-col items-center pt-20 ">
        <div className="text-3xl">LOGIN ADMIN</div>
        <br />
        <div className="">
          <form
            action=""
            method="post"
            className="flex-col space-y-4 items-center border-2 border-black p-10"
          >
            <div>
              <label htmlFor="email">Email : </label>
              <br />
              <input
                type="email"
                name="email"
                id=""
                placeholder="you@example.com"
                className="bg-transparent border-2 border-black p-1"
              />
            </div>
            <br />
            <div>
              <label htmlFor="password">Password : </label>
              <br />
              <input
                type="password"
                name="password"
                id=""
                placeholder="********"
                className="bg-transparent border-2 border-black p-1"
              />
            </div>
            <button className="w-48 border-2 bg-[#C7964E] rounded-xl">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
