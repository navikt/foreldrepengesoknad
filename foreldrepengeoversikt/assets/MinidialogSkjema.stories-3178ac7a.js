import{j as t}from"./index-8504a608.js";import{a as d}from"./chunk-AY7I2SME-331d03ca.js";import{M as u,a as E,Y as S}from"./attachmentApi-572f1152.js";import"./_baseToString-53b0dbb2.js";import{M as p,Q as y,a as f}from"./MinidialogSkjema-7dee08ac.js";import"./_createSet-a1fd5098.js";import"./index-b613d0ba.js";import"./v4-a960c1f4.js";const M=new y,R={title:"MinidialogSkjema",component:p},c=({skalFeileOpplasting:g,send:k})=>{const m=new u(E);return g||m.onPost("test/storage/vedlegg").reply(200),t.jsx(f,{client:M,children:t.jsx("div",{style:{backgroundColor:"white",padding:"50px"},children:t.jsx(p,{ettersendelseErSendt:!1,isSendingEttersendelse:!1,minidialog:{dialogId:"1",opprettet:"2020-01-01",saksnr:"1"},ettersendelseError:void 0,onSubmit:k,sakstype:S.FORELDREPENGER})})})},e=c.bind({});e.args={send:d("button-click"),skalFeileOpplasting:!1};const n=c.bind({});n.args={send:d("button-click"),skalFeileOpplasting:!0};var s,i,r;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`({
  skalFeileOpplasting,
  send
}) => {
  const apiMock = new MockAdapter(attachmentApi);
  if (!skalFeileOpplasting) {
    apiMock.onPost('test/storage/vedlegg').reply(200);
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
}`,...(r=(i=e.parameters)==null?void 0:i.docs)==null?void 0:r.source}}};var a,o,l;n.parameters={...n.parameters,docs:{...(a=n.parameters)==null?void 0:a.docs,source:{originalSource:`({
  skalFeileOpplasting,
  send
}) => {
  const apiMock = new MockAdapter(attachmentApi);
  if (!skalFeileOpplasting) {
    apiMock.onPost('test/storage/vedlegg').reply(200);
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
}`,...(l=(o=n.parameters)==null?void 0:o.docs)==null?void 0:l.source}}};const h=["SkalIkkeFeileOpplasting","SkalFeileOpplasting"];export{n as SkalFeileOpplasting,e as SkalIkkeFeileOpplasting,h as __namedExportsOrder,R as default};
//# sourceMappingURL=MinidialogSkjema.stories-3178ac7a.js.map
