import { RootStateOrAny } from "react-redux";

// export const loadingSelector = (state: RootStateOrAny) => state.loading;
export const selectedGenres = (state: RootStateOrAny) => state.filters.choosedGenres;
export const totalPages = (state: RootStateOrAny) => state.data.data.total_pages;
export const totalResults = (state: RootStateOrAny) => state.data.data.total_results;
// export const currentPage = (state: RootStateOrAny) => state.filters.currentPage;
export const sortValue = (state: RootStateOrAny) => state.filters.sortBy;
export const years = (state: RootStateOrAny) => state.filters.years;
export const selectedYear = (state: RootStateOrAny) => state.filters.year;
export const isShowModal = (state: RootStateOrAny) => state.data.isShowModal;
export const userInfo = (state: RootStateOrAny) => state.data.userInfo;
export const favouriteIDs = (state: RootStateOrAny) => state.favourites.favouriteIDs;
