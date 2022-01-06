import { RootStateOrAny } from "react-redux";

// export const loadingSelector = (state: RootStateOrAny) => state.loading;
export const trendingData = (state: RootStateOrAny) => state.data.data;
export const selectedGenres = (state: RootStateOrAny) => state.genres.genres;
export const totalPages = (state: RootStateOrAny) => state.data.data.total_pages;
export const totalResults = (state: RootStateOrAny) => state.data.data.total_results;
export const currentPage = (state: RootStateOrAny) => state.data.page;
