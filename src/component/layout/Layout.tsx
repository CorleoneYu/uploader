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

/* antd */
import { Layout } from 'antd';
const { Header, Content } = Layout;

export default class extends Component {
  render() {
    return (
      <BrowserRouter>
        <Layout>
          <Header className="header">
            <h1 className="cwhite">易动网盘</h1>
          </Header>
          <Layout style={{ height: "calc(100vh - 64px)" }}>
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
                  <Redirect from="*" to="/home" />
                </Switch>
              </Content>
            </Layout>
          </Layout>
        </Layout>
      </BrowserRouter>
    );
  }
}
