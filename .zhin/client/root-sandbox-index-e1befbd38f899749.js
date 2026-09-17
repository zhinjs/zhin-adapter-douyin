// zhin-virtual:zhin-console-contract-stub
function definePage(metadata = {}) {
  return metadata;
}

// node_modules/.pnpm/@zhin.js+adapter-sandbox@1.1.0_@ai-sdk+openai@4.0.69_zod@4.6.5__@zhin.js+adapter@1.1.12_@zhin_afugtif7f4xa45ozkajeyq4koy/node_modules/@zhin.js/adapter-sandbox/pages/SandboxChat.js
import { jsx as _jsx4, jsxs as _jsxs3 } from "/esm/react~jsx-runtime.mjs?v=mu5z5rv8";
import React2, { useState as useState4, useEffect as useEffect3, useRef as useRef3, useMemo as useMemo3, useCallback as useCallback3 } from "/esm/react.mjs?v=mu5z5rv8";

// node_modules/.pnpm/@zhin.js+console-protocol@1.1.5/node_modules/@zhin.js/console-protocol/lib/index.js
var SIDE_EVENT_PUSH = {
  NOTICE_RECEIVE: "notice.receive",
  REQUEST_RECEIVE: "request.receive",
  MESSAGE_RECEIVE: "message.receive",
  ENDPOINT_LIFECYCLE: "endpoint.lifecycle",
  LOGIN_PENDING: "endpoint.login.pending",
  LOGIN_EXPIRED: "endpoint.login.expired"
};
var SIDE_EVENT_RPC = {
  REQUEST_LIST: "request.list",
  REQUEST_APPROVE: "request.approve",
  REQUEST_REJECT: "request.reject",
  REQUEST_CONSUMED: "request.consumed",
  NOTICE_CONSUMED: "notice.consumed"
};
var LOGIN_RPC = {
  LIST: "login.list",
  SUBMIT: "login.submit",
  CANCEL: "login.cancel"
};
var INBOX_RPC = {
  MESSAGES: "inbox.messages",
  REQUESTS: "inbox.requests",
  NOTICES: "inbox.notices"
};
var ENDPOINT_RPC = {
  LIST: "endpoint.list",
  INFO: "endpoint.info",
  SEND_MESSAGE: "endpoint.send_message",
  FRIENDS: "endpoint.friends",
  GROUPS: "endpoint.groups",
  CHANNELS: "endpoint.channels",
  DELETE_FRIEND: "endpoint.delete_friend",
  GROUP_MEMBERS: "endpoint.group_members",
  GROUP_KICK: "endpoint.group_kick",
  GROUP_MUTE: "endpoint.group_mute",
  GROUP_ADMIN: "endpoint.group_admin"
};
var SIDE_EVENT_NAMES = {
  ...SIDE_EVENT_PUSH,
  ...SIDE_EVENT_RPC,
  ...INBOX_RPC,
  ...ENDPOINT_RPC,
  ...LOGIN_RPC
};
var PUSH_TYPE_ALIASES = Object.freeze({
  "endpoint:message": SIDE_EVENT_PUSH.MESSAGE_RECEIVE,
  "endpoint:request": SIDE_EVENT_PUSH.REQUEST_RECEIVE,
  "endpoint:notice": SIDE_EVENT_PUSH.NOTICE_RECEIVE,
  "endpoint:lifecycle": SIDE_EVENT_PUSH.ENDPOINT_LIFECYCLE
});
var RPC_TYPE_ALIASES = Object.freeze({
  "endpoint:list": ENDPOINT_RPC.LIST,
  "endpoint:info": ENDPOINT_RPC.INFO,
  "endpoint:sendMessage": ENDPOINT_RPC.SEND_MESSAGE,
  "endpoint:friends": ENDPOINT_RPC.FRIENDS,
  "endpoint:groups": ENDPOINT_RPC.GROUPS,
  "endpoint:channels": ENDPOINT_RPC.CHANNELS,
  "endpoint:deleteFriend": ENDPOINT_RPC.DELETE_FRIEND,
  "endpoint:groupMembers": ENDPOINT_RPC.GROUP_MEMBERS,
  "endpoint:groupKick": ENDPOINT_RPC.GROUP_KICK,
  "endpoint:groupMute": ENDPOINT_RPC.GROUP_MUTE,
  "endpoint:groupAdmin": ENDPOINT_RPC.GROUP_ADMIN,
  "endpoint:requests": SIDE_EVENT_RPC.REQUEST_LIST,
  "endpoint:requestApprove": SIDE_EVENT_RPC.REQUEST_APPROVE,
  "endpoint:requestReject": SIDE_EVENT_RPC.REQUEST_REJECT,
  "endpoint:requestConsumed": SIDE_EVENT_RPC.REQUEST_CONSUMED,
  "endpoint:noticeConsumed": SIDE_EVENT_RPC.NOTICE_CONSUMED,
  "endpoint:inboxMessages": INBOX_RPC.MESSAGES,
  "endpoint:inboxRequests": INBOX_RPC.REQUESTS,
  "endpoint:inboxNotices": INBOX_RPC.NOTICES
});
var DEMO_RPC_ALLOWLIST = /* @__PURE__ */ new Set([
  "ping",
  "entries:get",
  "pages:list",
  "config:get",
  "config:get-all",
  "config:get-yaml",
  "schema:get",
  "schema:get-all",
  "workrooms:get",
  "schedule:list",
  "cron:list",
  ENDPOINT_RPC.LIST,
  ENDPOINT_RPC.INFO,
  ENDPOINT_RPC.FRIENDS,
  ENDPOINT_RPC.GROUPS,
  ENDPOINT_RPC.CHANNELS,
  ENDPOINT_RPC.GROUP_MEMBERS,
  SIDE_EVENT_RPC.REQUEST_LIST,
  LOGIN_RPC.LIST,
  INBOX_RPC.MESSAGES,
  INBOX_RPC.REQUESTS,
  INBOX_RPC.NOTICES
]);
var DEMO_RPC_WRITE_BLOCKLIST = /* @__PURE__ */ new Set([
  "config:set",
  "config:save-yaml",
  "files:save",
  "env:save",
  "db:insert",
  "db:update",
  "db:delete",
  "db:drop-table",
  "db:kv:set",
  "db:kv:delete",
  "system:restart",
  "schedule:add",
  "schedule:remove",
  "schedule:pause",
  "schedule:resume",
  "cron:add",
  "cron:remove",
  "cron:pause",
  "cron:resume",
  SIDE_EVENT_RPC.REQUEST_APPROVE,
  SIDE_EVENT_RPC.REQUEST_REJECT,
  SIDE_EVENT_RPC.REQUEST_CONSUMED,
  SIDE_EVENT_RPC.NOTICE_CONSUMED,
  LOGIN_RPC.SUBMIT,
  LOGIN_RPC.CANCEL,
  ENDPOINT_RPC.SEND_MESSAGE,
  ENDPOINT_RPC.GROUP_KICK,
  ENDPOINT_RPC.GROUP_MUTE,
  ENDPOINT_RPC.GROUP_ADMIN,
  ENDPOINT_RPC.DELETE_FRIEND
]);

// node_modules/.pnpm/@zhin.js+client@1.1.5_@ai-sdk+openai@4.0.69_zod@4.6.5__ai@7.0.105_zod@4.6.5__react@19.3.0_zod@4.6.5/node_modules/@zhin.js/client/dist/mediaSrc.js
var BASE64_PROTO = "base64://";
var SAFE_DATA_MIME = Object.freeze({
  image: /* @__PURE__ */ new Set(["image/avif", "image/gif", "image/jpeg", "image/png", "image/webp"]),
  video: /* @__PURE__ */ new Set(["video/mp4", "video/ogg", "video/webm"]),
  audio: /* @__PURE__ */ new Set(["audio/mpeg", "audio/mp4", "audio/ogg", "audio/wav", "audio/webm"])
});
function resolveSafeRemoteUrl(value) {
  try {
    const parsed = new URL(value);
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:" && parsed.protocol !== "blob:") {
      return void 0;
    }
    if (parsed.username || parsed.password)
      return void 0;
    return parsed.href;
  } catch {
    return void 0;
  }
}
function resolveSafeDataUrl(value, kind) {
  if (!value.startsWith("data:"))
    return void 0;
  const separator = value.indexOf(",");
  if (separator < 0)
    return void 0;
  const header = value.slice("data:".length, separator).toLowerCase();
  if (!header.endsWith(";base64"))
    return void 0;
  const mime = header.slice(0, -";base64".length);
  if (!SAFE_DATA_MIME[kind].has(mime))
    return void 0;
  const payload = compactBase64(value.slice(separator + 1));
  return payload ? `data:${mime};base64,${payload}` : void 0;
}
function compactBase64(value) {
  let compact = "";
  for (const character of value) {
    if (character === " " || character === "\n" || character === "\r" || character === "	")
      continue;
    const code = character.charCodeAt(0);
    const allowed = code >= 48 && code <= 57 || code >= 65 && code <= 90 || code >= 97 && code <= 122 || character === "+" || character === "/" || character === "=";
    if (!allowed)
      return void 0;
    compact += character;
  }
  const padding = compact.indexOf("=");
  if (padding >= 0 && (compact.length - padding > 2 || compact.slice(padding).replace(/=/g, "") !== "")) {
    return void 0;
  }
  return compact || void 0;
}
function resolveMediaSrc(raw, kind = "image") {
  if (raw == null || typeof raw !== "string")
    return void 0;
  const s = raw.trim();
  if (!s)
    return void 0;
  const dataUrl = resolveSafeDataUrl(s, kind);
  if (dataUrl)
    return dataUrl;
  const remoteUrl = resolveSafeRemoteUrl(s);
  if (remoteUrl)
    return remoteUrl;
  if (!s.startsWith(BASE64_PROTO)) {
    return void 0;
  }
  const payload = s.slice(BASE64_PROTO.length).trimStart();
  if (!payload)
    return void 0;
  const declared = resolveSafeDataUrl(`data:${payload}`, kind);
  if (declared) {
    return declared;
  }
  const defaultMime = kind === "image" ? "image/png" : kind === "video" ? "video/mp4" : "audio/mpeg";
  const b64 = compactBase64(payload);
  return b64 ? `data:${defaultMime};base64,${b64}` : void 0;
}
function pickMediaRawUrl(data) {
  if (!data)
    return void 0;
  const media = data.media;
  if (media && typeof media === "object" && media !== null) {
    const value = media.value;
    if (typeof value === "string" && value.trim())
      return value.trim();
  }
  const v = data.url ?? data.file ?? data.src ?? data.href;
  if (typeof v === "string" && v.trim())
    return v.trim();
  const b64 = data.base64;
  if (typeof b64 === "string" && b64.trim()) {
    const payload = b64.trim();
    if (payload.startsWith("data:") || payload.startsWith("base64://") || payload.startsWith("http://") || payload.startsWith("https://")) {
      return payload;
    }
    const mime = typeof data.mime === "string" && data.mime.trim() ? data.mime.trim() : "";
    return mime ? `data:${mime};base64,${payload.replace(/\s/g, "")}` : `base64://${payload}`;
  }
  return void 0;
}

// node_modules/.pnpm/@zhin.js+client@1.1.5_@ai-sdk+openai@4.0.69_zod@4.6.5__ai@7.0.105_zod@4.6.5__react@19.3.0_zod@4.6.5/node_modules/@zhin.js/client/dist/message-content/MarkdownContent.js
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "/esm/react~jsx-runtime.mjs?v=mu5z5rv8";
import { Fragment, useMemo, useState } from "/esm/react.mjs?v=mu5z5rv8";

// node_modules/.pnpm/@zhin.js+client@1.1.5_@ai-sdk+openai@4.0.69_zod@4.6.5__ai@7.0.105_zod@4.6.5__react@19.3.0_zod@4.6.5/node_modules/@zhin.js/client/dist/message-content/markdown.js
var INLINE_PATTERN = /(`[^`\n]+`)|(\*\*[^*\n]+\*\*|__[^_\n]+__)|(~~[^~\n]+~~)|(\*[^*\n]+\*|_[^_\n]+_)|(\[[^\[\]\n]+\]\([^\s()]+(?:\s+"[^"\n]*")?\))|(https?:\/\/[^\s<>()]+)/g;
var TABLE_DIVIDER = /^\s*\|?\s*:?-{3,}:?\s*(?:\|\s*:?-{3,}:?\s*)+\|?\s*$/;
function isSafeMarkdownHref(href) {
  const value = href.trim();
  if (!value)
    return false;
  if (/^(https?:|mailto:)/i.test(value))
    return true;
  return /^(\/|#|\.\/|\.\.\/)/.test(value);
}
function parseMarkdownInline(value) {
  const tokens = [];
  let cursor = 0;
  let match;
  INLINE_PATTERN.lastIndex = 0;
  while ((match = INLINE_PATTERN.exec(value)) !== null) {
    if (match.index > cursor)
      tokens.push({ type: "text", value: value.slice(cursor, match.index) });
    const raw = match[0];
    if (match[1]) {
      tokens.push({ type: "code", value: raw.slice(1, -1) });
    } else if (match[2]) {
      tokens.push({ type: "strong", value: raw.slice(2, -2) });
    } else if (match[3]) {
      tokens.push({ type: "strike", value: raw.slice(2, -2) });
    } else if (match[4]) {
      tokens.push({ type: "emphasis", value: raw.slice(1, -1) });
    } else if (match[5]) {
      const parsed = raw.match(/^\[([^\[\]]+)\]\(([^\s()]+)(?:\s+"[^"\n]*")?\)$/);
      if (parsed && isSafeMarkdownHref(parsed[2])) {
        tokens.push({ type: "link", value: parsed[1], href: parsed[2] });
      } else {
        tokens.push({ type: "text", value: raw });
      }
    } else if (match[6]) {
      tokens.push({ type: "link", value: raw, href: raw });
    }
    cursor = INLINE_PATTERN.lastIndex;
  }
  if (cursor < value.length)
    tokens.push({ type: "text", value: value.slice(cursor) });
  const merged = [];
  for (const token of tokens) {
    const previous = merged.at(-1);
    if (token.type === "text" && previous?.type === "text") {
      merged[merged.length - 1] = { type: "text", value: previous.value + token.value };
    } else {
      merged.push(token);
    }
  }
  return merged.length > 0 ? merged : [{ type: "text", value }];
}
function splitTableRow(line) {
  return line.trim().replace(/^\|/, "").replace(/\|$/, "").split(/(?<!\\)\|/).map((cell) => cell.trim().replace(/\\\|/g, "|"));
}
function startsBlock(lines, index) {
  const line = lines[index] ?? "";
  return /^(?:```|~~~|#{1,6}\s+|>\s?|\s*(?:[-+*]|\d+[.)])\s+|\s*(?:-{3,}|\*{3,}|_{3,})\s*$)/.test(line) || line.includes("|") && TABLE_DIVIDER.test(lines[index + 1] ?? "");
}
function parseMarkdown(value) {
  const lines = value.replace(/\r\n?/g, "\n").split("\n");
  const blocks = [];
  let index = 0;
  while (index < lines.length) {
    const line = lines[index];
    if (!line.trim()) {
      index += 1;
      continue;
    }
    const fence = line.match(/^\s*(```|~~~)\s*([^\s`]*)?.*$/);
    if (fence) {
      const marker = fence[1];
      const language = (fence[2] ?? "").toLowerCase();
      const code = [];
      let closed = false;
      index += 1;
      while (index < lines.length) {
        if (lines[index].trim() === marker) {
          closed = true;
          index += 1;
          break;
        }
        code.push(lines[index]);
        index += 1;
      }
      blocks.push({ type: "code", language, value: code.join("\n"), closed });
      continue;
    }
    const heading = line.match(/^(#{1,6})\s+(.+)$/);
    if (heading) {
      blocks.push({ type: "heading", level: heading[1].length, content: parseMarkdownInline(heading[2]) });
      index += 1;
      continue;
    }
    if (/^\s*(?:-{3,}|\*{3,}|_{3,})\s*$/.test(line)) {
      blocks.push({ type: "rule" });
      index += 1;
      continue;
    }
    if (/^>\s?/.test(line)) {
      const quoted = [];
      while (index < lines.length && /^>\s?/.test(lines[index])) {
        quoted.push(lines[index].replace(/^>\s?/, ""));
        index += 1;
      }
      blocks.push({ type: "quote", content: parseMarkdownInline(quoted.join("\n")) });
      continue;
    }
    const listMatch = line.match(/^\s*([-+*]|\d+[.)])\s+(.+)$/);
    if (listMatch) {
      const ordered = /^\d/.test(listMatch[1]);
      const items = [];
      while (index < lines.length) {
        const item = lines[index].match(/^\s*([-+*]|\d+[.)])\s+(.+)$/);
        if (!item || /^\d/.test(item[1]) !== ordered)
          break;
        const task = item[2].match(/^\[([ xX])\]\s+(.+)$/);
        items.push({
          content: parseMarkdownInline(task ? task[2] : item[2]),
          ...task ? { checked: task[1].toLowerCase() === "x" } : {}
        });
        index += 1;
      }
      blocks.push({ type: "list", ordered, items });
      continue;
    }
    if (line.includes("|") && TABLE_DIVIDER.test(lines[index + 1] ?? "")) {
      const header = splitTableRow(line).map(parseMarkdownInline);
      const rows = [];
      index += 2;
      while (index < lines.length && lines[index].includes("|") && lines[index].trim()) {
        rows.push(splitTableRow(lines[index]).map(parseMarkdownInline));
        index += 1;
      }
      blocks.push({ type: "table", header, rows });
      continue;
    }
    const paragraph = [line];
    index += 1;
    while (index < lines.length && lines[index].trim() && !startsBlock(lines, index)) {
      paragraph.push(lines[index]);
      index += 1;
    }
    blocks.push({ type: "paragraph", content: parseMarkdownInline(paragraph.join("\n")) });
  }
  return blocks;
}
var KEYWORDS = {
  javascript: /* @__PURE__ */ new Set(["async", "await", "break", "case", "catch", "class", "const", "continue", "default", "delete", "do", "else", "export", "extends", "finally", "for", "from", "function", "if", "import", "in", "instanceof", "let", "new", "of", "return", "static", "switch", "throw", "try", "typeof", "var", "void", "while", "yield"]),
  typescript: /* @__PURE__ */ new Set(["abstract", "any", "as", "asserts", "async", "await", "boolean", "break", "case", "catch", "class", "const", "continue", "declare", "default", "delete", "do", "else", "enum", "export", "extends", "finally", "for", "from", "function", "if", "implements", "import", "in", "infer", "instanceof", "interface", "keyof", "let", "namespace", "never", "new", "number", "object", "of", "readonly", "return", "satisfies", "static", "string", "switch", "symbol", "throw", "try", "type", "typeof", "undefined", "unknown", "var", "void", "while", "yield"]),
  python: /* @__PURE__ */ new Set(["and", "as", "assert", "async", "await", "break", "class", "continue", "def", "del", "elif", "else", "except", "finally", "for", "from", "global", "if", "import", "in", "is", "lambda", "nonlocal", "not", "or", "pass", "raise", "return", "try", "while", "with", "yield"]),
  shell: /* @__PURE__ */ new Set(["case", "do", "done", "elif", "else", "esac", "export", "fi", "for", "function", "if", "in", "local", "then", "while"]),
  css: /* @__PURE__ */ new Set(["@import", "@media", "@supports", "and", "important", "not", "only"])
};
var LANGUAGE_ALIASES = {
  js: "javascript",
  jsx: "javascript",
  mjs: "javascript",
  cjs: "javascript",
  ts: "typescript",
  tsx: "typescript",
  mts: "typescript",
  cts: "typescript",
  py: "python",
  bash: "shell",
  sh: "shell",
  zsh: "shell",
  jsonc: "json"
};
function highlightCodeLine(line, language = "") {
  const normalized = LANGUAGE_ALIASES[language] ?? language;
  const keywords = KEYWORDS[normalized] ?? KEYWORDS.javascript;
  const tokens = [];
  let index = 0;
  const push = (kind, value) => {
    if (value)
      tokens.push({ kind, value });
  };
  while (index < line.length) {
    const rest = line.slice(index);
    const comment = normalized === "python" || normalized === "shell" ? rest.match(/^#.*/) : rest.match(/^\/\/.*|^\/\*.*?\*\//);
    if (comment) {
      push("comment", comment[0]);
      index += comment[0].length;
      continue;
    }
    const string = rest.match(/^(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\])*`)/);
    if (string) {
      push("string", string[0]);
      index += string[0].length;
      continue;
    }
    const number = rest.match(/^(?:0x[\da-f]+|\d+(?:\.\d+)?(?:e[+-]?\d+)?)/i);
    if (number) {
      push("number", number[0]);
      index += number[0].length;
      continue;
    }
    const word = rest.match(/^[A-Za-z_$@][\w$-]*/);
    if (word) {
      const literal = /^(?:true|false|null|undefined|None|True|False)$/.test(word[0]);
      push(literal ? "literal" : keywords.has(word[0]) ? "keyword" : "plain", word[0]);
      index += word[0].length;
      continue;
    }
    const plain = rest.match(/^[^A-Za-z_$@'"`\d/#]+/) ?? rest.match(/^./);
    push("plain", plain?.[0] ?? "");
    index += plain?.[0].length ?? 1;
  }
  return tokens;
}

// node_modules/.pnpm/@zhin.js+client@1.1.5_@ai-sdk+openai@4.0.69_zod@4.6.5__ai@7.0.105_zod@4.6.5__react@19.3.0_zod@4.6.5/node_modules/@zhin.js/client/dist/message-content/MarkdownContent.js
function InlineContent({ content }) {
  const nodes = [];
  content.forEach((token, index) => {
    const key = `${token.type}-${index}`;
    const value = token.value.split("\n").map((line, lineIndex, lines) => _jsxs(Fragment, { children: [line, lineIndex < lines.length - 1 ? _jsx("br", {}) : null] }, `${key}-line-${lineIndex}`));
    if (token.type === "strong")
      nodes.push(_jsx("strong", { children: value }, key));
    else if (token.type === "emphasis")
      nodes.push(_jsx("em", { children: value }, key));
    else if (token.type === "strike")
      nodes.push(_jsx("del", { children: value }, key));
    else if (token.type === "code")
      nodes.push(_jsx("code", { className: "im-inline-code", children: token.value }, key));
    else if (token.type === "link")
      nodes.push(_jsx("a", { href: token.href, target: token.href.startsWith("#") ? void 0 : "_blank", rel: "noreferrer", className: "im-message-link", children: value }, key));
    else
      nodes.push(_jsx(Fragment, { children: value }, key));
  });
  return _jsx(_Fragment, { children: nodes });
}
function CodeBlock({ code, language = "", closed = true }) {
  const [copied, setCopied] = useState(false);
  const [wrapped, setWrapped] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const lines = useMemo(() => code.split("\n"), [code]);
  const isLong = lines.length > 18 || code.length > 1800;
  const visibleLines = isLong && !expanded ? lines.slice(0, 18) : lines;
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  };
  return _jsxs("figure", { className: "zhin-code-block", children: [_jsxs("figcaption", { className: "zhin-code-toolbar", children: [_jsx("span", { className: "zhin-code-language", children: language || "plain text" }), !closed ? _jsx("span", { className: "zhin-code-streaming", children: "\u751F\u6210\u4E2D" }) : null, _jsxs("span", { className: "zhin-code-actions", children: [_jsx("button", { type: "button", onClick: () => setWrapped((value) => !value), "aria-pressed": wrapped, children: wrapped ? "\u4E0D\u6298\u884C" : "\u6298\u884C" }), _jsx("button", { type: "button", onClick: () => void copy(), children: copied ? "\u5DF2\u590D\u5236" : "\u590D\u5236" })] })] }), _jsx("pre", { className: wrapped ? "zhin-code-pre zhin-code-pre--wrap" : "zhin-code-pre", children: _jsx("code", { children: visibleLines.map((line, lineIndex) => _jsxs("span", { className: "zhin-code-line", children: [_jsx("span", { className: "zhin-code-line-number", "aria-hidden": "true", children: lineIndex + 1 }), _jsxs("span", { className: "zhin-code-line-content", children: [highlightCodeLine(line, language).map((token, tokenIndex) => _jsx("span", { className: `zhin-code-token zhin-code-token--${token.kind}`, children: token.value }, `${token.kind}-${tokenIndex}`)), "\n"] })] }, `${lineIndex}-${line}`)) }) }), isLong ? _jsx("button", { type: "button", className: "zhin-code-expand", onClick: () => setExpanded((value) => !value), children: expanded ? "\u6536\u8D77\u4EE3\u7801" : `\u5C55\u5F00\u5176\u4F59 ${lines.length - visibleLines.length} \u884C` }) : null] });
}
function MarkdownContent({ text, className }) {
  const blocks = useMemo(() => parseMarkdown(text), [text]);
  return _jsx("div", { className: ["im-markdown-body", "zhin-markdown", className].filter(Boolean).join(" "), children: blocks.map((block, index) => {
    if (block.type === "heading") {
      const Heading = `h${block.level}`;
      return _jsx(Heading, { className: `im-markdown-heading im-markdown-heading-${block.level}`, children: _jsx(InlineContent, { content: block.content }) }, index);
    }
    if (block.type === "paragraph")
      return _jsx("p", { className: "im-markdown-paragraph", children: _jsx(InlineContent, { content: block.content }) }, index);
    if (block.type === "quote")
      return _jsx("blockquote", { className: "im-markdown-quote", children: _jsx(InlineContent, { content: block.content }) }, index);
    if (block.type === "rule")
      return _jsx("hr", { className: "zhin-markdown-rule" }, index);
    if (block.type === "code")
      return _jsx(CodeBlock, { code: block.value, language: block.language, closed: block.closed }, index);
    if (block.type === "list") {
      const List = block.ordered ? "ol" : "ul";
      return _jsx(List, { className: `im-markdown-list${block.ordered ? " im-markdown-list-ordered" : ""}`, children: block.items.map((item, itemIndex) => _jsxs("li", { className: item.checked === void 0 ? void 0 : "zhin-markdown-task", children: [item.checked === void 0 ? null : _jsx("input", { type: "checkbox", checked: item.checked, readOnly: true, "aria-label": item.checked ? "\u5DF2\u5B8C\u6210" : "\u672A\u5B8C\u6210" }), _jsx(InlineContent, { content: item.content })] }, itemIndex)) }, index);
    }
    if (block.type === "table") {
      return _jsx("div", { className: "zhin-markdown-table-wrap", children: _jsxs("table", { className: "zhin-markdown-table", children: [_jsx("thead", { children: _jsx("tr", { children: block.header.map((cell, cellIndex) => _jsx("th", { children: _jsx(InlineContent, { content: cell }) }, cellIndex)) }) }), _jsx("tbody", { children: block.rows.map((row, rowIndex) => _jsx("tr", { children: row.map((cell, cellIndex) => _jsx("td", { children: _jsx(InlineContent, { content: cell }) }, cellIndex)) }, rowIndex)) })] }) }, index);
    }
    return null;
  }) });
}

// node_modules/.pnpm/@zhin.js+client@1.1.5_@ai-sdk+openai@4.0.69_zod@4.6.5__ai@7.0.105_zod@4.6.5__react@19.3.0_zod@4.6.5/node_modules/@zhin.js/client/dist/app.js
var listeners = /* @__PURE__ */ new Set();
var version = 0;
function bump() {
  version++;
  for (const l of listeners)
    l();
}
function subscribe(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}
function getVersion() {
  return version;
}
var routes = [];
var tools = [];
var sidebarRenderer = null;
var toolbarRenderer = null;
var routeRenderer = null;
function slugId(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "tool";
}
function buildRouteTree(flatRoutes) {
  const nodes = flatRoutes.map((r2) => ({ ...r2, children: [] }));
  const roots = [];
  for (const node of nodes) {
    if (!node.parent) {
      roots.push(node);
    } else {
      const parent = nodes.find((n) => n.path === node.parent);
      if (parent) {
        parent.children.push(node);
      } else {
        roots.push(node);
      }
    }
  }
  const sortFn = (a, b) => (a.meta?.order ?? 999) - (b.meta?.order ?? 999);
  roots.sort(sortFn);
  for (const n of nodes)
    n.children.sort(sortFn);
  return roots;
}
function buildToolTree(flatTools) {
  const nodes = flatTools.map((t) => ({ ...t, children: [] }));
  const roots = [];
  for (const node of nodes) {
    if (!node.parent) {
      roots.push(node);
    } else {
      const parent = nodes.find((n) => n.id === node.parent);
      if (parent) {
        parent.children.push(node);
      } else {
        roots.push(node);
      }
    }
  }
  return roots;
}
function renderRouteElement(route) {
  if (routeRenderer)
    return routeRenderer(route);
  return route.element;
}
function createConsoleApp() {
  return {
    subscribe,
    getVersion,
    defineSidebar(render) {
      sidebarRenderer = render;
      bump();
    },
    defineToolbar(render) {
      toolbarRenderer = render;
      bump();
    },
    defineRouter(render) {
      routeRenderer = render;
      bump();
    },
    addRoute(input) {
      const next = routes.filter((r2) => r2.path !== input.path);
      next.push({
        path: input.path,
        name: input.name,
        element: input.element,
        parent: input.parent ?? null,
        icon: input.icon,
        requiredPermissions: input.requiredPermissions,
        requiredRoles: input.requiredRoles,
        meta: input.meta
      });
      routes = next;
      bump();
    },
    removeRoute(path) {
      routes = routes.filter((r2) => r2.path !== path);
      bump();
    },
    addTool(input) {
      const id = input.id ?? `${slugId(input.name)}-${Math.random().toString(36).slice(2, 8)}`;
      if (tools.some((t) => t.id === id)) {
        throw new Error(`[zhin-console] addTool: id already exists: ${id}`);
      }
      tools = [
        ...tools,
        {
          id,
          name: input.name,
          icon: input.icon,
          parent: input.parent ?? null,
          path: input.path
        }
      ];
      bump();
      return id;
    },
    getRouteTree() {
      return buildRouteTree(routes);
    },
    getToolTree() {
      return buildToolTree(tools);
    },
    _getRoutes() {
      return routes;
    },
    _getSidebarRenderer() {
      return sidebarRenderer;
    },
    _getToolbarRenderer() {
      return toolbarRenderer;
    },
    _renderRouteElement(route) {
      return renderRouteElement(route);
    }
  };
}
var app = createConsoleApp();

// node_modules/.pnpm/@zhin.js+client@1.1.5_@ai-sdk+openai@4.0.69_zod@4.6.5__ai@7.0.105_zod@4.6.5__react@19.3.0_zod@4.6.5/node_modules/@zhin.js/client/dist/websocket/types.js
var ConnectionState;
(function(ConnectionState2) {
  ConnectionState2["DISCONNECTED"] = "disconnected";
  ConnectionState2["CONNECTING"] = "connecting";
  ConnectionState2["CONNECTED"] = "connected";
  ConnectionState2["RECONNECTING"] = "reconnecting";
  ConnectionState2["ERROR"] = "error";
})(ConnectionState || (ConnectionState = {}));

// node_modules/.pnpm/@zhin.js+client@1.1.5_@ai-sdk+openai@4.0.69_zod@4.6.5__ai@7.0.105_zod@4.6.5__react@19.3.0_zod@4.6.5/node_modules/@zhin.js/client/dist/websocket/hooks.js
import { useCallback, useEffect, useMemo as useMemo2, useRef, useState as useState2 } from "/esm/react.mjs?v=mu5z5rv8";

// node_modules/.pnpm/@zhin.js+client@1.1.5_@ai-sdk+openai@4.0.69_zod@4.6.5__ai@7.0.105_zod@4.6.5__react@19.3.0_zod@4.6.5/node_modules/@zhin.js/client/dist/store/createRegistryStore.js
import * as React from "/esm/react.mjs?v=mu5z5rv8";

// node_modules/.pnpm/clsx@2.1.1/node_modules/clsx/dist/clsx.mjs
function r(e) {
  var t, f, n = "";
  if ("string" == typeof e || "number" == typeof e) n += e;
  else if ("object" == typeof e) if (Array.isArray(e)) {
    var o = e.length;
    for (t = 0; t < o; t++) e[t] && (f = r(e[t])) && (n && (n += " "), n += f);
  } else for (f in e) e[f] && (n && (n += " "), n += f);
  return n;
}
function clsx() {
  for (var e, t, f = 0, n = "", o = arguments.length; f < o; f++) (e = arguments[f]) && (t = r(e)) && (n && (n += " "), n += t);
  return n;
}

