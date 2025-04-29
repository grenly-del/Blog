import { type RouteConfig, index } from "@react-router/dev/routes";

export default [
  index("./pages/Home.tsx"),
] satisfies RouteConfig;


// import React, { useEffect, useState } from "react";
// import { createBrowserRouter, RouterProvider } from "react-router-dom";

// // Import components
// import TopNavBar from "./components/TopNavBar";
// import Footer from "./components/Footer";

// // Import pages
// import Home from "./pages/Home";
// import Register from "./pages/Register";
// import Login from "./pages/Login";
// import Help from "./pages/Help";
// import CreateRecipe from "./pages/CreateRecipe";
// import SavedRecipes from "./pages/SavedRecipes";
// import UpdateRecipe from "./pages/UpdateRecipe";
// import Logout from "./pages/Logout";
// import GetAllRecipes from "./pages/AllRecipes";

// // Context
// import { AuthProvider } from "./context/AuthContext";

// const Root: React.FC = () => {
//   // Define routes for the router
//   const routes = [
//     {
//       path: "/",
//       element: (
//         <AuthProvider>
//           <div className="App">
//             <TopNavBar />
//             <Footer />
//           </div>
//         </AuthProvider>
//       ),
//       children: [
//         { path: "/", element: <Home /> },
//         { path: "/login", element: <Login /> },
//         { path: "/logout", element: <Logout /> },
//         { path: "/register", element: <Register /> },
//         { path: "/createRecipe", element: <CreateRecipe /> },
//         { path: "/savedRecipes", element: <SavedRecipes /> },
//         { path: "/updateRecipe", element: <UpdateRecipe /> },
//         { path: "/help", element: <Help /> },
//         { path: "/all", element: <GetAllRecipes /> },
//       ],
//     },
//   ];

//   // Create the browser router
//   const router = createBrowserRouter(routes);

//   // Render the router
//   return <RouterProvider router={router} />;
// };

// export default Root;
