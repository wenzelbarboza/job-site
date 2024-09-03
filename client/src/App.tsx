import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import { LayOut } from "./Layout/LayOut";
import { LandingPage } from "./pages/LandingPage";
import { Onboarding } from "./pages/Onboarding";
import { JobListing } from "./pages/JobListing";
import { PostJob } from "./pages/PostJob";
import { MyJob } from "./pages/MyJob";
import { SavedJobs } from "./pages/SavedJobs";
import { JobPage } from "./pages/JobPage";
import { ThemeProvider } from "./components/theme-provider";
import { SignUp } from "./pages/SignUp";

const router = createBrowserRouter([
  {
    element: <LayOut />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/onboarding",
        element: (
          //<protectedRoute>
          <Onboarding />
          //</ProtectedRoute>
        ),
      },
      {
        path: "/jobs",
        element: (
          //<protectedRoute>
          <JobListing />
          //</ProtectedRoute>
        ),
      },
      {
        path: "/post-job",
        element: (
          //<protectedRoute>
          <PostJob />
          //</ProtectedRoute>
        ),
      },
      {
        path: "/my-jobs",
        element: (
          //<protectedRoute>
          <MyJob />
          //</ProtectedRoute>
        ),
      },
      {
        path: "/saved-jobs",
        element: (
          //<protectedRoute>
          <SavedJobs />
          //</ProtectedRoute>
        ),
      },
      {
        path: "signup",
        element: (
          //<protectedRoute>
          <SignUp />
          //</ProtectedRoute>
        ),
      },
      {
        path: "/job/:id",
        element: (
          //<protectedRoute>
          <JobPage />
          //</ProtectedRoute>
        ),
      },
    ],
  },
]);

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
