import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { authLogin } from "../../app/auth/authSlice";

function Login() {
  const authStatus = useSelector((state) => state.auth);
  const users = useSelector((state) => state.users);

  const [error, setError] = useState(null);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [quote, setQuote] = useState(null);

  useEffect(() => {
    if (authStatus.status) {
      navigate("/");
    } else {
      fetch("https://api.quotable.io/random?city,night")
        .then((res) => res.json())
        .then((data) => {
          setQuote(data.content);
        });
    }
  }, [authStatus, navigate]);

  const handleLogin = (e) => {
    setError("");
    e.preventDefault();
    const data = new FormData(e.target);

    const email = data.get("email");
    const password = data.get("pass");

    for (let i = 0; i < users.length; i++) {
      const userData = users[i];
      if (userData.email === email && userData.password === password) {
        dispatch(authLogin({ email, password }));
        navigate("/");
        return;
      }
    }

    setError("Check User Credentials");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0">
        <form
          method="post"
          onSubmit={handleLogin}
          action="#"
          className="flex flex-col justify-center p-8 md:p-14"
        >
          <span className="mb-3 text-4xl font-bold">Welcome back</span>
          <span className="font-light text-gray-400 mb-8">
            Welcome back! Please enter your details
          </span>
          {error ? (
            <span className="font-light text-red-400">{error}</span>
          ) : (
            ""
          )}
          <div className="py-4">
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
            <span className="mb-2 text-md">Password</span>
            <input
              type="password"
              name="pass"
              id="pass"
              required
              className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
            />
          </div>
          <div className="flex justify-between w-full py-4">
            <div className="mr-24">
              <input type="checkbox" name="ch" id="ch" className="mr-2" />
              <span className="text-md" name="_remember_me">
                Remember me
              </span>
            </div>
            <span className="font-bold text-md">Forgot password</span>
          </div>
          <button
            type="submit"
            className="w-full bg-black text-white p-2 rounded-lg mb-6 hover:bg-white hover:text-black hover:border hover:border-gray-300"
          >
            Sign in
          </button>
          {/* <button
            className="w-full border border-gray-300 text-md p-2 rounded-lg mb-6 hover:bg-black hover:text-white"
          >
            <img src="https://images.pexels.com/photos/1076758/pexels-photo-1076758.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="img" className="w-6 h-6 inline mr-2" />
            Sign in with Google
          </button> */}
          <div className="text-center text-gray-400">
            Don&apos;t have an account?
            <Link to="/signup" className="font-bold text-black">
              {"  "} Sign up for free
            </Link>
          </div>
        </form>

        <div className="relative">
          <img
            // src="https://images.pexels.com/photos/1076758/pexels-photo-1076758.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            src="https://source.unsplash.com/random"
            alt="img"
            className="w-[400px] h-full hidden rounded-r-2xl select-none pointer-events-none md:block object-cover"
          />
          <div className="absolute hidden bottom-10 right-4 left-4 p-4 bg-white bg-opacity-30 backdrop-blur-sm rounded drop-shadow-lg md:block">
            <span className="text-white text-xl">{quote}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
