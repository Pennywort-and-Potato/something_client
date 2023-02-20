import Layout from '@/components/layout';
import '@/styles/globals.scss';
import type { AppProps } from 'next/app';
import { wrapper } from '@/store/store';
import { Provider } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchUserByToken, setUser } from '@/store/userSlice';
import { useLocalStorage } from 'usehooks-ts';

function App({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);

  const [loading, setLoading] = useState(true);
  const [token, setToken] = useLocalStorage<string | null>('jwt', null);
  
  const callback = () => setLoading(false);

  useEffect(() => {
    if (token) {
      store.dispatch(fetchUserByToken({ token, callback }))
    } else {
      store.dispatch(setUser(null));
      callback()
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
