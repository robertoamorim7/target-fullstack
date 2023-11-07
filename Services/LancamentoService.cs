using Microsoft.EntityFrameworkCore;
using target_teste.Data;
using target_teste.Enums;
using target_teste.Models;

namespace target_teste.Services
{
    public class LancamentoService : ILancamentoService
    {
        private readonly TargetTesteDbContext _dbContext;

        public LancamentoService(TargetTesteDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<List<Lancamento>> GetAll(Filter filter)
        {
            return await _dbContext.Lancamentos
                .Where(l =>
                    (l.Data >= filter.InitialDate && l.Data < filter.EndDate.AddDays(1)) &&
                    (l.Avulso ? filter.IncludeAvulso : false) || (!l.Avulso ? filter.IncludeNotAvulso : false)
                    || ((int)l.Status == (int)Status.Valido ? filter.IncludeValid : false) || ((int)l.Status == (int)Status.Cancelado ? filter.IncludeCancelled : false)
                   )
                .OrderByDescending(l => l.Data).ToListAsync();
        }

        public async Task<Lancamento> GetById(Guid id)
        {
            return await _dbContext.Lancamentos.FirstOrDefaultAsync(l => l.Id == id);
        }

        public async Task Create(Lancamento entity)
        {
            _dbContext.Lancamentos.Add(entity);
            await _dbContext.SaveChangesAsync();
        }

        public async Task CreateNaoAvulso(Lancamento lancamento)
        {
            _dbContext.Lancamentos.Add(lancamento);
            await _dbContext.SaveChangesAsync();
        }

        public async Task Delete(Guid id)
        {
            var entityToCancel = await _dbContext.Lancamentos.FindAsync(id);
            entityToCancel.Status = Status.Cancelado;
            await _dbContext.SaveChangesAsync();
        }

        public async Task Update(Lancamento lancamento)
        {
            var entityToUpdate = await _dbContext.Lancamentos.FindAsync(lancamento.Id);

            entityToUpdate.Update(lancamento);
            await _dbContext.SaveChangesAsync();
        }
    }
}
