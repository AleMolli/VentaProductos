
namespace VentaProductos.Models;

public class Cliente
{
    public int Id { get; set; }
    public string? NombreCliente { get; set; }
    public string? ApellidoCliente { get; set; }
    public int Dni { get; set; }
    public float Saldo { get; set; }
}