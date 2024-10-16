import { configureStore } from "@reduxjs/toolkit";
// import { githubApi } from "./github/github.api";
import { setupListeners } from "@reduxjs/toolkit/query";
// import { githubReducer } from "./github/github.slice";
import { audioaddictApi } from "./audioaddict/audioaddict.api";

export const store = configureStore({
  reducer: {
    // [githubApi.reducerPath]: githubApi.reducer,
    [audioaddictApi.reducerPath]: audioaddictApi.reducer,
    // github: githubReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(audioaddictApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
