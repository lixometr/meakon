
<script>
import _ from "lodash";
export default {
  props: {
    value: {
      type: Object,
    },
    template: {
      type: Object,
    },
  },
  data() {
      return {

      }
  },
  computed: {
    values() {
      return this.value.values || {};
    },
    _values() {
      return this.value.values || {};
    },
    setBlock() {
        return path => {

        }
    },
    getValue() {
      return (path) => {
        return _.get(this.values, path);
      };
    },
  },
};
</script>

