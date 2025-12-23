
// import { configureStore } from "@reduxjs/toolkit";
// import { apiService } from "./services/apiService"; // includes couponsApi via injectEndpoints
// import { customersApi } from "./services/customersApi";
// import { ordersApi } from "./services/ordersApi";
// import { profileApi } from "./services/profileApi";

// export const store = configureStore({
//   reducer: {
//     [apiService.reducerPath]: apiService.reducer,   // couponsApi is injected here
//     [customersApi.reducerPath]: customersApi.reducer,
//     [ordersApi.reducerPath]: ordersApi.reducer,
//     [profileApi.reducerPath]: profileApi.reducer,
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware()
//       .concat(apiService.middleware)    // only once
//       .concat(customersApi.middleware)
//       .concat(ordersApi.middleware)
//       .concat(profileApi.middleware),
// });

import { configureStore } from "@reduxjs/toolkit";
import { apiService } from "./services/apiService";
import { customersApi } from "./services/customersApi";
import { ordersApi } from "./services/ordersApi";
import { profileApi } from "./services/profileApi";
import { leadsApi } from "./services/leadsApi";  // ← Import leadsApi
import { productsApi } from "./services/productsApi"; // ← Import productsApi

export const store = configureStore({
  reducer: {
    [apiService.reducerPath]: apiService.reducer,
    [customersApi.reducerPath]: customersApi.reducer,
    [ordersApi.reducerPath]: ordersApi.reducer,
    [profileApi.reducerPath]: profileApi.reducer,
    [leadsApi.reducerPath]: leadsApi.reducer,   // ← Add leadsApi reducer
    [productsApi.reducerPath]: productsApi.reducer, // ← Add productsApi reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(apiService.middleware)
      .concat(customersApi.middleware)
      .concat(ordersApi.middleware)
      .concat(profileApi.middleware)
      .concat(leadsApi.middleware)            // ← Add leadsApi middleware
      .concat(productsApi.middleware),         // ← Add productsApi middleware
});
