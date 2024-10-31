import './App.css';
import PostList from './components/PostList';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout'
import NotFound from './components/NotFound'
import Home from './components/Home'
import { PostProvider } from './context/PostContext';
import Post from './components/Post';

const route = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '/', element: <Home />, errorElement: <NotFound /> },
      { path: '/posts', element: <PostList /> },
      { path: '/posts/:id', element:(
                <PostProvider>
                  <Post />
                </PostProvider> ),
      },
    ],
  },

]);

function App() {
  return (
    <div>
     <RouterProvider router={route} />
    </div>
  );
}

export default App;
