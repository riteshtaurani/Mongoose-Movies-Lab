const mongoose = require('mongoose');

const Celebrity = require('../models/celebrity');

const dbName = 'starter-code';

mongoose.connect(`mongodb://localhost/${dbName}`, { 
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
  }).then(console.log("OK. Connected to database.")).catch(err => console.log(err));


const celebrities = [
    {
      name: 'Derek Faye',
      occupation: 'retiree',
      catchPhrase: "How very dare you!"
    },
    {
      name: 'Lauren Cooper',
      occupation: 'highschooler',
      catchPhrase: "Am I bovvered???"
    },
    {
      name: 'Carol Beer',
      occupation: 'receptionist',
      catchPhrase: 'Computer says no.'
    }
  ]

  Celebrity.insertMany(celebrities, (err) => {
    console.log(`Added ${celebrities.length} movies!`)
    mongoose.connection.close();
  });