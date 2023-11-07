using target_teste.Enums;

namespace target_teste.Models
{
    public class Lancamento
    {
        public Guid Id { get; set; }
        public string Descricao { get; set; } = string.Empty;
        public DateTime Data { get; set; }
        public double Valor {  get; set; }
        public bool Avulso { get; set; }
        public Status Status { get; set; }


        public void Update(Lancamento newLancamento)
        {
            if (newLancamento == null)
            {
                throw new ArgumentNullException(nameof(newLancamento));
            }

            // You can add validation logic here as needed
            if (!string.IsNullOrEmpty(newLancamento.Descricao))
            {
                Descricao = newLancamento.Descricao;
            }

            Data = newLancamento.Data; // Always update the date
            Valor = newLancamento.Valor; // Always update the value
            Avulso = newLancamento.Avulso; // Always update the Avulso flag
            Status = newLancamento.Status; // Always update the Status
        }
    }
}
