namespace Models
{
    public class Order
    {
        public User User { get; set; }
        public Product Product { get; set; }
        public DateTime Date { get; set; }
    }
}
