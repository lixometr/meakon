<template>
  <ul class="filter_tabs__price show">
    <h3>Цена</h3>

    <div class="range-slider">
      <input type="text" class="js-range-slider" value="" />
    </div>
    <div class="extra-controls">
      <input type="text" class="js-input-from" value="0" />
      <input type="text" class="js-input-to" value="0" />
    </div>
  </ul>
</template>

<script>
export default {
  props: {
    value: {
      type: Array,
      default: () => [0, 100],
    },
  },
  mounted() {
    this.initRange();
  },
  computed: {
    min() {
      return this.value[0] || 0;
    },
    max() {
      return this.value[1] || 0;
    },
  },
  methods: {
    sendData(value) {
      this.$emit("input", value);
    },
    initRange() {
      const vm = this;

      let $range = $(".js-range-slider"),
        $inputFrom = $(".js-input-from"),
        $inputTo = $(".js-input-to"),
        instance,
        min = this.min,
        max = this.max,
        from = 0,
        to = 0;

      $range.ionRangeSlider({
        skin: "round",
        type: "double",
        min: min,
        max: max,
        from: min,
        to: max,
        onStart: updateInputs,
        onChange: updateInputs,
      });
      instance = $range.data("ionRangeSlider");
      function updateInputs(data) {
        from = data.from;
        to = data.to;
        vm.sendData([from, to]);
        $inputFrom.prop("value", from);
        $inputTo.prop("value", to);
      }

      $inputFrom.on("input", function () {
        var val = $(this).prop("value");

        // validate
        if (val < min) {
          val = min;
        } else if (val > to) {
          val = to;
        }

        instance.update({
          from: val,
        });
      });

      $inputTo.on("input", function () {
        var val = $(this).prop("value");

        // validate
        if (val < from) {
          val = from;
        } else if (val > max) {
          val = max;
        }

        instance.update({
          to: val,
        });
      });
    },
  },
};
</script>

<style lang="scss" >
</style>