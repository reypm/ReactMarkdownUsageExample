/// <reference types="remark-directive" />
import type {Root} from "mdast";
import {visit} from "unist-util-visit";

import processImage from "./Shortcodes/Image";
import processNotice from "./Shortcodes/Notice";
import processPageHeadingList from "./Shortcodes/PageHeadingList";

/**
 * Plugin to support custom directives.
 */
const shortcodePlugin: import("unified").Plugin<[], Root> = function () {
    return (tree) => {
        visit(tree, (node, index, parent) => {
            if (
                node.type === "containerDirective" &&
                typeof index === "number" &&
                parent
            ) {
                switch (node.name) {
                    case 'image':
                        processImage(node, index, parent);
                        break;
                    case 'notice':
                        //processNotice(node);
                        break;
                    case 'page-heading-list':
                        //processPageHeadingList(node);
                        break;
                }
            }
        });
    };
};

export default shortcodePlugin;