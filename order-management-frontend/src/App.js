import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import { ToastContainer } from 'react-toastify'
import LoginPage from "./pages/auth/login/login";
import AuthProvider from './contexts/AuthProvider';
import ForgotPassword from './pages/auth/forgot-password/forgot-password';
import ResetPassword from './pages/auth/reset-password/reset-password';
import AuthenticatedRoutes from "./pages/authenticated-routes/authenticated-routes";
import "./App.css";

// Setting Page Routes here
import UserSettingPage from "./pages/settings/user/user";
import RoleSettingPage from './pages/settings/role/role';
import LocationSettingPage from './pages/settings/location/location';
import GroupSettingPage from './pages/settings/group/group';
import OrganisationSettingPage from "./pages/settings/organisation/organisation";
import ResourceCategoryPage from "./pages/settings/resources/category/category";
import ResourceManufacturePage from "./pages/settings/resources/manufacture/manufacture";
import ResourceTypePage from "./pages/settings/resources/type/type";
import ResourcePage from "./pages/settings/resources/resource/resource";
import ProcessSettingPage from "./pages/settings/process/process";

import DashboardPage from './pages/dashboard/dashboard';
import OperationPage from './pages/operations/operations';
import ArchivePage from "./pages/operations/archive/archive";
import PlanningPage from './pages/operations/planning/planning';
import ReleasePage from './pages/operations/release/release';
import ImplementPage from './pages/operations/implement/implement';

import { Container } from "react-bootstrap";

function App() {
    return (
        <AuthProvider>
            <ToastContainer position="bottom-center" theme="colored" />
            <Router>
                <div>
                    <Routes>
                        <Route path="/" element={<LoginPage />} />
                        <Route path="/forgotPassword" element={<ForgotPassword />} />
                        <Route path="/resetPassword" element={<ResetPassword />} />

                        <Route path="/dashboard" element={<AuthenticatedRoutes element={<DashboardPage />}/>}/>

                        <Route path="operations" element={<div><AuthenticatedRoutes element={<OperationPage />}/><Outlet /></div>}>
                            <Route path="planning" element={<Container><PlanningPage /></Container>}/>   
                            <Route path="release" element={<Container><ReleasePage /></Container>}/>   
                            <Route path="implement" element={<Container><ImplementPage /></Container>}/>   
                            <Route path="archive" element={<Container><ArchivePage /></Container>}/>    
                        </Route>

                        {/* Setting Page Routes here */}
                        <Route path="/settings/user" element={<AuthenticatedRoutes element={<UserSettingPage />}/>} />
                        <Route path="/settings/location" element={<AuthenticatedRoutes element={<LocationSettingPage />}/>} />
                        <Route path="/settings/group" element={<AuthenticatedRoutes element={<GroupSettingPage />}/>} />
                        <Route path="/settings/organisation" element={<AuthenticatedRoutes element={<OrganisationSettingPage />}/>} />
                        <Route path="/settings/process" element={<AuthenticatedRoutes element={<ProcessSettingPage />}/>} />
                        <Route path="/settings/role" element={<AuthenticatedRoutes element={<RoleSettingPage />}/>} />
                        <Route path="/settings/resources/category" element={<AuthenticatedRoutes element={<ResourceCategoryPage />}/>} />
                        <Route path="/settings/resources/manufacture" element={<AuthenticatedRoutes element={<ResourceManufacturePage />}/>} />
                        <Route path="/settings/resources/type" element={<AuthenticatedRoutes element={<ResourceTypePage />}/>} />
                        <Route path="/settings/resources/resource" element={<AuthenticatedRoutes element={<ResourcePage />}/>} />

                    </Routes>
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;
