import{j as p}from"./jsx-runtime-1caa8f64.js";import{A as P}from"./AxiosMock-f85117c7.js";import{R as I}from"./useRequest-603f2ddc.js";import{s as U,a as v}from"./stønadskonto80-8e203d8f.js";import{s as K,a as b}from"./stønadskontoDeltUttak80-23916c37.js";import{U as _}from"./UttaksplanInfo-43b510b8.js";import{F as G,C as t}from"./FpDataContext-939a8168.js";import{d as e}from"./Tidsperioden-32d6ceea.js";import{B as i}from"./barnUtils-27f7dae4.js";import{D as l}from"./Periodene-f55b294c.js";import"./index-753920cd.js";import"./index-1cdf6ce0.js";import"./_baseToString-2517c4f7.js";import"./_createSet-019d3bf6.js";import{S as C}from"./useFpNavigator-00c14c24.js";import{i as j}from"./IntlProvider-b99fa191.js";import{M as B}from"./dateFormValidation-8d41671b.js";import"./index-146fc9b8.js";import"./apiInterceptor-d1094a41.js";import"./isFarEllerMedmor-120238ea.js";import"./leggTilPeriode-0508d6d5.js";import"./Perioden-14a4f262.js";import"./uttaksPlanStatus-9418c72d.js";import"./stringUtils-e4ae28d6.js";import"./uttaksplanInfoUtils-d3a680cb.js";import"./uttaksplanHarForMangeFlerbarnsuker-21628512.js";import"./eksisterendeSakUtils-5470c12d.js";import"./dateUtils-75df4550.js";import"./velkommenUtils-48c44882.js";import"./index-22629c56.js";import"./Uttaksplan-77a815a2.js";import"./FormikFileUploader-bf1c56bf.js";import"./AttachmentList-1abab43f.js";import"./Attachment-17da3962.js";import"./Link-d47e444a.js";import"./dates-017fa136.js";import"./ExpansionCard-e6759a24.js";import"./links-4d39192e.js";import"./LenkeKnapp-725b4f91.js";import"./stønadskontoer-f1af0def.js";import"./Ingress-10c1b249.js";import"./InfoOmSøknaden-2e2fbfdb.js";import"./index-daf33b80.js";import"./index-a01a9712.js";import"./v4-4a60fe23.js";import"./amplitude.esm-2809efde.js";import"./createIntl-5cc94ec1.js";const h={FORELDREPENGER:273,FORELDREPENGER_FØR_FØDSEL:15},J={farRundtFødsel:0,generellMinsterett:0,toTette:0},H={kontoer:h,minsteretter:J},q={FORELDREPENGER:323,FORELDREPENGER_FØR_FØDSEL:15},Y={farRundtFødsel:0,generellMinsterett:0,toTette:0},$={kontoer:q,minsteretter:Y},w={MØDREKVOTE:95,FEDREKVOTE:95,FELLESPERIODE:195,FORELDREPENGER_FØR_FØDSEL:15,FLERBARNSDAGER:105},V={farRundtFødsel:0,generellMinsterett:0,toTette:0},z={kontoer:w,minsteretter:V},Q={MØDREKVOTE:75,FEDREKVOTE:75,FELLESPERIODE:165,FORELDREPENGER_FØR_FØDSEL:15,FLERBARNSDAGER:85},W={farRundtFødsel:0,generellMinsterett:0,toTette:0},X={kontoer:Q,minsteretter:W},Z="/innsyn/v2/annenPartVedtak",m="/konto",Vn={title:"steps/uttaksplan-info/MorFødsel",component:_},k=n=>{j();const y=E=>{E.onPost(Z).replyOnce(200,void 0,I.FINISHED),E.onGet(m).replyOnce(200,n.stønadskonto100),E.onGet(m).replyOnce(200,n.stønadskonto80)};return p.jsx(B,{initialEntries:[C.UTTAKSPLAN_INFO],children:p.jsx(P,{mock:y,children:p.jsx(G,{initialState:{[t.SØKERSITUASJON]:{situasjon:"fødsel",rolle:"mor"},[t.OM_BARNET]:n.barn,[t.SØKER_DATA]:n.søkerData,[t.ANNEN_FORELDER]:n.annenForelder,[t.PERIODE_MED_FORELDREPENGER]:{dekningsgrad:n.dekningsgrad}},children:p.jsx(_,{søker:{fnr:"19047815714",fornavn:"TALENTFULL",etternavn:"MYGG",kjønn:"K",fødselsdato:"1978-04-19",barn:[{fnr:"21091981146",fødselsdato:"2021-03-15",annenForelder:{fnr:"12038517080",fødselsdato:"1985-03-12",fornavn:"LEALAUS",etternavn:"BÆREPOSE"},fornavn:"KLØKTIG",etternavn:"MIDTPUNKT",kjønn:"M"}]},erEndringssøknad:!1,mellomlagreSøknadOgNaviger:()=>Promise.resolve(),avbrytSøknad:()=>{}})})})})},r=k.bind({});r.args={stønadskonto100:U,stønadskonto80:v,barn:{type:i.FØDT,fødselsdatoer:[e("2021-03-15").toDate()],antallBarn:1,datoForAleneomsorg:new Date,dokumentasjonAvAleneomsorg:[]},annenForelder:{kanIkkeOppgis:!0},søkerData:{erAleneOmOmsorg:!0,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1,harHattAnnenInntektSiste10Mnd:!1},dekningsgrad:l.HUNDRE_PROSENT};const a=k.bind({});a.args={stønadskonto100:U,stønadskonto80:v,barn:{type:i.FØDT,fødselsdatoer:[e("2021-03-15").toDate()],antallBarn:1,datoForAleneomsorg:new Date,dokumentasjonAvAleneomsorg:[]},annenForelder:{kanIkkeOppgis:!0},søkerData:{erAleneOmOmsorg:!1,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1,harHattAnnenInntektSiste10Mnd:!1},dekningsgrad:l.ÅTTI_PROSENT};const o=k.bind({});o.args={stønadskonto100:H,stønadskonto80:$,barn:{type:i.FØDT,antallBarn:1,datoForAleneomsorg:new Date,dokumentasjonAvAleneomsorg:[],fødselsdatoer:[e("2021-01-11").toDate()],termindato:e("2021-03-11").toDate()},annenForelder:{kanIkkeOppgis:!0},søkerData:{erAleneOmOmsorg:!1,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1,harHattAnnenInntektSiste10Mnd:!1},dekningsgrad:l.HUNDRE_PROSENT};const s=k.bind({});s.args={stønadskonto100:K,stønadskonto80:b,barn:{type:i.FØDT,fødselsdatoer:[e("2021-03-15").toDate()],antallBarn:1,datoForAleneomsorg:new Date,dokumentasjonAvAleneomsorg:[]},annenForelder:{fornavn:"Espen",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1},søkerData:{erAleneOmOmsorg:!1,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1,harHattAnnenInntektSiste10Mnd:!1},dekningsgrad:l.HUNDRE_PROSENT};const d=k.bind({});d.args={stønadskonto100:X,stønadskonto80:z,barn:{type:i.FØDT,fødselsdatoer:[e("2021-03-15").toDate()],antallBarn:2,datoForAleneomsorg:new Date,dokumentasjonAvAleneomsorg:[]},annenForelder:{fornavn:"Espen",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1},søkerData:{erAleneOmOmsorg:!1,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1,harHattAnnenInntektSiste10Mnd:!1},dekningsgrad:l.HUNDRE_PROSENT};var D,F,g;r.parameters={...r.parameters,docs:{...(D=r.parameters)==null?void 0:D.docs,source:{originalSource:`args => {
  initAmplitude();
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost(UTTAKSPLAN_ANNEN_URL).replyOnce(200, undefined, RequestStatus.FINISHED);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, args.stønadskonto100);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, args.stønadskonto80);
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
}`,...(g=(F=r.parameters)==null?void 0:F.docs)==null?void 0:g.source}}};var x,S,R;a.parameters={...a.parameters,docs:{...(x=a.parameters)==null?void 0:x.docs,source:{originalSource:`args => {
  initAmplitude();
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost(UTTAKSPLAN_ANNEN_URL).replyOnce(200, undefined, RequestStatus.FINISHED);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, args.stønadskonto100);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, args.stønadskonto80);
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
}`,...(R=(S=a.parameters)==null?void 0:S.docs)==null?void 0:R.source}}};var A,T,N;o.parameters={...o.parameters,docs:{...(A=o.parameters)==null?void 0:A.docs,source:{originalSource:`args => {
  initAmplitude();
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost(UTTAKSPLAN_ANNEN_URL).replyOnce(200, undefined, RequestStatus.FINISHED);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, args.stønadskonto100);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, args.stønadskonto80);
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
}`,...(N=(T=o.parameters)==null?void 0:T.docs)==null?void 0:N.source}}};var c,f,O;s.parameters={...s.parameters,docs:{...(c=s.parameters)==null?void 0:c.docs,source:{originalSource:`args => {
  initAmplitude();
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost(UTTAKSPLAN_ANNEN_URL).replyOnce(200, undefined, RequestStatus.FINISHED);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, args.stønadskonto100);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, args.stønadskonto80);
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
}`,...(O=(f=s.parameters)==null?void 0:f.docs)==null?void 0:O.source}}};var M,u,L;d.parameters={...d.parameters,docs:{...(M=d.parameters)==null?void 0:M.docs,source:{originalSource:`args => {
  initAmplitude();
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost(UTTAKSPLAN_ANNEN_URL).replyOnce(200, undefined, RequestStatus.FINISHED);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, args.stønadskonto100);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, args.stønadskonto80);
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
}`,...(L=(u=d.parameters)==null?void 0:u.docs)==null?void 0:L.source}}};const zn=["UttaksplanMedAleneomsorgDekningsgrad100","UttaksplanMedAleneomsorgDekningsgrad80","UttaksplanMedPrematurFødselDekningsgrad100","UttaksplanMedDeltUttakDekningsgrad100","UttaksplanMedFlerbarnsukerTvillingerDekningsgrad100"];export{r as UttaksplanMedAleneomsorgDekningsgrad100,a as UttaksplanMedAleneomsorgDekningsgrad80,s as UttaksplanMedDeltUttakDekningsgrad100,d as UttaksplanMedFlerbarnsukerTvillingerDekningsgrad100,o as UttaksplanMedPrematurFødselDekningsgrad100,zn as __namedExportsOrder,Vn as default};
