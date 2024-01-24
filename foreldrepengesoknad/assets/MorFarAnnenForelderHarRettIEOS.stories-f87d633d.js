import{j as i}from"./jsx-runtime-1caa8f64.js";import{A as _}from"./AxiosMock-35a08809.js";import{R as y}from"./useRequest-ec5ef0e8.js";import{a as P,_ as v}from"./søkerinfoMorSøker-48ed1da7.js";import{s as d,a as p}from"./stønadskonto80-8e203d8f.js";import{U}from"./UttaksplanInfo-39168f65.js";import{F as b,C as r}from"./FpDataContext-c0784ba8.js";import{m as j}from"./mapSøkerinfoDTO-27dc6acb.js";import{d as n}from"./Tidsperioden-17ce50bb.js";import{B as k}from"./barnUtils-83c58311.js";import{D as l}from"./Periodene-dea6e734.js";import"./index-753920cd.js";import"./index-1cdf6ce0.js";import"./_baseToString-43959ddd.js";import"./_createSet-fe2162c5.js";import{S as L}from"./useFpNavigator-84241c56.js";import{i as C}from"./amplitude-0b5405b7.js";import{M as K}from"./dateFormValidation-46b46a42.js";import"./index-146fc9b8.js";import"./apiInterceptor-71cf49c7.js";import"./isFarEllerMedmor-120238ea.js";import"./leggTilPeriode-e4065a96.js";import"./Perioden-56036cec.js";import"./uttaksPlanStatus-640e4161.js";import"./stringUtils-a9168712.js";import"./IntlProvider-5ccc1ca9.js";import"./dates-01028c04.js";import"./Link-d47e444a.js";import"./createIntl-bf1d8c16.js";import"./uttaksplanInfoUtils-cc16af4c.js";import"./uttaksplanHarForMangeFlerbarnsuker-7b6d3f11.js";import"./eksisterendeSakUtils-412a6125.js";import"./dateUtils-8c5fa214.js";import"./timezone-b3f5c703.js";import"./velkommenUtils-24f8c4c3.js";import"./index-47edccfa.js";import"./Tag-3d686a5d.js";import"./Uttaksplan-dfd0a3e2.js";import"./FormikFileUploader-64cc17d7.js";import"./AttachmentList-ba6bbc3b.js";import"./Attachment-2e83e825.js";import"./ExpansionCard-1aa9e169.js";import"./links-4d39192e.js";import"./arbeidsforholdUtils-37e4afdd.js";import"./_baseIteratee-d7749f38.js";import"./_baseUniq-aff03744.js";import"./formUtils-86bf2e8b.js";import"./LenkeKnapp-725b4f91.js";import"./stønadskontoer-eca8f236.js";import"./Ingress-10c1b249.js";import"./InfoOmSøknaden-b684306a.js";import"./index-daf33b80.js";import"./index-a01a9712.js";import"./v4-4a60fe23.js";import"./amplitude.esm-2809efde.js";const h="/innsyn/v2/annenPartVedtak",E="/konto",H=P,g=v,Be={title:"steps/uttaksplan-info/MorFarAnnenForelderHarRettIEØS",component:U},m=e=>{C();const I=S=>{S.onPost(h).replyOnce(200,void 0,y.FINISHED),S.onGet(E).replyOnce(200,e.stønadskonto100),S.onGet(E).replyOnce(200,e.stønadskonto80)};return i.jsx(K,{initialEntries:[L.UTTAKSPLAN_INFO],children:i.jsx(_,{mock:I,children:i.jsx(b,{initialState:{[r.SØKERSITUASJON]:e.søkersituasjon,[r.OM_BARNET]:e.barn,[r.SØKER]:e.søker,[r.ANNEN_FORELDER]:e.annenForelder,[r.PERIODE_MED_FORELDREPENGER]:{dekningsgrad:e.dekningsgrad}},children:i.jsx(U,{søkerInfo:j(e.søkerinfo),erEndringssøknad:!1,mellomlagreSøknadOgNaviger:()=>Promise.resolve(),avbrytSøknad:()=>{}})})})})},t=m.bind({});t.args={stønadskonto100:d,stønadskonto80:p,søkersituasjon:{situasjon:"adopsjon",rolle:"mor"},barn:{antallBarn:1,type:k.ADOPTERT_ANNET_BARN,adopsjonsdato:n("2021-03-15").toDate(),adoptertIUtlandet:!1,dokumentasjonAvAleneomsorg:[],fødselsdatoer:[],omsorgsovertakelse:[]},annenForelder:{fornavn:"Far",etternavn:"EØS",fnr:"1111UUUUU",harRettPåForeldrepengerINorge:!1,harRettPåForeldrepengerIEØS:!0,kanIkkeOppgis:!1},søker:{erAleneOmOmsorg:!1,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1,harHattAnnenInntektSiste10Mnd:!1},søkerinfo:H,dekningsgrad:l.HUNDRE_PROSENT};const o=m.bind({});o.args={stønadskonto100:d,stønadskonto80:p,søkersituasjon:{situasjon:"adopsjon",rolle:"far"},barn:{antallBarn:1,type:k.ADOPTERT_ANNET_BARN,adopsjonsdato:n("2021-03-15").toDate(),adoptertIUtlandet:!1,dokumentasjonAvAleneomsorg:[],fødselsdatoer:[],omsorgsovertakelse:[]},annenForelder:{fornavn:"Mor",etternavn:"EØS",fnr:"2222UUUUU",harRettPåForeldrepengerINorge:!1,harRettPåForeldrepengerIEØS:!0,kanIkkeOppgis:!1},søker:{erAleneOmOmsorg:!1,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1,harHattAnnenInntektSiste10Mnd:!1},søkerinfo:g,dekningsgrad:l.HUNDRE_PROSENT};const a=m.bind({});a.args={stønadskonto100:d,stønadskonto80:p,søkersituasjon:{situasjon:"fødsel",rolle:"far"},barn:{type:k.ADOPTERT_ANNET_BARN,dokumentasjonAvAleneomsorg:[],fødselsdatoer:[n("2022-06-14").toDate(),n("2022-06-14").toDate()],antallBarn:2,adopsjonsdato:void 0,adoptertIUtlandet:void 0},annenForelder:{fornavn:"Mor",etternavn:"EØS",fnr:"2222UUUUU",harRettPåForeldrepengerINorge:!1,harRettPåForeldrepengerIEØS:!0,kanIkkeOppgis:!1},søker:{erAleneOmOmsorg:!1,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1,harHattAnnenInntektSiste10Mnd:!1},søkerinfo:g,dekningsgrad:l.HUNDRE_PROSENT};const s=m.bind({});s.args={stønadskonto100:d,stønadskonto80:p,søkersituasjon:{situasjon:"fødsel",rolle:"mor"},barn:{dokumentasjonAvAleneomsorg:[],fødselsdatoer:[n("2022-06-14").toDate()],termindato:n("2022-08-14").toDate(),antallBarn:1,adopsjonsdato:void 0,adoptertIUtlandet:void 0,type:k.FØDT},annenForelder:{fornavn:"Espen",etternavn:"EØS",fnr:"2222UUUUU",harRettPåForeldrepengerINorge:!1,harRettPåForeldrepengerIEØS:!0,kanIkkeOppgis:!1},søker:{erAleneOmOmsorg:!1,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1,harHattAnnenInntektSiste10Mnd:!1},søkerinfo:g,dekningsgrad:l.HUNDRE_PROSENT};var F,N,R;t.parameters={...t.parameters,docs:{...(F=t.parameters)==null?void 0:F.docs,source:{originalSource:`args => {
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
}`,...(R=(N=t.parameters)==null?void 0:N.docs)==null?void 0:R.source}}};var x,f,O;o.parameters={...o.parameters,docs:{...(x=o.parameters)==null?void 0:x.docs,source:{originalSource:`args => {
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
}`,...(O=(f=o.parameters)==null?void 0:f.docs)==null?void 0:O.source}}};var D,c,A;a.parameters={...a.parameters,docs:{...(D=a.parameters)==null?void 0:D.docs,source:{originalSource:`args => {
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
}`,...(A=(c=a.parameters)==null?void 0:c.docs)==null?void 0:A.source}}};var T,M,u;s.parameters={...s.parameters,docs:{...(T=s.parameters)==null?void 0:T.docs,source:{originalSource:`args => {
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
}`,...(u=(M=s.parameters)==null?void 0:M.docs)==null?void 0:u.source}}};const Je=["UttaksplanAdopsjonMorSøkerFarHarRettIEOS","UttaksplanAdopsjonFarSøkerMorHarRettIEOS","UttaksplanFødselFarSøkerMorHarRettIEOSTvillinger","UttaksplanFødselMorSøkerFarHarRettIEOSPrematur"];export{o as UttaksplanAdopsjonFarSøkerMorHarRettIEOS,t as UttaksplanAdopsjonMorSøkerFarHarRettIEOS,a as UttaksplanFødselFarSøkerMorHarRettIEOSTvillinger,s as UttaksplanFødselMorSøkerFarHarRettIEOSPrematur,Je as __namedExportsOrder,Be as default};
