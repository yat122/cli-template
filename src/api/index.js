import { instanceClient } from "@/public/client";

/**
 * 获取信息
 */
export const FetchInfo = () => instanceClient.get("/info");
