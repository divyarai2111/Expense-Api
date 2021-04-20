const router = require('express').Router();
const { json } = require('body-parser');

const file = require('fs');


//1. Create a new Expense
router.post('/', (req, res)=>{
    
    file.readFile('server/db.json', (err, data) => {
        if(err)
            throw err;
        let array = JSON.parse(data);
        array.push(req.body);
        // console.log(req.body)
        file.writeFile("server/db.json", JSON.stringify(array, null, 2), (err)=>{
            if(err) 
                throw err;
        res.status(201).send("Expense is added successfully");
        }); 
    })
})

//2. Get all expenses
router.get('/', (req, res)=>{
    res.send(file.readFileSync('server/db.json'));
})


//3. Get expense by particular expense_id
router.get('/:id', (req, res)=>{
    
    file.readFile('server/db.json', 'utf8', (err, data)=>{
        if(err)
            throw err;
        const userId = req.params["id"]
        const result = JSON.parse(data)
        //console.log(result.id)
        const ans = result.find(xpns => xpns.id === userId)
        res.status(200).send(ans)
   })
})

router.get('/category/:type', (req, res)=>{
    
    file.readFile('server/db.json', 'utf8', (err, data)=>{
        if(err)
            throw err;
        const category = req.params["type"]
        const result = JSON.parse(data)
        //console.log(result.id)
        const ans = result.find(xpns => xpns.category === category)
        res.status(200).send(ans)
   })
})
//4. Delete particular expense by id
router.delete('/:id', (req, res)=>{

    file.readFile('server/db.json', (err, data) => {
        if(err)
            throw err;
        const userId = req.params["id"]
       
        let array= JSON.parse(data);
        //delete(array[userId - 1])
        const newArray = array.filter((item) => item.id !== userId);
        file.writeFile("server/db.json", JSON.stringify(newArray, null, 2), (err)=>{
            if(err)
                throw err;
            res.status(201).send("deleted");
       }); 
    })
})


//5. Update expense by id
router.put('/:id',(req, res)=>{

    file.readFile('server/db.json', (err, data) => {
        if(err)
            throw err;
        const userId = req.params["id"]
        let array = JSON.parse(data);
        //newarray[userid - 1] = req.body
        const i = array.findIndex((obj) => obj.id == userId);
        array[i] = req.body;
        file.writeFile("server/db.json", JSON.stringify(array, null, 2), (err)=>{
            if(err)
                throw err;
            res.status(201).send("updated");
        }); 
    })
})

module.exports = router;