//order_id,start_longitude,start_latitude,end_longitude,end_latitude,start_address,end_address
var orderData = {
    date: "20190920",
    city: "北京",
    geoCoords: [],
    orders: [
        [1,116.499531,39.993664,116.3075175412,39.98385868238,'',''],
        [2,116.598531,39.994664,116.4085175412,39.98485868238,'','']
    ]
};

var dataSource = [{
    dataSourceId: orderData.date,
    data: []
}];

var geoCoords = {};//orderId:[longitude,latitude]
var keyStart = "";
var keyEnd = "";
for(var i in orderData.orders) {
    keyStart = "start" + orderData.orders[i][0];
    keyEnd = "end" + orderData.orders[i][0];
    dataSource[0].data.push({
        start: keyStart,
        end: keyEnd,
        value: orderData.orders[i][0]
    });
    geoCoords[keyStart] = [orderData.orders[i][1],orderData.orders[i][2]];
    geoCoords[keyEnd] = [orderData.orders[i][3],orderData.orders[i][4]];
}
console.log(geoCoords);

orderData.geoCoords = geoCoords;
