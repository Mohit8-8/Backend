// Select the database to use.
use("SigmaDatabase");

// Insert a few documents into the sales collection.
db.getCollection("Course").insertMany([
  [
    { Name: "Oliver", Age: 25 },
    { Name: "Charlotte", Age: 22 },
    { Name: "Henry", Age: 28 },
    { Name: "Amelia", Age: 24 },
    { Name: "George", Age: 27 },
    { Name: "Isla", Age: 21 },
    { Name: "Arthur", Age: 29 },
    { Name: "Florence", Age: 26 },
    { Name: "James", Age: 23 },
    { Name: "Matilda", Age: 20 },
  ],
]);

console.log("Data inserted")