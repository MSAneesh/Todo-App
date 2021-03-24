var express=require("express")  
var app=express();
var bodyParser=require('body-parser')
var Tasks=require('./models/task')//importing tasks variable .
var mongoose=require('mongoose')
var methodOverride=require("method-override")
app.use(methodOverride("_method"));



app.use(bodyParser.urlencoded({extended:true}));

//Connecting to local mongodb
mongoose.connect("mongodb://localhost/handsonsession");


                                                  //ROUTES!!!
//making a get request.
app.get("/todo",function(req,res){
    Tasks.find({},function(err,tasks){
        if(err){
            console.log(err)
        }
        else{
            res.render('todo.ejs',{tasks:tasks})

        }

    })

   
})


//making a get request. Here :id denotes anything can come in between /todo/ and /edit. For such a format of URL, this get request will get called.
//req.params.id is the way to access the string in between /todo/ and /edit.For example= "locahost:3000/todo/rjebkre/edit"  
app.get("/todo/:id/edit",function(req,res){
    Tasks.findById(req.params.id,function(err,foundTask){
        if(err){
            console.log(err)
        }
        else{
            res.render("edit.ejs",{task:foundTask})

        }
    })
    
})




//making a post request.
app.post("/task",function(req,res){
    console.log("Will keep u posted!!!")
    
    //to access the inputs from the form, we use bodyparser. req.body is an object that has all the inputs
    //try console.log(req.body)
    var work=req.body.task;
    var deadline=req.body.deadline;

    console.log(work,deadline)

    var task={work:work,day:deadline}
    Tasks.create(task,function(err,x){
        if(err){
            console.log(err)
        }
        else{
            res.redirect("/todo")

        }
    })
    
    
    
    
})

//Put request is used in case of an updation of an object in the database.
app.put('/task/:id',function(req,res){

    Tasks.findByIdAndUpdate(req.params.id,req.body.task,function(err,updatedtask){
        if(err){
            console.log(err)
        }
        else{
            res.redirect("/todo")
        }
    })
})


//delete route is made to delete on or more objects.
app.delete("/task/:id",function(req,res){
    console.log("Hello")
    
    Tasks.findByIdAndRemove(req.params.id,function(err,y){
        if(err){
            console.log(err)
        }
        else{
            res.redirect('/todo')
        }
    })

})

//the app listen to the user's request on this port (3000).
app.listen(3000,function(){
    console.log("Server has started")
})