import MoviesPage from "./components/MoviesPage/MoviesPage";
import "./App.scss";
import Header from "./components/Header/Header";
import AppRouter from "./components/AppRouter/AppRouter";

export const App = () => {
  return (
    <>
      <Header />
      <AppRouter />
    </>
  );
};

export default App;
