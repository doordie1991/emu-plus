import { IDocAttrs } from '@/types'

const attrs: IDocAttrs[] = [
    {
        name: 'size',
        desc: '尺寸，默认按照框架的字号设置',
        type: 'String',
        opt: 'medium / small / mini',
        def: '-'
    },
    {
        name: 'type',
        desc: '类型，与ElementUI相同',
        type: 'String',
        opt: 'primary/success/warning/danger/info/text',
        def: '-'
    },
    {
        name: 'plain',
        desc: '是否朴素按钮',
        type: 'boolean',
        opt: '-',
        def: 'false'
    },
    {
        name: 'round',
        desc: '是否圆角按钮',
        type: 'boolean',
        opt: '-',
        def: 'false'
    },
    {
        name: 'circle',
        desc: '是否圆形按钮',
        type: 'boolean',
        opt: '-',
        def: 'false'
    },
    {
        name: 'loading',
        desc: '是否加载中状态',
        type: 'boolean',
        opt: '-',
        def: 'false'
    },
    {
        name: 'disabled',
        desc: '是否禁用状态',
        type: 'boolean',
        opt: '-',
        def: 'false'
    },
    {
        name: 'autofocus',
        desc: '是否默认聚焦',
        type: 'boolean',
        opt: '-',
        def: 'false'
    },
    {
        name: 'nativeType',
        desc: '原生 type 属性 button/submit/reset',
        type: 'String',
        opt: '-',
        def: '-'
    },
    {
        name: 'icon',
        desc: '图标，只能使用图标库中已有的图标',
        type: 'String',
        opt: '-',
        def: '-'
    },
    {
        name: 'iconPosition',
        desc: '图标位置',
        type: 'String',
        opt: 'left/right',
        def: 'left'
    },
    {
        name: 'text',
        desc: '按钮文本',
        type: 'String',
        opt: '-',
        def: '-'
    },
    {
        name: 'code',
        desc: '按钮编码，用于按钮权限控制',
        type: 'String',
        opt: '-',
        def: '-'
    }
]

export default attrs
