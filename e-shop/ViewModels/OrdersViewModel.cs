using Models;

namespace e_shop.ViewModels
{
    public class OrdersViewModel
    {
        public User User { get; set; }
        public List<Product> Products { get; set; }
        public DateTime Date { get; set; }
    }
}
