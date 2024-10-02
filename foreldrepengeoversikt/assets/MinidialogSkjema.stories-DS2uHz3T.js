import{j as a}from"./jsx-runtime-Cw0GR0a5.js";import{v as P}from"./v4-CQkTLCs1.js";import{Q as A,a as F}from"./useQuery-D_fvW0PL.js";import{h as S,H as w}from"./index-Ey0twAil.js";import{Y as x}from"./Ytelse-7td-ciMh.js";import{M as u}from"./MinidialogSkjema-8_Xkr-hK.js";import"./index-CTjT7uj6.js";import"./decorators-86JrGkCj.js";import"./index-BdgkEI3a.js";import"./index-Cn00N9t0.js";import"./index-vZN_Bsf0.js";import"./index-DOF3ycNb.js";import"./dates-CTHUhP43.js";import"./VeiviserPage-DtLnhV2B.js";import"./links-BegG-28I.js";import"./Uttaksdagen-DdeI22r2.js";import"./bemUtils-DmNyTjfb.js";import"./index-CCQ3W5xA.js";import"./VStack-Dvme46cy.js";import"./Label-BeJqMiuK.js";import"./useMergeRefs-Dg7ETiim.js";import"./message-AOa8Q-86.js";import"./Alert-CUYZmdUX.js";import"./Button-DnTWC_fD.js";import"./composeEventHandlers-DeH74NdU.js";import"./useId-BFxX0aRd.js";import"./XMarkOctagonFill-BgBREcbx.js";import"./Link-gwHVuC8x.js";import"./ExclamationmarkTriangle-CrbIB9PM.js";import"./index-BRV0Se7Z.js";import"./colors-BgDiWhW9.js";import"./api-DZHAPXBN.js";import"./ChevronDown-CjGECSJR.js";const{addons:T}=__STORYBOOK_MODULE_PREVIEW_API__,{ImplicitActionsDuringRendering:V}=__STORYBOOK_MODULE_CORE_EVENTS_PREVIEW_ERRORS__,{global:O}=__STORYBOOK_MODULE_GLOBAL__;var Y="storybook/actions",B=`${Y}/action-event`,C={depth:10,clearOnStoryChange:!0,limit:50},k=(e,t)=>{let r=Object.getPrototypeOf(e);return!r||t(r)?r:k(r,t)},L=e=>!!(typeof e=="object"&&e&&k(e,t=>/^Synthetic(?:Base)?Event$/.test(t.constructor.name))&&typeof e.persist=="function"),M=e=>{if(L(e)){let t=Object.create(e.constructor.prototype,Object.getOwnPropertyDescriptors(e));t.persist();let r=Object.getOwnPropertyDescriptor(t,"view"),n=r==null?void 0:r.value;return typeof n=="object"&&(n==null?void 0:n.constructor.name)==="Window"&&Object.defineProperty(t,"view",{...r,value:Object.create(n.constructor.prototype)}),t}return e},K=()=>typeof crypto=="object"&&typeof crypto.getRandomValues=="function"?P():Date.now().toString(36)+Math.random().toString(36).substring(2);function N(e,t={}){let r={...C,...t},n=function(...p){var m,c;if(t.implicit){let d=(m="__STORYBOOK_PREVIEW__"in O?O.__STORYBOOK_PREVIEW__:void 0)==null?void 0:m.storyRenders.find(o=>o.phase==="playing"||o.phase==="rendering");if(d){let o=!((c=window==null?void 0:window.FEATURES)!=null&&c.disallowImplicitActionsInRenderV8),g=new V({phase:d.phase,name:e,deprecated:o});if(o)console.warn(g);else throw g}}let v=T.getChannel(),b=K(),j=5,l=p.map(M),I=p.length>1?l:l[0],D={id:b,count:0,data:{name:e,args:I},options:{...r,maxDepth:j+(r.depth||3),allowFunction:r.allowFunction||!1}};v.emit(B,D)};return n.isAction=!0,n.implicit=t.implicit,n}const W=new A({defaultOptions:{queries:{retry:!1}}}),we={title:"MinidialogSkjema",component:u,render:e=>a.jsx(F,{client:W,children:a.jsx("div",{style:{backgroundColor:"white",padding:"50px"},children:a.jsx(u,{...e})})})},s={parameters:{msw:{handlers:[S.post("/rest/storage/foreldrepenger/vedlegg",()=>new w(null,{status:200}))]}},args:{onSubmit:N("button-click"),ettersendelseErSendt:!1,isSendingEttersendelse:!1,minidialog:{dialogId:"1",opprettet:"2020-01-01",saksnr:"1"},sakstype:x.FORELDREPENGER,ettersendelseError:void 0}},i={parameters:{msw:{handlers:[S.post("/rest/storage/foreldrepenger/vedlegg",()=>new w(null,{status:400}))]}},args:s.args};var E,f,_;s.parameters={...s.parameters,docs:{...(E=s.parameters)==null?void 0:E.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.post('/rest/storage/foreldrepenger/vedlegg', () => new HttpResponse(null, {
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
}`,...(_=(f=s.parameters)==null?void 0:f.docs)==null?void 0:_.source}}};var R,h,y;i.parameters={...i.parameters,docs:{...(R=i.parameters)==null?void 0:R.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.post('/rest/storage/foreldrepenger/vedlegg', () => new HttpResponse(null, {
        status: 400
      }))]
    }
  },
  args: SkalIkkeFeileOpplasting.args
}`,...(y=(h=i.parameters)==null?void 0:h.docs)==null?void 0:y.source}}};const ke=["SkalIkkeFeileOpplasting","SkalFeileOpplasting"];export{i as SkalFeileOpplasting,s as SkalIkkeFeileOpplasting,ke as __namedExportsOrder,we as default};
