import"../sb-preview/runtime.js";(function(){const _=document.createElement("link").relList;if(_&&_.supports&&_.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))a(r);new MutationObserver(r=>{for(const e of r)if(e.type==="childList")for(const o of e.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&a(o)}).observe(document,{childList:!0,subtree:!0});function n(r){const e={};return r.integrity&&(e.integrity=r.integrity),r.referrerPolicy&&(e.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?e.credentials="include":r.crossOrigin==="anonymous"?e.credentials="omit":e.credentials="same-origin",e}function a(r){if(r.ep)return;r.ep=!0;const e=n(r);fetch(r.href,e)}})();const E="modulepreload",O=function(i,_){return new URL(i,_).href},m={},t=function(_,n,a){if(!n||n.length===0)return _();const r=document.getElementsByTagName("link");return Promise.all(n.map(e=>{if(e=O(e,a),e in m)return;m[e]=!0;const o=e.endsWith(".css"),p=o?'[rel="stylesheet"]':"";if(!!a)for(let c=r.length-1;c>=0;c--){const l=r[c];if(l.href===e&&(!o||l.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${e}"]${p}`))return;const s=document.createElement("link");if(s.rel=o?"stylesheet":E,o||(s.as="script",s.crossOrigin=""),s.href=e,document.head.appendChild(s),o)return new Promise((c,l)=>{s.addEventListener("load",c),s.addEventListener("error",()=>l(new Error(`Unable to preload CSS for ${e}`)))})})).then(()=>_()).catch(e=>{const o=new Event("vite:preloadError",{cancelable:!0});if(o.payload=e,window.dispatchEvent(o),!o.defaultPrevented)throw e})},{createBrowserChannel:d}=__STORYBOOK_MODULE_CHANNELS__,{addons:R}=__STORYBOOK_MODULE_PREVIEW_API__,u=d({page:"preview"});R.setChannel(u);window.__STORYBOOK_ADDONS_CHANNEL__=u;window.CONFIG_TYPE==="DEVELOPMENT"&&(window.__STORYBOOK_SERVER_CHANNEL__=u);const f={"./src/error/ErrorPage.stories.tsx":async()=>t(()=>import("./ErrorPage.stories-4998bcaf.js"),["./ErrorPage.stories-4998bcaf.js","./jsx-runtime-ffb262ed.js","./index-76fb7be0.js","./_commonjsHelpers-de833af9.js","./chunk-WFFRPTHA-a68c42c5.js","./preview-errors-dde4324f.js","./index-356e4a49.js","./index-ff53cee2.js","./links-88d1705c.js","./dates-3338231f.js","./ContentWrapper-8a64bb89.js","./dateUtils-2a257382.js","./ContentWrapper-d5e62a09.css","./UiIntlProvider-cfc5b246.js","./nn_NO-719bf87a.js","./provider-595edeb0.js","./VStack-1f325cf9.js","./Stack-730f96a9.js","./util-dafe5a09.js","./Heading-e9d60e26.js","./Alert-d2d04bae.js","./BodyLong-a5f7689e.js","./Button-db47fe0f.js","./composeEventHandlers-dd2474b2.js","./XMark-5e42b672.js","./BodyShort-0a33942c.js","./HStack-1aab31df.js","./Link-5f90fd81.js"],import.meta.url),"./src/fileUploader/FileUploader.stories.tsx":async()=>t(()=>import("./FileUploader.stories-7fcd8e40.js"),["./FileUploader.stories-7fcd8e40.js","./jsx-runtime-ffb262ed.js","./index-76fb7be0.js","./_commonjsHelpers-de833af9.js","./UiIntlProvider-cfc5b246.js","./index-ff53cee2.js","./nn_NO-719bf87a.js","./provider-595edeb0.js","./dateUtils-2a257382.js","./dates-3338231f.js","./Button-db47fe0f.js","./util-dafe5a09.js","./composeEventHandlers-dd2474b2.js","./XMark-5e42b672.js","./HStack-1aab31df.js","./Stack-730f96a9.js","./VStack-1f325cf9.js","./Link-5f90fd81.js","./Alert-d2d04bae.js","./BodyLong-a5f7689e.js","./FileUploader.stories-d652e24b.css"],import.meta.url),"./src/languageToggle/LanguageToggle.stories.tsx":async()=>t(()=>import("./LanguageToggle.stories-2c07c50c.js"),["./LanguageToggle.stories-2c07c50c.js","./jsx-runtime-ffb262ed.js","./index-76fb7be0.js","./_commonjsHelpers-de833af9.js","./index-9d475cdf.js","./index-ff53cee2.js","./UiIntlProvider-cfc5b246.js","./nn_NO-719bf87a.js","./provider-595edeb0.js","./ChevronDown-1905476b.js","./LanguageToggle.stories-69a491dd.css"],import.meta.url),"./src/scanDocumentInfo/ScanDocumentInfo.stories.tsx":async()=>t(()=>import("./ScanDocumentInfo.stories-7d377bec.js"),["./ScanDocumentInfo.stories-7d377bec.js","./jsx-runtime-ffb262ed.js","./index-76fb7be0.js","./_commonjsHelpers-de833af9.js","./index-ff53cee2.js","./links-88d1705c.js","./dates-3338231f.js","./UiIntlProvider-cfc5b246.js","./nn_NO-719bf87a.js","./provider-595edeb0.js","./useUiIntl-cb57dcdf.js","./util-dafe5a09.js","./BodyLong-a5f7689e.js","./ChevronDown-1905476b.js","./VStack-1f325cf9.js","./Stack-730f96a9.js","./Link-5f90fd81.js"],import.meta.url),"./src/step/StepButtons.stories.tsx":async()=>t(()=>import("./StepButtons.stories-10aa1a7c.js"),["./StepButtons.stories-10aa1a7c.js","./jsx-runtime-ffb262ed.js","./index-76fb7be0.js","./_commonjsHelpers-de833af9.js","./chunk-WFFRPTHA-a68c42c5.js","./preview-errors-dde4324f.js","./index-356e4a49.js","./index-ff53cee2.js","./UiIntlProvider-cfc5b246.js","./nn_NO-719bf87a.js","./provider-595edeb0.js","./HStack-1aab31df.js","./Stack-730f96a9.js","./util-dafe5a09.js","./Button-db47fe0f.js","./composeEventHandlers-dd2474b2.js"],import.meta.url),"./src/step/pageStep/Step.stories.tsx":async()=>t(()=>import("./Step.stories-cddfbaff.js"),["./Step.stories-cddfbaff.js","./jsx-runtime-ffb262ed.js","./index-76fb7be0.js","./_commonjsHelpers-de833af9.js","./dateUtils-2a257382.js","./dates-3338231f.js","./ProgressStepper-1d9698b2.js","./useUiIntl-cb57dcdf.js","./index-ff53cee2.js","./nn_NO-719bf87a.js","./ChevronDown-1905476b.js","./util-dafe5a09.js","./composeEventHandlers-dd2474b2.js","./BodyShort-0a33942c.js","./Heading-e9d60e26.js","./ProgressStepper-fbb6c9bc.css","./Banner-6609a60f.js","./Banner-977be5a0.css","./index-d3ea75b5.js","./Button-db47fe0f.js","./XMark-5e42b672.js","./BodyLong-a5f7689e.js","./VStack-1f325cf9.js","./Stack-730f96a9.js","./Step.stories-6a55e94f.css"],import.meta.url),"./src/step/pageStep/banner/Banner.stories.tsx":async()=>t(()=>import("./Banner.stories-87e82912.js"),["./Banner.stories-87e82912.js","./jsx-runtime-ffb262ed.js","./index-76fb7be0.js","./_commonjsHelpers-de833af9.js","./Banner-6609a60f.js","./dateUtils-2a257382.js","./dates-3338231f.js","./Banner-977be5a0.css"],import.meta.url),"./src/step/progressStepper/ProgressStepper.stories.tsx":async()=>t(()=>import("./ProgressStepper.stories-7be92041.js"),["./ProgressStepper.stories-7be92041.js","./jsx-runtime-ffb262ed.js","./index-76fb7be0.js","./_commonjsHelpers-de833af9.js","./ProgressStepper-1d9698b2.js","./useUiIntl-cb57dcdf.js","./index-ff53cee2.js","./nn_NO-719bf87a.js","./ChevronDown-1905476b.js","./util-dafe5a09.js","./composeEventHandlers-dd2474b2.js","./BodyShort-0a33942c.js","./Heading-e9d60e26.js","./ProgressStepper-fbb6c9bc.css"],import.meta.url),"./src/umyndig/Umyndig.stories.tsx":async()=>t(()=>import("./Umyndig.stories-101f1394.js"),["./Umyndig.stories-101f1394.js","./jsx-runtime-ffb262ed.js","./index-76fb7be0.js","./_commonjsHelpers-de833af9.js","./index-ff53cee2.js","./links-88d1705c.js","./dates-3338231f.js","./dateUtils-2a257382.js","./ContentWrapper-8a64bb89.js","./ContentWrapper-d5e62a09.css","./UiIntlProvider-cfc5b246.js","./nn_NO-719bf87a.js","./provider-595edeb0.js","./useUiIntl-cb57dcdf.js","./util-dafe5a09.js","./Button-db47fe0f.js","./composeEventHandlers-dd2474b2.js","./VStack-1f325cf9.js","./Stack-730f96a9.js","./Heading-e9d60e26.js","./HStack-1aab31df.js"],import.meta.url)};async function P(i){return f[i]()}const{composeConfigs:T,PreviewWeb:L,ClientApi:w}=__STORYBOOK_MODULE_PREVIEW_API__,I=async()=>{const i=await Promise.all([t(()=>import("./entry-preview-1f5c28fc.js"),["./entry-preview-1f5c28fc.js","./index-76fb7be0.js","./_commonjsHelpers-de833af9.js","./react-18-988a5df2.js","./index-d3ea75b5.js"],import.meta.url),t(()=>import("./entry-preview-docs-70a7bd42.js"),["./entry-preview-docs-70a7bd42.js","./_getPrototype-1e53b583.js","./_commonjsHelpers-de833af9.js","./index-9d475cdf.js","./index-356e4a49.js","./index-76fb7be0.js"],import.meta.url),t(()=>import("./preview-73104b77.js"),["./preview-73104b77.js","./index-11d98b33.js"],import.meta.url),t(()=>import("./preview-6406e811.js"),[],import.meta.url),t(()=>import("./preview-77a968f3.js"),["./preview-77a968f3.js","./preview-errors-dde4324f.js","./index-356e4a49.js"],import.meta.url),t(()=>import("./preview-30b54f76.js"),["./preview-30b54f76.js","./index-356e4a49.js"],import.meta.url),t(()=>import("./preview-c56bf6ac.js"),[],import.meta.url),t(()=>import("./preview-da31036b.js"),["./preview-da31036b.js","./index-356e4a49.js"],import.meta.url),t(()=>import("./preview-0ef86afd.js"),[],import.meta.url),t(()=>import("./preview-21802b0a.js"),["./preview-21802b0a.js","./_commonjsHelpers-de833af9.js"],import.meta.url),t(()=>import("./preview-dc4e77b5.js"),["./preview-dc4e77b5.js","./index-ff53cee2.js","./index-76fb7be0.js","./_commonjsHelpers-de833af9.js","./provider-595edeb0.js"],import.meta.url),t(()=>import("./preview-8fea90e6.js"),["./preview-8fea90e6.js","./jsx-runtime-ffb262ed.js","./index-76fb7be0.js","./_commonjsHelpers-de833af9.js","./index-ff53cee2.js","./preview-f4bc5bbd.css"],import.meta.url)]);return T(i)};window.__STORYBOOK_PREVIEW__=window.__STORYBOOK_PREVIEW__||new L;window.__STORYBOOK_STORY_STORE__=window.__STORYBOOK_STORY_STORE__||window.__STORYBOOK_PREVIEW__.storyStore;window.__STORYBOOK_CLIENT_API__=window.__STORYBOOK_CLIENT_API__||new w({storyStore:window.__STORYBOOK_PREVIEW__.storyStore});window.__STORYBOOK_PREVIEW__.initialize({importFn:P,getProjectAnnotations:I});export{t as _};
