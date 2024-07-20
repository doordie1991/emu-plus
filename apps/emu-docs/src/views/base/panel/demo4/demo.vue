<template>
    <em-panel v-bind="model">
        <el-alert
            title="面板页"
            type="warning"
            description="通过设置 page 属性为true，可以让面板变成一个面板页，面板页高度会自动填充满整个父级元素，当内容超出时会有滚动条"
            show-icon
            closable
        ></el-alert>
        <pre>
      假如生活欺骗了你

      假如生活欺骗了你，

      不要悲伤，不要心急！

      忧郁的日子里须要镇静：

      相信吧，快乐的日子将会来临！

      心儿永远向往着未来；

      现在却常是忧郁。

      一切都是瞬息，一切都将会过去；
      
      而那过去了的，就会成为亲切的怀恋
    </pre
        >

        <template #footer>
            <em-button type="success" @click="onClick">确认</em-button>
        </template>
    </em-panel>
</template>
<script lang="ts" setup>
import { reactive } from 'vue'
import { useMessage } from 'emu-plus/hooks'
const _message = useMessage()
const model = reactive({
    title: '面板页',
    page: true,
    header: true,
    footer: true,
    icon: 'app',
    fullscreen: true,
    collapse: true
})

const onClick = () => {
    _message.success('保存成功')
}
</script>
