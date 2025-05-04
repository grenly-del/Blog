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
  route('/', './pages/HomePage/index.tsx', [
    index("./pages/Home.tsx"),
    route("login", "./pages/Login.tsx"),
    route("register", "./pages/Register.tsx"),
    // route("savedRecipes", "./pages/savedRecipes.tsx"),
  ]),
  route("createRecipe", "./pages/ProtectedPage/CreateRecipe/index.tsx"),
  route("updateRecipe", "./pages/UpdateRecipe.tsx"),
  route("help", "./pages/Help.tsx"),
  route("all", "./pages/AllRecipes.tsx"),
  route('protect-page', './pages/privatePage.tsx', [ // << --- Semua routes yang private dimasukan di dalam sini !
    index('./pages/ProtectedPage/Dashboard.tsx'), // <<-- contoh halaman yang private
  ])
] satisfies RouteConfig;
