import{j as r}from"./jsx-runtime-1caa8f64.js";import{d as k}from"./Tidsperioden-d3b158ba.js";import{B as l}from"./barnUtils-e770e0b5.js";import{D as f}from"./Periodene-56628acc.js";import{D as g}from"./eksisterendeSakUtils-42f6657b.js";import"./index-753920cd.js";import"./index-1cdf6ce0.js";import"./_baseToString-43959ddd.js";import"./_createSet-fe2162c5.js";import{F as S,C as n}from"./FpDataContext-c0784ba8.js";import{S as E}from"./useFpNavigator-381c5d5e.js";import{R as N}from"./useRequest-a00d1ba3.js";import{m as D}from"./mapSøkerinfoDTO-21812b8a.js";import{s as O,a as R}from"./stønadskontoDeltUttak100-ce558aaf.js";import{_ as A}from"./søkerinfo-d0fdfcae.js";import{A as T}from"./AxiosMock-ed819255.js";import{U as p}from"./UttaksplanInfo-5112a340.js";import{i as x}from"./amplitude-bd015a1c.js";import{M as c}from"./dateFormValidation-13e10f67.js";import"./index-daf33b80.js";import"./Link-d47e444a.js";import"./index-a01a9712.js";import"./v4-4a60fe23.js";import"./Perioden-96b8bac4.js";import"./uttaksPlanStatus-8d09fa26.js";import"./stringUtils-c070ccf5.js";import"./dateUtils-ddd25b9f.js";import"./timezone-b3f5c703.js";import"./leggTilPeriode-15fa5ae3.js";import"./velkommenUtils-df400331.js";import"./index-47edccfa.js";import"./Tag-70ce2969.js";import"./apiInterceptor-716e24db.js";import"./index-bcca6cba.js";import"./isFarEllerMedmor-120238ea.js";import"./IntlProvider-669da569.js";import"./dates-471e2cce.js";import"./provider-5ffabb65.js";import"./uttaksplanInfoUtils-dec46c13.js";import"./uttaksplanHarForMangeFlerbarnsuker-2f023a86.js";import"./Uttaksplan-8eff4722.js";import"./FormikFileUploader-157247b6.js";import"./AttachmentList-52ab744a.js";import"./Attachment-c443651d.js";import"./ExpansionCard-cfae3f50.js";import"./links-4d39192e.js";import"./arbeidsforholdUtils-f72d8814.js";import"./_baseIteratee-d7749f38.js";import"./_baseUniq-aff03744.js";import"./formUtils-1eaa45b4.js";import"./LenkeKnapp-725b4f91.js";import"./stønadskontoer-ce19e30a.js";import"./Ingress-f6f9f70c.js";import"./InfoOmSøknaden-d6e5a39d.js";import"./amplitude.esm-2809efde.js";const u="/innsyn/v2/annenPartVedtak",a="/konto",F=A,M={fom:"2022-12-07",tom:"2022-12-07",kontoType:"MØDREKVOTE",resultat:{innvilget:!0,trekkerMinsterett:!1,trekkerDager:!0,årsak:"ANNET"},morsAktivitet:"ARBEID",gradering:{arbeidstidprosent:55,aktivitet:{type:"FRILANS",arbeidsgiver:{id:"string",type:"PRIVAT"}}},samtidigUttak:50,flerbarnsdager:!0},_t={title:"steps/uttaksplan-info/FarMedmorMedAnnenPart",component:p},I=t=>{x();const d=o=>{o.onPost(u).replyOnce(200,{perioder:[M],dekningsgrad:g.HUNDRE_PROSENT},N.FINISHED),o.onGet(a).replyOnce(200,t.stønadskonto100),o.onGet(a).replyOnce(200,t.stønadskonto80)};return r.jsx(c,{initialEntries:[E.UTTAKSPLAN_INFO],children:r.jsx(T,{mock:d,children:r.jsx(S,{initialState:{[n.SØKERSITUASJON]:{situasjon:"fødsel",rolle:"far"},[n.OM_BARNET]:t.barn,[n.PERIODE_MED_FORELDREPENGER]:{dekningsgrad:t.dekningsgrad},[n.SØKER]:{erAleneOmOmsorg:!1,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1,harHattAnnenInntektSiste10Mnd:!1},[n.ANNEN_FORELDER]:{etternavn:"Pettersen",fornavn:"Helga",fnr:"02068629902",utenlandskFnr:!1,kanIkkeOppgis:!1,harRettPåForeldrepengerINorge:!0,erInformertOmSøknaden:!0}},children:r.jsx(p,{søkerInfo:D(t.søkerinfo),erEndringssøknad:!1,mellomlagreSøknadOgNaviger:()=>Promise.resolve(),avbrytSøknad:()=>{}})})})})},e=I.bind({});e.args={stønadskonto100:O,stønadskonto80:R,barn:{type:l.FØDT,fødselsdatoer:[k("2021-06-14").toDate()],antallBarn:1,dokumentasjonAvAleneomsorg:[]},søkerinfo:F,dekningsgrad:f.HUNDRE_PROSENT};var s,i,m;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`args => {
  initAmplitude();
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost(UTTAKSPLAN_ANNEN_URL).replyOnce(200, ({
      perioder: [uttaksperiode],
      dekningsgrad: DekningsgradDTO.HUNDRE_PROSENT
    } as AnnenPartVedtakDTO), RequestStatus.FINISHED);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, args.stønadskonto100);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, args.stønadskonto80);
  };
  return <MemoryRouter initialEntries={[SøknadRoutes.UTTAKSPLAN_INFO]}>
            <AxiosMock mock={restMock}>
                <FpDataContext initialState={{
        [ContextDataType.SØKERSITUASJON]: {
          situasjon: 'fødsel',
          rolle: 'far'
        },
        [ContextDataType.OM_BARNET]: args.barn,
        [ContextDataType.PERIODE_MED_FORELDREPENGER]: {
          dekningsgrad: args.dekningsgrad
        },
        [ContextDataType.SØKER]: {
          erAleneOmOmsorg: false,
          harJobbetSomFrilansSiste10Mnd: false,
          harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: false,
          harHattAnnenInntektSiste10Mnd: false
        },
        [ContextDataType.ANNEN_FORELDER]: {
          etternavn: 'Pettersen',
          fornavn: 'Helga',
          fnr: '02068629902',
          utenlandskFnr: false,
          kanIkkeOppgis: false,
          harRettPåForeldrepengerINorge: true,
          erInformertOmSøknaden: true
        }
      }}>
                    <UttaksplanInfo søkerInfo={mapSøkerinfoDTOToSøkerinfo(args.søkerinfo)} erEndringssøknad={false} mellomlagreSøknadOgNaviger={() => Promise.resolve()} avbrytSøknad={() => undefined} />
                </FpDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(m=(i=e.parameters)==null?void 0:i.docs)==null?void 0:m.source}}};const yt=["UttaksplanInfoAnnenPart"];export{e as UttaksplanInfoAnnenPart,yt as __namedExportsOrder,_t as default};
