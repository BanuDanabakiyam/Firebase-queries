const express = require('express');
const admin = require('firebase-admin')
const credentials = require('../query/key1.json');
const app = express();


admin.initializeApp({
    credential: admin.credential.cert(credentials)
})
const db = admin.firestore();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
const port = process.env.port || 8000;


app.post('/addStudent',async(req,res) => {
    try{
        console.log("Inside");
        const stu = {
            id:req.body.id,
            name:req.body.name,
            dep:req.body.dep,
            age:req.body.age,
            timestamp:admin.firestore.Timestamp.now(),
            courseCompleted:req.body.courseCompleted === 'true' ? true : false,
            grades:{
                tamil: req.body.tamil || null,
                english: req.body.english || null,
                maths: req.body.maths || null,
                computerScience: req.body.computerScience || null
            },
            address:{
                city: req.body.city,
                state: req.body.state,
                country: req.body.country,
            },
            enrollForNewSubjects:{
                erollSubjects: req.body.erollSubjects || []
            }
}
        await db.collection('StudentDetails').doc(req.body.id).set(stu);
        res.send(stu);

    }catch(err){
        res.send(err);
    }
})
app.get('/all',async(req,res) => {
    try{
        
        const response = db.collection('StudentDetails')
        const details = await response.get();
        let stuArr = [];
        details.forEach(doc => {
            const data = doc.data();
            const {id,name,dep,age,timestamp,courseCompleted,grades,address,enrollForNewSubjects} = data;
            stuArr.push({id,name,dep,age,timestamp,courseCompleted,grades,address,enrollForNewSubjects})

        }) 
        res.send(stuArr);

    }catch(err){
        res.send(err);
    }
})

app.get('/all/:id',async(req,res) => {
    try{
        
        const response = db.collection('StudentDetails').doc(req.params.id);
        const details = await response.get();
        let stuArr = [];
            const data = details.data();
            const {id,name,dep,age,timestamp,courseCompleted,grades,address,enrollForNewSubjects} = data;
            stuArr.push({id,name,dep,age,timestamp,courseCompleted,grades,address,enrollForNewSubjects})

        
        res.send(stuArr);

    }catch(err){
        res.send(err);
    }
})


app.put('/update/:id',async(req,res) => {
    try{
        
        const response =await db.collection('StudentDetails').doc(req.params.id).update({
            id:req.body.id,
            name:req.body.name,
            dep:req.body.dep,
            age:req.body.age,
            timestamp:admin.firestore.Timestamp.now(),
            courseCompleted:req.body.courseCompleted === 'true' ? true : false,
            grades:{
                tamil: req.body.tamil || null,
                english: req.body.english || null,
                maths: req.body.maths || null,
                computerScience: req.body.computerScience || null
            },
            address:{
                city: req.body.city,
                state: req.body.state,
                country: req.body.country,
            },
            enrollForNewSubjects:{
                erollSubjects: req.body.erollSubjects || []
            }

        })
        
        
        res.send(response);

    }catch(err){
        res.send(err);
    }

})


app.delete('/delete/:id',async(req,res) => {
    try{
        const response = db.collection('StudentDetails').doc(req.params.id).delete();
        res.send(response);
    }catch(err){
        res.send(err);
    }
    
})




app.listen(port, () => {
    console.log("Yes I am connected");
})




