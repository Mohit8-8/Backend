//CRUD OPERATIONS

use("CrudDB");
//creation
db.createCollection("course");

//insertion
db.course.insertOne({ name: "Mohit Dev Tomar", age: 19, assignment: 12 });

db.course.insertMany([
  { name: "Mohit Dev Tomar", age: 19, assignment: 12 },
  { name: "Oliver Smith", age: 21, assignment: 10 },
  { name: "Charlotte Evans", age: 22, assignment: 9 },
  { name: "Henry Baker", age: 23, assignment: 11 },
  { name: "Amelia Clarke", age: 20, assignment: 8 },
  { name: "George Turner", age: 24, assignment: 13 },
  { name: "Isla Roberts", age: 19, assignment: 7 },
  { name: "Arthur Harris", age: 22, assignment: 10 },
  { name: "Florence Adams", age: 21, assignment: 12 },
  { name: "James Wright", age: 20, assignment: 9 },
]);

find - read
let a = db.course.find({assignment:12})

console.log(a)
console.log(a.count())
console.log(a.toArray())

let b = db.course.findOne({age:19})
console.log(b)


//Update

db.course.updateOne({age:19}, {$set:{age:20}})
db.course.updateMany({age:21},{$set:{age:20}})


//Delete

db.course.deleteOne({age:19})
db.course.deleteMany({age:20})
