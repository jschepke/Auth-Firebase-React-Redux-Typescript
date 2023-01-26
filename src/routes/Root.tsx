import { Outlet } from 'react-router-dom';

import Navbar from '../components/NavBar';
import Theme from '../features/themes/Theme';

const Root = () => {
  return (
    <Theme>
      <>
        <Navbar />
        <Outlet />
      </>
    </Theme>
  );
};

export default Root;
