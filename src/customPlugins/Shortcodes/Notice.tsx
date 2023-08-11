const processNotice = (node: any) => {
    const allowedTypes = ['warning', 'important', 'note', 'tip', 'info'];
    const currentType = Object.keys(node.attributes)[0];

    if (allowedTypes.indexOf(currentType) === -1) {
        throw new Error('Invalid notice type: ' + currentType);
    }

    node.children.unshift({
        type: 'containerDirective',
        children: [
            {
                type: 'svg',
                data: {
                    hName: 'svg',
                    hProperties: {
                        class: node.name + '-icon',
                        variant: currentType
                    }
                }
            },
            {
                type: 'paragraph',
                children: [
                    {
                        type: 'text',
                        value: 'some'
                    }
                ]
            }
        ],
        data: {
            hName: 'div',
            hProperties: {
                class: node.name + '-title'
            }
        }
    });

    node.children[1].children.push(...node.children.splice(2))

    delete node.data.hProperties.title
    node.data.hName = 'div'
    node.data.hProperties = 'sc-notice' + currentType;
}

export default processNotice;