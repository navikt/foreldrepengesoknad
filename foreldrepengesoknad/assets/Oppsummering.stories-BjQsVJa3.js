import{bm as I,J as S,aO as dn,_ as d,aN as ln,bx as mn,bz as k}from"./iframe-BByq6BTj.js";import{F as En,C as n}from"./FpDataContext-Wtv7LN6b.js";import{M as fn,S as gn}from"./useFpNavigator-CKmquOpM.js";import{h as B,H as V}from"./index-DIM5s0lD.js";import{A as J}from"./AnnenInntekt-D0302_mv.js";import{S as e,b as t,A as C,I as f}from"./uttaksplanInfoUtils-Cqgqlo4l.js";import{S as H}from"./sivilstandType-DxfjzFEG.js";import{O as Y}from"./Oppsummering-CwHDlHvx.js";import"./barnUtils-DB8hFuu0.js";import"./List-4Gcan90Y.js";import"./api-BT6Mdmuw.js";import"./stønadskontoerUtils-BBqDqOkg.js";import"./eksisterendeSakUtils-DgF6vV1S.js";import"./guid-CsArkN6i.js";var Z=(r=>(r.FISKER="FISKE",r.JORDBRUK="JORDBRUK_SKOGBRUK",r.DAGMAMMA="DAGMAMMA",r.ANNET="ANNEN",r))(Z||{});const{action:pn}=__STORYBOOK_MODULE_ACTIONS__,cn=()=>(...r)=>(pn("button-click")(...r),Promise.resolve()),l={søker:{fnr:"02520489226",fornavn:"MOR",etternavn:"MYGG",kjønn:"K",fødselsdato:"1978-04-19",barn:[{fnr:"21091981146",fødselsdato:"2021-03-15",annenForelder:{fnr:"08099017784",fødselsdato:"1985-03-12",fornavn:"LEALAUS",etternavn:"BÆREPOSE"},fornavn:"KLØKTIG",etternavn:"MIDTPUNKT",kjønn:"M"}],sivilstand:{type:H.GIFT}},arbeidsforhold:[]},o={søker:{fnr:"08099017784",fornavn:"FAR",etternavn:"MYGG",kjønn:"M",fødselsdato:"1978-04-19",barn:[{fnr:"19047815714",fødselsdato:"2021-03-15",annenForelder:{fnr:"12038517080",fødselsdato:"1985-03-12",fornavn:"LEALAUS",etternavn:"BÆREPOSE"},fornavn:"KLØKTIG",etternavn:"MIDTPUNKT",kjønn:"K"}],sivilstand:{type:H.UGIFT}},arbeidsforhold:[]},On={type:I.FØDT,fødselsdatoer:["2021-03-15"],antallBarn:1,datoForAleneomsorg:"2021-03-15",dokumentasjonAvAleneomsorg:[]},Ln={situasjon:"fødsel",rolle:"mor"},g={kanIkkeOppgis:!0},Sn={harBoddUtenforNorgeSiste12Mnd:!1,skalBoUtenforNorgeNeste12Mnd:!1},In=[{id:"0",type:"uttak",forelder:"MOR",konto:"FORELDREPENGER_FØR_FØDSEL",tidsperiode:{fom:new Date("2021-11-23T23:00:00.000Z"),tom:new Date("2021-12-13T23:00:00.000Z")}},{id:"1",type:"utsettelse",årsak:"INSTITUSJONSOPPHOLD_SØKER",tidsperiode:{fom:new Date("2021-12-14T23:00:00.000Z"),tom:new Date("2022-01-24T23:00:00.000Z")}},{id:"2",type:"periodeUtenUttak",tidsperiode:{fom:new Date("2022-01-25T23:00:00.000Z"),tom:new Date("2022-03-28T23:00:00.000Z")}},{id:"3",type:"uttak",forelder:"MOR",konto:"FELLESPERIODE",tidsperiode:{fom:new Date("2022-03-29T23:00:00.000Z"),tom:new Date("2022-06-06T23:00:00.000Z")},ønskerSamtidigUttak:!1,gradert:!1}],hn={harHattAndreInntektskilder:!1,harJobbetSomFrilans:!1,harJobbetSomSelvstendigNæringsdrivende:!1},p={[e.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM]:[],[e.DOK_DELTAKELSE_I_INTRODUKSJONSPROGRAMMET]:[],[e.DOK_INNLEGGELSE_BARN]:[],[e.DOK_INNLEGGELSE_MOR]:[],[e.DOK_INNLEGGELSE_FAR]:[],[e.DOK_SYKDOM_MOR]:[],[e.DOK_SYKDOM_FAR]:[],[e.DOK_ARBEID_MOR]:[],[e.DOK_UTDANNING_MOR]:[],[e.DOK_UTDANNING_OG_ARBEID_MOR]:[],[e.OMSORGSOVERTAKELSE]:[],[e.DOK_AV_ALENEOMSORG]:[],[e.TERMINBEKREFTELSE]:[],[e.DOK_MILITÆR_SILVIL_TJENESTE]:[],[e.ETTERLØNN_ELLER_SLUTTVEDERLAG]:[]},x={erAleneOmOmsorg:!1,fornavn:"Kari",etternavn:"Nordmann",fnr:"02520489226",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1,erInformertOmSøknaden:!0},w=[{arbeidsgiverId:"1",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Mors Arbeidsplass AS",stillingsprosent:80,fom:S().subtract(5,"year").format("YYYY-MM-DD")}],Yn={title:"steps/Oppsummering",component:Y,parameters:{msw:{handlers:[B.post(".//rest/storage/foreldrepenger",()=>new V(null,{status:200}))]}},render:({søkersituasjon:r=Ln,annenForelder:m=g,barn:O=On,utenlandsopphold:kn=Sn,utenlandsoppholdSenere:Tn,utenlandsoppholdTidligere:Nn,arbeidsforholdOgInntekt:un=hn,frilans:An,egenNæring:_n,andreInntekter:Dn,gåTilNesteSide:Rn,vedlegg:Mn=p,...Fn})=>{const Kn=new dn({defaultOptions:{queries:{retry:!1}}});return d.jsx(ln,{client:Kn,children:d.jsx(fn,{initialEntries:[gn.OPPSUMMERING],children:d.jsx(En,{onDispatch:Rn,initialState:{[n.ARBEIDSFORHOLD_OG_INNTEKT]:un,[n.FRILANS]:An,[n.EGEN_NÆRING]:_n,[n.ANDRE_INNTEKTSKILDER]:Dn,[n.ANNEN_FORELDER]:m,[n.SØKERSITUASJON]:r,[n.UTTAKSPLAN_METADATA]:{ønskerJustertUttakVedFødsel:!1,harUttaksplanBlittSlettet:!1,antallUkerIUttaksplan:1},[n.OM_BARNET]:O,[n.UTENLANDSOPPHOLD]:kn,[n.UTENLANDSOPPHOLD_SENERE]:Tn,[n.UTENLANDSOPPHOLD_TIDLIGERE]:Nn,[n.PERIODE_MED_FORELDREPENGER]:mn.HUNDRE_PROSENT,[n.UTTAKSPLAN]:In,[n.VEDLEGG]:Mn},children:d.jsx(Y,{...Fn})})})})}},a={args:{erEndringssøknad:!1,sendSøknad:()=>Promise.resolve(),søkerInfo:l,avbrytSøknad:pn("button-click"),mellomlagreSøknadOgNaviger:cn()}},T={args:{...a.args,annenForelder:{erAleneOmOmsorg:!1,fornavn:"Espen",etternavn:"Utvikler",fnr:"08099017784",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1},barn:{type:I.UFØDT,antallBarn:1,termindato:"2025-10-01"},søkerInfo:{...l,søker:{...l.søker,sivilstand:{type:H.UGIFT}}}}},N={args:{...a.args,søkersituasjon:{situasjon:"fødsel",rolle:"mor"},annenForelder:{erAleneOmOmsorg:!0,fornavn:"Ingen",etternavn:"Omsorg",fnr:"08099017784",kanIkkeOppgis:!1}}},u={args:{...a.args,søkersituasjon:{situasjon:"fødsel",rolle:"far"},søkerInfo:{...o},annenForelder:{erAleneOmOmsorg:!0,fornavn:"Ingen",etternavn:"Omsorg",fnr:"02520489226",kanIkkeOppgis:!1},barn:{type:I.UFØDT,antallBarn:2,termindato:"2025-10-01"}}},A={args:{...a.args,søkersituasjon:{situasjon:"fødsel",rolle:"far"},annenForelder:{erAleneOmOmsorg:!1,fornavn:"Eline",etternavn:"Utvikler",fnr:"02520489226",harRettPåForeldrepengerINorge:!1,harRettPåForeldrepengerIEØS:!1,kanIkkeOppgis:!1,erMorUfør:!0},søkerInfo:{...o,søker:{...o.søker,sivilstand:{type:H.UGIFT}}},barn:{type:I.UFØDT,antallBarn:1,termindato:"2025-10-01"}}},_={args:{...a.args,søkersituasjon:{situasjon:"fødsel",rolle:"far"},annenForelder:{erAleneOmOmsorg:!1,fornavn:"Anne",etternavn:"Forelder",fnr:"02520489226",harOppholdtSegIEØS:!0,harRettPåForeldrepengerINorge:!1,harRettPåForeldrepengerIEØS:!0,kanIkkeOppgis:!1},søkerInfo:{...o}}},D={args:{...a.args,søkersituasjon:{situasjon:"fødsel",rolle:"far"},annenForelder:{erAleneOmOmsorg:!1,fornavn:"Anne",etternavn:"Forelder",fnr:"02520489226",harOppholdtSegIEØS:!0,harRettPåForeldrepengerINorge:!1,harRettPåForeldrepengerIEØS:!1,kanIkkeOppgis:!1},søkerInfo:{...o}}},R={args:{...a.args,søkersituasjon:{situasjon:"fødsel",rolle:"far"},annenForelder:{erAleneOmOmsorg:!1,fornavn:"Frida",etternavn:"Norsk",fnr:"02520489226",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1},søkerInfo:{...o}}},M={args:{...a.args,søkersituasjon:{rolle:"mor",situasjon:"adopsjon"},barn:{type:I.ADOPTERT_STEBARN,antallBarn:1,adopsjonsdato:"2021-10-01",fødselsdatoer:["2021-01-01"],adoptertIUtlandet:!1,omsorgsovertakelse:[]}}},F={args:{...a.args,utenlandsopphold:{skalBoUtenforNorgeNeste12Mnd:!0,harBoddUtenforNorgeSiste12Mnd:!0},utenlandsoppholdSenere:[{landkode:"SE",fom:S().format(k),tom:S().add(100,"days").format(k)}],utenlandsoppholdTidligere:[{landkode:"SE",fom:S().subtract(10,"months").format(k),tom:S().subtract(1,"days").format(k)}]}},K={args:{...a.args,arbeidsforholdOgInntekt:{harJobbetSomFrilans:!0,harHattAndreInntektskilder:!1,harJobbetSomSelvstendigNæringsdrivende:!1},frilans:{jobberFremdelesSomFrilans:!0,oppstart:"2019-01-01"},annenForelder:{...g,erAleneOmOmsorg:!1},søkerInfo:{søker:l.søker,arbeidsforhold:[{arbeidsgiverId:"1",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Auto Joachim Bilpleie",stillingsprosent:80,fom:"2015-01-01"},{arbeidsgiverId:"2",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Taco Express",stillingsprosent:20,fom:"2019-01-01",tom:"2021-01-01"}]}}},c={args:{...a.args,arbeidsforholdOgInntekt:{harJobbetSomFrilans:!1,harHattAndreInntektskilder:!1,harJobbetSomSelvstendigNæringsdrivende:!0},egenNæring:{navnPåNæringen:"Fiske",pågående:!1,fom:"2018-01-01",tom:"2021-01-01",næringstype:Z.FISKER,organisasjonsnummer:"123",næringsinntekt:1e6,registrertINorge:!0,harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene:!0,hattVarigEndringAvNæringsinntektSiste4Kalenderår:!0},annenForelder:{...g,erAleneOmOmsorg:!1},søkerInfo:l}},L={args:{...a.args,arbeidsforholdOgInntekt:{harJobbetSomFrilans:!1,harHattAndreInntektskilder:!1,harJobbetSomSelvstendigNæringsdrivende:!0},egenNæring:{navnPåNæringen:"Fiske",pågående:!1,fom:"2018-01-01",tom:"2021-01-01",næringstype:Z.FISKER,registrertILand:"SE",registrertINorge:!1,harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene:!1,hattVarigEndringAvNæringsinntektSiste4Kalenderår:!1},annenForelder:{...g,erAleneOmOmsorg:!1},søkerInfo:l}},h={args:{...a.args,arbeidsforholdOgInntekt:{harJobbetSomFrilans:!1,harHattAndreInntektskilder:!0,harJobbetSomSelvstendigNæringsdrivende:!1},andreInntekter:[{type:J.JOBB_I_UTLANDET,pågående:!1,fom:"2018-01-01",tom:"2021-01-01",arbeidsgiverNavn:"Statoil",land:"SE"},{type:J.MILITÆRTJENESTE,pågående:!0,fom:"2022-01-01"},{type:J.SLUTTPAKKE,fom:"2022-01-01",tom:"2023-01-01"}],annenForelder:{...g,erAleneOmOmsorg:!1},søkerInfo:l}},b={args:{...a.args,arbeidsforholdOgInntekt:{harJobbetSomFrilans:!1,harHattAndreInntektskilder:!0,harJobbetSomSelvstendigNæringsdrivende:!1},andreInntekter:[{type:J.MILITÆRTJENESTE,pågående:!1,fom:"2018-01-01",tom:"2021-01-01"}],annenForelder:{...g,erAleneOmOmsorg:!1},søkerInfo:l}},i={filesize:1234,url:"test",id:"1",file:new File(["abc".repeat(1e5)],"Filnavn1.jpg"),pending:!1,uploaded:!0},s={...i,dokumenterer:{type:C.UTTAK,perioder:[{fom:"2024-01-01",tom:"2024-10-01"}]}},E={args:{...a.args,vedlegg:{...p,[e.ETTERLØNN_ELLER_SLUTTVEDERLAG]:[{...i,filename:"etterlønn.pdf",type:t.ANNEN_INNTEKT,skjemanummer:e.ETTERLØNN_ELLER_SLUTTVEDERLAG,dokumenterer:{type:C.OPPTJENING,perioder:[{fom:"2024-01-01",tom:"2024-10-01"}]}},{...i,filename:"etterlønn2.pdf",type:t.ANNEN_INNTEKT,skjemanummer:e.ETTERLØNN_ELLER_SLUTTVEDERLAG}],[e.DOK_MILITÆR_SILVIL_TJENESTE]:[{...i,filename:"siviltjeneste.pdf",type:t.ANNEN_INNTEKT,skjemanummer:e.DOK_MILITÆR_SILVIL_TJENESTE,dokumenterer:{type:C.OPPTJENING,perioder:[{fom:"2024-01-01",tom:"2024-10-01"}]}}],[e.OMSORGSOVERTAKELSE]:[{...i,filename:"omsorgsovertakelse.pdf",type:t.OMSORGSOVERTAKELSE,skjemanummer:e.OMSORGSOVERTAKELSE}],[e.DOK_AV_ALENEOMSORG]:[{...i,filename:"aleneomsorg.pdf",type:t.ALENEOMSORG,skjemanummer:e.DOK_AV_ALENEOMSORG}],[e.TERMINBEKREFTELSE]:[{...i,filename:"terminbekreftelse.pdf",type:t.TERMINBEKREFTELSE,skjemanummer:e.TERMINBEKREFTELSE}],[e.DOK_DELTAKELSE_I_INTRODUKSJONSPROGRAMMET]:[{...s,filename:"dok-deltakelse.pdf",type:t.MORS_AKTIVITET_DOKUMENTASJON,skjemanummer:e.DOK_DELTAKELSE_I_INTRODUKSJONSPROGRAMMET}],[e.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM]:[{...s,filename:"kvalifiseringsprogram.pdf",type:t.MORS_AKTIVITET_DOKUMENTASJON,skjemanummer:e.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM}],[e.DOK_INNLEGGELSE_MOR]:[{...s,filename:"innleggelse-mor.pdf",type:t.MORS_AKTIVITET_DOKUMENTASJON,skjemanummer:e.DOK_INNLEGGELSE_MOR}],[e.DOK_INNLEGGELSE_BARN]:[{...s,filename:"innleggelse-barn.pdf",type:t.MORS_AKTIVITET_DOKUMENTASJON,skjemanummer:e.DOK_INNLEGGELSE_BARN}],[e.DOK_INNLEGGELSE_FAR]:[{...s,filename:"innleggelse-far.pdf",type:t.MORS_AKTIVITET_DOKUMENTASJON,skjemanummer:e.DOK_INNLEGGELSE_FAR}],[e.DOK_SYKDOM_MOR]:[{...s,filename:"sykdom-mor.pdf",type:t.MORS_AKTIVITET_DOKUMENTASJON,skjemanummer:e.DOK_SYKDOM_MOR}],[e.DOK_ARBEID_MOR]:[{...s,filename:"dok-arbeid-mor.pdf",type:t.MORS_AKTIVITET_DOKUMENTASJON,skjemanummer:e.DOK_ARBEID_MOR}],[e.DOK_UTDANNING_MOR]:[{...s,filename:"dok-utdanning-mor.pdf",type:t.MORS_AKTIVITET_DOKUMENTASJON,skjemanummer:e.DOK_UTDANNING_MOR}],[e.DOK_UTDANNING_OG_ARBEID_MOR]:[{...s,filename:"dok-utdanning-og-arbeid-mor.pdf",type:t.MORS_AKTIVITET_DOKUMENTASJON,skjemanummer:e.DOK_UTDANNING_OG_ARBEID_MOR}]}}};var Q;const v={args:{...a.args,vedlegg:{...(Q=E.args)!=null&&Q.vedlegg?Object.entries(E.args.vedlegg).reduce((r,m)=>({...r,[m[0]]:m[1].map(O=>({...O,innsendingsType:f.SEND_SENERE}))}),{}):{}}}},y={args:{...a.args,søkersituasjon:{situasjon:"fødsel",rolle:"far"},søkerInfo:{...o,arbeidsforhold:w},annenForelder:x,vedlegg:{...p,[e.DOK_ARBEID_MOR]:[{...s,filename:"dok-arbeid-mor.pdf",type:t.MORS_AKTIVITET_DOKUMENTASJON,skjemanummer:e.DOK_ARBEID_MOR,innsendingsType:f.AUTOMATISK}]},arbeidsforholdOgInntekt:{harJobbetSomFrilans:!1,harHattAndreInntektskilder:!1,harJobbetSomSelvstendigNæringsdrivende:!1}},parameters:{msw:{handlers:[B.post(".//rest/innsyn/v2/trengerDokumentereMorsArbeid",()=>new V(JSON.stringify(!1),{status:200}))]}}},U={args:{...a.args,søkersituasjon:{situasjon:"fødsel",rolle:"far"},søkerInfo:{...o,arbeidsforhold:w},annenForelder:x,vedlegg:{...p,[e.DOK_ARBEID_MOR]:[{...s,filename:"dok-arbeid-mor.pdf",type:t.MORS_AKTIVITET_DOKUMENTASJON,skjemanummer:e.DOK_ARBEID_MOR,innsendingsType:f.AUTOMATISK}],[e.DOK_UTDANNING_MOR]:[{...s,filename:"dok-utdanning-mor.pdf",type:t.MORS_AKTIVITET_DOKUMENTASJON,skjemanummer:e.DOK_UTDANNING_MOR,innsendingsType:f.SEND_SENERE}]},arbeidsforholdOgInntekt:{harJobbetSomFrilans:!1,harHattAndreInntektskilder:!1,harJobbetSomSelvstendigNæringsdrivende:!1}},parameters:{msw:{handlers:[B.post(".//rest/innsyn/v2/trengerDokumentereMorsArbeid",()=>new V(JSON.stringify(!1),{status:200}))]}}},j={args:{...a.args,søkersituasjon:{situasjon:"fødsel",rolle:"far"},søkerInfo:{...o,arbeidsforhold:[{...w[0],stillingsprosent:70}]},annenForelder:x,vedlegg:{...p,[e.DOK_ARBEID_MOR]:[{...s,filename:"dok-arbeid-mor.pdf",type:t.MORS_AKTIVITET_DOKUMENTASJON,skjemanummer:e.DOK_ARBEID_MOR,innsendingsType:f.SEND_SENERE}]},arbeidsforholdOgInntekt:{harJobbetSomFrilans:!1,harHattAndreInntektskilder:!1,harJobbetSomSelvstendigNæringsdrivende:!1}},parameters:{msw:{handlers:[B.post(".//rest/innsyn/v2/trengerDokumentereMorsArbeid",()=>new V(JSON.stringify(!0),{status:200}))]}}},G={args:{...a.args,søkersituasjon:{situasjon:"fødsel",rolle:"far"},søkerInfo:{...o,arbeidsforhold:w},annenForelder:x,vedlegg:{...p,[e.DOK_ARBEID_MOR]:[{...s,filename:"dok-arbeid-mor.pdf",type:t.MORS_AKTIVITET_DOKUMENTASJON,skjemanummer:e.DOK_ARBEID_MOR,innsendingsType:f.SEND_SENERE}]},arbeidsforholdOgInntekt:{harJobbetSomFrilans:!1,harHattAndreInntektskilder:!1,harJobbetSomSelvstendigNæringsdrivende:!1}},render:r=>{const m=new dn({defaultOptions:{queries:{retry:!1,staleTime:0}}}),O=[...In.slice(0,3),{id:"3",type:"uttak",forelder:"MOR",konto:"FELLESPERIODE",tidsperiode:{fom:new Date("2022-03-29T23:00:00.000Z"),tom:new Date("2022-06-06T23:00:00.000Z")},ønskerSamtidigUttak:!0,gradert:!1}];return d.jsx(ln,{client:m,children:d.jsx(fn,{initialEntries:[gn.OPPSUMMERING],children:d.jsx(En,{onDispatch:r.gåTilNesteSide,initialState:{[n.ARBEIDSFORHOLD_OG_INNTEKT]:r.arbeidsforholdOgInntekt,[n.FRILANS]:r.frilans,[n.EGEN_NÆRING]:r.egenNæring,[n.ANDRE_INNTEKTSKILDER]:r.andreInntekter,[n.ANNEN_FORELDER]:r.annenForelder,[n.SØKERSITUASJON]:r.søkersituasjon,[n.UTTAKSPLAN_METADATA]:{ønskerJustertUttakVedFødsel:!1,harUttaksplanBlittSlettet:!1,antallUkerIUttaksplan:1},[n.OM_BARNET]:r.barn||On,[n.UTENLANDSOPPHOLD]:r.utenlandsopphold||Sn,[n.UTENLANDSOPPHOLD_SENERE]:r.utenlandsoppholdSenere,[n.UTENLANDSOPPHOLD_TIDLIGERE]:r.utenlandsoppholdTidligere,[n.PERIODE_MED_FORELDREPENGER]:mn.HUNDRE_PROSENT,[n.UTTAKSPLAN]:O,[n.VEDLEGG]:r.vedlegg},children:d.jsx(Y,{...r})})})})}},P={args:{...a.args,erEndringssøknad:!0,annenForelder:{fornavn:"Espen",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1,erAleneOmOmsorg:!1}}};var $,q,z;a.parameters={...a.parameters,docs:{...($=a.parameters)==null?void 0:$.docs,source:{originalSource:`{
  args: {
    erEndringssøknad: false,
    sendSøknad: () => Promise.resolve(),
    søkerInfo: defaultSøkerinfoMor,
    avbrytSøknad: action('button-click'),
    mellomlagreSøknadOgNaviger: promiseAction()
  }
}`,...(z=(q=a.parameters)==null?void 0:q.docs)==null?void 0:z.source}}};var W,X,ee;T.parameters={...T.parameters,docs:{...(W=T.parameters)==null?void 0:W.docs,source:{originalSource:`{
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
}`,...(ee=(X=T.parameters)==null?void 0:X.docs)==null?void 0:ee.source}}};var ne,re,ae;N.parameters={...N.parameters,docs:{...(ne=N.parameters)==null?void 0:ne.docs,source:{originalSource:`{
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
}`,...(ae=(re=N.parameters)==null?void 0:re.docs)==null?void 0:ae.source}}};var te,se,oe;u.parameters={...u.parameters,docs:{...(te=u.parameters)==null?void 0:te.docs,source:{originalSource:`{
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
}`,...(oe=(se=u.parameters)==null?void 0:se.docs)==null?void 0:oe.source}}};var de,le,ie;A.parameters={...A.parameters,docs:{...(de=A.parameters)==null?void 0:de.docs,source:{originalSource:`{
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
}`,...(ie=(le=A.parameters)==null?void 0:le.docs)==null?void 0:ie.source}}};var me,Ee,fe;_.parameters={..._.parameters,docs:{...(me=_.parameters)==null?void 0:me.docs,source:{originalSource:`{
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
}`,...(fe=(Ee=_.parameters)==null?void 0:Ee.docs)==null?void 0:fe.source}}};var ge,pe,Oe;D.parameters={...D.parameters,docs:{...(ge=D.parameters)==null?void 0:ge.docs,source:{originalSource:`{
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
}`,...(Oe=(pe=D.parameters)==null?void 0:pe.docs)==null?void 0:Oe.source}}};var Se,Ie,ke;R.parameters={...R.parameters,docs:{...(Se=R.parameters)==null?void 0:Se.docs,source:{originalSource:`{
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
}`,...(ke=(Ie=R.parameters)==null?void 0:Ie.docs)==null?void 0:ke.source}}};var Te,Ne,ue;M.parameters={...M.parameters,docs:{...(Te=M.parameters)==null?void 0:Te.docs,source:{originalSource:`{
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
}`,...(ue=(Ne=M.parameters)==null?void 0:Ne.docs)==null?void 0:ue.source}}};var Ae,_e,De;F.parameters={...F.parameters,docs:{...(Ae=F.parameters)==null?void 0:Ae.docs,source:{originalSource:`{
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
}`,...(De=(_e=F.parameters)==null?void 0:_e.docs)==null?void 0:De.source}}};var Re,Me,Fe;K.parameters={...K.parameters,docs:{...(Re=K.parameters)==null?void 0:Re.docs,source:{originalSource:`{
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
}`,...(Fe=(Me=K.parameters)==null?void 0:Me.docs)==null?void 0:Fe.source}}};var Ke,ce,Le;c.parameters={...c.parameters,docs:{...(Ke=c.parameters)==null?void 0:Ke.docs,source:{originalSource:`{
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
}`,...(Le=(ce=c.parameters)==null?void 0:ce.docs)==null?void 0:Le.source}}};var he,be,ve;L.parameters={...L.parameters,docs:{...(he=L.parameters)==null?void 0:he.docs,source:{originalSource:`{
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
}`,...(ve=(be=L.parameters)==null?void 0:be.docs)==null?void 0:ve.source}}};var ye,Ue,je;h.parameters={...h.parameters,docs:{...(ye=h.parameters)==null?void 0:ye.docs,source:{originalSource:`{
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
}`,...(je=(Ue=h.parameters)==null?void 0:Ue.docs)==null?void 0:je.source}}};var Ge,Pe,Je;b.parameters={...b.parameters,docs:{...(Ge=b.parameters)==null?void 0:Ge.docs,source:{originalSource:`{
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
}`,...(Je=(Pe=b.parameters)==null?void 0:Pe.docs)==null?void 0:Je.source}}};var Be,Ve,He;E.parameters={...E.parameters,docs:{...(Be=E.parameters)==null?void 0:Be.docs,source:{originalSource:`{
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
}`,...(He=(Ve=E.parameters)==null?void 0:Ve.docs)==null?void 0:He.source}}};var xe,we,Ce;v.parameters={...v.parameters,docs:{...(xe=v.parameters)==null?void 0:xe.docs,source:{originalSource:`{
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
}`,...(Ce=(we=v.parameters)==null?void 0:we.docs)==null?void 0:Ce.source}}};var Ye,Ze,Qe;y.parameters={...y.parameters,docs:{...(Ye=y.parameters)==null?void 0:Ye.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    søkersituasjon: {
      situasjon: 'fødsel',
      rolle: 'far'
    },
    søkerInfo: {
      ...defaultSøkerinfoFar,
      arbeidsforhold: arbeidsforholdMorJobber80Prosent
    },
    annenForelder: annenForelderKariNordmann,
    vedlegg: {
      ...defaultVedlegg,
      [Skjemanummer.DOK_ARBEID_MOR]: [{
        ...FIL_INFO_UTTAK_MED_PERIODE,
        filename: 'dok-arbeid-mor.pdf',
        type: AttachmentType.MORS_AKTIVITET_DOKUMENTASJON,
        skjemanummer: Skjemanummer.DOK_ARBEID_MOR,
        innsendingsType: InnsendingsType.AUTOMATISK
      }]
    },
    arbeidsforholdOgInntekt: {
      harJobbetSomFrilans: false,
      harHattAndreInntektskilder: false,
      harJobbetSomSelvstendigNæringsdrivende: false
    }
  },
  parameters: {
    msw: {
      handlers: [http.post(\`\${import.meta.env.BASE_URL}/rest/innsyn/v2/trengerDokumentereMorsArbeid\`, () => new HttpResponse(JSON.stringify(false), {
        status: 200
      }))]
    }
  }
}`,...(Qe=(Ze=y.parameters)==null?void 0:Ze.docs)==null?void 0:Qe.source}}};var $e,qe,ze;U.parameters={...U.parameters,docs:{...($e=U.parameters)==null?void 0:$e.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    søkersituasjon: {
      situasjon: 'fødsel',
      rolle: 'far'
    },
    søkerInfo: {
      ...defaultSøkerinfoFar,
      arbeidsforhold: arbeidsforholdMorJobber80Prosent
    },
    annenForelder: annenForelderKariNordmann,
    vedlegg: {
      ...defaultVedlegg,
      [Skjemanummer.DOK_ARBEID_MOR]: [{
        ...FIL_INFO_UTTAK_MED_PERIODE,
        filename: 'dok-arbeid-mor.pdf',
        type: AttachmentType.MORS_AKTIVITET_DOKUMENTASJON,
        skjemanummer: Skjemanummer.DOK_ARBEID_MOR,
        innsendingsType: InnsendingsType.AUTOMATISK
      }],
      [Skjemanummer.DOK_UTDANNING_MOR]: [{
        ...FIL_INFO_UTTAK_MED_PERIODE,
        filename: 'dok-utdanning-mor.pdf',
        type: AttachmentType.MORS_AKTIVITET_DOKUMENTASJON,
        skjemanummer: Skjemanummer.DOK_UTDANNING_MOR,
        innsendingsType: InnsendingsType.SEND_SENERE
      }]
    },
    arbeidsforholdOgInntekt: {
      harJobbetSomFrilans: false,
      harHattAndreInntektskilder: false,
      harJobbetSomSelvstendigNæringsdrivende: false
    }
  },
  parameters: {
    msw: {
      handlers: [http.post(\`\${import.meta.env.BASE_URL}/rest/innsyn/v2/trengerDokumentereMorsArbeid\`, () => new HttpResponse(JSON.stringify(false), {
        status: 200
      }))]
    }
  }
}`,...(ze=(qe=U.parameters)==null?void 0:qe.docs)==null?void 0:ze.source}}};var We,Xe,en;j.parameters={...j.parameters,docs:{...(We=j.parameters)==null?void 0:We.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    søkersituasjon: {
      situasjon: 'fødsel',
      rolle: 'far'
    },
    søkerInfo: {
      ...defaultSøkerinfoFar,
      arbeidsforhold: [{
        ...arbeidsforholdMorJobber80Prosent[0],
        stillingsprosent: 70
      }]
    },
    annenForelder: annenForelderKariNordmann,
    vedlegg: {
      ...defaultVedlegg,
      [Skjemanummer.DOK_ARBEID_MOR]: [{
        ...FIL_INFO_UTTAK_MED_PERIODE,
        filename: 'dok-arbeid-mor.pdf',
        type: AttachmentType.MORS_AKTIVITET_DOKUMENTASJON,
        skjemanummer: Skjemanummer.DOK_ARBEID_MOR,
        innsendingsType: InnsendingsType.SEND_SENERE
      }]
    },
    arbeidsforholdOgInntekt: {
      harJobbetSomFrilans: false,
      harHattAndreInntektskilder: false,
      harJobbetSomSelvstendigNæringsdrivende: false
    }
  },
  parameters: {
    msw: {
      handlers: [http.post(\`\${import.meta.env.BASE_URL}/rest/innsyn/v2/trengerDokumentereMorsArbeid\`, () => new HttpResponse(JSON.stringify(true), {
        status: 200
      }))]
    }
  }
}`,...(en=(Xe=j.parameters)==null?void 0:Xe.docs)==null?void 0:en.source}}};var nn,rn,an;G.parameters={...G.parameters,docs:{...(nn=G.parameters)==null?void 0:nn.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    søkersituasjon: {
      situasjon: 'fødsel',
      rolle: 'far'
    },
    søkerInfo: {
      ...defaultSøkerinfoFar,
      arbeidsforhold: arbeidsforholdMorJobber80Prosent
    },
    annenForelder: annenForelderKariNordmann,
    vedlegg: {
      ...defaultVedlegg,
      [Skjemanummer.DOK_ARBEID_MOR]: [{
        ...FIL_INFO_UTTAK_MED_PERIODE,
        filename: 'dok-arbeid-mor.pdf',
        type: AttachmentType.MORS_AKTIVITET_DOKUMENTASJON,
        skjemanummer: Skjemanummer.DOK_ARBEID_MOR,
        innsendingsType: InnsendingsType.SEND_SENERE
      }]
    },
    arbeidsforholdOgInntekt: {
      harJobbetSomFrilans: false,
      harHattAndreInntektskilder: false,
      harJobbetSomSelvstendigNæringsdrivende: false
    }
  },
  // Ny render-funksjon som overskriver uttaksplanen med samtidig uttak
  render: args => {
    const freshQueryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
          staleTime: 0
        }
      }
    });

    // Ny uttaksplan med samtidig uttak
    const uttaksplanMedSamtidigUttak = [...defaultUttaksplan.slice(0, 3),
    // Behold de første periodene
    {
      id: '3',
      type: 'uttak',
      forelder: 'MOR',
      konto: 'FELLESPERIODE',
      tidsperiode: {
        fom: new Date('2022-03-29T23:00:00.000Z'),
        tom: new Date('2022-06-06T23:00:00.000Z')
      },
      ønskerSamtidigUttak: true,
      gradert: false
    } as Periode];
    return <QueryClientProvider client={freshQueryClient}>
                <MemoryRouter initialEntries={[SøknadRoutes.OPPSUMMERING]}>
                    <FpDataContext onDispatch={args.gåTilNesteSide} initialState={{
          [ContextDataType.ARBEIDSFORHOLD_OG_INNTEKT]: args.arbeidsforholdOgInntekt,
          [ContextDataType.FRILANS]: args.frilans,
          [ContextDataType.EGEN_NÆRING]: args.egenNæring,
          [ContextDataType.ANDRE_INNTEKTSKILDER]: args.andreInntekter,
          [ContextDataType.ANNEN_FORELDER]: args.annenForelder,
          [ContextDataType.SØKERSITUASJON]: args.søkersituasjon,
          [ContextDataType.UTTAKSPLAN_METADATA]: {
            ønskerJustertUttakVedFødsel: false,
            harUttaksplanBlittSlettet: false,
            antallUkerIUttaksplan: 1
          },
          [ContextDataType.OM_BARNET]: args.barn || defaultBarn,
          [ContextDataType.UTENLANDSOPPHOLD]: args.utenlandsopphold || defaultUtenlandsopphold,
          [ContextDataType.UTENLANDSOPPHOLD_SENERE]: args.utenlandsoppholdSenere,
          [ContextDataType.UTENLANDSOPPHOLD_TIDLIGERE]: args.utenlandsoppholdTidligere,
          [ContextDataType.PERIODE_MED_FORELDREPENGER]: Dekningsgrad.HUNDRE_PROSENT,
          [ContextDataType.UTTAKSPLAN]: uttaksplanMedSamtidigUttak,
          // Bruk den nye uttaksplanen
          [ContextDataType.VEDLEGG]: args.vedlegg
        }}>
                        <Oppsummering {...args} />
                    </FpDataContext>
                </MemoryRouter>
            </QueryClientProvider>;
  }
}`,...(an=(rn=G.parameters)==null?void 0:rn.docs)==null?void 0:an.source}}};var tn,sn,on;P.parameters={...P.parameters,docs:{...(tn=P.parameters)==null?void 0:tn.docs,source:{originalSource:`{
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
}`,...(on=(sn=P.parameters)==null?void 0:sn.docs)==null?void 0:on.source}}};const Zn=["Default","MorMedAnnenForelderUgift","MorMedAleneOmsorg","FarMedAleneOmsorg","FarMedUførMorUgift","FarMedMorSomHarRettIEØS","FarMedMorSomHarOppholdsSegIEØSMenIkkeHarRettIEØS","FarMedMorSomHarRettINorge","MorMedAdoptertBarn","MorMedUtenlandsopphold","MorMedArbeidsforholdOgAndreInntekter","MorMedSelvstendigNæringsdrivende","MorMedSelvstendigNæringsdrivendeUtenDiverse","MorMedAndreInntekterJobbIUtlandet","MorMedAndreInntekterMilitærtjeneste","VisAlleVedlegg","VisSendInnSenereVedlegg","FarSøkerMorMåIkkeDokumentereArbeid","FarSøkerMorMåIkkeDokumentereArbeidMåDokumenterUtdanning","FarSøkerMorMåDokumentereArbeid","FarErSøkerMorSøkerSamtidigUttakIFellesperiodeKreverDokumentasjon","ErEndringssøknad"];export{a as Default,P as ErEndringssøknad,G as FarErSøkerMorSøkerSamtidigUttakIFellesperiodeKreverDokumentasjon,u as FarMedAleneOmsorg,D as FarMedMorSomHarOppholdsSegIEØSMenIkkeHarRettIEØS,_ as FarMedMorSomHarRettIEØS,R as FarMedMorSomHarRettINorge,A as FarMedUførMorUgift,j as FarSøkerMorMåDokumentereArbeid,y as FarSøkerMorMåIkkeDokumentereArbeid,U as FarSøkerMorMåIkkeDokumentereArbeidMåDokumenterUtdanning,M as MorMedAdoptertBarn,N as MorMedAleneOmsorg,h as MorMedAndreInntekterJobbIUtlandet,b as MorMedAndreInntekterMilitærtjeneste,T as MorMedAnnenForelderUgift,K as MorMedArbeidsforholdOgAndreInntekter,c as MorMedSelvstendigNæringsdrivende,L as MorMedSelvstendigNæringsdrivendeUtenDiverse,F as MorMedUtenlandsopphold,E as VisAlleVedlegg,v as VisSendInnSenereVedlegg,Zn as __namedExportsOrder,Yn as default};
