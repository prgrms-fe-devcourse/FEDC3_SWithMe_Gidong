import { getAllUsers } from '@/api/user';
import CommentProvider from '@/context/CommentProvider';
import LikeProvider from '@/context/LikeProvider';
import TILProvider from '@/context/TILProvider';
import ToastProvider from '@/context/ToastProvider';
import UserProvider from '@/context/UserProvider';
import { RecoilRoot } from 'recoil';
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
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <GlobalStyle />
        <ThemeProvider theme={theme}>
          <ToastProvider>
            <UserProvider initialUsers={initialUsers}>
              <TILProvider>
                <CommentProvider>
                  <LikeProvider>
                    <Router />
                  </LikeProvider>
                </CommentProvider>
              </TILProvider>
            </UserProvider>
          </ToastProvider>
        </ThemeProvider>
      </RecoilRoot>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
