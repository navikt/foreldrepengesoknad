import{j as F}from"./jsx-runtime-1caa8f64.js";import{A as z}from"./AxiosMock-f85117c7.js";import{R as T}from"./useRequest-603f2ddc.js";import{b as A,s as Y,a as W}from"./stønadskontoDeltUttak100WLB-2cb398e9.js";import{U as $}from"./UttaksplanInfo-e6a56d47.js";import{F as Q,C as s}from"./FpDataContext-939a8168.js";import{d as n}from"./Tidsperioden-2d1db4bf.js";import{B as t}from"./barnUtils-52a07cb3.js";import{D as a}from"./Periodene-030a8cd0.js";import{D as X}from"./eksisterendeSakUtils-6653cd82.js";import"./index-753920cd.js";import"./index-1cdf6ce0.js";import"./_baseToString-2517c4f7.js";import"./_createSet-019d3bf6.js";import{S as Z}from"./useFpNavigator-80e27ea2.js";import{i as nn}from"./IntlProvider-c1bc26a9.js";import{M as en}from"./dateFormValidation-309722c8.js";import"./index-146fc9b8.js";import"./apiInterceptor-d1094a41.js";import"./isFarEllerMedmor-120238ea.js";import"./leggTilPeriode-81869e8b.js";import"./Perioden-8000a589.js";import"./uttaksPlanStatus-70244d59.js";import"./stringUtils-3cea292f.js";import"./uttaksplanInfoUtils-b8e169fd.js";import"./uttaksplanHarForMangeFlerbarnsuker-cf9a12b1.js";import"./index-0ccac225.js";import"./Uttaksplan-b501956d.js";import"./Link-d47e444a.js";import"./FormikFileUploader-f447ccef.js";import"./AttachmentList-b7ed599c.js";import"./Attachment-5db4a859.js";import"./dates-1f1d6788.js";import"./ExpansionCard-91e81e8b.js";import"./links-4d39192e.js";import"./LenkeKnapp-725b4f91.js";import"./dateUtils-a998e40b.js";import"./stønadskontoer-ab64493e.js";import"./Ingress-10c1b249.js";import"./index-daf33b80.js";import"./index-a01a9712.js";import"./v4-4a60fe23.js";import"./velkommenUtils-135c8c82.js";import"./amplitude.esm-2809efde.js";import"./createIntl-9cf0195b.js";const tn={FORELDREPENGER:230,FORELDREPENGER_FØR_FØDSEL:15},an={farRundtFødsel:0,generellMinsterett:0,toTette:0},N={kontoer:tn,minsteretter:an},rn={FORELDREPENGER:280,FORELDREPENGER_FØR_FØDSEL:15},sn={farRundtFødsel:0,generellMinsterett:0,toTette:0},S={kontoer:rn,minsteretter:sn},on={MØDREKVOTE:95,FEDREKVOTE:95,FELLESPERIODE:195,FORELDREPENGER_FØR_FØDSEL:15,FLERBARNSDAGER:105},dn={farRundtFødsel:0,generellMinsterett:0,toTette:0},ln={kontoer:on,minsteretter:dn},kn={MØDREKVOTE:75,FEDREKVOTE:75,FELLESPERIODE:165,FORELDREPENGER_FØR_FØDSEL:15,FLERBARNSDAGER:85},Dn={farRundtFødsel:0,generellMinsterett:0,toTette:0},pn={kontoer:kn,minsteretter:Dn},R="/innsyn/v2/annenPartVedtak",x="/konto",En=[{fom:"2024-02-07",tom:"2024-02-27",kontoType:"MØDREKVOTE",overføringÅrsak:"INSTITUSJONSOPPHOLD_ANNEN_FORELDER",resultat:{innvilget:!0,trekkerMinsterett:!1,trekkerDager:!0,årsak:"ANNET"}},{fom:"2024-06-11",tom:"2024-06-30",kontoType:"FELLESPERIODE",resultat:{innvilget:!0,trekkerMinsterett:!1,trekkerDager:!0,årsak:"ANNET"}}],se={title:"steps/uttaksplan-info/MorFødsel",component:$},r=e=>{nn();const w=g=>{e.uttaksplanAnnenPart?g.onPost(R).replyOnce(200,{perioder:e.uttaksplanAnnenPart,dekningsgrad:X.HUNDRE_PROSENT},T.FINISHED):g.onPost(R).replyOnce(200,void 0,T.FINISHED),g.onGet(x).replyOnce(200,e.stønadskonto80),g.onGet(x).replyOnce(200,e.stønadskonto100)};return F.jsx(en,{initialEntries:[Z.UTTAKSPLAN_INFO],children:F.jsx(z,{mock:w,children:F.jsx(Q,{initialState:{[s.SØKERSITUASJON]:{situasjon:"fødsel",rolle:"mor"},[s.OM_BARNET]:e.barn,[s.SØKER_DATA]:e.søkerData,[s.ANNEN_FORELDER]:e.annenForelder,[s.PERIODE_MED_FORELDREPENGER]:{dekningsgrad:e.dekningsgrad}},children:F.jsx($,{søker:{fnr:"19047815714",fornavn:"TALENTFULL",etternavn:"MYGG",kjønn:"K",fødselsdato:"1978-04-19",barn:[{fnr:"21091981146",fødselsdato:"2021-03-15",annenForelder:{fnr:"12038517080",fødselsdato:"1985-03-12",fornavn:"LEALAUS",etternavn:"BÆREPOSE"},fornavn:"KLØKTIG",etternavn:"MIDTPUNKT",kjønn:"M"}]},erEndringssøknad:!1,mellomlagreSøknadOgNaviger:()=>Promise.resolve(),avbrytSøknad:()=>{}})})})})},o=r.bind({});o.args={stønadskonto100:N,stønadskonto80:S,barn:{type:t.FØDT,fødselsdatoer:[n("2021-03-15").toDate()],antallBarn:1,datoForAleneomsorg:new Date,dokumentasjonAvAleneomsorg:[]},annenForelder:{kanIkkeOppgis:!0},søkerData:{erAleneOmOmsorg:!0,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1,harHattAnnenInntektSiste10Mnd:!1},dekningsgrad:a.HUNDRE_PROSENT};const d=r.bind({});d.args={stønadskonto100:N,stønadskonto80:S,barn:{type:t.FØDT,fødselsdatoer:[n("2021-03-15").toDate()],antallBarn:1,datoForAleneomsorg:new Date,dokumentasjonAvAleneomsorg:[]},annenForelder:{kanIkkeOppgis:!0},søkerData:{erAleneOmOmsorg:!1,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1,harHattAnnenInntektSiste10Mnd:!1},dekningsgrad:a.ÅTTI_PROSENT};const i=r.bind({});i.args={stønadskonto100:N,stønadskonto80:S,barn:{type:t.FØDT,fødselsdatoer:[n("2023-01-25").toDate()],termindato:n("2023-04-01").toDate(),antallBarn:1,datoForAleneomsorg:new Date,dokumentasjonAvAleneomsorg:[]},annenForelder:{kanIkkeOppgis:!0},søkerData:{erAleneOmOmsorg:!1,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1,harHattAnnenInntektSiste10Mnd:!1},dekningsgrad:a.HUNDRE_PROSENT};const l=r.bind({});l.args={stønadskonto100:A,stønadskonto80:A,barn:{type:t.FØDT,antallBarn:1,fødselsdatoer:[n("2023-01-11").toDate()],termindato:n("2023-03-11").toDate()},annenForelder:{fornavn:"Espen",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1},søkerData:{erAleneOmOmsorg:!1,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1,harHattAnnenInntektSiste10Mnd:!1},dekningsgrad:a.HUNDRE_PROSENT};const k=r.bind({});k.args={stønadskonto100:Y,stønadskonto80:W,barn:{type:t.FØDT,fødselsdatoer:[n("2022-12-15").toDate()],antallBarn:1},annenForelder:{fornavn:"Espen",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1},søkerData:{erAleneOmOmsorg:!1,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1,harHattAnnenInntektSiste10Mnd:!1},dekningsgrad:a.HUNDRE_PROSENT};const D=r.bind({});D.args={stønadskonto100:pn,stønadskonto80:ln,barn:{type:t.FØDT,fødselsdatoer:[n("2022-07-15").toDate()],antallBarn:2},annenForelder:{fornavn:"Espen",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1},søkerData:{erAleneOmOmsorg:!1,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1,harHattAnnenInntektSiste10Mnd:!1},dekningsgrad:a.HUNDRE_PROSENT};const p=r.bind({});p.args={stønadskonto100:Y,stønadskonto80:W,barn:{type:t.FØDT,fødselsdatoer:[n("2024-01-15").toDate()],antallBarn:1},annenForelder:{fornavn:"Espen",etternavn:"Utvikler",fnr:"1212121313",utenlandskFnr:!1,harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1,erInformertOmSøknaden:!0},søkerData:{erAleneOmOmsorg:!1,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1,harHattAnnenInntektSiste10Mnd:!1},dekningsgrad:a.HUNDRE_PROSENT,uttaksplanAnnenPart:En};const E=r.bind({});E.args={stønadskonto100:N,stønadskonto80:S,barn:{type:t.FØDT,fødselsdatoer:[n("2024-01-15").toDate()],antallBarn:1},annenForelder:{fornavn:"Espen",etternavn:"Utvikler",fnr:"1212121313",utenlandskFnr:!1,harRettPåForeldrepengerINorge:!1,kanIkkeOppgis:!1},søkerData:{erAleneOmOmsorg:!1,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1,harHattAnnenInntektSiste10Mnd:!1},dekningsgrad:a.HUNDRE_PROSENT};var m,O,f;o.parameters={...o.parameters,docs:{...(m=o.parameters)==null?void 0:m.docs,source:{originalSource:`args => {
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
}`,...(f=(O=o.parameters)==null?void 0:O.docs)==null?void 0:f.source}}};var c,M,u;d.parameters={...d.parameters,docs:{...(c=d.parameters)==null?void 0:c.docs,source:{originalSource:`args => {
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
}`,...(H=(G=D.parameters)==null?void 0:G.docs)==null?void 0:H.source}}};var j,B,h;p.parameters={...p.parameters,docs:{...(j=p.parameters)==null?void 0:j.docs,source:{originalSource:`args => {
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
}`,...(h=(B=p.parameters)==null?void 0:B.docs)==null?void 0:h.source}}};var J,q,V;E.parameters={...E.parameters,docs:{...(J=E.parameters)==null?void 0:J.docs,source:{originalSource:`args => {
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
}`,...(V=(q=E.parameters)==null?void 0:q.docs)==null?void 0:V.source}}};const oe=["MorAleneomsorgDekningsgrad100Før1Okt2021","MorAleneomsorgDekningsgrad80Før1Okt2021","MorAleneomsorgPrematurFødsel","MorDeltUttakPrematurFødselDekningsgrad100","MorDeltUttakDekningsgrad100EtterWLB","MorDeltUttakTvillingerDekningsgrad100FørWLB","MorDeltUttakFarSøkteMorsKvoteOgFellesperiode","MorSøkerOgFarHarIkkeRett"];export{o as MorAleneomsorgDekningsgrad100Før1Okt2021,d as MorAleneomsorgDekningsgrad80Før1Okt2021,i as MorAleneomsorgPrematurFødsel,k as MorDeltUttakDekningsgrad100EtterWLB,p as MorDeltUttakFarSøkteMorsKvoteOgFellesperiode,l as MorDeltUttakPrematurFødselDekningsgrad100,D as MorDeltUttakTvillingerDekningsgrad100FørWLB,E as MorSøkerOgFarHarIkkeRett,oe as __namedExportsOrder,se as default};
