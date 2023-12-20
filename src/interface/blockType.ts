export enum E_PARAGRAPH_TYPE {
    /** 默认段落 */
    paragraph = 'paragraph',
    /** 代码块 */
    codeBlock = "codeBlock",
    /** 需求条目 */
    requirement = "requirement",
    /** 图片 */
    image = 'image',
    /** 链接 */
    link = 'link',
    /** 引用 */
    quote = 'quote',
    /** 标题 */
    heading = 'heading',
    /* 列表成员(li) */
    listItem = 'listItem',
    /* 有序列表 */
    numberedList = 'numberedList',
    /* 无序列表 */
    bulletedList = 'bulletedList',
}

export enum E_LEAF_TYPE {
    /** 粗体 */
    bold = "bold",
    /** 内联代码 */
    inLineCode = "inLineCode",
    /** 删除线 */
    strikethrough = 'strikethrough',
    /** 斜体 */
    italic = 'italic',
    /** 下划线 */
    underline = 'underline',
}