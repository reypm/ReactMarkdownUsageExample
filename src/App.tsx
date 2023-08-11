import React, {useState} from 'react';
import './App.css';
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkDirective from "remark-directive";
import remarkFrontmatter from "remark-frontmatter";
import remarkBreaks from "remark-breaks";
import remarkUnwrapImages from "remark-unwrap-images";
import rehypeSlug from "rehype-slug";
import rehypeExternalLinks from "rehype-external-links";
import shortcodePlugin from "./customPlugins/ShortcodePlugin";

const imgLinks = require("@pondorasti/remark-img-links")

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
                    remarkGfm,
                    remarkDirective,
                    [remarkFrontmatter, ['yaml', 'toml']],
                    remarkBreaks,
                    remarkUnwrapImages,
                    shortcodePlugin,
                    [imgLinks, {absolutePath: "https://dummyimage.com/"}]
                ]}
                rehypePlugins={[
                    rehypeSlug,
                    rehypeExternalLinks
                ]}
            >
                {shortcodeContent}
            </ReactMarkdown>
        </div>
    );
}

export default App;
