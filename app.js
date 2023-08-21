const exp=require("express");
var items=[];
const bp=require("body-parser");
const mongoose=require("mongoose");
main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/todolist');
    const app=exp();
    app.set('view engine','ejs');
    app.use(bp.urlencoded({extended:true}));
    app.use(exp.static("public"));
    const itemsschema={
        name:String,
    }
    const Item=mongoose.model("item",itemsschema);
    const item1=new Item({
        name:"welcome to do list"
    });
    const item2=new Item({
        name:"welcome  do list"
    });
    const item3=new Item({
        name:"welcome to do"
    });
    app.post("/",function(req,res){
        const nitem=req.body.newItem;
        const newitem=new Item({
            name:nitem
        });
        newitem.save();
        res.redirect("/");
    });
    app.post("/delete",async function(req,res){
        const del=req.body.checkbox;
        await Item.findByIdAndRemove(del);
        res.redirect("/");
    })
    const defitem=([item1,item2,item3]);
    const listschema={
        name:String,
        items:[itemsschema]
    };
    const List=mongoose.model("List",listschema);
    app.get("/",async function(req,res){
        
    const i=await Item.find();
        if(i.length===0)
        {
            const add=Item.insertMany(defitem);
        }
            res.render("list",{listTitle:"Today",litem:i});
    });
    app.get("/:customlistname",async function(req,res){
        const custom=req.params.customlistname;
        const i=await Item.find();
        const ii=await List.findOne({name:custom});
        if(!ii)
        {        const list=new List({
            name:custom, items:defitem
        });
        list.save();
        res.redirect(custom);
        }
        else{
        res.render("list",{listTitle:custom,litem:ii.items});
        }

    })
    // app.get("/work",function(req,res){
    //     res.render("list",{listTitle:"Work list",litem:workItems})

    // });
    // app.get("/about",function(req,res){
    //     res.render("about");
    // });
    app.listen(3000,function(){
        console.log("SErver on3000");
})};