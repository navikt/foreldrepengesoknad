const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./DocsRenderer-CFRXHY34-BvQ1ESCo.js","./iframe-BDwcOlm9.js","./index-CTjT7uj6.js","./jsx-runtime-Cw0GR0a5.js","./index-vZN_Bsf0.js","./index-B-hWQ5ss.js","./index-DrFu-skq.js","./react-18-BWpgF8Jy.js"])))=>i.map(i=>d[i]);
import{_ as a}from"./iframe-BDwcOlm9.js";import"../sb-preview/runtime.js";const{global:s}=__STORYBOOK_MODULE_GLOBAL__;var _=Object.entries(s.TAGS_OPTIONS??{}).reduce((e,r)=>{let[t,o]=r;return o.excludeFromDocsStories&&(e[t]=!0),e},{}),n={docs:{renderer:async()=>{let{DocsRenderer:e}=await a(()=>import("./DocsRenderer-CFRXHY34-BvQ1ESCo.js").then(r=>r.ak),__vite__mapDeps([0,1,2,3,4,5,6,7]),import.meta.url);return new e},stories:{filter:e=>{var r;return(e.tags||[]).filter(t=>_[t]).length===0&&!((r=e.parameters.docs)!=null&&r.disable)}}}};export{n as parameters};
