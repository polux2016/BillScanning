using System.Collections.Generic;
using BillScanningController.Enteties;

namespace BillScanningController.Abstract
{
    public interface IValueRepository
    {
        IEnumerable<Value> Values { get; }
    }
}