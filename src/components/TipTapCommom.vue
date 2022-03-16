<template lang='html'>
  <div class='editor' id='editor'>
    <!-- <div ref='toolbar' class='toolbar'>
    </div>
    <div ref='editor' class='text'>
    </div> -->
  </div>
</template>

<script>
import E from "wangeditor";
export default {
  name: "TipTapCommom",
  data() {
    return {
      // uploadPath,
      editor: null,
      info_: null,
    };
  },
  // model: {
  //   prop: 'value',
  //   event: 'change'
  // },
  props: {
    value: {
      type: String,
      default: "123",
    },
    isClear: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    isClear(val) {
      // 触发清除文本域内容
      if (val) {
        this.editor.txt.clear();
        this.info_ = null;
      }
    },
    value: function (value) {
      if (value !== this.editor.txt.html()) {
        this.editor.txt.html(this.value);
      }
    },
    // value为编辑框输入的内容，这里我监听了一下值，当父组件调用得时候，如果给value赋值了，子组件将会显示父组件赋给的值
  },
  mounted() {
    this.seteditor();
    this.editor.txt.html(this.value);
  },
  methods: {
    seteditor() {
      // 使用refs  创建多个时不会错乱
      // this.editor = new E(this.$refs.toolbar, this.$refs.editor)
      
      this.editor = new E("#editor");
      // 菜单 key ，各个菜单不能重复
      const menuKey = "clear";
      // 注册菜单
      this.editor.menus.extend(menuKey, clearEditor);
      this.editor.config.menus.push(menuKey)

      this.editor.config.clearCallBack = function() {
        console.log('clearCallBack.11111');
      }

      const clear2 = 'myClear'
      this.editor.menus.extend(clear2, clearEditor2)
      this.editor.config.menus.push(clear2)
      // this.editor.config.customUploadImg = {
      // 上传图片  返回URL
      // }

      // this.editor.customConfig.onchange = (html) => {
      //   this.info_ = html // 绑定当前逐渐地值
      //   this.$emit('change', this.info_) // 将内容同步到父组件中
      // }

      // 配置菜单
      // this.editor.config.menus = [
      //   'head', // 标题
      //   'bold', // 粗体
      //   'fontSize', // 字号
      //   'fontName', // 字体
      //   'underline', // 下划线
      //   'strikeThrough', // 删除线
      //   'foreColor', // 文字颜色
      //   'backColor', // 背景颜色
      //   'lineHeight',
      //   'foreColor',
      //   'link', // 插入链接
      //   'list', // 列表
      //   'todo',
      //   'justify', // 对齐方式
      //   'quote', // 引用
      //   'emoticon', // 表情
      //   'image', // 插入图片
      //   'video', // 插入视频
      //   'table', // 表格
      //   'code', // 插入代码
      //   'splitLine',
      //   'undo', // 撤销
      //   'redo', // 重复
      // ]
      // this.editor.config.menus.push("clear");

      // 不展示的菜单
      this.editor.config.excludeMenus = [
        // 'emoticon',
        "video",
        "code",
      ];
      // 设置字体颜色
      this.editor.config.colors = ["#000000", "#eeece0", "#1c487f", "#4d80bf"];
      // 设置字体
      // this.editor.config.fontNames = [
      //   {name:'呵呵',value:'黑体'},
      //   '黑体'
      // ]

      const _this = this;
      this.editor.config.onchange = function (html) {
        // html 即变化之后的内容
        _this.htmlChange(html);
      };
      // 不展示全屏
      this.editor.config.showFullScreen = false;

      // 自定义检查插入视频的回调
      // this.editor.config.onlineVideoCallback = function (video) {
      // 自定义回调内容，内容成功插入后会执行该函数
      //   console.log('插入视频内容', video)
      // }

      // this.editor.config.clearCallBack = function () {
      //   console.log("自定义菜单......");
      // };
      this.editor.create();
    },
    htmlChange(html) {
      this.$emit("input", html);
    },
  },
};
const { $, BtnMenu, DropListMenu, PanelMenu, DropList, Panel, Tooltip } = E;
function clearEditor2(editor) {
  this.editor = editor;
  this.$elem = E.$('<div class="w-e-menu" data-title="清空"><i class="w-e-icon-redo"></i></div>');
  this.type = "click";
  this._active = false;
}
clearEditor2.prototype = {
  constructor: clearEditor2,
  onclick: function (e) {
    console.log('222222  clearEditor2');
    // var callBack = editor.config.clearCallBack;
    // if (Object.prototype.toString.call(callBack) === "[Object, function]") {
    //   callBack();
    // }
    // editor.cmd.do("insertHtml", "()");
  },
};

// 第一，菜单 class ，Button 菜单继承 BtnMenu class
class clearEditor extends BtnMenu {
  constructor(editor) {
    // data-title属性表示当鼠标悬停在该按钮上时提示该按钮的功能简述
    const $elem = E.$(`<div class="w-e-menu" data-title="Alert"><button>alert</button></div>`);
    super($elem, editor);
  }
  // 菜单点击事件
  clickHandler() {
    // 做任何你想做的事情
    // 可参考【常用 API】文档，来操作编辑器
    this.editor.txt.clear()
    var callBack = this.editor.config.clearCallBack;
    if(callBack && Object.prototype.toString.call(callBack) === '[object Function]') {
      callBack()
    }
  }
  // 菜单是否被激活（如果不需要，这个函数可以空着）
  // 1. 激活是什么？光标放在一段加粗、下划线的文本时，菜单栏里的 B 和 U 被激活，如下图
  // 2. 什么时候执行这个函数？每次编辑器区域的选区变化（如鼠标操作、键盘操作等），都会触发各个菜单的 tryChangeActive 函数，重新计算菜单的激活状态
  tryChangeActive() {
    // 激活菜单
    // 1. 菜单 DOM 节点会增加一个 .w-e-active 的 css class
    // 2. this.this.isActive === true
    this.active();

    // // 取消激活菜单
    // // 1. 菜单 DOM 节点会删掉 .w-e-active
    // // 2. this.this.isActive === false
    // this.unActive()
  }
}
</script>

<style lang='css'>
.editor {
  width: 100%;
  margin: 0 auto;
  position: relative;
  z-index: 0;
  text-align: left;
}
.toolbar {
  border: 1px solid #ccc;
}
.text {
  border: 1px solid #ccc;
  min-height: 500px;
}
</style>
