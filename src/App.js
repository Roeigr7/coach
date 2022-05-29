import './App.css';
import React from 'react';
import 'antd/dist/antd.min.css';
import './index.css';
import { Layout, Menu } from 'antd';
import DataParse from './Components/DataParse';
import Charts from './Components/Chart';
import Game from './Task2/Game';

const { Header, Content, Footer } = Layout;

const App = () => (
  <Layout className='layout'>
    <Header>
      <div className='logo' />
      <Menu
        theme='dark'
        mode='horizontal'
        defaultSelectedKeys={['2']}
        items={new Array(2).fill(null).map((_, index) => {
          const key = index + 1;
          return {
            key,
            label: `nav ${key}`,
          };
        })}
      />
    </Header>
    <Content
      style={{
        padding: '0 50px',
      }}
    >
      <div className='site-layout-content'>
        <DataParse />
        <Charts />
      </div>
      <div className='game task2'>
        <Game />
      </div>
    </Content>
    <Footer
      style={{
        textAlign: 'center',
      }}
    >
      Ant Design ©2018 Created by Ant UED
    </Footer>
  </Layout>
);

export default App;
