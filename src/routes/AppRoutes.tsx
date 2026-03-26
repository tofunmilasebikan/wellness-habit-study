import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { ProtectedRoute } from '@/components/ProtectedRoute'
import { MainLayout } from '@/layouts/MainLayout'
import { LandingPage } from '@/pages/LandingPage'
import { LoginPage } from '@/pages/LoginPage'
import { PlaceholderPage } from '@/pages/PlaceholderPage'
import { SignupPage } from '@/pages/SignupPage'

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/app" element={<MainLayout />}>
            <Route
              index
              element={
                <PlaceholderPage
                  title="Dashboard"
                  description="Signed in successfully. Overview and quick links will grow as check-in and analytics are wired to your Supabase data."
                />
              }
            />
            <Route
              path="check-in"
              element={
                <PlaceholderPage
                  title="Daily check-in"
                  description="Daily wellness form (sleep, study, mood, stress, journal) is the next feature to connect to daily_wellness_entries."
                />
              }
            />
            <Route
              path="history"
              element={
                <PlaceholderPage
                  title="History"
                  description="Your saved entries will load here from Supabase, with CSV export to follow."
                />
              }
            />
            <Route
              path="analytics"
              element={
                <PlaceholderPage
                  title="Analytics"
                  description="Charts and summary cards will use your data and the Feb 16–Mar 17 demo dataset for class demos."
                />
              }
            />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
