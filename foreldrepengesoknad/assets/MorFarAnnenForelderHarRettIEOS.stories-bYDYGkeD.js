import{j as s}from"./jsx-runtime-DoxjgJx5.js";import{s as c,a as M}from"./stønadskontoDeltUttak80-ClNcnlfA.js";import{s as u,a as U}from"./stønadskontoDeltUttak100Adopsjon-BhjrSFtc.js";import{A as y}from"./AxiosMock-CeLgoW4g.js";import"./Tidsperioden-DFNhTsrb.js";import"./index-C-6Uy6j4.js";import"./index-Cu9bd8lq.js";import{B as i,D as d,M as v}from"./index-B9A3zV3L.js";import"./_baseToString-yTMKM5a7.js";import"./_createSet-BNfKGSGn.js";import{i as P}from"./Step-BMWRf9Zj.js";import{F as L,C as n}from"./FpDataContext-CjNulmBK.js";import{S as b}from"./useFpNavigator-CF6j52oO.js";import{R as K}from"./useRequest-Bq8ZCFOD.js";import{U as I}from"./UttaksplanInfo-ByVF_KZq.js";import"./index-B_cCgG6K.js";import"./apiInterceptor-D_vgNGab.js";import"./axios-Cm0UX6qg.js";import"./Environment-O62Hvuhd.js";import"./index-SDyqs4cU.js";import"./Link-BqZ6CohM.js";import"./index-Ckls47V4.js";import"./dateFormValidation-MA5Lqg6N.js";import"./links-dJHPeQm3.js";import"./message-qQ5vTvVl.js";import"./amplitude.esm-CWYNo8IU.js";import"./lodash-o8vTUAkc.js";import"./Accordion-cRWldgiV.js";import"./globalUtil-Dfgzi4Xj.js";import"./barnUtils-YK3gCf8L.js";import"./uttaksplanInfoUtils-DWqeSa03.js";import"./eksisterendeSakUtils-DuYLQgNm.js";import"./velkommenUtils-BQUyucy2.js";import"./dateUtils-BS6z62ll.js";import"./stønadskontoer-UbepfB7E.js";import"./BabyWrapped-DPBFjLZF.js";import"./LenkeKnapp-MqIXSt5W.js";const j="/innsyn/v2/annenPartVedtak",S="/konto",p={søker:{fnr:"1212121313",fornavn:"Espen",etternavn:"Utvikler",kjønn:"M",fødselsdato:"1978-04-12",barn:[{fnr:"19047815714",fødselsdato:"2021-03-15",annenForelder:{fnr:"12038517080",fødselsdato:"1985-03-12",fornavn:"TALENTFULL",etternavn:"MYGG"},fornavn:"KLØKTIG",etternavn:"MIDTPUNKT",kjønn:"M"}]}},Ae={title:"steps/uttaksplan-info/MorFarAnnenForelderHarRettIEØS",component:I},k=e=>{P();const _=l=>{l.onPost(j).replyOnce(200,void 0,K.FINISHED),l.onGet(S).replyOnce(200,e.stønadskonto80),l.onGet(S).replyOnce(200,e.stønadskonto100)};return s.jsx(v,{initialEntries:[b.UTTAKSPLAN_INFO],children:s.jsx(y,{mock:_,children:s.jsx(L,{initialState:{[n.SØKERSITUASJON]:e.søkersituasjon,[n.OM_BARNET]:e.barn,[n.SØKER_DATA]:e.søkerData,[n.ANNEN_FORELDER]:e.annenForelder,[n.PERIODE_MED_FORELDREPENGER]:{dekningsgrad:e.dekningsgrad}},children:s.jsx(I,{søkerInfo:e.søkerinfo,erEndringssøknad:!1,mellomlagreSøknadOgNaviger:()=>Promise.resolve(),avbrytSøknad:()=>{}})})})})},t=k.bind({});t.args={stønadskonto100:u,stønadskonto80:U,søkersituasjon:{situasjon:"adopsjon",rolle:"mor"},barn:{antallBarn:1,type:i.ADOPTERT_ANNET_BARN,adopsjonsdato:"2021-03-15",adoptertIUtlandet:!1,fødselsdatoer:[]},annenForelder:{fornavn:"Eksotisk",etternavn:"EØS",fnr:"1111UUUUU",harRettPåForeldrepengerINorge:!1,harRettPåForeldrepengerIEØS:!0,kanIkkeOppgis:!1,erAleneOmOmsorg:!1},søkerData:{harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1,harHattAnnenInntektSiste10Mnd:!1},søkerinfo:{søker:{fnr:"19047815714",fornavn:"TALENTFULL",etternavn:"MYGG",kjønn:"K",fødselsdato:"1978-04-19",barn:[{fnr:"21091981146",fødselsdato:"2021-03-15",annenForelder:{fnr:"12038517080",fødselsdato:"1985-03-12",fornavn:"LEALAUS",etternavn:"BÆREPOSE"},fornavn:"KLØKTIG",etternavn:"MIDTPUNKT",kjønn:"M"}]},arbeidsforhold:[]},dekningsgrad:d.HUNDRE_PROSENT};const r=k.bind({});r.args={stønadskonto100:u,stønadskonto80:U,søkersituasjon:{situasjon:"adopsjon",rolle:"far"},barn:{antallBarn:1,type:i.ADOPTERT_ANNET_BARN,adopsjonsdato:"2021-03-15",adoptertIUtlandet:!1,fødselsdatoer:[]},annenForelder:{fornavn:"Palme",etternavn:"EØS",fnr:"2222UUUUU",harRettPåForeldrepengerINorge:!1,harRettPåForeldrepengerIEØS:!0,kanIkkeOppgis:!1,erAleneOmOmsorg:!1},søkerData:{harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1,harHattAnnenInntektSiste10Mnd:!1},søkerinfo:p,dekningsgrad:d.HUNDRE_PROSENT};const a=k.bind({});a.args={stønadskonto100:c,stønadskonto80:M,søkersituasjon:{situasjon:"fødsel",rolle:"far"},barn:{type:i.FØDT,fødselsdatoer:["2022-06-14","2022-06-14"],antallBarn:2,adopsjonsdato:void 0,adoptertIUtlandet:void 0},annenForelder:{fornavn:"Palme",etternavn:"EØS",fnr:"2222UUUUU",harRettPåForeldrepengerINorge:!1,harRettPåForeldrepengerIEØS:!0,kanIkkeOppgis:!1,erAleneOmOmsorg:!1},søkerData:{harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1,harHattAnnenInntektSiste10Mnd:!1},søkerinfo:p,dekningsgrad:d.HUNDRE_PROSENT};const o=k.bind({});o.args={stønadskonto100:c,stønadskonto80:M,søkersituasjon:{situasjon:"fødsel",rolle:"mor"},barn:{fødselsdatoer:["2022-08-14"],termindato:"2022-10-14",antallBarn:1,adopsjonsdato:void 0,adoptertIUtlandet:void 0,type:i.FØDT},annenForelder:{fornavn:"Espen",etternavn:"EØS",fnr:"2222UUUUU",harRettPåForeldrepengerINorge:!1,harRettPåForeldrepengerIEØS:!0,kanIkkeOppgis:!1,erAleneOmOmsorg:!1},søkerData:{harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1,harHattAnnenInntektSiste10Mnd:!1},søkerinfo:p,dekningsgrad:d.HUNDRE_PROSENT};var E,m,F;t.parameters={...t.parameters,docs:{...(E=t.parameters)==null?void 0:E.docs,source:{originalSource:`args => {
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
}`,...(T=(O=o.parameters)==null?void 0:O.docs)==null?void 0:T.source}}};const xe=["AdopsjonMorSøkerFarHarRettIEOSFør1Okt2021","AdopsjonFarSøkerMorHarRettIEOSFør1Okt2021","FødselFarSøkerMorHarRettIEOSTvillingerEtter1Okt2021","FødselMorSøkerFarHarRettIEOSPrematurEtterWLB"];export{r as AdopsjonFarSøkerMorHarRettIEOSFør1Okt2021,t as AdopsjonMorSøkerFarHarRettIEOSFør1Okt2021,a as FødselFarSøkerMorHarRettIEOSTvillingerEtter1Okt2021,o as FødselMorSøkerFarHarRettIEOSPrematurEtterWLB,xe as __namedExportsOrder,Ae as default};
