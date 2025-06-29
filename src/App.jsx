import { lazy, useState } from 'react'

import { BrowserRouter, Route, Routes } from 'react-router-dom'

const HomePage = lazy(() => import('./pages/Home'))
const HrLoginPage = lazy(() => import('./pages/hr/HrAuth'))
const InternLoginPage = lazy(() => import('./pages/intern/InternAuth'))
const HRDashboard = lazy(() => import("./pages/hr/HRDashboard"))
const AssignmentPage = lazy(() => import("./pages/hr/AssignmentPage"));
const AttendancePage = lazy(() => import("./pages/hr/AttendancePage"));
const WorksheetPage = lazy(() => import("./pages/hr/WorksheetPage"));
const InternRegistration = lazy(()=>import('./pages/hr/InternRegistration'))

const InternAuthPage = lazy(()=>import('./pages/intern/InternAuth'))
const InternDashboardHome = lazy(()=>import('./pages/intern/InternDashboardHome'));
const TaskPage = lazy(()=>import('./pages/intern/TaskPage'));
const AttendanceStatusPage = lazy(()=>import('./pages/intern/AttendanceStatusPage'));
const InternWorksheetPage = lazy(()=>import('./pages/intern/WorksheetViewPage'))

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/hrLogin' element={<HrLoginPage />} />
          <Route path='/internLogin' element={<InternLoginPage />} />
          <Route path="/hr/dashboard" element={<HRDashboard />} />
          <Route path="/hr/dashboard/assignments" element={<AssignmentPage />} />
          <Route path="/hr/dashboard/attendance" element={<AttendancePage />} />
          <Route path="/hr/dashboard/worksheets" element={<WorksheetPage />} />
            <Route path="/hr/dashboard/internRegister" element={<InternRegistration />} />

          {/* { INTERN ROutes} */}
          <Route path='/internLogin' element={<InternAuthPage />} />
          <Route path="/intern/dashboard" element={<InternDashboardHome />} />
          <Route path="/intern/dashboard/tasks" element={<TaskPage />} />
          <Route path="/intern/dashboard/attendance" element={<AttendanceStatusPage />} />
          <Route path="/intern/dashboard/worksheets" element={<InternWorksheetPage />} />
        </Routes>

      </BrowserRouter>
    </>
  )
}

export default App
