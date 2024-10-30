using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using VentaProductos.Models;

namespace VentaProductos.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class DetallesVentasController : ControllerBase
    {
        private readonly Context _context;

        public DetallesVentasController(Context context)
        {
            _context = context;
        }

        // GET: api/DetallesVentas
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DetalleVenta>>> GetDetalleVenta()
        {
            return await _context.DetalleVenta.ToListAsync();
        }

        // GET: api/DetallesVentas/5
        [HttpGet("{id}")]
        public async Task<ActionResult<List<DetalleVenta>>> GetDetalleVenta(int id)
        {
            var detalleVenta = await _context.DetalleVenta.Include(x => x.Producto).Where(x => x.VentaId == id).ToListAsync();

            if (detalleVenta == null)
            {
                return NotFound();
            }

            return detalleVenta;
        }

        // PUT: api/DetallesVentas/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDetalleVenta(int id, DetalleVenta detalleVenta)
        {
            if (id != detalleVenta.Id)
            {
                return BadRequest();
            }

            _context.Entry(detalleVenta).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DetalleVentaExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/DetallesVentas
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<DetalleVenta>> PostDetalleVenta(DetalleVenta detalleVenta)
        {
            _context.DetalleVenta.Add(detalleVenta);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDetalleVenta", new { id = detalleVenta.Id }, detalleVenta);
        }

        // DELETE: api/DetallesVentas/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDetalleVenta(int id)
        {
            var detalleVenta = await _context.DetalleVenta.FindAsync(id);
            if (detalleVenta == null)
            {
                return NotFound();
            }

            _context.DetalleVenta.Remove(detalleVenta);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool DetalleVentaExists(int id)
        {
            return _context.DetalleVenta.Any(e => e.Id == id);
        }
    }
}
