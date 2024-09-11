import{j as l}from"./jsx-runtime-Cw0GR0a5.js";import{a as ve}from"./chunk-454WOBUV-CM0pFb8Z.js";import{d as i,I as g}from"./Uttaksdagen-Uuolrvsk.js";import{A as Be}from"./AxiosMock-B4D4gDwg.js";import{B as d,i as Ge,D as Je}from"./Uttaksplan-BcNvEa6D.js";import{S as r}from"./util-BKr3YsRY.js";import{S as T}from"./sivilstandType-DxfjzFEG.js";import{F as He,C as n}from"./FpDataContext-DbGuQRR8.js";import{M as xe,S as Ve}from"./useFpNavigator-Wyh0yuAH.js";import{O as h,A as Ne}from"./Oppsummering-Cv_M_EcO.js";import"./index-CTjT7uj6.js";import"./v4-CQkTLCs1.js";import"./index-D6lQcMct.js";import"./apiInterceptor-BCtLUnPl.js";import"./Label-DlDsESPM.js";import"./iframe-PP2kEOX3.js";import"../sb-preview/runtime.js";import"./links-DsaZ4ja0.js";import"./VStack-CrTlUGgl.js";import"./index-CYM-y3Gt.js";import"./index-BRV0Se7Z.js";import"./_baseAssignValue-BQNUR2Ll.js";import"./_overArg-BaVEvwpy.js";import"./BoIUtlandetOppsummeringspunkt-CwdeWuaQ.js";import"./barnUtils-UOxhk0OD.js";import"./ArbeidsforholdOgInntektPanel-SeizxD0b.js";import"./ErrorSummaryHookForm-D_iKWSXg.js";import"./ExpansionCard-DFeKfuZA.js";import"./arbeidsforholdUtils-BKl9dSPV.js";import"./stønadskontoerUtils-BkXHb-cB.js";import"./guid-CsArkN6i.js";var D=(a=>(a.FISKER="FISKE",a.JORDBRUK="JORDBRUK_SKOGBRUK",a.DAGMAMMA="DAGMAMMA",a.ANNET="ANNEN",a))(D||{});const we=()=>(...a)=>(ve("button-click")(...a),Promise.resolve()),s={søker:{fnr:"02520489226",fornavn:"MOR",etternavn:"MYGG",kjønn:"K",fødselsdato:"1978-04-19",barn:[{fnr:"21091981146",fødselsdato:"2021-03-15",annenForelder:{fnr:"08099017784",fødselsdato:"1985-03-12",fornavn:"LEALAUS",etternavn:"BÆREPOSE"},fornavn:"KLØKTIG",etternavn:"MIDTPUNKT",kjønn:"M"}],sivilstand:{type:T.GIFT}},arbeidsforhold:[]},t={søker:{fnr:"08099017784",fornavn:"FAR",etternavn:"MYGG",kjønn:"M",fødselsdato:"1978-04-19",barn:[{fnr:"19047815714",fødselsdato:"2021-03-15",annenForelder:{fnr:"12038517080",fødselsdato:"1985-03-12",fornavn:"LEALAUS",etternavn:"BÆREPOSE"},fornavn:"KLØKTIG",etternavn:"MIDTPUNKT",kjønn:"K"}],sivilstand:{type:T.UGIFT}},arbeidsforhold:[]},Ye={type:d.FØDT,fødselsdatoer:["2021-03-15"],antallBarn:1,datoForAleneomsorg:"2021-03-15",dokumentasjonAvAleneomsorg:[]},Ze={situasjon:"fødsel",rolle:"mor"},o={kanIkkeOppgis:!0},Ce={iNorgeNeste12Mnd:!0,iNorgeSiste12Mnd:!0},qe=[{id:"0",type:"uttak",forelder:"mor",konto:"FORELDREPENGER_FØR_FØDSEL",tidsperiode:{fom:new Date("2021-11-23T23:00:00.000Z"),tom:new Date("2021-12-13T23:00:00.000Z")}},{id:"1",type:"utsettelse",årsak:"INSTITUSJONSOPPHOLD_SØKER",tidsperiode:{fom:new Date("2021-12-14T23:00:00.000Z"),tom:new Date("2022-01-24T23:00:00.000Z")}},{id:"2",type:"periodeUtenUttak",tidsperiode:{fom:new Date("2022-01-25T23:00:00.000Z"),tom:new Date("2022-03-28T23:00:00.000Z")}},{id:"3",type:"uttak",forelder:"mor",konto:"FELLESPERIODE",tidsperiode:{fom:new Date("2022-03-29T23:00:00.000Z"),tom:new Date("2022-06-06T23:00:00.000Z")},ønskerSamtidigUttak:!1,gradert:!1}],ze={harHattAndreInntektskilder:!1,harJobbetSomFrilans:!1,harJobbetSomSelvstendigNæringsdrivende:!1},Qe={[r.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM]:[],[r.DOK_DELTAKELSE_I_INTRODUKSJONSPROGRAMMET]:[],[r.DOK_INNLEGGELSE_BARN]:[],[r.DOK_INNLEGGELSE_MOR]:[],[r.DOK_INNLEGGELSE_FAR]:[],[r.DOK_SYKDOM_MOR]:[],[r.DOK_SYKDOM_FAR]:[],[r.DOK_ARBEID_MOR]:[],[r.DOK_UTDANNING_MOR]:[],[r.DOK_UTDANNING_OG_ARBEID_MOR]:[],[r.OMSORGSOVERTAKELSE]:[],[r.DOK_AV_ALENEOMSORG]:[],[r.TERMINBEKREFTELSE]:[],[r.DOK_MILITÆR_SILVIL_TJENESTE]:[],[r.ETTERLØNN_ELLER_SLUTTVEDERLAG]:[]},hr={title:"steps/Oppsummering",component:h,render:({søkersituasjon:a=Ze,annenForelder:Me=o,barn:Te=Ye,utenlandsopphold:De=Ce,utenlandsoppholdSenere:he,utenlandsoppholdTidligere:Re,arbeidsforholdOgInntekt:be=ze,frilans:_e,egenNæring:Ue,andreInntekter:Le,gåTilNesteSide:je,...ye})=>{Ge();const Pe=Ke=>{Ke.onPost("/rest/storage/foreldrepenger").reply(200,void 0)};return l.jsx(xe,{initialEntries:[Ve.OPPSUMMERING],children:l.jsx(Be,{mock:Pe,children:l.jsx(He,{onDispatch:je,initialState:{[n.ARBEIDSFORHOLD_OG_INNTEKT]:be,[n.FRILANS]:_e,[n.EGEN_NÆRING]:Ue,[n.ANDRE_INNTEKTSKILDER]:Le,[n.ANNEN_FORELDER]:Me,[n.SØKERSITUASJON]:a,[n.UTTAKSPLAN_METADATA]:{ønskerJustertUttakVedFødsel:!1,harUttaksplanBlittSlettet:!1,antallUkerIUttaksplan:1},[n.OM_BARNET]:Te,[n.UTENLANDSOPPHOLD]:De,[n.UTENLANDSOPPHOLD_SENERE]:he,[n.UTENLANDSOPPHOLD_TIDLIGERE]:Re,[n.PERIODE_MED_FORELDREPENGER]:{dekningsgrad:Je.HUNDRE_PROSENT},[n.UTTAKSPLAN]:qe,[n.VEDLEGG]:Qe},children:l.jsx(h,{...ye})})})})}},e={args:{erEndringssøknad:!1,sendSøknad:()=>Promise.resolve(),søkerInfo:s,avbrytSøknad:ve("button-click"),mellomlagreSøknadOgNaviger:we()}},f={args:{...e.args,annenForelder:{erAleneOmOmsorg:!1,fornavn:"Espen",etternavn:"Utvikler",fnr:"08099017784",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1},barn:{type:d.UFØDT,antallBarn:1,termindato:"2025-10-01"},søkerInfo:{...s,søker:{...s.søker,sivilstand:{type:T.UGIFT}}}}},m={args:{...e.args,søkersituasjon:{situasjon:"fødsel",rolle:"mor"},annenForelder:{erAleneOmOmsorg:!0,fornavn:"Ingen",etternavn:"Omsorg",fnr:"08099017784",kanIkkeOppgis:!1}}},p={args:{...e.args,søkersituasjon:{situasjon:"fødsel",rolle:"far"},søkerInfo:{...t},annenForelder:{erAleneOmOmsorg:!0,fornavn:"Ingen",etternavn:"Omsorg",fnr:"02520489226",kanIkkeOppgis:!1},barn:{type:d.UFØDT,antallBarn:2,termindato:"2025-10-01"}}},k={args:{...e.args,søkersituasjon:{situasjon:"fødsel",rolle:"far"},annenForelder:{erAleneOmOmsorg:!1,fornavn:"Eline",etternavn:"Utvikler",fnr:"02520489226",harRettPåForeldrepengerINorge:!1,harRettPåForeldrepengerIEØS:!1,kanIkkeOppgis:!1,erMorUfør:!0},søkerInfo:{...t,søker:{...t.søker,sivilstand:{type:T.UGIFT}}},barn:{type:d.UFØDT,antallBarn:1,termindato:"2025-10-01"}}},S={args:{...e.args,søkersituasjon:{situasjon:"fødsel",rolle:"far"},annenForelder:{erAleneOmOmsorg:!1,fornavn:"Anne",etternavn:"Forelder",fnr:"02520489226",harOppholdtSegIEØS:!0,harRettPåForeldrepengerINorge:!1,harRettPåForeldrepengerIEØS:!0,kanIkkeOppgis:!1},søkerInfo:{...t}}},u={args:{...e.args,søkersituasjon:{situasjon:"fødsel",rolle:"far"},annenForelder:{erAleneOmOmsorg:!1,fornavn:"Anne",etternavn:"Forelder",fnr:"02520489226",harOppholdtSegIEØS:!0,harRettPåForeldrepengerINorge:!1,harRettPåForeldrepengerIEØS:!1,kanIkkeOppgis:!1},søkerInfo:{...t}}},I={args:{...e.args,søkersituasjon:{situasjon:"fødsel",rolle:"far"},annenForelder:{erAleneOmOmsorg:!1,fornavn:"Frida",etternavn:"Norsk",fnr:"02520489226",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1},søkerInfo:{...t}}},O={args:{...e.args,søkersituasjon:{rolle:"mor",situasjon:"adopsjon"},barn:{type:d.ADOPTERT_STEBARN,antallBarn:1,adopsjonsdato:"2021-10-01",fødselsdatoer:["2021-01-01"],adoptertIUtlandet:!1,omsorgsovertakelse:[]}}},E={args:{...e.args,utenlandsopphold:{iNorgeNeste12Mnd:!1,iNorgeSiste12Mnd:!1},utenlandsoppholdSenere:{senereOpphold:[{land:"SE",tidsperiode:{fom:i().format(g),tom:i().add(100,"days").format(g)}}]},utenlandsoppholdTidligere:{tidligereOpphold:[{land:"SE",tidsperiode:{fom:i().subtract(10,"months").format(g),tom:i().subtract(1,"days").format(g)}}]}}},c={args:{...e.args,arbeidsforholdOgInntekt:{harJobbetSomFrilans:!0,harHattAndreInntektskilder:!1,harJobbetSomSelvstendigNæringsdrivende:!1},frilans:{jobberFremdelesSomFrilans:!0,oppstart:"2019-01-01"},annenForelder:{...o,erAleneOmOmsorg:!1},søkerInfo:{søker:s.søker,arbeidsforhold:[{arbeidsgiverId:"1",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Auto Joachim Bilpleie",stillingsprosent:80,fom:"2015-01-01"},{arbeidsgiverId:"2",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Taco Express",stillingsprosent:20,fom:"2019-01-01",tom:"2021-01-01"}]}}},A={args:{...e.args,arbeidsforholdOgInntekt:{harJobbetSomFrilans:!1,harHattAndreInntektskilder:!1,harJobbetSomSelvstendigNæringsdrivende:!0},egenNæring:{navnPåNæringen:"Fiske",pågående:!1,fomDato:"2018-01-01",tomDato:"2021-01-01",næringstype:D.FISKER,organisasjonsnummer:"123",næringsinntekt:1e6,registrertINorge:!0,harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene:!0,hattVarigEndringAvNæringsinntektSiste4Kalenderår:!0},annenForelder:{...o,erAleneOmOmsorg:!1},søkerInfo:s}},F={args:{...e.args,arbeidsforholdOgInntekt:{harJobbetSomFrilans:!1,harHattAndreInntektskilder:!1,harJobbetSomSelvstendigNæringsdrivende:!0},egenNæring:{navnPåNæringen:"Fiske",pågående:!1,fomDato:"2018-01-01",tomDato:"2021-01-01",næringstype:D.FISKER,registrertILand:"SE",registrertINorge:!1,harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene:!1,hattVarigEndringAvNæringsinntektSiste4Kalenderår:!1},annenForelder:{...o,erAleneOmOmsorg:!1},søkerInfo:s}},v={args:{...e.args,arbeidsforholdOgInntekt:{harJobbetSomFrilans:!1,harHattAndreInntektskilder:!0,harJobbetSomSelvstendigNæringsdrivende:!1},andreInntekter:[{type:Ne.JOBB_I_UTLANDET,pågående:!1,fom:"2018-01-01",tom:"2021-01-01",arbeidsgiverNavn:"Statoil",land:"SE"}],annenForelder:{...o,erAleneOmOmsorg:!1},søkerInfo:s}},N={args:{...e.args,arbeidsforholdOgInntekt:{harJobbetSomFrilans:!1,harHattAndreInntektskilder:!0,harJobbetSomSelvstendigNæringsdrivende:!1},andreInntekter:[{type:Ne.MILITÆRTJENESTE,pågående:!1,fom:"2018-01-01",tom:"2021-01-01"}],annenForelder:{...o,erAleneOmOmsorg:!1},søkerInfo:s}},M={args:{...e.args,erEndringssøknad:!0,annenForelder:{fornavn:"Espen",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1,erAleneOmOmsorg:!1}}};var R,b,_;e.parameters={...e.parameters,docs:{...(R=e.parameters)==null?void 0:R.docs,source:{originalSource:`{
  args: {
    erEndringssøknad: false,
    sendSøknad: () => Promise.resolve(),
    søkerInfo: defaultSøkerinfoMor,
    avbrytSøknad: action('button-click'),
    mellomlagreSøknadOgNaviger: promiseAction()
  }
}`,...(_=(b=e.parameters)==null?void 0:b.docs)==null?void 0:_.source}}};var U,L,j;f.parameters={...f.parameters,docs:{...(U=f.parameters)==null?void 0:U.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    annenForelder: {
      erAleneOmOmsorg: false,
      fornavn: 'Espen',
      etternavn: 'Utvikler',
      fnr: '08099017784',
      harRettPåForeldrepengerINorge: true,
      kanIkkeOppgis: false
    },
    barn: {
      type: BarnType.UFØDT,
      antallBarn: 1,
      termindato: '2025-10-01'
    },
    søkerInfo: {
      ...defaultSøkerinfoMor,
      søker: {
        ...defaultSøkerinfoMor.søker,
        sivilstand: {
          type: SivilstandType.UGIFT
        }
      }
    }
  }
}`,...(j=(L=f.parameters)==null?void 0:L.docs)==null?void 0:j.source}}};var y,P,K;m.parameters={...m.parameters,docs:{...(y=m.parameters)==null?void 0:y.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    søkersituasjon: {
      situasjon: 'fødsel',
      rolle: 'mor'
    },
    annenForelder: {
      erAleneOmOmsorg: true,
      fornavn: 'Ingen',
      etternavn: 'Omsorg',
      fnr: '08099017784',
      kanIkkeOppgis: false
    }
  }
}`,...(K=(P=m.parameters)==null?void 0:P.docs)==null?void 0:K.source}}};var B,G,J;p.parameters={...p.parameters,docs:{...(B=p.parameters)==null?void 0:B.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    søkersituasjon: {
      situasjon: 'fødsel',
      rolle: 'far'
    },
    søkerInfo: {
      ...defaultSøkerinfoFar
    },
    annenForelder: {
      erAleneOmOmsorg: true,
      fornavn: 'Ingen',
      etternavn: 'Omsorg',
      fnr: '02520489226',
      kanIkkeOppgis: false
    },
    barn: {
      type: BarnType.UFØDT,
      antallBarn: 2,
      termindato: '2025-10-01'
    }
  }
}`,...(J=(G=p.parameters)==null?void 0:G.docs)==null?void 0:J.source}}};var H,x,V;k.parameters={...k.parameters,docs:{...(H=k.parameters)==null?void 0:H.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    søkersituasjon: {
      situasjon: 'fødsel',
      rolle: 'far'
    },
    annenForelder: {
      erAleneOmOmsorg: false,
      fornavn: 'Eline',
      etternavn: 'Utvikler',
      fnr: '02520489226',
      harRettPåForeldrepengerINorge: false,
      harRettPåForeldrepengerIEØS: false,
      kanIkkeOppgis: false,
      erMorUfør: true
    },
    søkerInfo: {
      ...defaultSøkerinfoFar,
      søker: {
        ...defaultSøkerinfoFar.søker,
        sivilstand: {
          type: SivilstandType.UGIFT
        }
      }
    },
    barn: {
      type: BarnType.UFØDT,
      antallBarn: 1,
      termindato: '2025-10-01'
    }
  }
}`,...(V=(x=k.parameters)==null?void 0:x.docs)==null?void 0:V.source}}};var w,Y,Z;S.parameters={...S.parameters,docs:{...(w=S.parameters)==null?void 0:w.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    søkersituasjon: {
      situasjon: 'fødsel',
      rolle: 'far'
    },
    annenForelder: {
      erAleneOmOmsorg: false,
      fornavn: 'Anne',
      etternavn: 'Forelder',
      fnr: '02520489226',
      harOppholdtSegIEØS: true,
      harRettPåForeldrepengerINorge: false,
      harRettPåForeldrepengerIEØS: true,
      kanIkkeOppgis: false
    },
    søkerInfo: {
      ...defaultSøkerinfoFar
    }
  }
}`,...(Z=(Y=S.parameters)==null?void 0:Y.docs)==null?void 0:Z.source}}};var C,q,z;u.parameters={...u.parameters,docs:{...(C=u.parameters)==null?void 0:C.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    søkersituasjon: {
      situasjon: 'fødsel',
      rolle: 'far'
    },
    annenForelder: {
      erAleneOmOmsorg: false,
      fornavn: 'Anne',
      etternavn: 'Forelder',
      fnr: '02520489226',
      harOppholdtSegIEØS: true,
      harRettPåForeldrepengerINorge: false,
      harRettPåForeldrepengerIEØS: false,
      kanIkkeOppgis: false
    },
    søkerInfo: {
      ...defaultSøkerinfoFar
    }
  }
}`,...(z=(q=u.parameters)==null?void 0:q.docs)==null?void 0:z.source}}};var Q,W,X;I.parameters={...I.parameters,docs:{...(Q=I.parameters)==null?void 0:Q.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    søkersituasjon: {
      situasjon: 'fødsel',
      rolle: 'far'
    },
    annenForelder: {
      erAleneOmOmsorg: false,
      fornavn: 'Frida',
      etternavn: 'Norsk',
      fnr: '02520489226',
      harRettPåForeldrepengerINorge: true,
      kanIkkeOppgis: false
    },
    søkerInfo: {
      ...defaultSøkerinfoFar
    }
  }
}`,...(X=(W=I.parameters)==null?void 0:W.docs)==null?void 0:X.source}}};var $,ee,re;O.parameters={...O.parameters,docs:{...($=O.parameters)==null?void 0:$.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    søkersituasjon: {
      rolle: 'mor',
      situasjon: 'adopsjon'
    },
    barn: ({
      type: BarnType.ADOPTERT_STEBARN,
      antallBarn: 1,
      adopsjonsdato: '2021-10-01',
      fødselsdatoer: ['2021-01-01'],
      adoptertIUtlandet: false,
      omsorgsovertakelse: []
    } as Barn)
  }
}`,...(re=(ee=O.parameters)==null?void 0:ee.docs)==null?void 0:re.source}}};var ne,ae,se;E.parameters={...E.parameters,docs:{...(ne=E.parameters)==null?void 0:ne.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    utenlandsopphold: {
      iNorgeNeste12Mnd: false,
      iNorgeSiste12Mnd: false
    },
    utenlandsoppholdSenere: {
      senereOpphold: [{
        land: 'SE',
        tidsperiode: {
          fom: dayjs().format(ISO_DATE_FORMAT),
          tom: dayjs().add(100, 'days').format(ISO_DATE_FORMAT)
        }
      }]
    },
    utenlandsoppholdTidligere: {
      tidligereOpphold: [{
        land: 'SE',
        tidsperiode: {
          fom: dayjs().subtract(10, 'months').format(ISO_DATE_FORMAT),
          tom: dayjs().subtract(1, 'days').format(ISO_DATE_FORMAT)
        }
      }]
    }
  }
}`,...(se=(ae=E.parameters)==null?void 0:ae.docs)==null?void 0:se.source}}};var te,oe,de;c.parameters={...c.parameters,docs:{...(te=c.parameters)==null?void 0:te.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    arbeidsforholdOgInntekt: {
      harJobbetSomFrilans: true,
      harHattAndreInntektskilder: false,
      harJobbetSomSelvstendigNæringsdrivende: false
    },
    frilans: {
      jobberFremdelesSomFrilans: true,
      oppstart: '2019-01-01'
    },
    annenForelder: {
      ...defaultAnnenForelder,
      erAleneOmOmsorg: false
    },
    søkerInfo: {
      søker: defaultSøkerinfoMor.søker,
      arbeidsforhold: [{
        arbeidsgiverId: '1',
        arbeidsgiverIdType: 'orgnr',
        arbeidsgiverNavn: 'Auto Joachim Bilpleie',
        stillingsprosent: 80,
        fom: '2015-01-01'
      }, {
        arbeidsgiverId: '2',
        arbeidsgiverIdType: 'orgnr',
        arbeidsgiverNavn: 'Taco Express',
        stillingsprosent: 20,
        fom: '2019-01-01',
        tom: '2021-01-01'
      }]
    }
  }
}`,...(de=(oe=c.parameters)==null?void 0:oe.docs)==null?void 0:de.source}}};var le,ie,ge;A.parameters={...A.parameters,docs:{...(le=A.parameters)==null?void 0:le.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    arbeidsforholdOgInntekt: {
      harJobbetSomFrilans: false,
      harHattAndreInntektskilder: false,
      harJobbetSomSelvstendigNæringsdrivende: true
    },
    egenNæring: {
      navnPåNæringen: 'Fiske',
      pågående: false,
      fomDato: '2018-01-01',
      tomDato: '2021-01-01',
      næringstype: Næringstype.FISKER,
      organisasjonsnummer: '123',
      næringsinntekt: 1000000,
      registrertINorge: true,
      harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene: true,
      hattVarigEndringAvNæringsinntektSiste4Kalenderår: true
    },
    annenForelder: {
      ...defaultAnnenForelder,
      erAleneOmOmsorg: false
    },
    søkerInfo: defaultSøkerinfoMor
  }
}`,...(ge=(ie=A.parameters)==null?void 0:ie.docs)==null?void 0:ge.source}}};var fe,me,pe;F.parameters={...F.parameters,docs:{...(fe=F.parameters)==null?void 0:fe.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    arbeidsforholdOgInntekt: {
      harJobbetSomFrilans: false,
      harHattAndreInntektskilder: false,
      harJobbetSomSelvstendigNæringsdrivende: true
    },
    egenNæring: {
      navnPåNæringen: 'Fiske',
      pågående: false,
      fomDato: '2018-01-01',
      tomDato: '2021-01-01',
      næringstype: Næringstype.FISKER,
      registrertILand: 'SE',
      registrertINorge: false,
      harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene: false,
      hattVarigEndringAvNæringsinntektSiste4Kalenderår: false
    },
    annenForelder: {
      ...defaultAnnenForelder,
      erAleneOmOmsorg: false
    },
    søkerInfo: defaultSøkerinfoMor
  }
}`,...(pe=(me=F.parameters)==null?void 0:me.docs)==null?void 0:pe.source}}};var ke,Se,ue;v.parameters={...v.parameters,docs:{...(ke=v.parameters)==null?void 0:ke.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    arbeidsforholdOgInntekt: {
      harJobbetSomFrilans: false,
      harHattAndreInntektskilder: true,
      harJobbetSomSelvstendigNæringsdrivende: false
    },
    andreInntekter: [{
      type: AnnenInntektType.JOBB_I_UTLANDET,
      pågående: false,
      fom: '2018-01-01',
      tom: '2021-01-01',
      arbeidsgiverNavn: 'Statoil',
      land: 'SE'
    }],
    annenForelder: {
      ...defaultAnnenForelder,
      erAleneOmOmsorg: false
    },
    søkerInfo: defaultSøkerinfoMor
  }
}`,...(ue=(Se=v.parameters)==null?void 0:Se.docs)==null?void 0:ue.source}}};var Ie,Oe,Ee;N.parameters={...N.parameters,docs:{...(Ie=N.parameters)==null?void 0:Ie.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    arbeidsforholdOgInntekt: {
      harJobbetSomFrilans: false,
      harHattAndreInntektskilder: true,
      harJobbetSomSelvstendigNæringsdrivende: false
    },
    andreInntekter: [{
      type: AnnenInntektType.MILITÆRTJENESTE,
      pågående: false,
      fom: '2018-01-01',
      tom: '2021-01-01'
    }],
    annenForelder: {
      ...defaultAnnenForelder,
      erAleneOmOmsorg: false
    },
    søkerInfo: defaultSøkerinfoMor
  }
}`,...(Ee=(Oe=N.parameters)==null?void 0:Oe.docs)==null?void 0:Ee.source}}};var ce,Ae,Fe;M.parameters={...M.parameters,docs:{...(ce=M.parameters)==null?void 0:ce.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    erEndringssøknad: true,
    annenForelder: {
      fornavn: 'Espen',
      etternavn: 'Utvikler',
      fnr: '1212121313',
      harRettPåForeldrepengerINorge: true,
      kanIkkeOppgis: false,
      erAleneOmOmsorg: false
    }
  }
}`,...(Fe=(Ae=M.parameters)==null?void 0:Ae.docs)==null?void 0:Fe.source}}};const Rr=["Default","MorMedAnnenForelderUgift","MorMedAleneOmsorg","FarMedAleneOmsorg","FarMedUførMorUgift","FarMedMorSomHarRettIEØS","FarMedMorSomHarOppholdsSegIEØSMenIkkeHarRettIEØS","FarMedMorSomHarRettINorge","MorMedAdoptertBarn","MorMedUtenlandsopphold","MorMedArbeidsforholdOgAndreInntekter","MorMedSelvstendigNæringsdrivende","MorMedSelvstendigNæringsdrivendeUtenDiverse","MorMedAndreInntekterJobbIUtlandet","MorMedAndreInntekterMilitærtjeneste","ErEndringssøknad"];export{e as Default,M as ErEndringssøknad,p as FarMedAleneOmsorg,u as FarMedMorSomHarOppholdsSegIEØSMenIkkeHarRettIEØS,S as FarMedMorSomHarRettIEØS,I as FarMedMorSomHarRettINorge,k as FarMedUførMorUgift,O as MorMedAdoptertBarn,m as MorMedAleneOmsorg,v as MorMedAndreInntekterJobbIUtlandet,N as MorMedAndreInntekterMilitærtjeneste,f as MorMedAnnenForelderUgift,c as MorMedArbeidsforholdOgAndreInntekter,A as MorMedSelvstendigNæringsdrivende,F as MorMedSelvstendigNæringsdrivendeUtenDiverse,E as MorMedUtenlandsopphold,Rr as __namedExportsOrder,hr as default};
