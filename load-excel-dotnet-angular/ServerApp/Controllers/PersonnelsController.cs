using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ServerApp.Models;

namespace ServerApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PersonnelsController : ControllerBase
    {
        private readonly PersonnelDbContext _context;

        public PersonnelsController(PersonnelDbContext context)
        {
            _context = context;
        }

        // GET: api/Personnels
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Personnel>>> GetPersonnels()
        {
            if (_context.Personnels == null)
            {
                return NotFound();
            }
            return await _context.Personnels.ToListAsync();
        }

        // GET: api/Personnels/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Personnel>> GetPersonnel(int id)
        {
            if (_context.Personnels == null)
            {
                return NotFound();
            }
            Personnel? personnel = await _context.Personnels.FindAsync(id);

            if (personnel == null)
            {
                return NotFound();
            }

            return personnel;
        }

        // PUT: api/Personnels/5
        
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPersonnel(int id, Personnel personnel)
        {
            if (id != personnel.PersonnelId)
            {
                return BadRequest();
            }

            _context.Entry(personnel).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PersonnelExists(id))
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

        // POST: api/Personnels
        
        [HttpPost]
        public async Task<ActionResult<Personnel>> PostPersonnel(Personnel personnel)
        {
            if (_context.Personnels == null)
            {
                return Problem("Entity set 'PersonnelDbContext.Personnels'  is null.");
            }
            _context.Personnels.Add(personnel);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPersonnel", new { id = personnel.PersonnelId }, personnel);
        }
        // POST: api/PersonnelsList
        
        [HttpPost("PostPersonnelList")]
        public async Task<ActionResult<Personnel>> PostPersonnelList(List<Personnel> personnels)
        {
            if (_context.Personnels == null)
            {
                return Problem("Entity set 'PersonnelDbContext.Personnels'  is null.");
            }
            _context.Personnels.AddRange(personnels);
            int savedRowsCount = await _context.SaveChangesAsync();

            return CreatedAtAction("PostPersonnelList", new { savedRowsCount = savedRowsCount });
        }
        // DELETE: api/Personnels/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePersonnel(int id)
        {
            if (_context.Personnels == null)
            {
                return NotFound();
            }
            Personnel? personnel = await _context.Personnels.FindAsync(id);
            if (personnel == null)
            {
                return NotFound();
            }

            _context.Personnels.Remove(personnel);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PersonnelExists(int id)
        {
            return (_context.Personnels?.Any(e => e.PersonnelId == id)).GetValueOrDefault();
        }
    }
}
