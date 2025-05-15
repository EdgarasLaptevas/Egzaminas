import { AuthProvider } from "@/contexts/AuthContext";
import { Register } from "@/pages/auth/Register";
import { LogIn } from "@/pages/auth/LogIn";
import { MainLayout } from "@/layouts/MainLayout";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import { HomePage } from "@/pages/home/HomePage";
import { UIProvider } from "@/contexts/UIContext";
import { PostList } from "@/pages/posts/PostList";
import { RegisterPostPage } from "@/pages/posts/RegisterPostPage";
import { EditPostPage } from "@/pages/posts/EditPostPage";
import { AuthGuard } from "@/pages/auth/AuthGuard";
import { ListProvider } from "@/contexts/ListContext";
import { ReviewsList } from "@/pages/reviews/ReviewList";
import { LeaveReviewPage } from "@/pages/reviews/LeaveReviewPage";
import { EditReviewPage } from "@/pages/reviews/EditReviewPage";
import { RegisterCategoryPage } from "@/pages/category/RegisterCategoryPage";
import { EditCategoryPage } from "@/pages/category/EditCategoryPage";
import { CategoryList } from "@/pages/category/CategoryList";

export const PageRoutes = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <UIProvider>
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Navigate to={"/home"} replace />} />
              <Route path="/home" element={<HomePage />} />
              <Route
                path="/posts"
                element={
                  <ListProvider>
                    <PostList />
                  </ListProvider>
                }
              />
              <Route
                path="/posts/register"
                element={
                  <AuthGuard>
                    <RegisterPostPage />
                  </AuthGuard>
                }
              />
              <Route
                path="/posts/edit/:entityId"
                element={
                  <AuthGuard>
                    <EditPostPage />
                  </AuthGuard>
                }
              />
              <Route
                path="/posts/:entityId/reviews"
                element={
                  <ListProvider>
                    <ReviewsList />
                  </ListProvider>
                }
              />
              <Route
                path="/posts/:entityId/leaveReview"
                element={
                  <AuthGuard>
                    <LeaveReviewPage />
                  </AuthGuard>
                }
              />
              <Route
                path="/reviews/edit/:entityId"
                element={
                  <AuthGuard>
                    <EditReviewPage />
                  </AuthGuard>
                }
              />
              <Route
                path="/categories"
                element={
                  <AuthGuard>
                    <ListProvider>
                      <CategoryList />
                    </ListProvider>
                  </AuthGuard>
                }
              />
              <Route
                path="/categories/register"
                element={
                  <AuthGuard>
                    <RegisterCategoryPage />
                  </AuthGuard>
                }
              />
              <Route
                path="/categories/edit/:entityId"
                element={
                  <AuthGuard>
                    <EditCategoryPage />
                  </AuthGuard>
                }
              />
            </Route>
          </Routes>
        </UIProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};
