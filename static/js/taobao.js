
(function() {
  user_num=[]
  user_name=[]

    $.ajax({
      url:'/phone_price_bar',
      async:false,
      success:function(data){
      user_name=data["name"]
      user_num=data["num"]
    }
  })
    console.log(user_name)
  console.log(user_name)
  // 实例化对象
  var myChart = echarts.init(document.getElementById("phone_price_bar"));
  console.log(user_num)
  // 指定配置和数据
  // prettier-ignore
let dataAxis = user_name;
// prettier-ignore
let data = user_num;
let yMax = 500;
let dataShadow = [];
for (let i = 0; i < data.length; i++) {
  dataShadow.push(yMax);
}
var option = {
  title: {
    text: '',
    subtext: ''
  },
    axisLabel: {
      inside: false,
      color: '#fff'
    },
  xAxis: {
    data: dataAxis,
    axisLabel: {
      inside: false,
      color: '#fff'
    },
    axisTick: {
      show: false
    },
    axisLine: {
      show: false
    },
    z: 10
  },
  yAxis: {
    axisLine: {
      show: false
    },
    axisTick: {
      show: false
    },
    axisLabel: {
      color: '#999'
    }
  },
  dataZoom: [
    {
      type: 'inside'
    }
  ],
  series: [
    {
      type: 'bar',
      showBackground: true,
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: '#83bff6' },
          { offset: 0.5, color: '#188df0' },
          { offset: 1, color: '#188df0' }
        ])
      },
      emphasis: {
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#2378f7' },
            { offset: 0.7, color: '#2378f7' },
            { offset: 1, color: '#83bff6' }
          ])
        }
      },
      data: data
    }
  ]
};
// Enable data zoom when user click bar.
const zoomSize = 6;
myChart.on('click', function (params) {
  console.log(dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)]);
  myChart.dispatchAction({
    type: 'dataZoom',
    startValue: dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)],
    endValue:
      dataAxis[Math.min(params.dataIndex + zoomSize / 2, data.length - 1)]
  });
});

  // 把配置给实例对象
  myChart.setOption(option);
  window.addEventListener("resize", function() {
    myChart.resize();
  });





})();

// 用户
(function () {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('bubble'));
    // (1)准备数据
    // 2. 指定配置和数据
    $.ajax({
        url: '/bubble',
        async: false,
        success: function (data) {
            mydata = data.data
        }
    })
    console.log(mydata)
    const data = [
        mydata

    ];
    option = {

        title: {
            text: '',
            left: '5%',
            top: '3%'
        },
        axisLabel: {
      inside: false,
      color: '#fff'
    },
        legend: {
            right: '10%',
            top: '3%',
            data: ['1990', '2015']
        },
        grid: {
            left: '8%',
            top: '10%'
        },
        xAxis: {
            splitLine: {
                lineStyle: {
                    type: 'dashed'
                }
            }
        },
        yAxis: {
            splitLine: {
                lineStyle: {
                    type: 'dashed'
                }
            },
            scale: true
        },
        series: [
            {
                name: '',
                data: data[0],
                type: 'scatter',
                symbolSize: function (data) {
                    return Math.sqrt(data[2]) * 7;
                },
                emphasis: {
                    focus: 'series',
                    label: {
                        show: true,
                        formatter: function (param) {
                            return param.data[3];
                        },
                        position: 'top'
                    }
                },
                itemStyle: {
                    shadowBlur: 10,
                    shadowColor: 'rgba(120, 36, 50, 0.5)',
                    shadowOffsetY: 5,
                    color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [
                        {
                            offset: 0,
                            color: 'rgb(251, 118, 123)'
                        },
                        {
                            offset: 1,
                            color: 'rgb(204, 46, 72)'
                        }
                    ])
                }
            },

        ]
    };

    // 重新把配置好的新数据给实例对象
    myChart.setOption(option);

})();


//订单
(function () {
    date=[]
  num=[]
  $.ajax({
    url:'/phone_brand',
    async:false,
    success:function(data){
      realdata=data["realdata"]
      name=data["name"]
      fakedata=data["fakedata"]
    }
  })


  // 基于准备好的dom，初始化echarts实例
  var myChart = echarts.init(document.getElementById('phone_brand'));


  // (1)准备数据


  // 2. 指定配置和数据
  var option = {
  title: {
    text: ''
  },
      axisLabel: {
      inside: false,
      color: '#fff'
    },


  legend: {
    data: name
  },
  series: [
    {
      name: 'Expected',
      type: 'funnel',
        top:'-10%',
      left: '10%',
      width: '80%',
      label: {
        formatter: '{b}Expected'
      },
      labelLine: {
        show: false
      },
      itemStyle: {
        opacity: 0.7
      },
      emphasis: {
        label: {
          position: 'inside',
          formatter: '{b}Expected: {c}%'
        }
      },
      data: fakedata
    },
    {
      name: 'Actual',
      type: 'funnel',
        top:'-10%',
      left: '10%',
      width: '80%',
      maxSize: '80%',
      label: {
        position: 'inside',
        formatter: '{c}%',
        color: '#fff'
      },
      itemStyle: {
        opacity: 0.5,
        borderColor: '#fff',
        borderWidth: 2
      },
      emphasis: {
        label: {
          position: 'inside',
          formatter: '{b}Actual: {c}%'
        }
      },
      data: realdata,
      // Ensure outer shape will not be over inner shape when hover.
      z: 100
    }
  ]
};
  // 重新把配置好的新数据给实例对象
  myChart.setOption(option);

})();


//地图
(function () {
    var ec_center = echarts.init(document.getElementById('province'),"transparent");
    mydata=[]
    $.ajax({
        url:'/province',
        async:false,
        success:function(data){
            mydata=data.data

        }
    })
    console.log(mydata)
    var mydata = mydata
    var ec_center_option = {
        title: {
            text: '',
            subtext: '',
            x: 'middle'
        },
        tooltip: {
            trigger: 'item'
        },
        axisLabel: {
      inside: false,
      color: '#fff'
    },
        //左侧小导航图标
        visualMap: {
            show: false,
            x: 'left',
            y: 'bottom',
            textStyle:{
                fontSize: 8,
            },
            splitList: [{ start: 0,end: 1 },
                {start: 1, end: 9 },
                { start: 10, end: 99 },
                {  start: 100, end: 699 },
                { start: 700 }],
            color: ['#8A3310', '#C64918', '#E55B25', '#F2AD92', '#F9DCD1']
        },
        //配置属性
        series: [{
            name: '分布数',
            type: 'map',
            mapType: 'china',
            zoom:1,
            roam: false, //拖动和缩放
            itemStyle: {
                normal: {
                    borderWidth: .5, //区域边框宽度
                    borderColor: '#0692a4', //区域边框颜色
                    areaColor: "rgba(20,41,87,0.8)", //区域颜色
                },
                emphasis: { //鼠标滑过地图高亮的相关设置
                    borderWidth: .5,
                    borderColor: '#4b0082',
                    areaColor: "#0b1c2d",
                }
            },
            label: {
                normal: {
                    show: false, //省份名称
                    fontSize: 8,
                },
                emphasis: {
                    show: true,
                    fontSize: 8,
                }
            },
            data:mydata //mydata //数据
        }]
    };
    ec_center.setOption(ec_center_option)

})();



(function() {


  $.ajax({
    url:'/shop_num',
    async:false,
    success:function(data){
      mydata=data.data


    }
  })

  // 基于准备好的dom，初始化echarts实例
  var myChart = echarts.init(document.getElementById('sell_num'));


  // (1)准备数据


  // 2. 指定配置和数据
  var option = {

      tooltip : {
        trigger: 'item',
        //提示框的数据样式显示
        formatter:"{a}<br/>{d}% "
},
      axisLabel: {
      inside: false,
      color: '#fff'
    },
  series: [
    {
      name: '店铺分布',
      type: 'pie',
      radius: [5, 150],
      center: ['50%', '50%'],
      roseType: 'area',
      itemStyle: {
        borderRadius: 8
      },
      data: mydata
    }
  ]
};;


  // 重新把配置好的新数据给实例对象
  myChart.setOption(option);

})();




(function() {
    $.ajax({
        url: '/sell_num',
        async: false,
        success: function (data) {
            num = data["num"]
            name = data["name"]

        }
    })
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('shop_num'));
    // (1)准备数据
    // 2. 指定配置和数据
    var option = {
        title: {
            text: '',
            subtext: ''
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross'
            }
        },
        axisLabel: {
      inside: false,
      color: '#fff'
    },
        toolbox: {
            show: true,
            feature: {
                saveAsImage: {}
            }
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            // prettier-ignore
            data: ['<100', '100-300', '300-500', '500-700', '700-1000', '1000-3000', '3000-6000', '6000-10000', '>10000']
        },
        yAxis: {
            type: 'value',
            axisLabel: {
                formatter: '{value} '
            },
            axisPointer: {
                snap: true
            }
        },
        visualMap: {
            show: false,
            dimension: 0,
            pieces: [
                {
                    gt: 0,
                    lte: 80000,
                    color: 'red'
                }
            ]
        },
        series: [
            {
                name: '销售量',
                type: 'line',
                smooth: true,
                // prettier-ignore
                data: num,
                markArea: {
                    itemStyle: {
                        color: 'rgba(255, 173, 177, 0.4)'
                    },
                    data: [
                        [
                            {
                                name: 'Morning Peak',
                                xAxis: '07:30'
                            },
                            {
                                xAxis: '10:00'
                            }
                        ],
                        [
                            {
                                name: 'Evening Peak',
                                xAxis: '17:30'
                            },
                            {
                                xAxis: '21:15'
                            }
                        ]
                    ]
                }
            }
        ]
    };
    // 3. 把配置和数据给实例对象
    myChart.setOption(option);

    // 重新把配置好的新数据给实例对象
    myChart.setOption(option);

})();











(function () {
    // 基于准备好的dom，初始化echarts实例

    // (1)准备数据
    // 2. 指定配置和数据
    wordCloud=echarts.init(document.getElementById('cloud_plot'));
    var wordCloud_option={
        left: 'center',
        top: 'center',
        tooltip: {
            textStyle: {
                color: '#FFF',
                fontSize:24
            }},
        series : [{
            type : 'wordCloud',
            shape:'smooth',
            drawOutOfBound: true,
            gridSize : 13,
            sizeRange : [ 8, 30 ],
            rotationRange: [0, 0],
            textStyle : {
            normal : {
                color :function (d) {
                    // Random color
                    return 'rgba(0,153,255,'+(d.value/800)+ ')';
                }},
            emphasis : {
                shadowBlur : 10,
                shadowColor : '#333'
            }},

            data : [
                    {
                        "name": "\u767e\u4ebf",
                        "value": "19",
                        "textStyle": {
                            "color": "rgb(131,33,30)"
                        }
                    },
                    {
                        "name": "\u8865\u8d34",
                        "value": "34",
                        "textStyle": {
                            "color": "rgb(124,122,32)"
                        }
                    },
                    {
                        "name": "\u4f4e\u81f3",
                        "value": "12",
                        "textStyle": {
                            "color": "rgb(101,132,11)"
                        }
                    },
                    {
                        "name": "2399",
                        "value": "6",
                        "textStyle": {
                            "color": "rgb(56,29,146)"
                        }
                    },
                    {
                        "name": "realme",
                        "value": "133",
                        "textStyle": {
                            "color": "rgb(92,43,108)"
                        }
                    },
                    {
                        "name": "GT2Pro",
                        "value": "6",
                        "textStyle": {
                            "color": "rgb(15,142,3)"
                        }
                    },
                    {
                        "name": "\u9a81\u9f99",
                        "value": "196",
                        "textStyle": {
                            "color": "rgb(118,151,39)"
                        }
                    },
                    {
                        "name": "\u82af\u7247",
                        "value": "59",
                        "textStyle": {
                            "color": "rgb(110,126,147)"
                        }
                    },
                    {
                        "name": "\u65d7\u8230\u673a",
                        "value": "14",
                        "textStyle": {
                            "color": "rgb(84,73,28)"
                        }
                    },
                    {
                        "name": "\u76f4\u677f",
                        "value": "54",
                        "textStyle": {
                            "color": "rgb(72,71,54)"
                        }
                    },
                    {
                        "name": "\u5c4f\u5e55",
                        "value": "36",
                        "textStyle": {
                            "color": "rgb(144,44,144)"
                        }
                    },
                    {
                        "name": "65W",
                        "value": "13",
                        "textStyle": {
                            "color": "rgb(56,36,104)"
                        }
                    },
                    {
                        "name": "\u5145\u5927",
                        "value": "10",
                        "textStyle": {
                            "color": "rgb(106,133,45)"
                        }
                    },
                    {
                        "name": "\u7535\u6c60",
                        "value": "163",
                        "textStyle": {
                            "color": "rgb(39,81,12)"
                        }
                    },
                    {
                        "name": "\u5168\u65b0",
                        "value": "99",
                        "textStyle": {
                            "color": "rgb(94,31,87)"
                        }
                    },
                    {
                        "name": "\u5b66\u751f",
                        "value": "658",
                        "textStyle": {
                            "color": "rgb(119,37,54)"
                        }
                    },
                    {
                        "name": "\u667a\u80fd",
                        "value": "463",
                        "textStyle": {
                            "color": "rgb(42,31,110)"
                        }
                    },
                    {
                        "name": "\u6e38\u620f",
                        "value": "470",
                        "textStyle": {
                            "color": "rgb(152,143,140)"
                        }
                    },
                    {
                        "name": "\u624b\u673a",
                        "value": "2553",
                        "textStyle": {
                            "color": "rgb(19,110,145)"
                        }
                    },
                    {
                        "name": "gt2pro",
                        "value": "8",
                        "textStyle": {
                            "color": "rgb(62,123,82)"
                        }
                    },
                    {
                        "name": "\u6574\u70b9",
                        "value": "58",
                        "textStyle": {
                            "color": "rgb(31,67,65)"
                        }
                    },
                    {
                        "name": "\u8d2d\u673a",
                        "value": "61",
                        "textStyle": {
                            "color": "rgb(105,95,94)"
                        }
                    },
                    {
                        "name": "\u8d60\u597d",
                        "value": "50",
                        "textStyle": {
                            "color": "rgb(46,69,12)"
                        }
                    },
                    {
                        "name": "10s",
                        "value": "52",
                        "textStyle": {
                            "color": "rgb(10,142,28)"
                        }
                    },
                    {
                        "name": "\u65b0\u54c1",
                        "value": "499",
                        "textStyle": {
                            "color": "rgb(65,2,13)"
                        }
                    },
                    {
                        "name": "5G",
                        "value": "1085",
                        "textStyle": {
                            "color": "rgb(38,38,37)"
                        }
                    },
                    {
                        "name": "5000mAh",
                        "value": "103",
                        "textStyle": {
                            "color": "rgb(121,57,2)"
                        }
                    },
                    {
                        "name": "\u8001\u4eba",
                        "value": "451",
                        "textStyle": {
                            "color": "rgb(78,25,143)"
                        }
                    },
                    {
                        "name": "33W",
                        "value": "50",
                        "textStyle": {
                            "color": "rgb(17,19,119)"
                        }
                    },
                    {
                        "name": "\u667a\u6167",
                        "value": "51",
                        "textStyle": {
                            "color": "rgb(13,77,153)"
                        }
                    },
                    {
                        "name": "\u95ea\u5145",
                        "value": "101",
                        "textStyle": {
                            "color": "rgb(95,54,117)"
                        }
                    },
                    {
                        "name": "realme10s",
                        "value": "44",
                        "textStyle": {
                            "color": "rgb(120,119,145)"
                        }
                    },
                    {
                        "name": "\u53ef\u51cf",
                        "value": "35",
                        "textStyle": {
                            "color": "rgb(110,59,132)"
                        }
                    },
                    {
                        "name": "250",
                        "value": "5",
                        "textStyle": {
                            "color": "rgb(147,131,58)"
                        }
                    },
                    {
                        "name": "\u9001\u788e",
                        "value": "73",
                        "textStyle": {
                            "color": "rgb(24,50,22)"
                        }
                    },
                    {
                        "name": "\u5c4f\u5b9d",
                        "value": "62",
                        "textStyle": {
                            "color": "rgb(36,51,79)"
                        }
                    },
                    {
                        "name": "HUAWEI",
                        "value": "112",
                        "textStyle": {
                            "color": "rgb(27,154,128)"
                        }
                    },
                    {
                        "name": "\u534e\u4e3a",
                        "value": "408",
                        "textStyle": {
                            "color": "rgb(65,35,70)"
                        }
                    },
                    {
                        "name": "\u7545\u4eab",
                        "value": "69",
                        "textStyle": {
                            "color": "rgb(89,144,83)"
                        }
                    },
                    {
                        "name": "50",
                        "value": "63",
                        "textStyle": {
                            "color": "rgb(1,158,30)"
                        }
                    },
                    {
                        "name": "\u65b0\u6b3e",
                        "value": "492",
                        "textStyle": {
                            "color": "rgb(55,63,149)"
                        }
                    },
                    {
                        "name": "\u667a\u80fd\u624b\u673a",
                        "value": "317",
                        "textStyle": {
                            "color": "rgb(90,96,94)"
                        }
                    },
                    {
                        "name": "\u5927\u5c4f",
                        "value": "140",
                        "textStyle": {
                            "color": "rgb(37,70,11)"
                        }
                    },
                    {
                        "name": "\u97f3\u91cf",
                        "value": "19",
                        "textStyle": {
                            "color": "rgb(135,11,72)"
                        }
                    },
                    {
                        "name": "\u5b98\u65b9",
                        "value": "1275",
                        "textStyle": {
                            "color": "rgb(112,64,0)"
                        }
                    },
                    {
                        "name": "\u65d7\u8230\u5e97",
                        "value": "807",
                        "textStyle": {
                            "color": "rgb(126,146,136)"
                        }
                    },
                    {
                        "name": "\u6b63\u54c1",
                        "value": "1081",
                        "textStyle": {
                            "color": "rgb(157,26,45)"
                        }
                    },
                    {
                        "name": "24",
                        "value": "199",
                        "textStyle": {
                            "color": "rgb(81,85,24)"
                        }
                    },
                    {
                        "name": "\u514d\u606f",
                        "value": "349",
                        "textStyle": {
                            "color": "rgb(26,56,106)"
                        }
                    },
                    {
                        "name": "\u7acb\u5373",
                        "value": "68",
                        "textStyle": {
                            "color": "rgb(62,153,17)"
                        }
                    },
                    {
                        "name": "\u62a2\u8d2d",
                        "value": "28",
                        "textStyle": {
                            "color": "rgb(82,69,57)"
                        }
                    },
                    {
                        "name": "\u5c0f\u7c73",
                        "value": "538",
                        "textStyle": {
                            "color": "rgb(77,57,46)"
                        }
                    },
                    {
                        "name": "\u7ea2\u7c73",
                        "value": "299",
                        "textStyle": {
                            "color": "rgb(10,87,27)"
                        }
                    },
                    {
                        "name": "Redmi",
                        "value": "174",
                        "textStyle": {
                            "color": "rgb(94,41,65)"
                        }
                    },
                    {
                        "name": "Note",
                        "value": "78",
                        "textStyle": {
                            "color": "rgb(128,43,10)"
                        }
                    },
                    {
                        "name": "11",
                        "value": "94",
                        "textStyle": {
                            "color": "rgb(131,72,112)"
                        }
                    },
                    {
                        "name": "\u7535\u91cf",
                        "value": "35",
                        "textStyle": {
                            "color": "rgb(79,88,36)"
                        }
                    },
                    {
                        "name": "\u5c0f\u65f6",
                        "value": "17",
                        "textStyle": {
                            "color": "rgb(142,73,74)"
                        }
                    },
                    {
                        "name": "\u73b0\u8d27",
                        "value": "248",
                        "textStyle": {
                            "color": "rgb(136,70,61)"
                        }
                    },
                    {
                        "name": "\u901f\u53d1",
                        "value": "119",
                        "textStyle": {
                            "color": "rgb(152,112,97)"
                        }
                    },
                    {
                        "name": "K60",
                        "value": "25",
                        "textStyle": {
                            "color": "rgb(12,65,15)"
                        }
                    },
                    {
                        "name": "k60",
                        "value": "30",
                        "textStyle": {
                            "color": "rgb(134,111,53)"
                        }
                    },
                    {
                        "name": "\u5b98\u7f51",
                        "value": "534",
                        "textStyle": {
                            "color": "rgb(63,141,41)"
                        }
                    },
                    {
                        "name": "redmik60",
                        "value": "7",
                        "textStyle": {
                            "color": "rgb(107,39,67)"
                        }
                    },
                    {
                        "name": "k50",
                        "value": "40",
                        "textStyle": {
                            "color": "rgb(73,72,40)"
                        }
                    },
                    {
                        "name": "12",
                        "value": "156",
                        "textStyle": {
                            "color": "rgb(2,3,16)"
                        }
                    },
                    {
                        "name": "OPPO",
                        "value": "197",
                        "textStyle": {
                            "color": "rgb(128,158,90)"
                        }
                    },
                    {
                        "name": "Find",
                        "value": "17",
                        "textStyle": {
                            "color": "rgb(29,107,150)"
                        }
                    },
                    {
                        "name": "N2",
                        "value": "11",
                        "textStyle": {
                            "color": "rgb(25,14,39)"
                        }
                    },
                    {
                        "name": "Flip",
                        "value": "8",
                        "textStyle": {
                            "color": "rgb(19,35,57)"
                        }
                    },
                    {
                        "name": "\u6298\u53e0",
                        "value": "75",
                        "textStyle": {
                            "color": "rgb(151,152,152)"
                        }
                    },
                    {
                        "name": "oppo",
                        "value": "150",
                        "textStyle": {
                            "color": "rgb(108,35,138)"
                        }
                    },
                    {
                        "name": "oppofindn2flip",
                        "value": "7",
                        "textStyle": {
                            "color": "rgb(44,27,141)"
                        }
                    },
                    {
                        "name": "\u65d7\u8230",
                        "value": "486",
                        "textStyle": {
                            "color": "rgb(38,95,6)"
                        }
                    },
                    {
                        "name": "oppofindn",
                        "value": "4",
                        "textStyle": {
                            "color": "rgb(16,110,129)"
                        }
                    },
                    {
                        "name": "4G",
                        "value": "295",
                        "textStyle": {
                            "color": "rgb(105,121,67)"
                        }
                    },
                    {
                        "name": "\u7f51\u901a",
                        "value": "703",
                        "textStyle": {
                            "color": "rgb(46,126,136)"
                        }
                    },
                    {
                        "name": "\u7ebd\u66fc",
                        "value": "77",
                        "textStyle": {
                            "color": "rgb(19,151,56)"
                        }
                    },
                    {
                        "name": "M560",
                        "value": "31",
                        "textStyle": {
                            "color": "rgb(19,113,33)"
                        }
                    },
                    {
                        "name": "\u8001\u5e74",
                        "value": "245",
                        "textStyle": {
                            "color": "rgb(20,51,57)"
                        }
                    },
                    {
                        "name": "\u8d85\u957f",
                        "value": "214",
                        "textStyle": {
                            "color": "rgb(48,68,55)"
                        }
                    },
                    {
                        "name": "\u5f85\u673a",
                        "value": "217",
                        "textStyle": {
                            "color": "rgb(45,82,3)"
                        }
                    },
                    {
                        "name": "\u5927\u5c4f\u5e55",
                        "value": "66",
                        "textStyle": {
                            "color": "rgb(46,35,140)"
                        }
                    },
                    {
                        "name": "\u5927\u5b57",
                        "value": "189",
                        "textStyle": {
                            "color": "rgb(70,129,82)"
                        }
                    },
                    {
                        "name": "\u58f0\u97f3",
                        "value": "136",
                        "textStyle": {
                            "color": "rgb(118,10,39)"
                        }
                    },
                    {
                        "name": "\u5973\u58eb",
                        "value": "54",
                        "textStyle": {
                            "color": "rgb(107,134,142)"
                        }
                    },
                    {
                        "name": "\u7535\u4fe1",
                        "value": "172",
                        "textStyle": {
                            "color": "rgb(22,54,131)"
                        }
                    },
                    {
                        "name": "\u4e13\u7528",
                        "value": "123",
                        "textStyle": {
                            "color": "rgb(125,18,150)"
                        }
                    },
                    {
                        "name": "\u6309\u952e",
                        "value": "158",
                        "textStyle": {
                            "color": "rgb(155,32,33)"
                        }
                    },
                    {
                        "name": "HONOR",
                        "value": "111",
                        "textStyle": {
                            "color": "rgb(98,156,19)"
                        }
                    },
                    {
                        "name": "\u8363\u8000",
                        "value": "351",
                        "textStyle": {
                            "color": "rgb(76,78,114)"
                        }
                    },
                    {
                        "name": "X40",
                        "value": "37",
                        "textStyle": {
                            "color": "rgb(89,145,58)"
                        }
                    },
                    {
                        "name": "120Hz",
                        "value": "18",
                        "textStyle": {
                            "color": "rgb(152,155,24)"
                        }
                    },
                    {
                        "name": "OLED",
                        "value": "10",
                        "textStyle": {
                            "color": "rgb(6,80,9)"
                        }
                    },
                    {
                        "name": "\u66f2\u9762",
                        "value": "92",
                        "textStyle": {
                            "color": "rgb(85,132,73)"
                        }
                    },
                    {
                        "name": "5100mAh",
                        "value": "3",
                        "textStyle": {
                            "color": "rgb(77,79,8)"
                        }
                    },
                    {
                        "name": "\u5feb\u5145",
                        "value": "103",
                        "textStyle": {
                            "color": "rgb(106,78,73)"
                        }
                    },
                    {
                        "name": "\u9ad8\u901a",
                        "value": "58",
                        "textStyle": {
                            "color": "rgb(45,97,105)"
                        }
                    },
                    {
                        "name": "6nm",
                        "value": "4",
                        "textStyle": {
                            "color": "rgb(81,37,154)"
                        }
                    },
                    {
                        "name": "\u62cd\u7167",
                        "value": "269",
                        "textStyle": {
                            "color": "rgb(39,140,79)"
                        }
                    },
                    {
                        "name": "X30",
                        "value": "35",
                        "textStyle": {
                            "color": "rgb(3,7,87)"
                        }
                    },
                    {
                        "name": "\u4f18\u60e0",
                        "value": "44",
                        "textStyle": {
                            "color": "rgb(152,49,11)"
                        }
                    },
                    {
                        "name": "100",
                        "value": "21",
                        "textStyle": {
                            "color": "rgb(128,121,51)"
                        }
                    },
                    {
                        "name": "OPPOK9x",
                        "value": "3",
                        "textStyle": {
                            "color": "rgb(92,157,141)"
                        }
                    },
                    {
                        "name": "\u5168\u9762",
                        "value": "99",
                        "textStyle": {
                            "color": "rgb(91,89,124)"
                        }
                    },
                    {
                        "name": "80",
                        "value": "45",
                        "textStyle": {
                            "color": "rgb(89,68,134)"
                        }
                    },
                    {
                        "name": "1.6",
                        "value": "14",
                        "textStyle": {
                            "color": "rgb(29,3,41)"
                        }
                    },
                    {
                        "name": "\u4ebf\u8d85\u6e05",
                        "value": "13",
                        "textStyle": {
                            "color": "rgb(112,133,148)"
                        }
                    },
                    {
                        "name": "\u5f71\u50cf",
                        "value": "53",
                        "textStyle": {
                            "color": "rgb(84,138,105)"
                        }
                    },
                    {
                        "name": "Magic",
                        "value": "10",
                        "textStyle": {
                            "color": "rgb(85,118,34)"
                        }
                    },
                    {
                        "name": "OS",
                        "value": "6",
                        "textStyle": {
                            "color": "rgb(137,121,94)"
                        }
                    },
                    {
                        "name": "7.0",
                        "value": "5",
                        "textStyle": {
                            "color": "rgb(102,81,124)"
                        }
                    },
                    {
                        "name": "\u64cd\u4f5c\u7cfb\u7edf",
                        "value": "5",
                        "textStyle": {
                            "color": "rgb(117,22,47)"
                        }
                    },
                    {
                        "name": "782G",
                        "value": "6",
                        "textStyle": {
                            "color": "rgb(23,60,143)"
                        }
                    },
                    {
                        "name": "70",
                        "value": "39",
                        "textStyle": {
                            "color": "rgb(122,6,122)"
                        }
                    },
                    {
                        "name": "vivo",
                        "value": "319",
                        "textStyle": {
                            "color": "rgb(44,112,105)"
                        }
                    },
                    {
                        "name": "\u539f\u88c5",
                        "value": "108",
                        "textStyle": {
                            "color": "rgb(2,137,134)"
                        }
                    },
                    {
                        "name": "\u8033\u673a",
                        "value": "61",
                        "textStyle": {
                            "color": "rgb(143,93,23)"
                        }
                    },
                    {
                        "name": "S16",
                        "value": "16",
                        "textStyle": {
                            "color": "rgb(32,56,65)"
                        }
                    },
                    {
                        "name": "\u7535\u7ade",
                        "value": "91",
                        "textStyle": {
                            "color": "rgb(20,36,107)"
                        }
                    },
                    {
                        "name": "S15Pro",
                        "value": "4",
                        "textStyle": {
                            "color": "rgb(29,54,8)"
                        }
                    },
                    {
                        "name": "S15",
                        "value": "7",
                        "textStyle": {
                            "color": "rgb(83,35,131)"
                        }
                    },
                    {
                        "name": "nova10SE",
                        "value": "8",
                        "textStyle": {
                            "color": "rgb(1,0,119)"
                        }
                    },
                    {
                        "name": "\u4e00\u4ebf",
                        "value": "15",
                        "textStyle": {
                            "color": "rgb(67,27,152)"
                        }
                    },
                    {
                        "name": "\u50cf\u7d20",
                        "value": "42",
                        "textStyle": {
                            "color": "rgb(36,122,50)"
                        }
                    },
                    {
                        "name": "\u7eed\u822a",
                        "value": "42",
                        "textStyle": {
                            "color": "rgb(11,96,93)"
                        }
                    },
                    {
                        "name": "\u8f7b\u8584",
                        "value": "24",
                        "textStyle": {
                            "color": "rgb(96,12,96)"
                        }
                    },
                    {
                        "name": "\u9e3f\u8499",
                        "value": "109",
                        "textStyle": {
                            "color": "rgb(30,55,1)"
                        }
                    },
                    {
                        "name": "66W",
                        "value": "30",
                        "textStyle": {
                            "color": "rgb(124,6,68)"
                        }
                    },
                    {
                        "name": "\u6444\u5f71",
                        "value": "18",
                        "textStyle": {
                            "color": "rgb(100,103,60)"
                        }
                    },
                    {
                        "name": "\u673a\u5927\u5c4f",
                        "value": "20",
                        "textStyle": {
                            "color": "rgb(54,123,4)"
                        }
                    },
                    {
                        "name": "\u5927\u58f0",
                        "value": "67",
                        "textStyle": {
                            "color": "rgb(120,115,59)"
                        }
                    },
                    {
                        "name": "\u8bed\u97f3",
                        "value": "21",
                        "textStyle": {
                            "color": "rgb(143,127,64)"
                        }
                    },
                    {
                        "name": "1617",
                        "value": "4",
                        "textStyle": {
                            "color": "rgb(141,57,27)"
                        }
                    },
                    {
                        "name": "\u5173\u7231",
                        "value": "8",
                        "textStyle": {
                            "color": "rgb(24,73,133)"
                        }
                    },
                    {
                        "name": "G1",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(91,90,92)"
                        }
                    },
                    {
                        "name": "\u4e09\u9632",
                        "value": "32",
                        "textStyle": {
                            "color": "rgb(32,0,151)"
                        }
                    },
                    {
                        "name": "\u79fb\u52a8",
                        "value": "96",
                        "textStyle": {
                            "color": "rgb(23,91,26)"
                        }
                    },
                    {
                        "name": "\u8054\u901a",
                        "value": "80",
                        "textStyle": {
                            "color": "rgb(20,2,63)"
                        }
                    },
                    {
                        "name": "\u91d1\u7acb",
                        "value": "31",
                        "textStyle": {
                            "color": "rgb(8,131,99)"
                        }
                    },
                    {
                        "name": "N90",
                        "value": "3",
                        "textStyle": {
                            "color": "rgb(66,138,138)"
                        }
                    },
                    {
                        "name": "\u7ffb\u76d6",
                        "value": "55",
                        "textStyle": {
                            "color": "rgb(82,91,126)"
                        }
                    },
                    {
                        "name": "\u4e00\u952e",
                        "value": "8",
                        "textStyle": {
                            "color": "rgb(104,70,120)"
                        }
                    },
                    {
                        "name": "\u62e8\u53f7",
                        "value": "7",
                        "textStyle": {
                            "color": "rgb(112,104,22)"
                        }
                    },
                    {
                        "name": "\u7537\u5973",
                        "value": "45",
                        "textStyle": {
                            "color": "rgb(87,87,45)"
                        }
                    },
                    {
                        "name": "\u5546\u52a1",
                        "value": "39",
                        "textStyle": {
                            "color": "rgb(61,6,100)"
                        }
                    },
                    {
                        "name": "50z",
                        "value": "4",
                        "textStyle": {
                            "color": "rgb(126,81,75)"
                        }
                    },
                    {
                        "name": "5000",
                        "value": "19",
                        "textStyle": {
                            "color": "rgb(27,143,48)"
                        }
                    },
                    {
                        "name": "\u9ad8\u6e05",
                        "value": "14",
                        "textStyle": {
                            "color": "rgb(67,35,69)"
                        }
                    },
                    {
                        "name": "\u4e09\u6444",
                        "value": "6",
                        "textStyle": {
                            "color": "rgb(59,31,70)"
                        }
                    },
                    {
                        "name": "\u8d85\u80fd",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(131,36,89)"
                        }
                    },
                    {
                        "name": "\u5185\u5b58",
                        "value": "65",
                        "textStyle": {
                            "color": "rgb(60,89,90)"
                        }
                    },
                    {
                        "name": "\u76f4\u9762",
                        "value": "11",
                        "textStyle": {
                            "color": "rgb(4,120,152)"
                        }
                    },
                    {
                        "name": "\u7545\u60f3",
                        "value": "15",
                        "textStyle": {
                            "color": "rgb(126,57,30)"
                        }
                    },
                    {
                        "name": "\u4e00\u52a0",
                        "value": "108",
                        "textStyle": {
                            "color": "rgb(149,14,134)"
                        }
                    },
                    {
                        "name": "OnePlus",
                        "value": "21",
                        "textStyle": {
                            "color": "rgb(25,5,105)"
                        }
                    },
                    {
                        "name": "\u54c8\u82cf",
                        "value": "3",
                        "textStyle": {
                            "color": "rgb(54,2,110)"
                        }
                    },
                    {
                        "name": "8Gen2",
                        "value": "9",
                        "textStyle": {
                            "color": "rgb(10,1,88)"
                        }
                    },
                    {
                        "name": "\u552e\u540e",
                        "value": "21",
                        "textStyle": {
                            "color": "rgb(110,146,113)"
                        }
                    },
                    {
                        "name": "\u5168\u7f51",
                        "value": "20",
                        "textStyle": {
                            "color": "rgb(98,9,71)"
                        }
                    },
                    {
                        "name": "\u901a\u5173",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(28,138,3)"
                        }
                    },
                    {
                        "name": "\u7231\u5fc3",
                        "value": "4",
                        "textStyle": {
                            "color": "rgb(27,96,58)"
                        }
                    },
                    {
                        "name": "1838",
                        "value": "4",
                        "textStyle": {
                            "color": "rgb(119,13,133)"
                        }
                    },
                    {
                        "name": "\u81ea\u8425",
                        "value": "43",
                        "textStyle": {
                            "color": "rgb(159,65,146)"
                        }
                    },
                    {
                        "name": "Apple",
                        "value": "251",
                        "textStyle": {
                            "color": "rgb(104,124,30)"
                        }
                    },
                    {
                        "name": "\u82f9\u679c",
                        "value": "582",
                        "textStyle": {
                            "color": "rgb(47,59,40)"
                        }
                    },
                    {
                        "name": "iPhone",
                        "value": "333",
                        "textStyle": {
                            "color": "rgb(79,89,45)"
                        }
                    },
                    {
                        "name": "13",
                        "value": "129",
                        "textStyle": {
                            "color": "rgb(85,89,43)"
                        }
                    },
                    {
                        "name": "\u652f\u6301",
                        "value": "22",
                        "textStyle": {
                            "color": "rgb(121,1,36)"
                        }
                    },
                    {
                        "name": "\u53cc\u5361",
                        "value": "149",
                        "textStyle": {
                            "color": "rgb(88,10,80)"
                        }
                    },
                    {
                        "name": "\u53cc\u5f85",
                        "value": "62",
                        "textStyle": {
                            "color": "rgb(53,40,98)"
                        }
                    },
                    {
                        "name": "\u9ad8\u7701",
                        "value": "22",
                        "textStyle": {
                            "color": "rgb(81,27,9)"
                        }
                    },
                    {
                        "name": "\u9650\u65f6",
                        "value": "20",
                        "textStyle": {
                            "color": "rgb(132,22,77)"
                        }
                    },
                    {
                        "name": "iQOO",
                        "value": "115",
                        "textStyle": {
                            "color": "rgb(153,57,110)"
                        }
                    },
                    {
                        "name": "Z6x",
                        "value": "15",
                        "textStyle": {
                            "color": "rgb(126,23,156)"
                        }
                    },
                    {
                        "name": "5g",
                        "value": "147",
                        "textStyle": {
                            "color": "rgb(85,128,129)"
                        }
                    },
                    {
                        "name": "\u5343\u5143",
                        "value": "106",
                        "textStyle": {
                            "color": "rgb(53,150,25)"
                        }
                    },
                    {
                        "name": "vivoiQOOZ6x",
                        "value": "3",
                        "textStyle": {
                            "color": "rgb(1,147,61)"
                        }
                    },
                    {
                        "name": "\u6d1b\u6590",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(138,2,46)"
                        }
                    },
                    {
                        "name": "\u952e\u76d8",
                        "value": "5",
                        "textStyle": {
                            "color": "rgb(95,66,4)"
                        }
                    },
                    {
                        "name": "Neo7",
                        "value": "31",
                        "textStyle": {
                            "color": "rgb(31,17,59)"
                        }
                    },
                    {
                        "name": "SE",
                        "value": "53",
                        "textStyle": {
                            "color": "rgb(48,139,102)"
                        }
                    },
                    {
                        "name": "\u5929\u7391",
                        "value": "65",
                        "textStyle": {
                            "color": "rgb(89,38,52)"
                        }
                    },
                    {
                        "name": "8200",
                        "value": "4",
                        "textStyle": {
                            "color": "rgb(157,17,63)"
                        }
                    },
                    {
                        "name": "\u7231\u9177",
                        "value": "49",
                        "textStyle": {
                            "color": "rgb(118,79,154)"
                        }
                    },
                    {
                        "name": "neo6neo5",
                        "value": "4",
                        "textStyle": {
                            "color": "rgb(105,29,68)"
                        }
                    },
                    {
                        "name": "neo7",
                        "value": "13",
                        "textStyle": {
                            "color": "rgb(14,35,67)"
                        }
                    },
                    {
                        "name": "\u8bfa\u57fa\u4e9a",
                        "value": "24",
                        "textStyle": {
                            "color": "rgb(44,8,135)"
                        }
                    },
                    {
                        "name": "105",
                        "value": "8",
                        "textStyle": {
                            "color": "rgb(31,76,116)"
                        }
                    },
                    {
                        "name": "\u8ff7\u4f60",
                        "value": "44",
                        "textStyle": {
                            "color": "rgb(7,14,5)"
                        }
                    },
                    {
                        "name": "\u5c0f\u5b66\u751f",
                        "value": "20",
                        "textStyle": {
                            "color": "rgb(0,35,44)"
                        }
                    },
                    {
                        "name": "\u513f\u7ae5",
                        "value": "45",
                        "textStyle": {
                            "color": "rgb(104,17,145)"
                        }
                    },
                    {
                        "name": "\u7ecf\u5178",
                        "value": "17",
                        "textStyle": {
                            "color": "rgb(136,47,87)"
                        }
                    },
                    {
                        "name": "\u5907\u7528",
                        "value": "108",
                        "textStyle": {
                            "color": "rgb(60,9,139)"
                        }
                    },
                    {
                        "name": "V5",
                        "value": "3",
                        "textStyle": {
                            "color": "rgb(32,130,138)"
                        }
                    },
                    {
                        "name": "\u5355\u8d60",
                        "value": "9",
                        "textStyle": {
                            "color": "rgb(73,31,127)"
                        }
                    },
                    {
                        "name": "\u84dd\u7259",
                        "value": "13",
                        "textStyle": {
                            "color": "rgb(42,102,49)"
                        }
                    },
                    {
                        "name": "X90",
                        "value": "28",
                        "textStyle": {
                            "color": "rgb(97,78,111)"
                        }
                    },
                    {
                        "name": "X90Pro",
                        "value": "10",
                        "textStyle": {
                            "color": "rgb(67,112,37)"
                        }
                    },
                    {
                        "name": "L66",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(102,130,142)"
                        }
                    },
                    {
                        "name": "\u529f\u80fd",
                        "value": "39",
                        "textStyle": {
                            "color": "rgb(158,134,125)"
                        }
                    },
                    {
                        "name": "\u6b63\u5e38",
                        "value": "9",
                        "textStyle": {
                            "color": "rgb(121,10,87)"
                        }
                    },
                    {
                        "name": "\u53d1\u8d27",
                        "value": "46",
                        "textStyle": {
                            "color": "rgb(85,36,79)"
                        }
                    },
                    {
                        "name": "14",
                        "value": "222",
                        "textStyle": {
                            "color": "rgb(89,29,136)"
                        }
                    },
                    {
                        "name": "142022",
                        "value": "3",
                        "textStyle": {
                            "color": "rgb(50,118,43)"
                        }
                    },
                    {
                        "name": "\u79cb\u5b63",
                        "value": "3",
                        "textStyle": {
                            "color": "rgb(155,10,93)"
                        }
                    },
                    {
                        "name": "\u6388\u6743",
                        "value": "13",
                        "textStyle": {
                            "color": "rgb(37,112,63)"
                        }
                    },
                    {
                        "name": "qopo",
                        "value": "5",
                        "textStyle": {
                            "color": "rgb(14,136,95)"
                        }
                    },
                    {
                        "name": "\u539f\u5c01",
                        "value": "31",
                        "textStyle": {
                            "color": "rgb(110,117,71)"
                        }
                    },
                    {
                        "name": "\u767e\u5143",
                        "value": "31",
                        "textStyle": {
                            "color": "rgb(118,11,21)"
                        }
                    },
                    {
                        "name": "\u8d85\u8584",
                        "value": "33",
                        "textStyle": {
                            "color": "rgb(131,8,43)"
                        }
                    },
                    {
                        "name": "\u7ade\u5168",
                        "value": "6",
                        "textStyle": {
                            "color": "rgb(37,145,81)"
                        }
                    },
                    {
                        "name": "L8S",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(91,7,111)"
                        }
                    },
                    {
                        "name": "\u7248\u5973",
                        "value": "6",
                        "textStyle": {
                            "color": "rgb(76,62,71)"
                        }
                    },
                    {
                        "name": "W69",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(131,66,78)"
                        }
                    },
                    {
                        "name": "\u53cc\u5c4f",
                        "value": "17",
                        "textStyle": {
                            "color": "rgb(47,113,42)"
                        }
                    },
                    {
                        "name": "F9",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(12,73,18)"
                        }
                    },
                    {
                        "name": "2022",
                        "value": "30",
                        "textStyle": {
                            "color": "rgb(126,29,124)"
                        }
                    },
                    {
                        "name": "\u8001\u5e74\u4eba",
                        "value": "45",
                        "textStyle": {
                            "color": "rgb(122,133,86)"
                        }
                    },
                    {
                        "name": "\u54c1\u724c",
                        "value": "7",
                        "textStyle": {
                            "color": "rgb(83,123,125)"
                        }
                    },
                    {
                        "name": "\u7535\u8bdd\u673a",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(39,57,107)"
                        }
                    },
                    {
                        "name": "500",
                        "value": "9",
                        "textStyle": {
                            "color": "rgb(36,89,51)"
                        }
                    },
                    {
                        "name": "Ace",
                        "value": "28",
                        "textStyle": {
                            "color": "rgb(47,135,35)"
                        }
                    },
                    {
                        "name": "Pro",
                        "value": "424",
                        "textStyle": {
                            "color": "rgb(3,20,156)"
                        }
                    },
                    {
                        "name": "\u6307\u5b9a",
                        "value": "6",
                        "textStyle": {
                            "color": "rgb(95,13,101)"
                        }
                    },
                    {
                        "name": "GTNeo3",
                        "value": "5",
                        "textStyle": {
                            "color": "rgb(19,138,117)"
                        }
                    },
                    {
                        "name": "8100",
                        "value": "16",
                        "textStyle": {
                            "color": "rgb(97,124,58)"
                        }
                    },
                    {
                        "name": "150W",
                        "value": "5",
                        "textStyle": {
                            "color": "rgb(105,155,93)"
                        }
                    },
                    {
                        "name": "\u5149\u901f",
                        "value": "4",
                        "textStyle": {
                            "color": "rgb(120,5,66)"
                        }
                    },
                    {
                        "name": "\u7545\u901f\u5c4f",
                        "value": "4",
                        "textStyle": {
                            "color": "rgb(33,53,144)"
                        }
                    },
                    {
                        "name": "\u963f\u91cc",
                        "value": "28",
                        "textStyle": {
                            "color": "rgb(2,145,36)"
                        }
                    },
                    {
                        "name": "A880",
                        "value": "4",
                        "textStyle": {
                            "color": "rgb(151,48,22)"
                        }
                    },
                    {
                        "name": "\u5ea7\u5145",
                        "value": "6",
                        "textStyle": {
                            "color": "rgb(18,32,88)"
                        }
                    },
                    {
                        "name": "M6",
                        "value": "4",
                        "textStyle": {
                            "color": "rgb(0,107,112)"
                        }
                    },
                    {
                        "name": "\u5927\u5bb9\u91cf",
                        "value": "6",
                        "textStyle": {
                            "color": "rgb(38,9,141)"
                        }
                    },
                    {
                        "name": "\u987a\u4e30\u901f\u53d1",
                        "value": "46",
                        "textStyle": {
                            "color": "rgb(74,95,37)"
                        }
                    },
                    {
                        "name": "Max",
                        "value": "134",
                        "textStyle": {
                            "color": "rgb(34,128,125)"
                        }
                    },
                    {
                        "name": "\u56fd\u884c",
                        "value": "225",
                        "textStyle": {
                            "color": "rgb(53,132,83)"
                        }
                    },
                    {
                        "name": "\u76f4\u964d",
                        "value": "66",
                        "textStyle": {
                            "color": "rgb(159,84,86)"
                        }
                    },
                    {
                        "name": "13Pro",
                        "value": "21",
                        "textStyle": {
                            "color": "rgb(109,62,138)"
                        }
                    },
                    {
                        "name": "plus",
                        "value": "21",
                        "textStyle": {
                            "color": "rgb(141,82,115)"
                        }
                    },
                    {
                        "name": "Reno9",
                        "value": "27",
                        "textStyle": {
                            "color": "rgb(0,9,158)"
                        }
                    },
                    {
                        "name": "opporeno9",
                        "value": "14",
                        "textStyle": {
                            "color": "rgb(17,158,106)"
                        }
                    },
                    {
                        "name": "\u4e0a\u5e02",
                        "value": "93",
                        "textStyle": {
                            "color": "rgb(5,78,107)"
                        }
                    },
                    {
                        "name": "reno8",
                        "value": "6",
                        "textStyle": {
                            "color": "rgb(71,115,155)"
                        }
                    },
                    {
                        "name": "\u65b0\u5e74",
                        "value": "5",
                        "textStyle": {
                            "color": "rgb(51,62,49)"
                        }
                    },
                    {
                        "name": "7pro",
                        "value": "7",
                        "textStyle": {
                            "color": "rgb(141,152,87)"
                        }
                    },
                    {
                        "name": "0ppo5g",
                        "value": "10",
                        "textStyle": {
                            "color": "rgb(91,68,97)"
                        }
                    },
                    {
                        "name": "\u9650\u91cf\u7248",
                        "value": "22",
                        "textStyle": {
                            "color": "rgb(118,40,135)"
                        }
                    },
                    {
                        "name": "\u5f53\u5929",
                        "value": "141",
                        "textStyle": {
                            "color": "rgb(79,103,136)"
                        }
                    },
                    {
                        "name": "Note11Pro",
                        "value": "4",
                        "textStyle": {
                            "color": "rgb(63,116,69)"
                        }
                    },
                    {
                        "name": "256GB",
                        "value": "24",
                        "textStyle": {
                            "color": "rgb(17,146,88)"
                        }
                    },
                    {
                        "name": "920",
                        "value": "3",
                        "textStyle": {
                            "color": "rgb(116,105,140)"
                        }
                    },
                    {
                        "name": "\u7f51\u5e97",
                        "value": "10",
                        "textStyle": {
                            "color": "rgb(96,79,65)"
                        }
                    },
                    {
                        "name": "K50",
                        "value": "38",
                        "textStyle": {
                            "color": "rgb(57,150,59)"
                        }
                    },
                    {
                        "name": "\u5907\u7528\u673a",
                        "value": "53",
                        "textStyle": {
                            "color": "rgb(51,11,74)"
                        }
                    },
                    {
                        "name": "\u4fbf\u5b9c",
                        "value": "25",
                        "textStyle": {
                            "color": "rgb(10,61,19)"
                        }
                    },
                    {
                        "name": "\u4ef7\u5168",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(47,47,19)"
                        }
                    },
                    {
                        "name": "\u767e\u4e8b",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(92,158,6)"
                        }
                    },
                    {
                        "name": "Huawei",
                        "value": "130",
                        "textStyle": {
                            "color": "rgb(29,8,143)"
                        }
                    },
                    {
                        "name": "\u7545\u73a9",
                        "value": "44",
                        "textStyle": {
                            "color": "rgb(5,136,116)"
                        }
                    },
                    {
                        "name": "20",
                        "value": "45",
                        "textStyle": {
                            "color": "rgb(56,133,78)"
                        }
                    },
                    {
                        "name": "\u5b98\u65d7",
                        "value": "25",
                        "textStyle": {
                            "color": "rgb(50,19,142)"
                        }
                    },
                    {
                        "name": "\u6212\u7f51",
                        "value": "17",
                        "textStyle": {
                            "color": "rgb(129,61,92)"
                        }
                    },
                    {
                        "name": "\u540c\u6b3e",
                        "value": "18",
                        "textStyle": {
                            "color": "rgb(23,44,143)"
                        }
                    },
                    {
                        "name": "\u7cfb\u5217",
                        "value": "97",
                        "textStyle": {
                            "color": "rgb(33,80,28)"
                        }
                    },
                    {
                        "name": "note11",
                        "value": "14",
                        "textStyle": {
                            "color": "rgb(114,107,90)"
                        }
                    },
                    {
                        "name": "redmi",
                        "value": "14",
                        "textStyle": {
                            "color": "rgb(85,153,70)"
                        }
                    },
                    {
                        "name": "S9",
                        "value": "8",
                        "textStyle": {
                            "color": "rgb(122,57,24)"
                        }
                    },
                    {
                        "name": "\u521d\u9ad8\u4e2d",
                        "value": "5",
                        "textStyle": {
                            "color": "rgb(57,15,123)"
                        }
                    },
                    {
                        "name": "\u6212\u7f51\u763e",
                        "value": "28",
                        "textStyle": {
                            "color": "rgb(31,29,37)"
                        }
                    },
                    {
                        "name": "\u5168\u56fd",
                        "value": "21",
                        "textStyle": {
                            "color": "rgb(125,72,12)"
                        }
                    },
                    {
                        "name": "\u8054\u4fdd",
                        "value": "23",
                        "textStyle": {
                            "color": "rgb(41,78,48)"
                        }
                    },
                    {
                        "name": "NEKEN",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(77,148,144)"
                        }
                    },
                    {
                        "name": "V9",
                        "value": "3",
                        "textStyle": {
                            "color": "rgb(152,118,37)"
                        }
                    },
                    {
                        "name": "\u8d85\u5c0f\u5168",
                        "value": "3",
                        "textStyle": {
                            "color": "rgb(146,77,2)"
                        }
                    },
                    {
                        "name": "\u521d\u4e2d\u751f",
                        "value": "9",
                        "textStyle": {
                            "color": "rgb(85,68,37)"
                        }
                    },
                    {
                        "name": "\u9ad8\u4e2d\u751f",
                        "value": "20",
                        "textStyle": {
                            "color": "rgb(99,87,2)"
                        }
                    },
                    {
                        "name": "\u673a\u53ea",
                        "value": "4",
                        "textStyle": {
                            "color": "rgb(100,82,34)"
                        }
                    },
                    {
                        "name": "\u53ef\u4ee5",
                        "value": "12",
                        "textStyle": {
                            "color": "rgb(58,155,11)"
                        }
                    },
                    {
                        "name": "\u6253\u7535\u8bdd",
                        "value": "13",
                        "textStyle": {
                            "color": "rgb(11,88,93)"
                        }
                    },
                    {
                        "name": "\u5361\u7247",
                        "value": "10",
                        "textStyle": {
                            "color": "rgb(156,30,156)"
                        }
                    },
                    {
                        "name": "\u4e8f\u672c",
                        "value": "8",
                        "textStyle": {
                            "color": "rgb(145,117,33)"
                        }
                    },
                    {
                        "name": "\u51b2\u91cf",
                        "value": "8",
                        "textStyle": {
                            "color": "rgb(127,88,145)"
                        }
                    },
                    {
                        "name": "\u901a\u76f4",
                        "value": "3",
                        "textStyle": {
                            "color": "rgb(133,112,61)"
                        }
                    },
                    {
                        "name": "\u4fa7\u952e",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(158,93,43)"
                        }
                    },
                    {
                        "name": "\u624b\u7535\u7b52",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(148,156,120)"
                        }
                    },
                    {
                        "name": "\u64ad\u62a5",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(138,62,103)"
                        }
                    },
                    {
                        "name": "\u7ade\u901f",
                        "value": "33",
                        "textStyle": {
                            "color": "rgb(103,118,102)"
                        }
                    },
                    {
                        "name": "\u7248\u65b0",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(22,141,22)"
                        }
                    },
                    {
                        "name": "iqooneo7",
                        "value": "15",
                        "textStyle": {
                            "color": "rgb(56,41,81)"
                        }
                    },
                    {
                        "name": "iqneo7se",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(135,10,55)"
                        }
                    },
                    {
                        "name": "iq00neo6",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(69,142,101)"
                        }
                    },
                    {
                        "name": "iPhone12",
                        "value": "5",
                        "textStyle": {
                            "color": "rgb(125,35,4)"
                        }
                    },
                    {
                        "name": "12pro",
                        "value": "16",
                        "textStyle": {
                            "color": "rgb(136,7,95)"
                        }
                    },
                    {
                        "name": "max",
                        "value": "30",
                        "textStyle": {
                            "color": "rgb(99,137,40)"
                        }
                    },
                    {
                        "name": "13pro",
                        "value": "24",
                        "textStyle": {
                            "color": "rgb(77,84,60)"
                        }
                    },
                    {
                        "name": "XS",
                        "value": "13",
                        "textStyle": {
                            "color": "rgb(14,15,32)"
                        }
                    },
                    {
                        "name": "xs",
                        "value": "7",
                        "textStyle": {
                            "color": "rgb(120,19,46)"
                        }
                    },
                    {
                        "name": "xsmax",
                        "value": "9",
                        "textStyle": {
                            "color": "rgb(104,16,123)"
                        }
                    },
                    {
                        "name": "iphonex",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(29,86,72)"
                        }
                    },
                    {
                        "name": "xiaomi",
                        "value": "22",
                        "textStyle": {
                            "color": "rgb(101,81,21)"
                        }
                    },
                    {
                        "name": "9A",
                        "value": "25",
                        "textStyle": {
                            "color": "rgb(59,120,125)"
                        }
                    },
                    {
                        "name": "10A",
                        "value": "12",
                        "textStyle": {
                            "color": "rgb(111,7,96)"
                        }
                    },
                    {
                        "name": "Xiaomi",
                        "value": "75",
                        "textStyle": {
                            "color": "rgb(54,71,12)"
                        }
                    },
                    {
                        "name": "11T",
                        "value": "18",
                        "textStyle": {
                            "color": "rgb(116,27,16)"
                        }
                    },
                    {
                        "name": "\u5957\u9910",
                        "value": "5",
                        "textStyle": {
                            "color": "rgb(65,53,60)"
                        }
                    },
                    {
                        "name": "Gen2",
                        "value": "10",
                        "textStyle": {
                            "color": "rgb(18,122,110)"
                        }
                    },
                    {
                        "name": "\u8d85\u7a84",
                        "value": "4",
                        "textStyle": {
                            "color": "rgb(88,98,83)"
                        }
                    },
                    {
                        "name": "\u8fb9\u5c4f",
                        "value": "4",
                        "textStyle": {
                            "color": "rgb(68,1,1)"
                        }
                    },
                    {
                        "name": "\u5237\u5c4f",
                        "value": "5",
                        "textStyle": {
                            "color": "rgb(86,37,112)"
                        }
                    },
                    {
                        "name": "200",
                        "value": "13",
                        "textStyle": {
                            "color": "rgb(87,6,17)"
                        }
                    },
                    {
                        "name": "\u6570\u7801",
                        "value": "18",
                        "textStyle": {
                            "color": "rgb(124,81,60)"
                        }
                    },
                    {
                        "name": "reno8reno7",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(25,156,89)"
                        }
                    },
                    {
                        "name": "OPPOK10x",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(12,27,110)"
                        }
                    },
                    {
                        "name": "k10xApple",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(138,50,83)"
                        }
                    },
                    {
                        "name": "Mate",
                        "value": "60",
                        "textStyle": {
                            "color": "rgb(102,100,130)"
                        }
                    },
                    {
                        "name": "\u76f4\u5c4f",
                        "value": "14",
                        "textStyle": {
                            "color": "rgb(102,59,58)"
                        }
                    },
                    {
                        "name": "\u5149\u53d8",
                        "value": "10",
                        "textStyle": {
                            "color": "rgb(47,68,57)"
                        }
                    },
                    {
                        "name": "XMAGE",
                        "value": "10",
                        "textStyle": {
                            "color": "rgb(19,32,142)"
                        }
                    },
                    {
                        "name": "3.0",
                        "value": "9",
                        "textStyle": {
                            "color": "rgb(69,158,27)"
                        }
                    },
                    {
                        "name": "GT",
                        "value": "59",
                        "textStyle": {
                            "color": "rgb(104,61,108)"
                        }
                    },
                    {
                        "name": "888",
                        "value": "22",
                        "textStyle": {
                            "color": "rgb(68,152,9)"
                        }
                    },
                    {
                        "name": "144Hz",
                        "value": "6",
                        "textStyle": {
                            "color": "rgb(56,113,62)"
                        }
                    },
                    {
                        "name": "\u9ad8\u5237\u7535",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(126,61,75)"
                        }
                    },
                    {
                        "name": "\u7ade\u5c4f",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(60,48,138)"
                        }
                    },
                    {
                        "name": "\u8d85\u7ea7",
                        "value": "26",
                        "textStyle": {
                            "color": "rgb(101,72,151)"
                        }
                    },
                    {
                        "name": "X30HUAWEI",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(70,153,149)"
                        }
                    },
                    {
                        "name": "nova",
                        "value": "60",
                        "textStyle": {
                            "color": "rgb(67,122,158)"
                        }
                    },
                    {
                        "name": "10",
                        "value": "64",
                        "textStyle": {
                            "color": "rgb(63,87,4)"
                        }
                    },
                    {
                        "name": "\u524d\u7f6e",
                        "value": "6",
                        "textStyle": {
                            "color": "rgb(18,143,135)"
                        }
                    },
                    {
                        "name": "6000",
                        "value": "6",
                        "textStyle": {
                            "color": "rgb(124,5,46)"
                        }
                    },
                    {
                        "name": "\u955c\u5934",
                        "value": "5",
                        "textStyle": {
                            "color": "rgb(11,95,30)"
                        }
                    },
                    {
                        "name": "\u884c\u4e1a",
                        "value": "3",
                        "textStyle": {
                            "color": "rgb(11,16,157)"
                        }
                    },
                    {
                        "name": "\u9996\u53d1",
                        "value": "6",
                        "textStyle": {
                            "color": "rgb(24,126,139)"
                        }
                    },
                    {
                        "name": "IMX800",
                        "value": "3",
                        "textStyle": {
                            "color": "rgb(92,154,19)"
                        }
                    },
                    {
                        "name": "\u4e09\u4e3b\u6444",
                        "value": "6",
                        "textStyle": {
                            "color": "rgb(28,147,146)"
                        }
                    },
                    {
                        "name": "Vlog",
                        "value": "8",
                        "textStyle": {
                            "color": "rgb(42,9,114)"
                        }
                    },
                    {
                        "name": "\u4e3b\u89d2",
                        "value": "4",
                        "textStyle": {
                            "color": "rgb(156,50,42)"
                        }
                    },
                    {
                        "name": "\u6a21\u5f0f",
                        "value": "4",
                        "textStyle": {
                            "color": "rgb(141,112,56)"
                        }
                    },
                    {
                        "name": "\u62cd\u6444",
                        "value": "4",
                        "textStyle": {
                            "color": "rgb(99,83,127)"
                        }
                    },
                    {
                        "name": "\u524d\u540e",
                        "value": "5",
                        "textStyle": {
                            "color": "rgb(49,67,14)"
                        }
                    },
                    {
                        "name": "\u53cc\u66f2",
                        "value": "4",
                        "textStyle": {
                            "color": "rgb(90,144,53)"
                        }
                    },
                    {
                        "name": "88VIP4G",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(59,156,26)"
                        }
                    },
                    {
                        "name": "\u9632\u8001",
                        "value": "8",
                        "textStyle": {
                            "color": "rgb(35,32,22)"
                        }
                    },
                    {
                        "name": "\u5e74\u673a",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(13,33,53)"
                        }
                    },
                    {
                        "name": "\u738b\u5927\u5c4f",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(11,135,151)"
                        }
                    },
                    {
                        "name": "neo6",
                        "value": "5",
                        "textStyle": {
                            "color": "rgb(109,20,116)"
                        }
                    },
                    {
                        "name": "neo5",
                        "value": "4",
                        "textStyle": {
                            "color": "rgb(99,87,107)"
                        }
                    },
                    {
                        "name": "neo7Apple",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(46,136,122)"
                        }
                    },
                    {
                        "name": "\u80cc\u5305",
                        "value": "6",
                        "textStyle": {
                            "color": "rgb(26,119,144)"
                        }
                    },
                    {
                        "name": "Z6",
                        "value": "16",
                        "textStyle": {
                            "color": "rgb(10,9,25)"
                        }
                    },
                    {
                        "name": "\u9a81\u9f99\u957f",
                        "value": "3",
                        "textStyle": {
                            "color": "rgb(11,123,7)"
                        }
                    },
                    {
                        "name": "\u9001\u793c",
                        "value": "9",
                        "textStyle": {
                            "color": "rgb(127,72,101)"
                        }
                    },
                    {
                        "name": "vivoiQOOZ6",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(48,151,140)"
                        }
                    },
                    {
                        "name": "\u63d0\u624b",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(160,58,105)"
                        }
                    },
                    {
                        "name": "\u5f39\u8df3",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(74,96,51)"
                        }
                    },
                    {
                        "name": "\u4fdd\u6e29\u676f",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(119,159,12)"
                        }
                    },
                    {
                        "name": "S16e",
                        "value": "4",
                        "textStyle": {
                            "color": "rgb(46,73,137)"
                        }
                    },
                    {
                        "name": "S15e",
                        "value": "3",
                        "textStyle": {
                            "color": "rgb(5,66,74)"
                        }
                    },
                    {
                        "name": "\u5957\u88c5",
                        "value": "9",
                        "textStyle": {
                            "color": "rgb(145,24,146)"
                        }
                    },
                    {
                        "name": "Y77",
                        "value": "10",
                        "textStyle": {
                            "color": "rgb(132,18,59)"
                        }
                    },
                    {
                        "name": "vivoy76s",
                        "value": "3",
                        "textStyle": {
                            "color": "rgb(122,128,55)"
                        }
                    },
                    {
                        "name": "X6",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(84,13,59)"
                        }
                    },
                    {
                        "name": "\u4e2d\u5b66\u751f",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(108,37,59)"
                        }
                    },
                    {
                        "name": "530",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(131,78,145)"
                        }
                    },
                    {
                        "name": "L17",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(92,39,142)"
                        }
                    },
                    {
                        "name": "400",
                        "value": "6",
                        "textStyle": {
                            "color": "rgb(22,148,141)"
                        }
                    },
                    {
                        "name": "T10",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(152,118,147)"
                        }
                    },
                    {
                        "name": "\u674e\u4f73\u7426",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(68,116,104)"
                        }
                    },
                    {
                        "name": "\u76f4\u64ad\u95f4",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(128,133,102)"
                        }
                    },
                    {
                        "name": "\u65b0\u673a",
                        "value": "66",
                        "textStyle": {
                            "color": "rgb(0,21,137)"
                        }
                    },
                    {
                        "name": "2160Hz",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(34,113,97)"
                        }
                    },
                    {
                        "name": "1080",
                        "value": "4",
                        "textStyle": {
                            "color": "rgb(40,35,71)"
                        }
                    },
                    {
                        "name": "67W",
                        "value": "6",
                        "textStyle": {
                            "color": "rgb(38,104,18)"
                        }
                    },
                    {
                        "name": "10pro",
                        "value": "15",
                        "textStyle": {
                            "color": "rgb(30,51,88)"
                        }
                    },
                    {
                        "name": "\u5929\u732b",
                        "value": "3",
                        "textStyle": {
                            "color": "rgb(110,24,142)"
                        }
                    },
                    {
                        "name": "\u95ea\u8d2d",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(127,56,158)"
                        }
                    },
                    {
                        "name": "\u4e13\u4eab",
                        "value": "14",
                        "textStyle": {
                            "color": "rgb(68,160,144)"
                        }
                    },
                    {
                        "name": "215",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(151,43,91)"
                        }
                    },
                    {
                        "name": "\u80d6\u7238",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(132,8,61)"
                        }
                    },
                    {
                        "name": "\u539f\u7f8e",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(135,148,81)"
                        }
                    },
                    {
                        "name": "\u6e2f\u56fd\u884c",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(83,68,6)"
                        }
                    },
                    {
                        "name": "\u5206\u671f",
                        "value": "111",
                        "textStyle": {
                            "color": "rgb(66,81,160)"
                        }
                    },
                    {
                        "name": "note",
                        "value": "3",
                        "textStyle": {
                            "color": "rgb(134,68,13)"
                        }
                    },
                    {
                        "name": "note12pro",
                        "value": "12",
                        "textStyle": {
                            "color": "rgb(86,108,15)"
                        }
                    },
                    {
                        "name": "\u53d1\u9001",
                        "value": "15",
                        "textStyle": {
                            "color": "rgb(5,67,49)"
                        }
                    },
                    {
                        "name": "\u81f3\u5c0a\u7248",
                        "value": "28",
                        "textStyle": {
                            "color": "rgb(18,87,144)"
                        }
                    },
                    {
                        "name": "\u54c1\u7ea2",
                        "value": "19",
                        "textStyle": {
                            "color": "rgb(121,21,41)"
                        }
                    },
                    {
                        "name": "op",
                        "value": "4",
                        "textStyle": {
                            "color": "rgb(147,43,94)"
                        }
                    },
                    {
                        "name": "oa9",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(53,75,82)"
                        }
                    },
                    {
                        "name": "reno9pro",
                        "value": "8",
                        "textStyle": {
                            "color": "rgb(52,89,77)"
                        }
                    },
                    {
                        "name": "0pporeno87",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(1,81,54)"
                        }
                    },
                    {
                        "name": "rone9",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(17,35,99)"
                        }
                    },
                    {
                        "name": "T90",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(37,77,110)"
                        }
                    },
                    {
                        "name": "\u5927\u5b57\u4f53",
                        "value": "3",
                        "textStyle": {
                            "color": "rgb(44,114,34)"
                        }
                    },
                    {
                        "name": "2023",
                        "value": "13",
                        "textStyle": {
                            "color": "rgb(148,98,101)"
                        }
                    },
                    {
                        "name": "\u539f\u5382",
                        "value": "11",
                        "textStyle": {
                            "color": "rgb(147,82,128)"
                        }
                    },
                    {
                        "name": "\u5c4f\u9669",
                        "value": "19",
                        "textStyle": {
                            "color": "rgb(75,63,71)"
                        }
                    },
                    {
                        "name": "Note11",
                        "value": "11",
                        "textStyle": {
                            "color": "rgb(85,1,134)"
                        }
                    },
                    {
                        "name": "note11tpro",
                        "value": "10",
                        "textStyle": {
                            "color": "rgb(87,24,36)"
                        }
                    },
                    {
                        "name": "note12proApple",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(4,49,18)"
                        }
                    },
                    {
                        "name": "13ProMax",
                        "value": "8",
                        "textStyle": {
                            "color": "rgb(99,46,137)"
                        }
                    },
                    {
                        "name": "mini",
                        "value": "13",
                        "textStyle": {
                            "color": "rgb(46,89,144)"
                        }
                    },
                    {
                        "name": "\u5341\u4e09",
                        "value": "8",
                        "textStyle": {
                            "color": "rgb(113,118,81)"
                        }
                    },
                    {
                        "name": "A9",
                        "value": "7",
                        "textStyle": {
                            "color": "rgb(55,89,55)"
                        }
                    },
                    {
                        "name": "\u6237\u5916",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(108,21,81)"
                        }
                    },
                    {
                        "name": "\u9884\u7ea6",
                        "value": "40",
                        "textStyle": {
                            "color": "rgb(160,25,135)"
                        }
                    },
                    {
                        "name": "Neo5",
                        "value": "44",
                        "textStyle": {
                            "color": "rgb(67,108,130)"
                        }
                    },
                    {
                        "name": "240W",
                        "value": "40",
                        "textStyle": {
                            "color": "rgb(29,3,9)"
                        }
                    },
                    {
                        "name": "\u6ee1\u7ea7",
                        "value": "40",
                        "textStyle": {
                            "color": "rgb(144,133,132)"
                        }
                    },
                    {
                        "name": "\u73a9\u5bb6",
                        "value": "42",
                        "textStyle": {
                            "color": "rgb(79,56,68)"
                        }
                    },
                    {
                        "name": "\u5206\u79d2\u5fc5\u4e89",
                        "value": "40",
                        "textStyle": {
                            "color": "rgb(153,124,122)"
                        }
                    },
                    {
                        "name": "00",
                        "value": "40",
                        "textStyle": {
                            "color": "rgb(24,91,108)"
                        }
                    },
                    {
                        "name": "\u53d1\u5e03\u4f1a",
                        "value": "40",
                        "textStyle": {
                            "color": "rgb(102,56,119)"
                        }
                    },
                    {
                        "name": "\u5b89\u5353",
                        "value": "43",
                        "textStyle": {
                            "color": "rgb(143,147,113)"
                        }
                    },
                    {
                        "name": "12G",
                        "value": "6",
                        "textStyle": {
                            "color": "rgb(109,77,28)"
                        }
                    },
                    {
                        "name": "\u8fd0\u884c",
                        "value": "6",
                        "textStyle": {
                            "color": "rgb(39,53,86)"
                        }
                    },
                    {
                        "name": "6.67",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(97,16,76)"
                        }
                    },
                    {
                        "name": "\u82f1\u5bf8",
                        "value": "28",
                        "textStyle": {
                            "color": "rgb(75,43,32)"
                        }
                    },
                    {
                        "name": "\u67d4\u6027",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(14,159,138)"
                        }
                    },
                    {
                        "name": "\u9ad8\u6027\u4ef7\u6bd4",
                        "value": "3",
                        "textStyle": {
                            "color": "rgb(57,117,145)"
                        }
                    },
                    {
                        "name": "10plus",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(68,64,40)"
                        }
                    },
                    {
                        "name": "\u667a\u80fd\u673a",
                        "value": "20",
                        "textStyle": {
                            "color": "rgb(90,131,142)"
                        }
                    },
                    {
                        "name": "\u5929\u8bed",
                        "value": "5",
                        "textStyle": {
                            "color": "rgb(138,66,22)"
                        }
                    },
                    {
                        "name": "R7",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(3,119,7)"
                        }
                    },
                    {
                        "name": "800",
                        "value": "15",
                        "textStyle": {
                            "color": "rgb(8,21,124)"
                        }
                    },
                    {
                        "name": "\u4e2d\u56fd\u79fb\u52a8",
                        "value": "22",
                        "textStyle": {
                            "color": "rgb(64,43,123)"
                        }
                    },
                    {
                        "name": "\u7248\u672c",
                        "value": "5",
                        "textStyle": {
                            "color": "rgb(100,116,103)"
                        }
                    },
                    {
                        "name": "\u5b89\u5168",
                        "value": "4",
                        "textStyle": {
                            "color": "rgb(40,100,40)"
                        }
                    },
                    {
                        "name": "R8",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(139,28,127)"
                        }
                    },
                    {
                        "name": "12promax",
                        "value": "13",
                        "textStyle": {
                            "color": "rgb(139,72,99)"
                        }
                    },
                    {
                        "name": "8G",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(142,15,121)"
                        }
                    },
                    {
                        "name": "256G",
                        "value": "29",
                        "textStyle": {
                            "color": "rgb(102,120,19)"
                        }
                    },
                    {
                        "name": "x40",
                        "value": "15",
                        "textStyle": {
                            "color": "rgb(97,97,43)"
                        }
                    },
                    {
                        "name": "\u7693\u8f69",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(56,83,33)"
                        }
                    },
                    {
                        "name": "H32",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(9,20,128)"
                        }
                    },
                    {
                        "name": "\u673a\u5973",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(139,124,29)"
                        }
                    },
                    {
                        "name": "\u987a\u4e30",
                        "value": "87",
                        "textStyle": {
                            "color": "rgb(127,29,77)"
                        }
                    },
                    {
                        "name": "k60pro",
                        "value": "8",
                        "textStyle": {
                            "color": "rgb(45,64,148)"
                        }
                    },
                    {
                        "name": "k50pro",
                        "value": "4",
                        "textStyle": {
                            "color": "rgb(153,2,75)"
                        }
                    },
                    {
                        "name": "N97",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(38,27,14)"
                        }
                    },
                    {
                        "name": "\u6301\u4e45",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(118,129,157)"
                        }
                    },
                    {
                        "name": "philips",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(21,153,12)"
                        }
                    },
                    {
                        "name": "\u98de\u5229\u6d66",
                        "value": "18",
                        "textStyle": {
                            "color": "rgb(93,44,104)"
                        }
                    },
                    {
                        "name": "E536",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(140,114,9)"
                        }
                    },
                    {
                        "name": "\u5c0f\u5de7",
                        "value": "5",
                        "textStyle": {
                            "color": "rgb(80,107,38)"
                        }
                    },
                    {
                        "name": "Max5G",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(52,143,40)"
                        }
                    },
                    {
                        "name": "iphone12",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(80,98,133)"
                        }
                    },
                    {
                        "name": "\u901a\u7535",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(80,127,125)"
                        }
                    },
                    {
                        "name": "i13Pro",
                        "value": "3",
                        "textStyle": {
                            "color": "rgb(13,159,102)"
                        }
                    },
                    {
                        "name": "\u9002\u7528",
                        "value": "15",
                        "textStyle": {
                            "color": "rgb(133,86,138)"
                        }
                    },
                    {
                        "name": "honor",
                        "value": "51",
                        "textStyle": {
                            "color": "rgb(144,159,141)"
                        }
                    },
                    {
                        "name": "695",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(69,113,71)"
                        }
                    },
                    {
                        "name": "L660",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(80,154,153)"
                        }
                    },
                    {
                        "name": "\u519b\u5de5",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(113,94,78)"
                        }
                    },
                    {
                        "name": "130",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(103,23,123)"
                        }
                    },
                    {
                        "name": "K10x",
                        "value": "6",
                        "textStyle": {
                            "color": "rgb(90,8,129)"
                        }
                    },
                    {
                        "name": "oppok10x",
                        "value": "8",
                        "textStyle": {
                            "color": "rgb(4,71,27)"
                        }
                    },
                    {
                        "name": "opopk10pro",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(9,151,157)"
                        }
                    },
                    {
                        "name": "k9sk7x5",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(17,88,155)"
                        }
                    },
                    {
                        "name": "0ppo0",
                        "value": "8",
                        "textStyle": {
                            "color": "rgb(42,97,144)"
                        }
                    },
                    {
                        "name": "50Pro",
                        "value": "6",
                        "textStyle": {
                            "color": "rgb(34,33,106)"
                        }
                    },
                    {
                        "name": "Plus",
                        "value": "38",
                        "textStyle": {
                            "color": "rgb(110,23,33)"
                        }
                    },
                    {
                        "name": "A16",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(58,21,112)"
                        }
                    },
                    {
                        "name": "14pro",
                        "value": "16",
                        "textStyle": {
                            "color": "rgb(7,53,119)"
                        }
                    },
                    {
                        "name": "\u699c\u5355",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(25,71,64)"
                        }
                    },
                    {
                        "name": "\u63a8\u8350",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(26,43,91)"
                        }
                    },
                    {
                        "name": "12C",
                        "value": "5",
                        "textStyle": {
                            "color": "rgb(56,91,117)"
                        }
                    },
                    {
                        "name": "\u5927\u97f3",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(61,155,53)"
                        }
                    },
                    {
                        "name": "12c",
                        "value": "3",
                        "textStyle": {
                            "color": "rgb(73,94,4)"
                        }
                    },
                    {
                        "name": "\u5145\u7535\u5668",
                        "value": "8",
                        "textStyle": {
                            "color": "rgb(43,118,54)"
                        }
                    },
                    {
                        "name": "\u5c4f\u5927",
                        "value": "5",
                        "textStyle": {
                            "color": "rgb(74,147,124)"
                        }
                    },
                    {
                        "name": "K10",
                        "value": "18",
                        "textStyle": {
                            "color": "rgb(102,129,39)"
                        }
                    },
                    {
                        "name": "6.5",
                        "value": "4",
                        "textStyle": {
                            "color": "rgb(36,71,134)"
                        }
                    },
                    {
                        "name": "\u62a4\u773c",
                        "value": "15",
                        "textStyle": {
                            "color": "rgb(21,90,155)"
                        }
                    },
                    {
                        "name": "\u9707\u64bc",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(36,70,8)"
                        }
                    },
                    {
                        "name": "\u8d85\u5e27",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(55,109,40)"
                        }
                    },
                    {
                        "name": "\u72ec\u663e",
                        "value": "3",
                        "textStyle": {
                            "color": "rgb(16,131,91)"
                        }
                    },
                    {
                        "name": "\u7ade\u76f4",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(132,11,35)"
                        }
                    },
                    {
                        "name": "2K",
                        "value": "13",
                        "textStyle": {
                            "color": "rgb(12,47,36)"
                        }
                    },
                    {
                        "name": "E6",
                        "value": "4",
                        "textStyle": {
                            "color": "rgb(49,51,131)"
                        }
                    },
                    {
                        "name": "120W",
                        "value": "8",
                        "textStyle": {
                            "color": "rgb(62,155,21)"
                        }
                    },
                    {
                        "name": "\u5145\u7535",
                        "value": "14",
                        "textStyle": {
                            "color": "rgb(62,136,101)"
                        }
                    },
                    {
                        "name": "vivoiQOO11",
                        "value": "4",
                        "textStyle": {
                            "color": "rgb(13,57,148)"
                        }
                    },
                    {
                        "name": "\u5165\u4f1a",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(147,136,95)"
                        }
                    },
                    {
                        "name": "\u60ca\u559c",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(150,75,7)"
                        }
                    },
                    {
                        "name": "E5",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(47,135,121)"
                        }
                    },
                    {
                        "name": "\u738b\u8005",
                        "value": "5",
                        "textStyle": {
                            "color": "rgb(30,26,105)"
                        }
                    },
                    {
                        "name": "KPL",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(115,8,88)"
                        }
                    },
                    {
                        "name": "vivoiQOO10",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(62,67,4)"
                        }
                    },
                    {
                        "name": "A36",
                        "value": "5",
                        "textStyle": {
                            "color": "rgb(142,124,124)"
                        }
                    },
                    {
                        "name": "oppoa36",
                        "value": "5",
                        "textStyle": {
                            "color": "rgb(103,7,13)"
                        }
                    },
                    {
                        "name": "Y32t",
                        "value": "3",
                        "textStyle": {
                            "color": "rgb(88,146,84)"
                        }
                    },
                    {
                        "name": "y32",
                        "value": "3",
                        "textStyle": {
                            "color": "rgb(26,145,76)"
                        }
                    },
                    {
                        "name": "\u8d60\u53cc",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(138,83,124)"
                        }
                    },
                    {
                        "name": "\u8272\u6e29",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(99,73,117)"
                        }
                    },
                    {
                        "name": "\u9502\u7535",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(50,146,122)"
                        }
                    },
                    {
                        "name": "\u53f0\u706f",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(92,32,80)"
                        }
                    },
                    {
                        "name": "S16Pro",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(18,34,133)"
                        }
                    },
                    {
                        "name": "S15Apple",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(139,38,10)"
                        }
                    },
                    {
                        "name": "\u7acb\u51cf",
                        "value": "40",
                        "textStyle": {
                            "color": "rgb(141,113,92)"
                        }
                    },
                    {
                        "name": "270",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(51,0,23)"
                        }
                    },
                    {
                        "name": "Z5",
                        "value": "5",
                        "textStyle": {
                            "color": "rgb(25,74,35)"
                        }
                    },
                    {
                        "name": "\u9ad8\u5237",
                        "value": "22",
                        "textStyle": {
                            "color": "rgb(141,152,158)"
                        }
                    },
                    {
                        "name": "\u539f\u8272",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(31,158,82)"
                        }
                    },
                    {
                        "name": "iqooz5",
                        "value": "8",
                        "textStyle": {
                            "color": "rgb(68,126,33)"
                        }
                    },
                    {
                        "name": "k5024",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(143,71,138)"
                        }
                    },
                    {
                        "name": "\u4e09\u671f",
                        "value": "8",
                        "textStyle": {
                            "color": "rgb(74,5,24)"
                        }
                    },
                    {
                        "name": "\u7248\u5168",
                        "value": "9",
                        "textStyle": {
                            "color": "rgb(98,135,90)"
                        }
                    },
                    {
                        "name": "8plus",
                        "value": "6",
                        "textStyle": {
                            "color": "rgb(137,130,55)"
                        }
                    },
                    {
                        "name": "iphone8P",
                        "value": "5",
                        "textStyle": {
                            "color": "rgb(41,58,31)"
                        }
                    },
                    {
                        "name": "L6S",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(111,42,159)"
                        }
                    },
                    {
                        "name": "\u591a\u4eb2",
                        "value": "16",
                        "textStyle": {
                            "color": "rgb(47,54,154)"
                        }
                    },
                    {
                        "name": "F21PRO",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(29,87,62)"
                        }
                    },
                    {
                        "name": "\u673a\u89e6",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(64,146,126)"
                        }
                    },
                    {
                        "name": "\u5c4f\u7f51",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(48,36,33)"
                        }
                    },
                    {
                        "name": "\u9ed1\u8393",
                        "value": "3",
                        "textStyle": {
                            "color": "rgb(136,68,57)"
                        }
                    },
                    {
                        "name": "\u673a\u5fae",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(68,59,32)"
                        }
                    },
                    {
                        "name": "\u4fe1\u6296\u97f3",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(8,33,151)"
                        }
                    },
                    {
                        "name": "qinailife",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(45,11,40)"
                        }
                    },
                    {
                        "name": "F22",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(82,71,50)"
                        }
                    },
                    {
                        "name": "\u6625\u8282",
                        "value": "3",
                        "textStyle": {
                            "color": "rgb(63,91,141)"
                        }
                    },
                    {
                        "name": "\u6253\u70ca",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(45,88,65)"
                        }
                    },
                    {
                        "name": "Redmi12TProvivo",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(36,123,8)"
                        }
                    },
                    {
                        "name": "iqooneo7se",
                        "value": "9",
                        "textStyle": {
                            "color": "rgb(139,73,72)"
                        }
                    },
                    {
                        "name": "\u65b0\u6b3e\u624b\u673a",
                        "value": "44",
                        "textStyle": {
                            "color": "rgb(5,155,94)"
                        }
                    },
                    {
                        "name": "L19",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(130,81,68)"
                        }
                    },
                    {
                        "name": "\u9996\u51cf",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(129,83,132)"
                        }
                    },
                    {
                        "name": "300",
                        "value": "11",
                        "textStyle": {
                            "color": "rgb(68,123,74)"
                        }
                    },
                    {
                        "name": "\u5143\u4eab",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(39,62,47)"
                        }
                    },
                    {
                        "name": "\u52aa\u6bd4\u4e9a",
                        "value": "18",
                        "textStyle": {
                            "color": "rgb(144,19,63)"
                        }
                    },
                    {
                        "name": "Z50",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(100,84,53)"
                        }
                    },
                    {
                        "name": "\u5b9a\u5236",
                        "value": "3",
                        "textStyle": {
                            "color": "rgb(100,18,96)"
                        }
                    },
                    {
                        "name": "\u5149\u5b66\u7cfb\u7edf",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(68,98,104)"
                        }
                    },
                    {
                        "name": "\u725b\u9b54\u738b",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(115,40,100)"
                        }
                    },
                    {
                        "name": "8gen2",
                        "value": "5",
                        "textStyle": {
                            "color": "rgb(98,0,145)"
                        }
                    },
                    {
                        "name": "P60pro",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(47,52,152)"
                        }
                    },
                    {
                        "name": "512G",
                        "value": "6",
                        "textStyle": {
                            "color": "rgb(48,47,36)"
                        }
                    },
                    {
                        "name": "\u6392\u884c\u699c",
                        "value": "3",
                        "textStyle": {
                            "color": "rgb(29,63,138)"
                        }
                    },
                    {
                        "name": "vivoiqoo11",
                        "value": "5",
                        "textStyle": {
                            "color": "rgb(73,139,148)"
                        }
                    },
                    {
                        "name": "iqoo11pro",
                        "value": "3",
                        "textStyle": {
                            "color": "rgb(124,99,138)"
                        }
                    },
                    {
                        "name": "iq11",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(76,77,68)"
                        }
                    },
                    {
                        "name": "iooq11",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(100,114,47)"
                        }
                    },
                    {
                        "name": "14plus",
                        "value": "14",
                        "textStyle": {
                            "color": "rgb(136,116,159)"
                        }
                    },
                    {
                        "name": "G5",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(40,26,73)"
                        }
                    },
                    {
                        "name": "\u8f7b\u5962",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(22,55,145)"
                        }
                    },
                    {
                        "name": "\u7248\u771f\u4e09\u9632",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(44,23,20)"
                        }
                    },
                    {
                        "name": "IP68",
                        "value": "3",
                        "textStyle": {
                            "color": "rgb(35,11,43)"
                        }
                    },
                    {
                        "name": "DOOV",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(4,79,158)"
                        }
                    },
                    {
                        "name": "F99",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(74,151,95)"
                        }
                    },
                    {
                        "name": "\u673a\u5929\u7ffc",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(1,147,129)"
                        }
                    },
                    {
                        "name": "\u4e2d\u56fd\u7535\u4fe1",
                        "value": "4",
                        "textStyle": {
                            "color": "rgb(41,109,159)"
                        }
                    },
                    {
                        "name": "14Pro",
                        "value": "20",
                        "textStyle": {
                            "color": "rgb(106,126,12)"
                        }
                    },
                    {
                        "name": "6.7",
                        "value": "12",
                        "textStyle": {
                            "color": "rgb(39,103,122)"
                        }
                    },
                    {
                        "name": "iqooz6",
                        "value": "13",
                        "textStyle": {
                            "color": "rgb(157,54,126)"
                        }
                    },
                    {
                        "name": "iqoo",
                        "value": "29",
                        "textStyle": {
                            "color": "rgb(104,33,153)"
                        }
                    },
                    {
                        "name": "z6x",
                        "value": "9",
                        "textStyle": {
                            "color": "rgb(45,50,26)"
                        }
                    },
                    {
                        "name": "iqz5",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(69,103,130)"
                        }
                    },
                    {
                        "name": "ipooz5x",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(33,8,20)"
                        }
                    },
                    {
                        "name": "z3",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(120,44,50)"
                        }
                    },
                    {
                        "name": "14promax",
                        "value": "12",
                        "textStyle": {
                            "color": "rgb(71,58,50)"
                        }
                    },
                    {
                        "name": "R17",
                        "value": "7",
                        "textStyle": {
                            "color": "rgb(54,153,42)"
                        }
                    },
                    {
                        "name": "\u5fae\u4fe1",
                        "value": "9",
                        "textStyle": {
                            "color": "rgb(0,22,66)"
                        }
                    },
                    {
                        "name": "QQ",
                        "value": "6",
                        "textStyle": {
                            "color": "rgb(57,13,81)"
                        }
                    },
                    {
                        "name": "\u89e6\u5c4f",
                        "value": "9",
                        "textStyle": {
                            "color": "rgb(23,20,57)"
                        }
                    },
                    {
                        "name": "\u521d\u4e2d",
                        "value": "11",
                        "textStyle": {
                            "color": "rgb(103,91,53)"
                        }
                    },
                    {
                        "name": "\u9ad8\u4e2d\u5b66\u751f",
                        "value": "3",
                        "textStyle": {
                            "color": "rgb(99,21,55)"
                        }
                    },
                    {
                        "name": "\u5065\u5eb7",
                        "value": "7",
                        "textStyle": {
                            "color": "rgb(18,151,111)"
                        }
                    },
                    {
                        "name": "\u884c\u7a0b",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(51,100,5)"
                        }
                    },
                    {
                        "name": "\u6ca1\u6709",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(7,140,5)"
                        }
                    },
                    {
                        "name": "\u4e0d\u80fd",
                        "value": "3",
                        "textStyle": {
                            "color": "rgb(125,37,140)"
                        }
                    },
                    {
                        "name": "\u4e0a\u7f51",
                        "value": "7",
                        "textStyle": {
                            "color": "rgb(59,25,69)"
                        }
                    },
                    {
                        "name": "R19",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(102,95,148)"
                        }
                    },
                    {
                        "name": "280",
                        "value": "3",
                        "textStyle": {
                            "color": "rgb(84,115,14)"
                        }
                    },
                    {
                        "name": "x40GT",
                        "value": "3",
                        "textStyle": {
                            "color": "rgb(47,127,99)"
                        }
                    },
                    {
                        "name": "gtApple",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(83,73,71)"
                        }
                    },
                    {
                        "name": "13Pro5G",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(20,112,22)"
                        }
                    },
                    {
                        "name": "\u52a0\u6025",
                        "value": "12",
                        "textStyle": {
                            "color": "rgb(159,78,137)"
                        }
                    },
                    {
                        "name": "ace",
                        "value": "19",
                        "textStyle": {
                            "color": "rgb(123,147,85)"
                        }
                    },
                    {
                        "name": "\u53ef\u7231",
                        "value": "9",
                        "textStyle": {
                            "color": "rgb(81,79,146)"
                        }
                    },
                    {
                        "name": "P40pro",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(47,63,111)"
                        }
                    },
                    {
                        "name": "P40",
                        "value": "35",
                        "textStyle": {
                            "color": "rgb(73,18,71)"
                        }
                    },
                    {
                        "name": "Pro5G",
                        "value": "9",
                        "textStyle": {
                            "color": "rgb(147,157,91)"
                        }
                    },
                    {
                        "name": "P40Pro",
                        "value": "4",
                        "textStyle": {
                            "color": "rgb(90,16,84)"
                        }
                    },
                    {
                        "name": "\u5c4f\u4fdd",
                        "value": "37",
                        "textStyle": {
                            "color": "rgb(106,112,65)"
                        }
                    },
                    {
                        "name": "\u5904\u7406\u5668",
                        "value": "19",
                        "textStyle": {
                            "color": "rgb(55,100,3)"
                        }
                    },
                    {
                        "name": "note11pro",
                        "value": "6",
                        "textStyle": {
                            "color": "rgb(54,61,23)"
                        }
                    },
                    {
                        "name": "2660",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(155,148,42)"
                        }
                    },
                    {
                        "name": "\u673a\u5b98",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(91,53,12)"
                        }
                    },
                    {
                        "name": "note12",
                        "value": "10",
                        "textStyle": {
                            "color": "rgb(110,46,91)"
                        }
                    },
                    {
                        "name": "Mate50",
                        "value": "7",
                        "textStyle": {
                            "color": "rgb(111,53,3)"
                        }
                    },
                    {
                        "name": "\u5c4f\u8d85",
                        "value": "3",
                        "textStyle": {
                            "color": "rgb(149,82,157)"
                        }
                    },
                    {
                        "name": "P50",
                        "value": "15",
                        "textStyle": {
                            "color": "rgb(114,4,100)"
                        }
                    },
                    {
                        "name": "\u901a\u8bdd",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(54,131,58)"
                        }
                    },
                    {
                        "name": "Reno8",
                        "value": "11",
                        "textStyle": {
                            "color": "rgb(53,115,157)"
                        }
                    },
                    {
                        "name": "reno9HONOR",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(145,98,61)"
                        }
                    },
                    {
                        "name": "AI",
                        "value": "5",
                        "textStyle": {
                            "color": "rgb(126,2,81)"
                        }
                    },
                    {
                        "name": "\u89c6\u9891",
                        "value": "3",
                        "textStyle": {
                            "color": "rgb(58,65,23)"
                        }
                    },
                    {
                        "name": "\u5927\u5e08",
                        "value": "3",
                        "textStyle": {
                            "color": "rgb(142,116,151)"
                        }
                    },
                    {
                        "name": "70HONOR",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(85,157,98)"
                        }
                    },
                    {
                        "name": "Play6C",
                        "value": "3",
                        "textStyle": {
                            "color": "rgb(79,127,18)"
                        }
                    },
                    {
                        "name": "22.5",
                        "value": "10",
                        "textStyle": {
                            "color": "rgb(104,95,14)"
                        }
                    },
                    {
                        "name": "\u65e0\u5fe7",
                        "value": "11",
                        "textStyle": {
                            "color": "rgb(131,87,14)"
                        }
                    },
                    {
                        "name": "\u5355\u4eab",
                        "value": "6",
                        "textStyle": {
                            "color": "rgb(42,30,15)"
                        }
                    },
                    {
                        "name": "\u7ea2\u5305",
                        "value": "5",
                        "textStyle": {
                            "color": "rgb(120,12,31)"
                        }
                    },
                    {
                        "name": "\u7cfb\u7edf",
                        "value": "45",
                        "textStyle": {
                            "color": "rgb(70,100,63)"
                        }
                    },
                    {
                        "name": "XD4",
                        "value": "11",
                        "textStyle": {
                            "color": "rgb(41,131,2)"
                        }
                    },
                    {
                        "name": "V13",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(16,16,100)"
                        }
                    },
                    {
                        "name": "\u5927\u5b66\u751f",
                        "value": "3",
                        "textStyle": {
                            "color": "rgb(19,124,135)"
                        }
                    },
                    {
                        "name": "MIUI",
                        "value": "83",
                        "textStyle": {
                            "color": "rgb(98,138,72)"
                        }
                    },
                    {
                        "name": "\u9752\u6625",
                        "value": "15",
                        "textStyle": {
                            "color": "rgb(56,102,10)"
                        }
                    },
                    {
                        "name": "U5x",
                        "value": "9",
                        "textStyle": {
                            "color": "rgb(20,68,88)"
                        }
                    },
                    {
                        "name": "vivoiQOOU5x",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(46,129,135)"
                        }
                    },
                    {
                        "name": "Y73t",
                        "value": "5",
                        "textStyle": {
                            "color": "rgb(61,71,6)"
                        }
                    },
                    {
                        "name": "y52t",
                        "value": "3",
                        "textStyle": {
                            "color": "rgb(71,124,31)"
                        }
                    },
                    {
                        "name": "y73T",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(77,133,85)"
                        }
                    },
                    {
                        "name": "\u5165\u8033\u5f0f",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(41,5,118)"
                        }
                    },
                    {
                        "name": "Neo6",
                        "value": "11",
                        "textStyle": {
                            "color": "rgb(78,50,44)"
                        }
                    },
                    {
                        "name": "870",
                        "value": "21",
                        "textStyle": {
                            "color": "rgb(155,83,58)"
                        }
                    },
                    {
                        "name": "vivoiqooneo5iq00",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(84,156,158)"
                        }
                    },
                    {
                        "name": "Y52t",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(12,104,115)"
                        }
                    },
                    {
                        "name": "y32tOPPO",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(41,113,14)"
                        }
                    },
                    {
                        "name": "A56s",
                        "value": "4",
                        "textStyle": {
                            "color": "rgb(4,89,2)"
                        }
                    },
                    {
                        "name": "a57",
                        "value": "8",
                        "textStyle": {
                            "color": "rgb(48,44,44)"
                        }
                    },
                    {
                        "name": "a53",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(32,24,69)"
                        }
                    },
                    {
                        "name": "\u76f4\u8425",
                        "value": "5",
                        "textStyle": {
                            "color": "rgb(74,144,33)"
                        }
                    },
                    {
                        "name": "\u9ad8\u7acb",
                        "value": "14",
                        "textStyle": {
                            "color": "rgb(18,97,18)"
                        }
                    },
                    {
                        "name": "900",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(148,129,105)"
                        }
                    },
                    {
                        "name": "nova9",
                        "value": "15",
                        "textStyle": {
                            "color": "rgb(55,35,114)"
                        }
                    },
                    {
                        "name": "iphone14promax",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(50,50,45)"
                        }
                    },
                    {
                        "name": "G69",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(114,32,65)"
                        }
                    },
                    {
                        "name": "iooqz5",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(88,155,23)"
                        }
                    },
                    {
                        "name": "iq00z5x",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(106,12,97)"
                        }
                    },
                    {
                        "name": "\u4e0b\u5355",
                        "value": "28",
                        "textStyle": {
                            "color": "rgb(22,72,112)"
                        }
                    },
                    {
                        "name": "\u51cf\u94b1",
                        "value": "6",
                        "textStyle": {
                            "color": "rgb(33,20,90)"
                        }
                    },
                    {
                        "name": "30",
                        "value": "38",
                        "textStyle": {
                            "color": "rgb(152,133,104)"
                        }
                    },
                    {
                        "name": "x40Apple",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(144,57,48)"
                        }
                    },
                    {
                        "name": "SEvivo",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(46,116,92)"
                        }
                    },
                    {
                        "name": "vivoiqooneo7se",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(127,149,61)"
                        }
                    },
                    {
                        "name": "ioqqneo6",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(83,34,150)"
                        }
                    },
                    {
                        "name": "iq",
                        "value": "9",
                        "textStyle": {
                            "color": "rgb(9,44,89)"
                        }
                    },
                    {
                        "name": "Samsung",
                        "value": "56",
                        "textStyle": {
                            "color": "rgb(26,111,51)"
                        }
                    },
                    {
                        "name": "\u4e09\u661f",
                        "value": "107",
                        "textStyle": {
                            "color": "rgb(156,146,83)"
                        }
                    },
                    {
                        "name": "Galaxy",
                        "value": "75",
                        "textStyle": {
                            "color": "rgb(7,97,72)"
                        }
                    },
                    {
                        "name": "Flip4",
                        "value": "12",
                        "textStyle": {
                            "color": "rgb(103,63,160)"
                        }
                    },
                    {
                        "name": "zflip4",
                        "value": "8",
                        "textStyle": {
                            "color": "rgb(129,126,4)"
                        }
                    },
                    {
                        "name": "\u65b0\u624b\u673a",
                        "value": "16",
                        "textStyle": {
                            "color": "rgb(44,66,88)"
                        }
                    },
                    {
                        "name": "\u9e92\u9e9f",
                        "value": "62",
                        "textStyle": {
                            "color": "rgb(61,85,43)"
                        }
                    },
                    {
                        "name": "20pro",
                        "value": "4",
                        "textStyle": {
                            "color": "rgb(32,49,28)"
                        }
                    },
                    {
                        "name": "P70pro",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(66,43,139)"
                        }
                    },
                    {
                        "name": "K9X",
                        "value": "7",
                        "textStyle": {
                            "color": "rgb(129,159,87)"
                        }
                    },
                    {
                        "name": "oppok9x",
                        "value": "18",
                        "textStyle": {
                            "color": "rgb(4,41,58)"
                        }
                    },
                    {
                        "name": "k9x",
                        "value": "9",
                        "textStyle": {
                            "color": "rgb(158,9,136)"
                        }
                    },
                    {
                        "name": "\u5973\u6b3e",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(81,158,92)"
                        }
                    },
                    {
                        "name": "\u5988\u5988",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(20,77,96)"
                        }
                    },
                    {
                        "name": "\u4f18\u9009",
                        "value": "3",
                        "textStyle": {
                            "color": "rgb(55,143,124)"
                        }
                    },
                    {
                        "name": "\u9009\u9001",
                        "value": "17",
                        "textStyle": {
                            "color": "rgb(60,149,140)"
                        }
                    },
                    {
                        "name": "\u624b\u8868",
                        "value": "3",
                        "textStyle": {
                            "color": "rgb(54,49,88)"
                        }
                    },
                    {
                        "name": "12s",
                        "value": "4",
                        "textStyle": {
                            "color": "rgb(34,19,4)"
                        }
                    },
                    {
                        "name": "pro",
                        "value": "41",
                        "textStyle": {
                            "color": "rgb(54,121,48)"
                        }
                    },
                    {
                        "name": "20e",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(53,62,46)"
                        }
                    },
                    {
                        "name": "\u5e97\u7545",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(142,149,66)"
                        }
                    },
                    {
                        "name": "\u7acb\u7701",
                        "value": "5",
                        "textStyle": {
                            "color": "rgb(104,17,44)"
                        }
                    },
                    {
                        "name": "700",
                        "value": "8",
                        "textStyle": {
                            "color": "rgb(88,52,141)"
                        }
                    },
                    {
                        "name": "A53",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(148,52,70)"
                        }
                    },
                    {
                        "name": "\u987a\u6ed1",
                        "value": "3",
                        "textStyle": {
                            "color": "rgb(59,86,78)"
                        }
                    },
                    {
                        "name": "\u89c6\u5c4f",
                        "value": "8",
                        "textStyle": {
                            "color": "rgb(25,17,117)"
                        }
                    },
                    {
                        "name": "\u8d85\u6e05\u56db\u6444",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(86,73,132)"
                        }
                    },
                    {
                        "name": "125",
                        "value": "3",
                        "textStyle": {
                            "color": "rgb(85,153,16)"
                        }
                    },
                    {
                        "name": "\u4e13\u5356",
                        "value": "5",
                        "textStyle": {
                            "color": "rgb(145,44,147)"
                        }
                    },
                    {
                        "name": "xiaomi13OPPO",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(147,17,139)"
                        }
                    },
                    {
                        "name": "\u6307\u7eb9",
                        "value": "17",
                        "textStyle": {
                            "color": "rgb(90,139,109)"
                        }
                    },
                    {
                        "name": "128G",
                        "value": "8",
                        "textStyle": {
                            "color": "rgb(101,96,68)"
                        }
                    },
                    {
                        "name": "\u52a0\u8d60",
                        "value": "5",
                        "textStyle": {
                            "color": "rgb(140,144,142)"
                        }
                    },
                    {
                        "name": "TWS",
                        "value": "6",
                        "textStyle": {
                            "color": "rgb(113,103,80)"
                        }
                    },
                    {
                        "name": "vivos16",
                        "value": "15",
                        "textStyle": {
                            "color": "rgb(30,85,60)"
                        }
                    },
                    {
                        "name": "vivos16pro",
                        "value": "5",
                        "textStyle": {
                            "color": "rgb(6,62,116)"
                        }
                    },
                    {
                        "name": "s16",
                        "value": "8",
                        "textStyle": {
                            "color": "rgb(54,3,6)"
                        }
                    },
                    {
                        "name": "s16e",
                        "value": "10",
                        "textStyle": {
                            "color": "rgb(88,76,54)"
                        }
                    },
                    {
                        "name": "vivos15",
                        "value": "8",
                        "textStyle": {
                            "color": "rgb(49,121,11)"
                        }
                    },
                    {
                        "name": "G2",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(13,126,116)"
                        }
                    },
                    {
                        "name": "\u5361\u901a",
                        "value": "4",
                        "textStyle": {
                            "color": "rgb(107,158,23)"
                        }
                    },
                    {
                        "name": "\u8c6a\u534e",
                        "value": "26",
                        "textStyle": {
                            "color": "rgb(82,33,38)"
                        }
                    },
                    {
                        "name": "40W",
                        "value": "9",
                        "textStyle": {
                            "color": "rgb(102,79,103)"
                        }
                    },
                    {
                        "name": "mate30",
                        "value": "8",
                        "textStyle": {
                            "color": "rgb(10,41,81)"
                        }
                    },
                    {
                        "name": "rone8pro",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(156,82,97)"
                        }
                    },
                    {
                        "name": "0ppo",
                        "value": "26",
                        "textStyle": {
                            "color": "rgb(74,18,127)"
                        }
                    },
                    {
                        "name": "porneo7",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(43,5,52)"
                        }
                    },
                    {
                        "name": "13proHuawei",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(85,88,142)"
                        }
                    },
                    {
                        "name": "990",
                        "value": "22",
                        "textStyle": {
                            "color": "rgb(105,24,134)"
                        }
                    },
                    {
                        "name": "\u94a2\u5316",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(63,13,144)"
                        }
                    },
                    {
                        "name": "nubia",
                        "value": "12",
                        "textStyle": {
                            "color": "rgb(84,107,65)"
                        }
                    },
                    {
                        "name": "\u7ea2\u9b54",
                        "value": "28",
                        "textStyle": {
                            "color": "rgb(53,51,43)"
                        }
                    },
                    {
                        "name": "\u7b2c\u4e8c\u4ee3",
                        "value": "9",
                        "textStyle": {
                            "color": "rgb(15,136,67)"
                        }
                    },
                    {
                        "name": "ICE",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(50,82,33)"
                        }
                    },
                    {
                        "name": "\u9b54\u51b7",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(35,125,31)"
                        }
                    },
                    {
                        "name": "\u6563\u70ed",
                        "value": "7",
                        "textStyle": {
                            "color": "rgb(69,125,13)"
                        }
                    },
                    {
                        "name": "4g",
                        "value": "15",
                        "textStyle": {
                            "color": "rgb(67,22,110)"
                        }
                    },
                    {
                        "name": "\u7f51\u7ea2",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(46,24,35)"
                        }
                    },
                    {
                        "name": "K100",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(4,68,133)"
                        }
                    },
                    {
                        "name": "\u6296\u97f3",
                        "value": "5",
                        "textStyle": {
                            "color": "rgb(150,55,70)"
                        }
                    },
                    {
                        "name": "\u9ad8\u80fd",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(67,52,63)"
                        }
                    },
                    {
                        "name": "\u8499\u5947",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(150,47,33)"
                        }
                    },
                    {
                        "name": "\u4e13\u8425\u5e97",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(32,114,26)"
                        }
                    },
                    {
                        "name": "Nokia",
                        "value": "6",
                        "textStyle": {
                            "color": "rgb(2,74,54)"
                        }
                    },
                    {
                        "name": "6A",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(79,143,4)"
                        }
                    },
                    {
                        "name": "\u4eba\u8138",
                        "value": "4",
                        "textStyle": {
                            "color": "rgb(57,150,130)"
                        }
                    },
                    {
                        "name": "\u89e3\u9501",
                        "value": "6",
                        "textStyle": {
                            "color": "rgb(36,54,51)"
                        }
                    },
                    {
                        "name": "\u7279\u60e0",
                        "value": "3",
                        "textStyle": {
                            "color": "rgb(46,145,97)"
                        }
                    },
                    {
                        "name": "600",
                        "value": "7",
                        "textStyle": {
                            "color": "rgb(30,134,137)"
                        }
                    },
                    {
                        "name": "Note12",
                        "value": "6",
                        "textStyle": {
                            "color": "rgb(82,22,9)"
                        }
                    },
                    {
                        "name": "\u6781\u901f",
                        "value": "5",
                        "textStyle": {
                            "color": "rgb(16,2,28)"
                        }
                    },
                    {
                        "name": "778G",
                        "value": "6",
                        "textStyle": {
                            "color": "rgb(49,75,76)"
                        }
                    },
                    {
                        "name": "10z",
                        "value": "3",
                        "textStyle": {
                            "color": "rgb(79,33,91)"
                        }
                    },
                    {
                        "name": "\u8d85\u6e05\u4e09\u6444",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(15,103,8)"
                        }
                    },
                    {
                        "name": "nova10HONOR",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(151,115,147)"
                        }
                    },
                    {
                        "name": "Vs",
                        "value": "5",
                        "textStyle": {
                            "color": "rgb(112,122,114)"
                        }
                    },
                    {
                        "name": "\u5168\u5929",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(48,74,104)"
                        }
                    },
                    {
                        "name": "\u5185\u5916",
                        "value": "5",
                        "textStyle": {
                            "color": "rgb(18,47,62)"
                        }
                    },
                    {
                        "name": "\u6444\u50cf\u5934",
                        "value": "17",
                        "textStyle": {
                            "color": "rgb(120,4,124)"
                        }
                    },
                    {
                        "name": "\u7b2c\u4e00\u4ee3",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(25,15,137)"
                        }
                    },
                    {
                        "name": "\u5e73\u53f0",
                        "value": "3",
                        "textStyle": {
                            "color": "rgb(153,116,49)"
                        }
                    },
                    {
                        "name": "Play6T",
                        "value": "15",
                        "textStyle": {
                            "color": "rgb(76,102,147)"
                        }
                    },
                    {
                        "name": "5TX30",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(146,40,156)"
                        }
                    },
                    {
                        "name": "\u5355\u7acb",
                        "value": "11",
                        "textStyle": {
                            "color": "rgb(138,20,8)"
                        }
                    },
                    {
                        "name": "\u54a8\u8be2",
                        "value": "18",
                        "textStyle": {
                            "color": "rgb(40,10,23)"
                        }
                    },
                    {
                        "name": "\u5e7f\u89d2\u955c\u5934",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(61,93,50)"
                        }
                    },
                    {
                        "name": "nove10pro",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(29,123,133)"
                        }
                    },
                    {
                        "name": "2127",
                        "value": "13",
                        "textStyle": {
                            "color": "rgb(9,116,112)"
                        }
                    },
                    {
                        "name": "200W",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(68,24,157)"
                        }
                    },
                    {
                        "name": "\u7248\u9a81\u9f99",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(68,25,121)"
                        }
                    },
                    {
                        "name": "9000",
                        "value": "8",
                        "textStyle": {
                            "color": "rgb(149,81,118)"
                        }
                    },
                    {
                        "name": "Xs",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(49,61,30)"
                        }
                    },
                    {
                        "name": "\u8d85\u8f7b\u8584",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(57,33,126)"
                        }
                    },
                    {
                        "name": "\u5e73\u6574",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(116,16,121)"
                        }
                    },
                    {
                        "name": "\u53ef\u9760",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(149,27,58)"
                        }
                    },
                    {
                        "name": "\u4f53\u9a8c",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(100,25,45)"
                        }
                    },
                    {
                        "name": "\u5c4f\u5b98",
                        "value": "6",
                        "textStyle": {
                            "color": "rgb(54,107,138)"
                        }
                    },
                    {
                        "name": "mate50",
                        "value": "11",
                        "textStyle": {
                            "color": "rgb(3,160,11)"
                        }
                    },
                    {
                        "name": "\u540c\u7cfb",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(30,105,156)"
                        }
                    },
                    {
                        "name": "Y53t",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(10,63,44)"
                        }
                    },
                    {
                        "name": "play",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(94,88,78)"
                        }
                    },
                    {
                        "name": "u5x",
                        "value": "5",
                        "textStyle": {
                            "color": "rgb(31,107,54)"
                        }
                    },
                    {
                        "name": "iqu5",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(149,31,75)"
                        }
                    },
                    {
                        "name": "iq00u5",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(91,64,93)"
                        }
                    },
                    {
                        "name": "K9x",
                        "value": "12",
                        "textStyle": {
                            "color": "rgb(6,137,55)"
                        }
                    },
                    {
                        "name": "k9s",
                        "value": "14",
                        "textStyle": {
                            "color": "rgb(146,116,103)"
                        }
                    },
                    {
                        "name": "por",
                        "value": "7",
                        "textStyle": {
                            "color": "rgb(66,130,159)"
                        }
                    },
                    {
                        "name": "k7xvivo",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(59,159,53)"
                        }
                    },
                    {
                        "name": "iqoo10",
                        "value": "6",
                        "textStyle": {
                            "color": "rgb(48,159,128)"
                        }
                    },
                    {
                        "name": "5gvivoiqoo10",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(56,144,85)"
                        }
                    },
                    {
                        "name": "iq10",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(117,136,10)"
                        }
                    },
                    {
                        "name": "iq0010",
                        "value": "4",
                        "textStyle": {
                            "color": "rgb(129,33,8)"
                        }
                    },
                    {
                        "name": "x90",
                        "value": "6",
                        "textStyle": {
                            "color": "rgb(100,27,123)"
                        }
                    },
                    {
                        "name": "iqqo10",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(76,85,120)"
                        }
                    },
                    {
                        "name": "note1224",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(7,8,137)"
                        }
                    },
                    {
                        "name": "\u8d85\u5927",
                        "value": "3",
                        "textStyle": {
                            "color": "rgb(117,45,22)"
                        }
                    },
                    {
                        "name": "\u8fd0\u5b58",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(93,89,139)"
                        }
                    },
                    {
                        "name": "X40GTApple",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(5,139,1)"
                        }
                    },
                    {
                        "name": "6s",
                        "value": "10",
                        "textStyle": {
                            "color": "rgb(24,26,133)"
                        }
                    },
                    {
                        "name": "6sp",
                        "value": "4",
                        "textStyle": {
                            "color": "rgb(100,157,99)"
                        }
                    },
                    {
                        "name": "9plus",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(32,19,64)"
                        }
                    },
                    {
                        "name": "\u591a\u91cd",
                        "value": "6",
                        "textStyle": {
                            "color": "rgb(117,34,12)"
                        }
                    },
                    {
                        "name": "\u597d\u793c",
                        "value": "13",
                        "textStyle": {
                            "color": "rgb(160,141,24)"
                        }
                    },
                    {
                        "name": "11pro",
                        "value": "11",
                        "textStyle": {
                            "color": "rgb(46,147,36)"
                        }
                    },
                    {
                        "name": "T30",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(100,22,72)"
                        }
                    },
                    {
                        "name": "iphone5s",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(52,113,82)"
                        }
                    },
                    {
                        "name": "\u673a\u5c0f\u5c4f",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(29,125,118)"
                        }
                    },
                    {
                        "name": "\u5de5\u4f5c",
                        "value": "13",
                        "textStyle": {
                            "color": "rgb(9,125,52)"
                        }
                    },
                    {
                        "name": "5sApple",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(22,51,6)"
                        }
                    },
                    {
                        "name": "vivoiqooneo7",
                        "value": "3",
                        "textStyle": {
                            "color": "rgb(20,6,84)"
                        }
                    },
                    {
                        "name": "k50proApple",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(65,74,44)"
                        }
                    },
                    {
                        "name": "12HUAWEI",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(124,87,26)"
                        }
                    },
                    {
                        "name": "\u6b27\u4e9a",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(37,18,90)"
                        }
                    },
                    {
                        "name": "\u5b89\u5353\u5927",
                        "value": "3",
                        "textStyle": {
                            "color": "rgb(95,55,115)"
                        }
                    },
                    {
                        "name": "\u5c4f\u5168",
                        "value": "6",
                        "textStyle": {
                            "color": "rgb(13,2,42)"
                        }
                    },
                    {
                        "name": "\u6697\u7d2b\u8272",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(57,75,143)"
                        }
                    },
                    {
                        "name": "14Plus",
                        "value": "8",
                        "textStyle": {
                            "color": "rgb(126,103,131)"
                        }
                    },
                    {
                        "name": "\u5343\u767e",
                        "value": "12",
                        "textStyle": {
                            "color": "rgb(89,5,132)"
                        }
                    },
                    {
                        "name": "\u62c6\u5c01",
                        "value": "7",
                        "textStyle": {
                            "color": "rgb(122,8,74)"
                        }
                    },
                    {
                        "name": "\u534e\u5f3a\u5317",
                        "value": "3",
                        "textStyle": {
                            "color": "rgb(27,74,35)"
                        }
                    },
                    {
                        "name": "Nova",
                        "value": "4",
                        "textStyle": {
                            "color": "rgb(39,48,10)"
                        }
                    },
                    {
                        "name": "985",
                        "value": "7",
                        "textStyle": {
                            "color": "rgb(94,153,3)"
                        }
                    },
                    {
                        "name": "210",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(51,7,133)"
                        }
                    },
                    {
                        "name": "K10X",
                        "value": "3",
                        "textStyle": {
                            "color": "rgb(137,48,12)"
                        }
                    },
                    {
                        "name": "k10x",
                        "value": "7",
                        "textStyle": {
                            "color": "rgb(41,130,52)"
                        }
                    },
                    {
                        "name": "oopo",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(84,64,106)"
                        }
                    },
                    {
                        "name": "k9pro",
                        "value": "9",
                        "textStyle": {
                            "color": "rgb(89,21,105)"
                        }
                    },
                    {
                        "name": "\u6d3b\u529b",
                        "value": "7",
                        "textStyle": {
                            "color": "rgb(33,75,68)"
                        }
                    },
                    {
                        "name": "X27",
                        "value": "3",
                        "textStyle": {
                            "color": "rgb(135,115,143)"
                        }
                    },
                    {
                        "name": "vivoX21",
                        "value": "3",
                        "textStyle": {
                            "color": "rgb(96,66,144)"
                        }
                    },
                    {
                        "name": "X23",
                        "value": "4",
                        "textStyle": {
                            "color": "rgb(8,73,90)"
                        }
                    },
                    {
                        "name": "Y97",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(25,100,62)"
                        }
                    },
                    {
                        "name": "X20",
                        "value": "7",
                        "textStyle": {
                            "color": "rgb(80,139,132)"
                        }
                    },
                    {
                        "name": "60SE",
                        "value": "7",
                        "textStyle": {
                            "color": "rgb(68,78,57)"
                        }
                    },
                    {
                        "name": "60pro",
                        "value": "4",
                        "textStyle": {
                            "color": "rgb(90,123,147)"
                        }
                    },
                    {
                        "name": "\u5e97\u5b98",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(158,141,95)"
                        }
                    },
                    {
                        "name": "\u65d7\u65b9\u7f51",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(27,31,30)"
                        }
                    },
                    {
                        "name": "nova9pro",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(49,133,89)"
                        }
                    },
                    {
                        "name": "\u9ad8\u7aef",
                        "value": "9",
                        "textStyle": {
                            "color": "rgb(119,45,89)"
                        }
                    },
                    {
                        "name": "viipoo",
                        "value": "5",
                        "textStyle": {
                            "color": "rgb(126,75,115)"
                        }
                    },
                    {
                        "name": "\u7ade\u7545",
                        "value": "3",
                        "textStyle": {
                            "color": "rgb(22,84,106)"
                        }
                    },
                    {
                        "name": "\u5927\u578b",
                        "value": "3",
                        "textStyle": {
                            "color": "rgb(143,41,121)"
                        }
                    },
                    {
                        "name": "\u53cc\u5f85\u5168",
                        "value": "11",
                        "textStyle": {
                            "color": "rgb(57,108,153)"
                        }
                    },
                    {
                        "name": "\u667a\u9009",
                        "value": "5",
                        "textStyle": {
                            "color": "rgb(51,29,120)"
                        }
                    },
                    {
                        "name": "Hi",
                        "value": "4",
                        "textStyle": {
                            "color": "rgb(56,51,68)"
                        }
                    },
                    {
                        "name": "se",
                        "value": "6",
                        "textStyle": {
                            "color": "rgb(48,160,126)"
                        }
                    },
                    {
                        "name": "nova10",
                        "value": "11",
                        "textStyle": {
                            "color": "rgb(155,133,97)"
                        }
                    },
                    {
                        "name": "11Promax",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(104,98,41)"
                        }
                    },
                    {
                        "name": "reno9",
                        "value": "5",
                        "textStyle": {
                            "color": "rgb(39,13,100)"
                        }
                    },
                    {
                        "name": "14plusHuawei",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(36,24,57)"
                        }
                    },
                    {
                        "name": "30Pro5G",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(25,7,98)"
                        }
                    },
                    {
                        "name": "K60Pro",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(43,29,49)"
                        }
                    },
                    {
                        "name": "13proHONOR",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(35,86,52)"
                        }
                    },
                    {
                        "name": "7.45",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(160,86,106)"
                        }
                    },
                    {
                        "name": "mm",
                        "value": "6",
                        "textStyle": {
                            "color": "rgb(44,13,130)"
                        }
                    },
                    {
                        "name": "\u8bbe\u8ba1",
                        "value": "5",
                        "textStyle": {
                            "color": "rgb(140,31,150)"
                        }
                    },
                    {
                        "name": "X30HONOR",
                        "value": "3",
                        "textStyle": {
                            "color": "rgb(82,131,9)"
                        }
                    },
                    {
                        "name": "40",
                        "value": "16",
                        "textStyle": {
                            "color": "rgb(128,123,156)"
                        }
                    },
                    {
                        "name": "6000mAh",
                        "value": "6",
                        "textStyle": {
                            "color": "rgb(62,24,52)"
                        }
                    },
                    {
                        "name": "\u4e07\u8d85\u6e05",
                        "value": "8",
                        "textStyle": {
                            "color": "rgb(20,76,11)"
                        }
                    },
                    {
                        "name": "6.74",
                        "value": "4",
                        "textStyle": {
                            "color": "rgb(124,145,21)"
                        }
                    },
                    {
                        "name": "3020",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(83,148,138)"
                        }
                    },
                    {
                        "name": "K30",
                        "value": "5",
                        "textStyle": {
                            "color": "rgb(21,50,127)"
                        }
                    },
                    {
                        "name": "\u4e2d\u5c0f\u5b66\u751f",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(105,91,153)"
                        }
                    },
                    {
                        "name": "1052",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(52,19,124)"
                        }
                    },
                    {
                        "name": "1617OPPO",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(24,119,84)"
                        }
                    },
                    {
                        "name": "A1",
                        "value": "6",
                        "textStyle": {
                            "color": "rgb(134,120,38)"
                        }
                    },
                    {
                        "name": "a1proa96",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(49,62,107)"
                        }
                    },
                    {
                        "name": "50E",
                        "value": "3",
                        "textStyle": {
                            "color": "rgb(84,128,42)"
                        }
                    },
                    {
                        "name": "reno8reno7HUAWEI",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(33,28,147)"
                        }
                    },
                    {
                        "name": "Turbo",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(24,26,114)"
                        }
                    },
                    {
                        "name": "\u4e8c\u5341\u5206\u949f",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(53,146,31)"
                        }
                    },
                    {
                        "name": "\u6ee1\u7535",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(34,145,121)"
                        }
                    },
                    {
                        "name": "\u8ffd\u7126",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(68,144,8)"
                        }
                    },
                    {
                        "name": "\u53cc\u6444",
                        "value": "3",
                        "textStyle": {
                            "color": "rgb(104,7,98)"
                        }
                    },
                    {
                        "name": "\u8be6\u60c5",
                        "value": "8",
                        "textStyle": {
                            "color": "rgb(11,53,35)"
                        }
                    },
                    {
                        "name": "iqneo6",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(47,26,104)"
                        }
                    },
                    {
                        "name": "neo6se",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(137,124,14)"
                        }
                    },
                    {
                        "name": "iq00",
                        "value": "10",
                        "textStyle": {
                            "color": "rgb(159,49,75)"
                        }
                    },
                    {
                        "name": "510",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(21,16,84)"
                        }
                    },
                    {
                        "name": "k10",
                        "value": "3",
                        "textStyle": {
                            "color": "rgb(20,54,65)"
                        }
                    },
                    {
                        "name": "opp0",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(148,148,6)"
                        }
                    },
                    {
                        "name": "XR",
                        "value": "11",
                        "textStyle": {
                            "color": "rgb(73,159,105)"
                        }
                    },
                    {
                        "name": "xr",
                        "value": "11",
                        "textStyle": {
                            "color": "rgb(105,56,9)"
                        }
                    },
                    {
                        "name": "\u9001\u8c6a\u793c",
                        "value": "22",
                        "textStyle": {
                            "color": "rgb(155,26,146)"
                        }
                    },
                    {
                        "name": "4800",
                        "value": "7",
                        "textStyle": {
                            "color": "rgb(121,26,152)"
                        }
                    },
                    {
                        "name": "110",
                        "value": "5",
                        "textStyle": {
                            "color": "rgb(63,149,81)"
                        }
                    },
                    {
                        "name": "a32",
                        "value": "6",
                        "textStyle": {
                            "color": "rgb(141,61,32)"
                        }
                    },
                    {
                        "name": "a35",
                        "value": "5",
                        "textStyle": {
                            "color": "rgb(45,44,55)"
                        }
                    },
                    {
                        "name": "a11s",
                        "value": "4",
                        "textStyle": {
                            "color": "rgb(137,44,28)"
                        }
                    },
                    {
                        "name": "a93s",
                        "value": "3",
                        "textStyle": {
                            "color": "rgb(88,85,62)"
                        }
                    },
                    {
                        "name": "14ProMax",
                        "value": "6",
                        "textStyle": {
                            "color": "rgb(152,44,26)"
                        }
                    },
                    {
                        "name": "\u7d22\u7231",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(11,88,20)"
                        }
                    },
                    {
                        "name": "SA",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(26,43,117)"
                        }
                    },
                    {
                        "name": "Z9C",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(32,5,145)"
                        }
                    },
                    {
                        "name": "\u6000\u65e7",
                        "value": "3",
                        "textStyle": {
                            "color": "rgb(143,148,0)"
                        }
                    },
                    {
                        "name": "\u673a\u975e",
                        "value": "5",
                        "textStyle": {
                            "color": "rgb(116,120,23)"
                        }
                    },
                    {
                        "name": "\u5b89\u5353\u5168",
                        "value": "6",
                        "textStyle": {
                            "color": "rgb(10,73,43)"
                        }
                    },
                    {
                        "name": "\u6469\u6258\u7f57\u62c9",
                        "value": "18",
                        "textStyle": {
                            "color": "rgb(93,25,53)"
                        }
                    },
                    {
                        "name": "moto",
                        "value": "15",
                        "textStyle": {
                            "color": "rgb(122,119,107)"
                        }
                    },
                    {
                        "name": "edge",
                        "value": "6",
                        "textStyle": {
                            "color": "rgb(10,15,40)"
                        }
                    },
                    {
                        "name": "S30",
                        "value": "6",
                        "textStyle": {
                            "color": "rgb(22,126,104)"
                        }
                    },
                    {
                        "name": "888plus",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(59,47,11)"
                        }
                    },
                    {
                        "name": "W1",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(158,138,114)"
                        }
                    },
                    {
                        "name": "\u7248\u975e",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(46,39,33)"
                        }
                    },
                    {
                        "name": "Pro14",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(105,3,84)"
                        }
                    },
                    {
                        "name": "9pro",
                        "value": "5",
                        "textStyle": {
                            "color": "rgb(72,105,117)"
                        }
                    },
                    {
                        "name": "\u7206\u6b3e",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(123,53,65)"
                        }
                    },
                    {
                        "name": "\u70ed\u5356\u4e2d",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(132,120,146)"
                        }
                    },
                    {
                        "name": "SAILF",
                        "value": "3",
                        "textStyle": {
                            "color": "rgb(156,94,125)"
                        }
                    },
                    {
                        "name": "13Promax",
                        "value": "4",
                        "textStyle": {
                            "color": "rgb(6,9,125)"
                        }
                    },
                    {
                        "name": "\u7ade\u5b89\u5353",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(141,3,25)"
                        }
                    },
                    {
                        "name": "GMIUI",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(81,115,78)"
                        }
                    },
                    {
                        "name": "K60pro",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(84,88,115)"
                        }
                    },
                    {
                        "name": "\u884c\u8d27",
                        "value": "4",
                        "textStyle": {
                            "color": "rgb(62,59,13)"
                        }
                    },
                    {
                        "name": "14P",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(46,60,27)"
                        }
                    },
                    {
                        "name": "PM",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(116,113,36)"
                        }
                    },
                    {
                        "name": "E163K",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(51,28,86)"
                        }
                    },
                    {
                        "name": "\u5305\u90ae",
                        "value": "22",
                        "textStyle": {
                            "color": "rgb(53,91,18)"
                        }
                    },
                    {
                        "name": "\u65b9\u6b63",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(154,132,113)"
                        }
                    },
                    {
                        "name": "\u8d60\u9001",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(132,48,24)"
                        }
                    },
                    {
                        "name": "\u8bdd\u8d39",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(36,37,43)"
                        }
                    },
                    {
                        "name": "vivoy77",
                        "value": "7",
                        "textStyle": {
                            "color": "rgb(0,92,0)"
                        }
                    },
                    {
                        "name": "y77Apple",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(86,43,14)"
                        }
                    },
                    {
                        "name": "\u8d44\u6e90",
                        "value": "3",
                        "textStyle": {
                            "color": "rgb(103,157,103)"
                        }
                    },
                    {
                        "name": "\u5929\u6d25",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(21,19,74)"
                        }
                    },
                    {
                        "name": "vivoiQOOZ6xApple",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(143,1,3)"
                        }
                    },
                    {
                        "name": "\u9886\u5238",
                        "value": "14",
                        "textStyle": {
                            "color": "rgb(152,9,114)"
                        }
                    },
                    {
                        "name": "\u81f3\u9ad8",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(141,66,110)"
                        }
                    },
                    {
                        "name": "\u8df3\u8f6c",
                        "value": "3",
                        "textStyle": {
                            "color": "rgb(17,73,95)"
                        }
                    },
                    {
                        "name": "\u9886\u53d6",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(127,142,155)"
                        }
                    },
                    {
                        "name": "K9s",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(63,20,98)"
                        }
                    },
                    {
                        "name": "5goppo",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(154,19,145)"
                        }
                    },
                    {
                        "name": "oppok9prooppo",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(15,122,75)"
                        }
                    },
                    {
                        "name": "P40ProApple",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(78,117,51)"
                        }
                    },
                    {
                        "name": "13pro5G",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(82,160,135)"
                        }
                    },
                    {
                        "name": "13promax",
                        "value": "11",
                        "textStyle": {
                            "color": "rgb(102,112,89)"
                        }
                    },
                    {
                        "name": "K40",
                        "value": "14",
                        "textStyle": {
                            "color": "rgb(9,21,118)"
                        }
                    },
                    {
                        "name": "k40",
                        "value": "8",
                        "textStyle": {
                            "color": "rgb(136,34,142)"
                        }
                    },
                    {
                        "name": "\u589e\u5f3a\u7248",
                        "value": "13",
                        "textStyle": {
                            "color": "rgb(32,62,50)"
                        }
                    },
                    {
                        "name": "K40pro",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(142,87,113)"
                        }
                    },
                    {
                        "name": "redmik40vivo",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(60,37,102)"
                        }
                    },
                    {
                        "name": "Neo5S",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(144,121,36)"
                        }
                    },
                    {
                        "name": "neo5se",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(96,9,61)"
                        }
                    },
                    {
                        "name": "iq00neo5",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(139,136,104)"
                        }
                    },
                    {
                        "name": "NEO6",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(151,12,122)"
                        }
                    },
                    {
                        "name": "E506",
                        "value": "5",
                        "textStyle": {
                            "color": "rgb(141,91,146)"
                        }
                    },
                    {
                        "name": "\u5b88\u62a4",
                        "value": "4",
                        "textStyle": {
                            "color": "rgb(159,54,11)"
                        }
                    },
                    {
                        "name": "\u4e2d\u5174",
                        "value": "5",
                        "textStyle": {
                            "color": "rgb(52,147,158)"
                        }
                    },
                    {
                        "name": "\u7535\u8bdd",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(36,46,53)"
                        }
                    },
                    {
                        "name": "\u9752\u6625\u6d3b\u529b",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(147,4,91)"
                        }
                    },
                    {
                        "name": "9a9A",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(75,117,135)"
                        }
                    },
                    {
                        "name": "Play5T",
                        "value": "3",
                        "textStyle": {
                            "color": "rgb(69,26,82)"
                        }
                    },
                    {
                        "name": "6T",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(1,142,26)"
                        }
                    },
                    {
                        "name": "\u8d85\u5f3a",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(39,50,48)"
                        }
                    },
                    {
                        "name": "\u4fe1\u53f7",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(128,30,119)"
                        }
                    },
                    {
                        "name": "X40i",
                        "value": "13",
                        "textStyle": {
                            "color": "rgb(94,98,93)"
                        }
                    },
                    {
                        "name": "7.43",
                        "value": "3",
                        "textStyle": {
                            "color": "rgb(130,2,41)"
                        }
                    },
                    {
                        "name": "\u97f3\u4e50",
                        "value": "3",
                        "textStyle": {
                            "color": "rgb(121,155,54)"
                        }
                    },
                    {
                        "name": "30i",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(92,49,34)"
                        }
                    },
                    {
                        "name": "T12",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(76,8,119)"
                        }
                    },
                    {
                        "name": "\u5927\u4e09",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(68,44,54)"
                        }
                    },
                    {
                        "name": "1617OPPOA96",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(66,101,70)"
                        }
                    },
                    {
                        "name": "oppoa96",
                        "value": "3",
                        "textStyle": {
                            "color": "rgb(23,85,89)"
                        }
                    },
                    {
                        "name": "\u7a84\u8fb9",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(69,158,1)"
                        }
                    },
                    {
                        "name": "K40s",
                        "value": "12",
                        "textStyle": {
                            "color": "rgb(101,0,16)"
                        }
                    },
                    {
                        "name": "\u8d85\u5e7f\u89d2",
                        "value": "3",
                        "textStyle": {
                            "color": "rgb(35,10,158)"
                        }
                    },
                    {
                        "name": "470",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(102,132,20)"
                        }
                    },
                    {
                        "name": "\u6d59\u6c5f",
                        "value": "8",
                        "textStyle": {
                            "color": "rgb(5,15,61)"
                        }
                    },
                    {
                        "name": "\u79fb\u52a8\u7528\u6237",
                        "value": "8",
                        "textStyle": {
                            "color": "rgb(110,82,130)"
                        }
                    },
                    {
                        "name": "note11vivo",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(40,99,4)"
                        }
                    },
                    {
                        "name": "iqneo7",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(124,40,104)"
                        }
                    },
                    {
                        "name": "iq00neo7",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(96,46,53)"
                        }
                    },
                    {
                        "name": "realme10sMIUI",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(145,52,87)"
                        }
                    },
                    {
                        "name": "9HUAWEI",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(107,84,34)"
                        }
                    },
                    {
                        "name": "980",
                        "value": "11",
                        "textStyle": {
                            "color": "rgb(7,27,143)"
                        }
                    },
                    {
                        "name": "NFC",
                        "value": "8",
                        "textStyle": {
                            "color": "rgb(152,119,90)"
                        }
                    },
                    {
                        "name": "nova5i24",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(101,54,145)"
                        }
                    },
                    {
                        "name": "promaxApple",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(83,81,154)"
                        }
                    },
                    {
                        "name": "ProMax",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(7,6,17)"
                        }
                    },
                    {
                        "name": "vivoiqoo11pro",
                        "value": "4",
                        "textStyle": {
                            "color": "rgb(88,64,0)"
                        }
                    },
                    {
                        "name": "iqoo11",
                        "value": "8",
                        "textStyle": {
                            "color": "rgb(154,141,144)"
                        }
                    },
                    {
                        "name": "\u6210\u90fd",
                        "value": "3",
                        "textStyle": {
                            "color": "rgb(149,46,38)"
                        }
                    },
                    {
                        "name": "\u95ea\u9001",
                        "value": "5",
                        "textStyle": {
                            "color": "rgb(53,31,53)"
                        }
                    },
                    {
                        "name": "4g6.5",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(97,92,94)"
                        }
                    },
                    {
                        "name": "6.1",
                        "value": "6",
                        "textStyle": {
                            "color": "rgb(148,141,49)"
                        }
                    },
                    {
                        "name": "12Promax5G",
                        "value": "3",
                        "textStyle": {
                            "color": "rgb(11,110,132)"
                        }
                    },
                    {
                        "name": "\u8d60\u788e",
                        "value": "9",
                        "textStyle": {
                            "color": "rgb(123,77,114)"
                        }
                    },
                    {
                        "name": "Xiao",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(19,98,39)"
                        }
                    },
                    {
                        "name": "mi",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(66,11,106)"
                        }
                    },
                    {
                        "name": "9aApple",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(130,37,48)"
                        }
                    },
                    {
                        "name": "iphone11promax",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(13,23,81)"
                        }
                    },
                    {
                        "name": "S22",
                        "value": "20",
                        "textStyle": {
                            "color": "rgb(56,11,142)"
                        }
                    },
                    {
                        "name": "Ultra",
                        "value": "23",
                        "textStyle": {
                            "color": "rgb(97,114,57)"
                        }
                    },
                    {
                        "name": "SM",
                        "value": "56",
                        "textStyle": {
                            "color": "rgb(39,74,86)"
                        }
                    },
                    {
                        "name": "S9080",
                        "value": "5",
                        "textStyle": {
                            "color": "rgb(156,23,152)"
                        }
                    },
                    {
                        "name": "\u4e09\u7f51",
                        "value": "10",
                        "textStyle": {
                            "color": "rgb(78,132,118)"
                        }
                    },
                    {
                        "name": "s22",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(151,89,90)"
                        }
                    },
                    {
                        "name": "s23uSamsung",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(78,59,106)"
                        }
                    },
                    {
                        "name": "Fold4",
                        "value": "9",
                        "textStyle": {
                            "color": "rgb(32,122,151)"
                        }
                    },
                    {
                        "name": "F9360",
                        "value": "6",
                        "textStyle": {
                            "color": "rgb(79,57,121)"
                        }
                    },
                    {
                        "name": "iphonexs",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(65,151,96)"
                        }
                    },
                    {
                        "name": "Reno9Pro",
                        "value": "3",
                        "textStyle": {
                            "color": "rgb(10,6,35)"
                        }
                    },
                    {
                        "name": "opporeno9pro",
                        "value": "8",
                        "textStyle": {
                            "color": "rgb(22,117,117)"
                        }
                    },
                    {
                        "name": "reno7",
                        "value": "5",
                        "textStyle": {
                            "color": "rgb(71,112,87)"
                        }
                    },
                    {
                        "name": "0ppo8pro",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(128,81,96)"
                        }
                    },
                    {
                        "name": "A93s",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(69,70,100)"
                        }
                    },
                    {
                        "name": "650",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(65,81,6)"
                        }
                    },
                    {
                        "name": "gt",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(32,41,120)"
                        }
                    },
                    {
                        "name": "neo3",
                        "value": "3",
                        "textStyle": {
                            "color": "rgb(69,36,116)"
                        }
                    },
                    {
                        "name": "\u5e97\u540c\u6b3e",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(53,58,42)"
                        }
                    },
                    {
                        "name": "P30",
                        "value": "10",
                        "textStyle": {
                            "color": "rgb(103,17,101)"
                        }
                    },
                    {
                        "name": "PRO",
                        "value": "12",
                        "textStyle": {
                            "color": "rgb(131,37,97)"
                        }
                    },
                    {
                        "name": "\u5c4f\u53cc\u5361",
                        "value": "6",
                        "textStyle": {
                            "color": "rgb(68,39,10)"
                        }
                    },
                    {
                        "name": "i13",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(29,59,72)"
                        }
                    },
                    {
                        "name": "vivoApple",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(74,159,151)"
                        }
                    },
                    {
                        "name": "minipromax",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(116,68,36)"
                        }
                    },
                    {
                        "name": "C9",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(118,104,27)"
                        }
                    },
                    {
                        "name": "\u5929\u7ffc",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(2,100,48)"
                        }
                    },
                    {
                        "name": "note10pro2023",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(48,150,136)"
                        }
                    },
                    {
                        "name": "x70Pro",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(90,48,104)"
                        }
                    },
                    {
                        "name": "\u53ef\u4eab",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(39,27,81)"
                        }
                    },
                    {
                        "name": "\u5e74\u788e",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(63,1,42)"
                        }
                    },
                    {
                        "name": "\u9632\u6c34",
                        "value": "7",
                        "textStyle": {
                            "color": "rgb(120,73,89)"
                        }
                    },
                    {
                        "name": "Typec",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(35,58,36)"
                        }
                    },
                    {
                        "name": "\u63a5\u53e3",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(153,113,73)"
                        }
                    },
                    {
                        "name": "A5",
                        "value": "3",
                        "textStyle": {
                            "color": "rgb(104,97,117)"
                        }
                    },
                    {
                        "name": "\u673a\u5927",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(152,90,95)"
                        }
                    },
                    {
                        "name": "64G",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(26,22,85)"
                        }
                    },
                    {
                        "name": "360OS",
                        "value": "3",
                        "textStyle": {
                            "color": "rgb(76,109,88)"
                        }
                    },
                    {
                        "name": "\u5c11\u5e74",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(65,24,93)"
                        }
                    },
                    {
                        "name": "Q20",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(110,91,84)"
                        }
                    },
                    {
                        "name": "\u9752\u5c11\u5e74",
                        "value": "4",
                        "textStyle": {
                            "color": "rgb(134,124,84)"
                        }
                    },
                    {
                        "name": "\u5b66\u4e60\u7f51",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(85,115,152)"
                        }
                    },
                    {
                        "name": "\u7f51\u763e",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(20,84,97)"
                        }
                    },
                    {
                        "name": "\u5bb6\u957f",
                        "value": "4",
                        "textStyle": {
                            "color": "rgb(21,107,31)"
                        }
                    },
                    {
                        "name": "\u53ef\u63a7",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(21,37,126)"
                        }
                    },
                    {
                        "name": "\u5b66\u4e60",
                        "value": "9",
                        "textStyle": {
                            "color": "rgb(67,108,18)"
                        }
                    },
                    {
                        "name": "\u540d\u5e08",
                        "value": "4",
                        "textStyle": {
                            "color": "rgb(159,159,145)"
                        }
                    },
                    {
                        "name": "\u8bfe\u5802",
                        "value": "4",
                        "textStyle": {
                            "color": "rgb(19,119,124)"
                        }
                    },
                    {
                        "name": "k50Pro",
                        "value": "4",
                        "textStyle": {
                            "color": "rgb(73,117,70)"
                        }
                    },
                    {
                        "name": "\u9886\u5238\u4eab",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(42,10,68)"
                        }
                    },
                    {
                        "name": "12Apple",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(60,116,137)"
                        }
                    },
                    {
                        "name": "\u9762\u5bb9",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(57,104,35)"
                        }
                    },
                    {
                        "name": "\u5f00\u5c01",
                        "value": "5",
                        "textStyle": {
                            "color": "rgb(32,39,59)"
                        }
                    },
                    {
                        "name": "vivox90",
                        "value": "11",
                        "textStyle": {
                            "color": "rgb(4,154,123)"
                        }
                    },
                    {
                        "name": "vivoX90",
                        "value": "3",
                        "textStyle": {
                            "color": "rgb(158,88,69)"
                        }
                    },
                    {
                        "name": "vivoX80",
                        "value": "5",
                        "textStyle": {
                            "color": "rgb(51,115,23)"
                        }
                    },
                    {
                        "name": "X70",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(11,8,24)"
                        }
                    },
                    {
                        "name": "typec",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(107,82,156)"
                        }
                    },
                    {
                        "name": "8A",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(35,130,134)"
                        }
                    },
                    {
                        "name": "7a",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(90,15,61)"
                        }
                    },
                    {
                        "name": "vivos15pro",
                        "value": "3",
                        "textStyle": {
                            "color": "rgb(9,43,80)"
                        }
                    },
                    {
                        "name": "s12",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(20,102,8)"
                        }
                    },
                    {
                        "name": "\u5eb7\u4f73",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(6,88,12)"
                        }
                    },
                    {
                        "name": "U18",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(122,150,89)"
                        }
                    },
                    {
                        "name": "Q5",
                        "value": "6",
                        "textStyle": {
                            "color": "rgb(96,140,81)"
                        }
                    },
                    {
                        "name": "\u6beb\u5b89",
                        "value": "6",
                        "textStyle": {
                            "color": "rgb(139,112,32)"
                        }
                    },
                    {
                        "name": "realmeq5",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(124,139,0)"
                        }
                    },
                    {
                        "name": "F21Pro",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(145,88,78)"
                        }
                    },
                    {
                        "name": "\u8fdc\u7a0b",
                        "value": "3",
                        "textStyle": {
                            "color": "rgb(105,33,25)"
                        }
                    },
                    {
                        "name": "\u63a7\u5236",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(138,128,77)"
                        }
                    },
                    {
                        "name": "\u8003\u7814",
                        "value": "3",
                        "textStyle": {
                            "color": "rgb(150,156,83)"
                        }
                    },
                    {
                        "name": "K60e",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(45,137,67)"
                        }
                    },
                    {
                        "name": "780G",
                        "value": "4",
                        "textStyle": {
                            "color": "rgb(141,2,135)"
                        }
                    },
                    {
                        "name": "5GHONOR",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(10,103,105)"
                        }
                    },
                    {
                        "name": "Magic4",
                        "value": "6",
                        "textStyle": {
                            "color": "rgb(103,78,128)"
                        }
                    },
                    {
                        "name": "\u6f5c\u671b",
                        "value": "4",
                        "textStyle": {
                            "color": "rgb(116,78,115)"
                        }
                    },
                    {
                        "name": "\u957f\u7126",
                        "value": "5",
                        "textStyle": {
                            "color": "rgb(73,127,76)"
                        }
                    },
                    {
                        "name": "\u9ad8\u9891",
                        "value": "4",
                        "textStyle": {
                            "color": "rgb(16,107,75)"
                        }
                    },
                    {
                        "name": "88VIP14",
                        "value": "3",
                        "textStyle": {
                            "color": "rgb(127,61,100)"
                        }
                    },
                    {
                        "name": "reno7HUAWEI",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(105,124,136)"
                        }
                    },
                    {
                        "name": "P50E",
                        "value": "3",
                        "textStyle": {
                            "color": "rgb(58,13,135)"
                        }
                    },
                    {
                        "name": "8000",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(45,136,7)"
                        }
                    },
                    {
                        "name": "100W",
                        "value": "6",
                        "textStyle": {
                            "color": "rgb(80,102,93)"
                        }
                    },
                    {
                        "name": "iqooneo6pro",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(53,7,30)"
                        }
                    },
                    {
                        "name": "vivoiqooneo6",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(35,124,35)"
                        }
                    },
                    {
                        "name": "iqoo6",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(153,145,60)"
                        }
                    },
                    {
                        "name": "\u9753\u58f3",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(76,55,158)"
                        }
                    },
                    {
                        "name": "Pocket",
                        "value": "3",
                        "textStyle": {
                            "color": "rgb(62,152,18)"
                        }
                    },
                    {
                        "name": "\u65f6\u5c1a",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(106,104,35)"
                        }
                    },
                    {
                        "name": "\u591a\u5f69",
                        "value": "3",
                        "textStyle": {
                            "color": "rgb(9,34,101)"
                        }
                    },
                    {
                        "name": "\u6444\u81ea",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(44,157,83)"
                        }
                    },
                    {
                        "name": "\u767e\u5408",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(149,155,111)"
                        }
                    },
                    {
                        "name": "BIHEE",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(38,91,4)"
                        }
                    },
                    {
                        "name": "C20A",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(135,92,87)"
                        }
                    },
                    {
                        "name": "\u624b\u73af",
                        "value": "3",
                        "textStyle": {
                            "color": "rgb(150,129,0)"
                        }
                    },
                    {
                        "name": "x30i",
                        "value": "7",
                        "textStyle": {
                            "color": "rgb(89,14,7)"
                        }
                    },
                    {
                        "name": "x20",
                        "value": "3",
                        "textStyle": {
                            "color": "rgb(41,11,68)"
                        }
                    },
                    {
                        "name": "x30",
                        "value": "12",
                        "textStyle": {
                            "color": "rgb(154,30,105)"
                        }
                    },
                    {
                        "name": "60Pro",
                        "value": "6",
                        "textStyle": {
                            "color": "rgb(108,81,138)"
                        }
                    },
                    {
                        "name": "50pro24",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(144,112,151)"
                        }
                    },
                    {
                        "name": "x90pro",
                        "value": "6",
                        "textStyle": {
                            "color": "rgb(31,145,158)"
                        }
                    },
                    {
                        "name": "vivox90pro",
                        "value": "6",
                        "textStyle": {
                            "color": "rgb(42,85,55)"
                        }
                    },
                    {
                        "name": "9200",
                        "value": "14",
                        "textStyle": {
                            "color": "rgb(57,122,140)"
                        }
                    },
                    {
                        "name": "U21",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(109,15,120)"
                        }
                    },
                    {
                        "name": "\u53cc\u5361\u56fd\u884c",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(117,97,95)"
                        }
                    },
                    {
                        "name": "11promaxMIUI",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(158,101,107)"
                        }
                    },
                    {
                        "name": "1200",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(69,53,91)"
                        }
                    },
                    {
                        "name": "\u5b89\u5353\u9a81\u9f99",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(151,127,43)"
                        }
                    },
                    {
                        "name": "W23",
                        "value": "4",
                        "textStyle": {
                            "color": "rgb(93,0,21)"
                        }
                    },
                    {
                        "name": "\u5fc3\u7cfb",
                        "value": "5",
                        "textStyle": {
                            "color": "rgb(45,32,80)"
                        }
                    },
                    {
                        "name": "\u5929\u4e0b",
                        "value": "5",
                        "textStyle": {
                            "color": "rgb(153,116,132)"
                        }
                    },
                    {
                        "name": "\u516b\u6838",
                        "value": "10",
                        "textStyle": {
                            "color": "rgb(48,98,0)"
                        }
                    },
                    {
                        "name": "\u53cc\u5361\u9001",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(150,83,38)"
                        }
                    },
                    {
                        "name": "E109",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(17,71,46)"
                        }
                    },
                    {
                        "name": "\u5c1d\u9c9c",
                        "value": "3",
                        "textStyle": {
                            "color": "rgb(140,79,126)"
                        }
                    },
                    {
                        "name": "\u9884\u5b9a",
                        "value": "3",
                        "textStyle": {
                            "color": "rgb(132,80,82)"
                        }
                    },
                    {
                        "name": "S23",
                        "value": "3",
                        "textStyle": {
                            "color": "rgb(9,39,96)"
                        }
                    },
                    {
                        "name": "550",
                        "value": "5",
                        "textStyle": {
                            "color": "rgb(10,106,38)"
                        }
                    },
                    {
                        "name": "80pro",
                        "value": "12",
                        "textStyle": {
                            "color": "rgb(155,149,115)"
                        }
                    },
                    {
                        "name": "S80",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(21,66,93)"
                        }
                    },
                    {
                        "name": "Promax5G",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(111,87,53)"
                        }
                    },
                    {
                        "name": "14Promax",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(131,95,143)"
                        }
                    },
                    {
                        "name": "\u5341\u56db",
                        "value": "3",
                        "textStyle": {
                            "color": "rgb(86,111,45)"
                        }
                    },
                    {
                        "name": "meizu",
                        "value": "4",
                        "textStyle": {
                            "color": "rgb(78,160,73)"
                        }
                    },
                    {
                        "name": "\u9b45\u65cf",
                        "value": "15",
                        "textStyle": {
                            "color": "rgb(140,19,152)"
                        }
                    },
                    {
                        "name": "18s",
                        "value": "3",
                        "textStyle": {
                            "color": "rgb(110,107,48)"
                        }
                    },
                    {
                        "name": "nova9Pro",
                        "value": "3",
                        "textStyle": {
                            "color": "rgb(18,90,145)"
                        }
                    },
                    {
                        "name": "9se",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(130,31,93)"
                        }
                    },
                    {
                        "name": "350",
                        "value": "7",
                        "textStyle": {
                            "color": "rgb(159,88,146)"
                        }
                    },
                    {
                        "name": "GT2",
                        "value": "4",
                        "textStyle": {
                            "color": "rgb(141,97,25)"
                        }
                    },
                    {
                        "name": "note10",
                        "value": "3",
                        "textStyle": {
                            "color": "rgb(116,28,39)"
                        }
                    },
                    {
                        "name": "\u7248\u5927\u5c4f",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(108,96,4)"
                        }
                    },
                    {
                        "name": "\u7535\u9738",
                        "value": "3",
                        "textStyle": {
                            "color": "rgb(68,134,17)"
                        }
                    },
                    {
                        "name": "60",
                        "value": "18",
                        "textStyle": {
                            "color": "rgb(9,80,109)"
                        }
                    },
                    {
                        "name": "SEHuawei",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(73,46,18)"
                        }
                    },
                    {
                        "name": "F7210",
                        "value": "8",
                        "textStyle": {
                            "color": "rgb(16,51,156)"
                        }
                    },
                    {
                        "name": "\u56db\u4ee3",
                        "value": "4",
                        "textStyle": {
                            "color": "rgb(56,61,38)"
                        }
                    },
                    {
                        "name": "\u8d60\u793c",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(157,66,23)"
                        }
                    },
                    {
                        "name": "NOTE9",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(39,107,82)"
                        }
                    },
                    {
                        "name": "acepro",
                        "value": "11",
                        "textStyle": {
                            "color": "rgb(160,148,105)"
                        }
                    },
                    {
                        "name": "\u793c\u54c1",
                        "value": "3",
                        "textStyle": {
                            "color": "rgb(79,156,28)"
                        }
                    },
                    {
                        "name": "X30i",
                        "value": "9",
                        "textStyle": {
                            "color": "rgb(141,34,9)"
                        }
                    },
                    {
                        "name": "4800W",
                        "value": "4",
                        "textStyle": {
                            "color": "rgb(149,50,113)"
                        }
                    },
                    {
                        "name": "mt50pro",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(82,145,141)"
                        }
                    },
                    {
                        "name": "Hello",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(59,131,146)"
                        }
                    },
                    {
                        "name": "Kitty",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(124,33,19)"
                        }
                    },
                    {
                        "name": "\u6f6e\u6d41",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(140,53,90)"
                        }
                    },
                    {
                        "name": "\u9650\u5b9a\u7248",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(3,81,106)"
                        }
                    },
                    {
                        "name": "Civi2",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(97,133,99)"
                        }
                    },
                    {
                        "name": "civi2",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(78,159,66)"
                        }
                    },
                    {
                        "name": "\u60c5\u4eba\u8282",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(26,44,57)"
                        }
                    },
                    {
                        "name": "2127HONOR",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(60,160,7)"
                        }
                    },
                    {
                        "name": "oppok9xHONOR",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(18,144,26)"
                        }
                    },
                    {
                        "name": "\u72ec\u7acb",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(144,32,3)"
                        }
                    },
                    {
                        "name": "\u5c4f\u76f4",
                        "value": "3",
                        "textStyle": {
                            "color": "rgb(40,46,74)"
                        }
                    },
                    {
                        "name": "\u8c6a\u793c",
                        "value": "9",
                        "textStyle": {
                            "color": "rgb(2,97,18)"
                        }
                    },
                    {
                        "name": "\u9996\u9009",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(93,129,113)"
                        }
                    },
                    {
                        "name": "\u7b2c\u4e09\u4ee3",
                        "value": "6",
                        "textStyle": {
                            "color": "rgb(116,34,152)"
                        }
                    },
                    {
                        "name": "se3",
                        "value": "4",
                        "textStyle": {
                            "color": "rgb(55,145,96)"
                        }
                    },
                    {
                        "name": "12mini",
                        "value": "4",
                        "textStyle": {
                            "color": "rgb(29,113,96)"
                        }
                    },
                    {
                        "name": "\u534a\u5e74",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(18,6,47)"
                        }
                    },
                    {
                        "name": "\u5ef6\u4fdd",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(16,44,81)"
                        }
                    },
                    {
                        "name": "\u5929\u9645",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(133,102,72)"
                        }
                    },
                    {
                        "name": "\u9650\u91cf",
                        "value": "9",
                        "textStyle": {
                            "color": "rgb(160,109,102)"
                        }
                    },
                    {
                        "name": "\u9001\u5feb",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(152,58,10)"
                        }
                    },
                    {
                        "name": "\u5145\u7ebf",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(67,123,116)"
                        }
                    },
                    {
                        "name": "note12pro12",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(118,30,111)"
                        }
                    },
                    {
                        "name": "50Pro5G",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(134,114,142)"
                        }
                    },
                    {
                        "name": "\u54c1\u5e97",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(87,82,95)"
                        }
                    },
                    {
                        "name": "10a",
                        "value": "6",
                        "textStyle": {
                            "color": "rgb(93,5,81)"
                        }
                    },
                    {
                        "name": "HuaWei",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(36,4,61)"
                        }
                    },
                    {
                        "name": "mate",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(101,141,24)"
                        }
                    },
                    {
                        "name": "ProHuawei",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(115,140,9)"
                        }
                    },
                    {
                        "name": "66w",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(104,68,98)"
                        }
                    },
                    {
                        "name": "0ppok10pro",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(129,156,63)"
                        }
                    },
                    {
                        "name": "7vivo",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(83,130,143)"
                        }
                    },
                    {
                        "name": "\u53cc\u7535\u82af",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(150,12,148)"
                        }
                    },
                    {
                        "name": "80W",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(123,41,70)"
                        }
                    },
                    {
                        "name": "6400",
                        "value": "4",
                        "textStyle": {
                            "color": "rgb(131,12,23)"
                        }
                    },
                    {
                        "name": "OIS",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(115,116,107)"
                        }
                    },
                    {
                        "name": "\u5149\u5b66",
                        "value": "3",
                        "textStyle": {
                            "color": "rgb(124,72,35)"
                        }
                    },
                    {
                        "name": "\u9632\u6296",
                        "value": "3",
                        "textStyle": {
                            "color": "rgb(95,56,126)"
                        }
                    },
                    {
                        "name": "Z6X",
                        "value": "3",
                        "textStyle": {
                            "color": "rgb(153,134,87)"
                        }
                    },
                    {
                        "name": "promax",
                        "value": "5",
                        "textStyle": {
                            "color": "rgb(126,31,123)"
                        }
                    },
                    {
                        "name": "12miniMate30Pro",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(92,19,155)"
                        }
                    },
                    {
                        "name": "RS",
                        "value": "6",
                        "textStyle": {
                            "color": "rgb(119,63,126)"
                        }
                    },
                    {
                        "name": "\u5b57\u5927\u5c4f",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(19,107,68)"
                        }
                    },
                    {
                        "name": "\u8bfa\u4e9a",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(4,116,157)"
                        }
                    },
                    {
                        "name": "Note9",
                        "value": "4",
                        "textStyle": {
                            "color": "rgb(28,109,20)"
                        }
                    },
                    {
                        "name": "note12Apple",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(81,44,126)"
                        }
                    },
                    {
                        "name": "\u7acb\u6b63",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(102,21,104)"
                        }
                    },
                    {
                        "name": "\u54c1\u5fae\u4fe1",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(35,44,156)"
                        }
                    },
                    {
                        "name": "\u624b\u5199",
                        "value": "4",
                        "textStyle": {
                            "color": "rgb(115,128,126)"
                        }
                    },
                    {
                        "name": "\u58f0\u5c4f",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(74,120,10)"
                        }
                    },
                    {
                        "name": "\u5b89\u5353\u534a",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(0,5,105)"
                        }
                    },
                    {
                        "name": "Type",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(125,52,140)"
                        }
                    },
                    {
                        "name": "T2x",
                        "value": "3",
                        "textStyle": {
                            "color": "rgb(57,121,61)"
                        }
                    },
                    {
                        "name": "\u9ad8\u6027\u80fd",
                        "value": "4",
                        "textStyle": {
                            "color": "rgb(20,20,4)"
                        }
                    },
                    {
                        "name": "\u9ea6\u8292",
                        "value": "5",
                        "textStyle": {
                            "color": "rgb(160,7,121)"
                        }
                    },
                    {
                        "name": "240",
                        "value": "6",
                        "textStyle": {
                            "color": "rgb(36,58,133)"
                        }
                    },
                    {
                        "name": "y73t",
                        "value": "3",
                        "textStyle": {
                            "color": "rgb(57,57,44)"
                        }
                    },
                    {
                        "name": "vivoy73t",
                        "value": "3",
                        "textStyle": {
                            "color": "rgb(20,8,3)"
                        }
                    },
                    {
                        "name": "vivi",
                        "value": "5",
                        "textStyle": {
                            "color": "rgb(148,102,98)"
                        }
                    },
                    {
                        "name": "8000max",
                        "value": "3",
                        "textStyle": {
                            "color": "rgb(151,120,130)"
                        }
                    },
                    {
                        "name": "oppok10",
                        "value": "8",
                        "textStyle": {
                            "color": "rgb(55,73,88)"
                        }
                    },
                    {
                        "name": "S10",
                        "value": "7",
                        "textStyle": {
                            "color": "rgb(100,81,19)"
                        }
                    },
                    {
                        "name": "G9750",
                        "value": "4",
                        "textStyle": {
                            "color": "rgb(160,48,78)"
                        }
                    },
                    {
                        "name": "s10plus",
                        "value": "3",
                        "textStyle": {
                            "color": "rgb(159,62,88)"
                        }
                    },
                    {
                        "name": "4G2022",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(147,106,78)"
                        }
                    },
                    {
                        "name": "Pen",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(51,53,128)"
                        }
                    },
                    {
                        "name": "\u4e66\u5199",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(63,29,90)"
                        }
                    },
                    {
                        "name": "V3",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(108,141,116)"
                        }
                    },
                    {
                        "name": "V3ie",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(149,140,56)"
                        }
                    },
                    {
                        "name": "\u8001\u6b3e",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(128,127,159)"
                        }
                    },
                    {
                        "name": "855",
                        "value": "5",
                        "textStyle": {
                            "color": "rgb(123,137,3)"
                        }
                    },
                    {
                        "name": "g53",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(125,139,70)"
                        }
                    },
                    {
                        "name": "MIX",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(153,109,117)"
                        }
                    },
                    {
                        "name": "Fold2",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(31,160,139)"
                        }
                    },
                    {
                        "name": "\u793c\u76d2",
                        "value": "4",
                        "textStyle": {
                            "color": "rgb(24,151,50)"
                        }
                    },
                    {
                        "name": "Civi",
                        "value": "3",
                        "textStyle": {
                            "color": "rgb(74,135,14)"
                        }
                    },
                    {
                        "name": "1S",
                        "value": "3",
                        "textStyle": {
                            "color": "rgb(13,11,11)"
                        }
                    },
                    {
                        "name": "civi1s",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(129,134,49)"
                        }
                    },
                    {
                        "name": "V19",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(102,57,160)"
                        }
                    },
                    {
                        "name": "\u5361\u7247\u673a",
                        "value": "4",
                        "textStyle": {
                            "color": "rgb(77,105,8)"
                        }
                    },
                    {
                        "name": "X5",
                        "value": "3",
                        "textStyle": {
                            "color": "rgb(129,1,49)"
                        }
                    },
                    {
                        "name": "findx5",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(32,93,160)"
                        }
                    },
                    {
                        "name": "x3",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(28,121,147)"
                        }
                    },
                    {
                        "name": "k40s",
                        "value": "4",
                        "textStyle": {
                            "color": "rgb(17,19,82)"
                        }
                    },
                    {
                        "name": "K40S",
                        "value": "9",
                        "textStyle": {
                            "color": "rgb(154,154,57)"
                        }
                    },
                    {
                        "name": "miui14",
                        "value": "5",
                        "textStyle": {
                            "color": "rgb(77,16,60)"
                        }
                    },
                    {
                        "name": "xiaomi13Pro",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(65,114,105)"
                        }
                    },
                    {
                        "name": "oppoa1pro",
                        "value": "3",
                        "textStyle": {
                            "color": "rgb(24,88,32)"
                        }
                    },
                    {
                        "name": "a1pro",
                        "value": "4",
                        "textStyle": {
                            "color": "rgb(123,94,9)"
                        }
                    },
                    {
                        "name": "5ga93",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(97,91,158)"
                        }
                    },
                    {
                        "name": "a55s",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(79,49,2)"
                        }
                    },
                    {
                        "name": "20E",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(88,13,153)"
                        }
                    },
                    {
                        "name": "50pro",
                        "value": "5",
                        "textStyle": {
                            "color": "rgb(150,41,59)"
                        }
                    },
                    {
                        "name": "\u65e0\u7ebf",
                        "value": "9",
                        "textStyle": {
                            "color": "rgb(67,109,57)"
                        }
                    },
                    {
                        "name": "xiaomi13",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(31,105,87)"
                        }
                    },
                    {
                        "name": "V16",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(146,19,28)"
                        }
                    },
                    {
                        "name": "\u6444\u50cf",
                        "value": "4",
                        "textStyle": {
                            "color": "rgb(106,53,72)"
                        }
                    },
                    {
                        "name": "\u5b98\u65d7\u65b9",
                        "value": "3",
                        "textStyle": {
                            "color": "rgb(13,24,55)"
                        }
                    },
                    {
                        "name": "\u8230\u5e97",
                        "value": "3",
                        "textStyle": {
                            "color": "rgb(118,103,84)"
                        }
                    },
                    {
                        "name": "maxApple",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(107,18,106)"
                        }
                    },
                    {
                        "name": "13mini",
                        "value": "10",
                        "textStyle": {
                            "color": "rgb(101,154,147)"
                        }
                    },
                    {
                        "name": "vivos15s16pro",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(152,129,70)"
                        }
                    },
                    {
                        "name": "s16evivo",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(57,55,67)"
                        }
                    },
                    {
                        "name": "\u4e00\u5e74",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(97,119,121)"
                        }
                    },
                    {
                        "name": "\u81f3\u5c0a",
                        "value": "13",
                        "textStyle": {
                            "color": "rgb(108,41,65)"
                        }
                    },
                    {
                        "name": "\u4e00\u4ee3",
                        "value": "4",
                        "textStyle": {
                            "color": "rgb(75,150,13)"
                        }
                    },
                    {
                        "name": "5s",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(30,95,78)"
                        }
                    },
                    {
                        "name": "\u673a\u5168",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(8,79,68)"
                        }
                    },
                    {
                        "name": "\u5c0f\u5c4f",
                        "value": "6",
                        "textStyle": {
                            "color": "rgb(130,20,145)"
                        }
                    },
                    {
                        "name": "se1",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(49,78,119)"
                        }
                    },
                    {
                        "name": "Honor",
                        "value": "4",
                        "textStyle": {
                            "color": "rgb(153,50,98)"
                        }
                    },
                    {
                        "name": "p50",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(118,114,153)"
                        }
                    },
                    {
                        "name": "\u89c6\u89c9",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(34,57,44)"
                        }
                    },
                    {
                        "name": "\u591c\u62cd",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(45,131,21)"
                        }
                    },
                    {
                        "name": "\u8d85\u4eae",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(98,17,146)"
                        }
                    },
                    {
                        "name": "NOVA5",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(78,28,70)"
                        }
                    },
                    {
                        "name": "iPhone14plus",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(91,149,135)"
                        }
                    },
                    {
                        "name": "\u65e0\u7ebf\u8033\u673a",
                        "value": "4",
                        "textStyle": {
                            "color": "rgb(96,29,43)"
                        }
                    },
                    {
                        "name": "Plus66W",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(103,24,4)"
                        }
                    },
                    {
                        "name": "F22Pro",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(121,124,8)"
                        }
                    },
                    {
                        "name": "\u673a\u5fae\u4fe1",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(83,23,74)"
                        }
                    },
                    {
                        "name": "\u5c0f\u5b66",
                        "value": "4",
                        "textStyle": {
                            "color": "rgb(62,88,30)"
                        }
                    },
                    {
                        "name": "\u9ad8\u4e2d",
                        "value": "3",
                        "textStyle": {
                            "color": "rgb(73,159,90)"
                        }
                    },
                    {
                        "name": "\u5c0f\u7231",
                        "value": "5",
                        "textStyle": {
                            "color": "rgb(100,125,57)"
                        }
                    },
                    {
                        "name": "\u540c\u5b66",
                        "value": "5",
                        "textStyle": {
                            "color": "rgb(90,15,78)"
                        }
                    },
                    {
                        "name": "\u9ad8\u51cf",
                        "value": "7",
                        "textStyle": {
                            "color": "rgb(60,17,94)"
                        }
                    },
                    {
                        "name": "540",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(114,15,121)"
                        }
                    },
                    {
                        "name": "\u673a\u5173",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(18,137,107)"
                        }
                    },
                    {
                        "name": "Z5X",
                        "value": "5",
                        "textStyle": {
                            "color": "rgb(155,24,141)"
                        }
                    },
                    {
                        "name": "vivox21Apple",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(23,24,138)"
                        }
                    },
                    {
                        "name": "BS",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(131,56,110)"
                        }
                    },
                    {
                        "name": "play6tpro",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(160,89,2)"
                        }
                    },
                    {
                        "name": "pm",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(89,137,8)"
                        }
                    },
                    {
                        "name": "8puls",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(155,38,25)"
                        }
                    },
                    {
                        "name": "iphonexsmax",
                        "value": "4",
                        "textStyle": {
                            "color": "rgb(34,133,14)"
                        }
                    },
                    {
                        "name": "\u7f51\u8bfe",
                        "value": "8",
                        "textStyle": {
                            "color": "rgb(113,61,135)"
                        }
                    },
                    {
                        "name": "A3",
                        "value": "4",
                        "textStyle": {
                            "color": "rgb(32,116,63)"
                        }
                    },
                    {
                        "name": "L520",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(30,76,132)"
                        }
                    },
                    {
                        "name": "\u5f71\u97f3",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(106,37,54)"
                        }
                    },
                    {
                        "name": "Fold",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(155,10,92)"
                        }
                    },
                    {
                        "name": "\u65d7\u8230\u7ea7",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(73,41,20)"
                        }
                    },
                    {
                        "name": "xfold",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(55,120,70)"
                        }
                    },
                    {
                        "name": "\u4e07\u4e09\u6444",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(153,70,126)"
                        }
                    },
                    {
                        "name": "REDMI",
                        "value": "8",
                        "textStyle": {
                            "color": "rgb(135,10,89)"
                        }
                    },
                    {
                        "name": "80gt",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(149,4,55)"
                        }
                    },
                    {
                        "name": "80se",
                        "value": "3",
                        "textStyle": {
                            "color": "rgb(7,133,104)"
                        }
                    },
                    {
                        "name": "8012",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(50,100,145)"
                        }
                    },
                    {
                        "name": "nova10pro",
                        "value": "8",
                        "textStyle": {
                            "color": "rgb(131,35,69)"
                        }
                    },
                    {
                        "name": "\u53cc\u5361\u7535",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(132,155,127)"
                        }
                    },
                    {
                        "name": "\u6e38\u620f\u7f51",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(99,99,65)"
                        }
                    },
                    {
                        "name": "vivoMIUI",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(151,108,6)"
                        }
                    },
                    {
                        "name": "8a",
                        "value": "4",
                        "textStyle": {
                            "color": "rgb(79,108,112)"
                        }
                    },
                    {
                        "name": "note7",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(107,118,98)"
                        }
                    },
                    {
                        "name": "iqooneo5se",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(69,122,86)"
                        }
                    },
                    {
                        "name": "vivoz6x",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(142,94,34)"
                        }
                    },
                    {
                        "name": "iqoo5se",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(123,149,53)"
                        }
                    },
                    {
                        "name": "F93605GZfold4",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(135,23,156)"
                        }
                    },
                    {
                        "name": "iphone14pro",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(78,4,113)"
                        }
                    },
                    {
                        "name": "14provivo",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(50,28,65)"
                        }
                    },
                    {
                        "name": "iq10pro",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(100,142,70)"
                        }
                    },
                    {
                        "name": "iooq10",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(151,79,49)"
                        }
                    },
                    {
                        "name": "ipoo",
                        "value": "9",
                        "textStyle": {
                            "color": "rgb(79,85,97)"
                        }
                    },
                    {
                        "name": "12S",
                        "value": "7",
                        "textStyle": {
                            "color": "rgb(9,128,51)"
                        }
                    },
                    {
                        "name": "\u624b\u673a\u6e38\u620f",
                        "value": "6",
                        "textStyle": {
                            "color": "rgb(119,92,120)"
                        }
                    },
                    {
                        "name": "\u4e13\u4e1a",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(11,72,153)"
                        }
                    },
                    {
                        "name": "V99",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(50,9,95)"
                        }
                    },
                    {
                        "name": "\u552f\u5168",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(121,76,94)"
                        }
                    },
                    {
                        "name": "1617F21HONOR",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(14,129,117)"
                        }
                    },
                    {
                        "name": "\u5927\u989d",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(35,38,17)"
                        }
                    },
                    {
                        "name": "vivos16e",
                        "value": "5",
                        "textStyle": {
                            "color": "rgb(151,157,106)"
                        }
                    },
                    {
                        "name": "vovo",
                        "value": "9",
                        "textStyle": {
                            "color": "rgb(60,86,17)"
                        }
                    },
                    {
                        "name": "nova10OPPO",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(54,49,121)"
                        }
                    },
                    {
                        "name": "A58",
                        "value": "3",
                        "textStyle": {
                            "color": "rgb(93,104,79)"
                        }
                    },
                    {
                        "name": "oppoa58",
                        "value": "3",
                        "textStyle": {
                            "color": "rgb(119,50,27)"
                        }
                    },
                    {
                        "name": "\u9f9a\u4fca",
                        "value": "3",
                        "textStyle": {
                            "color": "rgb(51,99,62)"
                        }
                    },
                    {
                        "name": "70Apple",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(154,32,144)"
                        }
                    },
                    {
                        "name": "qpe",
                        "value": "4",
                        "textStyle": {
                            "color": "rgb(94,60,86)"
                        }
                    },
                    {
                        "name": "\u5361\u69fd",
                        "value": "4",
                        "textStyle": {
                            "color": "rgb(24,7,155)"
                        }
                    },
                    {
                        "name": "\u4ee3\u8d2d",
                        "value": "4",
                        "textStyle": {
                            "color": "rgb(145,93,38)"
                        }
                    },
                    {
                        "name": "iPhone11",
                        "value": "5",
                        "textStyle": {
                            "color": "rgb(10,82,120)"
                        }
                    },
                    {
                        "name": "11Pro",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(89,74,36)"
                        }
                    },
                    {
                        "name": "11pm",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(135,153,124)"
                        }
                    },
                    {
                        "name": "4GPhilips",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(16,31,116)"
                        }
                    },
                    {
                        "name": "\u521b\u60f3",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(69,27,85)"
                        }
                    },
                    {
                        "name": "\u7f8e\u6e2f",
                        "value": "3",
                        "textStyle": {
                            "color": "rgb(92,64,146)"
                        }
                    },
                    {
                        "name": "Note10",
                        "value": "9",
                        "textStyle": {
                            "color": "rgb(105,44,19)"
                        }
                    },
                    {
                        "name": "10Pro",
                        "value": "6",
                        "textStyle": {
                            "color": "rgb(59,120,108)"
                        }
                    },
                    {
                        "name": "note10pro",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(140,98,53)"
                        }
                    },
                    {
                        "name": "16",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(30,37,149)"
                        }
                    },
                    {
                        "name": "2719",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(150,83,9)"
                        }
                    },
                    {
                        "name": "\u5143\u8d77",
                        "value": "6",
                        "textStyle": {
                            "color": "rgb(15,134,148)"
                        }
                    },
                    {
                        "name": "aceprovivo",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(159,84,35)"
                        }
                    },
                    {
                        "name": "ipoo11",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(2,40,11)"
                        }
                    },
                    {
                        "name": "\u7075\u52a8",
                        "value": "16",
                        "textStyle": {
                            "color": "rgb(60,27,149)"
                        }
                    },
                    {
                        "name": "\u53d1\u53ef\u51cf",
                        "value": "3",
                        "textStyle": {
                            "color": "rgb(101,52,81)"
                        }
                    },
                    {
                        "name": "390",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(133,97,154)"
                        }
                    },
                    {
                        "name": "Note12Pro",
                        "value": "3",
                        "textStyle": {
                            "color": "rgb(118,128,149)"
                        }
                    },
                    {
                        "name": "note12Pro",
                        "value": "3",
                        "textStyle": {
                            "color": "rgb(52,125,65)"
                        }
                    },
                    {
                        "name": "Nubia",
                        "value": "4",
                        "textStyle": {
                            "color": "rgb(121,124,18)"
                        }
                    },
                    {
                        "name": "8SPro",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(139,26,148)"
                        }
                    },
                    {
                        "name": "165W",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(142,25,25)"
                        }
                    },
                    {
                        "name": "7Spro",
                        "value": "5",
                        "textStyle": {
                            "color": "rgb(92,112,16)"
                        }
                    },
                    {
                        "name": "950",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(131,27,132)"
                        }
                    },
                    {
                        "name": "5pro",
                        "value": "5",
                        "textStyle": {
                            "color": "rgb(44,51,117)"
                        }
                    },
                    {
                        "name": "4Rs",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(28,137,104)"
                        }
                    },
                    {
                        "name": "a36",
                        "value": "3",
                        "textStyle": {
                            "color": "rgb(149,42,11)"
                        }
                    },
                    {
                        "name": "mate50RS",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(111,121,28)"
                        }
                    },
                    {
                        "name": "mate50pro",
                        "value": "4",
                        "textStyle": {
                            "color": "rgb(43,113,149)"
                        }
                    },
                    {
                        "name": "mate50E",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(15,14,39)"
                        }
                    },
                    {
                        "name": "48",
                        "value": "5",
                        "textStyle": {
                            "color": "rgb(38,8,104)"
                        }
                    },
                    {
                        "name": "miui",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(146,30,95)"
                        }
                    },
                    {
                        "name": "40plus",
                        "value": "4",
                        "textStyle": {
                            "color": "rgb(93,42,14)"
                        }
                    },
                    {
                        "name": "vivos16Pro",
                        "value": "4",
                        "textStyle": {
                            "color": "rgb(150,133,91)"
                        }
                    },
                    {
                        "name": "v70",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(106,158,159)"
                        }
                    },
                    {
                        "name": "\u5341\u76f4",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(10,113,56)"
                        }
                    },
                    {
                        "name": "\u7f51\u5168",
                        "value": "3",
                        "textStyle": {
                            "color": "rgb(33,48,126)"
                        }
                    },
                    {
                        "name": "Prohonor",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(136,130,44)"
                        }
                    },
                    {
                        "name": "128GB",
                        "value": "5",
                        "textStyle": {
                            "color": "rgb(7,78,37)"
                        }
                    },
                    {
                        "name": "F16",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(99,95,160)"
                        }
                    },
                    {
                        "name": "play6tPro",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(144,119,65)"
                        }
                    },
                    {
                        "name": "5g0ppok10pro",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(97,57,89)"
                        }
                    },
                    {
                        "name": "7xSamsung",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(86,87,118)"
                        }
                    },
                    {
                        "name": "R15",
                        "value": "5",
                        "textStyle": {
                            "color": "rgb(31,102,58)"
                        }
                    },
                    {
                        "name": "1000",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(61,1,158)"
                        }
                    },
                    {
                        "name": "45W",
                        "value": "3",
                        "textStyle": {
                            "color": "rgb(26,50,116)"
                        }
                    },
                    {
                        "name": "Meizu",
                        "value": "4",
                        "textStyle": {
                            "color": "rgb(128,80,39)"
                        }
                    },
                    {
                        "name": "18X",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(156,140,4)"
                        }
                    },
                    {
                        "name": "18",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(77,18,73)"
                        }
                    },
                    {
                        "name": "\u5c01\u5b98",
                        "value": "3",
                        "textStyle": {
                            "color": "rgb(128,160,16)"
                        }
                    },
                    {
                        "name": "\u7eff\u8272",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(120,89,157)"
                        }
                    },
                    {
                        "name": "410",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(53,62,106)"
                        }
                    },
                    {
                        "name": "2389",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(70,55,139)"
                        }
                    },
                    {
                        "name": "vivoiqoo2022",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(17,68,61)"
                        }
                    },
                    {
                        "name": "W560",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(77,94,153)"
                        }
                    },
                    {
                        "name": "\u5b9a\u4f4d",
                        "value": "12",
                        "textStyle": {
                            "color": "rgb(53,82,148)"
                        }
                    },
                    {
                        "name": "K40Pro",
                        "value": "5",
                        "textStyle": {
                            "color": "rgb(154,150,37)"
                        }
                    },
                    {
                        "name": "x40vivo",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(5,33,26)"
                        }
                    },
                    {
                        "name": "vivoiqooz6",
                        "value": "5",
                        "textStyle": {
                            "color": "rgb(4,110,25)"
                        }
                    },
                    {
                        "name": "icoo",
                        "value": "6",
                        "textStyle": {
                            "color": "rgb(91,151,102)"
                        }
                    },
                    {
                        "name": "k10pro",
                        "value": "4",
                        "textStyle": {
                            "color": "rgb(75,29,76)"
                        }
                    },
                    {
                        "name": "k7x",
                        "value": "6",
                        "textStyle": {
                            "color": "rgb(11,111,39)"
                        }
                    },
                    {
                        "name": "K80",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(106,89,114)"
                        }
                    },
                    {
                        "name": "\u4e09\u9632\u975e",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(58,64,52)"
                        }
                    },
                    {
                        "name": "90Hz",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(98,105,118)"
                        }
                    },
                    {
                        "name": "\u5237\u65b0",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(65,148,64)"
                        }
                    },
                    {
                        "name": "9SE",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(2,37,7)"
                        }
                    },
                    {
                        "name": "\u8d85\u6e05",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(94,3,24)"
                        }
                    },
                    {
                        "name": "\u642d\u8f7d",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(131,62,126)"
                        }
                    },
                    {
                        "name": "XD4Apple",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(80,93,78)"
                        }
                    },
                    {
                        "name": "iPhone13",
                        "value": "4",
                        "textStyle": {
                            "color": "rgb(90,104,145)"
                        }
                    },
                    {
                        "name": "570",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(149,155,37)"
                        }
                    },
                    {
                        "name": "\u81f3\u81fb\u7248",
                        "value": "4",
                        "textStyle": {
                            "color": "rgb(150,34,75)"
                        }
                    },
                    {
                        "name": "3D",
                        "value": "4",
                        "textStyle": {
                            "color": "rgb(89,15,67)"
                        }
                    },
                    {
                        "name": "\u7eb3\u7c73",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(93,24,61)"
                        }
                    },
                    {
                        "name": "\u5fae\u6676",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(158,96,151)"
                        }
                    },
                    {
                        "name": "\u5916\u5c4f",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(110,125,56)"
                        }
                    },
                    {
                        "name": "x40gt",
                        "value": "3",
                        "textStyle": {
                            "color": "rgb(23,123,115)"
                        }
                    },
                    {
                        "name": "vivoiqoou5x",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(95,27,120)"
                        }
                    },
                    {
                        "name": "vivou5xiqu5iq00u5iqoou5x",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(122,120,10)"
                        }
                    },
                    {
                        "name": "x30Huawei",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(129,132,64)"
                        }
                    },
                    {
                        "name": "\u7f8e\u5b66",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(66,127,95)"
                        }
                    },
                    {
                        "name": "\u72ec\u5bb6",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(157,12,0)"
                        }
                    },
                    {
                        "name": "iPhone14ProMax",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(51,70,139)"
                        }
                    },
                    {
                        "name": "\u4e0a\u6d77",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(23,128,135)"
                        }
                    },
                    {
                        "name": "iPhone14proMIUI",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(51,85,65)"
                        }
                    },
                    {
                        "name": "9Apple",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(110,67,36)"
                        }
                    },
                    {
                        "name": "Y52s",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(69,109,98)"
                        }
                    },
                    {
                        "name": "5000w",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(103,25,92)"
                        }
                    },
                    {
                        "name": "44w",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(121,84,9)"
                        }
                    },
                    {
                        "name": "Y76",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(106,117,61)"
                        }
                    },
                    {
                        "name": "IQOO",
                        "value": "4",
                        "textStyle": {
                            "color": "rgb(10,21,55)"
                        }
                    },
                    {
                        "name": "IQOOZ5",
                        "value": "3",
                        "textStyle": {
                            "color": "rgb(74,6,111)"
                        }
                    },
                    {
                        "name": "vivoiqooz5x",
                        "value": "4",
                        "textStyle": {
                            "color": "rgb(80,101,4)"
                        }
                    },
                    {
                        "name": "Z5x",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(50,150,63)"
                        }
                    },
                    {
                        "name": "\u6e38\u620f\u673a",
                        "value": "7",
                        "textStyle": {
                            "color": "rgb(117,42,126)"
                        }
                    },
                    {
                        "name": "14por",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(97,32,155)"
                        }
                    },
                    {
                        "name": "Nova10",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(137,132,33)"
                        }
                    },
                    {
                        "name": "\u5b9d\u76d2",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(5,97,130)"
                        }
                    },
                    {
                        "name": "\u65e0\u7f1d",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(31,93,50)"
                        }
                    },
                    {
                        "name": "\u5149\u8c31",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(79,37,100)"
                        }
                    },
                    {
                        "name": "\u53ef\u6298\u53e0",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(83,105,107)"
                        }
                    },
                    {
                        "name": "vivoS15",
                        "value": "3",
                        "textStyle": {
                            "color": "rgb(89,50,133)"
                        }
                    },
                    {
                        "name": "S12pro",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(113,49,89)"
                        }
                    },
                    {
                        "name": "560",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(54,66,94)"
                        }
                    },
                    {
                        "name": "\u51a0\u519b",
                        "value": "4",
                        "textStyle": {
                            "color": "rgb(69,156,22)"
                        }
                    },
                    {
                        "name": "k50ultra",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(159,101,49)"
                        }
                    },
                    {
                        "name": "A97",
                        "value": "3",
                        "textStyle": {
                            "color": "rgb(64,80,70)"
                        }
                    },
                    {
                        "name": "a97",
                        "value": "4",
                        "textStyle": {
                            "color": "rgb(135,113,38)"
                        }
                    },
                    {
                        "name": "a96",
                        "value": "8",
                        "textStyle": {
                            "color": "rgb(134,99,39)"
                        }
                    },
                    {
                        "name": "S90",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(71,120,131)"
                        }
                    },
                    {
                        "name": "860",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(44,18,126)"
                        }
                    },
                    {
                        "name": "ProHUAWEI",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(146,47,51)"
                        }
                    },
                    {
                        "name": "P20",
                        "value": "5",
                        "textStyle": {
                            "color": "rgb(146,67,22)"
                        }
                    },
                    {
                        "name": "\u6ee1\u51cf",
                        "value": "5",
                        "textStyle": {
                            "color": "rgb(144,64,113)"
                        }
                    },
                    {
                        "name": "note11Xiaomi",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(89,53,30)"
                        }
                    },
                    {
                        "name": "K30pro",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(58,20,85)"
                        }
                    },
                    {
                        "name": "k30HONOR",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(118,157,66)"
                        }
                    },
                    {
                        "name": "\u9ad8\u7acb\u7701",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(89,152,85)"
                        }
                    },
                    {
                        "name": "\u63a2\u7d22",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(8,121,64)"
                        }
                    },
                    {
                        "name": "x7",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(13,125,101)"
                        }
                    },
                    {
                        "name": "\u5c4f\u6b3e",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(135,106,56)"
                        }
                    },
                    {
                        "name": "C30A",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(44,14,155)"
                        }
                    },
                    {
                        "name": "\u521b\u661f",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(73,15,47)"
                        }
                    },
                    {
                        "name": "\u5c4f\u5b89\u5353",
                        "value": "3",
                        "textStyle": {
                            "color": "rgb(133,67,114)"
                        }
                    },
                    {
                        "name": "\u53ef\u7528",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(45,134,34)"
                        }
                    },
                    {
                        "name": "ace5G",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(140,30,124)"
                        }
                    },
                    {
                        "name": "\u7ffb\u65b0",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(12,94,131)"
                        }
                    },
                    {
                        "name": "\u5b98\u7ffb\u673a",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(130,124,84)"
                        }
                    },
                    {
                        "name": "\u5c0f\u578b",
                        "value": "4",
                        "textStyle": {
                            "color": "rgb(3,100,112)"
                        }
                    },
                    {
                        "name": "\u53cc\u5927\u5c4f",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(154,118,96)"
                        }
                    },
                    {
                        "name": "\u652f\u4ed8\u5b9d",
                        "value": "3",
                        "textStyle": {
                            "color": "rgb(42,144,148)"
                        }
                    },
                    {
                        "name": "321",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(113,34,44)"
                        }
                    },
                    {
                        "name": "neo7se",
                        "value": "4",
                        "textStyle": {
                            "color": "rgb(7,108,51)"
                        }
                    },
                    {
                        "name": "NEO7SE",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(71,66,37)"
                        }
                    },
                    {
                        "name": "magicvsHuawei",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(55,37,126)"
                        }
                    },
                    {
                        "name": "P30Pro",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(124,147,61)"
                        }
                    },
                    {
                        "name": "\u83b1\u5361",
                        "value": "6",
                        "textStyle": {
                            "color": "rgb(128,98,45)"
                        }
                    },
                    {
                        "name": "12spro",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(74,36,115)"
                        }
                    },
                    {
                        "name": "x40XD4",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(71,68,53)"
                        }
                    },
                    {
                        "name": "xd4",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(51,133,113)"
                        }
                    },
                    {
                        "name": "\u7f51\u76f4",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(148,146,93)"
                        }
                    },
                    {
                        "name": "150",
                        "value": "4",
                        "textStyle": {
                            "color": "rgb(32,29,10)"
                        }
                    },
                    {
                        "name": "note11Tpro",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(42,9,6)"
                        }
                    },
                    {
                        "name": "9a",
                        "value": "8",
                        "textStyle": {
                            "color": "rgb(107,94,129)"
                        }
                    },
                    {
                        "name": "PlusApple",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(121,81,8)"
                        }
                    },
                    {
                        "name": "\u65e0\u9501\u5168",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(19,39,158)"
                        }
                    },
                    {
                        "name": "iphone7",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(140,23,51)"
                        }
                    },
                    {
                        "name": "P30pro",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(137,90,70)"
                        }
                    },
                    {
                        "name": "iPhone6",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(19,104,6)"
                        }
                    },
                    {
                        "name": "\u6539\u88c5",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(148,30,88)"
                        }
                    },
                    {
                        "name": "Note10Pro",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(92,122,30)"
                        }
                    },
                    {
                        "name": "1100",
                        "value": "3",
                        "textStyle": {
                            "color": "rgb(72,24,81)"
                        }
                    },
                    {
                        "name": "findx5x3",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(27,105,88)"
                        }
                    },
                    {
                        "name": "S16E",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(94,42,77)"
                        }
                    },
                    {
                        "name": "s15e",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(158,10,77)"
                        }
                    },
                    {
                        "name": "s16pro",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(93,140,23)"
                        }
                    },
                    {
                        "name": "opporeno8",
                        "value": "7",
                        "textStyle": {
                            "color": "rgb(19,127,5)"
                        }
                    },
                    {
                        "name": "8pro",
                        "value": "3",
                        "textStyle": {
                            "color": "rgb(51,156,79)"
                        }
                    },
                    {
                        "name": "nova6",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(21,46,102)"
                        }
                    },
                    {
                        "name": "5i",
                        "value": "4",
                        "textStyle": {
                            "color": "rgb(124,29,112)"
                        }
                    },
                    {
                        "name": "redmi9a2023",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(157,99,13)"
                        }
                    },
                    {
                        "name": "80pro5g",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(12,135,30)"
                        }
                    },
                    {
                        "name": "7plus7P",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(152,109,127)"
                        }
                    },
                    {
                        "name": "520",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(142,114,9)"
                        }
                    },
                    {
                        "name": "note9",
                        "value": "6",
                        "textStyle": {
                            "color": "rgb(110,133,50)"
                        }
                    },
                    {
                        "name": "Redmi9A",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(30,17,38)"
                        }
                    },
                    {
                        "name": "M560C",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(118,148,22)"
                        }
                    },
                    {
                        "name": "\u4e2d\u8001\u5e74",
                        "value": "4",
                        "textStyle": {
                            "color": "rgb(53,69,105)"
                        }
                    },
                    {
                        "name": "PLUS",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(112,92,130)"
                        }
                    },
                    {
                        "name": "9S",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(128,137,73)"
                        }
                    },
                    {
                        "name": "230",
                        "value": "5",
                        "textStyle": {
                            "color": "rgb(50,33,77)"
                        }
                    },
                    {
                        "name": "vivoiqooz6x",
                        "value": "3",
                        "textStyle": {
                            "color": "rgb(55,118,10)"
                        }
                    },
                    {
                        "name": "iqo",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(66,12,53)"
                        }
                    },
                    {
                        "name": "z6",
                        "value": "7",
                        "textStyle": {
                            "color": "rgb(122,137,60)"
                        }
                    },
                    {
                        "name": "\u652f\u4ed8",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(13,153,22)"
                        }
                    },
                    {
                        "name": "\u65b0\u65d7\u8230",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(122,121,109)"
                        }
                    },
                    {
                        "name": "\u6027\u80fd",
                        "value": "4",
                        "textStyle": {
                            "color": "rgb(151,146,72)"
                        }
                    },
                    {
                        "name": "\u94c1\u4e09\u89d2",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(99,147,79)"
                        }
                    },
                    {
                        "name": "iPhone12Pro5g",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(7,151,120)"
                        }
                    },
                    {
                        "name": "12Pro",
                        "value": "5",
                        "textStyle": {
                            "color": "rgb(62,37,126)"
                        }
                    },
                    {
                        "name": "\u5de5\u5382",
                        "value": "5",
                        "textStyle": {
                            "color": "rgb(113,68,113)"
                        }
                    },
                    {
                        "name": "\u4fdd\u5bc6",
                        "value": "5",
                        "textStyle": {
                            "color": "rgb(81,102,112)"
                        }
                    },
                    {
                        "name": "neo6iq00",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(14,35,16)"
                        }
                    },
                    {
                        "name": "\u5218\u6d77",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(5,147,18)"
                        }
                    },
                    {
                        "name": "Play5",
                        "value": "3",
                        "textStyle": {
                            "color": "rgb(151,9,87)"
                        }
                    },
                    {
                        "name": "play6t",
                        "value": "4",
                        "textStyle": {
                            "color": "rgb(62,112,38)"
                        }
                    },
                    {
                        "name": "\u901a\u4fe1",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(66,96,132)"
                        }
                    },
                    {
                        "name": "\u4eac\u5408",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(142,154,37)"
                        }
                    },
                    {
                        "name": "30plusXiaomi",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(140,95,108)"
                        }
                    },
                    {
                        "name": "10S",
                        "value": "6",
                        "textStyle": {
                            "color": "rgb(94,116,118)"
                        }
                    },
                    {
                        "name": "11Apple",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(31,18,65)"
                        }
                    },
                    {
                        "name": "K9soppok9s",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(89,154,72)"
                        }
                    },
                    {
                        "name": "5Goppo",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(55,158,11)"
                        }
                    },
                    {
                        "name": "\u7ea2\u7c73\u5b89\u5353",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(82,47,120)"
                        }
                    },
                    {
                        "name": "80GT",
                        "value": "3",
                        "textStyle": {
                            "color": "rgb(119,47,0)"
                        }
                    },
                    {
                        "name": "razr",
                        "value": "4",
                        "textStyle": {
                            "color": "rgb(122,56,90)"
                        }
                    },
                    {
                        "name": "\u8f68\u51c6",
                        "value": "3",
                        "textStyle": {
                            "color": "rgb(33,92,84)"
                        }
                    },
                    {
                        "name": "\u955c\u9762",
                        "value": "4",
                        "textStyle": {
                            "color": "rgb(55,149,63)"
                        }
                    },
                    {
                        "name": "\u5200\u950b",
                        "value": "3",
                        "textStyle": {
                            "color": "rgb(91,14,7)"
                        }
                    },
                    {
                        "name": "\u4e16\u754c\u51a0\u519b",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(122,82,75)"
                        }
                    },
                    {
                        "name": "MT50",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(70,70,147)"
                        }
                    },
                    {
                        "name": "\u5143\u5927",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(68,31,55)"
                        }
                    },
                    {
                        "name": "reno9honor",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(67,38,2)"
                        }
                    },
                    {
                        "name": "paly6T",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(153,32,16)"
                        }
                    },
                    {
                        "name": "Paly5T",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(42,41,37)"
                        }
                    },
                    {
                        "name": "14plusApple",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(28,156,51)"
                        }
                    },
                    {
                        "name": "14pormax",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(153,86,49)"
                        }
                    },
                    {
                        "name": "\u65e0\u9501",
                        "value": "5",
                        "textStyle": {
                            "color": "rgb(145,61,115)"
                        }
                    },
                    {
                        "name": "\u6218\u795e",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(88,142,96)"
                        }
                    },
                    {
                        "name": "X30iApple",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(110,62,84)"
                        }
                    },
                    {
                        "name": "F11",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(116,45,59)"
                        }
                    },
                    {
                        "name": "iqooz6x",
                        "value": "8",
                        "textStyle": {
                            "color": "rgb(142,115,14)"
                        }
                    },
                    {
                        "name": "iqz6x",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(136,131,58)"
                        }
                    },
                    {
                        "name": "140",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(154,104,106)"
                        }
                    },
                    {
                        "name": "y32t",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(17,111,138)"
                        }
                    },
                    {
                        "name": "vivoy32t",
                        "value": "3",
                        "textStyle": {
                            "color": "rgb(86,128,48)"
                        }
                    },
                    {
                        "name": "vovi",
                        "value": "3",
                        "textStyle": {
                            "color": "rgb(3,8,87)"
                        }
                    },
                    {
                        "name": "viv0",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(80,66,115)"
                        }
                    },
                    {
                        "name": "vivoy32",
                        "value": "7",
                        "textStyle": {
                            "color": "rgb(127,153,5)"
                        }
                    },
                    {
                        "name": "\u53cc\u5361\u5168",
                        "value": "9",
                        "textStyle": {
                            "color": "rgb(132,72,15)"
                        }
                    },
                    {
                        "name": "\u4eff\u751f",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(128,148,81)"
                        }
                    },
                    {
                        "name": "\u5c9b\u7693\u8f69",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(41,145,141)"
                        }
                    },
                    {
                        "name": "i14",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(31,66,62)"
                        }
                    },
                    {
                        "name": "\u5c3a\u5bf8",
                        "value": "7",
                        "textStyle": {
                            "color": "rgb(96,114,37)"
                        }
                    },
                    {
                        "name": "\u7279\u5c0f",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(92,141,148)"
                        }
                    },
                    {
                        "name": "\u5fae\u578b",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(3,49,17)"
                        }
                    },
                    {
                        "name": "\u7d22\u91ce",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(142,84,52)"
                        }
                    },
                    {
                        "name": "\u626b\u7801",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(29,60,58)"
                        }
                    },
                    {
                        "name": "oppoa97",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(30,12,8)"
                        }
                    },
                    {
                        "name": "7reno8pro",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(138,12,139)"
                        }
                    },
                    {
                        "name": "310",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(96,147,153)"
                        }
                    },
                    {
                        "name": "\u817e\u8baf",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(54,79,96)"
                        }
                    },
                    {
                        "name": "ROG6",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(64,147,91)"
                        }
                    },
                    {
                        "name": "6pro",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(87,88,9)"
                        }
                    },
                    {
                        "name": "\u534e\u7855",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(17,85,153)"
                        }
                    },
                    {
                        "name": "Gen1",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(17,21,3)"
                        }
                    },
                    {
                        "name": "\u6697\u9ed1",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(46,95,31)"
                        }
                    },
                    {
                        "name": "\u7834\u574f\u795e",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(96,117,94)"
                        }
                    },
                    {
                        "name": "165Hz",
                        "value": "4",
                        "textStyle": {
                            "color": "rgb(76,6,152)"
                        }
                    },
                    {
                        "name": "\u8d25\u5bb6",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(40,0,69)"
                        }
                    },
                    {
                        "name": "\u4e4b\u773c",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(111,95,82)"
                        }
                    },
                    {
                        "name": "\u56fd\u5ea6",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(5,128,1)"
                        }
                    },
                    {
                        "name": "2720",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(21,39,102)"
                        }
                    },
                    {
                        "name": "\u6280\u7248",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(89,132,100)"
                        }
                    },
                    {
                        "name": "T2",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(13,26,138)"
                        }
                    },
                    {
                        "name": "i14Pro",
                        "value": "3",
                        "textStyle": {
                            "color": "rgb(23,56,68)"
                        }
                    },
                    {
                        "name": "\u836f\u4e38",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(158,25,138)"
                        }
                    },
                    {
                        "name": "5gk9prok9sOPPO",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(119,28,132)"
                        }
                    },
                    {
                        "name": "A57",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(97,77,133)"
                        }
                    },
                    {
                        "name": "\u5de5\u4f5c\u5ba4",
                        "value": "3",
                        "textStyle": {
                            "color": "rgb(140,93,92)"
                        }
                    },
                    {
                        "name": "\u6027\u4ef7\u6bd4",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(141,150,52)"
                        }
                    },
                    {
                        "name": "iphone14plus",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(40,138,115)"
                        }
                    },
                    {
                        "name": "M90",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(158,139,24)"
                        }
                    },
                    {
                        "name": "\u624b\u673a\u5e97",
                        "value": "5",
                        "textStyle": {
                            "color": "rgb(112,112,135)"
                        }
                    },
                    {
                        "name": "iphonesse2",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(150,15,56)"
                        }
                    },
                    {
                        "name": "note9Pro",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(149,54,3)"
                        }
                    },
                    {
                        "name": "30Apple",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(81,111,5)"
                        }
                    },
                    {
                        "name": "\u53d1\u987a\u4e30",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(73,51,118)"
                        }
                    },
                    {
                        "name": "iPhone8Plus",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(71,61,12)"
                        }
                    },
                    {
                        "name": "ip8",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(135,60,114)"
                        }
                    },
                    {
                        "name": "8PLUS",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(85,114,7)"
                        }
                    },
                    {
                        "name": "18sPro",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(79,88,32)"
                        }
                    },
                    {
                        "name": "play6THONOR",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(109,30,30)"
                        }
                    },
                    {
                        "name": "Mate40",
                        "value": "6",
                        "textStyle": {
                            "color": "rgb(139,131,122)"
                        }
                    },
                    {
                        "name": "mate40",
                        "value": "3",
                        "textStyle": {
                            "color": "rgb(40,13,50)"
                        }
                    },
                    {
                        "name": "MP3",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(58,67,30)"
                        }
                    },
                    {
                        "name": "\u5c0f\u5b69",
                        "value": "3",
                        "textStyle": {
                            "color": "rgb(57,119,19)"
                        }
                    },
                    {
                        "name": "\u968f\u58f0",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(116,129,103)"
                        }
                    },
                    {
                        "name": "203",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(88,30,109)"
                        }
                    },
                    {
                        "name": "X13PRO",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(78,30,109)"
                        }
                    },
                    {
                        "name": "\u6c34\u6ef4",
                        "value": "3",
                        "textStyle": {
                            "color": "rgb(140,91,123)"
                        }
                    },
                    {
                        "name": "1050",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(127,104,112)"
                        }
                    },
                    {
                        "name": "iPhone13promax",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(42,95,28)"
                        }
                    },
                    {
                        "name": "16G",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(123,113,60)"
                        }
                    },
                    {
                        "name": "ace10",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(21,113,11)"
                        }
                    },
                    {
                        "name": "\u5de5\u4e1a",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(106,97,16)"
                        }
                    },
                    {
                        "name": "\u9632\u7206",
                        "value": "3",
                        "textStyle": {
                            "color": "rgb(81,50,21)"
                        }
                    },
                    {
                        "name": "\u77f3\u6cb9",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(127,11,120)"
                        }
                    },
                    {
                        "name": "\u7164\u77ff",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(160,65,22)"
                        }
                    },
                    {
                        "name": "\u5316\u5de5\u5382",
                        "value": "3",
                        "textStyle": {
                            "color": "rgb(67,65,100)"
                        }
                    },
                    {
                        "name": "70pro",
                        "value": "5",
                        "textStyle": {
                            "color": "rgb(94,29,77)"
                        }
                    },
                    {
                        "name": "ipooZ6",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(74,112,30)"
                        }
                    },
                    {
                        "name": "iq00z6",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(133,73,36)"
                        }
                    },
                    {
                        "name": "icooZ6",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(126,129,3)"
                        }
                    },
                    {
                        "name": "z6xZTE",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(23,51,97)"
                        }
                    },
                    {
                        "name": "K580",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(71,109,7)"
                        }
                    },
                    {
                        "name": "\u673a\u5e26",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(132,98,131)"
                        }
                    },
                    {
                        "name": "GPS",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(101,53,61)"
                        }
                    },
                    {
                        "name": "\u9632\u8d70",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(68,140,128)"
                        }
                    },
                    {
                        "name": "\u75f4\u5446",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(123,61,60)"
                        }
                    },
                    {
                        "name": "SOS",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(109,60,6)"
                        }
                    },
                    {
                        "name": "K199",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(93,7,103)"
                        }
                    },
                    {
                        "name": "\u5e7f\u7535",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(86,137,68)"
                        }
                    },
                    {
                        "name": "8X",
                        "value": "5",
                        "textStyle": {
                            "color": "rgb(100,147,25)"
                        }
                    },
                    {
                        "name": "Ktouch",
                        "value": "3",
                        "textStyle": {
                            "color": "rgb(129,134,25)"
                        }
                    },
                    {
                        "name": "I13",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(93,105,86)"
                        }
                    },
                    {
                        "name": "4.5",
                        "value": "5",
                        "textStyle": {
                            "color": "rgb(83,82,57)"
                        }
                    },
                    {
                        "name": "\u9ad8\u914d",
                        "value": "3",
                        "textStyle": {
                            "color": "rgb(8,20,131)"
                        }
                    },
                    {
                        "name": "1s",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(66,111,99)"
                        }
                    },
                    {
                        "name": "\u8f66\u95f4",
                        "value": "4",
                        "textStyle": {
                            "color": "rgb(5,3,79)"
                        }
                    },
                    {
                        "name": "\u7834\u89e3",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(134,27,2)"
                        }
                    },
                    {
                        "name": "\u54c1\u8d28",
                        "value": "4",
                        "textStyle": {
                            "color": "rgb(51,62,156)"
                        }
                    },
                    {
                        "name": "\u4fdd\u969c",
                        "value": "3",
                        "textStyle": {
                            "color": "rgb(81,98,40)"
                        }
                    },
                    {
                        "name": "z5",
                        "value": "3",
                        "textStyle": {
                            "color": "rgb(127,111,34)"
                        }
                    },
                    {
                        "name": "\u6b63\u6e2f",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(143,133,89)"
                        }
                    },
                    {
                        "name": "\u9996\u5bb6",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(30,150,40)"
                        }
                    },
                    {
                        "name": "\u5230\u8d27",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(42,79,144)"
                        }
                    },
                    {
                        "name": "GOODUP",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(157,20,62)"
                        }
                    },
                    {
                        "name": "nova7sePro",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(149,55,64)"
                        }
                    },
                    {
                        "name": "\u4e13\u5356\u5e97",
                        "value": "6",
                        "textStyle": {
                            "color": "rgb(70,22,5)"
                        }
                    },
                    {
                        "name": "810",
                        "value": "5",
                        "textStyle": {
                            "color": "rgb(35,102,63)"
                        }
                    },
                    {
                        "name": "7plus",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(69,112,120)"
                        }
                    },
                    {
                        "name": "7P",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(48,159,2)"
                        }
                    },
                    {
                        "name": "5T",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(122,118,73)"
                        }
                    },
                    {
                        "name": "\u5c71\u6d77",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(131,40,140)"
                        }
                    },
                    {
                        "name": "\u539f\u753b",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(22,46,3)"
                        }
                    },
                    {
                        "name": "\u5f69\u5c4f",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(35,142,140)"
                        }
                    },
                    {
                        "name": "\u5355\u8fd4",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(107,62,114)"
                        }
                    },
                    {
                        "name": "find",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(83,84,135)"
                        }
                    },
                    {
                        "name": "n2",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(14,35,84)"
                        }
                    },
                    {
                        "name": "flip",
                        "value": "4",
                        "textStyle": {
                            "color": "rgb(28,11,40)"
                        }
                    },
                    {
                        "name": "neo5neoApple",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(104,76,53)"
                        }
                    },
                    {
                        "name": "\u4ee3\u5168",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(112,76,49)"
                        }
                    },
                    {
                        "name": "a97k10",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(29,27,153)"
                        }
                    },
                    {
                        "name": "reno8pro",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(75,30,133)"
                        }
                    },
                    {
                        "name": "\u5954\u9a70",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(18,93,9)"
                        }
                    },
                    {
                        "name": "nova7se2023",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(65,37,56)"
                        }
                    },
                    {
                        "name": "\u70ed\u9500",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(5,25,58)"
                        }
                    },
                    {
                        "name": "hi2023",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(58,144,63)"
                        }
                    },
                    {
                        "name": "X40GT5G",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(81,75,91)"
                        }
                    },
                    {
                        "name": "13ProApple",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(38,47,146)"
                        }
                    },
                    {
                        "name": "NX701J",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(4,105,131)"
                        }
                    },
                    {
                        "name": "8Pro",
                        "value": "8",
                        "textStyle": {
                            "color": "rgb(27,111,155)"
                        }
                    },
                    {
                        "name": "\u7a33\u5e27",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(2,157,39)"
                        }
                    },
                    {
                        "name": "8ProHUAWEI",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(107,133,48)"
                        }
                    },
                    {
                        "name": "nova5",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(86,60,111)"
                        }
                    },
                    {
                        "name": "5GApple",
                        "value": "3",
                        "textStyle": {
                            "color": "rgb(53,51,4)"
                        }
                    },
                    {
                        "name": "14proMax14Plus6.7",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(2,55,73)"
                        }
                    },
                    {
                        "name": "\u5bf8\u987a",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(98,134,157)"
                        }
                    },
                    {
                        "name": "\u4e30\u901f\u53d1",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(154,133,64)"
                        }
                    },
                    {
                        "name": "Neo2",
                        "value": "6",
                        "textStyle": {
                            "color": "rgb(148,142,26)"
                        }
                    },
                    {
                        "name": "gtneo2",
                        "value": "3",
                        "textStyle": {
                            "color": "rgb(38,2,84)"
                        }
                    },
                    {
                        "name": "2T",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(94,146,94)"
                        }
                    },
                    {
                        "name": "5000W",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(100,57,133)"
                        }
                    },
                    {
                        "name": "mate40pro",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(43,81,37)"
                        }
                    },
                    {
                        "name": "mate40Apple",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(47,157,60)"
                        }
                    },
                    {
                        "name": "5.5",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(116,145,28)"
                        }
                    },
                    {
                        "name": "\u53cc\u5361\u5b89\u5353",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(92,9,115)"
                        }
                    },
                    {
                        "name": "\u5341\u4e00",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(9,27,119)"
                        }
                    },
                    {
                        "name": "ace2Samsung",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(64,111,6)"
                        }
                    },
                    {
                        "name": "S21ultra",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(118,142,12)"
                        }
                    },
                    {
                        "name": "s21",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(30,13,16)"
                        }
                    },
                    {
                        "name": "\u4fc3\u9500",
                        "value": "6",
                        "textStyle": {
                            "color": "rgb(142,0,86)"
                        }
                    },
                    {
                        "name": "9note",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(18,32,2)"
                        }
                    },
                    {
                        "name": "note9pro",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(121,139,31)"
                        }
                    },
                    {
                        "name": "\u673a\u667a",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(107,58,102)"
                        }
                    },
                    {
                        "name": "\u5355\u5361",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(71,152,66)"
                        }
                    },
                    {
                        "name": "5.4",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(74,10,50)"
                        }
                    },
                    {
                        "name": "ProMax3",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(22,123,148)"
                        }
                    },
                    {
                        "name": "\u8d28\u4fdd",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(114,20,79)"
                        }
                    },
                    {
                        "name": "vivoy77e",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(69,94,79)"
                        }
                    },
                    {
                        "name": "viv0y77",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(150,92,149)"
                        }
                    },
                    {
                        "name": "y76s",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(1,33,36)"
                        }
                    },
                    {
                        "name": "y77",
                        "value": "5",
                        "textStyle": {
                            "color": "rgb(88,82,19)"
                        }
                    },
                    {
                        "name": "\u590d\u53e4",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(134,149,59)"
                        }
                    },
                    {
                        "name": "\u5c0f\u54e5",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(119,91,33)"
                        }
                    },
                    {
                        "name": "\u5927\u54e5\u5927",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(63,29,6)"
                        }
                    },
                    {
                        "name": "\u7248\u4e09\u9632",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(45,94,140)"
                        }
                    },
                    {
                        "name": "\u624b\u673a\u5361",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(37,10,108)"
                        }
                    },
                    {
                        "name": "\u4e2d\u56fd\u822a\u5929",
                        "value": "3",
                        "textStyle": {
                            "color": "rgb(135,80,39)"
                        }
                    },
                    {
                        "name": "4sAGM",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(133,19,67)"
                        }
                    },
                    {
                        "name": "IQOOZ6X",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(3,80,129)"
                        }
                    },
                    {
                        "name": "NEO5SE",
                        "value": "3",
                        "textStyle": {
                            "color": "rgb(113,7,15)"
                        }
                    },
                    {
                        "name": "Y32T",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(121,129,138)"
                        }
                    },
                    {
                        "name": "vivoy35",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(28,29,40)"
                        }
                    },
                    {
                        "name": "iphone11pro",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(53,85,89)"
                        }
                    },
                    {
                        "name": "\u540c\u57ce",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(117,152,156)"
                        }
                    },
                    {
                        "name": "14proMIUI",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(69,136,94)"
                        }
                    },
                    {
                        "name": "12X",
                        "value": "3",
                        "textStyle": {
                            "color": "rgb(132,21,51)"
                        }
                    },
                    {
                        "name": "\u5c4f\u9a81\u9f99",
                        "value": "6",
                        "textStyle": {
                            "color": "rgb(105,39,48)"
                        }
                    },
                    {
                        "name": "x40max",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(77,79,60)"
                        }
                    },
                    {
                        "name": "x40i",
                        "value": "5",
                        "textStyle": {
                            "color": "rgb(131,69,82)"
                        }
                    },
                    {
                        "name": "W23Flip",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(46,91,54)"
                        }
                    },
                    {
                        "name": "minOPPO",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(84,160,106)"
                        }
                    },
                    {
                        "name": "mate40p",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(146,81,158)"
                        }
                    },
                    {
                        "name": "\u79cb\u65e5",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(160,128,146)"
                        }
                    },
                    {
                        "name": "\u590f\u65e5",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(156,108,126)"
                        }
                    },
                    {
                        "name": "\u80e1\u6768",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(52,55,107)"
                        }
                    },
                    {
                        "name": "\u5146\u8d1d",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(37,114,97)"
                        }
                    },
                    {
                        "name": "G7",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(70,157,140)"
                        }
                    },
                    {
                        "name": "\u7f8e\u989c",
                        "value": "13",
                        "textStyle": {
                            "color": "rgb(78,138,126)"
                        }
                    },
                    {
                        "name": "Mate40RS",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(136,114,47)"
                        }
                    },
                    {
                        "name": "50plu",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(26,100,102)"
                        }
                    },
                    {
                        "name": "50ProApple",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(34,33,61)"
                        }
                    },
                    {
                        "name": "170",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(65,57,69)"
                        }
                    },
                    {
                        "name": "iphone13",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(146,113,33)"
                        }
                    },
                    {
                        "name": "5gSamsung",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(33,155,122)"
                        }
                    },
                    {
                        "name": "S20",
                        "value": "21",
                        "textStyle": {
                            "color": "rgb(69,60,85)"
                        }
                    },
                    {
                        "name": "G9860",
                        "value": "3",
                        "textStyle": {
                            "color": "rgb(40,77,144)"
                        }
                    },
                    {
                        "name": "S20UltraS10",
                        "value": "3",
                        "textStyle": {
                            "color": "rgb(95,141,127)"
                        }
                    },
                    {
                        "name": "S21",
                        "value": "18",
                        "textStyle": {
                            "color": "rgb(125,98,145)"
                        }
                    },
                    {
                        "name": "4G5.8",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(125,5,110)"
                        }
                    },
                    {
                        "name": "8Plus",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(47,134,30)"
                        }
                    },
                    {
                        "name": "10HONOR",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(127,127,126)"
                        }
                    },
                    {
                        "name": "10.7",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(140,0,16)"
                        }
                    },
                    {
                        "name": "\u4ebf\u8272",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(127,8,15)"
                        }
                    },
                    {
                        "name": "3200",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(29,61,24)"
                        }
                    },
                    {
                        "name": "\u81ea\u62cd",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(27,42,135)"
                        }
                    },
                    {
                        "name": "10Plus",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(10,26,50)"
                        }
                    },
                    {
                        "name": "\u5929\u987a",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(73,66,152)"
                        }
                    },
                    {
                        "name": "\u4e30\u53d1",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(26,99,86)"
                        }
                    },
                    {
                        "name": "nova7",
                        "value": "3",
                        "textStyle": {
                            "color": "rgb(67,41,1)"
                        }
                    },
                    {
                        "name": "\u9886\u5238\u7acb",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(9,9,56)"
                        }
                    },
                    {
                        "name": "P50pro",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(93,25,140)"
                        }
                    },
                    {
                        "name": "P50pocket",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(147,113,75)"
                        }
                    },
                    {
                        "name": "\u5c9b\u5c4f",
                        "value": "3",
                        "textStyle": {
                            "color": "rgb(40,102,159)"
                        }
                    },
                    {
                        "name": "oppoa56s",
                        "value": "3",
                        "textStyle": {
                            "color": "rgb(26,144,18)"
                        }
                    },
                    {
                        "name": "L9",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(150,23,89)"
                        }
                    },
                    {
                        "name": "8210",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(88,52,27)"
                        }
                    },
                    {
                        "name": "Mate20",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(119,135,160)"
                        }
                    },
                    {
                        "name": "mate20pro",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(8,26,53)"
                        }
                    },
                    {
                        "name": "K10xvivo",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(88,47,60)"
                        }
                    },
                    {
                        "name": "S7",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(81,158,105)"
                        }
                    },
                    {
                        "name": "vivos7",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(92,132,136)"
                        }
                    },
                    {
                        "name": "s6",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(102,117,32)"
                        }
                    },
                    {
                        "name": "x27",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(63,147,77)"
                        }
                    },
                    {
                        "name": "x23",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(131,85,159)"
                        }
                    },
                    {
                        "name": "x21",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(129,3,135)"
                        }
                    },
                    {
                        "name": "GALAXY",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(120,14,146)"
                        }
                    },
                    {
                        "name": "\u66f2\u5c4f",
                        "value": "13",
                        "textStyle": {
                            "color": "rgb(129,28,56)"
                        }
                    },
                    {
                        "name": "s10e24",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(1,70,54)"
                        }
                    },
                    {
                        "name": "s16por",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(33,2,101)"
                        }
                    },
                    {
                        "name": "pro2023",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(85,23,27)"
                        }
                    },
                    {
                        "name": "fold4",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(132,139,53)"
                        }
                    },
                    {
                        "name": "mate30pro",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(135,86,70)"
                        }
                    },
                    {
                        "name": "13pm",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(2,52,92)"
                        }
                    },
                    {
                        "name": "\u7801\u89e6",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(159,114,20)"
                        }
                    },
                    {
                        "name": "\u5361\u53ef",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(19,149,70)"
                        }
                    },
                    {
                        "name": "\u5fae\u4fe1\u5b89\u5353",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(59,66,93)"
                        }
                    },
                    {
                        "name": "Z17",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(128,68,13)"
                        }
                    },
                    {
                        "name": "10s5G",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(8,148,58)"
                        }
                    },
                    {
                        "name": "10proSamsung",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(156,30,148)"
                        }
                    },
                    {
                        "name": "S20U",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(33,112,9)"
                        }
                    },
                    {
                        "name": "6300",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(120,37,53)"
                        }
                    },
                    {
                        "name": "LG",
                        "value": "3",
                        "textStyle": {
                            "color": "rgb(66,2,157)"
                        }
                    },
                    {
                        "name": "G8",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(112,138,87)"
                        }
                    },
                    {
                        "name": "ThinQ",
                        "value": "4",
                        "textStyle": {
                            "color": "rgb(97,14,3)"
                        }
                    },
                    {
                        "name": "HIFI",
                        "value": "3",
                        "textStyle": {
                            "color": "rgb(94,127,154)"
                        }
                    },
                    {
                        "name": "\u9694\u7a7a",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(156,123,103)"
                        }
                    },
                    {
                        "name": "\u64cd\u4f5c",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(120,132,114)"
                        }
                    },
                    {
                        "name": "845",
                        "value": "5",
                        "textStyle": {
                            "color": "rgb(80,47,99)"
                        }
                    },
                    {
                        "name": "P10",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(92,45,70)"
                        }
                    },
                    {
                        "name": "X21",
                        "value": "4",
                        "textStyle": {
                            "color": "rgb(64,128,130)"
                        }
                    },
                    {
                        "name": "840",
                        "value": "3",
                        "textStyle": {
                            "color": "rgb(93,34,65)"
                        }
                    },
                    {
                        "name": "14iPhone",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(128,103,8)"
                        }
                    },
                    {
                        "name": "\u673a\u53cc\u5361",
                        "value": "3",
                        "textStyle": {
                            "color": "rgb(22,5,48)"
                        }
                    },
                    {
                        "name": "XD4HONOR",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(12,33,141)"
                        }
                    },
                    {
                        "name": "C31",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(14,88,115)"
                        }
                    },
                    {
                        "name": "\u4fdd\u65f6\u6377",
                        "value": "5",
                        "textStyle": {
                            "color": "rgb(139,74,11)"
                        }
                    },
                    {
                        "name": "\u8d85\u5fae\u8ddd",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(77,49,143)"
                        }
                    },
                    {
                        "name": "\u5927\u5168",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(140,78,12)"
                        }
                    },
                    {
                        "name": "\u673a\u76f4",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(115,158,26)"
                        }
                    },
                    {
                        "name": "iqoonoe7",
                        "value": "3",
                        "textStyle": {
                            "color": "rgb(160,61,142)"
                        }
                    },
                    {
                        "name": "iqqo",
                        "value": "6",
                        "textStyle": {
                            "color": "rgb(61,126,26)"
                        }
                    },
                    {
                        "name": "lqoo",
                        "value": "4",
                        "textStyle": {
                            "color": "rgb(144,151,115)"
                        }
                    },
                    {
                        "name": "neo7s",
                        "value": "4",
                        "textStyle": {
                            "color": "rgb(73,33,83)"
                        }
                    },
                    {
                        "name": "E1200R",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(49,29,15)"
                        }
                    },
                    {
                        "name": "E339",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(150,107,67)"
                        }
                    },
                    {
                        "name": "nova924",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(127,55,19)"
                        }
                    },
                    {
                        "name": "iPhone14",
                        "value": "5",
                        "textStyle": {
                            "color": "rgb(140,78,64)"
                        }
                    },
                    {
                        "name": "5rs",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(148,60,41)"
                        }
                    },
                    {
                        "name": "5proApple",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(37,154,25)"
                        }
                    },
                    {
                        "name": "IQOOZ6",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(16,146,71)"
                        }
                    },
                    {
                        "name": "\u76f4\u64ad",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(29,153,52)"
                        }
                    },
                    {
                        "name": "\u671f\u95f4",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(139,67,95)"
                        }
                    },
                    {
                        "name": "\u9a81\u9f99\u7535",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(144,116,74)"
                        }
                    },
                    {
                        "name": "\u8bfe\u673a",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(139,33,104)"
                        }
                    },
                    {
                        "name": "G9810",
                        "value": "3",
                        "textStyle": {
                            "color": "rgb(131,100,117)"
                        }
                    },
                    {
                        "name": "S21FE",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(116,60,148)"
                        }
                    },
                    {
                        "name": "\u52a8\u6001",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(145,94,8)"
                        }
                    },
                    {
                        "name": "AMOLED",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(62,73,35)"
                        }
                    },
                    {
                        "name": "\u9632\u5c18",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(141,97,61)"
                        }
                    },
                    {
                        "name": "iPhone4s",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(117,129,158)"
                        }
                    },
                    {
                        "name": "4S",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(113,70,45)"
                        }
                    },
                    {
                        "name": "330",
                        "value": "3",
                        "textStyle": {
                            "color": "rgb(107,1,115)"
                        }
                    },
                    {
                        "name": "iqz6",
                        "value": "3",
                        "textStyle": {
                            "color": "rgb(73,98,117)"
                        }
                    },
                    {
                        "name": "BLACKSHARK",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(114,77,31)"
                        }
                    },
                    {
                        "name": "7S",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(71,119,135)"
                        }
                    },
                    {
                        "name": "\u65b0\u9a81\u9f99",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(48,82,105)"
                        }
                    },
                    {
                        "name": "\u5f15\u64ce",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(40,105,15)"
                        }
                    },
                    {
                        "name": "4GXiaomi",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(38,63,85)"
                        }
                    },
                    {
                        "name": "k30",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(71,8,69)"
                        }
                    },
                    {
                        "name": "iphonexr",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(103,115,143)"
                        }
                    },
                    {
                        "name": "\u672a\u6fc0\u6d3b",
                        "value": "3",
                        "textStyle": {
                            "color": "rgb(115,82,98)"
                        }
                    },
                    {
                        "name": "Y33S",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(128,106,76)"
                        }
                    },
                    {
                        "name": "y33s",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(156,70,118)"
                        }
                    },
                    {
                        "name": "vivoy33s",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(97,28,140)"
                        }
                    },
                    {
                        "name": "y35",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(54,124,62)"
                        }
                    },
                    {
                        "name": "iq00u5x",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(62,56,147)"
                        }
                    },
                    {
                        "name": "z5x",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(11,156,20)"
                        }
                    },
                    {
                        "name": "iqoou5x",
                        "value": "3",
                        "textStyle": {
                            "color": "rgb(98,65,33)"
                        }
                    },
                    {
                        "name": "\u65b9\u5e97",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(65,121,125)"
                        }
                    },
                    {
                        "name": "oreon8",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(46,95,27)"
                        }
                    },
                    {
                        "name": "0pporeno7",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(86,89,75)"
                        }
                    },
                    {
                        "name": "ace2",
                        "value": "4",
                        "textStyle": {
                            "color": "rgb(72,136,18)"
                        }
                    },
                    {
                        "name": "66W6",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(83,40,44)"
                        }
                    },
                    {
                        "name": "vivoy52t",
                        "value": "3",
                        "textStyle": {
                            "color": "rgb(155,101,53)"
                        }
                    },
                    {
                        "name": "y52",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(86,132,135)"
                        }
                    },
                    {
                        "name": "vivo90",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(39,83,85)"
                        }
                    },
                    {
                        "name": "s22u",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(146,76,61)"
                        }
                    },
                    {
                        "name": "s23u",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(73,51,69)"
                        }
                    },
                    {
                        "name": "10aHuawei",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(96,144,11)"
                        }
                    },
                    {
                        "name": "5Gp40",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(41,17,37)"
                        }
                    },
                    {
                        "name": "GAIX",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(73,116,58)"
                        }
                    },
                    {
                        "name": "V1",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(91,69,34)"
                        }
                    },
                    {
                        "name": "\u4e22\u7248",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(120,63,54)"
                        }
                    },
                    {
                        "name": "vivos15e",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(157,87,55)"
                        }
                    },
                    {
                        "name": "Neo7se",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(44,108,59)"
                        }
                    },
                    {
                        "name": "iqoonoe6se",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(61,157,85)"
                        }
                    },
                    {
                        "name": "iqoonoe7se",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(119,159,31)"
                        }
                    },
                    {
                        "name": "iqooneo7es",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(57,1,89)"
                        }
                    },
                    {
                        "name": "QIN1S",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(143,40,121)"
                        }
                    },
                    {
                        "name": "\u751f\u6001",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(31,59,69)"
                        }
                    },
                    {
                        "name": "F21PRO12",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(63,84,48)"
                        }
                    },
                    {
                        "name": "y53t",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(137,118,32)"
                        }
                    },
                    {
                        "name": "vivoy53t",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(155,64,73)"
                        }
                    },
                    {
                        "name": "y53",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(152,133,2)"
                        }
                    },
                    {
                        "name": "\u53cc\u5361\u5927\u5c4f",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(89,104,23)"
                        }
                    },
                    {
                        "name": "oppoOPPO",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(105,62,17)"
                        }
                    },
                    {
                        "name": "oppor17",
                        "value": "4",
                        "textStyle": {
                            "color": "rgb(118,99,66)"
                        }
                    },
                    {
                        "name": "\u53cc\u5f85\u5b89\u5353",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(144,19,5)"
                        }
                    },
                    {
                        "name": "\u53ef\u7701",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(4,154,140)"
                        }
                    },
                    {
                        "name": "460",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(97,87,96)"
                        }
                    },
                    {
                        "name": "x30honor",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(114,107,73)"
                        }
                    },
                    {
                        "name": "V30",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(122,18,78)"
                        }
                    },
                    {
                        "name": "V30pro",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(1,90,69)"
                        }
                    },
                    {
                        "name": "12ProMax",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(39,22,143)"
                        }
                    },
                    {
                        "name": "\u6807\u51c6\u7248",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(112,112,158)"
                        }
                    },
                    {
                        "name": "nova10se",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(112,1,35)"
                        }
                    },
                    {
                        "name": "X80",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(28,23,67)"
                        }
                    },
                    {
                        "name": "vivox80",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(116,157,147)"
                        }
                    },
                    {
                        "name": "X70Samsung",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(99,69,69)"
                        }
                    },
                    {
                        "name": "G9910",
                        "value": "4",
                        "textStyle": {
                            "color": "rgb(93,144,24)"
                        }
                    },
                    {
                        "name": "\u7ba1\u63a7",
                        "value": "4",
                        "textStyle": {
                            "color": "rgb(22,73,154)"
                        }
                    },
                    {
                        "name": "\u6570\u80b2",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(155,37,3)"
                        }
                    },
                    {
                        "name": "\u795e\u5668",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(0,116,16)"
                        }
                    },
                    {
                        "name": "K19",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(101,66,79)"
                        }
                    },
                    {
                        "name": "iphone14",
                        "value": "3",
                        "textStyle": {
                            "color": "rgb(82,137,38)"
                        }
                    },
                    {
                        "name": "vivoiQOO",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(81,90,144)"
                        }
                    },
                    {
                        "name": "vivoneo7se",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(155,62,95)"
                        }
                    },
                    {
                        "name": "\u8000\u91d1",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(87,131,80)"
                        }
                    },
                    {
                        "name": "\u6606\u4ed1",
                        "value": "5",
                        "textStyle": {
                            "color": "rgb(160,38,20)"
                        }
                    },
                    {
                        "name": "\u73bb\u7483",
                        "value": "4",
                        "textStyle": {
                            "color": "rgb(95,55,151)"
                        }
                    },
                    {
                        "name": "\u971e\u5149",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(108,40,94)"
                        }
                    },
                    {
                        "name": "\u7834\u6653",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(157,153,75)"
                        }
                    },
                    {
                        "name": "iphone12mini5G",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(157,64,59)"
                        }
                    },
                    {
                        "name": "iphone14Plus",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(121,79,143)"
                        }
                    },
                    {
                        "name": "reno624",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(11,25,51)"
                        }
                    },
                    {
                        "name": "\u9f99\u73e0\u7248",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(110,61,53)"
                        }
                    },
                    {
                        "name": "gtneo2t",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(86,24,70)"
                        }
                    },
                    {
                        "name": "14promaxApple",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(133,118,14)"
                        }
                    },
                    {
                        "name": "iphone14Promax",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(84,140,86)"
                        }
                    },
                    {
                        "name": "iQoo",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(123,16,90)"
                        }
                    },
                    {
                        "name": "Z3",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(123,158,11)"
                        }
                    },
                    {
                        "name": "\u53cc\u6a21",
                        "value": "7",
                        "textStyle": {
                            "color": "rgb(51,34,92)"
                        }
                    },
                    {
                        "name": "768G",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(149,131,140)"
                        }
                    },
                    {
                        "name": "120hz",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(139,63,101)"
                        }
                    },
                    {
                        "name": "Note9Pro",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(80,108,150)"
                        }
                    },
                    {
                        "name": "Note9Pro5G",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(124,143,13)"
                        }
                    },
                    {
                        "name": "type",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(116,154,105)"
                        }
                    },
                    {
                        "name": "cnubia",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(4,77,45)"
                        }
                    },
                    {
                        "name": "z40",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(142,110,30)"
                        }
                    },
                    {
                        "name": "A72",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(56,40,116)"
                        }
                    },
                    {
                        "name": "720",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(10,12,25)"
                        }
                    },
                    {
                        "name": "A55",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(96,33,31)"
                        }
                    },
                    {
                        "name": "12x",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(66,51,124)"
                        }
                    },
                    {
                        "name": "\u5f00\u5b66",
                        "value": "3",
                        "textStyle": {
                            "color": "rgb(143,39,86)"
                        }
                    },
                    {
                        "name": "\u4f18\u60e0\u5238",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(78,34,158)"
                        }
                    },
                    {
                        "name": "i14promax",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(136,109,2)"
                        }
                    },
                    {
                        "name": "\u4ef7\u5b89\u5353\u7535",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(88,13,143)"
                        }
                    },
                    {
                        "name": "Mate30Pro",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(100,17,119)"
                        }
                    },
                    {
                        "name": "\u5347\u964d",
                        "value": "4",
                        "textStyle": {
                            "color": "rgb(95,140,38)"
                        }
                    },
                    {
                        "name": "\u4eba\u8138\u8bc6\u522b",
                        "value": "4",
                        "textStyle": {
                            "color": "rgb(144,63,56)"
                        }
                    },
                    {
                        "name": "vivos15pro5G",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(129,148,124)"
                        }
                    },
                    {
                        "name": "S12",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(3,155,112)"
                        }
                    },
                    {
                        "name": "5199",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(147,136,158)"
                        }
                    },
                    {
                        "name": "Oppo",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(4,28,25)"
                        }
                    },
                    {
                        "name": "80Pro",
                        "value": "5",
                        "textStyle": {
                            "color": "rgb(48,10,70)"
                        }
                    },
                    {
                        "name": "260",
                        "value": "3",
                        "textStyle": {
                            "color": "rgb(55,84,12)"
                        }
                    },
                    {
                        "name": "oppok9s",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(94,70,69)"
                        }
                    },
                    {
                        "name": "0ppok9",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(149,104,2)"
                        }
                    },
                    {
                        "name": "\u7279\u4ef7",
                        "value": "3",
                        "textStyle": {
                            "color": "rgb(131,141,106)"
                        }
                    },
                    {
                        "name": "Letv",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(138,102,62)"
                        }
                    },
                    {
                        "name": "\u4e50\u89c6",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(134,105,33)"
                        }
                    },
                    {
                        "name": "2pro",
                        "value": "3",
                        "textStyle": {
                            "color": "rgb(46,35,132)"
                        }
                    },
                    {
                        "name": "X620",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(148,133,117)"
                        }
                    },
                    {
                        "name": "u5",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(81,160,66)"
                        }
                    },
                    {
                        "name": "vivoiqoou5",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(156,130,159)"
                        }
                    },
                    {
                        "name": "vivoiqoo",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(114,31,31)"
                        }
                    },
                    {
                        "name": "iooq",
                        "value": "6",
                        "textStyle": {
                            "color": "rgb(1,3,3)"
                        }
                    },
                    {
                        "name": "ioop",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(48,55,36)"
                        }
                    },
                    {
                        "name": "u3",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(160,41,107)"
                        }
                    },
                    {
                        "name": "\u5361\u5fae\u4fe1",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(81,128,152)"
                        }
                    },
                    {
                        "name": "Taiml",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(21,70,42)"
                        }
                    },
                    {
                        "name": "\u7f8e\u5229",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(87,8,39)"
                        }
                    },
                    {
                        "name": "K688",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(100,149,3)"
                        }
                    },
                    {
                        "name": "\u5973\u5b69",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(27,49,132)"
                        }
                    },
                    {
                        "name": "9X",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(108,85,154)"
                        }
                    },
                    {
                        "name": "\u5347\u964d\u5f0f",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(57,83,142)"
                        }
                    },
                    {
                        "name": "9RT",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(82,145,137)"
                        }
                    },
                    {
                        "name": "10PRO",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(107,122,61)"
                        }
                    },
                    {
                        "name": "ACE",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(40,75,14)"
                        }
                    },
                    {
                        "name": "PROApple",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(17,11,151)"
                        }
                    },
                    {
                        "name": "256g8x",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(99,100,97)"
                        }
                    },
                    {
                        "name": "W9023ZKDCHC",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(36,22,72)"
                        }
                    },
                    {
                        "name": "W2023",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(30,77,56)"
                        }
                    },
                    {
                        "name": "G9880",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(126,63,45)"
                        }
                    },
                    {
                        "name": "N6se",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(25,50,77)"
                        }
                    },
                    {
                        "name": "\u4f18\u5148",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(61,31,79)"
                        }
                    },
                    {
                        "name": "\u901a\u7ea2",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(51,83,65)"
                        }
                    },
                    {
                        "name": "\u5347\u7ea7",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(22,51,154)"
                        }
                    },
                    {
                        "name": "\u65b9\u56fd\u884c",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(146,131,25)"
                        }
                    },
                    {
                        "name": "ProApple",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(98,24,151)"
                        }
                    },
                    {
                        "name": "A13",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(160,18,3)"
                        }
                    },
                    {
                        "name": "SE2",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(0,137,126)"
                        }
                    },
                    {
                        "name": "Reno7",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(29,67,9)"
                        }
                    },
                    {
                        "name": "opporeno7pro",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(45,71,92)"
                        }
                    },
                    {
                        "name": "reno6",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(123,94,109)"
                        }
                    },
                    {
                        "name": "\u5239\u90a3",
                        "value": "3",
                        "textStyle": {
                            "color": "rgb(106,89,149)"
                        }
                    },
                    {
                        "name": "F7210Fold4",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(149,126,29)"
                        }
                    },
                    {
                        "name": "zflip3",
                        "value": "3",
                        "textStyle": {
                            "color": "rgb(147,6,112)"
                        }
                    },
                    {
                        "name": "778plus",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(48,159,107)"
                        }
                    },
                    {
                        "name": "Z6XApple",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(72,132,59)"
                        }
                    },
                    {
                        "name": "13promaxApple",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(101,63,57)"
                        }
                    },
                    {
                        "name": "12C24",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(11,100,40)"
                        }
                    },
                    {
                        "name": "mate50rs",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(67,1,82)"
                        }
                    },
                    {
                        "name": "12ProMax5G",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(88,93,107)"
                        }
                    },
                    {
                        "name": "XsMax",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(33,86,65)"
                        }
                    },
                    {
                        "name": "70Pro5G",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(98,50,50)"
                        }
                    },
                    {
                        "name": "70Pro",
                        "value": "7",
                        "textStyle": {
                            "color": "rgb(64,125,7)"
                        }
                    },
                    {
                        "name": "30PlusLG",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(53,27,96)"
                        }
                    },
                    {
                        "name": "V60",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(137,55,137)"
                        }
                    },
                    {
                        "name": "865",
                        "value": "5",
                        "textStyle": {
                            "color": "rgb(28,129,61)"
                        }
                    },
                    {
                        "name": "X40GT",
                        "value": "4",
                        "textStyle": {
                            "color": "rgb(147,87,34)"
                        }
                    },
                    {
                        "name": "\u5c0f\u8fa3\u6912",
                        "value": "4",
                        "textStyle": {
                            "color": "rgb(110,122,131)"
                        }
                    },
                    {
                        "name": "\u53ef\u5fae\u4fe1",
                        "value": "3",
                        "textStyle": {
                            "color": "rgb(69,95,6)"
                        }
                    },
                    {
                        "name": "\u9002\u5408",
                        "value": "3",
                        "textStyle": {
                            "color": "rgb(86,135,32)"
                        }
                    },
                    {
                        "name": "50SE",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(80,103,142)"
                        }
                    },
                    {
                        "name": "v50",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(126,54,90)"
                        }
                    },
                    {
                        "name": "60se",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(104,99,29)"
                        }
                    },
                    {
                        "name": "nePlus",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(41,20,59)"
                        }
                    },
                    {
                        "name": "9rt",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(34,139,139)"
                        }
                    },
                    {
                        "name": "Lenovo",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(155,42,42)"
                        }
                    },
                    {
                        "name": "\u8054\u60f3",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(79,20,128)"
                        }
                    },
                    {
                        "name": "\u62ef\u6551",
                        "value": "3",
                        "textStyle": {
                            "color": "rgb(136,43,131)"
                        }
                    },
                    {
                        "name": "Y70",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(116,138,16)"
                        }
                    },
                    {
                        "name": "\u7ade\u6280",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(11,160,139)"
                        }
                    },
                    {
                        "name": "Y70OPPO",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(31,7,41)"
                        }
                    },
                    {
                        "name": "A11",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(33,72,91)"
                        }
                    },
                    {
                        "name": "\u9a81\u9f99\u5168",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(58,67,23)"
                        }
                    },
                    {
                        "name": "oppoa11Samsung",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(144,80,36)"
                        }
                    },
                    {
                        "name": "380",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(34,87,37)"
                        }
                    },
                    {
                        "name": "Y90HUAWEI",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(17,22,45)"
                        }
                    },
                    {
                        "name": "lPhone7plus",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(19,33,77)"
                        }
                    },
                    {
                        "name": "7p",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(129,89,104)"
                        }
                    },
                    {
                        "name": "13viipoo",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(25,148,119)"
                        }
                    },
                    {
                        "name": "\u8054\u5408",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(97,106,21)"
                        }
                    },
                    {
                        "name": "\u7814\u53d1",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(25,125,95)"
                        }
                    },
                    {
                        "name": "13SultraOPPO",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(30,71,6)"
                        }
                    },
                    {
                        "name": "oppok10pro",
                        "value": "10",
                        "textStyle": {
                            "color": "rgb(62,73,69)"
                        }
                    },
                    {
                        "name": "nova7pro",
                        "value": "3",
                        "textStyle": {
                            "color": "rgb(6,34,140)"
                        }
                    },
                    {
                        "name": "\u964d\u4ef7",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(95,149,66)"
                        }
                    },
                    {
                        "name": "5Gmate40",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(77,128,124)"
                        }
                    },
                    {
                        "name": "0ppox5pro",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(41,65,33)"
                        }
                    },
                    {
                        "name": "\u5168\u667a\u80fd",
                        "value": "3",
                        "textStyle": {
                            "color": "rgb(39,24,27)"
                        }
                    },
                    {
                        "name": "X40gt",
                        "value": "3",
                        "textStyle": {
                            "color": "rgb(36,80,129)"
                        }
                    },
                    {
                        "name": "X3024",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(131,158,25)"
                        }
                    },
                    {
                        "name": "oppok9pro",
                        "value": "3",
                        "textStyle": {
                            "color": "rgb(0,141,54)"
                        }
                    },
                    {
                        "name": "oppok9p",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(137,71,77)"
                        }
                    },
                    {
                        "name": "20W",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(47,126,105)"
                        }
                    },
                    {
                        "name": "13proApple",
                        "value": "3",
                        "textStyle": {
                            "color": "rgb(24,81,99)"
                        }
                    },
                    {
                        "name": "p40pro",
                        "value": "7",
                        "textStyle": {
                            "color": "rgb(127,111,146)"
                        }
                    },
                    {
                        "name": "9x",
                        "value": "3",
                        "textStyle": {
                            "color": "rgb(80,39,44)"
                        }
                    },
                    {
                        "name": "vivoy77Apple",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(96,159,2)"
                        }
                    },
                    {
                        "name": "\u4ee3\u56fd\u884c",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(137,30,146)"
                        }
                    },
                    {
                        "name": "6p",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(63,145,68)"
                        }
                    },
                    {
                        "name": "9110121314",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(136,39,126)"
                        }
                    },
                    {
                        "name": "9avivo",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(90,79,30)"
                        }
                    },
                    {
                        "name": "iqooneo6se",
                        "value": "4",
                        "textStyle": {
                            "color": "rgb(127,63,36)"
                        }
                    },
                    {
                        "name": "Nova7",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(127,1,156)"
                        }
                    },
                    {
                        "name": "opopa58",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(104,59,66)"
                        }
                    },
                    {
                        "name": "a55sHelloKitty",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(155,20,71)"
                        }
                    },
                    {
                        "name": "\u51ef\u8482",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(123,34,157)"
                        }
                    },
                    {
                        "name": "\u53ef\u7231\u5973\u751f",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(95,2,118)"
                        }
                    },
                    {
                        "name": "\u7f51\u8ff7",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(101,85,45)"
                        }
                    },
                    {
                        "name": "\u4eba\u50cf",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(68,121,135)"
                        }
                    },
                    {
                        "name": "120HZ",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(32,10,91)"
                        }
                    },
                    {
                        "name": "s16Pro2023",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(28,14,141)"
                        }
                    },
                    {
                        "name": "\u5143\u5927\u5c4f",
                        "value": "3",
                        "textStyle": {
                            "color": "rgb(62,73,102)"
                        }
                    },
                    {
                        "name": "A58x",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(131,99,32)"
                        }
                    },
                    {
                        "name": "a58",
                        "value": "3",
                        "textStyle": {
                            "color": "rgb(56,25,85)"
                        }
                    },
                    {
                        "name": "710",
                        "value": "6",
                        "textStyle": {
                            "color": "rgb(151,89,23)"
                        }
                    },
                    {
                        "name": "\u4e0d\u5361",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(53,81,141)"
                        }
                    },
                    {
                        "name": "note8",
                        "value": "4",
                        "textStyle": {
                            "color": "rgb(82,138,36)"
                        }
                    },
                    {
                        "name": "\u9b45\u84dd",
                        "value": "4",
                        "textStyle": {
                            "color": "rgb(100,109,46)"
                        }
                    },
                    {
                        "name": "note6",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(64,113,27)"
                        }
                    },
                    {
                        "name": "note5OPPO",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(56,101,51)"
                        }
                    },
                    {
                        "name": "3600",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(88,6,146)"
                        }
                    },
                    {
                        "name": "\u5212\u7b97",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(117,23,29)"
                        }
                    },
                    {
                        "name": "aceproApple",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(96,125,31)"
                        }
                    },
                    {
                        "name": "U3",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(129,5,142)"
                        }
                    },
                    {
                        "name": "vivoiqoou3",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(83,43,107)"
                        }
                    },
                    {
                        "name": "iqoou3",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(119,67,148)"
                        }
                    },
                    {
                        "name": "vivou3",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(82,89,153)"
                        }
                    },
                    {
                        "name": "ipoou3",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(112,3,33)"
                        }
                    },
                    {
                        "name": "iooqu5",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(116,159,142)"
                        }
                    },
                    {
                        "name": "viv0u3vovo",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(129,47,57)"
                        }
                    },
                    {
                        "name": "u5xvivo",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(57,138,128)"
                        }
                    },
                    {
                        "name": "nova5i",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(80,104,14)"
                        }
                    },
                    {
                        "name": "nova7se",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(140,19,2)"
                        }
                    },
                    {
                        "name": "\u8d85\u5c0f",
                        "value": "3",
                        "textStyle": {
                            "color": "rgb(66,53,57)"
                        }
                    },
                    {
                        "name": "MAX",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(60,72,126)"
                        }
                    },
                    {
                        "name": "1336",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(85,32,13)"
                        }
                    },
                    {
                        "name": "note12proMeizu",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(63,15,90)"
                        }
                    },
                    {
                        "name": "S6",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(80,56,147)"
                        }
                    },
                    {
                        "name": "NOTE6",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(88,76,144)"
                        }
                    },
                    {
                        "name": "V8",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(138,120,97)"
                        }
                    },
                    {
                        "name": "F9C",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(45,109,114)"
                        }
                    },
                    {
                        "name": "y31s",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(79,94,75)"
                        }
                    },
                    {
                        "name": "A8",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(75,21,46)"
                        }
                    },
                    {
                        "name": "A7",
                        "value": "3",
                        "textStyle": {
                            "color": "rgb(84,30,64)"
                        }
                    },
                    {
                        "name": "\u901f\u53d1\u9009",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(69,74,11)"
                        }
                    },
                    {
                        "name": "redmi9A",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(111,144,137)"
                        }
                    },
                    {
                        "name": "NX669J",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(30,31,149)"
                        }
                    },
                    {
                        "name": "\u5c4f\u4e0b",
                        "value": "7",
                        "textStyle": {
                            "color": "rgb(106,1,112)"
                        }
                    },
                    {
                        "name": "8ProSamsung",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(84,105,27)"
                        }
                    },
                    {
                        "name": "N9760",
                        "value": "3",
                        "textStyle": {
                            "color": "rgb(138,94,55)"
                        }
                    },
                    {
                        "name": "Y76s",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(158,66,10)"
                        }
                    },
                    {
                        "name": "44W",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(144,136,9)"
                        }
                    },
                    {
                        "name": "vivoy76sPhilips",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(134,131,159)"
                        }
                    },
                    {
                        "name": "note11proApple",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(106,115,51)"
                        }
                    },
                    {
                        "name": "MIUI14",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(147,3,16)"
                        }
                    },
                    {
                        "name": "iQOONeo7",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(127,128,153)"
                        }
                    },
                    {
                        "name": "5g2023",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(5,71,54)"
                        }
                    },
                    {
                        "name": "535",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(125,134,1)"
                        }
                    },
                    {
                        "name": "NFCMIUI",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(158,92,64)"
                        }
                    },
                    {
                        "name": "\u9876\u914d",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(64,64,99)"
                        }
                    },
                    {
                        "name": "vivoz6",
                        "value": "3",
                        "textStyle": {
                            "color": "rgb(32,149,20)"
                        }
                    },
                    {
                        "name": "5gApple",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(126,116,118)"
                        }
                    },
                    {
                        "name": "ProMax5G",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(48,71,113)"
                        }
                    },
                    {
                        "name": "\u663e\u793a",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(115,134,94)"
                        }
                    },
                    {
                        "name": "rneo7por",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(96,111,57)"
                        }
                    },
                    {
                        "name": "0ppo06",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(2,130,126)"
                        }
                    },
                    {
                        "name": "rone85g",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(84,54,85)"
                        }
                    },
                    {
                        "name": "realme10sOPPO",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(94,129,115)"
                        }
                    },
                    {
                        "name": "A53A56A57A58Huawei",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(85,153,154)"
                        }
                    },
                    {
                        "name": "\u5b69\u5b50",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(45,148,140)"
                        }
                    },
                    {
                        "name": "\u73a9\u6e38\u620f",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(30,10,139)"
                        }
                    },
                    {
                        "name": "\u8bfe\u8c37\u6b4c",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(104,157,97)"
                        }
                    },
                    {
                        "name": "p40",
                        "value": "3",
                        "textStyle": {
                            "color": "rgb(43,99,160)"
                        }
                    },
                    {
                        "name": "12PRO",
                        "value": "4",
                        "textStyle": {
                            "color": "rgb(106,129,96)"
                        }
                    },
                    {
                        "name": "\u673a\u957f",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(57,89,137)"
                        }
                    },
                    {
                        "name": "7Plus",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(96,33,38)"
                        }
                    },
                    {
                        "name": "NOVA",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(29,67,93)"
                        }
                    },
                    {
                        "name": "\u624b\u673a\u82af\u7247",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(151,26,135)"
                        }
                    },
                    {
                        "name": "60maXD4",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(59,60,103)"
                        }
                    },
                    {
                        "name": "180",
                        "value": "7",
                        "textStyle": {
                            "color": "rgb(140,146,73)"
                        }
                    },
                    {
                        "name": "\u5929\u788e",
                        "value": "6",
                        "textStyle": {
                            "color": "rgb(0,142,15)"
                        }
                    },
                    {
                        "name": "p30",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(138,156,64)"
                        }
                    },
                    {
                        "name": "note11prohonor",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(118,15,118)"
                        }
                    },
                    {
                        "name": "X10",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(50,119,67)"
                        }
                    },
                    {
                        "name": "IN2020",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(147,86,106)"
                        }
                    },
                    {
                        "name": "8T",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(28,82,15)"
                        }
                    },
                    {
                        "name": "\u7f51\u5927",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(86,75,16)"
                        }
                    },
                    {
                        "name": "11Pro12",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(45,22,78)"
                        }
                    },
                    {
                        "name": "0pp0",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(33,149,105)"
                        }
                    },
                    {
                        "name": "\u9650\u5b9a\u91cf",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(47,114,109)"
                        }
                    },
                    {
                        "name": "rone8",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(141,121,97)"
                        }
                    },
                    {
                        "name": "50Plus",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(142,56,71)"
                        }
                    },
                    {
                        "name": "66",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(118,29,39)"
                        }
                    },
                    {
                        "name": "\u74e6\u95ea\u5145",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(72,123,61)"
                        }
                    },
                    {
                        "name": "x80",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(84,73,0)"
                        }
                    },
                    {
                        "name": "ultra",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(68,133,124)"
                        }
                    },
                    {
                        "name": "Fold3Zflip4",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(65,11,76)"
                        }
                    },
                    {
                        "name": "vivoiQOO10Pro",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(160,142,10)"
                        }
                    },
                    {
                        "name": "\u56db\u6444",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(22,3,41)"
                        }
                    },
                    {
                        "name": "MATE",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(156,116,67)"
                        }
                    },
                    {
                        "name": "Y30",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(122,24,105)"
                        }
                    },
                    {
                        "name": "Y93s",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(145,19,147)"
                        }
                    },
                    {
                        "name": "\u4ef7\u5b89\u5353",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(148,25,42)"
                        }
                    },
                    {
                        "name": "\u79d1\u6280",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(108,134,100)"
                        }
                    },
                    {
                        "name": "\u536b\u661f",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(54,98,47)"
                        }
                    },
                    {
                        "name": "\u83e0\u841d",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(105,27,58)"
                        }
                    },
                    {
                        "name": "4Gvivo",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(115,60,36)"
                        }
                    },
                    {
                        "name": "iqoo10pro",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(72,27,140)"
                        }
                    },
                    {
                        "name": "iqoo9",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(145,151,9)"
                        }
                    },
                    {
                        "name": "iq10honor",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(97,57,58)"
                        }
                    },
                    {
                        "name": "9i",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(151,125,145)"
                        }
                    },
                    {
                        "name": "nokia",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(72,157,132)"
                        }
                    },
                    {
                        "name": "C9S",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(47,89,66)"
                        }
                    },
                    {
                        "name": "\u5c0a\u4eab",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(48,136,135)"
                        }
                    },
                    {
                        "name": "Z30Pro",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(114,28,157)"
                        }
                    },
                    {
                        "name": "\u4e24\u4ebf",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(125,144,21)"
                        }
                    },
                    {
                        "name": "\u661f\u7a7a",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(49,110,77)"
                        }
                    },
                    {
                        "name": "\u9632\u7834",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(86,69,37)"
                        }
                    },
                    {
                        "name": "\u89e3\u7981",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(82,49,21)"
                        }
                    },
                    {
                        "name": "Q20Pro",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(19,144,158)"
                        }
                    },
                    {
                        "name": "\u53ef\u95ea\u9001",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(111,105,72)"
                        }
                    },
                    {
                        "name": "6SProhonor",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(153,78,41)"
                        }
                    },
                    {
                        "name": "\u53ef\u9009",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(44,55,159)"
                        }
                    },
                    {
                        "name": "F21S",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(144,69,68)"
                        }
                    },
                    {
                        "name": "\u70ed\u70b9",
                        "value": "3",
                        "textStyle": {
                            "color": "rgb(102,42,61)"
                        }
                    },
                    {
                        "name": "P505G",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(113,130,152)"
                        }
                    },
                    {
                        "name": "P50Prop50E",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(83,71,119)"
                        }
                    },
                    {
                        "name": "HarmonyOS2p50proXD4",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(108,139,45)"
                        }
                    },
                    {
                        "name": "8000MAX",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(45,159,63)"
                        }
                    },
                    {
                        "name": "OPPOK10PRO",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(46,71,38)"
                        }
                    },
                    {
                        "name": "K9",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(2,67,18)"
                        }
                    },
                    {
                        "name": "K9PRO",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(123,105,121)"
                        }
                    },
                    {
                        "name": "F21PROHuawei",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(155,43,84)"
                        }
                    },
                    {
                        "name": "nova5pro",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(61,100,139)"
                        }
                    },
                    {
                        "name": "4OPPO",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(153,42,80)"
                        }
                    },
                    {
                        "name": "reno9proSamsung",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(56,16,109)"
                        }
                    },
                    {
                        "name": "Fold3",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(90,141,136)"
                        }
                    },
                    {
                        "name": "F9260",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(67,115,20)"
                        }
                    },
                    {
                        "name": "L8",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(124,8,47)"
                        }
                    },
                    {
                        "name": "iqooneo7s",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(155,34,38)"
                        }
                    },
                    {
                        "name": "iq00honor",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(152,22,49)"
                        }
                    },
                    {
                        "name": "iphoen14",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(97,87,71)"
                        }
                    },
                    {
                        "name": "1010",
                        "value": "3",
                        "textStyle": {
                            "color": "rgb(14,90,63)"
                        }
                    },
                    {
                        "name": "k9s0ppo5g",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(62,79,140)"
                        }
                    },
                    {
                        "name": "rs",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(0,157,157)"
                        }
                    },
                    {
                        "name": "GM1910",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(26,37,101)"
                        }
                    },
                    {
                        "name": "7Tpro",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(84,61,127)"
                        }
                    },
                    {
                        "name": "8provivoX27",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(114,153,15)"
                        }
                    },
                    {
                        "name": "\u7ef4\u6c83",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(129,45,85)"
                        }
                    },
                    {
                        "name": "\u53cc\u5361\u5c01",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(55,0,137)"
                        }
                    },
                    {
                        "name": "P50Pro",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(76,120,59)"
                        }
                    },
                    {
                        "name": "P50e",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(5,105,59)"
                        }
                    },
                    {
                        "name": "A90",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(96,97,158)"
                        }
                    },
                    {
                        "name": "5.7",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(139,90,100)"
                        }
                    },
                    {
                        "name": "\u5ba2\u670d",
                        "value": "3",
                        "textStyle": {
                            "color": "rgb(24,67,105)"
                        }
                    },
                    {
                        "name": "noe76se",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(7,47,19)"
                        }
                    },
                    {
                        "name": "120",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(16,114,48)"
                        }
                    },
                    {
                        "name": "MINI",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(115,115,127)"
                        }
                    },
                    {
                        "name": "max24",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(101,17,69)"
                        }
                    },
                    {
                        "name": "1424",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(149,104,140)"
                        }
                    },
                    {
                        "name": "7SPRO",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(41,19,60)"
                        }
                    },
                    {
                        "name": "\u6d77\u4fe1",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(3,153,112)"
                        }
                    },
                    {
                        "name": "Hisense",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(81,137,93)"
                        }
                    },
                    {
                        "name": "\u9605\u8bfb",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(145,19,34)"
                        }
                    },
                    {
                        "name": "\u6c34\u58a8",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(19,10,64)"
                        }
                    },
                    {
                        "name": "\u7535\u7eb8",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(55,35,77)"
                        }
                    },
                    {
                        "name": "\u9605\u8bfb\u5668",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(79,17,147)"
                        }
                    },
                    {
                        "name": "6GB",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(140,47,46)"
                        }
                    },
                    {
                        "name": "mate3012",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(109,156,27)"
                        }
                    },
                    {
                        "name": "256",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(64,141,129)"
                        }
                    },
                    {
                        "name": "\u5230\u624b",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(13,153,93)"
                        }
                    },
                    {
                        "name": "1929",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(134,90,72)"
                        }
                    },
                    {
                        "name": "\u7f51\u6b63",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(79,92,65)"
                        }
                    },
                    {
                        "name": "k50ProApple",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(154,81,90)"
                        }
                    },
                    {
                        "name": "7spro",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(22,64,40)"
                        }
                    },
                    {
                        "name": "vivoX23",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(46,42,3)"
                        }
                    },
                    {
                        "name": "X9",
                        "value": "3",
                        "textStyle": {
                            "color": "rgb(57,121,119)"
                        }
                    },
                    {
                        "name": "note11Samsung",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(154,73,69)"
                        }
                    },
                    {
                        "name": "Flip3",
                        "value": "5",
                        "textStyle": {
                            "color": "rgb(112,14,145)"
                        }
                    },
                    {
                        "name": "F7110",
                        "value": "3",
                        "textStyle": {
                            "color": "rgb(141,123,80)"
                        }
                    },
                    {
                        "name": "320",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(121,131,22)"
                        }
                    },
                    {
                        "name": "\u7248\u5927",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(109,142,19)"
                        }
                    },
                    {
                        "name": "\u6b3e\u5168",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(150,60,61)"
                        }
                    },
                    {
                        "name": "L580",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(70,136,18)"
                        }
                    },
                    {
                        "name": "32g",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(140,23,5)"
                        }
                    },
                    {
                        "name": "64g",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(141,91,137)"
                        }
                    },
                    {
                        "name": "\u6210\u8272",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(112,70,49)"
                        }
                    },
                    {
                        "name": "\u4f4e\u4ef7",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(93,153,122)"
                        }
                    },
                    {
                        "name": "30plusApple",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(68,15,29)"
                        }
                    },
                    {
                        "name": "Plus7",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(59,73,123)"
                        }
                    },
                    {
                        "name": "\u6539\u4e32\u7801",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(29,66,13)"
                        }
                    },
                    {
                        "name": "\u8425\u4e1a\u5385",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(88,62,106)"
                        }
                    },
                    {
                        "name": "\u6d41\u91cf",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(103,138,33)"
                        }
                    },
                    {
                        "name": "\u6fc0\u6d3b",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(76,46,53)"
                        }
                    },
                    {
                        "name": "\u5339\u914d",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(107,15,152)"
                        }
                    },
                    {
                        "name": "\u5c0f\u84dd\u5361",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(78,133,131)"
                        }
                    },
                    {
                        "name": "11R",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(15,90,116)"
                        }
                    },
                    {
                        "name": "40E",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(77,130,142)"
                        }
                    },
                    {
                        "name": "SoC",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(54,9,137)"
                        }
                    },
                    {
                        "name": "\u611f\u77e5",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(114,49,65)"
                        }
                    },
                    {
                        "name": "\u7535\u5f71",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(6,143,30)"
                        }
                    },
                    {
                        "name": "mate40e",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(35,98,15)"
                        }
                    },
                    {
                        "name": "121",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(65,98,18)"
                        }
                    },
                    {
                        "name": "iqooZ5X",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(105,110,154)"
                        }
                    },
                    {
                        "name": "cc9",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(101,138,100)"
                        }
                    },
                    {
                        "name": "13s",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(156,152,111)"
                        }
                    },
                    {
                        "name": "ultraGOFLY",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(17,145,89)"
                        }
                    },
                    {
                        "name": "\u6377\u8bed",
                        "value": "4",
                        "textStyle": {
                            "color": "rgb(113,89,137)"
                        }
                    },
                    {
                        "name": "\u5916\u5356",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(63,126,44)"
                        }
                    },
                    {
                        "name": "\u5145\u5927\u5c4f",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(68,149,36)"
                        }
                    },
                    {
                        "name": "\u5927\u4f17\u7248",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(132,12,149)"
                        }
                    },
                    {
                        "name": "Max3",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(154,77,14)"
                        }
                    },
                    {
                        "name": "6.9",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(22,8,113)"
                        }
                    },
                    {
                        "name": "Max2",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(51,140,101)"
                        }
                    },
                    {
                        "name": "4GMax",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(113,141,40)"
                        }
                    },
                    {
                        "name": "z5xMIUI",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(114,88,32)"
                        }
                    },
                    {
                        "name": "note11TPro",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(86,128,89)"
                        }
                    },
                    {
                        "name": "11Samsung",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(114,23,134)"
                        }
                    },
                    {
                        "name": "\u964d\u7acb",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(152,122,76)"
                        }
                    },
                    {
                        "name": "A96",
                        "value": "5",
                        "textStyle": {
                            "color": "rgb(129,27,16)"
                        }
                    },
                    {
                        "name": "a95",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(84,124,156)"
                        }
                    },
                    {
                        "name": "93",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(115,128,119)"
                        }
                    },
                    {
                        "name": "K40sMIUI",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(9,36,147)"
                        }
                    },
                    {
                        "name": "256GBOPPO",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(141,158,99)"
                        }
                    },
                    {
                        "name": "K9pro",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(149,150,109)"
                        }
                    },
                    {
                        "name": "M40",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(43,133,94)"
                        }
                    },
                    {
                        "name": "800U",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(50,149,84)"
                        }
                    },
                    {
                        "name": "xiaomi8",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(34,45,77)"
                        }
                    },
                    {
                        "name": "\u4eac\u74f7",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(158,56,87)"
                        }
                    },
                    {
                        "name": "701KC",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(140,67,118)"
                        }
                    },
                    {
                        "name": "702KC",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(126,36,90)"
                        }
                    },
                    {
                        "name": "\u65e5\u7cfb\u5b89\u5353",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(81,2,49)"
                        }
                    },
                    {
                        "name": "zflip4OPPO",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(106,102,107)"
                        }
                    },
                    {
                        "name": "K9S",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(155,107,49)"
                        }
                    },
                    {
                        "name": "5GA1",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(90,39,36)"
                        }
                    },
                    {
                        "name": "K10pro",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(48,134,71)"
                        }
                    },
                    {
                        "name": "reno",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(32,68,52)"
                        }
                    },
                    {
                        "name": "note95g",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(42,46,13)"
                        }
                    },
                    {
                        "name": "20e12",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(91,144,27)"
                        }
                    },
                    {
                        "name": "X60por",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(54,45,28)"
                        }
                    },
                    {
                        "name": "\u8fb9\u6846",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(45,73,154)"
                        }
                    },
                    {
                        "name": "opporeno7",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(56,140,35)"
                        }
                    },
                    {
                        "name": "Reno7Pro",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(111,29,120)"
                        }
                    },
                    {
                        "name": "Reno6vivo",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(136,39,53)"
                        }
                    },
                    {
                        "name": "\u5e7f\u4e1c",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(12,87,157)"
                        }
                    },
                    {
                        "name": "\u8521\u53f8",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(137,48,128)"
                        }
                    },
                    {
                        "name": "\u5c9b\u5927",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(42,28,125)"
                        }
                    },
                    {
                        "name": "8GeniQOO",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(6,81,34)"
                        }
                    },
                    {
                        "name": "Neo3",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(58,91,38)"
                        }
                    },
                    {
                        "name": "\u80f6\u56ca",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(142,159,115)"
                        }
                    },
                    {
                        "name": "Z5XIQOOZ5",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(104,150,52)"
                        }
                    },
                    {
                        "name": "5Gx40",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(78,99,16)"
                        }
                    },
                    {
                        "name": "se2",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(43,97,46)"
                        }
                    },
                    {
                        "name": "note12Samsung",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(13,160,57)"
                        }
                    },
                    {
                        "name": "Motorola",
                        "value": "3",
                        "textStyle": {
                            "color": "rgb(47,14,135)"
                        }
                    },
                    {
                        "name": "\u5c4f\u9001",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(0,98,20)"
                        }
                    },
                    {
                        "name": "\u5c4f\u9669\u82b1",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(29,84,127)"
                        }
                    },
                    {
                        "name": "\u539f\u795e\u7248",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(101,93,78)"
                        }
                    },
                    {
                        "name": "note11TproPhilips",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(84,84,4)"
                        }
                    },
                    {
                        "name": "E212A",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(22,58,134)"
                        }
                    },
                    {
                        "name": "gtSamsung",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(62,12,1)"
                        }
                    },
                    {
                        "name": "W21",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(54,58,57)"
                        }
                    },
                    {
                        "name": "W22",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(143,85,115)"
                        }
                    },
                    {
                        "name": "S22Uhonor",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(130,18,111)"
                        }
                    },
                    {
                        "name": "ipone14pro",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(37,124,85)"
                        }
                    },
                    {
                        "name": "7SProApple",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(114,88,45)"
                        }
                    },
                    {
                        "name": "\u7248\u7f8e",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(36,141,96)"
                        }
                    },
                    {
                        "name": "G9960",
                        "value": "3",
                        "textStyle": {
                            "color": "rgb(123,113,81)"
                        }
                    },
                    {
                        "name": "\u53cc\u5361\u4e09\u7f51",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(81,95,119)"
                        }
                    },
                    {
                        "name": "5gOPPO",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(20,45,60)"
                        }
                    },
                    {
                        "name": "\u624b\u9a81\u9f99",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(48,141,89)"
                        }
                    },
                    {
                        "name": "K10Pro",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(125,61,61)"
                        }
                    },
                    {
                        "name": "oppok10Huawei",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(111,30,63)"
                        }
                    },
                    {
                        "name": "\u76f4\u9500",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(135,57,52)"
                        }
                    },
                    {
                        "name": "\u4f18\u8d28",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(77,36,122)"
                        }
                    },
                    {
                        "name": "7199",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(114,62,117)"
                        }
                    },
                    {
                        "name": "\u673a\u7545\u4eab",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(143,132,97)"
                        }
                    },
                    {
                        "name": "\u68d2\u68d2",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(129,141,21)"
                        }
                    },
                    {
                        "name": "0pporneo8",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(82,28,89)"
                        }
                    },
                    {
                        "name": "por12",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(64,3,5)"
                        }
                    },
                    {
                        "name": "iPhone13Pro",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(54,50,138)"
                        }
                    },
                    {
                        "name": "hinova10",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(3,143,21)"
                        }
                    },
                    {
                        "name": "gtneo3",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(53,73,57)"
                        }
                    },
                    {
                        "name": "11Ultra",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(91,27,45)"
                        }
                    },
                    {
                        "name": "13Apple",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(111,129,138)"
                        }
                    },
                    {
                        "name": "11promax",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(39,91,28)"
                        }
                    },
                    {
                        "name": "x9",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(113,10,54)"
                        }
                    },
                    {
                        "name": "\u7eaa\u5ff5\u7248",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(94,91,129)"
                        }
                    },
                    {
                        "name": "pro5G",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(127,53,0)"
                        }
                    },
                    {
                        "name": "\u8c37\u6b4c",
                        "value": "5",
                        "textStyle": {
                            "color": "rgb(10,46,120)"
                        }
                    },
                    {
                        "name": "Google",
                        "value": "4",
                        "textStyle": {
                            "color": "rgb(94,158,139)"
                        }
                    },
                    {
                        "name": "pixel",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(8,62,23)"
                        }
                    },
                    {
                        "name": "Pixel",
                        "value": "9",
                        "textStyle": {
                            "color": "rgb(20,27,89)"
                        }
                    },
                    {
                        "name": "Pixel6",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(42,145,15)"
                        }
                    },
                    {
                        "name": "\u4e03\u4ee3",
                        "value": "3",
                        "textStyle": {
                            "color": "rgb(54,113,101)"
                        }
                    },
                    {
                        "name": "\u5feb\u53d1",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(121,131,74)"
                        }
                    },
                    {
                        "name": "1TB",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(151,133,86)"
                        }
                    },
                    {
                        "name": "\u900f\u660e",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(154,43,2)"
                        }
                    },
                    {
                        "name": "\u5c4f\u534e",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(107,78,137)"
                        }
                    },
                    {
                        "name": "10Avivo",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(141,77,109)"
                        }
                    },
                    {
                        "name": "vivoiq",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(88,9,66)"
                        }
                    },
                    {
                        "name": "iqoonoe7Apple",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(62,139,130)"
                        }
                    },
                    {
                        "name": "iPhoneX",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(115,114,37)"
                        }
                    },
                    {
                        "name": "F71103",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(26,89,13)"
                        }
                    },
                    {
                        "name": "fold3",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(148,99,156)"
                        }
                    },
                    {
                        "name": "\u5305\u90ae\u5168",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(79,15,95)"
                        }
                    },
                    {
                        "name": "40s",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(78,160,151)"
                        }
                    },
                    {
                        "name": "X20SE",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(102,60,2)"
                        }
                    },
                    {
                        "name": "50ProRS24",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(157,103,25)"
                        }
                    },
                    {
                        "name": "NOTE",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(11,97,153)"
                        }
                    },
                    {
                        "name": "note10Pro",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(92,141,117)"
                        }
                    },
                    {
                        "name": "K605G",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(85,41,54)"
                        }
                    },
                    {
                        "name": "k60Pro",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(64,4,40)"
                        }
                    },
                    {
                        "name": "realme10sApple",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(48,118,31)"
                        }
                    },
                    {
                        "name": "Note20",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(51,36,122)"
                        }
                    },
                    {
                        "name": "N9810",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(145,9,17)"
                        }
                    },
                    {
                        "name": "N20",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(133,141,73)"
                        }
                    },
                    {
                        "name": "N9700",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(14,43,135)"
                        }
                    },
                    {
                        "name": "NOTE10",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(87,85,88)"
                        }
                    },
                    {
                        "name": "855plus",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(109,95,107)"
                        }
                    },
                    {
                        "name": "\u4e13\u7528\u673a",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(153,66,111)"
                        }
                    },
                    {
                        "name": "helo2",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(107,123,33)"
                        }
                    },
                    {
                        "name": "8199",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(124,159,93)"
                        }
                    },
                    {
                        "name": "MaxSamsung",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(138,142,107)"
                        }
                    },
                    {
                        "name": "N9860",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(22,82,57)"
                        }
                    },
                    {
                        "name": "\u7f8e\u884c",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(66,109,160)"
                        }
                    },
                    {
                        "name": "\u8d34\u673a",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(87,19,83)"
                        }
                    },
                    {
                        "name": "\u900f\u660e\u7248",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(134,16,58)"
                        }
                    },
                    {
                        "name": "360N7N6",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(91,130,104)"
                        }
                    },
                    {
                        "name": "\u591a\u5f00",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(72,46,7)"
                        }
                    },
                    {
                        "name": "\u5e94\u7528",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(141,152,91)"
                        }
                    },
                    {
                        "name": "\u4f4d\u7f6e",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(107,53,149)"
                        }
                    },
                    {
                        "name": "\u7a7f\u8d8a",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(130,83,19)"
                        }
                    },
                    {
                        "name": "vivox21",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(49,128,77)"
                        }
                    },
                    {
                        "name": "x202023",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(120,104,72)"
                        }
                    },
                    {
                        "name": "X30ihonor",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(0,130,37)"
                        }
                    },
                    {
                        "name": "20i",
                        "value": "3",
                        "textStyle": {
                            "color": "rgb(22,135,36)"
                        }
                    },
                    {
                        "name": "\u5b89\u5353\u5927\u5c4f",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(61,120,147)"
                        }
                    },
                    {
                        "name": "\u53cc\u5361\u65e0\u9501",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(130,114,90)"
                        }
                    },
                    {
                        "name": "\u5f3a\u82af\u957f",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(47,56,45)"
                        }
                    },
                    {
                        "name": "vivoz5X",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(17,141,145)"
                        }
                    },
                    {
                        "name": "vivoz5",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(13,70,76)"
                        }
                    },
                    {
                        "name": "\u81f3\u81fb",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(76,14,127)"
                        }
                    },
                    {
                        "name": "S22U",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(71,98,7)"
                        }
                    },
                    {
                        "name": "neo5Apple",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(93,51,82)"
                        }
                    },
                    {
                        "name": "iphone13mini",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(60,4,8)"
                        }
                    },
                    {
                        "name": "13vivo",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(24,60,141)"
                        }
                    },
                    {
                        "name": "10vivo",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(43,83,77)"
                        }
                    },
                    {
                        "name": "X9S",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(77,44,14)"
                        }
                    },
                    {
                        "name": "\u9762\u90e8",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(121,121,99)"
                        }
                    },
                    {
                        "name": "\u8bc6\u522b",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(15,148,18)"
                        }
                    },
                    {
                        "name": "OPPOR17",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(73,36,24)"
                        }
                    },
                    {
                        "name": "OPPOr15",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(53,130,5)"
                        }
                    },
                    {
                        "name": "\u68a6\u5883",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(147,103,120)"
                        }
                    },
                    {
                        "name": "gt2",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(13,66,128)"
                        }
                    },
                    {
                        "name": "nove9",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(59,6,79)"
                        }
                    },
                    {
                        "name": "80SE",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(69,116,29)"
                        }
                    },
                    {
                        "name": "iq00Z6x",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(76,54,73)"
                        }
                    },
                    {
                        "name": "iqpp",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(16,76,48)"
                        }
                    },
                    {
                        "name": "iqooneo5s",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(88,76,96)"
                        }
                    },
                    {
                        "name": "iqooneo5",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(53,58,144)"
                        }
                    },
                    {
                        "name": "neo5s",
                        "value": "3",
                        "textStyle": {
                            "color": "rgb(2,98,84)"
                        }
                    },
                    {
                        "name": "iqoo5neo5se",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(78,68,66)"
                        }
                    },
                    {
                        "name": "Z6x24",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(0,4,55)"
                        }
                    },
                    {
                        "name": "realmegtneo2",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(151,67,54)"
                        }
                    },
                    {
                        "name": "gtneo",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(138,43,94)"
                        }
                    },
                    {
                        "name": "\u5185\u901f\u53d1",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(143,85,78)"
                        }
                    },
                    {
                        "name": "\u5c4f\u95ea\u5145",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(41,105,149)"
                        }
                    },
                    {
                        "name": "lPhone",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(105,42,14)"
                        }
                    },
                    {
                        "name": "6splus",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(132,148,101)"
                        }
                    },
                    {
                        "name": "y77pro",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(84,104,2)"
                        }
                    },
                    {
                        "name": "y76",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(159,48,43)"
                        }
                    },
                    {
                        "name": "y55",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(135,156,0)"
                        }
                    },
                    {
                        "name": "y33vivo",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(75,120,110)"
                        }
                    },
                    {
                        "name": "vivot2x",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(82,145,8)"
                        }
                    },
                    {
                        "name": "t2",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(111,106,135)"
                        }
                    },
                    {
                        "name": "Y32",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(26,64,79)"
                        }
                    },
                    {
                        "name": "32t",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(31,19,122)"
                        }
                    },
                    {
                        "name": "vivoy32y30",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(28,128,127)"
                        }
                    },
                    {
                        "name": "\u4e07\u4e8b",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(5,139,22)"
                        }
                    },
                    {
                        "name": "k30S",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(100,129,26)"
                        }
                    },
                    {
                        "name": "iphone8plus",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(28,24,26)"
                        }
                    },
                    {
                        "name": "8p",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(46,101,113)"
                        }
                    },
                    {
                        "name": "K60qopo",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(125,22,74)"
                        }
                    },
                    {
                        "name": "A55S",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(30,23,133)"
                        }
                    },
                    {
                        "name": "oppoa55s",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(71,66,25)"
                        }
                    },
                    {
                        "name": "a93",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(53,110,105)"
                        }
                    },
                    {
                        "name": "vivot2",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(44,16,159)"
                        }
                    },
                    {
                        "name": "vivot1x",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(30,34,138)"
                        }
                    },
                    {
                        "name": "vivou5",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(143,51,13)"
                        }
                    },
                    {
                        "name": "iqoou5",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(109,11,117)"
                        }
                    },
                    {
                        "name": "vovou5",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(12,37,133)"
                        }
                    },
                    {
                        "name": "T9",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(145,51,47)"
                        }
                    },
                    {
                        "name": "160",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(109,66,84)"
                        }
                    },
                    {
                        "name": "7Pro",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(153,71,63)"
                        }
                    },
                    {
                        "name": "P40Huawei",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(124,34,35)"
                        }
                    },
                    {
                        "name": "\u53cc\u5361\u66f2\u5c4f",
                        "value": "3",
                        "textStyle": {
                            "color": "rgb(93,20,24)"
                        }
                    },
                    {
                        "name": "\u5206\u671f\u4ed8\u6b3e",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(1,12,17)"
                        }
                    },
                    {
                        "name": "\u5145\u8363",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(116,94,80)"
                        }
                    },
                    {
                        "name": "R15X",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(58,103,82)"
                        }
                    },
                    {
                        "name": "m40",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(57,106,40)"
                        }
                    },
                    {
                        "name": "\u65d7\u5b98",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(140,82,23)"
                        }
                    },
                    {
                        "name": "mate40Pro",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(99,140,36)"
                        }
                    },
                    {
                        "name": "13proMax",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(82,125,97)"
                        }
                    },
                    {
                        "name": "minivivo",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(148,160,78)"
                        }
                    },
                    {
                        "name": "s9",
                        "value": "3",
                        "textStyle": {
                            "color": "rgb(150,49,19)"
                        }
                    },
                    {
                        "name": "NFChonor",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(77,26,95)"
                        }
                    },
                    {
                        "name": "V20",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(24,21,91)"
                        }
                    },
                    {
                        "name": "\u5237\u65b0\u7387",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(75,14,76)"
                        }
                    },
                    {
                        "name": "XD4HUAWEI",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(37,64,43)"
                        }
                    },
                    {
                        "name": "iqooz5x",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(137,30,76)"
                        }
                    },
                    {
                        "name": "Reno5",
                        "value": "4",
                        "textStyle": {
                            "color": "rgb(62,5,43)"
                        }
                    },
                    {
                        "name": "reno524",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(110,44,37)"
                        }
                    },
                    {
                        "name": "s15",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(85,92,92)"
                        }
                    },
                    {
                        "name": "XSMax",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(158,149,80)"
                        }
                    },
                    {
                        "name": "660",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(135,73,48)"
                        }
                    },
                    {
                        "name": "Plus5G",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(65,99,68)"
                        }
                    },
                    {
                        "name": "14Promaxvivo",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(3,26,19)"
                        }
                    },
                    {
                        "name": "noe7",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(150,142,80)"
                        }
                    },
                    {
                        "name": "iq7",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(99,117,160)"
                        }
                    },
                    {
                        "name": "iq7se",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(137,114,0)"
                        }
                    },
                    {
                        "name": "\u788e\u5c4f",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(66,117,115)"
                        }
                    },
                    {
                        "name": "\u5b9d\u7ea2\u7c73",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(62,111,113)"
                        }
                    },
                    {
                        "name": "12Spro",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(4,136,28)"
                        }
                    },
                    {
                        "name": "\u6b66\u6c49",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(10,19,87)"
                        }
                    },
                    {
                        "name": "\u8001\u77f3",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(52,72,45)"
                        }
                    },
                    {
                        "name": "\u6234\u5f71",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(80,24,110)"
                        }
                    },
                    {
                        "name": "x8",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(106,41,25)"
                        }
                    },
                    {
                        "name": "6se",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(77,70,93)"
                        }
                    },
                    {
                        "name": "iqoo10prooneplus",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(157,85,90)"
                        }
                    },
                    {
                        "name": "105G",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(22,54,89)"
                        }
                    },
                    {
                        "name": "\u661f\u73af",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(54,3,28)"
                        }
                    },
                    {
                        "name": "\u547c\u5438",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(45,74,4)"
                        }
                    },
                    {
                        "name": "A95",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(22,2,16)"
                        }
                    },
                    {
                        "name": "XIAOMI",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(8,7,145)"
                        }
                    },
                    {
                        "name": "\u9676\u74f7",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(85,37,18)"
                        }
                    },
                    {
                        "name": "\u4e00\u4f53\u5316",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(45,39,143)"
                        }
                    },
                    {
                        "name": "\u673a\u8eab",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(73,54,141)"
                        }
                    },
                    {
                        "name": "9PLUS",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(114,108,96)"
                        }
                    },
                    {
                        "name": "SE1",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(79,2,125)"
                        }
                    },
                    {
                        "name": "Nova9",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(87,28,33)"
                        }
                    },
                    {
                        "name": "2660Flip",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(68,15,149)"
                        }
                    },
                    {
                        "name": "i13mini",
                        "value": "4",
                        "textStyle": {
                            "color": "rgb(5,140,57)"
                        }
                    },
                    {
                        "name": "Y1pro",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(151,87,65)"
                        }
                    },
                    {
                        "name": "\u8425\u9500",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(66,86,64)"
                        }
                    },
                    {
                        "name": "\u9886\u8896",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(66,150,39)"
                        }
                    },
                    {
                        "name": "\u8d62\u5ba2",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(71,127,129)"
                        }
                    },
                    {
                        "name": "\u8682\u8681",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(4,10,44)"
                        }
                    },
                    {
                        "name": "\u5fae\u5546",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(123,55,53)"
                        }
                    },
                    {
                        "name": "Sony",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(8,55,133)"
                        }
                    },
                    {
                        "name": "\u7d22\u5c3c",
                        "value": "3",
                        "textStyle": {
                            "color": "rgb(160,64,43)"
                        }
                    },
                    {
                        "name": "J9210Xperia",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(129,103,100)"
                        }
                    },
                    {
                        "name": "x1ii",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(36,84,24)"
                        }
                    },
                    {
                        "name": "765",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(16,122,20)"
                        }
                    },
                    {
                        "name": "50provivo",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(153,111,132)"
                        }
                    },
                    {
                        "name": "\u5bf8\u5927\u5c4f",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(66,56,123)"
                        }
                    },
                    {
                        "name": "XnoteSamsung",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(152,70,104)"
                        }
                    },
                    {
                        "name": "S21U",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(74,59,36)"
                        }
                    },
                    {
                        "name": "\u5145\u4e70",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(12,145,124)"
                        }
                    },
                    {
                        "name": "z6se",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(70,21,71)"
                        }
                    },
                    {
                        "name": "seXD4",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(19,8,154)"
                        }
                    },
                    {
                        "name": "oppok10XD4HONOR",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(6,32,117)"
                        }
                    },
                    {
                        "name": "root",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(110,57,100)"
                        }
                    },
                    {
                        "name": "NFC2",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(43,65,67)"
                        }
                    },
                    {
                        "name": "q5i",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(22,124,41)"
                        }
                    },
                    {
                        "name": "q5vivo",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(71,97,93)"
                        }
                    },
                    {
                        "name": "vivoS16",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(32,131,123)"
                        }
                    },
                    {
                        "name": "vivoS16pro",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(37,132,17)"
                        }
                    },
                    {
                        "name": "S12Huawei",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(44,103,31)"
                        }
                    },
                    {
                        "name": "980Mate20pro",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(42,51,119)"
                        }
                    },
                    {
                        "name": "vivoiqoo10pro",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(153,58,142)"
                        }
                    },
                    {
                        "name": "iqoo8",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(74,90,112)"
                        }
                    },
                    {
                        "name": "9aHuawei",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(56,77,48)"
                        }
                    },
                    {
                        "name": "Z5Samsung",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(78,43,36)"
                        }
                    },
                    {
                        "name": "S21Ultra",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(77,157,113)"
                        }
                    },
                    {
                        "name": "5GLG",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(156,61,117)"
                        }
                    },
                    {
                        "name": "\u5c4f\u7535",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(107,93,67)"
                        }
                    },
                    {
                        "name": "P9",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(21,2,116)"
                        }
                    },
                    {
                        "name": "mt50proRS",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(24,14,79)"
                        }
                    },
                    {
                        "name": "opop",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(6,10,129)"
                        }
                    },
                    {
                        "name": "vivoX27pro",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(135,105,82)"
                        }
                    },
                    {
                        "name": "E535",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(68,127,109)"
                        }
                    },
                    {
                        "name": "360",
                        "value": "3",
                        "textStyle": {
                            "color": "rgb(28,28,29)"
                        }
                    },
                    {
                        "name": "N7",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(68,155,30)"
                        }
                    },
                    {
                        "name": "\u8f6f\u4ef6",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(55,109,130)"
                        }
                    },
                    {
                        "name": "360n6pro",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(35,154,60)"
                        }
                    },
                    {
                        "name": "5710",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(151,105,28)"
                        }
                    },
                    {
                        "name": "XpressAudio",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(115,84,7)"
                        }
                    },
                    {
                        "name": "\u4fa7\u8fb9",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(150,67,12)"
                        }
                    },
                    {
                        "name": "\u82af\u95ea",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(115,6,52)"
                        }
                    },
                    {
                        "name": "realme10sOPPOk9x",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(61,68,5)"
                        }
                    },
                    {
                        "name": "\u6025\u901f",
                        "value": "3",
                        "textStyle": {
                            "color": "rgb(9,74,138)"
                        }
                    },
                    {
                        "name": "FindN",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(45,101,46)"
                        }
                    },
                    {
                        "name": "6.6",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(88,140,17)"
                        }
                    },
                    {
                        "name": "oppok9",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(49,28,106)"
                        }
                    },
                    {
                        "name": "2022oppok9pro",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(124,45,130)"
                        }
                    },
                    {
                        "name": "gtneo3OPPO",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(95,59,138)"
                        }
                    },
                    {
                        "name": "K5",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(56,48,18)"
                        }
                    },
                    {
                        "name": "730G",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(75,42,157)"
                        }
                    },
                    {
                        "name": "680",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(147,77,158)"
                        }
                    },
                    {
                        "name": "p60",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(113,29,127)"
                        }
                    },
                    {
                        "name": "Harmony0SSamsung",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(7,145,34)"
                        }
                    },
                    {
                        "name": "450",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(38,74,159)"
                        }
                    },
                    {
                        "name": "\u4e0b\u62c9",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(101,73,120)"
                        }
                    },
                    {
                        "name": "VC",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(122,54,3)"
                        }
                    },
                    {
                        "name": "XD44G",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(80,26,121)"
                        }
                    },
                    {
                        "name": "FindX5",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(104,158,139)"
                        }
                    },
                    {
                        "name": "oppofindx5",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(68,92,136)"
                        }
                    },
                    {
                        "name": "0ppofindx3x4pro",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(80,110,144)"
                        }
                    },
                    {
                        "name": "x6",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(97,158,149)"
                        }
                    },
                    {
                        "name": "nova10z",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(59,114,124)"
                        }
                    },
                    {
                        "name": "matee50",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(71,56,37)"
                        }
                    },
                    {
                        "name": "X50",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(84,60,121)"
                        }
                    },
                    {
                        "name": "x30pro",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(132,97,0)"
                        }
                    },
                    {
                        "name": "X27HUAWEI",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(28,140,66)"
                        }
                    },
                    {
                        "name": "XT2071",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(95,40,135)"
                        }
                    },
                    {
                        "name": "RAZR",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(68,54,48)"
                        }
                    },
                    {
                        "name": "5Gmoto",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(51,74,123)"
                        }
                    },
                    {
                        "name": "razr2020",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(109,140,82)"
                        }
                    },
                    {
                        "name": "8100MAX",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(144,78,24)"
                        }
                    },
                    {
                        "name": "\u7ade\u7248",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(142,74,98)"
                        }
                    },
                    {
                        "name": "K50Pro",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(143,96,52)"
                        }
                    },
                    {
                        "name": "GT2PRO",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(127,35,136)"
                        }
                    },
                    {
                        "name": "12Promax",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(87,101,38)"
                        }
                    },
                    {
                        "name": "\u540d\u8d60",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(4,37,34)"
                        }
                    },
                    {
                        "name": "5G7.43",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(158,36,72)"
                        }
                    },
                    {
                        "name": "4GX23",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(112,110,34)"
                        }
                    },
                    {
                        "name": "\u4ef7\u5927\u5c4f",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(106,141,32)"
                        }
                    },
                    {
                        "name": "W9023ZKDCHCW2023",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(153,159,76)"
                        }
                    },
                    {
                        "name": "W23FlipApple",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(14,29,86)"
                        }
                    },
                    {
                        "name": "14Max",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(68,139,29)"
                        }
                    },
                    {
                        "name": "HarmonyOS2",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(68,135,123)"
                        }
                    },
                    {
                        "name": "p50pro",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(25,44,151)"
                        }
                    },
                    {
                        "name": "\u671f\u9001",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(45,33,27)"
                        }
                    },
                    {
                        "name": "2700",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(80,77,156)"
                        }
                    },
                    {
                        "name": "X20honor",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(11,123,139)"
                        }
                    },
                    {
                        "name": "820",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(136,23,130)"
                        }
                    },
                    {
                        "name": "minihonor",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(125,127,133)"
                        }
                    },
                    {
                        "name": "7x",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(105,108,47)"
                        }
                    },
                    {
                        "name": "A32",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(79,56,52)"
                        }
                    },
                    {
                        "name": "oppoa32",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(93,101,49)"
                        }
                    },
                    {
                        "name": "780",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(154,4,126)"
                        }
                    },
                    {
                        "name": "XiaoMi",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(151,136,140)"
                        }
                    },
                    {
                        "name": "y76S",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(100,88,116)"
                        }
                    },
                    {
                        "name": "\u7f51\u7edc",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(5,34,40)"
                        }
                    },
                    {
                        "name": "K50Ultra5G",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(105,125,45)"
                        }
                    },
                    {
                        "name": "iq00z6x",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(47,65,64)"
                        }
                    },
                    {
                        "name": "max5G",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(67,78,83)"
                        }
                    },
                    {
                        "name": "2028",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(96,74,118)"
                        }
                    },
                    {
                        "name": "Mate50Pro",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(23,96,106)"
                        }
                    },
                    {
                        "name": "VELVET",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(56,148,5)"
                        }
                    },
                    {
                        "name": "G9",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(60,9,27)"
                        }
                    },
                    {
                        "name": "\u8f6c\u64ad",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(15,95,158)"
                        }
                    },
                    {
                        "name": "\u5206\u8eab",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(101,144,118)"
                        }
                    },
                    {
                        "name": "\u591a\u529f\u80fd",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(98,160,81)"
                        }
                    },
                    {
                        "name": "0pporeno8",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(101,106,157)"
                        }
                    },
                    {
                        "name": "rone95gApple",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(26,110,158)"
                        }
                    },
                    {
                        "name": "\u5bf8\u5c0f\u5c4f",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(158,148,79)"
                        }
                    },
                    {
                        "name": "aecpro",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(93,87,17)"
                        }
                    },
                    {
                        "name": "30vivo",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(116,156,152)"
                        }
                    },
                    {
                        "name": "\u793c\u4e3a",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(106,118,97)"
                        }
                    },
                    {
                        "name": "realmegtneo3MIUI",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(33,101,123)"
                        }
                    },
                    {
                        "name": "Play6TPro",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(67,105,95)"
                        }
                    },
                    {
                        "name": "6.57",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(128,121,67)"
                        }
                    },
                    {
                        "name": "\u9009\u9ed1",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(84,105,132)"
                        }
                    },
                    {
                        "name": "4pro",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(92,130,132)"
                        }
                    },
                    {
                        "name": "5rsHONOR",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(130,141,123)"
                        }
                    },
                    {
                        "name": "8aiQOO",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(99,8,156)"
                        }
                    },
                    {
                        "name": "iphone",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(95,66,20)"
                        }
                    },
                    {
                        "name": "\u5c4f\u5feb",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(93,113,56)"
                        }
                    },
                    {
                        "name": "\u76f8\u673a",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(142,49,158)"
                        }
                    },
                    {
                        "name": "iqooz5vivoz5",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(10,141,40)"
                        }
                    },
                    {
                        "name": "IQOO5",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(88,29,77)"
                        }
                    },
                    {
                        "name": "IQOOZ5Xvivo",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(102,53,82)"
                        }
                    },
                    {
                        "name": "y55s",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(75,92,89)"
                        }
                    },
                    {
                        "name": "y77ProApple",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(115,76,132)"
                        }
                    },
                    {
                        "name": "note12proOPPO",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(1,33,109)"
                        }
                    },
                    {
                        "name": "a9A8",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(75,30,117)"
                        }
                    },
                    {
                        "name": "2159",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(19,143,18)"
                        }
                    },
                    {
                        "name": "IMX766",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(95,46,140)"
                        }
                    },
                    {
                        "name": "\u4e3b\u6444",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(24,138,92)"
                        }
                    },
                    {
                        "name": "realmeGT2",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(45,74,113)"
                        }
                    },
                    {
                        "name": "MT50proRS",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(75,16,126)"
                        }
                    },
                    {
                        "name": "70XD4",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(95,49,25)"
                        }
                    },
                    {
                        "name": "mate50e",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(73,133,1)"
                        }
                    },
                    {
                        "name": "50se",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(119,157,21)"
                        }
                    },
                    {
                        "name": "60LG",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(148,50,101)"
                        }
                    },
                    {
                        "name": "V50ThinQ",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(18,88,107)"
                        }
                    },
                    {
                        "name": "BlackBerry",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(148,40,99)"
                        }
                    },
                    {
                        "name": "KEY2",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(26,26,10)"
                        }
                    },
                    {
                        "name": "Q10",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(130,76,115)"
                        }
                    },
                    {
                        "name": "SE3",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(106,59,1)"
                        }
                    },
                    {
                        "name": "\u76f2\u4eba",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(16,137,7)"
                        }
                    },
                    {
                        "name": "\u70b9\u660e",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(51,43,159)"
                        }
                    },
                    {
                        "name": "\u58f0\u63a7",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(74,61,155)"
                        }
                    },
                    {
                        "name": "20se",
                        "value": "3",
                        "textStyle": {
                            "color": "rgb(18,54,48)"
                        }
                    },
                    {
                        "name": "oppofindn2",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(111,124,141)"
                        }
                    },
                    {
                        "name": "30s",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(147,113,83)"
                        }
                    },
                    {
                        "name": "Reno6",
                        "value": "5",
                        "textStyle": {
                            "color": "rgb(158,83,79)"
                        }
                    },
                    {
                        "name": "12promax5G",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(104,13,117)"
                        }
                    },
                    {
                        "name": "12minHUAWEI",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(16,60,61)"
                        }
                    },
                    {
                        "name": "888Plus",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(27,122,94)"
                        }
                    },
                    {
                        "name": "motoS30X30pro",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(77,105,67)"
                        }
                    },
                    {
                        "name": "\u53cc\u9762",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(8,89,142)"
                        }
                    },
                    {
                        "name": "\u987a\u4e30\u901f",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(110,48,108)"
                        }
                    },
                    {
                        "name": "\u53d1\u4e09",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(94,18,111)"
                        }
                    },
                    {
                        "name": "\u667a\u80fd\u7f51",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(61,6,2)"
                        }
                    },
                    {
                        "name": "\u8896\u73cd",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(88,66,65)"
                        }
                    },
                    {
                        "name": "\u5b66\u4e60\u673a",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(28,74,122)"
                        }
                    },
                    {
                        "name": "Reno7SEReno7",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(36,91,54)"
                        }
                    },
                    {
                        "name": "A55s",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(123,132,10)"
                        }
                    },
                    {
                        "name": "oppoa56",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(57,46,144)"
                        }
                    },
                    {
                        "name": "a55sMIUI",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(56,30,70)"
                        }
                    },
                    {
                        "name": "ultra12X",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(10,12,43)"
                        }
                    },
                    {
                        "name": "13Huawei",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(19,124,100)"
                        }
                    },
                    {
                        "name": "990p40pro",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(87,117,124)"
                        }
                    },
                    {
                        "name": "P40PRO",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(131,117,36)"
                        }
                    },
                    {
                        "name": "oppok10Pro",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(153,43,120)"
                        }
                    },
                    {
                        "name": "k40pro",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(84,1,107)"
                        }
                    },
                    {
                        "name": "realme10sXiaomi",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(132,71,120)"
                        }
                    },
                    {
                        "name": "vivoneo5s",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(101,34,108)"
                        }
                    },
                    {
                        "name": "iqooneoneo5s",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(40,73,28)"
                        }
                    },
                    {
                        "name": "\u9177\u6d3e",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(95,32,128)"
                        }
                    },
                    {
                        "name": "COOL",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(129,92,45)"
                        }
                    },
                    {
                        "name": "7s",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(126,83,96)"
                        }
                    },
                    {
                        "name": "ProOPPO",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(44,49,141)"
                        }
                    },
                    {
                        "name": "50zApple",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(106,144,159)"
                        }
                    },
                    {
                        "name": "nove",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(159,93,3)"
                        }
                    },
                    {
                        "name": "NEO5SHuawei",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(129,99,62)"
                        }
                    },
                    {
                        "name": "\u7248\u7ea2\u7c73",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(16,26,67)"
                        }
                    },
                    {
                        "name": "iQOOApple",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(0,148,29)"
                        }
                    },
                    {
                        "name": "8P128GB",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(88,119,18)"
                        }
                    },
                    {
                        "name": "p50E",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(40,21,24)"
                        }
                    },
                    {
                        "name": "k9xk9s",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(123,117,152)"
                        }
                    },
                    {
                        "name": "0ppok9pro",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(155,20,7)"
                        }
                    },
                    {
                        "name": "880",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(109,120,10)"
                        }
                    },
                    {
                        "name": "ultraApple",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(81,10,24)"
                        }
                    },
                    {
                        "name": "\u4ee3\u5c0f\u5c4f",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(38,92,154)"
                        }
                    },
                    {
                        "name": "6.55",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(6,20,143)"
                        }
                    },
                    {
                        "name": "reno5",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(150,97,25)"
                        }
                    },
                    {
                        "name": "x90p",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(58,39,128)"
                        }
                    },
                    {
                        "name": "y33",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(67,89,53)"
                        }
                    },
                    {
                        "name": "\u7528\u6237",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(53,118,76)"
                        }
                    },
                    {
                        "name": "s16eApple",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(7,23,105)"
                        }
                    },
                    {
                        "name": "PROmax",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(52,143,129)"
                        }
                    },
                    {
                        "name": "HK",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(6,149,135)"
                        }
                    },
                    {
                        "name": "US",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(49,103,64)"
                        }
                    },
                    {
                        "name": "\u9ed1\u89e3",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(133,143,103)"
                        }
                    },
                    {
                        "name": "\u6e2f\u5168",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(43,83,134)"
                        }
                    },
                    {
                        "name": "13min",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(55,34,139)"
                        }
                    },
                    {
                        "name": "V16D",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(70,116,7)"
                        }
                    },
                    {
                        "name": "realme10svivo",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(14,147,55)"
                        }
                    },
                    {
                        "name": "iqqou5",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(17,112,104)"
                        }
                    },
                    {
                        "name": "viv0u5x",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(16,64,85)"
                        }
                    },
                    {
                        "name": "u6",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(114,0,14)"
                        }
                    },
                    {
                        "name": "iqu3x",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(62,80,23)"
                        }
                    },
                    {
                        "name": "\u5341\u4e8c",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(128,146,27)"
                        }
                    },
                    {
                        "name": "P18",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(81,85,136)"
                        }
                    },
                    {
                        "name": "\u4e09\u5e74",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(130,82,104)"
                        }
                    },
                    {
                        "name": "Y5S",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(126,104,59)"
                        }
                    },
                    {
                        "name": "5000Ah",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(122,92,127)"
                        }
                    },
                    {
                        "name": "Y7s",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(53,143,121)"
                        }
                    },
                    {
                        "name": "Y3",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(23,95,130)"
                        }
                    },
                    {
                        "name": "\u4e07\u56db\u6444",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(63,20,38)"
                        }
                    },
                    {
                        "name": "meilan",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(71,68,160)"
                        }
                    },
                    {
                        "name": "12proHuawei",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(80,58,135)"
                        }
                    },
                    {
                        "name": "299",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(160,40,121)"
                        }
                    },
                    {
                        "name": "y52s",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(120,10,43)"
                        }
                    },
                    {
                        "name": "y30",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(80,43,146)"
                        }
                    },
                    {
                        "name": "ipooz6",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(116,91,100)"
                        }
                    },
                    {
                        "name": "\u4e2d\u56fd\u8054\u901a",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(97,101,8)"
                        }
                    },
                    {
                        "name": "\u89c6\u754c",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(111,112,75)"
                        }
                    },
                    {
                        "name": "NB20",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(116,103,39)"
                        }
                    },
                    {
                        "name": "2XL",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(28,25,55)"
                        }
                    },
                    {
                        "name": "\u539f\u751f",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(103,46,57)"
                        }
                    },
                    {
                        "name": "pixel3",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(91,41,71)"
                        }
                    },
                    {
                        "name": "GOFLY",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(146,57,141)"
                        }
                    },
                    {
                        "name": "S5",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(109,106,85)"
                        }
                    },
                    {
                        "name": "\u9a91\u624b",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(51,89,58)"
                        }
                    },
                    {
                        "name": "9900",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(87,95,5)"
                        }
                    },
                    {
                        "name": "3288",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(87,135,72)"
                        }
                    },
                    {
                        "name": "\u6570\u5b57",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(26,95,120)"
                        }
                    },
                    {
                        "name": "\u53d8\u7126",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(22,137,93)"
                        }
                    },
                    {
                        "name": "\u6362\u673a",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(81,152,154)"
                        }
                    },
                    {
                        "name": "MateXs2",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(38,39,95)"
                        }
                    },
                    {
                        "name": "\u5178\u85cf\u7248",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(96,137,93)"
                        }
                    },
                    {
                        "name": "\u4e8c\u4ee3",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(136,151,110)"
                        }
                    },
                    {
                        "name": "vivoy73T24",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(131,4,42)"
                        }
                    },
                    {
                        "name": "acepro2023",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(81,7,157)"
                        }
                    },
                    {
                        "name": "40Plus",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(48,88,47)"
                        }
                    },
                    {
                        "name": "50W",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(95,116,33)"
                        }
                    },
                    {
                        "name": "x90x90pro",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(97,132,118)"
                        }
                    },
                    {
                        "name": "k40S",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(134,155,93)"
                        }
                    },
                    {
                        "name": "10se",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(26,93,39)"
                        }
                    },
                    {
                        "name": "XQ",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(14,65,51)"
                        }
                    },
                    {
                        "name": "BC72",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(107,67,135)"
                        }
                    },
                    {
                        "name": "X5III",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(159,32,86)"
                        }
                    },
                    {
                        "name": "X1",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(47,89,11)"
                        }
                    },
                    {
                        "name": "\u9a6c\u514b",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(48,156,125)"
                        }
                    },
                    {
                        "name": "Xperia1III",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(156,72,129)"
                        }
                    },
                    {
                        "name": "X10IIIrealme",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(127,47,89)"
                        }
                    },
                    {
                        "name": "NEO",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(111,61,97)"
                        }
                    },
                    {
                        "name": "150HUAWEI",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(111,142,115)"
                        }
                    },
                    {
                        "name": "noav5i",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(91,150,83)"
                        }
                    },
                    {
                        "name": "980OPPO",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(145,89,101)"
                        }
                    },
                    {
                        "name": "k9X",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(145,104,91)"
                        }
                    },
                    {
                        "name": "810vivo",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(78,21,86)"
                        }
                    },
                    {
                        "name": "reno8pro24",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(5,62,10)"
                        }
                    },
                    {
                        "name": "7499",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(139,68,139)"
                        }
                    },
                    {
                        "name": "45w",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(143,86,103)"
                        }
                    },
                    {
                        "name": "S22Ultra",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(151,92,75)"
                        }
                    },
                    {
                        "name": "\u5145\u5934",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(118,88,56)"
                        }
                    },
                    {
                        "name": "MaxHuawei",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(77,153,34)"
                        }
                    },
                    {
                        "name": "nova7honor",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(54,119,22)"
                        }
                    },
                    {
                        "name": "y77e",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(100,45,87)"
                        }
                    },
                    {
                        "name": "y76sy33sy55s",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(97,15,32)"
                        }
                    },
                    {
                        "name": "o8por",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(43,3,100)"
                        }
                    },
                    {
                        "name": "14plusSamsung",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(60,96,3)"
                        }
                    },
                    {
                        "name": "A8s",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(4,93,27)"
                        }
                    },
                    {
                        "name": "G8870",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(83,77,135)"
                        }
                    },
                    {
                        "name": "A6S",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(134,85,14)"
                        }
                    },
                    {
                        "name": "G6200",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(84,0,54)"
                        }
                    },
                    {
                        "name": "A9S",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(154,133,81)"
                        }
                    },
                    {
                        "name": "A9200vivo",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(111,0,50)"
                        }
                    },
                    {
                        "name": "Q10ProHuawei",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(87,142,34)"
                        }
                    },
                    {
                        "name": "\u5168\u5c4f",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(93,17,87)"
                        }
                    },
                    {
                        "name": "opporeno6",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(146,158,80)"
                        }
                    },
                    {
                        "name": "Reno524",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(4,142,48)"
                        }
                    },
                    {
                        "name": "k60E",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(92,151,133)"
                        }
                    },
                    {
                        "name": "qin1s",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(158,18,56)"
                        }
                    },
                    {
                        "name": "ai",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(55,48,36)"
                        }
                    },
                    {
                        "name": "\u673a\u65e0",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(25,7,0)"
                        }
                    },
                    {
                        "name": "\u7ea2\u5916",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(123,76,18)"
                        }
                    },
                    {
                        "name": "\u8d85\u8f7b",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(79,89,111)"
                        }
                    },
                    {
                        "name": "\u591a\u89d2\u5ea6",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(91,38,111)"
                        }
                    },
                    {
                        "name": "\u81ea\u7531",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(96,79,90)"
                        }
                    },
                    {
                        "name": "\u60ac\u505c",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(141,113,159)"
                        }
                    },
                    {
                        "name": "lqooneo6se",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(43,118,136)"
                        }
                    },
                    {
                        "name": "a93a95a9724",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(32,13,95)"
                        }
                    },
                    {
                        "name": "\u8d85\u5149",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(132,27,53)"
                        }
                    },
                    {
                        "name": "40honor",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(38,132,26)"
                        }
                    },
                    {
                        "name": "970",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(27,67,111)"
                        }
                    },
                    {
                        "name": "Y52T",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(31,27,6)"
                        }
                    },
                    {
                        "name": "Note20ultra",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(60,128,135)"
                        }
                    },
                    {
                        "name": "N20U",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(92,92,116)"
                        }
                    },
                    {
                        "name": "E528",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(7,131,103)"
                        }
                    },
                    {
                        "name": "K230",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(153,144,96)"
                        }
                    },
                    {
                        "name": "\u7248\u5929\u7ffc",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(113,49,63)"
                        }
                    },
                    {
                        "name": "10Pro1",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(125,93,160)"
                        }
                    },
                    {
                        "name": "8Neo6",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(53,153,26)"
                        }
                    },
                    {
                        "name": "neo5SE",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(100,80,160)"
                        }
                    },
                    {
                        "name": "K50PRO",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(22,151,68)"
                        }
                    },
                    {
                        "name": "vivis16",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(66,28,146)"
                        }
                    },
                    {
                        "name": "vivo2023",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(60,81,49)"
                        }
                    },
                    {
                        "name": "x40gtx40",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(74,118,159)"
                        }
                    },
                    {
                        "name": "440",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(138,102,132)"
                        }
                    },
                    {
                        "name": "32",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(23,142,112)"
                        }
                    },
                    {
                        "name": "30plusWDLEE",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(50,1,99)"
                        }
                    },
                    {
                        "name": "\u5fb7\u5229",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(72,71,87)"
                        }
                    },
                    {
                        "name": "Reno4",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(142,38,108)"
                        }
                    },
                    {
                        "name": "6.43",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(145,140,99)"
                        }
                    },
                    {
                        "name": "\u7f57\u6c38\u6d69",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(17,97,46)"
                        }
                    },
                    {
                        "name": "k9x7Samsung",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(156,17,146)"
                        }
                    },
                    {
                        "name": "\u4e09\u4ee3",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(110,110,117)"
                        }
                    },
                    {
                        "name": "40pro",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(130,151,6)"
                        }
                    },
                    {
                        "name": "4XL",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(131,71,79)"
                        }
                    },
                    {
                        "name": "\u4ee3\u8c37\u6b4c",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(13,46,66)"
                        }
                    },
                    {
                        "name": "\u6e2f\u6fb3",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(90,83,118)"
                        }
                    },
                    {
                        "name": "4Ppro",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(65,84,34)"
                        }
                    },
                    {
                        "name": "5OPPO",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(40,44,25)"
                        }
                    },
                    {
                        "name": "10Apple",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(51,91,3)"
                        }
                    },
                    {
                        "name": "iq00neo6se",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(160,75,99)"
                        }
                    },
                    {
                        "name": "F21pro",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(39,85,134)"
                        }
                    },
                    {
                        "name": "\u5347\u7ea7\u7248",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(19,17,45)"
                        }
                    },
                    {
                        "name": "\u7535\u5b50\u5382",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(157,0,89)"
                        }
                    },
                    {
                        "name": "\u7092\u80a1",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(89,104,160)"
                        }
                    },
                    {
                        "name": "WIFI",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(98,62,135)"
                        }
                    },
                    {
                        "name": "\u4e00\u7c73",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(54,126,45)"
                        }
                    },
                    {
                        "name": "ippoMIUI",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(114,47,19)"
                        }
                    },
                    {
                        "name": "\u7248\u7c73",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(71,13,106)"
                        }
                    },
                    {
                        "name": "\u6653\u9f99",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(52,36,134)"
                        }
                    },
                    {
                        "name": "NOTE3",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(146,156,133)"
                        }
                    },
                    {
                        "name": "3509",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(135,44,79)"
                        }
                    },
                    {
                        "name": "\u4f18\u5c1a\u76fe",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(8,122,147)"
                        }
                    },
                    {
                        "name": "\u5929\u7136\u6c14",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(35,127,55)"
                        }
                    },
                    {
                        "name": "\u52a0\u6cb9\u7ad9",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(8,63,154)"
                        }
                    },
                    {
                        "name": "\u6cb9\u7530",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(153,71,117)"
                        }
                    },
                    {
                        "name": "X2",
                        "value": "2",
                        "textStyle": {
                            "color": "rgb(8,150,147)"
                        }
                    },
                    {
                        "name": "\u5f71\u89c6",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(70,34,76)"
                        }
                    },
                    {
                        "name": "VIP",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(112,127,22)"
                        }
                    },
                    {
                        "name": "30GOFLY",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(151,114,86)"
                        }
                    },
                    {
                        "name": "8024",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(57,155,111)"
                        }
                    },
                    {
                        "name": "reon75gxd4",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(81,128,59)"
                        }
                    },
                    {
                        "name": "S9010",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(139,135,46)"
                        }
                    },
                    {
                        "name": "\u53cc\u5361\u8c37",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(125,62,0)"
                        }
                    },
                    {
                        "name": "\u4e94\u4ee3",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(19,53,142)"
                        }
                    },
                    {
                        "name": "Reno9pro",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(64,39,6)"
                        }
                    },
                    {
                        "name": "\u8001\u5e74\u5b66",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(130,107,32)"
                        }
                    },
                    {
                        "name": "\u751f\u673a",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(76,92,27)"
                        }
                    },
                    {
                        "name": "9AApple",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(5,121,96)"
                        }
                    },
                    {
                        "name": "14promax5G",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(81,98,44)"
                        }
                    },
                    {
                        "name": "q5",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(25,108,96)"
                        }
                    },
                    {
                        "name": "REALME",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(146,134,13)"
                        }
                    },
                    {
                        "name": "60w",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(157,8,24)"
                        }
                    },
                    {
                        "name": "65w",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(73,16,47)"
                        }
                    },
                    {
                        "name": "reno4se",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(74,54,20)"
                        }
                    },
                    {
                        "name": "k9svivo",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(30,58,16)"
                        }
                    },
                    {
                        "name": "\u4fa7\u9762",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(55,102,117)"
                        }
                    },
                    {
                        "name": "\u6b65\u6b65\u9ad8",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(88,17,88)"
                        }
                    },
                    {
                        "name": "V2",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(29,160,145)"
                        }
                    },
                    {
                        "name": "5se",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(47,77,39)"
                        }
                    },
                    {
                        "name": "80gtSamsung",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(32,43,39)"
                        }
                    },
                    {
                        "name": "\u53d1\u73b0",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(74,88,152)"
                        }
                    },
                    {
                        "name": "14ProMax12",
                        "value": "1",
                        "textStyle": {
                            "color": "rgb(44,124,52)"
                        }
                    }
                ],
        }]
    };

    wordCloud.setOption(wordCloud_option);



  })();
