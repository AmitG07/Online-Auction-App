using BusinessLayer.Interface;
using BusinessObjectLayer;
using Microsoft.AspNetCore.Mvc;

namespace OnlineAuctionApplication.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : Controller
    {
        private readonly IProductBL _productBL;
        private readonly ILogger<ProductController> _logger;

        public ProductController(IProductBL productBL, ILogger<ProductController> logger)
        {
            _productBL = productBL;
            _logger = logger;
        }

        [HttpPost]
        public async Task<IActionResult> AddProduct([FromBody] Product product)
        {
            // Validate the model state
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Check if auction end time is in the future
            if (product.AuctionEndTime <= DateTime.UtcNow)
            {
                return BadRequest(new { message = "Auction end time must be in the future." });
            }

            // Check if starting price is less than or equal to reserved price
            if (product.StartingPrice > product.ReservedPrice)
            {
                return BadRequest(new { message = "Starting price must be less than or equal to reserved price." });
            }

            // Check if required fields are provided
            if (string.IsNullOrWhiteSpace(product.Name) ||
                string.IsNullOrWhiteSpace(product.Category) ||
                product.StartingPrice <= 0 ||
                product.ReservedPrice <= 0)
            {
                return BadRequest(new { message = "Product name, category, starting price, and reserved price are required." });
            }

            // Add the product
            try
            {
                var createdProduct = await _productBL.AddProduct(product);
                return CreatedAtAction(nameof(GetProductById), new { id = createdProduct.ProductId }, createdProduct);
            }
            catch (Exception ex)
            {
                // Log the exception and return a 500 Internal Server Error
                _logger.LogError(ex, "Error occurred while adding product.");
                return StatusCode(500, new { message = "An unexpected error occurred.", detail = ex.Message });
            }
        }

        [HttpGet("GetProductById/{id}")]
        public async Task<IActionResult> GetProductById(int id)
        {
            var product = await _productBL.GetProductById(id);
            if (product == null)
                return NotFound();
            return Ok(product);
        }

        [HttpGet("GetAllProducts")]
        public async Task<IActionResult> GetAllProducts()
        {
            var products = await _productBL.GetAllProducts();
            return Ok(products);
        }

        [HttpGet("SearchAndSort")]
        public async Task<IActionResult> SearchAndSortProducts(
        [FromQuery] decimal? minPrice = null,
        [FromQuery] decimal? maxPrice = null,
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 10)
            {
            // Extract query parameters
            var name = Request.Query["name"].ToString();
            var category = Request.Query["category"].ToString();
            var sortBy = Request.Query["sortBy"].ToString();
            
            // Validate page and pageSize
            if (page <= 0) page = 1;
            if (pageSize <= 0) pageSize = 10;

            try
            {
                var products = await _productBL.GetAllProducts();

                // Apply filters based on the provided parameters
                var filteredProducts = products.Where(p =>
                    (string.IsNullOrEmpty(name) || p.Name.Contains(name, StringComparison.OrdinalIgnoreCase)) &&
                    (string.IsNullOrEmpty(category) || p.Category.Equals(category, StringComparison.OrdinalIgnoreCase)) &&
                    (!minPrice.HasValue || p.StartingPrice >= minPrice.Value) &&
                    (!maxPrice.HasValue || p.StartingPrice <= maxPrice.Value)
                ).ToList();

                // Apply sorting
                IEnumerable<Product> sortedProducts = sortBy switch
                {
                    "Price" => filteredProducts.OrderBy(p => p.StartingPrice),
                    "Time" => filteredProducts.OrderBy(p => p.AuctionEndTime),
                    _ => filteredProducts
                };

                // Apply pagination
                var pagedProducts = sortedProducts
                    .Skip((page - 1) * pageSize)
                    .Take(pageSize)
                    .ToList();

                return Ok(new
                {
                    TotalCount = sortedProducts.Count(),
                    Page = page,
                    PageSize = pageSize,
                    Products = pagedProducts
                });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while searching and sorting products.");
                return StatusCode(500, new { message = "An unexpected error occurred.", detail = ex.Message });
            }
        }

    }
}
