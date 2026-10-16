
const cl = console.log

let todo = [

    {
        "userId":1,
        "id":1,
        "todo":"HTML"
    },

    {
        "userId":2,
        "id":2,
        "todo":"CSS"
    }

]


const express = require("express")

const app = express()

app.use(express.json())

app.get("/api/todo",(req , res) =>{

    try {
        
        res.status(200).json({
            success:true,
            body:todo,
            msg:"todo data fetched successfully !!!"
        })

    } catch (err) {
        res.status(500).json({
            success:false,
            msg:"something went wrong !!!",
            error:err.msg
        })        
    }
})


// for single todo

app.get("/api/todo/:id", (req , res) =>{

    try {
        
        const id = Number(req.params.id)

        const singletodo = todo.find(t => t.id === id)

        if (!singletodo) {
            
            return res.status(404).json({
                success:false,
                msg:"single todo data not found"
            })

        }

        res.status(200).json({
            success:true,
            body:singletodo,
            msg:"single todo data fetched successfully !!!"
        })

    } catch (err) {
        res.status(500).json({
            success:false,
            msg:"something went wrong !!!",
            error:err.msg
        })
    }
})


// for create new todo 


app.post("/api/todo", (req , res) =>{

    try {
        
        let newtodo = {
            userId:req.body.userId,
            id:Date.now().toString(),
            todo:req.body.todo
        }

        todo.push(newtodo)

        res.status(201).json({
            success: true,
            body:newtodo,
            msg:"todo data added successfully !!!"

        })

    } catch (err) {
     
        res.status(500).json({
            success:false,
            msg:"something went wrong !!!",
            error:err.msg
        })
    }
})


// for update todo 

app.patch("/api/todo/:id",(req , res) =>{

    try {
        
        let updatetodo = todo.find(t => t.id === req.params.id)

        if (!updatetodo) {
            return res.status(404).json({
                success:false,
                msg:"todo data not found !!!"
            })
        }

        updatetodo.userId = req.body.userId;
        updatetodo.todo = req.body.todo;


        res.status(200).json({
            success:true,
            body:updatetodo,
            msg:"todo updated successfully !!!"
        })

    } catch (err) {
        res.status(500).json({
            success:false,
            msg:"something went wrong !!!",
            error:err.msg
        })
    }
})



// for delete todo 


app.delete("/api/todo/:id", (req , res) =>{

    try {
        
        let getindex  = todo.findIndex(d => d.id === req.params.id)

        if (getindex === -1) {
            
            res.status(404).json({
                success:false,
                msg:"todo not found !!!"
            })
        }

        let deletetodo = todo.splice(getindex ,1)

        res.status(200).json({
            success:true,
            body:deletetodo[0],
            msg:"todo delete successfully !!!"
        })

    } catch (err) {
        res.status(500).json({
            success:false,
            msg:"something went wrong !!!",
            error:err.msg

        })
    }
})


app.listen(3000,() =>{
    cl("todo data fetched successfully !!!")
})



