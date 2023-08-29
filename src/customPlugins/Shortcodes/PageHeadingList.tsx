import { ContainerDirective, LeafDirective } from 'mdast-util-directive'
import { toc } from 'mdast-util-toc'

const processPageHeadingList = (
    node: ContainerDirective | LeafDirective,
    index: number,
    parent: any
) => {
    let minLevel: number = 1
    let maxLevel: number = 6
    const hasAttributes = node.hasOwnProperty('attributes')

    if (hasAttributes) {
        if (
            node.attributes?.['min-level'] !== undefined &&
            node.attributes?.['min-level'] !== null
        ) {
            minLevel = parseInt(node.attributes?.['min-level'])
        }

        if (
            node.attributes?.['max-level'] !== undefined &&
            node.attributes?.['max-level'] !== null
        ) {
            maxLevel = parseInt(node.attributes?.['max-level'])
        }
    }

    node.data = node.data ?? {}
    node.data.hName = 'nav'
    node.data.hProperties = {
        className: 'page-heading-list',
        ariaLabel: 'Page heading list',
    }

    const parentChildren = parent.children
    let headings: any = []

    // eslint-disable-next-line array-callback-return
    parentChildren.map((element: any) => {
        if (
            element.type === 'heading' &&
            element.depth <= maxLevel &&
            element.depth >= minLevel
        ) {
            headings.push(element)
        }
    })

    const tree: import('mdast').Root = {
        type: 'root',
        children: headings,
    }

    const table = toc(tree, { tight: true })

    if (
        table !== undefined &&
        table.hasOwnProperty('map') &&
        table.map !== undefined
    ) {
        parent.children.splice(index, 1, table.map)
    }
}

export default processPageHeadingList
