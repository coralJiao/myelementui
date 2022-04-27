<template lang="html">
  <div>
    <!-- <div class='editor' id='editor'>
    </div> -->
    <div ref="toolbar" class="toolbar"/>
    <div ref="editor" class="text"/>
  </div>
</template>

<script>
import { clearEditor, videoEditor } from '@/utils/editorSetting'
import E from 'wangeditor'
export default {
  name: 'TipTapCommom',
  // model: {
  //   prop: 'value',
  //   event: 'change'
  // },
  props: {
    value: {
      type: String,
      default: '123'
    },
    isClear: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      // uploadPath,
      editor: null,
      info_: null
    }
  },
  watch: {
    isClear(val) {
      // 触发清除文本域内容
      if (val) {
        this.editor.txt.clear()
        this.info_ = null
      }
    },
    value: function(value) {
      if (value !== this.editor.txt.html()) {
        this.editor.txt.html(this.value)
      }
    }
    // value为编辑框输入的内容，这里我监听了一下值，当父组件调用得时候，如果给value赋值了，子组件将会显示父组件赋给的值
  },
  mounted() {
    this.seteditor()
    this.editor.txt.html(this.value)
  },
  methods: {
    seteditor() {
      // 使用refs  创建多个时不会错乱
      this.editor = new E(this.$refs.toolbar, this.$refs.editor)

      // this.editor = new E("#editor");
      // 注册菜单 -- 清空
      const menuKey = 'clear'
      this.editor.menus.extend(menuKey, clearEditor)
      this.editor.config.menus.push(menuKey)

      const clear2 = 'myClear'
      this.editor.menus.extend(clear2, videoEditor)
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
      //   'quote', // 引用  -- blockquote
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
        'video',
        'code'
      ]
      // 设置字体颜色
      this.editor.config.colors = ['#000000', '#eeece0', '#1c487f', '#4d80bf']
      // 设置字体
      // this.editor.config.fontNames = [
      //   {name:'呵呵',value:'黑体'},
      //   '黑体'
      // ]

      const _this = this
      this.editor.config.onchange = function(html) {
        // html 即变化之后的内容
        _this.htmlChange(html)
      }
      // 不展示全屏
      this.editor.config.showFullScreen = false

      // 自定义检查插入视频的回调
      // this.editor.config.onlineVideoCallback = function (video) {
      // 自定义回调内容，内容成功插入后会执行该函数
      //   console.log('插入视频内容', video)
      // }

      this.editor.config.videoCallBack = function() {
        console.log('videoCallBack.11111')
        _this.editor.cmd.do('insertHTML',
          `
            <video src="/static/media/abc.54f95da.mp4" autoplay="autoplay" controls="controls"></video>
          `
        )
      }

      this.editor.create()
    },
    htmlChange(html) {
      this.$emit('input', html)
      console.log('this.editor', this.editor)
    },
    abcd() {
      console.log('2222222')
    }
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
.my-defined-icon {
  font-size: 22px;
}
</style>
