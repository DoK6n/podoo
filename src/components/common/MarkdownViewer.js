import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkGemoji from 'remark-gemoji';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeRaw from 'rehype-raw';

import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { gruvboxDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { CopyToClipboardWrapper } from 'react-clipboard-button';
import toast, { Toaster } from 'react-hot-toast';
import 'github-markdown-css/github-markdown.css';
import '@assets/css/preview.css';
import { FiCopy } from 'react-icons/fi';
import { MarkdownView } from '@styles/todo';

function MarkdownViewr({ doc, done, edited }) {
  return (
    <div style={{ width: '100%', overflow: 'auto', display: !edited ? 'inline-block' : 'none' }}>
      <Toaster position="top-center" reverseOrder={false} />
      <MarkdownView className="preview markdown-body" done={done} edited={edited}>
        <ReactMarkdown
          children={doc}
          remarkPlugins={[remarkGfm, remarkGemoji, remarkMath]}
          rehypePlugins={[rehypeRaw, rehypeKatex]}
          components={{
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || '');
              return !inline && match ? (
                <CopyToClipboardWrapper
                  text={String(children)}
                  onSuccess={() => {
                    console.log('copy onSuccess!');
                    return toast.success('Copied to clipboard', {
                      style: {
                        borderRadius: '10px',
                        background: '#483d6b',
                        color: '#efeef3',
                      },
                      iconTheme: {
                        primary: '#9595d9',
                        secondary: '#efeef3',
                      },
                    });
                  }}
                  style={{
                    cursor: 'pointer',
                    marginTop: '0.3rem',
                  }}
                  button={<FiCopy size={16} />}
                >
                  <SyntaxHighlighter
                    children={String(children).replace(/\n$/, '')}
                    style={gruvboxDark}
                    customStyle={{
                      margin: '-1rem',
                      fontWeight: 'bold',
                      background: '#483d6b',
                    }}
                    language={match[1]}
                    PreTag="div"
                    {...props}
                  />
                </CopyToClipboardWrapper>
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            },
          }}
        />
      </MarkdownView>
    </div>
  );
}

export default MarkdownViewr;
