
using System.ComponentModel.DataAnnotations;

namespace VentaProductos.Models;

public class Producto
{
    public int Id { get; set; }
    
    [StringLength(100, ErrorMessage = "El Nombre debe contener entre {3} y {100} caracteres.", MinimumLength = 3)]
    public string? NombreProducto { get; set; }
    public int Cantidad { get; set; }
    public float PrecioVenta { get; set; }
    public float PrecioCompra { get; set; }
}
