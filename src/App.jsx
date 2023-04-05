import { getAllUsers } from '@/api/user';
import AuthProvider from '@/context/AuthProvider';
import CommentProvider from '@/context/CommentProvider';
import LikeProvider from '@/context/LikeProvider';
import TILProvider from '@/context/TILProvider';
import ToastProvider from '@/context/ToastProvider';
import UserProvider from '@/context/UserProvider';
import { useAsync } from '@/hooks';
import Router from '@/Router';
import GlobalStyle from '@/styles/globalStyle';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

function App() {
  const queryClient = new QueryClient();
  const initialUsers = useAsync(getAllUsers, []);

  return (
    <QueryClientProvider client={queryClient}>
      <GlobalStyle />
      <ToastProvider>
        <AuthProvider>
          <UserProvider initialUsers={initialUsers}>
            <TILProvider>
              <CommentProvider>
                <LikeProvider>
                  <Router />
                </LikeProvider>
              </CommentProvider>
            </TILProvider>
          </UserProvider>
        </AuthProvider>
      </ToastProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
