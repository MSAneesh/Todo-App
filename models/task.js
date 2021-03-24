//requiring the package.
var mongoose=require("mongoose")

var Schema=mongoose.Schema;

//Building the Schema of our database.
var Todo=new Schema({
    work:String,
    day:String

})

/*mongoose.model models the above schema in to a variable. 
Mongoose gives this variable some special functions that enable it to create, update, remove an object in the database*/

module.exports=mongoose.model('todo',Todo)