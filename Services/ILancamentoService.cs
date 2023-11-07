using target_teste.Models;

namespace target_teste.Services
{
    public interface ILancamentoService
    {
        Task<List<Lancamento>> GetAll(Filter filter);
        Task<Lancamento> GetById(Guid id);
        Task Create(Lancamento entity);
        Task CreateNaoAvulso(Lancamento lancamento);
        Task Update(Lancamento lancamento);
        Task Delete(Guid id);
    }
}
