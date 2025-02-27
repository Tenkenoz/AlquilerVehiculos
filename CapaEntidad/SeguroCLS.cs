using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaEntidad
{
    public class SeguroCLS
    {
        public int Id { get; set; }
        public int ReservaId { get; set; }
        public string TipoSeguro { get; set; }
        public decimal Costo { get; set; }
    }
}
