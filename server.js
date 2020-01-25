const express= require('./node_modules/express');

const mongoose=require('mongoose');

const cors=require('./node_modules/cors/lib');

const bodyparser=require('./node_modules/body-parser')

const Income = require('./models/income')

const Expense=require('./models/expense')

const app=express();

const corsObj={
    orgin:"http://localost:4200",
    optionSuccessStatus:200
}

app.use(cors(corsObj));
 
app.use(bodyparser.json());

// const cloudDbUri='mongodb+srv://Project8:Password*123pm@project8-wl0d8.mongodb.net/test?retryWrites=true&w=majority'
const localDbUri='mongodb://localhost:27017/incomedetails'
// mongoose.connect(cloudDbUri), {useNewUrlParser: true }).then(()=>{
//     console.log("Mongodb connected");
// })
//  .catch(err=>console.log(err))
mongoose.connect(localDbUri)

const connection=mongoose.connection;

connection.once('open',()=>{      
    console.log("Mongodb connected");
})
 

app.get('',(res,req)=>{
    res.sendTe
})
app.get('/incomedetails',(req,res)=>{
    console.log(req.body)     
    Income.find((err,income)=>{
        if(err)        
          console.log(err)   
        else
         res.json(income)
    })
})

app.get('/incomedetails/:id',(req,res)=>{
    Income.findById(req.params.id,(err,income)=>{
        if(err)        
        console.log(err)
      else
       res.json(income)

    })
})

app.post('/incomedetails/add',(req,res)=>{
    console.log(req.body)           
    let income = new Income(req.body)
    income.save()
        .then(income=>{
            res.status(200).json({'income':'Added Successfully'})
        })
        .catch(err=>{
            res.status(400).send("Failed to create")
        })
})


app.post('/incomedetails/update/:id',(req,res)=>{
    Income.findByIdAndUpdate(req.params.id,(err,income)=>{
        if(!income)
          return next(new Error("Could not load document"));
        else{
          let income = new Income(req.body)
          income.save()
        .then(income=>{
            res.status(200).json({'income':'Updated Successfully'})
        })
        .catch(err=>{
            res.status(400).send("Failed to create")
        })
    }
    })
})

app.get('/incomedetails/delete/:id',(req,res)=>{
    Income.findByIdAndRemove({_id:req.params.id},(err,income)=>{
        if(err)
            res.json(err)
        else
            res.json("Removed successfully")
    })
})

app.get('/expensedetails',(req,res)=>{
    Expense.find((err,expense)=>{
        if(err)
          console.log(err)
        else
         res.send(expense)
    })
})

app.get('/expensedetails/:id',(req,res)=>{
    Expense.findById(req.params.id,(err,expense)=>{
        if(err)        
        console.log(err)
      else
       res.json(expense)

    })            
})

app.post('/expensedetails/add',(req,res)=>{
    console.log(req.body)           
    let expense = new Expense(req.body)
    expense.save()
        .then(expense=>{
            res.status(200).json({'expense':'Added Successfully'})
        })
        .catch(err=>{
            res.status(400).send("Failed to create")
        })
})

app.post('/expensedetails/update/:id',(req,res)=>{
    Expense.findByIdAndUpdate(req.params.id,(err,expense)=>{
        if(!income)
          return next(new Error("Could not load document"));
        else{
          let expense= new Expense(req.body)
          expense.save()
        .then(expense=>{
            res.status(200).json({'expense':'Updated Successfully'})
        })
        .catch(err=>{
            res.status(400).send("Failed to create")
        })
    }
    })
})

app.get('/expensedetails/delete/:id',(req,res)=>{
    Expense.findByIdAndRemove({_id:req.params.id},(err,expense)=>{
        if(err)
            res.json(err)
        else
            res.json("Removed successfully")
    })
})

const port=process.env.PORT || 3000

app.listen(port,()=>{

    console.log(`Running on ${port}`);
})
