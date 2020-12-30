//Create variables here
var dog,dogimg,dogimg1
var database
var foods,foodstock
var feed,addfood
var foodobject
function preload()
{
  //load images here
  dogimg=loadImage("images/dogImg.png")
  dogimg1=loadImage("images/dogImg1.png")
}

function setup() {
  database=firebase.database()
  createCanvas(500,500);
  foodobject=new Food()
  foodstock=database.ref('/')
  foodstock.on("value",readstock)
  dog=createSprite(800,200,150,150)
  dog.addImage(dogimg)
  dog.scale=0.15
  feed=createButton("feed the dog")
  feed.position(700,95)
  feed.mousePressed(feedDog)
  addfood=createButton("add food")
  addfood.position(800,95)
   
}


function draw() {  
  background(46,139,87)
  foodobject.display()
  fedtime=database.ref('feedtime')
  fedtime.on("value",function(data){
    lastfed=data.val()
  })
  
  
  //add styles here
  fill(255,255,254);
  textSize(15)
  if(lastfed>=12){
    text("last fed:"+lastfed%12+"pm",350,30)
  } else if(lastfed==0){
    text("last fed:12 am",350,30)
  } else{
    text("last fed:"+lastfed+"am",350,30)
  }
  drawSprites();
}
function readstock(data){
  foods=data.val();
  foodobject.updatefoodstock(foods)
}
function feedDog(){
  dog.addImage(dogimg1)
  foodobject.updatefoodstock(foodobject.getfoodstock()-1)
  database.ref('/').update({
    Food:foodobject.getfoodstock(),
    feedtime:hour()
  })
}
function addfoods(){
  foods++
  database.ref('/').update({
    Food:foods
  })
}


