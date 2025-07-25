import '@/styles/globals.css';
import { ToastContainer } from 'react-hot-toast';
import { AuthProvider } from '@/context/AuthContext';

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
      <ToastContainer position="top-right" />
    </AuthProvider>
  );
}
