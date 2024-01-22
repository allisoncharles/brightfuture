import "../styles/globals.css";
import client from "../utils/apollo-client";
import { ApolloProvider } from "@apollo/client";
import Loading from "../components/Loading";
import {
  SettingContext,
  UserResultContext,
  RequestedTermContext,
  DeleteConfirmContext,
  AuthContext,
} from "../store/store";
import { useState } from "react";

function MyApp({ Component, pageProps }) {
  const [sessions, setSessions] = useState([]);
  const [userResult, setUserResult] = useState([]);
  const [requestedTerm, setRequestedTerm] = useState([]);
  const [openDelete, setOpenDelete] = useState(false);
  const [token, setToken] = useState("");

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      <UserResultContext.Provider value={{ userResult, setUserResult }}>
        <DeleteConfirmContext.Provider
          value={{
            openDelete,
            setOpenDelete,
          }}
        >
          <RequestedTermContext.Provider
            value={{ requestedTerm, setRequestedTerm }}
          >
            <SettingContext.Provider value={{ sessions, setSessions }}>
              <ApolloProvider client={client}>
                <>
                  <Loading />
                  <Component {...pageProps} />
                </>
              </ApolloProvider>
            </SettingContext.Provider>
          </RequestedTermContext.Provider>
        </DeleteConfirmContext.Provider>
      </UserResultContext.Provider>
    </AuthContext.Provider>
  );
}

export default MyApp;
