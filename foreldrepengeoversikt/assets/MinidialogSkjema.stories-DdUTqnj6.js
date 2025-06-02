import{j as f}from"./jsx-runtime-D_zvdyIk.js";import{v as P}from"./v4-CtRu48qb.js";import{h as x,H as A}from"./index-D5WPyhm7.js";import{w as B}from"./withQueryClient-0RnYsr9w.js";import{M as R}from"./MinidialogSkjema-ilcJ_6nl.js";import"./decorators-Bnaor6Ku.js";import"./QueryClientProvider-DTI5uWLr.js";import"./index-DQLiH3RP.js";import"./index-Ctu3BZYE.js";import"./useQuery-Km81jHJP.js";import"./index-ClyUrrHr.js";import"./api-By2d6bGs.js";import"./UttaksdagenString-DRcuPL2E.js";import"./dates-efjv5HSM.js";import"./stringUtils-DGs1tyYX.js";import"./List-whWw6Hq_.js";import"./Label-DalfrUzn.js";import"./dateFormValidation-uVpLpohg.js";import"./useId-B11Gq5wf.js";import"./links-DDVAVa71.js";import"./VStack-C9FgvL9l.js";import"./message-DohILNTk.js";import"./Alert-CUjC6X8h.js";import"./Button-D10r1vdM.js";import"./composeEventHandlers-DeH74NdU.js";import"./useId-B7OrP95z.js";import"./Link-DV9K7ZBg.js";import"./File-Do6CElhQ.js";import"./HGrid-DUtYApPK.js";import"./HeartFill-DIEwTxty.js";import"./index-B8qOg7Wt.js";import"./index-CJPVTaBz.js";import"./chunk-D4RADZKF-BhdFhvqI.js";import"./ChevronDown-w7HrHItv.js";const{addons:M}=__STORYBOOK_MODULE_PREVIEW_API__,{ImplicitActionsDuringRendering:C}=__STORYBOOK_MODULE_CORE_EVENTS_PREVIEW_ERRORS__,{global:h}=__STORYBOOK_MODULE_GLOBAL__;var K=Object.defineProperty,F=(e,t)=>{for(var r in t)K(e,r,{get:t[r],enumerable:!0})},Y="storybook/actions",N=`${Y}/action-event`,V={depth:10,clearOnStoryChange:!0,limit:50},I=(e,t)=>{let r=Object.getPrototypeOf(e);return!r||t(r)?r:I(r,t)},U=e=>!!(typeof e=="object"&&e&&I(e,t=>/^Synthetic(?:Base)?Event$/.test(t.constructor.name))&&typeof e.persist=="function"),W=e=>{if(U(e)){let t=Object.create(e.constructor.prototype,Object.getOwnPropertyDescriptors(e));t.persist();let r=Object.getOwnPropertyDescriptor(t,"view"),n=r==null?void 0:r.value;return typeof n=="object"&&(n==null?void 0:n.constructor.name)==="Window"&&Object.defineProperty(t,"view",{...r,value:Object.create(n.constructor.prototype)}),t}return e},$=()=>typeof crypto=="object"&&typeof crypto.getRandomValues=="function"?P():Date.now().toString(36)+Math.random().toString(36).substring(2);function d(e,t={}){let r={...V,...t},n=function(...s){var _,O;if(t.implicit){let u=(_="__STORYBOOK_PREVIEW__"in h?h.__STORYBOOK_PREVIEW__:void 0)==null?void 0:_.storyRenders.find(p=>p.phase==="playing"||p.phase==="rendering");if(u){let p=!((O=globalThis==null?void 0:globalThis.FEATURES)!=null&&O.disallowImplicitActionsInRenderV8),E=new C({phase:u.phase,name:e,deprecated:p});if(p)console.warn(E);else throw E}}let o=M.getChannel(),i=$(),a=5,m=s.map(W),j=s.length>1?m:m[0],D={id:i,count:0,data:{name:e,args:j},options:{...r,maxDepth:a+(r.depth||3),allowFunction:r.allowFunction||!1}};o.emit(N,D)};return n.isAction=!0,n.implicit=t.implicit,n}const{definePreview:je}=__STORYBOOK_MODULE_PREVIEW_API__,{global:g}=__STORYBOOK_MODULE_GLOBAL__;var G={};F(G,{argsEnhancers:()=>Q,loaders:()=>J});var L=(e,t)=>typeof t[e]>"u"&&!(e in t),H=e=>{let{initialArgs:t,argTypes:r,id:n,parameters:{actions:s}}=e;if(!s||s.disable||!s.argTypesRegex||!r)return{};let o=new RegExp(s.argTypesRegex);return Object.entries(r).filter(([i])=>!!o.test(i)).reduce((i,[a,m])=>(L(a,t)&&(i[a]=d(a,{implicit:!0,id:n})),i),{})},z=e=>{let{initialArgs:t,argTypes:r,parameters:{actions:n}}=e;return n!=null&&n.disable||!r?{}:Object.entries(r).filter(([s,o])=>!!o.action).reduce((s,[o,i])=>(L(o,t)&&(s[o]=d(typeof i.action=="string"?i.action:o)),s),{})},Q=[z,H],S=!1,q=e=>{let{parameters:{actions:t}}=e;if(!(t!=null&&t.disable)&&!S&&"__STORYBOOK_TEST_ON_MOCK_CALL__"in g&&typeof g.__STORYBOOK_TEST_ON_MOCK_CALL__=="function"){let r=g.__STORYBOOK_TEST_ON_MOCK_CALL__;r((n,s)=>{let o=n.getMockName();o!=="spy"&&(!/^next\/.*::/.test(o)||["next/router::useRouter()","next/navigation::useRouter()","next/navigation::redirect","next/cache::","next/headers::cookies().set","next/headers::cookies().delete","next/headers::headers().set","next/headers::headers().delete"].some(i=>o.startsWith(i)))&&d(o)(s)}),S=!0}},J=[q];const De={title:"MinidialogSkjema",component:R,decorators:[B],render:e=>f.jsx("div",{style:{backgroundColor:"white",padding:"50px"},children:f.jsx(R,{...e})})},l={parameters:{msw:{handlers:[x.post(".//rest/storage/foreldrepenger/vedlegg",()=>new A(null,{status:200}))]}},args:{onSubmit:d("button-click"),ettersendelseErSendt:!1,isSendingEttersendelse:!1,minidialog:{dialogId:"1",opprettet:"2020-01-01",saksnr:"1"},sakstype:"FORELDREPENGER",ettersendelseError:void 0}},c={parameters:{msw:{handlers:[x.post(".//storage/foreldrepenger/vedlegg",()=>new A(null,{status:400}))]}},args:l.args};var y,v,b;l.parameters={...l.parameters,docs:{...(y=l.parameters)==null?void 0:y.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.post(\`\${import.meta.env.BASE_URL}/rest/storage/foreldrepenger/vedlegg\`, () => new HttpResponse(null, {
        status: 200
      }))]
    }
  },
  args: {
    onSubmit: action('button-click'),
    ettersendelseErSendt: false,
    isSendingEttersendelse: false,
    minidialog: {
      dialogId: '1',
      opprettet: '2020-01-01',
      saksnr: '1'
    },
    sakstype: 'FORELDREPENGER',
    ettersendelseError: undefined
  }
}`,...(b=(v=l.parameters)==null?void 0:v.docs)==null?void 0:b.source}}};var T,k,w;c.parameters={...c.parameters,docs:{...(T=c.parameters)==null?void 0:T.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.post(\`\${import.meta.env.BASE_URL}/storage/foreldrepenger/vedlegg\`, () => new HttpResponse(null, {
        status: 400
      }))]
    }
  },
  args: SkalIkkeFeileOpplasting.args
}`,...(w=(k=c.parameters)==null?void 0:k.docs)==null?void 0:w.source}}};const Pe=["SkalIkkeFeileOpplasting","SkalFeileOpplasting"];export{c as SkalFeileOpplasting,l as SkalIkkeFeileOpplasting,Pe as __namedExportsOrder,De as default};
