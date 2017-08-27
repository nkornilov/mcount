<template>
  <div class="ui-create-bill">
    <input type="text" v-model="bill.name"/>
    <input type="text" v-model="bill.value"/>
    <button @click="onClick">Create</button>
  </div>
</template>

<script>
  import HTTP from '../common/http-common';

  export default {
    name: 'createBill',
    data() {
      return {
        bill: {
          name: '',
          value: 0,
        },
      };
    },
    methods: {
      onClick() {
        HTTP.post('/bill', {
          name: this.bill.name,
          value: this.bill.value,
        }).then((response) => {
          this.bill = response.data;
        }).catch((error) => {
          console.log(error);
        });
      },
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
