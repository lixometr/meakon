
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
    return {};
  },
  computed: {
    language() {
      return this.$store.getters["language/language"];
    },
    values() {
      return this.value.values || {};
    },
    _values() {
      return this.value.values || {};
    },
    setBlock() {
      return (path) => {};
    },
    getLangValue() {
      return (ru, en) => {
        if (!en) {
          const arr = ru.split(".");
          arr[arr.length - 1] = "en_" + arr[arr.length - 1];
          en = arr.join('.')
        }
        return this.language === "en" ? this.getValue(en) : this.getValue(ru);
      };
    },
    getValue() {
      return (path) => {
        return _.get(this.values, path);
      };
    },
  },
};
</script>

