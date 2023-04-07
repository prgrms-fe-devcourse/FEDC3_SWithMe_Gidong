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
import theme from '@/styles/theme';
import { ThemeProvider } from '@emotion/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient();

function App() {
  const initialUsers = useAsync(getAllUsers, []);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <QueryClientProvider client={queryClient}>
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
    </ThemeProvider>
  );
}

export default App;
