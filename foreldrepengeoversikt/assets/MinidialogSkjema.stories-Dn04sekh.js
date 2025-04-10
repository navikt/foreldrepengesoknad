import{j as a}from"./jsx-runtime-CLpGMVip.js";import{v as P}from"./v4-CtRu48qb.js";import{Q as A}from"./useQuery-D4bRZ7iC.js";import{h as y,H as w}from"./index-B-Pz4-0B.js";import{M as u}from"./MinidialogSkjema-Bt6BEzsY.js";import{Q as F}from"./queryClient-DpQYMfvj.js";import"./index-CR__hKHy.js";import"./decorators-DIzpaN6C.js";import"./index-DjWdgH6H.js";import"./api-CV6oBBCk.js";import"./UttaksdagenString-DgzxJ_GZ.js";import"./dates-C5Vjd-yy.js";import"./stringUtils-xBoGBqui.js";import"./List-BF8Q7PNh.js";import"./Label-vuqQZ1tj.js";import"./dateFormValidation-D8SusLeJ.js";import"./useId-CID_lvh_.js";import"./links-B36SqOas.js";import"./VStack-BZkCtxmu.js";import"./message-CzTHpKKo.js";import"./Alert-BICRsfrW.js";import"./Button-DEopYVou.js";import"./composeEventHandlers-BV8udL3-.js";import"./Link-C1mNwB7b.js";import"./File-lmocubeF.js";import"./HGrid-Bpfn9h1_.js";import"./HeartFill-B9NHZhHv.js";import"./index-D2e_E8nu.js";import"./index-CtmzRm2p.js";import"./chunk-SYFQ2XB5-D9pMU80H.js";import"./ChevronDown-CtB47T9y.js";const{addons:x}=__STORYBOOK_MODULE_PREVIEW_API__,{ImplicitActionsDuringRendering:B}=__STORYBOOK_MODULE_CORE_EVENTS_PREVIEW_ERRORS__,{global:O}=__STORYBOOK_MODULE_GLOBAL__;var L="storybook/actions",T=`${L}/action-event`,V={depth:10,clearOnStoryChange:!0,limit:50},k=(e,t)=>{let r=Object.getPrototypeOf(e);return!r||t(r)?r:k(r,t)},C=e=>!!(typeof e=="object"&&e&&k(e,t=>/^Synthetic(?:Base)?Event$/.test(t.constructor.name))&&typeof e.persist=="function"),M=e=>{if(C(e)){let t=Object.create(e.constructor.prototype,Object.getOwnPropertyDescriptors(e));t.persist();let r=Object.getOwnPropertyDescriptor(t,"view"),n=r==null?void 0:r.value;return typeof n=="object"&&(n==null?void 0:n.constructor.name)==="Window"&&Object.defineProperty(t,"view",{...r,value:Object.create(n.constructor.prototype)}),t}return e},U=()=>typeof crypto=="object"&&typeof crypto.getRandomValues=="function"?P():Date.now().toString(36)+Math.random().toString(36).substring(2);function $(e,t={}){let r={...V,...t},n=function(...p){var m,c;if(t.implicit){let d=(m="__STORYBOOK_PREVIEW__"in O?O.__STORYBOOK_PREVIEW__:void 0)==null?void 0:m.storyRenders.find(o=>o.phase==="playing"||o.phase==="rendering");if(d){let o=!((c=window==null?void 0:window.FEATURES)!=null&&c.disallowImplicitActionsInRenderV8),g=new B({phase:d.phase,name:e,deprecated:o});if(o)console.warn(g);else throw g}}let v=x.getChannel(),b=U(),j=5,l=p.map(M),I=p.length>1?l:l[0],D={id:b,count:0,data:{name:e,args:I},options:{...r,maxDepth:j+(r.depth||3),allowFunction:r.allowFunction||!1}};v.emit(T,D)};return n.isAction=!0,n.implicit=t.implicit,n}const K=new F({defaultOptions:{queries:{retry:!1}}}),Se={title:"MinidialogSkjema",component:u,render:e=>a.jsx(A,{client:K,children:a.jsx("div",{style:{backgroundColor:"white",padding:"50px"},children:a.jsx(u,{...e})})})},s={parameters:{msw:{handlers:[y.post(".//rest/storage/foreldrepenger/vedlegg",()=>new w(null,{status:200}))]}},args:{onSubmit:$("button-click"),ettersendelseErSendt:!1,isSendingEttersendelse:!1,minidialog:{dialogId:"1",opprettet:"2020-01-01",saksnr:"1"},sakstype:"FORELDREPENGER",ettersendelseError:void 0}},i={parameters:{msw:{handlers:[y.post(".//storage/foreldrepenger/vedlegg",()=>new w(null,{status:400}))]}},args:s.args};var E,f,_;s.parameters={...s.parameters,docs:{...(E=s.parameters)==null?void 0:E.docs,source:{originalSource:`{
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
}`,...(_=(f=s.parameters)==null?void 0:f.docs)==null?void 0:_.source}}};var R,S,h;i.parameters={...i.parameters,docs:{...(R=i.parameters)==null?void 0:R.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.post(\`\${import.meta.env.BASE_URL}/storage/foreldrepenger/vedlegg\`, () => new HttpResponse(null, {
        status: 400
      }))]
    }
  },
  args: SkalIkkeFeileOpplasting.args
}`,...(h=(S=i.parameters)==null?void 0:S.docs)==null?void 0:h.source}}};const he=["SkalIkkeFeileOpplasting","SkalFeileOpplasting"];export{i as SkalFeileOpplasting,s as SkalIkkeFeileOpplasting,he as __namedExportsOrder,Se as default};
