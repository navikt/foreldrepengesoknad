import{j as p}from"./jsx-runtime-Cw0GR0a5.js";import{a as g}from"./chunk-MZXVCX43-CM0pFb8Z.js";import{M as U}from"./index-CxzRwX_-.js";import"./index-CTjT7uj6.js";import{g as P}from"./apiInterceptor-D-WKbiXB.js";import"./Tidsperioden-BBrWkrto.js";import"./index-CCQ3W5xA.js";import{B as m,M as B,F as J,C as e}from"./FpDataContext-7C49oNtd.js";import"./Uttaksdagen-C7qvZjyy.js";import"./_baseToString-Cq6MbKF_.js";import"./_createSet-D2BJ0WVx.js";import{i as H}from"./ByttBrowserModal-B_8YCR86.js";import{A as i,S as G}from"./useFpNavigator-BpJPmo6p.js";import{M as b}from"./ManglendeVedlegg-RDeGe9pM.js";import"./v4-CQkTLCs1.js";import"./index-BRV0Se7Z.js";import"./index-DSgjoNiG.js";import"./tslib.es6-CcC3cBMT.js";import"./Link-D0RLsnK2.js";import"./Label-C_UMiHsP.js";import"./index-9r8iugjR.js";import"./links-BegG-28I.js";import"./VStack-DmKyg8-d.js";import"./message-CjkJih2D.js";import"./bemUtils-DmNyTjfb.js";import"./iframe-DRQ5W9Sx.js";import"../sb-preview/runtime.js";import"./ErrorSummaryHookForm-D14xGqJh.js";import"./guid-CsArkN6i.js";import"./_baseForOwn-_34OS4c-.js";import"./_baseUniq-BwrlAMKh.js";import"./dateFormValidation-DamLOwkK.js";import"./innsendingsType-DprMYF-V.js";import"./barnUtils-B98nIsJr.js";import"./vedleggUtils-5XSvYUIy.js";import"./util-dOvmNsK_.js";const V=()=>(...d)=>(g("button-click")(...d),Promise.resolve()),s={søker:{fnr:"19047815714",fornavn:"TALENTFULL",etternavn:"MYGG",kjønn:"K",fødselsdato:"1978-04-19",barn:[{fnr:"21091981146",fødselsdato:"2021-03-15",annenForelder:{fnr:"12038517080",fødselsdato:"1985-03-12",fornavn:"LEALAUS",etternavn:"BÆREPOSE"},fornavn:"KLØKTIG",etternavn:"MIDTPUNKT",kjønn:"M"},{fnr:"31091981146",fødselsdato:"2022-08-02",annenForelder:{fnr:"12038517080",fødselsdato:"1985-03-12",fornavn:"LEALAUS",etternavn:"BÆREPOSE"},fornavn:"SNILT",etternavn:"MIDTPUNKT",kjønn:"M"},{fnr:"31091981147",fødselsdato:"2022-08-02",annenForelder:{fnr:"12038517080",fødselsdato:"1985-03-12",fornavn:"LEALAUS",etternavn:"BÆREPOSE"},fornavn:"LYST",etternavn:"MIDTPUNKT",kjønn:"M"}]},arbeidsforhold:[]},M={fornavn:"Eline",etternavn:"Hagen",kanIkkeOppgis:!1},w={antallBarn:1,type:m.FØDT,fødselsdatoer:["2024-01-01"]},Y={harHattAndreInntektskilder:!1,harJobbetSomFrilans:!1,harJobbetSomSelvstendigNæringsdrivende:!1},be={title:"steps/ManglendeVedlegg",component:b},l=({søkerInfo:d,situasjon:v="fødsel",annenForelder:h=M,barn:K=w,arbeidsforholdOgInntekt:C=Y,annenInntekt:L,gåTilNesteSide:_=g("button-click"),mellomlagreSøknadOgNaviger:j=V()})=>{H();const k=new U(P());return k.onPost("/rest/storage/foreldrepenger/vedlegg").reply(200),k.onPost("http://localhost:8888/rest/storage/foreldrepenger/vedlegg").reply(200),p.jsx(B,{initialEntries:[G.DOKUMENTASJON],children:p.jsx(J,{onDispatch:_,initialState:{[e.UTTAKSPLAN]:[],[e.ANNEN_FORELDER]:h,[e.OM_BARNET]:K,[e.ARBEIDSFORHOLD_OG_INNTEKT]:C,[e.ANDRE_INNTEKTSKILDER]:L,[e.SØKERSITUASJON]:{rolle:"mor",situasjon:v}},children:p.jsx(b,{søkerInfo:d,erEndringssøknad:!1,mellomlagreSøknadOgNaviger:j,avbrytSøknad:g("button-click")})})})},n=l.bind({});n.args={søkerInfo:s,barn:{antallBarn:1,type:m.UFØDT,termindato:"2024-01-01"}};const t=l.bind({});t.args={søkerInfo:s,situasjon:"adopsjon",barn:{antallBarn:1,type:m.ADOPTERT_ANNET_BARN,adopsjonsdato:"2023-01-01",adoptertIUtlandet:!1,fødselsdatoer:["2022-01-01"]}};const r=l.bind({});r.args={søkerInfo:s,annenForelder:{...M,datoForAleneomsorg:"2024-01-01"}};const o=l.bind({});o.args={søkerInfo:s,arbeidsforholdOgInntekt:{harHattAndreInntektskilder:!0,harJobbetSomFrilans:!1,harJobbetSomSelvstendigNæringsdrivende:!1},annenInntekt:[{fom:"2024-01-01",tom:"2024-04-01",pågående:!1,type:i.MILITÆRTJENESTE},{fom:"2024-05-01",pågående:!0,type:i.MILITÆRTJENESTE}]};const a=l.bind({});a.args={søkerInfo:s,arbeidsforholdOgInntekt:{harHattAndreInntektskilder:!0,harJobbetSomFrilans:!1,harJobbetSomSelvstendigNæringsdrivende:!1},annenInntekt:[{fom:"2024-01-01",tom:"2024-04-01",type:i.SLUTTPAKKE},{fom:"2024-05-01",tom:"2024-07-01",type:i.SLUTTPAKKE}]};var c,f,T;n.parameters={...n.parameters,docs:{...(c=n.parameters)==null?void 0:c.docs,source:{originalSource:`({
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
}`,...(T=(f=n.parameters)==null?void 0:f.docs)==null?void 0:T.source}}};var x,N,E;t.parameters={...t.parameters,docs:{...(x=t.parameters)==null?void 0:x.docs,source:{originalSource:`({
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
}`,...(E=(N=t.parameters)==null?void 0:N.docs)==null?void 0:E.source}}};var S,A,I;r.parameters={...r.parameters,docs:{...(S=r.parameters)==null?void 0:S.docs,source:{originalSource:`({
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
}`,...(I=(A=r.parameters)==null?void 0:A.docs)==null?void 0:I.source}}};var u,F,D;o.parameters={...o.parameters,docs:{...(u=o.parameters)==null?void 0:u.docs,source:{originalSource:`({
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
}`,...(D=(F=o.parameters)==null?void 0:F.docs)==null?void 0:D.source}}};var O,y,R;a.parameters={...a.parameters,docs:{...(O=a.parameters)==null?void 0:O.docs,source:{originalSource:`({
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
}`,...(R=(y=a.parameters)==null?void 0:y.docs)==null?void 0:R.source}}};const Me=["Termindatodokumentasjon","Omsorgsovertakelsedokumentasjon","Aleneomsorgdokumentasjon","HarAndreInntektskilderMilitærtjeneste","HarAndreInntektskilderEtterlønn"];export{r as Aleneomsorgdokumentasjon,a as HarAndreInntektskilderEtterlønn,o as HarAndreInntektskilderMilitærtjeneste,t as Omsorgsovertakelsedokumentasjon,n as Termindatodokumentasjon,Me as __namedExportsOrder,be as default};
