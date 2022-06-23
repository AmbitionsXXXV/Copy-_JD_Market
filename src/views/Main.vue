<template>
  <div class="main">
    <keep-alive>
      <component :is="isComponent"></component>
    </keep-alive>
    <tool-bar ref="toolBar" @onChangeFragment="onChangeFragment"></tool-bar>
  </div>
</template>

<script>
import ToolBar from '@c/currency/ToolBar';
import Home from '@c/Home';
import Shopping from '@c/Shopping';
import My from '@c/My';
export default {
  name: 'imooc',
  components: {
    ToolBar,
    home: Home,
    shopping: Shopping,
    my: My
  },
  data: function() {
    return {
      isComponent: 'home'
    };
  },
  activated: function() {
    this.pushComponent();
  },
  methods: {
    pushComponent: function() {
      let componentIndex = this.$route.params.componentIndex;
      if (!componentIndex) return;
      this.$refs.toolBar.onChangeComponent(componentIndex);
    },
    onChangeFragment: function(componentName) {
      this.isComponent = componentName;
    }
  }
};
</script>

<style lang="scss" scoped>
.main {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>
