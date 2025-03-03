import{j}from"./jsx-runtime-CLpGMVip.js";import{a as Be}from"./chunk-D5ZWXAHU-DlerbUHg.js";import{F as Qe,C as a}from"./FpDataContext-DWIUkGg8.js";import{M as We,S as Xe}from"./useFpNavigator-Ct76ZVKg.js";import{d as g,I as p}from"./dates-Bq8T6S-m.js";import{h as en,H as nn}from"./index-B-Pz4-0B.js";import{A as v}from"./AnnenInntekt-D0302_mv.js";import{B as E,D as rn}from"./Uttaksplan-BKY93MP0.js";import{S as e,A as U,a as r,I as an}from"./uttaksplanInfoUtils-Bus8Vu1t.js";import{S as h}from"./sivilstandType-DxfjzFEG.js";import{O as G}from"./Oppsummering-C9FCWWvy.js";import"./v4-CtRu48qb.js";import"./index-DI2V0i71.js";import"./Link-gP2v3_my.js";import"./decorators-DIzpaN6C.js";import"./iframe-Dtp7ibdg.js";import"./VStack-BuWRMdWF.js";import"./index-Go8-pri6.js";import"./index-DNwIpxWs.js";import"./barnUtils-CB84ho6j.js";import"./BoIUtlandetOppsummering-68QIy9pB.js";import"./EgenNæring-bnb8Ikwh.js";import"./ArbeidsforholdOgInntekt-BB_xJ7f8.js";import"./Dekningsgrad-Bg_cIyqc.js";import"./stønadskontoerUtils-EOU1M6zK.js";var b=(t=>(t.FISKER="FISKE",t.JORDBRUK="JORDBRUK_SKOGBRUK",t.DAGMAMMA="DAGMAMMA",t.ANNET="ANNEN",t))(b||{});const tn=()=>(...t)=>(Be("button-click")(...t),Promise.resolve()),o={søker:{fnr:"02520489226",fornavn:"MOR",etternavn:"MYGG",kjønn:"K",fødselsdato:"1978-04-19",barn:[{fnr:"21091981146",fødselsdato:"2021-03-15",annenForelder:{fnr:"08099017784",fødselsdato:"1985-03-12",fornavn:"LEALAUS",etternavn:"BÆREPOSE"},fornavn:"KLØKTIG",etternavn:"MIDTPUNKT",kjønn:"M"}],sivilstand:{type:h.GIFT}},arbeidsforhold:[]},m={søker:{fnr:"08099017784",fornavn:"FAR",etternavn:"MYGG",kjønn:"M",fødselsdato:"1978-04-19",barn:[{fnr:"19047815714",fødselsdato:"2021-03-15",annenForelder:{fnr:"12038517080",fødselsdato:"1985-03-12",fornavn:"LEALAUS",etternavn:"BÆREPOSE"},fornavn:"KLØKTIG",etternavn:"MIDTPUNKT",kjønn:"K"}],sivilstand:{type:h.UGIFT}},arbeidsforhold:[]},sn={type:E.FØDT,fødselsdatoer:["2021-03-15"],antallBarn:1,datoForAleneomsorg:"2021-03-15",dokumentasjonAvAleneomsorg:[]},on={situasjon:"fødsel",rolle:"mor"},i={kanIkkeOppgis:!0},dn={harBoddUtenforNorgeSiste12Mnd:!1,skalBoUtenforNorgeNeste12Mnd:!1},ln=[{id:"0",type:"uttak",forelder:"MOR",konto:"FORELDREPENGER_FØR_FØDSEL",tidsperiode:{fom:new Date("2021-11-23T23:00:00.000Z"),tom:new Date("2021-12-13T23:00:00.000Z")}},{id:"1",type:"utsettelse",årsak:"INSTITUSJONSOPPHOLD_SØKER",tidsperiode:{fom:new Date("2021-12-14T23:00:00.000Z"),tom:new Date("2022-01-24T23:00:00.000Z")}},{id:"2",type:"periodeUtenUttak",tidsperiode:{fom:new Date("2022-01-25T23:00:00.000Z"),tom:new Date("2022-03-28T23:00:00.000Z")}},{id:"3",type:"uttak",forelder:"MOR",konto:"FELLESPERIODE",tidsperiode:{fom:new Date("2022-03-29T23:00:00.000Z"),tom:new Date("2022-06-06T23:00:00.000Z")},ønskerSamtidigUttak:!1,gradert:!1}],mn={harHattAndreInntektskilder:!1,harJobbetSomFrilans:!1,harJobbetSomSelvstendigNæringsdrivende:!1},Je={[e.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM]:[],[e.DOK_DELTAKELSE_I_INTRODUKSJONSPROGRAMMET]:[],[e.DOK_INNLEGGELSE_BARN]:[],[e.DOK_INNLEGGELSE_MOR]:[],[e.DOK_INNLEGGELSE_FAR]:[],[e.DOK_SYKDOM_MOR]:[],[e.DOK_SYKDOM_FAR]:[],[e.DOK_ARBEID_MOR]:[],[e.DOK_UTDANNING_MOR]:[],[e.DOK_UTDANNING_OG_ARBEID_MOR]:[],[e.OMSORGSOVERTAKELSE]:[],[e.DOK_AV_ALENEOMSORG]:[],[e.TERMINBEKREFTELSE]:[],[e.DOK_MILITÆR_SILVIL_TJENESTE]:[],[e.ETTERLØNN_ELLER_SLUTTVEDERLAG]:[]},bn={title:"steps/Oppsummering",component:G,parameters:{msw:{handlers:[en.post(".//rest/storage/foreldrepenger",()=>new nn(null,{status:200}))]}},render:({søkersituasjon:t=on,annenForelder:f=i,barn:y=sn,utenlandsopphold:Ve=dn,utenlandsoppholdSenere:He,utenlandsoppholdTidligere:Ye,arbeidsforholdOgInntekt:we=mn,frilans:xe,egenNæring:Ze,andreInntekter:Ce,gåTilNesteSide:ze,vedlegg:$e=Je,...qe})=>j.jsx(We,{initialEntries:[Xe.OPPSUMMERING],children:j.jsx(Qe,{onDispatch:ze,initialState:{[a.ARBEIDSFORHOLD_OG_INNTEKT]:we,[a.FRILANS]:xe,[a.EGEN_NÆRING]:Ze,[a.ANDRE_INNTEKTSKILDER]:Ce,[a.ANNEN_FORELDER]:f,[a.SØKERSITUASJON]:t,[a.UTTAKSPLAN_METADATA]:{ønskerJustertUttakVedFødsel:!1,harUttaksplanBlittSlettet:!1,antallUkerIUttaksplan:1},[a.OM_BARNET]:y,[a.UTENLANDSOPPHOLD]:Ve,[a.UTENLANDSOPPHOLD_SENERE]:He,[a.UTENLANDSOPPHOLD_TIDLIGERE]:Ye,[a.PERIODE_MED_FORELDREPENGER]:rn.HUNDRE_PROSENT,[a.UTTAKSPLAN]:ln,[a.VEDLEGG]:$e},children:j.jsx(G,{...qe})})})},n={args:{erEndringssøknad:!1,sendSøknad:()=>Promise.resolve(),søkerInfo:o,avbrytSøknad:Be("button-click"),mellomlagreSøknadOgNaviger:tn()}},O={args:{...n.args,annenForelder:{erAleneOmOmsorg:!1,fornavn:"Espen",etternavn:"Utvikler",fnr:"08099017784",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1},barn:{type:E.UFØDT,antallBarn:1,termindato:"2025-10-01"},søkerInfo:{...o,søker:{...o.søker,sivilstand:{type:h.UGIFT}}}}},I={args:{...n.args,søkersituasjon:{situasjon:"fødsel",rolle:"mor"},annenForelder:{erAleneOmOmsorg:!0,fornavn:"Ingen",etternavn:"Omsorg",fnr:"08099017784",kanIkkeOppgis:!1}}},S={args:{...n.args,søkersituasjon:{situasjon:"fødsel",rolle:"far"},søkerInfo:{...m},annenForelder:{erAleneOmOmsorg:!0,fornavn:"Ingen",etternavn:"Omsorg",fnr:"02520489226",kanIkkeOppgis:!1},barn:{type:E.UFØDT,antallBarn:2,termindato:"2025-10-01"}}},T={args:{...n.args,søkersituasjon:{situasjon:"fødsel",rolle:"far"},annenForelder:{erAleneOmOmsorg:!1,fornavn:"Eline",etternavn:"Utvikler",fnr:"02520489226",harRettPåForeldrepengerINorge:!1,harRettPåForeldrepengerIEØS:!1,kanIkkeOppgis:!1,erMorUfør:!0},søkerInfo:{...m,søker:{...m.søker,sivilstand:{type:h.UGIFT}}},barn:{type:E.UFØDT,antallBarn:1,termindato:"2025-10-01"}}},k={args:{...n.args,søkersituasjon:{situasjon:"fødsel",rolle:"far"},annenForelder:{erAleneOmOmsorg:!1,fornavn:"Anne",etternavn:"Forelder",fnr:"02520489226",harOppholdtSegIEØS:!0,harRettPåForeldrepengerINorge:!1,harRettPåForeldrepengerIEØS:!0,kanIkkeOppgis:!1},søkerInfo:{...m}}},N={args:{...n.args,søkersituasjon:{situasjon:"fødsel",rolle:"far"},annenForelder:{erAleneOmOmsorg:!1,fornavn:"Anne",etternavn:"Forelder",fnr:"02520489226",harOppholdtSegIEØS:!0,harRettPåForeldrepengerINorge:!1,harRettPåForeldrepengerIEØS:!1,kanIkkeOppgis:!1},søkerInfo:{...m}}},A={args:{...n.args,søkersituasjon:{situasjon:"fødsel",rolle:"far"},annenForelder:{erAleneOmOmsorg:!1,fornavn:"Frida",etternavn:"Norsk",fnr:"02520489226",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1},søkerInfo:{...m}}},u={args:{...n.args,søkersituasjon:{rolle:"mor",situasjon:"adopsjon"},barn:{type:E.ADOPTERT_STEBARN,antallBarn:1,adopsjonsdato:"2021-10-01",fødselsdatoer:["2021-01-01"],adoptertIUtlandet:!1,omsorgsovertakelse:[]}}},_={args:{...n.args,utenlandsopphold:{skalBoUtenforNorgeNeste12Mnd:!0,harBoddUtenforNorgeSiste12Mnd:!0},utenlandsoppholdSenere:[{landkode:"SE",fom:g().format(p),tom:g().add(100,"days").format(p)}],utenlandsoppholdTidligere:[{landkode:"SE",fom:g().subtract(10,"months").format(p),tom:g().subtract(1,"days").format(p)}]}},R={args:{...n.args,arbeidsforholdOgInntekt:{harJobbetSomFrilans:!0,harHattAndreInntektskilder:!1,harJobbetSomSelvstendigNæringsdrivende:!1},frilans:{jobberFremdelesSomFrilans:!0,oppstart:"2019-01-01"},annenForelder:{...i,erAleneOmOmsorg:!1},søkerInfo:{søker:o.søker,arbeidsforhold:[{arbeidsgiverId:"1",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Auto Joachim Bilpleie",stillingsprosent:80,fom:"2015-01-01"},{arbeidsgiverId:"2",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Taco Express",stillingsprosent:20,fom:"2019-01-01",tom:"2021-01-01"}]}}},M={args:{...n.args,arbeidsforholdOgInntekt:{harJobbetSomFrilans:!1,harHattAndreInntektskilder:!1,harJobbetSomSelvstendigNæringsdrivende:!0},egenNæring:{navnPåNæringen:"Fiske",pågående:!1,fom:"2018-01-01",tom:"2021-01-01",næringstype:b.FISKER,organisasjonsnummer:"123",næringsinntekt:1e6,registrertINorge:!0,harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene:!0,hattVarigEndringAvNæringsinntektSiste4Kalenderår:!0},annenForelder:{...i,erAleneOmOmsorg:!1},søkerInfo:o}},D={args:{...n.args,arbeidsforholdOgInntekt:{harJobbetSomFrilans:!1,harHattAndreInntektskilder:!1,harJobbetSomSelvstendigNæringsdrivende:!0},egenNæring:{navnPåNæringen:"Fiske",pågående:!1,fom:"2018-01-01",tom:"2021-01-01",næringstype:b.FISKER,registrertILand:"SE",registrertINorge:!1,harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene:!1,hattVarigEndringAvNæringsinntektSiste4Kalenderår:!1},annenForelder:{...i,erAleneOmOmsorg:!1},søkerInfo:o}},F={args:{...n.args,arbeidsforholdOgInntekt:{harJobbetSomFrilans:!1,harHattAndreInntektskilder:!0,harJobbetSomSelvstendigNæringsdrivende:!1},andreInntekter:[{type:v.JOBB_I_UTLANDET,pågående:!1,fom:"2018-01-01",tom:"2021-01-01",arbeidsgiverNavn:"Statoil",land:"SE"},{type:v.MILITÆRTJENESTE,pågående:!0,fom:"2022-01-01"},{type:v.SLUTTPAKKE,fom:"2022-01-01",tom:"2023-01-01"}],annenForelder:{...i,erAleneOmOmsorg:!1},søkerInfo:o}},c={args:{...n.args,arbeidsforholdOgInntekt:{harJobbetSomFrilans:!1,harHattAndreInntektskilder:!0,harJobbetSomSelvstendigNæringsdrivende:!1},andreInntekter:[{type:v.MILITÆRTJENESTE,pågående:!1,fom:"2018-01-01",tom:"2021-01-01"}],annenForelder:{...i,erAleneOmOmsorg:!1},søkerInfo:o}},d={filesize:1234,url:"test",id:"1",file:new File(["abc".repeat(1e5)],"Filnavn1.jpg"),pending:!1,uploaded:!0},s={...d,dokumenterer:{type:U.UTTAK,perioder:[{fom:"2024-01-01",tom:"2024-10-01"}]}},l={args:{...n.args,vedlegg:{...Je,[e.ETTERLØNN_ELLER_SLUTTVEDERLAG]:[{...d,filename:"etterlønn.pdf",type:r.ANNEN_INNTEKT,skjemanummer:e.ETTERLØNN_ELLER_SLUTTVEDERLAG,dokumenterer:{type:U.OPPTJENING,perioder:[{fom:"2024-01-01",tom:"2024-10-01"}]}},{...d,filename:"etterlønn2.pdf",type:r.ANNEN_INNTEKT,skjemanummer:e.ETTERLØNN_ELLER_SLUTTVEDERLAG}],[e.DOK_MILITÆR_SILVIL_TJENESTE]:[{...d,filename:"siviltjeneste.pdf",type:r.ANNEN_INNTEKT,skjemanummer:e.DOK_MILITÆR_SILVIL_TJENESTE,dokumenterer:{type:U.OPPTJENING,perioder:[{fom:"2024-01-01",tom:"2024-10-01"}]}}],[e.OMSORGSOVERTAKELSE]:[{...d,filename:"omsorgsovertakelse.pdf",type:r.OMSORGSOVERTAKELSE,skjemanummer:e.OMSORGSOVERTAKELSE}],[e.DOK_AV_ALENEOMSORG]:[{...d,filename:"aleneomsorg.pdf",type:r.ALENEOMSORG,skjemanummer:e.DOK_AV_ALENEOMSORG}],[e.TERMINBEKREFTELSE]:[{...d,filename:"terminbekreftelse.pdf",type:r.TERMINBEKREFTELSE,skjemanummer:e.TERMINBEKREFTELSE}],[e.DOK_DELTAKELSE_I_INTRODUKSJONSPROGRAMMET]:[{...s,filename:"dok-deltakelse.pdf",type:r.MORS_AKTIVITET_DOKUMENTASJON,skjemanummer:e.DOK_DELTAKELSE_I_INTRODUKSJONSPROGRAMMET}],[e.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM]:[{...s,filename:"kvalifiseringsprogram.pdf",type:r.MORS_AKTIVITET_DOKUMENTASJON,skjemanummer:e.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM}],[e.DOK_INNLEGGELSE_MOR]:[{...s,filename:"innleggelse-mor.pdf",type:r.MORS_AKTIVITET_DOKUMENTASJON,skjemanummer:e.DOK_INNLEGGELSE_MOR}],[e.DOK_INNLEGGELSE_BARN]:[{...s,filename:"innleggelse-barn.pdf",type:r.MORS_AKTIVITET_DOKUMENTASJON,skjemanummer:e.DOK_INNLEGGELSE_BARN}],[e.DOK_INNLEGGELSE_FAR]:[{...s,filename:"innleggelse-far.pdf",type:r.MORS_AKTIVITET_DOKUMENTASJON,skjemanummer:e.DOK_INNLEGGELSE_FAR}],[e.DOK_SYKDOM_MOR]:[{...s,filename:"sykdom-mor.pdf",type:r.MORS_AKTIVITET_DOKUMENTASJON,skjemanummer:e.DOK_SYKDOM_MOR}],[e.DOK_ARBEID_MOR]:[{...s,filename:"dok-arbeid-mor.pdf",type:r.MORS_AKTIVITET_DOKUMENTASJON,skjemanummer:e.DOK_ARBEID_MOR}],[e.DOK_UTDANNING_MOR]:[{...s,filename:"dok-utdanning-mor.pdf",type:r.MORS_AKTIVITET_DOKUMENTASJON,skjemanummer:e.DOK_UTDANNING_MOR}],[e.DOK_UTDANNING_OG_ARBEID_MOR]:[{...s,filename:"dok-utdanning-og-arbeid-mor.pdf",type:r.MORS_AKTIVITET_DOKUMENTASJON,skjemanummer:e.DOK_UTDANNING_OG_ARBEID_MOR}]}}};var P;const L={args:{...n.args,vedlegg:{...(P=l.args)!=null&&P.vedlegg?Object.entries(l.args.vedlegg).reduce((t,f)=>({...t,[f[0]]:f[1].map(y=>({...y,innsendingsType:an.SEND_SENERE}))}),{}):{}}}},K={args:{...n.args,erEndringssøknad:!0,annenForelder:{fornavn:"Espen",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1,erAleneOmOmsorg:!1}}};var B,J,V;n.parameters={...n.parameters,docs:{...(B=n.parameters)==null?void 0:B.docs,source:{originalSource:`{
  args: {
    erEndringssøknad: false,
    sendSøknad: () => Promise.resolve(),
    søkerInfo: defaultSøkerinfoMor,
    avbrytSøknad: action('button-click'),
    mellomlagreSøknadOgNaviger: promiseAction()
  }
}`,...(V=(J=n.parameters)==null?void 0:J.docs)==null?void 0:V.source}}};var H,Y,w;O.parameters={...O.parameters,docs:{...(H=O.parameters)==null?void 0:H.docs,source:{originalSource:`{
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
}`,...(w=(Y=O.parameters)==null?void 0:Y.docs)==null?void 0:w.source}}};var x,Z,C;I.parameters={...I.parameters,docs:{...(x=I.parameters)==null?void 0:x.docs,source:{originalSource:`{
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
}`,...(C=(Z=I.parameters)==null?void 0:Z.docs)==null?void 0:C.source}}};var z,$,q;S.parameters={...S.parameters,docs:{...(z=S.parameters)==null?void 0:z.docs,source:{originalSource:`{
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
}`,...(q=($=S.parameters)==null?void 0:$.docs)==null?void 0:q.source}}};var Q,W,X;T.parameters={...T.parameters,docs:{...(Q=T.parameters)==null?void 0:Q.docs,source:{originalSource:`{
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
}`,...(X=(W=T.parameters)==null?void 0:W.docs)==null?void 0:X.source}}};var ee,ne,re;k.parameters={...k.parameters,docs:{...(ee=k.parameters)==null?void 0:ee.docs,source:{originalSource:`{
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
}`,...(re=(ne=k.parameters)==null?void 0:ne.docs)==null?void 0:re.source}}};var ae,te,se;N.parameters={...N.parameters,docs:{...(ae=N.parameters)==null?void 0:ae.docs,source:{originalSource:`{
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
}`,...(se=(te=N.parameters)==null?void 0:te.docs)==null?void 0:se.source}}};var oe,de,le;A.parameters={...A.parameters,docs:{...(oe=A.parameters)==null?void 0:oe.docs,source:{originalSource:`{
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
}`,...(le=(de=A.parameters)==null?void 0:de.docs)==null?void 0:le.source}}};var me,ie,Ee;u.parameters={...u.parameters,docs:{...(me=u.parameters)==null?void 0:me.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    søkersituasjon: {
      rolle: 'mor',
      situasjon: 'adopsjon'
    },
    barn: {
      type: BarnType.ADOPTERT_STEBARN,
      antallBarn: 1,
      adopsjonsdato: '2021-10-01',
      fødselsdatoer: ['2021-01-01'],
      adoptertIUtlandet: false,
      omsorgsovertakelse: []
    } as Barn
  }
}`,...(Ee=(ie=u.parameters)==null?void 0:ie.docs)==null?void 0:Ee.source}}};var fe,ge,pe;_.parameters={..._.parameters,docs:{...(fe=_.parameters)==null?void 0:fe.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    utenlandsopphold: {
      skalBoUtenforNorgeNeste12Mnd: true,
      harBoddUtenforNorgeSiste12Mnd: true
    },
    utenlandsoppholdSenere: [{
      landkode: 'SE',
      fom: dayjs().format(ISO_DATE_FORMAT),
      tom: dayjs().add(100, 'days').format(ISO_DATE_FORMAT)
    }],
    utenlandsoppholdTidligere: [{
      landkode: 'SE',
      fom: dayjs().subtract(10, 'months').format(ISO_DATE_FORMAT),
      tom: dayjs().subtract(1, 'days').format(ISO_DATE_FORMAT)
    }]
  }
}`,...(pe=(ge=_.parameters)==null?void 0:ge.docs)==null?void 0:pe.source}}};var Oe,Ie,Se;R.parameters={...R.parameters,docs:{...(Oe=R.parameters)==null?void 0:Oe.docs,source:{originalSource:`{
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
}`,...(Se=(Ie=R.parameters)==null?void 0:Ie.docs)==null?void 0:Se.source}}};var Te,ke,Ne;M.parameters={...M.parameters,docs:{...(Te=M.parameters)==null?void 0:Te.docs,source:{originalSource:`{
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
      fom: '2018-01-01',
      tom: '2021-01-01',
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
}`,...(Ne=(ke=M.parameters)==null?void 0:ke.docs)==null?void 0:Ne.source}}};var Ae,ue,_e;D.parameters={...D.parameters,docs:{...(Ae=D.parameters)==null?void 0:Ae.docs,source:{originalSource:`{
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
      fom: '2018-01-01',
      tom: '2021-01-01',
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
}`,...(_e=(ue=D.parameters)==null?void 0:ue.docs)==null?void 0:_e.source}}};var Re,Me,De;F.parameters={...F.parameters,docs:{...(Re=F.parameters)==null?void 0:Re.docs,source:{originalSource:`{
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
    }, {
      type: AnnenInntektType.MILITÆRTJENESTE,
      pågående: true,
      fom: '2022-01-01'
    }, {
      type: AnnenInntektType.SLUTTPAKKE,
      fom: '2022-01-01',
      tom: '2023-01-01'
    }],
    annenForelder: {
      ...defaultAnnenForelder,
      erAleneOmOmsorg: false
    },
    søkerInfo: defaultSøkerinfoMor
  }
}`,...(De=(Me=F.parameters)==null?void 0:Me.docs)==null?void 0:De.source}}};var Fe,ce,Le;c.parameters={...c.parameters,docs:{...(Fe=c.parameters)==null?void 0:Fe.docs,source:{originalSource:`{
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
}`,...(Le=(ce=c.parameters)==null?void 0:ce.docs)==null?void 0:Le.source}}};var Ke,ve,he;l.parameters={...l.parameters,docs:{...(Ke=l.parameters)==null?void 0:Ke.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    vedlegg: {
      ...defaultVedlegg,
      [Skjemanummer.ETTERLØNN_ELLER_SLUTTVEDERLAG]: [{
        ...FIL_INFO,
        filename: 'etterlønn.pdf',
        type: AttachmentType.ANNEN_INNTEKT,
        skjemanummer: Skjemanummer.ETTERLØNN_ELLER_SLUTTVEDERLAG,
        dokumenterer: {
          type: AttachmentMetadataType.OPPTJENING,
          perioder: [{
            fom: '2024-01-01',
            tom: '2024-10-01'
          }]
        }
      }, {
        ...FIL_INFO,
        filename: 'etterlønn2.pdf',
        type: AttachmentType.ANNEN_INNTEKT,
        skjemanummer: Skjemanummer.ETTERLØNN_ELLER_SLUTTVEDERLAG
      }],
      [Skjemanummer.DOK_MILITÆR_SILVIL_TJENESTE]: [{
        ...FIL_INFO,
        filename: 'siviltjeneste.pdf',
        type: AttachmentType.ANNEN_INNTEKT,
        skjemanummer: Skjemanummer.DOK_MILITÆR_SILVIL_TJENESTE,
        dokumenterer: {
          type: AttachmentMetadataType.OPPTJENING,
          perioder: [{
            fom: '2024-01-01',
            tom: '2024-10-01'
          }]
        }
      }],
      [Skjemanummer.OMSORGSOVERTAKELSE]: [{
        ...FIL_INFO,
        filename: 'omsorgsovertakelse.pdf',
        type: AttachmentType.OMSORGSOVERTAKELSE,
        skjemanummer: Skjemanummer.OMSORGSOVERTAKELSE
      }],
      [Skjemanummer.DOK_AV_ALENEOMSORG]: [{
        ...FIL_INFO,
        filename: 'aleneomsorg.pdf',
        type: AttachmentType.ALENEOMSORG,
        skjemanummer: Skjemanummer.DOK_AV_ALENEOMSORG
      }],
      [Skjemanummer.TERMINBEKREFTELSE]: [{
        ...FIL_INFO,
        filename: 'terminbekreftelse.pdf',
        type: AttachmentType.TERMINBEKREFTELSE,
        skjemanummer: Skjemanummer.TERMINBEKREFTELSE
      }],
      [Skjemanummer.DOK_DELTAKELSE_I_INTRODUKSJONSPROGRAMMET]: [{
        ...FIL_INFO_UTTAK_MED_PERIODE,
        filename: 'dok-deltakelse.pdf',
        type: AttachmentType.MORS_AKTIVITET_DOKUMENTASJON,
        skjemanummer: Skjemanummer.DOK_DELTAKELSE_I_INTRODUKSJONSPROGRAMMET
      }],
      [Skjemanummer.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM]: [{
        ...FIL_INFO_UTTAK_MED_PERIODE,
        filename: 'kvalifiseringsprogram.pdf',
        type: AttachmentType.MORS_AKTIVITET_DOKUMENTASJON,
        skjemanummer: Skjemanummer.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM
      }],
      [Skjemanummer.DOK_INNLEGGELSE_MOR]: [{
        ...FIL_INFO_UTTAK_MED_PERIODE,
        filename: 'innleggelse-mor.pdf',
        type: AttachmentType.MORS_AKTIVITET_DOKUMENTASJON,
        skjemanummer: Skjemanummer.DOK_INNLEGGELSE_MOR
      }],
      [Skjemanummer.DOK_INNLEGGELSE_BARN]: [{
        ...FIL_INFO_UTTAK_MED_PERIODE,
        filename: 'innleggelse-barn.pdf',
        type: AttachmentType.MORS_AKTIVITET_DOKUMENTASJON,
        skjemanummer: Skjemanummer.DOK_INNLEGGELSE_BARN
      }],
      [Skjemanummer.DOK_INNLEGGELSE_FAR]: [{
        ...FIL_INFO_UTTAK_MED_PERIODE,
        filename: 'innleggelse-far.pdf',
        type: AttachmentType.MORS_AKTIVITET_DOKUMENTASJON,
        skjemanummer: Skjemanummer.DOK_INNLEGGELSE_FAR
      }],
      [Skjemanummer.DOK_SYKDOM_MOR]: [{
        ...FIL_INFO_UTTAK_MED_PERIODE,
        filename: 'sykdom-mor.pdf',
        type: AttachmentType.MORS_AKTIVITET_DOKUMENTASJON,
        skjemanummer: Skjemanummer.DOK_SYKDOM_MOR
      }],
      [Skjemanummer.DOK_ARBEID_MOR]: [{
        ...FIL_INFO_UTTAK_MED_PERIODE,
        filename: 'dok-arbeid-mor.pdf',
        type: AttachmentType.MORS_AKTIVITET_DOKUMENTASJON,
        skjemanummer: Skjemanummer.DOK_ARBEID_MOR
      }],
      [Skjemanummer.DOK_UTDANNING_MOR]: [{
        ...FIL_INFO_UTTAK_MED_PERIODE,
        filename: 'dok-utdanning-mor.pdf',
        type: AttachmentType.MORS_AKTIVITET_DOKUMENTASJON,
        skjemanummer: Skjemanummer.DOK_UTDANNING_MOR
      }],
      [Skjemanummer.DOK_UTDANNING_OG_ARBEID_MOR]: [{
        ...FIL_INFO_UTTAK_MED_PERIODE,
        filename: 'dok-utdanning-og-arbeid-mor.pdf',
        type: AttachmentType.MORS_AKTIVITET_DOKUMENTASJON,
        skjemanummer: Skjemanummer.DOK_UTDANNING_OG_ARBEID_MOR
      }]
    }
  }
}`,...(he=(ve=l.parameters)==null?void 0:ve.docs)==null?void 0:he.source}}};var ye,je,Ue;L.parameters={...L.parameters,docs:{...(ye=L.parameters)==null?void 0:ye.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    vedlegg: {
      ...(VisAlleVedlegg.args?.vedlegg ? Object.entries(VisAlleVedlegg.args.vedlegg).reduce((result, entry) => ({
        ...result,
        [entry[0]]: entry[1].map(value => ({
          ...value,
          innsendingsType: InnsendingsType.SEND_SENERE
        }))
      }), {}) : {})
    }
  }
}`,...(Ue=(je=L.parameters)==null?void 0:je.docs)==null?void 0:Ue.source}}};var be,Ge,Pe;K.parameters={...K.parameters,docs:{...(be=K.parameters)==null?void 0:be.docs,source:{originalSource:`{
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
}`,...(Pe=(Ge=K.parameters)==null?void 0:Ge.docs)==null?void 0:Pe.source}}};const Gn=["Default","MorMedAnnenForelderUgift","MorMedAleneOmsorg","FarMedAleneOmsorg","FarMedUførMorUgift","FarMedMorSomHarRettIEØS","FarMedMorSomHarOppholdsSegIEØSMenIkkeHarRettIEØS","FarMedMorSomHarRettINorge","MorMedAdoptertBarn","MorMedUtenlandsopphold","MorMedArbeidsforholdOgAndreInntekter","MorMedSelvstendigNæringsdrivende","MorMedSelvstendigNæringsdrivendeUtenDiverse","MorMedAndreInntekterJobbIUtlandet","MorMedAndreInntekterMilitærtjeneste","VisAlleVedlegg","VisSendInnSenereVedlegg","ErEndringssøknad"];export{n as Default,K as ErEndringssøknad,S as FarMedAleneOmsorg,N as FarMedMorSomHarOppholdsSegIEØSMenIkkeHarRettIEØS,k as FarMedMorSomHarRettIEØS,A as FarMedMorSomHarRettINorge,T as FarMedUførMorUgift,u as MorMedAdoptertBarn,I as MorMedAleneOmsorg,F as MorMedAndreInntekterJobbIUtlandet,c as MorMedAndreInntekterMilitærtjeneste,O as MorMedAnnenForelderUgift,R as MorMedArbeidsforholdOgAndreInntekter,M as MorMedSelvstendigNæringsdrivende,D as MorMedSelvstendigNæringsdrivendeUtenDiverse,_ as MorMedUtenlandsopphold,l as VisAlleVedlegg,L as VisSendInnSenereVedlegg,Gn as __namedExportsOrder,bn as default};
