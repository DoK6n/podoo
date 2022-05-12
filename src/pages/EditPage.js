import { useCodemirror } from '@hooks';
import styled from 'styled-components';
import React, { useCallback, useEffect, useState } from 'react';
import { MarkdownViewer } from '@components/common';
import { Toaster } from 'react-hot-toast';
import 'github-markdown-css/github-markdown.css';
import '@assets/css/preview.css';

const markdown = `# PoDoTe Theme Test Page
- __[pica](https://nodeca.github.io/pica/demo/)__ - high quality and fast image
  resize in browser.
- __[babelfish](https://github.com/nodeca/babelfish/)__ - developer friendly
  i18n with plurals support and easy syntax.

You will like those projects!

---

# h1 Heading 8-)
## h2 Heading
### h3 Heading
#### h4 Heading
##### h5 Heading
###### h6 Heading

## emoji
:heavy_check_mark:
:leftwards_arrow_with_hook:
:mask:

## Check Box

- [ ] text
- [x] text

<details>
  <summary>Summary</summary>
  detail
</details>

## Horizontal Rules

___

---

***


## Code

Inline \`code\`

Block code "fences"

~~~ sh
npm install
~~~

Syntax highlighting

~~~ js
const foo = bar => bar++;

console.log(foo(5));
~~~

## Tables


| Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |

There must be at least 3 dashes separating each header cell.
The outer pipes (|) are optional, and you don't need to make the 
raw Markdown line up prettily. You can also use inline Markdown.

Markdown | Less | Pretty
--- | --- | ---
*Still* | \`renders\` | **nicely**
1 | 2 | 3

---


<iframe width="320" height="180" src="https://www.youtube.com/embed/EsCP2xLuUM8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

---

Here is a simple footnote[^1].

A footnote can also have multiple lines[^2].  

You can also use words, to fit your writing style more closely[^note].

[^1]: My reference.
[^2]: Every new line should be prefixed with 2 spaces.  
  This allows you to have a footnote with multiple lines.
[^note]:
    Named footnotes will still render with numbers instead of the text but allow easier identification and linking.  
    This footnote also has been made with a different syntax using 4 spaces for new lines.
`;

const EditerViewerTestBlock = styled.div`
  display: flex;
  flex-direction: row;
  &::-webkit-scrollbar {
    width: 2px;
    height: 2px;
  }
  &::-webkit-scrollbar-thumb:vertical {
    background: radial-gradient(#5c4b8c95, #3b305a);
    border-radius: 8px;
  }
  .editor-wrapper {
    flex: 0 0 50% !important;
  }
`;

function EditPage() {
  const [doc, setDoc] = useState(`${markdown}\n`);

  const handleDocChange = useCallback(newDoc => {
    setDoc(newDoc);
  }, []);

  const handleChange = useCallback(state => handleDocChange(state.doc.toString()), [handleDocChange]);

  const [refContainer, editorView] = useCodemirror({
    initialDoc: doc,
    onChange: handleChange,
  });

  useEffect(() => {
    if (editorView) {
      // TODO
    }
  }, [editorView]);
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <EditerViewerTestBlock>
        <div className="editor-wrapper" ref={refContainer}></div>
        <MarkdownViewer doc={doc} done={false} edited={false} />
      </EditerViewerTestBlock>
    </>
  );
}

export default React.memo(EditPage);
