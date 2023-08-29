import type {Root} from "mdast";
import {visit} from "unist-util-visit";
import {VFile} from "vfile";
import processPageHeadingList from "./Shortcodes/PageHeadingList";
import processImage from "./Shortcodes/Image";

/**
 * Plugin to support custom directives.
 *
 * @type import("unified").Plugin<void[], Root>
 */
const myRemarkShortcodePlugin: import("unified").Plugin<[], Root> = function () {
    return (tree: Root, file: VFile) => {
        visit(tree, (node, index, parent) => {
            if ("name" in node && typeof index === "number" && parent) {
                if (node.type === "containerDirective" || node.type === "leafDirective") {
                    switch (node.name) {
                        case "page-heading-list":
                            processPageHeadingList(node, index, parent)
                            break;
                        case "image":
                            processImage(node, index, parent, file)
                            break;
                    }
                } else if (node.type === "textDirective" || node.type === "leafDirective") {
                    // some code
                }
            }
        });
    };
};

export default myRemarkShortcodePlugin;