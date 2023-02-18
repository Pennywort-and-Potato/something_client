import Layout from '@/components/layout';
import '@/styles/globals.scss';
import type { AppProps } from 'next/app';
import { wrapper } from '@/store/store';
import { Provider } from 'react-redux';
import { useLayoutEffect, useState } from 'react';
import { setUser } from '@/store/userSlice';
import { getUserByToken } from './api/api';
import { useLocalStorage, useReadLocalStorage } from 'usehooks-ts';

function App({ Component, ...rest }: AppProps) {
  const [loading, setLoading] = useState(true);
  const { store, props } = wrapper.useWrappedStore(rest);

  const [token, setToken] = useLocalStorage<string | null>('jwt', null);

  useLayoutEffect(() => {
    if (token) {
      getUserByToken(token).then((res) => {
        store.dispatch(setUser(res.data));
        setLoading(false);
      });
    } else {
      store.dispatch(setUser(null));
      setLoading(false);
    }
  }, [token]);

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
