import{j as d}from"./jsx-runtime-Cw0GR0a5.js";import{a as e}from"./chunk-454WOBUV-CM0pFb8Z.js";import{A as Be}from"./AxiosMock-B4D4gDwg.js";import{i as Pe,B as r,S as n,D as t}from"./Uttaksplan-Jzcjm_OR.js";import"./Uttaksdagen-Uuolrvsk.js";import{F as He}from"./getStønadskontoParams-D2n-K6s4.js";import{F as Me,C as l}from"./FpDataContext-DbGuQRR8.js";import{M as he,S as _e}from"./useFpNavigator-CcLQrI7e.js";import{F as x}from"./FordelingSteg-Dt_0VOF7.js";import"./index-CTjT7uj6.js";import"./v4-CQkTLCs1.js";import"./index-D6lQcMct.js";import"./apiInterceptor-BCtLUnPl.js";import"./Label-DlDsESPM.js";import"./iframe-DIZUHqRO.js";import"../sb-preview/runtime.js";import"./links-DsaZ4ja0.js";import"./VStack-CrTlUGgl.js";import"./index-CYM-y3Gt.js";import"./index-BRV0Se7Z.js";import"./_baseAssignValue-BQNUR2Ll.js";import"./_overArg-BaVEvwpy.js";import"./barnUtils-D8-AgTxt.js";import"./eksisterendeSakUtils-D4SIfwMO.js";import"./guid-CsArkN6i.js";import"./stønadskontoerUtils-AEhQdKQU.js";import"./ErrorSummaryHookForm-BVJ4wO5X.js";import"./numberFormValidation-qDuCgJY8.js";import"./isString-BhdVjN6s.js";import"./ExpansionCard-Tv7_UMB3.js";import"./BabyWrapped-BOgBzqLZ.js";const Ke="/rest/innsyn/v2/annenPartVedtak",Le="/rest/konto",xe={dekningsgrad:"HUNDRE",perioder:[{fom:"2024-02-07",tom:"2024-02-19",kontoType:"MØDREKVOTE",overføringÅrsak:"INSTITUSJONSOPPHOLD_ANNEN_FORELDER",resultat:{innvilget:!0,trekkerMinsterett:!1,trekkerDager:!0,årsak:"ANNET"}},{fom:"2024-06-11",tom:"2024-06-30",kontoType:"FELLESPERIODE",resultat:{innvilget:!0,trekkerMinsterett:!1,trekkerDager:!0,årsak:"ANNET"}}]},We={dekningsgrad:"HUNDRE",perioder:[{fom:"2024-07-07",tom:"2024-07-24",kontoType:"FEDREKVOTE",overføringÅrsak:"INSTITUSJONSOPPHOLD_ANNEN_FORELDER",resultat:{innvilget:!0,trekkerMinsterett:!1,trekkerDager:!0,årsak:"ANNET"}},{fom:"2024-08-11",tom:"2024-08-12",kontoType:"FELLESPERIODE",resultat:{innvilget:!0,trekkerMinsterett:!1,trekkerDager:!0,årsak:"ANNET"}}]},s={fnr:"19047815714",fornavn:"Hanne",etternavn:"Mygg",kjønn:"K",fødselsdato:"1978-04-19"},a={fnr:"19047815715",fornavn:"Hans",etternavn:"Mygg",kjønn:"M",fødselsdato:"1972-06-07"},o=()=>(...K)=>(e("button-click")(...K),Promise.resolve()),Tr={title:"steps/FordelingSteg",component:x,render:({gåTilNesteSide:K,søkersituasjon:Oe,annenForelder:Re,barnet:Ne,stønadskonto100:be,stønadskonto80:ye,annenPartVedtak:Ee,dekningsgrad:De,...Ae})=>{Pe();const je=be||{kontoer:{},minsteretter:{}},Ue=ye||{kontoer:{},minsteretter:{}},Ie=L=>{L.onPost(Ke).replyOnce(200,Ee),L.onPost(Le).replyOnce(200,{80:Ue,100:je})};return d.jsx(he,{initialEntries:[_e.FORDELING],children:d.jsx(Be,{mock:Ie,children:d.jsx(He,{children:d.jsx(Me,{onDispatch:K,initialState:{[l.SØKERSITUASJON]:Oe,[l.OM_BARNET]:Ne,[l.ARBEIDSFORHOLD_OG_INNTEKT]:{harHattAndreInntektskilder:!1,harJobbetSomFrilans:!1,harJobbetSomSelvstendigNæringsdrivende:!1},[l.ANNEN_FORELDER]:Re,[l.PERIODE_MED_FORELDREPENGER]:{dekningsgrad:De}},children:d.jsx(x,{...Ae})})})})})}},k={args:{søker:s,erAleneOmOmsorg:!0,søkersituasjon:{situasjon:"fødsel",rolle:"mor"},barnet:{type:r.FØDT,fødselsdatoer:["2021-09-21"],antallBarn:1,termindato:"2021-09-24"},annenForelder:{fornavn:"Hans",etternavn:"Utvikler",kanIkkeOppgis:!1,erAleneOmOmsorg:!0,datoForAleneomsorg:"2021-09-21"},stønadskonto100:void 0,stønadskonto80:{kontoer:[{konto:n.Foreldrepenger,dager:280},{konto:n.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},dekningsgrad:t.ÅTTI_PROSENT,arbeidsforhold:[],mellomlagreSøknadOgNaviger:o(),avbrytSøknad:e("button-click")}},i={args:{søker:s,erAleneOmOmsorg:!0,søkersituasjon:{situasjon:"fødsel",rolle:"mor"},barnet:{type:r.FØDT,fødselsdatoer:["2023-09-21"],antallBarn:1,termindato:"2023-12-20"},annenForelder:{fornavn:"Hans",etternavn:"Utvikler",erAleneOmOmsorg:!0,datoForAleneomsorg:"2023-09-21",kanIkkeOppgis:!1},stønadskonto100:{kontoer:[{konto:n.Foreldrepenger,dager:294},{konto:n.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:10,toTette:0},tillegg:{prematur:64,flerbarn:0}},stønadskonto80:void 0,dekningsgrad:t.HUNDRE_PROSENT,arbeidsforhold:[],mellomlagreSøknadOgNaviger:o(),avbrytSøknad:e("button-click")}},g={args:{søker:s,erAleneOmOmsorg:!0,søkersituasjon:{situasjon:"adopsjon",rolle:"mor"},barnet:{type:r.ADOPTERT_STEBARN,fødselsdatoer:["2024-02-21"],antallBarn:3,adopsjonsdato:"2024-02-21"},annenForelder:{kanIkkeOppgis:!0},stønadskonto80:void 0,stønadskonto100:{kontoer:[{konto:n.Foreldrepenger,dager:460}],minsteretter:{farRundtFødsel:0,toTette:0}},dekningsgrad:t.HUNDRE_PROSENT,arbeidsforhold:[],mellomlagreSøknadOgNaviger:o(),avbrytSøknad:e("button-click")}},p={args:{søker:a,erAleneOmOmsorg:!0,søkersituasjon:{situasjon:"fødsel",rolle:"far"},barnet:{type:r.FØDT,fødselsdatoer:["2023-09-21"],antallBarn:2,termindato:"2023-09-21"},annenForelder:{fornavn:"Hanne",etternavn:"Utvikler",erAleneOmOmsorg:!0,datoForAleneomsorg:"2023-09-23",kanIkkeOppgis:!1},stønadskonto100:{kontoer:[{konto:n.Foreldrepenger,dager:385}],minsteretter:{farRundtFødsel:10,toTette:0}},stønadskonto80:void 0,dekningsgrad:t.HUNDRE_PROSENT,arbeidsforhold:[],mellomlagreSøknadOgNaviger:o(),avbrytSøknad:e("button-click")}},m={args:{søker:a,erAleneOmOmsorg:!0,søkersituasjon:{situasjon:"fødsel",rolle:"far"},barnet:{type:r.FØDT,fødselsdatoer:["2021-09-21"],antallBarn:4,termindato:"2021-09-21"},annenForelder:{fornavn:"Hanne",etternavn:"Utvikler",erAleneOmOmsorg:!0,datoForAleneomsorg:"2021-09-21",kanIkkeOppgis:!1},stønadskonto100:{kontoer:[{konto:n.Foreldrepenger,dager:460}],minsteretter:{farRundtFødsel:0,toTette:0}},stønadskonto80:void 0,dekningsgrad:t.HUNDRE_PROSENT,arbeidsforhold:[],mellomlagreSøknadOgNaviger:o(),avbrytSøknad:e("button-click")}},f={args:{søker:a,erAleneOmOmsorg:!0,søkersituasjon:{situasjon:"fødsel",rolle:"far"},barnet:{type:r.FØDT,fødselsdatoer:["2022-07-21"],antallBarn:3,termindato:"2022-07-21"},annenForelder:{fornavn:"Hanne",etternavn:"Utvikler",erAleneOmOmsorg:!0,datoForAleneomsorg:"2022-09-21",kanIkkeOppgis:!1},stønadskonto100:{kontoer:[{konto:n.Foreldrepenger,dager:460}],minsteretter:{farRundtFødsel:0,toTette:0}},stønadskonto80:void 0,dekningsgrad:t.HUNDRE_PROSENT,arbeidsforhold:[],mellomlagreSøknadOgNaviger:o(),avbrytSøknad:e("button-click")}},F={args:{søker:a,erAleneOmOmsorg:!0,søkersituasjon:{situasjon:"fødsel",rolle:"far"},barnet:{type:r.UFØDT,antallBarn:3,termindato:"2024-07-21"},annenForelder:{erAleneOmOmsorg:!0,fornavn:"Hanne",etternavn:"Utvikler",datoForAleneomsorg:"2024-09-21",kanIkkeOppgis:!1},stønadskonto100:{kontoer:[{konto:n.Foreldrepenger,dager:230}],minsteretter:{farRundtFødsel:10,toTette:0}},stønadskonto80:void 0,dekningsgrad:t.HUNDRE_PROSENT,arbeidsforhold:[],mellomlagreSøknadOgNaviger:o(),avbrytSøknad:e("button-click")}},u={args:{søker:a,erAleneOmOmsorg:!0,søkersituasjon:{situasjon:"fødsel",rolle:"far"},barnet:{type:r.FØDT,antallBarn:1,fødselsdatoer:["2024-01-21"],termindato:"2024-04-21"},annenForelder:{fornavn:"Hanne",etternavn:"Utvikler",erAleneOmOmsorg:!0,datoForAleneomsorg:"2024-01-21",kanIkkeOppgis:!1},stønadskonto100:{kontoer:[{konto:n.Foreldrepenger,dager:273}],minsteretter:{farRundtFødsel:0,toTette:0},tillegg:{prematur:64,flerbarn:0}},stønadskonto80:void 0,dekningsgrad:t.HUNDRE_PROSENT,arbeidsforhold:[],mellomlagreSøknadOgNaviger:o(),avbrytSøknad:e("button-click")}},v={args:{søker:a,erAleneOmOmsorg:!0,søkersituasjon:{situasjon:"adopsjon",rolle:"far"},barnet:{type:r.ADOPTERT_ANNET_BARN,fødselsdatoer:["2021-08-21"],antallBarn:4,adopsjonsdato:"2021-08-23"},annenForelder:{fornavn:"Hanne",etternavn:"Utvikler",erAleneOmOmsorg:!0,datoForAleneomsorg:"2024-01-21",kanIkkeOppgis:!1},stønadskonto100:{kontoer:[{konto:n.Foreldrepenger,dager:460}],minsteretter:{farRundtFødsel:0,toTette:0}},stønadskonto80:void 0,dekningsgrad:t.HUNDRE_PROSENT,arbeidsforhold:[],mellomlagreSøknadOgNaviger:o(),avbrytSøknad:e("button-click")}},c={args:{søker:s,søkersituasjon:{situasjon:"fødsel",rolle:"mor"},barnet:{type:r.FØDT,fødselsdatoer:["2023-09-21"],antallBarn:1,termindato:"2023-12-21"},annenForelder:{fornavn:"Hans",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1},stønadskonto100:{kontoer:[{konto:n.Mødrekvote,dager:75},{konto:n.Fedrekvote,dager:75},{konto:n.Fellesperiode,dager:100},{konto:n.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:10,toTette:0},tillegg:{prematur:65,flerbarn:0}},stønadskonto80:void 0,dekningsgrad:t.HUNDRE_PROSENT,arbeidsforhold:[],mellomlagreSøknadOgNaviger:o(),avbrytSøknad:e("button-click")}},T={args:{søker:s,søkersituasjon:{situasjon:"fødsel",rolle:"mor"},barnet:{type:r.UFØDT,antallBarn:1,termindato:"2024-08-21"},annenForelder:{fornavn:"Petter",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1},stønadskonto80:{kontoer:[{konto:n.Mødrekvote,dager:95},{konto:n.Fedrekvote,dager:95},{konto:n.Fellesperiode,dager:101},{konto:n.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:10,toTette:0},tillegg:{prematur:0,flerbarn:0}},stønadskonto100:void 0,dekningsgrad:t.ÅTTI_PROSENT,arbeidsforhold:[],mellomlagreSøknadOgNaviger:o(),avbrytSøknad:e("button-click")}},S={args:{søker:s,søkersituasjon:{situasjon:"fødsel",rolle:"mor"},barnet:{type:r.UFØDT,antallBarn:1,termindato:"2024-06-21"},annenForelder:{fornavn:"Hans",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1},stønadskonto100:{kontoer:[{konto:n.Mødrekvote,dager:75},{konto:n.Fedrekvote,dager:75},{konto:n.Fellesperiode,dager:80},{konto:n.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:10,toTette:0}},stønadskonto80:void 0,dekningsgrad:t.HUNDRE_PROSENT,arbeidsforhold:[],mellomlagreSøknadOgNaviger:o(),avbrytSøknad:e("button-click")}},O={args:{søker:s,søkersituasjon:{situasjon:"fødsel",rolle:"mor"},barnet:{type:r.FØDT,antallBarn:2,fødselsdatoer:["2024-02-21"],termindato:"2024-02-21"},annenForelder:{fornavn:"Hans",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1},stønadskonto100:{kontoer:[{konto:n.Mødrekvote,dager:75},{konto:n.Fedrekvote,dager:75},{konto:n.Fellesperiode,dager:165},{konto:n.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:10,toTette:0},tillegg:{prematur:0,flerbarn:85}},stønadskonto80:void 0,dekningsgrad:t.HUNDRE_PROSENT,arbeidsforhold:[],mellomlagreSøknadOgNaviger:o(),avbrytSøknad:e("button-click")}},R={args:{søker:s,søkersituasjon:{situasjon:"fødsel",rolle:"mor"},barnet:{type:r.UFØDT,antallBarn:1,termindato:"2024-07-21"},annenForelder:{fornavn:"Hans",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1},stønadskonto100:{kontoer:[{konto:n.Mødrekvote,dager:75},{konto:n.Fedrekvote,dager:75},{konto:n.Fellesperiode,dager:80},{konto:n.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:10,toTette:0}},stønadskonto80:void 0,dekningsgrad:t.HUNDRE_PROSENT,annenPartVedtak:xe,arbeidsforhold:[],mellomlagreSøknadOgNaviger:o(),avbrytSøknad:e("button-click")}},N={args:{søker:a,søkersituasjon:{situasjon:"fødsel",rolle:"far"},barnet:{type:r.FØDT,antallBarn:1,fødselsdatoer:["2021-07-21"],termindato:"2021-07-21"},annenForelder:{fornavn:"Hanne",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1},stønadskonto100:{kontoer:[{konto:n.Mødrekvote,dager:75},{konto:n.Fedrekvote,dager:75},{konto:n.Fellesperiode,dager:80},{konto:n.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},stønadskonto80:void 0,dekningsgrad:t.HUNDRE_PROSENT,arbeidsforhold:[],mellomlagreSøknadOgNaviger:o(),avbrytSøknad:e("button-click")}},b={args:{søker:a,søkersituasjon:{situasjon:"fødsel",rolle:"far"},barnet:{type:r.FØDT,antallBarn:3,fødselsdatoer:["2022-07-21"],termindato:"2022-07-21"},annenForelder:{fornavn:"Hanne",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1},stønadskonto100:{kontoer:[{konto:n.Mødrekvote,dager:75},{konto:n.Fedrekvote,dager:75},{konto:n.Fellesperiode,dager:370},{konto:n.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0},tillegg:{prematur:0,flerbarn:230}},stønadskonto80:void 0,dekningsgrad:t.HUNDRE_PROSENT,arbeidsforhold:[],mellomlagreSøknadOgNaviger:o(),avbrytSøknad:e("button-click")}},y={args:{søker:a,søkersituasjon:{situasjon:"fødsel",rolle:"far"},barnet:{type:r.UFØDT,antallBarn:4,termindato:"2024-07-21"},annenForelder:{fornavn:"Hanne",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1},stønadskonto100:{kontoer:[{konto:n.Mødrekvote,dager:75},{konto:n.Fedrekvote,dager:75},{konto:n.Fellesperiode,dager:370},{konto:n.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:10,toTette:0}},stønadskonto80:void 0,dekningsgrad:t.HUNDRE_PROSENT,arbeidsforhold:[],mellomlagreSøknadOgNaviger:o(),avbrytSøknad:e("button-click")}},E={args:{søker:a,søkersituasjon:{situasjon:"fødsel",rolle:"far"},barnet:{type:r.FØDT,antallBarn:1,fødselsdatoer:["2024-02-21"],termindato:"2024-05-21"},annenForelder:{fornavn:"Hanne",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1},stønadskonto100:{kontoer:[{konto:n.Mødrekvote,dager:75},{konto:n.Fedrekvote,dager:75},{konto:n.Fellesperiode,dager:100},{konto:n.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:10,toTette:0},tillegg:{flerbarn:0,prematur:64}},stønadskonto80:void 0,dekningsgrad:t.HUNDRE_PROSENT,arbeidsforhold:[],mellomlagreSøknadOgNaviger:o(),avbrytSøknad:e("button-click")}},D={args:{søker:a,søkersituasjon:{situasjon:"fødsel",rolle:"far"},barnet:{type:r.FØDT,antallBarn:1,fødselsdatoer:["2024-02-21"],termindato:"2024-02-21"},annenForelder:{fornavn:"Hanne",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1},stønadskonto100:{kontoer:[{konto:n.Mødrekvote,dager:75},{konto:n.Fedrekvote,dager:75},{konto:n.Fellesperiode,dager:80},{konto:n.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:10,toTette:0}},stønadskonto80:void 0,dekningsgrad:t.HUNDRE_PROSENT,annenPartVedtak:We,arbeidsforhold:[],mellomlagreSøknadOgNaviger:o(),avbrytSøknad:e("button-click")}},A={args:{søker:a,søkersituasjon:{situasjon:"adopsjon",rolle:"far"},barnet:{type:r.ADOPTERT_STEBARN,antallBarn:2,fødselsdatoer:["2024-02-21"],adopsjonsdato:"2024-02-21"},annenForelder:{fornavn:"Hanne",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1},stønadskonto100:{kontoer:[{konto:n.Mødrekvote,dager:95},{konto:n.Fedrekvote,dager:95},{konto:n.Fellesperiode,dager:90}],minsteretter:{farRundtFødsel:0,toTette:0}},stønadskonto80:void 0,dekningsgrad:t.HUNDRE_PROSENT,arbeidsforhold:[],mellomlagreSøknadOgNaviger:o(),avbrytSøknad:e("button-click")}},j={args:{søker:a,søkersituasjon:{situasjon:"adopsjon",rolle:"mor"},barnet:{type:r.ADOPTERT_ANNET_BARN,antallBarn:3,fødselsdatoer:["2021-02-21"],adopsjonsdato:"2021-02-21",ankomstdato:"2021-05-21"},annenForelder:{fornavn:"Hans",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1},stønadskonto100:void 0,stønadskonto80:{kontoer:[{konto:n.Mødrekvote,dager:95},{konto:n.Fedrekvote,dager:95},{konto:n.Fellesperiode,dager:370}],minsteretter:{farRundtFødsel:0,toTette:0}},dekningsgrad:t.ÅTTI_PROSENT,arbeidsforhold:[],mellomlagreSøknadOgNaviger:o(),avbrytSøknad:e("button-click")}},U={args:{søker:s,søkersituasjon:{situasjon:"fødsel",rolle:"mor"},barnet:{type:r.UFØDT,antallBarn:1,termindato:"2024-07-21"},annenForelder:{fornavn:"Hans",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!1,harOppholdtSegIEØS:!0,harRettPåForeldrepengerIEØS:!0,kanIkkeOppgis:!1},stønadskonto100:void 0,stønadskonto80:{kontoer:[{konto:n.Mødrekvote,dager:95},{konto:n.Fedrekvote,dager:95},{konto:n.Fellesperiode,dager:90},{konto:n.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:10,toTette:0}},dekningsgrad:t.ÅTTI_PROSENT,arbeidsforhold:[],mellomlagreSøknadOgNaviger:o(),avbrytSøknad:e("button-click")}},I={args:{søker:a,søkersituasjon:{situasjon:"adopsjon",rolle:"far"},barnet:{type:r.ADOPTERT_STEBARN,antallBarn:1,adopsjonsdato:"2024-02-21",fødselsdatoer:["2024-02-21"]},annenForelder:{fornavn:"Hanne",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!1,harOppholdtSegIEØS:!0,harRettPåForeldrepengerIEØS:!0,kanIkkeOppgis:!1},stønadskonto100:{kontoer:[{konto:n.Mødrekvote,dager:95},{konto:n.Fedrekvote,dager:95},{konto:n.Fellesperiode,dager:90}],minsteretter:{farRundtFødsel:0,toTette:0}},stønadskonto80:void 0,dekningsgrad:t.HUNDRE_PROSENT,arbeidsforhold:[],mellomlagreSøknadOgNaviger:o(),avbrytSøknad:e("button-click")}},B={args:{søker:s,søkersituasjon:{situasjon:"fødsel",rolle:"mor"},barnet:{type:r.UFØDT,antallBarn:1,termindato:"2024-07-21"},annenForelder:{fornavn:"Hans",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!1,kanIkkeOppgis:!1},stønadskonto100:{kontoer:[{konto:n.Foreldrepenger,dager:230}],minsteretter:{farRundtFødsel:15,toTette:0}},stønadskonto80:void 0,dekningsgrad:t.HUNDRE_PROSENT,arbeidsforhold:[],mellomlagreSøknadOgNaviger:o(),avbrytSøknad:e("button-click")}},P={args:{søker:s,søkersituasjon:{situasjon:"adopsjon",rolle:"mor"},barnet:{type:r.ADOPTERT_ANNET_BARN,antallBarn:1,adopsjonsdato:"2022-08-21",fødselsdatoer:["2022-01-01"]},annenForelder:{fornavn:"Hans",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!1,kanIkkeOppgis:!1},stønadskonto100:{kontoer:[{konto:n.Foreldrepenger,dager:230}],minsteretter:{farRundtFødsel:0,toTette:0}},stønadskonto80:void 0,dekningsgrad:t.HUNDRE_PROSENT,arbeidsforhold:[],mellomlagreSøknadOgNaviger:o(),avbrytSøknad:e("button-click")}},H={args:{søker:a,søkersituasjon:{situasjon:"fødsel",rolle:"far"},barnet:{type:r.UFØDT,antallBarn:4,termindato:"2024-07-21"},annenForelder:{fornavn:"Hanne",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!1,kanIkkeOppgis:!1,erMorUfør:!0},stønadskonto100:{kontoer:[{konto:n.Foreldrepenger,dager:155},{konto:n.AktivitetsfriKvote,dager:375}],minsteretter:{farRundtFødsel:10,toTette:0}},stønadskonto80:void 0,dekningsgrad:t.HUNDRE_PROSENT,arbeidsforhold:[],mellomlagreSøknadOgNaviger:o(),avbrytSøknad:e("button-click")}},M={args:{søker:a,søkersituasjon:{situasjon:"fødsel",rolle:"far"},barnet:{type:r.FØDT,antallBarn:1,fødselsdatoer:["2024-01-21"],termindato:"2024-01-21"},annenForelder:{fornavn:"Hanne",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!1,kanIkkeOppgis:!1,erMorUfør:!1},stønadskonto100:{kontoer:[{konto:n.Foreldrepenger,dager:210},{konto:n.AktivitetsfriKvote,dager:40}],minsteretter:{farRundtFødsel:10,toTette:0}},stønadskonto80:void 0,dekningsgrad:t.HUNDRE_PROSENT,arbeidsforhold:[],mellomlagreSøknadOgNaviger:o(),avbrytSøknad:e("button-click")}},h={args:{søker:a,søkersituasjon:{situasjon:"fødsel",rolle:"far"},barnet:{type:r.FØDT,antallBarn:2,fødselsdatoer:["2021-07-21"],termindato:"2021-07-21"},annenForelder:{fornavn:"Hanne",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!1,kanIkkeOppgis:!1,erMorUfør:!0},stønadskonto100:{kontoer:[{konto:n.Foreldrepenger,dager:285}],minsteretter:{farRundtFødsel:0,toTette:0}},stønadskonto80:void 0,dekningsgrad:t.HUNDRE_PROSENT,arbeidsforhold:[],mellomlagreSøknadOgNaviger:o(),avbrytSøknad:e("button-click")}},_={args:{søker:a,søkersituasjon:{situasjon:"adopsjon",rolle:"far"},barnet:{type:r.ADOPTERT_STEBARN,antallBarn:1,fødselsdatoer:["2024-02-21"],adopsjonsdato:"2024-02-21"},annenForelder:{fornavn:"Hanne",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!1,erMorUfør:!0,kanIkkeOppgis:!1},stønadskonto100:{kontoer:[{konto:n.Foreldrepenger,dager:125},{konto:n.AktivitetsfriKvote,dager:75}],minsteretter:{farRundtFødsel:10,toTette:0}},stønadskonto80:void 0,dekningsgrad:t.HUNDRE_PROSENT,arbeidsforhold:[],mellomlagreSøknadOgNaviger:o(),avbrytSøknad:e("button-click")}};var W,J,V;k.parameters={...k.parameters,docs:{...(W=k.parameters)==null?void 0:W.docs,source:{originalSource:`{
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
    dekningsgrad: Dekningsgrad.ÅTTI_PROSENT,
    arbeidsforhold: [],
    mellomlagreSøknadOgNaviger: promiseAction(),
    avbrytSøknad: action('button-click')
  }
}`,...(V=(J=k.parameters)==null?void 0:J.docs)==null?void 0:V.source}}};var C,G,q;i.parameters={...i.parameters,docs:{...(C=i.parameters)==null?void 0:C.docs,source:{originalSource:`{
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
    dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
    arbeidsforhold: [],
    mellomlagreSøknadOgNaviger: promiseAction(),
    avbrytSøknad: action('button-click')
  }
}`,...(q=(G=i.parameters)==null?void 0:G.docs)==null?void 0:q.source}}};var w,z,Q;g.parameters={...g.parameters,docs:{...(w=g.parameters)==null?void 0:w.docs,source:{originalSource:`{
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
    dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
    arbeidsforhold: [],
    mellomlagreSøknadOgNaviger: promiseAction(),
    avbrytSøknad: action('button-click')
  }
}`,...(Q=(z=g.parameters)==null?void 0:z.docs)==null?void 0:Q.source}}};var X,Y,Z;p.parameters={...p.parameters,docs:{...(X=p.parameters)==null?void 0:X.docs,source:{originalSource:`{
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
    dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
    arbeidsforhold: [],
    mellomlagreSøknadOgNaviger: promiseAction(),
    avbrytSøknad: action('button-click')
  }
}`,...(Z=(Y=p.parameters)==null?void 0:Y.docs)==null?void 0:Z.source}}};var $,nn,en;m.parameters={...m.parameters,docs:{...($=m.parameters)==null?void 0:$.docs,source:{originalSource:`{
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
    dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
    arbeidsforhold: [],
    mellomlagreSøknadOgNaviger: promiseAction(),
    avbrytSøknad: action('button-click')
  }
}`,...(en=(nn=m.parameters)==null?void 0:nn.docs)==null?void 0:en.source}}};var rn,tn,on;f.parameters={...f.parameters,docs:{...(rn=f.parameters)==null?void 0:rn.docs,source:{originalSource:`{
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
    dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
    arbeidsforhold: [],
    mellomlagreSøknadOgNaviger: promiseAction(),
    avbrytSøknad: action('button-click')
  }
}`,...(on=(tn=f.parameters)==null?void 0:tn.docs)==null?void 0:on.source}}};var an,sn,dn;F.parameters={...F.parameters,docs:{...(an=F.parameters)==null?void 0:an.docs,source:{originalSource:`{
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
    dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
    arbeidsforhold: [],
    mellomlagreSøknadOgNaviger: promiseAction(),
    avbrytSøknad: action('button-click')
  }
}`,...(dn=(sn=F.parameters)==null?void 0:sn.docs)==null?void 0:dn.source}}};var ln,kn,gn;u.parameters={...u.parameters,docs:{...(ln=u.parameters)==null?void 0:ln.docs,source:{originalSource:`{
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
    dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
    arbeidsforhold: [],
    mellomlagreSøknadOgNaviger: promiseAction(),
    avbrytSøknad: action('button-click')
  }
}`,...(gn=(kn=u.parameters)==null?void 0:kn.docs)==null?void 0:gn.source}}};var pn,mn,fn;v.parameters={...v.parameters,docs:{...(pn=v.parameters)==null?void 0:pn.docs,source:{originalSource:`{
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
    dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
    arbeidsforhold: [],
    mellomlagreSøknadOgNaviger: promiseAction(),
    avbrytSøknad: action('button-click')
  }
}`,...(fn=(mn=v.parameters)==null?void 0:mn.docs)==null?void 0:fn.source}}};var Fn,un,vn;c.parameters={...c.parameters,docs:{...(Fn=c.parameters)==null?void 0:Fn.docs,source:{originalSource:`{
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
    dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
    arbeidsforhold: [],
    mellomlagreSøknadOgNaviger: promiseAction(),
    avbrytSøknad: action('button-click')
  }
}`,...(vn=(un=c.parameters)==null?void 0:un.docs)==null?void 0:vn.source}}};var cn,Tn,Sn;T.parameters={...T.parameters,docs:{...(cn=T.parameters)==null?void 0:cn.docs,source:{originalSource:`{
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
    dekningsgrad: Dekningsgrad.ÅTTI_PROSENT,
    arbeidsforhold: [],
    mellomlagreSøknadOgNaviger: promiseAction(),
    avbrytSøknad: action('button-click')
  }
}`,...(Sn=(Tn=T.parameters)==null?void 0:Tn.docs)==null?void 0:Sn.source}}};var On,Rn,Nn;S.parameters={...S.parameters,docs:{...(On=S.parameters)==null?void 0:On.docs,source:{originalSource:`{
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
    dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
    arbeidsforhold: [],
    mellomlagreSøknadOgNaviger: promiseAction(),
    avbrytSøknad: action('button-click')
  }
}`,...(Nn=(Rn=S.parameters)==null?void 0:Rn.docs)==null?void 0:Nn.source}}};var bn,yn,En;O.parameters={...O.parameters,docs:{...(bn=O.parameters)==null?void 0:bn.docs,source:{originalSource:`{
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
    dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
    arbeidsforhold: [],
    mellomlagreSøknadOgNaviger: promiseAction(),
    avbrytSøknad: action('button-click')
  }
}`,...(En=(yn=O.parameters)==null?void 0:yn.docs)==null?void 0:En.source}}};var Dn,An,jn;R.parameters={...R.parameters,docs:{...(Dn=R.parameters)==null?void 0:Dn.docs,source:{originalSource:`{
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
    annenPartVedtak: vedtakFar,
    arbeidsforhold: [],
    mellomlagreSøknadOgNaviger: promiseAction(),
    avbrytSøknad: action('button-click')
  }
}`,...(jn=(An=R.parameters)==null?void 0:An.docs)==null?void 0:jn.source}}};var Un,In,Bn;N.parameters={...N.parameters,docs:{...(Un=N.parameters)==null?void 0:Un.docs,source:{originalSource:`{
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
    dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
    arbeidsforhold: [],
    mellomlagreSøknadOgNaviger: promiseAction(),
    avbrytSøknad: action('button-click')
  }
}`,...(Bn=(In=N.parameters)==null?void 0:In.docs)==null?void 0:Bn.source}}};var Pn,Hn,Mn;b.parameters={...b.parameters,docs:{...(Pn=b.parameters)==null?void 0:Pn.docs,source:{originalSource:`{
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
    dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
    arbeidsforhold: [],
    mellomlagreSøknadOgNaviger: promiseAction(),
    avbrytSøknad: action('button-click')
  }
}`,...(Mn=(Hn=b.parameters)==null?void 0:Hn.docs)==null?void 0:Mn.source}}};var hn,_n,Kn;y.parameters={...y.parameters,docs:{...(hn=y.parameters)==null?void 0:hn.docs,source:{originalSource:`{
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
    dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
    arbeidsforhold: [],
    mellomlagreSøknadOgNaviger: promiseAction(),
    avbrytSøknad: action('button-click')
  }
}`,...(Kn=(_n=y.parameters)==null?void 0:_n.docs)==null?void 0:Kn.source}}};var Ln,xn,Wn;E.parameters={...E.parameters,docs:{...(Ln=E.parameters)==null?void 0:Ln.docs,source:{originalSource:`{
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
    dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
    arbeidsforhold: [],
    mellomlagreSøknadOgNaviger: promiseAction(),
    avbrytSøknad: action('button-click')
  }
}`,...(Wn=(xn=E.parameters)==null?void 0:xn.docs)==null?void 0:Wn.source}}};var Jn,Vn,Cn;D.parameters={...D.parameters,docs:{...(Jn=D.parameters)==null?void 0:Jn.docs,source:{originalSource:`{
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
    annenPartVedtak: vedtakMor,
    arbeidsforhold: [],
    mellomlagreSøknadOgNaviger: promiseAction(),
    avbrytSøknad: action('button-click')
  }
}`,...(Cn=(Vn=D.parameters)==null?void 0:Vn.docs)==null?void 0:Cn.source}}};var Gn,qn,wn;A.parameters={...A.parameters,docs:{...(Gn=A.parameters)==null?void 0:Gn.docs,source:{originalSource:`{
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
    dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
    arbeidsforhold: [],
    mellomlagreSøknadOgNaviger: promiseAction(),
    avbrytSøknad: action('button-click')
  }
}`,...(wn=(qn=A.parameters)==null?void 0:qn.docs)==null?void 0:wn.source}}};var zn,Qn,Xn;j.parameters={...j.parameters,docs:{...(zn=j.parameters)==null?void 0:zn.docs,source:{originalSource:`{
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
    dekningsgrad: Dekningsgrad.ÅTTI_PROSENT,
    arbeidsforhold: [],
    mellomlagreSøknadOgNaviger: promiseAction(),
    avbrytSøknad: action('button-click')
  }
}`,...(Xn=(Qn=j.parameters)==null?void 0:Qn.docs)==null?void 0:Xn.source}}};var Yn,Zn,$n;U.parameters={...U.parameters,docs:{...(Yn=U.parameters)==null?void 0:Yn.docs,source:{originalSource:`{
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
    dekningsgrad: Dekningsgrad.ÅTTI_PROSENT,
    arbeidsforhold: [],
    mellomlagreSøknadOgNaviger: promiseAction(),
    avbrytSøknad: action('button-click')
  }
}`,...($n=(Zn=U.parameters)==null?void 0:Zn.docs)==null?void 0:$n.source}}};var ne,ee,re;I.parameters={...I.parameters,docs:{...(ne=I.parameters)==null?void 0:ne.docs,source:{originalSource:`{
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
    dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
    arbeidsforhold: [],
    mellomlagreSøknadOgNaviger: promiseAction(),
    avbrytSøknad: action('button-click')
  }
}`,...(re=(ee=I.parameters)==null?void 0:ee.docs)==null?void 0:re.source}}};var te,oe,ae;B.parameters={...B.parameters,docs:{...(te=B.parameters)==null?void 0:te.docs,source:{originalSource:`{
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
    dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
    arbeidsforhold: [],
    mellomlagreSøknadOgNaviger: promiseAction(),
    avbrytSøknad: action('button-click')
  }
}`,...(ae=(oe=B.parameters)==null?void 0:oe.docs)==null?void 0:ae.source}}};var se,de,le;P.parameters={...P.parameters,docs:{...(se=P.parameters)==null?void 0:se.docs,source:{originalSource:`{
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
    dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
    arbeidsforhold: [],
    mellomlagreSøknadOgNaviger: promiseAction(),
    avbrytSøknad: action('button-click')
  }
}`,...(le=(de=P.parameters)==null?void 0:de.docs)==null?void 0:le.source}}};var ke,ie,ge;H.parameters={...H.parameters,docs:{...(ke=H.parameters)==null?void 0:ke.docs,source:{originalSource:`{
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
    dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
    arbeidsforhold: [],
    mellomlagreSøknadOgNaviger: promiseAction(),
    avbrytSøknad: action('button-click')
  }
}`,...(ge=(ie=H.parameters)==null?void 0:ie.docs)==null?void 0:ge.source}}};var pe,me,fe;M.parameters={...M.parameters,docs:{...(pe=M.parameters)==null?void 0:pe.docs,source:{originalSource:`{
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
    dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
    arbeidsforhold: [],
    mellomlagreSøknadOgNaviger: promiseAction(),
    avbrytSøknad: action('button-click')
  }
}`,...(fe=(me=M.parameters)==null?void 0:me.docs)==null?void 0:fe.source}}};var Fe,ue,ve;h.parameters={...h.parameters,docs:{...(Fe=h.parameters)==null?void 0:Fe.docs,source:{originalSource:`{
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
    dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
    arbeidsforhold: [],
    mellomlagreSøknadOgNaviger: promiseAction(),
    avbrytSøknad: action('button-click')
  }
}`,...(ve=(ue=h.parameters)==null?void 0:ue.docs)==null?void 0:ve.source}}};var ce,Te,Se;_.parameters={..._.parameters,docs:{...(ce=_.parameters)==null?void 0:ce.docs,source:{originalSource:`{
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
    dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
    arbeidsforhold: [],
    mellomlagreSøknadOgNaviger: promiseAction(),
    avbrytSøknad: action('button-click')
  }
}`,...(Se=(Te=_.parameters)==null?void 0:Te.docs)==null?void 0:Se.source}}};const Sr=["MorAleneomsorgDekning80EttBarnFør1Okt2021","MorAleneomsorgEttBarnPrematurFødsel","MorAleneomsorgAdopsjonTrillinger","FarMedmorAleneomsorgFødtTvillinger","FarMedmorAleneomsorgFødtFireBarnFør1Okt2021","FarMedmorAleneomsorgFødtTreBarnFørWLB","FarMedmorAleneomsorgEttBarnTerminEtterWLB","FarMedmorAleneomsorgPrematurtFødtBarn","FarMedmorAleneomsorgAdopsjonFireBarn","MorDeltUttakEttBarnPrematurFødsel","MorDeltUttakEttBarnetter1Juli2024Med80ProsentDekning","MorDeltUttakEttBarnTermin","MorDeltUttakTvillingerFødt","MorDeltUttakFarSøkteMorsKvoteOgFellesperiode","FarMedmorSøkerDeltUttakEttBarnFødtFør1Okt2021","FarMedmorSøkerDeltUttakTrillingerFødtFørWLB","FarMedmorSøkerDeltUttakFireBarnTerminEtterWLB","FarMedmorSøkerDeltUttakEttBarnFødtPrematurt","FarSøkerDerMorHarTattUtFedrekvoteOgFellesperiode","FarSøkerAdopsjonToBarn","MorSøkerAdopsjonTreBarnFraUtlandetFør1Okt2021Dekningsgrad80","MorSøkerFarHarRettIEØSTerminDekningsgrad80","FarMedmorSøkerMorHarRettIEØSAdopsjon","BareMorHarRettTermin","BareMorHarRettAdopsjon","BareFarHarRettOgMorErUførTermin4Barn","BareFarHarRettOgMorErIkkeUførFødtBarn","BareFarHarRettTvillingerFødtFør1Okt2021","BareFarHarRettAdopsjonMorErUfør"];export{_ as BareFarHarRettAdopsjonMorErUfør,M as BareFarHarRettOgMorErIkkeUførFødtBarn,H as BareFarHarRettOgMorErUførTermin4Barn,h as BareFarHarRettTvillingerFødtFør1Okt2021,P as BareMorHarRettAdopsjon,B as BareMorHarRettTermin,v as FarMedmorAleneomsorgAdopsjonFireBarn,F as FarMedmorAleneomsorgEttBarnTerminEtterWLB,m as FarMedmorAleneomsorgFødtFireBarnFør1Okt2021,f as FarMedmorAleneomsorgFødtTreBarnFørWLB,p as FarMedmorAleneomsorgFødtTvillinger,u as FarMedmorAleneomsorgPrematurtFødtBarn,N as FarMedmorSøkerDeltUttakEttBarnFødtFør1Okt2021,E as FarMedmorSøkerDeltUttakEttBarnFødtPrematurt,y as FarMedmorSøkerDeltUttakFireBarnTerminEtterWLB,b as FarMedmorSøkerDeltUttakTrillingerFødtFørWLB,I as FarMedmorSøkerMorHarRettIEØSAdopsjon,A as FarSøkerAdopsjonToBarn,D as FarSøkerDerMorHarTattUtFedrekvoteOgFellesperiode,g as MorAleneomsorgAdopsjonTrillinger,k as MorAleneomsorgDekning80EttBarnFør1Okt2021,i as MorAleneomsorgEttBarnPrematurFødsel,c as MorDeltUttakEttBarnPrematurFødsel,S as MorDeltUttakEttBarnTermin,T as MorDeltUttakEttBarnetter1Juli2024Med80ProsentDekning,R as MorDeltUttakFarSøkteMorsKvoteOgFellesperiode,O as MorDeltUttakTvillingerFødt,j as MorSøkerAdopsjonTreBarnFraUtlandetFør1Okt2021Dekningsgrad80,U as MorSøkerFarHarRettIEØSTerminDekningsgrad80,Sr as __namedExportsOrder,Tr as default};
