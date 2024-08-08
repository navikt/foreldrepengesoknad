import{j as a}from"./jsx-runtime-Cw0GR0a5.js";import{v as x}from"./v4-CQkTLCs1.js";import{c as R,Q as A,h,H as k,a as F}from"./MinidialogSkjema-ChzwQn0o.js";import"./Link-CmiG7tQS.js";import{Y as T}from"./Ytelse-BZ32TLaq.js";import"./index-CTjT7uj6.js";import"./CalendarLabel-D60lGM6n.js";import"./tslib.es6-CMwweBXX.js";import"./index-BRV0Se7Z.js";import"./index-9r8iugjR.js";const{addons:M}=__STORYBOOK_MODULE_PREVIEW_API__,{global:u}=__STORYBOOK_MODULE_GLOBAL__,{ImplicitActionsDuringRendering:Y}=__STORYBOOK_MODULE_CORE_EVENTS_PREVIEW_ERRORS__;var L="storybook/actions",V=`${L}/action-event`,B={depth:10,clearOnStoryChange:!0,limit:50},v=(e,t)=>{let n=Object.getPrototypeOf(e);return!n||t(n)?n:v(n,t)},Q=e=>!!(typeof e=="object"&&e&&v(e,t=>/^Synthetic(?:Base)?Event$/.test(t.constructor.name))&&typeof e.persist=="function"),N=e=>{if(Q(e)){let t=Object.create(e.constructor.prototype,Object.getOwnPropertyDescriptors(e));t.persist();let n=Object.getOwnPropertyDescriptor(t,"view"),r=n==null?void 0:n.value;return typeof r=="object"&&(r==null?void 0:r.constructor.name)==="Window"&&Object.defineProperty(t,"view",{...n,value:Object.create(r.constructor.prototype)}),t}return e},K=()=>typeof crypto=="object"&&typeof crypto.getRandomValues=="function"?x():Date.now().toString(36)+Math.random().toString(36).substring(2);function b(e,t={}){let n={...B,...t},r=function(...l){var p,c;if(t.implicit){let g=(p="__STORYBOOK_PREVIEW__"in u?u.__STORYBOOK_PREVIEW__:void 0)==null?void 0:p.storyRenders.find(s=>s.phase==="playing"||s.phase==="rendering");if(g){let s=!((c=window==null?void 0:window.FEATURES)!=null&&c.disallowImplicitActionsInRenderV8),m=new Y({phase:g.phase,name:e,deprecated:s});if(s)console.warn(m);else throw m}}let j=M.getChannel(),P=K(),D=5,d=l.map(N),I=l.length>1?d:d[0],C={id:P,count:0,data:{name:e,args:I},options:{...n,maxDepth:D+(n.depth||3),allowFunction:n.allowFunction||!1}};j.emit(V,C)};return r.isAction=!0,r.implicit=t.implicit,r}const W=new A,te={title:"MinidialogSkjema",component:R},w=({send:e})=>a.jsx(F,{client:W,children:a.jsx("div",{style:{backgroundColor:"white",padding:"50px"},children:a.jsx(R,{ettersendelseErSendt:!1,isSendingEttersendelse:!1,minidialog:{dialogId:"1",opprettet:"2020-01-01",saksnr:"1"},ettersendelseError:void 0,onSubmit:e,sakstype:T.FORELDREPENGER})})}),i=w.bind({});i.args={send:b("button-click")};i.parameters={msw:{handlers:[h.post("/rest/storage/foreldrepenger/vedlegg",()=>new k(null,{status:200}))]}};const o=w.bind({});o.args={send:b("button-click")};o.parameters={msw:{handlers:[h.post("/rest/storage/foreldrepenger/vedlegg",()=>new k(null,{status:400}))]}};var E,O,_;i.parameters={...i.parameters,docs:{...(E=i.parameters)==null?void 0:E.docs,source:{originalSource:`({
  send
}) => {
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
}`,...(_=(O=i.parameters)==null?void 0:O.docs)==null?void 0:_.source}}};var y,f,S;o.parameters={...o.parameters,docs:{...(y=o.parameters)==null?void 0:y.docs,source:{originalSource:`({
  send
}) => {
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
}`,...(S=(f=o.parameters)==null?void 0:f.docs)==null?void 0:S.source}}};const ne=["SkalIkkeFeileOpplasting","SkalFeileOpplasting"];export{o as SkalFeileOpplasting,i as SkalIkkeFeileOpplasting,ne as __namedExportsOrder,te as default};
