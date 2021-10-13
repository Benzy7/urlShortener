const Sequelize = require('sequelize');

const sequelize = new Sequelize('urlshort', 'root', '1234', {
    host: "127.0.0.1",
    dialect : 'mysql',
    operatorsAliases: false
});

sequelize.authenticate().then(function(){
    console.log("sucess");
  }).catch(function(error){
    console.log("error: "+error);
});

module.exports = sequelize