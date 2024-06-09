import Login from './Login'
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Register from './Register';

const Body = () => {
    const appRouter = createBrowserRouter([
        {
          path: "/",
          element: <Login />,
        },
        {
          path: "/register",
          element: <Register />,
        }
      ]);
  return (
    <div>
        
      <RouterProvider router={appRouter} />
   

    </div>
  )
}

export default Body