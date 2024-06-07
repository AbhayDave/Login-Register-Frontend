import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../app/users/usersSlice";

function Signup() {
  const authStatus = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [quote, setQuote] = useState(null);

  useEffect(() => {
    if (authStatus.status) {
      navigate("/");
    } else {
      fetch("https://api.quotable.io/random")
        .then((res) => res.json())
        .then((data) => {
          // console.log(data);
          setQuote(data.content);
        });
    }
  }, [authStatus, navigate]);

  const handleSignup = (e) => {
    e.preventDefault();
    console.log("singup");
    const data = new FormData(e.target);

    const email = data.get("email");
    const name = data.get("name");
    const password = data.get("pass");
    const cPassword = data.get("cpass");

    if (password === cPassword) {
      const user = {
        email,
        name,
        password,
      };
      dispatch(registerUser(user));
      navigate("/login");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0">
        <form
          onSubmit={handleSignup}
          method="post"
          action="#"
          className="flex flex-col justify-center p-8 md:p-14"
        >
          <span className="mb-3 text-4xl font-bold">Welcome aboard!</span>
          <span className="font-light text-gray-400 mb-8">
            Please enter your details
          </span>
          <div className="pb-4 pt-2">
            <span className="mb-2 text-md">Email</span>
            <input
              type="email"
              className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
              name="email"
              id="email"
              required
            />
          </div>
          <div className="py-4">
            <span className="mb-2 text-md">Name</span>
            <input
              type="text"
              name="name"
              id="name"
              required
              className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
            />
          </div>
          <div className="py-4">
            <span className="mb-2 text-md">Password</span>
            <input
              type="password"
              name="pass"
              id="pass"
              required
              className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
            />
          </div>
          <div className="py-4">
            <span className="mb-2 text-md">Confirm Password</span>
            <input
              type="password"
              name="cpass"
              id="cpass"
              required
              className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white p-2 rounded-lg mb-6 hover:bg-white hover:text-black hover:border hover:border-gray-300"
          >
            Sign Up
          </button>
          {/* <button
            className="w-full border border-gray-300 text-md p-2 rounded-lg mb-6 hover:bg-black hover:text-white"
          >
            <img src="https://images.pexels.com/photos/1076758/pexels-photo-1076758.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="img" className="w-6 h-6 inline mr-2" />
            Sign in with Google
          </button> */}
          <div className="text-center text-gray-400">
            Already have an account?
            <Link to="/login" className="font-bold text-black">
              {"  "}Login
            </Link>
          </div>
        </form>

        <div className="relative">
          <img
            // src="https://images.pexels.com/photos/1076758/pexels-photo-1076758.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            src="https://source.unsplash.com/random"
            alt="img"
            className="w-[400px] h-full select-none pointer-events-none hidden rounded-r-2xl md:block object-cover"
          />
          <div className="absolute hidden bottom-10 right-4 left-4 p-4 bg-white bg-opacity-30 backdrop-blur-sm rounded drop-shadow-lg md:block">
            <span className="text-white text-xl">{quote}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
