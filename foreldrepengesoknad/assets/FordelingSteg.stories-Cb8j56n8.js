import{j as a}from"./Uttaksdagen-DrQ0Oxxl.js";import{a as ve}from"./chunk-454WOBUV-CM0pFb8Z.js";import{A as Me}from"./AxiosMock-DWv_wXoA.js";import{B as e,M as _e,F as be,C as s}from"./FpDataContext-BW_0HfWx.js";import{b as n,D as r,S as he}from"./useFpNavigator-rsQS18v_.js";import"./dateFormValidation-DXkRFCUV.js";import"./index-BP8_t0zE.js";import{i as Ke}from"./ErrorSummaryHookForm-1nFoirfj.js";import{F as Le}from"./getStønadskontoParams-TV38I1Xt.js";import{F as Re}from"./FordelingSteg-DaAYwJvg.js";import"./v4-CQkTLCs1.js";import"./index-DkNKrNHd.js";import"./apiInterceptor-BCtLUnPl.js";import"./Label-Uwu7Pz6v.js";import"./iframe-qjwadSKR.js";import"../sb-preview/runtime.js";import"./Modal-Bbx7_2or.js";import"./index-BVEwUaSm.js";import"./useMergeRefs-DNxXm0No.js";import"./Link-BaYazeYY.js";import"./index-Snk9MO9S.js";import"./_baseAssignValue-DljJpCQy.js";import"./_overArg-DqZhcJg_.js";import"./barnUtils-CwWCeo2u.js";import"./eksisterendeSakUtils-BoCmg3dy.js";import"./guid-CsArkN6i.js";import"./stønadskontoerUtils-CP2VbeXw.js";import"./numberFormValidation-D4iWMYX4.js";import"./isString-BF6_4NA2.js";import"./ExpansionCard-B0Uu_XwO.js";import"./BabyWrapped-D5KQAWQI.js";const xe="/rest/innsyn/v2/annenPartVedtak",We="/rest/konto",Je={dekningsgrad:"HUNDRE",perioder:[{fom:"2024-02-07",tom:"2024-02-19",kontoType:"MØDREKVOTE",overføringÅrsak:"INSTITUSJONSOPPHOLD_ANNEN_FORELDER",resultat:{innvilget:!0,trekkerMinsterett:!1,trekkerDager:!0,årsak:"ANNET"}},{fom:"2024-06-11",tom:"2024-06-30",kontoType:"FELLESPERIODE",resultat:{innvilget:!0,trekkerMinsterett:!1,trekkerDager:!0,årsak:"ANNET"}}]},Ve={dekningsgrad:"HUNDRE",perioder:[{fom:"2024-07-07",tom:"2024-07-24",kontoType:"FEDREKVOTE",overføringÅrsak:"INSTITUSJONSOPPHOLD_ANNEN_FORELDER",resultat:{innvilget:!0,trekkerMinsterett:!1,trekkerDager:!0,årsak:"ANNET"}},{fom:"2024-08-11",tom:"2024-08-12",kontoType:"FELLESPERIODE",resultat:{innvilget:!0,trekkerMinsterett:!1,trekkerDager:!0,årsak:"ANNET"}}]},o={fnr:"19047815714",fornavn:"Hanne",etternavn:"Mygg",kjønn:"K",fødselsdato:"1978-04-19"},t={fnr:"19047815715",fornavn:"Hans",etternavn:"Mygg",kjønn:"M",fødselsdato:"1972-06-07"},Ce=()=>(...b)=>(ve("button-click")(...b),Promise.resolve()),Ge=({mellomlagreSøknadOgNaviger:b=Ce(),avbrytSøknad:Oe=ve("button-click"),gåTilNesteSide:ce,søker:Se,søkersituasjon:Ee,annenForelder:Ne,barnet:De,stønadskonto100:ye,stønadskonto80:je,annenPartVedtak:Ue,dekningsgrad:Ie,arbeidsforhold:Be=[]})=>{Ke();const Pe=ye||{kontoer:{},minsteretter:{}},Ae=je||{kontoer:{},minsteretter:{}},He=h=>{h.onPost(xe).replyOnce(200,Ue),h.onPost(We).replyOnce(200,{80:Ae,100:Pe})};return a.jsx(_e,{initialEntries:[he.FORDELING],children:a.jsx(Me,{mock:He,children:a.jsx(Le,{children:a.jsx(be,{onDispatch:ce,initialState:{[s.SØKERSITUASJON]:Ee,[s.OM_BARNET]:De,[s.ARBEIDSFORHOLD_OG_INNTEKT]:{harHattAndreInntektskilder:!1,harJobbetSomFrilans:!1,harJobbetSomSelvstendigNæringsdrivende:!1},[s.ANNEN_FORELDER]:Ne,[s.PERIODE_MED_FORELDREPENGER]:{dekningsgrad:Ie}},children:a.jsx(Re,{arbeidsforhold:Be,søker:Se,mellomlagreSøknadOgNaviger:b,avbrytSøknad:Oe})})})})})},Er={title:"steps/FordelingSteg",component:Re,render:Ge},d={args:{søker:o,erAleneOmOmsorg:!0,søkersituasjon:{situasjon:"fødsel",rolle:"mor"},barnet:{type:e.FØDT,fødselsdatoer:["2021-09-21"],antallBarn:1,termindato:"2021-09-24"},annenForelder:{fornavn:"Hans",etternavn:"Utvikler",kanIkkeOppgis:!1,erAleneOmOmsorg:!0,datoForAleneomsorg:"2021-09-21"},stønadskonto100:void 0,stønadskonto80:{kontoer:[{konto:n.Foreldrepenger,dager:280},{konto:n.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},dekningsgrad:r.ÅTTI_PROSENT}},k={args:{søker:o,erAleneOmOmsorg:!0,søkersituasjon:{situasjon:"fødsel",rolle:"mor"},barnet:{type:e.FØDT,fødselsdatoer:["2023-09-21"],antallBarn:1,termindato:"2023-12-20"},annenForelder:{fornavn:"Hans",etternavn:"Utvikler",erAleneOmOmsorg:!0,datoForAleneomsorg:"2023-09-21",kanIkkeOppgis:!1},stønadskonto100:{kontoer:[{konto:n.Foreldrepenger,dager:294},{konto:n.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:10,toTette:0},tillegg:{prematur:64,flerbarn:0}},stønadskonto80:void 0,dekningsgrad:r.HUNDRE_PROSENT}},l={args:{søker:o,erAleneOmOmsorg:!0,søkersituasjon:{situasjon:"adopsjon",rolle:"mor"},barnet:{type:e.ADOPTERT_STEBARN,fødselsdatoer:["2024-02-21"],antallBarn:3,adopsjonsdato:"2024-02-21"},annenForelder:{kanIkkeOppgis:!0},stønadskonto80:void 0,stønadskonto100:{kontoer:[{konto:n.Foreldrepenger,dager:460}],minsteretter:{farRundtFødsel:0,toTette:0}},dekningsgrad:r.HUNDRE_PROSENT}},g={args:{søker:t,erAleneOmOmsorg:!0,søkersituasjon:{situasjon:"fødsel",rolle:"far"},barnet:{type:e.FØDT,fødselsdatoer:["2023-09-21"],antallBarn:2,termindato:"2023-09-21"},annenForelder:{fornavn:"Hanne",etternavn:"Utvikler",erAleneOmOmsorg:!0,datoForAleneomsorg:"2023-09-23",kanIkkeOppgis:!1},stønadskonto100:{kontoer:[{konto:n.Foreldrepenger,dager:385}],minsteretter:{farRundtFødsel:10,toTette:0}},stønadskonto80:void 0,dekningsgrad:r.HUNDRE_PROSENT}},i={args:{søker:t,erAleneOmOmsorg:!0,søkersituasjon:{situasjon:"fødsel",rolle:"far"},barnet:{type:e.FØDT,fødselsdatoer:["2021-09-21"],antallBarn:4,termindato:"2021-09-21"},annenForelder:{fornavn:"Hanne",etternavn:"Utvikler",erAleneOmOmsorg:!0,datoForAleneomsorg:"2021-09-21",kanIkkeOppgis:!1},stønadskonto100:{kontoer:[{konto:n.Foreldrepenger,dager:460}],minsteretter:{farRundtFødsel:0,toTette:0}},stønadskonto80:void 0,dekningsgrad:r.HUNDRE_PROSENT}},p={args:{søker:t,erAleneOmOmsorg:!0,søkersituasjon:{situasjon:"fødsel",rolle:"far"},barnet:{type:e.FØDT,fødselsdatoer:["2022-07-21"],antallBarn:3,termindato:"2022-07-21"},annenForelder:{fornavn:"Hanne",etternavn:"Utvikler",erAleneOmOmsorg:!0,datoForAleneomsorg:"2022-09-21",kanIkkeOppgis:!1},stønadskonto100:{kontoer:[{konto:n.Foreldrepenger,dager:460}],minsteretter:{farRundtFødsel:0,toTette:0}},stønadskonto80:void 0,dekningsgrad:r.HUNDRE_PROSENT}},F={args:{søker:t,erAleneOmOmsorg:!0,søkersituasjon:{situasjon:"fødsel",rolle:"far"},barnet:{type:e.UFØDT,antallBarn:3,termindato:"2024-07-21"},annenForelder:{erAleneOmOmsorg:!0,fornavn:"Hanne",etternavn:"Utvikler",datoForAleneomsorg:"2024-09-21",kanIkkeOppgis:!1},stønadskonto100:{kontoer:[{konto:n.Foreldrepenger,dager:230}],minsteretter:{farRundtFødsel:10,toTette:0}},stønadskonto80:void 0,dekningsgrad:r.HUNDRE_PROSENT}},f={args:{søker:t,erAleneOmOmsorg:!0,søkersituasjon:{situasjon:"fødsel",rolle:"far"},barnet:{type:e.FØDT,antallBarn:1,fødselsdatoer:["2024-01-21"],termindato:"2024-04-21"},annenForelder:{fornavn:"Hanne",etternavn:"Utvikler",erAleneOmOmsorg:!0,datoForAleneomsorg:"2024-01-21",kanIkkeOppgis:!1},stønadskonto100:{kontoer:[{konto:n.Foreldrepenger,dager:273}],minsteretter:{farRundtFødsel:0,toTette:0},tillegg:{prematur:64,flerbarn:0}},stønadskonto80:void 0,dekningsgrad:r.HUNDRE_PROSENT}},m={args:{søker:t,erAleneOmOmsorg:!0,søkersituasjon:{situasjon:"adopsjon",rolle:"far"},barnet:{type:e.ADOPTERT_ANNET_BARN,fødselsdatoer:["2021-08-21"],antallBarn:4,adopsjonsdato:"2021-08-23"},annenForelder:{fornavn:"Hanne",etternavn:"Utvikler",erAleneOmOmsorg:!0,datoForAleneomsorg:"2024-01-21",kanIkkeOppgis:!1},stønadskonto100:{kontoer:[{konto:n.Foreldrepenger,dager:460}],minsteretter:{farRundtFødsel:0,toTette:0}},stønadskonto80:void 0,dekningsgrad:r.HUNDRE_PROSENT}},u={args:{søker:o,søkersituasjon:{situasjon:"fødsel",rolle:"mor"},barnet:{type:e.FØDT,fødselsdatoer:["2023-09-21"],antallBarn:1,termindato:"2023-12-21"},annenForelder:{fornavn:"Hans",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1},stønadskonto100:{kontoer:[{konto:n.Mødrekvote,dager:75},{konto:n.Fedrekvote,dager:75},{konto:n.Fellesperiode,dager:100},{konto:n.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:10,toTette:0},tillegg:{prematur:65,flerbarn:0}},stønadskonto80:void 0,dekningsgrad:r.HUNDRE_PROSENT}},T={args:{søker:o,søkersituasjon:{situasjon:"fødsel",rolle:"mor"},barnet:{type:e.UFØDT,antallBarn:1,termindato:"2024-08-21"},annenForelder:{fornavn:"Petter",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1},stønadskonto80:{kontoer:[{konto:n.Mødrekvote,dager:95},{konto:n.Fedrekvote,dager:95},{konto:n.Fellesperiode,dager:101},{konto:n.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:10,toTette:0},tillegg:{prematur:0,flerbarn:0}},stønadskonto100:void 0,dekningsgrad:r.ÅTTI_PROSENT}},v={args:{søker:o,søkersituasjon:{situasjon:"fødsel",rolle:"mor"},barnet:{type:e.UFØDT,antallBarn:1,termindato:"2024-06-21"},annenForelder:{fornavn:"Hans",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1},stønadskonto100:{kontoer:[{konto:n.Mødrekvote,dager:75},{konto:n.Fedrekvote,dager:75},{konto:n.Fellesperiode,dager:80},{konto:n.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:10,toTette:0}},stønadskonto80:void 0,dekningsgrad:r.HUNDRE_PROSENT}},R={args:{søker:o,søkersituasjon:{situasjon:"fødsel",rolle:"mor"},barnet:{type:e.FØDT,antallBarn:2,fødselsdatoer:["2024-02-21"],termindato:"2024-02-21"},annenForelder:{fornavn:"Hans",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1},stønadskonto100:{kontoer:[{konto:n.Mødrekvote,dager:75},{konto:n.Fedrekvote,dager:75},{konto:n.Fellesperiode,dager:165},{konto:n.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:10,toTette:0},tillegg:{prematur:0,flerbarn:85}},stønadskonto80:void 0,dekningsgrad:r.HUNDRE_PROSENT}},O={args:{søker:o,søkersituasjon:{situasjon:"fødsel",rolle:"mor"},barnet:{type:e.UFØDT,antallBarn:1,termindato:"2024-07-21"},annenForelder:{fornavn:"Hans",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1},stønadskonto100:{kontoer:[{konto:n.Mødrekvote,dager:75},{konto:n.Fedrekvote,dager:75},{konto:n.Fellesperiode,dager:80},{konto:n.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:10,toTette:0}},stønadskonto80:void 0,dekningsgrad:r.HUNDRE_PROSENT,annenPartVedtak:Je}},c={args:{søker:t,søkersituasjon:{situasjon:"fødsel",rolle:"far"},barnet:{type:e.FØDT,antallBarn:1,fødselsdatoer:["2021-07-21"],termindato:"2021-07-21"},annenForelder:{fornavn:"Hanne",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1},stønadskonto100:{kontoer:[{konto:n.Mødrekvote,dager:75},{konto:n.Fedrekvote,dager:75},{konto:n.Fellesperiode,dager:80},{konto:n.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},stønadskonto80:void 0,dekningsgrad:r.HUNDRE_PROSENT}},S={args:{søker:t,søkersituasjon:{situasjon:"fødsel",rolle:"far"},barnet:{type:e.FØDT,antallBarn:3,fødselsdatoer:["2022-07-21"],termindato:"2022-07-21"},annenForelder:{fornavn:"Hanne",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1},stønadskonto100:{kontoer:[{konto:n.Mødrekvote,dager:75},{konto:n.Fedrekvote,dager:75},{konto:n.Fellesperiode,dager:370},{konto:n.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0},tillegg:{prematur:0,flerbarn:230}},stønadskonto80:void 0,dekningsgrad:r.HUNDRE_PROSENT}},E={args:{søker:t,søkersituasjon:{situasjon:"fødsel",rolle:"far"},barnet:{type:e.UFØDT,antallBarn:4,termindato:"2024-07-21"},annenForelder:{fornavn:"Hanne",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1},stønadskonto100:{kontoer:[{konto:n.Mødrekvote,dager:75},{konto:n.Fedrekvote,dager:75},{konto:n.Fellesperiode,dager:370},{konto:n.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:10,toTette:0}},stønadskonto80:void 0,dekningsgrad:r.HUNDRE_PROSENT}},N={args:{søker:t,søkersituasjon:{situasjon:"fødsel",rolle:"far"},barnet:{type:e.FØDT,antallBarn:1,fødselsdatoer:["2024-02-21"],termindato:"2024-05-21"},annenForelder:{fornavn:"Hanne",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1},stønadskonto100:{kontoer:[{konto:n.Mødrekvote,dager:75},{konto:n.Fedrekvote,dager:75},{konto:n.Fellesperiode,dager:100},{konto:n.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:10,toTette:0},tillegg:{flerbarn:0,prematur:64}},stønadskonto80:void 0,dekningsgrad:r.HUNDRE_PROSENT}},D={args:{søker:t,søkersituasjon:{situasjon:"fødsel",rolle:"far"},barnet:{type:e.FØDT,antallBarn:1,fødselsdatoer:["2024-02-21"],termindato:"2024-02-21"},annenForelder:{fornavn:"Hanne",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1},stønadskonto100:{kontoer:[{konto:n.Mødrekvote,dager:75},{konto:n.Fedrekvote,dager:75},{konto:n.Fellesperiode,dager:80},{konto:n.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:10,toTette:0}},stønadskonto80:void 0,dekningsgrad:r.HUNDRE_PROSENT,annenPartVedtak:Ve}},y={args:{søker:t,søkersituasjon:{situasjon:"adopsjon",rolle:"far"},barnet:{type:e.ADOPTERT_STEBARN,antallBarn:2,fødselsdatoer:["2024-02-21"],adopsjonsdato:"2024-02-21"},annenForelder:{fornavn:"Hanne",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1},stønadskonto100:{kontoer:[{konto:n.Mødrekvote,dager:95},{konto:n.Fedrekvote,dager:95},{konto:n.Fellesperiode,dager:90}],minsteretter:{farRundtFødsel:0,toTette:0}},stønadskonto80:void 0,dekningsgrad:r.HUNDRE_PROSENT}},j={args:{søker:t,søkersituasjon:{situasjon:"adopsjon",rolle:"mor"},barnet:{type:e.ADOPTERT_ANNET_BARN,antallBarn:3,fødselsdatoer:["2021-02-21"],adopsjonsdato:"2021-02-21",ankomstdato:"2021-05-21"},annenForelder:{fornavn:"Hans",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1},stønadskonto100:void 0,stønadskonto80:{kontoer:[{konto:n.Mødrekvote,dager:95},{konto:n.Fedrekvote,dager:95},{konto:n.Fellesperiode,dager:370}],minsteretter:{farRundtFødsel:0,toTette:0}},dekningsgrad:r.ÅTTI_PROSENT}},U={args:{søker:o,søkersituasjon:{situasjon:"fødsel",rolle:"mor"},barnet:{type:e.UFØDT,antallBarn:1,termindato:"2024-07-21"},annenForelder:{fornavn:"Hans",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!1,harOppholdtSegIEØS:!0,harRettPåForeldrepengerIEØS:!0,kanIkkeOppgis:!1},stønadskonto100:void 0,stønadskonto80:{kontoer:[{konto:n.Mødrekvote,dager:95},{konto:n.Fedrekvote,dager:95},{konto:n.Fellesperiode,dager:90},{konto:n.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:10,toTette:0}},dekningsgrad:r.ÅTTI_PROSENT}},I={args:{søker:t,søkersituasjon:{situasjon:"adopsjon",rolle:"far"},barnet:{type:e.ADOPTERT_STEBARN,antallBarn:1,adopsjonsdato:"2024-02-21",fødselsdatoer:["2024-02-21"]},annenForelder:{fornavn:"Hanne",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!1,harOppholdtSegIEØS:!0,harRettPåForeldrepengerIEØS:!0,kanIkkeOppgis:!1},stønadskonto100:{kontoer:[{konto:n.Mødrekvote,dager:95},{konto:n.Fedrekvote,dager:95},{konto:n.Fellesperiode,dager:90}],minsteretter:{farRundtFødsel:0,toTette:0}},stønadskonto80:void 0,dekningsgrad:r.HUNDRE_PROSENT}},B={args:{søker:o,søkersituasjon:{situasjon:"fødsel",rolle:"mor"},barnet:{type:e.UFØDT,antallBarn:1,termindato:"2024-07-21"},annenForelder:{fornavn:"Hans",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!1,kanIkkeOppgis:!1},stønadskonto100:{kontoer:[{konto:n.Foreldrepenger,dager:230}],minsteretter:{farRundtFødsel:15,toTette:0}},stønadskonto80:void 0,dekningsgrad:r.HUNDRE_PROSENT}},P={args:{søker:o,søkersituasjon:{situasjon:"adopsjon",rolle:"mor"},barnet:{type:e.ADOPTERT_ANNET_BARN,antallBarn:1,adopsjonsdato:"2022-08-21",fødselsdatoer:["2022-01-01"]},annenForelder:{fornavn:"Hans",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!1,kanIkkeOppgis:!1},stønadskonto100:{kontoer:[{konto:n.Foreldrepenger,dager:230}],minsteretter:{farRundtFødsel:0,toTette:0}},stønadskonto80:void 0,dekningsgrad:r.HUNDRE_PROSENT}},A={args:{søker:t,søkersituasjon:{situasjon:"fødsel",rolle:"far"},barnet:{type:e.UFØDT,antallBarn:4,termindato:"2024-07-21"},annenForelder:{fornavn:"Hanne",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!1,kanIkkeOppgis:!1,erMorUfør:!0},stønadskonto100:{kontoer:[{konto:n.Foreldrepenger,dager:155},{konto:n.AktivitetsfriKvote,dager:375}],minsteretter:{farRundtFødsel:10,toTette:0}},stønadskonto80:void 0,dekningsgrad:r.HUNDRE_PROSENT}},H={args:{søker:t,søkersituasjon:{situasjon:"fødsel",rolle:"far"},barnet:{type:e.FØDT,antallBarn:1,fødselsdatoer:["2024-01-21"],termindato:"2024-01-21"},annenForelder:{fornavn:"Hanne",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!1,kanIkkeOppgis:!1,erMorUfør:!1},stønadskonto100:{kontoer:[{konto:n.Foreldrepenger,dager:210},{konto:n.AktivitetsfriKvote,dager:40}],minsteretter:{farRundtFødsel:10,toTette:0}},stønadskonto80:void 0,dekningsgrad:r.HUNDRE_PROSENT}},M={args:{søker:t,søkersituasjon:{situasjon:"fødsel",rolle:"far"},barnet:{type:e.FØDT,antallBarn:2,fødselsdatoer:["2021-07-21"],termindato:"2021-07-21"},annenForelder:{fornavn:"Hanne",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!1,kanIkkeOppgis:!1,erMorUfør:!0},stønadskonto100:{kontoer:[{konto:n.Foreldrepenger,dager:285}],minsteretter:{farRundtFødsel:0,toTette:0}},stønadskonto80:void 0,dekningsgrad:r.HUNDRE_PROSENT}},_={args:{søker:t,søkersituasjon:{situasjon:"adopsjon",rolle:"far"},barnet:{type:e.ADOPTERT_STEBARN,antallBarn:1,fødselsdatoer:["2024-02-21"],adopsjonsdato:"2024-02-21"},annenForelder:{fornavn:"Hanne",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!1,erMorUfør:!0,kanIkkeOppgis:!1},stønadskonto100:{kontoer:[{konto:n.Foreldrepenger,dager:125},{konto:n.AktivitetsfriKvote,dager:75}],minsteretter:{farRundtFødsel:10,toTette:0}},stønadskonto80:void 0,dekningsgrad:r.HUNDRE_PROSENT}};var K,L,x;d.parameters={...d.parameters,docs:{...(K=d.parameters)==null?void 0:K.docs,source:{originalSource:`{
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
      kontoer: [{
        konto: StønadskontoType.Foreldrepenger,
        dager: 280
      }, {
        konto: StønadskontoType.ForeldrepengerFørFødsel,
        dager: 15
      }],
      minsteretter: {
        farRundtFødsel: 0,
        toTette: 0
      }
    },
    dekningsgrad: Dekningsgrad.ÅTTI_PROSENT
  }
}`,...(x=(L=d.parameters)==null?void 0:L.docs)==null?void 0:x.source}}};var W,J,V;k.parameters={...k.parameters,docs:{...(W=k.parameters)==null?void 0:W.docs,source:{originalSource:`{
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
      kontoer: [{
        konto: StønadskontoType.Foreldrepenger,
        dager: 294
      }, {
        konto: StønadskontoType.ForeldrepengerFørFødsel,
        dager: 15
      }],
      minsteretter: {
        farRundtFødsel: 10,
        toTette: 0
      },
      tillegg: {
        prematur: 64,
        flerbarn: 0
      }
    },
    stønadskonto80: undefined,
    dekningsgrad: Dekningsgrad.HUNDRE_PROSENT
  }
}`,...(V=(J=k.parameters)==null?void 0:J.docs)==null?void 0:V.source}}};var C,G,q;l.parameters={...l.parameters,docs:{...(C=l.parameters)==null?void 0:C.docs,source:{originalSource:`{
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
      kontoer: [{
        konto: StønadskontoType.Foreldrepenger,
        dager: 460
      }],
      minsteretter: {
        farRundtFødsel: 0,
        toTette: 0
      }
    },
    dekningsgrad: Dekningsgrad.HUNDRE_PROSENT
  }
}`,...(q=(G=l.parameters)==null?void 0:G.docs)==null?void 0:q.source}}};var w,z,Q;g.parameters={...g.parameters,docs:{...(w=g.parameters)==null?void 0:w.docs,source:{originalSource:`{
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
      kontoer: [{
        konto: StønadskontoType.Foreldrepenger,
        dager: 385
      }],
      minsteretter: {
        farRundtFødsel: 10,
        toTette: 0
      }
    },
    stønadskonto80: undefined,
    dekningsgrad: Dekningsgrad.HUNDRE_PROSENT
  }
}`,...(Q=(z=g.parameters)==null?void 0:z.docs)==null?void 0:Q.source}}};var X,Y,Z;i.parameters={...i.parameters,docs:{...(X=i.parameters)==null?void 0:X.docs,source:{originalSource:`{
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
      kontoer: [{
        konto: StønadskontoType.Foreldrepenger,
        dager: 460
      }],
      minsteretter: {
        farRundtFødsel: 0,
        toTette: 0
      }
    },
    stønadskonto80: undefined,
    dekningsgrad: Dekningsgrad.HUNDRE_PROSENT
  }
}`,...(Z=(Y=i.parameters)==null?void 0:Y.docs)==null?void 0:Z.source}}};var $,nn,en;p.parameters={...p.parameters,docs:{...($=p.parameters)==null?void 0:$.docs,source:{originalSource:`{
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
      kontoer: [{
        konto: StønadskontoType.Foreldrepenger,
        dager: 460
      }],
      minsteretter: {
        farRundtFødsel: 0,
        toTette: 0
      }
    },
    stønadskonto80: undefined,
    dekningsgrad: Dekningsgrad.HUNDRE_PROSENT
  }
}`,...(en=(nn=p.parameters)==null?void 0:nn.docs)==null?void 0:en.source}}};var rn,tn,on;F.parameters={...F.parameters,docs:{...(rn=F.parameters)==null?void 0:rn.docs,source:{originalSource:`{
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
      kontoer: [{
        konto: StønadskontoType.Foreldrepenger,
        dager: 230
      }],
      minsteretter: {
        farRundtFødsel: 10,
        toTette: 0
      }
    },
    stønadskonto80: undefined,
    dekningsgrad: Dekningsgrad.HUNDRE_PROSENT
  }
}`,...(on=(tn=F.parameters)==null?void 0:tn.docs)==null?void 0:on.source}}};var an,sn,dn;f.parameters={...f.parameters,docs:{...(an=f.parameters)==null?void 0:an.docs,source:{originalSource:`{
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
      kontoer: [{
        konto: StønadskontoType.Foreldrepenger,
        dager: 273
      }],
      minsteretter: {
        farRundtFødsel: 0,
        toTette: 0
      },
      tillegg: {
        prematur: 64,
        flerbarn: 0
      }
    },
    stønadskonto80: undefined,
    dekningsgrad: Dekningsgrad.HUNDRE_PROSENT
  }
}`,...(dn=(sn=f.parameters)==null?void 0:sn.docs)==null?void 0:dn.source}}};var kn,ln,gn;m.parameters={...m.parameters,docs:{...(kn=m.parameters)==null?void 0:kn.docs,source:{originalSource:`{
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
      kontoer: [{
        konto: StønadskontoType.Foreldrepenger,
        dager: 460
      }],
      minsteretter: {
        farRundtFødsel: 0,
        toTette: 0
      }
    },
    stønadskonto80: undefined,
    dekningsgrad: Dekningsgrad.HUNDRE_PROSENT
  }
}`,...(gn=(ln=m.parameters)==null?void 0:ln.docs)==null?void 0:gn.source}}};var pn,Fn,fn;u.parameters={...u.parameters,docs:{...(pn=u.parameters)==null?void 0:pn.docs,source:{originalSource:`{
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
      kontoer: [{
        konto: StønadskontoType.Mødrekvote,
        dager: 75
      }, {
        konto: StønadskontoType.Fedrekvote,
        dager: 75
      }, {
        konto: StønadskontoType.Fellesperiode,
        dager: 100
      }, {
        konto: StønadskontoType.ForeldrepengerFørFødsel,
        dager: 15
      }],
      minsteretter: {
        farRundtFødsel: 10,
        toTette: 0
      },
      tillegg: {
        prematur: 65,
        flerbarn: 0
      }
    },
    stønadskonto80: undefined,
    dekningsgrad: Dekningsgrad.HUNDRE_PROSENT
  }
}`,...(fn=(Fn=u.parameters)==null?void 0:Fn.docs)==null?void 0:fn.source}}};var mn,un,Tn;T.parameters={...T.parameters,docs:{...(mn=T.parameters)==null?void 0:mn.docs,source:{originalSource:`{
  args: {
    søker: søkerInfoKvinne,
    søkersituasjon: {
      situasjon: 'fødsel',
      rolle: 'mor'
    },
    barnet: {
      type: BarnType.UFØDT,
      antallBarn: 1,
      termindato: '2024-08-21'
    },
    annenForelder: {
      fornavn: 'Petter',
      etternavn: 'Utvikler',
      fnr: '1212121313',
      harRettPåForeldrepengerINorge: true,
      kanIkkeOppgis: false
    },
    stønadskonto80: {
      kontoer: [{
        konto: StønadskontoType.Mødrekvote,
        dager: 95
      }, {
        konto: StønadskontoType.Fedrekvote,
        dager: 95
      }, {
        konto: StønadskontoType.Fellesperiode,
        dager: 101
      }, {
        konto: StønadskontoType.ForeldrepengerFørFødsel,
        dager: 15
      }],
      minsteretter: {
        farRundtFødsel: 10,
        toTette: 0
      },
      tillegg: {
        prematur: 0,
        flerbarn: 0
      }
    },
    stønadskonto100: undefined,
    dekningsgrad: Dekningsgrad.ÅTTI_PROSENT
  }
}`,...(Tn=(un=T.parameters)==null?void 0:un.docs)==null?void 0:Tn.source}}};var vn,Rn,On;v.parameters={...v.parameters,docs:{...(vn=v.parameters)==null?void 0:vn.docs,source:{originalSource:`{
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
      kontoer: [{
        konto: StønadskontoType.Mødrekvote,
        dager: 75
      }, {
        konto: StønadskontoType.Fedrekvote,
        dager: 75
      }, {
        konto: StønadskontoType.Fellesperiode,
        dager: 80
      }, {
        konto: StønadskontoType.ForeldrepengerFørFødsel,
        dager: 15
      }],
      minsteretter: {
        farRundtFødsel: 10,
        toTette: 0
      }
    },
    stønadskonto80: undefined,
    dekningsgrad: Dekningsgrad.HUNDRE_PROSENT
  }
}`,...(On=(Rn=v.parameters)==null?void 0:Rn.docs)==null?void 0:On.source}}};var cn,Sn,En;R.parameters={...R.parameters,docs:{...(cn=R.parameters)==null?void 0:cn.docs,source:{originalSource:`{
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
      kontoer: [{
        konto: StønadskontoType.Mødrekvote,
        dager: 75
      }, {
        konto: StønadskontoType.Fedrekvote,
        dager: 75
      }, {
        konto: StønadskontoType.Fellesperiode,
        dager: 165
      }, {
        konto: StønadskontoType.ForeldrepengerFørFødsel,
        dager: 15
      }],
      minsteretter: {
        farRundtFødsel: 10,
        toTette: 0
      },
      tillegg: {
        prematur: 0,
        flerbarn: 85
      }
    },
    stønadskonto80: undefined,
    dekningsgrad: Dekningsgrad.HUNDRE_PROSENT
  }
}`,...(En=(Sn=R.parameters)==null?void 0:Sn.docs)==null?void 0:En.source}}};var Nn,Dn,yn;O.parameters={...O.parameters,docs:{...(Nn=O.parameters)==null?void 0:Nn.docs,source:{originalSource:`{
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
      kontoer: [{
        konto: StønadskontoType.Mødrekvote,
        dager: 75
      }, {
        konto: StønadskontoType.Fedrekvote,
        dager: 75
      }, {
        konto: StønadskontoType.Fellesperiode,
        dager: 80
      }, {
        konto: StønadskontoType.ForeldrepengerFørFødsel,
        dager: 15
      }],
      minsteretter: {
        farRundtFødsel: 10,
        toTette: 0
      }
    },
    stønadskonto80: undefined,
    dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
    annenPartVedtak: vedtakFar
  }
}`,...(yn=(Dn=O.parameters)==null?void 0:Dn.docs)==null?void 0:yn.source}}};var jn,Un,In;c.parameters={...c.parameters,docs:{...(jn=c.parameters)==null?void 0:jn.docs,source:{originalSource:`{
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
      kontoer: [{
        konto: StønadskontoType.Mødrekvote,
        dager: 75
      }, {
        konto: StønadskontoType.Fedrekvote,
        dager: 75
      }, {
        konto: StønadskontoType.Fellesperiode,
        dager: 80
      }, {
        konto: StønadskontoType.ForeldrepengerFørFødsel,
        dager: 15
      }],
      minsteretter: {
        farRundtFødsel: 0,
        toTette: 0
      }
    },
    stønadskonto80: undefined,
    dekningsgrad: Dekningsgrad.HUNDRE_PROSENT
  }
}`,...(In=(Un=c.parameters)==null?void 0:Un.docs)==null?void 0:In.source}}};var Bn,Pn,An;S.parameters={...S.parameters,docs:{...(Bn=S.parameters)==null?void 0:Bn.docs,source:{originalSource:`{
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
      kontoer: [{
        konto: StønadskontoType.Mødrekvote,
        dager: 75
      }, {
        konto: StønadskontoType.Fedrekvote,
        dager: 75
      }, {
        konto: StønadskontoType.Fellesperiode,
        dager: 370
      }, {
        konto: StønadskontoType.ForeldrepengerFørFødsel,
        dager: 15
      }],
      minsteretter: {
        farRundtFødsel: 0,
        toTette: 0
      },
      tillegg: {
        prematur: 0,
        flerbarn: 230
      }
    },
    stønadskonto80: undefined,
    dekningsgrad: Dekningsgrad.HUNDRE_PROSENT
  }
}`,...(An=(Pn=S.parameters)==null?void 0:Pn.docs)==null?void 0:An.source}}};var Hn,Mn,_n;E.parameters={...E.parameters,docs:{...(Hn=E.parameters)==null?void 0:Hn.docs,source:{originalSource:`{
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
      kontoer: [{
        konto: StønadskontoType.Mødrekvote,
        dager: 75
      }, {
        konto: StønadskontoType.Fedrekvote,
        dager: 75
      }, {
        konto: StønadskontoType.Fellesperiode,
        dager: 370
      }, {
        konto: StønadskontoType.ForeldrepengerFørFødsel,
        dager: 15
      }],
      minsteretter: {
        farRundtFødsel: 10,
        toTette: 0
      }
    },
    stønadskonto80: undefined,
    dekningsgrad: Dekningsgrad.HUNDRE_PROSENT
  }
}`,...(_n=(Mn=E.parameters)==null?void 0:Mn.docs)==null?void 0:_n.source}}};var bn,hn,Kn;N.parameters={...N.parameters,docs:{...(bn=N.parameters)==null?void 0:bn.docs,source:{originalSource:`{
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
      kontoer: [{
        konto: StønadskontoType.Mødrekvote,
        dager: 75
      }, {
        konto: StønadskontoType.Fedrekvote,
        dager: 75
      }, {
        konto: StønadskontoType.Fellesperiode,
        dager: 100
      }, {
        konto: StønadskontoType.ForeldrepengerFørFødsel,
        dager: 15
      }],
      minsteretter: {
        farRundtFødsel: 10,
        toTette: 0
      },
      tillegg: {
        flerbarn: 0,
        prematur: 64
      }
    },
    stønadskonto80: undefined,
    dekningsgrad: Dekningsgrad.HUNDRE_PROSENT
  }
}`,...(Kn=(hn=N.parameters)==null?void 0:hn.docs)==null?void 0:Kn.source}}};var Ln,xn,Wn;D.parameters={...D.parameters,docs:{...(Ln=D.parameters)==null?void 0:Ln.docs,source:{originalSource:`{
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
      kontoer: [{
        konto: StønadskontoType.Mødrekvote,
        dager: 75
      }, {
        konto: StønadskontoType.Fedrekvote,
        dager: 75
      }, {
        konto: StønadskontoType.Fellesperiode,
        dager: 80
      }, {
        konto: StønadskontoType.ForeldrepengerFørFødsel,
        dager: 15
      }],
      minsteretter: {
        farRundtFødsel: 10,
        toTette: 0
      }
    },
    stønadskonto80: undefined,
    dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
    annenPartVedtak: vedtakMor
  }
}`,...(Wn=(xn=D.parameters)==null?void 0:xn.docs)==null?void 0:Wn.source}}};var Jn,Vn,Cn;y.parameters={...y.parameters,docs:{...(Jn=y.parameters)==null?void 0:Jn.docs,source:{originalSource:`{
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
      kontoer: [{
        konto: StønadskontoType.Mødrekvote,
        dager: 95
      }, {
        konto: StønadskontoType.Fedrekvote,
        dager: 95
      }, {
        konto: StønadskontoType.Fellesperiode,
        dager: 90
      }],
      minsteretter: {
        farRundtFødsel: 0,
        toTette: 0
      }
    },
    stønadskonto80: undefined,
    dekningsgrad: Dekningsgrad.HUNDRE_PROSENT
  }
}`,...(Cn=(Vn=y.parameters)==null?void 0:Vn.docs)==null?void 0:Cn.source}}};var Gn,qn,wn;j.parameters={...j.parameters,docs:{...(Gn=j.parameters)==null?void 0:Gn.docs,source:{originalSource:`{
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
      kontoer: [{
        konto: StønadskontoType.Mødrekvote,
        dager: 95
      }, {
        konto: StønadskontoType.Fedrekvote,
        dager: 95
      }, {
        konto: StønadskontoType.Fellesperiode,
        dager: 370
      }],
      minsteretter: {
        farRundtFødsel: 0,
        toTette: 0
      }
    },
    dekningsgrad: Dekningsgrad.ÅTTI_PROSENT
  }
}`,...(wn=(qn=j.parameters)==null?void 0:qn.docs)==null?void 0:wn.source}}};var zn,Qn,Xn;U.parameters={...U.parameters,docs:{...(zn=U.parameters)==null?void 0:zn.docs,source:{originalSource:`{
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
      kontoer: [{
        konto: StønadskontoType.Mødrekvote,
        dager: 95
      }, {
        konto: StønadskontoType.Fedrekvote,
        dager: 95
      }, {
        konto: StønadskontoType.Fellesperiode,
        dager: 90
      }, {
        konto: StønadskontoType.ForeldrepengerFørFødsel,
        dager: 15
      }],
      minsteretter: {
        farRundtFødsel: 10,
        toTette: 0
      }
    },
    dekningsgrad: Dekningsgrad.ÅTTI_PROSENT
  }
}`,...(Xn=(Qn=U.parameters)==null?void 0:Qn.docs)==null?void 0:Xn.source}}};var Yn,Zn,$n;I.parameters={...I.parameters,docs:{...(Yn=I.parameters)==null?void 0:Yn.docs,source:{originalSource:`{
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
      kontoer: [{
        konto: StønadskontoType.Mødrekvote,
        dager: 95
      }, {
        konto: StønadskontoType.Fedrekvote,
        dager: 95
      }, {
        konto: StønadskontoType.Fellesperiode,
        dager: 90
      }],
      minsteretter: {
        farRundtFødsel: 0,
        toTette: 0
      }
    },
    stønadskonto80: undefined,
    dekningsgrad: Dekningsgrad.HUNDRE_PROSENT
  }
}`,...($n=(Zn=I.parameters)==null?void 0:Zn.docs)==null?void 0:$n.source}}};var ne,ee,re;B.parameters={...B.parameters,docs:{...(ne=B.parameters)==null?void 0:ne.docs,source:{originalSource:`{
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
      kontoer: [{
        konto: StønadskontoType.Foreldrepenger,
        dager: 230
      }],
      minsteretter: {
        farRundtFødsel: 15,
        toTette: 0
      }
    },
    stønadskonto80: undefined,
    dekningsgrad: Dekningsgrad.HUNDRE_PROSENT
  }
}`,...(re=(ee=B.parameters)==null?void 0:ee.docs)==null?void 0:re.source}}};var te,oe,ae;P.parameters={...P.parameters,docs:{...(te=P.parameters)==null?void 0:te.docs,source:{originalSource:`{
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
      kontoer: [{
        konto: StønadskontoType.Foreldrepenger,
        dager: 230
      }],
      minsteretter: {
        farRundtFødsel: 0,
        toTette: 0
      }
    },
    stønadskonto80: undefined,
    dekningsgrad: Dekningsgrad.HUNDRE_PROSENT
  }
}`,...(ae=(oe=P.parameters)==null?void 0:oe.docs)==null?void 0:ae.source}}};var se,de,ke;A.parameters={...A.parameters,docs:{...(se=A.parameters)==null?void 0:se.docs,source:{originalSource:`{
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
      kontoer: [{
        konto: StønadskontoType.Foreldrepenger,
        dager: 155
      }, {
        konto: StønadskontoType.AktivitetsfriKvote,
        dager: 375
      }],
      minsteretter: {
        farRundtFødsel: 10,
        toTette: 0
      }
    },
    stønadskonto80: undefined,
    dekningsgrad: Dekningsgrad.HUNDRE_PROSENT
  }
}`,...(ke=(de=A.parameters)==null?void 0:de.docs)==null?void 0:ke.source}}};var le,ge,ie;H.parameters={...H.parameters,docs:{...(le=H.parameters)==null?void 0:le.docs,source:{originalSource:`{
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
      kontoer: [{
        konto: StønadskontoType.Foreldrepenger,
        dager: 210
      }, {
        konto: StønadskontoType.AktivitetsfriKvote,
        dager: 40
      }],
      minsteretter: {
        farRundtFødsel: 10,
        toTette: 0
      }
    },
    stønadskonto80: undefined,
    dekningsgrad: Dekningsgrad.HUNDRE_PROSENT
  }
}`,...(ie=(ge=H.parameters)==null?void 0:ge.docs)==null?void 0:ie.source}}};var pe,Fe,fe;M.parameters={...M.parameters,docs:{...(pe=M.parameters)==null?void 0:pe.docs,source:{originalSource:`{
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
      kontoer: [{
        konto: StønadskontoType.Foreldrepenger,
        dager: 285
      }],
      minsteretter: {
        farRundtFødsel: 0,
        toTette: 0
      }
    },
    stønadskonto80: undefined,
    dekningsgrad: Dekningsgrad.HUNDRE_PROSENT
  }
}`,...(fe=(Fe=M.parameters)==null?void 0:Fe.docs)==null?void 0:fe.source}}};var me,ue,Te;_.parameters={..._.parameters,docs:{...(me=_.parameters)==null?void 0:me.docs,source:{originalSource:`{
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
      kontoer: [{
        konto: StønadskontoType.Foreldrepenger,
        dager: 125
      }, {
        konto: StønadskontoType.AktivitetsfriKvote,
        dager: 75
      }],
      minsteretter: {
        farRundtFødsel: 10,
        toTette: 0
      }
    },
    stønadskonto80: undefined,
    dekningsgrad: Dekningsgrad.HUNDRE_PROSENT
  }
}`,...(Te=(ue=_.parameters)==null?void 0:ue.docs)==null?void 0:Te.source}}};const Nr=["MorAleneomsorgDekning80EttBarnFør1Okt2021","MorAleneomsorgEttBarnPrematurFødsel","MorAleneomsorgAdopsjonTrillinger","FarMedmorAleneomsorgFødtTvillinger","FarMedmorAleneomsorgFødtFireBarnFør1Okt2021","FarMedmorAleneomsorgFødtTreBarnFørWLB","FarMedmorAleneomsorgEttBarnTerminEtterWLB","FarMedmorAleneomsorgPrematurtFødtBarn","FarMedmorAleneomsorgAdopsjonFireBarn","MorDeltUttakEttBarnPrematurFødsel","MorDeltUttakEttBarnetter1Juli2024Med80ProsentDekning","MorDeltUttakEttBarnTermin","MorDeltUttakTvillingerFødt","MorDeltUttakFarSøkteMorsKvoteOgFellesperiode","FarMedmorSøkerDeltUttakEttBarnFødtFør1Okt2021","FarMedmorSøkerDeltUttakTrillingerFødtFørWLB","FarMedmorSøkerDeltUttakFireBarnTerminEtterWLB","FarMedmorSøkerDeltUttakEttBarnFødtPrematurt","FarSøkerDerMorHarTattUtFedrekvoteOgFellesperiode","FarSøkerAdopsjonToBarn","MorSøkerAdopsjonTreBarnFraUtlandetFør1Okt2021Dekningsgrad80","MorSøkerFarHarRettIEØSTerminDekningsgrad80","FarMedmorSøkerMorHarRettIEØSAdopsjon","BareMorHarRettTermin","BareMorHarRettAdopsjon","BareFarHarRettOgMorErUførTermin4Barn","BareFarHarRettOgMorErIkkeUførFødtBarn","BareFarHarRettTvillingerFødtFør1Okt2021","BareFarHarRettAdopsjonMorErUfør"];export{_ as BareFarHarRettAdopsjonMorErUfør,H as BareFarHarRettOgMorErIkkeUførFødtBarn,A as BareFarHarRettOgMorErUførTermin4Barn,M as BareFarHarRettTvillingerFødtFør1Okt2021,P as BareMorHarRettAdopsjon,B as BareMorHarRettTermin,m as FarMedmorAleneomsorgAdopsjonFireBarn,F as FarMedmorAleneomsorgEttBarnTerminEtterWLB,i as FarMedmorAleneomsorgFødtFireBarnFør1Okt2021,p as FarMedmorAleneomsorgFødtTreBarnFørWLB,g as FarMedmorAleneomsorgFødtTvillinger,f as FarMedmorAleneomsorgPrematurtFødtBarn,c as FarMedmorSøkerDeltUttakEttBarnFødtFør1Okt2021,N as FarMedmorSøkerDeltUttakEttBarnFødtPrematurt,E as FarMedmorSøkerDeltUttakFireBarnTerminEtterWLB,S as FarMedmorSøkerDeltUttakTrillingerFødtFørWLB,I as FarMedmorSøkerMorHarRettIEØSAdopsjon,y as FarSøkerAdopsjonToBarn,D as FarSøkerDerMorHarTattUtFedrekvoteOgFellesperiode,l as MorAleneomsorgAdopsjonTrillinger,d as MorAleneomsorgDekning80EttBarnFør1Okt2021,k as MorAleneomsorgEttBarnPrematurFødsel,u as MorDeltUttakEttBarnPrematurFødsel,v as MorDeltUttakEttBarnTermin,T as MorDeltUttakEttBarnetter1Juli2024Med80ProsentDekning,O as MorDeltUttakFarSøkteMorsKvoteOgFellesperiode,R as MorDeltUttakTvillingerFødt,j as MorSøkerAdopsjonTreBarnFraUtlandetFør1Okt2021Dekningsgrad80,U as MorSøkerFarHarRettIEØSTerminDekningsgrad80,Nr as __namedExportsOrder,Er as default};
