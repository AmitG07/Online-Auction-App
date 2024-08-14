using BusinessLayer.Interface;
using BusinessObjectLayer;
using DataAccessLayer.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLayer
{
    public class ProductBL : IProductBL
    {
        private readonly IProductDAL _productDAL;

        public ProductBL(IProductDAL productDAL)
        {
            _productDAL = productDAL;
        }

        public async Task<Product> AddProduct(Product product)
        {
            return await _productDAL.AddProduct(product);
        }

        public async Task<Product> GetProductById(int productId)
        {
            return await _productDAL.GetProductById(productId);
        }

        public async Task<IEnumerable<Product>> GetAllProducts()
        {
            return await _productDAL.GetAllProducts();
        }

        public async Task UpdateProduct(Product product)
        {
            await _productDAL.UpdateAsync(product);
        }
    }
}
