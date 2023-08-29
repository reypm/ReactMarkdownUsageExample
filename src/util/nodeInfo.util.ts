export const getNodeInfo = (node: any) => {
    const data = node.data || (node.data = {})
    data.hProperties = node.attributes

    return {
        data: data,
        newNode: node,
    }
}
