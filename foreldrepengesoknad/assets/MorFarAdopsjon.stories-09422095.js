import{j as D}from"./jsx-runtime-1caa8f64.js";import{d as A}from"./dates-37291467.js";import{s as N,a as S}from"./stønadskontoDeltUttak100Adopsjon-9b36dfa2.js";import{A as w}from"./AxiosMock-f85117c7.js";import{B as z}from"./barnUtils-aeabd763.js";import{D as e}from"./Dekningsgrad-fced8842.js";import"./index-753920cd.js";import"./index-1cdf6ce0.js";import"./_baseToString-2517c4f7.js";import"./_createSet-019d3bf6.js";import{i as Q}from"./IntlProvider-067bcbb8.js";import{F as W,C as t}from"./FpDataContext-9c963fd7.js";import{S as X}from"./useFpNavigator-aed5ab8f.js";import{R as Z}from"./useRequest-603f2ddc.js";import{U as $}from"./UttaksplanInfo-a6a9e052.js";import{M as nn}from"./dateFormValidation-a676b58d.js";import"./index-daf33b80.js";import"./Link-d47e444a.js";import"./index-a01a9712.js";import"./v4-4a60fe23.js";import"./index-146fc9b8.js";import"./apiInterceptor-d1094a41.js";import"./amplitude.esm-2809efde.js";import"./createIntl-3a69cb36.js";import"./isFarEllerMedmor-120238ea.js";import"./Arbeidsform-a1ff9760.js";import"./Perioden-e5e2ab84.js";import"./uttaksPlanStatus-b4a351f3.js";import"./stringUtils-d2289bbc.js";import"./Periodene-4bccf8b9.js";import"./uttaksplanInfoUtils-50edc764.js";import"./eksisterendeSakUtils-dc4a7a65.js";import"./velkommenUtils-2e714f64.js";import"./dateUtils-191f81f7.js";import"./index-59ab5c7e.js";import"./links-4d39192e.js";import"./Accordion-81709660.js";import"./stønadskontoer-48685726.js";import"./ExpansionCard-c4976158.js";import"./LenkeKnapp-725b4f91.js";import"./Ingress-10c1b249.js";const en={FORELDREPENGER:280},an={farRundtFødsel:0,generellMinsterett:0,toTette:0},T={kontoer:en,minsteretter:an},tn={FORELDREPENGER:230},rn={farRundtFødsel:0,generellMinsterett:0,toTette:0},E={kontoer:tn,minsteretter:rn},on="/innsyn/v2/annenPartVedtak",F="/konto",g={søker:{fnr:"1212121313",fornavn:"Espen",etternavn:"Utvikler",kjønn:"M",fødselsdato:"1978-04-12",barn:[{fnr:"19047815714",fødselsdato:"2021-03-15",annenForelder:{fnr:"12038517080",fødselsdato:"1985-03-12",fornavn:"TALENTFULL",etternavn:"MYGG"},fornavn:"KLØKTIG",etternavn:"MIDTPUNKT",kjønn:"M"}]}},x={søker:{fnr:"19047815714",fornavn:"TALENTFULL",etternavn:"MYGG",kjønn:"K",fødselsdato:"1978-04-19",barn:[{fnr:"21091981146",fødselsdato:"2021-03-15",annenForelder:{fnr:"12038517080",fødselsdato:"1985-03-12",fornavn:"LEALAUS",etternavn:"BÆREPOSE"},fornavn:"KLØKTIG",etternavn:"MIDTPUNKT",kjønn:"M"}]}},wn={title:"steps/uttaksplan-info/MorFarAdopsjon",component:$},a=n=>{Q();const V=m=>{m.onPost(on).replyOnce(200,void 0,Z.FINISHED),m.onGet(F).replyOnce(200,n.stønadskonto80),m.onGet(F).replyOnce(200,n.stønadskonto100)};return D.jsx(nn,{initialEntries:[X.UTTAKSPLAN_INFO],children:D.jsx(w,{mock:V,children:D.jsx(W,{initialState:{[t.SØKERSITUASJON]:{situasjon:"adopsjon",rolle:n.erMor?"mor":"far"},[t.OM_BARNET]:{type:z.ADOPTERT_ANNET_BARN,antallBarn:n.antallBarn,adopsjonsdato:n.adopsjonsdato,adoptertIUtlandet:!1,fødselsdatoer:[]},[t.PERIODE_MED_FORELDREPENGER]:{dekningsgrad:n.dekningsgrad},[t.SØKER_DATA]:n.søkerData,[t.ANNEN_FORELDER]:n.annenForelder},children:D.jsx($,{søker:n.søkerinfo.søker,erEndringssøknad:!1,mellomlagreSøknadOgNaviger:()=>Promise.resolve(),avbrytSøknad:()=>{}})})})})},r=a.bind({});r.args={stønadskonto100:E,stønadskonto80:T,søkerinfo:x,erMor:!0,annenForelder:{kanIkkeOppgis:!0},søkerData:{erAleneOmOmsorg:!0,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1,harHattAnnenInntektSiste10Mnd:!1},dekningsgrad:e.HUNDRE_PROSENT,adopsjonsdato:A("2021-03-15").toDate(),antallBarn:1};const o=a.bind({});o.args={stønadskonto100:E,stønadskonto80:T,søkerinfo:g,erMor:!1,annenForelder:{kanIkkeOppgis:!0},søkerData:{erAleneOmOmsorg:!0,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1,harHattAnnenInntektSiste10Mnd:!1},dekningsgrad:e.HUNDRE_PROSENT,adopsjonsdato:A("2021-03-15").toDate(),antallBarn:2};const s=a.bind({});s.args={stønadskonto100:E,stønadskonto80:T,søkerinfo:x,erMor:!0,annenForelder:{kanIkkeOppgis:!0},søkerData:{erAleneOmOmsorg:!0,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1,harHattAnnenInntektSiste10Mnd:!1},dekningsgrad:e.ÅTTI_PROSENT,adopsjonsdato:A("2022-06-15").toDate(),antallBarn:1};const d=a.bind({});d.args={stønadskonto100:E,stønadskonto80:T,søkerinfo:g,erMor:!1,annenForelder:{kanIkkeOppgis:!0},søkerData:{erAleneOmOmsorg:!0,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1,harHattAnnenInntektSiste10Mnd:!1},dekningsgrad:e.HUNDRE_PROSENT,adopsjonsdato:A("2022-09-15").toDate(),antallBarn:1};const i=a.bind({});i.args={stønadskonto100:N,stønadskonto80:S,erMor:!0,annenForelder:{fornavn:"Espen",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1},søkerData:{erAleneOmOmsorg:!1,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1,harHattAnnenInntektSiste10Mnd:!1},søkerinfo:x,dekningsgrad:e.HUNDRE_PROSENT,antallBarn:1};const l=a.bind({});l.args={stønadskonto100:N,stønadskonto80:S,erMor:!1,annenForelder:{fornavn:"Talentfull",etternavn:"Mygg",fnr:"19047815714",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1},søkerData:{erAleneOmOmsorg:!1,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1,harHattAnnenInntektSiste10Mnd:!1},søkerinfo:g,dekningsgrad:e.HUNDRE_PROSENT,antallBarn:1};const k=a.bind({});k.args={stønadskonto100:N,stønadskonto80:S,erMor:!1,annenForelder:{fornavn:"Talentfull",etternavn:"Mygg",fnr:"19047815714",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1},søkerData:{erAleneOmOmsorg:!1,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1,harHattAnnenInntektSiste10Mnd:!1},søkerinfo:g,dekningsgrad:e.ÅTTI_PROSENT,antallBarn:1};const p=a.bind({});p.args={stønadskonto100:N,stønadskonto80:S,erMor:!1,annenForelder:{fornavn:"Talentfull",etternavn:"Mygg",fnr:"19047815714",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1},søkerData:{erAleneOmOmsorg:!1,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1,harHattAnnenInntektSiste10Mnd:!1},søkerinfo:g,dekningsgrad:e.ÅTTI_PROSENT,antallBarn:2};var c,R,M;r.parameters={...r.parameters,docs:{...(c=r.parameters)==null?void 0:c.docs,source:{originalSource:`args => {
  initAmplitude();
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost(UTTAKSPLAN_ANNEN_URL).replyOnce(200, undefined, RequestStatus.FINISHED);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, args.stønadskonto80);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, args.stønadskonto100);
  };
  return <MemoryRouter initialEntries={[SøknadRoutes.UTTAKSPLAN_INFO]}>
            <AxiosMock mock={restMock}>
                <FpDataContext initialState={{
        [ContextDataType.SØKERSITUASJON]: {
          situasjon: 'adopsjon',
          rolle: args.erMor ? 'mor' : 'far'
        },
        [ContextDataType.OM_BARNET]: {
          type: BarnType.ADOPTERT_ANNET_BARN,
          antallBarn: args.antallBarn,
          adopsjonsdato: args.adopsjonsdato,
          adoptertIUtlandet: false,
          fødselsdatoer: []
        },
        [ContextDataType.PERIODE_MED_FORELDREPENGER]: {
          dekningsgrad: args.dekningsgrad
        },
        [ContextDataType.SØKER_DATA]: args.søkerData,
        [ContextDataType.ANNEN_FORELDER]: args.annenForelder
      }}>
                    <UttaksplanInfo søker={args.søkerinfo.søker} erEndringssøknad={false} mellomlagreSøknadOgNaviger={() => Promise.resolve()} avbrytSøknad={() => undefined} />
                </FpDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(M=(R=r.parameters)==null?void 0:R.docs)==null?void 0:M.source}}};var O,f,u;o.parameters={...o.parameters,docs:{...(O=o.parameters)==null?void 0:O.docs,source:{originalSource:`args => {
  initAmplitude();
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost(UTTAKSPLAN_ANNEN_URL).replyOnce(200, undefined, RequestStatus.FINISHED);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, args.stønadskonto80);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, args.stønadskonto100);
  };
  return <MemoryRouter initialEntries={[SøknadRoutes.UTTAKSPLAN_INFO]}>
            <AxiosMock mock={restMock}>
                <FpDataContext initialState={{
        [ContextDataType.SØKERSITUASJON]: {
          situasjon: 'adopsjon',
          rolle: args.erMor ? 'mor' : 'far'
        },
        [ContextDataType.OM_BARNET]: {
          type: BarnType.ADOPTERT_ANNET_BARN,
          antallBarn: args.antallBarn,
          adopsjonsdato: args.adopsjonsdato,
          adoptertIUtlandet: false,
          fødselsdatoer: []
        },
        [ContextDataType.PERIODE_MED_FORELDREPENGER]: {
          dekningsgrad: args.dekningsgrad
        },
        [ContextDataType.SØKER_DATA]: args.søkerData,
        [ContextDataType.ANNEN_FORELDER]: args.annenForelder
      }}>
                    <UttaksplanInfo søker={args.søkerinfo.søker} erEndringssøknad={false} mellomlagreSøknadOgNaviger={() => Promise.resolve()} avbrytSøknad={() => undefined} />
                </FpDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(u=(f=o.parameters)==null?void 0:f.docs)==null?void 0:u.source}}};var _,y,U;s.parameters={...s.parameters,docs:{...(_=s.parameters)==null?void 0:_.docs,source:{originalSource:`args => {
  initAmplitude();
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost(UTTAKSPLAN_ANNEN_URL).replyOnce(200, undefined, RequestStatus.FINISHED);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, args.stønadskonto80);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, args.stønadskonto100);
  };
  return <MemoryRouter initialEntries={[SøknadRoutes.UTTAKSPLAN_INFO]}>
            <AxiosMock mock={restMock}>
                <FpDataContext initialState={{
        [ContextDataType.SØKERSITUASJON]: {
          situasjon: 'adopsjon',
          rolle: args.erMor ? 'mor' : 'far'
        },
        [ContextDataType.OM_BARNET]: {
          type: BarnType.ADOPTERT_ANNET_BARN,
          antallBarn: args.antallBarn,
          adopsjonsdato: args.adopsjonsdato,
          adoptertIUtlandet: false,
          fødselsdatoer: []
        },
        [ContextDataType.PERIODE_MED_FORELDREPENGER]: {
          dekningsgrad: args.dekningsgrad
        },
        [ContextDataType.SØKER_DATA]: args.søkerData,
        [ContextDataType.ANNEN_FORELDER]: args.annenForelder
      }}>
                    <UttaksplanInfo søker={args.søkerinfo.søker} erEndringssøknad={false} mellomlagreSøknadOgNaviger={() => Promise.resolve()} avbrytSøknad={() => undefined} />
                </FpDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(U=(y=s.parameters)==null?void 0:y.docs)==null?void 0:U.source}}};var I,P,L;d.parameters={...d.parameters,docs:{...(I=d.parameters)==null?void 0:I.docs,source:{originalSource:`args => {
  initAmplitude();
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost(UTTAKSPLAN_ANNEN_URL).replyOnce(200, undefined, RequestStatus.FINISHED);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, args.stønadskonto80);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, args.stønadskonto100);
  };
  return <MemoryRouter initialEntries={[SøknadRoutes.UTTAKSPLAN_INFO]}>
            <AxiosMock mock={restMock}>
                <FpDataContext initialState={{
        [ContextDataType.SØKERSITUASJON]: {
          situasjon: 'adopsjon',
          rolle: args.erMor ? 'mor' : 'far'
        },
        [ContextDataType.OM_BARNET]: {
          type: BarnType.ADOPTERT_ANNET_BARN,
          antallBarn: args.antallBarn,
          adopsjonsdato: args.adopsjonsdato,
          adoptertIUtlandet: false,
          fødselsdatoer: []
        },
        [ContextDataType.PERIODE_MED_FORELDREPENGER]: {
          dekningsgrad: args.dekningsgrad
        },
        [ContextDataType.SØKER_DATA]: args.søkerData,
        [ContextDataType.ANNEN_FORELDER]: args.annenForelder
      }}>
                    <UttaksplanInfo søker={args.søkerinfo.søker} erEndringssøknad={false} mellomlagreSøknadOgNaviger={() => Promise.resolve()} avbrytSøknad={() => undefined} />
                </FpDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(L=(P=d.parameters)==null?void 0:P.docs)==null?void 0:L.source}}};var j,v,K;i.parameters={...i.parameters,docs:{...(j=i.parameters)==null?void 0:j.docs,source:{originalSource:`args => {
  initAmplitude();
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost(UTTAKSPLAN_ANNEN_URL).replyOnce(200, undefined, RequestStatus.FINISHED);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, args.stønadskonto80);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, args.stønadskonto100);
  };
  return <MemoryRouter initialEntries={[SøknadRoutes.UTTAKSPLAN_INFO]}>
            <AxiosMock mock={restMock}>
                <FpDataContext initialState={{
        [ContextDataType.SØKERSITUASJON]: {
          situasjon: 'adopsjon',
          rolle: args.erMor ? 'mor' : 'far'
        },
        [ContextDataType.OM_BARNET]: {
          type: BarnType.ADOPTERT_ANNET_BARN,
          antallBarn: args.antallBarn,
          adopsjonsdato: args.adopsjonsdato,
          adoptertIUtlandet: false,
          fødselsdatoer: []
        },
        [ContextDataType.PERIODE_MED_FORELDREPENGER]: {
          dekningsgrad: args.dekningsgrad
        },
        [ContextDataType.SØKER_DATA]: args.søkerData,
        [ContextDataType.ANNEN_FORELDER]: args.annenForelder
      }}>
                    <UttaksplanInfo søker={args.søkerinfo.søker} erEndringssøknad={false} mellomlagreSøknadOgNaviger={() => Promise.resolve()} avbrytSøknad={() => undefined} />
                </FpDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(K=(v=i.parameters)==null?void 0:v.docs)==null?void 0:K.source}}};var C,B,b;l.parameters={...l.parameters,docs:{...(C=l.parameters)==null?void 0:C.docs,source:{originalSource:`args => {
  initAmplitude();
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost(UTTAKSPLAN_ANNEN_URL).replyOnce(200, undefined, RequestStatus.FINISHED);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, args.stønadskonto80);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, args.stønadskonto100);
  };
  return <MemoryRouter initialEntries={[SøknadRoutes.UTTAKSPLAN_INFO]}>
            <AxiosMock mock={restMock}>
                <FpDataContext initialState={{
        [ContextDataType.SØKERSITUASJON]: {
          situasjon: 'adopsjon',
          rolle: args.erMor ? 'mor' : 'far'
        },
        [ContextDataType.OM_BARNET]: {
          type: BarnType.ADOPTERT_ANNET_BARN,
          antallBarn: args.antallBarn,
          adopsjonsdato: args.adopsjonsdato,
          adoptertIUtlandet: false,
          fødselsdatoer: []
        },
        [ContextDataType.PERIODE_MED_FORELDREPENGER]: {
          dekningsgrad: args.dekningsgrad
        },
        [ContextDataType.SØKER_DATA]: args.søkerData,
        [ContextDataType.ANNEN_FORELDER]: args.annenForelder
      }}>
                    <UttaksplanInfo søker={args.søkerinfo.søker} erEndringssøknad={false} mellomlagreSøknadOgNaviger={() => Promise.resolve()} avbrytSøknad={() => undefined} />
                </FpDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(b=(B=l.parameters)==null?void 0:B.docs)==null?void 0:b.source}}};var G,h,J;k.parameters={...k.parameters,docs:{...(G=k.parameters)==null?void 0:G.docs,source:{originalSource:`args => {
  initAmplitude();
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost(UTTAKSPLAN_ANNEN_URL).replyOnce(200, undefined, RequestStatus.FINISHED);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, args.stønadskonto80);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, args.stønadskonto100);
  };
  return <MemoryRouter initialEntries={[SøknadRoutes.UTTAKSPLAN_INFO]}>
            <AxiosMock mock={restMock}>
                <FpDataContext initialState={{
        [ContextDataType.SØKERSITUASJON]: {
          situasjon: 'adopsjon',
          rolle: args.erMor ? 'mor' : 'far'
        },
        [ContextDataType.OM_BARNET]: {
          type: BarnType.ADOPTERT_ANNET_BARN,
          antallBarn: args.antallBarn,
          adopsjonsdato: args.adopsjonsdato,
          adoptertIUtlandet: false,
          fødselsdatoer: []
        },
        [ContextDataType.PERIODE_MED_FORELDREPENGER]: {
          dekningsgrad: args.dekningsgrad
        },
        [ContextDataType.SØKER_DATA]: args.søkerData,
        [ContextDataType.ANNEN_FORELDER]: args.annenForelder
      }}>
                    <UttaksplanInfo søker={args.søkerinfo.søker} erEndringssøknad={false} mellomlagreSøknadOgNaviger={() => Promise.resolve()} avbrytSøknad={() => undefined} />
                </FpDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(J=(h=k.parameters)==null?void 0:h.docs)==null?void 0:J.source}}};var H,q,Y;p.parameters={...p.parameters,docs:{...(H=p.parameters)==null?void 0:H.docs,source:{originalSource:`args => {
  initAmplitude();
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost(UTTAKSPLAN_ANNEN_URL).replyOnce(200, undefined, RequestStatus.FINISHED);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, args.stønadskonto80);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, args.stønadskonto100);
  };
  return <MemoryRouter initialEntries={[SøknadRoutes.UTTAKSPLAN_INFO]}>
            <AxiosMock mock={restMock}>
                <FpDataContext initialState={{
        [ContextDataType.SØKERSITUASJON]: {
          situasjon: 'adopsjon',
          rolle: args.erMor ? 'mor' : 'far'
        },
        [ContextDataType.OM_BARNET]: {
          type: BarnType.ADOPTERT_ANNET_BARN,
          antallBarn: args.antallBarn,
          adopsjonsdato: args.adopsjonsdato,
          adoptertIUtlandet: false,
          fødselsdatoer: []
        },
        [ContextDataType.PERIODE_MED_FORELDREPENGER]: {
          dekningsgrad: args.dekningsgrad
        },
        [ContextDataType.SØKER_DATA]: args.søkerData,
        [ContextDataType.ANNEN_FORELDER]: args.annenForelder
      }}>
                    <UttaksplanInfo søker={args.søkerinfo.søker} erEndringssøknad={false} mellomlagreSøknadOgNaviger={() => Promise.resolve()} avbrytSøknad={() => undefined} />
                </FpDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(Y=(q=p.parameters)==null?void 0:q.docs)==null?void 0:Y.source}}};const zn=["AdopsjonMorMedAleneomsorgDekningsgrad100Før1Okt2021","AdopsjonFarMedAleneomsorgDekningsgrad80TvillingerFør1Okt2021","AdopsjonMorMedAleneomsorgDekningsgrad80Etter1Okt2021","AdopsjonFarMedAleneomsorgDekningsgrad100Etter1Okt2021","AdopsjonDeltUttakDerMorSøker","AdopsjonDeltUttakDerFarSøker100","AdopsjonMedDeltUttakDerFarSøker80","AdopsjonMedDeltUttakDerFarSøker80Tvillinger"];export{l as AdopsjonDeltUttakDerFarSøker100,i as AdopsjonDeltUttakDerMorSøker,d as AdopsjonFarMedAleneomsorgDekningsgrad100Etter1Okt2021,o as AdopsjonFarMedAleneomsorgDekningsgrad80TvillingerFør1Okt2021,k as AdopsjonMedDeltUttakDerFarSøker80,p as AdopsjonMedDeltUttakDerFarSøker80Tvillinger,r as AdopsjonMorMedAleneomsorgDekningsgrad100Før1Okt2021,s as AdopsjonMorMedAleneomsorgDekningsgrad80Etter1Okt2021,zn as __namedExportsOrder,wn as default};
