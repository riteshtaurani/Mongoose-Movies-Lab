const express = require('express');
const Celebrity = require('../models/celebrity');
const Movie = require('../models/movie');
const router = express.Router();
/*  */
router.get('/celebrities', (req, res, next) => {
  // get all the celebrities from the database
  Celebrity.find().then(celebritiesFromDatabase => {

    console.log(celebritiesFromDatabase);
    res.render('celebrities/index', { celebrities: celebritiesFromDatabase });
  }).catch(err => {
    next();
    console.log(err);
  })
});

router.get('/movies', (req, res, next) => {
    // get all the movies from the database
    Movie.find().populate('celebrity').then(moviesFromDatabase => {
    
      console.log(moviesFromDatabase);
      res.render('movies/index', { movies: moviesFromDatabase });
    }).catch(err => {
      next();
      console.log(err);
    })
  });

router.get('/celebrities/:celebrityId', (req, res, next) => {
    // get all the celebrities from the database
    
    const celebrityId = req.params.celebrityId;
    console.log(celebrityId);
    Celebrity.findById(celebrityId).then(celebritiesFromDatabase => {
        
      console.log(celebritiesFromDatabase);
      res.render('celebrities/show', { celebrity: celebritiesFromDatabase });
    }).catch(err => {
      next();
      console.log(err);
    })
  });

  router.get('/new', (req, res, next) => {
      console.log("hello");
        res.render('celebrities/new');    
  });

  router.get('/movies/new', (req, res, next) => {
    console.log("hello");
    Celebrity.find().then(celebs => {
        res.render('movies/new',{celebs}); 
    })
         
});



  router.post('/celebrities', (req, res) => {
    console.log(req.body);
    const { name, occupation, catchPhrase,cast} = req.body;
    Celebrity.create({
      name,
      occupation,
      catchPhrase,
      cast
    }).then(() => {
      console.log(`Success! ${name} was added to the database.`);
      res.redirect('/celebrities');
    }).catch(err => {
      console.log(err);
      res.redirect('/new');
    })
  });

  router.post('/movies', (req, res) => {
    console.log(req.body);
    const { title, genre, plot,} = req.body;
    Movie.create({
      title,
      genre,
      plot,
    }).then(() => {
      console.log(`Success! ${title} was added to the database.`);
      res.redirect('/movies');
    }).catch(err => {
      console.log(err);
      res.redirect('/movies/new');
    })
  });



  router.post('/celebrities/:id/delete', (req, res) => {
      console.log("I am deleting");
    Celebrity.deleteOne({ _id: req.params.id})
      .then(() => {
        res.redirect('/celebrities');
      })
      .catch(err => {
        console.log(err);
        // next(err)
      })
  });

  router.get('/celebrities/:celebrityId/edit', (req,res) => {
      console.log("I am editing");
      Celebrity.findById(req.params.celebrityId)
      .then(celebrity => {
          res.render('celebrities/celebrityedit', {celebrity: celebrity})
      })
      .catch(err =>{
          console.log(err);
      })
  });

  router.post('/celebrities/:celebrityId/edit',(req,res) => {
      console.log(req.body);
    const {name,occupation,catchPhrase} = req.body;
    Celebrity.findByIdAndUpdate(req.params.celebrityId,{
        name,
        occupation,
        catchPhrase
    }).then(celebrity => {
        res.redirect(`/celebrities/${celebrity._id}`);
    })
    .catch(err => {
        console.log(err);
    })
  })






module.exports = router;