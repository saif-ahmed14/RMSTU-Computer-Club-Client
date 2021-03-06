import React from 'react';
import './Outlet.css';
import { Route, Switch } from 'react-router-dom';
import { useRouteMatch } from 'react-router-dom/cjs/react-router-dom.min';
import AdminRoute from '../../AdminRoute/AdminRoute';
import AddNotice from './AddNotice/AddNotice';
import AddProgrammingContest from './AddProgrammingContest/AddProgrammingContest';
import AllEvents from './AddProgrammingContest/AllEvents';
import AllNotice from './AllNotice/AllNotice';
import AddStudent from './Department/AddStudent';
import AddTeacher from './Department/AddTeacher';
import Students from './Department/Students';
import Teachers from './Department/Teachers';
import AddExecutive from './Executive/AddExecutive';
import Executive from './Executive/Executive';
import MakeAdmin from './MakeAdmin/MakeAdmin';
import AddResult from './Result/AddResult';
import Results from './Result/Results';
import Users from './Users/Users';
const Outlet = () => {
    let { path } = useRouteMatch();
    return (
        <div className='outlet-container'>
            <Switch>
                <Route exact path={path} className=''>
                    <h1 className='fw-bolder py-5 mt-5 text-center dashboard-heading'>Start to update your profile</h1>
                </Route>
                <AdminRoute path={`${path}/all-events`}>
                    <AllEvents />
                </AdminRoute>
                <AdminRoute path={`${path}/add-event`}>
                    <AddProgrammingContest />
                </AdminRoute>
                <AdminRoute path={`${path}/users`}>
                    <Users />
                </AdminRoute>
                <AdminRoute path={`${path}/make-admin`}>
                    <MakeAdmin />
                </AdminRoute>
                <AdminRoute path={`${path}/all-notice`}>
                    <AllNotice />
                </AdminRoute>
                <AdminRoute path={`${path}/add-notice`}>
                    <AddNotice />
                </AdminRoute>
                <AdminRoute path={`${path}/results`}>
                    <Results />
                </AdminRoute>
                <AdminRoute path={`${path}/add-new-results`}>
                    <AddResult />
                </AdminRoute>
                <AdminRoute path={`${path}/all-executive`}>
                    <Executive />
                </AdminRoute>
                <AdminRoute path={`${path}/add-executive`}>
                    <AddExecutive />
                </AdminRoute>
                <AdminRoute path={`${path}/add-student`}>
                    <AddStudent />
                </AdminRoute>
                <AdminRoute path={`${path}/students`}>
                    <Students />
                </AdminRoute>
                <AdminRoute path={`${path}/add-teacher`}>
                    <AddTeacher />
                </AdminRoute>
                <AdminRoute path={`${path}/teachers`}>
                    <Teachers />
                </AdminRoute>
            </Switch>
        </div>
    );
};

export default Outlet;