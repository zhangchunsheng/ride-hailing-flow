/**
 * 模拟迁徙图功能实现
 */
require.config({
    paths: {
        echarts: './js'
    }
});
var ecConfig;
var myChart;

require(
    [
        'echarts',
        'echarts/chart/map'
    ],
    function (ec) {
        ecConfig = require('echarts/config');
        myChart = ec.init(document.getElementById('map'));
        initData();
        loadAll(orderData.date, '网约车流动图');
    }
);

var selected = {};
selected['时间' + orderData.date] = false;

option = {
    backgroundColor: '#1b1b1b',
    color: ['gold', 'aqua', 'lime'],
    title: {
        show: true,
        text: ' ',

        x: 'center',
        textStyle: {
            color: '#fff'
        }
    },
    /*tooltip: {
        trigger: 'item',
        formatter: function (params, ticket, callback) {
            //$.get('detail?name=' + params.name, function (content) {
            //    callback(ticket, toHTML(content));
            //});
            var tips = '<ul style="list-style: none">';
            tips += '<li>订单时间：' + orderData.date + '</li>';
            tips += '</ul>';
            return tips;
        }
    },*/
    legend: {
        show: true,
        orient: 'vertical',
        x: 'left',
        data: ['时间' + orderData.date],
        selectedMode: 'single',
        selected: selected,
        textStyle: {
            color: '#fff'
        }
    },
    toolbox: {
        show: true,
        orient: 'vertical',
        x: 'right',
        y: 'center',
        feature: {
            mark: {show: true},
            dataView: {show: true, readOnly: false},
            restore: {show: true},
            saveAsImage: {show: true}
        }
    },
    dataRange: {
        min: 0,
        max: 100,
        calculable: true,
        color: ['#ff3333', 'orange', 'yellow', 'lime', 'aqua'],
        textStyle: {
            color: '#fff'
        }
    },
    series: [
        {
            name: orderData.city,
            type: 'map',
            roam: true,
            hoverable: false,
            mapType: orderData.city,
            itemStyle: {
                normal: {
                    color: '#28363E',
                    borderColor: 'rgba(100,149,237,1)',
                    borderWidth: 1,
                    areaStyle: {
                        color: '#1b1b1b'
                    },
                    label: {
                        show: true,
                        textStyle: {
                            fontSize: 12,
                            color: 'white'
                        }
                    }
                }
            },
            data: [],
            markLine: {
                smooth: true,
                symbol: ['none', 'circle'],
                symbolSize: 1,
                itemStyle: {
                    normal: {
                        color: '#fff',
                        borderWidth: 1,
                        borderColor: 'rgba(30,144,255,0.5)'
                    }
                },
                data: [],
            },
            geoCoord: orderData.geoCoords
        },
        {
            name: orderData.city,
            type: 'map',
            mapType: orderData.city,
            data: [],
            markLine: {
                smooth: true,
                effect: {
                    show: true,
                    scaleSize: 2,
                    period: 30,
                    color: '#fff',
                    shadowBlur: 10
                },
                itemStyle: {
                    normal: {
                        borderWidth: 1,
                        lineStyle: {
                            type: 'solid',
                            shadowBlur: 10
                        }
                    }
                }
            },
            markPoint: {
                symbol: 'emptyCircle',
                symbolSize: function (v) {
                    return 10 + v / 10
                },
                effect: {
                    show: true,
                    shadowBlur: 0
                },
                itemStyle: {
                    normal: {
                        label: {show: false}
                    },
                    emphasis: {
                        label: {position: 'top'}
                    }
                }
            }
        }
    ]
};

function changeDataSource() {
    var dataSourceId = parseInt($("#dataSourceId").val());
    loadAll(dataSourceId, '网约车流动图');
}

/**
 * 加载数据源，构造需要流动图的数据和连线信息
 * @param dataSourceId 数据源  data.js中定义的对象
 * @param title 标题
 */
function loadAll(dataSourceId, title) {
    myChart.clear();
    var data = h2.get(dataSourceId);
    option.series[1].markLine.data = [];

    var startPoint = null;
    var endPoint = null;
    var arr = null;

    //起点到终点的连线数据
    for (var i = 0; i < data.length; i++) {
        startPoint = new Object();
        startPoint.name = data[i].start;

        endPoint = new Object();
        endPoint.name = data[i].end;

        arr = new Array();
        arr.push(startPoint);
		arr.push(endPoint);
        option.series[1].markLine.data.push(arr);
    }

    //流向数据
    option.series[1].markPoint.data = data;
    option.title.text = title;
    myChart.setOption(option);
}

var h2 = new HashMap();

function initData() {
    for (var i = 0; i < dataSource.length; i++) {
        h2.put(dataSource[i].dataSourceId, dataSource[i].data);
    }
}

window.onresize = function () {
    myChart.resize();
}

