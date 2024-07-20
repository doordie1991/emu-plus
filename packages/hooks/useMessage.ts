import { ElMessage, ElMessageBox } from 'element-plus'
// 显示时长
const duration = 2500
type MagType = 'success' | 'warning' | 'error'
export default function () {
    const message = (mag: string, type: MagType) => {
        return ElMessage({
            type: type,
            message: mag,
            showClose: true,
            center: true,
            duration
        })
    }

    const success = (msg: string) => {
        return message(msg, 'success')
    }

    const warning = (msg: string) => {
        return message(msg, 'warning')
    }

    const error = (msg: string) => {
        return message(msg, 'error')
    }

    const confirm = (msg: string, title: string = '提示', options: any = {}) => {
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
