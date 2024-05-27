import{j as a}from"./jsx-runtime-DoxjgJx5.js";import{a as s}from"./chunk-MZXVCX43-DWuJqIWT.js";import{M as y}from"./index-B_cCgG6K.js";import"./index-Cu9bd8lq.js";import{a as O}from"./attachmentApi-BZLtCyR0.js";import"./Tidsperioden-BevdMO7W.js";import"./index-C-6Uy6j4.js";import{B as i,M as R}from"./index-nutMI9v0.js";import"./_baseToString-yTMKM5a7.js";import"./_createSet-BNfKGSGn.js";import{i as j}from"./calendarLabel.module-CX-ljgLZ.js";import{F as b,C as o}from"./FpDataContext-DRW84C1R.js";import{S as I}from"./useFpNavigator-C0NBSMeQ.js";import{M as T}from"./ManglendeVedlegg-bUYuucnD.js";import"./v4-D8aEg3BZ.js";import"./axios-Cm0UX6qg.js";import"./index-SDyqs4cU.js";import"./Link-BqZ6CohM.js";import"./index-Ckls47V4.js";import"./dateFormValidation--pIUBKYa.js";import"./links-BFd19Kxc.js";import"./message-BSSS8E56.js";import"./amplitude.esm-CWYNo8IU.js";import"./lodash-o8vTUAkc.js";import"./Accordion-BVV-9dzB.js";import"./skjemanummer-CSxM5qit.js";import"./ErrorSummaryHookForm-L0rfmwnq.js";import"./barnUtils-Ds8HYmut.js";import"./AttachmentMetadata-B9XvXCfe.js";import"./attachmentType-CUpB_aW-.js";import"./Environment-O62Hvuhd.js";import"./util-VWIhUa89.js";const C=()=>(...r)=>(s("button-click")(...r),Promise.resolve()),l={søker:{fnr:"19047815714",fornavn:"TALENTFULL",etternavn:"MYGG",kjønn:"K",fødselsdato:"1978-04-19",barn:[{fnr:"21091981146",fødselsdato:"2021-03-15",annenForelder:{fnr:"12038517080",fødselsdato:"1985-03-12",fornavn:"LEALAUS",etternavn:"BÆREPOSE"},fornavn:"KLØKTIG",etternavn:"MIDTPUNKT",kjønn:"M"},{fnr:"31091981146",fødselsdato:"2022-08-02",annenForelder:{fnr:"12038517080",fødselsdato:"1985-03-12",fornavn:"LEALAUS",etternavn:"BÆREPOSE"},fornavn:"SNILT",etternavn:"MIDTPUNKT",kjønn:"M"},{fnr:"31091981147",fødselsdato:"2022-08-02",annenForelder:{fnr:"12038517080",fødselsdato:"1985-03-12",fornavn:"LEALAUS",etternavn:"BÆREPOSE"},fornavn:"LYST",etternavn:"MIDTPUNKT",kjønn:"M"}]},arbeidsforhold:[]},A={fornavn:"Eline",etternavn:"Hagen",kanIkkeOppgis:!1},U={antallBarn:1,type:i.FØDT,fødselsdatoer:["2024-01-01"]},ce={title:"steps/ManglendeVedlegg",component:T},d=({søkerInfo:r,situasjon:N="fødsel",annenForelder:E=A,barn:M=U,gåTilNesteSide:D=s("button-click"),mellomlagreSøknadOgNaviger:v=C()})=>{j();const p=new y(O);return p.onPost("/storage/foreldrepenger/vedlegg").reply(200),p.onPost("http://localhost:8888/rest/storage/foreldrepenger/vedlegg").reply(200),a.jsx(R,{initialEntries:[I.DOKUMENTASJON],children:a.jsx(b,{onDispatch:D,initialState:{[o.UTTAKSPLAN]:[],[o.ANNEN_FORELDER]:E,[o.OM_BARNET]:M,[o.SØKERSITUASJON]:{rolle:"mor",situasjon:N}},children:a.jsx(T,{søkerInfo:r,erEndringssøknad:!1,mellomlagreSøknadOgNaviger:v,avbrytSøknad:s("button-click")})})})},e=d.bind({});e.args={søkerInfo:l,barn:{antallBarn:1,type:i.UFØDT,termindato:"2024-01-01"}};const n=d.bind({});n.args={søkerInfo:l,situasjon:"adopsjon",barn:{antallBarn:1,type:i.ADOPTERT_ANNET_BARN,adopsjonsdato:"2023-01-01",adoptertIUtlandet:!1,fødselsdatoer:["2022-01-01"]}};const t=d.bind({});t.args={søkerInfo:l,annenForelder:{...A,datoForAleneomsorg:"2024-01-01"}};var m,g,c;e.parameters={...e.parameters,docs:{...(m=e.parameters)==null?void 0:m.docs,source:{originalSource:`({
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
}`,...(S=(F=t.parameters)==null?void 0:F.docs)==null?void 0:S.source}}};const fe=["Termindatodokumentasjon","Omsorgsovertakelsedokumentasjon","Aleneomsorgdokumentasjon"];export{t as Aleneomsorgdokumentasjon,n as Omsorgsovertakelsedokumentasjon,e as Termindatodokumentasjon,fe as __namedExportsOrder,ce as default};
