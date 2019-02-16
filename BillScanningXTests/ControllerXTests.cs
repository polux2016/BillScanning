using System;
using Xunit;
using BillScanning.Controllers;

namespace BillScanningXTests
{
    public class ControllerXTests
    {
        [Fact]
        public void TestFact()
        {

        }

        [Theory]
        [InlineData(0)]
        [InlineData(1)]
        [InlineData(2)]
        public void TestTheory(int id)
        {

        }
    }
}