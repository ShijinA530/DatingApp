import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Accept, DesignationPage, Group, HomePage, LocationPage, MatchPage, QualificationPage, Sent, ViewedMyProfilePage, HomePage, JobDetails, JobStatus, MoreJobDetails, RelationShipGoals, PersonalDetails,Interested,DatingInterest,LoginPage,SignUp,LandingPage } from './pages'
import DesktopLayout from './layout/DesktopLayout'
import ChangePwdPage from './pages/ChangePwdPage';
import EditprofilePage from './pages/EditprofilePage';
import PrivacyandSettingspage from './pages/PrivacyandSettingspage';
import SettingsPage from './pages/SettingsPage';
import BottomNavbar from './components/BottomNavbar';
import { SubHeader } from './Components';




function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DesktopLayout />}>
          <Route path='/' element={<HomePage />} />
          <Route path='/qualification' element={<QualificationPage />} />
          <Route path='/changepwd' element={<ChangePwdPage />} />
          <Route path='/editprofile' element={<EditprofilePage />} />
          <Route path='/privacyandsetting' element={<PrivacyandSettingspage />} />
          <Route path='/settings' element={<SettingsPage />} />
          <Route path='/location' element={<LocationPage />} />
          <Route path='/designation' element={<DesignationPage />} />
          <Route path='/profile-views' element={<ViewedMyProfilePage />} />
          <Route path='/match' element={<MatchPage />} />
          <Route path='/test' element={<Group />} />
        </Route>
        <Route path='job_status' element={<JobStatus />} />
        <Route path='job_details' element={<JobDetails />} />
        <Route path='more_job_details' element={<MoreJobDetails />} />
        <Route path='relationship_goals' element={<RelationShipGoals />} />
        <Route path='interested' element={<Interested />} />
        <Route path='dating_interest' element={<DatingInterest />} />
        <Route path='personal_details' element={<PersonalDetails />} />
        <Route path='login' element={<LoginPage />} />
        <Route path='sign_up' element={<SignUp />} />
        <Route path='landing_page' element={<LandingPage />} />

      </Routes>
      <BottomNavbar />
    </BrowserRouter>
  );
}

export default App;
