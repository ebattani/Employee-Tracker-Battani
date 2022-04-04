const mysql = require('mysql');
const inquirer = require('inquirer');
const consoleTable = require('console.table')

// SQL database connection
const connection = mysql.createConnection({

    host: 'localhost',
    port: 3301,
    user: 'root',
    password: '',
    database: 'role_db'
})

connection.connect(function(err){

    if (err) throw err;

    choices();

})

// Creates the prompt for the user
function choices() {

    inquirer

        .prompt({

            name: 'action',

            type: 'list',

            message: 'This is the employee database. Please choose an option.',

            choices: [
                    'View employees',
                    'View departments',
                    'View roles',
                    'Add employee',
                    'Add department',
                    'Add role',
                    'Update employee',
                    'QUIT'
                    ]

            }).then(function (answer) {

                switch (answer.action) {

                    case 'View employees':
                        Employees();
                        break;
                    case 'View departments':
                        Departments();
                        break;
                    case 'View roles':
                        Roles();
                        break;
                    case 'Add employee':
                        addEmployees();
                        break;
                    case 'Add department':
                        addDepartments();
                        break;
                    case 'Add role':
                        addRoles();
                        break;
                    case 'QUIT': 
                        quit();
                        break;
                    default:
                        break;
                }
        })
};

// How to view roles
function Roles() {

    var query = 'SELECT * FROM role';

    connection.query(query, function(err, res){

        if (err) throw err;

        console.table('All Roles:', res);

        choices();

    })
};

// How to view departments
function Departments() {

    var query = 'SELECT * FROM department';

    connection.query(query, function(err, res) {

        if(err)throw err;

        console.table('All Departments:', res);

        choices();

    })
};


// How to view employees
function Employees() {

    var query = 'SELECT * FROM employee';

    connection.query(query, function(err, res) {

        if (err) throw err;


        console.table('All Employees:', res); 

        choices();

    })
};


// How to add employees
function addEmployees() {

    connection.query('SELECT * FROM role', function (err, res) {

        if (err) throw err;

        inquirer

            .prompt([
                {
                    name: 'first_name',

                    type: 'input', 

                    message: "Please add employee's first name.",

                },
                {
                    name: 'last_name',

                    type: 'input', 

                    message: "Please add employee's last name. "

                },
                {
                    name: 'manager_id',

                    type: 'input', 

                    message: "Please add employee's ID. "

                },
                {
                    name: 'role', 

                    type: 'list',

                    choices: function() {

                    var roleArray = [];

                    for (let i = 0; i < res.length; i++) {

                        roleArray.push(res[i].title);

                    }
                    return roleArray;

                    },

                    message: "Please add employee role. "
                }
                ]).then(function (answer) {

                    let role_id;

                    for (let a = 0; a < res.length; a++) {

                        if (res[a].title == answer.role) {

                            role_id = res[a].id;

                        }                  
                    }  
                    connection.query(

                    'INSERT INTO employee SET ?',
                    {
                        first_name: answer.first_name,

                        last_name: answer.last_name,

                        manager_id: answer.manager_id,

                        role_id: role_id,

                    },
                    function (err) {

                        if (err) throw err;

                        choices();

                    })
                })
        })
};

//  How to add role
function addRoles() {

    connection.query('SELECT * FROM department', function(err, res) {

        if (err) throw err;
    
        inquirer 

        .prompt([
            {

                name: 'new_role',

                type: 'input', 

                message: "Please add new role."

            },
            {

                name: 'salary',

                type: 'input',

                message: 'Please add salary.'

            },
            {
                name: 'Department',

                type: 'list',

                choices: function() {

                    var deptArry = [];

                    for (let i = 0; i < res.length; i++) {

                    deptArry.push(res[i].name);

                    }

                    return deptArry;
                },
            }
        ]).then(function (answer) {

            let department_id;

            for (let a = 0; a < res.length; a++) {

                if (res[a].name == answer.Department) {

                    department_id = res[a].id;

                }
            }
    
            connection.query(

                'INSERT INTO role SET ?',

                {
                    title: answer.new_role,

                    salary: answer.salary,

                    department_id: department_id

                },
                function (err, res) {

                    if(err)throw err;

                    console.table('All Roles:', res);

                    choices();

                })
        })
    })
};

// How to add departments
function addDepartments() {

    inquirer

        .prompt([

            {
                name: 'newDepartment', 

                type: 'input', 

                message: 'Please add department name.'
            }

            ]).then(function (answer) {

                connection.query(

                    'INSERT INTO department SET ?',

                    {
                        name: answer.newDepartment
                    });

                var query = 'SELECT * FROM department';

                connection.query(query, function(err, res) {

                if(err)throw err;

                console.table('All Departments:', res);

                choices();

                })
            })
};

// QUIT
function quit() {
    connection.end();
};