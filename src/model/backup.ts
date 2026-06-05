/**
 * 备份任务
 */
export type BackupJob = {
    /**
     * 任务编号
     */
    id: number
    /**
     * 负责执行任务的女仆节点
     */
    maidId: number
    /**
     * 备份任务名称
     */
    jobName: string //备份任务名称
    /**
     * 备份模式(全量/增量)
     */
    mode: "full" | "incremental" 
    /**
     * 全量备份的cron表达式，留空表示不做全量备份
     */
    cron: string 
    /**
     * 需要备份的文件/文件夹路径
     */
    source: string 
    /**
     * 任务开关
     */
    switch: "on" | "off" 
    /**
     * 备份存储方式
     */
    target: {
        /**
         * 存储方式(本地存储/ftp服务器/腾讯cos对象存储)
         */
        type: "local" | "ftp" | "tencent_cos"
        /**
         * 存储url
         */
        url: string
        /**
         * 附加信息
         */
        extra?: {
            ftp?: {
                credential: {
                    /**
                     * ftp用户名
                     */
                    username: string 
                    /**
                     * ftp密码
                     */
                    password: string 
                }
            }
            tencentCos?: {
                /**
                 * 备用链接
                 */
                fallbackUrls: string[]
            }
        }
    }
}