import Header from "../components/Header/Header";
import LoginModal from "../components/MoviesPage/LoginModal/LoginModal";

const Layout = (props: any) => {
  return (
    <>
      <Header />
      <main>{props.children}</main>
      <LoginModal />
    </>
  );
};

export default Layout;
