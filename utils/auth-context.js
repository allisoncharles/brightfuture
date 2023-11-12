import { createContext } from "react";

const AuthContext = createContext();

const { Provider } = AuthContext;

const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({ token: "" });

  const setUserAuthInfo = () => {
    const token = localStorage.getItem("authToken");

    setAuthState({
      token,
    });
  };

  const isUserAuthenticated = () => !!authState.token;

  return (
    <Provider
      value={{
        authState,
        setUserAuthInfo,
        isUserAuthenticated,
      }}
    >
      {children}
    </Provider>
  );
};

export { AuthContext, AuthProvider };
