import { RootStateOrAny } from "react-redux";

// export const loadingSelector = (state: RootStateOrAny) => state.loading;
export const trendingData = (state: RootStateOrAny) => state.data.data;
