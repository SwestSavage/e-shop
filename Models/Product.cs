namespace Models
{
    public class Product
    {
        public Product()
        {
            Orders = new HashSet<Order>();
        }
        public int ProductId { get; set; }
        public string Title { get; set; }
        public string ImageSrc { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public virtual ICollection<Order> Orders { get; set; }
    }
}
