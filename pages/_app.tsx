import Layout from '@/components/layout';
import '@/styles/globals.scss';
import type { AppProps } from 'next/app';
import { wrapper } from '@/store/store';
import { Provider } from 'react-redux';

function App({ Component, ...rest }: AppProps) {
  const {store, props} = wrapper.useWrappedStore(rest);
  return (
    <Provider store={store}>
      <Layout>
        <Component {...props.pageProps} />
      </Layout>
    </Provider>
  );
}

export default App