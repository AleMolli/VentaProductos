namespace VentaProductos.Models;

public class DetalleVenta{
    public int Id { get; set; }

    public int ProductoId { get; set; }
    public virtual Producto? Producto { get; set; }

    public int VentaId { get; set; }
    public virtual Venta? Venta { get; set; }
}