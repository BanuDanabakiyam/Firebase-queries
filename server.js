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

// QUERIES
// ************ GREATER THAN 18 AGE
app.get('/age/greater/:number',async(req,res) => {
    try{
    const  student = parseInt(req.params.number);
    const details = await db.collection('StudentDetails').where('age','>',student).get()
    let stu = [];

    details.forEach(doc => {
        const data = doc.data();
        const {id,name,dep,age,timestamp,courseCompleted,grades,address,enrollForNewSubjects} = data;
       stu.push({id,name,dep,age,timestamp,courseCompleted,grades,address,enrollForNewSubjects})

    })
    res.send(stu);


    }catch(err){
        res.send(err);
    }
})


// ************ GREATER THAN 45 EQUAL TO AGE


app.get('/age/greaterOrEqual/:number',async(req,res) => {
    try{
    const  student = parseInt(req.params.number);
    const details = await db.collection('StudentDetails').where('age','>=',student).get()
    let stu = [];

    details.forEach(doc => {
        const data = doc.data();
        const {id,name,dep,age,timestamp,courseCompleted,grades,address,enrollForNewSubjects} = data;
       stu.push({id,name,dep,age,timestamp,courseCompleted,grades,address,enrollForNewSubjects})

    })
    res.send(stu);


    }catch(err){
        res.send(err);
    }
})


// ************ LESSER THAN 18 AGE
app.get('/age/lesser/:number',async(req,res) => {
    try{
    const  student = parseInt(req.params.number);
    const details = await db.collection('StudentDetails').where('age','<',student).get()
    let stu = [];

    details.forEach(doc => {
        const data = doc.data();
        const {id,name,dep,age,timestamp,courseCompleted,grades,address,enrollForNewSubjects} = data;
       stu.push({id,name,dep,age,timestamp,courseCompleted,grades,address,enrollForNewSubjects})

    })
    res.send(stu);


    }catch(err){
        res.send(err);
    }
})


// ************ LESSER THAN 45 EQUAL TO AGE
app.get('/age/lesserOrEqual/:number',async(req,res) => {
    try{
    const  student = parseInt(req.params.number);
    const details = await db.collection('StudentDetails').where('age','<=',student).get()
    let stu = [];

    details.forEach(doc => {
        const data = doc.data();
        const {id,name,dep,age,timestamp,courseCompleted,grades,address,enrollForNewSubjects} = data;
       stu.push({id,name,dep,age,timestamp,courseCompleted,grades,address,enrollForNewSubjects})

    })
    res.send(stu);


    }catch(err){
        res.send(err);
    }
})


// ************  EQUAL TO 
app.get('/age/equal/:number',async(req,res) => {
    try{
    const  student = parseInt(req.params.number);
    const details = await db.collection('StudentDetails').where('age','==',student).get()
    let stu = [];

    details.forEach(doc => {
        const data = doc.data();
        const {id,name,dep,age,timestamp,courseCompleted,grades,address,enrollForNewSubjects} = data;
       stu.push({id,name,dep,age,timestamp,courseCompleted,grades,address,enrollForNewSubjects})

    })
    res.send(stu);


    }catch(err){
        res.send(err);
    }
})


// ************  NOT EQUAL TO 
app.get('/age/NotEqualTo/:number',async(req,res) => {
    try{
    const  student = parseInt(req.params.number);
    const details = await db.collection('StudentDetails').where('age','!=',student).get()
    let stu = [];

    details.forEach(doc => {
        const data = doc.data();
        const {id,name,dep,age,timestamp,courseCompleted,grades,address,enrollForNewSubjects} = data;
       stu.push({id,name,dep,age,timestamp,courseCompleted,grades,address,enrollForNewSubjects})

    })
    res.send(stu);


    }catch(err){
        res.send(err);
    }
})


// ********************** NOT IN

app.get('/subject/notIn/:sub',async(req,res) => {
    try{
        const student = req.params.sub.split(',');
        const details = await db.collection('StudentDetails').where('enrollForNewSubjects','not-in',student).get();
        console.log("details",details);
        let stu = [];
     details.forEach(doc => {
        const data = doc.data();
        const {id,name,dep,age,timestamp,courseCompleted,grades,address,enrollForNewSubjects} = data;
       stu.push({id,name,dep,age,timestamp,courseCompleted,grades,address,enrollForNewSubjects})
       res.send(stu);
    })
    }catch(err){
        res.send()
    }
})


// ********************  OR OPERATOR
// **   FIRESTORE DOES NOT SUPPORT LOGICAL OR WITHIN SINGLE QUERY

app.get('/age/or/:number1/:number2',async(req,res) => {
    console.log("Inside or");
    try{
        const student1 = parseInt(req.params.number1) ;
        const student2 = parseInt(req.params.number2) ;

        const details1 = db.collection('StudentDetails').where('age','==',student1).get();
        const details2 = db.collection('StudentDetails').where('age','==',student2).get();

        const [stu1,stu2] = await Promise.all([details1,details2])
        

        let stu = [];
     stu1.forEach(doc => {
        const data = doc.data();
        const {id,name,dep,age,timestamp,courseCompleted,grades,address,enrollForNewSubjects} = data;
       stu.push({id,name,dep,age,timestamp,courseCompleted,grades,address,enrollForNewSubjects})
       res.send(stu);
    })
    stu2.forEach(doc => {
        const data = doc.data();
        const {id,name,dep,age,timestamp,courseCompleted,grades,address,enrollForNewSubjects} = data;
       stu.push({id,name,dep,age,timestamp,courseCompleted,grades,address,enrollForNewSubjects})
       res.send(stu);
    })
    }catch(err){
        res.send()
    }
})


// ************ ORDER BY EXISTENCE
app.get('/orderby/enroll',async(req,res) => {
    try{
        const details = await db.collection('StudentDetails').orderBy('enrollForNewSubjects').get();
        let stu = [];
     details.forEach(doc => {
        const data = doc.data();
        const {id,name,dep,age,timestamp,courseCompleted,grades,address,enrollForNewSubjects} = data;
       stu.push({id,name,dep,age,timestamp,courseCompleted,grades,address,enrollForNewSubjects})
})       
res.send(stu);
}catch(err){
    res.send(err);
}
})


// **** WHERE AND ORDER BY
// we create an index.
app.get('/names/desc',async(req,res) => {
    try{
        const details =await db.collection('StudentDetails').where('address.city','==','coimbatore').orderBy('name','desc').get();
        let stu = [];
        details.forEach(doc => {
        const data = doc.data();
        const {id,name,dep,age,timestamp,courseCompleted,grades,address,enrollForNewSubjects} = data;
        stu.push({id,name,dep,age,timestamp,courseCompleted,grades,address,enrollForNewSubjects})
       })
       res.send(stu);
       }catch(err){
        res.send(err);
    }
})
    app.listen(port, () => {
    console.log("Yes I am connected");
})




