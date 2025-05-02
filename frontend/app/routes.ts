import { type RouteConfig, index, route } from "@react-router/dev/routes";

// <Routes>
//     <Route path="/" element={<Home />} />
//     <Route path="/login" element={<Login />} />
//     <Route path="/logout" element={<Logout />} />
//     <Route path="/register" element={<Register />} />
//     <Route path="/createRecipe" element={<CreateRecipe />} />
//     <Route path="/savedRecipes" element={<SavedRecipes />} />
//     <Route path="/updateRecipe" element={<UpdateRecipe />} />
//     <Route path="/help" element={<Help />} />
//     <Route path="/all" element={<GetAllRecipes />} />
// </Routes>

export default [
  index("./pages/Home.tsx"),
  route("login", "./pages/Login.tsx"),
  route("register", "./pages/Register.tsx"),
  route("createRecipe", "./pages/CreateRecipe.tsx"),
  route("savedRecipes", "./pages/savedRecipes.tsx"),
  route("updateRecipe", "./pages/UpdateRecipe.tsx"),
  route("help", "./pages/Help.tsx"),
  route("all", "./pages/AllRecipes.tsx"),
<<<<<<< HEAD
  route("Dashboard", "./pages/Dashboard.tsx"),
=======
  route('protect-page', './pages/privatePage.tsx', [
    index('./pages/ProtectedPage/index.tsx')
  ])
>>>>>>> 14a7f516e98906c268bba4e825cc5ff425e89687
] satisfies RouteConfig;
