import VerticalFooter from '../../components/shared/VerticalLayout/VerticalFooter';
import VerticalNavigation from '../../components/shared/VerticalLayout/VerticalNavigation';

export default function VerticalLayout({ children }) {
  return (
    <>
      <VerticalNavigation /> {children} <VerticalFooter />
    </>
  );
}
