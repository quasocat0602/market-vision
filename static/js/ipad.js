(function() {
  user_num=[]
  user_name=[]

    $.ajax({
      url:'/ipad_price_bar',
      async:false,
      success:function(data){
      user_name=data["name"]
      user_num=data["num"]
    }
  })
  console.log(user_name)
  // 实例化对象
  var myChart = echarts.init(document.getElementById("ipad_price"));
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
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
    axisLabel: {
      inside: false,
      color: '#fff'
    },
  xAxis: [
    {
      type: 'category',
      data: user_name,
      axisTick: {
        alignWithLabel: true
      },
      axisLabel: {
      inside: false,
      color: '#fff'
    },
    }
  ],
  yAxis: [
    {
      type: 'value',
    },
  ],
  series: [
    {
      name: '销量',
      type: 'bar',
      barWidth: '60%',
      data: user_num
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

(function() {
  user_num=[]
  user_name=[]

    $.ajax({
      url:'/ipad_phone_price_bar',
      async:false,
      success:function(data){
      user_name=data["name"]
      user_num=data["num"]
    }
  })
  console.log(user_name)
  // 实例化对象
  var myChart = echarts.init(document.getElementById("dianpu_top20"));
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
    text: ''
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
    axisLabel: {
      inside: false,
      color: '#fff'
    },
  legend: {},
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: {
    type: 'value',
    boundaryGap: [0, 0.01]
  },
  yAxis: {
    type: 'category',
    data: user_name,

  },
  series: [
    {
      name: '销量',
      type: 'bar',
      data: user_num
    },

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




(function() {
  var ec_center = echarts.init(document.getElementById('middle'),"transparent");
    mydata=[]
    $.ajax({
        url:'/ipad_province',
        async:false,
        success:function(data){
            mydata=data.data

        }
    })
    var mydata = mydata
    var option = {
  title: {
    text: '',
    subtext: '',
    left: 'center'
  },
        axisLabel: {
      inside: false,
      color: '#fff'
    },
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b} : {c} ({d}%)'
  },
  legend: {
    bottom: 10,
    left: 'center',
    data: []
  },
  series: [
    {
      type: 'pie',
      radius: '65%',
      center: ['50%', '50%'],
      selectedMode: 'single',
      data: mydata,
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
};
    ec_center.setOption(option)
})();







(function() {
  $.ajax({
    url:'/ipad_sell_num',
    async:false,
    success:function(data){
      mydata=data["data"]


    }
  })
  // 基于准备好的dom，初始化echarts实例
  var myChart = echarts.init(document.getElementById('sell_num'));
  // (1)准备数据
  // 2. 指定配置和数据
option = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'line',
      lineStyle: {
        color: 'rgba(0,0,0,0.2)',
        width: 1,
        type: 'solid'
      }
    }
  },
    axisLabel: {
      inside: false,
      color: '#fff'
    },
  legend: {
    data: ['DQ']
  },
  singleAxis: {
    top: 50,
    bottom: 50,
    axisTick: {},
    axisLabel: {},

    axisPointer: {
      animation: true,
      label: {
        show: false
      }
    },
    splitLine: {
      show: true,
      lineStyle: {
        type: 'dashed',
        opacity: 0.2
      }
    }
  },
  series: [
    {
      type: 'themeRiver',
      emphasis: {
        itemStyle: {
          shadowBlur: 20,
          shadowColor: 'rgba(0, 0, 0, 0.8)'
        }
      },
      data: mydata
    }
  ]
};

  // 重新把配置好的新数据给实例对象
  myChart.setOption(option);
  window.addEventListener("resize", function() {
    myChart.resize();
  });
})();


(function() {


  $.ajax({
    url:'/ipad_bubble',
    async:false,
    success:function(data){
       name=data.name;
        num=data.num


    }
  })







  // 基于准备好的dom，初始化echarts实例
  var myChart = echarts.init(document.getElementById('bubble'));


  // (1)准备数据


  // 2. 指定配置和数据
    console.log(name)
    console.log(num)

option = {
  angleAxis: {
    type: 'category',
    data:['<1000', '1000-2000', '2000-3000', '3000-4000', '4000-5000', '5000-6000', '6000-7000', '7000-8000', '8000-9000', '9000-10000', '>10000']

  },
  radiusAxis: {},
  polar: {},
    axisLabel: {
      inside: false,
      color: '#fff'
    },
  series: [
    {
      type: 'bar',
      data: num,
      coordinateSystem: 'polar',
      name: 'A',
      stack: 'a',
      emphasis: {
        focus: 'series'
      }
    },

  ],
  legend: {
    show: true,
    data: ['A', 'B', 'C']
  }
};

  // 重新把配置好的新数据给实例对象
  myChart.setOption(option);
  window.addEventListener("resize", function() {
    myChart.resize();
  });
})();


(function() {
  var ec_center = echarts.init(document.getElementById('map'),"transparent");
      mydata=[]
      $.ajax({
          url:'/guangdong',
          async:false,
          success:function(data){
              mydata=data.data

          }
      })

      var mydata = mydata


      var ec_center_option = {
          title: {
              text: '',
              subtext: '',
              x: 'middle'
          },

          axisLabel: {
      inside: false,
      color: '#fff'
    },
          tooltip: {
              trigger: 'item',
              extraCssText:'width:160px;height:80px;'
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
              mapType: '广东',
              zoom:0.8,
              roam: false, //拖动和缩放
              itemStyle: {
                  normal: {
                      borderWidth: .2, //区域边框宽度
                      borderColor: '#0692a4', //区域边框颜色
                      areaColor: "rgba(20,41,87,0.8)", //区域颜色
                  },
                  emphasis: { //鼠标滑过地图高亮的相关设置
                      borderWidth: .2,
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


(function () {
    // 基于准备好的dom，初始化echarts实例

    // (1)准备数据
    // 2. 指定配置和数据
    wordCloud=echarts.init(document.getElementById('cloud'));

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
                    "name": "\u5b98\u65b9",
                    "value": "487",
                    "textStyle": {
                        "color": "rgb(155,81,105)"
                    }
                },
                {
                    "name": "\u65d7\u8230\u5e97",
                    "value": "162",
                    "textStyle": {
                        "color": "rgb(159,134,151)"
                    }
                },
                {
                    "name": "2022",
                    "value": "533",
                    "textStyle": {
                        "color": "rgb(114,79,85)"
                    }
                },
                {
                    "name": "\u65b0\u6b3e",
                    "value": "857",
                    "textStyle": {
                        "color": "rgb(110,89,28)"
                    }
                },
                {
                    "name": "5G",
                    "value": "289",
                    "textStyle": {
                        "color": "rgb(106,132,62)"
                    }
                },
                {
                    "name": "\u5e73\u677f",
                    "value": "2811",
                    "textStyle": {
                        "color": "rgb(79,84,123)"
                    }
                },
                {
                    "name": "\u7535\u8111",
                    "value": "2240",
                    "textStyle": {
                        "color": "rgb(31,112,133)"
                    }
                },
                {
                    "name": "\u6b63\u54c1",
                    "value": "456",
                    "textStyle": {
                        "color": "rgb(91,17,67)"
                    }
                },
                {
                    "name": "\u62a4\u773c",
                    "value": "328",
                    "textStyle": {
                        "color": "rgb(154,49,158)"
                    }
                },
                {
                    "name": "\u5168\u9762",
                    "value": "311",
                    "textStyle": {
                        "color": "rgb(154,5,55)"
                    }
                },
                {
                    "name": "\u529e\u516c",
                    "value": "664",
                    "textStyle": {
                        "color": "rgb(4,158,115)"
                    }
                },
                {
                    "name": "\u6e38\u620f",
                    "value": "618",
                    "textStyle": {
                        "color": "rgb(156,104,39)"
                    }
                },
                {
                    "name": "\u624b\u673a",
                    "value": "136",
                    "textStyle": {
                        "color": "rgb(154,118,78)"
                    }
                },
                {
                    "name": "\u4e8c\u5408\u4e00",
                    "value": "531",
                    "textStyle": {
                        "color": "rgb(20,64,24)"
                    }
                },
                {
                    "name": "\u5b66\u751f",
                    "value": "633",
                    "textStyle": {
                        "color": "rgb(84,23,35)"
                    }
                },
                {
                    "name": "\u4e13\u7528\u7f51",
                    "value": "38",
                    "textStyle": {
                        "color": "rgb(90,85,23)"
                    }
                },
                {
                    "name": "\u753b\u753b",
                    "value": "84",
                    "textStyle": {
                        "color": "rgb(130,87,42)"
                    }
                },
                {
                    "name": "\u5b66\u4e60\u673a",
                    "value": "202",
                    "textStyle": {
                        "color": "rgb(53,152,123)"
                    }
                },
                {
                    "name": "Pad",
                    "value": "211",
                    "textStyle": {
                        "color": "rgb(1,61,151)"
                    }
                },
                {
                    "name": "\u534e\u4e3a",
                    "value": "334",
                    "textStyle": {
                        "color": "rgb(9,38,1)"
                    }
                },
                {
                    "name": "HUAWEI",
                    "value": "26",
                    "textStyle": {
                        "color": "rgb(126,37,132)"
                    }
                },
                {
                    "name": "MatePad",
                    "value": "109",
                    "textStyle": {
                        "color": "rgb(156,129,116)"
                    }
                },
                {
                    "name": "11",
                    "value": "248",
                    "textStyle": {
                        "color": "rgb(69,26,100)"
                    }
                },
                {
                    "name": "120Hz",
                    "value": "54",
                    "textStyle": {
                        "color": "rgb(41,114,53)"
                    }
                },
                {
                    "name": "\u9ad8\u5237",
                    "value": "42",
                    "textStyle": {
                        "color": "rgb(39,103,35)"
                    }
                },
                {
                    "name": "\u9e3f\u8499",
                    "value": "77",
                    "textStyle": {
                        "color": "rgb(77,133,152)"
                    }
                },
                {
                    "name": "HarmonyOS",
                    "value": "10",
                    "textStyle": {
                        "color": "rgb(24,109,49)"
                    }
                },
                {
                    "name": "\u5f71\u97f3",
                    "value": "76",
                    "textStyle": {
                        "color": "rgb(71,88,50)"
                    }
                },
                {
                    "name": "\u5a31\u4e50",
                    "value": "242",
                    "textStyle": {
                        "color": "rgb(150,122,150)"
                    }
                },
                {
                    "name": "\u5b66\u4e60",
                    "value": "589",
                    "textStyle": {
                        "color": "rgb(66,109,104)"
                    }
                },
                {
                    "name": "\u7535\u8111\u5185\u5b58",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(139,146,14)"
                    }
                },
                {
                    "name": "\u70ed\u9500",
                    "value": "13",
                    "textStyle": {
                        "color": "rgb(140,74,136)"
                    }
                },
                {
                    "name": "\u7206\u6b3e",
                    "value": "10",
                    "textStyle": {
                        "color": "rgb(12,101,106)"
                    }
                },
                {
                    "name": "\u5c0f\u7c73",
                    "value": "192",
                    "textStyle": {
                        "color": "rgb(23,58,87)"
                    }
                },
                {
                    "name": "Redmi",
                    "value": "26",
                    "textStyle": {
                        "color": "rgb(82,96,107)"
                    }
                },
                {
                    "name": "\u7ea2\u7c73",
                    "value": "28",
                    "textStyle": {
                        "color": "rgb(122,53,73)"
                    }
                },
                {
                    "name": "\u5546\u52a1",
                    "value": "150",
                    "textStyle": {
                        "color": "rgb(42,12,152)"
                    }
                },
                {
                    "name": "90Hz",
                    "value": "6",
                    "textStyle": {
                        "color": "rgb(17,61,111)"
                    }
                },
                {
                    "name": "\u9ad8\u6e05",
                    "value": "226",
                    "textStyle": {
                        "color": "rgb(11,14,26)"
                    }
                },
                {
                    "name": "\u8054\u60f3",
                    "value": "163",
                    "textStyle": {
                        "color": "rgb(34,127,0)"
                    }
                },
                {
                    "name": "\u5c0f\u65b0",
                    "value": "100",
                    "textStyle": {
                        "color": "rgb(160,15,122)"
                    }
                },
                {
                    "name": "\u5b66\u4e60\u7f51",
                    "value": "73",
                    "textStyle": {
                        "color": "rgb(108,67,50)"
                    }
                },
                {
                    "name": "\u81ea\u8425",
                    "value": "28",
                    "textStyle": {
                        "color": "rgb(130,76,89)"
                    }
                },
                {
                    "name": "Apple",
                    "value": "595",
                    "textStyle": {
                        "color": "rgb(70,116,75)"
                    }
                },
                {
                    "name": "\u82f9\u679c",
                    "value": "765",
                    "textStyle": {
                        "color": "rgb(52,45,79)"
                    }
                },
                {
                    "name": "iPad",
                    "value": "708",
                    "textStyle": {
                        "color": "rgb(137,158,84)"
                    }
                },
                {
                    "name": "10.2",
                    "value": "128",
                    "textStyle": {
                        "color": "rgb(39,57,152)"
                    }
                },
                {
                    "name": "\u82f1\u5bf8",
                    "value": "1093",
                    "textStyle": {
                        "color": "rgb(126,10,13)"
                    }
                },
                {
                    "name": "2021",
                    "value": "241",
                    "textStyle": {
                        "color": "rgb(7,20,101)"
                    }
                },
                {
                    "name": "iPad9",
                    "value": "44",
                    "textStyle": {
                        "color": "rgb(108,134,39)"
                    }
                },
                {
                    "name": "WLAN",
                    "value": "19",
                    "textStyle": {
                        "color": "rgb(52,89,1)"
                    }
                },
                {
                    "name": "A13",
                    "value": "8",
                    "textStyle": {
                        "color": "rgb(5,40,75)"
                    }
                },
                {
                    "name": "\u82af\u7247",
                    "value": "111",
                    "textStyle": {
                        "color": "rgb(12,55,10)"
                    }
                },
                {
                    "name": "1200",
                    "value": "16",
                    "textStyle": {
                        "color": "rgb(92,156,52)"
                    }
                },
                {
                    "name": "\u50cf\u7d20",
                    "value": "13",
                    "textStyle": {
                        "color": "rgb(92,25,128)"
                    }
                },
                {
                    "name": "\u7206\u54c1",
                    "value": "3",
                    "textStyle": {
                        "color": "rgb(107,133,101)"
                    }
                },
                {
                    "name": "Xiaomi",
                    "value": "44",
                    "textStyle": {
                        "color": "rgb(158,146,153)"
                    }
                },
                {
                    "name": "\u9a81\u9f99",
                    "value": "109",
                    "textStyle": {
                        "color": "rgb(131,118,81)"
                    }
                },
                {
                    "name": "\u7ed8\u753b",
                    "value": "166",
                    "textStyle": {
                        "color": "rgb(10,42,100)"
                    }
                },
                {
                    "name": "\u8ba4\u8bc1",
                    "value": "9",
                    "textStyle": {
                        "color": "rgb(74,35,120)"
                    }
                },
                {
                    "name": "\u4e13\u7528",
                    "value": "197",
                    "textStyle": {
                        "color": "rgb(76,3,87)"
                    }
                },
                {
                    "name": "\u8363\u8000",
                    "value": "165",
                    "textStyle": {
                        "color": "rgb(159,57,73)"
                    }
                },
                {
                    "name": "12",
                    "value": "111",
                    "textStyle": {
                        "color": "rgb(67,88,133)"
                    }
                },
                {
                    "name": "\u7f51\u8bfe",
                    "value": "370",
                    "textStyle": {
                        "color": "rgb(86,54,22)"
                    }
                },
                {
                    "name": "\u8003\u7814",
                    "value": "114",
                    "textStyle": {
                        "color": "rgb(111,151,6)"
                    }
                },
                {
                    "name": "\u56fd\u4ea7",
                    "value": "11",
                    "textStyle": {
                        "color": "rgb(156,113,35)"
                    }
                },
                {
                    "name": "\u5b89\u5353",
                    "value": "295",
                    "textStyle": {
                        "color": "rgb(87,159,74)"
                    }
                },
                {
                    "name": "\u5b98\u7f51",
                    "value": "62",
                    "textStyle": {
                        "color": "rgb(26,80,160)"
                    }
                },
                {
                    "name": "V8",
                    "value": "9",
                    "textStyle": {
                        "color": "rgb(78,5,136)"
                    }
                },
                {
                    "name": "Pro",
                    "value": "393",
                    "textStyle": {
                        "color": "rgb(129,87,99)"
                    }
                },
                {
                    "name": "\u8d85\u6e05",
                    "value": "32",
                    "textStyle": {
                        "color": "rgb(65,80,87)"
                    }
                },
                {
                    "name": "\u5de8\u5c4f",
                    "value": "5",
                    "textStyle": {
                        "color": "rgb(46,141,83)"
                    }
                },
                {
                    "name": "\u5929\u7391",
                    "value": "7",
                    "textStyle": {
                        "color": "rgb(149,88,46)"
                    }
                },
                {
                    "name": "8100",
                    "value": "5",
                    "textStyle": {
                        "color": "rgb(10,125,51)"
                    }
                },
                {
                    "name": "\u8003\u7814\u7f51",
                    "value": "20",
                    "textStyle": {
                        "color": "rgb(124,88,147)"
                    }
                },
                {
                    "name": "\u8d85\u7ea7",
                    "value": "5",
                    "textStyle": {
                        "color": "rgb(21,102,44)"
                    }
                },
                {
                    "name": "\u7b14\u8bb0",
                    "value": "5",
                    "textStyle": {
                        "color": "rgb(89,125,74)"
                    }
                },
                {
                    "name": "\u65b0\u54c1",
                    "value": "120",
                    "textStyle": {
                        "color": "rgb(56,61,103)"
                    }
                },
                {
                    "name": "\u65d7\u8230",
                    "value": "147",
                    "textStyle": {
                        "color": "rgb(106,40,103)"
                    }
                },
                {
                    "name": "Pro11",
                    "value": "27",
                    "textStyle": {
                        "color": "rgb(41,101,134)"
                    }
                },
                {
                    "name": "PC",
                    "value": "68",
                    "textStyle": {
                        "color": "rgb(37,135,68)"
                    }
                },
                {
                    "name": "WPS",
                    "value": "5",
                    "textStyle": {
                        "color": "rgb(29,82,149)"
                    }
                },
                {
                    "name": "\u64cd\u4f5c",
                    "value": "4",
                    "textStyle": {
                        "color": "rgb(124,108,68)"
                    }
                },
                {
                    "name": "\u4f53\u9a8c",
                    "value": "4",
                    "textStyle": {
                        "color": "rgb(28,43,115)"
                    }
                },
                {
                    "name": "\u7f51\u901a",
                    "value": "320",
                    "textStyle": {
                        "color": "rgb(0,64,36)"
                    }
                },
                {
                    "name": "2023",
                    "value": "117",
                    "textStyle": {
                        "color": "rgb(6,61,136)"
                    }
                },
                {
                    "name": "pro",
                    "value": "60",
                    "textStyle": {
                        "color": "rgb(116,37,6)"
                    }
                },
                {
                    "name": "\u529e\u516c\u7f51",
                    "value": "58",
                    "textStyle": {
                        "color": "rgb(140,123,2)"
                    }
                },
                {
                    "name": "\u534e\u5f3a\u5317",
                    "value": "3",
                    "textStyle": {
                        "color": "rgb(80,134,79)"
                    }
                },
                {
                    "name": "\u963f\u91cc",
                    "value": "7",
                    "textStyle": {
                        "color": "rgb(121,160,122)"
                    }
                },
                {
                    "name": "\u7b2c\u4e5d\u4ee3",
                    "value": "34",
                    "textStyle": {
                        "color": "rgb(49,47,129)"
                    }
                },
                {
                    "name": "\u5c4f\u5e55",
                    "value": "10",
                    "textStyle": {
                        "color": "rgb(77,129,153)"
                    }
                },
                {
                    "name": "\u5957\u88c5",
                    "value": "8",
                    "textStyle": {
                        "color": "rgb(107,90,130)"
                    }
                },
                {
                    "name": "12.9",
                    "value": "113",
                    "textStyle": {
                        "color": "rgb(41,87,76)"
                    }
                },
                {
                    "name": "iPadPro",
                    "value": "13",
                    "textStyle": {
                        "color": "rgb(9,2,88)"
                    }
                },
                {
                    "name": "\u6446\u6e21",
                    "value": "3",
                    "textStyle": {
                        "color": "rgb(66,2,141)"
                    }
                },
                {
                    "name": "\u76f4\u964d",
                    "value": "12",
                    "textStyle": {
                        "color": "rgb(105,111,78)"
                    }
                },
                {
                    "name": "300",
                    "value": "6",
                    "textStyle": {
                        "color": "rgb(160,38,41)"
                    }
                },
                {
                    "name": "SE",
                    "value": "12",
                    "textStyle": {
                        "color": "rgb(31,74,41)"
                    }
                },
                {
                    "name": "10.1",
                    "value": "113",
                    "textStyle": {
                        "color": "rgb(88,110,151)"
                    }
                },
                {
                    "name": "\u5927\u5b66\u751f",
                    "value": "30",
                    "textStyle": {
                        "color": "rgb(139,40,122)"
                    }
                },
                {
                    "name": "ipad",
                    "value": "199",
                    "textStyle": {
                        "color": "rgb(109,101,63)"
                    }
                },
                {
                    "name": "\u513f\u7ae5",
                    "value": "43",
                    "textStyle": {
                        "color": "rgb(12,23,38)"
                    }
                },
                {
                    "name": "pad",
                    "value": "171",
                    "textStyle": {
                        "color": "rgb(33,91,43)"
                    }
                },
                {
                    "name": "\u8be6\u60c5",
                    "value": "4",
                    "textStyle": {
                        "color": "rgb(115,63,26)"
                    }
                },
                {
                    "name": "\u9886\u5238",
                    "value": "4",
                    "textStyle": {
                        "color": "rgb(54,112,45)"
                    }
                },
                {
                    "name": "\u4f18\u60e0",
                    "value": "84",
                    "textStyle": {
                        "color": "rgb(144,94,31)"
                    }
                },
                {
                    "name": "10.6",
                    "value": "24",
                    "textStyle": {
                        "color": "rgb(54,106,54)"
                    }
                },
                {
                    "name": "\u83b1\u8335",
                    "value": "11",
                    "textStyle": {
                        "color": "rgb(149,84,30)"
                    }
                },
                {
                    "name": "2.5",
                    "value": "35",
                    "textStyle": {
                        "color": "rgb(120,11,66)"
                    }
                },
                {
                    "name": "iPad10",
                    "value": "20",
                    "textStyle": {
                        "color": "rgb(67,141,62)"
                    }
                },
                {
                    "name": "10",
                    "value": "97",
                    "textStyle": {
                        "color": "rgb(83,137,122)"
                    }
                },
                {
                    "name": "10.9",
                    "value": "193",
                    "textStyle": {
                        "color": "rgb(56,115,99)"
                    }
                },
                {
                    "name": "\u7b2c\u5341\u4ee3",
                    "value": "61",
                    "textStyle": {
                        "color": "rgb(87,91,136)"
                    }
                },
                {
                    "name": "ipad10",
                    "value": "18",
                    "textStyle": {
                        "color": "rgb(50,73,98)"
                    }
                },
                {
                    "name": "Lenovo",
                    "value": "63",
                    "textStyle": {
                        "color": "rgb(104,18,89)"
                    }
                },
                {
                    "name": "\u54a8\u8be2",
                    "value": "75",
                    "textStyle": {
                        "color": "rgb(139,100,68)"
                    }
                },
                {
                    "name": "200",
                    "value": "12",
                    "textStyle": {
                        "color": "rgb(63,19,141)"
                    }
                },
                {
                    "name": "10.4",
                    "value": "72",
                    "textStyle": {
                        "color": "rgb(70,87,132)"
                    }
                },
                {
                    "name": "\u6559\u80b2",
                    "value": "71",
                    "textStyle": {
                        "color": "rgb(64,126,44)"
                    }
                },
                {
                    "name": "\u5c4f\u5168",
                    "value": "15",
                    "textStyle": {
                        "color": "rgb(106,4,112)"
                    }
                },
                {
                    "name": "M2",
                    "value": "65",
                    "textStyle": {
                        "color": "rgb(36,151,80)"
                    }
                },
                {
                    "name": "\u56fd\u884c",
                    "value": "90",
                    "textStyle": {
                        "color": "rgb(110,113,53)"
                    }
                },
                {
                    "name": "vivo",
                    "value": "63",
                    "textStyle": {
                        "color": "rgb(111,30,111)"
                    }
                },
                {
                    "name": "\u8d85\u8584",
                    "value": "83",
                    "textStyle": {
                        "color": "rgb(91,152,51)"
                    }
                },
                {
                    "name": "\u7b14\u8bb0\u672c\u7535\u8111",
                    "value": "46",
                    "textStyle": {
                        "color": "rgb(108,110,22)"
                    }
                },
                {
                    "name": "MatePad11",
                    "value": "10",
                    "textStyle": {
                        "color": "rgb(142,7,12)"
                    }
                },
                {
                    "name": "10.95",
                    "value": "11",
                    "textStyle": {
                        "color": "rgb(79,55,110)"
                    }
                },
                {
                    "name": "\u4e0a\u7f51",
                    "value": "90",
                    "textStyle": {
                        "color": "rgb(107,28,16)"
                    }
                },
                {
                    "name": "MatePadPro11",
                    "value": "6",
                    "textStyle": {
                        "color": "rgb(159,23,103)"
                    }
                },
                {
                    "name": "matepad11OPPO",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(92,34,139)"
                    }
                },
                {
                    "name": "Air",
                    "value": "61",
                    "textStyle": {
                        "color": "rgb(81,34,112)"
                    }
                },
                {
                    "name": "oppo",
                    "value": "29",
                    "textStyle": {
                        "color": "rgb(141,24,101)"
                    }
                },
                {
                    "name": "\u4e0b\u6ed1",
                    "value": "13",
                    "textStyle": {
                        "color": "rgb(12,152,158)"
                    }
                },
                {
                    "name": "46",
                    "value": "8",
                    "textStyle": {
                        "color": "rgb(5,46,134)"
                    }
                },
                {
                    "name": "\u7231\u6d3e",
                    "value": "22",
                    "textStyle": {
                        "color": "rgb(136,159,119)"
                    }
                },
                {
                    "name": "5g",
                    "value": "16",
                    "textStyle": {
                        "color": "rgb(111,22,36)"
                    }
                },
                {
                    "name": "matepad",
                    "value": "10",
                    "textStyle": {
                        "color": "rgb(84,117,153)"
                    }
                },
                {
                    "name": "matepad11",
                    "value": "15",
                    "textStyle": {
                        "color": "rgb(12,131,78)"
                    }
                },
                {
                    "name": "air",
                    "value": "14",
                    "textStyle": {
                        "color": "rgb(43,120,137)"
                    }
                },
                {
                    "name": "iPad22",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(1,5,146)"
                    }
                },
                {
                    "name": "20",
                    "value": "23",
                    "textStyle": {
                        "color": "rgb(152,55,137)"
                    }
                },
                {
                    "name": "iPad2022",
                    "value": "12",
                    "textStyle": {
                        "color": "rgb(8,2,136)"
                    }
                },
                {
                    "name": "ipad2021",
                    "value": "14",
                    "textStyle": {
                        "color": "rgb(160,14,84)"
                    }
                },
                {
                    "name": "2020",
                    "value": "75",
                    "textStyle": {
                        "color": "rgb(134,55,108)"
                    }
                },
                {
                    "name": "2018",
                    "value": "64",
                    "textStyle": {
                        "color": "rgb(61,146,134)"
                    }
                },
                {
                    "name": "ipad9",
                    "value": "11",
                    "textStyle": {
                        "color": "rgb(44,120,116)"
                    }
                },
                {
                    "name": "mini",
                    "value": "51",
                    "textStyle": {
                        "color": "rgb(39,102,50)"
                    }
                },
                {
                    "name": "\u7b2c\u516d\u4ee3",
                    "value": "68",
                    "textStyle": {
                        "color": "rgb(7,106,51)"
                    }
                },
                {
                    "name": "ipadmini5",
                    "value": "10",
                    "textStyle": {
                        "color": "rgb(148,114,22)"
                    }
                },
                {
                    "name": "\u7535\u8111\u8ff7",
                    "value": "9",
                    "textStyle": {
                        "color": "rgb(85,132,114)"
                    }
                },
                {
                    "name": "\u987a\u4e30",
                    "value": "38",
                    "textStyle": {
                        "color": "rgb(58,114,35)"
                    }
                },
                {
                    "name": "\u6025\u53d1",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(143,97,43)"
                    }
                },
                {
                    "name": "\u5206\u671f",
                    "value": "32",
                    "textStyle": {
                        "color": "rgb(123,103,11)"
                    }
                },
                {
                    "name": "\u514d\u606f",
                    "value": "127",
                    "textStyle": {
                        "color": "rgb(60,16,13)"
                    }
                },
                {
                    "name": "OPPO",
                    "value": "31",
                    "textStyle": {
                        "color": "rgb(116,126,21)"
                    }
                },
                {
                    "name": "\u5bb6\u7528",
                    "value": "16",
                    "textStyle": {
                        "color": "rgb(84,24,108)"
                    }
                },
                {
                    "name": "\u5546\u7528",
                    "value": "8",
                    "textStyle": {
                        "color": "rgb(88,152,106)"
                    }
                },
                {
                    "name": "\u4e00\u4f53\u673a",
                    "value": "24",
                    "textStyle": {
                        "color": "rgb(65,70,106)"
                    }
                },
                {
                    "name": "\u5904\u7406\u5668",
                    "value": "21",
                    "textStyle": {
                        "color": "rgb(119,154,78)"
                    }
                },
                {
                    "name": "\u73b0\u8d27",
                    "value": "68",
                    "textStyle": {
                        "color": "rgb(28,42,15)"
                    }
                },
                {
                    "name": "\u901f\u53d1",
                    "value": "22",
                    "textStyle": {
                        "color": "rgb(159,113,11)"
                    }
                },
                {
                    "name": "\u8865\u8d34",
                    "value": "11",
                    "textStyle": {
                        "color": "rgb(13,24,153)"
                    }
                },
                {
                    "name": "\u518d\u7701",
                    "value": "11",
                    "textStyle": {
                        "color": "rgb(9,134,152)"
                    }
                },
                {
                    "name": "12.4",
                    "value": "43",
                    "textStyle": {
                        "color": "rgb(30,139,136)"
                    }
                },
                {
                    "name": "46i2023",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(45,140,25)"
                    }
                },
                {
                    "name": "\u9002\u7528",
                    "value": "17",
                    "textStyle": {
                        "color": "rgb(123,90,56)"
                    }
                },
                {
                    "name": "\u8033\u673a",
                    "value": "17",
                    "textStyle": {
                        "color": "rgb(23,147,95)"
                    }
                },
                {
                    "name": "iPad2021",
                    "value": "33",
                    "textStyle": {
                        "color": "rgb(95,2,112)"
                    }
                },
                {
                    "name": "iPadAir5",
                    "value": "11",
                    "textStyle": {
                        "color": "rgb(58,104,38)"
                    }
                },
                {
                    "name": "\u7b2c\u4e94\u4ee3",
                    "value": "61",
                    "textStyle": {
                        "color": "rgb(12,33,3)"
                    }
                },
                {
                    "name": "iPadAir4",
                    "value": "9",
                    "textStyle": {
                        "color": "rgb(56,135,79)"
                    }
                },
                {
                    "name": "iPad20212022",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(9,37,74)"
                    }
                },
                {
                    "name": "Air5",
                    "value": "80",
                    "textStyle": {
                        "color": "rgb(49,13,101)"
                    }
                },
                {
                    "name": "air4",
                    "value": "19",
                    "textStyle": {
                        "color": "rgb(152,4,73)"
                    }
                },
                {
                    "name": "\u7d2b\u8272",
                    "value": "4",
                    "textStyle": {
                        "color": "rgb(10,55,16)"
                    }
                },
                {
                    "name": "ipad2022Apple",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(58,71,160)"
                    }
                },
                {
                    "name": "air5",
                    "value": "13",
                    "textStyle": {
                        "color": "rgb(5,56,34)"
                    }
                },
                {
                    "name": "Air4",
                    "value": "53",
                    "textStyle": {
                        "color": "rgb(156,124,27)"
                    }
                },
                {
                    "name": "\u7b2c\u56db\u4ee3",
                    "value": "8",
                    "textStyle": {
                        "color": "rgb(124,145,103)"
                    }
                },
                {
                    "name": "ari5",
                    "value": "4",
                    "textStyle": {
                        "color": "rgb(137,86,2)"
                    }
                },
                {
                    "name": "\u52a9\u624b",
                    "value": "3",
                    "textStyle": {
                        "color": "rgb(155,19,85)"
                    }
                },
                {
                    "name": "120HZ",
                    "value": "15",
                    "textStyle": {
                        "color": "rgb(132,41,132)"
                    }
                },
                {
                    "name": "ipadair5",
                    "value": "21",
                    "textStyle": {
                        "color": "rgb(59,86,15)"
                    }
                },
                {
                    "name": "870",
                    "value": "54",
                    "textStyle": {
                        "color": "rgb(72,7,35)"
                    }
                },
                {
                    "name": "2019",
                    "value": "43",
                    "textStyle": {
                        "color": "rgb(73,141,87)"
                    }
                },
                {
                    "name": "\u62ef\u6551",
                    "value": "26",
                    "textStyle": {
                        "color": "rgb(12,156,140)"
                    }
                },
                {
                    "name": "Y700",
                    "value": "28",
                    "textStyle": {
                        "color": "rgb(10,53,105)"
                    }
                },
                {
                    "name": "\u7535\u7ade",
                    "value": "12",
                    "textStyle": {
                        "color": "rgb(127,80,98)"
                    }
                },
                {
                    "name": "8.8",
                    "value": "13",
                    "textStyle": {
                        "color": "rgb(102,62,38)"
                    }
                },
                {
                    "name": "120Hz2.5",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(40,115,31)"
                    }
                },
                {
                    "name": "\u667a\u80fd",
                    "value": "99",
                    "textStyle": {
                        "color": "rgb(160,40,107)"
                    }
                },
                {
                    "name": "Matepad11",
                    "value": "4",
                    "textStyle": {
                        "color": "rgb(99,100,145)"
                    }
                },
                {
                    "name": "\u5feb\u5145",
                    "value": "5",
                    "textStyle": {
                        "color": "rgb(95,95,155)"
                    }
                },
                {
                    "name": "X8",
                    "value": "11",
                    "textStyle": {
                        "color": "rgb(31,31,36)"
                    }
                },
                {
                    "name": "\u5c4f\u7f51",
                    "value": "9",
                    "textStyle": {
                        "color": "rgb(17,124,54)"
                    }
                },
                {
                    "name": "\u60a6\u52a8\u7248",
                    "value": "7",
                    "textStyle": {
                        "color": "rgb(69,110,49)"
                    }
                },
                {
                    "name": "HONOR",
                    "value": "4",
                    "textStyle": {
                        "color": "rgb(84,80,4)"
                    }
                },
                {
                    "name": "\u8ffd\u5267",
                    "value": "52",
                    "textStyle": {
                        "color": "rgb(118,17,33)"
                    }
                },
                {
                    "name": "\u53cc\u91cd",
                    "value": "4",
                    "textStyle": {
                        "color": "rgb(64,151,100)"
                    }
                },
                {
                    "name": "500",
                    "value": "3",
                    "textStyle": {
                        "color": "rgb(123,93,51)"
                    }
                },
                {
                    "name": "\u7545\u4eab",
                    "value": "17",
                    "textStyle": {
                        "color": "rgb(78,24,147)"
                    }
                },
                {
                    "name": "pad11",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(124,47,47)"
                    }
                },
                {
                    "name": "46i",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(11,128,50)"
                    }
                },
                {
                    "name": "MatePadPro",
                    "value": "6",
                    "textStyle": {
                        "color": "rgb(10,55,66)"
                    }
                },
                {
                    "name": "Matepad",
                    "value": "12",
                    "textStyle": {
                        "color": "rgb(13,4,126)"
                    }
                },
                {
                    "name": "pad2022",
                    "value": "6",
                    "textStyle": {
                        "color": "rgb(3,158,137)"
                    }
                },
                {
                    "name": "\u8702\u7a9d",
                    "value": "12",
                    "textStyle": {
                        "color": "rgb(44,82,3)"
                    }
                },
                {
                    "name": "\u7eda\u4e3d",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(34,70,10)"
                    }
                },
                {
                    "name": "\u5185\u5b58",
                    "value": "9",
                    "textStyle": {
                        "color": "rgb(45,20,4)"
                    }
                },
                {
                    "name": "\u642d\u8f7d",
                    "value": "4",
                    "textStyle": {
                        "color": "rgb(84,152,78)"
                    }
                },
                {
                    "name": "M1",
                    "value": "47",
                    "textStyle": {
                        "color": "rgb(128,148,16)"
                    }
                },
                {
                    "name": "\u95e8\u5e97",
                    "value": "14",
                    "textStyle": {
                        "color": "rgb(156,154,122)"
                    }
                },
                {
                    "name": "\u540c\u552e",
                    "value": "14",
                    "textStyle": {
                        "color": "rgb(95,131,108)"
                    }
                },
                {
                    "name": "\u65e0\u7ebf",
                    "value": "9",
                    "textStyle": {
                        "color": "rgb(156,117,78)"
                    }
                },
                {
                    "name": "\u5c40\u57df\u7f51",
                    "value": "8",
                    "textStyle": {
                        "color": "rgb(27,83,97)"
                    }
                },
                {
                    "name": "\u673a\u578b",
                    "value": "8",
                    "textStyle": {
                        "color": "rgb(148,54,123)"
                    }
                },
                {
                    "name": "RedmiPad",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(130,78,43)"
                    }
                },
                {
                    "name": "2021Apple",
                    "value": "4",
                    "textStyle": {
                        "color": "rgb(24,22,52)"
                    }
                },
                {
                    "name": "\u7acb\u51cf",
                    "value": "14",
                    "textStyle": {
                        "color": "rgb(12,56,156)"
                    }
                },
                {
                    "name": "V8pro",
                    "value": "4",
                    "textStyle": {
                        "color": "rgb(57,19,10)"
                    }
                },
                {
                    "name": "12.1",
                    "value": "9",
                    "textStyle": {
                        "color": "rgb(53,8,154)"
                    }
                },
                {
                    "name": "\u5237\u5c4f",
                    "value": "11",
                    "textStyle": {
                        "color": "rgb(66,4,112)"
                    }
                },
                {
                    "name": "\u795e\u5668",
                    "value": "5",
                    "textStyle": {
                        "color": "rgb(101,120,9)"
                    }
                },
                {
                    "name": "\u5168\u65b0",
                    "value": "49",
                    "textStyle": {
                        "color": "rgb(51,39,41)"
                    }
                },
                {
                    "name": "\u8d85\u9ad8",
                    "value": "26",
                    "textStyle": {
                        "color": "rgb(102,83,130)"
                    }
                },
                {
                    "name": "\u5c4f\u53ef",
                    "value": "15",
                    "textStyle": {
                        "color": "rgb(30,24,72)"
                    }
                },
                {
                    "name": "\u63d2\u5361",
                    "value": "95",
                    "textStyle": {
                        "color": "rgb(59,3,8)"
                    }
                },
                {
                    "name": "\u539f\u88c5",
                    "value": "45",
                    "textStyle": {
                        "color": "rgb(122,71,157)"
                    }
                },
                {
                    "name": "MIUI",
                    "value": "36",
                    "textStyle": {
                        "color": "rgb(11,78,3)"
                    }
                },
                {
                    "name": "\u5237\u65b0\u7387",
                    "value": "6",
                    "textStyle": {
                        "color": "rgb(5,89,72)"
                    }
                },
                {
                    "name": "PAD2022",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(67,145,22)"
                    }
                },
                {
                    "name": "10.5",
                    "value": "55",
                    "textStyle": {
                        "color": "rgb(80,65,118)"
                    }
                },
                {
                    "name": "\u7acb\u5373",
                    "value": "6",
                    "textStyle": {
                        "color": "rgb(25,76,142)"
                    }
                },
                {
                    "name": "\u62a2\u8d2d",
                    "value": "9",
                    "textStyle": {
                        "color": "rgb(80,94,51)"
                    }
                },
                {
                    "name": "\u9ad8\u8272\u57df",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(58,122,69)"
                    }
                },
                {
                    "name": "iPad2021ipad9",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(64,144,106)"
                    }
                },
                {
                    "name": "iPad2022ipad10",
                    "value": "3",
                    "textStyle": {
                        "color": "rgb(53,3,49)"
                    }
                },
                {
                    "name": "A14",
                    "value": "14",
                    "textStyle": {
                        "color": "rgb(10,123,132)"
                    }
                },
                {
                    "name": "\u6b63\u5e38",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(135,12,86)"
                    }
                },
                {
                    "name": "\u53d1\u8d27",
                    "value": "12",
                    "textStyle": {
                        "color": "rgb(126,39,56)"
                    }
                },
                {
                    "name": "\u9001\u788e",
                    "value": "18",
                    "textStyle": {
                        "color": "rgb(110,54,59)"
                    }
                },
                {
                    "name": "\u5c4f\u9669",
                    "value": "10",
                    "textStyle": {
                        "color": "rgb(34,21,137)"
                    }
                },
                {
                    "name": "V8Pro",
                    "value": "5",
                    "textStyle": {
                        "color": "rgb(45,142,149)"
                    }
                },
                {
                    "name": "\u7535\u8111\u6e38\u620f",
                    "value": "19",
                    "textStyle": {
                        "color": "rgb(46,98,95)"
                    }
                },
                {
                    "name": "2K",
                    "value": "49",
                    "textStyle": {
                        "color": "rgb(24,144,77)"
                    }
                },
                {
                    "name": "\u82cf\u5b81",
                    "value": "26",
                    "textStyle": {
                        "color": "rgb(92,59,85)"
                    }
                },
                {
                    "name": "\u6613\u8d2d",
                    "value": "21",
                    "textStyle": {
                        "color": "rgb(101,148,160)"
                    }
                },
                {
                    "name": "559",
                    "value": "7",
                    "textStyle": {
                        "color": "rgb(31,153,53)"
                    }
                },
                {
                    "name": "\u4e0b\u5355",
                    "value": "9",
                    "textStyle": {
                        "color": "rgb(84,59,98)"
                    }
                },
                {
                    "name": "\u53ef\u51cf",
                    "value": "5",
                    "textStyle": {
                        "color": "rgb(150,117,133)"
                    }
                },
                {
                    "name": "230",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(85,55,138)"
                    }
                },
                {
                    "name": "\u5c4f\u5b9d",
                    "value": "4",
                    "textStyle": {
                        "color": "rgb(116,8,89)"
                    }
                },
                {
                    "name": "Air2",
                    "value": "25",
                    "textStyle": {
                        "color": "rgb(71,38,36)"
                    }
                },
                {
                    "name": "mini2",
                    "value": "26",
                    "textStyle": {
                        "color": "rgb(95,158,155)"
                    }
                },
                {
                    "name": "4Apple",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(148,67,113)"
                    }
                },
                {
                    "name": "iPadmini6",
                    "value": "24",
                    "textStyle": {
                        "color": "rgb(114,70,83)"
                    }
                },
                {
                    "name": "mini5",
                    "value": "33",
                    "textStyle": {
                        "color": "rgb(160,132,43)"
                    }
                },
                {
                    "name": "mini6",
                    "value": "67",
                    "textStyle": {
                        "color": "rgb(66,33,94)"
                    }
                },
                {
                    "name": "T8",
                    "value": "3",
                    "textStyle": {
                        "color": "rgb(16,125,59)"
                    }
                },
                {
                    "name": "9Apple",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(69,110,30)"
                    }
                },
                {
                    "name": "iPadOS",
                    "value": "11",
                    "textStyle": {
                        "color": "rgb(45,150,85)"
                    }
                },
                {
                    "name": "ipad2018",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(102,23,102)"
                    }
                },
                {
                    "name": "\u5b63\u5361",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(116,23,135)"
                    }
                },
                {
                    "name": "\u5305\u90ae",
                    "value": "26",
                    "textStyle": {
                        "color": "rgb(160,72,2)"
                    }
                },
                {
                    "name": "MetaPad",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(157,6,94)"
                    }
                },
                {
                    "name": "14",
                    "value": "24",
                    "textStyle": {
                        "color": "rgb(72,32,83)"
                    }
                },
                {
                    "name": "Plus",
                    "value": "29",
                    "textStyle": {
                        "color": "rgb(121,120,118)"
                    }
                },
                {
                    "name": "6GB",
                    "value": "3",
                    "textStyle": {
                        "color": "rgb(117,145,122)"
                    }
                },
                {
                    "name": "128GB",
                    "value": "28",
                    "textStyle": {
                        "color": "rgb(121,74,9)"
                    }
                },
                {
                    "name": "WIFI",
                    "value": "33",
                    "textStyle": {
                        "color": "rgb(155,93,151)"
                    }
                },
                {
                    "name": "2k",
                    "value": "22",
                    "textStyle": {
                        "color": "rgb(95,20,160)"
                    }
                },
                {
                    "name": "Samsung",
                    "value": "74",
                    "textStyle": {
                        "color": "rgb(65,18,76)"
                    }
                },
                {
                    "name": "\u4e09\u661f",
                    "value": "110",
                    "textStyle": {
                        "color": "rgb(127,58,101)"
                    }
                },
                {
                    "name": "SM",
                    "value": "57",
                    "textStyle": {
                        "color": "rgb(11,0,4)"
                    }
                },
                {
                    "name": "T970",
                    "value": "10",
                    "textStyle": {
                        "color": "rgb(32,8,86)"
                    }
                },
                {
                    "name": "GalaxyTab",
                    "value": "16",
                    "textStyle": {
                        "color": "rgb(147,82,21)"
                    }
                },
                {
                    "name": "S7",
                    "value": "25",
                    "textStyle": {
                        "color": "rgb(130,116,3)"
                    }
                },
                {
                    "name": "\u5bf8\u5b89\u5353",
                    "value": "16",
                    "textStyle": {
                        "color": "rgb(15,77,2)"
                    }
                },
                {
                    "name": "12.6",
                    "value": "17",
                    "textStyle": {
                        "color": "rgb(45,151,70)"
                    }
                },
                {
                    "name": "\u952e\u76d8",
                    "value": "6",
                    "textStyle": {
                        "color": "rgb(106,109,57)"
                    }
                },
                {
                    "name": "V7",
                    "value": "22",
                    "textStyle": {
                        "color": "rgb(64,84,2)"
                    }
                },
                {
                    "name": "6nm",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(4,144,149)"
                    }
                },
                {
                    "name": "matepad112021",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(98,8,122)"
                    }
                },
                {
                    "name": "\u5e97\u4fdd",
                    "value": "4",
                    "textStyle": {
                        "color": "rgb(100,126,24)"
                    }
                },
                {
                    "name": "\u4e24\u5e74",
                    "value": "4",
                    "textStyle": {
                        "color": "rgb(137,3,123)"
                    }
                },
                {
                    "name": "\u7ed8\u56fe",
                    "value": "11",
                    "textStyle": {
                        "color": "rgb(113,48,20)"
                    }
                },
                {
                    "name": "\u5b98\u65b9\u7f51",
                    "value": "7",
                    "textStyle": {
                        "color": "rgb(49,88,48)"
                    }
                },
                {
                    "name": "Huawei",
                    "value": "109",
                    "textStyle": {
                        "color": "rgb(10,61,34)"
                    }
                },
                {
                    "name": "Pro10.8",
                    "value": "4",
                    "textStyle": {
                        "color": "rgb(81,1,112)"
                    }
                },
                {
                    "name": "11WiFi",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(67,62,94)"
                    }
                },
                {
                    "name": "2038",
                    "value": "4",
                    "textStyle": {
                        "color": "rgb(136,66,152)"
                    }
                },
                {
                    "name": "\u9177\u6bd4",
                    "value": "39",
                    "textStyle": {
                        "color": "rgb(96,76,144)"
                    }
                },
                {
                    "name": "\u9b54\u65b9",
                    "value": "42",
                    "textStyle": {
                        "color": "rgb(28,140,92)"
                    }
                },
                {
                    "name": "iPlay50",
                    "value": "7",
                    "textStyle": {
                        "color": "rgb(64,35,64)"
                    }
                },
                {
                    "name": "4G",
                    "value": "121",
                    "textStyle": {
                        "color": "rgb(28,101,9)"
                    }
                },
                {
                    "name": "\u901a\u8bdd",
                    "value": "83",
                    "textStyle": {
                        "color": "rgb(13,7,82)"
                    }
                },
                {
                    "name": "\u5927\u5c4f",
                    "value": "102",
                    "textStyle": {
                        "color": "rgb(138,6,42)"
                    }
                },
                {
                    "name": "\u8001\u4eba",
                    "value": "20",
                    "textStyle": {
                        "color": "rgb(54,160,2)"
                    }
                },
                {
                    "name": "T618",
                    "value": "5",
                    "textStyle": {
                        "color": "rgb(114,52,42)"
                    }
                },
                {
                    "name": "\u987a\u4e30\u901f\u53d1",
                    "value": "29",
                    "textStyle": {
                        "color": "rgb(160,148,64)"
                    }
                },
                {
                    "name": "11.2",
                    "value": "11",
                    "textStyle": {
                        "color": "rgb(16,52,91)"
                    }
                },
                {
                    "name": "\u9a81\u9f99\u7248",
                    "value": "4",
                    "textStyle": {
                        "color": "rgb(89,25,44)"
                    }
                },
                {
                    "name": "865",
                    "value": "17",
                    "textStyle": {
                        "color": "rgb(36,134,38)"
                    }
                },
                {
                    "name": "\u5168\u7f51",
                    "value": "16",
                    "textStyle": {
                        "color": "rgb(110,91,53)"
                    }
                },
                {
                    "name": "\u901a\u9ad8",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(42,89,30)"
                    }
                },
                {
                    "name": "\u624b\u673a\u7f51",
                    "value": "7",
                    "textStyle": {
                        "color": "rgb(109,132,137)"
                    }
                },
                {
                    "name": "iPad92021",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(146,157,22)"
                    }
                },
                {
                    "name": "8.3",
                    "value": "66",
                    "textStyle": {
                        "color": "rgb(120,106,125)"
                    }
                },
                {
                    "name": "\u8ff7\u4f60",
                    "value": "101",
                    "textStyle": {
                        "color": "rgb(20,142,7)"
                    }
                },
                {
                    "name": "\u7b2c\u4e94",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(18,30,92)"
                    }
                },
                {
                    "name": "\u516d\u4ee3",
                    "value": "4",
                    "textStyle": {
                        "color": "rgb(129,35,37)"
                    }
                },
                {
                    "name": "\u5c4f\u5b89\u5353\u5168",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(127,114,79)"
                    }
                },
                {
                    "name": "\u6e38\u620f\u7f51",
                    "value": "22",
                    "textStyle": {
                        "color": "rgb(61,135,82)"
                    }
                },
                {
                    "name": "ipad2023",
                    "value": "5",
                    "textStyle": {
                        "color": "rgb(132,45,47)"
                    }
                },
                {
                    "name": "Tab",
                    "value": "64",
                    "textStyle": {
                        "color": "rgb(124,50,11)"
                    }
                },
                {
                    "name": "A8",
                    "value": "11",
                    "textStyle": {
                        "color": "rgb(120,124,15)"
                    }
                },
                {
                    "name": "Galaxy",
                    "value": "38",
                    "textStyle": {
                        "color": "rgb(102,18,7)"
                    }
                },
                {
                    "name": "\u5382\u5bb6\u76f4\u9500",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(108,71,116)"
                    }
                },
                {
                    "name": "ari4Apple",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(85,86,139)"
                    }
                },
                {
                    "name": "\u5145\u7535",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(53,71,48)"
                    }
                },
                {
                    "name": "ipadair4",
                    "value": "12",
                    "textStyle": {
                        "color": "rgb(4,41,22)"
                    }
                },
                {
                    "name": "air3",
                    "value": "12",
                    "textStyle": {
                        "color": "rgb(151,34,26)"
                    }
                },
                {
                    "name": "mini56",
                    "value": "4",
                    "textStyle": {
                        "color": "rgb(90,131,44)"
                    }
                },
                {
                    "name": "\u8f7b\u8584",
                    "value": "74",
                    "textStyle": {
                        "color": "rgb(144,129,120)"
                    }
                },
                {
                    "name": "\u4fbf\u643a",
                    "value": "58",
                    "textStyle": {
                        "color": "rgb(102,63,68)"
                    }
                },
                {
                    "name": "\u62c6\u5c01",
                    "value": "4",
                    "textStyle": {
                        "color": "rgb(0,128,44)"
                    }
                },
                {
                    "name": "\u7535\u8111\u7f51",
                    "value": "13",
                    "textStyle": {
                        "color": "rgb(82,81,8)"
                    }
                },
                {
                    "name": "\u53d1\u9001",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(13,156,5)"
                    }
                },
                {
                    "name": "S8",
                    "value": "54",
                    "textStyle": {
                        "color": "rgb(3,87,72)"
                    }
                },
                {
                    "name": "\u7cfb\u5217",
                    "value": "3",
                    "textStyle": {
                        "color": "rgb(56,44,47)"
                    }
                },
                {
                    "name": "iPad2021Apple",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(136,27,134)"
                    }
                },
                {
                    "name": "\u5e74\u5ea6",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(85,111,19)"
                    }
                },
                {
                    "name": "\u5b89\u5353\u7f51",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(17,68,152)"
                    }
                },
                {
                    "name": "\u7528\u673a",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(145,61,92)"
                    }
                },
                {
                    "name": "ipadpro",
                    "value": "12",
                    "textStyle": {
                        "color": "rgb(86,30,28)"
                    }
                },
                {
                    "name": "5Pro",
                    "value": "3",
                    "textStyle": {
                        "color": "rgb(21,106,82)"
                    }
                },
                {
                    "name": "Pro12.9",
                    "value": "13",
                    "textStyle": {
                        "color": "rgb(4,105,145)"
                    }
                },
                {
                    "name": "matepadPro12.6",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(7,137,67)"
                    }
                },
                {
                    "name": "honor",
                    "value": "12",
                    "textStyle": {
                        "color": "rgb(29,97,81)"
                    }
                },
                {
                    "name": "v8pro",
                    "value": "5",
                    "textStyle": {
                        "color": "rgb(58,26,64)"
                    }
                },
                {
                    "name": "padApple",
                    "value": "13",
                    "textStyle": {
                        "color": "rgb(102,72,38)"
                    }
                },
                {
                    "name": "2021iPad10",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(13,44,91)"
                    }
                },
                {
                    "name": "\u6821\u56ed",
                    "value": "4",
                    "textStyle": {
                        "color": "rgb(89,75,72)"
                    }
                },
                {
                    "name": "\u4e13\u4eab",
                    "value": "3",
                    "textStyle": {
                        "color": "rgb(88,147,67)"
                    }
                },
                {
                    "name": "19",
                    "value": "21",
                    "textStyle": {
                        "color": "rgb(15,76,11)"
                    }
                },
                {
                    "name": "iPad3",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(38,62,48)"
                    }
                },
                {
                    "name": "Air1",
                    "value": "18",
                    "textStyle": {
                        "color": "rgb(23,84,0)"
                    }
                },
                {
                    "name": "2017",
                    "value": "13",
                    "textStyle": {
                        "color": "rgb(107,29,29)"
                    }
                },
                {
                    "name": "iPad5",
                    "value": "22",
                    "textStyle": {
                        "color": "rgb(156,90,104)"
                    }
                },
                {
                    "name": "120hz",
                    "value": "11",
                    "textStyle": {
                        "color": "rgb(26,112,39)"
                    }
                },
                {
                    "name": "ipadmini6",
                    "value": "8",
                    "textStyle": {
                        "color": "rgb(134,143,127)"
                    }
                },
                {
                    "name": "\u5929\u732b",
                    "value": "3",
                    "textStyle": {
                        "color": "rgb(107,139,77)"
                    }
                },
                {
                    "name": "\u5e74\u6b3e",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(138,113,53)"
                    }
                },
                {
                    "name": "256GB",
                    "value": "11",
                    "textStyle": {
                        "color": "rgb(72,27,60)"
                    }
                },
                {
                    "name": "10.8",
                    "value": "40",
                    "textStyle": {
                        "color": "rgb(117,59,69)"
                    }
                },
                {
                    "name": "\u6570\u7801",
                    "value": "4",
                    "textStyle": {
                        "color": "rgb(34,3,35)"
                    }
                },
                {
                    "name": "8GB",
                    "value": "14",
                    "textStyle": {
                        "color": "rgb(121,154,80)"
                    }
                },
                {
                    "name": "V7Pro",
                    "value": "6",
                    "textStyle": {
                        "color": "rgb(111,41,6)"
                    }
                },
                {
                    "name": "iPad14",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(145,101,96)"
                    }
                },
                {
                    "name": "\u5a31\u4e50\u7f51",
                    "value": "18",
                    "textStyle": {
                        "color": "rgb(125,76,24)"
                    }
                },
                {
                    "name": "\u8bfe\u5b89\u5353",
                    "value": "3",
                    "textStyle": {
                        "color": "rgb(132,18,2)"
                    }
                },
                {
                    "name": "M5",
                    "value": "33",
                    "textStyle": {
                        "color": "rgb(85,27,32)"
                    }
                },
                {
                    "name": "8.4",
                    "value": "18",
                    "textStyle": {
                        "color": "rgb(120,16,87)"
                    }
                },
                {
                    "name": "M6",
                    "value": "17",
                    "textStyle": {
                        "color": "rgb(81,131,66)"
                    }
                },
                {
                    "name": "\u9ad8\u80fd",
                    "value": "6",
                    "textStyle": {
                        "color": "rgb(146,71,19)"
                    }
                },
                {
                    "name": "Vpro",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(120,84,1)"
                    }
                },
                {
                    "name": "Pro2021",
                    "value": "11",
                    "textStyle": {
                        "color": "rgb(11,18,106)"
                    }
                },
                {
                    "name": "pro12.9",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(52,53,115)"
                    }
                },
                {
                    "name": "Air3",
                    "value": "13",
                    "textStyle": {
                        "color": "rgb(159,31,27)"
                    }
                },
                {
                    "name": "air2",
                    "value": "4",
                    "textStyle": {
                        "color": "rgb(57,67,59)"
                    }
                },
                {
                    "name": "\u76f4\u53d1",
                    "value": "4",
                    "textStyle": {
                        "color": "rgb(123,18,28)"
                    }
                },
                {
                    "name": "proApple",
                    "value": "7",
                    "textStyle": {
                        "color": "rgb(59,74,135)"
                    }
                },
                {
                    "name": "2059",
                    "value": "4",
                    "textStyle": {
                        "color": "rgb(45,81,127)"
                    }
                },
                {
                    "name": "A15",
                    "value": "10",
                    "textStyle": {
                        "color": "rgb(134,113,16)"
                    }
                },
                {
                    "name": "\u89e6\u63a7",
                    "value": "9",
                    "textStyle": {
                        "color": "rgb(10,79,69)"
                    }
                },
                {
                    "name": "ID",
                    "value": "3",
                    "textStyle": {
                        "color": "rgb(97,15,147)"
                    }
                },
                {
                    "name": "2022Apple",
                    "value": "3",
                    "textStyle": {
                        "color": "rgb(85,45,18)"
                    }
                },
                {
                    "name": "2021M1",
                    "value": "3",
                    "textStyle": {
                        "color": "rgb(55,29,138)"
                    }
                },
                {
                    "name": "V8Pro12.1",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(143,89,75)"
                    }
                },
                {
                    "name": "144HZ",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(31,104,69)"
                    }
                },
                {
                    "name": "air42021",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(115,93,123)"
                    }
                },
                {
                    "name": "\u5b89\u5353\u9ad8",
                    "value": "6",
                    "textStyle": {
                        "color": "rgb(109,75,42)"
                    }
                },
                {
                    "name": "\u6e05\u5c4f",
                    "value": "37",
                    "textStyle": {
                        "color": "rgb(35,136,15)"
                    }
                },
                {
                    "name": "\u7cfb\u7edf",
                    "value": "113",
                    "textStyle": {
                        "color": "rgb(159,85,118)"
                    }
                },
                {
                    "name": "ipadmini6Apple",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(65,150,60)"
                    }
                },
                {
                    "name": "64GB",
                    "value": "11",
                    "textStyle": {
                        "color": "rgb(134,20,70)"
                    }
                },
                {
                    "name": "4K",
                    "value": "10",
                    "textStyle": {
                        "color": "rgb(116,77,154)"
                    }
                },
                {
                    "name": "\u9999\u6e2f",
                    "value": "4",
                    "textStyle": {
                        "color": "rgb(80,130,29)"
                    }
                },
                {
                    "name": "\u76f4\u90ae",
                    "value": "7",
                    "textStyle": {
                        "color": "rgb(125,72,115)"
                    }
                },
                {
                    "name": "\u7f8e\u7248",
                    "value": "9",
                    "textStyle": {
                        "color": "rgb(124,25,36)"
                    }
                },
                {
                    "name": "\u6e2f\u7248",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(77,91,159)"
                    }
                },
                {
                    "name": "\u968f\u673a",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(91,22,77)"
                    }
                },
                {
                    "name": "android",
                    "value": "3",
                    "textStyle": {
                        "color": "rgb(79,66,60)"
                    }
                },
                {
                    "name": "wifi",
                    "value": "22",
                    "textStyle": {
                        "color": "rgb(43,14,81)"
                    }
                },
                {
                    "name": "M3",
                    "value": "23",
                    "textStyle": {
                        "color": "rgb(85,154,64)"
                    }
                },
                {
                    "name": "\u9752\u6625",
                    "value": "44",
                    "textStyle": {
                        "color": "rgb(27,38,146)"
                    }
                },
                {
                    "name": "\u8bfe\u5b89\u5353\u516b\u6838",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(86,7,152)"
                    }
                },
                {
                    "name": "11.5",
                    "value": "18",
                    "textStyle": {
                        "color": "rgb(82,151,34)"
                    }
                },
                {
                    "name": "\u76f4\u64ad",
                    "value": "4",
                    "textStyle": {
                        "color": "rgb(137,142,15)"
                    }
                },
                {
                    "name": "WiFi",
                    "value": "41",
                    "textStyle": {
                        "color": "rgb(17,147,89)"
                    }
                },
                {
                    "name": "se",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(60,79,44)"
                    }
                },
                {
                    "name": "900",
                    "value": "4",
                    "textStyle": {
                        "color": "rgb(106,115,58)"
                    }
                },
                {
                    "name": "MatePadPro10.8",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(104,9,80)"
                    }
                },
                {
                    "name": "2022matepad11",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(55,41,53)"
                    }
                },
                {
                    "name": "24",
                    "value": "77",
                    "textStyle": {
                        "color": "rgb(48,58,134)"
                    }
                },
                {
                    "name": "Microsoft",
                    "value": "49",
                    "textStyle": {
                        "color": "rgb(126,9,83)"
                    }
                },
                {
                    "name": "\u5fae\u8f6f",
                    "value": "127",
                    "textStyle": {
                        "color": "rgb(112,4,107)"
                    }
                },
                {
                    "name": "Surface",
                    "value": "84",
                    "textStyle": {
                        "color": "rgb(110,31,92)"
                    }
                },
                {
                    "name": "i5",
                    "value": "25",
                    "textStyle": {
                        "color": "rgb(90,1,135)"
                    }
                },
                {
                    "name": "512GB",
                    "value": "3",
                    "textStyle": {
                        "color": "rgb(97,96,73)"
                    }
                },
                {
                    "name": "13",
                    "value": "39",
                    "textStyle": {
                        "color": "rgb(159,38,123)"
                    }
                },
                {
                    "name": "win11",
                    "value": "35",
                    "textStyle": {
                        "color": "rgb(141,39,8)"
                    }
                },
                {
                    "name": "\u7b14\u8bb0\u672c",
                    "value": "120",
                    "textStyle": {
                        "color": "rgb(44,142,23)"
                    }
                },
                {
                    "name": "pro4",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(106,5,4)"
                    }
                },
                {
                    "name": "i7",
                    "value": "24",
                    "textStyle": {
                        "color": "rgb(1,119,24)"
                    }
                },
                {
                    "name": "\u4e13\u4e1a\u7248",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(131,95,19)"
                    }
                },
                {
                    "name": "pro8",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(127,68,146)"
                    }
                },
                {
                    "name": "FE",
                    "value": "11",
                    "textStyle": {
                        "color": "rgb(147,73,100)"
                    }
                },
                {
                    "name": "\u4e0a\u5e02",
                    "value": "22",
                    "textStyle": {
                        "color": "rgb(23,153,68)"
                    }
                },
                {
                    "name": "mini26",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(48,134,56)"
                    }
                },
                {
                    "name": "42018",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(93,1,122)"
                    }
                },
                {
                    "name": "8G",
                    "value": "21",
                    "textStyle": {
                        "color": "rgb(121,104,111)"
                    }
                },
                {
                    "name": "Pro9",
                    "value": "3",
                    "textStyle": {
                        "color": "rgb(5,98,125)"
                    }
                },
                {
                    "name": "Pro8",
                    "value": "12",
                    "textStyle": {
                        "color": "rgb(14,48,114)"
                    }
                },
                {
                    "name": "\u7b2c\u4e09\u4ee3",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(116,27,35)"
                    }
                },
                {
                    "name": "2018iPad8",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(147,158,40)"
                    }
                },
                {
                    "name": "offic",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(18,42,104)"
                    }
                },
                {
                    "name": "256",
                    "value": "3",
                    "textStyle": {
                        "color": "rgb(66,85,42)"
                    }
                },
                {
                    "name": "\u6388\u6743",
                    "value": "8",
                    "textStyle": {
                        "color": "rgb(50,58,123)"
                    }
                },
                {
                    "name": "\u624b\u5199\u7b14",
                    "value": "4",
                    "textStyle": {
                        "color": "rgb(129,106,85)"
                    }
                },
                {
                    "name": "MatepadPro12.6",
                    "value": "4",
                    "textStyle": {
                        "color": "rgb(104,8,37)"
                    }
                },
                {
                    "name": "\u4e2d\u67cf",
                    "value": "12",
                    "textStyle": {
                        "color": "rgb(120,66,0)"
                    }
                },
                {
                    "name": "win10",
                    "value": "63",
                    "textStyle": {
                        "color": "rgb(104,121,129)"
                    }
                },
                {
                    "name": "windows11",
                    "value": "9",
                    "textStyle": {
                        "color": "rgb(152,81,107)"
                    }
                },
                {
                    "name": "\u89e6\u6478\u5c4f",
                    "value": "10",
                    "textStyle": {
                        "color": "rgb(58,107,153)"
                    }
                },
                {
                    "name": "\u4e94\u4ee3",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(84,130,27)"
                    }
                },
                {
                    "name": "\u7535\u8111\u8bbe\u8ba1",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(2,6,9)"
                    }
                },
                {
                    "name": "7.9",
                    "value": "25",
                    "textStyle": {
                        "color": "rgb(6,14,30)"
                    }
                },
                {
                    "name": "\u652f\u6301",
                    "value": "4",
                    "textStyle": {
                        "color": "rgb(80,2,10)"
                    }
                },
                {
                    "name": "pencil",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(124,79,148)"
                    }
                },
                {
                    "name": "\u5c4f\u5b89\u5353",
                    "value": "10",
                    "textStyle": {
                        "color": "rgb(40,155,55)"
                    }
                },
                {
                    "name": "ipadApple",
                    "value": "4",
                    "textStyle": {
                        "color": "rgb(82,144,148)"
                    }
                },
                {
                    "name": "ipad8",
                    "value": "8",
                    "textStyle": {
                        "color": "rgb(155,117,30)"
                    }
                },
                {
                    "name": "\u8bbe\u8ba1",
                    "value": "31",
                    "textStyle": {
                        "color": "rgb(65,42,114)"
                    }
                },
                {
                    "name": "\u5b98\u7f51\u65b9",
                    "value": "7",
                    "textStyle": {
                        "color": "rgb(1,160,138)"
                    }
                },
                {
                    "name": "\u6559\u80b2\u7f51",
                    "value": "19",
                    "textStyle": {
                        "color": "rgb(123,10,22)"
                    }
                },
                {
                    "name": "Pro2018",
                    "value": "3",
                    "textStyle": {
                        "color": "rgb(38,111,78)"
                    }
                },
                {
                    "name": "ipadPro2021M1",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(120,4,54)"
                    }
                },
                {
                    "name": "ipadpro2020Apple",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(80,84,89)"
                    }
                },
                {
                    "name": "\u7248\u56fd\u884c",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(45,7,72)"
                    }
                },
                {
                    "name": "\u81f3\u5c11",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(105,38,74)"
                    }
                },
                {
                    "name": "22",
                    "value": "10",
                    "textStyle": {
                        "color": "rgb(82,97,66)"
                    }
                },
                {
                    "name": "\u4e60\u5b98",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(50,92,127)"
                    }
                },
                {
                    "name": "pro2022",
                    "value": "3",
                    "textStyle": {
                        "color": "rgb(29,145,21)"
                    }
                },
                {
                    "name": "Air5Apple",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(111,74,124)"
                    }
                },
                {
                    "name": "19Huawei",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(12,87,61)"
                    }
                },
                {
                    "name": "T5",
                    "value": "6",
                    "textStyle": {
                        "color": "rgb(130,145,8)"
                    }
                },
                {
                    "name": "G99",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(47,61,53)"
                    }
                },
                {
                    "name": "\u516b\u6838",
                    "value": "36",
                    "textStyle": {
                        "color": "rgb(109,123,3)"
                    }
                },
                {
                    "name": "PadPro2021",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(67,19,81)"
                    }
                },
                {
                    "name": "\u738b\u4e00\u535a",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(22,51,120)"
                    }
                },
                {
                    "name": "\u5b9a\u5236",
                    "value": "7",
                    "textStyle": {
                        "color": "rgb(68,28,43)"
                    }
                },
                {
                    "name": "\u6a21\u5f0f",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(118,95,37)"
                    }
                },
                {
                    "name": "\u9ad8\u901a",
                    "value": "10",
                    "textStyle": {
                        "color": "rgb(71,36,97)"
                    }
                },
                {
                    "name": "8702021",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(54,64,25)"
                    }
                },
                {
                    "name": "ipadari5",
                    "value": "3",
                    "textStyle": {
                        "color": "rgb(88,90,34)"
                    }
                },
                {
                    "name": "ipadair5Apple",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(16,30,56)"
                    }
                },
                {
                    "name": "matepadPRO",
                    "value": "3",
                    "textStyle": {
                        "color": "rgb(143,47,139)"
                    }
                },
                {
                    "name": "Wifi",
                    "value": "3",
                    "textStyle": {
                        "color": "rgb(0,19,47)"
                    }
                },
                {
                    "name": "\u540c\u6b3e",
                    "value": "3",
                    "textStyle": {
                        "color": "rgb(29,147,58)"
                    }
                },
                {
                    "name": "mini1",
                    "value": "7",
                    "textStyle": {
                        "color": "rgb(127,110,89)"
                    }
                },
                {
                    "name": "\u4ee3\u7f51",
                    "value": "7",
                    "textStyle": {
                        "color": "rgb(27,47,91)"
                    }
                },
                {
                    "name": "ipad2020",
                    "value": "5",
                    "textStyle": {
                        "color": "rgb(129,111,28)"
                    }
                },
                {
                    "name": "18",
                    "value": "12",
                    "textStyle": {
                        "color": "rgb(126,93,74)"
                    }
                },
                {
                    "name": "iPad2021ipad9Huawei",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(5,118,87)"
                    }
                },
                {
                    "name": "iPadpro12.9",
                    "value": "4",
                    "textStyle": {
                        "color": "rgb(151,147,48)"
                    }
                },
                {
                    "name": "GALAXY",
                    "value": "9",
                    "textStyle": {
                        "color": "rgb(27,45,42)"
                    }
                },
                {
                    "name": "X200",
                    "value": "7",
                    "textStyle": {
                        "color": "rgb(105,110,157)"
                    }
                },
                {
                    "name": "X205C",
                    "value": "4",
                    "textStyle": {
                        "color": "rgb(146,43,10)"
                    }
                },
                {
                    "name": "\u5546\u52a1\u7f51",
                    "value": "9",
                    "textStyle": {
                        "color": "rgb(18,125,27)"
                    }
                },
                {
                    "name": "201824",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(81,112,92)"
                    }
                },
                {
                    "name": "\u671f\u82b1",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(18,16,102)"
                    }
                },
                {
                    "name": "\u4ed8\u6b3e",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(25,45,125)"
                    }
                },
                {
                    "name": "860",
                    "value": "4",
                    "textStyle": {
                        "color": "rgb(35,38,6)"
                    }
                },
                {
                    "name": "5pro",
                    "value": "7",
                    "textStyle": {
                        "color": "rgb(129,42,66)"
                    }
                },
                {
                    "name": "450",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(51,157,132)"
                    }
                },
                {
                    "name": "2matepad",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(46,52,128)"
                    }
                },
                {
                    "name": "se10.1",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(123,100,105)"
                    }
                },
                {
                    "name": "\u738b\u8005",
                    "value": "14",
                    "textStyle": {
                        "color": "rgb(130,149,101)"
                    }
                },
                {
                    "name": "16GB",
                    "value": "8",
                    "textStyle": {
                        "color": "rgb(65,29,16)"
                    }
                },
                {
                    "name": "\u89e6\u5c4f",
                    "value": "21",
                    "textStyle": {
                        "color": "rgb(68,64,98)"
                    }
                },
                {
                    "name": "\u6d3b\u52a8",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(125,56,121)"
                    }
                },
                {
                    "name": "700",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(142,7,22)"
                    }
                },
                {
                    "name": "\u8fc5\u9cb2\u7248",
                    "value": "5",
                    "textStyle": {
                        "color": "rgb(4,67,72)"
                    }
                },
                {
                    "name": "Pro12.1",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(20,87,80)"
                    }
                },
                {
                    "name": "iPadmini5",
                    "value": "3",
                    "textStyle": {
                        "color": "rgb(101,35,88)"
                    }
                },
                {
                    "name": "OLED",
                    "value": "11",
                    "textStyle": {
                        "color": "rgb(104,48,116)"
                    }
                },
                {
                    "name": "\u624b\u5199",
                    "value": "21",
                    "textStyle": {
                        "color": "rgb(80,152,156)"
                    }
                },
                {
                    "name": "vivopad",
                    "value": "16",
                    "textStyle": {
                        "color": "rgb(131,111,143)"
                    }
                },
                {
                    "name": "870Apple",
                    "value": "3",
                    "textStyle": {
                        "color": "rgb(114,116,52)"
                    }
                },
                {
                    "name": "ipad2022",
                    "value": "3",
                    "textStyle": {
                        "color": "rgb(26,7,51)"
                    }
                },
                {
                    "name": "mini5Huawei",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(103,121,114)"
                    }
                },
                {
                    "name": "\u97f3\u4e50",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(52,147,89)"
                    }
                },
                {
                    "name": "5GWIFI",
                    "value": "4",
                    "textStyle": {
                        "color": "rgb(113,80,101)"
                    }
                },
                {
                    "name": "air1",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(4,24,14)"
                    }
                },
                {
                    "name": "padpro",
                    "value": "6",
                    "textStyle": {
                        "color": "rgb(4,68,66)"
                    }
                },
                {
                    "name": "\u539f\u5c01",
                    "value": "26",
                    "textStyle": {
                        "color": "rgb(7,157,115)"
                    }
                },
                {
                    "name": "21",
                    "value": "12",
                    "textStyle": {
                        "color": "rgb(89,115,56)"
                    }
                },
                {
                    "name": "2021ipadpro",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(142,121,29)"
                    }
                },
                {
                    "name": "SurfacePro9",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(79,110,150)"
                    }
                },
                {
                    "name": "iPad8",
                    "value": "3",
                    "textStyle": {
                        "color": "rgb(23,3,48)"
                    }
                },
                {
                    "name": "7Apple",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(43,132,36)"
                    }
                },
                {
                    "name": "20202022",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(46,110,22)"
                    }
                },
                {
                    "name": "X700N",
                    "value": "11",
                    "textStyle": {
                        "color": "rgb(11,73,157)"
                    }
                },
                {
                    "name": "Ultra",
                    "value": "12",
                    "textStyle": {
                        "color": "rgb(129,47,150)"
                    }
                },
                {
                    "name": "android2022",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(153,83,59)"
                    }
                },
                {
                    "name": "2020Lenovo",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(138,50,106)"
                    }
                },
                {
                    "name": "\u89e6\u63a7\u5c4f",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(147,4,1)"
                    }
                },
                {
                    "name": "\u5c0f\u5ea6",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(69,149,84)"
                    }
                },
                {
                    "name": "\u9632\u7729",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(153,50,158)"
                    }
                },
                {
                    "name": "G16",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(152,142,116)"
                    }
                },
                {
                    "name": "\u6377\u5eb7\u8fbe",
                    "value": "4",
                    "textStyle": {
                        "color": "rgb(144,59,152)"
                    }
                },
                {
                    "name": "\u7528\u5fae",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(119,27,100)"
                    }
                },
                {
                    "name": "\u4fe1\u6296",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(85,142,1)"
                    }
                },
                {
                    "name": "\u97f3\u5feb",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(23,50,83)"
                    }
                },
                {
                    "name": "\u7535\u89c6\u5267",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(103,95,4)"
                    }
                },
                {
                    "name": "\u8001\u5e74",
                    "value": "4",
                    "textStyle": {
                        "color": "rgb(53,124,42)"
                    }
                },
                {
                    "name": "\u5c0f\u5b66\u751f",
                    "value": "5",
                    "textStyle": {
                        "color": "rgb(45,37,94)"
                    }
                },
                {
                    "name": "HMS",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(85,151,136)"
                    }
                },
                {
                    "name": "\u670d\u52a1",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(94,106,129)"
                    }
                },
                {
                    "name": "5Gwifi",
                    "value": "11",
                    "textStyle": {
                        "color": "rgb(121,50,47)"
                    }
                },
                {
                    "name": "128G",
                    "value": "29",
                    "textStyle": {
                        "color": "rgb(44,158,65)"
                    }
                },
                {
                    "name": "\u4e50\u4eab",
                    "value": "4",
                    "textStyle": {
                        "color": "rgb(137,109,151)"
                    }
                },
                {
                    "name": "\u53d1\u552e",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(107,158,100)"
                    }
                },
                {
                    "name": "\u4e09\u671f",
                    "value": "5",
                    "textStyle": {
                        "color": "rgb(62,71,22)"
                    }
                },
                {
                    "name": "90HZ",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(46,24,142)"
                    }
                },
                {
                    "name": "2063",
                    "value": "6",
                    "textStyle": {
                        "color": "rgb(51,155,158)"
                    }
                },
                {
                    "name": "\u5f00\u5de5",
                    "value": "3",
                    "textStyle": {
                        "color": "rgb(42,100,40)"
                    }
                },
                {
                    "name": "\u5927\u5409",
                    "value": "3",
                    "textStyle": {
                        "color": "rgb(124,73,72)"
                    }
                },
                {
                    "name": "TAB",
                    "value": "9",
                    "textStyle": {
                        "color": "rgb(0,72,20)"
                    }
                },
                {
                    "name": "iPadPro11",
                    "value": "3",
                    "textStyle": {
                        "color": "rgb(144,9,92)"
                    }
                },
                {
                    "name": "\u4e09\u56db\u4ee3",
                    "value": "3",
                    "textStyle": {
                        "color": "rgb(43,150,16)"
                    }
                },
                {
                    "name": "202021",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(111,19,69)"
                    }
                },
                {
                    "name": "\u4eff\u751f",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(82,29,13)"
                    }
                },
                {
                    "name": "Mate14",
                    "value": "3",
                    "textStyle": {
                        "color": "rgb(95,14,73)"
                    }
                },
                {
                    "name": "M1M2",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(32,49,63)"
                    }
                },
                {
                    "name": "BS",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(42,104,62)"
                    }
                },
                {
                    "name": "400",
                    "value": "4",
                    "textStyle": {
                        "color": "rgb(119,90,28)"
                    }
                },
                {
                    "name": "\u7248\u738b",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(91,129,151)"
                    }
                },
                {
                    "name": "\u4e00\u535a",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(22,148,77)"
                    }
                },
                {
                    "name": "\u4ee3\u8a00",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(37,141,10)"
                    }
                },
                {
                    "name": "PadPro2022",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(104,2,104)"
                    }
                },
                {
                    "name": "Plus2021",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(134,44,82)"
                    }
                },
                {
                    "name": "ipadSamsung",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(82,149,21)"
                    }
                },
                {
                    "name": "tab",
                    "value": "3",
                    "textStyle": {
                        "color": "rgb(12,37,71)"
                    }
                },
                {
                    "name": "s7",
                    "value": "4",
                    "textStyle": {
                        "color": "rgb(156,122,89)"
                    }
                },
                {
                    "name": "fe",
                    "value": "4",
                    "textStyle": {
                        "color": "rgb(56,79,35)"
                    }
                },
                {
                    "name": "s8",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(116,66,48)"
                    }
                },
                {
                    "name": "ultra",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(60,2,4)"
                    }
                },
                {
                    "name": "\u65f6\u5c1a",
                    "value": "3",
                    "textStyle": {
                        "color": "rgb(4,28,114)"
                    }
                },
                {
                    "name": "\u91d1\u6b63",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(132,35,139)"
                    }
                },
                {
                    "name": "2020iPad8",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(22,107,150)"
                    }
                },
                {
                    "name": "\u7acb\u7701",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(10,30,149)"
                    }
                },
                {
                    "name": "huawei",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(28,59,147)"
                    }
                },
                {
                    "name": "\u901a\u7545",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(22,121,74)"
                    }
                },
                {
                    "name": "\u8054\u901a",
                    "value": "6",
                    "textStyle": {
                        "color": "rgb(0,93,95)"
                    }
                },
                {
                    "name": "Geglovo",
                    "value": "6",
                    "textStyle": {
                        "color": "rgb(116,143,57)"
                    }
                },
                {
                    "name": "\u683c\u6590\u65af",
                    "value": "6",
                    "textStyle": {
                        "color": "rgb(10,110,27)"
                    }
                },
                {
                    "name": "Win10",
                    "value": "32",
                    "textStyle": {
                        "color": "rgb(132,24,138)"
                    }
                },
                {
                    "name": "Windows",
                    "value": "34",
                    "textStyle": {
                        "color": "rgb(155,63,9)"
                    }
                },
                {
                    "name": "\u638c\u4e0a\u7535\u8111",
                    "value": "6",
                    "textStyle": {
                        "color": "rgb(15,107,100)"
                    }
                },
                {
                    "name": "A12",
                    "value": "3",
                    "textStyle": {
                        "color": "rgb(117,26,27)"
                    }
                },
                {
                    "name": "\u53cc\u6444",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(62,89,102)"
                    }
                },
                {
                    "name": "mini5Apple",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(131,52,121)"
                    }
                },
                {
                    "name": "MatePadPro112021",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(4,83,59)"
                    }
                },
                {
                    "name": "Paper",
                    "value": "4",
                    "textStyle": {
                        "color": "rgb(137,122,114)"
                    }
                },
                {
                    "name": "\u5178\u85cf",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(6,42,46)"
                    }
                },
                {
                    "name": "\u58a8\u6c34",
                    "value": "7",
                    "textStyle": {
                        "color": "rgb(43,36,16)"
                    }
                },
                {
                    "name": "ipadpro2022",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(68,75,47)"
                    }
                },
                {
                    "name": "pro2021",
                    "value": "6",
                    "textStyle": {
                        "color": "rgb(148,21,67)"
                    }
                },
                {
                    "name": "\u9996\u53d1",
                    "value": "8",
                    "textStyle": {
                        "color": "rgb(143,130,6)"
                    }
                },
                {
                    "name": "\u5168\u5c4f",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(13,141,122)"
                    }
                },
                {
                    "name": "6Huawei",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(7,38,147)"
                    }
                },
                {
                    "name": "WGR",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(84,149,28)"
                    }
                },
                {
                    "name": "W09",
                    "value": "3",
                    "textStyle": {
                        "color": "rgb(1,12,35)"
                    }
                },
                {
                    "name": "Pro22",
                    "value": "3",
                    "textStyle": {
                        "color": "rgb(90,128,138)"
                    }
                },
                {
                    "name": "Pro6",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(25,48,99)"
                    }
                },
                {
                    "name": "Pro5",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(49,62,126)"
                    }
                },
                {
                    "name": "Pro7",
                    "value": "13",
                    "textStyle": {
                        "color": "rgb(73,141,128)"
                    }
                },
                {
                    "name": "matepadpro11",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(1,29,135)"
                    }
                },
                {
                    "name": "\u65b9\u7f51",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(79,33,130)"
                    }
                },
                {
                    "name": "HP",
                    "value": "8",
                    "textStyle": {
                        "color": "rgb(160,145,78)"
                    }
                },
                {
                    "name": "\u60e0\u666e",
                    "value": "9",
                    "textStyle": {
                        "color": "rgb(77,157,81)"
                    }
                },
                {
                    "name": "11.6",
                    "value": "9",
                    "textStyle": {
                        "color": "rgb(84,52,33)"
                    }
                },
                {
                    "name": "\u84dd\u5149",
                    "value": "11",
                    "textStyle": {
                        "color": "rgb(109,121,109)"
                    }
                },
                {
                    "name": "\u5c4f\u5c0f\u65b0",
                    "value": "6",
                    "textStyle": {
                        "color": "rgb(67,89,75)"
                    }
                },
                {
                    "name": "pro9.7",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(10,72,103)"
                    }
                },
                {
                    "name": "\u4e2d\u56fd\u79fb\u52a8",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(138,142,123)"
                    }
                },
                {
                    "name": "\u5b98\u65d7",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(32,23,86)"
                    }
                },
                {
                    "name": "\u914d\u4ef6",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(117,157,152)"
                    }
                },
                {
                    "name": "iPadpro",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(13,77,29)"
                    }
                },
                {
                    "name": "M2Apple",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(155,85,6)"
                    }
                },
                {
                    "name": "oppopadApple",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(65,104,1)"
                    }
                },
                {
                    "name": "MetaPad5G",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(109,63,152)"
                    }
                },
                {
                    "name": "T970GalaxyTab",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(11,83,89)"
                    }
                },
                {
                    "name": "13.3",
                    "value": "8",
                    "textStyle": {
                        "color": "rgb(54,58,143)"
                    }
                },
                {
                    "name": "\u9f20\u6807",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(46,0,1)"
                    }
                },
                {
                    "name": "Pad11Pro",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(113,74,107)"
                    }
                },
                {
                    "name": "\u5b89\u5353\u667a",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(113,49,120)"
                    }
                },
                {
                    "name": "Win10Huawei",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(152,119,87)"
                    }
                },
                {
                    "name": "Pro5G",
                    "value": "5",
                    "textStyle": {
                        "color": "rgb(2,118,146)"
                    }
                },
                {
                    "name": "\u9b54\u6539",
                    "value": "5",
                    "textStyle": {
                        "color": "rgb(98,15,142)"
                    }
                },
                {
                    "name": "\u8fdc\u7a0b",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(41,54,139)"
                    }
                },
                {
                    "name": "pc",
                    "value": "16",
                    "textStyle": {
                        "color": "rgb(150,111,24)"
                    }
                },
                {
                    "name": "\u7aef\u6e38",
                    "value": "3",
                    "textStyle": {
                        "color": "rgb(138,89,138)"
                    }
                },
                {
                    "name": "PADApple",
                    "value": "4",
                    "textStyle": {
                        "color": "rgb(97,81,1)"
                    }
                },
                {
                    "name": "wifi7.9",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(17,100,149)"
                    }
                },
                {
                    "name": "4G128G",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(37,11,137)"
                    }
                },
                {
                    "name": "4OPPO",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(77,52,7)"
                    }
                },
                {
                    "name": "\u6b3e\u7248",
                    "value": "7",
                    "textStyle": {
                        "color": "rgb(129,117,74)"
                    }
                },
                {
                    "name": "plus",
                    "value": "6",
                    "textStyle": {
                        "color": "rgb(3,81,146)"
                    }
                },
                {
                    "name": "pro11",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(25,50,137)"
                    }
                },
                {
                    "name": "\u4e00\u4e8c",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(136,78,106)"
                    }
                },
                {
                    "name": "\u4e09\u4ee3",
                    "value": "5",
                    "textStyle": {
                        "color": "rgb(89,60,61)"
                    }
                },
                {
                    "name": "20172022",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(38,117,60)"
                    }
                },
                {
                    "name": "2021ipadair4",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(75,107,49)"
                    }
                },
                {
                    "name": "ipad9Apple",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(132,70,89)"
                    }
                },
                {
                    "name": "Pro9i5",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(10,13,155)"
                    }
                },
                {
                    "name": "16G256GB",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(17,119,112)"
                    }
                },
                {
                    "name": "\u79fb\u52a8",
                    "value": "9",
                    "textStyle": {
                        "color": "rgb(78,90,11)"
                    }
                },
                {
                    "name": "\u5c4f\u9a81\u9f99",
                    "value": "3",
                    "textStyle": {
                        "color": "rgb(34,30,75)"
                    }
                },
                {
                    "name": "Padpro",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(123,1,99)"
                    }
                },
                {
                    "name": "\u9650\u65f6",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(44,144,131)"
                    }
                },
                {
                    "name": "TB128FU",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(156,71,108)"
                    }
                },
                {
                    "name": "\u8054\u5c0a",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(33,95,51)"
                    }
                },
                {
                    "name": "X14Pro",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(16,80,54)"
                    }
                },
                {
                    "name": "\u516c\u5b89",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(61,24,36)"
                    }
                },
                {
                    "name": "iPadmini5Apple",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(57,78,72)"
                    }
                },
                {
                    "name": "17",
                    "value": "8",
                    "textStyle": {
                        "color": "rgb(101,47,54)"
                    }
                },
                {
                    "name": "ipadair",
                    "value": "4",
                    "textStyle": {
                        "color": "rgb(19,131,40)"
                    }
                },
                {
                    "name": "V7pro",
                    "value": "3",
                    "textStyle": {
                        "color": "rgb(32,10,144)"
                    }
                },
                {
                    "name": "pro10.5",
                    "value": "3",
                    "textStyle": {
                        "color": "rgb(133,103,57)"
                    }
                },
                {
                    "name": "9.7",
                    "value": "26",
                    "textStyle": {
                        "color": "rgb(75,13,116)"
                    }
                },
                {
                    "name": "padHuawei",
                    "value": "6",
                    "textStyle": {
                        "color": "rgb(6,44,15)"
                    }
                },
                {
                    "name": "padvivo",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(50,109,140)"
                    }
                },
                {
                    "name": "\u9e92\u9e9f",
                    "value": "9",
                    "textStyle": {
                        "color": "rgb(145,125,33)"
                    }
                },
                {
                    "name": "990",
                    "value": "4",
                    "textStyle": {
                        "color": "rgb(103,105,48)"
                    }
                },
                {
                    "name": "M12022",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(150,50,124)"
                    }
                },
                {
                    "name": "Air2Apple",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(154,52,17)"
                    }
                },
                {
                    "name": "\u6781\u901f",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(76,35,123)"
                    }
                },
                {
                    "name": "\u6709\u793c",
                    "value": "3",
                    "textStyle": {
                        "color": "rgb(119,25,42)"
                    }
                },
                {
                    "name": "X7",
                    "value": "6",
                    "textStyle": {
                        "color": "rgb(41,38,102)"
                    }
                },
                {
                    "name": "8.0",
                    "value": "7",
                    "textStyle": {
                        "color": "rgb(115,113,145)"
                    }
                },
                {
                    "name": "\u638c\u4e0a",
                    "value": "21",
                    "textStyle": {
                        "color": "rgb(125,89,0)"
                    }
                },
                {
                    "name": "ipadAir4Apple",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(119,157,128)"
                    }
                },
                {
                    "name": "\u7528\u56fd\u884c",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(52,26,140)"
                    }
                },
                {
                    "name": "\u5b89\u5353\u5168",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(114,25,154)"
                    }
                },
                {
                    "name": "\u5b89\u5353\u53ef",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(152,82,103)"
                    }
                },
                {
                    "name": "Pro2022",
                    "value": "7",
                    "textStyle": {
                        "color": "rgb(19,74,138)"
                    }
                },
                {
                    "name": "Air5mini6",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(134,75,51)"
                    }
                },
                {
                    "name": "x14pro",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(138,13,143)"
                    }
                },
                {
                    "name": "Miix",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(22,30,101)"
                    }
                },
                {
                    "name": "710",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(58,129,93)"
                    }
                },
                {
                    "name": "12lKB",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(135,67,159)"
                    }
                },
                {
                    "name": "Windows10",
                    "value": "4",
                    "textStyle": {
                        "color": "rgb(24,44,117)"
                    }
                },
                {
                    "name": "mini10.1",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(128,110,141)"
                    }
                },
                {
                    "name": "\u65e9\u6559\u673a",
                    "value": "3",
                    "textStyle": {
                        "color": "rgb(22,109,52)"
                    }
                },
                {
                    "name": "\u5c0f\u5b69",
                    "value": "3",
                    "textStyle": {
                        "color": "rgb(89,65,42)"
                    }
                },
                {
                    "name": "\u82f1\u8bed",
                    "value": "5",
                    "textStyle": {
                        "color": "rgb(57,108,135)"
                    }
                },
                {
                    "name": "\u5e7c\u513f",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(49,151,99)"
                    }
                },
                {
                    "name": "\u5b9d\u5b9d",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(124,43,20)"
                    }
                },
                {
                    "name": "\u6545\u4e8b",
                    "value": "3",
                    "textStyle": {
                        "color": "rgb(27,18,127)"
                    }
                },
                {
                    "name": "870WIFI",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(99,31,160)"
                    }
                },
                {
                    "name": "512G",
                    "value": "8",
                    "textStyle": {
                        "color": "rgb(130,154,24)"
                    }
                },
                {
                    "name": "\u624b\u673a\u6e38\u620f",
                    "value": "10",
                    "textStyle": {
                        "color": "rgb(61,0,142)"
                    }
                },
                {
                    "name": "Teclast",
                    "value": "30",
                    "textStyle": {
                        "color": "rgb(78,110,109)"
                    }
                },
                {
                    "name": "M40",
                    "value": "10",
                    "textStyle": {
                        "color": "rgb(71,160,53)"
                    }
                },
                {
                    "name": "\u5728\u5bb6",
                    "value": "4",
                    "textStyle": {
                        "color": "rgb(45,116,29)"
                    }
                },
                {
                    "name": "iPadmini",
                    "value": "5",
                    "textStyle": {
                        "color": "rgb(120,68,139)"
                    }
                },
                {
                    "name": "256G",
                    "value": "17",
                    "textStyle": {
                        "color": "rgb(85,140,54)"
                    }
                },
                {
                    "name": "\u4e03\u4ee3",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(143,59,35)"
                    }
                },
                {
                    "name": "mini4air",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(102,65,120)"
                    }
                },
                {
                    "name": "VIVOpad",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(51,105,41)"
                    }
                },
                {
                    "name": "120",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(53,76,101)"
                    }
                },
                {
                    "name": "\u6027\u80fd",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(15,43,74)"
                    }
                },
                {
                    "name": "iPlay",
                    "value": "8",
                    "textStyle": {
                        "color": "rgb(143,72,22)"
                    }
                },
                {
                    "name": "50",
                    "value": "5",
                    "textStyle": {
                        "color": "rgb(85,136,98)"
                    }
                },
                {
                    "name": "\u5916\u661f\u4eba",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(31,7,116)"
                    }
                },
                {
                    "name": "\u98ce\u66b4",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(103,45,115)"
                    }
                },
                {
                    "name": "M8",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(5,54,2)"
                    }
                },
                {
                    "name": "Mata",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(58,30,15)"
                    }
                },
                {
                    "name": "\u5bab\u683c",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(111,133,130)"
                    }
                },
                {
                    "name": "\u62a2\u5148",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(86,34,129)"
                    }
                },
                {
                    "name": "\u6234\u777f",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(150,21,63)"
                    }
                },
                {
                    "name": "DerePadAir",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(0,69,46)"
                    }
                },
                {
                    "name": "windows",
                    "value": "32",
                    "textStyle": {
                        "color": "rgb(119,152,139)"
                    }
                },
                {
                    "name": "\u624b\u63d0",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(48,141,9)"
                    }
                },
                {
                    "name": "Matepadpro",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(45,84,86)"
                    }
                },
                {
                    "name": "0LED",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(5,155,68)"
                    }
                },
                {
                    "name": "Duo",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(23,30,31)"
                    }
                },
                {
                    "name": "\u6298\u53e0",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(118,152,16)"
                    }
                },
                {
                    "name": "\u7f8e\u56fd",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(79,13,139)"
                    }
                },
                {
                    "name": "\u4ee3\u8d2d",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(133,85,149)"
                    }
                },
                {
                    "name": "\u5168\u56fd",
                    "value": "9",
                    "textStyle": {
                        "color": "rgb(152,105,32)"
                    }
                },
                {
                    "name": "\u8054\u4fdd",
                    "value": "10",
                    "textStyle": {
                        "color": "rgb(105,44,23)"
                    }
                },
                {
                    "name": "ipad912G",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(160,129,25)"
                    }
                },
                {
                    "name": "5plus",
                    "value": "4",
                    "textStyle": {
                        "color": "rgb(134,9,10)"
                    }
                },
                {
                    "name": "5Pro2022",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(78,65,56)"
                    }
                },
                {
                    "name": "S6",
                    "value": "17",
                    "textStyle": {
                        "color": "rgb(141,109,102)"
                    }
                },
                {
                    "name": "T860",
                    "value": "10",
                    "textStyle": {
                        "color": "rgb(22,24,127)"
                    }
                },
                {
                    "name": "\u70b9\u9910",
                    "value": "8",
                    "textStyle": {
                        "color": "rgb(102,125,30)"
                    }
                },
                {
                    "name": "mini201812G",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(38,17,158)"
                    }
                },
                {
                    "name": "2022Microsoft",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(111,149,0)"
                    }
                },
                {
                    "name": "Go",
                    "value": "15",
                    "textStyle": {
                        "color": "rgb(41,54,138)"
                    }
                },
                {
                    "name": "SurfaceBook",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(129,131,136)"
                    }
                },
                {
                    "name": "\u72ec\u663e",
                    "value": "3",
                    "textStyle": {
                        "color": "rgb(21,32,90)"
                    }
                },
                {
                    "name": "13.5",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(152,67,96)"
                    }
                },
                {
                    "name": "\u4e0b\u62c9\u5238\u7acb",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(119,45,90)"
                    }
                },
                {
                    "name": "100",
                    "value": "10",
                    "textStyle": {
                        "color": "rgb(23,29,120)"
                    }
                },
                {
                    "name": "ipad24",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(34,77,140)"
                    }
                },
                {
                    "name": "\u9001\u8c6a\u793c",
                    "value": "6",
                    "textStyle": {
                        "color": "rgb(143,81,127)"
                    }
                },
                {
                    "name": "\u5f53\u5929",
                    "value": "14",
                    "textStyle": {
                        "color": "rgb(84,87,126)"
                    }
                },
                {
                    "name": "\u6e38\u620f\u673a",
                    "value": "4",
                    "textStyle": {
                        "color": "rgb(1,111,41)"
                    }
                },
                {
                    "name": "310",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(76,111,126)"
                    }
                },
                {
                    "name": "oppopadair",
                    "value": "3",
                    "textStyle": {
                        "color": "rgb(129,116,59)"
                    }
                },
                {
                    "name": "oppopad",
                    "value": "8",
                    "textStyle": {
                        "color": "rgb(98,145,40)"
                    }
                },
                {
                    "name": "Jumper",
                    "value": "5",
                    "textStyle": {
                        "color": "rgb(54,125,35)"
                    }
                },
                {
                    "name": "EZpad8",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(30,119,69)"
                    }
                },
                {
                    "name": "\u8d85\u6781\u672c",
                    "value": "3",
                    "textStyle": {
                        "color": "rgb(3,17,141)"
                    }
                },
                {
                    "name": "\u9a81\u9f99\u516b\u6838",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(15,28,41)"
                    }
                },
                {
                    "name": "pro3",
                    "value": "5",
                    "textStyle": {
                        "color": "rgb(150,154,4)"
                    }
                },
                {
                    "name": "go",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(39,122,160)"
                    }
                },
                {
                    "name": "book",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(50,40,1)"
                    }
                },
                {
                    "name": "\u96f6\u9996\u4ed8",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(83,148,131)"
                    }
                },
                {
                    "name": "8360mAh",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(77,109,134)"
                    }
                },
                {
                    "name": "\u5927\u5bb9\u91cf",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(81,155,20)"
                    }
                },
                {
                    "name": "\u7535\u6c60",
                    "value": "5",
                    "textStyle": {
                        "color": "rgb(147,91,91)"
                    }
                },
                {
                    "name": "\u9ad8\u5237\u987a",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(147,44,43)"
                    }
                },
                {
                    "name": "\u4e30\u901f\u53d1",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(46,133,135)"
                    }
                },
                {
                    "name": "\u5c4f\u4fdd",
                    "value": "5",
                    "textStyle": {
                        "color": "rgb(57,104,109)"
                    }
                },
                {
                    "name": "T7",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(85,97,65)"
                    }
                },
                {
                    "name": "win112022",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(8,104,149)"
                    }
                },
                {
                    "name": "\u624b\u6e38",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(32,25,145)"
                    }
                },
                {
                    "name": "202222",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(149,105,46)"
                    }
                },
                {
                    "name": "iPad92023",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(85,33,45)"
                    }
                },
                {
                    "name": "\u54c1\u724c",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(58,76,36)"
                    }
                },
                {
                    "name": "\u4e8c\u624b",
                    "value": "11",
                    "textStyle": {
                        "color": "rgb(11,126,106)"
                    }
                },
                {
                    "name": "2020ipad",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(136,117,73)"
                    }
                },
                {
                    "name": "air42023",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(30,143,54)"
                    }
                },
                {
                    "name": "PAD",
                    "value": "13",
                    "textStyle": {
                        "color": "rgb(96,94,38)"
                    }
                },
                {
                    "name": "mini2Apple",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(31,34,61)"
                    }
                },
                {
                    "name": "WF",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(92,14,125)"
                    }
                },
                {
                    "name": "Pro567",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(80,106,103)"
                    }
                },
                {
                    "name": "DELL",
                    "value": "12",
                    "textStyle": {
                        "color": "rgb(26,143,155)"
                    }
                },
                {
                    "name": "\u6234\u5c14",
                    "value": "31",
                    "textStyle": {
                        "color": "rgb(33,85,47)"
                    }
                },
                {
                    "name": "Latitude",
                    "value": "3",
                    "textStyle": {
                        "color": "rgb(150,55,41)"
                    }
                },
                {
                    "name": "5290",
                    "value": "6",
                    "textStyle": {
                        "color": "rgb(69,29,113)"
                    }
                },
                {
                    "name": "Win102022",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(83,61,143)"
                    }
                },
                {
                    "name": "\u53cc\u7cfb\u7edf",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(74,135,148)"
                    }
                },
                {
                    "name": "pda",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(26,135,50)"
                    }
                },
                {
                    "name": "\u5b66\u751f\u5bbf\u820d",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(22,65,54)"
                    }
                },
                {
                    "name": "ipad10Microsoft",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(55,128,79)"
                    }
                },
                {
                    "name": "Go1234679",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(101,80,17)"
                    }
                },
                {
                    "name": "matepadpro",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(94,148,133)"
                    }
                },
                {
                    "name": "iPadProSamsung",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(45,47,111)"
                    }
                },
                {
                    "name": "2166",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(82,92,120)"
                    }
                },
                {
                    "name": "410",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(82,130,160)"
                    }
                },
                {
                    "name": "\u53f0\u7535",
                    "value": "21",
                    "textStyle": {
                        "color": "rgb(87,65,82)"
                    }
                },
                {
                    "name": "P80T",
                    "value": "9",
                    "textStyle": {
                        "color": "rgb(28,62,48)"
                    }
                },
                {
                    "name": "P80",
                    "value": "5",
                    "textStyle": {
                        "color": "rgb(4,40,64)"
                    }
                },
                {
                    "name": "\u5347\u7ea7\u7248",
                    "value": "4",
                    "textStyle": {
                        "color": "rgb(71,87,119)"
                    }
                },
                {
                    "name": "IPS",
                    "value": "11",
                    "textStyle": {
                        "color": "rgb(37,19,69)"
                    }
                },
                {
                    "name": "32GB",
                    "value": "9",
                    "textStyle": {
                        "color": "rgb(106,77,100)"
                    }
                },
                {
                    "name": "\u7a84\u8fb9",
                    "value": "5",
                    "textStyle": {
                        "color": "rgb(148,129,140)"
                    }
                },
                {
                    "name": "\u673a\u8eab",
                    "value": "7",
                    "textStyle": {
                        "color": "rgb(53,126,128)"
                    }
                },
                {
                    "name": "\u53cc\u9891",
                    "value": "6",
                    "textStyle": {
                        "color": "rgb(38,38,22)"
                    }
                },
                {
                    "name": "\u56db\u6838",
                    "value": "26",
                    "textStyle": {
                        "color": "rgb(89,5,2)"
                    }
                },
                {
                    "name": "\u8bfe\u5e26",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(112,96,94)"
                    }
                },
                {
                    "name": "\u5145\u7535\u5668",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(73,135,93)"
                    }
                },
                {
                    "name": "5GApple",
                    "value": "4",
                    "textStyle": {
                        "color": "rgb(22,100,121)"
                    }
                },
                {
                    "name": "\u827a\u672f\u5bb6",
                    "value": "3",
                    "textStyle": {
                        "color": "rgb(63,60,98)"
                    }
                },
                {
                    "name": "\u9650\u5b9a",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(79,56,43)"
                    }
                },
                {
                    "name": "\u534f\u540c",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(148,63,160)"
                    }
                },
                {
                    "name": "\u5bf8\u5168",
                    "value": "11",
                    "textStyle": {
                        "color": "rgb(112,102,62)"
                    }
                },
                {
                    "name": "\u8d85\u5927",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(150,16,56)"
                    }
                },
                {
                    "name": "matepad10.4",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(31,84,64)"
                    }
                },
                {
                    "name": "4Lenovo",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(52,98,73)"
                    }
                },
                {
                    "name": "TB",
                    "value": "6",
                    "textStyle": {
                        "color": "rgb(138,90,8)"
                    }
                },
                {
                    "name": "9707F",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(70,26,25)"
                    }
                },
                {
                    "name": "120h",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(43,118,145)"
                    }
                },
                {
                    "name": "\u9ad8\u51cf",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(80,105,10)"
                    }
                },
                {
                    "name": "v7pro",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(70,144,18)"
                    }
                },
                {
                    "name": "V6",
                    "value": "6",
                    "textStyle": {
                        "color": "rgb(126,64,102)"
                    }
                },
                {
                    "name": "45w",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(47,55,31)"
                    }
                },
                {
                    "name": "\u4fbf\u643a\u5f0f",
                    "value": "7",
                    "textStyle": {
                        "color": "rgb(140,125,138)"
                    }
                },
                {
                    "name": "5Gipad",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(72,113,6)"
                    }
                },
                {
                    "name": "\u5bf8\u6b3e",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(55,66,113)"
                    }
                },
                {
                    "name": "T733",
                    "value": "7",
                    "textStyle": {
                        "color": "rgb(25,1,120)"
                    }
                },
                {
                    "name": "S7FE",
                    "value": "3",
                    "textStyle": {
                        "color": "rgb(115,49,157)"
                    }
                },
                {
                    "name": "i3",
                    "value": "9",
                    "textStyle": {
                        "color": "rgb(35,74,133)"
                    }
                },
                {
                    "name": "16G",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(24,107,35)"
                    }
                },
                {
                    "name": "\u4ee3\u9177",
                    "value": "3",
                    "textStyle": {
                        "color": "rgb(85,149,47)"
                    }
                },
                {
                    "name": "Win11",
                    "value": "6",
                    "textStyle": {
                        "color": "rgb(142,77,7)"
                    }
                },
                {
                    "name": "Pro9Huawei",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(3,139,9)"
                    }
                },
                {
                    "name": "Pro5Pro6Pro7",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(4,108,116)"
                    }
                },
                {
                    "name": "\u516d\u671f",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(55,113,140)"
                    }
                },
                {
                    "name": "\u4fdd\u62a4",
                    "value": "6",
                    "textStyle": {
                        "color": "rgb(34,15,118)"
                    }
                },
                {
                    "name": "Matepad10.4",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(9,150,139)"
                    }
                },
                {
                    "name": "EZpad",
                    "value": "11",
                    "textStyle": {
                        "color": "rgb(51,2,127)"
                    }
                },
                {
                    "name": "12.3",
                    "value": "6",
                    "textStyle": {
                        "color": "rgb(128,156,115)"
                    }
                },
                {
                    "name": "2.8",
                    "value": "3",
                    "textStyle": {
                        "color": "rgb(122,124,14)"
                    }
                },
                {
                    "name": "\u9886\u5238\u7acb",
                    "value": "7",
                    "textStyle": {
                        "color": "rgb(28,7,19)"
                    }
                },
                {
                    "name": "PadApple",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(26,26,26)"
                    }
                },
                {
                    "name": "vivoPAD",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(97,159,125)"
                    }
                },
                {
                    "name": "\u5728\u7ebf",
                    "value": "3",
                    "textStyle": {
                        "color": "rgb(10,33,153)"
                    }
                },
                {
                    "name": "50Pro",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(158,76,26)"
                    }
                },
                {
                    "name": "paper",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(155,116,95)"
                    }
                },
                {
                    "name": "\u7c7b\u7eb8",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(12,117,80)"
                    }
                },
                {
                    "name": "\u7535\u5b50\u4e66",
                    "value": "6",
                    "textStyle": {
                        "color": "rgb(43,38,90)"
                    }
                },
                {
                    "name": "\u9605\u8bfb",
                    "value": "4",
                    "textStyle": {
                        "color": "rgb(116,139,153)"
                    }
                },
                {
                    "name": "62022",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(111,49,10)"
                    }
                },
                {
                    "name": "T735C",
                    "value": "4",
                    "textStyle": {
                        "color": "rgb(67,56,59)"
                    }
                },
                {
                    "name": "Yoga",
                    "value": "8",
                    "textStyle": {
                        "color": "rgb(0,95,28)"
                    }
                },
                {
                    "name": "BYT",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(54,61,39)"
                    }
                },
                {
                    "name": "K606F",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(149,10,153)"
                    }
                },
                {
                    "name": "1TB",
                    "value": "3",
                    "textStyle": {
                        "color": "rgb(13,22,94)"
                    }
                },
                {
                    "name": "Pro9Apple",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(156,3,155)"
                    }
                },
                {
                    "name": "ipad10Apple",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(94,131,29)"
                    }
                },
                {
                    "name": "air4Apple",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(124,107,50)"
                    }
                },
                {
                    "name": "wifi9.7",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(138,18,29)"
                    }
                },
                {
                    "name": "ipad6",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(99,69,61)"
                    }
                },
                {
                    "name": "5dell",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(25,23,37)"
                    }
                },
                {
                    "name": "latitude5290",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(60,158,146)"
                    }
                },
                {
                    "name": "7200",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(96,128,136)"
                    }
                },
                {
                    "name": "7210",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(11,92,66)"
                    }
                },
                {
                    "name": "7320",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(159,146,74)"
                    }
                },
                {
                    "name": "14.5",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(149,157,112)"
                    }
                },
                {
                    "name": "\u8d8a\u72f1",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(0,125,56)"
                    }
                },
                {
                    "name": "\u5916\u8bbe",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(156,148,92)"
                    }
                },
                {
                    "name": "Liquid",
                    "value": "4",
                    "textStyle": {
                        "color": "rgb(156,3,126)"
                    }
                },
                {
                    "name": "\u89c6\u7f51\u819c",
                    "value": "4",
                    "textStyle": {
                        "color": "rgb(49,130,8)"
                    }
                },
                {
                    "name": "\u7248\u672c",
                    "value": "11",
                    "textStyle": {
                        "color": "rgb(135,13,124)"
                    }
                },
                {
                    "name": "47",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(107,55,142)"
                    }
                },
                {
                    "name": "\u5bf8\u4e09\u9632",
                    "value": "4",
                    "textStyle": {
                        "color": "rgb(123,33,117)"
                    }
                },
                {
                    "name": "\u5de5\u4e1a",
                    "value": "33",
                    "textStyle": {
                        "color": "rgb(141,107,86)"
                    }
                },
                {
                    "name": "IP65",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(37,149,1)"
                    }
                },
                {
                    "name": "\u6761\u7801",
                    "value": "7",
                    "textStyle": {
                        "color": "rgb(108,134,93)"
                    }
                },
                {
                    "name": "\u626b\u63cf",
                    "value": "9",
                    "textStyle": {
                        "color": "rgb(141,79,10)"
                    }
                },
                {
                    "name": "\u624b\u6301",
                    "value": "11",
                    "textStyle": {
                        "color": "rgb(59,156,47)"
                    }
                },
                {
                    "name": "\u52a0\u56fa",
                    "value": "9",
                    "textStyle": {
                        "color": "rgb(102,85,59)"
                    }
                },
                {
                    "name": "andriod",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(134,15,70)"
                    }
                },
                {
                    "name": "\u76ae\u5957",
                    "value": "6",
                    "textStyle": {
                        "color": "rgb(8,91,70)"
                    }
                },
                {
                    "name": "\u4f2f\u601d\u987f",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(5,6,62)"
                    }
                },
                {
                    "name": "23",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(138,150,17)"
                    }
                },
                {
                    "name": "20172019",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(44,97,65)"
                    }
                },
                {
                    "name": "\u7b2c\u516b\u4ee3",
                    "value": "3",
                    "textStyle": {
                        "color": "rgb(55,151,117)"
                    }
                },
                {
                    "name": "miix720",
                    "value": "4",
                    "textStyle": {
                        "color": "rgb(3,33,87)"
                    }
                },
                {
                    "name": "520",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(123,45,55)"
                    }
                },
                {
                    "name": "windows10",
                    "value": "19",
                    "textStyle": {
                        "color": "rgb(23,71,86)"
                    }
                },
                {
                    "name": "\u7092\u80a1",
                    "value": "12",
                    "textStyle": {
                        "color": "rgb(92,122,70)"
                    }
                },
                {
                    "name": "PS",
                    "value": "4",
                    "textStyle": {
                        "color": "rgb(122,36,53)"
                    }
                },
                {
                    "name": "ipad5",
                    "value": "4",
                    "textStyle": {
                        "color": "rgb(15,139,105)"
                    }
                },
                {
                    "name": "4G2021",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(91,8,143)"
                    }
                },
                {
                    "name": "2Lenovo",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(16,64,33)"
                    }
                },
                {
                    "name": "12G",
                    "value": "3",
                    "textStyle": {
                        "color": "rgb(156,58,100)"
                    }
                },
                {
                    "name": "512GV7",
                    "value": "3",
                    "textStyle": {
                        "color": "rgb(129,99,141)"
                    }
                },
                {
                    "name": "\u53cc\u5361",
                    "value": "8",
                    "textStyle": {
                        "color": "rgb(54,92,88)"
                    }
                },
                {
                    "name": "20202021",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(3,158,150)"
                    }
                },
                {
                    "name": "ipad12G",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(92,86,43)"
                    }
                },
                {
                    "name": "\u5c4f\u53cc\u5361",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(138,70,160)"
                    }
                },
                {
                    "name": "surface",
                    "value": "14",
                    "textStyle": {
                        "color": "rgb(98,94,144)"
                    }
                },
                {
                    "name": "\u4ee3\u7a84",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(128,88,149)"
                    }
                },
                {
                    "name": "\u8fb9\u6846",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(75,86,45)"
                    }
                },
                {
                    "name": "win11OPPO",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(50,149,39)"
                    }
                },
                {
                    "name": "Ipad",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(65,117,66)"
                    }
                },
                {
                    "name": "\u89c6\u9891",
                    "value": "19",
                    "textStyle": {
                        "color": "rgb(30,42,112)"
                    }
                },
                {
                    "name": "\u901a\u7528",
                    "value": "5",
                    "textStyle": {
                        "color": "rgb(10,155,39)"
                    }
                },
                {
                    "name": "Mipad",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(73,98,90)"
                    }
                },
                {
                    "name": "thinkpad",
                    "value": "3",
                    "textStyle": {
                        "color": "rgb(129,136,108)"
                    }
                },
                {
                    "name": "\u672c\u56db",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(136,49,106)"
                    }
                },
                {
                    "name": "\u6838\u5fc3",
                    "value": "3",
                    "textStyle": {
                        "color": "rgb(100,25,100)"
                    }
                },
                {
                    "name": "\u5f71\u89c6\u5a31\u4e50",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(20,46,28)"
                    }
                },
                {
                    "name": "\u5b89\u5353\u673a",
                    "value": "6",
                    "textStyle": {
                        "color": "rgb(52,137,149)"
                    }
                },
                {
                    "name": "\u8bfe\u5168",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(75,159,27)"
                    }
                },
                {
                    "name": "MatePadApple",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(5,79,23)"
                    }
                },
                {
                    "name": "52022",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(31,134,137)"
                    }
                },
                {
                    "name": "5285",
                    "value": "6",
                    "textStyle": {
                        "color": "rgb(100,58,67)"
                    }
                },
                {
                    "name": "dell",
                    "value": "4",
                    "textStyle": {
                        "color": "rgb(125,126,90)"
                    }
                },
                {
                    "name": "ThinkPad",
                    "value": "4",
                    "textStyle": {
                        "color": "rgb(119,63,126)"
                    }
                },
                {
                    "name": "X1",
                    "value": "4",
                    "textStyle": {
                        "color": "rgb(152,73,62)"
                    }
                },
                {
                    "name": "Tablet",
                    "value": "5",
                    "textStyle": {
                        "color": "rgb(135,29,22)"
                    }
                },
                {
                    "name": "OPPOPAD",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(85,28,110)"
                    }
                },
                {
                    "name": "mini4",
                    "value": "5",
                    "textStyle": {
                        "color": "rgb(62,104,31)"
                    }
                },
                {
                    "name": "5gwifi",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(146,142,0)"
                    }
                },
                {
                    "name": "6500Y",
                    "value": "3",
                    "textStyle": {
                        "color": "rgb(120,40,17)"
                    }
                },
                {
                    "name": "\u6377\u5eb7",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(25,120,23)"
                    }
                },
                {
                    "name": "\u8fbe\u5341\u6838\u5b89\u5353",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(128,0,18)"
                    }
                },
                {
                    "name": "\u591a\u529f\u80fd",
                    "value": "4",
                    "textStyle": {
                        "color": "rgb(114,156,12)"
                    }
                },
                {
                    "name": "\u770b\u620f",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(73,33,130)"
                    }
                },
                {
                    "name": "\u8001\u5e74\u4eba",
                    "value": "7",
                    "textStyle": {
                        "color": "rgb(74,47,56)"
                    }
                },
                {
                    "name": "\u7535\u89c6",
                    "value": "3",
                    "textStyle": {
                        "color": "rgb(48,54,126)"
                    }
                },
                {
                    "name": "wifiHuawei",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(51,84,6)"
                    }
                },
                {
                    "name": "proHUAWEI",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(82,154,26)"
                    }
                },
                {
                    "name": "\u539f\u8272",
                    "value": "4",
                    "textStyle": {
                        "color": "rgb(152,14,13)"
                    }
                },
                {
                    "name": "2022Samsung",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(147,84,67)"
                    }
                },
                {
                    "name": "X900",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(34,12,160)"
                    }
                },
                {
                    "name": "S8UltraHuawei",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(6,122,122)"
                    }
                },
                {
                    "name": "iPlay40",
                    "value": "6",
                    "textStyle": {
                        "color": "rgb(21,27,137)"
                    }
                },
                {
                    "name": "\u65b0\u9a81\u9f99",
                    "value": "3",
                    "textStyle": {
                        "color": "rgb(31,3,5)"
                    }
                },
                {
                    "name": "Gen",
                    "value": "3",
                    "textStyle": {
                        "color": "rgb(134,117,57)"
                    }
                },
                {
                    "name": "LTPS",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(11,54,140)"
                    }
                },
                {
                    "name": "Pen",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(34,31,19)"
                    }
                },
                {
                    "name": "WLANHuawei",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(31,79,24)"
                    }
                },
                {
                    "name": "Go3",
                    "value": "9",
                    "textStyle": {
                        "color": "rgb(29,56,25)"
                    }
                },
                {
                    "name": "Sony",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(153,25,50)"
                    }
                },
                {
                    "name": "\u7d22\u5c3c",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(1,11,22)"
                    }
                },
                {
                    "name": "SVT1112",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(11,111,21)"
                    }
                },
                {
                    "name": "MatePad11pro",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(153,155,32)"
                    }
                },
                {
                    "name": "ipad102022",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(29,90,49)"
                    }
                },
                {
                    "name": "\u8bfe\u9177",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(23,118,67)"
                    }
                },
                {
                    "name": "Smile1",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(139,140,122)"
                    }
                },
                {
                    "name": "\u53e3\u888b",
                    "value": "4",
                    "textStyle": {
                        "color": "rgb(3,152,8)"
                    }
                },
                {
                    "name": "\u513f\u7ae5\u7f51",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(6,100,15)"
                    }
                },
                {
                    "name": "\u4e13\u5c5e",
                    "value": "4",
                    "textStyle": {
                        "color": "rgb(52,7,99)"
                    }
                },
                {
                    "name": "\u4e2d\u5fc3",
                    "value": "4",
                    "textStyle": {
                        "color": "rgb(156,119,111)"
                    }
                },
                {
                    "name": "\u6807\u51c6\u7248",
                    "value": "3",
                    "textStyle": {
                        "color": "rgb(9,80,24)"
                    }
                },
                {
                    "name": "\u5c4f\u516b\u6838",
                    "value": "3",
                    "textStyle": {
                        "color": "rgb(87,23,143)"
                    }
                },
                {
                    "name": "\u9996\u6b3e",
                    "value": "8",
                    "textStyle": {
                        "color": "rgb(114,11,113)"
                    }
                },
                {
                    "name": "airHuawei",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(35,5,83)"
                    }
                },
                {
                    "name": "\u4ee3\u56fd\u884c",
                    "value": "5",
                    "textStyle": {
                        "color": "rgb(54,30,150)"
                    }
                },
                {
                    "name": "\u4e09\u9632",
                    "value": "14",
                    "textStyle": {
                        "color": "rgb(23,122,130)"
                    }
                },
                {
                    "name": "\u6237\u5916",
                    "value": "8",
                    "textStyle": {
                        "color": "rgb(91,98,54)"
                    }
                },
                {
                    "name": "\u519b\u5de5",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(144,137,110)"
                    }
                },
                {
                    "name": "IP67",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(60,91,88)"
                    }
                },
                {
                    "name": "\u9632\u6c34",
                    "value": "11",
                    "textStyle": {
                        "color": "rgb(146,108,61)"
                    }
                },
                {
                    "name": "\u533b\u7597",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(92,93,26)"
                    }
                },
                {
                    "name": "PDAwin10",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(156,52,54)"
                    }
                },
                {
                    "name": "\u9632\u7206",
                    "value": "3",
                    "textStyle": {
                        "color": "rgb(98,135,65)"
                    }
                },
                {
                    "name": "GPS",
                    "value": "4",
                    "textStyle": {
                        "color": "rgb(34,75,117)"
                    }
                },
                {
                    "name": "\u5f85\u673a",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(15,21,72)"
                    }
                },
                {
                    "name": "win10Ppc",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(7,119,108)"
                    }
                },
                {
                    "name": "I7",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(109,81,44)"
                    }
                },
                {
                    "name": "\u773c\u5f71",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(144,94,93)"
                    }
                },
                {
                    "name": "\u97f3\u89c6\u9891",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(72,142,28)"
                    }
                },
                {
                    "name": "\u65e9\u6559",
                    "value": "3",
                    "textStyle": {
                        "color": "rgb(124,45,160)"
                    }
                },
                {
                    "name": "T870",
                    "value": "7",
                    "textStyle": {
                        "color": "rgb(87,9,5)"
                    }
                },
                {
                    "name": "android11padpro",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(149,49,160)"
                    }
                },
                {
                    "name": "\u8bfe\u5403\u9e21",
                    "value": "3",
                    "textStyle": {
                        "color": "rgb(117,1,105)"
                    }
                },
                {
                    "name": "ipadmini1Apple",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(57,77,126)"
                    }
                },
                {
                    "name": "iPadPro2018",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(126,130,30)"
                    }
                },
                {
                    "name": "\u5b89\u5353\u5927\u5c4f",
                    "value": "9",
                    "textStyle": {
                        "color": "rgb(108,10,56)"
                    }
                },
                {
                    "name": "iPad2020",
                    "value": "3",
                    "textStyle": {
                        "color": "rgb(6,72,81)"
                    }
                },
                {
                    "name": "\u667a\u80fd\u673a",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(73,56,139)"
                    }
                },
                {
                    "name": "\u672a\u6fc0\u6d3b",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(138,88,82)"
                    }
                },
                {
                    "name": "\u63a8\u8350",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(11,42,21)"
                    }
                },
                {
                    "name": "\u5929\u9a84",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(10,139,97)"
                    }
                },
                {
                    "name": "6G",
                    "value": "8",
                    "textStyle": {
                        "color": "rgb(143,88,156)"
                    }
                },
                {
                    "name": "\u53cd\u5c04\u955c",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(148,52,50)"
                    }
                },
                {
                    "name": "YT",
                    "value": "3",
                    "textStyle": {
                        "color": "rgb(159,30,134)"
                    }
                },
                {
                    "name": "K606FMicrosoft",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(140,69,86)"
                    }
                },
                {
                    "name": "SURFACE",
                    "value": "7",
                    "textStyle": {
                        "color": "rgb(58,81,130)"
                    }
                },
                {
                    "name": "Android",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(133,19,102)"
                    }
                },
                {
                    "name": "minihonor",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(58,111,86)"
                    }
                },
                {
                    "name": "\u8bfe\u7528",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(57,101,48)"
                    }
                },
                {
                    "name": "MIIX720",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(122,70,15)"
                    }
                },
                {
                    "name": "Dell",
                    "value": "9",
                    "textStyle": {
                        "color": "rgb(98,39,22)"
                    }
                },
                {
                    "name": "Venue",
                    "value": "8",
                    "textStyle": {
                        "color": "rgb(30,134,133)"
                    }
                },
                {
                    "name": "\u82f1\u7279\u5c14",
                    "value": "3",
                    "textStyle": {
                        "color": "rgb(82,150,6)"
                    }
                },
                {
                    "name": "WIN8",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(25,59,82)"
                    }
                },
                {
                    "name": "iPadOPPO",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(130,151,117)"
                    }
                },
                {
                    "name": "Pencil",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(5,9,152)"
                    }
                },
                {
                    "name": "\u5f53\u65e5",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(80,152,45)"
                    }
                },
                {
                    "name": "ipadLenovo",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(143,66,154)"
                    }
                },
                {
                    "name": "T733Tab",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(24,1,151)"
                    }
                },
                {
                    "name": "5GWiFi",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(135,3,89)"
                    }
                },
                {
                    "name": "\u6025\u901f",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(65,90,72)"
                    }
                },
                {
                    "name": "\u6e05\u4ed3",
                    "value": "6",
                    "textStyle": {
                        "color": "rgb(62,95,82)"
                    }
                },
                {
                    "name": "\u7279\u4ef7",
                    "value": "5",
                    "textStyle": {
                        "color": "rgb(87,94,140)"
                    }
                },
                {
                    "name": "\u6b3e\u7f51",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(49,30,13)"
                    }
                },
                {
                    "name": "\u8bfe\u70b9\u9910",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(77,43,68)"
                    }
                },
                {
                    "name": "CAD",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(70,24,118)"
                    }
                },
                {
                    "name": "SQ3",
                    "value": "5",
                    "textStyle": {
                        "color": "rgb(147,89,39)"
                    }
                },
                {
                    "name": "\u4e5d\u4ee3",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(20,18,22)"
                    }
                },
                {
                    "name": "BSApple",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(8,134,118)"
                    }
                },
                {
                    "name": "9BOE",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(128,50,3)"
                    }
                },
                {
                    "name": "\u4eac\u4e1c\u65b9",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(142,66,31)"
                    }
                },
                {
                    "name": "funbook",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(36,153,36)"
                    }
                },
                {
                    "name": "\u5c0f\u8bfe",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(29,71,44)"
                    }
                },
                {
                    "name": "C1S",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(80,53,151)"
                    }
                },
                {
                    "name": "\u542f\u8499",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(7,75,84)"
                    }
                },
                {
                    "name": "\u7ed8\u672c",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(84,145,134)"
                    }
                },
                {
                    "name": "\u9605\u8bfb\u5668",
                    "value": "4",
                    "textStyle": {
                        "color": "rgb(157,38,103)"
                    }
                },
                {
                    "name": "\u773c\u70b9",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(9,115,94)"
                    }
                },
                {
                    "name": "\u5bb6\u6559",
                    "value": "3",
                    "textStyle": {
                        "color": "rgb(39,139,127)"
                    }
                },
                {
                    "name": "\u5305\u90ae\u987a\u4e30",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(27,151,75)"
                    }
                },
                {
                    "name": "2020ipad8",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(62,105,6)"
                    }
                },
                {
                    "name": "\u5f69\u8272",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(33,15,79)"
                    }
                },
                {
                    "name": "\u667a\u80fd\u624b\u673a",
                    "value": "3",
                    "textStyle": {
                        "color": "rgb(98,114,67)"
                    }
                },
                {
                    "name": "S8Ultra",
                    "value": "5",
                    "textStyle": {
                        "color": "rgb(141,102,69)"
                    }
                },
                {
                    "name": "5G2022",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(27,129,64)"
                    }
                },
                {
                    "name": "MatePad10.4",
                    "value": "6",
                    "textStyle": {
                        "color": "rgb(117,68,38)"
                    }
                },
                {
                    "name": "J606F",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(17,103,126)"
                    }
                },
                {
                    "name": "3K",
                    "value": "5",
                    "textStyle": {
                        "color": "rgb(62,48,126)"
                    }
                },
                {
                    "name": "\u624b\u7ed8",
                    "value": "4",
                    "textStyle": {
                        "color": "rgb(151,63,160)"
                    }
                },
                {
                    "name": "Pro3",
                    "value": "4",
                    "textStyle": {
                        "color": "rgb(83,2,125)"
                    }
                },
                {
                    "name": "\u9001\u793c",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(116,112,59)"
                    }
                },
                {
                    "name": "ProHuawei",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(98,16,5)"
                    }
                },
                {
                    "name": "\u4e2d\u8001\u5e74",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(3,137,26)"
                    }
                },
                {
                    "name": "\u7528\u7f51",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(50,0,49)"
                    }
                },
                {
                    "name": "v8",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(125,116,64)"
                    }
                },
                {
                    "name": "\u7248\u9ad8\u8272\u57df",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(120,52,103)"
                    }
                },
                {
                    "name": "\u9177\u777f",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(96,73,127)"
                    }
                },
                {
                    "name": "T3",
                    "value": "4",
                    "textStyle": {
                        "color": "rgb(63,90,37)"
                    }
                },
                {
                    "name": "latitude",
                    "value": "5",
                    "textStyle": {
                        "color": "rgb(159,119,21)"
                    }
                },
                {
                    "name": "ZBT",
                    "value": "3",
                    "textStyle": {
                        "color": "rgb(128,0,10)"
                    }
                },
                {
                    "name": "\u521d\u4e2d\u751f",
                    "value": "3",
                    "textStyle": {
                        "color": "rgb(67,139,104)"
                    }
                },
                {
                    "name": "\u9ad8\u4e2d",
                    "value": "7",
                    "textStyle": {
                        "color": "rgb(27,42,119)"
                    }
                },
                {
                    "name": "pro2019air3",
                    "value": "3",
                    "textStyle": {
                        "color": "rgb(140,159,61)"
                    }
                },
                {
                    "name": "mini2022",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(61,66,87)"
                    }
                },
                {
                    "name": "Elite1000",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(160,62,118)"
                    }
                },
                {
                    "name": "G2",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(155,103,16)"
                    }
                },
                {
                    "name": "\u7545\u73a9",
                    "value": "8",
                    "textStyle": {
                        "color": "rgb(103,43,53)"
                    }
                },
                {
                    "name": "9.6",
                    "value": "7",
                    "textStyle": {
                        "color": "rgb(89,14,0)"
                    }
                },
                {
                    "name": "AGS",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(111,58,124)"
                    }
                },
                {
                    "name": "\u5317\u6597",
                    "value": "4",
                    "textStyle": {
                        "color": "rgb(34,36,23)"
                    }
                },
                {
                    "name": "\u5bfc\u822a",
                    "value": "4",
                    "textStyle": {
                        "color": "rgb(14,113,46)"
                    }
                },
                {
                    "name": "matepadPro11",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(88,92,145)"
                    }
                },
                {
                    "name": "new",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(42,102,10)"
                    }
                },
                {
                    "name": "iPadwifi",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(16,137,44)"
                    }
                },
                {
                    "name": "\u7535\u8bdd",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(103,125,8)"
                    }
                },
                {
                    "name": "Latitude5290",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(156,125,154)"
                    }
                },
                {
                    "name": "pro7",
                    "value": "3",
                    "textStyle": {
                        "color": "rgb(2,84,15)"
                    }
                },
                {
                    "name": "pro6",
                    "value": "4",
                    "textStyle": {
                        "color": "rgb(154,58,78)"
                    }
                },
                {
                    "name": "pro5",
                    "value": "5",
                    "textStyle": {
                        "color": "rgb(44,85,14)"
                    }
                },
                {
                    "name": "\u5de5\u7a0b\u961f",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(46,60,121)"
                    }
                },
                {
                    "name": "linux",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(138,132,68)"
                    }
                },
                {
                    "name": "\u5de5\u4f5c",
                    "value": "3",
                    "textStyle": {
                        "color": "rgb(158,92,115)"
                    }
                },
                {
                    "name": "\u65b9\u4fbf",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(39,148,66)"
                    }
                },
                {
                    "name": "iNote",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(159,111,2)"
                    }
                },
                {
                    "name": "4096",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(150,30,7)"
                    }
                },
                {
                    "name": "\u7b14\u8ff9",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(132,46,159)"
                    }
                },
                {
                    "name": "T830",
                    "value": "3",
                    "textStyle": {
                        "color": "rgb(112,26,77)"
                    }
                },
                {
                    "name": "S4",
                    "value": "4",
                    "textStyle": {
                        "color": "rgb(26,150,159)"
                    }
                },
                {
                    "name": "CENAVA",
                    "value": "7",
                    "textStyle": {
                        "color": "rgb(143,98,139)"
                    }
                },
                {
                    "name": "S10pro10",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(72,38,86)"
                    }
                },
                {
                    "name": "\u4e32\u53e3",
                    "value": "4",
                    "textStyle": {
                        "color": "rgb(98,15,156)"
                    }
                },
                {
                    "name": "\u6307\u7eb9\u8bc6\u522b",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(47,159,32)"
                    }
                },
                {
                    "name": "\u4ea7\u54c1",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(138,147,98)"
                    }
                },
                {
                    "name": "\u5165\u5e93",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(132,7,47)"
                    }
                },
                {
                    "name": "GO2win10",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(114,141,67)"
                    }
                },
                {
                    "name": "\u5347\u7ea7",
                    "value": "5",
                    "textStyle": {
                        "color": "rgb(59,109,5)"
                    }
                },
                {
                    "name": "3G",
                    "value": "4",
                    "textStyle": {
                        "color": "rgb(79,67,59)"
                    }
                },
                {
                    "name": "32G",
                    "value": "9",
                    "textStyle": {
                        "color": "rgb(78,155,136)"
                    }
                },
                {
                    "name": "\u84dd\u7259",
                    "value": "14",
                    "textStyle": {
                        "color": "rgb(111,4,83)"
                    }
                },
                {
                    "name": "Lite",
                    "value": "5",
                    "textStyle": {
                        "color": "rgb(97,156,65)"
                    }
                },
                {
                    "name": "P610",
                    "value": "10",
                    "textStyle": {
                        "color": "rgb(133,105,103)"
                    }
                },
                {
                    "name": "P615C",
                    "value": "6",
                    "textStyle": {
                        "color": "rgb(111,34,92)"
                    }
                },
                {
                    "name": "\u5e26\u7b14",
                    "value": "3",
                    "textStyle": {
                        "color": "rgb(12,136,68)"
                    }
                },
                {
                    "name": "4GB",
                    "value": "5",
                    "textStyle": {
                        "color": "rgb(143,81,142)"
                    }
                },
                {
                    "name": "778G",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(141,62,113)"
                    }
                },
                {
                    "name": "Wi",
                    "value": "3",
                    "textStyle": {
                        "color": "rgb(3,146,35)"
                    }
                },
                {
                    "name": "Fi",
                    "value": "3",
                    "textStyle": {
                        "color": "rgb(107,146,57)"
                    }
                },
                {
                    "name": "\u5b89\u5353\u516b\u6838",
                    "value": "4",
                    "textStyle": {
                        "color": "rgb(126,110,32)"
                    }
                },
                {
                    "name": "S6Lite",
                    "value": "4",
                    "textStyle": {
                        "color": "rgb(34,151,159)"
                    }
                },
                {
                    "name": "P613",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(132,137,11)"
                    }
                },
                {
                    "name": "DBY",
                    "value": "3",
                    "textStyle": {
                        "color": "rgb(59,96,41)"
                    }
                },
                {
                    "name": "W09P",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(110,152,155)"
                    }
                },
                {
                    "name": "5pro12.4",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(106,69,113)"
                    }
                },
                {
                    "name": "Air52018Apple",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(28,8,90)"
                    }
                },
                {
                    "name": "\u4eba\u8138\u8bc6\u522b",
                    "value": "4",
                    "textStyle": {
                        "color": "rgb(113,121,141)"
                    }
                },
                {
                    "name": "4GFujitsu",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(94,108,14)"
                    }
                },
                {
                    "name": "\u5bcc\u58eb\u901a",
                    "value": "11",
                    "textStyle": {
                        "color": "rgb(144,144,3)"
                    }
                },
                {
                    "name": "Q775",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(23,110,153)"
                    }
                },
                {
                    "name": "\u5bf8\u5c4f",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(2,6,39)"
                    }
                },
                {
                    "name": "\u4e2d\u8001\u5e74\u4eba",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(92,116,100)"
                    }
                },
                {
                    "name": "\u5fae\u4fe1",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(149,91,64)"
                    }
                },
                {
                    "name": "\u804a\u5929",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(154,35,111)"
                    }
                },
                {
                    "name": "lpad",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(120,42,15)"
                    }
                },
                {
                    "name": "\u6697\u591c",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(65,114,119)"
                    }
                },
                {
                    "name": "\u663e\u793a\u5c4f",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(66,133,63)"
                    }
                },
                {
                    "name": "surfacepro82021",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(85,19,142)"
                    }
                },
                {
                    "name": "SurfaceGo32021",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(119,113,106)"
                    }
                },
                {
                    "name": "\u58f9\u53f7",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(80,95,88)"
                    }
                },
                {
                    "name": "T1",
                    "value": "3",
                    "textStyle": {
                        "color": "rgb(135,103,30)"
                    }
                },
                {
                    "name": "i7i5win11",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(50,78,33)"
                    }
                },
                {
                    "name": "\u89e6\u5c4f\u9177",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(132,77,139)"
                    }
                },
                {
                    "name": "TB2",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(91,121,107)"
                    }
                },
                {
                    "name": "X30M",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(0,4,77)"
                    }
                },
                {
                    "name": "x70F",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(153,2,98)"
                    }
                },
                {
                    "name": "\u54c8\u66fc",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(48,121,1)"
                    }
                },
                {
                    "name": "\u5361\u987f",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(67,28,151)"
                    }
                },
                {
                    "name": "T220",
                    "value": "3",
                    "textStyle": {
                        "color": "rgb(151,117,5)"
                    }
                },
                {
                    "name": "A7",
                    "value": "6",
                    "textStyle": {
                        "color": "rgb(101,78,61)"
                    }
                },
                {
                    "name": "8.7",
                    "value": "3",
                    "textStyle": {
                        "color": "rgb(33,121,154)"
                    }
                },
                {
                    "name": "T227",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(113,20,97)"
                    }
                },
                {
                    "name": "\u53cc\u5361\u5927\u5c4f",
                    "value": "3",
                    "textStyle": {
                        "color": "rgb(123,115,156)"
                    }
                },
                {
                    "name": "4plus",
                    "value": "7",
                    "textStyle": {
                        "color": "rgb(61,59,144)"
                    }
                },
                {
                    "name": "m2",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(16,60,31)"
                    }
                },
                {
                    "name": "Air4mini6",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(147,68,32)"
                    }
                },
                {
                    "name": "iPadmini5Microsoft",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(54,151,119)"
                    }
                },
                {
                    "name": "iPad6",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(127,66,139)"
                    }
                },
                {
                    "name": "\u6b21\u65e5",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(106,74,125)"
                    }
                },
                {
                    "name": "9MIUI",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(10,72,114)"
                    }
                },
                {
                    "name": "ipad2021Apple",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(86,18,156)"
                    }
                },
                {
                    "name": "\u578b\u53f7",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(112,99,22)"
                    }
                },
                {
                    "name": "\u53ef\u9009",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(65,100,54)"
                    }
                },
                {
                    "name": "S6lite",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(148,50,81)"
                    }
                },
                {
                    "name": "\u5de5\u7a0b",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(79,28,45)"
                    }
                },
                {
                    "name": "\u6c7d\u4fee",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(77,137,22)"
                    }
                },
                {
                    "name": "MRR",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(153,125,88)"
                    }
                },
                {
                    "name": "W29",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(12,39,96)"
                    }
                },
                {
                    "name": "Pro21",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(122,51,160)"
                    }
                },
                {
                    "name": "\u5206\u8fa9\u7387",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(5,157,71)"
                    }
                },
                {
                    "name": "MTK6739GPS",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(30,23,127)"
                    }
                },
                {
                    "name": "\u7f16\u7a0b",
                    "value": "3",
                    "textStyle": {
                        "color": "rgb(20,46,85)"
                    }
                },
                {
                    "name": "2Apple",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(72,130,79)"
                    }
                },
                {
                    "name": "5678",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(103,49,152)"
                    }
                },
                {
                    "name": "Mini45",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(10,72,138)"
                    }
                },
                {
                    "name": "ipad11",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(77,11,156)"
                    }
                },
                {
                    "name": "\u9009\u9001",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(34,94,44)"
                    }
                },
                {
                    "name": "\u94a2\u5316",
                    "value": "4",
                    "textStyle": {
                        "color": "rgb(6,105,61)"
                    }
                },
                {
                    "name": "5GMIUI",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(144,153,62)"
                    }
                },
                {
                    "name": "Pro2023",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(138,123,29)"
                    }
                },
                {
                    "name": "\u5929\u624d",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(90,81,81)"
                    }
                },
                {
                    "name": "\u6b63\u7248",
                    "value": "5",
                    "textStyle": {
                        "color": "rgb(75,108,94)"
                    }
                },
                {
                    "name": "iPadvivo",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(130,157,43)"
                    }
                },
                {
                    "name": "\u5b9a\u4f4d",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(29,47,156)"
                    }
                },
                {
                    "name": "NFC",
                    "value": "3",
                    "textStyle": {
                        "color": "rgb(23,123,96)"
                    }
                },
                {
                    "name": "\u8eab\u4efd",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(107,117,126)"
                    }
                },
                {
                    "name": "\u9009\u914d",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(150,83,134)"
                    }
                },
                {
                    "name": "\u6a21\u5757",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(18,93,84)"
                    }
                },
                {
                    "name": "P6105G",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(20,154,63)"
                    }
                },
                {
                    "name": "5pro5G",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(127,109,45)"
                    }
                },
                {
                    "name": "\u9886\u5927\u5238",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(6,154,72)"
                    }
                },
                {
                    "name": "X200X205",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(77,0,157)"
                    }
                },
                {
                    "name": "2022mini6",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(155,45,55)"
                    }
                },
                {
                    "name": "4GApple",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(59,30,52)"
                    }
                },
                {
                    "name": "4Gipad6",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(131,156,136)"
                    }
                },
                {
                    "name": "10.3",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(83,6,137)"
                    }
                },
                {
                    "name": "\u7535\u5b50",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(28,21,119)"
                    }
                },
                {
                    "name": "\u9a81\u9f99\u5168",
                    "value": "8",
                    "textStyle": {
                        "color": "rgb(70,66,130)"
                    }
                },
                {
                    "name": "10.36",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(125,23,89)"
                    }
                },
                {
                    "name": "\u7248\u5168",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(127,23,106)"
                    }
                },
                {
                    "name": "Matepadpro12.6",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(120,156,147)"
                    }
                },
                {
                    "name": "X2",
                    "value": "5",
                    "textStyle": {
                        "color": "rgb(123,87,109)"
                    }
                },
                {
                    "name": "win7",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(148,27,81)"
                    }
                },
                {
                    "name": "Mini5",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(3,68,158)"
                    }
                },
                {
                    "name": "X14pro",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(20,106,26)"
                    }
                },
                {
                    "name": "\u65e0\u7ebf\u7f51",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(124,119,116)"
                    }
                },
                {
                    "name": "padMicrosoft",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(131,17,111)"
                    }
                },
                {
                    "name": "4win10",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(7,102,58)"
                    }
                },
                {
                    "name": "\u7535\u4fe1",
                    "value": "3",
                    "textStyle": {
                        "color": "rgb(84,16,98)"
                    }
                },
                {
                    "name": "4321",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(111,32,30)"
                    }
                },
                {
                    "name": "16G32G64",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(147,139,133)"
                    }
                },
                {
                    "name": "ipadmini",
                    "value": "3",
                    "textStyle": {
                        "color": "rgb(138,106,100)"
                    }
                },
                {
                    "name": "ProM2",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(62,132,117)"
                    }
                },
                {
                    "name": "\u7a00\u7f3a",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(11,123,134)"
                    }
                },
                {
                    "name": "PadMIUI",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(14,24,110)"
                    }
                },
                {
                    "name": "\u65b0\u65d7\u8230",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(22,50,10)"
                    }
                },
                {
                    "name": "870DELL",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(5,43,41)"
                    }
                },
                {
                    "name": "7350",
                    "value": "3",
                    "textStyle": {
                        "color": "rgb(160,127,46)"
                    }
                },
                {
                    "name": "win10PC",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(69,31,77)"
                    }
                },
                {
                    "name": "iPadPro2021",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(82,83,80)"
                    }
                },
                {
                    "name": "\u5c0f\u6e38\u620f",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(117,136,145)"
                    }
                },
                {
                    "name": "GO2",
                    "value": "4",
                    "textStyle": {
                        "color": "rgb(152,76,66)"
                    }
                },
                {
                    "name": "P30S",
                    "value": "3",
                    "textStyle": {
                        "color": "rgb(159,148,98)"
                    }
                },
                {
                    "name": "\u9ad8\u6027\u80fd",
                    "value": "3",
                    "textStyle": {
                        "color": "rgb(39,157,31)"
                    }
                },
                {
                    "name": "256GApple",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(85,34,74)"
                    }
                },
                {
                    "name": "V11pro",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(35,148,156)"
                    }
                },
                {
                    "name": "PadPro",
                    "value": "3",
                    "textStyle": {
                        "color": "rgb(99,65,40)"
                    }
                },
                {
                    "name": "\u8fc5\u9cb2",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(93,55,96)"
                    }
                },
                {
                    "name": "90",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(13,139,134)"
                    }
                },
                {
                    "name": "Book",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(87,148,118)"
                    }
                },
                {
                    "name": "15",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(19,3,96)"
                    }
                },
                {
                    "name": "\u9650\u5b9a\u7248",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(65,125,134)"
                    }
                },
                {
                    "name": "\u9650\u91cf\u7248",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(108,18,96)"
                    }
                },
                {
                    "name": "T50",
                    "value": "3",
                    "textStyle": {
                        "color": "rgb(23,73,34)"
                    }
                },
                {
                    "name": "\u8d34\u5408",
                    "value": "5",
                    "textStyle": {
                        "color": "rgb(115,89,104)"
                    }
                },
                {
                    "name": "11Samsung",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(127,92,92)"
                    }
                },
                {
                    "name": "CHUWI",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(7,74,50)"
                    }
                },
                {
                    "name": "\u9a70\u4e3a",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(1,149,128)"
                    }
                },
                {
                    "name": "\u4e3b\u673a",
                    "value": "9",
                    "textStyle": {
                        "color": "rgb(145,98,75)"
                    }
                },
                {
                    "name": "\u884c\u4e1a",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(149,7,62)"
                    }
                },
                {
                    "name": "ODM",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(97,9,92)"
                    }
                },
                {
                    "name": "OEMMicrosoft",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(43,11,2)"
                    }
                },
                {
                    "name": "9i5",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(153,8,136)"
                    }
                },
                {
                    "name": "\u4e09\u91cd",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(153,148,46)"
                    }
                },
                {
                    "name": "ipad2019",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(107,131,66)"
                    }
                },
                {
                    "name": "ipad2018Xiaomi",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(81,28,83)"
                    }
                },
                {
                    "name": "870pad",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(135,18,23)"
                    }
                },
                {
                    "name": "T40",
                    "value": "10",
                    "textStyle": {
                        "color": "rgb(52,35,72)"
                    }
                },
                {
                    "name": "\u5168\u8d34",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(44,148,120)"
                    }
                },
                {
                    "name": "\u9640\u87ba\u4eea",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(131,66,68)"
                    }
                },
                {
                    "name": "Air2022",
                    "value": "3",
                    "textStyle": {
                        "color": "rgb(67,29,132)"
                    }
                },
                {
                    "name": "miniLenovo",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(147,148,57)"
                    }
                },
                {
                    "name": "tb",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(54,123,152)"
                    }
                },
                {
                    "name": "8705f",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(134,83,155)"
                    }
                },
                {
                    "name": "\u8d85\u8f7b\u8584",
                    "value": "3",
                    "textStyle": {
                        "color": "rgb(144,21,149)"
                    }
                },
                {
                    "name": "H8F",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(18,123,149)"
                    }
                },
                {
                    "name": "\u5de5\u63a7",
                    "value": "11",
                    "textStyle": {
                        "color": "rgb(87,160,45)"
                    }
                },
                {
                    "name": "\u76d2\u5f0f",
                    "value": "7",
                    "textStyle": {
                        "color": "rgb(55,25,139)"
                    }
                },
                {
                    "name": "\u5bbd\u6e29",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(102,76,67)"
                    }
                },
                {
                    "name": "C3",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(38,149,123)"
                    }
                },
                {
                    "name": "7T",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(76,70,95)"
                    }
                },
                {
                    "name": "6.98",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(70,143,4)"
                    }
                },
                {
                    "name": "KOB",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(15,14,56)"
                    }
                },
                {
                    "name": "\u6253\u7535\u8bdd",
                    "value": "11",
                    "textStyle": {
                        "color": "rgb(155,100,58)"
                    }
                },
                {
                    "name": "\u5c0f\u8bf4",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(32,95,113)"
                    }
                },
                {
                    "name": "P25T",
                    "value": "4",
                    "textStyle": {
                        "color": "rgb(85,126,126)"
                    }
                },
                {
                    "name": "64G",
                    "value": "5",
                    "textStyle": {
                        "color": "rgb(1,79,87)"
                    }
                },
                {
                    "name": "\u7535\u8111\u53f0",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(10,39,44)"
                    }
                },
                {
                    "name": "\u97e9\u4f17",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(7,4,12)"
                    }
                },
                {
                    "name": "T106",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(103,82,50)"
                    }
                },
                {
                    "name": "\u8bfe\u9001",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(129,59,100)"
                    }
                },
                {
                    "name": "\u4fdd\u969c",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(56,136,8)"
                    }
                },
                {
                    "name": "\u8bfe\u672c",
                    "value": "4",
                    "textStyle": {
                        "color": "rgb(143,34,56)"
                    }
                },
                {
                    "name": "\u9ad8\u964d",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(141,9,138)"
                    }
                },
                {
                    "name": "TB128FU2022",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(145,105,130)"
                    }
                },
                {
                    "name": "\u9999\u828b",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(80,120,124)"
                    }
                },
                {
                    "name": "MatePad2023",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(67,74,49)"
                    }
                },
                {
                    "name": "\u5c4f\u5feb",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(144,71,56)"
                    }
                },
                {
                    "name": "\u75be\u901f",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(26,149,146)"
                    }
                },
                {
                    "name": "490",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(42,2,68)"
                    }
                },
                {
                    "name": "M10s",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(9,5,1)"
                    }
                },
                {
                    "name": "HI10",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(40,100,125)"
                    }
                },
                {
                    "name": "\u89e6\u6478",
                    "value": "7",
                    "textStyle": {
                        "color": "rgb(10,122,127)"
                    }
                },
                {
                    "name": "mini624",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(8,60,105)"
                    }
                },
                {
                    "name": "A1364G",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(128,71,22)"
                    }
                },
                {
                    "name": "\u5b89\u5353\u5fae\u4fe1",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(128,114,141)"
                    }
                },
                {
                    "name": "XDR",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(9,47,92)"
                    }
                },
                {
                    "name": "1166",
                    "value": "4",
                    "textStyle": {
                        "color": "rgb(79,127,127)"
                    }
                },
                {
                    "name": "TECLAST",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(3,145,56)"
                    }
                },
                {
                    "name": "Thinkpad10",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(140,86,93)"
                    }
                },
                {
                    "name": "NEC",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(27,16,9)"
                    }
                },
                {
                    "name": "GEM",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(45,35,102)"
                    }
                },
                {
                    "name": "703L",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(118,64,5)"
                    }
                },
                {
                    "name": "\u53cc\u5f85",
                    "value": "3",
                    "textStyle": {
                        "color": "rgb(90,25,62)"
                    }
                },
                {
                    "name": "\u5929\u6d25",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(20,62,9)"
                    }
                },
                {
                    "name": "855",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(35,67,91)"
                    }
                },
                {
                    "name": "\u5341\u6838",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(159,89,75)"
                    }
                },
                {
                    "name": "\u5206\u671f\u4ed8\u6b3e",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(5,49,95)"
                    }
                },
                {
                    "name": "2020Air4",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(73,160,17)"
                    }
                },
                {
                    "name": "3mini52022",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(21,51,150)"
                    }
                },
                {
                    "name": "M1Huawei",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(95,157,90)"
                    }
                },
                {
                    "name": "OPPOPad",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(133,24,103)"
                    }
                },
                {
                    "name": "air3Huawei",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(79,81,159)"
                    }
                },
                {
                    "name": "\u6838\u82af",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(61,56,71)"
                    }
                },
                {
                    "name": "1920",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(49,97,160)"
                    }
                },
                {
                    "name": "\u4e00\u5e74\u7ea7",
                    "value": "4",
                    "textStyle": {
                        "color": "rgb(60,107,17)"
                    }
                },
                {
                    "name": "\u5237\u65b0",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(139,86,38)"
                    }
                },
                {
                    "name": "\u7535\u611f",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(20,20,1)"
                    }
                },
                {
                    "name": "\u73bb\u7483",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(131,72,15)"
                    }
                },
                {
                    "name": "\u90d1\u5dde",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(131,12,140)"
                    }
                },
                {
                    "name": "\u9001\u8d27",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(132,33,67)"
                    }
                },
                {
                    "name": "\u6253\u6e38\u620f",
                    "value": "4",
                    "textStyle": {
                        "color": "rgb(25,122,2)"
                    }
                },
                {
                    "name": "\u5927\u5c4f\u5e55",
                    "value": "4",
                    "textStyle": {
                        "color": "rgb(143,110,157)"
                    }
                },
                {
                    "name": "lte",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(4,129,62)"
                    }
                },
                {
                    "name": "\u540c\u4ef7",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(26,124,50)"
                    }
                },
                {
                    "name": "\u9633\u534e",
                    "value": "3",
                    "textStyle": {
                        "color": "rgb(109,141,112)"
                    }
                },
                {
                    "name": "76Q10",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(61,80,85)"
                    }
                },
                {
                    "name": "8.1",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(157,112,31)"
                    }
                },
                {
                    "name": "\u5907\u7528\u673a",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(52,140,20)"
                    }
                },
                {
                    "name": "air1Apple",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(66,135,98)"
                    }
                },
                {
                    "name": "mini1234",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(26,79,95)"
                    }
                },
                {
                    "name": "\u8033\u673a\u7ebf",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(28,105,1)"
                    }
                },
                {
                    "name": "\u82cf\u83f2",
                    "value": "5",
                    "textStyle": {
                        "color": "rgb(14,82,43)"
                    }
                },
                {
                    "name": "Reaimx5G",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(29,88,20)"
                    }
                },
                {
                    "name": "SVT112",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(120,116,81)"
                    }
                },
                {
                    "name": "\u7248\u5b89\u5353",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(110,154,58)"
                    }
                },
                {
                    "name": "SAMOLED",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(128,29,132)"
                    }
                },
                {
                    "name": "\u4e09\u9632\u5b89\u5353",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(119,13,12)"
                    }
                },
                {
                    "name": "2D",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(125,0,127)"
                    }
                },
                {
                    "name": "\u8bfa\u57fa\u4e9a",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(137,14,55)"
                    }
                },
                {
                    "name": "Nokia",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(46,111,133)"
                    }
                },
                {
                    "name": "T20",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(0,38,124)"
                    }
                },
                {
                    "name": "J706F",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(150,44,23)"
                    }
                },
                {
                    "name": "\u7ad9\u7acb",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(56,140,32)"
                    }
                },
                {
                    "name": "PRO",
                    "value": "4",
                    "textStyle": {
                        "color": "rgb(115,93,52)"
                    }
                },
                {
                    "name": "\u672a\u6765",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(125,150,144)"
                    }
                },
                {
                    "name": "Book2",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(136,49,155)"
                    }
                },
                {
                    "name": "W700",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(96,120,13)"
                    }
                },
                {
                    "name": "W727HUAWEI",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(89,153,146)"
                    }
                },
                {
                    "name": "\u94f6\u8272",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(49,95,40)"
                    }
                },
                {
                    "name": "\u770b\u5267",
                    "value": "6",
                    "textStyle": {
                        "color": "rgb(119,138,57)"
                    }
                },
                {
                    "name": "matepad11Apple",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(55,34,45)"
                    }
                },
                {
                    "name": "\u5b9e\u4f53",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(62,22,24)"
                    }
                },
                {
                    "name": "Plus4G",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(58,14,95)"
                    }
                },
                {
                    "name": "\u65b0\u60a6\u52a8",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(11,27,15)"
                    }
                },
                {
                    "name": "\u7070\u8272",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(159,150,54)"
                    }
                },
                {
                    "name": "\u60ca\u559c",
                    "value": "6",
                    "textStyle": {
                        "color": "rgb(112,29,77)"
                    }
                },
                {
                    "name": "2038Huawei",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(0,74,5)"
                    }
                },
                {
                    "name": "AGS3K",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(21,128,61)"
                    }
                },
                {
                    "name": "W20",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(35,39,12)"
                    }
                },
                {
                    "name": "X6",
                    "value": "4",
                    "textStyle": {
                        "color": "rgb(40,110,122)"
                    }
                },
                {
                    "name": "Z3",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(74,139,32)"
                    }
                },
                {
                    "name": "\u8f7b\u5de7",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(114,125,82)"
                    }
                },
                {
                    "name": "padpro11.5",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(145,129,110)"
                    }
                },
                {
                    "name": "Surface3",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(143,129,115)"
                    }
                },
                {
                    "name": "mini3",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(17,9,22)"
                    }
                },
                {
                    "name": "5GM1aApple",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(19,46,107)"
                    }
                },
                {
                    "name": "mini2honor",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(23,132,103)"
                    }
                },
                {
                    "name": "T6",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(120,40,15)"
                    }
                },
                {
                    "name": "padAsus",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(56,55,3)"
                    }
                },
                {
                    "name": "\u534e\u7855",
                    "value": "9",
                    "textStyle": {
                        "color": "rgb(108,126,6)"
                    }
                },
                {
                    "name": "iWork20",
                    "value": "3",
                    "textStyle": {
                        "color": "rgb(15,90,104)"
                    }
                },
                {
                    "name": "\u540c\u6b65",
                    "value": "5",
                    "textStyle": {
                        "color": "rgb(13,12,37)"
                    }
                },
                {
                    "name": "M15GAsus",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(9,102,128)"
                    }
                },
                {
                    "name": "Z380C",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(59,128,106)"
                    }
                },
                {
                    "name": "\u98de\u9a6c",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(88,40,22)"
                    }
                },
                {
                    "name": "2G",
                    "value": "9",
                    "textStyle": {
                        "color": "rgb(98,103,64)"
                    }
                },
                {
                    "name": "5.1",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(138,101,142)"
                    }
                },
                {
                    "name": "\u58f0\u9053",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(104,113,16)"
                    }
                },
                {
                    "name": "\u53ef\u5fae\u4fe1",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(151,27,47)"
                    }
                },
                {
                    "name": "\u770b\u7535\u89c6",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(112,54,141)"
                    }
                },
                {
                    "name": "Windows8",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(153,3,54)"
                    }
                },
                {
                    "name": "iPad4",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(115,25,147)"
                    }
                },
                {
                    "name": "\u56db\u4ee3",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(63,6,60)"
                    }
                },
                {
                    "name": "16G32G64GHuawei",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(30,52,50)"
                    }
                },
                {
                    "name": "A01W",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(125,154,25)"
                    }
                },
                {
                    "name": "\u69ae\u8000",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(87,38,120)"
                    }
                },
                {
                    "name": "smile",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(142,86,153)"
                    }
                },
                {
                    "name": "\u6e38\u620f\u5f71\u97f3",
                    "value": "5",
                    "textStyle": {
                        "color": "rgb(23,31,6)"
                    }
                },
                {
                    "name": "plusDell",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(1,42,20)"
                    }
                },
                {
                    "name": "Venue11Pro7130windows10",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(134,15,60)"
                    }
                },
                {
                    "name": "Amazon",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(133,103,154)"
                    }
                },
                {
                    "name": "\u4e9a\u9a6c\u900a",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(58,2,26)"
                    }
                },
                {
                    "name": "Fire",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(43,104,41)"
                    }
                },
                {
                    "name": "HD10",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(24,22,48)"
                    }
                },
                {
                    "name": "\u65f6\u5c1a\u7f51",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(137,42,7)"
                    }
                },
                {
                    "name": "\u5bf8\u5927\u5c4f",
                    "value": "4",
                    "textStyle": {
                        "color": "rgb(16,68,112)"
                    }
                },
                {
                    "name": "iPad2018",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(52,16,97)"
                    }
                },
                {
                    "name": "256GB13",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(62,143,42)"
                    }
                },
                {
                    "name": "\u822a\u7a7a",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(104,160,105)"
                    }
                },
                {
                    "name": "\u8d85\u611f",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(140,60,6)"
                    }
                },
                {
                    "name": "44w",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(36,83,18)"
                    }
                },
                {
                    "name": "\u95ea\u5145",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(8,158,35)"
                    }
                },
                {
                    "name": "7139",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(151,121,71)"
                    }
                },
                {
                    "name": "PSMicrosoft",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(25,41,159)"
                    }
                },
                {
                    "name": "1166Apple",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(38,78,129)"
                    }
                },
                {
                    "name": "\u4ee3\u4e50\u4eab",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(150,45,148)"
                    }
                },
                {
                    "name": "mini8",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(24,119,133)"
                    }
                },
                {
                    "name": "\u5c0f\u578b",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(127,147,25)"
                    }
                },
                {
                    "name": "air3mini4",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(106,67,16)"
                    }
                },
                {
                    "name": "S7fe",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(100,130,4)"
                    }
                },
                {
                    "name": "\u4e66\u5199",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(111,21,132)"
                    }
                },
                {
                    "name": "\u5355\u7acb",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(57,143,9)"
                    }
                },
                {
                    "name": "\u9001\u58f3",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(65,88,45)"
                    }
                },
                {
                    "name": "\u7eed\u822a",
                    "value": "3",
                    "textStyle": {
                        "color": "rgb(119,52,118)"
                    }
                },
                {
                    "name": "\u8584\u8377",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(125,154,19)"
                    }
                },
                {
                    "name": "MateiPad",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(23,74,40)"
                    }
                },
                {
                    "name": "Gen1",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(110,120,16)"
                    }
                },
                {
                    "name": "P40HD",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(43,21,54)"
                    }
                },
                {
                    "name": "C5e",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(125,102,136)"
                    }
                },
                {
                    "name": "BZI",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(13,77,24)"
                    }
                },
                {
                    "name": "AL00Samsung",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(120,130,31)"
                    }
                },
                {
                    "name": "T225CApple",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(116,128,45)"
                    }
                },
                {
                    "name": "2019Apple",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(81,45,50)"
                    }
                },
                {
                    "name": "iPadMicrosoft",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(106,73,33)"
                    }
                },
                {
                    "name": "i5i7",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(118,21,53)"
                    }
                },
                {
                    "name": "\u4ef7\u7f51",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(103,25,63)"
                    }
                },
                {
                    "name": "V14pro",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(120,42,160)"
                    }
                },
                {
                    "name": "matepad10.1",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(32,105,87)"
                    }
                },
                {
                    "name": "\u83f2\u5c3c\u514b\u65af",
                    "value": "5",
                    "textStyle": {
                        "color": "rgb(99,117,27)"
                    }
                },
                {
                    "name": "USB",
                    "value": "7",
                    "textStyle": {
                        "color": "rgb(86,64,126)"
                    }
                },
                {
                    "name": "\u76d2\u5b50",
                    "value": "5",
                    "textStyle": {
                        "color": "rgb(131,78,83)"
                    }
                },
                {
                    "name": "M10S",
                    "value": "5",
                    "textStyle": {
                        "color": "rgb(85,15,51)"
                    }
                },
                {
                    "name": "\u624b\u63d0\u7535\u8111",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(129,26,82)"
                    }
                },
                {
                    "name": "TB350FU",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(136,124,67)"
                    }
                },
                {
                    "name": "Plus2023",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(156,41,160)"
                    }
                },
                {
                    "name": "2022Huawei",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(108,157,46)"
                    }
                },
                {
                    "name": "SE2022",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(13,158,37)"
                    }
                },
                {
                    "name": "WINDOWS10",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(92,42,148)"
                    }
                },
                {
                    "name": "\u8fd0\u884c",
                    "value": "5",
                    "textStyle": {
                        "color": "rgb(61,155,75)"
                    }
                },
                {
                    "name": "Pro2016",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(132,89,105)"
                    }
                },
                {
                    "name": "Smile",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(46,58,102)"
                    }
                },
                {
                    "name": "padXiaomi",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(100,102,52)"
                    }
                },
                {
                    "name": "134",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(143,2,75)"
                    }
                },
                {
                    "name": "\u4fbf\u5b9c",
                    "value": "3",
                    "textStyle": {
                        "color": "rgb(38,90,29)"
                    }
                },
                {
                    "name": "\u6559\u6750",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(155,12,28)"
                    }
                },
                {
                    "name": "\u5c0f\u5b66",
                    "value": "3",
                    "textStyle": {
                        "color": "rgb(102,67,91)"
                    }
                },
                {
                    "name": "\u521d\u9ad8\u4e2d",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(105,141,40)"
                    }
                },
                {
                    "name": "\u70b9\u8bfb\u673a",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(41,98,79)"
                    }
                },
                {
                    "name": "5DELL",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(96,155,6)"
                    }
                },
                {
                    "name": "20212",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(72,55,9)"
                    }
                },
                {
                    "name": "SurfacePRO5",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(18,11,109)"
                    }
                },
                {
                    "name": "\u4e0a\u6d77",
                    "value": "3",
                    "textStyle": {
                        "color": "rgb(78,113,27)"
                    }
                },
                {
                    "name": "\u6025\u9001",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(84,67,61)"
                    }
                },
                {
                    "name": "10Apple",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(153,128,105)"
                    }
                },
                {
                    "name": "Pro12.6",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(135,52,72)"
                    }
                },
                {
                    "name": "\u674e\u73b0",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(132,65,141)"
                    }
                },
                {
                    "name": "T500Apple",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(113,116,82)"
                    }
                },
                {
                    "name": "mini56ipadair234",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(150,6,70)"
                    }
                },
                {
                    "name": "\u4e3b\u64ad",
                    "value": "3",
                    "textStyle": {
                        "color": "rgb(5,27,154)"
                    }
                },
                {
                    "name": "\u5355\u5373",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(133,24,87)"
                    }
                },
                {
                    "name": "\u8d60\u8c6a\u793c",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(20,154,145)"
                    }
                },
                {
                    "name": "365",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(64,136,13)"
                    }
                },
                {
                    "name": "DUO",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(83,82,95)"
                    }
                },
                {
                    "name": "\u53cc\u5c4f",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(64,148,20)"
                    }
                },
                {
                    "name": "2020air3mini5",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(136,107,40)"
                    }
                },
                {
                    "name": "\u7248\u6b3e",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(97,81,54)"
                    }
                },
                {
                    "name": "5G12G",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(74,105,89)"
                    }
                },
                {
                    "name": "8Samsung",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(17,104,94)"
                    }
                },
                {
                    "name": "S7Apple",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(149,112,43)"
                    }
                },
                {
                    "name": "\u5ae9\u7eff\u8272",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(108,88,13)"
                    }
                },
                {
                    "name": "M2Samsung",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(155,130,96)"
                    }
                },
                {
                    "name": "GalaxyTabS7",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(39,124,85)"
                    }
                },
                {
                    "name": "S8oppo",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(13,108,27)"
                    }
                },
                {
                    "name": "win11Lenovo",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(75,98,12)"
                    }
                },
                {
                    "name": "X705F",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(98,146,54)"
                    }
                },
                {
                    "name": "P102022",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(92,42,120)"
                    }
                },
                {
                    "name": "7140",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(58,54,105)"
                    }
                },
                {
                    "name": "17mini5air2",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(9,157,113)"
                    }
                },
                {
                    "name": "ipadvivo",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(30,44,59)"
                    }
                },
                {
                    "name": "\u9752\u7d2b",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(65,44,8)"
                    }
                },
                {
                    "name": "FUJITSU",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(94,18,13)"
                    }
                },
                {
                    "name": "Q704",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(132,20,2)"
                    }
                },
                {
                    "name": "\u53ef\u88c5\u5b89\u5353",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(56,4,116)"
                    }
                },
                {
                    "name": "V7Pro11",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(31,55,54)"
                    }
                },
                {
                    "name": "WiFi128G",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(115,82,29)"
                    }
                },
                {
                    "name": "\u5206\u8fa8\u7387",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(20,29,142)"
                    }
                },
                {
                    "name": "iPlay40H",
                    "value": "4",
                    "textStyle": {
                        "color": "rgb(113,129,141)"
                    }
                },
                {
                    "name": "JDN2",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(156,157,57)"
                    }
                },
                {
                    "name": "\u5206\u5c4f",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(128,8,70)"
                    }
                },
                {
                    "name": "padTeclast",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(126,111,113)"
                    }
                },
                {
                    "name": "WiFiHuawei",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(1,121,116)"
                    }
                },
                {
                    "name": "matepadHuawei",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(5,128,150)"
                    }
                },
                {
                    "name": "M5M6",
                    "value": "3",
                    "textStyle": {
                        "color": "rgb(65,52,20)"
                    }
                },
                {
                    "name": "\u521d\u4e2d",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(37,133,95)"
                    }
                },
                {
                    "name": "32GHuawei",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(139,56,46)"
                    }
                },
                {
                    "name": "\u9ad8\u6027\u4ef7\u6bd4",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(145,52,84)"
                    }
                },
                {
                    "name": "pad7",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(28,28,53)"
                    }
                },
                {
                    "name": "9.0",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(88,41,79)"
                    }
                },
                {
                    "name": "SC9863",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(15,68,71)"
                    }
                },
                {
                    "name": "H9F",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(128,109,159)"
                    }
                },
                {
                    "name": "\u58c1\u6302\u5f0f",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(152,131,83)"
                    }
                },
                {
                    "name": "\u4f4e\u8017",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(113,137,14)"
                    }
                },
                {
                    "name": "\u7cbe\u51c6",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(84,72,102)"
                    }
                },
                {
                    "name": "3MS",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(93,44,154)"
                    }
                },
                {
                    "name": "\u54cd\u5e94",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(159,118,8)"
                    }
                },
                {
                    "name": "\u591a\u6837\u5316",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(74,63,77)"
                    }
                },
                {
                    "name": "\u8054\u7f51",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(154,149,54)"
                    }
                },
                {
                    "name": "5pro10.8",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(7,51,42)"
                    }
                },
                {
                    "name": "X20",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(131,5,156)"
                    }
                },
                {
                    "name": "S8U",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(29,71,129)"
                    }
                },
                {
                    "name": "padplus",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(144,85,110)"
                    }
                },
                {
                    "name": "128GHuawei",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(54,24,101)"
                    }
                },
                {
                    "name": "\u6e05\u534e\u540c\u65b9",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(155,55,13)"
                    }
                },
                {
                    "name": "MINI6Huawei",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(156,16,35)"
                    }
                },
                {
                    "name": "iWork",
                    "value": "3",
                    "textStyle": {
                        "color": "rgb(6,21,118)"
                    }
                },
                {
                    "name": "GT",
                    "value": "3",
                    "textStyle": {
                        "color": "rgb(133,127,53)"
                    }
                },
                {
                    "name": "\u5bf8\u9177",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(79,28,148)"
                    }
                },
                {
                    "name": "\u5168\u9ad8\u6e05",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(156,9,39)"
                    }
                },
                {
                    "name": "WIN11",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(14,33,4)"
                    }
                },
                {
                    "name": "\u6284\u80a1",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(147,105,84)"
                    }
                },
                {
                    "name": "\u53ef\u62c6\u5378",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(67,25,81)"
                    }
                },
                {
                    "name": "\u864e\u8d32",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(116,148,31)"
                    }
                },
                {
                    "name": "Q736",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(68,93,16)"
                    }
                },
                {
                    "name": "\u753b\u56fe",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(33,108,122)"
                    }
                },
                {
                    "name": "\u538b\u611f",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(26,142,117)"
                    }
                },
                {
                    "name": "\u7b14\u89e6",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(72,10,138)"
                    }
                },
                {
                    "name": "\u624b\u89e6",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(104,151,43)"
                    }
                },
                {
                    "name": "pda5",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(28,153,126)"
                    }
                },
                {
                    "name": "\u540c\u57ce",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(108,96,65)"
                    }
                },
                {
                    "name": "\u95ea\u9001",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(3,126,4)"
                    }
                },
                {
                    "name": "\u5b98\u4e60",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(136,131,84)"
                    }
                },
                {
                    "name": "\u8bfe\u65b9",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(126,68,109)"
                    }
                },
                {
                    "name": "wacom",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(159,70,72)"
                    }
                },
                {
                    "name": "\u6570\u4f4d",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(135,111,4)"
                    }
                },
                {
                    "name": "Fujitsu",
                    "value": "4",
                    "textStyle": {
                        "color": "rgb(35,160,111)"
                    }
                },
                {
                    "name": "Q506",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(43,61,70)"
                    }
                },
                {
                    "name": "V10pro",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(110,9,121)"
                    }
                },
                {
                    "name": "\u5de5\u5382",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(138,30,14)"
                    }
                },
                {
                    "name": "\u6b22\u8fce",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(76,118,160)"
                    }
                },
                {
                    "name": "\u56e2\u8d2d",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(146,113,11)"
                    }
                },
                {
                    "name": "P20",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(128,11,11)"
                    }
                },
                {
                    "name": "HD10.1",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(120,60,78)"
                    }
                },
                {
                    "name": "\u6674\u7a7a",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(95,46,134)"
                    }
                },
                {
                    "name": "MatePadPaper",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(147,59,136)"
                    }
                },
                {
                    "name": "\u9a81\u9f99\u5b66",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(132,53,4)"
                    }
                },
                {
                    "name": "p80x",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(46,92,138)"
                    }
                },
                {
                    "name": "AI",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(130,101,134)"
                    }
                },
                {
                    "name": "HENA",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(145,70,121)"
                    }
                },
                {
                    "name": "PDF",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(144,136,40)"
                    }
                },
                {
                    "name": "\u8d85\u9ad8\u9891",
                    "value": "4",
                    "textStyle": {
                        "color": "rgb(109,106,41)"
                    }
                },
                {
                    "name": "\u626b\u7801",
                    "value": "3",
                    "textStyle": {
                        "color": "rgb(127,81,59)"
                    }
                },
                {
                    "name": "MES",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(148,155,131)"
                    }
                },
                {
                    "name": "\u6625\u8282",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(127,125,120)"
                    }
                },
                {
                    "name": "Pro6pro5",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(40,141,50)"
                    }
                },
                {
                    "name": "BOOK",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(157,121,118)"
                    }
                },
                {
                    "name": "tabs7",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(59,2,151)"
                    }
                },
                {
                    "name": "S62022",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(160,92,45)"
                    }
                },
                {
                    "name": "\u4ee3\u672c",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(4,77,109)"
                    }
                },
                {
                    "name": "SSDApple",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(26,145,100)"
                    }
                },
                {
                    "name": "propipo",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(38,6,2)"
                    }
                },
                {
                    "name": "\u54c1\u94c2",
                    "value": "11",
                    "textStyle": {
                        "color": "rgb(123,100,3)"
                    }
                },
                {
                    "name": "N10",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(15,104,81)"
                    }
                },
                {
                    "name": "\u8bfe\u56db\u6838",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(113,9,127)"
                    }
                },
                {
                    "name": "\u91d1\u5c5e",
                    "value": "5",
                    "textStyle": {
                        "color": "rgb(23,113,143)"
                    }
                },
                {
                    "name": "\u6444\u50cf\u5934",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(132,24,99)"
                    }
                },
                {
                    "name": "\u9ad8\u5206\u8fa8\u7387",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(84,2,48)"
                    }
                },
                {
                    "name": "2022vivo",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(14,46,93)"
                    }
                },
                {
                    "name": "iqoo",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(144,141,54)"
                    }
                },
                {
                    "name": "mini5pro10.5",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(121,135,111)"
                    }
                },
                {
                    "name": "padproDELL",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(23,26,34)"
                    }
                },
                {
                    "name": "5056",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(91,68,124)"
                    }
                },
                {
                    "name": "WIN10",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(138,48,56)"
                    }
                },
                {
                    "name": "\u5bf8\u56fd\u884c",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(51,118,105)"
                    }
                },
                {
                    "name": "5Gvivo",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(151,103,128)"
                    }
                },
                {
                    "name": "padplus5G",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(94,115,134)"
                    }
                },
                {
                    "name": "1234",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(26,87,149)"
                    }
                },
                {
                    "name": "Verizon",
                    "value": "4",
                    "textStyle": {
                        "color": "rgb(89,100,149)"
                    }
                },
                {
                    "name": "\u5bf8\u516b\u6838",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(100,28,34)"
                    }
                },
                {
                    "name": "\u8f6f\u4ef6",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(113,154,48)"
                    }
                },
                {
                    "name": "\u8bfe\u7f51",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(71,78,158)"
                    }
                },
                {
                    "name": "\u8bfe\u673a",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(79,149,126)"
                    }
                },
                {
                    "name": "\u9ad8\u4e2d\u5b66\u751f",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(143,100,84)"
                    }
                },
                {
                    "name": "\u70b9\u8bfb",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(101,85,45)"
                    }
                },
                {
                    "name": "A1000",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(55,150,36)"
                    }
                },
                {
                    "name": "7130",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(160,91,135)"
                    }
                },
                {
                    "name": "ProLenovo",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(121,78,107)"
                    }
                },
                {
                    "name": "YOGA",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(28,96,20)"
                    }
                },
                {
                    "name": "1051F",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(127,85,67)"
                    }
                },
                {
                    "name": "win8",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(68,13,79)"
                    }
                },
                {
                    "name": "MTK6580",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(46,110,87)"
                    }
                },
                {
                    "name": "Asus",
                    "value": "4",
                    "textStyle": {
                        "color": "rgb(115,52,88)"
                    }
                },
                {
                    "name": "MeMO",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(11,53,36)"
                    }
                },
                {
                    "name": "8Gwifi7",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(65,18,15)"
                    }
                },
                {
                    "name": "1GDDR",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(104,25,12)"
                    }
                },
                {
                    "name": "M5M3M6",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(122,158,63)"
                    }
                },
                {
                    "name": "Air1Air2",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(103,15,33)"
                    }
                },
                {
                    "name": "Air9.7",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(10,38,20)"
                    }
                },
                {
                    "name": "3Apple",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(58,151,107)"
                    }
                },
                {
                    "name": "\u53d1\u5e03",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(147,97,38)"
                    }
                },
                {
                    "name": "\u6838\u5b89\u5353",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(62,101,56)"
                    }
                },
                {
                    "name": "\u753b\u5b98",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(116,95,78)"
                    }
                },
                {
                    "name": "FDR",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(1,154,150)"
                    }
                },
                {
                    "name": "A03L",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(72,31,104)"
                    }
                },
                {
                    "name": "\u63fd\u9605",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(3,16,93)"
                    }
                },
                {
                    "name": "\u53ef\u8fde",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(106,128,115)"
                    }
                },
                {
                    "name": "wifiApple",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(51,90,71)"
                    }
                },
                {
                    "name": "\u5973\u751f",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(15,116,81)"
                    }
                },
                {
                    "name": "Air21",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(69,93,81)"
                    }
                },
                {
                    "name": "mini6Apple",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(30,106,7)"
                    }
                },
                {
                    "name": "wifi16G",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(43,141,3)"
                    }
                },
                {
                    "name": "\u9ad8\u4eae",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(148,63,106)"
                    }
                },
                {
                    "name": "\u6307\u7eb9",
                    "value": "5",
                    "textStyle": {
                        "color": "rgb(111,87,50)"
                    }
                },
                {
                    "name": "\u4e00\u4ee3",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(141,89,43)"
                    }
                },
                {
                    "name": "\u8003\u8bd5",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(36,10,104)"
                    }
                },
                {
                    "name": "8705N",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(59,28,31)"
                    }
                },
                {
                    "name": "Spen",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(0,132,94)"
                    }
                },
                {
                    "name": "P610Huawei",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(78,13,6)"
                    }
                },
                {
                    "name": "C5",
                    "value": "4",
                    "textStyle": {
                        "color": "rgb(47,55,52)"
                    }
                },
                {
                    "name": "BZT3",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(121,60,29)"
                    }
                },
                {
                    "name": "W59",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(124,53,133)"
                    }
                },
                {
                    "name": "AL00",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(27,40,59)"
                    }
                },
                {
                    "name": "\u5e73\u677f\u673a",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(106,13,98)"
                    }
                },
                {
                    "name": "\u5b69\u5b50",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(4,99,89)"
                    }
                },
                {
                    "name": "5Samsung",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(144,70,129)"
                    }
                },
                {
                    "name": "Pipo",
                    "value": "5",
                    "textStyle": {
                        "color": "rgb(56,66,134)"
                    }
                },
                {
                    "name": "X4",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(134,83,94)"
                    }
                },
                {
                    "name": "\u9632\u5c18",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(88,54,7)"
                    }
                },
                {
                    "name": "T510",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(20,54,94)"
                    }
                },
                {
                    "name": "T515",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(151,32,149)"
                    }
                },
                {
                    "name": "iPadPro1",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(114,21,147)"
                    }
                },
                {
                    "name": "10.42022",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(135,133,99)"
                    }
                },
                {
                    "name": "pipo",
                    "value": "4",
                    "textStyle": {
                        "color": "rgb(11,48,45)"
                    }
                },
                {
                    "name": "X8Swin10",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(63,55,150)"
                    }
                },
                {
                    "name": "\u4e4c\u73ed\u56fe",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(56,54,85)"
                    }
                },
                {
                    "name": "\u6fc0\u5149",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(57,23,90)"
                    }
                },
                {
                    "name": "\u5207\u819c\u673a",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(89,128,147)"
                    }
                },
                {
                    "name": "\u653f\u52a1",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(70,136,76)"
                    }
                },
                {
                    "name": "\u53f7\u5668",
                    "value": "3",
                    "textStyle": {
                        "color": "rgb(6,115,108)"
                    }
                },
                {
                    "name": "\u8bc4\u4ef7",
                    "value": "4",
                    "textStyle": {
                        "color": "rgb(27,79,108)"
                    }
                },
                {
                    "name": "\u5de5\u63a7\u673a",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(20,77,136)"
                    }
                },
                {
                    "name": "\u76f4\u8425",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(140,118,86)"
                    }
                },
                {
                    "name": "\u80cc\u5305",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(156,56,60)"
                    }
                },
                {
                    "name": "P20S",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(34,134,111)"
                    }
                },
                {
                    "name": "PADpipo",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(68,6,112)"
                    }
                },
                {
                    "name": "\u58c1\u6302",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(42,70,141)"
                    }
                },
                {
                    "name": "\u591a\u5de5",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(30,93,150)"
                    }
                },
                {
                    "name": "\u529f\u80fd",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(104,73,66)"
                    }
                },
                {
                    "name": "\u4e00\u4f53",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(17,8,65)"
                    }
                },
                {
                    "name": "\u6253\u5370",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(19,58,116)"
                    }
                },
                {
                    "name": "Q702",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(65,86,69)"
                    }
                },
                {
                    "name": "I5",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(17,108,6)"
                    }
                },
                {
                    "name": "\u96f7\u7535",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(125,103,69)"
                    }
                },
                {
                    "name": "\u9ad8\u5237\u89e6",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(118,111,32)"
                    }
                },
                {
                    "name": "\u63a7\u5c4f",
                    "value": "5",
                    "textStyle": {
                        "color": "rgb(7,103,51)"
                    }
                },
                {
                    "name": "PLUS8",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(152,112,146)"
                    }
                },
                {
                    "name": "\u8bfe\u516b\u6838",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(53,69,86)"
                    }
                },
                {
                    "name": "IpadLenovo",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(157,103,53)"
                    }
                },
                {
                    "name": "\u9ad8\u5206",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(37,5,114)"
                    }
                },
                {
                    "name": "5gSamsung",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(113,2,130)"
                    }
                },
                {
                    "name": "\u7248\u7f51",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(29,23,144)"
                    }
                },
                {
                    "name": "\u8d85\u503c",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(124,108,110)"
                    }
                },
                {
                    "name": "\u5b9a\u671f",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(8,73,39)"
                    }
                },
                {
                    "name": "\u9ea6\u514b",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(150,34,133)"
                    }
                },
                {
                    "name": "\u81ea\u7528",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(129,99,150)"
                    }
                },
                {
                    "name": "\u5408\u9002",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(160,20,91)"
                    }
                },
                {
                    "name": "9000E",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(22,16,31)"
                    }
                },
                {
                    "name": "\u8d85\u957f",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(157,108,46)"
                    }
                },
                {
                    "name": "\u5ef6\u8fdf",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(1,143,40)"
                    }
                },
                {
                    "name": "\u9ad8\u753b\u8d28",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(154,11,147)"
                    }
                },
                {
                    "name": "5Pro22",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(110,108,118)"
                    }
                },
                {
                    "name": "mini5Microsoft",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(153,113,89)"
                    }
                },
                {
                    "name": "M8TB",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(138,140,62)"
                    }
                },
                {
                    "name": "8505",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(27,115,29)"
                    }
                },
                {
                    "name": "8506X",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(111,93,122)"
                    }
                },
                {
                    "name": "8705X",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(23,101,160)"
                    }
                },
                {
                    "name": "128G2022",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(63,46,17)"
                    }
                },
                {
                    "name": "92021",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(18,14,10)"
                    }
                },
                {
                    "name": "wifi128G",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(93,78,19)"
                    }
                },
                {
                    "name": "\u6770\u5a01",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(9,123,5)"
                    }
                },
                {
                    "name": "\u675c\u6bd4",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(80,100,79)"
                    }
                },
                {
                    "name": "WIFILenovo",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(75,120,120)"
                    }
                },
                {
                    "name": "Miix720",
                    "value": "5",
                    "textStyle": {
                        "color": "rgb(124,27,21)"
                    }
                },
                {
                    "name": "\u79d2\u6740",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(71,105,108)"
                    }
                },
                {
                    "name": "\u5206\u738b",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(86,68,111)"
                    }
                },
                {
                    "name": "\u4e0d\u4f11",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(98,21,141)"
                    }
                },
                {
                    "name": "Pro10.4",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(98,150,149)"
                    }
                },
                {
                    "name": "128",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(152,69,11)"
                    }
                },
                {
                    "name": "18W",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(91,3,49)"
                    }
                },
                {
                    "name": "\u7acb\u4eab",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(98,57,117)"
                    }
                },
                {
                    "name": "120hz12",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(99,141,112)"
                    }
                },
                {
                    "name": "7nm",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(132,37,40)"
                    }
                },
                {
                    "name": "\u9ad8\u7aef",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(79,70,137)"
                    }
                },
                {
                    "name": "150",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(143,94,71)"
                    }
                },
                {
                    "name": "\u60a6\u52a8",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(28,22,146)"
                    }
                },
                {
                    "name": "padplus2021J607F",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(136,15,101)"
                    }
                },
                {
                    "name": "\u73a9\u6e38\u620f",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(133,23,133)"
                    }
                },
                {
                    "name": "GALAXYTab",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(147,55,128)"
                    }
                },
                {
                    "name": "\u5e97\u957f",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(72,46,43)"
                    }
                },
                {
                    "name": "T500",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(154,82,37)"
                    }
                },
                {
                    "name": "T505C",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(134,160,153)"
                    }
                },
                {
                    "name": "\u9ed1\u8272",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(113,101,41)"
                    }
                },
                {
                    "name": "PC10.1",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(116,53,129)"
                    }
                },
                {
                    "name": "\u4f01\u4e1a",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(100,57,9)"
                    }
                },
                {
                    "name": "6Microsoft",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(48,53,2)"
                    }
                },
                {
                    "name": "ipadFujitsu",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(128,133,19)"
                    }
                },
                {
                    "name": "Q7022022",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(143,109,65)"
                    }
                },
                {
                    "name": "7VPro",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(128,70,26)"
                    }
                },
                {
                    "name": "\u5b89\u5353\u6b63",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(29,13,79)"
                    }
                },
                {
                    "name": "\u7d2b\u5149",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(119,116,44)"
                    }
                },
                {
                    "name": "T616",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(146,111,1)"
                    }
                },
                {
                    "name": "2021ipad9",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(103,35,23)"
                    }
                },
                {
                    "name": "mini6Huawei",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(74,155,1)"
                    }
                },
                {
                    "name": "\u9e21\u5168",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(44,44,60)"
                    }
                },
                {
                    "name": "OPPOPadAir",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(4,91,11)"
                    }
                },
                {
                    "name": "oppoPAD",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(70,40,83)"
                    }
                },
                {
                    "name": "\u5343\u5143",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(133,111,141)"
                    }
                },
                {
                    "name": "oppoairpadHuawei",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(78,52,117)"
                    }
                },
                {
                    "name": "\u53ef\u88c5",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(158,94,53)"
                    }
                },
                {
                    "name": "\u7ba1\u63a7",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(159,50,44)"
                    }
                },
                {
                    "name": "Pro10.5",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(61,42,54)"
                    }
                },
                {
                    "name": "92022",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(32,127,45)"
                    }
                },
                {
                    "name": "miniTeclast",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(34,123,32)"
                    }
                },
                {
                    "name": "P89H",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(94,154,103)"
                    }
                },
                {
                    "name": "\u5fae\u7f29",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(96,42,104)"
                    }
                },
                {
                    "name": "Mini4",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(21,31,11)"
                    }
                },
                {
                    "name": "thinkpad10",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(52,155,112)"
                    }
                },
                {
                    "name": "PADLenovo",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(97,69,92)"
                    }
                },
                {
                    "name": "X703F",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(81,79,69)"
                    }
                },
                {
                    "name": "\u5bf8\u5b89\u5353\u5927\u5c4f",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(51,29,77)"
                    }
                },
                {
                    "name": "\u5c4f\u9ad8",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(117,9,36)"
                    }
                },
                {
                    "name": "\u6b3e\u70b9\u9910",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(120,108,160)"
                    }
                },
                {
                    "name": "5130",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(50,38,11)"
                    }
                },
                {
                    "name": "Air23",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(15,79,42)"
                    }
                },
                {
                    "name": "6789",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(106,131,117)"
                    }
                },
                {
                    "name": "\u6613\u65b9",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(105,33,8)"
                    }
                },
                {
                    "name": "\u4fdd\u62a4\u5957",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(127,56,154)"
                    }
                },
                {
                    "name": "X9S",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(25,69,2)"
                    }
                },
                {
                    "name": "\u5546\u4e1a",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(8,146,64)"
                    }
                },
                {
                    "name": "\u63a7\u5236",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(68,122,83)"
                    }
                },
                {
                    "name": "\u7ec8\u7aef",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(43,14,156)"
                    }
                },
                {
                    "name": "\u53f7\u673a",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(114,8,89)"
                    }
                },
                {
                    "name": "\u76d1\u63a7",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(78,71,120)"
                    }
                },
                {
                    "name": "ZenPad",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(113,49,25)"
                    }
                },
                {
                    "name": "3S",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(133,132,102)"
                    }
                },
                {
                    "name": "Z500M",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(4,5,155)"
                    }
                },
                {
                    "name": "\u7814\u7ef4",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(30,57,17)"
                    }
                },
                {
                    "name": "\u624b\u6301\u673a",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(112,86,149)"
                    }
                },
                {
                    "name": "pa",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(144,99,32)"
                    }
                },
                {
                    "name": "680",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(153,82,43)"
                    }
                },
                {
                    "name": "lite",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(94,129,147)"
                    }
                },
                {
                    "name": "8G16G",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(160,157,108)"
                    }
                },
                {
                    "name": "Pro8DELL",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(115,134,62)"
                    }
                },
                {
                    "name": "7275",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(125,97,95)"
                    }
                },
                {
                    "name": "windows10PC",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(94,54,93)"
                    }
                },
                {
                    "name": "X304F",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(115,7,46)"
                    }
                },
                {
                    "name": "X504F",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(26,54,141)"
                    }
                },
                {
                    "name": "\u5bf8\u56db\u6838",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(105,50,38)"
                    }
                },
                {
                    "name": "\u9ad8\u989c\u503c",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(129,84,138)"
                    }
                },
                {
                    "name": "52021",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(66,58,63)"
                    }
                },
                {
                    "name": "Air20",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(55,119,28)"
                    }
                },
                {
                    "name": "vivopad10.8",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(25,14,160)"
                    }
                },
                {
                    "name": "MatePadpro",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(122,18,57)"
                    }
                },
                {
                    "name": "\u6821\u56ed\u7f51",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(114,159,110)"
                    }
                },
                {
                    "name": "M89",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(68,118,82)"
                    }
                },
                {
                    "name": "padDELL",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(8,53,131)"
                    }
                },
                {
                    "name": "latitude7350",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(32,89,41)"
                    }
                },
                {
                    "name": "\u56fa\u6001",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(31,137,107)"
                    }
                },
                {
                    "name": "ASUS",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(143,35,57)"
                    }
                },
                {
                    "name": "T100TA",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(40,159,67)"
                    }
                },
                {
                    "name": "\u9001\u5957",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(134,145,100)"
                    }
                },
                {
                    "name": "ultraLenovo",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(10,45,11)"
                    }
                },
                {
                    "name": "plus2022128g",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(103,22,133)"
                    }
                },
                {
                    "name": "\u84dd\u8272",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(151,141,102)"
                    }
                },
                {
                    "name": "iPad102022",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(38,119,1)"
                    }
                },
                {
                    "name": "\u8bfb\u5361",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(111,107,133)"
                    }
                },
                {
                    "name": "\u624b\u6301\u5f0f",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(133,72,52)"
                    }
                },
                {
                    "name": "\u53c9\u8f66",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(145,129,150)"
                    }
                },
                {
                    "name": "570",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(29,91,19)"
                    }
                },
                {
                    "name": "\u9759\u8c27",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(3,36,144)"
                    }
                },
                {
                    "name": "X3",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(6,128,67)"
                    }
                },
                {
                    "name": "\u9884\u552e",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(93,6,18)"
                    }
                },
                {
                    "name": "\u73ab\u7470",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(63,73,22)"
                    }
                },
                {
                    "name": "1112",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(6,132,65)"
                    }
                },
                {
                    "name": "ipadTeclast",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(12,117,78)"
                    }
                },
                {
                    "name": "\u5237\u5267",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(0,12,84)"
                    }
                },
                {
                    "name": "\u6653\u9f99",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(50,113,12)"
                    }
                },
                {
                    "name": "128GApple",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(34,58,73)"
                    }
                },
                {
                    "name": "\u7f51\u8ff7",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(83,160,113)"
                    }
                },
                {
                    "name": "\u5b9e\u4f53\u5e97",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(21,120,138)"
                    }
                },
                {
                    "name": "MatePad2022",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(152,64,2)"
                    }
                },
                {
                    "name": "128g",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(130,7,18)"
                    }
                },
                {
                    "name": "LTE",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(50,110,65)"
                    }
                },
                {
                    "name": "\u98de\u5229\u6d66",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(156,135,137)"
                    }
                },
                {
                    "name": "M9",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(42,98,133)"
                    }
                },
                {
                    "name": "\u6301\u4e45",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(141,146,112)"
                    }
                },
                {
                    "name": "\u5bf8\u5b89\u5353\u516b\u6838",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(17,36,67)"
                    }
                },
                {
                    "name": "IP68",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(94,31,121)"
                    }
                },
                {
                    "name": "\u5c4f\u516b",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(151,55,98)"
                    }
                },
                {
                    "name": "\u968f\u884c",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(128,58,6)"
                    }
                },
                {
                    "name": "3mini4",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(73,81,113)"
                    }
                },
                {
                    "name": "Pro9.7",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(76,61,57)"
                    }
                },
                {
                    "name": "AGM",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(128,145,8)"
                    }
                },
                {
                    "name": "W09HN",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(150,126,51)"
                    }
                },
                {
                    "name": "T1CHi",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(149,44,70)"
                    }
                },
                {
                    "name": "LG",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(98,128,43)"
                    }
                },
                {
                    "name": "PAD5",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(60,82,62)"
                    }
                },
                {
                    "name": "821",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(18,100,97)"
                    }
                },
                {
                    "name": "2020Teclast",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(66,51,115)"
                    }
                },
                {
                    "name": "x8pro",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(21,3,159)"
                    }
                },
                {
                    "name": "CPU",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(46,82,3)"
                    }
                },
                {
                    "name": "\u63a5\u53e3",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(39,32,67)"
                    }
                },
                {
                    "name": "Panasonic",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(137,133,35)"
                    }
                },
                {
                    "name": "\u677e\u4e0b",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(114,67,64)"
                    }
                },
                {
                    "name": "FZ",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(73,119,74)"
                    }
                },
                {
                    "name": "G1",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(33,73,29)"
                    }
                },
                {
                    "name": "\u6c7d\u8f66",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(39,124,90)"
                    }
                },
                {
                    "name": "\u68c0\u4fee",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(121,69,157)"
                    }
                },
                {
                    "name": "\u4e8c\u7ef4",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(92,135,69)"
                    }
                },
                {
                    "name": "BOE",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(154,69,41)"
                    }
                },
                {
                    "name": "\u4e2d\u5c0f\u5b66\u751f",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(63,117,115)"
                    }
                },
                {
                    "name": "\u8bfe\u5802",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(145,152,0)"
                    }
                },
                {
                    "name": "\u4e00\u697c",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(160,106,108)"
                    }
                },
                {
                    "name": "\u571f\u6728",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(66,83,154)"
                    }
                },
                {
                    "name": "\u4e03\u516b\u4ee3",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(37,119,109)"
                    }
                },
                {
                    "name": "\u8bed\u97f3",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(44,15,24)"
                    }
                },
                {
                    "name": "5100",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(61,150,63)"
                    }
                },
                {
                    "name": "\u6beb\u5b89",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(17,143,44)"
                    }
                },
                {
                    "name": "T720",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(109,92,16)"
                    }
                },
                {
                    "name": "725C",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(77,142,138)"
                    }
                },
                {
                    "name": "S5e10",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(120,90,113)"
                    }
                },
                {
                    "name": "4gMIUI",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(99,90,77)"
                    }
                },
                {
                    "name": "5G12.4",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(4,100,51)"
                    }
                },
                {
                    "name": "S6Teclast",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(39,79,67)"
                    }
                },
                {
                    "name": "T10",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(116,123,16)"
                    }
                },
                {
                    "name": "2020air4",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(2,74,99)"
                    }
                },
                {
                    "name": "v6Apple",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(12,57,127)"
                    }
                },
                {
                    "name": "ipadpro2021",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(69,131,124)"
                    }
                },
                {
                    "name": "Q584",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(7,40,61)"
                    }
                },
                {
                    "name": "Wacom",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(57,41,70)"
                    }
                },
                {
                    "name": "\u5f00\u552e",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(90,157,94)"
                    }
                },
                {
                    "name": "m6",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(37,151,127)"
                    }
                },
                {
                    "name": "\u7545\u60f3",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(13,145,83)"
                    }
                },
                {
                    "name": "iPad7",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(23,0,14)"
                    }
                },
                {
                    "name": "BZH",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(134,18,33)"
                    }
                },
                {
                    "name": "W30",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(78,24,123)"
                    }
                },
                {
                    "name": "BZC",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(146,34,106)"
                    }
                },
                {
                    "name": "W002021",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(121,98,107)"
                    }
                },
                {
                    "name": "ipad9Fujitsu",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(158,105,3)"
                    }
                },
                {
                    "name": "V75GSamsung",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(86,127,92)"
                    }
                },
                {
                    "name": "T505",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(129,60,4)"
                    }
                },
                {
                    "name": "105G",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(123,153,4)"
                    }
                },
                {
                    "name": "air5Apple",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(101,55,125)"
                    }
                },
                {
                    "name": "s4",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(137,40,134)"
                    }
                },
                {
                    "name": "N110.1",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(112,140,133)"
                    }
                },
                {
                    "name": "IP54",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(11,22,17)"
                    }
                },
                {
                    "name": "\u81ea\u5e26",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(98,124,121)"
                    }
                },
                {
                    "name": "\u62a4\u7532\u5b89\u5353",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(136,22,34)"
                    }
                },
                {
                    "name": "10.0",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(56,41,33)"
                    }
                },
                {
                    "name": "Mini",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(150,91,54)"
                    }
                },
                {
                    "name": "T11",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(138,11,118)"
                    }
                },
                {
                    "name": "A0010",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(30,121,16)"
                    }
                },
                {
                    "name": "\u7b7e\u6279",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(139,107,0)"
                    }
                },
                {
                    "name": "2019Huawei",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(117,91,54)"
                    }
                },
                {
                    "name": "\u7248\u6d77\u601d\u516b\u6838",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(52,119,20)"
                    }
                },
                {
                    "name": "161",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(120,129,74)"
                    }
                },
                {
                    "name": "iPad10.2",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(65,151,145)"
                    }
                },
                {
                    "name": "ipad12.4",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(141,18,36)"
                    }
                },
                {
                    "name": "MatePadPro12.6",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(105,8,123)"
                    }
                },
                {
                    "name": "GO3",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(105,39,126)"
                    }
                },
                {
                    "name": "go3",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(45,101,73)"
                    }
                },
                {
                    "name": "EZpad7",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(75,13,50)"
                    }
                },
                {
                    "name": "win11Samsung",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(35,92,45)"
                    }
                },
                {
                    "name": "T830Galaxy",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(138,63,117)"
                    }
                },
                {
                    "name": "matepadPro",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(87,5,105)"
                    }
                },
                {
                    "name": "\u6296\u97f3",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(38,147,121)"
                    }
                },
                {
                    "name": "B10",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(11,62,103)"
                    }
                },
                {
                    "name": "\u7f51\u53e3",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(47,84,82)"
                    }
                },
                {
                    "name": "\u79d1\u8003",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(67,43,122)"
                    }
                },
                {
                    "name": "w10",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(127,147,147)"
                    }
                },
                {
                    "name": "padMIUI",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(72,35,76)"
                    }
                },
                {
                    "name": "\u95ea\u8d2d",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(123,116,158)"
                    }
                },
                {
                    "name": "256G6789",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(35,156,93)"
                    }
                },
                {
                    "name": "\u81f3\u5c0a",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(45,107,105)"
                    }
                },
                {
                    "name": "13pro5G",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(57,0,102)"
                    }
                },
                {
                    "name": "wifipadApple",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(36,135,65)"
                    }
                },
                {
                    "name": "surface3",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(152,57,66)"
                    }
                },
                {
                    "name": "642022",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(124,134,51)"
                    }
                },
                {
                    "name": "apad10a",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(103,34,14)"
                    }
                },
                {
                    "name": "Pro34567",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(109,134,20)"
                    }
                },
                {
                    "name": "2017mini2",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(151,159,141)"
                    }
                },
                {
                    "name": "iplay9",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(46,39,62)"
                    }
                },
                {
                    "name": "51307140",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(144,97,63)"
                    }
                },
                {
                    "name": "5179Huawei",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(42,157,25)"
                    }
                },
                {
                    "name": "T307U",
                    "value": "2",
                    "textStyle": {
                        "color": "rgb(60,7,152)"
                    }
                },
                {
                    "name": "\u514d\u8d39",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(122,70,94)"
                    }
                },
                {
                    "name": "\u8bd5\u7528",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(104,82,35)"
                    }
                },
                {
                    "name": "\u516b\u6838\u5b89\u5353",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(82,107,132)"
                    }
                },
                {
                    "name": "64G2023",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(158,142,88)"
                    }
                },
                {
                    "name": "ipai",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(59,90,119)"
                    }
                },
                {
                    "name": "\u7ea2\u5ea6",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(132,150,65)"
                    }
                },
                {
                    "name": "X86",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(131,11,139)"
                    }
                },
                {
                    "name": "\u6d88\u9632",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(122,105,160)"
                    }
                },
                {
                    "name": "\u9633\u5149",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(96,36,23)"
                    }
                },
                {
                    "name": "\u53ef\u89c6",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(50,87,6)"
                    }
                },
                {
                    "name": "TOSHIBA",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(14,137,75)"
                    }
                },
                {
                    "name": "\u4e1c\u829d",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(52,131,148)"
                    }
                },
                {
                    "name": "windows8",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(97,159,84)"
                    }
                },
                {
                    "name": "16QF2",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(58,58,25)"
                    }
                },
                {
                    "name": "\u53ef\u63a5",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(108,51,29)"
                    }
                },
                {
                    "name": "\u673a\u5668",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(100,137,49)"
                    }
                },
                {
                    "name": "T820",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(154,18,18)"
                    }
                },
                {
                    "name": "S3",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(23,155,40)"
                    }
                },
                {
                    "name": "T825Teclast",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(78,44,0)"
                    }
                },
                {
                    "name": "AirPro23Mini456",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(34,32,87)"
                    }
                },
                {
                    "name": "789",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(33,138,158)"
                    }
                },
                {
                    "name": "RT",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(132,148,142)"
                    }
                },
                {
                    "name": "Pro1",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(18,117,126)"
                    }
                },
                {
                    "name": "Pro28",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(155,37,115)"
                    }
                },
                {
                    "name": "7.0",
                    "value": "5",
                    "textStyle": {
                        "color": "rgb(101,158,85)"
                    }
                },
                {
                    "name": "\u4ee3\u8ffd\u5267",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(146,63,60)"
                    }
                },
                {
                    "name": "air1Dell",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(116,72,84)"
                    }
                },
                {
                    "name": "ipad2.5",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(155,59,82)"
                    }
                },
                {
                    "name": "OPPOipad2021",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(113,76,97)"
                    }
                },
                {
                    "name": "2Huawei",
                    "value": "1",
                    "textStyle": {
                        "color": "rgb(131,106,82)"
                    }
                },
                {
                    "name": "H10",
                    "value": "4",
                    "textStyle": {
                        "color": "rgb(75,34,33)"
                    }
                },
                {
                    "name": "\u659c\u9762",
                    "value": "4",
                    "textStyle": {
                        "color": "rgb(12,74,22)"
                    }
                },
                {
                    "name": "\u5382\u5bb6",
                    "value": "4",
                    "textStyle": {
                        "color": "rgb(77,27,93)"
                    }
                },
                {
                    "name": "pen",
                    "value": "4",
                    "textStyle": {
                        "color": "rgb(94,124,110)"
                    }
                },
                {
                    "name": "\u89e6\u63a7\u7b14",
                    "value": "4",
                    "textStyle": {
                        "color": "rgb(32,63,66)"
                    }
                },
                {
                    "name": "\u91cd\u78c5",
                    "value": "4",
                    "textStyle": {
                        "color": "rgb(142,2,91)"
                    }
                },
                {
                    "name": "\u9009\u62e9",
                    "value": "4",
                    "textStyle": {
                        "color": "rgb(35,4,120)"
                    }
                },
                {
                    "name": "iwork20",
                    "value": "4",
                    "textStyle": {
                        "color": "rgb(37,8,118)"
                    }
                },
                {
                    "name": "Elite",
                    "value": "4",
                    "textStyle": {
                        "color": "rgb(38,1,65)"
                    }
                },
                {
                    "name": "x2",
                    "value": "4",
                    "textStyle": {
                        "color": "rgb(95,128,77)"
                    }
                },
                {
                    "name": "\u4ee3\u4e2d\u67cf",
                    "value": "4",
                    "textStyle": {
                        "color": "rgb(1,106,17)"
                    }
                },
                {
                    "name": "P20HD",
                    "value": "4",
                    "textStyle": {
                        "color": "rgb(132,17,52)"
                    }
                },
                {
                    "name": "P4",
                    "value": "4",
                    "textStyle": {
                        "color": "rgb(92,117,144)"
                    }
                },
                {
                    "name": "8.9",
                    "value": "4",
                    "textStyle": {
                        "color": "rgb(149,79,69)"
                    }
                },
                {
                    "name": "RK3288",
                    "value": "4",
                    "textStyle": {
                        "color": "rgb(121,39,50)"
                    }
                },
                {
                    "name": "IPSApple",
                    "value": "4",
                    "textStyle": {
                        "color": "rgb(126,111,57)"
                    }
                },
                {
                    "name": "\u56db\u6838\u5b89\u5353",
                    "value": "4",
                    "textStyle": {
                        "color": "rgb(11,135,85)"
                    }
                },
                {
                    "name": "ipadAir5",
                    "value": "3",
                    "textStyle": {
                        "color": "rgb(27,20,69)"
                    }
                },
                {
                    "name": "\u7ade\u5c4f",
                    "value": "3",
                    "textStyle": {
                        "color": "rgb(55,87,69)"
                    }
                },
                {
                    "name": "\u7167\u7247",
                    "value": "3",
                    "textStyle": {
                        "color": "rgb(74,128,111)"
                    }
                },
                {
                    "name": "\u6253\u5370\u670d\u52a1\u5668",
                    "value": "3",
                    "textStyle": {
                        "color": "rgb(126,117,22)"
                    }
                },
                {
                    "name": "Ellipsis",
                    "value": "3",
                    "textStyle": {
                        "color": "rgb(101,116,100)"
                    }
                },
                {
                    "name": "HD",
                    "value": "3",
                    "textStyle": {
                        "color": "rgb(131,86,14)"
                    }
                },
                {
                    "name": "\u7535\u5f71",
                    "value": "3",
                    "textStyle": {
                        "color": "rgb(107,14,108)"
                    }
                },
                {
                    "name": "xiaomi",
                    "value": "3",
                    "textStyle": {
                        "color": "rgb(103,31,32)"
                    }
                },
                {
                    "name": "pad5",
                    "value": "3",
                    "textStyle": {
                        "color": "rgb(142,94,37)"
                    }
                },
                {
                    "name": "redmi",
                    "value": "3",
                    "textStyle": {
                        "color": "rgb(14,144,29)"
                    }
                },
                {
                    "name": "\u56fd\u9645",
                    "value": "3",
                    "textStyle": {
                        "color": "rgb(82,9,39)"
                    }
                },
                {
                    "name": "\u6d77\u5916\u7248",
                    "value": "3",
                    "textStyle": {
                        "color": "rgb(98,137,15)"
                    }
                },
                {
                    "name": "\u5bf8\u5b89\u5353\u4e09\u9632",
                    "value": "3",
                    "textStyle": {
                        "color": "rgb(126,87,130)"
                    }
                },
                {
                    "name": "lora",
                    "value": "3",
                    "textStyle": {
                        "color": "rgb(158,145,76)"
                    }
                },
                {
                    "name": "\u4f4e\u9891",
                    "value": "3",
                    "textStyle": {
                        "color": "rgb(20,1,70)"
                    }
                },
                {
                    "name": "\u8679\u819c",
                    "value": "3",
                    "textStyle": {
                        "color": "rgb(88,79,55)"
                    }
                },
                {
                    "name": "\u5e93\u5b58",
                    "value": "3",
                    "textStyle": {
                        "color": "rgb(154,58,80)"
                    }
                },
                {
                    "name": "50f",
                    "value": "3",
                    "textStyle": {
                        "color": "rgb(150,52,83)"
                    }
                },
                {
                    "name": "GPSHuawei",
                    "value": "3",
                    "textStyle": {
                        "color": "rgb(38,4,15)"
                    }
                }
            ],
        }]
    };

    wordCloud.setOption(wordCloud_option);



  })();