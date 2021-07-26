export default [
  {
    index: 'demos',
    icon: 'menu',
    name: '组件演示',
    children: [
      { index: '/e-charts', icon: 's-marketing', name: 'ECharts' },
      { index: '/image-upload', icon: 'picture-outline', name: '图片直接上传' },
      { index: '/image-crop-upload', icon: 'picture-outline-round', name: '图片剪切上传' },
      { index: '/camera', icon: 'camera', name: '照相机' },
      { index: '/sequence', icon: 'collection-tag', name: '序列标注' },
      { index: '/ace', icon: 'edit', name: 'Ace 文本编辑器' },
      { index: '/quill', icon: 'document', name: 'Quill 富文本编辑器' },
      { index: '/marked', icon: 'edit-outline', name: 'MarkDown 编辑器' }
    ]
  }, {
    index: 'commons',
    icon: 's-home',
    name: '常规信息',
    children: [
      { index: '/about', icon: 'info', name: '关于' },
      { index: '/contact', icon: 'service', name: '联系' },
      { index: '/help', icon: 'question', name: '帮助' }
    ]
  }
];
