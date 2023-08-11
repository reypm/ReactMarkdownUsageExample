import type {Image, Paragraph, RootContent} from "mdast";

const processImage = (node, index, parent) => {
    const url = node.attributes.id;

    // Create a markdown image node.
    const img: Image = {
        type: "image",
        url,
        alt: node.attributes.alt || undefined,
        title: null
    };

    // Images cannot be directly in things.
    // They are phrasing content.
    const paragraph: Paragraph = {
        type: "paragraph",
        children: [img]
    };

    // You also don’t want to *add* it to the directive,
    // you want to *replace* the directive.
    const siblings: RootContent[] = parent.children;

    // Replace directive with paragraph.
    siblings.splice(index, 1, paragraph);
}

export default processImage;