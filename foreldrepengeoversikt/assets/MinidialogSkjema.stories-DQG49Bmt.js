import{j as a}from"./jsx-runtime-Cw0GR0a5.js";import{v as I}from"./v4-CQkTLCs1.js";import{Q as D,a as P}from"./useQuery-CY6KkctN.js";import{h as A,H as F}from"./index-C1uWNzPf.js";import{Y as x}from"./Ytelse-7td-ciMh.js";import{M as u}from"./MinidialogSkjema-DwKA6Y5S.js";import"./index-CTjT7uj6.js";import"./decorators-DP8eTBZN.js";import"./index-DnmOyZDY.js";import"./index-BD0lb3_z.js";import"./index-CYM-y3Gt.js";import"./index-BK5YD3Eg.js";import"./dates-DUtd6zgH.js";import"./VeiviserPage-C4GqGTMy.js";import"./links-BegG-28I.js";import"./Uttaksdagen-Bkz5oXqd.js";import"./VStack-DAdWZtn3.js";import"./Label-DI1hapHN.js";import"./useMergeRefs-Dg7ETiim.js";import"./message-CHiw6Zgx.js";import"./Alert-VUqTQ4T6.js";import"./composeEventHandlers-DeH74NdU.js";import"./useId-BFxX0aRd.js";import"./XMarkOctagonFill-BgBREcbx.js";import"./Link-DOX29Uo4.js";import"./ExclamationmarkTriangle-CrbIB9PM.js";import"./index-BRV0Se7Z.js";import"./colors-BgDiWhW9.js";import"./api-BmJ5658F.js";import"./ChevronDown-CjGECSJR.js";const{addons:T}=__STORYBOOK_MODULE_PREVIEW_API__,{global:O}=__STORYBOOK_MODULE_GLOBAL__,{ImplicitActionsDuringRendering:V}=__STORYBOOK_MODULE_CORE_EVENTS_PREVIEW_ERRORS__;var Y="storybook/actions",B=`${Y}/action-event`,C={depth:10,clearOnStoryChange:!0,limit:50},h=(e,t)=>{let r=Object.getPrototypeOf(e);return!r||t(r)?r:h(r,t)},L=e=>!!(typeof e=="object"&&e&&h(e,t=>/^Synthetic(?:Base)?Event$/.test(t.constructor.name))&&typeof e.persist=="function"),M=e=>{if(L(e)){let t=Object.create(e.constructor.prototype,Object.getOwnPropertyDescriptors(e));t.persist();let r=Object.getOwnPropertyDescriptor(t,"view"),o=r==null?void 0:r.value;return typeof o=="object"&&(o==null?void 0:o.constructor.name)==="Window"&&Object.defineProperty(t,"view",{...r,value:Object.create(o.constructor.prototype)}),t}return e},K=()=>typeof crypto=="object"&&typeof crypto.getRandomValues=="function"?I():Date.now().toString(36)+Math.random().toString(36).substring(2);function N(e,t={}){let r={...C,...t},o=function(...p){var c,m;if(t.implicit){let d=(c="__STORYBOOK_PREVIEW__"in O?O.__STORYBOOK_PREVIEW__:void 0)==null?void 0:c.storyRenders.find(n=>n.phase==="playing"||n.phase==="rendering");if(d){let n=!((m=window==null?void 0:window.FEATURES)!=null&&m.disallowImplicitActionsInRenderV8),g=new V({phase:d.phase,name:e,deprecated:n});if(n)console.warn(g);else throw g}}let k=T.getChannel(),w=K(),b=5,l=p.map(M),j=p.length>1?l:l[0],v={id:w,count:0,data:{name:e,args:j},options:{...r,maxDepth:b+(r.depth||3),allowFunction:r.allowFunction||!1}};k.emit(B,v)};return o.isAction=!0,o.implicit=t.implicit,o}const W=new D,Se={title:"MinidialogSkjema",component:u,render:e=>a.jsx(P,{client:W,children:a.jsx("div",{style:{backgroundColor:"white",padding:"50px"},children:a.jsx(u,{...e})})})},i={args:{onSubmit:N("button-click"),ettersendelseErSendt:!1,isSendingEttersendelse:!1,minidialog:{dialogId:"1",opprettet:"2020-01-01",saksnr:"1"},sakstype:x.FORELDREPENGER,ettersendelseError:void 0}},s={parameters:{msw:{handlers:[A.post("/rest/storage/foreldrepenger/vedlegg",()=>new F(null,{status:400}))]}},args:i.args};var E,_,f;i.parameters={...i.parameters,docs:{...(E=i.parameters)==null?void 0:E.docs,source:{originalSource:`{
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
}`,...(f=(_=i.parameters)==null?void 0:_.docs)==null?void 0:f.source}}};var R,S,y;s.parameters={...s.parameters,docs:{...(R=s.parameters)==null?void 0:R.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.post('/rest/storage/foreldrepenger/vedlegg', () => new HttpResponse(null, {
        status: 400
      }))]
    }
  },
  args: SkalIkkeFeileOpplasting.args
}`,...(y=(S=s.parameters)==null?void 0:S.docs)==null?void 0:y.source}}};const ye=["SkalIkkeFeileOpplasting","SkalFeileOpplasting"];export{s as SkalFeileOpplasting,i as SkalIkkeFeileOpplasting,ye as __namedExportsOrder,Se as default};
