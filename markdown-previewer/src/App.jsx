import React from "react";
import { connect, Provider } from "react-redux";
import { createStore } from "redux";
import { marked } from "marked";

// Configure marked
marked.setOptions({
  breaks: true,
  gfm: true,
});

const defaultMarkdown = `# Welcome to the Markdown Previewer!

## This is a sub-heading...

[Click here to visit FreeCodeCamp](https://www.freecodecamp.org)

Inline code: \`const x = 42;\`

\`\`\`javascript
function greet() {
  console.log("Hello, world!");
}
\`\`\`

- List item 1
- List item 2

> Blockquote: “Markdown is awesome!”

**This text is bold**

![FCC Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)
`;

const UPDATE_MARKDOWN = "UPDATE_MARKDOWN";

const updateMarkdown = (text) => ({
  type: UPDATE_MARKDOWN,
  payload: text,
});

const reducer = (state = defaultMarkdown, action) => {
  switch (action.type) {
    case UPDATE_MARKDOWN:
      return action.payload;
    default:
      return state;
  }
};

const store = createStore(reducer);

// Editor Component
const Editor = ({ markdown, updateMarkdown }) => (
  <div className="editor-container">
    <label htmlFor="editor" className="form-label fw-bold">
      Editor
    </label>
    <textarea
      id="editor"
      className="markdown-box"
      rows={10}
      value={markdown}
      onChange={(e) => updateMarkdown(e.target.value)}
    />
  </div>
);

const mapEditorStateToProps = (state) => ({ markdown: state });
const mapEditorDispatchToProps = { updateMarkdown };
const ConnectedEditor = connect(
  mapEditorStateToProps,
  mapEditorDispatchToProps
)(Editor);

// Preview Component
const Preview = ({ markdown }) => (
  <div className="preview-container">
    <label htmlFor="preview" className="form-label fw-bold">
      Preview
    </label>
    <div
      id="preview"
      className="markdown-box"
      dangerouslySetInnerHTML={{ __html: marked.parse(markdown) }}
    />
  </div>
);

const mapPreviewStateToProps = (state) => ({ markdown: state });
const ConnectedPreview = connect(mapPreviewStateToProps)(Preview);

// App Component
const App = () => (
  <Provider store={store}>
    <div id="app" className="container mt-4">
      <h2 className="text-center mb-4">📝 Markdown Previewer (with Redux!)</h2>
      <ConnectedEditor />
      <ConnectedPreview />
    </div>
  </Provider>
);

export default App;
