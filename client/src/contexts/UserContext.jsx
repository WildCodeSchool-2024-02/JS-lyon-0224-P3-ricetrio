import PropTypes from "prop-types";
import { createContext, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "../hooks/useLocalStorage";

const UserContext = createContext();

export default function UserProvider({ children }) {
  const ApiUrl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  const [user, setUser] = useLocalStorage("user", "");

  const login = (userData) => {
    setUser(userData);
  };

  const logout = async (sessionExpired) => {
    try {
      const response = await fetch(`${ApiUrl}/user/logout`, {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        setUser(null);
        navigate(sessionExpired === true ? "/connexion" : "/");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const memo = useMemo(() => ({ user, setUser, login, logout }), [user]);

  return <UserContext.Provider value={memo}>{children}</UserContext.Provider>;
}

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useUserContext = () => useContext(UserContext);
