function Inventory(name, price, count){
    this.name = name;
    this.price = price.toFixed(2);
    this.count = count;
    this.largess = 0;
}

Inventory.prototype.compute = function(){
    if(this.count >=3){
        this.largess = 1;
    }
    this.totalPrice = (this.price * (this.count - this.largess)).toFixed(2);
    if(this.name == '雪碧'){
        this.unit = '瓶';
    }
    if(this.name == '荔枝'){
        this.unit = '斤';
    }
    if(this.name == '方便面'){
        this.unit = '袋';
    }
    return '名称：' + this.name+'，数量：'+this.count+this.unit+'，单价：'+this.price+'(元)，小计：'+this.totalPrice+'(元)\n';
};