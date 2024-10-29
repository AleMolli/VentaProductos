using System.ComponentModel.DataAnnotations;

namespace VentaProductos.Models;

public class Cliente
{
    public int Id { get; set; }
    /*valores stringlength corregidos*/
    [StringLength(100, ErrorMessage = "El Nombre debe contener entre {2} y {1} caracteres.", MinimumLength = 3)]
    public string? NombreCliente { get; set; }
     /*valores stringlength corregidos*/
    [StringLength(100, ErrorMessage = "El Apellido debe contener entre {2} y {1} caracteres.", MinimumLength = 3)]
    public string? ApellidoCliente { get; set; }
    public int Dni { get; set; }
    public float Saldo { get; set; }

    public virtual ICollection<Venta>? Venta { get; set; }
}