import {Html, Paragraph, RootContent, Text} from "mdast";
import {toHast} from "mdast-util-to-hast";
import {toHtml} from "hast-util-to-html";

const processNotice = (node: any, index: number, parent: any, file: any) => {
    const allowedTypes = ['warning', 'important', 'note', 'tip', 'info'];
    const firstElementKey = Object.keys(node.attributes)[0];

    let currentType;

    // Require a `type` attribute, crash otherwise.
    if (Object.hasOwn(node.attributes, 'title')) {
        currentType = node.attributes.title;
    } else if (allowedTypes.indexOf(firstElementKey)) {
        currentType = firstElementKey;
    } else {
        file.fail("Expected `type` attribute on notice directive", node);
    }

    console.log('node', node)

    const content: Text = {
        type: 'text',
        value: 'Alpha bravo charlie.'
    };

    const div: Html = {
        type: "html",
        value: "<div>"
    };

    const paragraph: Paragraph = {
        type: "paragraph",
        children: [div, content]
    };

    // You also don’t want to *add* it to the directive, you want to *replace* the directive.
    const siblings: RootContent[] = parent.children;
    siblings.splice(index, 1, paragraph);

    const hast = toHast(node);
    const html = toHtml(hast)

    console.log(html)

    // node.children.unshift({
    //     type: 'containerDirective',
    //     children: [
    //         {
    //             type: 'svg',
    //             data: {
    //                 hName: 'svg',
    //                 hProperties: {
    //                     class: node.name + '-icon',
    //                     variant: currentType
    //                 }
    //             }
    //         },
    //         {
    //             type: 'paragraph',
    //             children: [
    //                 {
    //                     type: 'text',
    //                     value: 'some'
    //                 }
    //             ]
    //         }
    //     ],
    //     data: {
    //         hName: 'div',
    //         hProperties: {
    //             class: node.name + '-title'
    //         }
    //     }
    // });
    //
    // node.children[1].children.push(...node.children.splice(2))
    //
    // delete node.data.hProperties.title
    // node.data.hName = 'div'
    // node.data.hProperties = 'sc-notice' + currentType;
}

export default processNotice;