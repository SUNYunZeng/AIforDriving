<template>
  <div class="overflow: auto" style="width: auto">
    <Form ref="formInline" inline>
      <FormItem>
        用户: <Select v-model="table_name" clearable style="width:70px">
        <Option value="user1">User1</Option>
        <Option value="user2" :disabled="!this.$isOnServer">User2</Option>
        <Option value="user3" :disabled="!this.$isOnServer">User3</Option>
        <Option value="user4" :disabled="!this.$isOnServer">User4</Option>
      </Select>
      </FormItem>
      <FormItem>
        <b>检索内容:</b>
      </FormItem>
      <FormItem>
        <CheckboxGroup v-model="checkAllGroup" @on-change="checkAllGroupChange">
          <Checkbox label="出发时间"></Checkbox>
          <Checkbox label="出发地点"></Checkbox>
          <Checkbox label="抵达地点"></Checkbox>
          <Checkbox label="平均行驶速度"></Checkbox>
          <Checkbox label="轨迹总点数"></Checkbox>
          <Checkbox label="行驶总距离"></Checkbox>
          <Checkbox
            :indeterminate="indeterminate"
            :value="checkAll"
            @click.prevent.native="handleCheckAll">全选
          </Checkbox>
        </CheckboxGroup>
      </FormItem>
      <FormItem><b>ID范围:</b></FormItem>
      <FormItem>
        <InputNumber style="width: 55px" :max="max_set" :min="1" v-model="min_v" @on-change="changv1"></InputNumber>
        ~
        <InputNumber style="width: 55px" :max="max_set" :min="1" v-model="max_v" @on-change="changv2"></InputNumber>
      </FormItem>
      <FormItem>
        <Button @click="search" type="primary" shape="circle" icon="ios-search">Search</Button>
      </FormItem>
    </Form>
    <Table border stripe ref="selection" :columns="columns1" :data="nowData"></Table>
    <br>
    <Page :total="dataCount" :page-size="pageSize" @on-change="changepage" @on-page-size-change="_nowPageSize"
          show-total show-sizer show-elevator/>
  </div>
</template>

