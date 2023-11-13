import fs from 'fs';

class ProductManager {
    constructor(filePath) {
        this.filePath = filePath;
        this.products = this.loadProducts();
    }

    loadProducts() {
        try {
            const data = fs.readFileSync(this.filePath, 'utf-8');
            return JSON.parse(data);
        } catch (error) {

            return [];
        }
    }

    saveProducts() {
        fs.writeFileSync(this.filePath, JSON.stringify(this.products, null, 2), 'utf-8');
    }

    getProducts(limit) {
        let productsToReturn = this.products;
        if (limit) {
            productsToReturn = this.products.slice(0, limit);
        }
        return productsToReturn;
    }

    getProductById(productId) {
        const product = this.products.find((p) => p.id === id);
        if (!product) {
            throw new Error('Product not found');
        }
        return product;
    }

    addProduct(newProduct) {

        const requiredFields = ['title', 'description', 'code', 'price', 'stock'];
        for (const field of requiredFields) {
            if (!newProduct[field]) {
                throw new Error(`Field '${field}' is required`);
            }
        }

        if (this.products.some((p) => p.code === newProduct.code)) {
            throw new Error('Product with the same code already exists');
        }

        const newProductId = this.generateUniqueId();

        const productToAdd = {
            id: newProductId,
            status: true,
            thumbnails: [],
            ...newProduct,
        };


        this.products.push(productToAdd);


        this.saveProducts();

        return productToAdd;
    }

    updateProduct(productId, updatedFields) {
        const productIndex = this.products.findIndex((p) => p.id === productId);
        if (productIndex === -1) {
            throw new Error('Product not found');
        }


        delete updatedFields.id;

        this.products[productIndex] = {
            ...this.products[productIndex],
            ...updatedFields,
        };


        this.saveProducts();

        return this.products[productIndex];
    }

    deleteProduct(productId) {
        this.products = this.products.filter((p) => p.id !== productId);

        this.saveProducts();
    }

    generateUniqueId() {

        return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
    }
}

export { ProductManager };