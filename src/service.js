import shortid from 'shortid';
import Employee from './domain';
import moment from 'moment';
import request from 'sync-request';

class EmployeeService {

    constructor() {
        this.employees = {};
        this.roles = new Set(["CEO", "VP", "MANAGER", "LACKEY"]);
        this.ceoId = null;
        this.firstQuoteURL = "https://ron-swanson-quotes.herokuapp.com/v2/quotes";
        this.secondQuoteURL = "https://quotes.rest/qod";
        this.dateFormat = "YYYY-MM-DD";

        this.CEO = "CEO";
    }

    listAllEmployees() {
        try {
            return this.employees;
        } catch (e) {
            console.error("Error in listAllEmployees() " + e);
            throw new Error(e.message);
        }
    }

    createNewEmployee(firstName, lastName, hireDate, role) {
        let employee = null;
        try {
            const id = shortid.generate();

            role = role.toUpperCase();
            this.validateEmployee(id, firstName, lastName,
                hireDate, role);

            const firstQuote = this.getFirstQuote();
            const secondQuote = this.getSecondQuote();

            employee = new Employee(id, firstName, lastName,
                hireDate, role, firstQuote, secondQuote);
            this.employees[id] = employee;

            if (role === this.CEO) {
                this.ceoId = id;
            }
        } catch (e) {
            console.error("Error in createNewEmployee(req) " + e.message);
            throw new Error(e.message);
        }

        return employee;
    }

    getEmployeeById(empId) {
        let response = null;
        try {
            response = this.employees[empId];
        } catch (e) {
            console.error("Error in getEmployeeById(req) " + e);
            throw new Error(e.message);
        }
        return response;
    }

    updateEmployeeById(id, firstName, lastName, hireDate, role, firstQuote,
                       secondQuote) {
        let employee = null;
        try {
            role = role.toUpperCase();
            this.validateEmployee(id, firstName, lastName,
                hireDate, role);

            let prevRole = this.employees[id].role;

            employee = new Employee(id, firstName, lastName,
                hireDate, role, firstQuote,
                secondQuote);
            this.employees[id] = employee;

            if (employee.role !== prevRole && prevRole == this.CEO) {
                this.ceoId = null;
            }
            if (employee.role == this.CEO) {
                this.ceoId = id;
            }
        } catch (e) {
            console.error("Error in updateEmployeeById(...) " + e);
            throw new Error(e.message);
        }

        return employee;
    }

    deleteEmployeeById(req) {
        let employee = null;
        try {
            const id = req.params.empId;
            employee = this.employees[id];
            delete this.employees[id];
            if (id === this.ceoId) {
                this.ceoId = null;
            }
        } catch (e) {
            console.error("Error in deleteEmployeeById(req) " + e);
            throw new Error(e.message);
        }
        return employee;
    }

    getFirstQuote() {
        let response = null;
        try {
            let result = request('GET', this.firstQuoteURL);
            let jsonBody = JSON.parse(result.getBody('utf8'));
            response = jsonBody[0];
        } catch (e) {
            console.error("Error in getFirstQuote " + e);
            throw new Error(e.message);
        }
        return response;
    }

    getSecondQuote() {
        let response = null;
        try {
            let res = request('GET', this.secondQuoteURL);
            let jsonBody = JSON.parse(res.getBody('utf8'));
            response = jsonBody.contents.quotes[0].quote;
        } catch (e) {
            console.error("Error in getSecondQuote " + e);
            if (e.statusCode == 429) { //rate limit of 10/hour for this API
                response = "Default second quote";
            } else {
                throw new Error(e.message);
            }
        }
        return response;

    }

    validateEmployee(id, firstName, lastName, hireDate, role) {
        if (!firstName) {
            throw new Error("First Name must not be null or an empty string.");
        } else if (typeof firstName !== "string") {
            throw new Error("First Name must be a string.");
        }

        if (!lastName) {
            throw new Error("Last Name must not be null or an empty string.");
        } else if (typeof lastName !== "string") {
            throw new Error("Last Name must be a string.");
        }

        if (!moment(hireDate, this.dateFormat, true).isValid()) {
            throw new Error("Hire Date must be valid & in format YYYY-MM-DD");
        }

        let date1 = moment().format("YYYY-MM-DD");
        if (date1 <= hireDate) {   // if startDate is less than or equal to today
            throw new Error("Hire Date must be in the past")
        }

        this.validateRole(role, id);

    }

    validateRole(role, id) {
        if (!role) {
            throw new Error("Role must not be null or an empty string.");
        } else if (typeof role !== "string") {
            throw new Error("Role must be a string.");
        }

        if (!this.roles.has(role)) {
            throw new Error("Role should be CEO/VP/MANAGER/LACKEY.");
        }

        if (role == this.CEO && this.ceoId && this.ceoId !== id) {
            throw new Error(
                "A CEO already exists in the datastore.Please choose a different role");
        }
    }

}

export default new EmployeeService();