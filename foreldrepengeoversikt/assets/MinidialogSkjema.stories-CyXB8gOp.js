import{j as a}from"./jsx-runtime-DwRxq3ZX.js";import{v as P}from"./v4-CtRu48qb.js";import{Q as A}from"./useQuery-Bp3akpRK.js";import{h as y,H as w}from"./index-B-Pz4-0B.js";import{Y as F}from"./Ytelse-7td-ciMh.js";import{M as u}from"./MinidialogSkjema-DMRRV1I5.js";import{Q as x}from"./queryClient-Ch-PTZPr.js";import"./index-BX3iQpgp.js";import"./decorators-DIzpaN6C.js";import"./index-A4VDgvRX.js";import"./index-BwGdUlzO.js";import"./index-B1dLepta.js";import"./index-ByI1_y3g.js";import"./api-CuYAbk1P.js";import"./UttaksdagenString-Dd6xBUPd.js";import"./dates-TdbGqddN.js";import"./stringUtils-grKZaQiI.js";import"./skjemanummer-CsrY1khI.js";import"./dateFormValidation-CpTlqkG5.js";import"./links-Cq4ifjPA.js";import"./VStack-DCI-IWy0.js";import"./Label-sdGPuzAK.js";import"./useId-CmSpHSni.js";import"./message-8h7m8LF5.js";import"./Alert-DYj8gWus.js";import"./Button-CZavV0iI.js";import"./composeEventHandlers-BV8udL3-.js";import"./Link-6pYp3TYt.js";import"./File-B657A67O.js";import"./HGrid-VFl1Qdht.js";import"./ChevronDown-4_HeHalp.js";import"./useClientLayoutEffect-CDS5ZwQf.js";const{addons:B}=__STORYBOOK_MODULE_PREVIEW_API__,{ImplicitActionsDuringRendering:L}=__STORYBOOK_MODULE_CORE_EVENTS_PREVIEW_ERRORS__,{global:O}=__STORYBOOK_MODULE_GLOBAL__;var T="storybook/actions",V=`${T}/action-event`,Y={depth:10,clearOnStoryChange:!0,limit:50},k=(e,t)=>{let r=Object.getPrototypeOf(e);return!r||t(r)?r:k(r,t)},C=e=>!!(typeof e=="object"&&e&&k(e,t=>/^Synthetic(?:Base)?Event$/.test(t.constructor.name))&&typeof e.persist=="function"),M=e=>{if(C(e)){let t=Object.create(e.constructor.prototype,Object.getOwnPropertyDescriptors(e));t.persist();let r=Object.getOwnPropertyDescriptor(t,"view"),n=r==null?void 0:r.value;return typeof n=="object"&&(n==null?void 0:n.constructor.name)==="Window"&&Object.defineProperty(t,"view",{...r,value:Object.create(n.constructor.prototype)}),t}return e},U=()=>typeof crypto=="object"&&typeof crypto.getRandomValues=="function"?P():Date.now().toString(36)+Math.random().toString(36).substring(2);function $(e,t={}){let r={...Y,...t},n=function(...p){var m,c;if(t.implicit){let d=(m="__STORYBOOK_PREVIEW__"in O?O.__STORYBOOK_PREVIEW__:void 0)==null?void 0:m.storyRenders.find(o=>o.phase==="playing"||o.phase==="rendering");if(d){let o=!((c=window==null?void 0:window.FEATURES)!=null&&c.disallowImplicitActionsInRenderV8),g=new L({phase:d.phase,name:e,deprecated:o});if(o)console.warn(g);else throw g}}let v=B.getChannel(),b=U(),j=5,l=p.map(M),I=p.length>1?l:l[0],D={id:b,count:0,data:{name:e,args:I},options:{...r,maxDepth:j+(r.depth||3),allowFunction:r.allowFunction||!1}};v.emit(V,D)};return n.isAction=!0,n.implicit=t.implicit,n}const K=new x({defaultOptions:{queries:{retry:!1}}}),ye={title:"MinidialogSkjema",component:u,render:e=>a.jsx(A,{client:K,children:a.jsx("div",{style:{backgroundColor:"white",padding:"50px"},children:a.jsx(u,{...e})})})},s={parameters:{msw:{handlers:[y.post(".//rest/storage/foreldrepenger/vedlegg",()=>new w(null,{status:200}))]}},args:{onSubmit:$("button-click"),ettersendelseErSendt:!1,isSendingEttersendelse:!1,minidialog:{dialogId:"1",opprettet:"2020-01-01",saksnr:"1"},sakstype:F.FORELDREPENGER,ettersendelseError:void 0}},i={parameters:{msw:{handlers:[y.post(".//storage/foreldrepenger/vedlegg",()=>new w(null,{status:400}))]}},args:s.args};var f,E,_;s.parameters={...s.parameters,docs:{...(f=s.parameters)==null?void 0:f.docs,source:{originalSource:`{
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
    sakstype: Ytelse.FORELDREPENGER,
    ettersendelseError: undefined
  }
}`,...(_=(E=s.parameters)==null?void 0:E.docs)==null?void 0:_.source}}};var R,S,h;i.parameters={...i.parameters,docs:{...(R=i.parameters)==null?void 0:R.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.post(\`\${import.meta.env.BASE_URL}/storage/foreldrepenger/vedlegg\`, () => new HttpResponse(null, {
        status: 400
      }))]
    }
  },
  args: SkalIkkeFeileOpplasting.args
}`,...(h=(S=i.parameters)==null?void 0:S.docs)==null?void 0:h.source}}};const we=["SkalIkkeFeileOpplasting","SkalFeileOpplasting"];export{i as SkalFeileOpplasting,s as SkalIkkeFeileOpplasting,we as __namedExportsOrder,ye as default};
