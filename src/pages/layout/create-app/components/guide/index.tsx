import { CopyOutlined } from '@ant-design/icons';
import { Card, message } from 'antd';
import CLS from 'classnames';
import S from './index.module.less';

export default function Guide() {
  const onScriptCodeCopy = () => {
    message.success('复制成功!');
  };
  return (
    <Card title="应用接入指南">
      <div>复制探针代码, 插入入口文件 head 标签底部或者 body 标签底部</div>
      <div className={S.code}>
        <pre className={CLS(S.pre, S['script-pre'])}>
          <code>&lt;script src=&quot;https://test&quot;&gt;&lt;/script&gt;</code>
        </pre>
        <CopyOutlined className={S.copy} onClick={onScriptCodeCopy} />
      </div>
      <div className={S.example}>example 1: </div>
      <div className={S.code}>
        <pre className={CLS(S.pre, S['example-pre'])}>
          <code>
            {/* eslint-disable */}
            &lt;html&gt;
            <br />
            &nbsp;&nbsp;&lt;head&gt;
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;script src=&quot;https://test&quot;&gt;&lt;/script&gt;
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;script&gt;
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;...
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;var Sdk = window.RP_SDK;
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;var sdk = new Sdk(&#123;
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;appId: &#x27;test&#x27;,
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;dsn: &#x27;http://127.0.0.1:3001&#x27;
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#125;);
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;sdk.init();
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;/script&gt;
            <br />
            &nbsp;&nbsp;&lt;/head&gt;
            <br />
            &nbsp;&lt;/html&gt;
          </code>
        </pre>
      </div>
    </Card>
  );
}
