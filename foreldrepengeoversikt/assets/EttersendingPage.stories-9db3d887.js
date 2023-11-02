import{j as a}from"./index-896908b3.js";import{M as k,a as m,I as f,Y as v}from"./IntlProvider-c2f94f8c.js";import"./index-7c191284.js";import{E as p}from"./EttersendingPage-0d85c42b.js";import"./_baseToString-8992fead.js";import"./_createSet-409f46e6.js";import"./index-b3a39e30.js";import"./v4-a960c1f4.js";const x={title:"EttersendingPage",component:p},d=({skalFeileOpplasting:g})=>{const c=new k(m);return g||c.onPost("test/storage/vedlegg").reply(200),a.jsx(f,{locale:"nb",children:a.jsx("div",{style:{backgroundColor:"white",padding:"50px"},children:a.jsx(p,{saker:{engangsstønad:[{ytelse:v.ENGANGSSTØNAD,saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1}}],foreldrepenger:[],svangerskapspenger:[]},valgtSaksnr:"1"})})})},e=d.bind({});e.args={skalFeileOpplasting:!1};const s=d.bind({});s.args={skalFeileOpplasting:!0};var t,r,l;e.parameters={...e.parameters,docs:{...(t=e.parameters)==null?void 0:t.docs,source:{originalSource:`({
  skalFeileOpplasting
}) => {
  const apiMock = new MockAdapter(attachmentApi);
  if (!skalFeileOpplasting) {
    apiMock.onPost('test/storage/vedlegg').reply(200);
  }
  return <IntlProvider locale="nb">
            <div style={{
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
      }} valgtSaksnr="1" />
            </div>
        </IntlProvider>;
}`,...(l=(r=e.parameters)==null?void 0:r.docs)==null?void 0:l.source}}};var n,o,i;s.parameters={...s.parameters,docs:{...(n=s.parameters)==null?void 0:n.docs,source:{originalSource:`({
  skalFeileOpplasting
}) => {
  const apiMock = new MockAdapter(attachmentApi);
  if (!skalFeileOpplasting) {
    apiMock.onPost('test/storage/vedlegg').reply(200);
  }
  return <IntlProvider locale="nb">
            <div style={{
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
      }} valgtSaksnr="1" />
            </div>
        </IntlProvider>;
}`,...(i=(o=s.parameters)==null?void 0:o.docs)==null?void 0:i.source}}};const F=["SkalIkkeFeileOpplasting","SkalFeileOpplasting"];export{s as SkalFeileOpplasting,e as SkalIkkeFeileOpplasting,F as __namedExportsOrder,x as default};
//# sourceMappingURL=EttersendingPage.stories-9db3d887.js.map
