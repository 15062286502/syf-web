<template>
<div style="width: 80%;height: 100%">
  <el-container>
    <el-header style="text-align: left;background-color: slategrey">
      <el-breadcrumb separator="/" style="margin-top: 25px">
        <el-breadcrumb-item>首页</el-breadcrumb-item>
      </el-breadcrumb>
    </el-header>
  <el-aside>
    <el-row>
      <el-col>
        <el-card :body-style="{ padding: '0px' }">
          <img src="../../assets/ding.jpg" class="image">
          <div style="padding: 14px;">
            <span>待处理订单</span>
            <div class="bottom clearfix">
              <el-button type="text" class="button">点击查看</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col>
        <el-card :body-style="{ padding: '0px' }">
          <img src="../../assets/message.jpg" class="image">
          <div style="padding: 14px;">
            <span>未读消息</span>
            <div class="bottom clearfix">
              <el-button type="text" class="button">点击查看</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </el-aside>
    <el-main>
      <div id="chartmainline" style="width:600px; height:400px;"></div>
    </el-main>
  </el-container>

</div>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
      chartmainline: [],
      yMax: 500,
      dataShadow: [],
      zoomSize: 6,
      option: {
        title: {
          text: '特性示例：渐变色 阴影 点击缩放',
          subtext: 'Feature Sample: Gradient Color, Shadow, Click Zoom'
        },
        xAxis: {
          data: ['点', '击', '柱', '子', '或', '者', '两', '指', '在', '触', '屏', '上', '滑', '动', '能', '够', '自', '动', '缩', '放'],
          axisLabel: {
            inside: true,
            textStyle: {
              color: '#fff'
            }
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
            textStyle: {
              color: '#999'
            }
          }
        },
        dataZoom: [
          {
            type: 'inside'
          }
        ],
        series: [
          { // For shadow
            type: 'bar',
            itemStyle: {
              normal: {color: 'rgba(0,0,0,0.05)'}
            },
            barGap: '-100%',
            barCategoryGap: '40%',
            data: this.dataShadow,
            animation: false
          },
          {
            type: 'bar',
            itemStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(
                  0, 0, 0, 1,
                  [
                    {offset: 0, color: '#83bff6'},
                    {offset: 0.5, color: '#188df0'},
                    {offset: 1, color: '#188df0'}
                  ]
                )
              },
              emphasis: {
                color: new this.$echarts.graphic.LinearGradient(
                  0, 0, 0, 1,
                  [
                    {offset: 0, color: '#2378f7'},
                    {offset: 0.7, color: '#2378f7'},
                    {offset: 1, color: '#83bff6'}
                  ]
                )
              }
            },
            data: [220, 182, 191, 234, 290, 330, 310, 123, 442, 321, 90, 149, 210, 122, 133, 334, 198, 123, 125, 220]
          }
        ]
      }
    }
  },
  mounted () {
    let data = this.option.xAxis.data
    this.chartmainline = this.$echarts.init(document.getElementById('chartmainline'))
    this.chartmainline.setOption(this.option)
    this.chartmainline.on('click', (params) => {
      this.chartmainline.dispatchAction({
        type: 'dataZoom',
        startValue: data[Math.max(params.dataIndex - this.zoomSize / 2, 0)],
        endValue: data[Math.min(params.dataIndex + this.zoomSize / 2, this.option.data.length - 1)]
      })
    })
  },
  created () {
    for (var i = 0; i < this.data.length; i++) {
      this.dataShadow.push(this.yMax)
    }
  }
}
</script>

<style scoped>

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    height: 180px;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }
</style>
