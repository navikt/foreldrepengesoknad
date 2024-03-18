import{j as F}from"./jsx-runtime-DoxjgJx5.js";import{d as w,P as z}from"./Tidsperioden-C8HcA-rk.js";import{b as S,s as V,a as Y}from"./stønadskontoDeltUttak100WLB-QrfEgc_X.js";import{A as Q}from"./AxiosMock-Ch5ZGkFd.js";import"./index-C-6Uy6j4.js";import"./index-Cu9bd8lq.js";import{B as e,D as t,M as X}from"./dateFormValidation-A9ng-RC0.js";import{D as Z}from"./eksisterendeSakUtils-B4-KNNY8.js";import"./_baseToString-yTMKM5a7.js";import"./_createSet-BNfKGSGn.js";import{i as nn}from"./Step-DMjU3ety.js";import{F as en,C as r}from"./FpDataContext-CjNulmBK.js";import{S as tn}from"./useFpNavigator-CnrN-bhH.js";import{R as T}from"./useRequest-D3GjlcxZ.js";import{U as W}from"./UttaksplanInfo-C7s4fXKI.js";import"./index-SDyqs4cU.js";import"./Link-BqZ6CohM.js";import"./index-Ckls47V4.js";import"./index-B_cCgG6K.js";import"./apiInterceptor-BlveB6PB.js";import"./axios-Dg6gsKS0.js";import"./velkommenUtils-OwMlSU50.js";import"./barnUtils-DSjWg_x2.js";import"./dateUtils-BR3fTdjz.js";import"./links-dJHPeQm3.js";import"./message-BTv7u0RP.js";import"./amplitude.esm-CWYNo8IU.js";import"./createIntl-DjMHtdaC.js";import"./lodash-o8vTUAkc.js";import"./globalUtil-BtRYWUdG.js";import"./uttaksplanInfoUtils-B2JpxYR4.js";import"./stønadskontoer-Jq-o03pj.js";import"./BabyWrapped-CueKsnSm.js";import"./LenkeKnapp-MqIXSt5W.js";const an={FORELDREPENGER:280,FORELDREPENGER_FØR_FØDSEL:15},rn={farRundtFødsel:0,generellMinsterett:0,toTette:0},g={kontoer:an,minsteretter:rn},sn={FORELDREPENGER:230,FORELDREPENGER_FØR_FØDSEL:15},on={farRundtFødsel:0,generellMinsterett:0,toTette:0},N={kontoer:sn,minsteretter:on},dn={MØDREKVOTE:95,FEDREKVOTE:95,FELLESPERIODE:195,FORELDREPENGER_FØR_FØDSEL:15,FLERBARNSDAGER:105},ln={farRundtFødsel:0,generellMinsterett:0,toTette:0},kn={kontoer:dn,minsteretter:ln},En={MØDREKVOTE:75,FEDREKVOTE:75,FELLESPERIODE:165,FORELDREPENGER_FØR_FØDSEL:15,FLERBARNSDAGER:85},Dn={farRundtFødsel:0,generellMinsterett:0,toTette:0},pn={kontoer:En,minsteretter:Dn},R="/innsyn/v2/annenPartVedtak",x="/konto",Fn=[{fom:"2024-02-07",tom:"2024-02-27",kontoType:"MØDREKVOTE",overføringÅrsak:"INSTITUSJONSOPPHOLD_ANNEN_FORELDER",resultat:{innvilget:!0,trekkerMinsterett:!1,trekkerDager:!0,årsak:"ANNET"}},{fom:"2024-06-11",tom:"2024-06-30",kontoType:"FELLESPERIODE",resultat:{innvilget:!0,trekkerMinsterett:!1,trekkerDager:!0,årsak:"ANNET"}}],wn={title:"steps/uttaksplan-info/MorFødsel",component:W},a=n=>{nn();const $=p=>{n.uttaksplanAnnenPart?p.onPost(R).replyOnce(200,{perioder:n.uttaksplanAnnenPart,dekningsgrad:Z.HUNDRE_PROSENT},T.FINISHED):p.onPost(R).replyOnce(200,void 0,T.FINISHED),p.onGet(x).replyOnce(200,n.stønadskonto80),p.onGet(x).replyOnce(200,n.stønadskonto100)};return F.jsx(X,{initialEntries:[tn.UTTAKSPLAN_INFO],children:F.jsx(Q,{mock:$,children:F.jsx(en,{initialState:{[r.SØKERSITUASJON]:{situasjon:"fødsel",rolle:"mor"},[r.OM_BARNET]:n.barn,[r.SØKER_DATA]:n.søkerData,[r.ANNEN_FORELDER]:n.annenForelder,[r.PERIODE_MED_FORELDREPENGER]:{dekningsgrad:n.dekningsgrad}},children:F.jsx(W,{søkerInfo:{søker:{fnr:"19047815714",fornavn:"TALENTFULL",etternavn:"MYGG",kjønn:"K",fødselsdato:"1978-04-19",barn:[{fnr:"21091981146",fødselsdato:"2021-03-15",annenForelder:{fnr:"12038517080",fødselsdato:"1985-03-12",fornavn:"LEALAUS",etternavn:"BÆREPOSE"},fornavn:"KLØKTIG",etternavn:"MIDTPUNKT",kjønn:"M"}]},arbeidsforhold:[]},erEndringssøknad:!1,mellomlagreSøknadOgNaviger:()=>Promise.resolve(),avbrytSøknad:()=>{}})})})})},s=a.bind({});s.args={stønadskonto100:N,stønadskonto80:g,barn:{type:e.FØDT,fødselsdatoer:["2021-03-15"],antallBarn:1},annenForelder:{kanIkkeOppgis:!0},søkerData:{harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1,harHattAnnenInntektSiste10Mnd:!1},dekningsgrad:t.HUNDRE_PROSENT};const o=a.bind({});o.args={stønadskonto100:N,stønadskonto80:g,barn:{type:e.FØDT,fødselsdatoer:["2021-03-15"],antallBarn:1},annenForelder:{kanIkkeOppgis:!0},søkerData:{harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1,harHattAnnenInntektSiste10Mnd:!1},dekningsgrad:t.ÅTTI_PROSENT};const d=a.bind({});d.args={stønadskonto100:N,stønadskonto80:g,barn:{type:e.FØDT,fødselsdatoer:["2023-01-25"],termindato:"2023-04-01",antallBarn:1},annenForelder:{kanIkkeOppgis:!0},søkerData:{harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1,harHattAnnenInntektSiste10Mnd:!1},dekningsgrad:t.HUNDRE_PROSENT};const i=a.bind({});i.args={stønadskonto100:S,stønadskonto80:S,barn:{type:e.FØDT,antallBarn:1,fødselsdatoer:["2023-01-11"],termindato:"2023-03-11"},annenForelder:{fornavn:"Espen",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1,erAleneOmOmsorg:!1},søkerData:{harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1,harHattAnnenInntektSiste10Mnd:!1},dekningsgrad:t.HUNDRE_PROSENT};const l=a.bind({});l.args={stønadskonto100:V,stønadskonto80:Y,barn:{type:e.FØDT,fødselsdatoer:["2022-12-15"],antallBarn:1},annenForelder:{fornavn:"Espen",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1,erAleneOmOmsorg:!1},søkerData:{harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1,harHattAnnenInntektSiste10Mnd:!1},dekningsgrad:t.HUNDRE_PROSENT};const k=a.bind({});k.args={stønadskonto100:pn,stønadskonto80:kn,barn:{type:e.FØDT,fødselsdatoer:["2022-07-15"],antallBarn:2},annenForelder:{fornavn:"Espen",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1,erAleneOmOmsorg:!1,datoForAleneomsorg:w().format(z)},søkerData:{harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1,harHattAnnenInntektSiste10Mnd:!1},dekningsgrad:t.HUNDRE_PROSENT};const E=a.bind({});E.args={stønadskonto100:V,stønadskonto80:Y,barn:{type:e.FØDT,fødselsdatoer:["2024-01-15"],antallBarn:1},annenForelder:{fornavn:"Espen",etternavn:"Utvikler",fnr:"1212121313",utenlandskFnr:!1,harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1,erInformertOmSøknaden:!0,erAleneOmOmsorg:!1},søkerData:{harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1,harHattAnnenInntektSiste10Mnd:!1},dekningsgrad:t.HUNDRE_PROSENT,uttaksplanAnnenPart:Fn};const D=a.bind({});D.args={stønadskonto100:N,stønadskonto80:g,barn:{type:e.FØDT,fødselsdatoer:["2024-01-15"],antallBarn:1},annenForelder:{fornavn:"Espen",etternavn:"Utvikler",fnr:"1212121313",utenlandskFnr:!1,harRettPåForeldrepengerINorge:!1,kanIkkeOppgis:!1,erAleneOmOmsorg:!1},søkerData:{harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1,harHattAnnenInntektSiste10Mnd:!1},dekningsgrad:t.HUNDRE_PROSENT};var A,f,O;s.parameters={...s.parameters,docs:{...(A=s.parameters)==null?void 0:A.docs,source:{originalSource:`args => {
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
                    <UttaksplanInfo søkerInfo={{
          søker: {
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
          },
          arbeidsforhold: []
        }} erEndringssøknad={false} mellomlagreSøknadOgNaviger={() => Promise.resolve()} avbrytSøknad={() => undefined} />
                </FpDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(O=(f=s.parameters)==null?void 0:f.docs)==null?void 0:O.source}}};var c,m,M;o.parameters={...o.parameters,docs:{...(c=o.parameters)==null?void 0:c.docs,source:{originalSource:`args => {
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
                    <UttaksplanInfo søkerInfo={{
          søker: {
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
          },
          arbeidsforhold: []
        }} erEndringssøknad={false} mellomlagreSøknadOgNaviger={() => Promise.resolve()} avbrytSøknad={() => undefined} />
                </FpDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(M=(m=o.parameters)==null?void 0:m.docs)==null?void 0:M.source}}};var u,L,P;d.parameters={...d.parameters,docs:{...(u=d.parameters)==null?void 0:u.docs,source:{originalSource:`args => {
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
                    <UttaksplanInfo søkerInfo={{
          søker: {
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
          },
          arbeidsforhold: []
        }} erEndringssøknad={false} mellomlagreSøknadOgNaviger={() => Promise.resolve()} avbrytSøknad={() => undefined} />
                </FpDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(P=(L=d.parameters)==null?void 0:L.docs)==null?void 0:P.source}}};var _,U,I;i.parameters={...i.parameters,docs:{...(_=i.parameters)==null?void 0:_.docs,source:{originalSource:`args => {
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
                    <UttaksplanInfo søkerInfo={{
          søker: {
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
          },
          arbeidsforhold: []
        }} erEndringssøknad={false} mellomlagreSøknadOgNaviger={() => Promise.resolve()} avbrytSøknad={() => undefined} />
                </FpDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(I=(U=i.parameters)==null?void 0:U.docs)==null?void 0:I.source}}};var v,y,K;l.parameters={...l.parameters,docs:{...(v=l.parameters)==null?void 0:v.docs,source:{originalSource:`args => {
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
                    <UttaksplanInfo søkerInfo={{
          søker: {
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
          },
          arbeidsforhold: []
        }} erEndringssøknad={false} mellomlagreSøknadOgNaviger={() => Promise.resolve()} avbrytSøknad={() => undefined} />
                </FpDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(K=(y=l.parameters)==null?void 0:y.docs)==null?void 0:K.source}}};var b,C,G;k.parameters={...k.parameters,docs:{...(b=k.parameters)==null?void 0:b.docs,source:{originalSource:`args => {
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
                    <UttaksplanInfo søkerInfo={{
          søker: {
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
          },
          arbeidsforhold: []
        }} erEndringssøknad={false} mellomlagreSøknadOgNaviger={() => Promise.resolve()} avbrytSøknad={() => undefined} />
                </FpDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(G=(C=k.parameters)==null?void 0:C.docs)==null?void 0:G.source}}};var H,h,B;E.parameters={...E.parameters,docs:{...(H=E.parameters)==null?void 0:H.docs,source:{originalSource:`args => {
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
                    <UttaksplanInfo søkerInfo={{
          søker: {
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
          },
          arbeidsforhold: []
        }} erEndringssøknad={false} mellomlagreSøknadOgNaviger={() => Promise.resolve()} avbrytSøknad={() => undefined} />
                </FpDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(B=(h=E.parameters)==null?void 0:h.docs)==null?void 0:B.source}}};var j,J,q;D.parameters={...D.parameters,docs:{...(j=D.parameters)==null?void 0:j.docs,source:{originalSource:`args => {
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
                    <UttaksplanInfo søkerInfo={{
          søker: {
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
          },
          arbeidsforhold: []
        }} erEndringssøknad={false} mellomlagreSøknadOgNaviger={() => Promise.resolve()} avbrytSøknad={() => undefined} />
                </FpDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(q=(J=D.parameters)==null?void 0:J.docs)==null?void 0:q.source}}};const zn=["MorAleneomsorgDekningsgrad100Før1Okt2021","MorAleneomsorgDekningsgrad80Før1Okt2021","MorAleneomsorgPrematurFødsel","MorDeltUttakPrematurFødselDekningsgrad100","MorDeltUttakDekningsgrad100EtterWLB","MorDeltUttakTvillingerDekningsgrad100FørWLB","MorDeltUttakFarSøkteMorsKvoteOgFellesperiode","MorSøkerOgFarHarIkkeRett"];export{s as MorAleneomsorgDekningsgrad100Før1Okt2021,o as MorAleneomsorgDekningsgrad80Før1Okt2021,d as MorAleneomsorgPrematurFødsel,l as MorDeltUttakDekningsgrad100EtterWLB,E as MorDeltUttakFarSøkteMorsKvoteOgFellesperiode,i as MorDeltUttakPrematurFødselDekningsgrad100,k as MorDeltUttakTvillingerDekningsgrad100FørWLB,D as MorSøkerOgFarHarIkkeRett,zn as __namedExportsOrder,wn as default};
