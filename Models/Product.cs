﻿namespace Models
{
    public class Product
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public byte[] Image { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
    }
}
