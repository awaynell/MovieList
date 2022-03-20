import "./App.scss";
import Header from "./components/Header/Header";
import AppRouter from "./components/AppRouter/AppRouter";
import LoginModal from "./components/MoviesPage/LoginModal/LoginModal";

const App = () => {
  return (
    <>
      <Header />
      <LoginModal />
      <AppRouter />
    </>
  );
};

export default App;
