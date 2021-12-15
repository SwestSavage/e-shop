namespace Models
{
    public class Order
    {
        public long Id { get; set; }
        public User User { get; set; }
        public Product Product { get; set; }
        public DateTime Date { get; set; }
    }
}
