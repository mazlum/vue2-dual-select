<template>
  <div>
    <dual-select
      v-model="users"
      :options="options"
    />
  </div>
</template>

<script>
import DualSelect from "@/components/DualSelect";

export default {
  name: "App",
  components: { DualSelect },
  data() {
    return {
      options: [],
      users: []
    }
  },
  created() {
    this.options = [...Array(30).keys()].map(
      i => {
        return { id: i , name: `Test ${i}`
        }
      }
    );
    console.log(this.options)
  }
}
</script>
