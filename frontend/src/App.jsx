import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Show, RedirectToSignIn } from "@clerk/react";
import DashboardPage from "./features/auth/pages/DashboardPage";
import ContractReviewPage from "./features/auth/pages/ContractReviewPage";
import SignInPage from "./features/auth/pages/SignInPage";
import SignUpPage from "./features/auth/pages/SignUpPage";
import ProtectedRoute from "./features/auth/components/ProtectedRoute";




function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignInPage />} />
        <Route path="/sign-in/*" element={<SignInPage />} />
        <Route path="/sign-up/*" element={<SignUpPage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
            
          }
        />
        <Route
          path="/contracts/:contractId/review"
          element={
            <ProtectedRoute>
              <ContractReviewPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;