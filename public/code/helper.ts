// 创建元素，例如 div
export function element(tagName: string) {
    return document.createElement(tagName)
}

// 创建文字
export function text(value: string) {
    return document.createTextNode(value)
}

// 在某个锚点前插入元素
export function insert(node: Node, child: Node, anchor: Node) {
    node.insertBefore(child, anchor)
}

// 插入到元素子列表的最后
export function append(node: Node, child: Node) {
    node.appendChild(child)
}

// 移除某个元素
export function remove(node: Element) {
    node.remove()
}

// 更新文本节点文本信息
export function setText(node: Node, text: string) {
    node.textContent = text
}
