import React from 'react';
import {
  componentsStyledCss,
  coreStyledCss,
  extensionBlockquoteStyledCss,
  extensionCodeBlockStyledCss,
  extensionEmojiStyledCss,
  extensionFileStyledCss,
  extensionGapCursorStyledCss,
  extensionImageStyledCss,
  extensionListStyledCss,
  extensionMentionAtomStyledCss,
  extensionNodeFormattingStyledCss,
  extensionPlaceholderStyledCss,
  extensionPositionerStyledCss,
  extensionTablesStyledCss,
  extensionWhitespaceStyledCss,
  extensionYjsStyledCss,
  themeStyledCss,
} from '@remirror/styles/styled-components';
import { EditorComponent, Remirror, ThemeProvider, useActive, useChainedCommands, useRemirror } from '@remirror/react';
import {
  BoldExtension,
  CalloutExtension,
  HeadingExtension,
  HistoryExtension,
  ItalicExtension,
  UnderlineExtension,
  ImageExtension,
  DropCursorExtension,
  StrikeExtension,
  HorizontalRuleExtension,
} from 'remirror/extensions';
import styled from 'styled-components';
import { extensionCalloutStyledCss, extensionCountStyledCss, podoteThemeStyledCss } from 'styles';
import { useTodoStore } from 'hooks';

const PodoteTheme: ReturnType<typeof styled.div> = styled.div`
  ${componentsStyledCss}
  ${coreStyledCss}
  ${extensionBlockquoteStyledCss}
  ${extensionCalloutStyledCss}
  ${extensionCodeBlockStyledCss}
  ${extensionCountStyledCss}
  ${extensionEmojiStyledCss}
  ${extensionFileStyledCss}
  ${extensionGapCursorStyledCss}
  ${extensionImageStyledCss}
  ${extensionListStyledCss}
  ${extensionMentionAtomStyledCss}
  ${extensionNodeFormattingStyledCss}
  ${extensionPlaceholderStyledCss}
  ${extensionPositionerStyledCss}
  ${extensionTablesStyledCss}
  ${extensionWhitespaceStyledCss}
  ${extensionYjsStyledCss}
  ${themeStyledCss}
  ${podoteThemeStyledCss}
`;

const Menu = () => {
  const chain = useChainedCommands();
  const active = useActive();
  return (
    <button
      onClick={() => {
        chain //
          .toggleBold()
          .focus()
          .run();
      }}
      style={{ fontWeight: active.bold() ? 'bold' : undefined }}
    >
      B
    </button>
  );
};

interface Props {
  id: string;
  editable: boolean;
  content?: string | any | Object;
  setTestOnlyContentJSON?: any | Object;
}

function PodoteEditor({ id, editable, content, setTestOnlyContentJSON }: Props) {
  const { editItemText } = useTodoStore();

  const extensions = () => [
    new BoldExtension(),
    new ItalicExtension(),
    new StrikeExtension(),
    new UnderlineExtension(),
    new HeadingExtension(),
    new CalloutExtension({ defaultType: 'blank' }),
    new HistoryExtension(),
    new ImageExtension(),
    new DropCursorExtension({ color: '#7963d2', width: 4 }),
    new HorizontalRuleExtension(),
  ];

  const initialContent = {
    type: 'doc',
    content: [
      { type: 'heading', attrs: { level: 1 }, content: [{ type: 'text', text: 'Hello world' }] },
      {
        type: 'paragraph',
        content: [
          { type: 'text', text: 'Hello ' },
          { type: 'text', marks: [{ type: 'italic' }], text: 'word' },
        ],
      },
    ],
  };

  const { manager, state, setState } = useRemirror({
    extensions: extensions,
    content: content ? content : initialContent,
    selection: 'end',
  });

  const onChangeState = (parameter: any) => {
    // Update the state to the latest value.
    setState(parameter.state);

    // editor testing page only
    if (setTestOnlyContentJSON) setTestOnlyContentJSON(parameter.state.doc);
    else editItemText({ id, content: parameter.state.doc }); // main page update content object
  };

  return (
    <PodoteTheme id={'podote-theme'}>
      <ThemeProvider>
        <Remirror manager={manager} initialContent={state} onChange={onChangeState} editable={editable}>
          {editable ? <Menu /> : null}
          <EditorComponent />
        </Remirror>
      </ThemeProvider>
    </PodoteTheme>
  );
}

export default PodoteEditor;