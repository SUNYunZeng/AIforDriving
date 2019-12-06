<template>
  <div>
    <Map></Map>
    <EChartsMap></EChartsMap>
  </div>
</template>

<script>
  import Map from '@/components/commom/LeftletMap';
  import EChartsMap from '@/components/commom/EChartsMap';
  export default {
    name: 'about',
    components: {
      Map,
      EChartsMap
    }
  };
</script>

<style scoped>

</style>
