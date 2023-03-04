import Theme from '../features/themes/Theme';
import Navbar from './NavBar';

interface LayoutProps {
  children: React.ReactNode;
}

/**
 * Global layout for the app.
 *
 * @returns `Theme` and layout components eg. `Navbar` and `children`
 */
export const Layout = ({ children }: LayoutProps) => {
  return (
    <Theme>
      <Navbar />
      {children}
    </Theme>
  );
};
