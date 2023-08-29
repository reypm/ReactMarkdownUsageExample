import React, {useState} from 'react';
import './App.css';
import ReactMarkdown from "react-markdown";
import remarkDirective from "remark-directive";
import myRemarkShortcodePlugin from "./customPlugins/myRemarkShortcodePlugin";
import rehypeSlug from "rehype-slug";

function App() {
    const readmePath = require("./shortcode.md");
    const [shortcodeContent, setShortcodeContent] = useState('');

    fetch(readmePath)
        .then(response => {
            return response.text()
        })
        .then(text => {
            setShortcodeContent(text)
        })

    return (
        <div className="App">
            <ReactMarkdown
                remarkPlugins={[
                    remarkDirective,
                    myRemarkShortcodePlugin,
                ]}
                rehypePlugins={[
                    rehypeSlug
                ]}
            >
                {shortcodeContent}
            </ReactMarkdown>
        </div>
    );
}

export default App;
