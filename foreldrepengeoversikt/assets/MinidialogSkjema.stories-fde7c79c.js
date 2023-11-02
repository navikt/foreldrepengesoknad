import{j as i}from"./index-896908b3.js";import{a as d}from"./chunk-AY7I2SME-331d03ca.js";import{M as u,a as E,I as S,Y as v}from"./IntlProvider-db7d5287.js";import"./index-7c191284.js";import{M as p,Q as y,a as f}from"./MinidialogSkjema-33fdb0e6.js";import"./v4-a960c1f4.js";import"./_baseToString-8992fead.js";import"./_createSet-409f46e6.js";import"./index-b3a39e30.js";const P=new y,h={title:"MinidialogSkjema",component:p},c=({skalFeileOpplasting:g,send:m})=>{const k=new u(E);return g||k.onPost("test/storage/vedlegg").reply(200),i.jsx(S,{locale:"nb",children:i.jsx(f,{client:P,children:i.jsx("div",{style:{backgroundColor:"white",padding:"50px"},children:i.jsx(p,{ettersendelseErSendt:!1,isSendingEttersendelse:!1,minidialog:{dialogId:"1",opprettet:"2020-01-01",saksnr:"1"},ettersendelseError:void 0,onSubmit:m,sakstype:v.FORELDREPENGER})})})})},e=c.bind({});e.args={send:d("button-click"),skalFeileOpplasting:!1};const t=c.bind({});t.args={send:d("button-click"),skalFeileOpplasting:!0};var r,s,n;e.parameters={...e.parameters,docs:{...(r=e.parameters)==null?void 0:r.docs,source:{originalSource:`({
  skalFeileOpplasting,
  send
}) => {
  const apiMock = new MockAdapter(attachmentApi);
  if (!skalFeileOpplasting) {
    apiMock.onPost('test/storage/vedlegg').reply(200);
  }
  return <IntlProvider locale="nb">
            <QueryClientProvider client={queryClient}>
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
            </QueryClientProvider>
        </IntlProvider>;
}`,...(n=(s=e.parameters)==null?void 0:s.docs)==null?void 0:n.source}}};var a,l,o;t.parameters={...t.parameters,docs:{...(a=t.parameters)==null?void 0:a.docs,source:{originalSource:`({
  skalFeileOpplasting,
  send
}) => {
  const apiMock = new MockAdapter(attachmentApi);
  if (!skalFeileOpplasting) {
    apiMock.onPost('test/storage/vedlegg').reply(200);
  }
  return <IntlProvider locale="nb">
            <QueryClientProvider client={queryClient}>
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
            </QueryClientProvider>
        </IntlProvider>;
}`,...(o=(l=t.parameters)==null?void 0:l.docs)==null?void 0:o.source}}};const w=["SkalIkkeFeileOpplasting","SkalFeileOpplasting"];export{t as SkalFeileOpplasting,e as SkalIkkeFeileOpplasting,w as __namedExportsOrder,h as default};
//# sourceMappingURL=MinidialogSkjema.stories-fde7c79c.js.map
