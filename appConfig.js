var developmentDatabase = {
    postgres: {
    host: 'ec2-54-147-107-18.compute-1.amazonaws.com',
    port: 5432,
    database: 'd6mkkgud0rt7qc',
    user: 'jsgppmexrfsjcj',
    password: '504515e5d9f68a5eacdbcdd71b0254c86d827aa3fedc1c7fc44f7707504e4721'
    }
    }
    
    var connectionString ="jsgppmexrfsjcj:504515e5d9f68a5eacdbcdd71b0254c86d827aa3fedc1c7fc44f7707504e4721@ec2-54-147-107-18.compute-1.amazonaws.com:5432/d6mkkgud0rt7qc?ssl=true";
    if (process.env.NODE_ENV == 'production') {
    //Production mode
    if (process.env.DATABASE_URL) {
    developmentDatabase =
    parseConnectionString(process.env.DATABASE_URL);
    } else {
    console.log("process.env.DATABASE_URL empty, connectionStringvariable used");
    developmentDatabase = parseConnectionString(connectionString);
    }
    }else{
    //Development mode
    developmentDatabase = parseConnectionString(connectionString);
    }
    function parseConnectionString(connectionString) {
    if (connectionString) {
    var myRegexp = /(\w+):(\w+)@(.+):(\w+)\/(\w+)/g;
    var match = myRegexp.exec(connectionString);
    if (match.length == 6) {
    developmentDatabase.postgres.user = match[1];
    developmentDatabase.postgres.password = match[2];
    developmentDatabase.postgres.host = match[3];
    developmentDatabase.postgres.port = Number(match[4]);
    developmentDatabase.postgres.database = match[5];
    developmentDatabase.postgres.ssl = { rejectUnauthorized: false };
    return developmentDatabase;
    }
    }
    console.log("connectionString cannot be parsed");
    return null;
    }
    module.exports = {
    hostname: "http://localhost",
    port: 5656,
    database: {
    postgres: developmentDatabase.postgres
    }
    }