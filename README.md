# Employee Tracker
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

[View the repository for this app](https://github.com/wijeremy/employee-tracker)

[Check out this neat video demonstrating my app](https://www.youtube.com/watch?v=ATeYO2EZX_s&ab_channel=HermeticHippie)
## Description
I built this project to practice using sql datases, queries, and to implement them in a real world use case.
This app allows a company to view and update their employee, roles, and departments records. It saves all these records in a database for future use. 
I learned a lot about SQL and marrying it with the inquirer node module. There were many instances when my syntax was a bit off, especially when I was adding variables to SQL queries with string literals. But by and far the best thing to come out of this project was learning how to properly write promises from scratch. I had always just been given promises, and using them has never been a problem. But in order to put these SQL queries in a function and have my code actually wait for them to go off was an amazing feeling. No more ridiculous nesting functions or jerry rigging code together. This was the cleanest my code has felt in a while. There are still some things where I 'cheated' and had to brute force some code. An example of this was not being able to properly get certain keys from a SQL query; for some reason it never liked that and I was forced to put Object.keys(results[0])[0] in a few places to make my code work. But I'm continuing to learn and will look out for a fix for this in the future.
## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Contributing](#contributing)
- [Tests](#tests)
- [Questions](#questions)
## Installation
First, run npm install in the terminal. Then navigate to the db folder and open mysql by running 'mysql -u root -p' and enter your mysql password (if you do not have this installed, look on line for how to do so). Then, with mysql running in your terminal, run 'source schema.sql;'.This will spin up your database, but it will still be empty. If you would like to add some filler data, run 'source seed.sql;'. Don't forget to run 'exit' to leave mysql. Now you should be able to navigate back to the root folder and run 'node server.js'.
## Usage
Run 'node server.js' and simply follow the prompts. There is not a zero possibility of you running into bugs, for instance if you put a " in a text field. If that happens, the program should still run and you can continue, or hit 'ctl + c' to break out of the app. Use in any office setting where you would like to track employee data, including roles, managers, salary, or departments.
## License
I am using [MIT](https://opensource.org/licenses/MIT) to license this app.
## Contributing
See license.
## Tests
No tests included.
## Questions?
Email me at thatoneginger@gmail.com or visit [my github page](github.com/wijeremy)
  