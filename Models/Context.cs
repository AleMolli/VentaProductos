using Microsoft.EntityFrameworkCore;
using VentaProductos.Models;


namespace InscripcionExamenes.Models;

public class Context : DbContext
{
    public Context(DbContextOptions<Context> options)
        : base(options)
    {
    }

    public DbSet<Producto> Productos { get; set;} = null!;

    public DbSet<Cliente> Clientes { get; set; } = null!;
}