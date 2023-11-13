
import express from 'express';
import { ProductManager } from './ProductManager.js';

const app = express();
const port = 3000;


app.use(express.json());

const productManager = new ProductManager('productos.json');


app.get('/api/products', (req, res) => {
s
    const limit = req.query.limit;
    const products = productManager.getProducts(limit);
    res.json(products);
});

app.get('/api/products/:pid', (req, res) => {

    const productId = req.params.pid;
    const product = productManager.getProductById(productId);
    res.json(product);
});

app.post('/api/products', (req, res) => {

    const newProduct = req.body;
    const addedProduct = productManager.addProduct(newProduct);
    res.json(addedProduct);
});

app.put('/api/products/:pid', (req, res) => {

    const productId = req.params.pid;
    const updatedProduct = productManager.updateProduct(productId, req.body);
    res.json(updatedProduct);
});

app.delete('/api/products/:pid', (req, res) => {
    const productId = req.params.pid;
    productManager.deleteProduct(productId);
    res.json({ message: 'Product deleted successfully' });
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});