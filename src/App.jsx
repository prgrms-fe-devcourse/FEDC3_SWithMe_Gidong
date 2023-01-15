import GroupProvider from '@/context/GroupProvider';
import TILProvider from '@/context/TILProvider';
import Router from './Router';
import GlobalStyle from './styles/globalStyle';
import { getChannelList } from '@/api/channel';
import { useAsync } from '@/hooks';

function App() {
  const initialGroups = useAsync(getChannelList, []);

  return (
    <>
      <GlobalStyle />
      <GroupProvider initialGroups={initialGroups}>
        <TILProvider>
          <Router />
        </TILProvider>
      </GroupProvider>
    </>
  );
}

export default App;
