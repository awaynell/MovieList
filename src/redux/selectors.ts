import { RootStateOrAny } from "react-redux";

// export const loadingSelector = (state: RootStateOrAny) => state.loading;
export const selectedGenres = (state: RootStateOrAny) => state.filters.choosedGenres;
export const totalPages = (state: RootStateOrAny) => state.data.data.total_pages;
export const totalResults = (state: RootStateOrAny) => state.data.data.total_results;
export const currentPage = (state: RootStateOrAny) => state.data.currentPage;
export const sortValue = (state: RootStateOrAny) => state.filters.sortBy;
export const years = (state: RootStateOrAny) => state.filters.years;
export const selectedYear = (state: RootStateOrAny) => state.filters.year;
export const isShowModal = (state: RootStateOrAny) => state.data.isShowModal;
export const userInfo = (state: RootStateOrAny) => state.data.userInfo;
export const favouriteIDs = (state: RootStateOrAny) => state.favouritesAndWatchlist.favouriteIDs;
export const watchlistIDs = (state: RootStateOrAny) => state.favouritesAndWatchlist.watchlistIDs;
export const searchQuery = (state: RootStateOrAny) => state.search.searchQuery;
export const searchPage = (state: RootStateOrAny) => state.search.page;
export const searchedMovies = (state: RootStateOrAny) => state.search.searchedMovies;
export const searchLoading = (state: RootStateOrAny) => state.search.loading;
export const prevRoutePath = (state: RootStateOrAny) => state.search.prevRoutePath;
