using Premier.Data;
using System.ComponentModel.DataAnnotations;

namespace Premier
{
    public class Customer
    {
        [Key]
        public uint ID { get; init; }
        [Required(ErrorMessage ="Le nom du client n'a pas été rentré")]
        public string Name { get; set; }
        [RegularExpression("^(?:(?:\\+|00)33[\\s.-]{0,3}(?:\\(0\\)[\\s.-]{0,3})?|0)[1-9](?:(?:[\\s.-]?\\d{2}){4}|\\d{2}(?:[\\s.-]?\\d{3}){2})$")]
        public String NumeroTel { get; set; }
        public CustomerStatus Status { get; set; }
    }
}