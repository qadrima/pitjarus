### Inisialisasi
    npm install
    node api.js

    default run : http://localhost:8080
    
#### Config Mysql (file mysql.js)
    host: "localhost",
    user: "root", 
    password: "",
    database: "pitjarus"

#### API get /brand/report
    params :
	- area_id
	- date_from
	- date_to

    ex : http://localhost:8080/brand/report?area_id=1&date_from=2021-01-01&date_to=2021-01-04

#### API get /area
    ex : http://localhost:8080/area

#### run UI / double click index.html
    index.html
