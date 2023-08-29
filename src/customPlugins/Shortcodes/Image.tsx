import type { Image, Paragraph, RootContent } from 'mdast'
import { ContainerDirective, LeafDirectiveData } from 'mdast-util-directive'
import { VFile } from 'vfile'

const processImage = (
    node: ContainerDirective | LeafDirectiveData,
    index: number,
    parent: any,
    file: VFile
) => {
    let url: string = ''

    // Require a `url` attribute, crash otherwise.
    if ('attributes' in node && node.attributes !== null) {
        url = node.attributes.id
    } else {
        file.fail('Expected `url` attribute on image directive', node)
    }

    const img: Image = {
        type: 'image',
        url: url,
        alt: node.attributes.alt || undefined,
        title: null,
    }

    const paragraph: Paragraph = {
        type: 'paragraph',
        children: [img],
    }

    // You also don’t want to *add* it to the directive, you want to *replace* the directive.
    const siblings: RootContent[] = parent.children
    siblings.splice(index, 1, paragraph)
}

export default processImage
