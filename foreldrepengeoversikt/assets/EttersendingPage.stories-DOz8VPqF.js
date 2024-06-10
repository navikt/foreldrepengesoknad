import{j as e}from"./index-D3ktEWFU.js";import{M as u,a as c,b as E,R,c as f}from"./attachmentApi-BcjVrL6c.js";import"./index-DVXBtNgz.js";import{E as d,O as t}from"./EttersendingPage-C4sdeuV2.js";import{Y as v}from"./Ytelse-NhSSlM2E.js";import"./index-Cbx7Fas8.js";import"./infobox.module-B5g2jqlm.js";import"./tslib.es6-CMwweBXX.js";import"./index-Dcs0RV0A.js";import"./useId-DbilmxAP.js";const j={title:"EttersendingPage",component:d},g=({skalFeileOpplasting:m})=>{const k=new u(c);return m||k.onPost("test/storage/engangsstonad/vedlegg").reply(200),e.jsx("div",{style:{backgroundColor:"white",padding:"50px"},children:e.jsx(E,{initialEntries:[`/${t.ETTERSEND}/1`],children:e.jsx(R,{children:e.jsx(f,{element:e.jsx(d,{saker:{engangsstønad:[{ytelse:v.ENGANGSSTØNAD,saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1}}],foreldrepenger:[],svangerskapspenger:[]}}),path:`/${t.ETTERSEND}/:saksnummer`})})})})},n=g.bind({});n.args={skalFeileOpplasting:!1};const s=g.bind({});s.args={skalFeileOpplasting:!0};var a,r,o;n.parameters={...n.parameters,docs:{...(a=n.parameters)==null?void 0:a.docs,source:{originalSource:`({
  skalFeileOpplasting
}) => {
  const apiMock = new MockAdapter(attachmentApi);
  if (!skalFeileOpplasting) {
    apiMock.onPost('test/storage/engangsstonad/vedlegg').reply(200);
  }
  return <div style={{
    backgroundColor: 'white',
    padding: '50px'
  }}>
            <MemoryRouter initialEntries={[\`/\${OversiktRoutes.ETTERSEND}/1\`]}>
                <Routes>
                    <Route element={<EttersendingPage saker={{
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
        }} />} path={\`/\${OversiktRoutes.ETTERSEND}/:saksnummer\`} />
                </Routes>
            </MemoryRouter>
        </div>;
}`,...(o=(r=n.parameters)==null?void 0:r.docs)==null?void 0:o.source}}};var l,i,p;s.parameters={...s.parameters,docs:{...(l=s.parameters)==null?void 0:l.docs,source:{originalSource:`({
  skalFeileOpplasting
}) => {
  const apiMock = new MockAdapter(attachmentApi);
  if (!skalFeileOpplasting) {
    apiMock.onPost('test/storage/engangsstonad/vedlegg').reply(200);
  }
  return <div style={{
    backgroundColor: 'white',
    padding: '50px'
  }}>
            <MemoryRouter initialEntries={[\`/\${OversiktRoutes.ETTERSEND}/1\`]}>
                <Routes>
                    <Route element={<EttersendingPage saker={{
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
        }} />} path={\`/\${OversiktRoutes.ETTERSEND}/:saksnummer\`} />
                </Routes>
            </MemoryRouter>
        </div>;
}`,...(p=(i=s.parameters)==null?void 0:i.docs)==null?void 0:p.source}}};const D=["SkalIkkeFeileOpplasting","SkalFeileOpplasting"];export{s as SkalFeileOpplasting,n as SkalIkkeFeileOpplasting,D as __namedExportsOrder,j as default};
