import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig, InternalAxiosRequestConfig, AxiosResponse } from 'axios'
import qs from 'qs'
import dayjs from 'dayjs'
import { useTabsStore } from '@/store'
import { ElMessage } from 'element-plus'
import { router } from '../router'
import { IAppConfig, IRoute } from 'emu-plus/types'
import { getToken } from 'emu-plus/utils/token'
import { resolve } from 'path'

axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.headers.put['Content-Type'] = 'application/json'

// 请求超时（2分钟）
const TIME_OUT = 1000 * 60 * 2

// 消息提醒显示时长(ms)
const MESSAGE_DURATION = 1500

let _tabsStore: any

class Http {
    // axios实例
    _instance: AxiosInstance
    // 基础配置
    _baseConfig: AxiosRequestConfig = { baseURL: '/api', timeout: TIME_OUT }

    constructor(config: AxiosRequestConfig) {
        const cfg = Object.assign(this._baseConfig, config)
        this._instance = axios.create(cfg)

        _tabsStore = useTabsStore()

        // 请求前拦截
        this._instance.interceptors.request.use(
            (config: InternalAxiosRequestConfig) => {
                const _t = getToken()
                if (_t) {
                    config.headers.Authorization = 'Bearer ' + _t
                }

                return config
            },
            (error: any) => {
                return Promise.reject(error)
            }
        )

        // 相应后拦截
        this._instance.interceptors.response.use(
            (response: AxiosResponse) => {
                // 文件下载/预览
                if (config.responseType && config.responseType === 'blob') {
                    return handleDownload(response)
                }

                if (response.data.code === '0') {
                    return response.data.data || '0'
                } else if (response.data.code === '-1') {
                    _error(response.data.msg)
                    return Promise.reject(response.data.msg)
                } else {
                    return response
                }
            },
            (error: any) => {
                const currRoute = router.currentRoute.value
                const redirect = currRoute.name !== 'login' ? currRoute.fullPath : '/' // 跳转页面

                if (error && error.response) {
                    switch (error.response.status) {
                        case 401:
                            router.push({
                                name: 'login',
                                query: {
                                    redirect
                                }
                            })
                            break
                        case 403:
                            const page: IRoute = {
                                name: 'error403'
                            }
                            _tabsStore.close(-1, page)
                            break
                        default:
                            console.error(error.response.data.msg)
                            _error('系统异常，请联系管理员~')
                            break
                    }
                } else {
                    if (currRoute.name === 'login') {
                        _error('无法连接网络~')
                    } else {
                        router.push({ name: 'login', query: { redirect } })
                    }
                }

                return Promise.reject(error)
            }
        )
    }

    public request(config: AxiosRequestConfig): Promise<AxiosResponse> {
        return this._instance.request(config)
    }

    public get<T = any>(url: string, params?: object, config?: AxiosRequestConfig): Promise<AxiosResponse<RspResult<T>>> {
        const config_ = Object.assign({}, config, {
            // 参数
            params,
            // 修改参数序列化方法
            paramsSerializer: (p: any) => {
                // 使用逗号分隔参数
                return qs.stringify(p, {
                    allowDots: true
                })
            }
        })

        return this._instance.get(url, config_)
    }

    public post<T = any>(url: string, params?: object, config?: AxiosRequestConfig): Promise<AxiosResponse<RspResult<T>>> {
        return this._instance.post(url, params, config)
    }

    public put<T = any>(url: string, params?: object, config?: AxiosRequestConfig): Promise<AxiosResponse<RspResult<T>>> {
        return this._instance.put(url, params, config)
    }

    public delete<T = any>(url: string, params?: object, config?: AxiosRequestConfig): Promise<AxiosResponse<RspResult<T>>> {
        const config_ = Object.assign({}, config, {
            // 参数
            params,
            // 修改参数序列化方法
            paramsSerializer: (p: any) => {
                // 使用逗号分隔参数
                return qs.stringify(p, {
                    allowDots: true
                })
            }
        })

        return this._instance.delete(url, config_)
    }

    public download<T = any>(url: string, params?: object, config?: AxiosRequestConfig): Promise<AxiosResponse<RspResult<T>>> {
        const config_ = Object.assign({ responseType: 'blob' }, config, {
            // 参数
            params,
            // 修改参数序列化方法
            paramsSerializer: (p: any) => {
                // 使用逗号分隔参数
                return qs.stringify(p, {
                    allowDots: true
                })
            }
        })

        return this._instance.get(url, config_)
    }

    public preview<T = any>(url: string, params?: object, config?: AxiosRequestConfig): Promise<AxiosResponse<RspResult<T>>> {
        const config_ = Object.assign({ responseType: 'blob', headers: { preview: true } }, config, {
            // 参数
            params,
            // 修改参数序列化方法
            paramsSerializer: (p: any) => {
                // 使用逗号分隔参数
                return qs.stringify(p, {
                    allowDots: true
                })
            }
        })

        return this._instance.get(url, config_)
    }

    public export<T = any>(url: string, params?: object, config?: AxiosRequestConfig): Promise<AxiosResponse<RspResult<T>>> {
        return this._instance.post(url, params, Object.assign({ responseType: 'blob' }, config))
    }

    public mockRequest(method: string, url: string, data?: any): Promise<any> {
        return new Promise(async (resolve) => {
            const rsp = await axios({ method, url, data })
            return resolve(rsp.data)
        })
    }
}

// 错误提示
const _error = (msg: string) => {
    ElMessage({
        type: 'error',
        message: msg,
        showClose: true,
        center: true,
        duration: MESSAGE_DURATION
    })
}

// 处理文件下载请求
const handleDownload = (response: AxiosResponse) => {
    //如果返回的是application/json，则表示返回的是json，没有要下载的问题，可能是逻辑处理失败
    if (response.data.type === 'application/json') {
        var reader = new FileReader()
        reader.readAsText(response.data)
        reader.onload = (e) => {
            _error('下载失败')
        }

        return Promise.reject('下载文件失败')
    }

    const url = window.URL.createObjectURL(response.data)

    // 如果是预览直接返回
    if (response.config.headers['preview']) return url

    let fileName = ''
    if (response.config.params && response.config.params.exportTitle) {
        fileName = `${response.config.params.exportTitle}${dayjs().format('YYYYMMDD')}.xls`
    } else {
        // 如果响应头包含'content-disposition'属性，则从该属性中获取文件名称
        if (response.headers['content-disposition']) {
            fileName = decodeURI(
                response.headers['content-disposition']
                    .split(';')
                    .find((m: any) => m.trim().startsWith('filename='))
                    .split('=')[1]
            )
                .replace('"', '')
                .replace('"', '')
        }
    }

    // 如果文件名不存在，则使用时间戳
    if (!fileName) {
        fileName = dayjs().format('YYYYMMDDHHMMSSS')
    }

    // 通过模拟a标签点击事件下载文件
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', fileName)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
}

export default (config: IAppConfig) => {
    if (Emu.$http) {
        return Emu.$http
    } else {
        const { httpCfg } = config
        Emu.$http = new Http({
            baseURL: httpCfg.serviceUrl
        })

        return Emu.$http
    }
}
