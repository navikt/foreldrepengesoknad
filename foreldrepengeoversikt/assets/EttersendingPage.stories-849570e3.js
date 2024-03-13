import{j as s}from"./index-e995adf2.js";import{M as m,a as c}from"./attachmentApi-47b1ac96.js";import"./index-1b03fe98.js";import{Y as f}from"./Ytelse-ffb4c97d.js";import{E as i}from"./EttersendingPage-90345a3e.js";import"./index-13d55e84.js";import"./index-f6b105ee.js";import"./index-6fd5a17b.js";import"./useId-49f44336.js";const j={title:"EttersendingPage",component:i},d=({skalFeileOpplasting:g})=>{const k=new m(c);return g||k.onPost("test/storage/foreldrepenger/vedlegg").reply(200),s.jsx("div",{style:{backgroundColor:"white",padding:"50px"},children:s.jsx(i,{saker:{engangsstønad:[{ytelse:f.ENGANGSSTØNAD,saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1}}],foreldrepenger:[],svangerskapspenger:[]}})})},e=d.bind({});e.args={skalFeileOpplasting:!1};const n=d.bind({});n.args={skalFeileOpplasting:!0};var a,t,r;e.parameters={...e.parameters,docs:{...(a=e.parameters)==null?void 0:a.docs,source:{originalSource:`({
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
}`,...(p=(o=n.parameters)==null?void 0:o.docs)==null?void 0:p.source}}};const y=["SkalIkkeFeileOpplasting","SkalFeileOpplasting"];export{n as SkalFeileOpplasting,e as SkalIkkeFeileOpplasting,y as __namedExportsOrder,j as default};
