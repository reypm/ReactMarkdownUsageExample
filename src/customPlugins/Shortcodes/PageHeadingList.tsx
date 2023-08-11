const processPageHeadingList = (node: any) => {
    const attrs = node.attributes;
    const minLevel = attrs['min-level'];
    const maxLevel = attrs['max-level'];

    node.children.splice(1, 0, {
        type: 'containerDirective',
        children: [],
        data: {
            hName: 'div',
            hProperties: {
                class: node.name + '-content'
            }
        }
    });

    const elements = node.children;
    let headings: any = [];

    elements.map((element: any) => {
        if (element.type === 'heading' && element.depth <= maxLevel && element.depth >= minLevel) {
            const listItemValue = element.children[0].hasOwnProperty('children')
                ? element.children[0].children[0].value
                : element.children[0].value;

            const headingListItem = {
                type: 'listitem',
                children: [
                    {
                        type: 'text',
                        value: listItemValue
                    }
                ],
                data: {
                    name: 'li'
                }
            }

            headings.push(headingListItem)
        }
    });

    node.children.unshift({
        type: 'list',
        children: headings,
        data: {
            hName: 'ul'
        }
    })

    node.data.hName = 'nav'
    node.data.hProperties.class = 'page-heading-list'
    node.data.hProperties.ariaLabel = 'Page Heading List'
}

export default processPageHeadingList;