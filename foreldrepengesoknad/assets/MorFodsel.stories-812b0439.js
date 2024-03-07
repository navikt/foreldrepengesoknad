import{j as F}from"./jsx-runtime-1caa8f64.js";import{d as n}from"./dates-37291467.js";import{b as T,s as Y,a as W}from"./stønadskontoDeltUttak100WLB-4f8cea3b.js";import{A as z}from"./AxiosMock-f85117c7.js";import{B as t}from"./barnUtils-aeabd763.js";import{D as a}from"./Dekningsgrad-fced8842.js";import{D as Q}from"./eksisterendeSakUtils-dc4a7a65.js";import"./index-753920cd.js";import"./index-1cdf6ce0.js";import"./_baseToString-2517c4f7.js";import"./_createSet-019d3bf6.js";import{i as X}from"./IntlProvider-067bcbb8.js";import{F as Z,C as s}from"./FpDataContext-9c963fd7.js";import{S as nn}from"./useFpNavigator-aed5ab8f.js";import{R as A}from"./useRequest-603f2ddc.js";import{U as $}from"./UttaksplanInfo-a6a9e052.js";import{M as en}from"./dateFormValidation-a676b58d.js";import"./index-daf33b80.js";import"./Link-d47e444a.js";import"./index-a01a9712.js";import"./v4-4a60fe23.js";import"./index-146fc9b8.js";import"./apiInterceptor-d1094a41.js";import"./Arbeidsform-a1ff9760.js";import"./uttaksPlanStatus-b4a351f3.js";import"./Perioden-e5e2ab84.js";import"./stringUtils-d2289bbc.js";import"./velkommenUtils-2e714f64.js";import"./dateUtils-191f81f7.js";import"./Periodene-4bccf8b9.js";import"./amplitude.esm-2809efde.js";import"./createIntl-3a69cb36.js";import"./isFarEllerMedmor-120238ea.js";import"./uttaksplanInfoUtils-50edc764.js";import"./index-59ab5c7e.js";import"./links-4d39192e.js";import"./Accordion-81709660.js";import"./stønadskontoer-48685726.js";import"./ExpansionCard-c4976158.js";import"./LenkeKnapp-725b4f91.js";import"./Ingress-10c1b249.js";const tn={FORELDREPENGER:280,FORELDREPENGER_FØR_FØDSEL:15},an={farRundtFødsel:0,generellMinsterett:0,toTette:0},N={kontoer:tn,minsteretter:an},rn={FORELDREPENGER:230,FORELDREPENGER_FØR_FØDSEL:15},sn={farRundtFødsel:0,generellMinsterett:0,toTette:0},S={kontoer:rn,minsteretter:sn},on={MØDREKVOTE:95,FEDREKVOTE:95,FELLESPERIODE:195,FORELDREPENGER_FØR_FØDSEL:15,FLERBARNSDAGER:105},dn={farRundtFødsel:0,generellMinsterett:0,toTette:0},ln={kontoer:on,minsteretter:dn},kn={MØDREKVOTE:75,FEDREKVOTE:75,FELLESPERIODE:165,FORELDREPENGER_FØR_FØDSEL:15,FLERBARNSDAGER:85},Dn={farRundtFødsel:0,generellMinsterett:0,toTette:0},En={kontoer:kn,minsteretter:Dn},R="/innsyn/v2/annenPartVedtak",x="/konto",pn=[{fom:"2024-02-07",tom:"2024-02-27",kontoType:"MØDREKVOTE",overføringÅrsak:"INSTITUSJONSOPPHOLD_ANNEN_FORELDER",resultat:{innvilget:!0,trekkerMinsterett:!1,trekkerDager:!0,årsak:"ANNET"}},{fom:"2024-06-11",tom:"2024-06-30",kontoType:"FELLESPERIODE",resultat:{innvilget:!0,trekkerMinsterett:!1,trekkerDager:!0,årsak:"ANNET"}}],ee={title:"steps/uttaksplan-info/MorFødsel",component:$},r=e=>{X();const w=g=>{e.uttaksplanAnnenPart?g.onPost(R).replyOnce(200,{perioder:e.uttaksplanAnnenPart,dekningsgrad:Q.HUNDRE_PROSENT},A.FINISHED):g.onPost(R).replyOnce(200,void 0,A.FINISHED),g.onGet(x).replyOnce(200,e.stønadskonto80),g.onGet(x).replyOnce(200,e.stønadskonto100)};return F.jsx(en,{initialEntries:[nn.UTTAKSPLAN_INFO],children:F.jsx(z,{mock:w,children:F.jsx(Z,{initialState:{[s.SØKERSITUASJON]:{situasjon:"fødsel",rolle:"mor"},[s.OM_BARNET]:e.barn,[s.SØKER_DATA]:e.søkerData,[s.ANNEN_FORELDER]:e.annenForelder,[s.PERIODE_MED_FORELDREPENGER]:{dekningsgrad:e.dekningsgrad}},children:F.jsx($,{søker:{fnr:"19047815714",fornavn:"TALENTFULL",etternavn:"MYGG",kjønn:"K",fødselsdato:"1978-04-19",barn:[{fnr:"21091981146",fødselsdato:"2021-03-15",annenForelder:{fnr:"12038517080",fødselsdato:"1985-03-12",fornavn:"LEALAUS",etternavn:"BÆREPOSE"},fornavn:"KLØKTIG",etternavn:"MIDTPUNKT",kjønn:"M"}]},erEndringssøknad:!1,mellomlagreSøknadOgNaviger:()=>Promise.resolve(),avbrytSøknad:()=>{}})})})})},o=r.bind({});o.args={stønadskonto100:S,stønadskonto80:N,barn:{type:t.FØDT,fødselsdatoer:[n("2021-03-15").toDate()],antallBarn:1,datoForAleneomsorg:new Date},annenForelder:{kanIkkeOppgis:!0},søkerData:{erAleneOmOmsorg:!0,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1,harHattAnnenInntektSiste10Mnd:!1},dekningsgrad:a.HUNDRE_PROSENT};const d=r.bind({});d.args={stønadskonto100:S,stønadskonto80:N,barn:{type:t.FØDT,fødselsdatoer:[n("2021-03-15").toDate()],antallBarn:1,datoForAleneomsorg:new Date},annenForelder:{kanIkkeOppgis:!0},søkerData:{erAleneOmOmsorg:!1,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1,harHattAnnenInntektSiste10Mnd:!1},dekningsgrad:a.ÅTTI_PROSENT};const i=r.bind({});i.args={stønadskonto100:S,stønadskonto80:N,barn:{type:t.FØDT,fødselsdatoer:[n("2023-01-25").toDate()],termindato:n("2023-04-01").toDate(),antallBarn:1,datoForAleneomsorg:new Date},annenForelder:{kanIkkeOppgis:!0},søkerData:{erAleneOmOmsorg:!1,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1,harHattAnnenInntektSiste10Mnd:!1},dekningsgrad:a.HUNDRE_PROSENT};const l=r.bind({});l.args={stønadskonto100:T,stønadskonto80:T,barn:{type:t.FØDT,antallBarn:1,datoForAleneomsorg:new Date,fødselsdatoer:[n("2023-01-11").toDate()],termindato:n("2023-03-11").toDate()},annenForelder:{fornavn:"Espen",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1},søkerData:{erAleneOmOmsorg:!1,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1,harHattAnnenInntektSiste10Mnd:!1},dekningsgrad:a.HUNDRE_PROSENT};const k=r.bind({});k.args={stønadskonto100:Y,stønadskonto80:W,barn:{type:t.FØDT,fødselsdatoer:[n("2022-12-15").toDate()],antallBarn:1},annenForelder:{fornavn:"Espen",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1},søkerData:{erAleneOmOmsorg:!1,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1,harHattAnnenInntektSiste10Mnd:!1},dekningsgrad:a.HUNDRE_PROSENT};const D=r.bind({});D.args={stønadskonto100:En,stønadskonto80:ln,barn:{type:t.FØDT,fødselsdatoer:[n("2022-07-15").toDate()],antallBarn:2,datoForAleneomsorg:new Date},annenForelder:{fornavn:"Espen",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1},søkerData:{erAleneOmOmsorg:!1,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1,harHattAnnenInntektSiste10Mnd:!1},dekningsgrad:a.HUNDRE_PROSENT};const E=r.bind({});E.args={stønadskonto100:Y,stønadskonto80:W,barn:{type:t.FØDT,fødselsdatoer:[n("2024-01-15").toDate()],antallBarn:1},annenForelder:{fornavn:"Espen",etternavn:"Utvikler",fnr:"1212121313",utenlandskFnr:!1,harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1,erInformertOmSøknaden:!0},søkerData:{erAleneOmOmsorg:!1,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1,harHattAnnenInntektSiste10Mnd:!1},dekningsgrad:a.HUNDRE_PROSENT,uttaksplanAnnenPart:pn};const p=r.bind({});p.args={stønadskonto100:S,stønadskonto80:N,barn:{type:t.FØDT,fødselsdatoer:[n("2024-01-15").toDate()],antallBarn:1},annenForelder:{fornavn:"Espen",etternavn:"Utvikler",fnr:"1212121313",utenlandskFnr:!1,harRettPåForeldrepengerINorge:!1,kanIkkeOppgis:!1},søkerData:{erAleneOmOmsorg:!1,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1,harHattAnnenInntektSiste10Mnd:!1},dekningsgrad:a.HUNDRE_PROSENT};var O,m,f;o.parameters={...o.parameters,docs:{...(O=o.parameters)==null?void 0:O.docs,source:{originalSource:`args => {
  initAmplitude();
  const restMock = (apiMock: MockAdapter) => {
    if (args.uttaksplanAnnenPart) {
      apiMock.onPost(UTTAKSPLAN_ANNEN_URL).replyOnce(200, ({
        perioder: args.uttaksplanAnnenPart,
        dekningsgrad: DekningsgradDTO.HUNDRE_PROSENT
      } as AnnenPartVedtakDTO), RequestStatus.FINISHED);
    } else {
      apiMock.onPost(UTTAKSPLAN_ANNEN_URL).replyOnce(200, undefined, RequestStatus.FINISHED);
    }
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, args.stønadskonto80);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, args.stønadskonto100);
  };
  return <MemoryRouter initialEntries={[SøknadRoutes.UTTAKSPLAN_INFO]}>
            <AxiosMock mock={restMock}>
                <FpDataContext initialState={{
        [ContextDataType.SØKERSITUASJON]: {
          situasjon: 'fødsel',
          rolle: 'mor'
        },
        [ContextDataType.OM_BARNET]: args.barn,
        [ContextDataType.SØKER_DATA]: args.søkerData,
        [ContextDataType.ANNEN_FORELDER]: args.annenForelder,
        [ContextDataType.PERIODE_MED_FORELDREPENGER]: {
          dekningsgrad: args.dekningsgrad
        }
      }}>
                    <UttaksplanInfo søker={{
          fnr: '19047815714',
          fornavn: 'TALENTFULL',
          etternavn: 'MYGG',
          kjønn: 'K',
          fødselsdato: '1978-04-19',
          barn: [{
            fnr: '21091981146',
            fødselsdato: '2021-03-15',
            annenForelder: {
              fnr: '12038517080',
              fødselsdato: '1985-03-12',
              fornavn: 'LEALAUS',
              etternavn: 'BÆREPOSE'
            },
            fornavn: 'KLØKTIG',
            etternavn: 'MIDTPUNKT',
            kjønn: 'M'
          }]
        }} erEndringssøknad={false} mellomlagreSøknadOgNaviger={() => Promise.resolve()} avbrytSøknad={() => undefined} />
                </FpDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(f=(m=o.parameters)==null?void 0:m.docs)==null?void 0:f.source}}};var c,M,u;d.parameters={...d.parameters,docs:{...(c=d.parameters)==null?void 0:c.docs,source:{originalSource:`args => {
  initAmplitude();
  const restMock = (apiMock: MockAdapter) => {
    if (args.uttaksplanAnnenPart) {
      apiMock.onPost(UTTAKSPLAN_ANNEN_URL).replyOnce(200, ({
        perioder: args.uttaksplanAnnenPart,
        dekningsgrad: DekningsgradDTO.HUNDRE_PROSENT
      } as AnnenPartVedtakDTO), RequestStatus.FINISHED);
    } else {
      apiMock.onPost(UTTAKSPLAN_ANNEN_URL).replyOnce(200, undefined, RequestStatus.FINISHED);
    }
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, args.stønadskonto80);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, args.stønadskonto100);
  };
  return <MemoryRouter initialEntries={[SøknadRoutes.UTTAKSPLAN_INFO]}>
            <AxiosMock mock={restMock}>
                <FpDataContext initialState={{
        [ContextDataType.SØKERSITUASJON]: {
          situasjon: 'fødsel',
          rolle: 'mor'
        },
        [ContextDataType.OM_BARNET]: args.barn,
        [ContextDataType.SØKER_DATA]: args.søkerData,
        [ContextDataType.ANNEN_FORELDER]: args.annenForelder,
        [ContextDataType.PERIODE_MED_FORELDREPENGER]: {
          dekningsgrad: args.dekningsgrad
        }
      }}>
                    <UttaksplanInfo søker={{
          fnr: '19047815714',
          fornavn: 'TALENTFULL',
          etternavn: 'MYGG',
          kjønn: 'K',
          fødselsdato: '1978-04-19',
          barn: [{
            fnr: '21091981146',
            fødselsdato: '2021-03-15',
            annenForelder: {
              fnr: '12038517080',
              fødselsdato: '1985-03-12',
              fornavn: 'LEALAUS',
              etternavn: 'BÆREPOSE'
            },
            fornavn: 'KLØKTIG',
            etternavn: 'MIDTPUNKT',
            kjønn: 'M'
          }]
        }} erEndringssøknad={false} mellomlagreSøknadOgNaviger={() => Promise.resolve()} avbrytSøknad={() => undefined} />
                </FpDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(u=(M=d.parameters)==null?void 0:M.docs)==null?void 0:u.source}}};var L,P,U;i.parameters={...i.parameters,docs:{...(L=i.parameters)==null?void 0:L.docs,source:{originalSource:`args => {
  initAmplitude();
  const restMock = (apiMock: MockAdapter) => {
    if (args.uttaksplanAnnenPart) {
      apiMock.onPost(UTTAKSPLAN_ANNEN_URL).replyOnce(200, ({
        perioder: args.uttaksplanAnnenPart,
        dekningsgrad: DekningsgradDTO.HUNDRE_PROSENT
      } as AnnenPartVedtakDTO), RequestStatus.FINISHED);
    } else {
      apiMock.onPost(UTTAKSPLAN_ANNEN_URL).replyOnce(200, undefined, RequestStatus.FINISHED);
    }
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, args.stønadskonto80);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, args.stønadskonto100);
  };
  return <MemoryRouter initialEntries={[SøknadRoutes.UTTAKSPLAN_INFO]}>
            <AxiosMock mock={restMock}>
                <FpDataContext initialState={{
        [ContextDataType.SØKERSITUASJON]: {
          situasjon: 'fødsel',
          rolle: 'mor'
        },
        [ContextDataType.OM_BARNET]: args.barn,
        [ContextDataType.SØKER_DATA]: args.søkerData,
        [ContextDataType.ANNEN_FORELDER]: args.annenForelder,
        [ContextDataType.PERIODE_MED_FORELDREPENGER]: {
          dekningsgrad: args.dekningsgrad
        }
      }}>
                    <UttaksplanInfo søker={{
          fnr: '19047815714',
          fornavn: 'TALENTFULL',
          etternavn: 'MYGG',
          kjønn: 'K',
          fødselsdato: '1978-04-19',
          barn: [{
            fnr: '21091981146',
            fødselsdato: '2021-03-15',
            annenForelder: {
              fnr: '12038517080',
              fødselsdato: '1985-03-12',
              fornavn: 'LEALAUS',
              etternavn: 'BÆREPOSE'
            },
            fornavn: 'KLØKTIG',
            etternavn: 'MIDTPUNKT',
            kjønn: 'M'
          }]
        }} erEndringssøknad={false} mellomlagreSøknadOgNaviger={() => Promise.resolve()} avbrytSøknad={() => undefined} />
                </FpDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(U=(P=i.parameters)==null?void 0:P.docs)==null?void 0:U.source}}};var _,v,I;l.parameters={...l.parameters,docs:{...(_=l.parameters)==null?void 0:_.docs,source:{originalSource:`args => {
  initAmplitude();
  const restMock = (apiMock: MockAdapter) => {
    if (args.uttaksplanAnnenPart) {
      apiMock.onPost(UTTAKSPLAN_ANNEN_URL).replyOnce(200, ({
        perioder: args.uttaksplanAnnenPart,
        dekningsgrad: DekningsgradDTO.HUNDRE_PROSENT
      } as AnnenPartVedtakDTO), RequestStatus.FINISHED);
    } else {
      apiMock.onPost(UTTAKSPLAN_ANNEN_URL).replyOnce(200, undefined, RequestStatus.FINISHED);
    }
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, args.stønadskonto80);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, args.stønadskonto100);
  };
  return <MemoryRouter initialEntries={[SøknadRoutes.UTTAKSPLAN_INFO]}>
            <AxiosMock mock={restMock}>
                <FpDataContext initialState={{
        [ContextDataType.SØKERSITUASJON]: {
          situasjon: 'fødsel',
          rolle: 'mor'
        },
        [ContextDataType.OM_BARNET]: args.barn,
        [ContextDataType.SØKER_DATA]: args.søkerData,
        [ContextDataType.ANNEN_FORELDER]: args.annenForelder,
        [ContextDataType.PERIODE_MED_FORELDREPENGER]: {
          dekningsgrad: args.dekningsgrad
        }
      }}>
                    <UttaksplanInfo søker={{
          fnr: '19047815714',
          fornavn: 'TALENTFULL',
          etternavn: 'MYGG',
          kjønn: 'K',
          fødselsdato: '1978-04-19',
          barn: [{
            fnr: '21091981146',
            fødselsdato: '2021-03-15',
            annenForelder: {
              fnr: '12038517080',
              fødselsdato: '1985-03-12',
              fornavn: 'LEALAUS',
              etternavn: 'BÆREPOSE'
            },
            fornavn: 'KLØKTIG',
            etternavn: 'MIDTPUNKT',
            kjønn: 'M'
          }]
        }} erEndringssøknad={false} mellomlagreSøknadOgNaviger={() => Promise.resolve()} avbrytSøknad={() => undefined} />
                </FpDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(I=(v=l.parameters)==null?void 0:v.docs)==null?void 0:I.source}}};var y,K,b;k.parameters={...k.parameters,docs:{...(y=k.parameters)==null?void 0:y.docs,source:{originalSource:`args => {
  initAmplitude();
  const restMock = (apiMock: MockAdapter) => {
    if (args.uttaksplanAnnenPart) {
      apiMock.onPost(UTTAKSPLAN_ANNEN_URL).replyOnce(200, ({
        perioder: args.uttaksplanAnnenPart,
        dekningsgrad: DekningsgradDTO.HUNDRE_PROSENT
      } as AnnenPartVedtakDTO), RequestStatus.FINISHED);
    } else {
      apiMock.onPost(UTTAKSPLAN_ANNEN_URL).replyOnce(200, undefined, RequestStatus.FINISHED);
    }
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, args.stønadskonto80);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, args.stønadskonto100);
  };
  return <MemoryRouter initialEntries={[SøknadRoutes.UTTAKSPLAN_INFO]}>
            <AxiosMock mock={restMock}>
                <FpDataContext initialState={{
        [ContextDataType.SØKERSITUASJON]: {
          situasjon: 'fødsel',
          rolle: 'mor'
        },
        [ContextDataType.OM_BARNET]: args.barn,
        [ContextDataType.SØKER_DATA]: args.søkerData,
        [ContextDataType.ANNEN_FORELDER]: args.annenForelder,
        [ContextDataType.PERIODE_MED_FORELDREPENGER]: {
          dekningsgrad: args.dekningsgrad
        }
      }}>
                    <UttaksplanInfo søker={{
          fnr: '19047815714',
          fornavn: 'TALENTFULL',
          etternavn: 'MYGG',
          kjønn: 'K',
          fødselsdato: '1978-04-19',
          barn: [{
            fnr: '21091981146',
            fødselsdato: '2021-03-15',
            annenForelder: {
              fnr: '12038517080',
              fødselsdato: '1985-03-12',
              fornavn: 'LEALAUS',
              etternavn: 'BÆREPOSE'
            },
            fornavn: 'KLØKTIG',
            etternavn: 'MIDTPUNKT',
            kjønn: 'M'
          }]
        }} erEndringssøknad={false} mellomlagreSøknadOgNaviger={() => Promise.resolve()} avbrytSøknad={() => undefined} />
                </FpDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(b=(K=k.parameters)==null?void 0:K.docs)==null?void 0:b.source}}};var C,G,H;D.parameters={...D.parameters,docs:{...(C=D.parameters)==null?void 0:C.docs,source:{originalSource:`args => {
  initAmplitude();
  const restMock = (apiMock: MockAdapter) => {
    if (args.uttaksplanAnnenPart) {
      apiMock.onPost(UTTAKSPLAN_ANNEN_URL).replyOnce(200, ({
        perioder: args.uttaksplanAnnenPart,
        dekningsgrad: DekningsgradDTO.HUNDRE_PROSENT
      } as AnnenPartVedtakDTO), RequestStatus.FINISHED);
    } else {
      apiMock.onPost(UTTAKSPLAN_ANNEN_URL).replyOnce(200, undefined, RequestStatus.FINISHED);
    }
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, args.stønadskonto80);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, args.stønadskonto100);
  };
  return <MemoryRouter initialEntries={[SøknadRoutes.UTTAKSPLAN_INFO]}>
            <AxiosMock mock={restMock}>
                <FpDataContext initialState={{
        [ContextDataType.SØKERSITUASJON]: {
          situasjon: 'fødsel',
          rolle: 'mor'
        },
        [ContextDataType.OM_BARNET]: args.barn,
        [ContextDataType.SØKER_DATA]: args.søkerData,
        [ContextDataType.ANNEN_FORELDER]: args.annenForelder,
        [ContextDataType.PERIODE_MED_FORELDREPENGER]: {
          dekningsgrad: args.dekningsgrad
        }
      }}>
                    <UttaksplanInfo søker={{
          fnr: '19047815714',
          fornavn: 'TALENTFULL',
          etternavn: 'MYGG',
          kjønn: 'K',
          fødselsdato: '1978-04-19',
          barn: [{
            fnr: '21091981146',
            fødselsdato: '2021-03-15',
            annenForelder: {
              fnr: '12038517080',
              fødselsdato: '1985-03-12',
              fornavn: 'LEALAUS',
              etternavn: 'BÆREPOSE'
            },
            fornavn: 'KLØKTIG',
            etternavn: 'MIDTPUNKT',
            kjønn: 'M'
          }]
        }} erEndringssøknad={false} mellomlagreSøknadOgNaviger={() => Promise.resolve()} avbrytSøknad={() => undefined} />
                </FpDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(H=(G=D.parameters)==null?void 0:G.docs)==null?void 0:H.source}}};var B,j,h;E.parameters={...E.parameters,docs:{...(B=E.parameters)==null?void 0:B.docs,source:{originalSource:`args => {
  initAmplitude();
  const restMock = (apiMock: MockAdapter) => {
    if (args.uttaksplanAnnenPart) {
      apiMock.onPost(UTTAKSPLAN_ANNEN_URL).replyOnce(200, ({
        perioder: args.uttaksplanAnnenPart,
        dekningsgrad: DekningsgradDTO.HUNDRE_PROSENT
      } as AnnenPartVedtakDTO), RequestStatus.FINISHED);
    } else {
      apiMock.onPost(UTTAKSPLAN_ANNEN_URL).replyOnce(200, undefined, RequestStatus.FINISHED);
    }
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, args.stønadskonto80);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, args.stønadskonto100);
  };
  return <MemoryRouter initialEntries={[SøknadRoutes.UTTAKSPLAN_INFO]}>
            <AxiosMock mock={restMock}>
                <FpDataContext initialState={{
        [ContextDataType.SØKERSITUASJON]: {
          situasjon: 'fødsel',
          rolle: 'mor'
        },
        [ContextDataType.OM_BARNET]: args.barn,
        [ContextDataType.SØKER_DATA]: args.søkerData,
        [ContextDataType.ANNEN_FORELDER]: args.annenForelder,
        [ContextDataType.PERIODE_MED_FORELDREPENGER]: {
          dekningsgrad: args.dekningsgrad
        }
      }}>
                    <UttaksplanInfo søker={{
          fnr: '19047815714',
          fornavn: 'TALENTFULL',
          etternavn: 'MYGG',
          kjønn: 'K',
          fødselsdato: '1978-04-19',
          barn: [{
            fnr: '21091981146',
            fødselsdato: '2021-03-15',
            annenForelder: {
              fnr: '12038517080',
              fødselsdato: '1985-03-12',
              fornavn: 'LEALAUS',
              etternavn: 'BÆREPOSE'
            },
            fornavn: 'KLØKTIG',
            etternavn: 'MIDTPUNKT',
            kjønn: 'M'
          }]
        }} erEndringssøknad={false} mellomlagreSøknadOgNaviger={() => Promise.resolve()} avbrytSøknad={() => undefined} />
                </FpDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(h=(j=E.parameters)==null?void 0:j.docs)==null?void 0:h.source}}};var J,q,V;p.parameters={...p.parameters,docs:{...(J=p.parameters)==null?void 0:J.docs,source:{originalSource:`args => {
  initAmplitude();
  const restMock = (apiMock: MockAdapter) => {
    if (args.uttaksplanAnnenPart) {
      apiMock.onPost(UTTAKSPLAN_ANNEN_URL).replyOnce(200, ({
        perioder: args.uttaksplanAnnenPart,
        dekningsgrad: DekningsgradDTO.HUNDRE_PROSENT
      } as AnnenPartVedtakDTO), RequestStatus.FINISHED);
    } else {
      apiMock.onPost(UTTAKSPLAN_ANNEN_URL).replyOnce(200, undefined, RequestStatus.FINISHED);
    }
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, args.stønadskonto80);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, args.stønadskonto100);
  };
  return <MemoryRouter initialEntries={[SøknadRoutes.UTTAKSPLAN_INFO]}>
            <AxiosMock mock={restMock}>
                <FpDataContext initialState={{
        [ContextDataType.SØKERSITUASJON]: {
          situasjon: 'fødsel',
          rolle: 'mor'
        },
        [ContextDataType.OM_BARNET]: args.barn,
        [ContextDataType.SØKER_DATA]: args.søkerData,
        [ContextDataType.ANNEN_FORELDER]: args.annenForelder,
        [ContextDataType.PERIODE_MED_FORELDREPENGER]: {
          dekningsgrad: args.dekningsgrad
        }
      }}>
                    <UttaksplanInfo søker={{
          fnr: '19047815714',
          fornavn: 'TALENTFULL',
          etternavn: 'MYGG',
          kjønn: 'K',
          fødselsdato: '1978-04-19',
          barn: [{
            fnr: '21091981146',
            fødselsdato: '2021-03-15',
            annenForelder: {
              fnr: '12038517080',
              fødselsdato: '1985-03-12',
              fornavn: 'LEALAUS',
              etternavn: 'BÆREPOSE'
            },
            fornavn: 'KLØKTIG',
            etternavn: 'MIDTPUNKT',
            kjønn: 'M'
          }]
        }} erEndringssøknad={false} mellomlagreSøknadOgNaviger={() => Promise.resolve()} avbrytSøknad={() => undefined} />
                </FpDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(V=(q=p.parameters)==null?void 0:q.docs)==null?void 0:V.source}}};const te=["MorAleneomsorgDekningsgrad100Før1Okt2021","MorAleneomsorgDekningsgrad80Før1Okt2021","MorAleneomsorgPrematurFødsel","MorDeltUttakPrematurFødselDekningsgrad100","MorDeltUttakDekningsgrad100EtterWLB","MorDeltUttakTvillingerDekningsgrad100FørWLB","MorDeltUttakFarSøkteMorsKvoteOgFellesperiode","MorSøkerOgFarHarIkkeRett"];export{o as MorAleneomsorgDekningsgrad100Før1Okt2021,d as MorAleneomsorgDekningsgrad80Før1Okt2021,i as MorAleneomsorgPrematurFødsel,k as MorDeltUttakDekningsgrad100EtterWLB,E as MorDeltUttakFarSøkteMorsKvoteOgFellesperiode,l as MorDeltUttakPrematurFødselDekningsgrad100,D as MorDeltUttakTvillingerDekningsgrad100FørWLB,p as MorSøkerOgFarHarIkkeRett,te as __namedExportsOrder,ee as default};
