import Router from '@/Router';
import { useCallback } from 'react';

import { createChannel, deleteChannel, getChannelList, updateChannel } from '@/api/channel';

import { Toast } from '@/components/base';

import AuthProvider from '@/context/AuthProvider';
import GroupProvider from '@/context/GroupProvider';

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
        <GlobalStyle />
        <ThemeProvider theme={theme}>
          <AuthProvider>
            <GroupProvider
              initialGroups={initialGroups}
              handleCreateGroup={handleCreateGroup}
              handleUpdateGroup={handleUpdateGroup}
              handleDeleteGroup={handleDeleteGroup}>
              <Toast />
              <Router />
            </GroupProvider>
          </AuthProvider>
        </ThemeProvider>
        <ReactQueryDevtools initialIsOpen={true} />
      </RecoilRoot>
    </QueryClientProvider>
  );
}

export default App;
