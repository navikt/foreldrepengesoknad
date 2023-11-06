import{j as a}from"./index-07d70656.js";import{M as c,a as m,Y as f}from"./attachmentApi-733c399a.js";import"./_baseToString-53b0dbb2.js";import{E as i}from"./EttersendingPage-c528c21d.js";import"./index-b613d0ba.js";import"./_createSet-1df79d2b.js";import"./v4-a960c1f4.js";const j={title:"EttersendingPage",component:i},g=({skalFeileOpplasting:d})=>{const k=new c(m);return d||k.onPost("test/storage/vedlegg").reply(200),a.jsx("div",{style:{backgroundColor:"white",padding:"50px"},children:a.jsx(i,{saker:{engangsstønad:[{ytelse:f.ENGANGSSTØNAD,saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1}}],foreldrepenger:[],svangerskapspenger:[]},valgtSaksnr:"1"})})},e=g.bind({});e.args={skalFeileOpplasting:!1};const s=g.bind({});s.args={skalFeileOpplasting:!0};var t,r,n;e.parameters={...e.parameters,docs:{...(t=e.parameters)==null?void 0:t.docs,source:{originalSource:`({
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
    }} valgtSaksnr="1" />
        </div>;
}`,...(n=(r=e.parameters)==null?void 0:r.docs)==null?void 0:n.source}}};var l,o,p;s.parameters={...s.parameters,docs:{...(l=s.parameters)==null?void 0:l.docs,source:{originalSource:`({
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
    }} valgtSaksnr="1" />
        </div>;
}`,...(p=(o=s.parameters)==null?void 0:o.docs)==null?void 0:p.source}}};const F=["SkalIkkeFeileOpplasting","SkalFeileOpplasting"];export{s as SkalFeileOpplasting,e as SkalIkkeFeileOpplasting,F as __namedExportsOrder,j as default};
//# sourceMappingURL=EttersendingPage.stories-e481c0aa.js.map
