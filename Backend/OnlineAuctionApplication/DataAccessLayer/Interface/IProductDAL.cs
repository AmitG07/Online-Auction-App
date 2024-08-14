using BusinessObjectLayer;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.Interface
{
    public interface IProductDAL
    {
        Task<Product> AddProduct(Product product);
        Task<Product> GetProductById(int productId);
        Task<IEnumerable<Product>> GetAllProducts();
        Task UpdateAsync(Product product);
    }
}
