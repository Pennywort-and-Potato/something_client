import Layout from "@/components/layout";
import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import { wrapper } from "@/store/store";
import { Provider } from "react-redux";
import { useEffect, useState } from "react";
import { setUser } from "@/store/userSlice";
import { getUserByToken } from "./api/api";

function App({ Component, ...rest }: AppProps) {
  const [loading, setLoading] = useState(true);
  const { store, props } = wrapper.useWrappedStore(rest);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      getUserByToken(token).then((res) => {
        setLoading(false);
        store.dispatch(setUser(res.data));
      });
    } else setLoading(false)
  }, []);

  return (
    <Provider store={store}>
      {loading ? null : (
        <Layout>
          <Component {...props.pageProps} />
        </Layout>
      )}
    </Provider>
  );
}

export default App;
