import { createChannel, deleteChannel, updateChannel } from '@/api/channel';
import { getAllUsers } from '@/api/user';
import AuthProvider from '@/context/AuthProvider';
import CommentProvider from '@/context/CommentProvider';
import GroupProvider from '@/context/GroupProvider';
import LikeProvider from '@/context/LikeProvider';
import TILProvider from '@/context/TILProvider';
import ToastProvider from '@/context/ToastProvider';
import UserProvider from '@/context/UserProvider';
import { useAsync } from '@/hooks';
import Router from '@/Router';
import GlobalStyle from '@/styles/globalStyle';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useCallback } from 'react';

function App() {
  const queryClient = new QueryClient();
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
      <GlobalStyle />
      <ToastProvider>
        <AuthProvider>
          <UserProvider initialUsers={initialUsers}>
            <GroupProvider
              initialGroups={[]}
              handleCreateGroup={handleCreateGroup}
              handleUpdateGroup={handleUpdateGroup}
              handleDeleteGroup={handleDeleteGroup}>
              <TILProvider>
                <CommentProvider>
                  <LikeProvider>
                    <Router />
                  </LikeProvider>
                </CommentProvider>
              </TILProvider>
            </GroupProvider>
          </UserProvider>
        </AuthProvider>
      </ToastProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
