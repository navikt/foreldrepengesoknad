import{i as f,j as o}from"./dateFormValidation-CSo1Ghro.js";import{a as M}from"./chunk-454WOBUV-CM0pFb8Z.js";import{P as s,M as x,E as y,C as B}from"./useEsNavigator-DL6e_ycb.js";import{D as O,M as N}from"./DokumentasjonSteg-BKbZec8l.js";import"./index-CTjT7uj6.js";import{g as T}from"./apiInterceptor-DfqAa4et.js";import"./index-BRV0Se7Z.js";import"./index-CYM-y3Gt.js";import"./v4-CQkTLCs1.js";import"./ErrorSummaryHookForm-Cl5Hi6CA.js";import"./OmBarnet-BV6De4cI.js";const v=()=>(...a)=>(M("button-click")(...a),Promise.resolve()),J={title:"DokumentasjonSteg",component:O},r=({gåTilNesteSide:a=M("button-click"),mellomlagreOgNaviger:A=v(),omBarnet:S,skalFeileOpplasting:h=!1,path:D})=>{f();const i=new N(T());return h||(i.onPost("/rest/storage/engangsstonad/vedlegg").reply(200),i.onPost("http://localhost:8888/rest/storage/engangsstonad/vedlegg").reply(200)),o.jsx(x,{initialEntries:[D],children:o.jsx(y,{onDispatch:a,initialState:{[B.OM_BARNET]:S},children:o.jsx(O,{mellomlagreOgNaviger:A})})})},e=r.bind({});e.args={path:s.TERMINBEKREFTELSE,omBarnet:{erBarnetFødt:!1,antallBarn:1,termindato:"2023-10-06"}};const t=r.bind({});t.args={path:s.ADOPSJONSBEKREFTELSE,omBarnet:{adopsjonAvEktefellesBarn:!0,adopsjonsdato:"2020-01-01",antallBarn:1,fødselsdatoer:[{dato:"2020-01-01"}]}};const n=r.bind({});n.args={skalFeileOpplasting:!0,path:s.ADOPSJONSBEKREFTELSE,omBarnet:{adopsjonAvEktefellesBarn:!0,adopsjonsdato:"2020-01-01",antallBarn:1,fødselsdatoer:[{dato:"2020-01-01"}]}};var l,p,g;e.parameters={...e.parameters,docs:{...(l=e.parameters)==null?void 0:l.docs,source:{originalSource:`({
  gåTilNesteSide = action('button-click'),
  mellomlagreOgNaviger = promiseAction(),
  omBarnet,
  skalFeileOpplasting = false,
  path
}) => {
  initAmplitude();
  const apiMock = new MockAdapter(getAxiosInstance());
  if (!skalFeileOpplasting) {
    apiMock.onPost('/rest/storage/engangsstonad/vedlegg').reply(200); //story
    apiMock.onPost('http://localhost:8888/rest/storage/engangsstonad/vedlegg').reply(200); //test
  }
  return <MemoryRouter initialEntries={[path]}>
            <EsDataContext onDispatch={gåTilNesteSide} initialState={{
      [ContextDataType.OM_BARNET]: omBarnet
    }}>
                <DokumentasjonSteg mellomlagreOgNaviger={mellomlagreOgNaviger} />
            </EsDataContext>
        </MemoryRouter>;
}`,...(g=(p=e.parameters)==null?void 0:p.docs)==null?void 0:g.source}}};var m,c,d;t.parameters={...t.parameters,docs:{...(m=t.parameters)==null?void 0:m.docs,source:{originalSource:`({
  gåTilNesteSide = action('button-click'),
  mellomlagreOgNaviger = promiseAction(),
  omBarnet,
  skalFeileOpplasting = false,
  path
}) => {
  initAmplitude();
  const apiMock = new MockAdapter(getAxiosInstance());
  if (!skalFeileOpplasting) {
    apiMock.onPost('/rest/storage/engangsstonad/vedlegg').reply(200); //story
    apiMock.onPost('http://localhost:8888/rest/storage/engangsstonad/vedlegg').reply(200); //test
  }
  return <MemoryRouter initialEntries={[path]}>
            <EsDataContext onDispatch={gåTilNesteSide} initialState={{
      [ContextDataType.OM_BARNET]: omBarnet
    }}>
                <DokumentasjonSteg mellomlagreOgNaviger={mellomlagreOgNaviger} />
            </EsDataContext>
        </MemoryRouter>;
}`,...(d=(c=t.parameters)==null?void 0:c.docs)==null?void 0:d.source}}};var u,k,E;n.parameters={...n.parameters,docs:{...(u=n.parameters)==null?void 0:u.docs,source:{originalSource:`({
  gåTilNesteSide = action('button-click'),
  mellomlagreOgNaviger = promiseAction(),
  omBarnet,
  skalFeileOpplasting = false,
  path
}) => {
  initAmplitude();
  const apiMock = new MockAdapter(getAxiosInstance());
  if (!skalFeileOpplasting) {
    apiMock.onPost('/rest/storage/engangsstonad/vedlegg').reply(200); //story
    apiMock.onPost('http://localhost:8888/rest/storage/engangsstonad/vedlegg').reply(200); //test
  }
  return <MemoryRouter initialEntries={[path]}>
            <EsDataContext onDispatch={gåTilNesteSide} initialState={{
      [ContextDataType.OM_BARNET]: omBarnet
    }}>
                <DokumentasjonSteg mellomlagreOgNaviger={mellomlagreOgNaviger} />
            </EsDataContext>
        </MemoryRouter>;
}`,...(E=(k=n.parameters)==null?void 0:k.docs)==null?void 0:E.source}}};const q=["Terminbekreftelse","Adopsjonsbekreftelse","FeilerOpplastinger"];export{t as Adopsjonsbekreftelse,n as FeilerOpplastinger,e as Terminbekreftelse,q as __namedExportsOrder,J as default};
