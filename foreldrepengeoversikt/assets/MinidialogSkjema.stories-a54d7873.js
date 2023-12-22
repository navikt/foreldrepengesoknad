import{j as a}from"./index-8bdee205.js";import{I as A,v as F}from"./preview-errors-dde4324f.js";import{M as I,a as D,Y as C}from"./attachmentApi-236b3ff8.js";import"./index-1b03fe98.js";import{M as _,Q as x,a as T}from"./MinidialogSkjema-6d9cef5b.js";import"./index-f6b105ee.js";import"./index-6fd5a17b.js";import"./index-356e4a49.js";import"./_baseToString-128d9545.js";import"./_createSet-13e922ed.js";const{addons:Y}=__STORYBOOK_MODULE_PREVIEW_API__,{global:u}=__STORYBOOK_MODULE_GLOBAL__;var L="storybook/actions",Q=`${L}/action-event`,B={depth:10,clearOnStoryChange:!0,limit:50},h=(e,n)=>{let t=Object.getPrototypeOf(e);return!t||n(t)?t:h(t,n)},V=e=>!!(typeof e=="object"&&e&&h(e,n=>/^Synthetic(?:Base)?Event$/.test(n.constructor.name))&&typeof e.persist=="function"),N=e=>{if(V(e)){let n=Object.create(e.constructor.prototype,Object.getOwnPropertyDescriptors(e));n.persist();let t=Object.getOwnPropertyDescriptor(n,"view"),r=t==null?void 0:t.value;return typeof r=="object"&&(r==null?void 0:r.constructor.name)==="Window"&&Object.defineProperty(n,"view",{...t,value:Object.create(r.constructor.prototype)}),n}return e},G=()=>typeof crypto=="object"&&typeof crypto.getRandomValues=="function"?F():Date.now().toString(36)+Math.random().toString(36).substring(2);function v(e,n={}){let t={...B,...n},r=function(...l){var d,c;if(n.implicit){let g=(d="__STORYBOOK_PREVIEW__"in u?u.__STORYBOOK_PREVIEW__:void 0)==null?void 0:d.storyRenders.find(i=>i.phase==="playing"||i.phase==="rendering");if(g){let i=!((c=window==null?void 0:window.FEATURES)!=null&&c.disallowImplicitActionsInRenderV8),m=new A({phase:g.phase,name:e,deprecated:i});if(i)console.warn(m);else throw m}}let b=Y.getChannel(),P=G(),j=5,p=l.map(N),w=l.length>1?p:p[0],M={id:P,count:0,data:{name:e,args:w},options:{...t,maxDepth:j+(t.depth||3),allowFunction:t.allowFunction||!1}};b.emit(Q,M)};return r.isAction=!0,r}const K=new x,te={title:"MinidialogSkjema",component:_},R=({skalFeileOpplasting:e,send:n})=>{const t=new I(D);return e||t.onPost("test/storage/foreldrepenger/vedlegg").reply(200),a.jsx(T,{client:K,children:a.jsx("div",{style:{backgroundColor:"white",padding:"50px"},children:a.jsx(_,{ettersendelseErSendt:!1,isSendingEttersendelse:!1,minidialog:{dialogId:"1",opprettet:"2020-01-01",saksnr:"1"},ettersendelseError:void 0,onSubmit:n,sakstype:C.FORELDREPENGER})})})},o=R.bind({});o.args={send:v("button-click"),skalFeileOpplasting:!1};const s=R.bind({});s.args={send:v("button-click"),skalFeileOpplasting:!0};var O,y,f;o.parameters={...o.parameters,docs:{...(O=o.parameters)==null?void 0:O.docs,source:{originalSource:`({
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
}`,...(f=(y=o.parameters)==null?void 0:y.docs)==null?void 0:f.source}}};var k,E,S;s.parameters={...s.parameters,docs:{...(k=s.parameters)==null?void 0:k.docs,source:{originalSource:`({
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
}`,...(S=(E=s.parameters)==null?void 0:E.docs)==null?void 0:S.source}}};const ne=["SkalIkkeFeileOpplasting","SkalFeileOpplasting"];export{s as SkalFeileOpplasting,o as SkalIkkeFeileOpplasting,ne as __namedExportsOrder,te as default};
