import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { getFileTree } from '../../api/file';
import IFileNode, { formatFileNode } from '../../utils/file-node'

/* component */
import UploaderViewer from '../uploader-viewer';
import Home from '../home';
import FileTree from '../file-tree';
import FolderTable from '../folder-table';

/* antd */
import { Layout } from 'antd';
const { Header, Content, Sider } = Layout;

type Props = {}
type State = {
  root: IFileNode | null,
}

export default class extends Component<Props, State> {
  state = {
    root: null
  }

  async componentDidMount() {
    this.getFileTree();
  }

  getFileTree = async () => {
    const data = await getFileTree();
    const root = formatFileNode(data.data);
    console.log('root: ', root);

    this.setState({
      root,
    })
  }

  render() {
    const { root } = this.state;
    
    return (
      <Layout>
        <Header className="header">
          <h1 className="cwhite">易动网盘</h1>
        </Header>
        <Layout style={{ height: 'calc(100vh - 64px)' }}>
          <Sider width={250} style={{ background: '#fff' }}>
            {root && <FileTree root={root!} />}
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
              {root && <FolderTable folder={root!} />}
              <Switch>
                <Route path="/main/upload" component={UploaderViewer} />
                <Route path="/main/home" component={Home} />
                <Redirect from="*" to="/main/upload" />
              </Switch>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}
