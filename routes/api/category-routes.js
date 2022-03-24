const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  Category.findAll({
    include: 
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock'],
      }
  })
  .then(dbCategoryData => res.json(dbCategoryData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

router.get('/:id', (req, res) => {
  Category.findOne ({
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: Product,
        attributes: ['id','product_name', 'price', 'stock']
      },
    ],
  })
  .then(dbCategoryData => res.json(dbCategoryData))
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  })
});


router.post('/', (req, res) => {
  // create a new category
  Category.create({
    Category_name: req.body.Category_name,
  })
  .then(dbCategoryData => res.json (dbCategoryData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});
  

router.put('/:id', (req, res) => {
  Category.update(
    {
      Category_name: req.body.category_name,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
  .then(dbCategoryData => {
    (!dbCategoryData) 
      res.status(404).json({message: "No category found with that ID!"});
    
    res.json(dbCategoryData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err)
  })
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.delete({
    where: {
      id: req.params.id,
    }
  })
  .then(dbCategoryData => {
    if(!dbCategoryData) {
      res.status(404).json({message: 'No category was found, please check your input'});
      return;
    }
    res.json(dbCategoryData)
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;
