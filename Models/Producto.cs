
// using System.ComponentModel.DataAnnotations;

namespace VentaProductos.Models;

public class Producto
{
    public int Id { get; set; }
    
    // [StringLength(100, ErrorMessage = "El Nombre debe contener entre {2} y {1} caracteres.", MinimumLength = 1)]
    public string? NombreProducto { get; set; }
    public int Cantidad { get; set; }
    public float PrecioVenta { get; set; }
    public float PrecioCompra { get; set; }
}