<script>
  import {post, get} from '@/utils/myAjax';

  export default {
    name: 't1',
    data () {
      return {
        id: [],
        user: [],
        table_data: [],
        table_name: 'user1',
        pageSize: 10,//每页显示多少条
        dataCount: 0,//总条数
        pageCurrent: 1,//当前页
        min_v: 1,
        max_v: 20,
        max_set: this.$isOnServer? 2000: 200,
        indeterminate: true,
        checkAll: false,
        checkAllGroup: ['出发时间', '出发地点', '抵达地点', '平均行驶速度', '轨迹总点数', '行驶总距离'],
        placeDict: {0: '餐饮', 1: '医疗', 2: '小区', 3: '酒店', 4: '生活服务', 5: '景点', 6: '教育', 7: '公司'},
        checktochar: {
          '出发时间': 'dep_time', '出发地点': 'dep_origin', '抵达地点': 'dest',
          '平均行驶速度': 'vel', '轨迹总点数': 'num', '行驶总距离': 'dis'
        },
        columns: {
          '出发时间': {
            title: 'Departure Time',
            key: 'dep_time',
            sortable: true,
            width: 200,
          },
          '出发地点': {
            title: 'Origin',
            key: 'dep_origin',
            sortable: true,
            width: 180,
          },
          '抵达地点': {
            title: 'Destination',
            key: 'dest',
            sortable: true,
            width: 180,
          },
          '平均行驶速度': {
            title: 'Mean Velocity(km/h)',
            key: 'vel',
            sortable: true,
            width: 200,
          },
          '轨迹总点数': {
            title: 'Point\'s Number',
            key: 'num',
            sortable: true,
            width: 200,
          },
          '行驶总距离': {
            title: 'Travel Distance(/km)',
            key: 'dis',
            sortable: true,
            width: 200,
          }
        },
        columns1: [],
        pageData: [],
        nowData: []
      };
    },
    methods: {
      search () {
        if (this.checkAllGroup.length === 0 || this.table_name === undefined) {
          this.$Message.info('查询参数错误！');
          return null;
        }
        this.id = [];
        for (let i = this.min_v; i <= this.max_v; i++) {
          this.table_data = [1, 2, 3, 4, 5, 6, 4, 7, 8, 9, 10, 11, 12];
          this.id.push(i);
        }
        if (this.$isOnServer) {
          post('searchByCol', {
            id: this.id,
            tableName: this.table_name
          }).then(data => {
            if (data.length > 0) {
              this.tableFactory(data);
            }
          });
        } else {
          get('../static/data/user_1.json').then(data => {
            this.user = [];
            for (let i of this.id) {
              this.user.push(data.RECORDS[i]);
            }
            if (this.user.length > 0) {
              this.tableFactory(this.user);
            }
          });
        }
      },
      tableFactory (data) {
        this.pageData = [];
        this.columns1 = [{
          title: 'ID',
          key: 'id',
          sortable: true,
          width: 65,
        }];
        for (let key of this.checkAllGroup) {
          this.columns1.push(this.columns[key]);
        }
        let id = this.min_v;
        for (let item of data) {
          this.pageData.push(this.generateRowContent(id, item));
          id++;
        }
        this.dataCount = this.pageData.length;
        this.nowData = [];
        for (let i = 0; i < this.pageSize; i++) {
          this.nowData.push(this.pageData[i]);
        }
      },
      generateRowContent (id, item) {
        let res = {id: id};
        for (let key of this.checkAllGroup) {
          this.calContent(res, key, item);
        }
        return res;
      },
      calContent (res, key, item) {
        switch (key) {
          case '出发时间':
            res[this.checktochar[key]] = item['time'];
            break;
          case '出发地点':
            let semO = eval(item['sem_O']);
            res[this.checktochar[key]] = this.placeDict[semO.indexOf(Math.max(...semO))];
            break;
          case '抵达地点':
            let semD = eval(item['sem_D']);
            res[this.checktochar[key]] = this.placeDict[semD.indexOf(Math.max(...semD))];
            break;
          case '平均行驶速度':
            let spd = eval(item['spd']);
            res[this.checktochar[key]] = (spd.reduce((prev, cur, index, array) => prev + cur) / spd.length * 3.6).toFixed(6);
            break;
          case '轨迹总点数':
            res[this.checktochar[key]] = eval(item['lngs']).length;
            break;
          case '行驶总距离':
            res[this.checktochar[key]] = item['dis_total'];
            break;
        }
      },
      changepage(index) {
        //需要显示开始数据的index,(因为数据是从0开始的，页码是从1开始的，需要-1)
        let _start = (index - 1) * this.pageSize;
        //需要显示结束数据的index
        let _end = index * this.pageSize;
        //截取需要显示的数据
        this.nowData = this.pageData.slice(_start, _end);
        //储存当前页
        this.pageCurrent = index;
      },
      _nowPageSize(index) {
        //实时获取当前需要显示的条数
        this.pageSize = index;
      },
      changv1 () {
        if (this.min_v >= this.max_v || this.min_v <= 0 || this.min_v > this.max_set) {
          this.$Message.error('数值需要在1~'+this.max_set+'之间');
          this.min_v = 1;
        }
      },
      changv2 () {
        if (this.min_v >= this.max_v || this.max_v <= 0 || this.max_v > this.max_set) {
          this.$Message.error('数值需要在1~'+this.max_set+'之间');
          this.max_v = this.max_set-1;
        }
      },
      handleCheckAll () {
        if (this.indeterminate) {
          this.checkAll = false;
        } else {
          this.checkAll = !this.checkAll;
        }
        this.indeterminate = false;

        if (this.checkAll) {
          this.checkAllGroup = ['出发时间', '出发地点', '抵达地点', '平均行驶速度', '轨迹总点数', '行驶总距离'];
        } else {
          this.checkAllGroup = [];
        }
      },
      checkAllGroupChange (data) {
        if (data.length === 6) {
          this.indeterminate = false;
          this.checkAll = true;
        } else if (data.length > 0) {
          this.indeterminate = true;
          this.checkAll = false;
        } else {
          this.indeterminate = false;
          this.checkAll = false;
        }
      }
    }
  };
</script>

