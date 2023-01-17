import AuthProvider from '@/context/AuthProvider';
import GroupProvider from '@/context/GroupProvider';
import TILProvider from '@/context/TILProvider';
import Router from '@/Router';
import GlobalStyle from './styles/globalStyle';
import { getChannelList, createChannel } from '@/api/channel';
import { useAsync } from '@/hooks';
import { useCallback } from 'react';

function App() {
  const initialGroups = useAsync(getChannelList, []);
  const handleCreateGroup = useCallback(async (data) => {
    return await createChannel(data);
  }, []);

  return (
    <>
      <GlobalStyle />
      <AuthProvider>
        <GroupProvider initialGroups={initialGroups} handleCreateGroup={handleCreateGroup}>
          <TILProvider>
            <Router />
          </TILProvider>
        </GroupProvider>
      </AuthProvider>
    </>
  );
}

export default App;
