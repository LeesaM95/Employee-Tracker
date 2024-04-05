# Employee Tracker

## Description
With the Employee Tracker application, a user can do several things. Designed with company in mind, users can view all departments, employees, and roles of the employees in those specific departments. Should the business grow, users can add departments, roles, and employees, as well as update employee roles should they be promoted, demoted, or switched departments. And, if the company has some losses, users can delete roles, departments, and any employees they may need to let go, or have left for new opportunities. They can also keep track of the budgets of each department quickly and effeciently.

## Visuals
As this application runs in a user's terminal, there is no link to an application. Instead, below is a demo video of what can be done and how.

## Installation Part One: General Installation
This application runs on a node server, and with no site deployed, a user will have to clone the repository of this application via `git clone` on the main page. 
When that's done and the repository is open, the user will have to open a terminal in the *main folder* of the application and run an `npm i/npm install` command (as this application comes with a package.json file that has all dependencies already loaded and ready to be downloaded).

## Installation Part Two: MySql
The employee tracker also uses a MySql database to compile all of the information and adjust it accordingly. As such, MySql must be installed and functioning on your device in order for this application to run. You can find all of the information on how to download MySql at <a href="https://dev.mysql.com/doc/mysql-getting-started/en/"> This Link</a>. You'll then follow the commands below:

To execute MySQL, open a terminal either in your programming app or on your device, and input the following command:
~~~
    [mysql -u root]
~~~
If you have a password attached to your MySQL account, execute the command:
~~~
    [mysql -u root -p] 
~~~

This will prompt you to enter your password before continuing. 

Once you've been logged in, you'll run the following commands to source the schema file and seed the database:
~~~
    [SOURCE db/schema.sql]
~~~
~~~
    [SOURCE db/seeds.sql]
~~~
Note: MySQL commands are **not** case sensitive, but it's generally easier to see what you're doing when you do. 

Finally, to run the application itself, open another terminal in the main folder, or use the one you had open to install the package.json file, and run the following command:
~~~
    [ node server.js ]
~~~

## Support
In the event that this application decides to throw some rather rude errors your way, please feel free to contact me here on GitHub under LeesaM95, or at my email `leesamarie95@gmail.com`. I can't guarantee I'll have all of the answers, but I will absolutely help as much as I can. If, in the event that I also don't know what's going on, the GitHub help forums and the Slack Overflow help forums are wonderful tools to sift through!

## Contributing
I'm not the person to ever say 'no' to some helpful contributions. I'm always looking for better ways to code, and for mentors that know what they're doing and can dumb down concepts in a way that's easily understandable. If you happen to see something you think can be improved, please feel free to shoot me an collaboration request, and I'll add you to the list. I only ask that you have some previous knowledge under your belt if you're going to add to my code, and to create a separate branch.

## Acknowledgements
As always, big thanks to my teachers and fellow classmates for putting up with my ten-thousand question process while working on this. I was really struggling with how I was going to even *begin* coding this. On that note, I'd love to acknowledge and praise <a href="https://github.com/mxu4321">mxu4321</a> on GitHub for their absolutely stellar repo for this particular assignment. I'd still be absolutely lost without reference their code. They're truly a gift.

## Status
This application is considered closed and completed at this time, as I don't think I'll ever truly come back to it (once I got a taste of sequelize, I'll never go back to just plain MySQL). Should I want to fuss around with this in the future, I probably will.

    
