using System.ComponentModel.DataAnnotations;

namespace VentaProductos.Models;

public class Cliente
{
    public int Id { get; set; }
    [StringLength(100, ErrorMessage = "El Nombre debe contener entre {3} y {100} caracteres.", MinimumLength = 3)]
    public string? NombreCliente { get; set; }
    [StringLength(100, ErrorMessage = "El Apellido debe contener entre {3} y {100} caracteres.", MinimumLength = 3)]
    public string? ApellidoCliente { get; set; }
    public int Dni { get; set; }
    public float Saldo { get; set; }
}