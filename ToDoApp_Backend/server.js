const express  = require('express')
const cors  = require('cors')
const app = express();

const connectDB = require('./config/db')
const Course = require('./models/course')

// const path = require('path')
const dotenv = require('dotenv');
const User = require('./models/user');
const Task = require('./models/task')
const protect = require('./middlewares/protect')
dotenv.config({path: './config/.env'})

connectDB();

app.use(cors())
app.use(express.json())



const port = process.env.PORT;

// Create an api for task creation and task assignment ...............
app.post('/taskAssignment/:userId', async (req, res)=>{

    /*------------ Creation of Task ---------------*/
    const task =  await Task.create(req.body);


    /*------------- Assigning task to a user -----------------*/
    // console.log('req.params --', req.params.userId)
    // console.log('req.params task--', req.params.taskId)
    const user = await User.findById(req.params.userId).select('tasks')

    user.tasks.push(task._id);
    const userToBeUpdated = await User.findByIdAndUpdate(req.params.userId, {tasks: user.tasks})

    res.json(task)
})



// Get all the user specific tasks..
app.get('/userSpecificTasks/:userId', async (req, res)=>{
    const user = await User.findById(req.params.userId).select('tasks').populate('tasks');
    res.json(user.tasks)

})


// Marking the tasks as done...
app.patch('/taskDone/:taskId', async (req, res)=>{
    const task = await Task.findByIdAndUpdate(req.params.taskId, {done: true});

    // Fetching the updated task
    const updatedTask = await Task.findById(req.params.taskId)
    res.json(updatedTask);
})

// Delete a task..
app.delete('/taskDel/:taskId', async (req, res)=>{
    // const course = await Course.findByIdAndUpdate({_id: req.params.courseID}, req.body)
    const task = await Task.findByIdAndDelete(req.params.taskId);

    res.json({success: true})
})

app.get('/testApi', protect, (req, res)=>{
    // console.log('kjdhvidhvk ----',req.user.id)
    res.json({message: "User is able to invoke this route/api/middleware because the user have a valid token.."})
})



/*________________________________ ---------------------------- __________________________ ----------------------- _______
____________________________________ ------------------------------ ___________________________ ------------------------__________
___________ ----------------- ___________  **** ^&^&^&^&^  Registration and Login ^&^&^&^&^&^ ***** ______________ -------------- _______
_________________ ------------------ ________________ ------------------ __________________ ---------------------- ______________________
____________ ---------------------- ____________________ ------------------- ____________________ ------------------- ______________________ */

// Registration
app.post('/register', async (req, res, next)=>{
   const user = await User.create(req.body);

   // Getting the signed token..
   const token = await user.getSignedJwtToken();

   res.status(200).json({returnedToken: token});
})

// Login user..
app.post('/login', async (req, res)=>{
    const {email, password} = req.body;

    const enteredMail = email;
    const enteredPass = password;
    // console.log('email --',email);
    // console.log('password --',password);
    const user = await User.findOne({email: enteredMail});
    if(user){
        // Comparing the password...
        const isMatch = await user.matchPassword(enteredPass);
        if(isMatch){

            const token = await user.getSignedJwtToken();
            res.status(200).json({returnedToken: token, success: true});
        }else{
            res.status(500).send('Invalid password...')
        }
    }else{
        res.status(500).send("Invalid Email")
    }
})

/*________________________
____________________________________
_______________________Using MongoDB Database as a data persistence store____________________
____________________________________________________________________________________________
________________________________________________________________________________________________
_______________________________________________________________________________________________________*/

app.post('/course', async (req, res)=>{
    // Create a course...
    console.log(req.body)
    const createdCourse = await Course.create(req.body);

    res.status(200).json({createdCourse})
})


// Implement a get operation and try to retreive a course from the database and return back to client..
app.get('/course', async (req, res)=>{
    const courses = await Course.find();
    res.json({courses})
})


// Updating a single course  in database..
app.put('/course/:courseID', async (req, res)=>{
    // const course = await Course.findByIdAndUpdate({_id: req.params.courseID}, req.body)
    const course = await Course.findByIdAndUpdate(req.params.courseID, req.body)

    res.json({course})
})






/*________________________
____________________________________
_______________________Using arrays as a data persistence store____________________
____________________________________________________________________________________________
________________________________________________________________________________________________
_______________________________________________________________________________________________________*/

app.get('/test', (req, res)=>{
    console.log('API invoked ....')
    res.json({success: true})
})

var courses = [
    {title: "React", description: "LIbrary"}, 
    {title: "Angular", description: "Front-end Framework"}
];

app.post('/course', (req, res)=>{
    console.log('Request body ---',req.body)
    courses.push(req.body)
    console.log('courses array --',courses)
    res.json({success: true})
})

app.get('/course', (req, res)=>{


    console.log('request body...',req.body)
    console.log('title ---',req.query.title)

    const course = courses.find((course)=>{
        console.log(course)
        return course.title == req.params.title
    });
    console.log(course)
    res.json({data: course})
})



// Use req.query to access the query parameters...
// Use req.params to access the URI parameters...
app.delete('/course', (req, res)=>{
    // req.params.
    console.log('dkvjb', req.query.title)
    courses.pop((course)=>{ return course.title === req.params.title})
    console.log(courses)
    res.json({success: true})
})

// Use filter..

// Update...
app.put('/course',(req, res)=>{
    let courseArray =  courses.map((course)=>{
        if(course.title === req.query.title){
            return req.body;
        } 
        return course;
    })

    res.json({updatedData: courseArray})
})


// Create a rest Api for registration..


// app.use('/user/:id', (req, res, next) => {
//     console.log('Request URL:', req.originalUrl)
//     next()
//   }, (req, res, next) => {
//     console.log('Request Type:', req.method)
//     next()
// })

// 

app.listen(port, ()=>{console.log(`Server is listening on port ${port}`)})