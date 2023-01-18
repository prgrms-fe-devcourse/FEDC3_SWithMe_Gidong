import { createChannel, updateChannel, deleteChannel, getChannelList } from '@/api/channel';
import AuthProvider from '@/context/AuthProvider';
import CommentProvider from '@/context/CommentProvider';
import GroupProvider from '@/context/GroupProvider';
import LikeProvider from '@/context/LikeProvider';
import TILProvider from '@/context/TILProvider';
import { useAsync } from '@/hooks';
import Router from '@/Router';
import GlobalStyle from '@/styles/globalStyle';
import { useCallback } from 'react';

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
    <>
      <GlobalStyle />
      <AuthProvider>
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
      </AuthProvider>
    </>
  );
}

export default App;
