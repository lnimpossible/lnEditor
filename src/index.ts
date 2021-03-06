require("@/plugin/jscolor")
import '@/styles/index';
const wid: any = window
const actionbar: HTMLElement = document.getElementById("header")
let lastRange: any = null
document.getElementById("inputBody").onmouseleave = function() {
  var selObj = window.getSelection(); // Selection对象
  // 判断是否框选了, 开始偏移量与结束偏移量不相同，所以为false.
  if(selObj.isCollapsed === false) {
    var range  = selObj.getRangeAt(0); //  Range 对象
    // 保存上次的框选range
    lastRange = range
  }
}
const exec = (command: string, value: string | null = null) => {
  var selObj = window.getSelection(); // Selection对象
  if(selObj.isCollapsed === true) {
    selObj.removeAllRanges()
    // 使用上次的框选区域range
    selObj.addRange(lastRange)
  }
  document.execCommand(command, false, value);
};

const actions: any = {
  bold: {
    icon: '<b>B</b>',
    title: 'Bold',
    result: () => exec('bold')
  },
  italic: {
    icon: '<i>I</i>',
    title: 'Italic',
    result: () => exec('italic')
  },
  underline: {
    icon: '<u>U</u>',
    title: 'Underline',
    result: () => exec('underline')
  },
  link: {
    icon: '&#128279;',
    title: 'Link',
    result: () => {
      const url = window.prompt('Enter the link URL')
      if (url) exec('createLink', url)
    }
  },
  color: {
    icon: '<button id="colorButton" />',
    title: 'color',
    result: () => {
      // exec('foreColor', 'red') 由于颜色选取不是简单的点击事件，需要在色板change的时候操作exec
    }
  }
  // … others button
}
for (let k in actions) {
  const v: any = actions[k];
  // 新建一个按钮元素
  const button: HTMLElement = document.createElement('button')
  // 给按钮加上 css 样式
  button.className = 'item'
  // 把 icon 属性作为内容显示出来
  button.innerHTML = v.icon
  button.title = v.title
  // 把 result 属性赋给按钮作为点击事件
  button.onclick = v.result
  // 将创建的按钮添加到工具栏上
  actionbar.appendChild(button)
}
const myPicker: void = new wid.jscolor('#colorButton', {
  onChange: function () {
    const rgba: string = this.toRGBAString()
    exec('foreColor', rgba)
  }
})
