using System.Collections.Generic;
using BillScanningController.Abstract;
using BillScanningController.Enteties;

namespace BillScanningController.Concrete
{
    public class ValueRepository : IValueRepository
    {
        public IEnumerable<Value> Values { get; }
    }
}
