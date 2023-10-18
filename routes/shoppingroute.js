const express = require("express");
const itemModel = require("../models/item")
const router = express.Router();    //router middleware


//DATABASES
let database = [];
let id = 100;

//REST API
router.get("/shopping",function(req,res){
   let query = {"user":req.session.user}
   itemModel.find(query).then(function(items){
        return res.status(200).json(items);     
   }).catch(function(error){
    console.log("Failed to find items. Reason:",error);
    return res.status(500).json({"Message":"Internal server error"});  
   })
})

router.post("/shopping",function(req,res){
    if (!req.body){                                     //tarkistetaan ensin et onko req.body muuten req.body.type crashaa ((pitäis aina olla ... mut))
        return res.status(400).json({"Message":"Bad Request"})
    }
    if(!req.body.type){
        return res.status(400).json({"Message":"Bad Request"})
    }

    let item = new itemModel({
        "type":req.body.type,
        "count":req.body.count,
        "price":req.body.price,
        "user":req.session.user
    })
    item.save().then(function(item){
    return res.status(201).json(item);
    }).catch(function(error){
        console.log("Failed to add new item. Reason:",error);
        return res.status(500).json({"Message":"Internal server error"});  
       })
})

router.delete("/shopping/:id",function(req,res){
    itemModel.deleteOne({"_id":req.params.id,"user":req.session.user}).then(function(){
        return res.status(200).json({"Message":"Success"});
        }).catch(function(error){
            console.log("Failed to remove item. Reason:",error);
            return res.status(500).json({"Message":"Internal server error"});  
        })
    })

router.put("/shopping/:id",function(req,res){
    if (!req.body){                                     //tarkistetaan ensin et onko req.body muuten req.body.type crashaa ((pitäis aina olla ... mut))
        return res.status(400).json({"Message":"Bad Request"})
    }
    if(!req.body.type){
        return res.status(400).json({"Message":"Bad Request"})
    }
    let item = {
        "type":req.body.type,
        "count":req.body.count,
        "price":req.body.price,
        "user":req.session.user
    }
    itemModel.replaceOne({"_id":req.params.id,"user":req.session.user},item).then(function(){
        return res.status(204).json({"Message":"Success"});
        }).catch(function(error){
            console.log("Failed to edit item. Reason:",error);
            return res.status(500).json({"Message":"Internal server error"});  
        })

})

module.exports = router;