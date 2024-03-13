import{j as F}from"./jsx-runtime-1caa8f64.js";import{d as w,Y as z}from"./Tidsperioden-42a1bdbe.js";import{b as S,s as V,a as Y}from"./stønadskontoDeltUttak100WLB-4f8cea3b.js";import{A as Q}from"./AxiosMock-9ec34b5d.js";import{B as e,D as t,M as X}from"./dateFormValidation-5ec6c7b9.js";import{D as Z}from"./eksisterendeSakUtils-34612306.js";import"./index-753920cd.js";import"./index-1cdf6ce0.js";import"./_baseToString-2517c4f7.js";import"./_createSet-019d3bf6.js";import{i as nn}from"./Step-b0b81968.js";import{F as en,C as r}from"./FpDataContext-91c673b7.js";import{S as tn}from"./useFpNavigator-94b086ce.js";import{R as T}from"./useRequest-84d89b79.js";import{U as W}from"./UttaksplanInfo-679695ff.js";import"./index-daf33b80.js";import"./Link-1e7d9fc8.js";import"./index-a01a9712.js";import"./v4-4a60fe23.js";import"./index-146fc9b8.js";import"./apiInterceptor-7536bacb.js";import"./axios-91b57d60.js";import"./velkommenUtils-2f976ea6.js";import"./barnUtils-43809280.js";import"./dateUtils-8a02e197.js";import"./links-022380bf.js";import"./amplitude.esm-2809efde.js";import"./createIntl-6c46f0d1.js";import"./uttaksplanInfoUtils-90a765b1.js";import"./stønadskontoer-3874362c.js";import"./ExpansionCard-ce8199b5.js";import"./BabyWrapped-455f78be.js";import"./LenkeKnapp-d085fb45.js";const an={FORELDREPENGER:280,FORELDREPENGER_FØR_FØDSEL:15},rn={farRundtFødsel:0,generellMinsterett:0,toTette:0},g={kontoer:an,minsteretter:rn},sn={FORELDREPENGER:230,FORELDREPENGER_FØR_FØDSEL:15},on={farRundtFødsel:0,generellMinsterett:0,toTette:0},N={kontoer:sn,minsteretter:on},dn={MØDREKVOTE:95,FEDREKVOTE:95,FELLESPERIODE:195,FORELDREPENGER_FØR_FØDSEL:15,FLERBARNSDAGER:105},ln={farRundtFødsel:0,generellMinsterett:0,toTette:0},kn={kontoer:dn,minsteretter:ln},En={MØDREKVOTE:75,FEDREKVOTE:75,FELLESPERIODE:165,FORELDREPENGER_FØR_FØDSEL:15,FLERBARNSDAGER:85},Dn={farRundtFødsel:0,generellMinsterett:0,toTette:0},pn={kontoer:En,minsteretter:Dn},R="/innsyn/v2/annenPartVedtak",x="/konto",Fn=[{fom:"2024-02-07",tom:"2024-02-27",kontoType:"MØDREKVOTE",overføringÅrsak:"INSTITUSJONSOPPHOLD_ANNEN_FORELDER",resultat:{innvilget:!0,trekkerMinsterett:!1,trekkerDager:!0,årsak:"ANNET"}},{fom:"2024-06-11",tom:"2024-06-30",kontoType:"FELLESPERIODE",resultat:{innvilget:!0,trekkerMinsterett:!1,trekkerDager:!0,årsak:"ANNET"}}],$n={title:"steps/uttaksplan-info/MorFødsel",component:W},a=n=>{nn();const $=p=>{n.uttaksplanAnnenPart?p.onPost(R).replyOnce(200,{perioder:n.uttaksplanAnnenPart,dekningsgrad:Z.HUNDRE_PROSENT},T.FINISHED):p.onPost(R).replyOnce(200,void 0,T.FINISHED),p.onGet(x).replyOnce(200,n.stønadskonto80),p.onGet(x).replyOnce(200,n.stønadskonto100)};return F.jsx(X,{initialEntries:[tn.UTTAKSPLAN_INFO],children:F.jsx(Q,{mock:$,children:F.jsx(en,{initialState:{[r.SØKERSITUASJON]:{situasjon:"fødsel",rolle:"mor"},[r.OM_BARNET]:n.barn,[r.SØKER_DATA]:n.søkerData,[r.ANNEN_FORELDER]:n.annenForelder,[r.PERIODE_MED_FORELDREPENGER]:{dekningsgrad:n.dekningsgrad}},children:F.jsx(W,{søkerInfo:{søker:{fnr:"19047815714",fornavn:"TALENTFULL",etternavn:"MYGG",kjønn:"K",fødselsdato:"1978-04-19",barn:[{fnr:"21091981146",fødselsdato:"2021-03-15",annenForelder:{fnr:"12038517080",fødselsdato:"1985-03-12",fornavn:"LEALAUS",etternavn:"BÆREPOSE"},fornavn:"KLØKTIG",etternavn:"MIDTPUNKT",kjønn:"M"}]},arbeidsforhold:[]},erEndringssøknad:!1,mellomlagreSøknadOgNaviger:()=>Promise.resolve(),avbrytSøknad:()=>{}})})})})},s=a.bind({});s.args={stønadskonto100:N,stønadskonto80:g,barn:{type:e.FØDT,fødselsdatoer:["2021-03-15"],antallBarn:1},annenForelder:{kanIkkeOppgis:!0},søkerData:{harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1,harHattAnnenInntektSiste10Mnd:!1},dekningsgrad:t.HUNDRE_PROSENT};const o=a.bind({});o.args={stønadskonto100:N,stønadskonto80:g,barn:{type:e.FØDT,fødselsdatoer:["2021-03-15"],antallBarn:1},annenForelder:{kanIkkeOppgis:!0},søkerData:{harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1,harHattAnnenInntektSiste10Mnd:!1},dekningsgrad:t.ÅTTI_PROSENT};const d=a.bind({});d.args={stønadskonto100:N,stønadskonto80:g,barn:{type:e.FØDT,fødselsdatoer:["2023-01-25"],termindato:"2023-04-01",antallBarn:1},annenForelder:{kanIkkeOppgis:!0},søkerData:{harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1,harHattAnnenInntektSiste10Mnd:!1},dekningsgrad:t.HUNDRE_PROSENT};const i=a.bind({});i.args={stønadskonto100:S,stønadskonto80:S,barn:{type:e.FØDT,antallBarn:1,fødselsdatoer:["2023-01-11"],termindato:"2023-03-11"},annenForelder:{fornavn:"Espen",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1,erAleneOmOmsorg:!1},søkerData:{harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1,harHattAnnenInntektSiste10Mnd:!1},dekningsgrad:t.HUNDRE_PROSENT};const l=a.bind({});l.args={stønadskonto100:V,stønadskonto80:Y,barn:{type:e.FØDT,fødselsdatoer:["2022-12-15"],antallBarn:1},annenForelder:{fornavn:"Espen",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1,erAleneOmOmsorg:!1},søkerData:{harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1,harHattAnnenInntektSiste10Mnd:!1},dekningsgrad:t.HUNDRE_PROSENT};const k=a.bind({});k.args={stønadskonto100:pn,stønadskonto80:kn,barn:{type:e.FØDT,fødselsdatoer:["2022-07-15"],antallBarn:2},annenForelder:{fornavn:"Espen",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1,erAleneOmOmsorg:!1,datoForAleneomsorg:w().format(z)},søkerData:{harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1,harHattAnnenInntektSiste10Mnd:!1},dekningsgrad:t.HUNDRE_PROSENT};const E=a.bind({});E.args={stønadskonto100:V,stønadskonto80:Y,barn:{type:e.FØDT,fødselsdatoer:["2024-01-15"],antallBarn:1},annenForelder:{fornavn:"Espen",etternavn:"Utvikler",fnr:"1212121313",utenlandskFnr:!1,harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1,erInformertOmSøknaden:!0,erAleneOmOmsorg:!1},søkerData:{harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1,harHattAnnenInntektSiste10Mnd:!1},dekningsgrad:t.HUNDRE_PROSENT,uttaksplanAnnenPart:Fn};const D=a.bind({});D.args={stønadskonto100:N,stønadskonto80:g,barn:{type:e.FØDT,fødselsdatoer:["2024-01-15"],antallBarn:1},annenForelder:{fornavn:"Espen",etternavn:"Utvikler",fnr:"1212121313",utenlandskFnr:!1,harRettPåForeldrepengerINorge:!1,kanIkkeOppgis:!1,erAleneOmOmsorg:!1},søkerData:{harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1,harHattAnnenInntektSiste10Mnd:!1},dekningsgrad:t.HUNDRE_PROSENT};var A,f,O;s.parameters={...s.parameters,docs:{...(A=s.parameters)==null?void 0:A.docs,source:{originalSource:`args => {
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
}`,...(P=(L=d.parameters)==null?void 0:L.docs)==null?void 0:P.source}}};var U,_,I;i.parameters={...i.parameters,docs:{...(U=i.parameters)==null?void 0:U.docs,source:{originalSource:`args => {
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
}`,...(I=(_=i.parameters)==null?void 0:_.docs)==null?void 0:I.source}}};var v,y,K;l.parameters={...l.parameters,docs:{...(v=l.parameters)==null?void 0:v.docs,source:{originalSource:`args => {
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
}`,...(q=(J=D.parameters)==null?void 0:J.docs)==null?void 0:q.source}}};const wn=["MorAleneomsorgDekningsgrad100Før1Okt2021","MorAleneomsorgDekningsgrad80Før1Okt2021","MorAleneomsorgPrematurFødsel","MorDeltUttakPrematurFødselDekningsgrad100","MorDeltUttakDekningsgrad100EtterWLB","MorDeltUttakTvillingerDekningsgrad100FørWLB","MorDeltUttakFarSøkteMorsKvoteOgFellesperiode","MorSøkerOgFarHarIkkeRett"];export{s as MorAleneomsorgDekningsgrad100Før1Okt2021,o as MorAleneomsorgDekningsgrad80Før1Okt2021,d as MorAleneomsorgPrematurFødsel,l as MorDeltUttakDekningsgrad100EtterWLB,E as MorDeltUttakFarSøkteMorsKvoteOgFellesperiode,i as MorDeltUttakPrematurFødselDekningsgrad100,k as MorDeltUttakTvillingerDekningsgrad100FørWLB,D as MorSøkerOgFarHarIkkeRett,wn as __namedExportsOrder,$n as default};
