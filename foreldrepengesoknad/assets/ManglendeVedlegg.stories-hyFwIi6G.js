import{j as g}from"./Uttaksdagen-DrQ0Oxxl.js";import{a as p}from"./chunk-454WOBUV-CM0pFb8Z.js";import{M as U}from"./index-DkNKrNHd.js";import"./index-BP8_t0zE.js";import{g as P}from"./apiInterceptor-BCtLUnPl.js";import{B as k,M as B,F as J,C as e}from"./FpDataContext-BW_0HfWx.js";import"./dateFormValidation-DXkRFCUV.js";import{i as H}from"./ErrorSummaryHookForm-1nFoirfj.js";import{A as i,S as G}from"./useFpNavigator-rsQS18v_.js";import{M as v}from"./ManglendeVedlegg-N1CiR10_.js";import"./v4-CQkTLCs1.js";import"./Label-Uwu7Pz6v.js";import"./useMergeRefs-DNxXm0No.js";import"./Modal-Bbx7_2or.js";import"./index-BVEwUaSm.js";import"./Link-BaYazeYY.js";import"./index-Snk9MO9S.js";import"./iframe-qjwadSKR.js";import"../sb-preview/runtime.js";import"./_baseAssignValue-DljJpCQy.js";import"./_overArg-DqZhcJg_.js";import"./util-PWPhNo9p.js";import"./Block-C_TDeNke.js";import"./barnUtils-CwWCeo2u.js";import"./guid-CsArkN6i.js";const V=()=>(...d)=>(p("button-click")(...d),Promise.resolve()),s={søker:{fnr:"19047815714",fornavn:"TALENTFULL",etternavn:"MYGG",kjønn:"K",fødselsdato:"1978-04-19",barn:[{fnr:"21091981146",fødselsdato:"2021-03-15",annenForelder:{fnr:"12038517080",fødselsdato:"1985-03-12",fornavn:"LEALAUS",etternavn:"BÆREPOSE"},fornavn:"KLØKTIG",etternavn:"MIDTPUNKT",kjønn:"M"},{fnr:"31091981146",fødselsdato:"2022-08-02",annenForelder:{fnr:"12038517080",fødselsdato:"1985-03-12",fornavn:"LEALAUS",etternavn:"BÆREPOSE"},fornavn:"SNILT",etternavn:"MIDTPUNKT",kjønn:"M"},{fnr:"31091981147",fødselsdato:"2022-08-02",annenForelder:{fnr:"12038517080",fødselsdato:"1985-03-12",fornavn:"LEALAUS",etternavn:"BÆREPOSE"},fornavn:"LYST",etternavn:"MIDTPUNKT",kjønn:"M"}]},arbeidsforhold:[]},x={fornavn:"Eline",etternavn:"Hagen",kanIkkeOppgis:!1},w={antallBarn:1,type:k.FØDT,fødselsdatoer:["2024-01-01"]},Y={harHattAndreInntektskilder:!1,harJobbetSomFrilans:!1,harJobbetSomSelvstendigNæringsdrivende:!1},Se={title:"steps/ManglendeVedlegg",component:v},l=({søkerInfo:d,situasjon:F="fødsel",annenForelder:h=x,barn:K=w,arbeidsforholdOgInntekt:C=Y,annenInntekt:L,gåTilNesteSide:_=p("button-click"),mellomlagreSøknadOgNaviger:j=V()})=>{H();const m=new U(P());return m.onPost("/rest/storage/foreldrepenger/vedlegg").reply(200),m.onPost("http://localhost:8888/rest/storage/foreldrepenger/vedlegg").reply(200),g.jsx(B,{initialEntries:[G.DOKUMENTASJON],children:g.jsx(J,{onDispatch:_,initialState:{[e.UTTAKSPLAN]:[],[e.ANNEN_FORELDER]:h,[e.OM_BARNET]:K,[e.ARBEIDSFORHOLD_OG_INNTEKT]:C,[e.ANDRE_INNTEKTSKILDER]:L,[e.SØKERSITUASJON]:{rolle:"mor",situasjon:F}},children:g.jsx(v,{søkerInfo:d,erEndringssøknad:!1,mellomlagreSøknadOgNaviger:j,avbrytSøknad:p("button-click")})})})},n=l.bind({});n.args={søkerInfo:s,barn:{antallBarn:1,type:k.UFØDT,termindato:"2024-01-01"}};const t=l.bind({});t.args={søkerInfo:s,situasjon:"adopsjon",barn:{antallBarn:1,type:k.ADOPTERT_ANNET_BARN,adopsjonsdato:"2023-01-01",adoptertIUtlandet:!1,fødselsdatoer:["2022-01-01"]}};const r=l.bind({});r.args={søkerInfo:s,annenForelder:{...x,datoForAleneomsorg:"2024-01-01"}};const a=l.bind({});a.args={søkerInfo:s,arbeidsforholdOgInntekt:{harHattAndreInntektskilder:!0,harJobbetSomFrilans:!1,harJobbetSomSelvstendigNæringsdrivende:!1},annenInntekt:[{fom:"2024-01-01",tom:"2024-04-01",pågående:!1,type:i.MILITÆRTJENESTE},{fom:"2024-05-01",pågående:!0,type:i.MILITÆRTJENESTE}]};const o=l.bind({});o.args={søkerInfo:s,arbeidsforholdOgInntekt:{harHattAndreInntektskilder:!0,harJobbetSomFrilans:!1,harJobbetSomSelvstendigNæringsdrivende:!1},annenInntekt:[{fom:"2024-01-01",tom:"2024-04-01",type:i.SLUTTPAKKE},{fom:"2024-05-01",tom:"2024-07-01",type:i.SLUTTPAKKE}]};var c,f,T;n.parameters={...n.parameters,docs:{...(c=n.parameters)==null?void 0:c.docs,source:{originalSource:`({
  søkerInfo,
  situasjon = 'fødsel',
  annenForelder = defaultAnnenForelder,
  barn = defaultBarn,
  arbeidsforholdOgInntekt = defaultArbeidsforholdOgInntekt,
  annenInntekt,
  gåTilNesteSide = action('button-click'),
  mellomlagreSøknadOgNaviger = promiseAction()
}) => {
  initAmplitude();
  const apiMock = new MockAdapter(getAxiosInstance());
  apiMock.onPost('/rest/storage/foreldrepenger/vedlegg').reply(200); //story
  apiMock.onPost('http://localhost:8888/rest/storage/foreldrepenger/vedlegg').reply(200); //test

  return <MemoryRouter initialEntries={[SøknadRoutes.DOKUMENTASJON]}>
            <FpDataContext onDispatch={gåTilNesteSide} initialState={{
      [ContextDataType.UTTAKSPLAN]: [],
      [ContextDataType.ANNEN_FORELDER]: annenForelder,
      [ContextDataType.OM_BARNET]: barn,
      [ContextDataType.ARBEIDSFORHOLD_OG_INNTEKT]: arbeidsforholdOgInntekt,
      [ContextDataType.ANDRE_INNTEKTSKILDER]: annenInntekt,
      [ContextDataType.SØKERSITUASJON]: {
        rolle: 'mor',
        situasjon: situasjon
      }
    }}>
                <ManglendeVedlegg søkerInfo={søkerInfo} erEndringssøknad={false} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={action('button-click')} />
            </FpDataContext>
        </MemoryRouter>;
}`,...(T=(f=n.parameters)==null?void 0:f.docs)==null?void 0:T.source}}};var N,S,A;t.parameters={...t.parameters,docs:{...(N=t.parameters)==null?void 0:N.docs,source:{originalSource:`({
  søkerInfo,
  situasjon = 'fødsel',
  annenForelder = defaultAnnenForelder,
  barn = defaultBarn,
  arbeidsforholdOgInntekt = defaultArbeidsforholdOgInntekt,
  annenInntekt,
  gåTilNesteSide = action('button-click'),
  mellomlagreSøknadOgNaviger = promiseAction()
}) => {
  initAmplitude();
  const apiMock = new MockAdapter(getAxiosInstance());
  apiMock.onPost('/rest/storage/foreldrepenger/vedlegg').reply(200); //story
  apiMock.onPost('http://localhost:8888/rest/storage/foreldrepenger/vedlegg').reply(200); //test

  return <MemoryRouter initialEntries={[SøknadRoutes.DOKUMENTASJON]}>
            <FpDataContext onDispatch={gåTilNesteSide} initialState={{
      [ContextDataType.UTTAKSPLAN]: [],
      [ContextDataType.ANNEN_FORELDER]: annenForelder,
      [ContextDataType.OM_BARNET]: barn,
      [ContextDataType.ARBEIDSFORHOLD_OG_INNTEKT]: arbeidsforholdOgInntekt,
      [ContextDataType.ANDRE_INNTEKTSKILDER]: annenInntekt,
      [ContextDataType.SØKERSITUASJON]: {
        rolle: 'mor',
        situasjon: situasjon
      }
    }}>
                <ManglendeVedlegg søkerInfo={søkerInfo} erEndringssøknad={false} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={action('button-click')} />
            </FpDataContext>
        </MemoryRouter>;
}`,...(A=(S=t.parameters)==null?void 0:S.docs)==null?void 0:A.source}}};var I,u,E;r.parameters={...r.parameters,docs:{...(I=r.parameters)==null?void 0:I.docs,source:{originalSource:`({
  søkerInfo,
  situasjon = 'fødsel',
  annenForelder = defaultAnnenForelder,
  barn = defaultBarn,
  arbeidsforholdOgInntekt = defaultArbeidsforholdOgInntekt,
  annenInntekt,
  gåTilNesteSide = action('button-click'),
  mellomlagreSøknadOgNaviger = promiseAction()
}) => {
  initAmplitude();
  const apiMock = new MockAdapter(getAxiosInstance());
  apiMock.onPost('/rest/storage/foreldrepenger/vedlegg').reply(200); //story
  apiMock.onPost('http://localhost:8888/rest/storage/foreldrepenger/vedlegg').reply(200); //test

  return <MemoryRouter initialEntries={[SøknadRoutes.DOKUMENTASJON]}>
            <FpDataContext onDispatch={gåTilNesteSide} initialState={{
      [ContextDataType.UTTAKSPLAN]: [],
      [ContextDataType.ANNEN_FORELDER]: annenForelder,
      [ContextDataType.OM_BARNET]: barn,
      [ContextDataType.ARBEIDSFORHOLD_OG_INNTEKT]: arbeidsforholdOgInntekt,
      [ContextDataType.ANDRE_INNTEKTSKILDER]: annenInntekt,
      [ContextDataType.SØKERSITUASJON]: {
        rolle: 'mor',
        situasjon: situasjon
      }
    }}>
                <ManglendeVedlegg søkerInfo={søkerInfo} erEndringssøknad={false} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={action('button-click')} />
            </FpDataContext>
        </MemoryRouter>;
}`,...(E=(u=r.parameters)==null?void 0:u.docs)==null?void 0:E.source}}};var D,O,y;a.parameters={...a.parameters,docs:{...(D=a.parameters)==null?void 0:D.docs,source:{originalSource:`({
  søkerInfo,
  situasjon = 'fødsel',
  annenForelder = defaultAnnenForelder,
  barn = defaultBarn,
  arbeidsforholdOgInntekt = defaultArbeidsforholdOgInntekt,
  annenInntekt,
  gåTilNesteSide = action('button-click'),
  mellomlagreSøknadOgNaviger = promiseAction()
}) => {
  initAmplitude();
  const apiMock = new MockAdapter(getAxiosInstance());
  apiMock.onPost('/rest/storage/foreldrepenger/vedlegg').reply(200); //story
  apiMock.onPost('http://localhost:8888/rest/storage/foreldrepenger/vedlegg').reply(200); //test

  return <MemoryRouter initialEntries={[SøknadRoutes.DOKUMENTASJON]}>
            <FpDataContext onDispatch={gåTilNesteSide} initialState={{
      [ContextDataType.UTTAKSPLAN]: [],
      [ContextDataType.ANNEN_FORELDER]: annenForelder,
      [ContextDataType.OM_BARNET]: barn,
      [ContextDataType.ARBEIDSFORHOLD_OG_INNTEKT]: arbeidsforholdOgInntekt,
      [ContextDataType.ANDRE_INNTEKTSKILDER]: annenInntekt,
      [ContextDataType.SØKERSITUASJON]: {
        rolle: 'mor',
        situasjon: situasjon
      }
    }}>
                <ManglendeVedlegg søkerInfo={søkerInfo} erEndringssøknad={false} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={action('button-click')} />
            </FpDataContext>
        </MemoryRouter>;
}`,...(y=(O=a.parameters)==null?void 0:O.docs)==null?void 0:y.source}}};var R,b,M;o.parameters={...o.parameters,docs:{...(R=o.parameters)==null?void 0:R.docs,source:{originalSource:`({
  søkerInfo,
  situasjon = 'fødsel',
  annenForelder = defaultAnnenForelder,
  barn = defaultBarn,
  arbeidsforholdOgInntekt = defaultArbeidsforholdOgInntekt,
  annenInntekt,
  gåTilNesteSide = action('button-click'),
  mellomlagreSøknadOgNaviger = promiseAction()
}) => {
  initAmplitude();
  const apiMock = new MockAdapter(getAxiosInstance());
  apiMock.onPost('/rest/storage/foreldrepenger/vedlegg').reply(200); //story
  apiMock.onPost('http://localhost:8888/rest/storage/foreldrepenger/vedlegg').reply(200); //test

  return <MemoryRouter initialEntries={[SøknadRoutes.DOKUMENTASJON]}>
            <FpDataContext onDispatch={gåTilNesteSide} initialState={{
      [ContextDataType.UTTAKSPLAN]: [],
      [ContextDataType.ANNEN_FORELDER]: annenForelder,
      [ContextDataType.OM_BARNET]: barn,
      [ContextDataType.ARBEIDSFORHOLD_OG_INNTEKT]: arbeidsforholdOgInntekt,
      [ContextDataType.ANDRE_INNTEKTSKILDER]: annenInntekt,
      [ContextDataType.SØKERSITUASJON]: {
        rolle: 'mor',
        situasjon: situasjon
      }
    }}>
                <ManglendeVedlegg søkerInfo={søkerInfo} erEndringssøknad={false} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={action('button-click')} />
            </FpDataContext>
        </MemoryRouter>;
}`,...(M=(b=o.parameters)==null?void 0:b.docs)==null?void 0:M.source}}};const Ae=["Termindatodokumentasjon","Omsorgsovertakelsedokumentasjon","Aleneomsorgdokumentasjon","HarAndreInntektskilderMilitærtjeneste","HarAndreInntektskilderEtterlønn"];export{r as Aleneomsorgdokumentasjon,o as HarAndreInntektskilderEtterlønn,a as HarAndreInntektskilderMilitærtjeneste,t as Omsorgsovertakelsedokumentasjon,n as Termindatodokumentasjon,Ae as __namedExportsOrder,Se as default};
