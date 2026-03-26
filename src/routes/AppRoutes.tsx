import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { ProtectedRoute } from '@/components/ProtectedRoute'
import { MainLayout } from '@/layouts/MainLayout'
import { FaqPage } from '@/pages/FaqPage'
import { CheckInPage } from '@/pages/CheckInPage'
import { DashboardPage } from '@/pages/DashboardPage'
import { HistoryPage } from '@/pages/HistoryPage'
import { LandingPage } from '@/pages/LandingPage'
import { LoginPage } from '@/pages/LoginPage'
import { PlaceholderPage } from '@/pages/PlaceholderPage'
import { SignupPage } from '@/pages/SignupPage'
import { WrapPage } from '@/pages/WrapPage'

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/faq" element={<FaqPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/app" element={<MainLayout />}>
            <Route
              index
              element={<DashboardPage />}
            />
            <Route
              path="check-in"
              element={<CheckInPage />}
            />
            <Route
              path="history"
              element={<HistoryPage />}
            />
            <Route
              path="analytics"
              element={
                <PlaceholderPage
                  title="Analytics"
                  description="Charts and summary cards will appear here next."
                />
              }
            />
            <Route
              path="wrap"
              element={<WrapPage />}
            />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
