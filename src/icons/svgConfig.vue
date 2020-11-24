<template>
  <svg :class="svgClass" aria-hidden="true">
        
    <use :xlink:href="svgName"></use>
      
  </svg>
</template>

<script>
import { computed, onMounted, reactive, ref } from "@vue/composition-api";

export default {
  name: "",
  props: {
    iconClass: {
      type: String,
      default: "",
    },
    className: {
      type: String,
      default: "",
    },
  },
  setup(props) {
    const svgName = computed(() => `#icon-${props.iconClass}`);
    const svgClass = computed(() => {
      if (props.className) {
        return `svg-icon ${props.className}`;
      } else {
        return "svg-icon";
      }
    });
    return {
      svgName,
      svgClass,
    };
  },
};
</script>
<style lang='scss' scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  fill: currentColor;
  color: #ffffff;
  font-size: 20px;
  margin-top: -4px;
}
</style>