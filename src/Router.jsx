import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from '@/pages/Home';
import MyGroup from '@/pages/MyGroup';
import SignIn from '@/pages/SignIn';
import SignUp from '@/pages/SignUp';
import MyPage from '@/pages/MyPage';
import TIL from '@/pages/TIL';
import TILEditor from '@/pages/TILEditor';
import JoinGroup from '@/pages/JoinGroup';
import ManageGroup from '@/pages/ManageGroup';
import SearchResult from '@/pages/SearchResult';
import Template from '@/components/template';

function Router() {
  return (
    <BrowserRouter>
      <Template>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/signIn' element={<SignIn />} />
          <Route path='/signUp' element={<SignUp />} />
          <Route path='/myPage' element={<MyPage />} />
          <Route path='/joinGroup' element={<JoinGroup />} />
          <Route path='/myGroup' element={<MyGroup />} />
          <Route path='/manageGroup' element={<ManageGroup />} />
          <Route path='/writeTIL' element={<TILEditor />} />
          <Route path='/updateTIL/:id' element={<TILEditor />} />
          <Route path='/TIL/:id' element={<TIL />} />
          <Route path='/searchResult' element={<SearchResult />} />
        </Routes>
      </Template>
    </BrowserRouter>
  );
}

export default Router;
