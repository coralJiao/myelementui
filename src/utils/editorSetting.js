import E from 'wangeditor'
import bindEvent from './index'
const { BtnMenu, Tooltip } = E

export class clearEditor extends BtnMenu {
  constructor (editor) {
    const $elem = E.$('<div class="w-e-menu my-defined-icon" data-title="清空"><i class="el-icon-delete"></i></div>')
    super($elem, editor)
  }
  clickHandler () {
    this.editor.txt.clear()
    var callBack = this.editor.config.clearCallBack
    if (callBack && Object.prototype.toString.call(callBack) === '[object Function]') {
      callBack()
    }
  }
  tryChangeActive () {
    // 激活菜单
    // 1. 菜单 DOM 节点会增加一个 .w-e-active 的 css class
    // 2. this.this.isActive === true
    // this.active();

    // // 取消激活菜单
    // // 1. 菜单 DOM 节点会删掉 .w-e-active
    // // 2. this.this.isActive === false
    this.unActive()
  }
}

// 第一，菜单 class ，Button 菜单继承 BtnMenu class
export class videoEditor extends BtnMenu {
  constructor (editor) {
    const $elem = E.$(`<div class="w-e-menu my-defined-icon" data-title="视频"><i class="el-icon-video-camera-solid"></i></div>`)
    super($elem, editor)

    bindEvent(editor)
  }
  // 菜单点击事件
  clickHandler () {
    // 做任何你想做的事情
    // 可参考【常用 API】文档，来操作编辑器
    var callBack = this.editor.config.videoCallBack
    if (callBack && Object.prototype.toString.call(callBack) === '[object Function]') {
      callBack()
    }
    console.log('log...', this)
  }
  // 菜单是否被激活（如果不需要，这个函数可以空着）
  // 1. 激活是什么？光标放在一段加粗、下划线的文本时，菜单栏里的 B 和 U 被激活，如下图
  // 2. 什么时候执行这个函数？每次编辑器区域的选区变化（如鼠标操作、键盘操作等），都会触发各个菜单的 tryChangeActive 函数，重新计算菜单的激活状态
  tryChangeActive () {
    // 激活菜单
    // 1. 菜单 DOM 节点会增加一个 .w-e-active 的 css class
    // 2. this.this.isActive === true
    this.active()

    // // 取消激活菜单
    // // 1. 菜单 DOM 节点会删掉 .w-e-active
    // // 2. this.this.isActive === false
    // this.unActive()
  }
}

export class myTool extends Tooltip {
  constructor (editor) {
    console.log('....', editor)
    super()
  }
}
