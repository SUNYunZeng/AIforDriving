<template>
  <div class="overflow: auto" style="width: auto">
    <Form ref="formInline" inline>
      <FormItem>
        用户: <Select v-model="table_name" clearable style="width:70px">
        <Option value="user1">User1</Option>
        <Option value="user2" disabled>User2</Option>
        <Option value="user3" disabled>User3</Option>
        <Option value="user4" disabled>User4</Option>
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
        <InputNumber style="width: 50px" :max="200" :min="1" v-model="min_v" @on-change="changv1"></InputNumber>
        ~
        <InputNumber style="width: 50px" :max="200" :min="1" v-model="max_v" @on-change="changv2"></InputNumber>
      </FormItem>
      <FormItem>
        <Button @click="search" type="primary" shape="circle" icon="ios-search">Search</Button>
      </FormItem>
    </Form>
    <Table  border stripe :columns="columns1" :data="pageData"></Table>
    <br>
    <Page :total="dataCount" :page-size="pageSize" @on-change="changepage" show-total :current="pageCurrent"/>
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
        dataCount:0,
        pageSize:10,
        pageCurrent:1,//当前页数
        min_v: 1,
        max_v: 200,
        indeterminate: true,
        checkAll: false,
        checkAllGroup: ['出发时间', '出发地点', '抵达地点', '平均行驶速度', '轨迹总点数', '行驶总距离'],
        columns1: [
          {
            title: 'ID',
            key: 'id',
            sortable: true,
            width: 100,
          },
          {
            title: 'Departure Origin',
            key: 'age',
            sortable: true,
            width: 200,
          },
          {
            title: 'Destination',
            key: 'age',
            sortable: true,
            width: 200,
          },
          {
            title: 'Mean Velocity',
            key: 'address',
            sortable: true,
            width: 200,
          },
          {
            title: 'Point\'s Number',
            key: 'address',
            sortable: true,
            width: 200,
          },
          {
            title: 'Travel Distance',
            key: 'age',
            sortable: true,
            width: 200,
          },
          {
            title: 'Departure Time',
            key: 'address',
            sortable: true,
            width: 200,
          }
        ],
        pageData: []
      };
    },
    created(){
      this.dataCount = this.table_data.length;
      this.pageData = this.table_data.slice(0,this.pageSize);
    },
    methods: {
      changepage(index){//分页
        let _start = (index-1) * this.pageSize;
        let _end = index * this.pageSize;
        this.pageData = this.data6.slice(_start,_end);
      },
      search () {
        if (this.checkAllGroup.length === 0) {
          this.$Message.info('请至少选择一个查询内容！');
          return null;
        }
        this.id = [];
        for(let i= this.min_v; i<=this.max_v; i++){
          this.table_data = [1,2,3,4,5,6,4,7,8,9,10,11,12];
          this.id.push(i);
        }
        if(this.$isOnServer){
          post('searchByCol', {
            id: this.id,
            tableName: this.table_name
          }).then(data=>{
            console.log(data);
          })
        }else {
          get('../static/data/user_1.json').then(data=>{
            this.user = [];
            for( let i of this.id){
              this.user.push(data.RECORDS[i]);
            }
            console.log(this.user);
          })
        }
      },
      changv1 () {
        if (this.min_v >= this.max_v || this.min_v <= 0 || this.min_v > 200) {
          this.$Message.error('数值范围错误');
          this.min_v = 1;
        }
      },
      changv2 () {
        if (this.min_v >= this.max_v || this.max_v <= 0 || this.max_v > 200) {
          this.$Message.error('数值范围错误');
          this.max_v = 200;
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

