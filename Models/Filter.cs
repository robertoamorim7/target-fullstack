using System;

namespace target_teste.Models
{
    public class Filter
    {
        public DateTime InitialDate {  get; set; }
        public DateTime EndDate { get; set; }
        public bool IncludeCancelled { get; set; }
        public bool IncludeValid { get; set; }
        public bool IncludeAvulso { get; set; }
        public bool IncludeNotAvulso { get; set; }
    }
}
