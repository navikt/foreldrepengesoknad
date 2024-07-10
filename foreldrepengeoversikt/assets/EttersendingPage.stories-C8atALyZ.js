import{j as e}from"./Link-D3XUxQzV.js";import{Q as E,h as p,H as u,a as k,M as c,R,b as v}from"./attachmentApi-YuumtP_1.js";import{E as m,O as t}from"./EttersendingPage-BLZEjBDH.js";import{Y as f}from"./Ytelse-CO2s9mkn.js";import"./index-DVXBtNgz.js";import"./infobox.module-C8Y-zLbY.js";import"./tslib.es6-CMwweBXX.js";import"./index-Dcs0RV0A.js";import"./index-Cbx7Fas8.js";import"./useId-DbilmxAP.js";const P={title:"EttersendingPage",component:m},y=new E,g=()=>e.jsx("div",{style:{backgroundColor:"white",padding:"50px"},children:e.jsx(k,{client:y,children:e.jsx(c,{initialEntries:[`/${t.ETTERSEND}/1`],children:e.jsx(R,{children:e.jsx(v,{element:e.jsx(m,{saker:{engangsstønad:[{ytelse:f.ENGANGSSTØNAD,saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1}}],foreldrepenger:[],svangerskapspenger:[]}}),path:`/${t.ETTERSEND}/:saksnummer`})})})})}),n=g.bind({});n.parameters={msw:{handlers:[p.post("/rest/storage/engangsstonad/vedlegg",()=>new u(null,{status:200}))]}};const s=g.bind({});s.parameters={msw:{handlers:[p.post("/rest/storage/engangsstonad/vedlegg",()=>new u(null,{status:400}))]}};var r,a,o;n.parameters={...n.parameters,docs:{...(r=n.parameters)==null?void 0:r.docs,source:{originalSource:`() => {
  return <div style={{
    backgroundColor: 'white',
    padding: '50px'
  }}>
            <QueryClientProvider client={queryClient}>
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
            </QueryClientProvider>
        </div>;
}`,...(o=(a=n.parameters)==null?void 0:a.docs)==null?void 0:o.source}}};var l,i,d;s.parameters={...s.parameters,docs:{...(l=s.parameters)==null?void 0:l.docs,source:{originalSource:`() => {
  return <div style={{
    backgroundColor: 'white',
    padding: '50px'
  }}>
            <QueryClientProvider client={queryClient}>
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
            </QueryClientProvider>
        </div>;
}`,...(d=(i=s.parameters)==null?void 0:i.docs)==null?void 0:d.source}}};const w=["SkalIkkeFeileOpplasting","SkalFeileOpplasting"];export{s as SkalFeileOpplasting,n as SkalIkkeFeileOpplasting,w as __namedExportsOrder,P as default};
