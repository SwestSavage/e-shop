namespace Models
{
    public class User
    {
        public long Id { get; set; }
        public bool IsAdmin { get; set; }
        public string Login { get; set; }
        public string Password { get; set; }
    }
}
