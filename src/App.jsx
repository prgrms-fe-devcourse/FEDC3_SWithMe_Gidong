import { createChannel, deleteChannel, getChannelList, updateChannel } from '@/api/channel';
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
import { useCallback } from 'react';

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
    <>
      <GlobalStyle />
      <ToastProvider>
        <AuthProvider>
          <UserProvider initialUsers={initialUsers}>
            <GroupProvider
              initialGroups={initialGroups}
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
    </>
  );
}

export default App;
