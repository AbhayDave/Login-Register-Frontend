import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { authLogout } from "../app/auth/authSlice";

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(authLogout());
    navigate("/login");
  };

  return (
    <div className="bg-slate-300  rounded-3xl w-1/2 fixed top-6 left-1/2 -translate-x-1/2 mx-auto h-16 flex items-center justify-center gap-3">
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive
            ? "font-sans bg-red-500 text-white font-bold py-2 px-4 rounded-full"
            : "font-sans bg-blue-500  hover:bg-red-500 text-white font-bold py-2 px-4 rounded-full"
        }
      >
        Home
      </NavLink>

      <NavLink
        to="/dashboard"
        className={({ isActive }) =>
          isActive
            ? "font-sans bg-red-500  text-white font-bold py-2 px-4 rounded-full"
            : "font-sans bg-blue-500 hover:bg-red-500 text-white font-bold py-2 px-4 rounded-full"
        }
      >
        Dashboard
      </NavLink>
      <button
        onClick={handleLogout}
        className=" font-mono bg-blue-500 hover:bg-red-500 text-white font-bold py-2 px-4 rounded-full"
      >
        Logout
      </button>
    </div>
  );
}

export default Header;
