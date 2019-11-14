# employee-node-app


## Running Locally

Make sure you have [Node.js](http://nodejs.org/) installed.

```sh
$ git clone https://github.com/saicharanrao/employee-node-app.git 
$ cd employee-node-app
$ npm install
$ npm start
```

App should now be running on [localhost:3000](http://localhost:3000/). Used [Postman](https://www.getpostman.com/downloads/) for testing.  

## REST API

### 1) GET Employees

Endpoint:  [localhost:3000/employees](http://localhost:3000/employees)

Sample Response:
```$xslt
{
    "5tQ2tfwF": {
        "id": "5tQ2tfwF",
        "firstName": "John",
        "lastName": "wick",
        "hireDate": "2019-02-03",
        "role": "MANAGER",
        "firstQuote": "There is only one bad word: taxes.",
        "secondQuote": "Some men see things as they are and say why ... I dream things that never were and say why not."
    }
}
```

### 2) POST Employees

Endpoint:  [localhost:3000/employees](http://localhost:3000/employees)

Sample Body:
```$xslt
{
	"firstName":"Clint",
	"lastName": "Eastwood",
	"hireDate": "2019-02-03",
	"role": "CEO"
}
```

Response:
```$xslt
{
    "id": "9N9ZYONq",
    "firstName": "Clint",
    "lastName": "Eastwood",
    "hireDate": "2018-02-04",
    "role": "CEO",
    "firstQuote": "History began July 4th, 1776. Anything before that was a mistake.",
    "secondQuote": "Some men see things as they are and say why ... I dream things that never were and say why not."
}
```

### 3) GET Employee by EmpId
Endpoint:  [localhost:3000/employees/{empId}](http://localhost:3000/employees/{empID)

Sample Response:
```$xslt
{
    "id": "9N9ZYONq",
    "firstName": "Clint",
    "lastName": "Eastwood",
    "hireDate": "2018-02-04",
    "role": "CEO",
    "firstQuote": "History began July 4th, 1776. Anything before that was a mistake.",
    "secondQuote": "Some men see things as they are and say why ... I dream things that never were and say why not."
}
```

### 4) PUT Employee by EmpId

Endpoint:  [localhost:3000/employees/{empId}](http://localhost:3000/employees/{empID)


Sample Body:
```$xslt
{
	"firstName":"Clint",
	"lastName": "Eastwood",
	"hireDate": "2018-02-04",
	"role": "CEO",
	"firstQuote": "sampleQuote - 1",
	"secondQuote": "sampleQuote-2"
}
```

Response:
```$xslt
{
    "id": "9N9ZYONq",
    "firstName": "Clint",
    "lastName": "Eastwood",
    "hireDate": "2018-02-04",
    "role": "CEO",
    "firstQuote": "sampleQuote - 1",
    "secondQuote": "sampleQuote-2"
}
```

### 5) Delete Employee by EmpId

Endpoint:  [localhost:3000/employees/{empId}](http://localhost:3000/employees/{empID)

Response:
```$xslt
{
    "id": "9N9ZYONq",
    "firstName": "Clint",
    "lastName": "Eastwood",
    "hireDate": "2018-02-04",
    "role": "CEO",
    "firstQuote": "sampleQuote - 1",
    "secondQuote": "sampleQuote-2"
}
```