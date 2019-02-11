using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ProductCatalog.Controllers
{
    [Route("api/[controller]")]
    public class ProductCatalogController : Controller
    {
        private static List<Product> _userProducts = new List<Product>();
        [HttpGet("[action]")]
        public IEnumerable<Product> GetUserProducts()
        {
            var userProducts = _userProducts;

            //userProducts = _database.GetUserProducts();

            return userProducts;

        }
        // POST api/<controller>
        [HttpPost]
        [Route("AddProduct")]
        public JsonResult AddProduct([FromBody]Product product)
        {
            if (product != null)
            {
                if(string.IsNullOrEmpty(product.Name) || string.IsNullOrWhiteSpace(product.Name))
                {
                    return Json(new
                    {
                        success = false,
                        message = "Failed to add product: No prodcut name given.",
                        products = _userProducts
                    });
                }
                if(product.Quantity < 0)
                {
                    return Json(new
                    {
                        success = false,
                        message = "Failed to add product: Product quantity is less than 0.",
                        products = _userProducts
                    });
                }

                product.Name = product.Name.Trim();
                product.Description = product.Description.Trim();

                if (_userProducts.Contains(product))
                {
                    return Json(new
                    {
                        success = false,
                        message = "Failed to add product: Product with that name already exists. Please use a different name.",
                        products =_userProducts

                    });
                }
                else
                {
                    _userProducts.Add(product);
                    return Json(new
                    {
                        success = true,
                        message = "Successfully added product",
                        products = _userProducts
                    });
                }
            }
            return Json(new
            {
                success = false,
                message = "Failed to add product",
                products = _userProducts


            });
        }

        // GET api/<controller>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }


        // PUT api/<controller>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }
        // DELETE api/<controller>/DeleteAllProducts
        [HttpDelete("[action]")]
        public IEnumerable<Product>  DeleteAllProducts()
        {
            _userProducts = new List<Product>();
            return _userProducts;
        }
        // DELETE api/<controller>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
    public class Product : IEquatable<Product>
    {
        [Required]
        public string Name { get; set; }
        [Required]
        public int Quantity { get; set; }
        public string Description { get; set; }

        public override bool Equals(object obj)
        {
            return Equals(obj as Product);
        }
        public bool Equals(Product other)
        {
            if (other == null)
                return false;
            return Name == other.Name;
        }
        public override int GetHashCode()
        {
            return Name.GetHashCode();
        }
    }
}
