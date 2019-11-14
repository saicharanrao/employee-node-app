import employeeService from './service';

export default class Routes {

    constructor(app) {

        try {
            // GET employees
            app.route('/employees')
                .get(function (req, res) {
                    let apiGetResponse = {};
                    try {
                        apiGetResponse = employeeService.listAllEmployees();
                        return res.json(apiGetResponse);
                    } catch (e) {
                        console.error(e.message);
                        res.status(500);
                        res.send(e.message);
                    }
                });

            //POST employees
            app.route('/employees')
                .post(function (req, res) {
                    let apiPostResponse = {};
                    try {
                        apiPostResponse = employeeService.createNewEmployee(
                            req.body.firstName,
                            req.body.lastName,
                            req.body.hireDate, req.body.role);
                        return res.json(apiPostResponse);
                    } catch (e) {
                        console.error(e.message);
                        res.status(400);
                        res.send(e.message);
                    }
                });

            //GET,PUT,DELETE /employees/:empId
            app.route('/employees/:empId')
                .get(function (req, res) {
                    let apiGetEmpResponse = {};
                    try {
                        apiGetEmpResponse = employeeService.getEmployeeById(req.params.empId);
                        return res.json(apiGetEmpResponse);
                    } catch (e) {
                        console.error(e.message);
                        res.status(500);
                        res.send(e.message);
                    }
                });

            app.route('/employees/:empId')
                .put(function (req, res) {
                    let apiPutEmpResponse = {};
                    try {
                        apiPutEmpResponse = employeeService.updateEmployeeById(
                            req.params.empId,
                            req.body.firstName, req.body.lastName,
                            req.body.hireDate, req.body.role, req.body.firstQuote,
                            req.body.secondQuote);
                        return res.json(apiPutEmpResponse);
                    } catch (e) {
                        console.error(e.message);
                        res.status(400);
                        res.send(e.message);
                    }

                });

            app.route('/employees/:empId')
                .delete(function (req, res) {
                    let apiDeleteEmpResponse = {};
                    try {
                        apiDeleteEmpResponse = employeeService.deleteEmployeeById(req);
                        return res.json(apiDeleteEmpResponse);
                    } catch (e) {
                        console.error(e.message);
                        res.status(400);
                        res.send(e.message);
                    }

                });
        } catch (e) {
            console.error("Error in Routes" + e);
        }

    }

}
