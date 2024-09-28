import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import EmployeeList from './EmployeeList';
import AddEmployee from './AddEmployee';
import UpdateEmployee from './UpdateEmployee';
import DeleteEmployee from './DeleteEmployee';

const App = () => {
    return (
        <Router>
            <Switch>
                <Route path="/employees" component={EmployeeList} />
                <Route path="/add-employee" component={AddEmployee} />
                <Route path="/update-employee" component={UpdateEmployee} />
                <Route path="delete-employee" component={DeleteEmployee} />
            </Switch>
        </Router>
    );
};

export default App;
