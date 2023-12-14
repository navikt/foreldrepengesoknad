import{j as t}from"./index-6ce9b389.js";import{a as d}from"./chunk-AY7I2SME-331d03ca.js";import{M as u,a as E,Y as f}from"./attachmentApi-a85e263b.js";import"./_baseToString-53b0dbb2.js";import{M as p,Q as S,a as y}from"./MinidialogSkjema-0c26236f.js";import"./_createSet-a1fd5098.js";import"./index-b613d0ba.js";import"./v4-a960c1f4.js";const M=new S,R={title:"MinidialogSkjema",component:p},c=({skalFeileOpplasting:g,send:k})=>{const m=new u(E);return g||m.onPost("test/storage/foreldrepenger/vedlegg").reply(200),t.jsx(y,{client:M,children:t.jsx("div",{style:{backgroundColor:"white",padding:"50px"},children:t.jsx(p,{ettersendelseErSendt:!1,isSendingEttersendelse:!1,minidialog:{dialogId:"1",opprettet:"2020-01-01",saksnr:"1"},ettersendelseError:void 0,onSubmit:k,sakstype:f.FORELDREPENGER})})})},e=c.bind({});e.args={send:d("button-click"),skalFeileOpplasting:!1};const n=c.bind({});n.args={send:d("button-click"),skalFeileOpplasting:!0};var r,s,i;e.parameters={...e.parameters,docs:{...(r=e.parameters)==null?void 0:r.docs,source:{originalSource:`({
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
}`,...(i=(s=e.parameters)==null?void 0:s.docs)==null?void 0:i.source}}};var a,o,l;n.parameters={...n.parameters,docs:{...(a=n.parameters)==null?void 0:a.docs,source:{originalSource:`({
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
}`,...(l=(o=n.parameters)==null?void 0:o.docs)==null?void 0:l.source}}};const h=["SkalIkkeFeileOpplasting","SkalFeileOpplasting"];export{n as SkalFeileOpplasting,e as SkalIkkeFeileOpplasting,h as __namedExportsOrder,R as default};
//# sourceMappingURL=MinidialogSkjema.stories-3703ec47.js.map
