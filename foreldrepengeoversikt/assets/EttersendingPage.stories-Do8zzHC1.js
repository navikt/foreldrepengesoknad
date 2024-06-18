import{j as e}from"./Link-6XJR653k.js";import{M as u,g as c,a as E,R,b as f}from"./ScrollToTop-CkIONejd.js";import"./index-DVXBtNgz.js";import{E as g,O as t}from"./EttersendingPage-B6IywJ8G.js";import{Y as x}from"./Ytelse-Dcr9dYDr.js";import"./index-Cbx7Fas8.js";import"./infobox.module-FIgmdkCT.js";import"./tslib.es6-CMwweBXX.js";import"./index-Dcs0RV0A.js";import"./useId-DbilmxAP.js";const h={title:"EttersendingPage",component:g},d=({skalFeileOpplasting:m})=>{const k=new u(c());return m||k.onPost("test/rest/storage/engangsstonad/vedlegg").reply(200),e.jsx("div",{style:{backgroundColor:"white",padding:"50px"},children:e.jsx(E,{initialEntries:[`/${t.ETTERSEND}/1`],children:e.jsx(R,{children:e.jsx(f,{element:e.jsx(g,{saker:{engangsstønad:[{ytelse:x.ENGANGSSTØNAD,saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1}}],foreldrepenger:[],svangerskapspenger:[]}}),path:`/${t.ETTERSEND}/:saksnummer`})})})})},s=d.bind({});s.args={skalFeileOpplasting:!1};const n=d.bind({});n.args={skalFeileOpplasting:!0};var a,r,o;s.parameters={...s.parameters,docs:{...(a=s.parameters)==null?void 0:a.docs,source:{originalSource:`({
  skalFeileOpplasting
}) => {
  const apiMock = new MockAdapter(getAxiosInstance());
  if (!skalFeileOpplasting) {
    apiMock.onPost('test/rest/storage/engangsstonad/vedlegg').reply(200);
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
}`,...(o=(r=s.parameters)==null?void 0:r.docs)==null?void 0:o.source}}};var l,i,p;n.parameters={...n.parameters,docs:{...(l=n.parameters)==null?void 0:l.docs,source:{originalSource:`({
  skalFeileOpplasting
}) => {
  const apiMock = new MockAdapter(getAxiosInstance());
  if (!skalFeileOpplasting) {
    apiMock.onPost('test/rest/storage/engangsstonad/vedlegg').reply(200);
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
}`,...(p=(i=n.parameters)==null?void 0:i.docs)==null?void 0:p.source}}};const D=["SkalIkkeFeileOpplasting","SkalFeileOpplasting"];export{n as SkalFeileOpplasting,s as SkalIkkeFeileOpplasting,D as __namedExportsOrder,h as default};
