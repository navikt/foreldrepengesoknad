function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["./BlueHeading.stories-km8L0m8r.js","./jsx-runtime-_e34SzbC.js","./index-DVXBtNgz.js","./Box-DGewKQma.js","./clsx-B-dksMZM.js","./css-CqApuV4H.js","./BluePanel.stories-C2GfgFs4.js","./BluePanel-5qABzW7j.css","./Infobox.stories-DGgZ11-C.js","./IconCircleWrapper-CeQHx7qZ.js","./IconCircleWrapper-C1ru260F.css","./VStack-DuVb4WaD.js","./Label-Cf_oUe96.js","./useId-DbilmxAP.js","./Infobox-CvY16JU_.css","./Calendar.stories-BR-JGBob.js","./colors-BgDiWhW9.js","./dates-BztWV_n-.js","./dayjs.min-Dkhc0ShP.js","./isoWeek-D9jlLv__.js","./Calendar-BdN_5_0n.css","./CalendarLabel.stories-CWBJV11f.js","./ExclamationmarkTriangleFill-Bqw-89OU.js","./CalendarLabel-D-Z8uckm.css","./ErrorPage.stories-CEkLGOsX.js","./chunk-MZXVCX43-CM0pFb8Z.js","./v4-CQkTLCs1.js","./index-DSUmsmzI.js","./tslib.es6-BvlsdGqA.js","./links-F23LOZ2f.js","./ContentWrapper-D86ljj3G.js","./Uttaksdagen-4XRuHfYI.js","./ContentWrapper-CJjH-LCx.css","./message-DizMllxX.js","./Alert-CG-fu71n.js","./Button-toOuzPlM.js","./useId-D3p7EPog.js","./composeEventHandlers-DeH74NdU.js","./XMark-DZYhRAlK.js","./Link-CceVKQrV.js","./SimpleErrorPage.stories-DrmTu16_.js","./FileUploader.stories-D9oXI8tt.js","./FileUploader-vf9jN63v.css","./IconCircleWrapper.stories-CX984_LH.js","./LanguageToggle.stories-CjxmgR2m.js","./index-Dcs0RV0A.js","./ChevronDown-CcwFV5Ek.js","./LanguageToggle-Bdy2HrY-.css","./LanguageToggle.stories-m46OxP-T.js","./Page.stories-zzxqwEV5.js","./Page-TM_JkPWs.css","./ScanDocumentInfo.stories-DSSmNde2.js","./StepButtons.stories-CEBzSx15.js","./Step.stories-CBkPPR-R.js","./ProgressStepper-CvNVdLyP.js","./ProgressStepper-CIZ7VbN7.css","./Banner-CgjgqX-V.js","./Banner-CgG7fPzd.css","./index-Cbx7Fas8.js","./Step-BoFH1a3s.css","./Banner.stories-C5sT6l08.js","./ProgressStepper.stories-DkqHwUZK.js","./Umyndig.stories-Buy6yECR.js","./entry-preview-B4L7F0XH.js","./react-18-CPpMsYPv.js","./entry-preview-docs-BU4ZYpeM.js","./_getPrototype-DX4bYm8U.js","./index-DrFu-skq.js","./preview-TCN6m6T-.js","./index-DXimoRZY.js","./preview-CVycp9di.js","./preview-CwqMn10d.js","./preview-BAz7FMXc.js","./preview-DoXun6jl.js","./createIntl-B_y91coc.js","./preview-C96f0cOW.js","./preview-B6JZgCmC.css"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
import"../sb-preview/runtime.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const _ of e)if(_.type==="childList")for(const o of _.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function a(e){const _={};return e.integrity&&(_.integrity=e.integrity),e.referrerPolicy&&(_.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?_.credentials="include":e.crossOrigin==="anonymous"?_.credentials="omit":_.credentials="same-origin",_}function n(e){if(e.ep)return;e.ep=!0;const _=a(e);fetch(e.href,_)}})();const O="modulepreload",d=function(r,s){return new URL(r,s).href},u={},t=function(s,a,n){let e=Promise.resolve();if(a&&a.length>0){const _=document.getElementsByTagName("link");e=Promise.all(a.map(o=>{if(o=d(o,n),o in u)return;u[o]=!0;const c=o.endsWith(".css"),E=c?'[rel="stylesheet"]':"";if(!!n)for(let m=_.length-1;m>=0;m--){const l=_[m];if(l.href===o&&(!c||l.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${o}"]${E}`))return;const i=document.createElement("link");if(i.rel=c?"stylesheet":O,c||(i.as="script",i.crossOrigin=""),i.href=o,document.head.appendChild(i),c)return new Promise((m,l)=>{i.addEventListener("load",m),i.addEventListener("error",()=>l(new Error(`Unable to preload CSS for ${o}`)))})}))}return e.then(()=>s()).catch(_=>{const o=new Event("vite:preloadError",{cancelable:!0});if(o.payload=_,window.dispatchEvent(o),!o.defaultPrevented)throw _})},{createBrowserChannel:R}=__STORYBOOK_MODULE_CHANNELS__,{addons:T}=__STORYBOOK_MODULE_PREVIEW_API__,p=R({page:"preview"});T.setChannel(p);window.__STORYBOOK_ADDONS_CHANNEL__=p;window.CONFIG_TYPE==="DEVELOPMENT"&&(window.__STORYBOOK_SERVER_CHANNEL__=p);const f={"./src/boxes/BlueHeading.stories.tsx":async()=>t(()=>import("./BlueHeading.stories-km8L0m8r.js"),__vite__mapDeps([0,1,2,3,4,5]),import.meta.url),"./src/boxes/BluePanel.stories.tsx":async()=>t(()=>import("./BluePanel.stories-C2GfgFs4.js"),__vite__mapDeps([6,1,2,7]),import.meta.url),"./src/boxes/Infobox.stories.tsx":async()=>t(()=>import("./Infobox.stories-DGgZ11-C.js"),__vite__mapDeps([8,1,2,9,10,3,4,5,11,12,13,14]),import.meta.url),"./src/calendar/Calendar.stories.tsx":async()=>t(()=>import("./Calendar.stories-BR-JGBob.js"),__vite__mapDeps([15,1,2,16,17,18,19,3,4,5,12,20]),import.meta.url),"./src/calendar/label/CalendarLabel.stories.tsx":async()=>t(()=>import("./CalendarLabel.stories-CWBJV11f.js"),__vite__mapDeps([21,1,2,16,17,18,11,4,5,13,22,23]),import.meta.url),"./src/error/ErrorPage.stories.tsx":async()=>t(()=>import("./ErrorPage.stories-CEkLGOsX.js"),__vite__mapDeps([24,1,2,25,26,27,28,29,17,18,30,31,19,32,11,4,5,12,33,34,35,36,37,38,13,22,39,3]),import.meta.url),"./src/error/SimpleErrorPage.stories.tsx":async()=>t(()=>import("./SimpleErrorPage.stories-DrmTu16_.js"),__vite__mapDeps([40,1,2,27,28,30,31,18,19,17,32,3,4,5,11,13,12,33,35,36,37]),import.meta.url),"./src/fileUploader/FileUploader.stories.tsx":async()=>t(()=>import("./FileUploader.stories-D9oXI8tt.js"),__vite__mapDeps([41,1,2,27,28,31,18,19,17,35,4,36,12,37,13,33,11,5,39,38,34,22,42]),import.meta.url),"./src/iconCircle/IconCircleWrapper.stories.tsx":async()=>t(()=>import("./IconCircleWrapper.stories-CX984_LH.js"),__vite__mapDeps([43,1,2,9,10,13]),import.meta.url),"./src/languageToggle/LanguageToggle.stories.tsx":async()=>t(()=>import("./LanguageToggle.stories-CjxmgR2m.js"),__vite__mapDeps([44,1,2,45,27,28,33,46,13,47]),import.meta.url),"./src/languageToggleNew/LanguageToggle.stories.tsx":async()=>t(()=>import("./LanguageToggle.stories-m46OxP-T.js"),__vite__mapDeps([48,25,26,1,2,27,28,4,12,36,13,46,33]),import.meta.url),"./src/page/Page.stories.tsx":async()=>t(()=>import("./Page.stories-zzxqwEV5.js"),__vite__mapDeps([49,1,2,50]),import.meta.url),"./src/scanDocumentInfo/ScanDocumentInfo.stories.tsx":async()=>t(()=>import("./ScanDocumentInfo.stories-DSSmNde2.js"),__vite__mapDeps([51,1,2,27,28,29,17,18,4,12,46,13,33,11,5,39]),import.meta.url),"./src/step/StepButtons.stories.tsx":async()=>t(()=>import("./StepButtons.stories-CEBzSx15.js"),__vite__mapDeps([52,1,2,25,26,27,28,11,4,5,35,36,12,37,33,13]),import.meta.url),"./src/step/pageStep/Step.stories.tsx":async()=>t(()=>import("./Step.stories-CBkPPR-R.js"),__vite__mapDeps([53,1,2,31,18,19,17,54,27,28,12,4,46,13,37,55,56,57,58,35,36,38,11,5,59]),import.meta.url),"./src/step/pageStep/banner/Banner.stories.tsx":async()=>t(()=>import("./Banner.stories-C5sT6l08.js"),__vite__mapDeps([60,1,2,56,31,18,19,17,57]),import.meta.url),"./src/step/progressStepper/ProgressStepper.stories.tsx":async()=>t(()=>import("./ProgressStepper.stories-DkqHwUZK.js"),__vite__mapDeps([61,1,2,54,27,28,12,4,46,13,37,55]),import.meta.url),"./src/umyndig/Umyndig.stories.tsx":async()=>t(()=>import("./Umyndig.stories-Buy6yECR.js"),__vite__mapDeps([62,1,2,27,28,29,17,18,31,19,30,32,11,4,5,12,36,33,35,37,13]),import.meta.url)};async function L(r){return f[r]()}const{composeConfigs:P,PreviewWeb:g,ClientApi:V}=__STORYBOOK_MODULE_PREVIEW_API__,I=async(r=[])=>{const s=await Promise.all([r.at(0)??t(()=>import("./entry-preview-B4L7F0XH.js"),__vite__mapDeps([63,2,64,58]),import.meta.url),r.at(1)??t(()=>import("./entry-preview-docs-BU4ZYpeM.js"),__vite__mapDeps([65,66,2,45,67]),import.meta.url),r.at(2)??t(()=>import("./preview-TCN6m6T-.js"),__vite__mapDeps([68,69]),import.meta.url),r.at(3)??t(()=>import("./preview-DzIFFIQc.js"),__vite__mapDeps([]),import.meta.url),r.at(4)??t(()=>import("./preview-CVycp9di.js"),__vite__mapDeps([70,26]),import.meta.url),r.at(5)??t(()=>import("./preview-CwqMn10d.js"),__vite__mapDeps([71,67]),import.meta.url),r.at(6)??t(()=>import("./preview-B4GcaC1c.js"),__vite__mapDeps([]),import.meta.url),r.at(7)??t(()=>import("./preview-Db4Idchh.js"),__vite__mapDeps([]),import.meta.url),r.at(8)??t(()=>import("./preview-BAz7FMXc.js"),__vite__mapDeps([72,67]),import.meta.url),r.at(9)??t(()=>import("./preview-BpcF_O6y.js"),__vite__mapDeps([]),import.meta.url),r.at(10)??t(()=>import("./preview-BcrGd3F6.js"),__vite__mapDeps([]),import.meta.url),r.at(11)??t(()=>import("./preview-DoXun6jl.js"),__vite__mapDeps([73,27,28,2,74]),import.meta.url),r.at(12)??t(()=>import("./preview-C96f0cOW.js"),__vite__mapDeps([75,18,2,1,27,28,74,76]),import.meta.url)]);return P(s)};window.__STORYBOOK_PREVIEW__=window.__STORYBOOK_PREVIEW__||new g(L,I);window.__STORYBOOK_STORY_STORE__=window.__STORYBOOK_STORY_STORE__||window.__STORYBOOK_PREVIEW__.storyStore;export{t as _};
