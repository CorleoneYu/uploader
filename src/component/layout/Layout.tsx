import React, { Component } from "react";
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

/* component */
import UploaderViewer from '../uploader-viewer';
import Home from '../home';
import FileTree from '../file-tree';

/* antd */
import { Layout } from 'antd';
const { Header, Content, Sider } = Layout;

export default class extends Component {
  render() {
    return (
      <BrowserRouter>
        <Layout>
          <Header className="header">
            <h1 className="cwhite">易动网盘</h1>
          </Header>
          <Layout style={{ height: "calc(100vh - 64px)" }}>
            <Sider width={200} style={{ background: '#fff'}}>
              <FileTree />
            </Sider>
            <Layout style={{ padding: "24px" }}>
              <Content
                style={{
                  background: "#fff",
                  margin: 0,
                  height: "80vh",
                  padding: "20px",
                  overflow: 'auto',
                }}
              >
                <Switch>
                  <Route path="/upload" component={UploaderViewer} />
                  <Route path="/home" component={Home} />
                  <Redirect from="*" to="/upload" />
                </Switch>
              </Content>
            </Layout>
          </Layout>
        </Layout>
      </BrowserRouter>
    );
  }
}
