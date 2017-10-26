export default [
  {
    index: 'demos',
    icon: 'cog',
    name: '组件演示',
    children: [
      {index: '/image-upload', icon: 'info-sign', name: '图片直接上传'},
      {index: '/image-crop-upload', icon: 'info-sign', name: '图片剪切上传'},
      {index: '/ace', icon: 'info-sign', name: 'Ace 文本编辑器'},
      {index: '/quill', icon: 'envelope', name: 'Quill 富文本编辑器'}
    ]
  }, {
    index: 'commons',
    icon: 'cog',
    name: '常规信息',
    children: [
      {index: '/about', icon: 'info-sign', name: '关于'},
      {index: '/contact', icon: 'envelope', name: '联系'}
    ]
  }
];