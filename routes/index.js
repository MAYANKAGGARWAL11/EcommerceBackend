var express = require('express');
var router = express.Router();
const Product = require('../models/Product');
const Variant = require('../models/Variant');
const port = 3000;

router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post('/products', async (req, res) => {
  try {
    const { name, description, price, variants } = req.body;


    const product = await Product.create({ name, description, price });

    const variantIds = await Promise.all(
      variants.map(async (variant) => {
        try {
          const createdVariant = await Variant.create(variant);
          return createdVariant._id;
        } catch (variantError) {
          console.error(variantError);
          throw variantError;
        }
      })
    );

    product.variants = variantIds;
    await product.save();

    res.status(201).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
router.put('/products/:productId', async (req, res) => {
  try {
    const productId = req.params.productId;
    const { name, description, price } = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { name, description, price },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
router.delete('/products/:productId', async (req, res) => {
  try {
    const productId = req.params.productId;

    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/products', async (req, res) => {
  try {
    const products = await Product.find().populate('variants');
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/products/:productId', async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId).populate('variants');
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
router.post('/products/:productId/variants', async (req, res) => {
  try {
    const productId = req.params.productId;
    const variantData = req.body;

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const createdVariant = await Variant.create(variantData);

    product.variants.push(createdVariant._id);
    await product.save();

    res.status(201).json(createdVariant);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
router.put('/products/:productId/variants/:variantId', async (req, res) => {
  try {
    const { productId, variantId } = req.params;
    const variantData = req.body;

    const updatedVariant = await Variant.findByIdAndUpdate(
      variantId,
      variantData,
      { new: true }
    );

    if (!updatedVariant) {
      return res.status(404).json({ error: 'Variant not found' });
    }

    res.status(200).json(updatedVariant);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
router.delete('/products/:productId/variants/:variantId', async (req, res) => {
  try {
    const { productId, variantId } = req.params;

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    product.variants = product.variants.filter(vId => vId.toString() !== variantId);
    await product.save();

    const deletedVariant = await Variant.findByIdAndDelete(variantId);

    if (!deletedVariant) {
      return res.status(404).json({ error: 'Variant not found' });
    }

    res.status(200).json({ message: 'Variant deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
router.get('/products/:productId/variants/:variantId', async (req, res) => {
  try {
    const { productId, variantId } = req.params;

    const product = await Product.findById(productId).populate('variants');

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const variant = product.variants.find(v => v._id.toString() === variantId);

    if (!variant) {
      return res.status(404).json({ error: 'Variant not found' });
    }

    res.status(200).json(variant);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
router.get('/products/:productId/variants', async (req, res) => {
  try {
    const productId = req.params.productId;

    const product = await Product.findById(productId).populate('variants');

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.status(200).json(product.variants);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
