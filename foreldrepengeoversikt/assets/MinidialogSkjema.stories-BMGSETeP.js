import{j as a}from"./index-4MA4FQk-.js";import{v as A}from"./v4-D8aEg3BZ.js";import{M as D,a as F}from"./attachmentApi-na9b4ku7.js";import"./index-BBkUAzwr.js";import{Y as I}from"./Ytelse-BM8k70hp.js";import{M as S,Q as C,a as x}from"./MinidialogSkjema-B7o8xCJm.js";import"./index-PqR-_bA4.js";import"./stepFooter-CRDOZNj7.js";import"./index-_4_hgnnR.js";import"./useControllableState-juGbKuZB.js";const{addons:T}=__STORYBOOK_MODULE_PREVIEW_API__,{global:u}=__STORYBOOK_MODULE_GLOBAL__,{ImplicitActionsDuringRendering:Y}=__STORYBOOK_MODULE_CORE_EVENTS_PREVIEW_ERRORS__;var L="storybook/actions",V=`${L}/action-event`,B={depth:10,clearOnStoryChange:!0,limit:50},R=(e,t)=>{let n=Object.getPrototypeOf(e);return!n||t(n)?n:R(n,t)},Q=e=>!!(typeof e=="object"&&e&&R(e,t=>/^Synthetic(?:Base)?Event$/.test(t.constructor.name))&&typeof e.persist=="function"),N=e=>{if(Q(e)){let t=Object.create(e.constructor.prototype,Object.getOwnPropertyDescriptors(e));t.persist();let n=Object.getOwnPropertyDescriptor(t,"view"),r=n==null?void 0:n.value;return typeof r=="object"&&(r==null?void 0:r.constructor.name)==="Window"&&Object.defineProperty(t,"view",{...n,value:Object.create(r.constructor.prototype)}),t}return e},K=()=>typeof crypto=="object"&&typeof crypto.getRandomValues=="function"?A():Date.now().toString(36)+Math.random().toString(36).substring(2);function h(e,t={}){let n={...B,...t},r=function(...l){var d,c;if(t.implicit){let g=(d="__STORYBOOK_PREVIEW__"in u?u.__STORYBOOK_PREVIEW__:void 0)==null?void 0:d.storyRenders.find(i=>i.phase==="playing"||i.phase==="rendering");if(g){let i=!((c=window==null?void 0:window.FEATURES)!=null&&c.disallowImplicitActionsInRenderV8),m=new Y({phase:g.phase,name:e,deprecated:i});if(i)console.warn(m);else throw m}}let b=T.getChannel(),P=K(),j=5,p=l.map(N),w=l.length>1?p:p[0],M={id:P,count:0,data:{name:e,args:w},options:{...n,maxDepth:j+(n.depth||3),allowFunction:n.allowFunction||!1}};b.emit(V,M)};return r.isAction=!0,r.implicit=t.implicit,r}const W=new C,te={title:"MinidialogSkjema",component:S},v=({skalFeileOpplasting:e,send:t})=>{const n=new D(F);return e||n.onPost("test/storage/foreldrepenger/vedlegg").reply(200),a.jsx(x,{client:W,children:a.jsx("div",{style:{backgroundColor:"white",padding:"50px"},children:a.jsx(S,{ettersendelseErSendt:!1,isSendingEttersendelse:!1,minidialog:{dialogId:"1",opprettet:"2020-01-01",saksnr:"1"},ettersendelseError:void 0,onSubmit:t,sakstype:I.FORELDREPENGER})})})},o=v.bind({});o.args={send:h("button-click"),skalFeileOpplasting:!1};const s=v.bind({});s.args={send:h("button-click"),skalFeileOpplasting:!0};var O,E,f;o.parameters={...o.parameters,docs:{...(O=o.parameters)==null?void 0:O.docs,source:{originalSource:`({
  skalFeileOpplasting,
  send
}) => {
  const apiMock = new MockAdapter(attachmentApi);
  if (!skalFeileOpplasting) {
    apiMock.onPost('test/storage/foreldrepenger/vedlegg').reply(200);
  }
  return <QueryClientProvider client={queryClient}>
            <div style={{
      backgroundColor: 'white',
      padding: '50px'
    }}>
                <MinidialogSkjema ettersendelseErSendt={false} isSendingEttersendelse={false} minidialog={{
        dialogId: '1',
        opprettet: '2020-01-01',
        saksnr: '1'
      }} ettersendelseError={undefined} onSubmit={send} sakstype={Ytelse.FORELDREPENGER} />
            </div>
        </QueryClientProvider>;
}`,...(f=(E=o.parameters)==null?void 0:E.docs)==null?void 0:f.source}}};var y,k,_;s.parameters={...s.parameters,docs:{...(y=s.parameters)==null?void 0:y.docs,source:{originalSource:`({
  skalFeileOpplasting,
  send
}) => {
  const apiMock = new MockAdapter(attachmentApi);
  if (!skalFeileOpplasting) {
    apiMock.onPost('test/storage/foreldrepenger/vedlegg').reply(200);
  }
  return <QueryClientProvider client={queryClient}>
            <div style={{
      backgroundColor: 'white',
      padding: '50px'
    }}>
                <MinidialogSkjema ettersendelseErSendt={false} isSendingEttersendelse={false} minidialog={{
        dialogId: '1',
        opprettet: '2020-01-01',
        saksnr: '1'
      }} ettersendelseError={undefined} onSubmit={send} sakstype={Ytelse.FORELDREPENGER} />
            </div>
        </QueryClientProvider>;
}`,...(_=(k=s.parameters)==null?void 0:k.docs)==null?void 0:_.source}}};const ne=["SkalIkkeFeileOpplasting","SkalFeileOpplasting"];export{s as SkalFeileOpplasting,o as SkalIkkeFeileOpplasting,ne as __namedExportsOrder,te as default};
