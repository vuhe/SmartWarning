import { v4 as uuidv4 } from 'uuid';

/**
 * 生成全局唯一标识符 uuid
 * @returns {string} uuid like "ffb7cefd-02cb-4853-8238-c0292cf988d5"
 */
export default function uuid(): string {
  // const uuid = uuidv4();
  return uuidv4();
}
