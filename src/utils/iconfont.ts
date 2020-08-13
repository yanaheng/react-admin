import { createFromIconfontCN } from '@ant-design/icons';

const IconFont = createFromIconfontCN({
  scriptUrl: [
    '//at.alicdn.com/t/font_2005542_vrzvsnvi7x.js', // icon-javascript, icon-java, icon-shoppingcart (overrided)
  ],
  // scriptUrl: '/public/IconFont.js',
});

export default IconFont