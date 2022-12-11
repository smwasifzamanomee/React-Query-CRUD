import HorizontalFooter from '../../components/shared/HorizontalLayout/HorizontalFooter';
import HorizontalNavigation from '../../components/shared/HorizontalLayout/HorizontalNavigation';

export default function HorizontalLayout({ children }) {
  return (
    <>
      <HorizontalNavigation /> {children} <HorizontalFooter />
    </>
  );
}
