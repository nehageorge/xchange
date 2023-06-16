## MySQL installation and set up
1. Install mysql.
2. Run `mysql -u root -p` and enter password.
3. Run `CREATE DATABASE xchange;`.
4. Run `CREATE USER 'xchange'@'localhost';`.
5. Run `GRANT ALL privileges on xchange.* to xchange@localhost;`.
6. Run `FLUSH privileges;`.
7. Run `exit`.


## How to run the backend

1. Go to the project root directory.
2. Run `cd api`.
3. Run `source venv/bin/activate`.
4. Run `pip3 install -r requirements.txt`
5. Run `flask run`.


## How to run the frontend

1. Go to the project root directory.
2. Run `yarn start`.
    a) If yarn command is not found, install yarn using brew, npm, or another installer and try again.
3. Navigate to localhost:3000 on your browser. 
