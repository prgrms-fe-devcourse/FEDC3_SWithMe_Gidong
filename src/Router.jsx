import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Home from '../pages/Home';
import MyGroup from './pages/MyGroup';
import WriteTIL from './pages/WriteTIL';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path='/' element={<Home />} /> */}
        <Route path='/myGroup' element={<MyGroup />} />
        <Route path='/writeTIL' element={<WriteTIL />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
