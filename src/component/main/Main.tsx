import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

/* component */
import Home from '../home';
import FileTree from '../file-tree';
import MainHeader from '../header';

/* antd */
import { Layout } from 'antd';
const { Header, Content, Sider } = Layout;

function Main() {
  return (
    <Layout>
      <Header className="header">
        <MainHeader />
      </Header>
      <Layout style={{ height: 'calc(100vh - 64px)' }}>
        <Sider width={250} style={{ background: '#fff', paddingTop: 10, overflow: 'auto' }}>
          <FileTree />
        </Sider>
        <Layout style={{ padding: '24px' }}>
          <Content
            style={{
              background: '#fff',
              margin: 0,
              height: '80vh',
              padding: '20px',
              overflow: 'auto',
            }}
          >
            <Switch>
              <Route path="/main/home" render={() => <Home />} />
              <Redirect from="*" to="/main/home" />
            </Switch>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}

export default Main;
