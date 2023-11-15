import{j as s}from"./index-8504a608.js";import{M as c,a as m,Y as f}from"./attachmentApi-7e0da942.js";import"./_baseToString-53b0dbb2.js";import{E as i}from"./EttersendingPage-59c8fe5f.js";import"./_createSet-a1fd5098.js";import"./index-b613d0ba.js";import"./v4-a960c1f4.js";const j={title:"EttersendingPage",component:i},d=({skalFeileOpplasting:g})=>{const k=new c(m);return g||k.onPost("test/storage/vedlegg").reply(200),s.jsx("div",{style:{backgroundColor:"white",padding:"50px"},children:s.jsx(i,{saker:{engangsstønad:[{ytelse:f.ENGANGSSTØNAD,saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1}}],foreldrepenger:[],svangerskapspenger:[]}})})},e=d.bind({});e.args={skalFeileOpplasting:!1};const n=d.bind({});n.args={skalFeileOpplasting:!0};var a,t,r;e.parameters={...e.parameters,docs:{...(a=e.parameters)==null?void 0:a.docs,source:{originalSource:`({
  skalFeileOpplasting
}) => {
  const apiMock = new MockAdapter(attachmentApi);
  if (!skalFeileOpplasting) {
    apiMock.onPost('test/storage/vedlegg').reply(200);
  }
  return <div style={{
    backgroundColor: 'white',
    padding: '50px'
  }}>
            <EttersendingPage saker={{
      engangsstønad: [{
        ytelse: Ytelse.ENGANGSSTØNAD,
        saksnummer: '1',
        sakAvsluttet: false,
        gjelderAdopsjon: false,
        familiehendelse: {
          fødselsdato: '2020-01-01',
          antallBarn: 1
        }
      }],
      foreldrepenger: [],
      svangerskapspenger: []
    }} />
        </div>;
}`,...(r=(t=e.parameters)==null?void 0:t.docs)==null?void 0:r.source}}};var l,o,p;n.parameters={...n.parameters,docs:{...(l=n.parameters)==null?void 0:l.docs,source:{originalSource:`({
  skalFeileOpplasting
}) => {
  const apiMock = new MockAdapter(attachmentApi);
  if (!skalFeileOpplasting) {
    apiMock.onPost('test/storage/vedlegg').reply(200);
  }
  return <div style={{
    backgroundColor: 'white',
    padding: '50px'
  }}>
            <EttersendingPage saker={{
      engangsstønad: [{
        ytelse: Ytelse.ENGANGSSTØNAD,
        saksnummer: '1',
        sakAvsluttet: false,
        gjelderAdopsjon: false,
        familiehendelse: {
          fødselsdato: '2020-01-01',
          antallBarn: 1
        }
      }],
      foreldrepenger: [],
      svangerskapspenger: []
    }} />
        </div>;
}`,...(p=(o=n.parameters)==null?void 0:o.docs)==null?void 0:p.source}}};const F=["SkalIkkeFeileOpplasting","SkalFeileOpplasting"];export{n as SkalFeileOpplasting,e as SkalIkkeFeileOpplasting,F as __namedExportsOrder,j as default};
//# sourceMappingURL=EttersendingPage.stories-dcb43787.js.map