// node_modules/.pnpm/tailwind-merge@3.7.0/node_modules/tailwind-merge/dist/bundle-mjs.mjs
var concatArrays = (array1, array2) => {
  const combinedArray = new Array(array1.length + array2.length);
  for (let i = 0; i < array1.length; i++) {
    combinedArray[i] = array1[i];
  }
  for (let i = 0; i < array2.length; i++) {
    combinedArray[array1.length + i] = array2[i];
  }
  return combinedArray;
};
var createClassValidatorObject = (classGroupId, validator) => ({
  classGroupId,
  validator
});
var createClassPartObject = (nextPart = /* @__PURE__ */ new Map(), validators = null, classGroupId) => ({
  nextPart,
  validators,
  classGroupId
});
var CLASS_PART_SEPARATOR = "-";
var EMPTY_CONFLICTS = [];
var ARBITRARY_PROPERTY_PREFIX = "arbitrary..";
var createClassGroupUtils = (config) => {
  const classMap = createClassMap(config);
  const {
    conflictingClassGroups,
    conflictingClassGroupModifiers
  } = config;
  const getClassGroupId = (className) => {
    if (className.startsWith("[") && className.endsWith("]")) {
      return getGroupIdForArbitraryProperty(className);
    }
    const classParts = className.split(CLASS_PART_SEPARATOR);
    const startIndex = classParts[0] === "" && classParts.length > 1 ? 1 : 0;
    return getGroupRecursive(classParts, startIndex, classMap);
  };
  const getConflictingClassGroupIds = (classGroupId, hasPostfixModifier) => {
    if (hasPostfixModifier) {
      const modifierConflicts = conflictingClassGroupModifiers[classGroupId];
      const baseConflicts = conflictingClassGroups[classGroupId];
      if (modifierConflicts) {
        if (baseConflicts) {
          return concatArrays(baseConflicts, modifierConflicts);
        }
        return modifierConflicts;
      }
      return baseConflicts || EMPTY_CONFLICTS;
    }
    return conflictingClassGroups[classGroupId] || EMPTY_CONFLICTS;
  };
  return {
    getClassGroupId,
    getConflictingClassGroupIds
  };
};
var getGroupRecursive = (classParts, startIndex, classPartObject) => {
  const classPathsLength = classParts.length - startIndex;
  if (classPathsLength === 0) {
    return classPartObject.classGroupId;
  }
  const currentClassPart = classParts[startIndex];
  const nextClassPartObject = classPartObject.nextPart.get(currentClassPart);
  if (nextClassPartObject) {
    const result = getGroupRecursive(classParts, startIndex + 1, nextClassPartObject);
    if (result) return result;
  }
  const validators = classPartObject.validators;
  if (validators === null) {
    return void 0;
  }
  const classRest = startIndex === 0 ? classParts.join(CLASS_PART_SEPARATOR) : classParts.slice(startIndex).join(CLASS_PART_SEPARATOR);
  const validatorsLength = validators.length;
  for (let i = 0; i < validatorsLength; i++) {
    const validatorObj = validators[i];
    if (validatorObj.validator(classRest)) {
      return validatorObj.classGroupId;
    }
  }
  return void 0;
};
var getGroupIdForArbitraryProperty = (className) => className.slice(1, -1).indexOf(":") === -1 ? void 0 : (() => {
  const content = className.slice(1, -1);
  const colonIndex = content.indexOf(":");
  const property = content.slice(0, colonIndex);
  return property ? ARBITRARY_PROPERTY_PREFIX + property : void 0;
})();
var createClassMap = (config) => {
  const {
    theme,
    classGroups
  } = config;
  return processClassGroups(classGroups, theme);
};
var processClassGroups = (classGroups, theme) => {
  const classMap = createClassPartObject();
  for (const classGroupId in classGroups) {
    const group = classGroups[classGroupId];
    processClassesRecursively(group, classMap, classGroupId, theme);
  }
  return classMap;
};
var processClassesRecursively = (classGroup, classPartObject, classGroupId, theme) => {
  const len = classGroup.length;
  for (let i = 0; i < len; i++) {
    const classDefinition = classGroup[i];
    processClassDefinition(classDefinition, classPartObject, classGroupId, theme);
  }
};
var processClassDefinition = (classDefinition, classPartObject, classGroupId, theme) => {
  if (typeof classDefinition === "string") {
    processStringDefinition(classDefinition, classPartObject, classGroupId);
    return;
  }
  if (typeof classDefinition === "function") {
    processFunctionDefinition(classDefinition, classPartObject, classGroupId, theme);
    return;
  }
  processObjectDefinition(classDefinition, classPartObject, classGroupId, theme);
};
var processStringDefinition = (classDefinition, classPartObject, classGroupId) => {
  const classPartObjectToEdit = classDefinition === "" ? classPartObject : getPart(classPartObject, classDefinition);
  classPartObjectToEdit.classGroupId = classGroupId;
};
var processFunctionDefinition = (classDefinition, classPartObject, classGroupId, theme) => {
  if (isThemeGetter(classDefinition)) {
    processClassesRecursively(classDefinition(theme), classPartObject, classGroupId, theme);
    return;
  }
  if (classPartObject.validators === null) {
    classPartObject.validators = [];
  }
  classPartObject.validators.push(createClassValidatorObject(classGroupId, classDefinition));
};
var processObjectDefinition = (classDefinition, classPartObject, classGroupId, theme) => {
  const entries = Object.entries(classDefinition);
  const len = entries.length;
  for (let i = 0; i < len; i++) {
    const [key, value] = entries[i];
    processClassesRecursively(value, getPart(classPartObject, key), classGroupId, theme);
  }
};
var getPart = (classPartObject, path) => {
  let current = classPartObject;
  const parts = path.split(CLASS_PART_SEPARATOR);
  const len = parts.length;
  for (let i = 0; i < len; i++) {
    const part = parts[i];
    let next = current.nextPart.get(part);
    if (!next) {
      next = createClassPartObject();
      current.nextPart.set(part, next);
    }
    current = next;
  }
  return current;
};
var isThemeGetter = (func) => "isThemeGetter" in func && func.isThemeGetter === true;
var createLruCache = (maxCacheSize) => {
  if (maxCacheSize < 1) {
    return {
      get: () => void 0,
      set: () => {
      }
    };
  }
  let cacheSize = 0;
  let cache = /* @__PURE__ */ Object.create(null);
  let previousCache = /* @__PURE__ */ Object.create(null);
  const update = (key, value) => {
    cache[key] = value;
    cacheSize++;
    if (cacheSize > maxCacheSize) {
      cacheSize = 0;
      previousCache = cache;
      cache = /* @__PURE__ */ Object.create(null);
    }
  };
  return {
    get(key) {
      let value = cache[key];
      if (value !== void 0) {
        return value;
      }
      if ((value = previousCache[key]) !== void 0) {
        update(key, value);
        return value;
      }
    },
    set(key, value) {
      if (key in cache) {
        cache[key] = value;
      } else {
        update(key, value);
      }
    }
  };
};
var IMPORTANT_MODIFIER = "!";
var MODIFIER_SEPARATOR = ":";
var EMPTY_MODIFIERS = [];
var createResultObject = (modifiers, hasImportantModifier, baseClassName, maybePostfixModifierPosition, isExternal) => ({
  modifiers,
  hasImportantModifier,
  baseClassName,
  maybePostfixModifierPosition,
  isExternal
});
var createParseClassName = (config) => {
  const {
    prefix,
    experimentalParseClassName
  } = config;
  let parseClassName = (className) => {
    const modifiers = [];
    let bracketDepth = 0;
    let parenDepth = 0;
    let modifierStart = 0;
    let postfixModifierPosition;
    const len = className.length;
    for (let index = 0; index < len; index++) {
      const currentCharacter = className[index];
      if (bracketDepth === 0 && parenDepth === 0) {
        if (currentCharacter === MODIFIER_SEPARATOR) {
          modifiers.push(className.slice(modifierStart, index));
          modifierStart = index + 1;
          continue;
        }
        if (currentCharacter === "/") {
          postfixModifierPosition = index;
          continue;
        }
      }
      if (currentCharacter === "[") bracketDepth++;
      else if (currentCharacter === "]") bracketDepth--;
      else if (currentCharacter === "(") parenDepth++;
      else if (currentCharacter === ")") parenDepth--;
    }
    const baseClassNameWithImportantModifier = modifiers.length === 0 ? className : className.slice(modifierStart);
    let baseClassName = baseClassNameWithImportantModifier;
    let hasImportantModifier = false;
    if (baseClassNameWithImportantModifier.endsWith(IMPORTANT_MODIFIER)) {
      baseClassName = baseClassNameWithImportantModifier.slice(0, -1);
      hasImportantModifier = true;
    } else if (
      /**
       * In Tailwind CSS v3 the important modifier was at the start of the base class name. This is still supported for legacy reasons.
       * @see https://github.com/dcastil/tailwind-merge/issues/513#issuecomment-2614029864
       */
      baseClassNameWithImportantModifier.startsWith(IMPORTANT_MODIFIER)
    ) {
      baseClassName = baseClassNameWithImportantModifier.slice(1);
      hasImportantModifier = true;
    }
    const maybePostfixModifierPosition = postfixModifierPosition && postfixModifierPosition > modifierStart ? postfixModifierPosition - modifierStart : void 0;
    return createResultObject(modifiers, hasImportantModifier, baseClassName, maybePostfixModifierPosition);
  };
  if (prefix) {
    const fullPrefix = prefix + MODIFIER_SEPARATOR;
    const parseClassNameOriginal = parseClassName;
    parseClassName = (className) => className.startsWith(fullPrefix) ? parseClassNameOriginal(className.slice(fullPrefix.length)) : createResultObject(EMPTY_MODIFIERS, false, className, void 0, true);
  }
  if (experimentalParseClassName) {
    const parseClassNameOriginal = parseClassName;
    parseClassName = (className) => experimentalParseClassName({
      className,
      parseClassName: parseClassNameOriginal
    });
  }
  return parseClassName;
};
var createSortModifiers = (config) => {
  const modifierWeights = /* @__PURE__ */ new Map();
  config.orderSensitiveModifiers.forEach((mod, index) => {
    modifierWeights.set(mod, 1e6 + index);
  });
  return (modifiers) => {
    const result = [];
    let currentSegment = [];
    for (let i = 0; i < modifiers.length; i++) {
      const modifier = modifiers[i];
      const isArbitrary = modifier[0] === "[";
      const isOrderSensitive = modifierWeights.has(modifier);
      if (isArbitrary || isOrderSensitive) {
        if (currentSegment.length > 0) {
          currentSegment.sort();
          result.push(...currentSegment);
          currentSegment = [];
        }
        result.push(modifier);
      } else {
        currentSegment.push(modifier);
      }
    }
    if (currentSegment.length > 0) {
      currentSegment.sort();
      result.push(...currentSegment);
    }
    return result;
  };
};
var createConfigUtils = (config) => ({
  cache: createLruCache(config.cacheSize),
  parseClassName: createParseClassName(config),
  sortModifiers: createSortModifiers(config),
  postfixLookupClassGroupIds: createPostfixLookupClassGroupIds(config),
  ...createClassGroupUtils(config)
});
var createPostfixLookupClassGroupIds = (config) => {
  const lookup = /* @__PURE__ */ Object.create(null);
  const classGroupIds = config.postfixLookupClassGroups;
  if (classGroupIds) {
    for (let i = 0; i < classGroupIds.length; i++) {
      lookup[classGroupIds[i]] = true;
    }
  }
  return lookup;
};
var SPLIT_CLASSES_REGEX = /\s+/;
var mergeClassList = (classList, configUtils) => {
  const {
    parseClassName,
    getClassGroupId,
    getConflictingClassGroupIds,
    sortModifiers,
    postfixLookupClassGroupIds
  } = configUtils;
  const classGroupsInConflict = [];
  const classNames = classList.trim().split(SPLIT_CLASSES_REGEX);
  let result = "";
  for (let index = classNames.length - 1; index >= 0; index -= 1) {
    const originalClassName = classNames[index];
    const {
      isExternal,
      modifiers,
      hasImportantModifier,
      baseClassName,
      maybePostfixModifierPosition
    } = parseClassName(originalClassName);
    if (isExternal) {
      result = originalClassName + (result.length > 0 ? " " + result : result);
      continue;
    }
    let hasPostfixModifier = !!maybePostfixModifierPosition;
    let classGroupId;
    if (hasPostfixModifier) {
      const baseClassNameWithoutPostfix = baseClassName.substring(0, maybePostfixModifierPosition);
      classGroupId = getClassGroupId(baseClassNameWithoutPostfix);
      const classGroupIdWithPostfix = classGroupId && postfixLookupClassGroupIds[classGroupId] ? getClassGroupId(baseClassName) : void 0;
      if (classGroupIdWithPostfix && classGroupIdWithPostfix !== classGroupId) {
        classGroupId = classGroupIdWithPostfix;
        hasPostfixModifier = false;
      }
    } else {
      classGroupId = getClassGroupId(baseClassName);
    }
    if (!classGroupId) {
      if (!hasPostfixModifier) {
        result = originalClassName + (result.length > 0 ? " " + result : result);
        continue;
      }
      classGroupId = getClassGroupId(baseClassName);
      if (!classGroupId) {
        result = originalClassName + (result.length > 0 ? " " + result : result);
        continue;
      }
      hasPostfixModifier = false;
    }
    const variantModifier = modifiers.length === 0 ? "" : modifiers.length === 1 ? modifiers[0] : sortModifiers(modifiers).join(":");
    const modifierId = hasImportantModifier ? variantModifier + IMPORTANT_MODIFIER : variantModifier;
    const classId = modifierId + classGroupId;
    if (classGroupsInConflict.indexOf(classId) > -1) {
      continue;
    }
    classGroupsInConflict.push(classId);
    const conflictGroups = getConflictingClassGroupIds(classGroupId, hasPostfixModifier);
    for (let i = 0; i < conflictGroups.length; ++i) {
      const group = conflictGroups[i];
      classGroupsInConflict.push(modifierId + group);
    }
    result = originalClassName + (result.length > 0 ? " " + result : result);
  }
  return result;
};
var twJoin = (...classLists) => {
  let index = 0;
  let argument;
  let resolvedValue;
  let string = "";
  while (index < classLists.length) {
    if (argument = classLists[index++]) {
      if (resolvedValue = toValue(argument)) {
        string && (string += " ");
        string += resolvedValue;
      }
    }
  }
  return string;
};
var toValue = (mix) => {
  if (typeof mix === "string") {
    return mix;
  }
  let resolvedValue;
  let string = "";
  for (let k = 0; k < mix.length; k++) {
    if (mix[k]) {
      if (resolvedValue = toValue(mix[k])) {
        string && (string += " ");
        string += resolvedValue;
      }
    }
  }
  return string;
};
var createTailwindMerge = (createConfigFirst, ...createConfigRest) => {
  let configUtils;
  let cacheGet;
  let cacheSet;
  let functionToCall;
  const initTailwindMerge = (classList) => {
    const config = createConfigRest.reduce((previousConfig, createConfigCurrent) => createConfigCurrent(previousConfig), createConfigFirst());
    configUtils = createConfigUtils(config);
    cacheGet = configUtils.cache.get;
    cacheSet = configUtils.cache.set;
    functionToCall = tailwindMerge;
    return tailwindMerge(classList);
  };
  const tailwindMerge = (classList) => {
    const cachedResult = cacheGet(classList);
    if (cachedResult) {
      return cachedResult;
    }
    const result = mergeClassList(classList, configUtils);
    cacheSet(classList, result);
    return result;
  };
  functionToCall = initTailwindMerge;
  return (...args) => functionToCall(twJoin(...args));
};
var fallbackThemeArr = [];
var fromTheme = (key) => {
  const themeGetter = (theme) => theme[key] || fallbackThemeArr;
  themeGetter.isThemeGetter = true;
  themeGetter.themeKey = key;
  return themeGetter;
};
var arbitraryValueRegex = /^\[(?:(\w[\w-]*):)?(.+)\]$/i;
var arbitraryVariableRegex = /^\((?:(\w[\w-]*):)?(.+)\)$/i;
var fractionRegex = /^\d+(?:\.\d+)?\/\d+(?:\.\d+)?$/;
var tshirtUnitRegex = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/;
var lengthUnitRegex = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/;
var colorFunctionRegex = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix|color|light-dark)\(.+\)$/;
var shadowRegex = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/;
var imageRegex = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/;
var isFraction = (value) => fractionRegex.test(value);
var isNumber = (value) => !!value && !Number.isNaN(Number(value));
var isInteger = (value) => !!value && Number.isInteger(Number(value));
var isPercent = (value) => value.endsWith("%") && isNumber(value.slice(0, -1));
var isTshirtSize = (value) => tshirtUnitRegex.test(value);
var isAny = () => true;
var isLengthOnly = (value) => (
  // `colorFunctionRegex` check is necessary because color functions can have percentages in them which which would be incorrectly classified as lengths.
  // For example, `hsl(0 0% 0%)` would be classified as a length without this check.
  // I could also use lookbehind assertion in `lengthUnitRegex` but that isn't supported widely enough.
  lengthUnitRegex.test(value) && !colorFunctionRegex.test(value)
);
var isNever = () => false;
var isShadow = (value) => shadowRegex.test(value);
var isImage = (value) => imageRegex.test(value);
var isAnyNonArbitrary = (value) => !isArbitraryValue(value) && !isArbitraryVariable(value);
var isNamedContainerQuery = (value) => value.startsWith("@container") && (value[10] === "/" && value[11] !== void 0 || value[11] === "s" && value[16] !== void 0 && value.startsWith("-size/", 10) || value[11] === "n" && value[18] !== void 0 && value.startsWith("-normal/", 10));
var isArbitrarySize = (value) => getIsArbitraryValue(value, isLabelSize, isNever);
var isArbitraryValue = (value) => arbitraryValueRegex.test(value);
var isArbitraryLength = (value) => getIsArbitraryValue(value, isLabelLength, isLengthOnly);
var isArbitraryNumber = (value) => getIsArbitraryValue(value, isLabelNumber, isNumber);
var isArbitraryWeight = (value) => getIsArbitraryValue(value, isLabelWeight, isAny);
var isArbitraryFamilyName = (value) => getIsArbitraryValue(value, isLabelFamilyName, isNever);
var isArbitraryPosition = (value) => getIsArbitraryValue(value, isLabelPosition, isNever);
var isArbitraryImage = (value) => getIsArbitraryValue(value, isLabelImage, isImage);
var isArbitraryShadow = (value) => getIsArbitraryValue(value, isLabelShadow, isShadow);
var isArbitraryVariable = (value) => arbitraryVariableRegex.test(value);
var isArbitraryVariableLength = (value) => getIsArbitraryVariable(value, isLabelLength);
var isArbitraryVariableFamilyName = (value) => getIsArbitraryVariable(value, isLabelFamilyName);
var isArbitraryVariablePosition = (value) => getIsArbitraryVariable(value, isLabelPosition);
var isArbitraryVariableSize = (value) => getIsArbitraryVariable(value, isLabelSize);
var isArbitraryVariableImage = (value) => getIsArbitraryVariable(value, isLabelImage);
var isArbitraryVariableShadow = (value) => getIsArbitraryVariable(value, isLabelShadow, true);
var isArbitraryVariableWeight = (value) => getIsArbitraryVariable(value, isLabelWeight, true);
var getIsArbitraryValue = (value, testLabel, testValue) => {
  const result = arbitraryValueRegex.exec(value);
  if (result) {
    if (result[1]) {
      return testLabel(result[1]);
    }
    return testValue(result[2]);
  }
  return false;
};
var getIsArbitraryVariable = (value, testLabel, shouldMatchNoLabel = false) => {
  const result = arbitraryVariableRegex.exec(value);
  if (result) {
    if (result[1]) {
      return testLabel(result[1]);
    }
    return shouldMatchNoLabel;
  }
  return false;
};
var isLabelPosition = (label) => label === "position" || label === "percentage";
var isLabelImage = (label) => label === "image" || label === "url";
var isLabelSize = (label) => label === "length" || label === "size" || label === "bg-size";
var isLabelLength = (label) => label === "length";
var isLabelNumber = (label) => label === "number";
var isLabelFamilyName = (label) => label === "family-name";
var isLabelWeight = (label) => label === "number" || label === "weight";
var isLabelShadow = (label) => label === "shadow";
var getDefaultConfig = () => {
  const themeColor = fromTheme("color");
  const themeFont = fromTheme("font");
  const themeText = fromTheme("text");
  const themeFontWeight = fromTheme("font-weight");
  const themeTracking = fromTheme("tracking");
  const themeLeading = fromTheme("leading");
  const themeBreakpoint = fromTheme("breakpoint");
  const themeContainer = fromTheme("container");
  const themeSpacing = fromTheme("spacing");
  const themeRadius = fromTheme("radius");
  const themeShadow = fromTheme("shadow");
  const themeInsetShadow = fromTheme("inset-shadow");
  const themeTextShadow = fromTheme("text-shadow");
  const themeDropShadow = fromTheme("drop-shadow");
  const themeBlur = fromTheme("blur");
  const themePerspective = fromTheme("perspective");
  const themeAspect = fromTheme("aspect");
  const themeEase = fromTheme("ease");
  const themeAnimate = fromTheme("animate");
  const scaleBreak = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"];
  const scalePosition = () => [
    "center",
    "top",
    "bottom",
    "left",
    "right",
    "top-left",
    // Deprecated since Tailwind CSS v4.1.0, see https://github.com/tailwindlabs/tailwindcss/pull/17378
    "left-top",
    "top-right",
    // Deprecated since Tailwind CSS v4.1.0, see https://github.com/tailwindlabs/tailwindcss/pull/17378
    "right-top",
    "bottom-right",
    // Deprecated since Tailwind CSS v4.1.0, see https://github.com/tailwindlabs/tailwindcss/pull/17378
    "right-bottom",
    "bottom-left",
    // Deprecated since Tailwind CSS v4.1.0, see https://github.com/tailwindlabs/tailwindcss/pull/17378
    "left-bottom"
  ];
  const scalePositionWithArbitrary = () => [...scalePosition(), isArbitraryVariable, isArbitraryValue];
  const scaleOverflow = () => ["auto", "hidden", "clip", "visible", "scroll"];
  const scaleOverscroll = () => ["auto", "contain", "none"];
  const scaleUnambiguousSpacing = () => [isArbitraryVariable, isArbitraryValue, themeSpacing];
  const scaleInset = () => [isFraction, "full", "auto", ...scaleUnambiguousSpacing()];
  const scaleGridTemplateColsRows = () => [isInteger, "none", "subgrid", isArbitraryVariable, isArbitraryValue];
  const scaleGridColRowStartAndEnd = () => ["auto", {
    span: ["full", isInteger, isArbitraryVariable, isArbitraryValue]
  }, isInteger, isArbitraryVariable, isArbitraryValue];
  const scaleGridColRowStartOrEnd = () => [isInteger, "auto", isArbitraryVariable, isArbitraryValue];
  const scaleGridAutoColsRows = () => ["auto", "min", "max", "fr", isArbitraryVariable, isArbitraryValue];
  const scaleAlignPrimaryAxis = () => ["start", "end", "center", "between", "around", "evenly", "stretch", "baseline", "center-safe", "end-safe"];
  const scaleAlignSecondaryAxis = () => ["start", "end", "center", "stretch", "center-safe", "end-safe"];
  const scaleMargin = () => ["auto", ...scaleUnambiguousSpacing()];
  const scaleSizing = () => [isFraction, "auto", "full", "dvw", "dvh", "lvw", "lvh", "svw", "svh", "min", "max", "fit", ...scaleUnambiguousSpacing()];
  const scaleSizingInline = () => [themeContainer, isFraction, "screen", "full", "dvw", "lvw", "svw", "min", "max", "fit", ...scaleUnambiguousSpacing()];
  const scaleSizingBlock = () => [isFraction, "screen", "full", "lh", "dvh", "lvh", "svh", "min", "max", "fit", ...scaleUnambiguousSpacing()];
  const scaleColor = () => [themeColor, isArbitraryVariable, isArbitraryValue];
  const scaleBgPosition = () => [...scalePosition(), isArbitraryVariablePosition, isArbitraryPosition, {
    position: [isArbitraryVariable, isArbitraryValue]
  }];
  const scaleBgRepeat = () => ["no-repeat", {
    repeat: ["", "x", "y", "space", "round"]
  }];
  const scaleBgSize = () => ["auto", "cover", "contain", isArbitraryVariableSize, isArbitrarySize, {
    size: [isArbitraryVariable, isArbitraryValue]
  }];
  const scaleGradientStopPosition = () => [isPercent, isArbitraryVariableLength, isArbitraryLength];
  const scaleRadius = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    "full",
    themeRadius,
    isArbitraryVariable,
    isArbitraryValue
  ];
  const scaleBorderWidth = () => ["", isNumber, isArbitraryVariableLength, isArbitraryLength];
  const scaleLineStyle = () => ["solid", "dashed", "dotted", "double"];
  const scaleBlendMode = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"];
  const scaleMaskImagePosition = () => [isNumber, isPercent, isArbitraryVariablePosition, isArbitraryPosition];
  const scaleBlur = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    themeBlur,
    isArbitraryVariable,
    isArbitraryValue
  ];
  const scaleRotate = () => ["none", isNumber, isArbitraryVariable, isArbitraryValue];
  const scaleScale = () => ["none", isNumber, isArbitraryVariable, isArbitraryValue];
  const scaleSkew = () => [isNumber, isArbitraryVariable, isArbitraryValue];
  const scaleTranslate = () => [isFraction, "full", ...scaleUnambiguousSpacing()];
  return {
    cacheSize: 500,
    theme: {
      animate: ["spin", "ping", "pulse", "bounce"],
      aspect: ["video"],
      blur: [isTshirtSize],
      breakpoint: [isTshirtSize],
      color: [isAny],
      container: [isTshirtSize],
      "drop-shadow": [isTshirtSize],
      ease: ["in", "out", "in-out"],
      font: [isAnyNonArbitrary],
      "font-weight": ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black"],
      "inset-shadow": [isTshirtSize],
      leading: ["none", "tight", "snug", "normal", "relaxed", "loose"],
      perspective: ["dramatic", "near", "normal", "midrange", "distant", "none"],
      radius: [isTshirtSize],
      shadow: [isTshirtSize],
      spacing: ["px", isNumber],
      text: [isTshirtSize],
      "text-shadow": [isTshirtSize],
      tracking: ["tighter", "tight", "normal", "wide", "wider", "widest"]
    },
    classGroups: {
      // --------------
      // --- Layout ---
      // --------------
      /**
       * Aspect Ratio
       * @see https://tailwindcss.com/docs/aspect-ratio
       */
      aspect: [{
        aspect: ["auto", "square", isFraction, isArbitraryValue, isArbitraryVariable, themeAspect]
      }],
      /**
       * Container
       * @see https://tailwindcss.com/docs/container
       * @deprecated since Tailwind CSS v4.0.0
       */
      container: ["container"],
      /**
       * Container Type
       * @see https://tailwindcss.com/docs/responsive-design#container-queries
       */
      "container-type": [{
        "@container": ["", "normal", "size", isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Container Name
       * @see https://tailwindcss.com/docs/responsive-design#named-containers
       */
      "container-named": [isNamedContainerQuery],
      /**
       * Columns
       * @see https://tailwindcss.com/docs/columns
       */
      columns: [{
        columns: [isNumber, "auto", isArbitraryValue, isArbitraryVariable, themeContainer]
      }],
      /**
       * Break After
       * @see https://tailwindcss.com/docs/break-after
       */
      "break-after": [{
        "break-after": scaleBreak()
      }],
      /**
       * Break Before
       * @see https://tailwindcss.com/docs/break-before
       */
      "break-before": [{
        "break-before": scaleBreak()
      }],
      /**
       * Break Inside
       * @see https://tailwindcss.com/docs/break-inside
       */
      "break-inside": [{
        "break-inside": ["auto", "avoid", "avoid-page", "avoid-column"]
      }],
      /**
       * Box Decoration Break
       * @see https://tailwindcss.com/docs/box-decoration-break
       */
      "box-decoration": [{
        "box-decoration": ["slice", "clone"]
      }],
      /**
       * Box Sizing
       * @see https://tailwindcss.com/docs/box-sizing
       */
      box: [{
        box: ["border", "content"]
      }],
      /**
       * Display
       * @see https://tailwindcss.com/docs/display
       */
      display: ["block", "inline-block", "inline", "flex", "inline-flex", "table", "inline-table", "table-caption", "table-cell", "table-column", "table-column-group", "table-footer-group", "table-header-group", "table-row-group", "table-row", "flow-root", "grid", "inline-grid", "contents", "list-item", "hidden"],
      /**
       * Screen Reader Only
       * @see https://tailwindcss.com/docs/display#screen-reader-only
       */
      sr: ["sr-only", "not-sr-only"],
      /**
       * Floats
       * @see https://tailwindcss.com/docs/float
       */
      float: [{
        float: ["right", "left", "none", "start", "end"]
      }],
      /**
       * Clear
       * @see https://tailwindcss.com/docs/clear
       */
      clear: [{
        clear: ["left", "right", "both", "none", "start", "end"]
      }],
      /**
       * Isolation
       * @see https://tailwindcss.com/docs/isolation
       */
      isolation: ["isolate", "isolation-auto"],
      /**
       * Object Fit
       * @see https://tailwindcss.com/docs/object-fit
       */
      "object-fit": [{
        object: ["contain", "cover", "fill", "none", "scale-down"]
      }],
      /**
       * Object Position
       * @see https://tailwindcss.com/docs/object-position
       */
      "object-position": [{
        object: scalePositionWithArbitrary()
      }],
      /**
       * Overflow
       * @see https://tailwindcss.com/docs/overflow
       */
      overflow: [{
        overflow: scaleOverflow()
      }],
      /**
       * Overflow X
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-x": [{
        "overflow-x": scaleOverflow()
      }],
      /**
       * Overflow Y
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-y": [{
        "overflow-y": scaleOverflow()
      }],
      /**
       * Overscroll Behavior
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      overscroll: [{
        overscroll: scaleOverscroll()
      }],
      /**
       * Overscroll Behavior X
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-x": [{
        "overscroll-x": scaleOverscroll()
      }],
      /**
       * Overscroll Behavior Y
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-y": [{
        "overscroll-y": scaleOverscroll()
      }],
      /**
       * Position
       * @see https://tailwindcss.com/docs/position
       */
      position: ["static", "fixed", "absolute", "relative", "sticky"],
      /**
       * Inset
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      inset: [{
        inset: scaleInset()
      }],
      /**
       * Inset Inline
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-x": [{
        "inset-x": scaleInset()
      }],
      /**
       * Inset Block
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-y": [{
        "inset-y": scaleInset()
      }],
      /**
       * Inset Inline Start
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       * @todo class group will be renamed to `inset-s` in next major release
       */
      start: [{
        "inset-s": scaleInset(),
        /**
         * @deprecated since Tailwind CSS v4.2.0 in favor of `inset-s-*` utilities.
         * @see https://github.com/tailwindlabs/tailwindcss/pull/19613
         */
        start: scaleInset()
      }],
      /**
       * Inset Inline End
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       * @todo class group will be renamed to `inset-e` in next major release
       */
      end: [{
        "inset-e": scaleInset(),
        /**
         * @deprecated since Tailwind CSS v4.2.0 in favor of `inset-e-*` utilities.
         * @see https://github.com/tailwindlabs/tailwindcss/pull/19613
         */
        end: scaleInset()
      }],
      /**
       * Inset Block Start
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-bs": [{
        "inset-bs": scaleInset()
      }],
      /**
       * Inset Block End
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-be": [{
        "inset-be": scaleInset()
      }],
      /**
       * Top
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      top: [{
        top: scaleInset()
      }],
      /**
       * Right
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      right: [{
        right: scaleInset()
      }],
      /**
       * Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      bottom: [{
        bottom: scaleInset()
      }],
      /**
       * Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      left: [{
        left: scaleInset()
      }],
      /**
       * Visibility
       * @see https://tailwindcss.com/docs/visibility
       */
      visibility: ["visible", "invisible", "collapse"],
      /**
       * Z-Index
       * @see https://tailwindcss.com/docs/z-index
       */
      z: [{
        z: [isInteger, "auto", isArbitraryVariable, isArbitraryValue]
      }],
      // ------------------------
      // --- Flexbox and Grid ---
      // ------------------------
      /**
       * Flex Basis
       * @see https://tailwindcss.com/docs/flex-basis
       */
      basis: [{
        basis: [isFraction, "full", "auto", themeContainer, ...scaleUnambiguousSpacing()]
      }],
      /**
       * Flex Direction
       * @see https://tailwindcss.com/docs/flex-direction
       */
      "flex-direction": [{
        flex: ["row", "row-reverse", "col", "col-reverse"]
      }],
      /**
       * Flex Wrap
       * @see https://tailwindcss.com/docs/flex-wrap
       */
      "flex-wrap": [{
        flex: ["nowrap", "wrap", "wrap-reverse"]
      }],
      /**
       * Flex
       * @see https://tailwindcss.com/docs/flex
       */
      flex: [{
        flex: [isNumber, isFraction, "auto", "initial", "none", isArbitraryValue]
      }],
      /**
       * Flex Grow
       * @see https://tailwindcss.com/docs/flex-grow
       */
      grow: [{
        grow: ["", isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Flex Shrink
       * @see https://tailwindcss.com/docs/flex-shrink
       */
      shrink: [{
        shrink: ["", isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Order
       * @see https://tailwindcss.com/docs/order
       */
      order: [{
        order: [isInteger, "first", "last", "none", isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Grid Template Columns
       * @see https://tailwindcss.com/docs/grid-template-columns
       */
      "grid-cols": [{
        "grid-cols": scaleGridTemplateColsRows()
      }],
      /**
       * Grid Column Start / End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start-end": [{
        col: scaleGridColRowStartAndEnd()
      }],
      /**
       * Grid Column Start
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start": [{
        "col-start": scaleGridColRowStartOrEnd()
      }],
      /**
       * Grid Column End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-end": [{
        "col-end": scaleGridColRowStartOrEnd()
      }],
      /**
       * Grid Template Rows
       * @see https://tailwindcss.com/docs/grid-template-rows
       */
      "grid-rows": [{
        "grid-rows": scaleGridTemplateColsRows()
      }],
      /**
       * Grid Row Start / End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start-end": [{
        row: scaleGridColRowStartAndEnd()
      }],
      /**
       * Grid Row Start
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start": [{
        "row-start": scaleGridColRowStartOrEnd()
      }],
      /**
       * Grid Row End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-end": [{
        "row-end": scaleGridColRowStartOrEnd()
      }],
      /**
       * Grid Auto Flow
       * @see https://tailwindcss.com/docs/grid-auto-flow
       */
      "grid-flow": [{
        "grid-flow": ["row", "col", "dense", "row-dense", "col-dense"]
      }],
      /**
       * Grid Auto Columns
       * @see https://tailwindcss.com/docs/grid-auto-columns
       */
      "auto-cols": [{
        "auto-cols": scaleGridAutoColsRows()
      }],
      /**
       * Grid Auto Rows
       * @see https://tailwindcss.com/docs/grid-auto-rows
       */
      "auto-rows": [{
        "auto-rows": scaleGridAutoColsRows()
      }],
      /**
       * Gap
       * @see https://tailwindcss.com/docs/gap
       */
      gap: [{
        gap: scaleUnambiguousSpacing()
      }],
      /**
       * Gap X
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-x": [{
        "gap-x": scaleUnambiguousSpacing()
      }],
      /**
       * Gap Y
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-y": [{
        "gap-y": scaleUnambiguousSpacing()
      }],
      /**
       * Justify Content
       * @see https://tailwindcss.com/docs/justify-content
       */
      "justify-content": [{
        justify: [...scaleAlignPrimaryAxis(), "normal"]
      }],
      /**
       * Justify Items
       * @see https://tailwindcss.com/docs/justify-items
       */
      "justify-items": [{
        "justify-items": [...scaleAlignSecondaryAxis(), "normal"]
      }],
      /**
       * Justify Self
       * @see https://tailwindcss.com/docs/justify-self
       */
      "justify-self": [{
        "justify-self": ["auto", ...scaleAlignSecondaryAxis()]
      }],
      /**
       * Align Content
       * @see https://tailwindcss.com/docs/align-content
       */
      "align-content": [{
        content: ["normal", ...scaleAlignPrimaryAxis()]
      }],
      /**
       * Align Items
       * @see https://tailwindcss.com/docs/align-items
       */
      "align-items": [{
        items: [...scaleAlignSecondaryAxis(), {
          baseline: ["", "last"]
        }]
      }],
      /**
       * Align Self
       * @see https://tailwindcss.com/docs/align-self
       */
      "align-self": [{
        self: ["auto", ...scaleAlignSecondaryAxis(), {
          baseline: ["", "last"]
        }]
      }],
      /**
       * Place Content
       * @see https://tailwindcss.com/docs/place-content
       */
      "place-content": [{
        "place-content": scaleAlignPrimaryAxis()
      }],
      /**
       * Place Items
       * @see https://tailwindcss.com/docs/place-items
       */
      "place-items": [{
        "place-items": [...scaleAlignSecondaryAxis(), "baseline"]
      }],
      /**
       * Place Self
       * @see https://tailwindcss.com/docs/place-self
       */
      "place-self": [{
        "place-self": ["auto", ...scaleAlignSecondaryAxis()]
      }],
      // Spacing
      /**
       * Padding
       * @see https://tailwindcss.com/docs/padding
       */
      p: [{
        p: scaleUnambiguousSpacing()
      }],
      /**
       * Padding Inline
       * @see https://tailwindcss.com/docs/padding
       */
      px: [{
        px: scaleUnambiguousSpacing()
      }],
      /**
       * Padding Block
       * @see https://tailwindcss.com/docs/padding
       */
      py: [{
        py: scaleUnambiguousSpacing()
      }],
      /**
       * Padding Inline Start
       * @see https://tailwindcss.com/docs/padding
       */
      ps: [{
        ps: scaleUnambiguousSpacing()
      }],
      /**
       * Padding Inline End
       * @see https://tailwindcss.com/docs/padding
       */
      pe: [{
        pe: scaleUnambiguousSpacing()
      }],
      /**
       * Padding Block Start
       * @see https://tailwindcss.com/docs/padding
       */
      pbs: [{
        pbs: scaleUnambiguousSpacing()
      }],
      /**
       * Padding Block End
       * @see https://tailwindcss.com/docs/padding
       */
      pbe: [{
        pbe: scaleUnambiguousSpacing()
      }],
      /**
       * Padding Top
       * @see https://tailwindcss.com/docs/padding
       */
      pt: [{
        pt: scaleUnambiguousSpacing()
      }],
      /**
       * Padding Right
       * @see https://tailwindcss.com/docs/padding
       */
      pr: [{
        pr: scaleUnambiguousSpacing()
      }],
      /**
       * Padding Bottom
       * @see https://tailwindcss.com/docs/padding
       */
      pb: [{
        pb: scaleUnambiguousSpacing()
      }],
      /**
       * Padding Left
       * @see https://tailwindcss.com/docs/padding
       */
      pl: [{
        pl: scaleUnambiguousSpacing()
      }],
      /**
       * Margin
       * @see https://tailwindcss.com/docs/margin
       */
      m: [{
        m: scaleMargin()
      }],
      /**
       * Margin Inline
       * @see https://tailwindcss.com/docs/margin
       */
      mx: [{
        mx: scaleMargin()
      }],
      /**
       * Margin Block
       * @see https://tailwindcss.com/docs/margin
       */
      my: [{
        my: scaleMargin()
      }],
      /**
       * Margin Inline Start
       * @see https://tailwindcss.com/docs/margin
       */
      ms: [{
        ms: scaleMargin()
      }],
      /**
       * Margin Inline End
       * @see https://tailwindcss.com/docs/margin
       */
      me: [{
        me: scaleMargin()
      }],
      /**
       * Margin Block Start
       * @see https://tailwindcss.com/docs/margin
       */
      mbs: [{
        mbs: scaleMargin()
      }],
      /**
       * Margin Block End
       * @see https://tailwindcss.com/docs/margin
       */
      mbe: [{
        mbe: scaleMargin()
      }],
      /**
       * Margin Top
       * @see https://tailwindcss.com/docs/margin
       */
      mt: [{
        mt: scaleMargin()
      }],
      /**
       * Margin Right
       * @see https://tailwindcss.com/docs/margin
       */
      mr: [{
        mr: scaleMargin()
      }],
      /**
       * Margin Bottom
       * @see https://tailwindcss.com/docs/margin
       */
      mb: [{
        mb: scaleMargin()
      }],
      /**
       * Margin Left
       * @see https://tailwindcss.com/docs/margin
       */
      ml: [{
        ml: scaleMargin()
      }],
      /**
       * Space Between X
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      "space-x": [{
        "space-x": scaleUnambiguousSpacing()
      }],
      /**
       * Space Between X Reverse
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      "space-x-reverse": ["space-x-reverse"],
      /**
       * Space Between Y
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      "space-y": [{
        "space-y": scaleUnambiguousSpacing()
      }],
      /**
       * Space Between Y Reverse
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      "space-y-reverse": ["space-y-reverse"],
      // --------------
      // --- Sizing ---
      // --------------
      /**
       * Size
       * @see https://tailwindcss.com/docs/width#setting-both-width-and-height
       */
      size: [{
        size: scaleSizing()
      }],
      /**
       * Inline Size
       * @see https://tailwindcss.com/docs/inline-size
       */
      "inline-size": [{
        inline: ["auto", ...scaleSizingInline()]
      }],
      /**
       * Min-Inline Size
       * @see https://tailwindcss.com/docs/min-inline-size
       */
      "min-inline-size": [{
        "min-inline": ["auto", ...scaleSizingInline()]
      }],
      /**
       * Max-Inline Size
       * @see https://tailwindcss.com/docs/max-inline-size
       */
      "max-inline-size": [{
        "max-inline": ["none", ...scaleSizingInline()]
      }],
      /**
       * Block Size
       * @see https://tailwindcss.com/docs/block-size
       */
      "block-size": [{
        block: ["auto", ...scaleSizingBlock()]
      }],
      /**
       * Min-Block Size
       * @see https://tailwindcss.com/docs/min-block-size
       */
      "min-block-size": [{
        "min-block": ["auto", ...scaleSizingBlock()]
      }],
      /**
       * Max-Block Size
       * @see https://tailwindcss.com/docs/max-block-size
       */
      "max-block-size": [{
        "max-block": ["none", ...scaleSizingBlock()]
      }],
      /**
       * Width
       * @see https://tailwindcss.com/docs/width
       */
      w: [{
        w: [themeContainer, "screen", ...scaleSizing()]
      }],
      /**
       * Min-Width
       * @see https://tailwindcss.com/docs/min-width
       */
      "min-w": [{
        "min-w": [
          themeContainer,
          "screen",
          /** Deprecated. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          "none",
          ...scaleSizing()
        ]
      }],
      /**
       * Max-Width
       * @see https://tailwindcss.com/docs/max-width
       */
      "max-w": [{
        "max-w": [
          themeContainer,
          "screen",
          "none",
          /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          "prose",
          /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          {
            screen: [themeBreakpoint]
          },
          ...scaleSizing()
        ]
      }],
      /**
       * Height
       * @see https://tailwindcss.com/docs/height
       */
      h: [{
        h: ["screen", "lh", ...scaleSizing()]
      }],
      /**
       * Min-Height
       * @see https://tailwindcss.com/docs/min-height
       */
      "min-h": [{
        "min-h": ["screen", "lh", "none", ...scaleSizing()]
      }],
      /**
       * Max-Height
       * @see https://tailwindcss.com/docs/max-height
       */
      "max-h": [{
        "max-h": ["screen", "lh", "none", ...scaleSizing()]
      }],
      // ------------------
      // --- Typography ---
      // ------------------
      /**
       * Font Size
       * @see https://tailwindcss.com/docs/font-size
       */
      "font-size": [{
        text: ["base", themeText, isArbitraryVariableLength, isArbitraryLength]
      }],
      /**
       * Font Smoothing
       * @see https://tailwindcss.com/docs/font-smoothing
       */
      "font-smoothing": ["antialiased", "subpixel-antialiased"],
      /**
       * Font Style
       * @see https://tailwindcss.com/docs/font-style
       */
      "font-style": ["italic", "not-italic"],
      /**
       * Font Weight
       * @see https://tailwindcss.com/docs/font-weight
       */
      "font-weight": [{
        font: [themeFontWeight, isArbitraryVariableWeight, isArbitraryWeight]
      }],
      /**
       * Font Stretch
       * @see https://tailwindcss.com/docs/font-stretch
       */
      "font-stretch": [{
        "font-stretch": ["ultra-condensed", "extra-condensed", "condensed", "semi-condensed", "normal", "semi-expanded", "expanded", "extra-expanded", "ultra-expanded", isPercent, isArbitraryValue]
      }],
      /**
       * Font Family
       * @see https://tailwindcss.com/docs/font-family
       */
      "font-family": [{
        font: [isArbitraryVariableFamilyName, isArbitraryFamilyName, themeFont]
      }],
      /**
       * Font Feature Settings
       * @see https://tailwindcss.com/docs/font-feature-settings
       */
      "font-features": [{
        "font-features": [isArbitraryValue]
      }],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-normal": ["normal-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-ordinal": ["ordinal"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-slashed-zero": ["slashed-zero"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-figure": ["lining-nums", "oldstyle-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-spacing": ["proportional-nums", "tabular-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-fraction": ["diagonal-fractions", "stacked-fractions"],
      /**
       * Letter Spacing
       * @see https://tailwindcss.com/docs/letter-spacing
       */
      tracking: [{
        tracking: [themeTracking, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Line Clamp
       * @see https://tailwindcss.com/docs/line-clamp
       */
      "line-clamp": [{
        "line-clamp": [isNumber, "none", isArbitraryVariable, isArbitraryNumber]
      }],
      /**
       * Line Height
       * @see https://tailwindcss.com/docs/line-height
       */
      leading: [{
        leading: [
          "none",
          /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          themeLeading,
          ...scaleUnambiguousSpacing()
        ]
      }],
      /**
       * List Style Image
       * @see https://tailwindcss.com/docs/list-style-image
       */
      "list-image": [{
        "list-image": ["none", isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * List Style Position
       * @see https://tailwindcss.com/docs/list-style-position
       */
      "list-style-position": [{
        list: ["inside", "outside"]
      }],
      /**
       * List Style Type
       * @see https://tailwindcss.com/docs/list-style-type
       */
      "list-style-type": [{
        list: ["disc", "decimal", "none", isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Text Alignment
       * @see https://tailwindcss.com/docs/text-align
       */
      "text-alignment": [{
        text: ["left", "center", "right", "justify", "start", "end"]
      }],
      /**
       * Placeholder Color
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://v3.tailwindcss.com/docs/placeholder-color
       */
      "placeholder-color": [{
        placeholder: scaleColor()
      }],
      /**
       * Text Color
       * @see https://tailwindcss.com/docs/text-color
       */
      "text-color": [{
        text: scaleColor()
      }],
      /**
       * Text Decoration
       * @see https://tailwindcss.com/docs/text-decoration
       */
      "text-decoration": ["underline", "overline", "line-through", "no-underline"],
      /**
       * Text Decoration Style
       * @see https://tailwindcss.com/docs/text-decoration-style
       */
      "text-decoration-style": [{
        decoration: [...scaleLineStyle(), "wavy"]
      }],
      /**
       * Text Decoration Thickness
       * @see https://tailwindcss.com/docs/text-decoration-thickness
       */
      "text-decoration-thickness": [{
        decoration: [isNumber, "from-font", "auto", isArbitraryVariable, isArbitraryLength]
      }],
      /**
       * Text Decoration Color
       * @see https://tailwindcss.com/docs/text-decoration-color
       */
      "text-decoration-color": [{
        decoration: scaleColor()
      }],
      /**
       * Text Underline Offset
       * @see https://tailwindcss.com/docs/text-underline-offset
       */
      "underline-offset": [{
        "underline-offset": [isNumber, "auto", isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Text Transform
       * @see https://tailwindcss.com/docs/text-transform
       */
      "text-transform": ["uppercase", "lowercase", "capitalize", "normal-case"],
      /**
       * Text Overflow
       * @see https://tailwindcss.com/docs/text-overflow
       */
      "text-overflow": ["truncate", "text-ellipsis", "text-clip"],
      /**
       * Text Wrap
       * @see https://tailwindcss.com/docs/text-wrap
       */
      "text-wrap": [{
        text: ["wrap", "nowrap", "balance", "pretty"]
      }],
      /**
       * Text Indent
       * @see https://tailwindcss.com/docs/text-indent
       */
      indent: [{
        indent: scaleUnambiguousSpacing()
      }],
      /**
       * Tab Size
       * @see https://tailwindcss.com/docs/tab-size
       */
      "tab-size": [{
        tab: [isInteger, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Vertical Alignment
       * @see https://tailwindcss.com/docs/vertical-align
       */
      "vertical-align": [{
        align: ["baseline", "top", "middle", "bottom", "text-top", "text-bottom", "sub", "super", isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Whitespace
       * @see https://tailwindcss.com/docs/whitespace
       */
      whitespace: [{
        whitespace: ["normal", "nowrap", "pre", "pre-line", "pre-wrap", "break-spaces"]
      }],
      /**
       * Word Break
       * @see https://tailwindcss.com/docs/word-break
       */
      break: [{
        break: ["normal", "words", "all", "keep"]
      }],
      /**
       * Overflow Wrap
       * @see https://tailwindcss.com/docs/overflow-wrap
       */
      wrap: [{
        wrap: ["break-word", "anywhere", "normal"]
      }],
      /**
       * Hyphens
       * @see https://tailwindcss.com/docs/hyphens
       */
      hyphens: [{
        hyphens: ["none", "manual", "auto"]
      }],
      /**
       * Content
       * @see https://tailwindcss.com/docs/content
       */
      content: [{
        content: ["none", isArbitraryVariable, isArbitraryValue]
      }],
      // -------------------
      // --- Backgrounds ---
      // -------------------
      /**
       * Background Attachment
       * @see https://tailwindcss.com/docs/background-attachment
       */
      "bg-attachment": [{
        bg: ["fixed", "local", "scroll"]
      }],
      /**
       * Background Clip
       * @see https://tailwindcss.com/docs/background-clip
       */
      "bg-clip": [{
        "bg-clip": ["border", "padding", "content", "text"]
      }],
      /**
       * Background Origin
       * @see https://tailwindcss.com/docs/background-origin
       */
      "bg-origin": [{
        "bg-origin": ["border", "padding", "content"]
      }],
      /**
       * Background Position
       * @see https://tailwindcss.com/docs/background-position
       */
      "bg-position": [{
        bg: scaleBgPosition()
      }],
      /**
       * Background Repeat
       * @see https://tailwindcss.com/docs/background-repeat
       */
      "bg-repeat": [{
        bg: scaleBgRepeat()
      }],
      /**
       * Background Size
       * @see https://tailwindcss.com/docs/background-size
       */
      "bg-size": [{
        bg: scaleBgSize()
      }],
      /**
       * Background Image
       * @see https://tailwindcss.com/docs/background-image
       */
      "bg-image": [{
        bg: ["none", {
          linear: [{
            to: ["t", "tr", "r", "br", "b", "bl", "l", "tl"]
          }, isInteger, isArbitraryVariable, isArbitraryValue],
          radial: ["", isArbitraryVariable, isArbitraryValue],
          conic: ["", isInteger, isArbitraryVariable, isArbitraryValue]
        }, isArbitraryVariableImage, isArbitraryImage]
      }],
      /**
       * Background Color
       * @see https://tailwindcss.com/docs/background-color
       */
      "bg-color": [{
        bg: scaleColor()
      }],
      /**
       * Gradient Color Stops From Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from-pos": [{
        from: scaleGradientStopPosition()
      }],
      /**
       * Gradient Color Stops Via Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via-pos": [{
        via: scaleGradientStopPosition()
      }],
      /**
       * Gradient Color Stops To Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to-pos": [{
        to: scaleGradientStopPosition()
      }],
      /**
       * Gradient Color Stops From
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from": [{
        from: scaleColor()
      }],
      /**
       * Gradient Color Stops Via
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via": [{
        via: scaleColor()
      }],
      /**
       * Gradient Color Stops To
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to": [{
        to: scaleColor()
      }],
      // ---------------
      // --- Borders ---
      // ---------------
      /**
       * Border Radius
       * @see https://tailwindcss.com/docs/border-radius
       */
      rounded: [{
        rounded: scaleRadius()
      }],
      /**
       * Border Radius Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-s": [{
        "rounded-s": scaleRadius()
      }],
      /**
       * Border Radius End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-e": [{
        "rounded-e": scaleRadius()
      }],
      /**
       * Border Radius Top
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-t": [{
        "rounded-t": scaleRadius()
      }],
      /**
       * Border Radius Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-r": [{
        "rounded-r": scaleRadius()
      }],
      /**
       * Border Radius Bottom
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-b": [{
        "rounded-b": scaleRadius()
      }],
      /**
       * Border Radius Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-l": [{
        "rounded-l": scaleRadius()
      }],
      /**
       * Border Radius Start Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ss": [{
        "rounded-ss": scaleRadius()
      }],
      /**
       * Border Radius Start End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-se": [{
        "rounded-se": scaleRadius()
      }],
      /**
       * Border Radius End End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ee": [{
        "rounded-ee": scaleRadius()
      }],
      /**
       * Border Radius End Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-es": [{
        "rounded-es": scaleRadius()
      }],
      /**
       * Border Radius Top Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tl": [{
        "rounded-tl": scaleRadius()
      }],
      /**
       * Border Radius Top Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tr": [{
        "rounded-tr": scaleRadius()
      }],
      /**
       * Border Radius Bottom Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-br": [{
        "rounded-br": scaleRadius()
      }],
      /**
       * Border Radius Bottom Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-bl": [{
        "rounded-bl": scaleRadius()
      }],
      /**
       * Border Width
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w": [{
        border: scaleBorderWidth()
      }],
      /**
       * Border Width Inline
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-x": [{
        "border-x": scaleBorderWidth()
      }],
      /**
       * Border Width Block
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-y": [{
        "border-y": scaleBorderWidth()
      }],
      /**
       * Border Width Inline Start
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-s": [{
        "border-s": scaleBorderWidth()
      }],
      /**
       * Border Width Inline End
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-e": [{
        "border-e": scaleBorderWidth()
      }],
      /**
       * Border Width Block Start
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-bs": [{
        "border-bs": scaleBorderWidth()
      }],
      /**
       * Border Width Block End
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-be": [{
        "border-be": scaleBorderWidth()
      }],
      /**
       * Border Width Top
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-t": [{
        "border-t": scaleBorderWidth()
      }],
      /**
       * Border Width Right
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-r": [{
        "border-r": scaleBorderWidth()
      }],
      /**
       * Border Width Bottom
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-b": [{
        "border-b": scaleBorderWidth()
      }],
      /**
       * Border Width Left
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-l": [{
        "border-l": scaleBorderWidth()
      }],
      /**
       * Divide Width X
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-x": [{
        "divide-x": scaleBorderWidth()
      }],
      /**
       * Divide Width X Reverse
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-x-reverse": ["divide-x-reverse"],
      /**
       * Divide Width Y
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-y": [{
        "divide-y": scaleBorderWidth()
      }],
      /**
       * Divide Width Y Reverse
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-y-reverse": ["divide-y-reverse"],
      /**
       * Border Style
       * @see https://tailwindcss.com/docs/border-style
       */
      "border-style": [{
        border: [...scaleLineStyle(), "hidden", "none"]
      }],
      /**
       * Divide Style
       * @see https://tailwindcss.com/docs/border-style#setting-the-divider-style
       */
      "divide-style": [{
        divide: [...scaleLineStyle(), "hidden", "none"]
      }],
      /**
       * Border Color
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color": [{
        border: scaleColor()
      }],
      /**
       * Border Color Inline
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-x": [{
        "border-x": scaleColor()
      }],
      /**
       * Border Color Block
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-y": [{
        "border-y": scaleColor()
      }],
      /**
       * Border Color Inline Start
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-s": [{
        "border-s": scaleColor()
      }],
      /**
       * Border Color Inline End
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-e": [{
        "border-e": scaleColor()
      }],
      /**
       * Border Color Block Start
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-bs": [{
        "border-bs": scaleColor()
      }],
      /**
       * Border Color Block End
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-be": [{
        "border-be": scaleColor()
      }],
      /**
       * Border Color Top
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-t": [{
        "border-t": scaleColor()
      }],
      /**
       * Border Color Right
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-r": [{
        "border-r": scaleColor()
      }],
      /**
       * Border Color Bottom
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-b": [{
        "border-b": scaleColor()
      }],
      /**
       * Border Color Left
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-l": [{
        "border-l": scaleColor()
      }],
      /**
       * Divide Color
       * @see https://tailwindcss.com/docs/divide-color
       */
      "divide-color": [{
        divide: scaleColor()
      }],
      /**
       * Outline Style
       * @see https://tailwindcss.com/docs/outline-style
       */
      "outline-style": [{
        outline: [...scaleLineStyle(), "none", "hidden"]
      }],
      /**
       * Outline Offset
       * @see https://tailwindcss.com/docs/outline-offset
       */
      "outline-offset": [{
        "outline-offset": [isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Outline Width
       * @see https://tailwindcss.com/docs/outline-width
       */
      "outline-w": [{
        outline: ["", isNumber, isArbitraryVariableLength, isArbitraryLength]
      }],
      /**
       * Outline Color
       * @see https://tailwindcss.com/docs/outline-color
       */
      "outline-color": [{
        outline: scaleColor()
      }],
      // ---------------
      // --- Effects ---
      // ---------------
      /**
       * Box Shadow
       * @see https://tailwindcss.com/docs/box-shadow
       */
      shadow: [{
        shadow: [
          // Deprecated since Tailwind CSS v4.0.0
          "",
          // Deprecated since Tailwind CSS v4.0.0
          "inner",
          "none",
          themeShadow,
          isArbitraryVariableShadow,
          isArbitraryShadow
        ]
      }],
      /**
       * Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-shadow-color
       */
      "shadow-color": [{
        shadow: scaleColor()
      }],
      /**
       * Inset Box Shadow
       * @see https://tailwindcss.com/docs/box-shadow#adding-an-inset-shadow
       */
      "inset-shadow": [{
        "inset-shadow": ["none", themeInsetShadow, isArbitraryVariableShadow, isArbitraryShadow]
      }],
      /**
       * Inset Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-inset-shadow-color
       */
      "inset-shadow-color": [{
        "inset-shadow": scaleColor()
      }],
      /**
       * Ring Width
       * @see https://tailwindcss.com/docs/box-shadow#adding-a-ring
       */
      "ring-w": [{
        ring: scaleBorderWidth()
      }],
      /**
       * Ring Width Inset
       * @see https://v3.tailwindcss.com/docs/ring-width#inset-rings
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      "ring-w-inset": ["ring-inset"],
      /**
       * Ring Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-ring-color
       */
      "ring-color": [{
        ring: scaleColor()
      }],
      /**
       * Ring Offset Width
       * @see https://v3.tailwindcss.com/docs/ring-offset-width
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      "ring-offset-w": [{
        "ring-offset": [isNumber, isArbitraryLength]
      }],
      /**
       * Ring Offset Color
       * @see https://v3.tailwindcss.com/docs/ring-offset-color
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      "ring-offset-color": [{
        "ring-offset": scaleColor()
      }],
      /**
       * Inset Ring Width
       * @see https://tailwindcss.com/docs/box-shadow#adding-an-inset-ring
       */
      "inset-ring-w": [{
        "inset-ring": scaleBorderWidth()
      }],
      /**
       * Inset Ring Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-inset-ring-color
       */
      "inset-ring-color": [{
        "inset-ring": scaleColor()
      }],
      /**
       * Text Shadow
       * @see https://tailwindcss.com/docs/text-shadow
       */
      "text-shadow": [{
        "text-shadow": ["none", themeTextShadow, isArbitraryVariableShadow, isArbitraryShadow]
      }],
      /**
       * Text Shadow Color
       * @see https://tailwindcss.com/docs/text-shadow#setting-the-shadow-color
       */
      "text-shadow-color": [{
        "text-shadow": scaleColor()
      }],
      /**
       * Opacity
       * @see https://tailwindcss.com/docs/opacity
       */
      opacity: [{
        opacity: [isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Mix Blend Mode
       * @see https://tailwindcss.com/docs/mix-blend-mode
       */
      "mix-blend": [{
        "mix-blend": [...scaleBlendMode(), "plus-darker", "plus-lighter"]
      }],
      /**
       * Background Blend Mode
       * @see https://tailwindcss.com/docs/background-blend-mode
       */
      "bg-blend": [{
        "bg-blend": scaleBlendMode()
      }],
      /**
       * Mask Clip
       * @see https://tailwindcss.com/docs/mask-clip
       */
      "mask-clip": [{
        "mask-clip": ["border", "padding", "content", "fill", "stroke", "view"]
      }, "mask-no-clip"],
      /**
       * Mask Composite
       * @see https://tailwindcss.com/docs/mask-composite
       */
      "mask-composite": [{
        mask: ["add", "subtract", "intersect", "exclude"]
      }],
      /**
       * Mask Image
       * @see https://tailwindcss.com/docs/mask-image
       */
      "mask-image-linear-pos": [{
        "mask-linear": [isNumber]
      }],
      "mask-image-linear-from-pos": [{
        "mask-linear-from": scaleMaskImagePosition()
      }],
      "mask-image-linear-to-pos": [{
        "mask-linear-to": scaleMaskImagePosition()
      }],
      "mask-image-linear-from-color": [{
        "mask-linear-from": scaleColor()
      }],
      "mask-image-linear-to-color": [{
        "mask-linear-to": scaleColor()
      }],
      "mask-image-t-from-pos": [{
        "mask-t-from": scaleMaskImagePosition()
      }],
      "mask-image-t-to-pos": [{
        "mask-t-to": scaleMaskImagePosition()
      }],
      "mask-image-t-from-color": [{
        "mask-t-from": scaleColor()
      }],
      "mask-image-t-to-color": [{
        "mask-t-to": scaleColor()
      }],
      "mask-image-r-from-pos": [{
        "mask-r-from": scaleMaskImagePosition()
      }],
      "mask-image-r-to-pos": [{
        "mask-r-to": scaleMaskImagePosition()
      }],
      "mask-image-r-from-color": [{
        "mask-r-from": scaleColor()
      }],
      "mask-image-r-to-color": [{
        "mask-r-to": scaleColor()
      }],
      "mask-image-b-from-pos": [{
        "mask-b-from": scaleMaskImagePosition()
      }],
      "mask-image-b-to-pos": [{
        "mask-b-to": scaleMaskImagePosition()
      }],
      "mask-image-b-from-color": [{
        "mask-b-from": scaleColor()
      }],
      "mask-image-b-to-color": [{
        "mask-b-to": scaleColor()
      }],
      "mask-image-l-from-pos": [{
        "mask-l-from": scaleMaskImagePosition()
      }],
      "mask-image-l-to-pos": [{
        "mask-l-to": scaleMaskImagePosition()
      }],
      "mask-image-l-from-color": [{
        "mask-l-from": scaleColor()
      }],
      "mask-image-l-to-color": [{
        "mask-l-to": scaleColor()
      }],
      "mask-image-x-from-pos": [{
        "mask-x-from": scaleMaskImagePosition()
      }],
      "mask-image-x-to-pos": [{
        "mask-x-to": scaleMaskImagePosition()
      }],
      "mask-image-x-from-color": [{
        "mask-x-from": scaleColor()
      }],
      "mask-image-x-to-color": [{
        "mask-x-to": scaleColor()
      }],
      "mask-image-y-from-pos": [{
        "mask-y-from": scaleMaskImagePosition()
      }],
      "mask-image-y-to-pos": [{
        "mask-y-to": scaleMaskImagePosition()
      }],
      "mask-image-y-from-color": [{
        "mask-y-from": scaleColor()
      }],
      "mask-image-y-to-color": [{
        "mask-y-to": scaleColor()
      }],
      "mask-image-radial": [{
        "mask-radial": [isArbitraryVariable, isArbitraryValue]
      }],
      "mask-image-radial-from-pos": [{
        "mask-radial-from": scaleMaskImagePosition()
      }],
      "mask-image-radial-to-pos": [{
        "mask-radial-to": scaleMaskImagePosition()
      }],
      "mask-image-radial-from-color": [{
        "mask-radial-from": scaleColor()
      }],
      "mask-image-radial-to-color": [{
        "mask-radial-to": scaleColor()
      }],
      "mask-image-radial-shape": [{
        "mask-radial": ["circle", "ellipse"]
      }],
      "mask-image-radial-size": [{
        "mask-radial": [{
          closest: ["side", "corner"],
          farthest: ["side", "corner"]
        }]
      }],
      "mask-image-radial-pos": [{
        "mask-radial-at": scalePosition()
      }],
      "mask-image-conic-pos": [{
        "mask-conic": [isNumber]
      }],
      "mask-image-conic-from-pos": [{
        "mask-conic-from": scaleMaskImagePosition()
      }],
      "mask-image-conic-to-pos": [{
        "mask-conic-to": scaleMaskImagePosition()
      }],
      "mask-image-conic-from-color": [{
        "mask-conic-from": scaleColor()
      }],
      "mask-image-conic-to-color": [{
        "mask-conic-to": scaleColor()
      }],
      /**
       * Mask Mode
       * @see https://tailwindcss.com/docs/mask-mode
       */
      "mask-mode": [{
        mask: ["alpha", "luminance", "match"]
      }],
      /**
       * Mask Origin
       * @see https://tailwindcss.com/docs/mask-origin
       */
      "mask-origin": [{
        "mask-origin": ["border", "padding", "content", "fill", "stroke", "view"]
      }],
      /**
       * Mask Position
       * @see https://tailwindcss.com/docs/mask-position
       */
      "mask-position": [{
        mask: scaleBgPosition()
      }],
      /**
       * Mask Repeat
       * @see https://tailwindcss.com/docs/mask-repeat
       */
      "mask-repeat": [{
        mask: scaleBgRepeat()
      }],
      /**
       * Mask Size
       * @see https://tailwindcss.com/docs/mask-size
       */
      "mask-size": [{
        mask: scaleBgSize()
      }],
      /**
       * Mask Type
       * @see https://tailwindcss.com/docs/mask-type
       */
      "mask-type": [{
        "mask-type": ["alpha", "luminance"]
      }],
      /**
       * Mask Image
       * @see https://tailwindcss.com/docs/mask-image
       */
      "mask-image": [{
        mask: ["none", isArbitraryVariable, isArbitraryValue]
      }],
      // ---------------
      // --- Filters ---
      // ---------------
      /**
       * Filter
       * @see https://tailwindcss.com/docs/filter
       */
      filter: [{
        filter: [
          // Deprecated since Tailwind CSS v3.0.0
          "",
          "none",
          isArbitraryVariable,
          isArbitraryValue
        ]
      }],
      /**
       * Blur
       * @see https://tailwindcss.com/docs/blur
       */
      blur: [{
        blur: scaleBlur()
      }],
      /**
       * Brightness
       * @see https://tailwindcss.com/docs/brightness
       */
      brightness: [{
        brightness: [isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Contrast
       * @see https://tailwindcss.com/docs/contrast
       */
      contrast: [{
        contrast: [isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Drop Shadow
       * @see https://tailwindcss.com/docs/drop-shadow
       */
      "drop-shadow": [{
        "drop-shadow": [
          // Deprecated since Tailwind CSS v4.0.0
          "",
          "none",
          themeDropShadow,
          isArbitraryVariableShadow,
          isArbitraryShadow
        ]
      }],
      /**
       * Drop Shadow Color
       * @see https://tailwindcss.com/docs/filter-drop-shadow#setting-the-shadow-color
       */
      "drop-shadow-color": [{
        "drop-shadow": scaleColor()
      }],
      /**
       * Grayscale
       * @see https://tailwindcss.com/docs/grayscale
       */
      grayscale: [{
        grayscale: ["", isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Hue Rotate
       * @see https://tailwindcss.com/docs/hue-rotate
       */
      "hue-rotate": [{
        "hue-rotate": [isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Invert
       * @see https://tailwindcss.com/docs/invert
       */
      invert: [{
        invert: ["", isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Saturate
       * @see https://tailwindcss.com/docs/saturate
       */
      saturate: [{
        saturate: [isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Sepia
       * @see https://tailwindcss.com/docs/sepia
       */
      sepia: [{
        sepia: ["", isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Backdrop Filter
       * @see https://tailwindcss.com/docs/backdrop-filter
       */
      "backdrop-filter": [{
        "backdrop-filter": [
          // Deprecated since Tailwind CSS v3.0.0
          "",
          "none",
          isArbitraryVariable,
          isArbitraryValue
        ]
      }],
      /**
       * Backdrop Blur
       * @see https://tailwindcss.com/docs/backdrop-blur
       */
      "backdrop-blur": [{
        "backdrop-blur": scaleBlur()
      }],
      /**
       * Backdrop Brightness
       * @see https://tailwindcss.com/docs/backdrop-brightness
       */
      "backdrop-brightness": [{
        "backdrop-brightness": [isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Backdrop Contrast
       * @see https://tailwindcss.com/docs/backdrop-contrast
       */
      "backdrop-contrast": [{
        "backdrop-contrast": [isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Backdrop Grayscale
       * @see https://tailwindcss.com/docs/backdrop-grayscale
       */
      "backdrop-grayscale": [{
        "backdrop-grayscale": ["", isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Backdrop Hue Rotate
       * @see https://tailwindcss.com/docs/backdrop-hue-rotate
       */
      "backdrop-hue-rotate": [{
        "backdrop-hue-rotate": [isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Backdrop Invert
       * @see https://tailwindcss.com/docs/backdrop-invert
       */
      "backdrop-invert": [{
        "backdrop-invert": ["", isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Backdrop Opacity
       * @see https://tailwindcss.com/docs/backdrop-opacity
       */
      "backdrop-opacity": [{
        "backdrop-opacity": [isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Backdrop Saturate
       * @see https://tailwindcss.com/docs/backdrop-saturate
       */
      "backdrop-saturate": [{
        "backdrop-saturate": [isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Backdrop Sepia
       * @see https://tailwindcss.com/docs/backdrop-sepia
       */
      "backdrop-sepia": [{
        "backdrop-sepia": ["", isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      // --------------
      // --- Tables ---
      // --------------
      /**
       * Border Collapse
       * @see https://tailwindcss.com/docs/border-collapse
       */
      "border-collapse": [{
        border: ["collapse", "separate"]
      }],
      /**
       * Border Spacing
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing": [{
        "border-spacing": scaleUnambiguousSpacing()
      }],
      /**
       * Border Spacing X
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-x": [{
        "border-spacing-x": scaleUnambiguousSpacing()
      }],
      /**
       * Border Spacing Y
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-y": [{
        "border-spacing-y": scaleUnambiguousSpacing()
      }],
      /**
       * Table Layout
       * @see https://tailwindcss.com/docs/table-layout
       */
      "table-layout": [{
        table: ["auto", "fixed"]
      }],
      /**
       * Caption Side
       * @see https://tailwindcss.com/docs/caption-side
       */
      caption: [{
        caption: ["top", "bottom"]
      }],
      // ---------------------------------
      // --- Transitions and Animation ---
      // ---------------------------------
      /**
       * Transition Property
       * @see https://tailwindcss.com/docs/transition-property
       */
      transition: [{
        transition: ["", "all", "colors", "opacity", "shadow", "transform", "none", isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Transition Behavior
       * @see https://tailwindcss.com/docs/transition-behavior
       */
      "transition-behavior": [{
        transition: ["normal", "discrete"]
      }],
      /**
       * Transition Duration
       * @see https://tailwindcss.com/docs/transition-duration
       */
      duration: [{
        duration: [isNumber, "initial", isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Transition Timing Function
       * @see https://tailwindcss.com/docs/transition-timing-function
       */
      ease: [{
        ease: ["linear", "initial", themeEase, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Transition Delay
       * @see https://tailwindcss.com/docs/transition-delay
       */
      delay: [{
        delay: [isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Animation
       * @see https://tailwindcss.com/docs/animation
       */
      animate: [{
        animate: ["none", themeAnimate, isArbitraryVariable, isArbitraryValue]
      }],
      // ------------------
      // --- Transforms ---
      // ------------------
      /**
       * Backface Visibility
       * @see https://tailwindcss.com/docs/backface-visibility
       */
      backface: [{
        backface: ["hidden", "visible"]
      }],
      /**
       * Perspective
       * @see https://tailwindcss.com/docs/perspective
       */
      perspective: [{
        perspective: [themePerspective, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Perspective Origin
       * @see https://tailwindcss.com/docs/perspective-origin
       */
      "perspective-origin": [{
        "perspective-origin": scalePositionWithArbitrary()
      }],
      /**
       * Rotate
       * @see https://tailwindcss.com/docs/rotate
       */
      rotate: [{
        rotate: scaleRotate()
      }],
      /**
       * Rotate X
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-x": [{
        "rotate-x": scaleRotate()
      }],
      /**
       * Rotate Y
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-y": [{
        "rotate-y": scaleRotate()
      }],
      /**
       * Rotate Z
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-z": [{
        "rotate-z": scaleRotate()
      }],
      /**
       * Scale
       * @see https://tailwindcss.com/docs/scale
       */
      scale: [{
        scale: scaleScale()
      }],
      /**
       * Scale X
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-x": [{
        "scale-x": scaleScale()
      }],
      /**
       * Scale Y
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-y": [{
        "scale-y": scaleScale()
      }],
      /**
       * Scale Z
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-z": [{
        "scale-z": scaleScale()
      }],
      /**
       * Scale 3D
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-3d": ["scale-3d"],
      /**
       * Skew
       * @see https://tailwindcss.com/docs/skew
       */
      skew: [{
        skew: scaleSkew()
      }],
      /**
       * Skew X
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-x": [{
        "skew-x": scaleSkew()
      }],
      /**
       * Skew Y
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-y": [{
        "skew-y": scaleSkew()
      }],
      /**
       * Transform
       * @see https://tailwindcss.com/docs/transform
       */
      transform: [{
        transform: [isArbitraryVariable, isArbitraryValue, "", "none", "gpu", "cpu"]
      }],
      /**
       * Transform Origin
       * @see https://tailwindcss.com/docs/transform-origin
       */
      "transform-origin": [{
        origin: scalePositionWithArbitrary()
      }],
      /**
       * Transform Style
       * @see https://tailwindcss.com/docs/transform-style
       */
      "transform-style": [{
        transform: ["3d", "flat"]
      }],
      /**
       * Translate
       * @see https://tailwindcss.com/docs/translate
       */
      translate: [{
        translate: scaleTranslate()
      }],
      /**
       * Translate X
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-x": [{
        "translate-x": scaleTranslate()
      }],
      /**
       * Translate Y
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-y": [{
        "translate-y": scaleTranslate()
      }],
      /**
       * Translate Z
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-z": [{
        "translate-z": scaleTranslate()
      }],
      /**
       * Translate None
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-none": ["translate-none"],
      /**
       * Zoom
       * @see https://tailwindcss.com/docs/zoom
       */
      zoom: [{
        zoom: [isInteger, isArbitraryVariable, isArbitraryValue]
      }],
      // ---------------------
      // --- Interactivity ---
      // ---------------------
      /**
       * Accent Color
       * @see https://tailwindcss.com/docs/accent-color
       */
      accent: [{
        accent: scaleColor()
      }],
      /**
       * Appearance
       * @see https://tailwindcss.com/docs/appearance
       */
      appearance: [{
        appearance: ["none", "auto"]
      }],
      /**
       * Caret Color
       * @see https://tailwindcss.com/docs/just-in-time-mode#caret-color-utilities
       */
      "caret-color": [{
        caret: scaleColor()
      }],
      /**
       * Color Scheme
       * @see https://tailwindcss.com/docs/color-scheme
       */
      "color-scheme": [{
        scheme: ["normal", "dark", "light", "light-dark", "only-dark", "only-light"]
      }],
      /**
       * Cursor
       * @see https://tailwindcss.com/docs/cursor
       */
      cursor: [{
        cursor: ["auto", "default", "pointer", "wait", "text", "move", "help", "not-allowed", "none", "context-menu", "progress", "cell", "crosshair", "vertical-text", "alias", "copy", "no-drop", "grab", "grabbing", "all-scroll", "col-resize", "row-resize", "n-resize", "e-resize", "s-resize", "w-resize", "ne-resize", "nw-resize", "se-resize", "sw-resize", "ew-resize", "ns-resize", "nesw-resize", "nwse-resize", "zoom-in", "zoom-out", isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Field Sizing
       * @see https://tailwindcss.com/docs/field-sizing
       */
      "field-sizing": [{
        "field-sizing": ["fixed", "content"]
      }],
      /**
       * Pointer Events
       * @see https://tailwindcss.com/docs/pointer-events
       */
      "pointer-events": [{
        "pointer-events": ["auto", "none"]
      }],
      /**
       * Resize
       * @see https://tailwindcss.com/docs/resize
       */
      resize: [{
        resize: ["none", "", "y", "x"]
      }],
      /**
       * Scroll Behavior
       * @see https://tailwindcss.com/docs/scroll-behavior
       */
      "scroll-behavior": [{
        scroll: ["auto", "smooth"]
      }],
      /**
       * Scrollbar Thumb Color
       * @see https://tailwindcss.com/docs/scrollbar-color
       */
      "scrollbar-thumb-color": [{
        "scrollbar-thumb": scaleColor()
      }],
      /**
       * Scrollbar Track Color
       * @see https://tailwindcss.com/docs/scrollbar-color
       */
      "scrollbar-track-color": [{
        "scrollbar-track": scaleColor()
      }],
      /**
       * Scrollbar Gutter
       * @see https://tailwindcss.com/docs/scrollbar-gutter
       */
      "scrollbar-gutter": [{
        "scrollbar-gutter": ["auto", "stable", "both"]
      }],
      /**
       * Scrollbar Width
       * @see https://tailwindcss.com/docs/scrollbar-width
       */
      "scrollbar-w": [{
        scrollbar: ["auto", "thin", "none"]
      }],
      /**
       * Scroll Margin
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-m": [{
        "scroll-m": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Margin Inline
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mx": [{
        "scroll-mx": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Margin Block
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-my": [{
        "scroll-my": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Margin Inline Start
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ms": [{
        "scroll-ms": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Margin Inline End
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-me": [{
        "scroll-me": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Margin Block Start
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mbs": [{
        "scroll-mbs": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Margin Block End
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mbe": [{
        "scroll-mbe": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Margin Top
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mt": [{
        "scroll-mt": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Margin Right
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mr": [{
        "scroll-mr": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Margin Bottom
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mb": [{
        "scroll-mb": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Margin Left
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ml": [{
        "scroll-ml": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Padding
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-p": [{
        "scroll-p": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Padding Inline
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-px": [{
        "scroll-px": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Padding Block
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-py": [{
        "scroll-py": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Padding Inline Start
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-ps": [{
        "scroll-ps": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Padding Inline End
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pe": [{
        "scroll-pe": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Padding Block Start
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pbs": [{
        "scroll-pbs": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Padding Block End
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pbe": [{
        "scroll-pbe": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Padding Top
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pt": [{
        "scroll-pt": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Padding Right
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pr": [{
        "scroll-pr": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Padding Bottom
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pb": [{
        "scroll-pb": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Padding Left
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pl": [{
        "scroll-pl": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Snap Align
       * @see https://tailwindcss.com/docs/scroll-snap-align
       */
      "snap-align": [{
        snap: ["start", "end", "center", "align-none"]
      }],
      /**
       * Scroll Snap Stop
       * @see https://tailwindcss.com/docs/scroll-snap-stop
       */
      "snap-stop": [{
        snap: ["normal", "always"]
      }],
      /**
       * Scroll Snap Type
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */
      "snap-type": [{
        snap: ["none", "x", "y", "both"]
      }],
      /**
       * Scroll Snap Type Strictness
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */
      "snap-strictness": [{
        snap: ["mandatory", "proximity"]
      }],
      /**
       * Touch Action
       * @see https://tailwindcss.com/docs/touch-action
       */
      touch: [{
        touch: ["auto", "none", "manipulation"]
      }],
      /**
       * Touch Action X
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-x": [{
        "touch-pan": ["x", "left", "right"]
      }],
      /**
       * Touch Action Y
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-y": [{
        "touch-pan": ["y", "up", "down"]
      }],
      /**
       * Touch Action Pinch Zoom
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-pz": ["touch-pinch-zoom"],
      /**
       * User Select
       * @see https://tailwindcss.com/docs/user-select
       */
      select: [{
        select: ["none", "text", "all", "auto"]
      }],
      /**
       * Will Change
       * @see https://tailwindcss.com/docs/will-change
       */
      "will-change": [{
        "will-change": ["auto", "scroll", "contents", "transform", isArbitraryVariable, isArbitraryValue]
      }],
      // -----------
      // --- SVG ---
      // -----------
      /**
       * Fill
       * @see https://tailwindcss.com/docs/fill
       */
      fill: [{
        fill: ["none", ...scaleColor()]
      }],
      /**
       * Stroke Width
       * @see https://tailwindcss.com/docs/stroke-width
       */
      "stroke-w": [{
        stroke: [isNumber, isArbitraryVariableLength, isArbitraryLength, isArbitraryNumber]
      }],
      /**
       * Stroke
       * @see https://tailwindcss.com/docs/stroke
       */
      stroke: [{
        stroke: ["none", ...scaleColor()]
      }],
      // ---------------------
      // --- Accessibility ---
      // ---------------------
      /**
       * Forced Color Adjust
       * @see https://tailwindcss.com/docs/forced-color-adjust
       */
      "forced-color-adjust": [{
        "forced-color-adjust": ["auto", "none"]
      }]
    },
    conflictingClassGroups: {
      "container-named": ["container-type"],
      overflow: ["overflow-x", "overflow-y"],
      overscroll: ["overscroll-x", "overscroll-y"],
      inset: ["inset-x", "inset-y", "inset-bs", "inset-be", "start", "end", "top", "right", "bottom", "left"],
      "inset-x": ["start", "end", "right", "left"],
      "inset-y": ["inset-bs", "inset-be", "top", "bottom"],
      flex: ["basis", "grow", "shrink"],
      gap: ["gap-x", "gap-y"],
      p: ["px", "py", "ps", "pe", "pbs", "pbe", "pt", "pr", "pb", "pl"],
      px: ["ps", "pe", "pr", "pl"],
      py: ["pbs", "pbe", "pt", "pb"],
      m: ["mx", "my", "ms", "me", "mbs", "mbe", "mt", "mr", "mb", "ml"],
      mx: ["ms", "me", "mr", "ml"],
      my: ["mbs", "mbe", "mt", "mb"],
      size: ["w", "h"],
      "font-size": ["leading"],
      "fvn-normal": ["fvn-ordinal", "fvn-slashed-zero", "fvn-figure", "fvn-spacing", "fvn-fraction"],
      "fvn-ordinal": ["fvn-normal"],
      "fvn-slashed-zero": ["fvn-normal"],
      "fvn-figure": ["fvn-normal"],
      "fvn-spacing": ["fvn-normal"],
      "fvn-fraction": ["fvn-normal"],
      "line-clamp": ["display", "overflow"],
      rounded: ["rounded-s", "rounded-e", "rounded-t", "rounded-r", "rounded-b", "rounded-l", "rounded-ss", "rounded-se", "rounded-ee", "rounded-es", "rounded-tl", "rounded-tr", "rounded-br", "rounded-bl"],
      "rounded-s": ["rounded-ss", "rounded-es"],
      "rounded-e": ["rounded-se", "rounded-ee"],
      "rounded-t": ["rounded-tl", "rounded-tr"],
      "rounded-r": ["rounded-tr", "rounded-br"],
      "rounded-b": ["rounded-br", "rounded-bl"],
      "rounded-l": ["rounded-tl", "rounded-bl"],
      "border-spacing": ["border-spacing-x", "border-spacing-y"],
      "border-w": ["border-w-x", "border-w-y", "border-w-s", "border-w-e", "border-w-bs", "border-w-be", "border-w-t", "border-w-r", "border-w-b", "border-w-l"],
      "border-w-x": ["border-w-s", "border-w-e", "border-w-r", "border-w-l"],
      "border-w-y": ["border-w-bs", "border-w-be", "border-w-t", "border-w-b"],
      "border-color": ["border-color-x", "border-color-y", "border-color-s", "border-color-e", "border-color-bs", "border-color-be", "border-color-t", "border-color-r", "border-color-b", "border-color-l"],
      "border-color-x": ["border-color-s", "border-color-e", "border-color-r", "border-color-l"],
      "border-color-y": ["border-color-bs", "border-color-be", "border-color-t", "border-color-b"],
      translate: ["translate-x", "translate-y", "translate-none"],
      "translate-none": ["translate", "translate-x", "translate-y", "translate-z"],
      "scroll-m": ["scroll-mx", "scroll-my", "scroll-ms", "scroll-me", "scroll-mbs", "scroll-mbe", "scroll-mt", "scroll-mr", "scroll-mb", "scroll-ml"],
      "scroll-mx": ["scroll-ms", "scroll-me", "scroll-mr", "scroll-ml"],
      "scroll-my": ["scroll-mbs", "scroll-mbe", "scroll-mt", "scroll-mb"],
      "scroll-p": ["scroll-px", "scroll-py", "scroll-ps", "scroll-pe", "scroll-pbs", "scroll-pbe", "scroll-pt", "scroll-pr", "scroll-pb", "scroll-pl"],
      "scroll-px": ["scroll-ps", "scroll-pe", "scroll-pr", "scroll-pl"],
      "scroll-py": ["scroll-pbs", "scroll-pbe", "scroll-pt", "scroll-pb"],
      touch: ["touch-x", "touch-y", "touch-pz"],
      "touch-x": ["touch"],
      "touch-y": ["touch"],
      "touch-pz": ["touch"]
    },
    conflictingClassGroupModifiers: {
      "font-size": ["leading"]
    },
    postfixLookupClassGroups: ["container-type"],
    orderSensitiveModifiers: ["*", "**", "after", "backdrop", "before", "details-content", "file", "first-letter", "first-line", "marker", "placeholder", "selection"]
  };
};
var twMerge = /* @__PURE__ */ createTailwindMerge(getDefaultConfig);

// node_modules/.pnpm/@zhin.js+client@1.1.5_@ai-sdk+openai@4.0.69_zod@4.6.5__ai@7.0.105_zod@4.6.5__react@19.3.0_zod@4.6.5/node_modules/@zhin.js/client/dist/console-utils/cn.js
function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// node_modules/.pnpm/@zhin.js+client@1.1.5_@ai-sdk+openai@4.0.69_zod@4.6.5__ai@7.0.105_zod@4.6.5__react@19.3.0_zod@4.6.5/node_modules/@zhin.js/client/dist/workroom/WorkroomRunsPage.js
import { jsx as _jsx2, jsxs as _jsxs2, Fragment as _Fragment2 } from "/esm/react~jsx-runtime.mjs?v=mu5z5rv8";
import { useCallback as useCallback2, useState as useState3 } from "/esm/react.mjs?v=mu5z5rv8";

// node_modules/.pnpm/@zhin.js+adapter-sandbox@1.1.0_@ai-sdk+openai@4.0.69_zod@4.6.5__@zhin.js+adapter@1.1.12_@zhin_afugtif7f4xa45ozkajeyq4koy/node_modules/@zhin.js/adapter-sandbox/pages/sandboxTransport.js
function getSandboxApiBase() {
  if (typeof localStorage === "undefined") {
    return typeof window !== "undefined" ? window.location.origin : "";
  }
  const stored = localStorage.getItem("zhin_api_base")?.trim();
  if (stored)
    return stored.replace(/\/+$/u, "");
  if (typeof window !== "undefined")
    return window.location.origin;
  return "";
}
function getSandboxBearerToken() {
  if (typeof window !== "undefined") {
    const runtime = window.__ZHIN_API_TOKEN?.trim();
    if (runtime)
      return runtime;
  }
  if (typeof localStorage === "undefined")
    return "";
  return localStorage.getItem("zhin_api_token")?.trim() || localStorage.getItem("HTTP_TOKEN")?.trim() || localStorage.getItem("zhin_http_token")?.trim() || (typeof sessionStorage !== "undefined" ? sessionStorage.getItem("zhin_api_token")?.trim() : "") || "";
}
function getSandboxAuthHeaders() {
  const token = getSandboxBearerToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}
function buildSandboxWebSocketUrl(base) {
  const apiBase = (base ?? getSandboxApiBase()).replace(/\/+$/u, "");
  const origin = apiBase || (typeof window !== "undefined" ? window.location.origin : "http://localhost");
  const wsUrl = new URL("/sandbox", `${origin}/`);
  wsUrl.protocol = wsUrl.protocol === "https:" ? "wss:" : "ws:";
  const token = getSandboxBearerToken();
  if (token)
    wsUrl.searchParams.set("token", token);
  return wsUrl.href;
}

// node_modules/.pnpm/lucide-react@0.525.0_react@19.3.0/node_modules/lucide-react/dist/esm/createLucideIcon.js
import { forwardRef as forwardRef2, createElement as createElement2 } from "/esm/react.mjs?v=mu5z5rv8";

// node_modules/.pnpm/lucide-react@0.525.0_react@19.3.0/node_modules/lucide-react/dist/esm/shared/src/utils.js
var toKebabCase = (string) => string.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
var toCamelCase = (string) => string.replace(
  /^([A-Z])|[\s-_]+(\w)/g,
  (match, p1, p2) => p2 ? p2.toUpperCase() : p1.toLowerCase()
);
var toPascalCase = (string) => {
  const camelCase = toCamelCase(string);
  return camelCase.charAt(0).toUpperCase() + camelCase.slice(1);
};
var mergeClasses = (...classes) => classes.filter((className, index, array) => {
  return Boolean(className) && className.trim() !== "" && array.indexOf(className) === index;
}).join(" ").trim();
var hasA11yProp = (props) => {
  for (const prop in props) {
    if (prop.startsWith("aria-") || prop === "role" || prop === "title") {
      return true;
    }
  }
};

// node_modules/.pnpm/lucide-react@0.525.0_react@19.3.0/node_modules/lucide-react/dist/esm/Icon.js
import { forwardRef, createElement } from "/esm/react.mjs?v=mu5z5rv8";

// node_modules/.pnpm/lucide-react@0.525.0_react@19.3.0/node_modules/lucide-react/dist/esm/defaultAttributes.js
var defaultAttributes = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};

// node_modules/.pnpm/lucide-react@0.525.0_react@19.3.0/node_modules/lucide-react/dist/esm/Icon.js
var Icon = forwardRef(
  ({
    color = "currentColor",
    size = 24,
    strokeWidth = 2,
    absoluteStrokeWidth,
    className = "",
    children,
    iconNode,
    ...rest
  }, ref) => createElement(
    "svg",
    {
      ref,
      ...defaultAttributes,
      width: size,
      height: size,
      stroke: color,
      strokeWidth: absoluteStrokeWidth ? Number(strokeWidth) * 24 / Number(size) : strokeWidth,
      className: mergeClasses("lucide", className),
      ...!children && !hasA11yProp(rest) && { "aria-hidden": "true" },
      ...rest
    },
    [
      ...iconNode.map(([tag, attrs]) => createElement(tag, attrs)),
      ...Array.isArray(children) ? children : [children]
    ]
  )
);

// node_modules/.pnpm/lucide-react@0.525.0_react@19.3.0/node_modules/lucide-react/dist/esm/createLucideIcon.js
var createLucideIcon = (iconName, iconNode) => {
  const Component = forwardRef2(
    ({ className, ...props }, ref) => createElement2(Icon, {
      ref,
      iconNode,
      className: mergeClasses(
        `lucide-${toKebabCase(toPascalCase(iconName))}`,
        `lucide-${iconName}`,
        className
      ),
      ...props
    })
  );
  Component.displayName = toPascalCase(iconName);
  return Component;
};

// node_modules/.pnpm/lucide-react@0.525.0_react@19.3.0/node_modules/lucide-react/dist/esm/icons/activity.js
var __iconNode = [
  [
    "path",
    {
      d: "M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2",
      key: "169zse"
    }
  ]
];
var Activity = createLucideIcon("activity", __iconNode);

// node_modules/.pnpm/lucide-react@0.525.0_react@19.3.0/node_modules/lucide-react/dist/esm/icons/bot.js
var __iconNode2 = [
  ["path", { d: "M12 8V4H8", key: "hb8ula" }],
  ["rect", { width: "16", height: "12", x: "4", y: "8", rx: "2", key: "enze0r" }],
  ["path", { d: "M2 14h2", key: "vft8re" }],
  ["path", { d: "M20 14h2", key: "4cs60a" }],
  ["path", { d: "M15 13v2", key: "1xurst" }],
  ["path", { d: "M9 13v2", key: "rq6x2g" }]
];
var Bot = createLucideIcon("bot", __iconNode2);

// node_modules/.pnpm/lucide-react@0.525.0_react@19.3.0/node_modules/lucide-react/dist/esm/icons/check.js
var __iconNode3 = [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]];
var Check = createLucideIcon("check", __iconNode3);

// node_modules/.pnpm/lucide-react@0.525.0_react@19.3.0/node_modules/lucide-react/dist/esm/icons/chevron-down.js
var __iconNode4 = [["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]];
var ChevronDown = createLucideIcon("chevron-down", __iconNode4);

// node_modules/.pnpm/lucide-react@0.525.0_react@19.3.0/node_modules/lucide-react/dist/esm/icons/circle-alert.js
var __iconNode5 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["line", { x1: "12", x2: "12", y1: "8", y2: "12", key: "1pkeuh" }],
  ["line", { x1: "12", x2: "12.01", y1: "16", y2: "16", key: "4dfq90" }]
];
var CircleAlert = createLucideIcon("circle-alert", __iconNode5);

// node_modules/.pnpm/lucide-react@0.525.0_react@19.3.0/node_modules/lucide-react/dist/esm/icons/coins.js
var __iconNode6 = [
  ["circle", { cx: "8", cy: "8", r: "6", key: "3yglwk" }],
  ["path", { d: "M18.09 10.37A6 6 0 1 1 10.34 18", key: "t5s6rm" }],
  ["path", { d: "M7 6h1v4", key: "1obek4" }],
  ["path", { d: "m16.71 13.88.7.71-2.82 2.82", key: "1rbuyh" }]
];
var Coins = createLucideIcon("coins", __iconNode6);

// node_modules/.pnpm/lucide-react@0.525.0_react@19.3.0/node_modules/lucide-react/dist/esm/icons/external-link.js
var __iconNode7 = [
  ["path", { d: "M15 3h6v6", key: "1q9fwt" }],
  ["path", { d: "M10 14 21 3", key: "gplh6r" }],
  ["path", { d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6", key: "a6xqqp" }]
];
var ExternalLink = createLucideIcon("external-link", __iconNode7);

// node_modules/.pnpm/lucide-react@0.525.0_react@19.3.0/node_modules/lucide-react/dist/esm/icons/file-diff.js
var __iconNode8 = [
  ["path", { d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z", key: "1rqfz7" }],
  ["path", { d: "M9 10h6", key: "9gxzsh" }],
  ["path", { d: "M12 13V7", key: "h0r20n" }],
  ["path", { d: "M9 17h6", key: "r8uit2" }]
];
var FileDiff = createLucideIcon("file-diff", __iconNode8);

// node_modules/.pnpm/lucide-react@0.525.0_react@19.3.0/node_modules/lucide-react/dist/esm/icons/file-down.js
var __iconNode9 = [
  ["path", { d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z", key: "1rqfz7" }],
  ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4", key: "tnqrlb" }],
  ["path", { d: "M12 18v-6", key: "17g6i2" }],
  ["path", { d: "m9 15 3 3 3-3", key: "1npd3o" }]
];
var FileDown = createLucideIcon("file-down", __iconNode9);

// node_modules/.pnpm/lucide-react@0.525.0_react@19.3.0/node_modules/lucide-react/dist/esm/icons/flask-conical.js
var __iconNode10 = [
  [
    "path",
    {
      d: "M14 2v6a2 2 0 0 0 .245.96l5.51 10.08A2 2 0 0 1 18 22H6a2 2 0 0 1-1.755-2.96l5.51-10.08A2 2 0 0 0 10 8V2",
      key: "18mbvz"
    }
  ],
  ["path", { d: "M6.453 15h11.094", key: "3shlmq" }],
  ["path", { d: "M8.5 2h7", key: "csnxdl" }]
];
var FlaskConical = createLucideIcon("flask-conical", __iconNode10);

// node_modules/.pnpm/lucide-react@0.525.0_react@19.3.0/node_modules/lucide-react/dist/esm/icons/folder-open.js
var __iconNode11 = [
  [
    "path",
    {
      d: "m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2",
      key: "usdka0"
    }
  ]
];
var FolderOpen = createLucideIcon("folder-open", __iconNode11);

// node_modules/.pnpm/lucide-react@0.525.0_react@19.3.0/node_modules/lucide-react/dist/esm/icons/gauge.js
var __iconNode12 = [
  ["path", { d: "m12 14 4-4", key: "9kzdfg" }],
  ["path", { d: "M3.34 19a10 10 0 1 1 17.32 0", key: "19p75a" }]
];
var Gauge = createLucideIcon("gauge", __iconNode12);

// node_modules/.pnpm/lucide-react@0.525.0_react@19.3.0/node_modules/lucide-react/dist/esm/icons/hash.js
var __iconNode13 = [
  ["line", { x1: "4", x2: "20", y1: "9", y2: "9", key: "4lhtct" }],
  ["line", { x1: "4", x2: "20", y1: "15", y2: "15", key: "vyu0kd" }],
  ["line", { x1: "10", x2: "8", y1: "3", y2: "21", key: "1ggp8o" }],
  ["line", { x1: "16", x2: "14", y1: "3", y2: "21", key: "weycgp" }]
];
var Hash = createLucideIcon("hash", __iconNode13);

// node_modules/.pnpm/lucide-react@0.525.0_react@19.3.0/node_modules/lucide-react/dist/esm/icons/image.js
var __iconNode14 = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", ry: "2", key: "1m3agn" }],
  ["circle", { cx: "9", cy: "9", r: "2", key: "af1f0g" }],
  ["path", { d: "m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21", key: "1xmnt7" }]
];
var Image = createLucideIcon("image", __iconNode14);

// node_modules/.pnpm/lucide-react@0.525.0_react@19.3.0/node_modules/lucide-react/dist/esm/icons/info.js
var __iconNode15 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M12 16v-4", key: "1dtifu" }],
  ["path", { d: "M12 8h.01", key: "e9boi3" }]
];
var Info = createLucideIcon("info", __iconNode15);

// node_modules/.pnpm/lucide-react@0.525.0_react@19.3.0/node_modules/lucide-react/dist/esm/icons/list-checks.js
var __iconNode16 = [
  ["path", { d: "m3 17 2 2 4-4", key: "1jhpwq" }],
  ["path", { d: "m3 7 2 2 4-4", key: "1obspn" }],
  ["path", { d: "M13 6h8", key: "15sg57" }],
  ["path", { d: "M13 12h8", key: "h98zly" }],
  ["path", { d: "M13 18h8", key: "oe0vm4" }]
];
var ListChecks = createLucideIcon("list-checks", __iconNode16);

// node_modules/.pnpm/lucide-react@0.525.0_react@19.3.0/node_modules/lucide-react/dist/esm/icons/message-square.js
var __iconNode17 = [
  ["path", { d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z", key: "1lielz" }]
];
var MessageSquare = createLucideIcon("message-square", __iconNode17);

// node_modules/.pnpm/lucide-react@0.525.0_react@19.3.0/node_modules/lucide-react/dist/esm/icons/music.js
var __iconNode18 = [
  ["path", { d: "M9 18V5l12-2v13", key: "1jmyc2" }],
  ["circle", { cx: "6", cy: "18", r: "3", key: "fqmcym" }],
  ["circle", { cx: "18", cy: "16", r: "3", key: "1hluhg" }]
];
var Music = createLucideIcon("music", __iconNode18);

// node_modules/.pnpm/lucide-react@0.525.0_react@19.3.0/node_modules/lucide-react/dist/esm/icons/network.js
var __iconNode19 = [
  ["rect", { x: "16", y: "16", width: "6", height: "6", rx: "1", key: "4q2zg0" }],
  ["rect", { x: "2", y: "16", width: "6", height: "6", rx: "1", key: "8cvhb9" }],
  ["rect", { x: "9", y: "2", width: "6", height: "6", rx: "1", key: "1egb70" }],
  ["path", { d: "M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3", key: "1jsf9p" }],
  ["path", { d: "M12 12V8", key: "2874zd" }]
];
var Network = createLucideIcon("network", __iconNode19);

// node_modules/.pnpm/lucide-react@0.525.0_react@19.3.0/node_modules/lucide-react/dist/esm/icons/panel-right.js
var __iconNode20 = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }],
  ["path", { d: "M15 3v18", key: "14nvp0" }]
];
var PanelRight = createLucideIcon("panel-right", __iconNode20);

// node_modules/.pnpm/lucide-react@0.525.0_react@19.3.0/node_modules/lucide-react/dist/esm/icons/plus.js
var __iconNode21 = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "M12 5v14", key: "s699le" }]
];
var Plus = createLucideIcon("plus", __iconNode21);

// node_modules/.pnpm/lucide-react@0.525.0_react@19.3.0/node_modules/lucide-react/dist/esm/icons/refresh-cw.js
var __iconNode22 = [
  ["path", { d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8", key: "v9h5vc" }],
  ["path", { d: "M21 3v5h-5", key: "1q7to0" }],
  ["path", { d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16", key: "3uifl3" }],
  ["path", { d: "M8 16H3v5", key: "1cv678" }]
];
var RefreshCw = createLucideIcon("refresh-cw", __iconNode22);

// node_modules/.pnpm/lucide-react@0.525.0_react@19.3.0/node_modules/lucide-react/dist/esm/icons/rotate-ccw.js
var __iconNode23 = [
  ["path", { d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8", key: "1357e3" }],
  ["path", { d: "M3 3v5h5", key: "1xhq8a" }]
];
var RotateCcw = createLucideIcon("rotate-ccw", __iconNode23);

// node_modules/.pnpm/lucide-react@0.525.0_react@19.3.0/node_modules/lucide-react/dist/esm/icons/search.js
var __iconNode24 = [
  ["path", { d: "m21 21-4.34-4.34", key: "14j7rj" }],
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }]
];
var Search = createLucideIcon("search", __iconNode24);

// node_modules/.pnpm/lucide-react@0.525.0_react@19.3.0/node_modules/lucide-react/dist/esm/icons/send.js
var __iconNode25 = [
  [
    "path",
    {
      d: "M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",
      key: "1ffxy3"
    }
  ],
  ["path", { d: "m21.854 2.147-10.94 10.939", key: "12cjpa" }]
];
var Send = createLucideIcon("send", __iconNode25);

// node_modules/.pnpm/lucide-react@0.525.0_react@19.3.0/node_modules/lucide-react/dist/esm/icons/shield-check.js
var __iconNode26 = [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
];
var ShieldCheck = createLucideIcon("shield-check", __iconNode26);

// node_modules/.pnpm/lucide-react@0.525.0_react@19.3.0/node_modules/lucide-react/dist/esm/icons/sliders-horizontal.js
var __iconNode27 = [
  ["line", { x1: "21", x2: "14", y1: "4", y2: "4", key: "obuewd" }],
  ["line", { x1: "10", x2: "3", y1: "4", y2: "4", key: "1q6298" }],
  ["line", { x1: "21", x2: "12", y1: "12", y2: "12", key: "1iu8h1" }],
  ["line", { x1: "8", x2: "3", y1: "12", y2: "12", key: "ntss68" }],
  ["line", { x1: "21", x2: "16", y1: "20", y2: "20", key: "14d8ph" }],
  ["line", { x1: "12", x2: "3", y1: "20", y2: "20", key: "m0wm8r" }],
  ["line", { x1: "14", x2: "14", y1: "2", y2: "6", key: "14e1ph" }],
  ["line", { x1: "8", x2: "8", y1: "10", y2: "14", key: "1i6ji0" }],
  ["line", { x1: "16", x2: "16", y1: "18", y2: "22", key: "1lctlv" }]
];
var SlidersHorizontal = createLucideIcon("sliders-horizontal", __iconNode27);

// node_modules/.pnpm/lucide-react@0.525.0_react@19.3.0/node_modules/lucide-react/dist/esm/icons/smile.js
var __iconNode28 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M8 14s1.5 2 4 2 4-2 4-2", key: "1y1vjs" }],
  ["line", { x1: "9", x2: "9.01", y1: "9", y2: "9", key: "yxxnd0" }],
  ["line", { x1: "15", x2: "15.01", y1: "9", y2: "9", key: "1p4y9e" }]
];
var Smile = createLucideIcon("smile", __iconNode28);

// node_modules/.pnpm/lucide-react@0.525.0_react@19.3.0/node_modules/lucide-react/dist/esm/icons/sparkles.js
var __iconNode29 = [
  [
    "path",
    {
      d: "M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z",
      key: "4pj2yx"
    }
  ],
  ["path", { d: "M20 3v4", key: "1olli1" }],
  ["path", { d: "M22 5h-4", key: "1gvqau" }],
  ["path", { d: "M4 17v2", key: "vumght" }],
  ["path", { d: "M5 18H3", key: "zchphs" }]
];
var Sparkles = createLucideIcon("sparkles", __iconNode29);

// node_modules/.pnpm/lucide-react@0.525.0_react@19.3.0/node_modules/lucide-react/dist/esm/icons/square.js
var __iconNode30 = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }]
];
var Square = createLucideIcon("square", __iconNode30);

// node_modules/.pnpm/lucide-react@0.525.0_react@19.3.0/node_modules/lucide-react/dist/esm/icons/terminal.js
var __iconNode31 = [
  ["path", { d: "M12 19h8", key: "baeox8" }],
  ["path", { d: "m4 17 6-6-6-6", key: "1yngyt" }]
];
var Terminal = createLucideIcon("terminal", __iconNode31);

// node_modules/.pnpm/lucide-react@0.525.0_react@19.3.0/node_modules/lucide-react/dist/esm/icons/trash-2.js
var __iconNode32 = [
  ["path", { d: "M3 6h18", key: "d0wm0j" }],
  ["path", { d: "M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6", key: "4alrt4" }],
  ["path", { d: "M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2", key: "v07s0e" }],
  ["line", { x1: "10", x2: "10", y1: "11", y2: "17", key: "1uufr5" }],
  ["line", { x1: "14", x2: "14", y1: "11", y2: "17", key: "xtxkd" }]
];
var Trash2 = createLucideIcon("trash-2", __iconNode32);

// node_modules/.pnpm/lucide-react@0.525.0_react@19.3.0/node_modules/lucide-react/dist/esm/icons/user.js
var __iconNode33 = [
  ["path", { d: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2", key: "975kel" }],
  ["circle", { cx: "12", cy: "7", r: "4", key: "17ys0d" }]
];
var User = createLucideIcon("user", __iconNode33);

// node_modules/.pnpm/lucide-react@0.525.0_react@19.3.0/node_modules/lucide-react/dist/esm/icons/users.js
var __iconNode34 = [
  ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
  ["path", { d: "M16 3.128a4 4 0 0 1 0 7.744", key: "16gr8j" }],
  ["path", { d: "M22 21v-2a4 4 0 0 0-3-3.87", key: "kshegd" }],
  ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }]
];
var Users = createLucideIcon("users", __iconNode34);

// node_modules/.pnpm/lucide-react@0.525.0_react@19.3.0/node_modules/lucide-react/dist/esm/icons/video.js
var __iconNode35 = [
  [
    "path",
    {
      d: "m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5",
      key: "ftymec"
    }
  ],
  ["rect", { x: "2", y: "6", width: "14", height: "12", rx: "2", key: "158x01" }]
];
var Video = createLucideIcon("video", __iconNode35);

// node_modules/.pnpm/lucide-react@0.525.0_react@19.3.0/node_modules/lucide-react/dist/esm/icons/wifi-off.js
var __iconNode36 = [
  ["path", { d: "M12 20h.01", key: "zekei9" }],
  ["path", { d: "M8.5 16.429a5 5 0 0 1 7 0", key: "1bycff" }],
  ["path", { d: "M5 12.859a10 10 0 0 1 5.17-2.69", key: "1dl1wf" }],
  ["path", { d: "M19 12.859a10 10 0 0 0-2.007-1.523", key: "4k23kn" }],
  ["path", { d: "M2 8.82a15 15 0 0 1 4.177-2.643", key: "1grhjp" }],
  ["path", { d: "M22 8.82a15 15 0 0 0-11.288-3.764", key: "z3jwby" }],
  ["path", { d: "m2 2 20 20", key: "1ooewy" }]
];
var WifiOff = createLucideIcon("wifi-off", __iconNode36);

// node_modules/.pnpm/lucide-react@0.525.0_react@19.3.0/node_modules/lucide-react/dist/esm/icons/wifi.js
var __iconNode37 = [
  ["path", { d: "M12 20h.01", key: "zekei9" }],
  ["path", { d: "M2 8.82a15 15 0 0 1 20 0", key: "dnpr2z" }],
  ["path", { d: "M5 12.859a10 10 0 0 1 14 0", key: "1x1e6c" }],
  ["path", { d: "M8.5 16.429a5 5 0 0 1 7 0", key: "1bycff" }]
];
var Wifi = createLucideIcon("wifi", __iconNode37);

// node_modules/.pnpm/lucide-react@0.525.0_react@19.3.0/node_modules/lucide-react/dist/esm/icons/wrench.js
var __iconNode38 = [
  [
    "path",
    {
      d: "M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z",
      key: "cbrjhi"
    }
  ]
];
var Wrench = createLucideIcon("wrench", __iconNode38);

// node_modules/.pnpm/lucide-react@0.525.0_react@19.3.0/node_modules/lucide-react/dist/esm/icons/x.js
var __iconNode39 = [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
];
var X = createLucideIcon("x", __iconNode39);

// node_modules/.pnpm/@zhin.js+adapter-sandbox@1.1.0_@ai-sdk+openai@4.0.69_zod@4.6.5__@zhin.js+adapter@1.1.12_@zhin_afugtif7f4xa45ozkajeyq4koy/node_modules/@zhin.js/adapter-sandbox/pages/RichTextEditor.js
import { jsx as _jsx3 } from "/esm/react~jsx-runtime.mjs?v=mu5z5rv8";
import { useRef as useRef2, useEffect as useEffect2, forwardRef as forwardRef3, useImperativeHandle } from "/esm/react.mjs?v=mu5z5rv8";
var RichTextEditor = forwardRef3(({ placeholder = "\u8F93\u5165\u6D88\u606F...", onSend, onChange, onAtTrigger, minHeight = "44px", maxHeight = "200px" }, ref) => {
  const editorRef = useRef2(null);
  const atTriggerTextRef = useRef2(null);
  const parseEditorContent = () => {
    if (!editorRef.current)
      return { text: "", segments: [] };
    let text = "";
    const segments = [];
    const appendText = (value) => {
      if (!value)
        return;
      text += value;
      const previous = segments.at(-1);
      if (previous?.type === "text") {
        previous.data.text = String(previous.data.text ?? "") + value;
      } else {
        segments.push({ type: "text", data: { text: value } });
      }
    };
    const visit = (node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        const textContent = node.textContent || "";
        appendText(textContent);
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        const el = node;
        if (el.classList.contains("editor-face")) {
          const faceId = el.dataset.id;
          text += `[face:${faceId}]`;
          segments.push({ type: "face", data: { id: Number(faceId) } });
        } else if (el.classList.contains("editor-image")) {
          const imageUrl = el.dataset.url;
          text += `[image:${imageUrl}]`;
          segments.push({ type: "image", data: { media: { kind: "url", value: imageUrl } } });
        } else if (el.classList.contains("editor-video")) {
          const u = el.dataset.url || "";
          text += `[video:${u}]`;
          segments.push({ type: "video", data: { media: { kind: "url", value: u } } });
        } else if (el.classList.contains("editor-audio")) {
          const u = el.dataset.url || "";
          text += `[audio:${u}]`;
          segments.push({ type: "audio", data: { media: { kind: "url", value: u } } });
        } else if (el.classList.contains("editor-at")) {
          const name = el.dataset.name;
          const id = el.dataset.id;
          text += `[@${name}]`;
          segments.push({
            type: "mention",
            data: id ? { target: id, name } : { target: name, name }
          });
        } else if (el.tagName === "BR") {
          appendText("\n");
        } else {
          const isBlock = el.tagName === "DIV" || el.tagName === "P";
          if (isBlock && text && !text.endsWith("\n"))
            appendText("\n");
          Array.from(el.childNodes).forEach(visit);
        }
      }
    };
    Array.from(editorRef.current.childNodes).forEach(visit);
    return { text, segments };
  };
  const insertFace = (faceId) => {
    if (!editorRef.current)
      return;
    const img = document.createElement("img");
    img.src = `https://face.viki.moe/apng/${faceId}.png`;
    img.alt = `[face:${faceId}]`;
    img.dataset.type = "face";
    img.dataset.id = String(faceId);
    img.className = "editor-face";
    insertNodeAtCursor(img);
    handleChange();
  };
  const insertImage = (url) => {
    if (!editorRef.current || !url.trim())
      return;
    const img = document.createElement("img");
    img.src = url.trim();
    img.alt = `[image:${url.trim()}]`;
    img.dataset.type = "image";
    img.dataset.url = url.trim();
    img.className = "editor-image";
    insertNodeAtCursor(img);
    handleChange();
  };
  const insertVideo = (url) => {
    if (!editorRef.current || !url.trim())
      return;
    const u = url.trim();
    const span = document.createElement("span");
    span.className = "editor-video";
    span.dataset.url = u;
    span.contentEditable = "false";
    span.textContent = "\u{1F4F9} \u89C6\u9891";
    insertNodeAtCursor(span);
    handleChange();
  };
  const insertAudio = (url) => {
    if (!editorRef.current || !url.trim())
      return;
    const u = url.trim();
    const span = document.createElement("span");
    span.className = "editor-audio";
    span.dataset.url = u;
    span.contentEditable = "false";
    span.textContent = "\u{1F3B5} \u97F3\u9891";
    insertNodeAtCursor(span);
    handleChange();
  };
  const insertAt = (name, id) => {
    if (!editorRef.current || !name.trim())
      return;
    const atBox = document.createElement("span");
    atBox.dataset.type = "at";
    atBox.dataset.name = name;
    if (id)
      atBox.dataset.id = id;
    atBox.className = "editor-at";
    atBox.contentEditable = "false";
    const atSymbol = document.createElement("span");
    atSymbol.textContent = "@";
    atSymbol.className = "editor-at-symbol";
    const nameText = document.createElement("span");
    nameText.textContent = name;
    nameText.className = "editor-at-name";
    atBox.appendChild(atSymbol);
    atBox.appendChild(nameText);
    insertNodeAtCursor(atBox);
    handleChange();
  };
  const insertNodeAtCursor = (node) => {
    if (!editorRef.current)
      return;
    editorRef.current.focus();
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const isInsideEditor = editorRef.current.contains(range.commonAncestorContainer);
      if (isInsideEditor) {
        range.deleteContents();
        range.insertNode(node);
        range.collapse(false);
        selection.removeAllRanges();
        selection.addRange(range);
      } else {
        editorRef.current.appendChild(node);
        const newRange = document.createRange();
        newRange.setStartAfter(node);
        newRange.collapse(true);
        selection.removeAllRanges();
        selection.addRange(newRange);
      }
    } else {
      editorRef.current.appendChild(node);
      const selection2 = window.getSelection();
      if (selection2) {
        const newRange = document.createRange();
        newRange.setStartAfter(node);
        newRange.collapse(true);
        selection2.removeAllRanges();
        selection2.addRange(newRange);
      }
    }
  };
  const clear = () => {
    if (editorRef.current) {
      editorRef.current.innerHTML = "";
      handleChange();
    }
  };
  const focus = () => {
    editorRef.current?.focus();
  };
  const getContent = () => {
    return parseEditorContent();
  };
  const checkAtTrigger = () => {
    if (!editorRef.current || !onAtTrigger)
      return;
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) {
      onAtTrigger(false, "");
      atTriggerTextRef.current = null;
      return;
    }
    const range = selection.getRangeAt(0);
    if (!editorRef.current.contains(range.commonAncestorContainer)) {
      onAtTrigger(false, "");
      atTriggerTextRef.current = null;
      return;
    }
    const node = range.startContainer;
    if (node.nodeType !== Node.TEXT_NODE) {
      onAtTrigger(false, "");
      atTriggerTextRef.current = null;
      return;
    }
    const textNode = node;
    const textBeforeCursor = textNode.textContent?.substring(0, range.startOffset) || "";
    const atIndex = textBeforeCursor.lastIndexOf("@");
    if (atIndex !== -1) {
      const textAfterAt = textBeforeCursor.substring(atIndex + 1);
      if (textAfterAt.includes(" ") || textAfterAt.includes("\n")) {
        onAtTrigger(false, "");
        atTriggerTextRef.current = null;
        return;
      }
      atTriggerTextRef.current = textNode;
      const tempRange = document.createRange();
      tempRange.setStart(textNode, atIndex);
      tempRange.setEnd(textNode, atIndex + 1);
      const rect = tempRange.getBoundingClientRect();
      const editorRect = editorRef.current.getBoundingClientRect();
      onAtTrigger(true, textAfterAt, {
        top: rect.bottom - editorRect.top,
        left: rect.left - editorRect.left
      });
    } else {
      onAtTrigger(false, "");
      atTriggerTextRef.current = null;
    }
  };
  const handleChange = () => {
    checkAtTrigger();
    if (onChange) {
      const { text, segments } = parseEditorContent();
      onChange(text, segments);
    }
  };
  const replaceAtTrigger = (name, id) => {
    if (!atTriggerTextRef.current)
      return;
    const textNode = atTriggerTextRef.current;
    const text = textNode.textContent || "";
    const atIndex = text.lastIndexOf("@");
    if (atIndex !== -1) {
      const textAfter = text.substring(atIndex + 1);
      const endIndex = atIndex + 1 + textAfter.split(/[\s\n]/)[0].length;
      const beforeAt = text.substring(0, atIndex);
      const afterSearch = text.substring(endIndex);
      textNode.textContent = beforeAt + afterSearch;
      const selection = window.getSelection();
      if (selection) {
        const range = document.createRange();
        range.setStart(textNode, atIndex);
        range.collapse(true);
        selection.removeAllRanges();
        selection.addRange(range);
      }
    }
    atTriggerTextRef.current = null;
    insertAt(name, id);
  };
  const handlePaste = (e) => {
    e.preventDefault();
    const clipboardData = e.clipboardData;
    const items = Array.from(clipboardData.items);
    const imageItem = items.find((item) => item.type.startsWith("image/"));
    if (imageItem) {
      const file = imageItem.getAsFile();
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          if (typeof reader.result === "string") {
            insertImage(reader.result);
          }
        };
        reader.readAsDataURL(file);
      }
      return;
    }
    const text = clipboardData.getData("text/plain");
    if (text) {
      document.execCommand("insertText", false, text);
      handleChange();
    }
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (onSend) {
        const { text, segments } = parseEditorContent();
        onSend(text, segments);
      }
    }
  };
  useImperativeHandle(ref, () => ({
    focus,
    clear,
    insertFace,
    insertImage,
    insertVideo,
    insertAudio,
    insertAt,
    replaceAtTrigger,
    getContent
  }));
  return _jsx3("div", { ref: editorRef, contentEditable: true, suppressContentEditableWarning: true, onInput: handleChange, onKeyDown: handleKeyDown, onPaste: handlePaste, "data-placeholder": placeholder, className: "rich-text-editor", style: {
    width: "100%",
    minHeight,
    maxHeight,
    padding: "0.5rem 0.75rem",
    border: "1px solid var(--gray-6)",
    borderRadius: "6px",
    backgroundColor: "var(--gray-1)",
    fontSize: "var(--font-size-2)",
    outline: "none",
    overflowY: "auto",
    lineHeight: "1.5",
    wordWrap: "break-word",
    color: "var(--gray-12)"
  } });
});
RichTextEditor.displayName = "RichTextEditor";
var RichTextEditor_default = RichTextEditor;

// node_modules/.pnpm/@zhin.js+adapter-sandbox@1.1.0_@ai-sdk+openai@4.0.69_zod@4.6.5__@zhin.js+adapter@1.1.12_@zhin_afugtif7f4xa45ozkajeyq4koy/node_modules/@zhin.js/adapter-sandbox/pages/agentTrace.js
var problemTypes = /* @__PURE__ */ new Set(["tool_denied", "tool_failed", "tool_cancelled", "turn_cancelled", "budget_exceeded", "error"]);
var toolTypes = /* @__PURE__ */ new Set(["tool_call", "mcp_tool_call"]);
var terminalTypes = /* @__PURE__ */ new Set(["turn_end", "turn_cancelled", "budget_exceeded", "error"]);
var toolTerminalTypes = /* @__PURE__ */ new Set(["tool_result", "tool_denied", "tool_failed", "tool_cancelled"]);
var traceCachePrefix = "zhin.sandbox.agent-trace.v1:";
function buildSandboxSessionKey(endpointId, scope, sceneId) {
  return `sandbox:${endpointId || "sandbox-bot"}:${scope}:${sceneId}`;
}
function agentStudioPath(sessionKey) {
  const params = new URLSearchParams({ sessionKey });
  return `/agent/studio?${params}`;
}
function mergeTraceSnapshot(previous, incoming) {
  if (!previous || previous.sessionKey !== incoming.sessionKey)
    return incoming;
  const events = [...previous.events, ...incoming.events].filter((event, index, all) => all.findIndex((candidate) => candidate.runtimeId === event.runtimeId && candidate.turnId === event.turnId && candidate.sequence === event.sequence) === index).sort((left, right) => left.recordedAt - right.recordedAt || left.sequence - right.sequence).slice(-300);
  return { ...incoming, events };
}
function loadCachedAgentTrace(sessionKey, storage = browserTraceStorage()) {
  if (!storage)
    return null;
  try {
    const raw = storage.getItem(`${traceCachePrefix}${sessionKey}`);
    if (!raw)
      return null;
    const parsed = JSON.parse(raw);
    if (parsed.sessionKey !== sessionKey || !Array.isArray(parsed.events))
      return null;
    const events = parsed.events.map(parseCachedTraceEvent).filter((event) => event != null).slice(-300);
    const activeTurnIds = Array.isArray(parsed.activeTurnIds) ? parsed.activeTurnIds.filter((value) => typeof value === "string").slice(-20) : [];
    return {
      ...typeof parsed.runtimeId === "string" ? { runtimeId: parsed.runtimeId } : {},
      sessionKey,
      events,
      latestSequence: nonNegativeNumber(parsed.latestSequence),
      activeTurnIds
    };
  } catch {
    return null;
  }
}
function saveCachedAgentTrace(snapshot, storage = browserTraceStorage()) {
  if (!storage)
    return false;
  try {
    storage.setItem(`${traceCachePrefix}${snapshot.sessionKey}`, JSON.stringify({
      ...snapshot,
      events: snapshot.events.slice(-300),
      activeTurnIds: snapshot.activeTurnIds.slice(-20)
    }));
    return true;
  } catch {
    return false;
  }
}
function summarizeTrace(snapshot) {
  if (!snapshot)
    return { eventCount: 0, toolCount: 0, tokenCount: 0, problemCount: 0, activeTurns: 0 };
  return {
    eventCount: snapshot.latestSequence,
    toolCount: snapshot.events.filter((event) => toolTypes.has(event.type)).length,
    tokenCount: snapshot.events.filter((event) => event.type === "usage").reduce((total, event) => total + usageTotal(event.data), 0),
    problemCount: snapshot.events.filter((event) => problemTypes.has(event.type)).length,
    activeTurns: snapshot.activeTurnIds.length
  };
}
function deriveTaskRuns(snapshot) {
  if (!snapshot)
    return [];
  const active = new Set(snapshot.activeTurnIds);
  const byRun = /* @__PURE__ */ new Map();
  for (const event of snapshot.events) {
    const key = runCorrelationKey(event);
    const events = byRun.get(key) ?? [];
    events.push(event);
    byRun.set(key, events);
  }
  return [...byRun.entries()].map(([id, events]) => {
    const identity = events[0];
    const turnId = identity.turnId;
    const runtimeId = identity.runtimeId;
    const startedAt = events.find((event) => event.type === "turn_start")?.recordedAt ?? events[0]?.recordedAt ?? 0;
    const terminal = [...events].reverse().find((event) => terminalTypes.has(event.type));
    const sourceMessageId = stringValue(events.find((event) => event.type === "turn_start")?.data.sourceMessageId);
    const belongsToCurrentRuntime = snapshot.runtimeId === void 0 || runtimeId === snapshot.runtimeId;
    const status = belongsToCurrentRuntime && active.has(turnId) ? "running" : terminal?.type === "turn_end" ? "completed" : terminal?.type === "turn_cancelled" ? "cancelled" : terminal ? "failed" : "failed";
    const endedAt = terminal?.recordedAt;
    return {
      id,
      ...runtimeId ? { runtimeId } : {},
      ...sourceMessageId ? { sourceMessageId } : {},
      turnId,
      status,
      startedAt,
      ...endedAt !== void 0 ? { endedAt, durationMs: Math.max(0, endedAt - startedAt) } : {},
      eventCount: events.length,
      toolCount: events.filter((event) => event.type === "tool_call" || event.type === "mcp_tool_call").length,
      tokenCount: events.filter((event) => event.type === "usage").reduce((total, event) => total + usageTotal(event.data), 0),
      problemCount: events.filter((event) => problemTypes.has(event.type)).length
    };
  }).sort((left, right) => right.startedAt - left.startedAt);
}
function deriveWorkbenchArtifacts(snapshot) {
  if (!snapshot)
    return [];
  const outcomes = /* @__PURE__ */ new Map();
  for (const event of snapshot.events) {
    if (!toolTerminalTypes.has(event.type))
      continue;
    const toolUseId = stringValue(event.data.toolUseId);
    if (toolUseId)
      outcomes.set(toolCorrelationKey(event, toolUseId), event);
  }
  return snapshot.events.flatMap((event) => {
    if (event.type !== "tool_call")
      return [];
    const toolName = stringValue(event.data.toolName);
    const toolUseId = stringValue(event.data.toolUseId) || `tool-${event.sequence}`;
    const args = recordValue(event.data.args);
    const artifactId = toolCorrelationKey(event, toolUseId);
    const outcome = outcomes.get(artifactId);
    const status = artifactStatus(outcome);
    const durationMs = numberValue(outcome?.data.durationMs);
    const common = {
      id: artifactId,
      ...event.runtimeId ? { runtimeId: event.runtimeId } : {},
      turnId: event.turnId,
      status,
      ...durationMs !== void 0 ? { durationMs } : {},
      recordedAt: event.recordedAt
    };
    if (toolName === "write_file" || toolName === "edit_file") {
      const filePath = stringValue(args.file_path ?? args.path) || "unknown file";
      return [{
        ...common,
        kind: "file-change",
        title: toolName === "write_file" ? "\u5199\u5165\u6587\u4EF6" : "\u7F16\u8F91\u6587\u4EF6",
        path: filePath,
        detail: artifactOutputDetail(outcome),
        diff: fileDiff(toolName, args, filePath)
      }];
    }
    if (toolName === "bash") {
      const command = stringValue(args.command);
      if (!command)
        return [];
      return [{
        ...common,
        kind: isTestCommand(command) ? "test" : "command",
        title: command.slice(0, 160),
        detail: artifactOutputDetail(outcome)
      }];
    }
    return [];
  }).sort((left, right) => right.recordedAt - left.recordedAt);
}
function deriveAgentRunSteps(snapshot, run) {
  if (!snapshot || !run)
    return [];
  const { turnId } = run;
  const events = snapshot.events.filter((event) => matchesRun(event, run));
  const outcomes = /* @__PURE__ */ new Map();
  for (const event of events) {
    if (!toolTerminalTypes.has(event.type))
      continue;
    const toolUseId = stringValue(event.data.toolUseId);
    if (toolUseId)
      outcomes.set(toolCorrelationKey(event, toolUseId), event);
  }
  const steps = events.flatMap((event) => {
    const common = { id: `${event.runtimeId ?? "legacy"}:${turnId}:${event.sequence}`, recordedAt: event.recordedAt };
    if (event.type === "turn_start") {
      return [{ ...common, title: "\u63A5\u6536\u4EFB\u52A1", detail: shortTurn(turnId), status: "completed" }];
    }
    if (event.type === "capability_resolution") {
      return [{
        ...common,
        title: "\u51C6\u5907\u8FD0\u884C\u80FD\u529B",
        detail: `${arrayLength(event.data.tools)} tools \xB7 ${arrayLength(event.data.skills)} skills`,
        status: "completed"
      }];
    }
    if (event.type === "iteration_start") {
      return [{
        ...common,
        title: `\u63A8\u7406\u8FED\u4EE3 ${String(event.data.iteration ?? "")}`.trim(),
        detail: event.data.maxIterations == null ? void 0 : `\u4E0A\u9650 ${String(event.data.maxIterations)}`,
        status: "completed"
      }];
    }
    if (event.type === "tool_call") {
      const toolUseId = stringValue(event.data.toolUseId) || `tool-${event.sequence}`;
      const outcome = outcomes.get(toolCorrelationKey(event, toolUseId));
      const args = recordValue(event.data.args);
      const toolName = stringValue(event.data.toolName) || "tool";
      const detail = toolStepDetail(toolName, args, toolUseId);
      const durationMs = numberValue(outcome?.data.durationMs);
      return [{
        ...common,
        id: toolCorrelationKey(event, toolUseId),
        title: `\u8FD0\u884C ${toolName}`,
        ...detail ? { detail } : {},
        status: artifactStatus(outcome),
        ...durationMs !== void 0 ? { durationMs } : {}
      }];
    }
    if (event.type === "subagent_start") {
      return [{
        ...common,
        title: `\u59D4\u6D3E ${stringValue(event.data.agentName) || "\u5B50 Agent"}`,
        detail: preview(event.data.description) || void 0,
        status: "running"
      }];
    }
    if (event.type === "subagent_end") {
      const failed = event.data.status === "error";
      return [{
        ...common,
        title: failed ? "\u5B50 Agent \u5931\u8D25" : "\u5B50 Agent \u8FD4\u56DE",
        detail: preview(event.data.summary ?? event.data.error) || void 0,
        status: failed ? "failed" : "completed"
      }];
    }
    if (event.type === "turn_end")
      return [{ ...common, title: "\u4EFB\u52A1\u5B8C\u6210", detail: "Agent \u5DF2\u8FD4\u56DE\u7ED3\u679C", status: "completed" }];
    if (event.type === "turn_cancelled")
      return [{ ...common, title: "\u4EFB\u52A1\u5DF2\u505C\u6B62", detail: preview(event.data.reason) || void 0, status: "cancelled" }];
    if (event.type === "budget_exceeded")
      return [{ ...common, title: "\u8FBE\u5230\u9884\u7B97\u4E0A\u9650", detail: preview(event.data.budget) || void 0, status: "failed" }];
    if (event.type === "error")
      return [{ ...common, title: "\u4EFB\u52A1\u5931\u8D25", detail: preview(event.data.error) || void 0, status: "failed" }];
    return [];
  });
  const task = deriveTaskRuns(snapshot).find((candidate) => candidate.id === runIdentityKey(run));
  for (let index = 0; index < steps.length; index += 1) {
    const step = steps[index];
    if (step.status !== "running")
      continue;
    if (task?.status === "cancelled")
      steps[index] = { ...step, status: "cancelled" };
    else if (task?.status === "failed")
      steps[index] = { ...step, status: "failed" };
    else if (task?.status === "completed" || index < steps.length - 1)
      steps[index] = { ...step, status: "completed" };
  }
  if (task?.status === "running" && steps.length > 0 && steps.at(-1)?.status !== "running") {
    steps.push({
      id: `${task.id}:waiting`,
      title: "\u7B49\u5F85 Agent \u8FD4\u56DE",
      detail: "\u4EFB\u52A1\u4ECD\u5728\u8FD0\u884C",
      status: "running",
      recordedAt: events.at(-1)?.recordedAt ?? task.startedAt
    });
  }
  return steps;
}
function buildAgentRunReport(snapshot, context = {}) {
  const runs = deriveTaskRuns(snapshot);
  const run = context.run ? runs.find((candidate) => candidate.id === runIdentityKey(context.run)) : runs[0];
  const identity = run ?? context.run;
  const turnId = identity?.turnId;
  const steps = deriveAgentRunSteps(snapshot, identity);
  const artifacts = deriveWorkbenchArtifacts(snapshot).filter((artifact) => identity && matchesRun(artifact, identity));
  const status = run ? taskStatusText(run.status) : "\u65E0\u8FD0\u884C\u8BB0\u5F55";
  const lines = [
    "# Agent \u8FD0\u884C\u62A5\u544A",
    "",
    `- **\u4F1A\u8BDD\uFF1A** ${markdownInline(context.sessionName || snapshot?.sessionKey || "\u672A\u547D\u540D\u4F1A\u8BDD")}`,
    `- **\u4EFB\u52A1 ID\uFF1A** ${markdownInline(turnId || "\u2014")}`,
    `- **\u72B6\u6001\uFF1A** ${status}`,
    `- **\u5F00\u59CB\u65F6\u95F4\uFF1A** ${run ? new Date(run.startedAt).toISOString() : "\u2014"}`,
    `- **\u8017\u65F6\uFF1A** ${run?.durationMs === void 0 ? run?.status === "running" ? "\u8FDB\u884C\u4E2D" : "\u2014" : `${run.durationMs.toLocaleString()} ms`}`,
    `- **\u5DE5\u4F5C\u76EE\u5F55\uFF1A** ${markdownInline(context.workingDirectory || "Host project root")}`,
    `- **\u5B89\u5168\u7B56\u7565\uFF1A** ${markdownInline(context.safetyMode || "\u2014")} / ${markdownInline(context.approvalMode || "\u2014")} / network ${context.networkAccess ? "enabled" : "disabled"}`,
    `- **\u7528\u91CF\uFF1A** ${run?.toolCount ?? 0} tools / ${(run?.tokenCount ?? 0).toLocaleString()} tokens / ${run?.problemCount ?? 0} problems`
  ];
  if (context.taskPrompt?.trim()) {
    lines.push("", "## \u4EFB\u52A1", "", ...markdownBlock("text", context.taskPrompt.trim()));
  }
  lines.push("", "## \u6267\u884C\u8F68\u8FF9", "");
  if (steps.length === 0)
    lines.push("- \u6682\u65E0\u53EF\u7528\u8F68\u8FF9");
  else
    for (const step of steps) {
      lines.push(`- ${stepStatusMark(step.status)} **${reportStepTitle(step.title)}**${step.detail ? ` \u2014 ${markdownInline(step.detail)}` : ""}${step.durationMs === void 0 ? "" : ` (${step.durationMs.toLocaleString()} ms)`}`);
    }
  lines.push("", "## \u53D8\u66F4\u4E0E\u4EA7\u7269", "");
  if (artifacts.length === 0)
    lines.push("- \u672C\u6B21\u8FD0\u884C\u6CA1\u6709\u6587\u4EF6\u3001\u547D\u4EE4\u6216\u6D4B\u8BD5\u4EA7\u7269\u3002");
  else
    artifacts.forEach((artifact, index) => {
      lines.push(`### ${index + 1}. ${markdownInline(artifact.title)}`, "");
      lines.push(`- \u7C7B\u578B\uFF1A${artifact.kind}`, `- \u72B6\u6001\uFF1A${artifact.status}`);
      if (artifact.path)
        lines.push(`- \u8DEF\u5F84\uFF1A${markdownInlineCode(artifact.path)}`);
      if (artifact.durationMs !== void 0)
        lines.push(`- \u8017\u65F6\uFF1A${artifact.durationMs.toLocaleString()} ms`);
      if (artifact.diff)
        lines.push("", ...markdownBlock("diff", artifact.diff));
      else if (artifact.detail)
        lines.push("", ...markdownBlock("text", artifact.detail));
      lines.push("");
    });
  lines.push("---", `\u7531 Zhin Agent \u8BD5\u9A8C\u53F0\u4E8E ${(/* @__PURE__ */ new Date()).toISOString()} \u5BFC\u51FA\u3002`);
  return `${lines.join("\n").trim()}
`;
}
function presentTraceEvent(event) {
  const data = event.data;
  const tool = String(data.toolName ?? "tool");
  switch (event.type) {
    case "turn_start":
      return { title: "\u5F00\u59CB\u5904\u7406", detail: shortTurn(event.turnId), tone: "running" };
    case "capability_resolution":
      return { title: "\u80FD\u529B\u5DF2\u89E3\u6790", detail: `${arrayLength(data.tools)} tools \xB7 ${arrayLength(data.skills)} skills`, tone: "capability" };
    case "iteration_start":
      return { title: `\u63A8\u7406\u8FED\u4EE3 ${String(data.iteration ?? "")}`, detail: `\u4E0A\u9650 ${String(data.maxIterations ?? "\u2014")}`, tone: "thinking" };
    case "thinking":
      return { title: "\u6A21\u578B\u601D\u8003", detail: preview(data.text), tone: "thinking" };
    case "tool_call":
      return { title: `\u8C03\u7528 ${tool}`, detail: preview(data.toolUseId), tone: "tool" };
    case "tool_result":
      return { title: `${tool} \u5B8C\u6210`, detail: duration(data.durationMs), tone: "success" };
    case "tool_denied":
      return { title: `${tool} \u88AB\u62D2\u7EDD`, detail: preview(data.reason ?? data.policy), tone: "problem" };
    case "tool_failed":
      return { title: `${tool} \u5931\u8D25`, detail: preview(data.error), tone: "problem" };
    case "mcp_connect":
      return { title: `${String(data.serverName ?? "MCP")} \u8FDE\u63A5`, detail: String(data.status ?? ""), tone: "capability" };
    case "mcp_tool_call":
      return { title: String(data.toolName ?? "MCP tool"), detail: `via ${String(data.serverName ?? "MCP")}`, tone: "tool" };
    case "subagent_start":
      return { title: `\u59D4\u6D3E ${String(data.agentName ?? "subagent")}`, detail: preview(data.description), tone: "capability" };
    case "subagent_progress":
      return { title: "\u5B50 Agent \u66F4\u65B0", detail: preview(data.summary), tone: "running" };
    case "subagent_end":
      return { title: "\u5B50 Agent \u8FD4\u56DE", detail: String(data.status ?? "done"), tone: data.status === "error" ? "problem" : "success" };
    case "usage":
      return { title: `${usageTotal(data).toLocaleString()} tokens`, detail: usageDetail(data), tone: "usage" };
    case "turn_end":
      return { title: "\u672C\u8F6E\u5B8C\u6210", detail: "Agent \u5DF2\u8FD4\u56DE\u7ED3\u679C", tone: "success" };
    case "turn_cancelled":
      return { title: "\u672C\u8F6E\u53D6\u6D88", detail: preview(data.reason), tone: "muted" };
    case "budget_exceeded":
      return { title: "\u8FBE\u5230\u9884\u7B97\u4E0A\u9650", detail: preview(data.budget), tone: "problem" };
    case "error":
      return { title: "\u6267\u884C\u5931\u8D25", detail: preview(data.error), tone: "problem" };
    default:
      return { title: event.type.replaceAll("_", " "), detail: "", tone: "muted" };
  }
}
async function fetchAgentTrace(sessionKey, afterSequence = 0) {
  const base = getSandboxApiBase() || window.location.origin;
  const url = new URL("/api/agent/traces", `${base}/`);
  url.searchParams.set("sessionKey", sessionKey);
  url.searchParams.set("limit", "300");
  if (afterSequence > 0)
    url.searchParams.set("after", String(afterSequence));
  const response = await fetch(url, { headers: getSandboxAuthHeaders() });
  const body = await response.json().catch(() => ({}));
  if (!response.ok || body.success === false || !body.data) {
    throw new Error(response.status === 503 ? "Agent Trace \u5C1A\u672A\u542F\u7528" : body.error || "\u65E0\u6CD5\u8BFB\u53D6 Agent Trace");
  }
  return body.data;
}
async function cancelAgentTask(sessionKey) {
  const base = getSandboxApiBase() || window.location.origin;
  const response = await fetch(new URL("/api/agent/tasks/cancel", `${base}/`), {
    method: "POST",
    headers: { ...getSandboxAuthHeaders(), "content-type": "application/json" },
    body: JSON.stringify({ sessionKey })
  });
  const body = await response.json().catch(() => ({}));
  if (!response.ok || body.success === false) {
    throw new Error(body.error || "\u65E0\u6CD5\u505C\u6B62 Agent \u4EFB\u52A1");
  }
  return body.data?.cancelled === true;
}
function usageRecord(data) {
  return data.usage && typeof data.usage === "object" ? data.usage : {};
}
function usageTotal(data) {
  return Number(usageRecord(data).totalTokens ?? 0);
}
function usageDetail(data) {
  const usage = usageRecord(data);
  return `\u8F93\u5165 ${Number(usage.promptTokens ?? 0).toLocaleString()} \xB7 \u8F93\u51FA ${Number(usage.completionTokens ?? 0).toLocaleString()}`;
}
function arrayLength(value) {
  return Array.isArray(value) ? value.length : 0;
}
function preview(value) {
  if (value == null)
    return "";
  if (typeof value === "string")
    return value.slice(0, 96);
  try {
    return JSON.stringify(value).slice(0, 96);
  } catch {
    return String(value).slice(0, 96);
  }
}
function duration(value) {
  const ms = Number(value);
  return Number.isFinite(ms) ? `${ms.toLocaleString()} ms` : "\u6267\u884C\u5B8C\u6210";
}
function shortTurn(value) {
  return value.length > 12 ? value.slice(0, 10) : value;
}
function artifactStatus(event) {
  if (!event)
    return "running";
  if (event.type === "tool_result")
    return "completed";
  if (event.type === "tool_denied")
    return "denied";
  if (event.type === "tool_cancelled")
    return "cancelled";
  return "failed";
}
function artifactOutputDetail(event) {
  if (!event)
    return void 0;
  const value = event.data.output ?? event.data.error ?? event.data.reason;
  if (typeof value === "string")
    return value.slice(0, 8e3) || void 0;
  if (value == null)
    return void 0;
  try {
    return JSON.stringify(value, null, 2).slice(0, 8e3);
  } catch {
    return String(value).slice(0, 8e3);
  }
}
function toolStepDetail(toolName, args, fallback) {
  if (toolName === "bash")
    return stringValue(args.command).slice(0, 160) || fallback;
  if (toolName === "write_file" || toolName === "edit_file" || toolName === "read_file") {
    return stringValue(args.file_path ?? args.path).slice(0, 160) || fallback;
  }
  return fallback;
}
function taskStatusText(status) {
  if (status === "running")
    return "\u8FD0\u884C\u4E2D";
  if (status === "completed")
    return "\u5DF2\u5B8C\u6210";
  if (status === "cancelled")
    return "\u5DF2\u53D6\u6D88";
  return "\u5931\u8D25";
}
function stepStatusMark(status) {
  if (status === "completed")
    return "\u2713";
  if (status === "running")
    return "\u25C9";
  if (status === "cancelled")
    return "\u25A0";
  return "\xD7";
}
function markdownInline(value) {
  return value.replace(/[\\`*_[\]<>]/gu, "\\$&").replace(/\r?\n/gu, " ");
}
function reportStepTitle(value) {
  const tool = /^运行 (.+)$/u.exec(value)?.[1];
  return tool ? `\u8FD0\u884C ${markdownInlineCode(tool)}` : markdownInline(value);
}
function markdownInlineCode(value) {
  const normalized = value.replace(/\r?\n/gu, " ");
  const longestTicks = Math.max(0, ...[...normalized.matchAll(/`+/gu)].map((match) => match[0].length));
  const fence = "`".repeat(Math.max(1, longestTicks + 1));
  const padding = /^\s|\s$|^`|`$/u.test(normalized) ? " " : "";
  return `${fence}${padding}${normalized}${padding}${fence}`;
}
function markdownBlock(language, value) {
  const longestTicks = Math.max(0, ...[...value.matchAll(/`+/gu)].map((match) => match[0].length));
  const fence = "`".repeat(Math.max(3, longestTicks + 1));
  return [`${fence}${language}`, value, fence];
}
function fileDiff(toolName, args, filePath) {
  if (toolName !== "edit_file")
    return void 0;
  const diffPath = filePath.replace(/^\/+/, "");
  const before = stringValue(args.old_string);
  const after = stringValue(args.new_string);
  if (!before && !after)
    return void 0;
  return [
    `--- a/${diffPath}`,
    `+++ b/${diffPath}`,
    "@@",
    ...before.split("\n").map((line) => `- ${line}`),
    ...after.split("\n").map((line) => `+ ${line}`)
  ].join("\n").slice(0, 8e3);
}
function isTestCommand(command) {
  return /(?:^|\s)(?:test|vitest|jest|pytest|cargo\s+test|go\s+test|pnpm\s+(?:run\s+)?test|npm\s+(?:run\s+)?test|yarn\s+test)(?:\s|$)/iu.test(command);
}
function recordValue(value) {
  return value && typeof value === "object" && !Array.isArray(value) ? value : {};
}
function toolCorrelationKey(event, toolUseId) {
  return `${event.runtimeId ?? "legacy"}:${event.turnId}:${toolUseId}`;
}
function runCorrelationKey(event) {
  return runIdentityKey(event);
}
function runIdentityKey(run) {
  return `${run.runtimeId ?? "legacy"}:${run.turnId}`;
}
function matchesRun(value, run) {
  return value.turnId === run.turnId && value.runtimeId === run.runtimeId;
}
function stringValue(value) {
  return typeof value === "string" ? value : "";
}
function numberValue(value) {
  const number = Number(value);
  return Number.isFinite(number) ? number : void 0;
}
function parseCachedTraceEvent(value) {
  if (!value || typeof value !== "object" || Array.isArray(value))
    return void 0;
  const item = value;
  if (typeof item.sequence !== "number" || typeof item.recordedAt !== "number" || typeof item.sessionKey !== "string" || typeof item.turnId !== "string" || typeof item.type !== "string" || !item.data || typeof item.data !== "object" || Array.isArray(item.data))
    return void 0;
  return {
    ...typeof item.runtimeId === "string" ? { runtimeId: item.runtimeId } : {},
    sequence: item.sequence,
    recordedAt: item.recordedAt,
    sessionKey: item.sessionKey,
    turnId: item.turnId,
    type: item.type,
    data: item.data
  };
}
function nonNegativeNumber(value) {
  const number = Number(value);
  return Number.isSafeInteger(number) && number >= 0 ? number : 0;
}
function browserTraceStorage() {
  return typeof window === "undefined" ? void 0 : window.localStorage;
}

// node_modules/.pnpm/@zhin.js+adapter-sandbox@1.1.0_@ai-sdk+openai@4.0.69_zod@4.6.5__@zhin.js+adapter@1.1.12_@zhin_afugtif7f4xa45ozkajeyq4koy/node_modules/@zhin.js/adapter-sandbox/lib/run-config.js
var DEFAULT_SANDBOX_AGENT_RUN_CONFIG = Object.freeze({
  workingDirectory: "",
  safetyMode: "workspace-write",
  approvalMode: "ask",
  networkAccess: false
});
var SAFETY_MODES = /* @__PURE__ */ new Set(["read-only", "workspace-write", "danger-full-access"]);
var APPROVAL_MODES = /* @__PURE__ */ new Set(["ask", "deny", "allow"]);
function normalizeSandboxAgentRunConfig(value) {
  if (!value || typeof value !== "object" || Array.isArray(value))
    return void 0;
  const input = value;
  const workingDirectory = typeof input.workingDirectory === "string" ? input.workingDirectory.trim().slice(0, 4096) : "";
  const safetyMode = SAFETY_MODES.has(input.safetyMode) ? input.safetyMode : DEFAULT_SANDBOX_AGENT_RUN_CONFIG.safetyMode;
  const approvalMode = APPROVAL_MODES.has(input.approvalMode) ? input.approvalMode : DEFAULT_SANDBOX_AGENT_RUN_CONFIG.approvalMode;
  return Object.freeze({
    workingDirectory,
    safetyMode,
    approvalMode,
    // Full host access cannot be combined with a portable network namespace.
    // Keep the contract honest: danger mode includes network authority.
    networkAccess: safetyMode === "danger-full-access" || input.networkAccess === true
  });
}

// node_modules/.pnpm/@zhin.js+adapter-sandbox@1.1.0_@ai-sdk+openai@4.0.69_zod@4.6.5__@zhin.js+adapter@1.1.12_@zhin_afugtif7f4xa45ozkajeyq4koy/node_modules/@zhin.js/adapter-sandbox/pages/playgroundState.js
var PLAYGROUND_STORAGE_KEY = "zhin.sandbox.agent-playground.v1";
function createDefaultPlaygroundState(workingDirectory = "") {
  const runConfig = (safetyMode) => ({
    ...DEFAULT_SANDBOX_AGENT_RUN_CONFIG,
    workingDirectory,
    safetyMode
  });
  const sessions = [
    { id: "sandbox-user", name: "\u5FEB\u901F\u8BD5\u9A8C", type: "private", unread: 0, runConfig: runConfig("workspace-write") },
    { id: "sandbox-group", name: "\u7FA4\u7EC4\u4F5C\u7528\u57DF", type: "group", unread: 0, runConfig: runConfig("workspace-write") },
    { id: "sandbox-channel", name: "\u9891\u9053\u4F5C\u7528\u57DF", type: "channel", unread: 0, runConfig: runConfig("read-only") }
  ];
  return Object.freeze({
    version: 1,
    activeSessionId: sessions[0].id,
    activeSessionType: sessions[0].type,
    sessions,
    messages: []
  });
}
function loadPlaygroundState(storage = browserStorage()) {
  const fallback = createDefaultPlaygroundState();
  if (!storage)
    return fallback;
  try {
    const raw = storage.getItem(PLAYGROUND_STORAGE_KEY);
    if (!raw)
      return fallback;
    const parsed = JSON.parse(raw);
    if (parsed.version !== 1)
      return fallback;
    const sessions = Array.isArray(parsed.sessions) ? parsed.sessions.map(parseSession).filter((item) => Boolean(item)) : [];
    if (sessions.length === 0)
      return fallback;
    const sessionKeys = new Set(sessions.map(sessionIdentity));
    const messages = Array.isArray(parsed.messages) ? parsed.messages.map(parseMessage).filter((item) => Boolean(item) && sessionKeys.has(sessionIdentity({ id: item.channelId, type: item.channelType }))) : [];
    const requestedActive = typeof parsed.activeSessionId === "string" ? sessions.find((session) => session.id === parsed.activeSessionId && (parsed.activeSessionType === void 0 || session.type === parsed.activeSessionType)) : void 0;
    const activeSession = requestedActive ?? sessions[0];
    return Object.freeze({
      version: 1,
      activeSessionId: activeSession.id,
      activeSessionType: activeSession.type,
      sessions,
      messages
    });
  } catch {
    return fallback;
  }
}
function savePlaygroundState(state, storage = browserStorage()) {
  if (!storage)
    return false;
  try {
    const sessions = state.sessions;
    const sessionKeys = new Set(sessions.map(sessionIdentity));
    const activeSession = sessions.find((session) => session.id === state.activeSessionId && (state.activeSessionType === void 0 || session.type === state.activeSessionType)) ?? sessions[0];
    storage.setItem(PLAYGROUND_STORAGE_KEY, JSON.stringify({
      version: 1,
      activeSessionId: activeSession?.id ?? "",
      activeSessionType: activeSession?.type,
      sessions,
      messages: state.messages.filter((message) => sessionKeys.has(sessionIdentity({
        id: message.channelId,
        type: message.channelType
      })))
    }));
    return true;
  } catch {
    return false;
  }
}
function parseSession(value) {
  if (!value || typeof value !== "object" || Array.isArray(value))
    return void 0;
  const item = value;
  if (typeof item.id !== "string" || !item.id.trim() || typeof item.name !== "string")
    return void 0;
  if (item.type !== "private" && item.type !== "group" && item.type !== "channel")
    return void 0;
  return {
    id: item.id.slice(0, 256),
    name: item.name.trim().slice(0, 120) || "\u672A\u547D\u540D\u8BD5\u9A8C",
    type: item.type,
    unread: Number.isSafeInteger(item.unread) && Number(item.unread) > 0 ? Number(item.unread) : 0,
    runConfig: normalizeSandboxAgentRunConfig(item.runConfig) ?? DEFAULT_SANDBOX_AGENT_RUN_CONFIG
  };
}
function parseMessage(value) {
  if (!value || typeof value !== "object" || Array.isArray(value))
    return void 0;
  const item = value;
  if (typeof item.id !== "string" || typeof item.channelId !== "string" || !Array.isArray(item.content))
    return void 0;
  if (item.type !== "sent" && item.type !== "received")
    return void 0;
  if (item.channelType !== "private" && item.channelType !== "group" && item.channelType !== "channel")
    return void 0;
  return {
    id: item.id.slice(0, 256),
    type: item.type,
    channelType: item.channelType,
    channelId: item.channelId.slice(0, 256),
    channelName: typeof item.channelName === "string" ? item.channelName.slice(0, 120) : "",
    senderId: typeof item.senderId === "string" ? item.senderId.slice(0, 256) : "",
    senderName: typeof item.senderName === "string" ? item.senderName.slice(0, 120) : "",
    content: item.content,
    timestamp: Number.isFinite(item.timestamp) ? Number(item.timestamp) : Date.now(),
    ...item.interactionResolved === true ? { interactionResolved: true } : {}
  };
}
function browserStorage() {
  return typeof window === "undefined" ? void 0 : window.localStorage;
}
function sessionIdentity(value) {
  return `${value.type}\0${value.id}`;
}

// node_modules/.pnpm/@zhin.js+adapter-sandbox@1.1.0_@ai-sdk+openai@4.0.69_zod@4.6.5__@zhin.js+adapter@1.1.12_@zhin_afugtif7f4xa45ozkajeyq4koy/node_modules/@zhin.js/adapter-sandbox/pages/SandboxChat.js
function Sandbox() {
  const [initialState] = useState4(() => loadPlaygroundState());
  const [messages, setMessages] = useState4(() => [...initialState.messages]);
  const [channels, setChannels] = useState4(() => [...initialState.sessions]);
  const [faceList, setFaceList] = useState4([]);
  const [activeChannel, setActiveChannel] = useState4(() => initialState.sessions.find((session) => session.id === initialState.activeSessionId && (initialState.activeSessionType === void 0 || session.type === initialState.activeSessionType)) ?? initialState.sessions[0] ?? createDefaultPlaygroundState().sessions[0]);
  const [inputText, setInputText] = useState4("");
  const [endpointId, setBotName] = useState4("sandbox-bot");
  const [connected, setConnected] = useState4(false);
  const [canExecute, setCanExecute] = useState4(true);
  const [persistenceStatus, setPersistenceStatus] = useState4("saved");
  const [transportNotice, setTransportNotice] = useState4(null);
  const [shellIsolation, setShellIsolation] = useState4(null);
  const [inspectorView, setInspectorView] = useState4("runs");
  const [expandedArtifact, setExpandedArtifact] = useState4(null);
  const [stoppingTask, setStoppingTask] = useState4(false);
  const [inlineRunExpanded, setInlineRunExpanded] = useState4(false);
  const [showFacePicker, setShowFacePicker] = useState4(false);
  const [mediaPanel, setMediaPanel] = useState4(null);
  const [mediaUrl, setMediaUrl] = useState4("");
  const [atPopoverPosition, setAtPopoverPosition] = useState4(null);
  const [atSearchQuery, setAtSearchQuery] = useState4("");
  const [faceSearchQuery, setFaceSearchQuery] = useState4("");
  const [atSuggestions] = useState4([
    { id: "actor-owner", name: "\u5F53\u524D\u7528\u6237" },
    { id: "actor-reviewer", name: "\u5BA1\u9605\u8005" },
    { id: "actor-operator", name: "\u534F\u4F5C\u8005" },
    { id: "actor-bot", name: "Sandbox Agent" }
  ]);
  const [previewSegments, setPreviewSegments] = useState4([]);
  const [composerMode, setComposerMode] = useState4("write");
  const [showChannelList, setShowChannelList] = useState4(false);
  const [showInspector, setShowInspector] = useState4(false);
  const [showRunSettings, setShowRunSettings] = useState4(false);
  const [showNewSession, setShowNewSession] = useState4(false);
  const [newSessionName, setNewSessionName] = useState4("");
  const [newSessionScope, setNewSessionScope] = useState4("private");
  const [confirmClear, setConfirmClear] = useState4(false);
  const [trace, setTrace] = useState4(null);
  const [traceLoading, setTraceLoading] = useState4(true);
  const [traceNotice, setTraceNotice] = useState4(null);
  const messagesEndRef = useRef3(null);
  const wsRef = useRef3(null);
  const editorRef = useRef3(null);
  const traceRef = useRef3(null);
  const activeChannelRef = useRef3(activeChannel);
  const endpointIdRef = useRef3(endpointId);
  const sessionKey = useMemo3(() => buildSandboxSessionKey(endpointId, activeChannel.type, activeChannel.id), [activeChannel.id, activeChannel.type, endpointId]);
  const traceSummary = useMemo3(() => summarizeTrace(trace), [trace]);
  const taskRuns = useMemo3(() => deriveTaskRuns(trace), [trace]);
  const workbenchArtifacts = useMemo3(() => deriveWorkbenchArtifacts(trace), [trace]);
  const currentTask = taskRuns.find((run) => run.status === "running") ?? taskRuns[0];
  const currentRunSteps = useMemo3(() => deriveAgentRunSteps(trace, currentTask), [currentTask, trace]);
  const currentRunArtifacts = useMemo3(() => workbenchArtifacts.filter((artifact) => artifact.turnId === currentTask?.turnId && artifact.runtimeId === currentTask?.runtimeId), [currentTask?.runtimeId, currentTask?.turnId, workbenchArtifacts]);
  useEffect3(() => {
    activeChannelRef.current = activeChannel;
  }, [activeChannel]);
  useEffect3(() => {
    endpointIdRef.current = endpointId;
  }, [endpointId]);
  useEffect3(() => {
    setInlineRunExpanded(currentTask?.status === "running");
  }, [currentTask?.id]);
  useEffect3(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentTask?.id]);
  useEffect3(() => {
    setPersistenceStatus(savePlaygroundState({
      activeSessionId: activeChannel.id,
      activeSessionType: activeChannel.type,
      sessions: channels,
      messages
    }) ? "saved" : "error");
  }, [activeChannel.id, channels, messages]);
  const fetchFaceList = async () => {
    try {
      const res = await fetch("https://face.viki.moe/metadata.json");
      setFaceList(await res.json());
    } catch (err) {
      console.error("[Sandbox] Failed to fetch face list:", err);
    }
  };
  useEffect3(() => {
    fetchFaceList();
  }, []);
  const handleInboundPayload = (data) => {
    if (data.type === "ready") {
      setBotName(data.endpoint || data.bot || "sandbox-bot");
      setCanExecute(data.canExecute !== false);
      setTransportNotice(data.canExecute === false ? "\u5F53\u524D Token \u53EA\u6709\u6F14\u793A\u6743\u9650\uFF0C\u4EFB\u52A1\u8FD0\u884C\u5DF2\u7981\u7528\u3002" : null);
      if (data.shellIsolation) {
        setShellIsolation({
          available: data.shellIsolation.available === true,
          provider: data.shellIsolation.provider || "docker",
          message: data.shellIsolation.message || "\u672A\u68C0\u6D4B\u5230\u9694\u79BB\u6267\u884C\u73AF\u5883"
        });
      }
      if (data.workingDirectory?.trim()) {
        const workingDirectory = data.workingDirectory.trim();
        setChannels((current) => current.map((session) => session.runConfig.workingDirectory ? session : { ...session, runConfig: { ...session.runConfig, workingDirectory } }));
        setActiveChannel((current) => current.runConfig.workingDirectory ? current : { ...current, runConfig: { ...current.runConfig, workingDirectory } });
      }
      return;
    }
    if (data.type === "error") {
      const notice = Array.isArray(data.content) ? String(data.content[0]?.data?.text ?? "Sandbox \u62D2\u7EDD\u4E86\u672C\u6B21\u64CD\u4F5C") : String(data.content ?? "Sandbox \u62D2\u7EDD\u4E86\u672C\u6B21\u64CD\u4F5C");
      setTransportNotice(notice);
      return;
    }
    if (data.type === "edit" && data.messageId) {
      const content2 = Array.isArray(data.content) ? data.content : parseTextToSegments(String(data.content ?? ""));
      setMessages((prev) => prev.map((m) => m.id === data.messageId ? { ...m, content: content2 } : m));
      return;
    }
    const content = typeof data.content === "string" ? parseTextToSegments(data.content) : Array.isArray(data.content) ? data.content : parseTextToSegments(String(data.content ?? ""));
    const channelType = data.type === "group" || data.type === "channel" ? data.type : "private";
    const channelName = channelType === "private" ? `\u4F1A\u8BDD ${data.id}` : channelType === "group" ? `\u7FA4\u7EC4\u573A\u666F ${data.id}` : `\u9891\u9053\u573A\u666F ${data.id}`;
    setChannels((prev) => {
      if (prev.some((c) => c.id === data.id && c.type === channelType))
        return prev;
      const created = {
        id: data.id,
        name: channelName,
        type: channelType,
        unread: 0,
        runConfig: { ...activeChannelRef.current.runConfig }
      };
      setActiveChannel(created);
      return [...prev, created];
    });
    setMessages((prev) => [...prev, {
      id: data.messageId ?? `bot_${data.timestamp}`,
      type: "received",
      channelType,
      channelId: data.id,
      channelName,
      senderId: "endpoint",
      senderName: data.bot || endpointIdRef.current,
      content,
      timestamp: data.timestamp
    }]);
  };
  const sendInteractiveAction = (payload, messageId) => {
    const ws = wsRef.current;
    if (!ws || ws.readyState !== WebSocket.OPEN) {
      setTransportNotice("Sandbox \u8FDE\u63A5\u5C1A\u672A\u5C31\u7EEA\uFF0C\u5BA1\u6279\u9009\u62E9\u672A\u53D1\u9001\u3002");
      return;
    }
    const segments = [{ type: "action", data: { id: payload, payload } }];
    const payloadJson = JSON.stringify({
      type: activeChannel.type,
      id: activeChannel.id,
      content: segments,
      agentRun: activeChannel.runConfig,
      timestamp: Date.now()
    });
    try {
      ws.send(payloadJson);
      if (messageId) {
        setMessages((current) => current.map((message) => message.id === messageId ? { ...message, interactionResolved: true } : message));
      }
    } catch {
      setTransportNotice("\u5BA1\u6279\u9009\u62E9\u53D1\u9001\u5931\u8D25\uFF0C\u8BF7\u7B49\u5F85\u8FDE\u63A5\u6062\u590D\u540E\u91CD\u8BD5\u3002");
    }
  };
  useEffect3(() => {
    let closed = false;
    let retryTimer;
    let attempt = 0;
    let replaceInFlight = false;
    const connect = () => {
      if (closed)
        return;
      if (retryTimer) {
        clearTimeout(retryTimer);
        retryTimer = void 0;
      }
      const wsUrl = buildSandboxWebSocketUrl();
      const previous = wsRef.current;
      if (previous) {
        replaceInFlight = true;
        previous.onclose = null;
        previous.onerror = null;
        previous.onmessage = null;
        previous.onopen = null;
        try {
          previous.close();
        } catch {
        }
        replaceInFlight = false;
      }
      const ws = new WebSocket(wsUrl);
      wsRef.current = ws;
      ws.onopen = () => {
        attempt = 0;
        setConnected(true);
      };
      ws.onmessage = (event) => {
        try {
          handleInboundPayload(JSON.parse(String(event.data)));
        } catch (err) {
          console.error("[Sandbox] Failed to parse message:", err);
        }
      };
      ws.onclose = () => {
        if (wsRef.current !== ws)
          return;
        setConnected(false);
        wsRef.current = null;
        if (closed || replaceInFlight)
          return;
        const delay = Math.min(8e3, 500 * 2 ** attempt);
        attempt += 1;
        retryTimer = setTimeout(connect, delay);
      };
      ws.onerror = () => {
      };
    };
    const onAuthOrStorage = (event) => {
      if (event && event.type === "storage") {
        const key = event.key;
        if (key != null && key !== "zhin_api_token" && key !== "zhin_api_base" && key !== "HTTP_TOKEN" && key !== "zhin_http_token") {
          return;
        }
      }
      attempt = 0;
      connect();
    };
    connect();
    if (typeof window !== "undefined") {
      window.addEventListener("storage", onAuthOrStorage);
      window.addEventListener("zhin:auth-required", onAuthOrStorage);
      window.addEventListener("zhin:auth-changed", onAuthOrStorage);
      window.addEventListener("zhin:api-base-changed", onAuthOrStorage);
    }
    return () => {
      closed = true;
      if (retryTimer)
        clearTimeout(retryTimer);
      if (typeof window !== "undefined") {
        window.removeEventListener("storage", onAuthOrStorage);
        window.removeEventListener("zhin:auth-required", onAuthOrStorage);
        window.removeEventListener("zhin:auth-changed", onAuthOrStorage);
        window.removeEventListener("zhin:api-base-changed", onAuthOrStorage);
      }
      wsRef.current?.close();
      wsRef.current = null;
      setConnected(false);
    };
  }, []);
  useEffect3(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  useEffect3(() => {
    setPreviewSegments(inputText.trim() ? parseTextToSegments(inputText) : []);
  }, [inputText]);
  const loadTrace = useCallback3(async (quiet = false) => {
    if (!quiet)
      setTraceLoading(true);
    try {
      const current = traceRef.current?.sessionKey === sessionKey ? traceRef.current : null;
      let incoming = await fetchAgentTrace(sessionKey, quiet ? current?.latestSequence ?? 0 : 0);
      if (quiet && current?.runtimeId && incoming.runtimeId && current.runtimeId !== incoming.runtimeId) {
        incoming = await fetchAgentTrace(sessionKey, 0);
      }
      const merged = mergeTraceSnapshot(current, incoming);
      traceRef.current = merged;
      setTrace(merged);
      saveCachedAgentTrace(merged);
      setTraceNotice(null);
    } catch (error) {
      setTraceNotice(error instanceof Error ? error.message : "Agent Trace \u6682\u4E0D\u53EF\u7528");
    } finally {
      if (!quiet)
        setTraceLoading(false);
    }
  }, [sessionKey]);
  useEffect3(() => {
    const cached = loadCachedAgentTrace(sessionKey);
    traceRef.current = cached;
    setTrace(cached);
    setTraceNotice(null);
    void loadTrace();
    const timer = window.setInterval(() => {
      if (document.visibilityState === "visible")
        void loadTrace(true);
    }, 2e3);
    return () => window.clearInterval(timer);
  }, [loadTrace]);
  const parseTextToSegments = (text) => {
    const segments = [];
    const regex = /\[@([^\]]+)\]|\[face:(\d+)\]|\[image:([^\]]+)\]|\[video:([^\]]+)\]|\[audio:([^\]]+)\]/g;
    let lastIndex = 0;
    let match;
    while ((match = regex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        const t = text.substring(lastIndex, match.index);
        if (t)
          segments.push({ type: "text", data: { text: t } });
      }
      if (match[1])
        segments.push({ type: "mention", data: { target: match[1], name: match[1] } });
      else if (match[2])
        segments.push({ type: "face", data: { id: parseInt(match[2], 10) } });
      else if (match[3])
        segments.push({ type: "image", data: { media: { kind: "url", value: match[3] } } });
      else if (match[4])
        segments.push({ type: "video", data: { media: { kind: "url", value: match[4] } } });
      else if (match[5])
        segments.push({ type: "audio", data: { media: { kind: "url", value: match[5] } } });
      lastIndex = regex.lastIndex;
    }
    if (lastIndex < text.length) {
      const r2 = text.substring(lastIndex);
      if (r2)
        segments.push({ type: "text", data: { text: r2 } });
    }
    return segments.length > 0 ? segments : [{ type: "text", data: { text } }];
  };
  const hasRenderableSegments = (segments) => {
    if (segments.length === 0)
      return false;
    return segments.some((s) => {
      if (s.type === "text")
        return Boolean(String(s.data?.text ?? "").trim());
      if (s.type === "keyboard")
        return true;
      return true;
    });
  };
  const renderMessageSegments = (segments, isSent, messageId, interactionResolved = false) => {
    const ring = isSent ? "ring-1 ring-primary-foreground/25" : "ring-1 ring-border/60";
    return segments.map((segment, index) => {
      if (typeof segment === "string") {
        return _jsx4(MarkdownContent, { text: segment, className: isSent ? "zhin-markdown--inverse" : void 0 }, index);
      }
      const d = segment.data;
      switch (segment.type) {
        case "text":
        case "markdown":
        case "md":
          return _jsx4(MarkdownContent, { text: String(d.text ?? d.content ?? ""), className: isSent ? "zhin-markdown--inverse" : void 0 }, index);
        case "code":
          return _jsx4(CodeBlock, { code: String(d.code ?? d.text ?? d.content ?? ""), language: String(d.language ?? d.lang ?? "") }, index);
        case "mention":
        case "at":
          return _jsxs3("span", { className: "inline-flex items-center px-1.5 py-0.5 rounded bg-accent text-accent-foreground text-xs mx-0.5", children: ["@", String(d.name ?? d.target ?? d.qq ?? "")] }, index);
        case "face":
          return _jsx4("img", { src: `https://face.viki.moe/apng/${d.id}.png`, alt: String(d.name ?? ""), className: "w-6 h-6 inline-block align-middle mx-0.5", title: String(d.name ?? d.id ?? "") }, index);
        case "dice":
          return _jsxs3("span", { className: "inline-flex items-center px-1.5 py-0.5 rounded bg-secondary text-xs mx-0.5", children: ["\u{1F3B2} ", d.result != null ? `\u70B9\u6570 ${String(d.result)}` : "\u9AB0\u5B50"] }, index);
        case "rps":
          return _jsxs3("span", { className: "inline-flex items-center px-1.5 py-0.5 rounded bg-secondary text-xs mx-0.5", children: ["\u270A ", d.result != null ? `\u7ED3\u679C ${String(d.result)}` : "\u731C\u62F3"] }, index);
        case "image": {
          const raw = pickMediaRawUrl(d);
          const src = resolveMediaSrc(raw, "image");
          if (!src)
            return _jsx4("span", { className: "text-xs opacity-70", children: "[\u56FE\u7247]" }, index);
          return _jsx4("a", { href: src, target: "_blank", rel: "noreferrer", className: "block my-1", children: _jsx4("img", { src, alt: "", className: cn("max-w-[min(320px,88vw)] rounded-lg block", ring, "ring-offset-0"), onError: (e) => {
            e.target.style.display = "none";
          } }) }, index);
        }
        case "video": {
          const raw = pickMediaRawUrl(d);
          const src = resolveMediaSrc(raw, "video");
          if (!src)
            return _jsx4("span", { className: "text-xs opacity-70", children: "[\u89C6\u9891\u65E0\u5730\u5740]" }, index);
          return _jsx4("video", { src, controls: true, playsInline: true, preload: "metadata", className: cn("max-w-[min(360px,92vw)] max-h-72 rounded-lg my-1 bg-black/10", ring) }, index);
        }
        case "audio":
        case "record": {
          const raw = pickMediaRawUrl(d);
          const src = resolveMediaSrc(raw, "audio");
          if (!src)
            return _jsx4("span", { className: "text-xs opacity-70", children: "[\u97F3\u9891\u65E0\u5730\u5740]" }, index);
          return _jsx4("audio", { src, controls: true, preload: "metadata", className: cn("w-full max-w-sm my-2 h-10", isSent && "opacity-95") }, index);
        }
        case "reply":
          return _jsxs3("div", { className: "mb-1 rounded-md border border-dashed px-2 py-1 text-xs opacity-90", children: ["\u21A9 \u5F15\u7528\u6D88\u606F #", String(d.message_id ?? d.id ?? "")] }, index);
        case "forward": {
          const messages2 = d.messages;
          const title = String(d.title ?? "\u804A\u5929\u8BB0\u5F55");
          return _jsxs3("div", { className: "my-1 rounded-md border bg-background/40 px-2 py-2 text-xs space-y-1", children: [_jsxs3("div", { className: "font-medium", children: ["\u{1F4E8} ", title] }), Array.isArray(messages2) && messages2.length > 0 ? _jsxs3("div", { className: "space-y-1 pl-2 border-l-2 border-muted", children: [messages2.slice(0, 3).map((batch, bi) => _jsx4("div", { className: "opacity-90", children: batch.map((s, si) => _jsx4("span", { children: s.type === "text" ? String(s.data?.text ?? "") : `[${s.type ?? "seg"}]` }, si)) }, bi)), messages2.length > 3 && _jsxs3("div", { className: "opacity-60", children: ["\u2026\u5171 ", messages2.length, " \u6761"] })] }) : _jsx4("div", { className: "opacity-70", children: "[\u5408\u5E76\u8F6C\u53D1]" })] }, index);
        }
        case "keyboard": {
          const rows = d.rows ?? [];
          const resolved = Boolean(messageId && interactionResolved);
          return _jsxs3("div", { className: "agent-playground-approval-actions", children: [rows.map((row, ri) => _jsx4("div", { children: row.map((btn) => _jsx4("button", { type: "button", disabled: btn.disabled || isSent || resolved, onClick: () => sendInteractiveAction(btn.payload, messageId), className: cn((btn.style === "primary" || /^允许/u.test(btn.label)) && "is-primary", (btn.style === "danger" || /拒绝|取消/u.test(btn.label)) && "is-danger"), children: btn.label }, btn.payload)) }, ri)), resolved && _jsxs3("small", { children: [_jsx4(Check, { size: 12 }), "\u5DF2\u63D0\u4EA4\u672C\u6B21\u9009\u62E9"] })] }, index);
        }
        default:
          return _jsxs3("span", { className: "text-xs opacity-70", children: ["[", segment.type, "]"] }, index);
      }
    });
  };
  const handleSendMessage = (text, segments) => {
    if (!canExecute || !hasRenderableSegments(segments))
      return;
    const newMessage = { id: `msg_${Date.now()}`, type: "sent", channelType: activeChannel.type, channelId: activeChannel.id, channelName: activeChannel.name, senderId: "test_user", senderName: "\u6D4B\u8BD5\u7528\u6237", content: segments, timestamp: Date.now() };
    setMessages((prev) => [...prev, newMessage]);
    setInputText("");
    setPreviewSegments([]);
    setComposerMode("write");
    editorRef.current?.clear();
    const payload = JSON.stringify({
      type: activeChannel.type,
      id: activeChannel.id,
      messageId: newMessage.id,
      content: segments,
      agentRun: activeChannel.runConfig,
      timestamp: Date.now()
    });
    wsRef.current?.send(payload);
  };
  const clearMessages = () => {
    setMessages((current) => current.filter((message) => !(message.channelId === activeChannel.id && message.channelType === activeChannel.type)));
    setConfirmClear(false);
  };
  const switchChannel = (channel) => {
    setActiveChannel(channel);
    setChannels((prev) => prev.map((c) => c.id === channel.id && c.type === channel.type ? { ...c, unread: 0 } : c));
    if (window.innerWidth < 900)
      setShowChannelList(false);
  };
  const updateRunConfig = (patch) => {
    const next = { ...activeChannel, runConfig: { ...activeChannel.runConfig, ...patch } };
    setActiveChannel(next);
    setChannels((sessions) => sessions.map((session) => session.id === activeChannel.id && session.type === activeChannel.type ? next : session));
  };
  const addSession = () => {
    const label = newSessionName.trim() || "\u672A\u547D\u540D\u8BD5\u9A8C";
    const id = `${newSessionScope}-${Date.now().toString(36)}`;
    const session = {
      id,
      name: label,
      type: newSessionScope,
      unread: 0,
      runConfig: { ...activeChannel.runConfig }
    };
    setChannels((current) => [...current, session]);
    setActiveChannel(session);
    setNewSessionName("");
    setShowNewSession(false);
  };
  const getChannelIcon = (type) => {
    switch (type) {
      case "private":
        return _jsx4(User, { size: 16 });
      case "group":
        return _jsx4(Users, { size: 16 });
      case "channel":
        return _jsx4(Hash, { size: 16 });
      default:
        return _jsx4(MessageSquare, { size: 16 });
    }
  };
  const insertFace = (faceId) => {
    editorRef.current?.insertFace(faceId);
    setShowFacePicker(false);
  };
  const commitMediaUrl = () => {
    const u = mediaUrl.trim();
    if (!u || !mediaPanel)
      return;
    if (mediaPanel === "image")
      editorRef.current?.insertImage(u);
    else if (mediaPanel === "video")
      editorRef.current?.insertVideo(u);
    else
      editorRef.current?.insertAudio(u);
    setMediaUrl("");
    setMediaPanel(null);
  };
  const selectAtUser = (user) => {
    editorRef.current?.replaceAtTrigger(user.name, user.id);
    setAtPopoverPosition(null);
    setAtSearchQuery("");
  };
  const handleAtTrigger = (show, searchQuery, position) => {
    if (activeChannel.type === "private") {
      setAtPopoverPosition(null);
      setAtSearchQuery("");
      return;
    }
    if (show && position) {
      setAtPopoverPosition(position);
      setAtSearchQuery(searchQuery);
    } else {
      setAtPopoverPosition(null);
      setAtSearchQuery("");
    }
  };
  const filteredAtSuggestions = atSuggestions.filter((user) => {
    if (!atSearchQuery.trim())
      return true;
    const q = atSearchQuery.toLowerCase();
    return user.name.toLowerCase().includes(q) || user.id.toLowerCase().includes(q);
  });
  const handleEditorChange = (text, segments) => {
    setInputText(text);
    setPreviewSegments(segments);
  };
  const filteredFaces = faceList.filter((face) => face.name.toLowerCase().includes(faceSearchQuery.toLowerCase()) || face.describe.toLowerCase().includes(faceSearchQuery.toLowerCase()));
  const channelMessages = messages.filter((msg) => msg.channelId === activeChannel.id && msg.channelType === activeChannel.type);
  const lastUserMessage = [...channelMessages].reverse().find((message) => message.type === "sent");
  const currentTaskMessage = currentTask?.sourceMessageId ? channelMessages.find((message) => message.id === currentTask.sourceMessageId && message.type === "sent") : void 0;
  const scopeLabel = activeChannel.type === "private" ? "\u5355\u7528\u6237" : activeChannel.type === "group" ? "\u7FA4\u7EC4\u4E0A\u4E0B\u6587" : "\u9891\u9053\u4E0A\u4E0B\u6587";
  const runPrompt = (prompt) => handleSendMessage(prompt, [{ type: "text", data: { text: prompt } }]);
  const recentTraceEvents = trace?.events.slice(-8).reverse() ?? [];
  const stopActiveTask = async () => {
    setStoppingTask(true);
    try {
      const cancelled = await cancelAgentTask(sessionKey);
      setTraceNotice(cancelled ? "\u5DF2\u53D1\u9001\u505C\u6B62\u8BF7\u6C42\uFF0C\u6B63\u5728\u7B49\u5F85\u4EFB\u52A1\u7ED3\u675F\u3002" : "\u5F53\u524D\u4F1A\u8BDD\u6CA1\u6709\u8FD0\u884C\u4E2D\u7684\u4EFB\u52A1\u3002");
      window.setTimeout(() => void loadTrace(true), 240);
    } catch (error) {
      setTraceNotice(error instanceof Error ? error.message : "\u65E0\u6CD5\u505C\u6B62\u4EFB\u52A1");
      setShowInspector(true);
    } finally {
      setStoppingTask(false);
    }
  };
  const retryLastTask = () => {
    if (!lastUserMessage)
      return;
    handleSendMessage(messageText(lastUserMessage.content), [...lastUserMessage.content]);
  };
  const retryCurrentTask = () => {
    if (!currentTaskMessage)
      return;
    handleSendMessage(messageText(currentTaskMessage.content), [...currentTaskMessage.content]);
  };
  const exportCurrentRun = () => {
    if (!trace || !currentTask)
      return;
    const report = buildAgentRunReport(trace, {
      run: currentTask,
      sessionName: activeChannel.name,
      taskPrompt: currentTaskMessage ? messageText(currentTaskMessage.content) : void 0,
      workingDirectory: activeChannel.runConfig.workingDirectory,
      safetyMode: activeChannel.runConfig.safetyMode,
      approvalMode: activeChannel.runConfig.approvalMode,
      networkAccess: activeChannel.runConfig.safetyMode === "danger-full-access" || activeChannel.runConfig.networkAccess
    });
    const url = URL.createObjectURL(new Blob([report], { type: "text/markdown;charset=utf-8" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = `zhin-agent-run-${safeFileName(activeChannel.name)}-${currentTask.turnId.slice(0, 8)}.md`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 0);
  };
  const inlineRunCard = currentTask ? _jsxs3("article", { className: cn("agent-playground-inline-run", `is-${currentTask.status}`), "aria-live": currentTask.status === "running" ? "polite" : void 0, children: [_jsx4("span", { className: "agent-playground-inline-run-rail", "aria-hidden": "true" }), _jsxs3("div", { className: "agent-playground-inline-run-head", children: [_jsx4("span", { className: "agent-playground-inline-run-icon", children: _jsx4(ListChecks, { size: 17 }) }), _jsxs3("div", { className: "agent-playground-inline-run-copy", children: [_jsx4("span", { children: currentTask.status === "running" ? "Live agent run" : "Agent run summary" }), _jsx4("h3", { children: taskStatusLabel(currentTask.status) }), currentTaskMessage && _jsx4("p", { children: messageText(currentTaskMessage.content) })] }), _jsxs3("div", { className: "agent-playground-inline-run-actions", children: [currentTask.status === "running" ? _jsxs3("button", { type: "button", className: "is-stop", onClick: () => void stopActiveTask(), disabled: stoppingTask, children: [_jsx4(Square, { size: 12 }), stoppingTask ? "\u505C\u6B62\u4E2D" : "\u505C\u6B62"] }) : currentTaskMessage ? _jsxs3("button", { type: "button", onClick: retryCurrentTask, children: [_jsx4(RotateCcw, { size: 13 }), "\u91CD\u8BD5"] }) : null, _jsxs3("button", { type: "button", onClick: exportCurrentRun, title: "\u5BFC\u51FA Markdown \u8FD0\u884C\u62A5\u544A", children: [_jsx4(FileDown, { size: 13 }), "\u5BFC\u51FA"] })] })] }), _jsxs3("dl", { className: "agent-playground-inline-run-metrics", children: [_jsxs3("div", { children: [_jsx4("dt", { children: "\u8017\u65F6" }), _jsx4("dd", { children: currentTask.durationMs === void 0 ? "\u8FDB\u884C\u4E2D" : formatDuration(currentTask.durationMs) })] }), _jsxs3("div", { children: [_jsx4("dt", { children: "\u6B65\u9AA4" }), _jsx4("dd", { children: currentRunSteps.length })] }), _jsxs3("div", { children: [_jsx4("dt", { children: "\u5DE5\u5177" }), _jsx4("dd", { children: currentTask.toolCount })] }), _jsxs3("div", { children: [_jsx4("dt", { children: "Token" }), _jsx4("dd", { children: currentTask.tokenCount.toLocaleString() })] }), _jsxs3("div", { className: cn(currentTask.problemCount > 0 && "has-problem"), children: [_jsx4("dt", { children: "\u5F02\u5E38" }), _jsx4("dd", { children: currentTask.problemCount })] })] }), inlineRunExpanded && (currentRunSteps.length > 0 ? _jsx4("ol", { className: "agent-playground-inline-run-steps", children: currentRunSteps.map((step) => _jsxs3("li", { className: cn(`is-${step.status}`), children: [_jsx4("i", { "aria-hidden": "true" }), _jsxs3("div", { children: [_jsx4("strong", { children: step.title }), step.detail && _jsx4("small", { children: step.detail })] }), _jsx4("span", { children: step.durationMs === void 0 ? runStepStatusLabel(step.status) : formatDuration(step.durationMs) })] }, step.id)) }) : _jsx4("div", { className: "agent-playground-inline-run-empty", children: "\u6B63\u5728\u7B49\u5F85\u7B2C\u4E00\u6761\u8FD0\u884C\u4E8B\u4EF6\u2026" })), _jsxs3("footer", { children: [_jsxs3("button", { type: "button", "aria-expanded": inlineRunExpanded, onClick: () => setInlineRunExpanded((expanded) => !expanded), children: [_jsx4(ChevronDown, { size: 13 }), inlineRunExpanded ? "\u6536\u8D77\u6B65\u9AA4" : `\u67E5\u770B ${currentRunSteps.length} \u4E2A\u6B65\u9AA4`] }), _jsxs3("button", { type: "button", onClick: () => {
    setInspectorView(currentRunArtifacts.length > 0 ? "artifacts" : "runs");
    setShowInspector(true);
  }, children: [currentRunArtifacts.length > 0 ? `${currentRunArtifacts.length} \u4E2A\u53D8\u66F4\u4E0E\u4EA7\u7269` : "\u6253\u5F00\u8FD0\u884C\u68C0\u67E5\u5668", _jsx4(PanelRight, { size: 13 })] })] })] }) : null;
  return _jsxs3("section", { className: "agent-playground-shell", children: [_jsxs3("div", { className: "agent-playground-mobilebar", children: [_jsxs3("button", { type: "button", "aria-expanded": showChannelList, onClick: () => setShowChannelList(!showChannelList), children: [_jsx4(MessageSquare, { size: 17 }), "\u6D4B\u8BD5\u4F1A\u8BDD"] }), _jsx4("strong", { children: "Agent \u8BD5\u9A8C\u53F0" }), _jsxs3("button", { type: "button", "aria-expanded": showInspector, onClick: () => setShowInspector(!showInspector), children: [_jsx4(PanelRight, { size: 17 }), "\u68C0\u67E5\u5668"] })] }), _jsxs3("nav", { className: cn("channel-sidebar agent-playground-sessions", showChannelList && "show"), "aria-label": "\u6D4B\u8BD5\u4F1A\u8BDD", children: [_jsx4("div", { className: "agent-playground-brand", children: _jsxs3("div", { className: "flex justify-between items-center", children: [_jsxs3("div", { className: "flex items-center gap-2", children: [_jsx4("span", { className: "agent-playground-mark", children: _jsx4(Sparkles, { size: 16 }) }), _jsxs3("div", { children: [_jsx4("h2", { children: "Agent \u8BD5\u9A8C\u53F0" }), _jsx4("small", { children: "Sandbox playground" })] })] }), _jsx4("span", { className: cn("agent-playground-connection", connected && "is-online"), title: connected ? "Sandbox WebSocket \u5DF2\u8FDE\u63A5" : "\u6B63\u5728\u91CD\u8FDE Sandbox WebSocket", children: connected ? _jsx4(Wifi, { size: 12 }) : _jsx4(WifiOff, { size: 12 }) })] }) }), _jsxs3("div", { className: "agent-playground-section-label", children: [_jsx4("span", { children: "\u6D4B\u8BD5\u4F1A\u8BDD" }), _jsx4("span", { children: channels.length })] }), _jsx4("div", { className: "agent-playground-session-list", children: channels.map((channel) => {
    const isActive = activeChannel.id === channel.id && activeChannel.type === channel.type;
    return _jsxs3("button", { type: "button", "aria-current": isActive ? "page" : void 0, className: cn("agent-playground-session", isActive && "active"), onClick: () => switchChannel(channel), children: [_jsx4("span", { className: "agent-playground-session-icon", children: getChannelIcon(channel.type) }), _jsxs3("div", { className: "flex-1 min-w-0", children: [_jsx4("div", { className: "text-sm font-medium truncate", children: channel.name }), _jsx4("div", { className: "text-xs text-muted-foreground", children: channel.type === "private" ? "\u5355\u7528\u6237\u4F5C\u7528\u57DF" : channel.type === "group" ? "\u7FA4\u7EC4\u4F5C\u7528\u57DF" : "\u9891\u9053\u4F5C\u7528\u57DF" })] }), channel.unread > 0 && _jsx4("span", { className: "inline-flex items-center justify-center h-5 min-w-5 rounded-full bg-destructive text-destructive-foreground text-[10px] font-medium px-1", children: channel.unread })] }, `${channel.type}:${channel.id}`);
  }) }), _jsx4("div", { className: "agent-playground-new-session", children: showNewSession ? _jsxs3("div", { className: "agent-playground-new-form", children: [_jsx4("input", { value: newSessionName, onChange: (event) => setNewSessionName(event.target.value), onKeyDown: (event) => {
    if (event.key === "Enter")
      addSession();
  }, placeholder: "\u4F1A\u8BDD\u540D\u79F0", autoFocus: true }), _jsx4("div", { className: "agent-playground-scope-picker", role: "group", "aria-label": "\u6D88\u606F\u4F5C\u7528\u57DF", children: ["private", "group", "channel"].map((scope) => _jsx4("button", { type: "button", "aria-pressed": newSessionScope === scope, className: cn(newSessionScope === scope && "active"), onClick: () => setNewSessionScope(scope), children: scope === "private" ? "\u5355\u7528\u6237" : scope === "group" ? "\u7FA4\u7EC4" : "\u9891\u9053" }, scope)) }), _jsxs3("div", { className: "agent-playground-new-actions", children: [_jsx4("button", { type: "button", onClick: () => setShowNewSession(false), children: "\u53D6\u6D88" }), _jsx4("button", { type: "button", className: "primary", onClick: addSession, children: "\u521B\u5EFA" })] })] }) : _jsxs3("button", { type: "button", className: "agent-playground-add", onClick: () => setShowNewSession(true), children: [_jsx4(Plus, { size: 15 }), "\u65B0\u5EFA\u6D4B\u8BD5\u4F1A\u8BDD"] }) }), _jsxs3("div", { className: "agent-playground-endpoint", children: [_jsx4("span", { children: persistenceStatus === "saved" ? "\u4F1A\u8BDD\u5DF2\u6301\u4E45\u5316" : "\u4F1A\u8BDD\u4FDD\u5B58\u5931\u8D25" }), _jsx4("strong", { children: endpointId })] })] }), showChannelList && _jsx4("div", { className: "channel-overlay", onClick: () => setShowChannelList(false) }), _jsxs3("main", { className: "chat-area agent-playground-main", children: [_jsxs3("header", { className: "agent-playground-runbar", children: [_jsxs3("div", { className: "agent-playground-run-identity", children: [_jsx4("span", { className: "agent-playground-run-icon", children: getChannelIcon(activeChannel.type) }), _jsxs3("div", { children: [_jsxs3("div", { className: "agent-playground-run-title", children: [_jsx4("h1", { children: activeChannel.name }), _jsx4("span", { children: scopeLabel })] }), _jsx4("code", { children: sessionKey })] })] }), _jsxs3("div", { className: "agent-playground-run-actions", children: [_jsxs3("span", { className: cn("agent-playground-run-state", currentTask?.status === "running" && "is-running", currentTask?.status === "failed" && "has-problem"), children: [currentTask?.status === "running" ? _jsx4(Activity, { size: 14 }) : _jsx4(Gauge, { size: 14 }), currentTask ? taskStatusLabel(currentTask.status) : `${channelMessages.length} \u6761\u6D88\u606F`] }), currentTask?.status === "running" ? _jsxs3("button", { type: "button", className: "agent-playground-stop", onClick: () => void stopActiveTask(), disabled: stoppingTask, "aria-label": "\u505C\u6B62\u5F53\u524D\u4EFB\u52A1", children: [_jsx4(Square, { size: 13 }), stoppingTask ? "\u505C\u6B62\u4E2D" : "\u505C\u6B62"] }) : lastUserMessage ? _jsxs3("button", { type: "button", onClick: retryLastTask, "aria-label": "\u91CD\u65B0\u8FD0\u884C\u4E0A\u4E00\u4E2A\u4EFB\u52A1", children: [_jsx4(RotateCcw, { size: 14 }), "\u91CD\u8BD5"] }) : null, _jsxs3("a", { href: agentStudioPath(sessionKey), children: [_jsx4(ExternalLink, { size: 14 }), "Agent Studio"] }), _jsx4("button", { type: "button", className: cn(showRunSettings && "active"), "aria-expanded": showRunSettings, onClick: () => setShowRunSettings((visible) => !visible), "aria-label": "\u914D\u7F6E\u8FD0\u884C\u73AF\u5883", children: _jsx4(SlidersHorizontal, { size: 16 }) }), _jsx4("button", { type: "button", "aria-expanded": showInspector, onClick: () => setShowInspector(!showInspector), "aria-label": "\u5207\u6362\u8FD0\u884C\u68C0\u67E5\u5668", children: _jsx4(PanelRight, { size: 16 }) }), _jsx4("button", { type: "button", onClick: () => setConfirmClear(true), "aria-label": "\u6E05\u7A7A\u5F53\u524D\u4F1A\u8BDD", children: _jsx4(Trash2, { size: 15 }) })] })] }), confirmClear && _jsxs3("div", { className: "agent-playground-confirm", role: "alert", children: [_jsxs3("div", { children: [_jsx4("strong", { children: "\u6E05\u7A7A\u5F53\u524D\u6D4B\u8BD5\u8BB0\u5F55\uFF1F" }), _jsxs3("span", { children: ["\u53EA\u79FB\u9664\u201C", activeChannel.name, "\u201D\u5728\u6D4F\u89C8\u5668\u4E2D\u7684\u6D88\u606F\uFF0C\u4E0D\u5F71\u54CD Agent \u4F1A\u8BDD\u5B58\u50A8\u3002"] })] }), _jsx4("button", { type: "button", onClick: () => setConfirmClear(false), children: "\u53D6\u6D88" }), _jsx4("button", { type: "button", className: "danger", onClick: clearMessages, children: "\u786E\u8BA4\u6E05\u7A7A" })] }), transportNotice && _jsxs3("div", { className: "agent-playground-confirm", role: "status", children: [_jsxs3("div", { children: [_jsx4("strong", { children: "\u8FD0\u884C\u6682\u4E0D\u53EF\u7528" }), _jsx4("span", { children: transportNotice })] }), _jsx4("button", { type: "button", onClick: () => setTransportNotice(null), children: "\u77E5\u9053\u4E86" })] }), showRunSettings && _jsxs3("section", { className: "agent-playground-run-settings", "aria-label": "\u8FD0\u884C\u914D\u7F6E", children: [_jsxs3("label", { className: "agent-playground-directory-field", children: [_jsxs3("span", { children: [_jsx4(FolderOpen, { size: 14 }), "\u5DE5\u4F5C\u76EE\u5F55"] }), _jsx4("input", { value: activeChannel.runConfig.workingDirectory, onChange: (event) => updateRunConfig({ workingDirectory: event.target.value }), placeholder: "\u4F7F\u7528 Host \u9879\u76EE\u76EE\u5F55", spellCheck: false })] }), _jsxs3("label", { children: [_jsxs3("span", { children: [_jsx4(ShieldCheck, { size: 14 }), "\u5B89\u5168\u7B56\u7565"] }), _jsxs3("select", { value: activeChannel.runConfig.safetyMode, onChange: (event) => {
    const safetyMode = event.target.value;
    updateRunConfig({ safetyMode, ...safetyMode === "danger-full-access" ? { networkAccess: true } : {} });
  }, children: [_jsx4("option", { value: "read-only", children: "\u53EA\u8BFB" }), _jsx4("option", { value: "workspace-write", children: "\u5DE5\u4F5C\u533A\u5199\u5165" }), _jsx4("option", { value: "danger-full-access", children: "\u5B8C\u5168\u8BBF\u95EE" })] })] }), _jsxs3("label", { children: [_jsx4("span", { children: "\u5BA1\u6279\u7B56\u7565" }), _jsxs3("select", { value: activeChannel.runConfig.safetyMode === "read-only" ? "deny" : activeChannel.runConfig.safetyMode === "danger-full-access" ? "allow" : activeChannel.runConfig.approvalMode, disabled: activeChannel.runConfig.safetyMode !== "workspace-write", onChange: (event) => updateRunConfig({ approvalMode: event.target.value }), children: [_jsx4("option", { value: "ask", children: "\u6309\u9700\u786E\u8BA4" }), _jsx4("option", { value: "deny", children: "\u81EA\u52A8\u62D2\u7EDD" }), _jsx4("option", { value: "allow", children: "\u81EA\u52A8\u5141\u8BB8" })] })] }), _jsxs3("label", { className: "agent-playground-network-toggle", children: [_jsxs3("span", { children: [_jsx4(Network, { size: 14 }), "\u7F51\u7EDC\u8BBF\u95EE"] }), _jsx4("input", { type: "checkbox", checked: activeChannel.runConfig.safetyMode === "danger-full-access" || activeChannel.runConfig.networkAccess, disabled: activeChannel.runConfig.safetyMode === "danger-full-access", onChange: (event) => updateRunConfig({ networkAccess: event.target.checked }) }), _jsx4("i", { "aria-hidden": "true" })] }), activeChannel.runConfig.safetyMode === "danger-full-access" && _jsxs3("p", { children: [_jsx4(CircleAlert, { size: 14 }), "\u5B8C\u5168\u8BBF\u95EE\u5141\u8BB8 Agent \u64CD\u4F5C\u5DE5\u4F5C\u76EE\u5F55\u4E4B\u5916\u7684\u6587\u4EF6\u5E76\u8BBF\u95EE\u7F51\u7EDC\uFF0C\u8BF7\u4EC5\u7528\u4E8E\u53EF\u4FE1\u4EFB\u52A1\u3002"] }), activeChannel.runConfig.safetyMode !== "danger-full-access" && shellIsolation?.available === false && _jsxs3("p", { children: [_jsx4(CircleAlert, { size: 14 }), "\u5B89\u5168 Shell \u9700\u8981\u53EF\u7528\u7684 Docker daemon\uFF1B\u5F53\u524D\u4EC5\u6587\u4EF6\u5DE5\u5177\u53EF\u8FD0\u884C\u3002", shellIsolation.message] })] }), _jsx4("section", { className: "agent-playground-conversation", "aria-label": "Agent \u5BF9\u8BDD", children: _jsx4("div", { className: "agent-playground-message-scroll", children: channelMessages.length === 0 ? _jsxs3("div", { className: "agent-playground-empty", children: [_jsx4("span", { className: "agent-playground-empty-mark", children: _jsx4(Sparkles, { size: 24 }) }), _jsxs3("div", { children: [_jsx4("h2", { children: "\u5F00\u59CB\u4E00\u6B21\u53EF\u89C2\u5BDF\u7684 Agent \u8FD0\u884C" }), _jsx4("p", { children: "\u53D1\u9001\u4EFB\u52A1\u540E\uFF0C\u56DE\u590D\u3001\u5DE5\u5177\u8C03\u7528\u3001Token \u4E0E\u5F02\u5E38\u4F1A\u5728\u540C\u4E00\u4F1A\u8BDD\u4E0A\u4E0B\u6587\u4E2D\u5173\u8054\u3002" })] }), _jsxs3("div", { className: "agent-playground-prompts", children: [_jsx4("button", { type: "button", onClick: () => runPrompt("\u4ECB\u7ECD\u5F53\u524D Agent \u53EF\u4EE5\u4F7F\u7528\u7684\u80FD\u529B\uFF0C\u5E76\u7ED9\u51FA\u4E09\u4E2A\u5177\u4F53\u793A\u4F8B\u3002"), children: "\u63A2\u7D22\u53EF\u7528\u80FD\u529B" }), _jsx4("button", { type: "button", onClick: () => runPrompt("\u7528 Markdown \u8868\u683C\u603B\u7ED3\u5F53\u524D\u8FD0\u884C\u73AF\u5883\uFF0C\u5E76\u9644\u4E0A\u4E00\u6BB5 TypeScript \u793A\u4F8B\u4EE3\u7801\u3002"), children: "\u6D4B\u8BD5\u5BCC\u6587\u672C\u8F93\u51FA" }), _jsx4("button", { type: "button", onClick: () => runPrompt("\u5206\u6790\u4E00\u4E2A\u4EFB\u52A1\u4ECE\u63A8\u7406\u3001\u5DE5\u5177\u8C03\u7528\u5230\u6700\u7EC8\u56DE\u590D\u7684\u5B8C\u6574\u6267\u884C\u8DEF\u5F84\u3002"), children: "\u89C2\u5BDF\u6267\u884C\u8DEF\u5F84" })] })] }) : _jsxs3("div", { className: "agent-playground-message-list", children: [channelMessages.map((msg) => {
    const isApproval = msg.type === "received" && msg.content.some((segment) => segment.type === "keyboard");
    return _jsxs3(React2.Fragment, { children: [_jsxs3("article", { className: cn("agent-playground-message", msg.type === "sent" ? "is-user" : "is-agent", isApproval && "is-approval"), children: [_jsx4("span", { className: "agent-playground-message-avatar", children: msg.type === "received" ? _jsx4(Bot, { size: 16 }) : _jsx4(User, { size: 16 }) }), _jsxs3("div", { className: "agent-playground-message-main", children: [_jsxs3("div", { className: "agent-playground-message-meta", children: [_jsx4("strong", { children: isApproval ? "\u9700\u8981\u4F60\u7684\u786E\u8BA4" : msg.type === "received" ? endpointId : "\u4F60" }), isApproval && _jsx4("span", { children: "approval required" }), _jsx4("time", { children: new Date(msg.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) })] }), _jsx4("div", { className: "agent-playground-message-content", children: renderMessageSegments(msg.content, msg.type === "sent", msg.id, msg.interactionResolved === true) })] })] }), currentTaskMessage?.id === msg.id && inlineRunCard] }, msg.id);
  }), !currentTaskMessage && inlineRunCard, _jsx4("div", { ref: messagesEndRef })] }) }) }), _jsxs3("section", { className: "agent-playground-composer", "aria-label": "\u4EFB\u52A1\u8F93\u5165", children: [_jsxs3("div", { className: "flex gap-2 items-center flex-wrap", children: [_jsx4("button", { type: "button", className: cn("h-8 w-8 rounded-md flex items-center justify-center border transition-colors", showFacePicker ? "bg-primary text-primary-foreground" : "hover:bg-accent"), onClick: () => {
    setShowFacePicker(!showFacePicker);
    setMediaPanel(null);
  }, title: "\u63D2\u5165\u8868\u60C5", children: _jsx4(Smile, { size: 16 }) }), _jsx4("button", { type: "button", className: cn("h-8 w-8 rounded-md flex items-center justify-center border transition-colors", mediaPanel === "image" ? "bg-primary text-primary-foreground" : "hover:bg-accent"), onClick: () => {
    setMediaPanel((p) => p === "image" ? null : "image");
    setShowFacePicker(false);
  }, title: "\u63D2\u5165\u56FE\u7247 URL", children: _jsx4(Image, { size: 16 }) }), _jsx4("button", { type: "button", className: cn("h-8 w-8 rounded-md flex items-center justify-center border transition-colors", mediaPanel === "video" ? "bg-primary text-primary-foreground" : "hover:bg-accent"), onClick: () => {
    setMediaPanel((p) => p === "video" ? null : "video");
    setShowFacePicker(false);
  }, title: "\u63D2\u5165\u89C6\u9891 URL", children: _jsx4(Video, { size: 16 }) }), _jsx4("button", { type: "button", className: cn("h-8 w-8 rounded-md flex items-center justify-center border transition-colors", mediaPanel === "audio" ? "bg-primary text-primary-foreground" : "hover:bg-accent"), onClick: () => {
    setMediaPanel((p) => p === "audio" ? null : "audio");
    setShowFacePicker(false);
  }, title: "\u63D2\u5165\u97F3\u9891 URL", children: _jsx4(Music, { size: 16 }) }), _jsx4("div", { className: "flex-1 min-w-[1rem]" }), _jsxs3("div", { className: "sandbox-composer-tabs", role: "tablist", "aria-label": "\u6D88\u606F\u7F16\u8F91\u6A21\u5F0F", children: [_jsx4("button", { type: "button", role: "tab", "aria-selected": composerMode === "write", className: cn(composerMode === "write" && "active"), onClick: () => setComposerMode("write"), children: "\u7F16\u5199" }), _jsx4("button", { type: "button", role: "tab", "aria-selected": composerMode === "preview", className: cn(composerMode === "preview" && "active"), onClick: () => setComposerMode("preview"), children: "\u9884\u89C8" })] }), inputText && _jsx4("button", { className: "h-8 w-8 rounded-md flex items-center justify-center hover:bg-accent transition-colors", onClick: () => {
    editorRef.current?.clear();
    setInputText("");
    setPreviewSegments([]);
    setComposerMode("write");
  }, "aria-label": "\u6E05\u7A7A\u8F93\u5165", children: _jsx4(X, { size: 16 }) })] }), showFacePicker && _jsxs3("div", { className: "p-3 rounded-md border bg-muted/30 max-h-64 overflow-y-auto space-y-2", children: [_jsx4("input", { value: faceSearchQuery, onChange: (e) => setFaceSearchQuery(e.target.value), placeholder: "\u641C\u7D22\u8868\u60C5...", className: "w-full h-8 rounded-md border bg-transparent px-2 text-sm" }), _jsx4("div", { className: "grid grid-cols-8 gap-1", children: filteredFaces.slice(0, 80).map((face) => _jsx4("button", { onClick: () => insertFace(face.id), title: face.name, className: "w-10 h-10 rounded-md border flex items-center justify-center hover:bg-accent transition-colors", children: _jsx4("img", { src: `https://face.viki.moe/apng/${face.id}.png`, alt: face.name, className: "w-8 h-8" }) }, face.id)) }), filteredFaces.length === 0 && _jsxs3("div", { className: "flex flex-col items-center gap-2 py-4", children: [_jsx4(Search, { size: 32, className: "text-muted-foreground/30" }), _jsx4("span", { className: "text-sm text-muted-foreground", children: "\u672A\u627E\u5230\u5339\u914D\u7684\u8868\u60C5" })] })] }), mediaPanel && _jsxs3("div", { className: "p-3 rounded-md border bg-muted/30 space-y-2", children: [_jsxs3("p", { className: "text-xs text-muted-foreground", children: [mediaPanel === "image" && "\u652F\u6301 http(s) \u56FE\u7247\u94FE\u63A5\u6216 data URL", mediaPanel === "video" && "\u652F\u6301\u6D4F\u89C8\u5668\u53EF\u89E3\u7801\u7684\u89C6\u9891\u76F4\u94FE\uFF08\u5982 .mp4\u3001.webm\uFF09", mediaPanel === "audio" && "\u652F\u6301 .mp3\u3001.ogg\u3001.wav \u7B49\u97F3\u9891\u76F4\u94FE"] }), _jsx4("input", { value: mediaUrl, onChange: (e) => setMediaUrl(e.target.value), placeholder: mediaPanel === "image" ? "\u56FE\u7247 URL\u2026" : mediaPanel === "video" ? "\u89C6\u9891 URL\u2026" : "\u97F3\u9891 URL\u2026", className: "w-full h-8 rounded-md border border-input bg-background px-2 text-sm", onKeyDown: (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      commitMediaUrl();
    }
  } }), _jsxs3("button", { type: "button", className: "inline-flex items-center gap-1 h-8 px-3 rounded-md bg-primary text-primary-foreground text-sm disabled:opacity-50", onClick: commitMediaUrl, disabled: !mediaUrl.trim(), children: [_jsx4(Check, { size: 14 }), " \u63D2\u5165\u5230\u8F93\u5165\u6846"] })] }), _jsxs3("div", { className: "flex gap-2 items-start", children: [_jsxs3("div", { className: "flex-1 relative", children: [_jsx4("div", { className: composerMode === "write" ? "block" : "hidden", children: _jsx4(RichTextEditor_default, { ref: editorRef, placeholder: `\u5411 ${activeChannel.name} \u53D1\u9001\u6D88\u606F\uFF0C\u652F\u6301 Markdown...`, onSend: handleSendMessage, onChange: handleEditorChange, onAtTrigger: handleAtTrigger, minHeight: "44px", maxHeight: "200px" }) }), composerMode === "preview" && _jsx4("div", { className: "sandbox-markdown-preview", role: "tabpanel", children: inputText.trim() ? _jsx4(MarkdownContent, { text: inputText }) : _jsx4("span", { className: "sandbox-markdown-preview-empty", children: "\u8F93\u5165 Markdown \u540E\u53EF\u5728\u8FD9\u91CC\u68C0\u67E5\u6700\u7EC8\u6548\u679C" }) }), atPopoverPosition && _jsx4("div", { className: "absolute z-50 rounded-lg border bg-popover shadow-md min-w-60 max-h-72 overflow-y-auto p-1", style: { top: `${atPopoverPosition.top}px`, left: `${atPopoverPosition.left}px` }, children: filteredAtSuggestions.length > 0 ? filteredAtSuggestions.map((user) => _jsxs3("div", { className: "flex items-center gap-2 p-2 rounded-md cursor-pointer hover:bg-accent transition-colors", onClick: () => selectAtUser(user), children: [_jsx4(User, { size: 16, className: "text-muted-foreground" }), _jsxs3("div", { className: "flex-1", children: [_jsx4("div", { className: "text-sm font-medium", children: user.name }), _jsxs3("div", { className: "text-xs text-muted-foreground", children: ["ID: ", user.id] })] })] }, user.id)) : _jsxs3("div", { className: "flex flex-col items-center gap-2 p-4", children: [_jsx4(Search, { size: 20, className: "text-muted-foreground/50" }), _jsx4("span", { className: "text-xs text-muted-foreground", children: "\u672A\u627E\u5230\u5339\u914D\u7684\u7528\u6237" })] }) })] }), _jsxs3("button", { className: "inline-flex items-center gap-1.5 h-10 px-4 rounded-md bg-primary text-primary-foreground text-sm font-medium disabled:opacity-50 transition-colors hover:bg-primary/90", onClick: () => {
    const c = editorRef.current?.getContent();
    if (c)
      handleSendMessage(c.text, c.segments);
  }, disabled: !canExecute || !hasRenderableSegments(previewSegments), children: [_jsx4(Send, { size: 16 }), " \u53D1\u9001"] })] }), _jsxs3("div", { className: "flex items-center gap-2 flex-wrap text-xs text-muted-foreground", children: [_jsx4(Info, { size: 12 }), " \u5FEB\u6377\u64CD\u4F5C:", _jsx4("span", { className: "px-1 py-0.5 rounded border text-[10px]", children: "Enter" }), " \u53D1\u9001", _jsx4("span", { className: "px-1 py-0.5 rounded border text-[10px]", children: "Shift+Enter" }), " \u6362\u884C", _jsx4("span", { className: "px-1 py-0.5 rounded border text-[10px]", children: "```ts" }), " \u4EE3\u7801\u5757", _jsx4("span", { className: "px-1 py-0.5 rounded border text-[10px]", children: "**\u6587\u672C**" }), " \u52A0\u7C97", _jsx4("span", { className: "px-1 py-0.5 rounded border text-[10px]", children: "[@\u540D\u79F0]" }), " @\u67D0\u4EBA", _jsx4("span", { className: "px-1 py-0.5 rounded border text-[10px]", children: "[video:URL]" }), _jsx4("span", { className: "px-1 py-0.5 rounded border text-[10px]", children: "[audio:URL]" })] })] })] }), _jsxs3("aside", { className: cn("agent-playground-inspector", showInspector && "show"), "aria-label": "\u8FD0\u884C\u68C0\u67E5\u5668", children: [_jsxs3("div", { className: "agent-playground-inspector-head", children: [_jsxs3("div", { children: [_jsx4("span", { children: "Run inspector" }), _jsx4("h2", { children: "\u8FD0\u884C\u68C0\u67E5\u5668" })] }), _jsxs3("div", { children: [_jsx4("button", { type: "button", onClick: () => void loadTrace(), "aria-label": "\u5237\u65B0 Agent Trace", disabled: traceLoading, children: _jsx4(RefreshCw, { size: 15, className: cn(traceLoading && "animate-spin") }) }), _jsx4("button", { type: "button", className: "agent-playground-inspector-close", onClick: () => setShowInspector(false), "aria-label": "\u5173\u95ED\u8FD0\u884C\u68C0\u67E5\u5668", children: _jsx4(X, { size: 15 }) })] })] }), _jsxs3("div", { className: "agent-playground-inspector-tabs", role: "tablist", "aria-label": "\u68C0\u67E5\u5668\u89C6\u56FE", children: [_jsxs3("button", { type: "button", role: "tab", "aria-selected": inspectorView === "runs", className: cn(inspectorView === "runs" && "active"), onClick: () => setInspectorView("runs"), children: [_jsx4(Activity, { size: 13 }), "\u4EFB\u52A1"] }), _jsxs3("button", { type: "button", role: "tab", "aria-selected": inspectorView === "artifacts", className: cn(inspectorView === "artifacts" && "active"), onClick: () => setInspectorView("artifacts"), children: [_jsx4(FileDiff, { size: 13 }), "\u53D8\u66F4\u4E0E\u4EA7\u7269 ", _jsx4("span", { children: workbenchArtifacts.length })] })] }), _jsxs3("div", { className: cn("agent-playground-inspector-view", inspectorView !== "runs" && "hidden"), children: [_jsxs3("section", { className: "agent-playground-inspector-section", children: [_jsxs3("div", { className: "agent-playground-inspector-title", children: [_jsx4("span", { children: "\u8FD0\u884C\u6982\u89C8" }), _jsx4("small", { children: traceSummary.activeTurns > 0 ? "live" : "idle" })] }), _jsxs3("div", { className: "agent-playground-metrics", children: [_jsxs3("div", { children: [_jsx4(Activity, {}), _jsx4("strong", { children: traceSummary.eventCount.toLocaleString() }), _jsx4("span", { children: "\u4E8B\u4EF6" })] }), _jsxs3("div", { children: [_jsx4(Wrench, {}), _jsx4("strong", { children: traceSummary.toolCount.toLocaleString() }), _jsx4("span", { children: "\u5DE5\u5177" })] }), _jsxs3("div", { children: [_jsx4(Coins, {}), _jsx4("strong", { children: traceSummary.tokenCount.toLocaleString() }), _jsx4("span", { children: "Token" })] }), _jsxs3("div", { className: cn(traceSummary.problemCount > 0 && "has-problem"), children: [_jsx4(CircleAlert, {}), _jsx4("strong", { children: traceSummary.problemCount }), _jsx4("span", { children: "\u5F02\u5E38" })] })] })] }), _jsxs3("section", { className: "agent-playground-inspector-section", children: [_jsx4("div", { className: "agent-playground-inspector-title", children: _jsx4("span", { children: "\u4E0A\u4E0B\u6587" }) }), _jsxs3("dl", { className: "agent-playground-context-list", children: [_jsxs3("div", { children: [_jsx4("dt", { children: "Endpoint" }), _jsx4("dd", { children: endpointId })] }), _jsxs3("div", { children: [_jsx4("dt", { children: "Scope" }), _jsx4("dd", { children: activeChannel.type })] }), _jsxs3("div", { children: [_jsx4("dt", { children: "Scene" }), _jsx4("dd", { children: activeChannel.id })] }), _jsxs3("div", { children: [_jsx4("dt", { children: "Workdir" }), _jsx4("dd", { title: activeChannel.runConfig.workingDirectory, children: activeChannel.runConfig.workingDirectory || "Host project root" })] }), _jsxs3("div", { children: [_jsx4("dt", { children: "Security" }), _jsx4("dd", { children: activeChannel.runConfig.safetyMode })] }), _jsxs3("div", { children: [_jsx4("dt", { children: "Approval" }), _jsx4("dd", { children: activeChannel.runConfig.safetyMode === "read-only" ? "deny" : activeChannel.runConfig.safetyMode === "danger-full-access" ? "allow" : activeChannel.runConfig.approvalMode })] }), _jsxs3("div", { children: [_jsx4("dt", { children: "Network" }), _jsx4("dd", { children: activeChannel.runConfig.networkAccess ? "enabled" : "disabled" })] }), _jsxs3("div", { children: [_jsx4("dt", { children: "Isolation" }), _jsx4("dd", { className: cn(shellIsolation?.available && "is-online"), children: shellIsolation ? `${shellIsolation.provider}: ${shellIsolation.available ? "ready" : "unavailable"}` : "checking" })] }), _jsxs3("div", { children: [_jsx4("dt", { children: "Transport" }), _jsx4("dd", { className: cn(connected && "is-online"), children: connected ? "WebSocket online" : "reconnecting" })] })] })] }), _jsxs3("section", { className: "agent-playground-inspector-section agent-playground-task-section", children: [_jsxs3("div", { className: "agent-playground-inspector-title", children: [_jsx4("span", { children: "\u4EFB\u52A1\u5386\u53F2" }), _jsxs3("small", { children: [taskRuns.length, " runs"] })] }), taskRuns.length > 0 ? _jsx4("div", { className: "agent-playground-task-list", children: taskRuns.slice(0, 8).map((run) => _jsxs3("article", { className: cn(`is-${run.status}`), children: [_jsx4("i", {}), _jsxs3("div", { children: [_jsx4("strong", { children: taskStatusLabel(run.status) }), _jsx4("code", { children: run.turnId.slice(0, 10) })] }), _jsxs3("dl", { children: [_jsxs3("div", { children: [_jsx4("dt", { children: "\u8017\u65F6" }), _jsx4("dd", { children: run.durationMs === void 0 ? "\u8FDB\u884C\u4E2D" : `${run.durationMs.toLocaleString()} ms` })] }), _jsxs3("div", { children: [_jsx4("dt", { children: "\u5DE5\u5177" }), _jsx4("dd", { children: run.toolCount })] }), _jsxs3("div", { children: [_jsx4("dt", { children: "Token" }), _jsx4("dd", { children: run.tokenCount.toLocaleString() })] })] })] }, run.id)) }) : _jsxs3("div", { className: "agent-playground-artifact-empty", children: [_jsx4(Activity, { size: 18 }), _jsx4("span", { children: "\u8FD0\u884C\u4EFB\u52A1\u540E\u4F1A\u5728\u8FD9\u91CC\u5F62\u6210\u53EF\u56DE\u6EAF\u8BB0\u5F55" })] })] }), _jsxs3("section", { className: "agent-playground-inspector-section agent-playground-trace-section", children: [_jsxs3("div", { className: "agent-playground-inspector-title", children: [_jsx4("span", { children: "\u6700\u8FD1\u6267\u884C" }), _jsx4("small", { children: "2s sync" })] }), traceLoading && !trace ? _jsxs3("div", { className: "agent-playground-trace-loading", children: [_jsx4("i", {}), _jsx4("i", {}), _jsx4("i", {})] }) : traceNotice && !trace?.events.length ? _jsxs3("div", { className: "agent-playground-trace-notice", children: [_jsx4(CircleAlert, { size: 16 }), _jsx4("span", { children: traceNotice })] }) : recentTraceEvents.length ? _jsx4("div", { className: "agent-playground-trace-list", children: recentTraceEvents.map((event) => {
    const item = presentTraceEvent(event);
    return _jsxs3("div", { className: cn("agent-playground-trace-item", `is-${item.tone}`), children: [_jsx4("span", { className: "agent-playground-trace-dot" }), _jsxs3("div", { children: [_jsx4("strong", { children: item.title }), item.detail ? _jsx4("small", { children: item.detail }) : null] }), _jsx4("time", { children: new Date(event.recordedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }) })] }, event.sequence);
  }) }) : _jsxs3("div", { className: "agent-playground-trace-empty", children: [_jsx4(Activity, { size: 18 }), _jsx4("span", { children: "\u53D1\u9001\u4EFB\u52A1\u540E\u663E\u793A\u63A8\u7406\u4E0E\u5DE5\u5177\u8F68\u8FF9" })] })] })] }), _jsx4("div", { className: cn("agent-playground-inspector-view", inspectorView !== "artifacts" && "hidden"), children: _jsxs3("section", { className: "agent-playground-inspector-section agent-playground-artifact-section", children: [_jsxs3("div", { className: "agent-playground-inspector-title", children: [_jsx4("span", { children: "\u6587\u4EF6\u4E0E\u547D\u4EE4\u4EA7\u7269" }), _jsxs3("small", { children: [workbenchArtifacts.length, " items"] })] }), workbenchArtifacts.length > 0 ? _jsx4("div", { className: "agent-playground-artifact-list", children: workbenchArtifacts.map((artifact) => {
    const ArtifactIcon = artifact.kind === "file-change" ? FileDiff : artifact.kind === "test" ? FlaskConical : Terminal;
    const expanded = expandedArtifact === artifact.id;
    return _jsxs3("article", { className: cn(`is-${artifact.status}`, expanded && "is-expanded"), children: [_jsxs3("button", { type: "button", onClick: () => setExpandedArtifact(expanded ? null : artifact.id), "aria-expanded": expanded, children: [_jsx4("span", { className: "agent-playground-artifact-icon", children: _jsx4(ArtifactIcon, { size: 14 }) }), _jsxs3("span", { children: [_jsx4("strong", { children: artifact.title }), _jsx4("small", { children: artifact.path ?? artifact.detail ?? artifact.kind })] }), _jsx4("em", { children: artifact.status }), _jsx4(ChevronDown, { size: 14 })] }), expanded && _jsxs3("div", { className: "agent-playground-artifact-detail", children: [artifact.path && _jsx4("code", { children: artifact.path }), artifact.diff ? _jsx4("pre", { children: artifact.diff }) : _jsx4("pre", { children: artifact.detail || "\u6682\u65E0\u8F93\u51FA" }), _jsxs3("footer", { children: [_jsx4("span", { children: artifact.durationMs === void 0 ? "\u7B49\u5F85\u7ED3\u679C" : `${artifact.durationMs.toLocaleString()} ms` }), _jsx4("code", { children: artifact.turnId.slice(0, 12) })] })] })] }, artifact.id);
  }) }) : _jsxs3("div", { className: "agent-playground-artifact-empty", children: [_jsx4(FileDiff, { size: 18 }), _jsx4("span", { children: "Agent \u4FEE\u6539\u6587\u4EF6\u3001\u6267\u884C\u547D\u4EE4\u6216\u6D4B\u8BD5\u540E\uFF0C\u4EA7\u7269\u4F1A\u96C6\u4E2D\u51FA\u73B0\u5728\u8FD9\u91CC" })] })] }) }), _jsxs3("a", { className: "agent-playground-studio-link", href: agentStudioPath(sessionKey), children: [_jsxs3("span", { children: [_jsx4(ExternalLink, { size: 15 }), "\u5728 Agent Studio \u4E2D\u5B8C\u6574\u8BCA\u65AD"] }), _jsx4("code", { children: sessionKey })] })] }), showInspector && _jsx4("div", { className: "agent-playground-inspector-overlay", onClick: () => setShowInspector(false) })] });
}
function taskStatusLabel(status) {
  if (status === "running")
    return "Agent \u8FD0\u884C\u4E2D";
  if (status === "completed")
    return "\u6700\u8FD1\u4EFB\u52A1\u5DF2\u5B8C\u6210";
  if (status === "failed")
    return "\u6700\u8FD1\u4EFB\u52A1\u5931\u8D25";
  return "\u6700\u8FD1\u4EFB\u52A1\u5DF2\u53D6\u6D88";
}
function messageText(segments) {
  return segments.map((segment) => {
    const data = segment.data;
    if (segment.type === "text" || segment.type === "markdown" || segment.type === "md") {
      return String(data.text ?? data.content ?? "");
    }
    if (segment.type === "mention" || segment.type === "at")
      return `@${String(data.name ?? data.target ?? "")}`;
    return `[${segment.type}]`;
  }).join(" ").trim();
}
function formatDuration(durationMs) {
  if (durationMs < 1e3)
    return `${durationMs.toLocaleString()} ms`;
  if (durationMs < 6e4)
    return `${(durationMs / 1e3).toFixed(durationMs < 1e4 ? 1 : 0)} s`;
  return `${Math.floor(durationMs / 6e4)}m ${Math.round(durationMs % 6e4 / 1e3)}s`;
}
function runStepStatusLabel(status) {
  if (status === "running")
    return "\u8FDB\u884C\u4E2D";
  if (status === "completed")
    return "\u5B8C\u6210";
  if (status === "denied")
    return "\u5DF2\u62D2\u7EDD";
  if (status === "cancelled")
    return "\u5DF2\u53D6\u6D88";
  return "\u5931\u8D25";
}
function safeFileName(value) {
  return value.trim().replace(/[^\p{L}\p{N}._-]+/gu, "-").replace(/^-+|-+$/gu, "").slice(0, 48) || "session";
}

// node_modules/.pnpm/@zhin.js+adapter-sandbox@1.1.0_@ai-sdk+openai@4.0.69_zod@4.6.5__@zhin.js+adapter@1.1.12_@zhin_afugtif7f4xa45ozkajeyq4koy/node_modules/@zhin.js/adapter-sandbox/pages/index.tsx
import { jsx } from "/esm/react~jsx-runtime.mjs?v=mu5z5rv8";
var meta = definePage({
  title: "Agent \u8BD5\u9A8C\u53F0",
  icon: "Box",
  order: 10
});
function SandboxPage() {
  return /* @__PURE__ */ jsx(Sandbox, {});
}

// node_modules/.pnpm/@zhin.js+adapter-sandbox@1.1.0_@ai-sdk+openai@4.0.69_zod@4.6.5__@zhin.js+adapter@1.1.12_@zhin_afugtif7f4xa45ozkajeyq4koy/node_modules/@zhin.js/adapter-sandbox/pages/index.register.tsx
var meta2 = meta;
function register(api) {
  const Component = SandboxPage?.default ?? SandboxPage;
  if (typeof Component !== "function" && (typeof Component !== "object" || Component == null)) {
    throw new Error("Page module default export is not a React component");
  }
  const m = meta && typeof meta === "object" ? meta : {};
  const route = "/sandbox";
  const name = typeof m.title === "string" && m.title ? m.title : "Agent \u8BD5\u9A8C\u53F0";
  const icon = m.icon ?? "Box";
  const element = api.React.createElement(Component);
  api.addRoute({
    path: route,
    name,
    element,
    ...icon != null ? { icon } : {},
    meta: { hideInMenu: m.hideInNav === true || false }
  });
  if (typeof api.addTool === "function") {
    api.addTool({
      id: "index",
      name,
      path: route,
      ...icon != null ? { icon } : {}
    });
  }
}
export {
  SandboxPage as default,
  meta2 as meta,
  register
};
/*! Bundled license information:

lucide-react/dist/esm/shared/src/utils.js:
lucide-react/dist/esm/defaultAttributes.js:
lucide-react/dist/esm/Icon.js:
lucide-react/dist/esm/createLucideIcon.js:
lucide-react/dist/esm/icons/activity.js:
lucide-react/dist/esm/icons/bot.js:
lucide-react/dist/esm/icons/check.js:
lucide-react/dist/esm/icons/chevron-down.js:
lucide-react/dist/esm/icons/circle-alert.js:
lucide-react/dist/esm/icons/coins.js:
lucide-react/dist/esm/icons/external-link.js:
lucide-react/dist/esm/icons/file-diff.js:
lucide-react/dist/esm/icons/file-down.js:
lucide-react/dist/esm/icons/flask-conical.js:
lucide-react/dist/esm/icons/folder-open.js:
lucide-react/dist/esm/icons/gauge.js:
lucide-react/dist/esm/icons/hash.js:
lucide-react/dist/esm/icons/image.js:
lucide-react/dist/esm/icons/info.js:
lucide-react/dist/esm/icons/list-checks.js:
lucide-react/dist/esm/icons/message-square.js:
lucide-react/dist/esm/icons/music.js:
lucide-react/dist/esm/icons/network.js:
lucide-react/dist/esm/icons/panel-right.js:
lucide-react/dist/esm/icons/plus.js:
lucide-react/dist/esm/icons/refresh-cw.js:
lucide-react/dist/esm/icons/rotate-ccw.js:
lucide-react/dist/esm/icons/search.js:
lucide-react/dist/esm/icons/send.js:
lucide-react/dist/esm/icons/shield-check.js:
lucide-react/dist/esm/icons/sliders-horizontal.js:
lucide-react/dist/esm/icons/smile.js:
lucide-react/dist/esm/icons/sparkles.js:
lucide-react/dist/esm/icons/square.js:
lucide-react/dist/esm/icons/terminal.js:
lucide-react/dist/esm/icons/trash-2.js:
lucide-react/dist/esm/icons/user.js:
lucide-react/dist/esm/icons/users.js:
lucide-react/dist/esm/icons/video.js:
lucide-react/dist/esm/icons/wifi-off.js:
lucide-react/dist/esm/icons/wifi.js:
lucide-react/dist/esm/icons/wrench.js:
lucide-react/dist/esm/icons/x.js:
lucide-react/dist/esm/lucide-react.js:
  (**
   * @license lucide-react v0.525.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)
*/
