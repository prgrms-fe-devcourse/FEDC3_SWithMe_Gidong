import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import Home from '../pages/Home';
import Header from '@/components/domain/Header';
import MyGroup from '@/pages/MyGroup';
import WriteTIL from '@/pages/WriteTIL';
import SignIn from '@/pages/SignIn';
import SignUp from '@/pages/SignUp';
import MyPage from '@/pages/MyPage';
import TIL from '@/pages/TIL';

function Router() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/signIn' element={<SignIn />} />
        <Route path='/signUp' element={<SignUp />} />
        <Route path='/myPage' element={<MyPage />} />
        <Route path='/myGroup' element={<MyGroup />} />
        <Route path='/writeTIL' element={<WriteTIL />} />
        <Route path='/TIL/:id' element={<TIL />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
