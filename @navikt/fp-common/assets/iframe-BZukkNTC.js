function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["./Attachment.stories-CE_yd27F.js","./jsx-runtime-_e34SzbC.js","./index-DVXBtNgz.js","./Attachment-BuV3Is2C.js","./bemUtils-Wzdz5W7M.js","./index-CleeAgRW.js","./tslib.es6-BntfKcQG.js","./SlettKnapp-BcWldGC_.js","./SlettKnapp-C-_lrY4c.css","./intlUtils-C_Owl2LD.js","./Loader-CBCoGZwc.js","./clsx-B-dksMZM.js","./useId-BLSuUrg3.js","./Link-CceVKQrV.js","./Attachment-CUNn4jlQ.css","./AttachmentList.stories-C12LP6bo.js","./AttachmentList-rlUK86OP.js","./guid-CsArkN6i.js","./BackLink.stories-B_XJZT4K.js","./index-QYVlIi1E.js","./index-Cbx7Fas8.js","./Back-IiENdH20.js","./useId-DbilmxAP.js","./message-BnL7WJgo.js","./Banner.stories--Rz_qQYg.js","./Banner-CbP68b7s.js","./Banner-CgG7fPzd.css","./Block.stories-CtBwftNp.js","./Block-CfwDXnuO.js","./Block-BcGJtG4R.css","./AvbrytSoknadDialog.stories-Dg1jmYHJ.js","./BekreftDialog-DdznkuiF.js","./Modal-Cc_WKAaj.js","./Label-CZT6yrnL.js","./composeEventHandlers-DeH74NdU.js","./create-context-DH-ArewY.js","./useId-B9DgiJ2s.js","./BekreftDialog.stories-BRNj1U7q.js","./DisplayTextWithLabel.stories-BZNYhZhf.js","./Fieldset.stories-oVHI_Qq6.js","./Foreldrepar.stories-BwmvI94Y.js","./Foreldrepar-CK8JHewj.css","./FormikFileUploader.stories-Dtha74d8.js","./PictureScanningGuide-ChjrwcRD.js","./PictureScanningGuide-CHZB2Lat.css","./ReadMore-DzcdFn1f.js","./FormikFileUploader-CKZzh5xi.css","./InfoBlock.stories-nzuoQ4Fp.js","./InfoBlock-CMojW6FV.css","./InnholdMedIllustrasjon.stories-DFgsk2ED.js","./Sirkelmaske-DZ_GHhJF.js","./Sirkelmaske-BnqsN9ck.css","./InnholdMedIllustrasjon-Dq1JbZKO.css","./ItemList.stories-AYPGQUIY.js","./ItemList-CzKuJ6cz.css","./LanguageToggle.stories-qcZji_4V.js","./index-Dcs0RV0A.js","./Expand-Db2uFZzY.js","./LanguageToggle-Bdy2HrY-.css","./Personkort.stories-B6cowFvJ.js","./Personkort-BNCcUqCE.css","./PictureScanningGuide.stories-TeHxdAi-.js","./ProgressStepper.stories-B-nWa-n-.js","./ProgressStepper-Cnz8_j-S.js","./ProgressStepper-bGOLGbeC.css","./Sidebanner.stories-BTmXm2QG.js","./Sidebanner-DDmd3Qey.css","./Sirkelmaske.stories-BfllT3hy.js","./Step.stories-02AdO2k3.js","./Step-DKF0sxHc.css","./UtvidetInformasjon.stories-Dy_2X70T.js","./UtvidetInformasjon-Cnu8I54I.css","./entry-preview-B4L7F0XH.js","./react-18-CPpMsYPv.js","./entry-preview-docs-BU4ZYpeM.js","./_getPrototype-DX4bYm8U.js","./index-DrFu-skq.js","./preview-TCN6m6T-.js","./index-DXimoRZY.js","./preview-CwqMn10d.js","./preview-BAz7FMXc.js","./preview-BBi6U-TY.js","./preview-xcv33hiB.js","./preview-C3_r9BKW.css"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
import"../sb-preview/runtime.js";(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))m(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&m(s)}).observe(document,{childList:!0,subtree:!0});function n(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function m(e){if(e.ep)return;e.ep=!0;const r=n(e);fetch(e.href,r)}})();const d="modulepreload",O=function(o,i){return new URL(o,i).href},u={},t=function(i,n,m){let e=Promise.resolve();if(n&&n.length>0){const r=document.getElementsByTagName("link");e=Promise.all(n.map(s=>{if(s=O(s,m),s in u)return;u[s]=!0;const c=s.endsWith(".css"),E=c?'[rel="stylesheet"]':"";if(!!m)for(let a=r.length-1;a>=0;a--){const p=r[a];if(p.href===s&&(!c||p.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${s}"]${E}`))return;const _=document.createElement("link");if(_.rel=c?"stylesheet":d,c||(_.as="script",_.crossOrigin=""),_.href=s,document.head.appendChild(_),c)return new Promise((a,p)=>{_.addEventListener("load",a),_.addEventListener("error",()=>p(new Error(`Unable to preload CSS for ${s}`)))})}))}return e.then(()=>i()).catch(r=>{const s=new Event("vite:preloadError",{cancelable:!0});if(s.payload=r,window.dispatchEvent(s),!s.defaultPrevented)throw r})},{createBrowserChannel:R}=__STORYBOOK_MODULE_CHANNELS__,{addons:f}=__STORYBOOK_MODULE_PREVIEW_API__,l=R({page:"preview"});f.setChannel(l);window.__STORYBOOK_ADDONS_CHANNEL__=l;window.CONFIG_TYPE==="DEVELOPMENT"&&(window.__STORYBOOK_SERVER_CHANNEL__=l);const L={"./src/common/components/attachment/Attachment.stories.tsx":async()=>t(()=>import("./Attachment.stories-CE_yd27F.js"),__vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14]),import.meta.url),"./src/common/components/attachment/AttachmentList.stories.tsx":async()=>t(()=>import("./AttachmentList.stories-C12LP6bo.js"),__vite__mapDeps([15,1,2,16,3,4,5,6,7,8,9,10,11,12,13,14,17]),import.meta.url),"./src/common/components/back-link/BackLink.stories.tsx":async()=>t(()=>import("./BackLink.stories-B_XJZT4K.js"),__vite__mapDeps([18,1,2,19,20,5,6,13,11,21,22,23]),import.meta.url),"./src/common/components/banner/Banner.stories.tsx":async()=>t(()=>import("./Banner.stories--Rz_qQYg.js"),__vite__mapDeps([24,1,2,25,4,26]),import.meta.url),"./src/common/components/block/Block.stories.tsx":async()=>t(()=>import("./Block.stories-CtBwftNp.js"),__vite__mapDeps([27,1,2,28,4,29]),import.meta.url),"./src/common/components/dialogs/avbryt-soknad-dialog/AvbrytSoknadDialog.stories.tsx":async()=>t(()=>import("./AvbrytSoknadDialog.stories-Dg1jmYHJ.js"),__vite__mapDeps([30,1,2,5,6,9,31,28,4,29,32,20,11,33,34,12,35,10,36,23]),import.meta.url),"./src/common/components/dialogs/bekreft-dialog/BekreftDialog.stories.tsx":async()=>t(()=>import("./BekreftDialog.stories-BRNj1U7q.js"),__vite__mapDeps([37,1,2,31,28,4,29,32,20,11,33,34,12,35,10,36]),import.meta.url),"./src/common/components/display-text-with-label/DisplayTextWithLabel.stories.tsx":async()=>t(()=>import("./DisplayTextWithLabel.stories-BZNYhZhf.js"),__vite__mapDeps([38,1,2,33,11]),import.meta.url),"./src/common/components/fieldset/Fieldset.stories.tsx":async()=>t(()=>import("./Fieldset.stories-oVHI_Qq6.js"),__vite__mapDeps([39,1,2,33,11]),import.meta.url),"./src/common/components/foreldrepar/Foreldrepar.stories.tsx":async()=>t(()=>import("./Foreldrepar.stories-BwmvI94Y.js"),__vite__mapDeps([40,1,2,4,41]),import.meta.url),"./src/common/components/formik-file-uploader/FormikFileUploader.stories.tsx":async()=>t(()=>import("./FormikFileUploader.stories-Dtha74d8.js"),__vite__mapDeps([42,1,2,5,6,16,3,4,7,8,9,10,11,12,13,14,17,28,29,43,33,23,44,36,45,34,46]),import.meta.url),"./src/common/components/info-block/InfoBlock.stories.tsx":async()=>t(()=>import("./InfoBlock.stories-nzuoQ4Fp.js"),__vite__mapDeps([47,1,2,4,48]),import.meta.url),"./src/common/components/innhold-med-illustrasjon/InnholdMedIllustrasjon.stories.tsx":async()=>t(()=>import("./InnholdMedIllustrasjon.stories-DFgsk2ED.js"),__vite__mapDeps([49,1,2,4,17,33,11,50,51,52]),import.meta.url),"./src/common/components/item-list/ItemList.stories.tsx":async()=>t(()=>import("./ItemList.stories-AYPGQUIY.js"),__vite__mapDeps([53,1,2,4,13,11,7,8,17,54]),import.meta.url),"./src/common/components/language-toggle/LanguageToggle.stories.tsx":async()=>t(()=>import("./LanguageToggle.stories-qcZji_4V.js"),__vite__mapDeps([55,1,2,56,5,6,9,57,22,58]),import.meta.url),"./src/common/components/personkort/Personkort.stories.tsx":async()=>t(()=>import("./Personkort.stories-B6cowFvJ.js"),__vite__mapDeps([59,1,2,4,33,11,60]),import.meta.url),"./src/common/components/picture-scanning-guide/PictureScanningGuide.stories.tsx":async()=>t(()=>import("./PictureScanningGuide.stories-TeHxdAi-.js"),__vite__mapDeps([61,1,2,43,5,6,4,33,11,9,23,13,44]),import.meta.url),"./src/common/components/progress-stepper/ProgressStepper.stories.tsx":async()=>t(()=>import("./ProgressStepper.stories-B-nWa-n-.js"),__vite__mapDeps([62,1,2,63,17,33,11,21,22,57,34,35,64]),import.meta.url),"./src/common/components/sidebanner/Sidebanner.stories.tsx":async()=>t(()=>import("./Sidebanner.stories-BTmXm2QG.js"),__vite__mapDeps([65,1,2,4,28,29,11,12,33,66]),import.meta.url),"./src/common/components/sirkelmaske/Sirkelmaske.stories.tsx":async()=>t(()=>import("./Sirkelmaske.stories-BfllT3hy.js"),__vite__mapDeps([67,1,2,50,4,51]),import.meta.url),"./src/common/components/step/Step.stories.tsx":async()=>t(()=>import("./Step.stories-02AdO2k3.js"),__vite__mapDeps([68,1,2,19,20,4,5,6,9,25,26,33,11,28,29,32,34,12,35,10,36,63,17,21,22,57,64,69]),import.meta.url),"./src/common/components/utvidet-informasjon/UtvidetInformasjon.stories.tsx":async()=>t(()=>import("./UtvidetInformasjon.stories-Dy_2X70T.js"),__vite__mapDeps([70,1,2,17,45,11,33,34,36,71]),import.meta.url)};async function T(o){return L[o]()}const{composeConfigs:I,PreviewWeb:P,ClientApi:v}=__STORYBOOK_MODULE_PREVIEW_API__,y=async(o=[])=>{const i=await Promise.all([o.at(0)??t(()=>import("./entry-preview-B4L7F0XH.js"),__vite__mapDeps([72,2,73,20]),import.meta.url),o.at(1)??t(()=>import("./entry-preview-docs-BU4ZYpeM.js"),__vite__mapDeps([74,75,2,56,76]),import.meta.url),o.at(2)??t(()=>import("./preview-TCN6m6T-.js"),__vite__mapDeps([77,78]),import.meta.url),o.at(3)??t(()=>import("./preview-BG7ZQTkR.js"),__vite__mapDeps([]),import.meta.url),o.at(4)??t(()=>import("./preview-Ct5NkTJf.js"),__vite__mapDeps([]),import.meta.url),o.at(5)??t(()=>import("./preview-CwqMn10d.js"),__vite__mapDeps([79,76]),import.meta.url),o.at(6)??t(()=>import("./preview-B4GcaC1c.js"),__vite__mapDeps([]),import.meta.url),o.at(7)??t(()=>import("./preview-Db4Idchh.js"),__vite__mapDeps([]),import.meta.url),o.at(8)??t(()=>import("./preview-BAz7FMXc.js"),__vite__mapDeps([80,76]),import.meta.url),o.at(9)??t(()=>import("./preview-BpcF_O6y.js"),__vite__mapDeps([]),import.meta.url),o.at(10)??t(()=>import("./preview-BcrGd3F6.js"),__vite__mapDeps([]),import.meta.url),o.at(11)??t(()=>import("./preview-BBi6U-TY.js"),__vite__mapDeps([81,5,6,2]),import.meta.url),o.at(12)??t(()=>import("./preview-xcv33hiB.js"),__vite__mapDeps([82,83]),import.meta.url)]);return I(i)};window.__STORYBOOK_PREVIEW__=window.__STORYBOOK_PREVIEW__||new P(T,y);window.__STORYBOOK_STORY_STORE__=window.__STORYBOOK_STORY_STORE__||window.__STORYBOOK_PREVIEW__.storyStore;export{t as _};
