import React, { Component } from 'react';
import { Layout, Menu } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { history } from 'umi';
import styles from './index.less';

const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;

class LayoutPage extends Component {
  state = {
    collapsed: false,
  };

  componentDidMount() {
    history.push('/home');
  }

  // 菜单展开、关闭切换
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  // 渲染菜单
  renderMenuItems = routes => {
    return routes.map(item => {
      if(!item.hidden){
        if (item.routes) {
          if(item.menu){
            return <SubMenu title={item.menu.name}>{this.renderMenuItems(item.routes)}</SubMenu>
          }else{
            return this.renderMenuItems(item.routes);
          }
        }
        if (item.menu) {
          return (
            <Menu.Item key={item.path} icon={item.icon || null}>
              {item.menu.name}
            </Menu.Item>
          );
        }
      }
    });
  };

  selectMenuItem = ({ key }) => {
    history.push(key);
  };

  render() {
    const { children, routes, location } = this.props;

    // 渲染菜单
    const menu = (
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={location.pathname}
        onSelect={this.selectMenuItem}
      >
        {this.renderMenuItems(routes)}
      </Menu>
    );

    return (
      <Layout style={{ height: '100%' }}>
        {/* 侧边栏 */}
        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
          <div className={styles.logo}>
            <img
              src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
              alt=""
            />
            <span>大杂烩</span>
          </div>
          {menu}
        </Sider>
        <Layout className="site-layout">
          {/* 头部 */}
          <Header
            className="site-layout-background"
            style={{ paddingLeft: 10, background: '#dcdfe6' }}
          >
            {React.createElement(
              this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: 'trigger',
                onClick: this.toggle,
              },
            )}
          </Header>
          {/* 内容部分 */}
          <Content
            className="site-layout-background"
            style={{
              margin: '24px 16px',
              minHeight: 280,
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default LayoutPage;
