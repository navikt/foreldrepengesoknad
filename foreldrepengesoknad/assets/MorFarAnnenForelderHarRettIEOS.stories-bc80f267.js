import{j as s}from"./jsx-runtime-1caa8f64.js";import{s as c,a as M}from"./stønadskontoDeltUttak80-23916c37.js";import{s as u,a as U}from"./stønadskontoDeltUttak100Adopsjon-9b36dfa2.js";import{A as y}from"./AxiosMock-9ec34b5d.js";import"./Tidsperioden-806f28f3.js";import{B as i,D as d,M as v}from"./dateFormValidation-fdbfc976.js";import"./index-753920cd.js";import"./index-1cdf6ce0.js";import"./_baseToString-2517c4f7.js";import"./_createSet-019d3bf6.js";import{i as P}from"./Step-9ec5e5b4.js";import{F as L,C as n}from"./FpDataContext-91c673b7.js";import{S as b}from"./useFpNavigator-670f4669.js";import{R as K}from"./useRequest-84d89b79.js";import{U as I}from"./UttaksplanInfo-34ef1166.js";import"./index-146fc9b8.js";import"./apiInterceptor-7536bacb.js";import"./axios-91b57d60.js";import"./index-daf33b80.js";import"./Link-d47e444a.js";import"./index-a01a9712.js";import"./v4-4a60fe23.js";import"./dateUtils-49e5e83c.js";import"./amplitude.esm-2809efde.js";import"./createIntl-eb403849.js";import"./links-4d39192e.js";import"./barnUtils-14b9e8c4.js";import"./uttaksplanInfoUtils-14072030.js";import"./eksisterendeSakUtils-17db7e6b.js";import"./velkommenUtils-27a308d9.js";import"./dateUtils-7d5b08a5.js";import"./stønadskontoer-08fface3.js";import"./BabyWrapped-6ab24c0e.js";import"./ExpansionCard-8d036378.js";import"./LenkeKnapp-725b4f91.js";import"./Ingress-10c1b249.js";const j="/innsyn/v2/annenPartVedtak",S="/konto",p={søker:{fnr:"1212121313",fornavn:"Espen",etternavn:"Utvikler",kjønn:"M",fødselsdato:"1978-04-12",barn:[{fnr:"19047815714",fødselsdato:"2021-03-15",annenForelder:{fnr:"12038517080",fødselsdato:"1985-03-12",fornavn:"TALENTFULL",etternavn:"MYGG"},fornavn:"KLØKTIG",etternavn:"MIDTPUNKT",kjønn:"M"}]}},fe={title:"steps/uttaksplan-info/MorFarAnnenForelderHarRettIEØS",component:I},k=e=>{P();const _=l=>{l.onPost(j).replyOnce(200,void 0,K.FINISHED),l.onGet(S).replyOnce(200,e.stønadskonto80),l.onGet(S).replyOnce(200,e.stønadskonto100)};return s.jsx(v,{initialEntries:[b.UTTAKSPLAN_INFO],children:s.jsx(y,{mock:_,children:s.jsx(L,{initialState:{[n.SØKERSITUASJON]:e.søkersituasjon,[n.OM_BARNET]:e.barn,[n.SØKER_DATA]:e.søkerData,[n.ANNEN_FORELDER]:e.annenForelder,[n.PERIODE_MED_FORELDREPENGER]:{dekningsgrad:e.dekningsgrad}},children:s.jsx(I,{søkerInfo:e.søkerinfo,erEndringssøknad:!1,mellomlagreSøknadOgNaviger:()=>Promise.resolve(),avbrytSøknad:()=>{}})})})})},t=k.bind({});t.args={stønadskonto100:u,stønadskonto80:U,søkersituasjon:{situasjon:"adopsjon",rolle:"mor"},barn:{antallBarn:1,type:i.ADOPTERT_ANNET_BARN,adopsjonsdato:"2021-03-15",adoptertIUtlandet:!1,fødselsdatoer:[]},annenForelder:{fornavn:"Eksotisk",etternavn:"EØS",fnr:"1111UUUUU",harRettPåForeldrepengerINorge:!1,harRettPåForeldrepengerIEØS:!0,kanIkkeOppgis:!1,erAleneOmOmsorg:!1},søkerData:{harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1,harHattAnnenInntektSiste10Mnd:!1},søkerinfo:{søker:{fnr:"19047815714",fornavn:"TALENTFULL",etternavn:"MYGG",kjønn:"K",fødselsdato:"1978-04-19",barn:[{fnr:"21091981146",fødselsdato:"2021-03-15",annenForelder:{fnr:"12038517080",fødselsdato:"1985-03-12",fornavn:"LEALAUS",etternavn:"BÆREPOSE"},fornavn:"KLØKTIG",etternavn:"MIDTPUNKT",kjønn:"M"}]},arbeidsforhold:[]},dekningsgrad:d.HUNDRE_PROSENT};const r=k.bind({});r.args={stønadskonto100:u,stønadskonto80:U,søkersituasjon:{situasjon:"adopsjon",rolle:"far"},barn:{antallBarn:1,type:i.ADOPTERT_ANNET_BARN,adopsjonsdato:"2021-03-15",adoptertIUtlandet:!1,fødselsdatoer:[]},annenForelder:{fornavn:"Palme",etternavn:"EØS",fnr:"2222UUUUU",harRettPåForeldrepengerINorge:!1,harRettPåForeldrepengerIEØS:!0,kanIkkeOppgis:!1,erAleneOmOmsorg:!1},søkerData:{harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1,harHattAnnenInntektSiste10Mnd:!1},søkerinfo:p,dekningsgrad:d.HUNDRE_PROSENT};const a=k.bind({});a.args={stønadskonto100:c,stønadskonto80:M,søkersituasjon:{situasjon:"fødsel",rolle:"far"},barn:{type:i.FØDT,fødselsdatoer:["2022-06-14","2022-06-14"],antallBarn:2,adopsjonsdato:void 0,adoptertIUtlandet:void 0},annenForelder:{fornavn:"Palme",etternavn:"EØS",fnr:"2222UUUUU",harRettPåForeldrepengerINorge:!1,harRettPåForeldrepengerIEØS:!0,kanIkkeOppgis:!1,erAleneOmOmsorg:!1},søkerData:{harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1,harHattAnnenInntektSiste10Mnd:!1},søkerinfo:p,dekningsgrad:d.HUNDRE_PROSENT};const o=k.bind({});o.args={stønadskonto100:c,stønadskonto80:M,søkersituasjon:{situasjon:"fødsel",rolle:"mor"},barn:{fødselsdatoer:["2022-08-14"],termindato:"2022-10-14",antallBarn:1,adopsjonsdato:void 0,adoptertIUtlandet:void 0,type:i.FØDT},annenForelder:{fornavn:"Espen",etternavn:"EØS",fnr:"2222UUUUU",harRettPåForeldrepengerINorge:!1,harRettPåForeldrepengerIEØS:!0,kanIkkeOppgis:!1,erAleneOmOmsorg:!1},søkerData:{harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1,harHattAnnenInntektSiste10Mnd:!1},søkerinfo:p,dekningsgrad:d.HUNDRE_PROSENT};var E,m,F;t.parameters={...t.parameters,docs:{...(E=t.parameters)==null?void 0:E.docs,source:{originalSource:`args => {
  initAmplitude();
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost(UTTAKSPLAN_ANNEN_URL).replyOnce(200, undefined, RequestStatus.FINISHED);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, args.stønadskonto80);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, args.stønadskonto100);
  };
  return <MemoryRouter initialEntries={[SøknadRoutes.UTTAKSPLAN_INFO]}>
            <AxiosMock mock={restMock}>
                <FpDataContext initialState={{
        [ContextDataType.SØKERSITUASJON]: args.søkersituasjon,
        [ContextDataType.OM_BARNET]: args.barn,
        [ContextDataType.SØKER_DATA]: args.søkerData,
        [ContextDataType.ANNEN_FORELDER]: args.annenForelder,
        [ContextDataType.PERIODE_MED_FORELDREPENGER]: {
          dekningsgrad: args.dekningsgrad
        }
      }}>
                    <UttaksplanInfo søkerInfo={args.søkerinfo} erEndringssøknad={false} mellomlagreSøknadOgNaviger={() => Promise.resolve()} avbrytSøknad={() => undefined} />
                </FpDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(F=(m=t.parameters)==null?void 0:m.docs)==null?void 0:F.source}}};var g,N,R;r.parameters={...r.parameters,docs:{...(g=r.parameters)==null?void 0:g.docs,source:{originalSource:`args => {
  initAmplitude();
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost(UTTAKSPLAN_ANNEN_URL).replyOnce(200, undefined, RequestStatus.FINISHED);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, args.stønadskonto80);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, args.stønadskonto100);
  };
  return <MemoryRouter initialEntries={[SøknadRoutes.UTTAKSPLAN_INFO]}>
            <AxiosMock mock={restMock}>
                <FpDataContext initialState={{
        [ContextDataType.SØKERSITUASJON]: args.søkersituasjon,
        [ContextDataType.OM_BARNET]: args.barn,
        [ContextDataType.SØKER_DATA]: args.søkerData,
        [ContextDataType.ANNEN_FORELDER]: args.annenForelder,
        [ContextDataType.PERIODE_MED_FORELDREPENGER]: {
          dekningsgrad: args.dekningsgrad
        }
      }}>
                    <UttaksplanInfo søkerInfo={args.søkerinfo} erEndringssøknad={false} mellomlagreSøknadOgNaviger={() => Promise.resolve()} avbrytSøknad={() => undefined} />
                </FpDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(R=(N=r.parameters)==null?void 0:N.docs)==null?void 0:R.source}}};var D,f,A;a.parameters={...a.parameters,docs:{...(D=a.parameters)==null?void 0:D.docs,source:{originalSource:`args => {
  initAmplitude();
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost(UTTAKSPLAN_ANNEN_URL).replyOnce(200, undefined, RequestStatus.FINISHED);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, args.stønadskonto80);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, args.stønadskonto100);
  };
  return <MemoryRouter initialEntries={[SøknadRoutes.UTTAKSPLAN_INFO]}>
            <AxiosMock mock={restMock}>
                <FpDataContext initialState={{
        [ContextDataType.SØKERSITUASJON]: args.søkersituasjon,
        [ContextDataType.OM_BARNET]: args.barn,
        [ContextDataType.SØKER_DATA]: args.søkerData,
        [ContextDataType.ANNEN_FORELDER]: args.annenForelder,
        [ContextDataType.PERIODE_MED_FORELDREPENGER]: {
          dekningsgrad: args.dekningsgrad
        }
      }}>
                    <UttaksplanInfo søkerInfo={args.søkerinfo} erEndringssøknad={false} mellomlagreSøknadOgNaviger={() => Promise.resolve()} avbrytSøknad={() => undefined} />
                </FpDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(A=(f=a.parameters)==null?void 0:f.docs)==null?void 0:A.source}}};var x,O,T;o.parameters={...o.parameters,docs:{...(x=o.parameters)==null?void 0:x.docs,source:{originalSource:`args => {
  initAmplitude();
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost(UTTAKSPLAN_ANNEN_URL).replyOnce(200, undefined, RequestStatus.FINISHED);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, args.stønadskonto80);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, args.stønadskonto100);
  };
  return <MemoryRouter initialEntries={[SøknadRoutes.UTTAKSPLAN_INFO]}>
            <AxiosMock mock={restMock}>
                <FpDataContext initialState={{
        [ContextDataType.SØKERSITUASJON]: args.søkersituasjon,
        [ContextDataType.OM_BARNET]: args.barn,
        [ContextDataType.SØKER_DATA]: args.søkerData,
        [ContextDataType.ANNEN_FORELDER]: args.annenForelder,
        [ContextDataType.PERIODE_MED_FORELDREPENGER]: {
          dekningsgrad: args.dekningsgrad
        }
      }}>
                    <UttaksplanInfo søkerInfo={args.søkerinfo} erEndringssøknad={false} mellomlagreSøknadOgNaviger={() => Promise.resolve()} avbrytSøknad={() => undefined} />
                </FpDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(T=(O=o.parameters)==null?void 0:O.docs)==null?void 0:T.source}}};const Ae=["AdopsjonMorSøkerFarHarRettIEOSFør1Okt2021","AdopsjonFarSøkerMorHarRettIEOSFør1Okt2021","FødselFarSøkerMorHarRettIEOSTvillingerEtter1Okt2021","FødselMorSøkerFarHarRettIEOSPrematurEtterWLB"];export{r as AdopsjonFarSøkerMorHarRettIEOSFør1Okt2021,t as AdopsjonMorSøkerFarHarRettIEOSFør1Okt2021,a as FødselFarSøkerMorHarRettIEOSTvillingerEtter1Okt2021,o as FødselMorSøkerFarHarRettIEOSPrematurEtterWLB,Ae as __namedExportsOrder,fe as default};
