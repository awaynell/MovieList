import Header from "../components/Header/Header";
import LoginModal from "../components/MoviesPage/LoginModal/LoginModal";
import PageUp from "../components/UI/PageUp/PageUp";

const Layout = (props: any) => {
  return (
    <>
      <Header />
      <main>{props.children}</main>
      <LoginModal />
      <PageUp />
    </>
  );
};

export default Layout;
