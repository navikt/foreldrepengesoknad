import{j as s}from"./index-84a9b03e.js";import{M as c,a as m,Y as f}from"./attachmentApi-bb1238a6.js";import"./index-1b03fe98.js";import{E as i}from"./EttersendingPage-2e4501a9.js";import"./index-f6b105ee.js";import"./index-6fd5a17b.js";import"./_baseToString-128d9545.js";import"./_createSet-13e922ed.js";const h={title:"EttersendingPage",component:i},d=({skalFeileOpplasting:g})=>{const k=new c(m);return g||k.onPost("test/storage/foreldrepenger/vedlegg").reply(200),s.jsx("div",{style:{backgroundColor:"white",padding:"50px"},children:s.jsx(i,{saker:{engangsstønad:[{ytelse:f.ENGANGSSTØNAD,saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1}}],foreldrepenger:[],svangerskapspenger:[]}})})},e=d.bind({});e.args={skalFeileOpplasting:!1};const n=d.bind({});n.args={skalFeileOpplasting:!0};var a,t,r;e.parameters={...e.parameters,docs:{...(a=e.parameters)==null?void 0:a.docs,source:{originalSource:`({
  skalFeileOpplasting
}) => {
  const apiMock = new MockAdapter(attachmentApi);
  if (!skalFeileOpplasting) {
    apiMock.onPost('test/storage/foreldrepenger/vedlegg').reply(200);
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
    apiMock.onPost('test/storage/foreldrepenger/vedlegg').reply(200);
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
}`,...(p=(o=n.parameters)==null?void 0:o.docs)==null?void 0:p.source}}};const j=["SkalIkkeFeileOpplasting","SkalFeileOpplasting"];export{n as SkalFeileOpplasting,e as SkalIkkeFeileOpplasting,j as __namedExportsOrder,h as default};
