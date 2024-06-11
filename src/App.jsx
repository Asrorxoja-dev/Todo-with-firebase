import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Mainlayout from "./layout/Mainlayout"
import Home from "./pages/Home"


function App() {
  const routes= createBrowserRouter([
{
  path:"/",
  element:<Mainlayout/>,
  children:[
    {
      index:true,
      element:<Home/>
    }
  ]
}])
 
  return  <RouterProvider router={routes}/>
}

export default App