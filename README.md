## Odds-based TV Deadpool Site

> What is dead may never die.

Based on the AVClub features. Bets and odds drawn from http://www.avclub.com/features/you-win-or-you-die/, results pulled from http://www.avclub.com/features/all-men-must-die/.

### How to run scripts

Source the appropriate config file for the environment being targeted. Use 'npm run babel script-name' to build and execute the script. Ex:

     env $(cat config/development.env | xargs) npm run babel scripts/migrate.jsx

Note that included files are relative to the path of the file being executed (in the example above, scripts/).
