function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["./Attachment.stories-HU567KuL.js","./jsx-runtime-_e34SzbC.js","./index-DVXBtNgz.js","./Attachment-2W1I9fOY.js","./bemUtils-Wzdz5W7M.js","./index-CleeAgRW.js","./tslib.es6-BntfKcQG.js","./SlettKnapp-BcWldGC_.js","./SlettKnapp-C-_lrY4c.css","./intlUtils-C_Owl2LD.js","./Loader-B8w5ToFj.js","./clsx-B-dksMZM.js","./useId-BLSuUrg3.js","./Link-CceVKQrV.js","./Attachment-CUNn4jlQ.css","./AttachmentList.stories-BpMplU6C.js","./AttachmentList-H_qz-R_Y.js","./guid-CsArkN6i.js","./BackLink.stories-B_XJZT4K.js","./index-QYVlIi1E.js","./index-Cbx7Fas8.js","./Back-IiENdH20.js","./useId-B9DgiJ2s.js","./message-BnL7WJgo.js","./Banner.stories--Rz_qQYg.js","./Banner-CbP68b7s.js","./Banner-CgG7fPzd.css","./Block.stories-CtBwftNp.js","./Block-CfwDXnuO.js","./Block-BcGJtG4R.css","./AvbrytSoknadDialog.stories-CC_C3ojl.js","./BekreftDialog-CMpSgVBT.js","./Modal-CaB7ezvQ.js","./Label-CZT6yrnL.js","./composeEventHandlers-DeH74NdU.js","./useId-DbilmxAP.js","./BekreftDialog.stories-Dm_Py76y.js","./DisplayTextWithLabel.stories-BZNYhZhf.js","./Fieldset.stories-oVHI_Qq6.js","./Foreldrepar.stories-BwmvI94Y.js","./Foreldrepar-CK8JHewj.css","./FormikFileUploader.stories-CzWj-9US.js","./PictureScanningGuide-ChjrwcRD.js","./PictureScanningGuide-CHZB2Lat.css","./ReadMore-xzW-urbs.js","./FormikFileUploader-CKZzh5xi.css","./InfoBlock.stories-nzuoQ4Fp.js","./InfoBlock-CMojW6FV.css","./InnholdMedIllustrasjon.stories-DFgsk2ED.js","./Sirkelmaske-DZ_GHhJF.js","./Sirkelmaske-BnqsN9ck.css","./InnholdMedIllustrasjon-Dq1JbZKO.css","./ItemList.stories-AYPGQUIY.js","./ItemList-CzKuJ6cz.css","./LanguageToggle.stories-qcZji_4V.js","./index-Dcs0RV0A.js","./Expand-Db2uFZzY.js","./LanguageToggle-Bdy2HrY-.css","./Personkort.stories-B6cowFvJ.js","./Personkort-BNCcUqCE.css","./PictureScanningGuide.stories-TeHxdAi-.js","./ProgressStepper.stories-B73ryV_i.js","./ProgressStepper-DCY_RdNi.js","./ProgressStepper-bGOLGbeC.css","./Sidebanner.stories-BTmXm2QG.js","./Sidebanner-DDmd3Qey.css","./Sirkelmaske.stories-BfllT3hy.js","./Step.stories-BjZWz28N.js","./Step-DKF0sxHc.css","./UtvidetInformasjon.stories-CBT63OKF.js","./UtvidetInformasjon-Cnu8I54I.css","./entry-preview-B4L7F0XH.js","./react-18-CPpMsYPv.js","./entry-preview-docs-BU4ZYpeM.js","./_getPrototype-DX4bYm8U.js","./index-DrFu-skq.js","./preview-TCN6m6T-.js","./index-DXimoRZY.js","./preview-CwqMn10d.js","./preview-BAz7FMXc.js","./preview-BBi6U-TY.js","./preview-Dm8dZFto.js","./preview-B6JZgCmC.css"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
import"../sb-preview/runtime.js";(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))m(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&m(s)}).observe(document,{childList:!0,subtree:!0});function n(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function m(e){if(e.ep)return;e.ep=!0;const r=n(e);fetch(e.href,r)}})();const d="modulepreload",O=function(o,i){return new URL(o,i).href},u={},t=function(i,n,m){let e=Promise.resolve();if(n&&n.length>0){const r=document.getElementsByTagName("link");e=Promise.all(n.map(s=>{if(s=O(s,m),s in u)return;u[s]=!0;const c=s.endsWith(".css"),E=c?'[rel="stylesheet"]':"";if(!!m)for(let a=r.length-1;a>=0;a--){const p=r[a];if(p.href===s&&(!c||p.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${s}"]${E}`))return;const _=document.createElement("link");if(_.rel=c?"stylesheet":d,c||(_.as="script",_.crossOrigin=""),_.href=s,document.head.appendChild(_),c)return new Promise((a,p)=>{_.addEventListener("load",a),_.addEventListener("error",()=>p(new Error(`Unable to preload CSS for ${s}`)))})}))}return e.then(()=>i()).catch(r=>{const s=new Event("vite:preloadError",{cancelable:!0});if(s.payload=r,window.dispatchEvent(s),!s.defaultPrevented)throw r})},{createBrowserChannel:R}=__STORYBOOK_MODULE_CHANNELS__,{addons:f}=__STORYBOOK_MODULE_PREVIEW_API__,l=R({page:"preview"});f.setChannel(l);window.__STORYBOOK_ADDONS_CHANNEL__=l;window.CONFIG_TYPE==="DEVELOPMENT"&&(window.__STORYBOOK_SERVER_CHANNEL__=l);const L={"./src/common/components/attachment/Attachment.stories.tsx":async()=>t(()=>import("./Attachment.stories-HU567KuL.js"),__vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14]),import.meta.url),"./src/common/components/attachment/AttachmentList.stories.tsx":async()=>t(()=>import("./AttachmentList.stories-BpMplU6C.js"),__vite__mapDeps([15,1,2,16,3,4,5,6,7,8,9,10,11,12,13,14,17]),import.meta.url),"./src/common/components/back-link/BackLink.stories.tsx":async()=>t(()=>import("./BackLink.stories-B_XJZT4K.js"),__vite__mapDeps([18,1,2,19,20,5,6,13,11,21,22,23]),import.meta.url),"./src/common/components/banner/Banner.stories.tsx":async()=>t(()=>import("./Banner.stories--Rz_qQYg.js"),__vite__mapDeps([24,1,2,25,4,26]),import.meta.url),"./src/common/components/block/Block.stories.tsx":async()=>t(()=>import("./Block.stories-CtBwftNp.js"),__vite__mapDeps([27,1,2,28,4,29]),import.meta.url),"./src/common/components/dialogs/avbryt-soknad-dialog/AvbrytSoknadDialog.stories.tsx":async()=>t(()=>import("./AvbrytSoknadDialog.stories-CC_C3ojl.js"),__vite__mapDeps([30,1,2,5,6,9,31,28,4,29,32,20,11,33,34,12,10,35,23]),import.meta.url),"./src/common/components/dialogs/bekreft-dialog/BekreftDialog.stories.tsx":async()=>t(()=>import("./BekreftDialog.stories-Dm_Py76y.js"),__vite__mapDeps([36,1,2,31,28,4,29,32,20,11,33,34,12,10,35]),import.meta.url),"./src/common/components/display-text-with-label/DisplayTextWithLabel.stories.tsx":async()=>t(()=>import("./DisplayTextWithLabel.stories-BZNYhZhf.js"),__vite__mapDeps([37,1,2,33,11]),import.meta.url),"./src/common/components/fieldset/Fieldset.stories.tsx":async()=>t(()=>import("./Fieldset.stories-oVHI_Qq6.js"),__vite__mapDeps([38,1,2,33,11]),import.meta.url),"./src/common/components/foreldrepar/Foreldrepar.stories.tsx":async()=>t(()=>import("./Foreldrepar.stories-BwmvI94Y.js"),__vite__mapDeps([39,1,2,4,40]),import.meta.url),"./src/common/components/formik-file-uploader/FormikFileUploader.stories.tsx":async()=>t(()=>import("./FormikFileUploader.stories-CzWj-9US.js"),__vite__mapDeps([41,1,2,5,6,16,3,4,7,8,9,10,11,12,13,14,17,28,29,42,33,23,43,35,44,34,45]),import.meta.url),"./src/common/components/info-block/InfoBlock.stories.tsx":async()=>t(()=>import("./InfoBlock.stories-nzuoQ4Fp.js"),__vite__mapDeps([46,1,2,4,47]),import.meta.url),"./src/common/components/innhold-med-illustrasjon/InnholdMedIllustrasjon.stories.tsx":async()=>t(()=>import("./InnholdMedIllustrasjon.stories-DFgsk2ED.js"),__vite__mapDeps([48,1,2,4,17,33,11,49,50,51]),import.meta.url),"./src/common/components/item-list/ItemList.stories.tsx":async()=>t(()=>import("./ItemList.stories-AYPGQUIY.js"),__vite__mapDeps([52,1,2,4,13,11,7,8,17,53]),import.meta.url),"./src/common/components/language-toggle/LanguageToggle.stories.tsx":async()=>t(()=>import("./LanguageToggle.stories-qcZji_4V.js"),__vite__mapDeps([54,1,2,55,5,6,9,56,22,57]),import.meta.url),"./src/common/components/personkort/Personkort.stories.tsx":async()=>t(()=>import("./Personkort.stories-B6cowFvJ.js"),__vite__mapDeps([58,1,2,4,33,11,59]),import.meta.url),"./src/common/components/picture-scanning-guide/PictureScanningGuide.stories.tsx":async()=>t(()=>import("./PictureScanningGuide.stories-TeHxdAi-.js"),__vite__mapDeps([60,1,2,42,5,6,4,33,11,9,23,13,43]),import.meta.url),"./src/common/components/progress-stepper/ProgressStepper.stories.tsx":async()=>t(()=>import("./ProgressStepper.stories-B73ryV_i.js"),__vite__mapDeps([61,1,2,62,17,33,11,21,22,56,34,63]),import.meta.url),"./src/common/components/sidebanner/Sidebanner.stories.tsx":async()=>t(()=>import("./Sidebanner.stories-BTmXm2QG.js"),__vite__mapDeps([64,1,2,4,28,29,11,12,33,65]),import.meta.url),"./src/common/components/sirkelmaske/Sirkelmaske.stories.tsx":async()=>t(()=>import("./Sirkelmaske.stories-BfllT3hy.js"),__vite__mapDeps([66,1,2,49,4,50]),import.meta.url),"./src/common/components/step/Step.stories.tsx":async()=>t(()=>import("./Step.stories-BjZWz28N.js"),__vite__mapDeps([67,1,2,19,20,4,5,6,9,25,26,33,11,28,29,32,34,12,10,35,62,17,21,22,56,63,68]),import.meta.url),"./src/common/components/utvidet-informasjon/UtvidetInformasjon.stories.tsx":async()=>t(()=>import("./UtvidetInformasjon.stories-CBT63OKF.js"),__vite__mapDeps([69,1,2,17,44,11,33,34,35,70]),import.meta.url)};async function T(o){return L[o]()}const{composeConfigs:I,PreviewWeb:P,ClientApi:v}=__STORYBOOK_MODULE_PREVIEW_API__,y=async(o=[])=>{const i=await Promise.all([o.at(0)??t(()=>import("./entry-preview-B4L7F0XH.js"),__vite__mapDeps([71,2,72,20]),import.meta.url),o.at(1)??t(()=>import("./entry-preview-docs-BU4ZYpeM.js"),__vite__mapDeps([73,74,2,55,75]),import.meta.url),o.at(2)??t(()=>import("./preview-TCN6m6T-.js"),__vite__mapDeps([76,77]),import.meta.url),o.at(3)??t(()=>import("./preview-CQkghMgs.js"),__vite__mapDeps([]),import.meta.url),o.at(4)??t(()=>import("./preview-Ct5NkTJf.js"),__vite__mapDeps([]),import.meta.url),o.at(5)??t(()=>import("./preview-CwqMn10d.js"),__vite__mapDeps([78,75]),import.meta.url),o.at(6)??t(()=>import("./preview-B4GcaC1c.js"),__vite__mapDeps([]),import.meta.url),o.at(7)??t(()=>import("./preview-Db4Idchh.js"),__vite__mapDeps([]),import.meta.url),o.at(8)??t(()=>import("./preview-BAz7FMXc.js"),__vite__mapDeps([79,75]),import.meta.url),o.at(9)??t(()=>import("./preview-BpcF_O6y.js"),__vite__mapDeps([]),import.meta.url),o.at(10)??t(()=>import("./preview-BcrGd3F6.js"),__vite__mapDeps([]),import.meta.url),o.at(11)??t(()=>import("./preview-BBi6U-TY.js"),__vite__mapDeps([80,5,6,2]),import.meta.url),o.at(12)??t(()=>import("./preview-Dm8dZFto.js"),__vite__mapDeps([81,82]),import.meta.url)]);return I(i)};window.__STORYBOOK_PREVIEW__=window.__STORYBOOK_PREVIEW__||new P(T,y);window.__STORYBOOK_STORY_STORE__=window.__STORYBOOK_STORY_STORE__||window.__STORYBOOK_PREVIEW__.storyStore;export{t as _};
