import{j as g}from"./jsx-runtime-CLpGMVip.js";import{v as A}from"./v4-CtRu48qb.js";import{h as y,H as w}from"./index-B-Pz4-0B.js";import{w as P}from"./withQueryClient-D8gqxQ_c.js";import{M as u}from"./MinidialogSkjema-CBbdP5f7.js";import"./decorators-DIzpaN6C.js";import"./QueryClientProvider-XbgLbB-5.js";import"./index-CR__hKHy.js";import"./index-46qmyZAO.js";import"./useQuery-B2xbgnn4.js";import"./index-3B3qaQUl.js";import"./api-CV6oBBCk.js";import"./UttaksdagenString-DgzxJ_GZ.js";import"./dates-C5Vjd-yy.js";import"./stringUtils-xBoGBqui.js";import"./List-BF8Q7PNh.js";import"./Label-vuqQZ1tj.js";import"./dateFormValidation-x5iRbVaJ.js";import"./useId-CID_lvh_.js";import"./links-B36SqOas.js";import"./VStack-BZkCtxmu.js";import"./message-BHI3Qds1.js";import"./Alert-CDkKqNcv.js";import"./Button-0HoN0soU.js";import"./composeEventHandlers-BV8udL3-.js";import"./Link-C1mNwB7b.js";import"./File-lmocubeF.js";import"./HGrid-Bpfn9h1_.js";import"./HeartFill-B9NHZhHv.js";import"./index-D2e_E8nu.js";import"./index-CtmzRm2p.js";import"./chunk-SYFQ2XB5-D9pMU80H.js";import"./ChevronDown-CtB47T9y.js";const{addons:F}=__STORYBOOK_MODULE_PREVIEW_API__,{ImplicitActionsDuringRendering:B}=__STORYBOOK_MODULE_CORE_EVENTS_PREVIEW_ERRORS__,{global:O}=__STORYBOOK_MODULE_GLOBAL__;var L="storybook/actions",T=`${L}/action-event`,x={depth:10,clearOnStoryChange:!0,limit:50},k=(e,t)=>{let r=Object.getPrototypeOf(e);return!r||t(r)?r:k(r,t)},V=e=>!!(typeof e=="object"&&e&&k(e,t=>/^Synthetic(?:Base)?Event$/.test(t.constructor.name))&&typeof e.persist=="function"),M=e=>{if(V(e)){let t=Object.create(e.constructor.prototype,Object.getOwnPropertyDescriptors(e));t.persist();let r=Object.getOwnPropertyDescriptor(t,"view"),n=r==null?void 0:r.value;return typeof n=="object"&&(n==null?void 0:n.constructor.name)==="Window"&&Object.defineProperty(t,"view",{...r,value:Object.create(n.constructor.prototype)}),t}return e},U=()=>typeof crypto=="object"&&typeof crypto.getRandomValues=="function"?A():Date.now().toString(36)+Math.random().toString(36).substring(2);function $(e,t={}){let r={...x,...t},n=function(...a){var l,m;if(t.implicit){let c=(l="__STORYBOOK_PREVIEW__"in O?O.__STORYBOOK_PREVIEW__:void 0)==null?void 0:l.storyRenders.find(o=>o.phase==="playing"||o.phase==="rendering");if(c){let o=!((m=window==null?void 0:window.FEATURES)!=null&&m.disallowImplicitActionsInRenderV8),d=new B({phase:c.phase,name:e,deprecated:o});if(o)console.warn(d);else throw d}}let v=F.getChannel(),b=U(),I=5,p=a.map(M),j=a.length>1?p:p[0],D={id:b,count:0,data:{name:e,args:j},options:{...r,maxDepth:I+(r.depth||3),allowFunction:r.allowFunction||!1}};v.emit(T,D)};return n.isAction=!0,n.implicit=t.implicit,n}const Se={title:"MinidialogSkjema",component:u,decorators:[P],render:e=>g.jsx("div",{style:{backgroundColor:"white",padding:"50px"},children:g.jsx(u,{...e})})},s={parameters:{msw:{handlers:[y.post(".//rest/storage/foreldrepenger/vedlegg",()=>new w(null,{status:200}))]}},args:{onSubmit:$("button-click"),ettersendelseErSendt:!1,isSendingEttersendelse:!1,minidialog:{dialogId:"1",opprettet:"2020-01-01",saksnr:"1"},sakstype:"FORELDREPENGER",ettersendelseError:void 0}},i={parameters:{msw:{handlers:[y.post(".//storage/foreldrepenger/vedlegg",()=>new w(null,{status:400}))]}},args:s.args};var E,_,f;s.parameters={...s.parameters,docs:{...(E=s.parameters)==null?void 0:E.docs,source:{originalSource:`{
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
}`,...(f=(_=s.parameters)==null?void 0:_.docs)==null?void 0:f.source}}};var R,S,h;i.parameters={...i.parameters,docs:{...(R=i.parameters)==null?void 0:R.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.post(\`\${import.meta.env.BASE_URL}/storage/foreldrepenger/vedlegg\`, () => new HttpResponse(null, {
        status: 400
      }))]
    }
  },
  args: SkalIkkeFeileOpplasting.args
}`,...(h=(S=i.parameters)==null?void 0:S.docs)==null?void 0:h.source}}};const he=["SkalIkkeFeileOpplasting","SkalFeileOpplasting"];export{i as SkalFeileOpplasting,s as SkalIkkeFeileOpplasting,he as __namedExportsOrder,Se as default};
