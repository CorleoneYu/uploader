import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

/* component */
import UploaderViewer from '../uploader-viewer';
import Home from '../home';
import FileTree from '../file-tree';

/* antd */
import { Layout } from 'antd';
const { Header, Content, Sider } = Layout;

function Main() {
  return (
    <Layout>
      <Header className="header">
        <h1 className="cwhite">易动网盘</h1>
      </Header>
      <Layout style={{ height: 'calc(100vh - 64px)' }}>
        <Sider width={250} style={{ background: '#fff' }}>
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
              <Route path="/main/upload" component={UploaderViewer} />
              <Route path="/main/home" render={() => <Home />} />
              <Redirect from="*" to="/main/upload" />
            </Switch>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  )
}

export default Main;