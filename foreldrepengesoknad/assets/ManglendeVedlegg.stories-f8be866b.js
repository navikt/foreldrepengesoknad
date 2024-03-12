import{j as a}from"./jsx-runtime-1caa8f64.js";import{a as s}from"./chunk-WFFRPTHA-80d37c1b.js";import{M as y}from"./index-146fc9b8.js";import"./index-1cdf6ce0.js";import{a as O}from"./util-a792b578.js";import"./Tidsperioden-cabe27e7.js";import{B as l,M as R}from"./dateFormValidation-3538be13.js";import"./index-753920cd.js";import"./_baseToString-2517c4f7.js";import"./_createSet-019d3bf6.js";import{i as j}from"./Step-09e54fbd.js";import{F as b,C as o}from"./FpDataContext-91c673b7.js";import{S as I}from"./useFpNavigator-58a97db6.js";import{M as T}from"./ManglendeVedlegg-7e11b250.js";import"./preview-errors-60885292.js";import"./index-356e4a49.js";import"./v4-4a60fe23.js";import"./axios-91b57d60.js";import"./skjemanummer-4d711b8d.js";import"./index-daf33b80.js";import"./Link-1e7d9fc8.js";import"./index-a01a9712.js";import"./links-022380bf.js";import"./amplitude.esm-2809efde.js";import"./createIntl-cd089914.js";import"./ErrorSummaryHookForm-4cc65dc9.js";import"./ConfirmationPanel-2a051438.js";import"./barnUtils-75796160.js";import"./attachmentType-1d378a15.js";import"./AttachmentMetadata-003d83db.js";const C=()=>(...r)=>(s("button-click")(...r),Promise.resolve()),i={søker:{fnr:"19047815714",fornavn:"TALENTFULL",etternavn:"MYGG",kjønn:"K",fødselsdato:"1978-04-19",barn:[{fnr:"21091981146",fødselsdato:"2021-03-15",annenForelder:{fnr:"12038517080",fødselsdato:"1985-03-12",fornavn:"LEALAUS",etternavn:"BÆREPOSE"},fornavn:"KLØKTIG",etternavn:"MIDTPUNKT",kjønn:"M"},{fnr:"31091981146",fødselsdato:"2022-08-02",annenForelder:{fnr:"12038517080",fødselsdato:"1985-03-12",fornavn:"LEALAUS",etternavn:"BÆREPOSE"},fornavn:"SNILT",etternavn:"MIDTPUNKT",kjønn:"M"},{fnr:"31091981147",fødselsdato:"2022-08-02",annenForelder:{fnr:"12038517080",fødselsdato:"1985-03-12",fornavn:"LEALAUS",etternavn:"BÆREPOSE"},fornavn:"LYST",etternavn:"MIDTPUNKT",kjønn:"M"}]},arbeidsforhold:[]},A={fornavn:"Eline",etternavn:"Hagen",kanIkkeOppgis:!1},U={antallBarn:1,type:l.FØDT,fødselsdatoer:["2024-01-01"]},me={title:"steps/ManglendeVedlegg",component:T},d=({søkerInfo:r,situasjon:N="fødsel",annenForelder:E=A,barn:M=U,gåTilNesteSide:D=s("button-click"),mellomlagreSøknadOgNaviger:v=C()})=>{j();const p=new y(O);return p.onPost("/storage/foreldrepenger/vedlegg").reply(200),p.onPost("http://localhost:8888/rest/storage/foreldrepenger/vedlegg").reply(200),a.jsx(R,{initialEntries:[I.DOKUMENTASJON],children:a.jsx(b,{onDispatch:D,initialState:{[o.UTTAKSPLAN]:[],[o.ANNEN_FORELDER]:E,[o.OM_BARNET]:M,[o.SØKERSITUASJON]:{rolle:"mor",situasjon:N}},children:a.jsx(T,{søkerInfo:r,erEndringssøknad:!1,mellomlagreSøknadOgNaviger:v,avbrytSøknad:s("button-click")})})})},e=d.bind({});e.args={søkerInfo:i,barn:{antallBarn:1,type:l.UFØDT,termindato:"2024-01-01"}};const n=d.bind({});n.args={søkerInfo:i,situasjon:"adopsjon",barn:{antallBarn:1,type:l.ADOPTERT_ANNET_BARN,adopsjonsdato:"2023-01-01",adoptertIUtlandet:!1,fødselsdatoer:["2022-01-01"]}};const t=d.bind({});t.args={søkerInfo:i,annenForelder:{...A,datoForAleneomsorg:"2024-01-01"}};var m,g,c;e.parameters={...e.parameters,docs:{...(m=e.parameters)==null?void 0:m.docs,source:{originalSource:`({
  søkerInfo,
  situasjon = 'fødsel',
  annenForelder = defaultAnnenForelder,
  barn = defaultBarn,
  gåTilNesteSide = action('button-click'),
  mellomlagreSøknadOgNaviger = promiseAction()
}) => {
  initAmplitude();
  const apiMock = new MockAdapter(attachmentApi);
  apiMock.onPost('/storage/foreldrepenger/vedlegg').reply(200); //story
  apiMock.onPost('http://localhost:8888/rest/storage/foreldrepenger/vedlegg').reply(200); //test

  return <MemoryRouter initialEntries={[SøknadRoutes.DOKUMENTASJON]}>
            <FpDataContext onDispatch={gåTilNesteSide} initialState={{
      [ContextDataType.UTTAKSPLAN]: [],
      [ContextDataType.ANNEN_FORELDER]: annenForelder,
      [ContextDataType.OM_BARNET]: barn,
      [ContextDataType.SØKERSITUASJON]: {
        rolle: 'mor',
        situasjon: situasjon
      }
    }}>
                <ManglendeVedlegg søkerInfo={søkerInfo} erEndringssøknad={false} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={action('button-click')} />
            </FpDataContext>
        </MemoryRouter>;
}`,...(c=(g=e.parameters)==null?void 0:g.docs)==null?void 0:c.source}}};var f,k,x;n.parameters={...n.parameters,docs:{...(f=n.parameters)==null?void 0:f.docs,source:{originalSource:`({
  søkerInfo,
  situasjon = 'fødsel',
  annenForelder = defaultAnnenForelder,
  barn = defaultBarn,
  gåTilNesteSide = action('button-click'),
  mellomlagreSøknadOgNaviger = promiseAction()
}) => {
  initAmplitude();
  const apiMock = new MockAdapter(attachmentApi);
  apiMock.onPost('/storage/foreldrepenger/vedlegg').reply(200); //story
  apiMock.onPost('http://localhost:8888/rest/storage/foreldrepenger/vedlegg').reply(200); //test

  return <MemoryRouter initialEntries={[SøknadRoutes.DOKUMENTASJON]}>
            <FpDataContext onDispatch={gåTilNesteSide} initialState={{
      [ContextDataType.UTTAKSPLAN]: [],
      [ContextDataType.ANNEN_FORELDER]: annenForelder,
      [ContextDataType.OM_BARNET]: barn,
      [ContextDataType.SØKERSITUASJON]: {
        rolle: 'mor',
        situasjon: situasjon
      }
    }}>
                <ManglendeVedlegg søkerInfo={søkerInfo} erEndringssøknad={false} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={action('button-click')} />
            </FpDataContext>
        </MemoryRouter>;
}`,...(x=(k=n.parameters)==null?void 0:k.docs)==null?void 0:x.source}}};var u,F,S;t.parameters={...t.parameters,docs:{...(u=t.parameters)==null?void 0:u.docs,source:{originalSource:`({
  søkerInfo,
  situasjon = 'fødsel',
  annenForelder = defaultAnnenForelder,
  barn = defaultBarn,
  gåTilNesteSide = action('button-click'),
  mellomlagreSøknadOgNaviger = promiseAction()
}) => {
  initAmplitude();
  const apiMock = new MockAdapter(attachmentApi);
  apiMock.onPost('/storage/foreldrepenger/vedlegg').reply(200); //story
  apiMock.onPost('http://localhost:8888/rest/storage/foreldrepenger/vedlegg').reply(200); //test

  return <MemoryRouter initialEntries={[SøknadRoutes.DOKUMENTASJON]}>
            <FpDataContext onDispatch={gåTilNesteSide} initialState={{
      [ContextDataType.UTTAKSPLAN]: [],
      [ContextDataType.ANNEN_FORELDER]: annenForelder,
      [ContextDataType.OM_BARNET]: barn,
      [ContextDataType.SØKERSITUASJON]: {
        rolle: 'mor',
        situasjon: situasjon
      }
    }}>
                <ManglendeVedlegg søkerInfo={søkerInfo} erEndringssøknad={false} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={action('button-click')} />
            </FpDataContext>
        </MemoryRouter>;
}`,...(S=(F=t.parameters)==null?void 0:F.docs)==null?void 0:S.source}}};const ge=["Termindatodokumentasjon","Omsorgsovertakelsedokumentasjon","Aleneomsorgdokumentasjon"];export{t as Aleneomsorgdokumentasjon,n as Omsorgsovertakelsedokumentasjon,e as Termindatodokumentasjon,ge as __namedExportsOrder,me as default};
