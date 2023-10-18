import"../sb-preview/runtime.js";(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))m(o);new MutationObserver(o=>{for(const e of o)if(e.type==="childList")for(const r of e.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&m(r)}).observe(document,{childList:!0,subtree:!0});function s(o){const e={};return o.integrity&&(e.integrity=o.integrity),o.referrerPolicy&&(e.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?e.credentials="include":o.crossOrigin==="anonymous"?e.credentials="omit":e.credentials="same-origin",e}function m(o){if(o.ep)return;o.ep=!0;const e=s(o);fetch(o.href,e)}})();const E="modulepreload",O=function(n,i){return new URL(n,i).href},u={},t=function(i,s,m){if(!s||s.length===0)return i();const o=document.getElementsByTagName("link");return Promise.all(s.map(e=>{if(e=O(e,m),e in u)return;u[e]=!0;const r=e.endsWith(".css"),d=r?'[rel="stylesheet"]':"";if(!!m)for(let c=o.length-1;c>=0;c--){const a=o[c];if(a.href===e&&(!r||a.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${e}"]${d}`))return;const _=document.createElement("link");if(_.rel=r?"stylesheet":E,r||(_.as="script",_.crossOrigin=""),_.href=e,document.head.appendChild(_),r)return new Promise((c,a)=>{_.addEventListener("load",c),_.addEventListener("error",()=>a(new Error(`Unable to preload CSS for ${e}`)))})})).then(()=>i()).catch(e=>{const r=new Event("vite:preloadError",{cancelable:!0});if(r.payload=e,window.dispatchEvent(r),!r.defaultPrevented)throw e})},{createBrowserChannel:R}=__STORYBOOK_MODULE_CHANNELS__,{addons:f}=__STORYBOOK_MODULE_PREVIEW_API__,l=R({page:"preview"});f.setChannel(l);window.__STORYBOOK_ADDONS_CHANNEL__=l;window.CONFIG_TYPE==="DEVELOPMENT"&&(window.__STORYBOOK_SERVER_CHANNEL__=l);const P={"./src/common/components/utvidet-informasjon/UtvidetInformasjon.stories.tsx":async()=>t(()=>import("./UtvidetInformasjon.stories-67df0576.js"),["./UtvidetInformasjon.stories-67df0576.js","./jsx-runtime-4ca860c5.js","./index-61bf1805.js","./_commonjsHelpers-de833af9.js","./guid-c1767a53.js","./clsx.m-1229b3e0.js","./useId-4401db27.js","./BodyLong-a879fa97.js","./UtvidetInformasjon.stories-6a2eb3a8.css"],import.meta.url),"./src/common/components/step/Step.stories.tsx":async()=>t(()=>import("./Step.stories-a7563def.js"),["./Step.stories-a7563def.js","./jsx-runtime-4ca860c5.js","./index-61bf1805.js","./_commonjsHelpers-de833af9.js","./index-3b7bf8a3.js","./bemUtils-ca30e94f.js","./index-c9b9c854.js","./tslib.es6-74570fde.js","./intlUtils-adb52f84.js","./Banner-6d32b927.js","./Banner-977be5a0.css","./Heading-d6752989.js","./clsx.m-1229b3e0.js","./Block-8a28d15c.js","./Block-44a8b832.css","./Provider-b6ceb5d6.js","./index-2801d3c9.js","./index-9d475cdf.js","./useId-4401db27.js","./useId-a104c71e.js","./Label-548f7d15.js","./BodyLong-a879fa97.js","./ProgressStepper-2b020caa.js","./guid-c1767a53.js","./Back-50038281.js","./useId-c9351ca0.js","./Expand-48a8ed38.js","./BodyShort-32f32afe.js","./ProgressStepper-fbb6c9bc.css","./Step.stories-a53bf880.css"],import.meta.url),"./src/common/components/sidebanner/Sidebanner.stories.tsx":async()=>t(()=>import("./Sidebanner.stories-169cab3d.js"),["./Sidebanner.stories-169cab3d.js","./jsx-runtime-4ca860c5.js","./index-61bf1805.js","./_commonjsHelpers-de833af9.js","./bemUtils-ca30e94f.js","./Block-8a28d15c.js","./Block-44a8b832.css","./clsx.m-1229b3e0.js","./useId-a104c71e.js","./Heading-d6752989.js","./BodyShort-32f32afe.js","./Sidebanner.stories-f6293af9.css"],import.meta.url),"./src/common/components/progress-stepper/ProgressStepper.stories.tsx":async()=>t(()=>import("./ProgressStepper.stories-f9484efb.js"),["./ProgressStepper.stories-f9484efb.js","./jsx-runtime-4ca860c5.js","./index-61bf1805.js","./_commonjsHelpers-de833af9.js","./ProgressStepper-2b020caa.js","./guid-c1767a53.js","./Back-50038281.js","./useId-c9351ca0.js","./Expand-48a8ed38.js","./clsx.m-1229b3e0.js","./Label-548f7d15.js","./BodyShort-32f32afe.js","./Heading-d6752989.js","./ProgressStepper-fbb6c9bc.css"],import.meta.url),"./src/common/components/picture-scanning-guide/PictureScanningGuide.stories.tsx":async()=>t(()=>import("./PictureScanningGuide.stories-0387f81a.js"),["./PictureScanningGuide.stories-0387f81a.js","./jsx-runtime-4ca860c5.js","./index-61bf1805.js","./_commonjsHelpers-de833af9.js","./index-c9b9c854.js","./tslib.es6-74570fde.js","./bemUtils-ca30e94f.js","./Heading-d6752989.js","./clsx.m-1229b3e0.js","./intlUtils-adb52f84.js","./message-6b191c82.js","./Link-cc451fea.js","./PictureScanningGuide.stories-492adac3.css"],import.meta.url),"./src/common/components/language-toggle/LanguageToggle.stories.tsx":async()=>t(()=>import("./LanguageToggle.stories-e2fce3a3.js"),["./LanguageToggle.stories-e2fce3a3.js","./jsx-runtime-4ca860c5.js","./index-61bf1805.js","./_commonjsHelpers-de833af9.js","./index-9d475cdf.js","./index-c9b9c854.js","./tslib.es6-74570fde.js","./intlUtils-adb52f84.js","./Expand-48a8ed38.js","./useId-c9351ca0.js","./LanguageToggle.stories-69a491dd.css"],import.meta.url),"./src/common/components/item-list/ItemList.stories.tsx":async()=>t(()=>import("./ItemList.stories-65b0782f.js"),["./ItemList.stories-65b0782f.js","./jsx-runtime-4ca860c5.js","./index-61bf1805.js","./_commonjsHelpers-de833af9.js","./bemUtils-ca30e94f.js","./Link-cc451fea.js","./clsx.m-1229b3e0.js","./guid-c1767a53.js","./ItemList.stories-fb233bad.css"],import.meta.url),"./src/common/components/info-block/InfoBlock.stories.tsx":async()=>t(()=>import("./InfoBlock.stories-2e0c857b.js"),["./InfoBlock.stories-2e0c857b.js","./jsx-runtime-4ca860c5.js","./index-61bf1805.js","./_commonjsHelpers-de833af9.js","./bemUtils-ca30e94f.js","./InfoBlock.stories-d4007ab6.css"],import.meta.url),"./src/common/components/display-text-with-label/DisplayTextWithLabel.stories.tsx":async()=>t(()=>import("./DisplayTextWithLabel.stories-38c3725d.js"),["./DisplayTextWithLabel.stories-38c3725d.js","./jsx-runtime-4ca860c5.js","./index-61bf1805.js","./_commonjsHelpers-de833af9.js","./Heading-d6752989.js","./clsx.m-1229b3e0.js","./BodyShort-32f32afe.js"],import.meta.url),"./src/common/components/block/Block.stories.tsx":async()=>t(()=>import("./Block.stories-d9248a61.js"),["./Block.stories-d9248a61.js","./jsx-runtime-4ca860c5.js","./index-61bf1805.js","./_commonjsHelpers-de833af9.js","./Block-8a28d15c.js","./bemUtils-ca30e94f.js","./Block-44a8b832.css"],import.meta.url),"./src/common/components/banner/Banner.stories.tsx":async()=>t(()=>import("./Banner.stories-a91abdf6.js"),["./Banner.stories-a91abdf6.js","./jsx-runtime-4ca860c5.js","./index-61bf1805.js","./_commonjsHelpers-de833af9.js","./Banner-6d32b927.js","./bemUtils-ca30e94f.js","./Banner-977be5a0.css"],import.meta.url),"./src/common/components/back-link/BackLink.stories.tsx":async()=>t(()=>import("./BackLink.stories-bd373633.js"),["./BackLink.stories-bd373633.js","./jsx-runtime-4ca860c5.js","./index-61bf1805.js","./_commonjsHelpers-de833af9.js","./index-3b7bf8a3.js","./index-c9b9c854.js","./tslib.es6-74570fde.js","./Back-50038281.js","./useId-c9351ca0.js","./message-6b191c82.js","./Link-cc451fea.js","./clsx.m-1229b3e0.js"],import.meta.url),"./src/common/components/dialogs/bekreft-dialog/BekreftDialog.stories.tsx":async()=>t(()=>import("./BekreftDialog.stories-5f4aec3a.js"),["./BekreftDialog.stories-5f4aec3a.js","./jsx-runtime-4ca860c5.js","./index-61bf1805.js","./_commonjsHelpers-de833af9.js","./BekreftDialog-115f6d08.js","./Block-8a28d15c.js","./bemUtils-ca30e94f.js","./Block-44a8b832.css","./Provider-b6ceb5d6.js","./clsx.m-1229b3e0.js","./index-2801d3c9.js","./index-9d475cdf.js","./useId-4401db27.js","./useId-a104c71e.js","./Label-548f7d15.js","./Heading-d6752989.js"],import.meta.url),"./src/common/components/dialogs/avbryt-soknad-dialog/AvbrytSoknadDialog.stories.tsx":async()=>t(()=>import("./AvbrytSoknadDialog.stories-7ddec941.js"),["./AvbrytSoknadDialog.stories-7ddec941.js","./jsx-runtime-4ca860c5.js","./index-61bf1805.js","./_commonjsHelpers-de833af9.js","./index-c9b9c854.js","./tslib.es6-74570fde.js","./intlUtils-adb52f84.js","./BekreftDialog-115f6d08.js","./Block-8a28d15c.js","./bemUtils-ca30e94f.js","./Block-44a8b832.css","./Provider-b6ceb5d6.js","./clsx.m-1229b3e0.js","./index-2801d3c9.js","./index-9d475cdf.js","./useId-4401db27.js","./useId-a104c71e.js","./Label-548f7d15.js","./Heading-d6752989.js","./message-6b191c82.js"],import.meta.url)};async function p(n){return P[n]()}p.__docgenInfo={description:"",methods:[],displayName:"importFn"};const{composeConfigs:T,PreviewWeb:L,ClientApi:I}=__STORYBOOK_MODULE_PREVIEW_API__,v=async()=>{const n=await Promise.all([t(()=>import("./config-64aa2002.js"),["./config-64aa2002.js","./index-d475d2ea.js","./index-61bf1805.js","./_commonjsHelpers-de833af9.js","./doctrine-4b34ab54.js","./index-2801d3c9.js","./isPlainObject-4b32b42f.js","./_getPrototype-4e9be3d7.js","./index-9d475cdf.js","./index-356e4a49.js"],import.meta.url),t(()=>import("./preview-b031910c.js"),["./preview-b031910c.js","./index-d475d2ea.js","./index-7f92349d.js"],import.meta.url),t(()=>import("./preview-93be71e5.js"),[],import.meta.url),t(()=>import("./preview-a60aa466.js"),[],import.meta.url),t(()=>import("./preview-770cc08b.js"),["./preview-770cc08b.js","./index-d475d2ea.js","./index-356e4a49.js"],import.meta.url),t(()=>import("./preview-25cb0eda.js"),["./preview-25cb0eda.js","./index-d475d2ea.js"],import.meta.url),t(()=>import("./preview-d8c963a4.js"),["./preview-d8c963a4.js","./index-d475d2ea.js","./index-356e4a49.js"],import.meta.url),t(()=>import("./preview-b79ea209.js"),["./preview-b79ea209.js","./index-d475d2ea.js"],import.meta.url),t(()=>import("./preview-d06fc6bf.js"),["./preview-d06fc6bf.js","./index-d475d2ea.js","./_commonjsHelpers-de833af9.js"],import.meta.url),t(()=>import("./preview-d0543394.js"),["./preview-d0543394.js","./index-61bf1805.js","./_commonjsHelpers-de833af9.js","./index-c9b9c854.js","./tslib.es6-74570fde.js","./index-d475d2ea.js","./pickBy-9888bcb6.js","./_getPrototype-4e9be3d7.js","./isPlainObject-4b32b42f.js","./index-356e4a49.js","./index-7f92349d.js"],import.meta.url),t(()=>import("./preview-ca1d0936.js"),["./preview-ca1d0936.js","./preview-a62f9eae.css"],import.meta.url)]);return T(n)};window.__STORYBOOK_PREVIEW__=window.__STORYBOOK_PREVIEW__||new L;window.__STORYBOOK_STORY_STORE__=window.__STORYBOOK_STORY_STORE__||window.__STORYBOOK_PREVIEW__.storyStore;window.__STORYBOOK_CLIENT_API__=window.__STORYBOOK_CLIENT_API__||new I({storyStore:window.__STORYBOOK_PREVIEW__.storyStore});window.__STORYBOOK_PREVIEW__.initialize({importFn:p,getProjectAnnotations:v});export{t as _};
//# sourceMappingURL=iframe-858ae834.js.map
