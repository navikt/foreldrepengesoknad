import"../sb-preview/runtime.js";(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))m(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const r of o.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&m(r)}).observe(document,{childList:!0,subtree:!0});function _(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function m(e){if(e.ep)return;e.ep=!0;const o=_(e);fetch(e.href,o)}})();const E="modulepreload",O=function(s,i){return new URL(s,i).href},p={},t=function(i,_,m){if(!_||_.length===0)return i();const e=document.getElementsByTagName("link");return Promise.all(_.map(o=>{if(o=O(o,m),o in p)return;p[o]=!0;const r=o.endsWith(".css"),d=r?'[rel="stylesheet"]':"";if(!!m)for(let c=e.length-1;c>=0;c--){const a=e[c];if(a.href===o&&(!r||a.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${o}"]${d}`))return;const n=document.createElement("link");if(n.rel=r?"stylesheet":E,r||(n.as="script",n.crossOrigin=""),n.href=o,document.head.appendChild(n),r)return new Promise((c,a)=>{n.addEventListener("load",c),n.addEventListener("error",()=>a(new Error(`Unable to preload CSS for ${o}`)))})})).then(()=>i()).catch(o=>{const r=new Event("vite:preloadError",{cancelable:!0});if(r.payload=o,window.dispatchEvent(r),!r.defaultPrevented)throw o})},{createBrowserChannel:R}=__STORYBOOK_MODULE_CHANNELS__,{addons:P}=__STORYBOOK_MODULE_PREVIEW_API__,l=R({page:"preview"});P.setChannel(l);window.__STORYBOOK_ADDONS_CHANNEL__=l;window.CONFIG_TYPE==="DEVELOPMENT"&&(window.__STORYBOOK_SERVER_CHANNEL__=l);const T={"./src/common/components/utvidet-informasjon/UtvidetInformasjon.stories.tsx":async()=>t(()=>import("./UtvidetInformasjon.stories-214859a5.js"),["./UtvidetInformasjon.stories-214859a5.js","./jsx-runtime-4ca860c5.js","./index-61bf1805.js","./_commonjsHelpers-de833af9.js","./guid-c1767a53.js","./ReadMore-f7ac38e1.js","./clsx.m-266f4de0.js","./useId-c9351ca0.js","./BodyLong-d51fc342.js","./UtvidetInformasjon.stories-6a2eb3a8.css"],import.meta.url),"./src/common/components/step/Step.stories.tsx":async()=>t(()=>import("./Step.stories-3c0e82b7.js"),["./Step.stories-3c0e82b7.js","./jsx-runtime-4ca860c5.js","./index-61bf1805.js","./_commonjsHelpers-de833af9.js","./index-3b7bf8a3.js","./bemUtils-5ddd7bb5.js","./index-b1d09ef8.js","./tslib.es6-74570fde.js","./intlUtils-93c7918a.js","./Banner-82ab4c1c.js","./Banner-977be5a0.css","./Heading-f8ba3d4b.js","./clsx.m-266f4de0.js","./Block-3781a9d6.js","./Block-44a8b832.css","./Provider-9ffbd410.js","./index-2801d3c9.js","./index-9d475cdf.js","./useId-c9351ca0.js","./useId-a104c71e.js","./Loader-bb5a2050.js","./Label-e660a0cb.js","./BodyLong-d51fc342.js","./ProgressStepper-e41d4c07.js","./guid-c1767a53.js","./Back-50038281.js","./useId-4401db27.js","./Expand-48a8ed38.js","./Stepper-6f01f52c.js","./BodyShort-f7cba4a4.js","./ProgressStepper-fbb6c9bc.css","./Step.stories-a53bf880.css"],import.meta.url),"./src/common/components/sirkelmaske/Sirkelmaske.stories.tsx":async()=>t(()=>import("./Sirkelmaske.stories-b6e6b4e9.js"),["./Sirkelmaske.stories-b6e6b4e9.js","./jsx-runtime-4ca860c5.js","./index-61bf1805.js","./_commonjsHelpers-de833af9.js","./Sirkelmaske-5016cb17.js","./bemUtils-5ddd7bb5.js","./Sirkelmaske-e78ecc99.css"],import.meta.url),"./src/common/components/sidebanner/Sidebanner.stories.tsx":async()=>t(()=>import("./Sidebanner.stories-190d3b38.js"),["./Sidebanner.stories-190d3b38.js","./jsx-runtime-4ca860c5.js","./index-61bf1805.js","./_commonjsHelpers-de833af9.js","./bemUtils-5ddd7bb5.js","./Block-3781a9d6.js","./Block-44a8b832.css","./GuidePanel-da08659e.js","./clsx.m-266f4de0.js","./useId-a104c71e.js","./Heading-f8ba3d4b.js","./BodyShort-f7cba4a4.js","./Sidebanner.stories-f6293af9.css"],import.meta.url),"./src/common/components/progress-stepper/ProgressStepper.stories.tsx":async()=>t(()=>import("./ProgressStepper.stories-8f60317d.js"),["./ProgressStepper.stories-8f60317d.js","./jsx-runtime-4ca860c5.js","./index-61bf1805.js","./_commonjsHelpers-de833af9.js","./ProgressStepper-e41d4c07.js","./guid-c1767a53.js","./Back-50038281.js","./useId-4401db27.js","./Expand-48a8ed38.js","./Stepper-6f01f52c.js","./clsx.m-266f4de0.js","./Label-e660a0cb.js","./BodyShort-f7cba4a4.js","./Heading-f8ba3d4b.js","./ProgressStepper-fbb6c9bc.css"],import.meta.url),"./src/common/components/picture-scanning-guide/PictureScanningGuide.stories.tsx":async()=>t(()=>import("./PictureScanningGuide.stories-9614eb0e.js"),["./PictureScanningGuide.stories-9614eb0e.js","./jsx-runtime-4ca860c5.js","./index-61bf1805.js","./_commonjsHelpers-de833af9.js","./PictureScanningGuide-5ff0d17d.js","./index-b1d09ef8.js","./tslib.es6-74570fde.js","./bemUtils-5ddd7bb5.js","./Heading-f8ba3d4b.js","./clsx.m-266f4de0.js","./intlUtils-93c7918a.js","./message-17979f6d.js","./Link-3efb8065.js","./PictureScanningGuide-492adac3.css"],import.meta.url),"./src/common/components/personkort/Personkort.stories.tsx":async()=>t(()=>import("./Personkort.stories-e6e04a51.js"),["./Personkort.stories-e6e04a51.js","./jsx-runtime-4ca860c5.js","./index-61bf1805.js","./_commonjsHelpers-de833af9.js","./bemUtils-5ddd7bb5.js","./BodyShort-f7cba4a4.js","./clsx.m-266f4de0.js","./Personkort.stories-06c70cff.css"],import.meta.url),"./src/common/components/language-toggle/LanguageToggle.stories.tsx":async()=>t(()=>import("./LanguageToggle.stories-df20a1e9.js"),["./LanguageToggle.stories-df20a1e9.js","./jsx-runtime-4ca860c5.js","./index-61bf1805.js","./_commonjsHelpers-de833af9.js","./index-9d475cdf.js","./index-b1d09ef8.js","./tslib.es6-74570fde.js","./intlUtils-93c7918a.js","./Expand-48a8ed38.js","./useId-4401db27.js","./LanguageToggle.stories-69a491dd.css"],import.meta.url),"./src/common/components/item-list/ItemList.stories.tsx":async()=>t(()=>import("./ItemList.stories-9c1ad222.js"),["./ItemList.stories-9c1ad222.js","./jsx-runtime-4ca860c5.js","./index-61bf1805.js","./_commonjsHelpers-de833af9.js","./bemUtils-5ddd7bb5.js","./Link-3efb8065.js","./clsx.m-266f4de0.js","./SlettKnapp-5eaab2f7.js","./SlettKnapp-afabab2a.css","./guid-c1767a53.js","./ItemList.stories-48b40e77.css"],import.meta.url),"./src/common/components/innhold-med-illustrasjon/InnholdMedIllustrasjon.stories.tsx":async()=>t(()=>import("./InnholdMedIllustrasjon.stories-0e55a9d7.js"),["./InnholdMedIllustrasjon.stories-0e55a9d7.js","./jsx-runtime-4ca860c5.js","./index-61bf1805.js","./_commonjsHelpers-de833af9.js","./bemUtils-5ddd7bb5.js","./guid-c1767a53.js","./Heading-f8ba3d4b.js","./clsx.m-266f4de0.js","./Sirkelmaske-5016cb17.js","./Sirkelmaske-e78ecc99.css","./InnholdMedIllustrasjon.stories-378fbcd3.css"],import.meta.url),"./src/common/components/info-block/InfoBlock.stories.tsx":async()=>t(()=>import("./InfoBlock.stories-d3b289a2.js"),["./InfoBlock.stories-d3b289a2.js","./jsx-runtime-4ca860c5.js","./index-61bf1805.js","./_commonjsHelpers-de833af9.js","./bemUtils-5ddd7bb5.js","./InfoBlock.stories-d4007ab6.css"],import.meta.url),"./src/common/components/formik-file-uploader/FormikFileUploader.stories.tsx":async()=>t(()=>import("./FormikFileUploader.stories-3583dfb1.js"),["./FormikFileUploader.stories-3583dfb1.js","./jsx-runtime-4ca860c5.js","./index-61bf1805.js","./_commonjsHelpers-de833af9.js","./index-b1d09ef8.js","./tslib.es6-74570fde.js","./clsx.m-266f4de0.js","./useId-c9351ca0.js","./Provider-9ffbd410.js","./index-2801d3c9.js","./index-9d475cdf.js","./useId-a104c71e.js","./Loader-bb5a2050.js","./Label-e660a0cb.js","./BodyShort-f7cba4a4.js","./ReadMore-f7ac38e1.js","./BodyLong-d51fc342.js","./Heading-f8ba3d4b.js","./extends-a82a164b.js","./GuidePanel-da08659e.js","./Link-3efb8065.js","./Stepper-6f01f52c.js","./bemUtils-5ddd7bb5.js","./v4-a960c1f4.js","./AttachmentList-97490b55.js","./Attachment-d0167993.js","./SlettKnapp-5eaab2f7.js","./SlettKnapp-afabab2a.css","./intlUtils-93c7918a.js","./Attachment-4447a0e2.css","./guid-c1767a53.js","./Block-3781a9d6.js","./Block-44a8b832.css","./PictureScanningGuide-5ff0d17d.js","./message-17979f6d.js","./PictureScanningGuide-492adac3.css","./FormikFileUploader.stories-5f8028ee.css"],import.meta.url),"./src/common/components/foreldrepar/Foreldrepar.stories.tsx":async()=>t(()=>import("./Foreldrepar.stories-024de5ef.js"),["./Foreldrepar.stories-024de5ef.js","./jsx-runtime-4ca860c5.js","./index-61bf1805.js","./_commonjsHelpers-de833af9.js","./bemUtils-5ddd7bb5.js","./Foreldrepar.stories-7707acb6.css"],import.meta.url),"./src/common/components/fieldset/Fieldset.stories.tsx":async()=>t(()=>import("./Fieldset.stories-e2f934f8.js"),["./Fieldset.stories-e2f934f8.js","./jsx-runtime-4ca860c5.js","./index-61bf1805.js","./_commonjsHelpers-de833af9.js","./Label-e660a0cb.js","./clsx.m-266f4de0.js"],import.meta.url),"./src/common/components/display-text-with-label/DisplayTextWithLabel.stories.tsx":async()=>t(()=>import("./DisplayTextWithLabel.stories-9d8f2800.js"),["./DisplayTextWithLabel.stories-9d8f2800.js","./jsx-runtime-4ca860c5.js","./index-61bf1805.js","./_commonjsHelpers-de833af9.js","./Heading-f8ba3d4b.js","./clsx.m-266f4de0.js","./BodyShort-f7cba4a4.js"],import.meta.url),"./src/common/components/block/Block.stories.tsx":async()=>t(()=>import("./Block.stories-6744c0cd.js"),["./Block.stories-6744c0cd.js","./jsx-runtime-4ca860c5.js","./index-61bf1805.js","./_commonjsHelpers-de833af9.js","./Block-3781a9d6.js","./bemUtils-5ddd7bb5.js","./Block-44a8b832.css"],import.meta.url),"./src/common/components/banner/Banner.stories.tsx":async()=>t(()=>import("./Banner.stories-b9908b63.js"),["./Banner.stories-b9908b63.js","./jsx-runtime-4ca860c5.js","./index-61bf1805.js","./_commonjsHelpers-de833af9.js","./Banner-82ab4c1c.js","./bemUtils-5ddd7bb5.js","./Banner-977be5a0.css"],import.meta.url),"./src/common/components/back-link/BackLink.stories.tsx":async()=>t(()=>import("./BackLink.stories-abb1ccc1.js"),["./BackLink.stories-abb1ccc1.js","./jsx-runtime-4ca860c5.js","./index-61bf1805.js","./_commonjsHelpers-de833af9.js","./index-3b7bf8a3.js","./index-b1d09ef8.js","./tslib.es6-74570fde.js","./Back-50038281.js","./useId-4401db27.js","./message-17979f6d.js","./Link-3efb8065.js","./clsx.m-266f4de0.js"],import.meta.url),"./src/common/components/attachment/AttachmentList.stories.tsx":async()=>t(()=>import("./AttachmentList.stories-0f7f70a1.js"),["./AttachmentList.stories-0f7f70a1.js","./jsx-runtime-4ca860c5.js","./index-61bf1805.js","./_commonjsHelpers-de833af9.js","./AttachmentList-97490b55.js","./Attachment-d0167993.js","./bemUtils-5ddd7bb5.js","./index-b1d09ef8.js","./tslib.es6-74570fde.js","./SlettKnapp-5eaab2f7.js","./SlettKnapp-afabab2a.css","./intlUtils-93c7918a.js","./Loader-bb5a2050.js","./clsx.m-266f4de0.js","./useId-a104c71e.js","./Link-3efb8065.js","./Attachment-4447a0e2.css","./guid-c1767a53.js"],import.meta.url),"./src/common/components/attachment/Attachment.stories.tsx":async()=>t(()=>import("./Attachment.stories-ddf6ab0b.js"),["./Attachment.stories-ddf6ab0b.js","./jsx-runtime-4ca860c5.js","./index-61bf1805.js","./_commonjsHelpers-de833af9.js","./Attachment-d0167993.js","./bemUtils-5ddd7bb5.js","./index-b1d09ef8.js","./tslib.es6-74570fde.js","./SlettKnapp-5eaab2f7.js","./SlettKnapp-afabab2a.css","./intlUtils-93c7918a.js","./Loader-bb5a2050.js","./clsx.m-266f4de0.js","./useId-a104c71e.js","./Link-3efb8065.js","./Attachment-4447a0e2.css"],import.meta.url),"./src/common/components/dialogs/bekreft-dialog/BekreftDialog.stories.tsx":async()=>t(()=>import("./BekreftDialog.stories-32567dc3.js"),["./BekreftDialog.stories-32567dc3.js","./jsx-runtime-4ca860c5.js","./index-61bf1805.js","./_commonjsHelpers-de833af9.js","./BekreftDialog-5b80fe09.js","./Block-3781a9d6.js","./bemUtils-5ddd7bb5.js","./Block-44a8b832.css","./Provider-9ffbd410.js","./clsx.m-266f4de0.js","./index-2801d3c9.js","./index-9d475cdf.js","./useId-c9351ca0.js","./useId-a104c71e.js","./Loader-bb5a2050.js","./Label-e660a0cb.js","./Heading-f8ba3d4b.js"],import.meta.url),"./src/common/components/dialogs/avbryt-soknad-dialog/AvbrytSoknadDialog.stories.tsx":async()=>t(()=>import("./AvbrytSoknadDialog.stories-3b2df6cb.js"),["./AvbrytSoknadDialog.stories-3b2df6cb.js","./jsx-runtime-4ca860c5.js","./index-61bf1805.js","./_commonjsHelpers-de833af9.js","./index-b1d09ef8.js","./tslib.es6-74570fde.js","./intlUtils-93c7918a.js","./BekreftDialog-5b80fe09.js","./Block-3781a9d6.js","./bemUtils-5ddd7bb5.js","./Block-44a8b832.css","./Provider-9ffbd410.js","./clsx.m-266f4de0.js","./index-2801d3c9.js","./index-9d475cdf.js","./useId-c9351ca0.js","./useId-a104c71e.js","./Loader-bb5a2050.js","./Label-e660a0cb.js","./Heading-f8ba3d4b.js","./message-17979f6d.js"],import.meta.url)};async function u(s){return T[s]()}u.__docgenInfo={description:"",methods:[],displayName:"importFn"};const{composeConfigs:f,PreviewWeb:L,ClientApi:I}=__STORYBOOK_MODULE_PREVIEW_API__,v=async()=>{const s=await Promise.all([t(()=>import("./config-64aa2002.js"),["./config-64aa2002.js","./index-d475d2ea.js","./index-61bf1805.js","./_commonjsHelpers-de833af9.js","./doctrine-4b34ab54.js","./index-2801d3c9.js","./isPlainObject-4b32b42f.js","./_getPrototype-4e9be3d7.js","./index-9d475cdf.js","./index-356e4a49.js"],import.meta.url),t(()=>import("./preview-b031910c.js"),["./preview-b031910c.js","./index-d475d2ea.js","./index-7f92349d.js"],import.meta.url),t(()=>import("./preview-a6d74a88.js"),[],import.meta.url),t(()=>import("./preview-9ec34bf1.js"),["./preview-9ec34bf1.js","./v4-a960c1f4.js"],import.meta.url),t(()=>import("./preview-770cc08b.js"),["./preview-770cc08b.js","./index-d475d2ea.js","./index-356e4a49.js"],import.meta.url),t(()=>import("./preview-25cb0eda.js"),["./preview-25cb0eda.js","./index-d475d2ea.js"],import.meta.url),t(()=>import("./preview-d8c963a4.js"),["./preview-d8c963a4.js","./index-d475d2ea.js","./index-356e4a49.js"],import.meta.url),t(()=>import("./preview-b79ea209.js"),["./preview-b79ea209.js","./index-d475d2ea.js"],import.meta.url),t(()=>import("./preview-d06fc6bf.js"),["./preview-d06fc6bf.js","./index-d475d2ea.js","./_commonjsHelpers-de833af9.js"],import.meta.url),t(()=>import("./preview-4fa55f3c.js"),["./preview-4fa55f3c.js","./index-61bf1805.js","./_commonjsHelpers-de833af9.js","./index-b1d09ef8.js","./tslib.es6-74570fde.js","./index-d475d2ea.js","./pickBy-9888bcb6.js","./_getPrototype-4e9be3d7.js","./isPlainObject-4b32b42f.js","./index-356e4a49.js","./index-7f92349d.js"],import.meta.url),t(()=>import("./preview-73e3e3c2.js"),["./preview-73e3e3c2.js","./preview-a62f9eae.css"],import.meta.url)]);return f(s)};window.__STORYBOOK_PREVIEW__=window.__STORYBOOK_PREVIEW__||new L;window.__STORYBOOK_STORY_STORE__=window.__STORYBOOK_STORY_STORE__||window.__STORYBOOK_PREVIEW__.storyStore;window.__STORYBOOK_CLIENT_API__=window.__STORYBOOK_CLIENT_API__||new I({storyStore:window.__STORYBOOK_PREVIEW__.storyStore});window.__STORYBOOK_PREVIEW__.initialize({importFn:u,getProjectAnnotations:v});export{t as _};
//# sourceMappingURL=iframe-c1ca0431.js.map
