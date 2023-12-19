import { tokens } from "../theme";

export const getMonthlyData = async (data) => {
    try {
      const monthlyData = {};
  
      data.forEach((order) => {
        const bookingDate = new Date(order.bookingDate);
        if (!isNaN(bookingDate.getTime())) {
          const month = bookingDate.getMonth();
          const productType = order.productType;
  
          if (!monthlyData[productType]) {
            monthlyData[productType] = {
              id: productType,
              color: getColorForProductType(productType),
              data: [],
            };
          }
  
          const existingMonthIndex = monthlyData[productType].data.findIndex((item) => item.x === monthToLabel(month));
          console.log(existingMonthIndex);
          if (existingMonthIndex !== -1) {
            monthlyData[productType].data[existingMonthIndex].y += order.quantity;
          } else {
            monthlyData[productType].data.push({
              x: monthToLabel(month),
              y: order.quantity,
            });
          }
        }
      });
  
      Object.values(monthlyData).forEach((item) => {
        item.data.sort((a, b) => monthToIndex(a.x) - monthToIndex(b.x));
      });
  
      const result = Object.values(monthlyData).sort((a, b) =>
        monthToIndex(a.data[0].x) - monthToIndex(b.data[0].x)
      );
      console.log(result);
     return result;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const monthToIndex = (month) => {
    const monthOrder = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return monthOrder.indexOf(month);
  };
  // Helper function to convert month index to label
  const monthToLabel = (index) => {
    const monthNames = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ]
    return monthNames[index]
  }
  const getColorForProductType = (productType) => {
    switch (productType) {
      case 'Rich':
        return tokens('dark').greenAccent[500]
      case 'Skimmed':
        return tokens('dark').blueAccent[300]
      case 'Smart':
        return tokens('dark').redAccent[200]
      case 'Toned':
        return tokens('dark').redAccent[500]
      default:
        return 'defaultColor' // Provide a default color or handle accordingly
    }
  }
