using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Reflection.Metadata.Ecma335;
using target_teste.Data;
using target_teste.Enums;
using target_teste.Models;
using target_teste.Services;

namespace target_teste.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class LancamentoController : ControllerBase
    {
        private readonly ILancamentoService _lancamentoService;
        public LancamentoController(ILancamentoService lancamentoService)
        {
            _lancamentoService = lancamentoService;
        }

        [HttpGet]
        public async Task<ActionResult<List<Lancamento>>> GetAll([FromQuery] Filter filter)
        {
            var result = await _lancamentoService.GetAll(filter);
            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<List<Lancamento>>> GetById(Guid id)
        {
            var result = await _lancamentoService.GetById(id);
            return Ok(result);
        }

        [HttpPost]
        public async Task<ActionResult> Create([FromBody] Lancamento entity)
        {
            await _lancamentoService.Create(entity);
            return Ok();
        }

        [HttpPost("nao-avulso")]
        public async Task<ActionResult> CreateNaoAvulso([FromBody] LancamentoNaoAvulso entity)
        {
            var entityToInsert = new Lancamento
            {
                Descricao = entity.Descricao,
                Data = entity.Data,
                Valor = entity.Valor,
                Avulso = false,
                Status = Status.Valido
            };
            await _lancamentoService.CreateNaoAvulso(entityToInsert);
            return Ok();
        }

        [HttpPut]
        public async Task<ActionResult> Update([FromBody] Lancamento entity)
        {
            await _lancamentoService.Update(entity);
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(Guid id)
        {
            await _lancamentoService.Delete(id);
            return Ok();
        }

    }
}