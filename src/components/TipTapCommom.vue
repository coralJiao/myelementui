<template lang='html'>
  <div class='editor' id='editor'>
    <!-- <div ref='toolbar' class='toolbar'>
    </div>
    <div ref='editor' class='text'>
    </div> -->
  </div>
</template>

<script>
import E from 'wangeditor'
export default {
  name: 'TipTapCommom',
  data () {
    return {
      // uploadPath,
      editor: null,
      info_: null
    }
  },
  model: {
    prop: 'value',
    event: 'change'
  },
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
  watch: {
    isClear (val) {
      // 触发清除文本域内容
      if (val) {
        this.editor.txt.clear()
        this.info_ = null
      }
    },
    value: function (value) {
      if (value !== this.editor.txt.html()) {
        this.editor.txt.html(this.value)
      }
    }
    // value为编辑框输入的内容，这里我监听了一下值，当父组件调用得时候，如果给value赋值了，子组件将会显示父组件赋给的值
  },
  mounted () {
    this.seteditor()
    this.editor.txt.html(this.value)
  },
  methods: {
    seteditor () {
      // 使用refs  创建多个时不会错乱
      // this.editor = new E(this.$refs.toolbar, this.$refs.editor)
      this.editor = new E('#editor')
      // this.editor.customConfig = {
      // menus: []
      // }
      // this.editor.customConfig.uploadImgShowBase64 = false; // base 64 存储图片
      // this.editor.customConfig.uploadImgServer =
      //   'http://otp.cdinfotech.top/file/upload_images'; // 配置服务器端地址
      // this.editor.customConfig.uploadImgHeaders = {}; // 自定义 header
      // this.editor.customConfig.uploadFileName = 'file'; // 后端接受上传文件的参数名
      // this.editor.customConfig.uploadImgMaxSize = 2 * 1024 * 1024; // 将图片大小限制为 2M
      // this.editor.customConfig.uploadImgMaxLength = 6; // 限制一次最多上传 3 张图片
      // this.editor.customConfig.uploadImgTimeout = 3 * 60 * 1000; // 设置超时时间

      // this.editor.config.customUploadImg = {
      // 上传图片  返回URL
      // }

      // 回调函数，对上传图片的不同阶段，做相应处理
      // this.editor.customConfig.uploadImgHooks = {
      //   fail: (xhr, editor, result) => {
      //     // 插入图片失败回调
      //   },
      //   success: (xhr, editor, result) => {
      //     // 图片上传成功回调
      //   },
      //   timeout: (xhr, editor) => {
      //     // 网络超时的回调
      //   },
      //   error: (xhr, editor) => {
      //     // 图片上传错误的回调
      //   },
      //   customInsert: (insertImg, result, editor) => {
      //     // 图片上传成功，插入图片的回调
      //     // result为上传图片成功的时候返回的数据，这里我打印了一下发现后台返回的是data：[{url:'路径的形式'},...]
      //     console.log(result.data[0].url)
      //     // insertImg() // 为插入图片的函数
      //     // 循环插入图片
      //     // for (let i = 0; i < 1; i++) {
      //     // console.log(result)
      //     let url = 'http://otp.cdinfotech.top' + result.url
      //     insertImg(url)
      //     // }
      //   }
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

      // 设置文字大小 不能新增，只能减少
      // this.editor.config.fontSizes = {
      //   'x-small': { name: '10px', value: '1' },
      //   'small': { name: '13px', value: '2' },
      //   'normal': { name: '16px', value: '3' },
      //   'large': { name: '18px', value: '4' },
      //   'x-large': { name: '24px', value: '5' },
      //   'xx-large': { name: '32px', value: '6' },
      //   'xxx-large': { name: '48px', value: '7' }
      // }

      // 表情
      // this.editor.config.emotions = [
      //   {
      //     title: '新浪', // tab 的标题
      //     type: 'image', // 'emoji' 或 'image' ，即 emoji 形式或者图片形式
      //     content: [
      //       // {
      //       //   alt: '[坏笑]',
      //       //   src: `${SINA_URL_PATH}/50/pcmoren_huaixiao_org.png`,
      //       // },
      //       // { alt: '[舔屏]', src: `${SINA_URL_PATH}/40/pcmoren_tian_org.png` },
      //       // { alt: '[污]', src: `${SINA_URL_PATH}/3c/pcmoren_wu_org.png` }
      //     ]
      //   },
      //   {
      //     title: 'emoji', // tab 的标题
      //     type: 'emoji', // 'emoji' / 'image'
      //     // emoji 表情，content 是一个数组即可
      //     content:
      //       '😀 😃 😄 😁 😆 😅 😂 😊 😇 🙂 🙃 😉 😓 😪 😴 🙄 🤔 😬 🤐'.split(
      //         /\s/
      //       )
      //   }
      // ]
      const _this = this
      this.editor.config.onchange = function (html) {
        // html 即变化之后的内容
        _this.htmlChange(html)
      }
      // 不展示全屏
      this.editor.config.showFullScreen = false

      // this.editor.config.showMenuTooltips = true;

      // 菜单栏提示为下标 默认up  无效？
      // this.editor.config.menuTooltipPosition = 'down'

      // 插入网络图片的回调
      // this.editor.config.linkImgCallback = function (src,alt,href) {
      //   console.log('图片 src ', src)
      //   console.log('图片文字说明',alt)
      //   console.log('跳转链接',href)
      // }

      // 自定义检查插入视频的回调
      // this.editor.config.onlineVideoCallback = function (video) {
      // 自定义回调内容，内容成功插入后会执行该函数
      //   console.log('插入视频内容', video)
      // }

      this.editor.create()
      console.log('this.editor.txt.html()', this.editor.txt.html())
      console.log('this.editor.txt.getJSON()', this.editor.txt.getJSON())
    },
    htmlChange (html) {
      console.log('html', html)
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
</style>
