using Models;

namespace e_shop.ViewModels
{
    public class OrdersViewModel
    {
        public User User { get; set; }
        public List<ProductOrderId> ProductsWithOrderId { get; set; }
        public DateTime Date { get; set; }
    }

    public class ProductOrderId
    {
        public int OrderId { get; set; }
        public Product Product { get; set; }
    }
}
