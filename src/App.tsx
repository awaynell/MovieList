import MoviesPage from "./components/MoviesPage/MoviesPage";
import "./App.scss";
import Header from "./components/Header/Header";

export const App = () => {
  return (
    <>
      <Header />
      <MoviesPage />
    </>
  );
};

export default App;
