using System.Collections.Generic;
using System.Linq;
using BillScanning.Controllers;
using BillScanningController.Abstract;
using BillScanningController.Enteties;
using Moq;
using Xunit;

namespace BillScanningXTests
{
    public class ControllerXTests
    {
        [Fact]
        public void TestFact()
        {
            // Arrange
            Mock<IValueRepository> mock = new Mock<IValueRepository>();
            mock.Setup(m => m.Values).Returns(new List<Value>()
            {
                new Value{ ValueId = 1, IsPositive = true, Digit = 3 },
                new Value{ ValueId = 2, IsPositive = false, Digit = 5 },
                new Value{ ValueId = 3, IsPositive = true, Digit = 9 },
            });
            ValuesController controller = new ValuesController(mock.Object);

            //Act
            List<Value> result = controller.ShowSimilarValues(true);

            //Assert
            Assert.True(result.Count == 2);
            Assert.True(result.Where(v => v.IsPositive == false).ToArray().Length == 0);
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