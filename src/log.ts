import { getLogger } from '@zhin.js/logger';

/** 模块级默认日志（核心协议层使用；endpoint 使用 getAdapterLogger 生成账号级 logger） */
export const log = getLogger('douyin');