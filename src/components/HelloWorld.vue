<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <form>
      <input type="text" name="id" v-model="id"> <br>
      <input type="text" name="tableName" v-model="tableName"> <br>
      <a href="javascript:;" @click="getData">提交</a>
    </form>
  </div>
</template>

<script>
  export default {
    name: 'hell',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App',
        id: '',
        tableName: ''
      };
    },
    methods: {
      getData: function () {
        const id = this.id;
        const tableName = this.tableName;
        this.$axios.post(this.bUrl + 'searchByCol', {
          id: id,
          tableName: tableName,
          requireRun: true
        }, {
          headers: {
            'Content-Type': 'application/json'
          }
        }).then((respose) => {
          console.log(respose.data);
        }).catch((err) => console.log(err));
      }
    }
  };
</script>
