import Vue from 'vue';
import Router from 'vue-router';
import ImageUploadDemo from '@/pages/demos/ImageUploadDemo';
import ImageCropUploadDemo from '@/pages/demos/ImageCropUploadDemo';
import AceDemo from '@/pages/demos/AceDemo';
import QuillDemo from '@/pages/demos/QuillDemo';
import MarkedDemo from '@/pages/demos/MarkedDemo';
import Home from '@/pages/commons/Home';
import About from '@/pages/commons/About';
import Contact from '@/pages/commons/Contact';
import Help from '@/pages/commons/Help';

Vue.use(Router);

export default new Router({
  routes: [
    {path: '/', name: 'Home', component: Home},
    {path: '/image-upload', name: 'ImageUploadDemo', component: ImageUploadDemo},
    {path: '/image-crop-upload', name: 'ImageCropUploadDemo', component: ImageCropUploadDemo},
    {path: '/ace', name: 'AceDemo', component: AceDemo},
    {path: '/quill', name: 'QuillDemo', component: QuillDemo},
    {path: '/marked', name: 'MarkedDemo', component: MarkedDemo},
    {path: '/about', name: 'About', component: About},
    {path: '/contact', name: 'Contact', component: Contact},
    {path: '/help', name: 'Help', component: Help}
  ]
});
