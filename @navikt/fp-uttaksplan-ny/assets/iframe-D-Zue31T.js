const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./KvoteOppsummering.stories-DUcagD5W.js","./PeriodeListeItem-QRbWuYaP.js","./jsx-runtime-CmIOflP4.js","./index-KqYmeiyw.js","./index-Bs2cnqHB.js","./PeriodeListeItem-6i8Ycy2A.css","./PeriodeListe-CrAe6JFP.js","./KvoteOppsummering-Cg0SoA0g.css","./index-DFQxjcRn.css","./PeriodeListeItem.stories-Dx3ouW4n.js","./UttakArbeidType-QEIA8E0B.js","./PeriodeListe.stories-gD3eRgfd.js","./entry-preview-BfNTY7Tl.js","./chunk-XP5HYGXS-DH4vAeCa.js","./index-DVFv-Saw.js","./entry-preview-docs-y_N6C_D_.js","./index-s7aX1bj2.js","./preview-B3PTUHS7.js","./index-Cu4lwwaE.js","./preview-iUmqt_lp.js","./index-ogSvIofg.js","./preview-DY_pW_WS.js","./preview-DtV2DPU8.js","./createIntl-CF23BN00.js","./preview-C1PrH5ml.js"])))=>i.map(i=>d[i]);
import"../sb-preview/runtime.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))l(t);new MutationObserver(t=>{for(const n of t)if(n.type==="childList")for(const i of n.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&l(i)}).observe(document,{childList:!0,subtree:!0});function u(t){const n={};return t.integrity&&(n.integrity=t.integrity),t.referrerPolicy&&(n.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?n.credentials="include":t.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function l(t){if(t.ep)return;t.ep=!0;const n=u(t);fetch(t.href,n)}})();const R="modulepreload",L=function(e,o){return new URL(e,o).href},O={},r=function(o,u,l){let t=Promise.resolve();if(u&&u.length>0){const i=document.getElementsByTagName("link"),_=document.querySelector("meta[property=csp-nonce]"),E=(_==null?void 0:_.nonce)||(_==null?void 0:_.getAttribute("nonce"));t=Promise.allSettled(u.map(s=>{if(s=L(s,l),s in O)return;O[s]=!0;const d=s.endsWith(".css"),p=d?'[rel="stylesheet"]':"";if(!!l)for(let m=i.length-1;m>=0;m--){const a=i[m];if(a.href===s&&(!d||a.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${s}"]${p}`))return;const c=document.createElement("link");if(c.rel=d?"stylesheet":R,d||(c.as="script"),c.crossOrigin="",c.href=s,E&&c.setAttribute("nonce",E),document.head.appendChild(c),d)return new Promise((m,a)=>{c.addEventListener("load",m),c.addEventListener("error",()=>a(new Error(`Unable to preload CSS for ${s}`)))})}))}function n(i){const _=new Event("vite:preloadError",{cancelable:!0});if(_.payload=i,window.dispatchEvent(_),!_.defaultPrevented)throw i}return t.then(i=>{for(const _ of i||[])_.status==="rejected"&&n(_.reason);return o().catch(n)})},{createBrowserChannel:T}=__STORYBOOK_MODULE_CHANNELS__,{addons:P}=__STORYBOOK_MODULE_PREVIEW_API__,f=T({page:"preview"});P.setChannel(f);window.__STORYBOOK_ADDONS_CHANNEL__=f;window.CONFIG_TYPE==="DEVELOPMENT"&&(window.__STORYBOOK_SERVER_CHANNEL__=f);const I={"./src/KvoteOppsummering.stories.tsx":async()=>r(()=>import("./KvoteOppsummering.stories-DUcagD5W.js"),__vite__mapDeps([0,1,2,3,4,5,6,7,8]),import.meta.url),"./src/components/periode-liste-item/PeriodeListeItem.stories.tsx":async()=>r(()=>import("./PeriodeListeItem.stories-Dx3ouW4n.js"),__vite__mapDeps([9,2,3,1,4,5,10]),import.meta.url),"./src/components/periode-liste/PeriodeListe.stories.tsx":async()=>r(()=>import("./PeriodeListe.stories-gD3eRgfd.js"),__vite__mapDeps([11,2,3,1,4,5,10,6]),import.meta.url)};async function S(e){return I[e]()}const{composeConfigs:y,PreviewWeb:V,ClientApi:h}=__STORYBOOK_MODULE_PREVIEW_API__,D=async(e=[])=>{const o=await Promise.all([e[0]??r(()=>import("./entry-preview-BfNTY7Tl.js"),__vite__mapDeps([12,13,3,14]),import.meta.url),e[1]??r(()=>import("./entry-preview-docs-y_N6C_D_.js"),__vite__mapDeps([15,13,16,3]),import.meta.url),e[2]??r(()=>import("./preview-B3PTUHS7.js"),__vite__mapDeps([17,18]),import.meta.url),e[3]??r(()=>import("./preview-D6zN1VpQ.js"),[],import.meta.url),e[4]??r(()=>import("./preview-RFMnorYX.js"),[],import.meta.url),e[5]??r(()=>import("./preview-iUmqt_lp.js"),__vite__mapDeps([19,20]),import.meta.url),e[6]??r(()=>import("./preview-Zk6Lo_wo.js"),[],import.meta.url),e[7]??r(()=>import("./preview-CFgKly6U.js"),[],import.meta.url),e[8]??r(()=>import("./preview-DY_pW_WS.js"),__vite__mapDeps([21,20]),import.meta.url),e[9]??r(()=>import("./preview-DGUiP6tS.js"),[],import.meta.url),e[10]??r(()=>import("./preview--rrl-Bev.js"),[],import.meta.url),e[11]??r(()=>import("./preview-DtV2DPU8.js"),__vite__mapDeps([22,3,4,23]),import.meta.url),e[12]??r(()=>import("./preview-C1PrH5ml.js"),__vite__mapDeps([24,2,3,4,23,8]),import.meta.url)]);return y(o)};window.__STORYBOOK_PREVIEW__=window.__STORYBOOK_PREVIEW__||new V(S,D);window.__STORYBOOK_STORY_STORE__=window.__STORYBOOK_STORY_STORE__||window.__STORYBOOK_PREVIEW__.storyStore;export{r as _};
