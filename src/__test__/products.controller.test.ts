
// import { ProductService } from '../services/product.service';
// import { ProductController } from '../controllers/product.controller';
// import { IItem } from '../database/model/product.model';
// import { describe, beforeEach, afterEach, it } from 'node:test';

// // Mock ProductService
// jest.mock('../services/product.service', () => ({
//     getAllProducts: jest.fn(),
//     createProduct: jest.fn(),
//     getProductById: jest.fn(),
//     updateProduct: jest.fn(),
//     deleteProduct: jest.fn(),
//   }));
  

// describe('ProductController', () => {
//   let productController: ProductController;

//   beforeEach(() => {
//     productController = new ProductController();
//   });

//   afterEach(() => {
//     jest.clearAllMocks();
//   });

//   describe('getAllProducts', () => {
//     it('should return all products', async () => {
//       // Mock ProductService.getAllProducts to return mock products
//       const mockProducts: IItem[] = [
//         { name: 'Product 1', category: 'Category A', price: 100 },
//         { name: 'Product 2', category: 'Category B', price: 200 },
//       ];
//       (ProductService.getAllProducts as jest.Mock).mockResolvedValue(mockProducts);

//       // Call controller method
//       const result = await productController.getAllProducts();

//       // Assertions
//       expect(result).toEqual(mockProducts);
//       expect(ProductService.getAllProducts).toHaveBeenCalledWith(undefined, undefined, undefined, undefined);
//     });

//     it('should return filtered products based on query parameters', async () => {
//       // Mock ProductService.getAllProducts to return filtered mock products
//       const mockFilteredProducts: IItem[] = [{ name: 'Product 1', category: 'Category A', price: 100 }];
//       (ProductService.getAllProducts as jest.Mock).mockResolvedValue(mockFilteredProducts);

//       // Call controller method with query parameters
//       const result = await productController.getAllProducts('name', 'test', 'category', 50);

//       // Assertions
//       expect(result).toEqual(mockFilteredProducts);
//       expect(ProductService.getAllProducts).toHaveBeenCalledWith('name', 'test', 'category', 50);
//     });

//     // Add more test cases for different scenarios (sorting, error handling, etc.)
//   });

//   describe('createProduct', () => {
//     it('should create a new product', async () => {
//       const newProduct: IItem = { name: 'New Product', category: 'Category C', price: 300 };
//       (ProductService.createProduct as jest.Mock).mockResolvedValue(newProduct);

//       // Call controller method
//       const result = await productController.createProduct(newProduct);

//       // Assertions
//       expect(result).toEqual(newProduct);
//       expect(ProductService.createProduct).toHaveBeenCalledWith(newProduct);
//     });

//     // Add more test cases for error handling, validation, etc.
//   });

//   describe('getProductById', () => {
//     it('should return a product by ID', async () => {
//       const productId = '1'; // Assuming you use a string ID
//       const mockProduct: IItem = { name: 'Product 1', category: 'Category A', price: 100 };
//       (ProductService.getProductById as jest.Mock).mockResolvedValue(mockProduct);

//       // Call controller method
//       const result = await productController.getProductById(productId);

//       // Assertions
//       expect(result).toEqual(mockProduct);
//       expect(ProductService.getProductById).toHaveBeenCalledWith(productId);
//     });

//     it('should return null if product is not found', async () => {
//       const productId = '999'; // Assuming you use a string ID
//       (ProductService.getProductById as jest.Mock).mockResolvedValue(null);

//       // Call controller method
//       const result = await productController.getProductById(productId);

//       // Assertions
//       expect(result).toBeNull();
//       expect(ProductService.getProductById).toHaveBeenCalledWith(productId);
//     });

//     // Add more test cases for error handling, edge cases, etc.
//   });

//   describe('updateProduct', () => {
//     it('should update a product', async () => {
//       const productId = '1'; // Assuming you use a string ID
//       const updatedProductData: Partial<IItem> = { price: 200 };
//       const updatedProduct: IItem = { name: 'Product 1', category: 'Category A', price: 200 };
//       (ProductService.updateProduct as jest.Mock).mockResolvedValue(updatedProduct);

//       // Call controller method
//       const result = await productController.updateProduct(productId, updatedProductData);

//       // Assertions
//       expect(result).toEqual(updatedProduct);
//       expect(ProductService.updateProduct).toHaveBeenCalledWith(productId, updatedProductData);
//     });

//     // Add more test cases for error handling, validation, etc.
//   });

//   describe('deleteProduct', () => {
//     it('should delete a product', async () => {
//       const productId = '1'; // Assuming you use a string ID
//       const deletedProduct: IItem = { name: 'Product 1', category: 'Category A', price: 100 };
//       (ProductService.deleteProduct as jest.Mock).mockResolvedValue(deletedProduct);

//       // Call controller method
//       const result = await productController.deleteProduct(productId);

//       // Assertions
//       expect(result).toEqual(deletedProduct);
//       expect(ProductService.deleteProduct).toHaveBeenCalledWith(productId);
//     });

//     // Add more test cases for error handling, edge cases, etc.
//   });
// });