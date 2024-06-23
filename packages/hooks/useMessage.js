import { ElMessage, ElMessageBox } from 'element-plus'
// 显示时长
const duration = 2500

export default function () {
    const message = (message, type) => {
        return ElMessage({
            message,
            type,
            duration
        })
    }

    const success = (msg) => {
        return message(msg, 'success')
    }

    const warning = (msg) => {
        return message(msg, 'warning')
    }

    const error = (msg) => {
        return message(msg, 'error')
    }

    const confirm = (msg, title = '提示', options) => {
        return ElMessageBox.confirm(
            msg,
            title,
            Object.assign(
                {
                    confirmButtonText: '确认',
                    cancelButtonText: '取消',
                    type: 'warning'
                },
                options
            )
        )
    }

    return { success, warning, error, confirm }
}
