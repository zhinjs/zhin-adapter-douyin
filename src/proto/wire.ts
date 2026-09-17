/**
 * 无 schema 的 protobuf wire 协议编解码。
 * decWire 用于诊断与未知 IM 推送；varint/field 编码 helpers 来自帧构造。
 */

/** 无 schema 的 protobuf 字段，用于诊断与未知 IM 推送 */
export type Wf =
  | { field: number; type: 'varint'; value: bigint }
  | { field: number; type: 'fixed64'; value: Uint8Array }
  | { field: number; type: 'fixed32'; value: Uint8Array }
  | { field: number; type: 'string'; value: string }
  | { field: number; type: 'message'; value: Wf[] }
  | { field: number; type: 'bytes'; value: Uint8Array }

interface TreeField {
  f: number
  t: Wf['type']
  v: string | TreeField[]
}

const MAX_DEPTH = 8
const textDecoder = new TextDecoder('utf-8', { fatal: true })

function decVarint (data: Uint8Array, start: number): { value: bigint; next: number } | null {
  let value = 0n
  let shift = 0n
  for (let pos = start; pos < data.length && shift < 70n; pos += 1, shift += 7n) {
    const byte = data[pos]!
    value |= BigInt(byte & 0x7f) << shift
    if ((byte & 0x80) === 0) return { value, next: pos + 1 }
  }
  return null
}

function safeText (data: Uint8Array): string | null {
  try {
    const text = textDecoder.decode(data)
    for (const ch of text) {
      const code = ch.codePointAt(0)!
      if (code < 0x20 && code !== 0x09 && code !== 0x0a && code !== 0x0d) return null
    }
    return text
  } catch {
    return null
  }
}

/**
 * 尽力而为的 protobuf 解码器，用于 schema 未知的流量。
 * 截断帧不会抛异常：所有完整解码的字段都会被返回。
 */
export function decWire (data: Uint8Array, depth = 0): Wf[] {
  const fields: Wf[] = []
  let pos = 0
  while (pos < data.length) {
    const tag = decVarint(data, pos)
    if (!tag) break
    pos = tag.next
    const field = Number(tag.value >> 3n)
    const wireType = Number(tag.value & 7n)
    if (field === 0) break

    if (wireType === 0) {
      const item = decVarint(data, pos)
      if (!item) break
      pos = item.next
      fields.push({ field, type: 'varint', value: item.value })
      continue
    }
    if (wireType === 1 || wireType === 5) {
      const width = wireType === 1 ? 8 : 4
      if (pos + width > data.length) break
      const value = data.slice(pos, pos + width)
      pos += width
      fields.push({ field, type: wireType === 1 ? 'fixed64' : 'fixed32', value })
      continue
    }
    if (wireType !== 2) break

    const lengthItem = decVarint(data, pos)
    if (!lengthItem || lengthItem.value > BigInt(Number.MAX_SAFE_INTEGER)) break
    pos = lengthItem.next
    const length = Number(lengthItem.value)
    if (pos + length > data.length) break
    const raw = data.slice(pos, pos + length)
    pos += length

    const text = safeText(raw)
    const trimmed = text?.trimStart() ?? ''
    const knownText = trimmed.startsWith('{') || trimmed.startsWith('[') ||
      /^0:\d+:/.test(trimmed) || /^\d+$/.test(trimmed) || trimmed.startsWith('MS4') ||
      /^https?:\/\//.test(trimmed) || /^[0-9a-f]{8}-[0-9a-f-]{27,}$/i.test(trimmed)
    if (text != null && knownText) {
      fields.push({ field, type: 'string', value: text })
      continue
    }
    const nested = depth < MAX_DEPTH ? decWire(raw, depth + 1) : []
    if (nested.length > 0) fields.push({ field, type: 'message', value: nested })
    else if (text != null) fields.push({ field, type: 'string', value: text })
    else fields.push({ field, type: 'bytes', value: raw })
  }
  return fields
}

/** JSON 安全诊断树：bigint 转十进制字符串，bytes 转 base64 */
export function decTree (data: Uint8Array): TreeField[] {
  const convert = (field: Wf): TreeField => {
    if (field.type === 'message') {
      return { f: field.field, t: field.type, v: field.value.map(convert) }
    }
    if (field.type === 'varint') {
      return { f: field.field, t: field.type, v: field.value.toString() }
    }
    if (field.type === 'string') return { f: field.field, t: field.type, v: field.value }
    return { f: field.field, t: field.type, v: Buffer.from(field.value).toString('base64') }
  }
  return decWire(data).map(convert)
}

export function vint (value: number | bigint): Buffer {
  let remaining = BigInt(value)
  const bytes: number[] = []
  do {
    let byte = Number(remaining & 0x7fn)
    remaining >>= 7n
    if (remaining) byte |= 0x80
    bytes.push(byte)
  } while (remaining)
  return Buffer.from(bytes)
}

export function fv (field: number, value: number | bigint): Buffer {
  return Buffer.concat([vint(field << 3), vint(value)])
}

export function fb (field: number, value: Uint8Array): Buffer {
  return Buffer.concat([vint(field << 3 | 2), vint(value.length), Buffer.from(value)])
}

export function fstr (field: number, value: string): Buffer {
  return fb(field, Buffer.from(value))
}

/** 嵌套 map<string,string> 键值项：field { 1: key, 2: value } */
export function kv (field: number, key: string, value: string): Buffer {
  return fb(field, Buffer.concat([fstr(1, key), fstr(2, value)]))
}