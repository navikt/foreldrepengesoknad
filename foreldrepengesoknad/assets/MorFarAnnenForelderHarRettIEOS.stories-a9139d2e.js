import{j as i}from"./jsx-runtime-1caa8f64.js";import{A as _}from"./AxiosMock-35a08809.js";import{R as y}from"./useRequest-ec5ef0e8.js";import{a as P,_ as v}from"./søkerinfoMorSøker-48ed1da7.js";import{s as d,a as p}from"./stønadskonto80-8e203d8f.js";import{U}from"./UttaksplanInfo-3200425f.js";import{F as b,C as r}from"./FpDataContext-c0784ba8.js";import{m as j}from"./mapSøkerinfoDTO-b63f3b29.js";import{d as n}from"./Tidsperioden-0ce27701.js";import{B as k}from"./barnUtils-0a149fde.js";import{D as l}from"./Periodene-d2d4116e.js";import"./index-753920cd.js";import"./index-1cdf6ce0.js";import"./_baseToString-43959ddd.js";import"./_createSet-fe2162c5.js";import{S as L}from"./useFpNavigator-35d501ad.js";import{i as C}from"./IntlProvider-3646511b.js";import{M as K}from"./dateFormValidation-58034f6f.js";import"./index-146fc9b8.js";import"./apiInterceptor-71cf49c7.js";import"./isFarEllerMedmor-120238ea.js";import"./leggTilPeriode-d25c2588.js";import"./Perioden-6bc73957.js";import"./uttaksPlanStatus-e16baf6d.js";import"./stringUtils-5b767063.js";import"./uttaksplanInfoUtils-eeec04a1.js";import"./uttaksplanHarForMangeFlerbarnsuker-a0af04fa.js";import"./eksisterendeSakUtils-636414b7.js";import"./dateUtils-b6bb763e.js";import"./timezone-b3f5c703.js";import"./velkommenUtils-45beb16d.js";import"./index-b0efaffd.js";import"./Uttaksplan-5630a985.js";import"./FormikFileUploader-7eda86b2.js";import"./AttachmentList-afd7fd7b.js";import"./Attachment-c0740781.js";import"./Link-d47e444a.js";import"./dates-11179115.js";import"./ExpansionCard-c322da11.js";import"./links-4d39192e.js";import"./arbeidsforholdUtils-604f9dff.js";import"./_baseIteratee-d7749f38.js";import"./_baseUniq-aff03744.js";import"./LenkeKnapp-725b4f91.js";import"./stønadskontoer-16126b50.js";import"./Ingress-10c1b249.js";import"./InfoOmSøknaden-4a85e274.js";import"./index-daf33b80.js";import"./index-a01a9712.js";import"./v4-4a60fe23.js";import"./amplitude.esm-2809efde.js";import"./createIntl-53be0640.js";const h="/innsyn/v2/annenPartVedtak",E="/konto",H=P,g=v,he={title:"steps/uttaksplan-info/MorFarAnnenForelderHarRettIEØS",component:U},m=e=>{C();const I=S=>{S.onPost(h).replyOnce(200,void 0,y.FINISHED),S.onGet(E).replyOnce(200,e.stønadskonto100),S.onGet(E).replyOnce(200,e.stønadskonto80)};return i.jsx(K,{initialEntries:[L.UTTAKSPLAN_INFO],children:i.jsx(_,{mock:I,children:i.jsx(b,{initialState:{[r.SØKERSITUASJON]:e.søkersituasjon,[r.OM_BARNET]:e.barn,[r.SØKER]:e.søker,[r.ANNEN_FORELDER]:e.annenForelder,[r.PERIODE_MED_FORELDREPENGER]:{dekningsgrad:e.dekningsgrad}},children:i.jsx(U,{søkerInfo:j(e.søkerinfo),erEndringssøknad:!1,mellomlagreSøknadOgNaviger:()=>Promise.resolve(),avbrytSøknad:()=>{}})})})})},t=m.bind({});t.args={stønadskonto100:d,stønadskonto80:p,søkersituasjon:{situasjon:"adopsjon",rolle:"mor"},barn:{antallBarn:1,type:k.ADOPTERT_ANNET_BARN,adopsjonsdato:n("2021-03-15").toDate(),adoptertIUtlandet:!1,dokumentasjonAvAleneomsorg:[],fødselsdatoer:[],omsorgsovertakelse:[]},annenForelder:{fornavn:"Far",etternavn:"EØS",fnr:"1111UUUUU",harRettPåForeldrepengerINorge:!1,harRettPåForeldrepengerIEØS:!0,kanIkkeOppgis:!1},søker:{erAleneOmOmsorg:!1,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1,harHattAnnenInntektSiste10Mnd:!1},søkerinfo:H,dekningsgrad:l.HUNDRE_PROSENT};const a=m.bind({});a.args={stønadskonto100:d,stønadskonto80:p,søkersituasjon:{situasjon:"adopsjon",rolle:"far"},barn:{antallBarn:1,type:k.ADOPTERT_ANNET_BARN,adopsjonsdato:n("2021-03-15").toDate(),adoptertIUtlandet:!1,dokumentasjonAvAleneomsorg:[],fødselsdatoer:[],omsorgsovertakelse:[]},annenForelder:{fornavn:"Mor",etternavn:"EØS",fnr:"2222UUUUU",harRettPåForeldrepengerINorge:!1,harRettPåForeldrepengerIEØS:!0,kanIkkeOppgis:!1},søker:{erAleneOmOmsorg:!1,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1,harHattAnnenInntektSiste10Mnd:!1},søkerinfo:g,dekningsgrad:l.HUNDRE_PROSENT};const o=m.bind({});o.args={stønadskonto100:d,stønadskonto80:p,søkersituasjon:{situasjon:"fødsel",rolle:"far"},barn:{type:k.ADOPTERT_ANNET_BARN,dokumentasjonAvAleneomsorg:[],fødselsdatoer:[n("2022-06-14").toDate(),n("2022-06-14").toDate()],antallBarn:2,adopsjonsdato:void 0,adoptertIUtlandet:void 0},annenForelder:{fornavn:"Mor",etternavn:"EØS",fnr:"2222UUUUU",harRettPåForeldrepengerINorge:!1,harRettPåForeldrepengerIEØS:!0,kanIkkeOppgis:!1},søker:{erAleneOmOmsorg:!1,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1,harHattAnnenInntektSiste10Mnd:!1},søkerinfo:g,dekningsgrad:l.HUNDRE_PROSENT};const s=m.bind({});s.args={stønadskonto100:d,stønadskonto80:p,søkersituasjon:{situasjon:"fødsel",rolle:"mor"},barn:{dokumentasjonAvAleneomsorg:[],fødselsdatoer:[n("2022-06-14").toDate()],termindato:n("2022-08-14").toDate(),antallBarn:1,adopsjonsdato:void 0,adoptertIUtlandet:void 0,type:k.FØDT},annenForelder:{fornavn:"Espen",etternavn:"EØS",fnr:"2222UUUUU",harRettPåForeldrepengerINorge:!1,harRettPåForeldrepengerIEØS:!0,kanIkkeOppgis:!1},søker:{erAleneOmOmsorg:!1,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1,harHattAnnenInntektSiste10Mnd:!1},søkerinfo:g,dekningsgrad:l.HUNDRE_PROSENT};var F,N,R;t.parameters={...t.parameters,docs:{...(F=t.parameters)==null?void 0:F.docs,source:{originalSource:`args => {
  initAmplitude();
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost(UTTAKSPLAN_ANNEN_URL).replyOnce(200, undefined, RequestStatus.FINISHED);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, args.stønadskonto100);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, args.stønadskonto80);
  };
  return <MemoryRouter initialEntries={[SøknadRoutes.UTTAKSPLAN_INFO]}>
            <AxiosMock mock={restMock}>
                <FpDataContext initialState={{
        [ContextDataType.SØKERSITUASJON]: args.søkersituasjon,
        [ContextDataType.OM_BARNET]: args.barn,
        [ContextDataType.SØKER]: args.søker,
        [ContextDataType.ANNEN_FORELDER]: args.annenForelder,
        [ContextDataType.PERIODE_MED_FORELDREPENGER]: {
          dekningsgrad: args.dekningsgrad
        }
      }}>
                    <UttaksplanInfo søkerInfo={mapSøkerinfoDTOToSøkerinfo(args.søkerinfo)} erEndringssøknad={false} mellomlagreSøknadOgNaviger={() => Promise.resolve()} avbrytSøknad={() => undefined} />
                </FpDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(R=(N=t.parameters)==null?void 0:N.docs)==null?void 0:R.source}}};var x,f,O;a.parameters={...a.parameters,docs:{...(x=a.parameters)==null?void 0:x.docs,source:{originalSource:`args => {
  initAmplitude();
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost(UTTAKSPLAN_ANNEN_URL).replyOnce(200, undefined, RequestStatus.FINISHED);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, args.stønadskonto100);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, args.stønadskonto80);
  };
  return <MemoryRouter initialEntries={[SøknadRoutes.UTTAKSPLAN_INFO]}>
            <AxiosMock mock={restMock}>
                <FpDataContext initialState={{
        [ContextDataType.SØKERSITUASJON]: args.søkersituasjon,
        [ContextDataType.OM_BARNET]: args.barn,
        [ContextDataType.SØKER]: args.søker,
        [ContextDataType.ANNEN_FORELDER]: args.annenForelder,
        [ContextDataType.PERIODE_MED_FORELDREPENGER]: {
          dekningsgrad: args.dekningsgrad
        }
      }}>
                    <UttaksplanInfo søkerInfo={mapSøkerinfoDTOToSøkerinfo(args.søkerinfo)} erEndringssøknad={false} mellomlagreSøknadOgNaviger={() => Promise.resolve()} avbrytSøknad={() => undefined} />
                </FpDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(O=(f=a.parameters)==null?void 0:f.docs)==null?void 0:O.source}}};var D,c,A;o.parameters={...o.parameters,docs:{...(D=o.parameters)==null?void 0:D.docs,source:{originalSource:`args => {
  initAmplitude();
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost(UTTAKSPLAN_ANNEN_URL).replyOnce(200, undefined, RequestStatus.FINISHED);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, args.stønadskonto100);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, args.stønadskonto80);
  };
  return <MemoryRouter initialEntries={[SøknadRoutes.UTTAKSPLAN_INFO]}>
            <AxiosMock mock={restMock}>
                <FpDataContext initialState={{
        [ContextDataType.SØKERSITUASJON]: args.søkersituasjon,
        [ContextDataType.OM_BARNET]: args.barn,
        [ContextDataType.SØKER]: args.søker,
        [ContextDataType.ANNEN_FORELDER]: args.annenForelder,
        [ContextDataType.PERIODE_MED_FORELDREPENGER]: {
          dekningsgrad: args.dekningsgrad
        }
      }}>
                    <UttaksplanInfo søkerInfo={mapSøkerinfoDTOToSøkerinfo(args.søkerinfo)} erEndringssøknad={false} mellomlagreSøknadOgNaviger={() => Promise.resolve()} avbrytSøknad={() => undefined} />
                </FpDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(A=(c=o.parameters)==null?void 0:c.docs)==null?void 0:A.source}}};var T,M,u;s.parameters={...s.parameters,docs:{...(T=s.parameters)==null?void 0:T.docs,source:{originalSource:`args => {
  initAmplitude();
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost(UTTAKSPLAN_ANNEN_URL).replyOnce(200, undefined, RequestStatus.FINISHED);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, args.stønadskonto100);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, args.stønadskonto80);
  };
  return <MemoryRouter initialEntries={[SøknadRoutes.UTTAKSPLAN_INFO]}>
            <AxiosMock mock={restMock}>
                <FpDataContext initialState={{
        [ContextDataType.SØKERSITUASJON]: args.søkersituasjon,
        [ContextDataType.OM_BARNET]: args.barn,
        [ContextDataType.SØKER]: args.søker,
        [ContextDataType.ANNEN_FORELDER]: args.annenForelder,
        [ContextDataType.PERIODE_MED_FORELDREPENGER]: {
          dekningsgrad: args.dekningsgrad
        }
      }}>
                    <UttaksplanInfo søkerInfo={mapSøkerinfoDTOToSøkerinfo(args.søkerinfo)} erEndringssøknad={false} mellomlagreSøknadOgNaviger={() => Promise.resolve()} avbrytSøknad={() => undefined} />
                </FpDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(u=(M=s.parameters)==null?void 0:M.docs)==null?void 0:u.source}}};const He=["UttaksplanAdopsjonMorSøkerFarHarRettIEOS","UttaksplanAdopsjonFarSøkerMorHarRettIEOS","UttaksplanFødselFarSøkerMorHarRettIEOSTvillinger","UttaksplanFødselMorSøkerFarHarRettIEOSPrematur"];export{a as UttaksplanAdopsjonFarSøkerMorHarRettIEOS,t as UttaksplanAdopsjonMorSøkerFarHarRettIEOS,o as UttaksplanFødselFarSøkerMorHarRettIEOSTvillinger,s as UttaksplanFødselMorSøkerFarHarRettIEOSPrematur,He as __namedExportsOrder,he as default};
