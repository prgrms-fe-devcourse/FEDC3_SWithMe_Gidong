import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Home from '../pages/Home';
import MyGroup from './pages/MyGroup';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path='/' element={<Home />} /> */}
        <Route path='/myGroup' element={<MyGroup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
