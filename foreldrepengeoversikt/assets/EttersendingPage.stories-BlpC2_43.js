import{j as e}from"./jsx-runtime-QvZ8i92b.js";import{Q as k,h as p,H as u,a as E,M as c,R,b as v}from"./MinidialogSkjema-SWFqy0lD.js";import"./Link-CH_SKs6w.js";import{E as m,O as t}from"./ForeldrepengeoversiktRoutes-Cvcp_xEy.js";import{Y as T}from"./Ytelse-BFRQDwwk.js";import"./index-uubelm5h.js";import"./ByttBrowserModal-BeEift1s.js";import"./index-D3eZ-H7s.js";import"./tslib.es6-CMwweBXX.js";import"./index-Dei0BBcc.js";import"./_baseForOwn-Wed_Gcm0.js";import"./BekreftelseSendtSøknad-D9lucSqB.js";const F={title:"EttersendingPage",component:m},f=new k,g=()=>e.jsx("div",{style:{backgroundColor:"white",padding:"50px"},children:e.jsx(E,{client:f,children:e.jsx(c,{initialEntries:[`/${t.ETTERSEND}/1`],children:e.jsx(R,{children:e.jsx(v,{element:e.jsx(m,{saker:{engangsstønad:[{ytelse:T.ENGANGSSTØNAD,saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}),path:`/${t.ETTERSEND}/:saksnummer`})})})})}),n=g.bind({});n.parameters={msw:{handlers:[p.post("/rest/storage/engangsstonad/vedlegg",()=>new u(null,{status:200}))]}};const s=g.bind({});s.parameters={msw:{handlers:[p.post("/rest/storage/engangsstonad/vedlegg",()=>new u(null,{status:400}))]}};var r,a,o;n.parameters={...n.parameters,docs:{...(r=n.parameters)==null?void 0:r.docs,source:{originalSource:`() => {
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
              },
              oppdatertTidspunkt: '2024-02-28T21:19:08.911'
            }],
            foreldrepenger: [],
            svangerskapspenger: []
          }} />} path={\`/\${OversiktRoutes.ETTERSEND}/:saksnummer\`} />
                    </Routes>
                </MemoryRouter>
            </QueryClientProvider>
        </div>;
}`,...(o=(a=n.parameters)==null?void 0:a.docs)==null?void 0:o.source}}};var i,l,d;s.parameters={...s.parameters,docs:{...(i=s.parameters)==null?void 0:i.docs,source:{originalSource:`() => {
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
              },
              oppdatertTidspunkt: '2024-02-28T21:19:08.911'
            }],
            foreldrepenger: [],
            svangerskapspenger: []
          }} />} path={\`/\${OversiktRoutes.ETTERSEND}/:saksnummer\`} />
                    </Routes>
                </MemoryRouter>
            </QueryClientProvider>
        </div>;
}`,...(d=(l=s.parameters)==null?void 0:l.docs)==null?void 0:d.source}}};const Q=["SkalIkkeFeileOpplasting","SkalFeileOpplasting"];export{s as SkalFeileOpplasting,n as SkalIkkeFeileOpplasting,Q as __namedExportsOrder,F as default};
