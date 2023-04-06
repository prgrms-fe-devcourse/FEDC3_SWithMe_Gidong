import Router from '@/Router';
import { useCallback } from 'react';

import { createChannel, deleteChannel, getChannelList, updateChannel } from '@/api/channel';
import { getAllUsers } from '@/api/user';

import AuthProvider from '@/context/AuthProvider';
import GroupProvider from '@/context/GroupProvider';
import LikeProvider from '@/context/LikeProvider';
import ToastProvider from '@/context/ToastProvider';
import UserProvider from '@/context/UserProvider';

import { useAsync } from '@/hooks';

import GlobalStyle from '@/styles/globalStyle';
import theme from '@/styles/theme';
import { ThemeProvider } from '@emotion/react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RecoilRoot } from 'recoil';

export const queryClient = new QueryClient();

function App() {
  const initialGroups = useAsync(getChannelList, []);
  const initialUsers = useAsync(getAllUsers, []);
  const handleCreateGroup = useCallback(async (data) => {
    return await createChannel(data);
  }, []);
  const handleUpdateGroup = useCallback(async (data) => {
    return await updateChannel(data);
  }, []);
  const handleDeleteGroup = useCallback(async (data) => {
    return await deleteChannel(data);
  });

  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <ReactQueryDevtools initialIsOpen={true} />
        <GlobalStyle />
        <ThemeProvider theme={theme}>
          <ToastProvider>
            <AuthProvider>
              <UserProvider initialUsers={initialUsers}>
                <GroupProvider
                  initialGroups={initialGroups}
                  handleCreateGroup={handleCreateGroup}
                  handleUpdateGroup={handleUpdateGroup}
                  handleDeleteGroup={handleDeleteGroup}>
                  <LikeProvider>
                    <Router />
                  </LikeProvider>
                </GroupProvider>
              </UserProvider>
            </AuthProvider>
          </ToastProvider>
        </ThemeProvider>
      </RecoilRoot>
    </QueryClientProvider>
  );
}

export default App;
