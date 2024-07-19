import{j as e}from"./Link-a0aDMSVB.js";import{Q as k,h as p,H as u,a as E,M as c,R,b as v}from"./MinidialogSkjema-CIROT7Z6.js";import{E as m,O as t}from"./ForeldrepengeoversiktRoutes-C77k5rw3.js";import{Y as T}from"./Ytelse-B1bsK7QP.js";import"./index-DVXBtNgz.js";import"./infobox.module-CYWomAcg.js";import"./tslib.es6-CMwweBXX.js";import"./index-Dcs0RV0A.js";import"./index-Cbx7Fas8.js";import"./_baseForOwn-D8C09u7n.js";import"./BekreftelseSendtSøknad-BCPw5WiX.js";const w={title:"EttersendingPage",component:m},f=new k,g=()=>e.jsx("div",{style:{backgroundColor:"white",padding:"50px"},children:e.jsx(E,{client:f,children:e.jsx(c,{initialEntries:[`/${t.ETTERSEND}/1`],children:e.jsx(R,{children:e.jsx(v,{element:e.jsx(m,{saker:{engangsstønad:[{ytelse:T.ENGANGSSTØNAD,saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}),path:`/${t.ETTERSEND}/:saksnummer`})})})})}),n=g.bind({});n.parameters={msw:{handlers:[p.post("/rest/storage/engangsstonad/vedlegg",()=>new u(null,{status:200}))]}};const s=g.bind({});s.parameters={msw:{handlers:[p.post("/rest/storage/engangsstonad/vedlegg",()=>new u(null,{status:400}))]}};var r,a,o;n.parameters={...n.parameters,docs:{...(r=n.parameters)==null?void 0:r.docs,source:{originalSource:`() => {
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
}`,...(d=(l=s.parameters)==null?void 0:l.docs)==null?void 0:d.source}}};const F=["SkalIkkeFeileOpplasting","SkalFeileOpplasting"];export{s as SkalFeileOpplasting,n as SkalIkkeFeileOpplasting,F as __namedExportsOrder,w as default};
