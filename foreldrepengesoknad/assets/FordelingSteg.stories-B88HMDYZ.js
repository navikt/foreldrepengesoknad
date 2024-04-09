import{j as a}from"./jsx-runtime-DoxjgJx5.js";import{a as Re}from"./chunk-MZXVCX43-DWuJqIWT.js";import{A as je}from"./AxiosMock-CeLgoW4g.js";import"./Tidsperioden-uYz_lIz2.js";import"./index-C-6Uy6j4.js";import"./index-Cu9bd8lq.js";import{B as n,D as e,M as Ue}from"./index-KchjYVEa.js";import"./_baseToString-yTMKM5a7.js";import"./_createSet-BNfKGSGn.js";import{i as Be}from"./Step-C4VAanZM.js";import{E as Le}from"./Environment-O62Hvuhd.js";import{F as Ae}from"./uttaksplanInfoUtils-DEYvjVRD.js";import{F as _e,C as s}from"./FpDataContext-DRW84C1R.js";import{S as He}from"./useFpNavigator-KPzYseKG.js";import{F as pe}from"./FordelingSteg-mTUBZ8_I.js";import"./v4-D8aEg3BZ.js";import"./index-B_cCgG6K.js";import"./apiInterceptor-D_vgNGab.js";import"./axios-Cm0UX6qg.js";import"./index-SDyqs4cU.js";import"./Link-BqZ6CohM.js";import"./index-Ckls47V4.js";import"./dateFormValidation-Dx0vmcZR.js";import"./links-dJHPeQm3.js";import"./message-DfLv_Bcn.js";import"./amplitude.esm-CWYNo8IU.js";import"./useRequest-Bq8ZCFOD.js";import"./barnUtils-DBQFgAwJ.js";import"./eksisterendeSakUtils-DFU1MVnR.js";import"./velkommenUtils-DMshz9-3.js";import"./dateUtils-BU-Sa8jz.js";import"./lodash-o8vTUAkc.js";import"./Accordion-ebYyXW3f.js";import"./annenForelderUtils-DOBm4Hfn.js";import"./ErrorSummaryHookForm-C3CyVljj.js";import"./BabyWrapped-DDYzGnvB.js";const ye="/innsyn/v2/annenPartVedtak",H=`${Le.REST_API_URL}/konto`,Ke={dekningsgrad:"HUNDRE",perioder:[{fom:"2024-02-07",tom:"2024-02-19",kontoType:"MØDREKVOTE",overføringÅrsak:"INSTITUSJONSOPPHOLD_ANNEN_FORELDER",resultat:{innvilget:!0,trekkerMinsterett:!1,trekkerDager:!0,årsak:"ANNET"}},{fom:"2024-06-11",tom:"2024-06-30",kontoType:"FELLESPERIODE",resultat:{innvilget:!0,trekkerMinsterett:!1,trekkerDager:!0,årsak:"ANNET"}}]},be={dekningsgrad:"HUNDRE",perioder:[{fom:"2024-07-07",tom:"2024-07-24",kontoType:"FEDREKVOTE",overføringÅrsak:"INSTITUSJONSOPPHOLD_ANNEN_FORELDER",resultat:{innvilget:!0,trekkerMinsterett:!1,trekkerDager:!0,årsak:"ANNET"}},{fom:"2024-08-11",tom:"2024-08-12",kontoType:"FELLESPERIODE",resultat:{innvilget:!0,trekkerMinsterett:!1,trekkerDager:!0,årsak:"ANNET"}}]},t={fnr:"19047815714",fornavn:"Hanne",etternavn:"Mygg",kjønn:"K",fødselsdato:"1978-04-19"},r={fnr:"19047815715",fornavn:"Hans",etternavn:"Mygg",kjønn:"M",fødselsdato:"1972-06-07"},Ge=()=>(...A)=>(Re("button-click")(...A),Promise.resolve()),Ve=({mellomlagreSøknadOgNaviger:A=Ge(),avbrytSøknad:me=Re("button-click"),gåTilNesteSide:fe,søker:De,søkersituasjon:ue,annenForelder:Oe,barnet:Te,stønadskonto100:xe,stønadskonto80:Ne,annenPartVedtak:ve,dekningsgrad:ce,arbeidsforhold:Pe=[]})=>{Be();const Se=xe||{kontoer:{},minsteretter:{}},Ie=Ne||{kontoer:{},minsteretter:{}},Me=_=>{_.onPost(ye).replyOnce(200,ve),_.onGet(H).replyOnce(200,Ie),_.onGet(H).replyOnce(200,Se)};return a.jsx(Ue,{initialEntries:[He.FORDELING],children:a.jsx(je,{mock:Me,children:a.jsx(Ae,{children:a.jsx(_e,{onDispatch:fe,initialState:{[s.SØKERSITUASJON]:ue,[s.OM_BARNET]:Te,[s.SØKER_DATA]:{harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1,harHattAnnenInntektSiste10Mnd:!1},[s.ANNEN_FORELDER]:Oe,[s.PERIODE_MED_FORELDREPENGER]:{dekningsgrad:ce}},children:a.jsx(pe,{arbeidsforhold:Pe,søker:De,mellomlagreSøknadOgNaviger:A,avbrytSøknad:me})})})})})},vr={title:"steps/FordelingSteg",component:pe,render:Ve},o={args:{søker:t,erAleneOmOmsorg:!0,søkersituasjon:{situasjon:"fødsel",rolle:"mor"},barnet:{type:n.FØDT,fødselsdatoer:["2021-09-21"],antallBarn:1,termindato:"2021-09-24"},annenForelder:{fornavn:"Hans",etternavn:"Utvikler",kanIkkeOppgis:!1,erAleneOmOmsorg:!0,datoForAleneomsorg:"2021-09-21"},stønadskonto100:void 0,stønadskonto80:{kontoer:{FORELDREPENGER:280,FORELDREPENGER_FØR_FØDSEL:15},minsteretter:{farRundtFødsel:0,generellMinsterett:0,toTette:0}},dekningsgrad:e.ÅTTI_PROSENT}},d={args:{søker:t,erAleneOmOmsorg:!0,søkersituasjon:{situasjon:"fødsel",rolle:"mor"},barnet:{type:n.FØDT,fødselsdatoer:["2023-09-21"],antallBarn:1,termindato:"2023-12-20"},annenForelder:{fornavn:"Hans",etternavn:"Utvikler",erAleneOmOmsorg:!0,datoForAleneomsorg:"2023-09-21",kanIkkeOppgis:!1},stønadskonto100:{kontoer:{FORELDREPENGER:294,FORELDREPENGER_FØR_FØDSEL:15},minsteretter:{farRundtFødsel:10,generellMinsterett:0,toTette:0}},stønadskonto80:void 0,dekningsgrad:e.HUNDRE_PROSENT}},l={args:{søker:t,erAleneOmOmsorg:!0,søkersituasjon:{situasjon:"adopsjon",rolle:"mor"},barnet:{type:n.ADOPTERT_STEBARN,fødselsdatoer:["2024-02-21"],antallBarn:3,adopsjonsdato:"2024-02-21"},annenForelder:{kanIkkeOppgis:!0},stønadskonto80:void 0,stønadskonto100:{kontoer:{FORELDREPENGER:460},minsteretter:{farRundtFødsel:0,generellMinsterett:0,toTette:0}},dekningsgrad:e.HUNDRE_PROSENT}},k={args:{søker:r,erAleneOmOmsorg:!0,søkersituasjon:{situasjon:"fødsel",rolle:"far"},barnet:{type:n.FØDT,fødselsdatoer:["2023-09-21"],antallBarn:2,termindato:"2023-09-21"},annenForelder:{fornavn:"Hanne",etternavn:"Utvikler",erAleneOmOmsorg:!0,datoForAleneomsorg:"2023-09-23",kanIkkeOppgis:!1},stønadskonto100:{kontoer:{FORELDREPENGER:385},minsteretter:{generellMinsterett:0,farRundtFødsel:10,toTette:0}},stønadskonto80:void 0,dekningsgrad:e.HUNDRE_PROSENT}},i={args:{søker:r,erAleneOmOmsorg:!0,søkersituasjon:{situasjon:"fødsel",rolle:"far"},barnet:{type:n.FØDT,fødselsdatoer:["2021-09-21"],antallBarn:4,termindato:"2021-09-21"},annenForelder:{fornavn:"Hanne",etternavn:"Utvikler",erAleneOmOmsorg:!0,datoForAleneomsorg:"2021-09-21",kanIkkeOppgis:!1},stønadskonto100:{kontoer:{FORELDREPENGER:460},minsteretter:{generellMinsterett:0,farRundtFødsel:0,toTette:0}},stønadskonto80:void 0,dekningsgrad:e.HUNDRE_PROSENT}},E={args:{søker:r,erAleneOmOmsorg:!0,søkersituasjon:{situasjon:"fødsel",rolle:"far"},barnet:{type:n.FØDT,fødselsdatoer:["2022-07-21"],antallBarn:3,termindato:"2022-07-21"},annenForelder:{fornavn:"Hanne",etternavn:"Utvikler",erAleneOmOmsorg:!0,datoForAleneomsorg:"2022-09-21",kanIkkeOppgis:!1},stønadskonto100:{kontoer:{FORELDREPENGER:460},minsteretter:{generellMinsterett:0,farRundtFødsel:0,toTette:0}},stønadskonto80:void 0,dekningsgrad:e.HUNDRE_PROSENT}},F={args:{søker:r,erAleneOmOmsorg:!0,søkersituasjon:{situasjon:"fødsel",rolle:"far"},barnet:{type:n.UFØDT,antallBarn:3,termindato:"2024-07-21"},annenForelder:{erAleneOmOmsorg:!0,fornavn:"Hanne",etternavn:"Utvikler",datoForAleneomsorg:"2024-09-21",kanIkkeOppgis:!1},stønadskonto100:{kontoer:{FORELDREPENGER:230},minsteretter:{generellMinsterett:0,farRundtFødsel:10,toTette:0}},stønadskonto80:void 0,dekningsgrad:e.HUNDRE_PROSENT}},g={args:{søker:r,erAleneOmOmsorg:!0,søkersituasjon:{situasjon:"fødsel",rolle:"far"},barnet:{type:n.FØDT,antallBarn:1,fødselsdatoer:["2024-01-21"],termindato:"2024-04-21"},annenForelder:{fornavn:"Hanne",etternavn:"Utvikler",erAleneOmOmsorg:!0,datoForAleneomsorg:"2024-01-21",kanIkkeOppgis:!1},stønadskonto100:{kontoer:{FORELDREPENGER:273},minsteretter:{farRundtFødsel:0,generellMinsterett:0,toTette:0}},stønadskonto80:void 0,dekningsgrad:e.HUNDRE_PROSENT}},R={args:{søker:r,erAleneOmOmsorg:!0,søkersituasjon:{situasjon:"adopsjon",rolle:"far"},barnet:{type:n.ADOPTERT_ANNET_BARN,fødselsdatoer:["2021-08-21"],antallBarn:4,adopsjonsdato:"2021-08-23"},annenForelder:{fornavn:"Hanne",etternavn:"Utvikler",erAleneOmOmsorg:!0,datoForAleneomsorg:"2024-01-21",kanIkkeOppgis:!1},stønadskonto100:{kontoer:{FORELDREPENGER:460},minsteretter:{generellMinsterett:0,farRundtFødsel:0,toTette:0}},stønadskonto80:void 0,dekningsgrad:e.HUNDRE_PROSENT}},p={args:{søker:t,søkersituasjon:{situasjon:"fødsel",rolle:"mor"},barnet:{type:n.FØDT,fødselsdatoer:["2023-09-21"],antallBarn:1,termindato:"2023-12-21"},annenForelder:{fornavn:"Hans",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1},stønadskonto100:{kontoer:{MØDREKVOTE:75,FEDREKVOTE:75,FELLESPERIODE:100,FORELDREPENGER_FØR_FØDSEL:15},minsteretter:{farRundtFødsel:10,generellMinsterett:0,toTette:0}},stønadskonto80:void 0,dekningsgrad:e.HUNDRE_PROSENT}},m={args:{søker:t,søkersituasjon:{situasjon:"fødsel",rolle:"mor"},barnet:{type:n.UFØDT,antallBarn:1,termindato:"2024-06-21"},annenForelder:{fornavn:"Hans",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1},stønadskonto100:{kontoer:{MØDREKVOTE:75,FEDREKVOTE:75,FELLESPERIODE:80,FORELDREPENGER_FØR_FØDSEL:15},minsteretter:{farRundtFødsel:10,generellMinsterett:0,toTette:0}},stønadskonto80:void 0,dekningsgrad:e.HUNDRE_PROSENT}},f={args:{søker:t,søkersituasjon:{situasjon:"fødsel",rolle:"mor"},barnet:{type:n.FØDT,antallBarn:2,fødselsdatoer:["2024-02-21"],termindato:"2024-02-21"},annenForelder:{fornavn:"Hans",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1},stønadskonto100:{kontoer:{MØDREKVOTE:75,FEDREKVOTE:75,FELLESPERIODE:165,FORELDREPENGER_FØR_FØDSEL:15,FLERBARNSDAGER:85},minsteretter:{farRundtFødsel:10,generellMinsterett:0,toTette:0}},stønadskonto80:void 0,dekningsgrad:e.HUNDRE_PROSENT}},D={args:{søker:t,søkersituasjon:{situasjon:"fødsel",rolle:"mor"},barnet:{type:n.UFØDT,antallBarn:1,termindato:"2024-07-21"},annenForelder:{fornavn:"Hans",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1},stønadskonto100:{kontoer:{MØDREKVOTE:75,FEDREKVOTE:75,FELLESPERIODE:80,FORELDREPENGER_FØR_FØDSEL:15},minsteretter:{farRundtFødsel:10,generellMinsterett:0,toTette:0}},stønadskonto80:void 0,dekningsgrad:e.HUNDRE_PROSENT,annenPartVedtak:Ke}},u={args:{søker:r,søkersituasjon:{situasjon:"fødsel",rolle:"far"},barnet:{type:n.FØDT,antallBarn:1,fødselsdatoer:["2021-07-21"],termindato:"2021-07-21"},annenForelder:{fornavn:"Hanne",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1},stønadskonto100:{kontoer:{MØDREKVOTE:75,FEDREKVOTE:75,FELLESPERIODE:80,FORELDREPENGER_FØR_FØDSEL:15},minsteretter:{farRundtFødsel:0,generellMinsterett:0,toTette:0}},stønadskonto80:void 0,dekningsgrad:e.HUNDRE_PROSENT}},O={args:{søker:r,søkersituasjon:{situasjon:"fødsel",rolle:"far"},barnet:{type:n.FØDT,antallBarn:3,fødselsdatoer:["2022-07-21"],termindato:"2022-07-21"},annenForelder:{fornavn:"Hanne",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1},stønadskonto100:{kontoer:{MØDREKVOTE:75,FEDREKVOTE:75,FELLESPERIODE:370,FORELDREPENGER_FØR_FØDSEL:15},minsteretter:{farRundtFødsel:0,generellMinsterett:0,toTette:0}},stønadskonto80:void 0,dekningsgrad:e.HUNDRE_PROSENT}},T={args:{søker:r,søkersituasjon:{situasjon:"fødsel",rolle:"far"},barnet:{type:n.UFØDT,antallBarn:4,termindato:"2024-07-21"},annenForelder:{fornavn:"Hanne",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1},stønadskonto100:{kontoer:{MØDREKVOTE:75,FEDREKVOTE:75,FELLESPERIODE:370,FORELDREPENGER_FØR_FØDSEL:15},minsteretter:{farRundtFødsel:10,generellMinsterett:0,toTette:0}},stønadskonto80:void 0,dekningsgrad:e.HUNDRE_PROSENT}},x={args:{søker:r,søkersituasjon:{situasjon:"fødsel",rolle:"far"},barnet:{type:n.FØDT,antallBarn:1,fødselsdatoer:["2024-02-21"],termindato:"2024-05-21"},annenForelder:{fornavn:"Hanne",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1},stønadskonto100:{kontoer:{MØDREKVOTE:75,FEDREKVOTE:75,FELLESPERIODE:100,FORELDREPENGER_FØR_FØDSEL:15},minsteretter:{farRundtFødsel:10,generellMinsterett:0,toTette:0}},stønadskonto80:void 0,dekningsgrad:e.HUNDRE_PROSENT}},N={args:{søker:r,søkersituasjon:{situasjon:"fødsel",rolle:"far"},barnet:{type:n.FØDT,antallBarn:1,fødselsdatoer:["2024-02-21"],termindato:"2024-02-21"},annenForelder:{fornavn:"Hanne",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1},stønadskonto100:{kontoer:{MØDREKVOTE:75,FEDREKVOTE:75,FELLESPERIODE:80,FORELDREPENGER_FØR_FØDSEL:15},minsteretter:{farRundtFødsel:10,generellMinsterett:0,toTette:0}},stønadskonto80:void 0,dekningsgrad:e.HUNDRE_PROSENT,annenPartVedtak:be}},v={args:{søker:r,søkersituasjon:{situasjon:"adopsjon",rolle:"far"},barnet:{type:n.ADOPTERT_STEBARN,antallBarn:2,fødselsdatoer:["2024-02-21"],adopsjonsdato:"2024-02-21"},annenForelder:{fornavn:"Hanne",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1},stønadskonto100:{kontoer:{MØDREKVOTE:95,FEDREKVOTE:95,FELLESPERIODE:90},minsteretter:{farRundtFødsel:0,generellMinsterett:0,toTette:0}},stønadskonto80:void 0,dekningsgrad:e.HUNDRE_PROSENT}},c={args:{søker:r,søkersituasjon:{situasjon:"adopsjon",rolle:"mor"},barnet:{type:n.ADOPTERT_ANNET_BARN,antallBarn:3,fødselsdatoer:["2021-02-21"],adopsjonsdato:"2021-02-21",ankomstdato:"2021-05-21"},annenForelder:{fornavn:"Hans",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1},stønadskonto100:void 0,stønadskonto80:{kontoer:{MØDREKVOTE:95,FEDREKVOTE:95,FELLESPERIODE:370},minsteretter:{farRundtFødsel:0,generellMinsterett:0,toTette:0}},dekningsgrad:e.ÅTTI_PROSENT}},P={args:{søker:t,søkersituasjon:{situasjon:"fødsel",rolle:"mor"},barnet:{type:n.UFØDT,antallBarn:1,termindato:"2024-07-21"},annenForelder:{fornavn:"Hans",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!1,harOppholdtSegIEØS:!0,harRettPåForeldrepengerIEØS:!0,kanIkkeOppgis:!1},stønadskonto100:void 0,stønadskonto80:{kontoer:{MØDREKVOTE:95,FEDREKVOTE:95,FELLESPERIODE:90,FORELDREPENGER_FØR_FØDSEL:15},minsteretter:{generellMinsterett:0,farRundtFødsel:10,toTette:0}},dekningsgrad:e.ÅTTI_PROSENT}},S={args:{søker:r,søkersituasjon:{situasjon:"adopsjon",rolle:"far"},barnet:{type:n.ADOPTERT_STEBARN,antallBarn:1,adopsjonsdato:"2024-02-21",fødselsdatoer:["2024-02-21"]},annenForelder:{fornavn:"Hanne",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!1,harOppholdtSegIEØS:!0,harRettPåForeldrepengerIEØS:!0,kanIkkeOppgis:!1},stønadskonto100:{kontoer:{MØDREKVOTE:95,FEDREKVOTE:95,FELLESPERIODE:90},minsteretter:{farRundtFødsel:0,generellMinsterett:0,toTette:0}},stønadskonto80:void 0,dekningsgrad:e.HUNDRE_PROSENT}},I={args:{søker:t,søkersituasjon:{situasjon:"fødsel",rolle:"mor"},barnet:{type:n.UFØDT,antallBarn:1,termindato:"2024-07-21"},annenForelder:{fornavn:"Hans",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!1,kanIkkeOppgis:!1},stønadskonto100:{kontoer:{FORELDREPENGER:230},minsteretter:{farRundtFødsel:15,generellMinsterett:0,toTette:0}},stønadskonto80:void 0,dekningsgrad:e.HUNDRE_PROSENT}},M={args:{søker:t,søkersituasjon:{situasjon:"adopsjon",rolle:"mor"},barnet:{type:n.ADOPTERT_ANNET_BARN,antallBarn:1,adopsjonsdato:"2022-08-21",fødselsdatoer:["2022-01-01"]},annenForelder:{fornavn:"Hans",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!1,kanIkkeOppgis:!1},stønadskonto100:{kontoer:{FORELDREPENGER:230},minsteretter:{farRundtFødsel:0,generellMinsterett:0,toTette:0}},stønadskonto80:void 0,dekningsgrad:e.HUNDRE_PROSENT}},j={args:{søker:r,søkersituasjon:{situasjon:"fødsel",rolle:"far"},barnet:{type:n.UFØDT,antallBarn:4,termindato:"2024-07-21"},annenForelder:{fornavn:"Hanne",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!1,kanIkkeOppgis:!1,erMorUfør:!0},stønadskonto100:{kontoer:{FORELDREPENGER:530},minsteretter:{generellMinsterett:375,farRundtFødsel:10,toTette:0}},stønadskonto80:void 0,dekningsgrad:e.HUNDRE_PROSENT}},U={args:{søker:r,søkersituasjon:{situasjon:"fødsel",rolle:"far"},barnet:{type:n.FØDT,antallBarn:1,fødselsdatoer:["2024-01-21"],termindato:"2024-01-21"},annenForelder:{fornavn:"Hanne",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!1,kanIkkeOppgis:!1,erMorUfør:!1},stønadskonto100:{kontoer:{FORELDREPENGER:250},minsteretter:{generellMinsterett:40,farRundtFødsel:10,toTette:0}},stønadskonto80:void 0,dekningsgrad:e.HUNDRE_PROSENT}},B={args:{søker:r,søkersituasjon:{situasjon:"fødsel",rolle:"far"},barnet:{type:n.FØDT,antallBarn:2,fødselsdatoer:["2021-07-21"],termindato:"2021-07-21"},annenForelder:{fornavn:"Hanne",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!1,kanIkkeOppgis:!1,erMorUfør:!0},stønadskonto100:{kontoer:{FORELDREPENGER:285,FLERBARNSDAGER:85},minsteretter:{generellMinsterett:0,farRundtFødsel:0,toTette:0}},stønadskonto80:void 0,dekningsgrad:e.HUNDRE_PROSENT}},L={args:{søker:r,søkersituasjon:{situasjon:"adopsjon",rolle:"far"},barnet:{type:n.ADOPTERT_STEBARN,antallBarn:1,fødselsdatoer:["2024-02-21"],adopsjonsdato:"2024-02-21"},annenForelder:{fornavn:"Hanne",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!1,erMorUfør:!0,kanIkkeOppgis:!1},stønadskonto100:{kontoer:{FORELDREPENGER:200},minsteretter:{generellMinsterett:75,farRundtFødsel:10,toTette:0}},stønadskonto80:void 0,dekningsgrad:e.HUNDRE_PROSENT}};var y,K,b;o.parameters={...o.parameters,docs:{...(y=o.parameters)==null?void 0:y.docs,source:{originalSource:`{
  args: {
    søker: søkerInfoKvinne,
    erAleneOmOmsorg: true,
    søkersituasjon: {
      situasjon: 'fødsel',
      rolle: 'mor'
    },
    barnet: {
      type: BarnType.FØDT,
      fødselsdatoer: ['2021-09-21'],
      antallBarn: 1,
      termindato: '2021-09-24'
    },
    annenForelder: {
      fornavn: 'Hans',
      etternavn: 'Utvikler',
      kanIkkeOppgis: false,
      erAleneOmOmsorg: true,
      datoForAleneomsorg: '2021-09-21'
    },
    stønadskonto100: undefined,
    stønadskonto80: {
      kontoer: {
        FORELDREPENGER: 280,
        FORELDREPENGER_FØR_FØDSEL: 15
      },
      minsteretter: {
        farRundtFødsel: 0,
        generellMinsterett: 0,
        toTette: 0
      }
    },
    dekningsgrad: Dekningsgrad.ÅTTI_PROSENT
  }
}`,...(b=(K=o.parameters)==null?void 0:K.docs)==null?void 0:b.source}}};var G,V,h;d.parameters={...d.parameters,docs:{...(G=d.parameters)==null?void 0:G.docs,source:{originalSource:`{
  args: {
    søker: søkerInfoKvinne,
    erAleneOmOmsorg: true,
    søkersituasjon: {
      situasjon: 'fødsel',
      rolle: 'mor'
    },
    barnet: {
      type: BarnType.FØDT,
      fødselsdatoer: ['2023-09-21'],
      antallBarn: 1,
      termindato: '2023-12-20'
    },
    annenForelder: {
      fornavn: 'Hans',
      etternavn: 'Utvikler',
      erAleneOmOmsorg: true,
      datoForAleneomsorg: '2023-09-21',
      kanIkkeOppgis: false
    },
    stønadskonto100: {
      kontoer: {
        FORELDREPENGER: 294,
        FORELDREPENGER_FØR_FØDSEL: 15
      },
      minsteretter: {
        farRundtFødsel: 10,
        generellMinsterett: 0,
        toTette: 0
      }
    },
    stønadskonto80: undefined,
    dekningsgrad: Dekningsgrad.HUNDRE_PROSENT
  }
}`,...(h=(V=d.parameters)==null?void 0:V.docs)==null?void 0:h.source}}};var W,C,J;l.parameters={...l.parameters,docs:{...(W=l.parameters)==null?void 0:W.docs,source:{originalSource:`{
  args: {
    søker: søkerInfoKvinne,
    erAleneOmOmsorg: true,
    søkersituasjon: {
      situasjon: 'adopsjon',
      rolle: 'mor'
    },
    barnet: {
      type: BarnType.ADOPTERT_STEBARN,
      fødselsdatoer: ['2024-02-21'],
      antallBarn: 3,
      adopsjonsdato: '2024-02-21'
    },
    annenForelder: {
      kanIkkeOppgis: true
    },
    stønadskonto80: undefined,
    stønadskonto100: {
      kontoer: {
        FORELDREPENGER: 460
      },
      minsteretter: {
        farRundtFødsel: 0,
        generellMinsterett: 0,
        toTette: 0
      }
    },
    dekningsgrad: Dekningsgrad.HUNDRE_PROSENT
  }
}`,...(J=(C=l.parameters)==null?void 0:C.docs)==null?void 0:J.source}}};var $,q,w;k.parameters={...k.parameters,docs:{...($=k.parameters)==null?void 0:$.docs,source:{originalSource:`{
  args: {
    søker: søkerInfoMann,
    erAleneOmOmsorg: true,
    søkersituasjon: {
      situasjon: 'fødsel',
      rolle: 'far'
    },
    barnet: {
      type: BarnType.FØDT,
      fødselsdatoer: ['2023-09-21'],
      antallBarn: 2,
      termindato: '2023-09-21'
    },
    annenForelder: {
      fornavn: 'Hanne',
      etternavn: 'Utvikler',
      erAleneOmOmsorg: true,
      datoForAleneomsorg: '2023-09-23',
      kanIkkeOppgis: false
    },
    stønadskonto100: {
      kontoer: {
        FORELDREPENGER: 385
      },
      minsteretter: {
        generellMinsterett: 0,
        farRundtFødsel: 10,
        toTette: 0
      }
    },
    stønadskonto80: undefined,
    dekningsgrad: Dekningsgrad.HUNDRE_PROSENT
  }
}`,...(w=(q=k.parameters)==null?void 0:q.docs)==null?void 0:w.source}}};var z,Q,X;i.parameters={...i.parameters,docs:{...(z=i.parameters)==null?void 0:z.docs,source:{originalSource:`{
  args: {
    søker: søkerInfoMann,
    erAleneOmOmsorg: true,
    søkersituasjon: {
      situasjon: 'fødsel',
      rolle: 'far'
    },
    barnet: {
      type: BarnType.FØDT,
      fødselsdatoer: ['2021-09-21'],
      antallBarn: 4,
      termindato: '2021-09-21'
    },
    annenForelder: {
      fornavn: 'Hanne',
      etternavn: 'Utvikler',
      erAleneOmOmsorg: true,
      datoForAleneomsorg: '2021-09-21',
      kanIkkeOppgis: false
    },
    stønadskonto100: {
      kontoer: {
        FORELDREPENGER: 460
      },
      minsteretter: {
        generellMinsterett: 0,
        farRundtFødsel: 0,
        toTette: 0
      }
    },
    stønadskonto80: undefined,
    dekningsgrad: Dekningsgrad.HUNDRE_PROSENT
  }
}`,...(X=(Q=i.parameters)==null?void 0:Q.docs)==null?void 0:X.source}}};var Y,Z,nn;E.parameters={...E.parameters,docs:{...(Y=E.parameters)==null?void 0:Y.docs,source:{originalSource:`{
  args: {
    søker: søkerInfoMann,
    erAleneOmOmsorg: true,
    søkersituasjon: {
      situasjon: 'fødsel',
      rolle: 'far'
    },
    barnet: {
      type: BarnType.FØDT,
      fødselsdatoer: ['2022-07-21'],
      antallBarn: 3,
      termindato: '2022-07-21'
    },
    annenForelder: {
      fornavn: 'Hanne',
      etternavn: 'Utvikler',
      erAleneOmOmsorg: true,
      datoForAleneomsorg: '2022-09-21',
      kanIkkeOppgis: false
    },
    stønadskonto100: {
      kontoer: {
        FORELDREPENGER: 460
      },
      minsteretter: {
        generellMinsterett: 0,
        farRundtFødsel: 0,
        toTette: 0
      }
    },
    stønadskonto80: undefined,
    dekningsgrad: Dekningsgrad.HUNDRE_PROSENT
  }
}`,...(nn=(Z=E.parameters)==null?void 0:Z.docs)==null?void 0:nn.source}}};var en,rn,tn;F.parameters={...F.parameters,docs:{...(en=F.parameters)==null?void 0:en.docs,source:{originalSource:`{
  args: {
    søker: søkerInfoMann,
    erAleneOmOmsorg: true,
    søkersituasjon: {
      situasjon: 'fødsel',
      rolle: 'far'
    },
    barnet: {
      type: BarnType.UFØDT,
      antallBarn: 3,
      termindato: '2024-07-21'
    },
    annenForelder: {
      erAleneOmOmsorg: true,
      fornavn: 'Hanne',
      etternavn: 'Utvikler',
      datoForAleneomsorg: '2024-09-21',
      kanIkkeOppgis: false
    },
    stønadskonto100: {
      kontoer: {
        FORELDREPENGER: 230
      },
      minsteretter: {
        generellMinsterett: 0,
        farRundtFødsel: 10,
        toTette: 0
      }
    },
    stønadskonto80: undefined,
    dekningsgrad: Dekningsgrad.HUNDRE_PROSENT
  }
}`,...(tn=(rn=F.parameters)==null?void 0:rn.docs)==null?void 0:tn.source}}};var an,sn,on;g.parameters={...g.parameters,docs:{...(an=g.parameters)==null?void 0:an.docs,source:{originalSource:`{
  args: {
    søker: søkerInfoMann,
    erAleneOmOmsorg: true,
    søkersituasjon: {
      situasjon: 'fødsel',
      rolle: 'far'
    },
    barnet: {
      type: BarnType.FØDT,
      antallBarn: 1,
      fødselsdatoer: ['2024-01-21'],
      termindato: '2024-04-21'
    },
    annenForelder: {
      fornavn: 'Hanne',
      etternavn: 'Utvikler',
      erAleneOmOmsorg: true,
      datoForAleneomsorg: '2024-01-21',
      kanIkkeOppgis: false
    },
    stønadskonto100: {
      kontoer: {
        FORELDREPENGER: 273
      },
      minsteretter: {
        farRundtFødsel: 0,
        generellMinsterett: 0,
        toTette: 0
      }
    },
    stønadskonto80: undefined,
    dekningsgrad: Dekningsgrad.HUNDRE_PROSENT
  }
}`,...(on=(sn=g.parameters)==null?void 0:sn.docs)==null?void 0:on.source}}};var dn,ln,kn;R.parameters={...R.parameters,docs:{...(dn=R.parameters)==null?void 0:dn.docs,source:{originalSource:`{
  args: {
    søker: søkerInfoMann,
    erAleneOmOmsorg: true,
    søkersituasjon: {
      situasjon: 'adopsjon',
      rolle: 'far'
    },
    barnet: {
      type: BarnType.ADOPTERT_ANNET_BARN,
      fødselsdatoer: ['2021-08-21'],
      antallBarn: 4,
      adopsjonsdato: '2021-08-23'
    },
    annenForelder: {
      fornavn: 'Hanne',
      etternavn: 'Utvikler',
      erAleneOmOmsorg: true,
      datoForAleneomsorg: '2024-01-21',
      kanIkkeOppgis: false
    },
    stønadskonto100: {
      kontoer: {
        FORELDREPENGER: 460
      },
      minsteretter: {
        generellMinsterett: 0,
        farRundtFødsel: 0,
        toTette: 0
      }
    },
    stønadskonto80: undefined,
    dekningsgrad: Dekningsgrad.HUNDRE_PROSENT
  }
}`,...(kn=(ln=R.parameters)==null?void 0:ln.docs)==null?void 0:kn.source}}};var En,Fn,gn;p.parameters={...p.parameters,docs:{...(En=p.parameters)==null?void 0:En.docs,source:{originalSource:`{
  args: {
    søker: søkerInfoKvinne,
    søkersituasjon: {
      situasjon: 'fødsel',
      rolle: 'mor'
    },
    barnet: {
      type: BarnType.FØDT,
      fødselsdatoer: ['2023-09-21'],
      antallBarn: 1,
      termindato: '2023-12-21'
    },
    annenForelder: {
      fornavn: 'Hans',
      etternavn: 'Utvikler',
      fnr: '1212121313',
      harRettPåForeldrepengerINorge: true,
      kanIkkeOppgis: false
    },
    stønadskonto100: {
      kontoer: {
        MØDREKVOTE: 75,
        FEDREKVOTE: 75,
        FELLESPERIODE: 100,
        FORELDREPENGER_FØR_FØDSEL: 15
      },
      minsteretter: {
        farRundtFødsel: 10,
        generellMinsterett: 0,
        toTette: 0
      }
    },
    stønadskonto80: undefined,
    dekningsgrad: Dekningsgrad.HUNDRE_PROSENT
  }
}`,...(gn=(Fn=p.parameters)==null?void 0:Fn.docs)==null?void 0:gn.source}}};var Rn,pn,mn;m.parameters={...m.parameters,docs:{...(Rn=m.parameters)==null?void 0:Rn.docs,source:{originalSource:`{
  args: {
    søker: søkerInfoKvinne,
    søkersituasjon: {
      situasjon: 'fødsel',
      rolle: 'mor'
    },
    barnet: {
      type: BarnType.UFØDT,
      antallBarn: 1,
      termindato: '2024-06-21'
    },
    annenForelder: {
      fornavn: 'Hans',
      etternavn: 'Utvikler',
      fnr: '1212121313',
      harRettPåForeldrepengerINorge: true,
      kanIkkeOppgis: false
    },
    stønadskonto100: {
      kontoer: {
        MØDREKVOTE: 75,
        FEDREKVOTE: 75,
        FELLESPERIODE: 80,
        FORELDREPENGER_FØR_FØDSEL: 15
      },
      minsteretter: {
        farRundtFødsel: 10,
        generellMinsterett: 0,
        toTette: 0
      }
    },
    stønadskonto80: undefined,
    dekningsgrad: Dekningsgrad.HUNDRE_PROSENT
  }
}`,...(mn=(pn=m.parameters)==null?void 0:pn.docs)==null?void 0:mn.source}}};var fn,Dn,un;f.parameters={...f.parameters,docs:{...(fn=f.parameters)==null?void 0:fn.docs,source:{originalSource:`{
  args: {
    søker: søkerInfoKvinne,
    søkersituasjon: {
      situasjon: 'fødsel',
      rolle: 'mor'
    },
    barnet: {
      type: BarnType.FØDT,
      antallBarn: 2,
      fødselsdatoer: ['2024-02-21'],
      termindato: '2024-02-21'
    },
    annenForelder: {
      fornavn: 'Hans',
      etternavn: 'Utvikler',
      fnr: '1212121313',
      harRettPåForeldrepengerINorge: true,
      kanIkkeOppgis: false
    },
    stønadskonto100: {
      kontoer: {
        MØDREKVOTE: 75,
        FEDREKVOTE: 75,
        FELLESPERIODE: 165,
        FORELDREPENGER_FØR_FØDSEL: 15,
        FLERBARNSDAGER: 85
      },
      minsteretter: {
        farRundtFødsel: 10,
        generellMinsterett: 0,
        toTette: 0
      }
    },
    stønadskonto80: undefined,
    dekningsgrad: Dekningsgrad.HUNDRE_PROSENT
  }
}`,...(un=(Dn=f.parameters)==null?void 0:Dn.docs)==null?void 0:un.source}}};var On,Tn,xn;D.parameters={...D.parameters,docs:{...(On=D.parameters)==null?void 0:On.docs,source:{originalSource:`{
  args: {
    søker: søkerInfoKvinne,
    søkersituasjon: {
      situasjon: 'fødsel',
      rolle: 'mor'
    },
    barnet: {
      type: BarnType.UFØDT,
      antallBarn: 1,
      termindato: '2024-07-21'
    },
    annenForelder: {
      fornavn: 'Hans',
      etternavn: 'Utvikler',
      fnr: '1212121313',
      harRettPåForeldrepengerINorge: true,
      kanIkkeOppgis: false
    },
    stønadskonto100: {
      kontoer: {
        MØDREKVOTE: 75,
        FEDREKVOTE: 75,
        FELLESPERIODE: 80,
        FORELDREPENGER_FØR_FØDSEL: 15
      },
      minsteretter: {
        farRundtFødsel: 10,
        generellMinsterett: 0,
        toTette: 0
      }
    },
    stønadskonto80: undefined,
    dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
    annenPartVedtak: vedtakFar
  }
}`,...(xn=(Tn=D.parameters)==null?void 0:Tn.docs)==null?void 0:xn.source}}};var Nn,vn,cn;u.parameters={...u.parameters,docs:{...(Nn=u.parameters)==null?void 0:Nn.docs,source:{originalSource:`{
  args: {
    søker: søkerInfoMann,
    søkersituasjon: {
      situasjon: 'fødsel',
      rolle: 'far'
    },
    barnet: {
      type: BarnType.FØDT,
      antallBarn: 1,
      fødselsdatoer: ['2021-07-21'],
      termindato: '2021-07-21'
    },
    annenForelder: {
      fornavn: 'Hanne',
      etternavn: 'Utvikler',
      fnr: '1212121313',
      harRettPåForeldrepengerINorge: true,
      kanIkkeOppgis: false
    },
    stønadskonto100: {
      kontoer: {
        MØDREKVOTE: 75,
        FEDREKVOTE: 75,
        FELLESPERIODE: 80,
        FORELDREPENGER_FØR_FØDSEL: 15
      },
      minsteretter: {
        farRundtFødsel: 0,
        generellMinsterett: 0,
        toTette: 0
      }
    },
    stønadskonto80: undefined,
    dekningsgrad: Dekningsgrad.HUNDRE_PROSENT
  }
}`,...(cn=(vn=u.parameters)==null?void 0:vn.docs)==null?void 0:cn.source}}};var Pn,Sn,In;O.parameters={...O.parameters,docs:{...(Pn=O.parameters)==null?void 0:Pn.docs,source:{originalSource:`{
  args: {
    søker: søkerInfoMann,
    søkersituasjon: {
      situasjon: 'fødsel',
      rolle: 'far'
    },
    barnet: {
      type: BarnType.FØDT,
      antallBarn: 3,
      fødselsdatoer: ['2022-07-21'],
      termindato: '2022-07-21'
    },
    annenForelder: {
      fornavn: 'Hanne',
      etternavn: 'Utvikler',
      fnr: '1212121313',
      harRettPåForeldrepengerINorge: true,
      kanIkkeOppgis: false
    },
    stønadskonto100: {
      kontoer: {
        MØDREKVOTE: 75,
        FEDREKVOTE: 75,
        FELLESPERIODE: 370,
        FORELDREPENGER_FØR_FØDSEL: 15
      },
      minsteretter: {
        farRundtFødsel: 0,
        generellMinsterett: 0,
        toTette: 0
      }
    },
    stønadskonto80: undefined,
    dekningsgrad: Dekningsgrad.HUNDRE_PROSENT
  }
}`,...(In=(Sn=O.parameters)==null?void 0:Sn.docs)==null?void 0:In.source}}};var Mn,jn,Un;T.parameters={...T.parameters,docs:{...(Mn=T.parameters)==null?void 0:Mn.docs,source:{originalSource:`{
  args: {
    søker: søkerInfoMann,
    søkersituasjon: {
      situasjon: 'fødsel',
      rolle: 'far'
    },
    barnet: {
      type: BarnType.UFØDT,
      antallBarn: 4,
      termindato: '2024-07-21'
    },
    annenForelder: {
      fornavn: 'Hanne',
      etternavn: 'Utvikler',
      fnr: '1212121313',
      harRettPåForeldrepengerINorge: true,
      kanIkkeOppgis: false
    },
    stønadskonto100: {
      kontoer: {
        MØDREKVOTE: 75,
        FEDREKVOTE: 75,
        FELLESPERIODE: 370,
        FORELDREPENGER_FØR_FØDSEL: 15
      },
      minsteretter: {
        farRundtFødsel: 10,
        generellMinsterett: 0,
        toTette: 0
      }
    },
    stønadskonto80: undefined,
    dekningsgrad: Dekningsgrad.HUNDRE_PROSENT
  }
}`,...(Un=(jn=T.parameters)==null?void 0:jn.docs)==null?void 0:Un.source}}};var Bn,Ln,An;x.parameters={...x.parameters,docs:{...(Bn=x.parameters)==null?void 0:Bn.docs,source:{originalSource:`{
  args: {
    søker: søkerInfoMann,
    søkersituasjon: {
      situasjon: 'fødsel',
      rolle: 'far'
    },
    barnet: {
      type: BarnType.FØDT,
      antallBarn: 1,
      fødselsdatoer: ['2024-02-21'],
      termindato: '2024-05-21'
    },
    annenForelder: {
      fornavn: 'Hanne',
      etternavn: 'Utvikler',
      fnr: '1212121313',
      harRettPåForeldrepengerINorge: true,
      kanIkkeOppgis: false
    },
    stønadskonto100: {
      kontoer: {
        MØDREKVOTE: 75,
        FEDREKVOTE: 75,
        FELLESPERIODE: 100,
        FORELDREPENGER_FØR_FØDSEL: 15
      },
      minsteretter: {
        farRundtFødsel: 10,
        generellMinsterett: 0,
        toTette: 0
      }
    },
    stønadskonto80: undefined,
    dekningsgrad: Dekningsgrad.HUNDRE_PROSENT
  }
}`,...(An=(Ln=x.parameters)==null?void 0:Ln.docs)==null?void 0:An.source}}};var _n,Hn,yn;N.parameters={...N.parameters,docs:{...(_n=N.parameters)==null?void 0:_n.docs,source:{originalSource:`{
  args: {
    søker: søkerInfoMann,
    søkersituasjon: {
      situasjon: 'fødsel',
      rolle: 'far'
    },
    barnet: {
      type: BarnType.FØDT,
      antallBarn: 1,
      fødselsdatoer: ['2024-02-21'],
      termindato: '2024-02-21'
    },
    annenForelder: {
      fornavn: 'Hanne',
      etternavn: 'Utvikler',
      fnr: '1212121313',
      harRettPåForeldrepengerINorge: true,
      kanIkkeOppgis: false
    },
    stønadskonto100: {
      kontoer: {
        MØDREKVOTE: 75,
        FEDREKVOTE: 75,
        FELLESPERIODE: 80,
        FORELDREPENGER_FØR_FØDSEL: 15
      },
      minsteretter: {
        farRundtFødsel: 10,
        generellMinsterett: 0,
        toTette: 0
      }
    },
    stønadskonto80: undefined,
    dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
    annenPartVedtak: vedtakMor
  }
}`,...(yn=(Hn=N.parameters)==null?void 0:Hn.docs)==null?void 0:yn.source}}};var Kn,bn,Gn;v.parameters={...v.parameters,docs:{...(Kn=v.parameters)==null?void 0:Kn.docs,source:{originalSource:`{
  args: {
    søker: søkerInfoMann,
    søkersituasjon: {
      situasjon: 'adopsjon',
      rolle: 'far'
    },
    barnet: {
      type: BarnType.ADOPTERT_STEBARN,
      antallBarn: 2,
      fødselsdatoer: ['2024-02-21'],
      adopsjonsdato: '2024-02-21'
    },
    annenForelder: {
      fornavn: 'Hanne',
      etternavn: 'Utvikler',
      fnr: '1212121313',
      harRettPåForeldrepengerINorge: true,
      kanIkkeOppgis: false
    },
    stønadskonto100: {
      kontoer: {
        MØDREKVOTE: 95,
        FEDREKVOTE: 95,
        FELLESPERIODE: 90
      },
      minsteretter: {
        farRundtFødsel: 0,
        generellMinsterett: 0,
        toTette: 0
      }
    },
    stønadskonto80: undefined,
    dekningsgrad: Dekningsgrad.HUNDRE_PROSENT
  }
}`,...(Gn=(bn=v.parameters)==null?void 0:bn.docs)==null?void 0:Gn.source}}};var Vn,hn,Wn;c.parameters={...c.parameters,docs:{...(Vn=c.parameters)==null?void 0:Vn.docs,source:{originalSource:`{
  args: {
    søker: søkerInfoMann,
    søkersituasjon: {
      situasjon: 'adopsjon',
      rolle: 'mor'
    },
    barnet: {
      type: BarnType.ADOPTERT_ANNET_BARN,
      antallBarn: 3,
      fødselsdatoer: ['2021-02-21'],
      adopsjonsdato: '2021-02-21',
      ankomstdato: '2021-05-21'
    },
    annenForelder: {
      fornavn: 'Hans',
      etternavn: 'Utvikler',
      fnr: '1212121313',
      harRettPåForeldrepengerINorge: true,
      kanIkkeOppgis: false
    },
    stønadskonto100: undefined,
    stønadskonto80: {
      kontoer: {
        MØDREKVOTE: 95,
        FEDREKVOTE: 95,
        FELLESPERIODE: 370
      },
      minsteretter: {
        farRundtFødsel: 0,
        generellMinsterett: 0,
        toTette: 0
      }
    },
    dekningsgrad: Dekningsgrad.ÅTTI_PROSENT
  }
}`,...(Wn=(hn=c.parameters)==null?void 0:hn.docs)==null?void 0:Wn.source}}};var Cn,Jn,$n;P.parameters={...P.parameters,docs:{...(Cn=P.parameters)==null?void 0:Cn.docs,source:{originalSource:`{
  args: {
    søker: søkerInfoKvinne,
    søkersituasjon: {
      situasjon: 'fødsel',
      rolle: 'mor'
    },
    barnet: {
      type: BarnType.UFØDT,
      antallBarn: 1,
      termindato: '2024-07-21'
    },
    annenForelder: {
      fornavn: 'Hans',
      etternavn: 'Utvikler',
      fnr: '1212121313',
      harRettPåForeldrepengerINorge: false,
      harOppholdtSegIEØS: true,
      harRettPåForeldrepengerIEØS: true,
      kanIkkeOppgis: false
    },
    stønadskonto100: undefined,
    stønadskonto80: {
      kontoer: {
        MØDREKVOTE: 95,
        FEDREKVOTE: 95,
        FELLESPERIODE: 90,
        FORELDREPENGER_FØR_FØDSEL: 15
      },
      minsteretter: {
        generellMinsterett: 0,
        farRundtFødsel: 10,
        toTette: 0
      }
    },
    dekningsgrad: Dekningsgrad.ÅTTI_PROSENT
  }
}`,...($n=(Jn=P.parameters)==null?void 0:Jn.docs)==null?void 0:$n.source}}};var qn,wn,zn;S.parameters={...S.parameters,docs:{...(qn=S.parameters)==null?void 0:qn.docs,source:{originalSource:`{
  args: {
    søker: søkerInfoMann,
    søkersituasjon: {
      situasjon: 'adopsjon',
      rolle: 'far'
    },
    barnet: {
      type: BarnType.ADOPTERT_STEBARN,
      antallBarn: 1,
      adopsjonsdato: '2024-02-21',
      fødselsdatoer: ['2024-02-21']
    },
    annenForelder: {
      fornavn: 'Hanne',
      etternavn: 'Utvikler',
      fnr: '1212121313',
      harRettPåForeldrepengerINorge: false,
      harOppholdtSegIEØS: true,
      harRettPåForeldrepengerIEØS: true,
      kanIkkeOppgis: false
    },
    stønadskonto100: {
      kontoer: {
        MØDREKVOTE: 95,
        FEDREKVOTE: 95,
        FELLESPERIODE: 90
      },
      minsteretter: {
        farRundtFødsel: 0,
        generellMinsterett: 0,
        toTette: 0
      }
    },
    stønadskonto80: undefined,
    dekningsgrad: Dekningsgrad.HUNDRE_PROSENT
  }
}`,...(zn=(wn=S.parameters)==null?void 0:wn.docs)==null?void 0:zn.source}}};var Qn,Xn,Yn;I.parameters={...I.parameters,docs:{...(Qn=I.parameters)==null?void 0:Qn.docs,source:{originalSource:`{
  args: {
    søker: søkerInfoKvinne,
    søkersituasjon: {
      situasjon: 'fødsel',
      rolle: 'mor'
    },
    barnet: {
      type: BarnType.UFØDT,
      antallBarn: 1,
      termindato: '2024-07-21'
    },
    annenForelder: {
      fornavn: 'Hans',
      etternavn: 'Utvikler',
      fnr: '1212121313',
      harRettPåForeldrepengerINorge: false,
      kanIkkeOppgis: false
    },
    stønadskonto100: {
      kontoer: {
        FORELDREPENGER: 230
      },
      minsteretter: {
        farRundtFødsel: 15,
        generellMinsterett: 0,
        toTette: 0
      }
    },
    stønadskonto80: undefined,
    dekningsgrad: Dekningsgrad.HUNDRE_PROSENT
  }
}`,...(Yn=(Xn=I.parameters)==null?void 0:Xn.docs)==null?void 0:Yn.source}}};var Zn,ne,ee;M.parameters={...M.parameters,docs:{...(Zn=M.parameters)==null?void 0:Zn.docs,source:{originalSource:`{
  args: {
    søker: søkerInfoKvinne,
    søkersituasjon: {
      situasjon: 'adopsjon',
      rolle: 'mor'
    },
    barnet: {
      type: BarnType.ADOPTERT_ANNET_BARN,
      antallBarn: 1,
      adopsjonsdato: '2022-08-21',
      fødselsdatoer: ['2022-01-01']
    },
    annenForelder: {
      fornavn: 'Hans',
      etternavn: 'Utvikler',
      fnr: '1212121313',
      harRettPåForeldrepengerINorge: false,
      kanIkkeOppgis: false
    },
    stønadskonto100: {
      kontoer: {
        FORELDREPENGER: 230
      },
      minsteretter: {
        farRundtFødsel: 0,
        generellMinsterett: 0,
        toTette: 0
      }
    },
    stønadskonto80: undefined,
    dekningsgrad: Dekningsgrad.HUNDRE_PROSENT
  }
}`,...(ee=(ne=M.parameters)==null?void 0:ne.docs)==null?void 0:ee.source}}};var re,te,ae;j.parameters={...j.parameters,docs:{...(re=j.parameters)==null?void 0:re.docs,source:{originalSource:`{
  args: {
    søker: søkerInfoMann,
    søkersituasjon: {
      situasjon: 'fødsel',
      rolle: 'far'
    },
    barnet: {
      type: BarnType.UFØDT,
      antallBarn: 4,
      termindato: '2024-07-21'
    },
    annenForelder: {
      fornavn: 'Hanne',
      etternavn: 'Utvikler',
      fnr: '1212121313',
      harRettPåForeldrepengerINorge: false,
      kanIkkeOppgis: false,
      erMorUfør: true
    },
    stønadskonto100: {
      kontoer: {
        FORELDREPENGER: 530
      },
      minsteretter: {
        generellMinsterett: 375,
        farRundtFødsel: 10,
        toTette: 0
      }
    },
    stønadskonto80: undefined,
    dekningsgrad: Dekningsgrad.HUNDRE_PROSENT
  }
}`,...(ae=(te=j.parameters)==null?void 0:te.docs)==null?void 0:ae.source}}};var se,oe,de;U.parameters={...U.parameters,docs:{...(se=U.parameters)==null?void 0:se.docs,source:{originalSource:`{
  args: {
    søker: søkerInfoMann,
    søkersituasjon: {
      situasjon: 'fødsel',
      rolle: 'far'
    },
    barnet: {
      type: BarnType.FØDT,
      antallBarn: 1,
      fødselsdatoer: ['2024-01-21'],
      termindato: '2024-01-21'
    },
    annenForelder: {
      fornavn: 'Hanne',
      etternavn: 'Utvikler',
      fnr: '1212121313',
      harRettPåForeldrepengerINorge: false,
      kanIkkeOppgis: false,
      erMorUfør: false
    },
    stønadskonto100: {
      kontoer: {
        FORELDREPENGER: 250
      },
      minsteretter: {
        generellMinsterett: 40,
        farRundtFødsel: 10,
        toTette: 0
      }
    },
    stønadskonto80: undefined,
    dekningsgrad: Dekningsgrad.HUNDRE_PROSENT
  }
}`,...(de=(oe=U.parameters)==null?void 0:oe.docs)==null?void 0:de.source}}};var le,ke,ie;B.parameters={...B.parameters,docs:{...(le=B.parameters)==null?void 0:le.docs,source:{originalSource:`{
  args: {
    søker: søkerInfoMann,
    søkersituasjon: {
      situasjon: 'fødsel',
      rolle: 'far'
    },
    barnet: {
      type: BarnType.FØDT,
      antallBarn: 2,
      fødselsdatoer: ['2021-07-21'],
      termindato: '2021-07-21'
    },
    annenForelder: {
      fornavn: 'Hanne',
      etternavn: 'Utvikler',
      fnr: '1212121313',
      harRettPåForeldrepengerINorge: false,
      kanIkkeOppgis: false,
      erMorUfør: true
    },
    stønadskonto100: {
      kontoer: {
        FORELDREPENGER: 285,
        FLERBARNSDAGER: 85
      },
      minsteretter: {
        generellMinsterett: 0,
        farRundtFødsel: 0,
        toTette: 0
      }
    },
    stønadskonto80: undefined,
    dekningsgrad: Dekningsgrad.HUNDRE_PROSENT
  }
}`,...(ie=(ke=B.parameters)==null?void 0:ke.docs)==null?void 0:ie.source}}};var Ee,Fe,ge;L.parameters={...L.parameters,docs:{...(Ee=L.parameters)==null?void 0:Ee.docs,source:{originalSource:`{
  args: {
    søker: søkerInfoMann,
    søkersituasjon: {
      situasjon: 'adopsjon',
      rolle: 'far'
    },
    barnet: {
      type: BarnType.ADOPTERT_STEBARN,
      antallBarn: 1,
      fødselsdatoer: ['2024-02-21'],
      adopsjonsdato: '2024-02-21'
    },
    annenForelder: {
      fornavn: 'Hanne',
      etternavn: 'Utvikler',
      fnr: '1212121313',
      harRettPåForeldrepengerINorge: false,
      erMorUfør: true,
      kanIkkeOppgis: false
    },
    stønadskonto100: {
      kontoer: {
        FORELDREPENGER: 200
      },
      minsteretter: {
        generellMinsterett: 75,
        farRundtFødsel: 10,
        toTette: 0
      }
    },
    stønadskonto80: undefined,
    dekningsgrad: Dekningsgrad.HUNDRE_PROSENT
  }
}`,...(ge=(Fe=L.parameters)==null?void 0:Fe.docs)==null?void 0:ge.source}}};const cr=["MorAleneomsorgDekning80EttBarnFør1Okt2021","MorAleneomsorgEttBarnPrematurFødsel","MorAleneomsorgAdopsjonTrillinger","FarMedmorAleneomsorgFødtTvillinger","FarMedmorAleneomsorgFødtFireBarnFør1Okt2021","FarMedmorAleneomsorgFødtTreBarnFørWLB","FarMedmorAleneomsorgEttBarnTerminEtterWLB","FarMedmorAleneomsorgPrematurtFødtBarn","FarMedmorAleneomsorgAdopsjonFireBarn","MorDeltUttakEttBarnPrematurFødsel","MorDeltUttakEttBarnTermin","MorDeltUttakTvillingerFødt","MorDeltUttakFarSøkteMorsKvoteOgFellesperiode","FarMedmorSøkerDeltUttakEttBarnFødtFør1Okt2021","FarMedmorSøkerDeltUttakTrillingerFødtFørWLB","FarMedmorSøkerDeltUttakFireBarnTerminEtterWLB","FarMedmorSøkerDeltUttakEttBarnFødtPrematurt","FarSøkerDerMorHarTattUtFedrekvoteOgFellesperiode","FarSøkerAdopsjonToBarn","MorSøkerAdopsjonTreBarnFraUtlandetFør1Okt2021Dekningsgrad80","MorSøkerFarHarRettIEØSTerminDekningsgrad80","FarMedmorSøkerMorHarRettIEØSAdopsjon","BareMorHarRettTermin","BareMorHarRettAdopsjon","BareFarHarRettOgMorErUførTermin4Barn","BareFarHarRettOgMorErIkkeUførFødtBarn","BareFarHarRettTvillingerFødtFør1Okt2021","BareFarHarRettAdopsjonMorErUfør"];export{L as BareFarHarRettAdopsjonMorErUfør,U as BareFarHarRettOgMorErIkkeUførFødtBarn,j as BareFarHarRettOgMorErUførTermin4Barn,B as BareFarHarRettTvillingerFødtFør1Okt2021,M as BareMorHarRettAdopsjon,I as BareMorHarRettTermin,R as FarMedmorAleneomsorgAdopsjonFireBarn,F as FarMedmorAleneomsorgEttBarnTerminEtterWLB,i as FarMedmorAleneomsorgFødtFireBarnFør1Okt2021,E as FarMedmorAleneomsorgFødtTreBarnFørWLB,k as FarMedmorAleneomsorgFødtTvillinger,g as FarMedmorAleneomsorgPrematurtFødtBarn,u as FarMedmorSøkerDeltUttakEttBarnFødtFør1Okt2021,x as FarMedmorSøkerDeltUttakEttBarnFødtPrematurt,T as FarMedmorSøkerDeltUttakFireBarnTerminEtterWLB,O as FarMedmorSøkerDeltUttakTrillingerFødtFørWLB,S as FarMedmorSøkerMorHarRettIEØSAdopsjon,v as FarSøkerAdopsjonToBarn,N as FarSøkerDerMorHarTattUtFedrekvoteOgFellesperiode,l as MorAleneomsorgAdopsjonTrillinger,o as MorAleneomsorgDekning80EttBarnFør1Okt2021,d as MorAleneomsorgEttBarnPrematurFødsel,p as MorDeltUttakEttBarnPrematurFødsel,m as MorDeltUttakEttBarnTermin,D as MorDeltUttakFarSøkteMorsKvoteOgFellesperiode,f as MorDeltUttakTvillingerFødt,c as MorSøkerAdopsjonTreBarnFraUtlandetFør1Okt2021Dekningsgrad80,P as MorSøkerFarHarRettIEØSTerminDekningsgrad80,cr as __namedExportsOrder,vr as default};
