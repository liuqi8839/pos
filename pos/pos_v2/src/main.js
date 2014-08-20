//TODO: Please write code in this file.
var printInventory = function(inputs) {

    var allItems = loadAllItems();
    var allPromotions = loadPromotions();
    var itemsNums = [];
    var actualPay = [];

    for (var i = 0 ; i < allItems.length ; i++){
        itemsNums[i] = 0;
        actualPay[i] = 0;
    }

    for (var i = 0; i < inputs.length; i++){
        for (var j = 0; j < allItems.length; j++ ){
            if(inputs[i].substring(0,10) === allItems[j].barcode){
                if( inputs[i].length > 10){
                    itemsNums[j] = inputs[i].substr(11,1);
                }
                else{
                    itemsNums[j] += 1;
                }
            }
        }
    }

    var promotionPay = [];
    for (var i = 0; i < allItems.length; i++){
        actualPay[i] = allItems[i].price * itemsNums[i];
        for (var j = 0; j < allPromotions.length; j++){
            if (allPromotions[j].type === 'BUY_TWO_GET_ONE_FREE'){
                actualPay[i] = parseInt((itemsNums[i]/3)) * allItems[i].price * 2 + (itemsNums[i]%3) * (allItems[i].price);
            }
        }
        promotionPay[i] = allItems[i].price * itemsNums[i] - actualPay[i];
    }

    var expectText = '***<没钱赚商店>购物清单***\n';

    var dateDigitToString = function (num) {
        return num < 10 ? '0' + num : num;
    };
    var currentDate = new Date(),
        year = dateDigitToString(currentDate.getFullYear()),
        month = dateDigitToString(currentDate.getMonth() + 1),
        date = dateDigitToString(currentDate.getDate()),
        hour = dateDigitToString(currentDate.getHours()),
        minute = dateDigitToString(currentDate.getMinutes()),
        second = dateDigitToString(currentDate.getSeconds()),
        formattedDateString = year + '年' + month + '月' + date + '日 ' + hour + ':' + minute + ':' + second;

    expectText += '打印时间：' + formattedDateString + '\n' ;
    expectText += '----------------------\n';

    for (var i = 0; i < itemsNums.length; i++){
        if (itemsNums[i] != 0){
            expectText += '名称：'+ allItems[i].name + '，数量：' + itemsNums[i]+allItems[i].unit + '，单价：' + (allItems[i].price).toFixed(2)+'(元)，小计：' + (actualPay[i]).toFixed(2)+'(元)\n';
        }
    }

    expectText += '----------------------\n';
    expectText += '挥泪赠送商品：\n';

    var totalPay = 0;
    for (var i = 0; i < promotionPay.length; i++){
        if (promotionPay[i] != 0){
            expectText += '名称：'+allItems[i].name+'，数量：'+parseInt(itemsNums[i]/3)+allItems[i].unit+'\n';
            totalPay += promotionPay[i];
        }
    }

    expectText += '----------------------\n';

    var totalPromotion = 0;
    for (var i = 0; i < actualPay.length; i++){
        totalPromotion += actualPay[i];
    }

    expectText += '总计：'+totalPromotion.toFixed(2)+'(元)\n'+'节省：'+totalPay.toFixed(2)+'(元)\n'+'**********************';

    console.log(expectText);

};
