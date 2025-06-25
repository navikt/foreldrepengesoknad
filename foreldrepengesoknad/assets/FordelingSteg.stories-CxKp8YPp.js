import{bw as _e,bx as a,bm as o,J as Ae,_ as J,by as n,bz as De}from"./iframe-C5y15oMk.js";import{F as He,C as i}from"./FpDataContext-IB0i85UD.js";import{M as Pe,S as Ie}from"./useFpNavigator-DXfT-ElB.js";import{h as e,H as r}from"./index-DQrOeJrK.js";import{a as W}from"./FordelingSteg-BSTNzuzQ.js";import"./api-D2TiTrPi.js";import"./queries-CLS8b1gy.js";import"./annenForelderUtils-lvjTX-jH.js";import"./eksisterendeSakUtils-6TRD5AH8.js";import"./guid-CsArkN6i.js";import"./stønadskontoerUtils-bjfQwces.js";import"./BabyWrapped-Di3N6zl3.js";const{action:t}=__STORYBOOK_MODULE_ACTIONS__,s=".//rest/innsyn/v2/annenPartVedtak",d=".//rest/konto",Be={dekningsgrad:"HUNDRE",perioder:[{fom:"2024-02-07",tom:"2024-02-19",kontoType:"MØDREKVOTE",overføringÅrsak:"INSTITUSJONSOPPHOLD_ANNEN_FORELDER",resultat:{innvilget:!0,trekkerMinsterett:!1,trekkerDager:!0,årsak:"ANNET"}},{fom:"2024-06-11",tom:"2024-06-30",kontoType:"FELLESPERIODE",resultat:{innvilget:!0,trekkerMinsterett:!1,trekkerDager:!0,årsak:"ANNET"}}]},Le={dekningsgrad:"HUNDRE",perioder:[{fom:"2024-07-07",tom:"2024-07-24",kontoType:"FEDREKVOTE",overføringÅrsak:"INSTITUSJONSOPPHOLD_ANNEN_FORELDER",resultat:{innvilget:!0,trekkerMinsterett:!1,trekkerDager:!0,årsak:"ANNET"}},{fom:"2024-08-11",tom:"2024-08-12",kontoType:"FELLESPERIODE",resultat:{innvilget:!0,trekkerMinsterett:!1,trekkerDager:!0,årsak:"ANNET"}}]},g={fnr:"19047815714",fornavn:"Hanne",etternavn:"Mygg",kjønn:"K",fødselsdato:"1978-04-19"},p={fnr:"19047815715",fornavn:"Hans",etternavn:"Mygg",kjønn:"M",fødselsdato:"1972-06-07"},l=()=>()=>(t("button-click")(),Promise.resolve()),Ye={title:"steps/FordelingSteg",component:W,decorators:[_e],render:({gåTilNesteSide:Ue,søkersituasjon:Ee,annenForelder:be,barnet:he,dekningsgrad:ye,...je})=>J.jsx(Pe,{initialEntries:[Ie.FORDELING],children:J.jsx(He,{onDispatch:Ue,initialState:{[i.SØKERSITUASJON]:Ee,[i.OM_BARNET]:he,[i.ARBEIDSFORHOLD_OG_INNTEKT]:{harHattAndreInntektskilder:!1,harJobbetSomFrilans:!1,harJobbetSomSelvstendigNæringsdrivende:!1},[i.ANNEN_FORELDER]:be,[i.PERIODE_MED_FORELDREPENGER]:ye},children:J.jsx(W,{...je})})})},k={kontoer:[{}],minsteretter:{}},m={parameters:{msw:{handlers:[e.post(s,()=>new r(null,{status:200})),e.post(d,()=>r.json({80:{kontoer:[{konto:n.Foreldrepenger,dager:280},{konto:n.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},100:k}))]}},args:{søker:g,erAleneOmOmsorg:!0,søkersituasjon:{situasjon:"fødsel",rolle:"mor"},barnet:{type:o.FØDT,fødselsdatoer:["2021-09-21"],antallBarn:1,termindato:"2021-09-24"},annenForelder:{fornavn:"Hans",etternavn:"Utvikler",kanIkkeOppgis:!1,erAleneOmOmsorg:!0,datoForAleneomsorg:"2021-09-21"},dekningsgrad:a.ÅTTI_PROSENT,arbeidsforhold:[],mellomlagreSøknadOgNaviger:l(),avbrytSøknad:t("button-click")}},T={parameters:{msw:{handlers:[e.post(s,()=>new r(null,{status:200})),e.post(d,()=>r.json({80:k,100:{kontoer:[{konto:n.Foreldrepenger,dager:294},{konto:n.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:10,toTette:0},tillegg:{prematur:64,flerbarn:0}}}))]}},args:{søker:g,erAleneOmOmsorg:!0,søkersituasjon:{situasjon:"fødsel",rolle:"mor"},barnet:{type:o.FØDT,fødselsdatoer:["2023-09-21"],antallBarn:1,termindato:"2023-12-20"},annenForelder:{fornavn:"Hans",etternavn:"Utvikler",erAleneOmOmsorg:!0,datoForAleneomsorg:"2023-09-21",kanIkkeOppgis:!1},dekningsgrad:a.HUNDRE_PROSENT,arbeidsforhold:[],mellomlagreSøknadOgNaviger:l(),avbrytSøknad:t("button-click")}},u={parameters:{msw:{handlers:[e.post(s,()=>new r(null,{status:200})),e.post(d,()=>r.json({80:k,100:{kontoer:[{konto:n.Foreldrepenger,dager:460}],minsteretter:{farRundtFødsel:0,toTette:0}}}))]}},args:{søker:g,erAleneOmOmsorg:!0,søkersituasjon:{situasjon:"adopsjon",rolle:"mor"},barnet:{type:o.ADOPTERT_STEBARN,fødselsdatoer:["2024-02-21"],antallBarn:3,adopsjonsdato:"2024-02-21"},annenForelder:{kanIkkeOppgis:!0},dekningsgrad:a.HUNDRE_PROSENT,arbeidsforhold:[],mellomlagreSøknadOgNaviger:l(),avbrytSøknad:t("button-click")}},F={parameters:{msw:{handlers:[e.post(s,()=>new r(null,{status:200})),e.post(d,()=>r.json({80:k,100:{kontoer:[{konto:n.Foreldrepenger,dager:385}],minsteretter:{farRundtFødsel:10,toTette:0}}}))]}},args:{søker:p,erAleneOmOmsorg:!0,søkersituasjon:{situasjon:"fødsel",rolle:"far"},barnet:{type:o.FØDT,fødselsdatoer:["2023-09-21"],antallBarn:2,termindato:"2023-09-21"},annenForelder:{fornavn:"Hanne",etternavn:"Utvikler",erAleneOmOmsorg:!0,datoForAleneomsorg:"2023-09-23",kanIkkeOppgis:!1},dekningsgrad:a.HUNDRE_PROSENT,arbeidsforhold:[],mellomlagreSøknadOgNaviger:l(),avbrytSøknad:t("button-click")}},N={parameters:{msw:{handlers:[e.post(s,()=>new r(null,{status:200})),e.post(d,()=>r.json({80:k,100:{kontoer:[{konto:n.Foreldrepenger,dager:460}],minsteretter:{farRundtFødsel:0,toTette:0}}}))]}},args:{søker:p,erAleneOmOmsorg:!0,søkersituasjon:{situasjon:"fødsel",rolle:"far"},barnet:{type:o.FØDT,fødselsdatoer:["2021-09-21"],antallBarn:4,termindato:"2021-09-21"},annenForelder:{fornavn:"Hanne",etternavn:"Utvikler",erAleneOmOmsorg:!0,datoForAleneomsorg:"2021-09-21",kanIkkeOppgis:!1},dekningsgrad:a.HUNDRE_PROSENT,arbeidsforhold:[],mellomlagreSøknadOgNaviger:l(),avbrytSøknad:t("button-click")}},f={parameters:{msw:{handlers:[e.post(s,()=>new r(null,{status:200})),e.post(d,()=>r.json({80:k,100:{kontoer:[{konto:n.Foreldrepenger,dager:460}],minsteretter:{farRundtFødsel:0,toTette:0}}}))]}},args:{søker:p,erAleneOmOmsorg:!0,søkersituasjon:{situasjon:"fødsel",rolle:"far"},barnet:{type:o.FØDT,fødselsdatoer:["2022-07-21"],antallBarn:3,termindato:"2022-07-21"},annenForelder:{fornavn:"Hanne",etternavn:"Utvikler",erAleneOmOmsorg:!0,datoForAleneomsorg:"2022-09-21",kanIkkeOppgis:!1},dekningsgrad:a.HUNDRE_PROSENT,arbeidsforhold:[],mellomlagreSøknadOgNaviger:l(),avbrytSøknad:t("button-click")}},S={parameters:{msw:{handlers:[e.post(s,()=>new r(null,{status:200})),e.post(d,()=>r.json({80:k,100:{kontoer:[{konto:n.Foreldrepenger,dager:230}],minsteretter:{farRundtFødsel:10,toTette:0}}}))]}},args:{søker:p,erAleneOmOmsorg:!0,søkersituasjon:{situasjon:"fødsel",rolle:"far"},barnet:{type:o.UFØDT,antallBarn:3,termindato:"2024-07-21"},annenForelder:{erAleneOmOmsorg:!0,fornavn:"Hanne",etternavn:"Utvikler",datoForAleneomsorg:"2024-09-21",kanIkkeOppgis:!1},dekningsgrad:a.HUNDRE_PROSENT,arbeidsforhold:[],mellomlagreSøknadOgNaviger:l(),avbrytSøknad:t("button-click")}},O={parameters:{msw:{handlers:[e.post(s,()=>new r(null,{status:200})),e.post(d,()=>r.json({80:k,100:{kontoer:[{konto:n.Foreldrepenger,dager:273}],minsteretter:{farRundtFødsel:0,toTette:0},tillegg:{prematur:64,flerbarn:0}}}))]}},args:{søker:p,erAleneOmOmsorg:!0,søkersituasjon:{situasjon:"fødsel",rolle:"far"},barnet:{type:o.FØDT,antallBarn:1,fødselsdatoer:["2024-01-21"],termindato:"2024-04-21"},annenForelder:{fornavn:"Hanne",etternavn:"Utvikler",erAleneOmOmsorg:!0,datoForAleneomsorg:"2024-01-21",kanIkkeOppgis:!1},dekningsgrad:a.HUNDRE_PROSENT,arbeidsforhold:[],mellomlagreSøknadOgNaviger:l(),avbrytSøknad:t("button-click")}},c={parameters:{msw:{handlers:[e.post(s,()=>new r(null,{status:200})),e.post(d,()=>r.json({80:k,100:{kontoer:[{konto:n.Foreldrepenger,dager:460}],minsteretter:{farRundtFødsel:0,toTette:0}}}))]}},args:{søker:p,erAleneOmOmsorg:!0,søkersituasjon:{situasjon:"adopsjon",rolle:"far"},barnet:{type:o.ADOPTERT_ANNET_BARN,fødselsdatoer:["2021-08-21"],antallBarn:4,adopsjonsdato:"2021-08-23"},annenForelder:{fornavn:"Hanne",etternavn:"Utvikler",erAleneOmOmsorg:!0,datoForAleneomsorg:"2024-01-21",kanIkkeOppgis:!1},dekningsgrad:a.HUNDRE_PROSENT,arbeidsforhold:[],mellomlagreSøknadOgNaviger:l(),avbrytSøknad:t("button-click")}},R={parameters:{msw:{handlers:[e.post(s,()=>new r(void 0,{status:200})),e.post(d,()=>r.json({80:k,100:{kontoer:[{konto:n.Mødrekvote,dager:75},{konto:n.Fedrekvote,dager:75},{konto:n.Fellesperiode,dager:100},{konto:n.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:10,toTette:0},tillegg:{prematur:65,flerbarn:0}}}))]}},args:{søker:g,søkersituasjon:{situasjon:"fødsel",rolle:"mor"},barnet:{type:o.FØDT,fødselsdatoer:["2023-09-21"],antallBarn:1,termindato:"2023-12-21"},annenForelder:{fornavn:"Hans",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1},dekningsgrad:a.HUNDRE_PROSENT,arbeidsforhold:[],mellomlagreSøknadOgNaviger:l(),avbrytSøknad:t("button-click")}},v={parameters:{msw:{handlers:[e.post(s,()=>new r(null,{status:200})),e.post(d,()=>r.json({80:{kontoer:[{konto:n.Mødrekvote,dager:95},{konto:n.Fedrekvote,dager:95},{konto:n.Fellesperiode,dager:101},{konto:n.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:10,toTette:0},tillegg:{prematur:0,flerbarn:0}},100:k}))]}},args:{søker:g,søkersituasjon:{situasjon:"fødsel",rolle:"mor"},barnet:{type:o.UFØDT,antallBarn:1,termindato:"2024-08-21"},annenForelder:{fornavn:"Petter",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1},dekningsgrad:a.ÅTTI_PROSENT,arbeidsforhold:[],mellomlagreSøknadOgNaviger:l(),avbrytSøknad:t("button-click")}},A={parameters:{msw:{handlers:[e.post(s,()=>new r(null,{status:200})),e.post(d,()=>r.json({80:k,100:{kontoer:[{konto:n.Mødrekvote,dager:75},{konto:n.Fedrekvote,dager:75},{konto:n.Fellesperiode,dager:80},{konto:n.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:10,toTette:0}}}))]}},args:{søker:g,søkersituasjon:{situasjon:"fødsel",rolle:"mor"},barnet:{type:o.UFØDT,antallBarn:1,termindato:"2024-06-21"},annenForelder:{fornavn:"Hans",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1},dekningsgrad:a.HUNDRE_PROSENT,arbeidsforhold:[],mellomlagreSøknadOgNaviger:l(),avbrytSøknad:t("button-click")}},D={parameters:{msw:{handlers:[e.post(s,()=>new r(null,{status:200})),e.post(d,()=>r.json({80:k,100:{kontoer:[{konto:n.Mødrekvote,dager:75},{konto:n.Fedrekvote,dager:75},{konto:n.Fellesperiode,dager:165},{konto:n.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:10,toTette:0},tillegg:{prematur:0,flerbarn:85}}}))]}},args:{søker:g,søkersituasjon:{situasjon:"fødsel",rolle:"mor"},barnet:{type:o.FØDT,antallBarn:2,fødselsdatoer:["2024-02-21"],termindato:"2024-02-21"},annenForelder:{fornavn:"Hans",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1},dekningsgrad:a.HUNDRE_PROSENT,arbeidsforhold:[],mellomlagreSøknadOgNaviger:l(),avbrytSøknad:t("button-click")}},U={parameters:{msw:{handlers:[e.post(s,()=>r.json(Be)),e.post(d,()=>r.json({80:k,100:{kontoer:[{konto:n.Mødrekvote,dager:75},{konto:n.Fedrekvote,dager:75},{konto:n.Fellesperiode,dager:80},{konto:n.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:10,toTette:0}}}))]}},args:{søker:g,søkersituasjon:{situasjon:"fødsel",rolle:"mor"},barnet:{type:o.UFØDT,antallBarn:1,termindato:"2024-07-21"},annenForelder:{fornavn:"Hans",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1},dekningsgrad:a.HUNDRE_PROSENT,arbeidsforhold:[],mellomlagreSøknadOgNaviger:l(),avbrytSøknad:t("button-click")}},E={parameters:{msw:{handlers:[e.post(s,()=>new r(null,{status:200})),e.post(d,()=>r.json({80:k,100:{kontoer:[{konto:n.Mødrekvote,dager:75},{konto:n.Fedrekvote,dager:75},{konto:n.Fellesperiode,dager:80},{konto:n.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}}))]}},args:{søker:p,søkersituasjon:{situasjon:"fødsel",rolle:"far"},barnet:{type:o.FØDT,antallBarn:1,fødselsdatoer:["2021-07-21"],termindato:"2021-07-21"},annenForelder:{fornavn:"Hanne",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1},dekningsgrad:a.HUNDRE_PROSENT,arbeidsforhold:[],mellomlagreSøknadOgNaviger:l(),avbrytSøknad:t("button-click")}},b={parameters:{msw:{handlers:[e.post(s,()=>new r(null,{status:200})),e.post(d,()=>r.json({80:k,100:{kontoer:[{konto:n.Mødrekvote,dager:75},{konto:n.Fedrekvote,dager:75},{konto:n.Fellesperiode,dager:370},{konto:n.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0},tillegg:{prematur:0,flerbarn:230}}}))]}},args:{søker:p,søkersituasjon:{situasjon:"fødsel",rolle:"far"},barnet:{type:o.FØDT,antallBarn:3,fødselsdatoer:["2022-07-21"],termindato:"2022-07-21"},annenForelder:{fornavn:"Hanne",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1},dekningsgrad:a.HUNDRE_PROSENT,arbeidsforhold:[],mellomlagreSøknadOgNaviger:l(),avbrytSøknad:t("button-click")}},h={parameters:{msw:{handlers:[e.post(s,()=>new r(null,{status:200})),e.post(d,()=>r.json({80:k,100:{kontoer:[{konto:n.Mødrekvote,dager:75},{konto:n.Fedrekvote,dager:75},{konto:n.Fellesperiode,dager:370},{konto:n.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:10,toTette:0}}}))]}},args:{søker:p,søkersituasjon:{situasjon:"fødsel",rolle:"far"},barnet:{type:o.UFØDT,antallBarn:4,termindato:Ae().subtract(2,"months").format(De)},annenForelder:{fornavn:"Hanne",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1},dekningsgrad:a.HUNDRE_PROSENT,arbeidsforhold:[],mellomlagreSøknadOgNaviger:l(),avbrytSøknad:t("button-click")}},y={parameters:{msw:{handlers:[e.post(s,()=>new r(null,{status:200})),e.post(d,()=>r.json({80:k,100:{kontoer:[{konto:n.Mødrekvote,dager:75},{konto:n.Fedrekvote,dager:75},{konto:n.Fellesperiode,dager:100},{konto:n.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:10,toTette:0},tillegg:{flerbarn:0,prematur:64}}}))]}},args:{søker:p,søkersituasjon:{situasjon:"fødsel",rolle:"far"},barnet:{type:o.FØDT,antallBarn:1,fødselsdatoer:["2024-02-21"],termindato:"2024-05-21"},annenForelder:{fornavn:"Hanne",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1},dekningsgrad:a.HUNDRE_PROSENT,arbeidsforhold:[],mellomlagreSøknadOgNaviger:l(),avbrytSøknad:t("button-click")}},j={parameters:{msw:{handlers:[e.post(s,()=>r.json(Le)),e.post(d,()=>r.json({80:k,100:{kontoer:[{konto:n.Mødrekvote,dager:75},{konto:n.Fedrekvote,dager:75},{konto:n.Fellesperiode,dager:80},{konto:n.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:10,toTette:0}}}))]}},args:{søker:p,søkersituasjon:{situasjon:"fødsel",rolle:"far"},barnet:{type:o.FØDT,antallBarn:1,fødselsdatoer:["2024-02-21"],termindato:"2024-02-21"},annenForelder:{fornavn:"Hanne",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1},dekningsgrad:a.HUNDRE_PROSENT,arbeidsforhold:[],mellomlagreSøknadOgNaviger:l(),avbrytSøknad:t("button-click")}},_={parameters:{msw:{handlers:[e.post(s,()=>new r(null,{status:200})),e.post(d,()=>r.json({80:k,100:{kontoer:[{konto:n.Mødrekvote,dager:95},{konto:n.Fedrekvote,dager:95},{konto:n.Fellesperiode,dager:90}],minsteretter:{farRundtFødsel:0,toTette:0}}}))]}},args:{søker:p,søkersituasjon:{situasjon:"adopsjon",rolle:"far"},barnet:{type:o.ADOPTERT_STEBARN,antallBarn:2,fødselsdatoer:["2024-02-21"],adopsjonsdato:"2024-02-21"},annenForelder:{fornavn:"Hanne",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1},dekningsgrad:a.HUNDRE_PROSENT,arbeidsforhold:[],mellomlagreSøknadOgNaviger:l(),avbrytSøknad:t("button-click")}},H={parameters:{msw:{handlers:[e.post(s,()=>new r(null,{status:200})),e.post(d,()=>r.json({80:{kontoer:[{konto:n.Mødrekvote,dager:95},{konto:n.Fedrekvote,dager:95},{konto:n.Fellesperiode,dager:370}],minsteretter:{farRundtFødsel:0,toTette:0}},100:k}))]}},args:{søker:p,søkersituasjon:{situasjon:"adopsjon",rolle:"mor"},barnet:{type:o.ADOPTERT_ANNET_BARN,antallBarn:3,fødselsdatoer:["2021-02-21"],adopsjonsdato:"2021-02-21",ankomstdato:"2021-05-21"},annenForelder:{fornavn:"Hans",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1},dekningsgrad:a.ÅTTI_PROSENT,arbeidsforhold:[],mellomlagreSøknadOgNaviger:l(),avbrytSøknad:t("button-click")}},P={parameters:{msw:{handlers:[e.post(s,()=>new r(null,{status:200})),e.post(d,()=>r.json({80:{kontoer:[{konto:n.Mødrekvote,dager:95},{konto:n.Fedrekvote,dager:95},{konto:n.Fellesperiode,dager:90},{konto:n.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:10,toTette:0}},100:k}))]}},args:{søker:g,søkersituasjon:{situasjon:"fødsel",rolle:"mor"},barnet:{type:o.UFØDT,antallBarn:1,termindato:"2024-07-21"},annenForelder:{fornavn:"Hans",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!1,harOppholdtSegIEØS:!0,harRettPåForeldrepengerIEØS:!0,kanIkkeOppgis:!1},dekningsgrad:a.ÅTTI_PROSENT,arbeidsforhold:[],mellomlagreSøknadOgNaviger:l(),avbrytSøknad:t("button-click")}},I={parameters:{msw:{handlers:[e.post(s,()=>new r(null,{status:200})),e.post(d,()=>r.json({80:k,100:{kontoer:[{konto:n.Mødrekvote,dager:95},{konto:n.Fedrekvote,dager:95},{konto:n.Fellesperiode,dager:90}],minsteretter:{farRundtFødsel:0,toTette:0}}}))]}},args:{søker:p,søkersituasjon:{situasjon:"adopsjon",rolle:"far"},barnet:{type:o.ADOPTERT_STEBARN,antallBarn:1,adopsjonsdato:"2024-02-21",fødselsdatoer:["2024-02-21"]},annenForelder:{fornavn:"Hanne",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!1,harOppholdtSegIEØS:!0,harRettPåForeldrepengerIEØS:!0,kanIkkeOppgis:!1},dekningsgrad:a.HUNDRE_PROSENT,arbeidsforhold:[],mellomlagreSøknadOgNaviger:l(),avbrytSøknad:t("button-click")}},B={parameters:{msw:{handlers:[e.post(s,()=>new r(null,{status:200})),e.post(d,()=>r.json({80:k,100:{kontoer:[{konto:n.Foreldrepenger,dager:230}],minsteretter:{farRundtFødsel:15,toTette:0}}}))]}},args:{søker:g,søkersituasjon:{situasjon:"fødsel",rolle:"mor"},barnet:{type:o.UFØDT,antallBarn:1,termindato:"2024-07-21"},annenForelder:{fornavn:"Hans",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!1,kanIkkeOppgis:!1},dekningsgrad:a.HUNDRE_PROSENT,arbeidsforhold:[],mellomlagreSøknadOgNaviger:l(),avbrytSøknad:t("button-click")}},L={parameters:{msw:{handlers:[e.post(s,()=>new r(null,{status:200})),e.post(d,()=>r.json({80:k,100:{kontoer:[{konto:n.Foreldrepenger,dager:230}],minsteretter:{farRundtFødsel:0,toTette:0}}}))]}},args:{søker:g,søkersituasjon:{situasjon:"adopsjon",rolle:"mor"},barnet:{type:o.ADOPTERT_ANNET_BARN,antallBarn:1,adopsjonsdato:"2022-08-21",fødselsdatoer:["2022-01-01"]},annenForelder:{fornavn:"Hans",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!1,kanIkkeOppgis:!1},dekningsgrad:a.HUNDRE_PROSENT,arbeidsforhold:[],mellomlagreSøknadOgNaviger:l(),avbrytSøknad:t("button-click")}},M={parameters:{msw:{handlers:[e.post(s,()=>new r(null,{status:200})),e.post(d,()=>r.json({80:k,100:{kontoer:[{konto:n.Foreldrepenger,dager:155},{konto:n.AktivitetsfriKvote,dager:375}],minsteretter:{farRundtFødsel:10,toTette:0}}}))]}},args:{søker:p,søkersituasjon:{situasjon:"fødsel",rolle:"far"},barnet:{type:o.UFØDT,antallBarn:4,termindato:Ae().subtract(2,"months").format(De)},annenForelder:{fornavn:"Hanne",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!1,kanIkkeOppgis:!1,erMorUfør:!0},dekningsgrad:a.HUNDRE_PROSENT,arbeidsforhold:[],mellomlagreSøknadOgNaviger:l(),avbrytSøknad:t("button-click")}},K={parameters:{msw:{handlers:[e.post(s,()=>new r(null,{status:200})),e.post(d,()=>r.json({80:k,100:{kontoer:[{konto:n.Foreldrepenger,dager:210},{konto:n.AktivitetsfriKvote,dager:40}],minsteretter:{farRundtFødsel:10,toTette:0}}}))]}},args:{søker:p,søkersituasjon:{situasjon:"fødsel",rolle:"far"},barnet:{type:o.FØDT,antallBarn:1,fødselsdatoer:["2024-01-21"],termindato:"2024-01-21"},annenForelder:{fornavn:"Hanne",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!1,kanIkkeOppgis:!1,erMorUfør:!1},dekningsgrad:a.HUNDRE_PROSENT,arbeidsforhold:[],mellomlagreSøknadOgNaviger:l(),avbrytSøknad:t("button-click")}},w={parameters:{msw:{handlers:[e.post(s,()=>new r(null,{status:200})),e.post(d,()=>r.json({80:k,100:{kontoer:[{konto:n.Foreldrepenger,dager:285}],minsteretter:{farRundtFødsel:0,toTette:0}}}))]}},args:{søker:p,søkersituasjon:{situasjon:"fødsel",rolle:"far"},barnet:{type:o.FØDT,antallBarn:2,fødselsdatoer:["2021-07-21"],termindato:"2021-07-21"},annenForelder:{fornavn:"Hanne",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!1,kanIkkeOppgis:!1,erMorUfør:!0},dekningsgrad:a.HUNDRE_PROSENT,arbeidsforhold:[],mellomlagreSøknadOgNaviger:l(),avbrytSøknad:t("button-click")}},x={parameters:{msw:{handlers:[e.post(s,()=>new r(null,{status:200})),e.post(d,()=>r.json({80:k,100:{kontoer:[{konto:n.Foreldrepenger,dager:125},{konto:n.AktivitetsfriKvote,dager:75}],minsteretter:{farRundtFødsel:10,toTette:0}}}))]}},args:{søker:p,søkersituasjon:{situasjon:"adopsjon",rolle:"far"},barnet:{type:o.ADOPTERT_STEBARN,antallBarn:1,fødselsdatoer:["2024-02-21"],adopsjonsdato:"2024-02-21"},annenForelder:{fornavn:"Hanne",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!1,erMorUfør:!0,kanIkkeOppgis:!1},dekningsgrad:a.HUNDRE_PROSENT,arbeidsforhold:[],mellomlagreSøknadOgNaviger:l(),avbrytSøknad:t("button-click")}};var C,G,V;m.parameters={...m.parameters,docs:{...(C=m.parameters)==null?void 0:C.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.post(UTTAKSPLAN_ANNEN_URL, () => new HttpResponse(null, {
        status: 200
      })), http.post(STØNADSKONTO_URL, () => HttpResponse.json({
        '80': {
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
        '100': DEFAULT_STØNADSKONTO
      }))]
    }
  },
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
    dekningsgrad: Dekningsgrad.ÅTTI_PROSENT,
    arbeidsforhold: [],
    mellomlagreSøknadOgNaviger: promiseAction(),
    avbrytSøknad: action('button-click')
  }
}`,...(V=(G=m.parameters)==null?void 0:G.docs)==null?void 0:V.source}}};var $,z,Q;T.parameters={...T.parameters,docs:{...($=T.parameters)==null?void 0:$.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.post(UTTAKSPLAN_ANNEN_URL, () => new HttpResponse(null, {
        status: 200
      })), http.post(STØNADSKONTO_URL, () => HttpResponse.json({
        '80': DEFAULT_STØNADSKONTO,
        '100': {
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
        }
      }))]
    }
  },
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
    dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
    arbeidsforhold: [],
    mellomlagreSøknadOgNaviger: promiseAction(),
    avbrytSøknad: action('button-click')
  }
}`,...(Q=(z=T.parameters)==null?void 0:z.docs)==null?void 0:Q.source}}};var Y,q,X;u.parameters={...u.parameters,docs:{...(Y=u.parameters)==null?void 0:Y.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.post(UTTAKSPLAN_ANNEN_URL, () => new HttpResponse(null, {
        status: 200
      })), http.post(STØNADSKONTO_URL, () => HttpResponse.json({
        '80': DEFAULT_STØNADSKONTO,
        '100': {
          kontoer: [{
            konto: StønadskontoType.Foreldrepenger,
            dager: 460
          }],
          minsteretter: {
            farRundtFødsel: 0,
            toTette: 0
          }
        }
      }))]
    }
  },
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
    dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
    arbeidsforhold: [],
    mellomlagreSøknadOgNaviger: promiseAction(),
    avbrytSøknad: action('button-click')
  }
}`,...(X=(q=u.parameters)==null?void 0:q.docs)==null?void 0:X.source}}};var Z,nn,en;F.parameters={...F.parameters,docs:{...(Z=F.parameters)==null?void 0:Z.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.post(UTTAKSPLAN_ANNEN_URL, () => new HttpResponse(null, {
        status: 200
      })), http.post(STØNADSKONTO_URL, () => HttpResponse.json({
        '80': DEFAULT_STØNADSKONTO,
        '100': {
          kontoer: [{
            konto: StønadskontoType.Foreldrepenger,
            dager: 385
          }],
          minsteretter: {
            farRundtFødsel: 10,
            toTette: 0
          }
        }
      }))]
    }
  },
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
    dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
    arbeidsforhold: [],
    mellomlagreSøknadOgNaviger: promiseAction(),
    avbrytSøknad: action('button-click')
  }
}`,...(en=(nn=F.parameters)==null?void 0:nn.docs)==null?void 0:en.source}}};var rn,tn,an;N.parameters={...N.parameters,docs:{...(rn=N.parameters)==null?void 0:rn.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.post(UTTAKSPLAN_ANNEN_URL, () => new HttpResponse(null, {
        status: 200
      })), http.post(STØNADSKONTO_URL, () => HttpResponse.json({
        '80': DEFAULT_STØNADSKONTO,
        '100': {
          kontoer: [{
            konto: StønadskontoType.Foreldrepenger,
            dager: 460
          }],
          minsteretter: {
            farRundtFødsel: 0,
            toTette: 0
          }
        }
      }))]
    }
  },
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
    dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
    arbeidsforhold: [],
    mellomlagreSøknadOgNaviger: promiseAction(),
    avbrytSøknad: action('button-click')
  }
}`,...(an=(tn=N.parameters)==null?void 0:tn.docs)==null?void 0:an.source}}};var on,sn,dn;f.parameters={...f.parameters,docs:{...(on=f.parameters)==null?void 0:on.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.post(UTTAKSPLAN_ANNEN_URL, () => new HttpResponse(null, {
        status: 200
      })), http.post(STØNADSKONTO_URL, () => HttpResponse.json({
        '80': DEFAULT_STØNADSKONTO,
        '100': {
          kontoer: [{
            konto: StønadskontoType.Foreldrepenger,
            dager: 460
          }],
          minsteretter: {
            farRundtFødsel: 0,
            toTette: 0
          }
        }
      }))]
    }
  },
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
    dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
    arbeidsforhold: [],
    mellomlagreSøknadOgNaviger: promiseAction(),
    avbrytSøknad: action('button-click')
  }
}`,...(dn=(sn=f.parameters)==null?void 0:sn.docs)==null?void 0:dn.source}}};var ln,kn,pn;S.parameters={...S.parameters,docs:{...(ln=S.parameters)==null?void 0:ln.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.post(UTTAKSPLAN_ANNEN_URL, () => new HttpResponse(null, {
        status: 200
      })), http.post(STØNADSKONTO_URL, () => HttpResponse.json({
        '80': DEFAULT_STØNADSKONTO,
        '100': {
          kontoer: [{
            konto: StønadskontoType.Foreldrepenger,
            dager: 230
          }],
          minsteretter: {
            farRundtFødsel: 10,
            toTette: 0
          }
        }
      }))]
    }
  },
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
    dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
    arbeidsforhold: [],
    mellomlagreSøknadOgNaviger: promiseAction(),
    avbrytSøknad: action('button-click')
  }
}`,...(pn=(kn=S.parameters)==null?void 0:kn.docs)==null?void 0:pn.source}}};var gn,mn,Tn;O.parameters={...O.parameters,docs:{...(gn=O.parameters)==null?void 0:gn.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.post(UTTAKSPLAN_ANNEN_URL, () => new HttpResponse(null, {
        status: 200
      })), http.post(STØNADSKONTO_URL, () => HttpResponse.json({
        '80': DEFAULT_STØNADSKONTO,
        '100': {
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
        }
      }))]
    }
  },
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
    dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
    arbeidsforhold: [],
    mellomlagreSøknadOgNaviger: promiseAction(),
    avbrytSøknad: action('button-click')
  }
}`,...(Tn=(mn=O.parameters)==null?void 0:mn.docs)==null?void 0:Tn.source}}};var un,Fn,Nn;c.parameters={...c.parameters,docs:{...(un=c.parameters)==null?void 0:un.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.post(UTTAKSPLAN_ANNEN_URL, () => new HttpResponse(null, {
        status: 200
      })), http.post(STØNADSKONTO_URL, () => HttpResponse.json({
        '80': DEFAULT_STØNADSKONTO,
        '100': {
          kontoer: [{
            konto: StønadskontoType.Foreldrepenger,
            dager: 460
          }],
          minsteretter: {
            farRundtFødsel: 0,
            toTette: 0
          }
        }
      }))]
    }
  },
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
    dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
    arbeidsforhold: [],
    mellomlagreSøknadOgNaviger: promiseAction(),
    avbrytSøknad: action('button-click')
  }
}`,...(Nn=(Fn=c.parameters)==null?void 0:Fn.docs)==null?void 0:Nn.source}}};var fn,Sn,On;R.parameters={...R.parameters,docs:{...(fn=R.parameters)==null?void 0:fn.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.post(UTTAKSPLAN_ANNEN_URL, () => new HttpResponse(undefined, {
        status: 200
      })), http.post(STØNADSKONTO_URL, () => HttpResponse.json({
        '80': DEFAULT_STØNADSKONTO,
        '100': {
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
        }
      }))]
    }
  },
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
    dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
    arbeidsforhold: [],
    mellomlagreSøknadOgNaviger: promiseAction(),
    avbrytSøknad: action('button-click')
  }
}`,...(On=(Sn=R.parameters)==null?void 0:Sn.docs)==null?void 0:On.source}}};var cn,Rn,vn;v.parameters={...v.parameters,docs:{...(cn=v.parameters)==null?void 0:cn.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.post(UTTAKSPLAN_ANNEN_URL, () => new HttpResponse(null, {
        status: 200
      })), http.post(STØNADSKONTO_URL, () => HttpResponse.json({
        '80': {
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
        '100': DEFAULT_STØNADSKONTO
      }))]
    }
  },
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
    dekningsgrad: Dekningsgrad.ÅTTI_PROSENT,
    arbeidsforhold: [],
    mellomlagreSøknadOgNaviger: promiseAction(),
    avbrytSøknad: action('button-click')
  }
}`,...(vn=(Rn=v.parameters)==null?void 0:Rn.docs)==null?void 0:vn.source}}};var An,Dn,Un;A.parameters={...A.parameters,docs:{...(An=A.parameters)==null?void 0:An.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.post(UTTAKSPLAN_ANNEN_URL, () => new HttpResponse(null, {
        status: 200
      })), http.post(STØNADSKONTO_URL, () => HttpResponse.json({
        '80': DEFAULT_STØNADSKONTO,
        '100': {
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
        }
      }))]
    }
  },
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
    dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
    arbeidsforhold: [],
    mellomlagreSøknadOgNaviger: promiseAction(),
    avbrytSøknad: action('button-click')
  }
}`,...(Un=(Dn=A.parameters)==null?void 0:Dn.docs)==null?void 0:Un.source}}};var En,bn,hn;D.parameters={...D.parameters,docs:{...(En=D.parameters)==null?void 0:En.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.post(UTTAKSPLAN_ANNEN_URL, () => new HttpResponse(null, {
        status: 200
      })), http.post(STØNADSKONTO_URL, () => HttpResponse.json({
        '80': DEFAULT_STØNADSKONTO,
        '100': {
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
        }
      }))]
    }
  },
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
    dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
    arbeidsforhold: [],
    mellomlagreSøknadOgNaviger: promiseAction(),
    avbrytSøknad: action('button-click')
  }
}`,...(hn=(bn=D.parameters)==null?void 0:bn.docs)==null?void 0:hn.source}}};var yn,jn,_n;U.parameters={...U.parameters,docs:{...(yn=U.parameters)==null?void 0:yn.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.post(UTTAKSPLAN_ANNEN_URL, () => HttpResponse.json(vedtakFar)), http.post(STØNADSKONTO_URL, () => HttpResponse.json({
        '80': DEFAULT_STØNADSKONTO,
        '100': {
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
        }
      }))]
    }
  },
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
    dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
    arbeidsforhold: [],
    mellomlagreSøknadOgNaviger: promiseAction(),
    avbrytSøknad: action('button-click')
  }
}`,...(_n=(jn=U.parameters)==null?void 0:jn.docs)==null?void 0:_n.source}}};var Hn,Pn,In;E.parameters={...E.parameters,docs:{...(Hn=E.parameters)==null?void 0:Hn.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.post(UTTAKSPLAN_ANNEN_URL, () => new HttpResponse(null, {
        status: 200
      })), http.post(STØNADSKONTO_URL, () => HttpResponse.json({
        '80': DEFAULT_STØNADSKONTO,
        '100': {
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
        }
      }))]
    }
  },
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
    dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
    arbeidsforhold: [],
    mellomlagreSøknadOgNaviger: promiseAction(),
    avbrytSøknad: action('button-click')
  }
}`,...(In=(Pn=E.parameters)==null?void 0:Pn.docs)==null?void 0:In.source}}};var Bn,Ln,Mn;b.parameters={...b.parameters,docs:{...(Bn=b.parameters)==null?void 0:Bn.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.post(UTTAKSPLAN_ANNEN_URL, () => new HttpResponse(null, {
        status: 200
      })), http.post(STØNADSKONTO_URL, () => HttpResponse.json({
        '80': DEFAULT_STØNADSKONTO,
        '100': {
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
        }
      }))]
    }
  },
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
    dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
    arbeidsforhold: [],
    mellomlagreSøknadOgNaviger: promiseAction(),
    avbrytSøknad: action('button-click')
  }
}`,...(Mn=(Ln=b.parameters)==null?void 0:Ln.docs)==null?void 0:Mn.source}}};var Kn,wn,xn;h.parameters={...h.parameters,docs:{...(Kn=h.parameters)==null?void 0:Kn.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.post(UTTAKSPLAN_ANNEN_URL, () => new HttpResponse(null, {
        status: 200
      })), http.post(STØNADSKONTO_URL, () => HttpResponse.json({
        '80': DEFAULT_STØNADSKONTO,
        '100': {
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
        }
      }))]
    }
  },
  args: {
    søker: søkerInfoMann,
    søkersituasjon: {
      situasjon: 'fødsel',
      rolle: 'far'
    },
    barnet: {
      type: BarnType.UFØDT,
      antallBarn: 4,
      termindato: dayjs().subtract(2, 'months').format(ISO_DATE_FORMAT)
    },
    annenForelder: {
      fornavn: 'Hanne',
      etternavn: 'Utvikler',
      fnr: '1212121313',
      harRettPåForeldrepengerINorge: true,
      kanIkkeOppgis: false
    },
    dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
    arbeidsforhold: [],
    mellomlagreSøknadOgNaviger: promiseAction(),
    avbrytSøknad: action('button-click')
  }
}`,...(xn=(wn=h.parameters)==null?void 0:wn.docs)==null?void 0:xn.source}}};var Jn,Wn,Cn;y.parameters={...y.parameters,docs:{...(Jn=y.parameters)==null?void 0:Jn.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.post(UTTAKSPLAN_ANNEN_URL, () => new HttpResponse(null, {
        status: 200
      })), http.post(STØNADSKONTO_URL, () => HttpResponse.json({
        '80': DEFAULT_STØNADSKONTO,
        '100': {
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
        }
      }))]
    }
  },
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
    dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
    arbeidsforhold: [],
    mellomlagreSøknadOgNaviger: promiseAction(),
    avbrytSøknad: action('button-click')
  }
}`,...(Cn=(Wn=y.parameters)==null?void 0:Wn.docs)==null?void 0:Cn.source}}};var Gn,Vn,$n;j.parameters={...j.parameters,docs:{...(Gn=j.parameters)==null?void 0:Gn.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.post(UTTAKSPLAN_ANNEN_URL, () => HttpResponse.json(vedtakMor)), http.post(STØNADSKONTO_URL, () => HttpResponse.json({
        '80': DEFAULT_STØNADSKONTO,
        '100': {
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
        }
      }))]
    }
  },
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
    dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
    arbeidsforhold: [],
    mellomlagreSøknadOgNaviger: promiseAction(),
    avbrytSøknad: action('button-click')
  }
}`,...($n=(Vn=j.parameters)==null?void 0:Vn.docs)==null?void 0:$n.source}}};var zn,Qn,Yn;_.parameters={..._.parameters,docs:{...(zn=_.parameters)==null?void 0:zn.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.post(UTTAKSPLAN_ANNEN_URL, () => new HttpResponse(null, {
        status: 200
      })), http.post(STØNADSKONTO_URL, () => HttpResponse.json({
        '80': DEFAULT_STØNADSKONTO,
        '100': {
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
        }
      }))]
    }
  },
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
    dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
    arbeidsforhold: [],
    mellomlagreSøknadOgNaviger: promiseAction(),
    avbrytSøknad: action('button-click')
  }
}`,...(Yn=(Qn=_.parameters)==null?void 0:Qn.docs)==null?void 0:Yn.source}}};var qn,Xn,Zn;H.parameters={...H.parameters,docs:{...(qn=H.parameters)==null?void 0:qn.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.post(UTTAKSPLAN_ANNEN_URL, () => new HttpResponse(null, {
        status: 200
      })), http.post(STØNADSKONTO_URL, () => HttpResponse.json({
        '80': {
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
        '100': DEFAULT_STØNADSKONTO
      }))]
    }
  },
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
    dekningsgrad: Dekningsgrad.ÅTTI_PROSENT,
    arbeidsforhold: [],
    mellomlagreSøknadOgNaviger: promiseAction(),
    avbrytSøknad: action('button-click')
  }
}`,...(Zn=(Xn=H.parameters)==null?void 0:Xn.docs)==null?void 0:Zn.source}}};var ne,ee,re;P.parameters={...P.parameters,docs:{...(ne=P.parameters)==null?void 0:ne.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.post(UTTAKSPLAN_ANNEN_URL, () => new HttpResponse(null, {
        status: 200
      })), http.post(STØNADSKONTO_URL, () => HttpResponse.json({
        '80': {
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
        '100': DEFAULT_STØNADSKONTO
      }))]
    }
  },
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
    dekningsgrad: Dekningsgrad.ÅTTI_PROSENT,
    arbeidsforhold: [],
    mellomlagreSøknadOgNaviger: promiseAction(),
    avbrytSøknad: action('button-click')
  }
}`,...(re=(ee=P.parameters)==null?void 0:ee.docs)==null?void 0:re.source}}};var te,ae,oe;I.parameters={...I.parameters,docs:{...(te=I.parameters)==null?void 0:te.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.post(UTTAKSPLAN_ANNEN_URL, () => new HttpResponse(null, {
        status: 200
      })), http.post(STØNADSKONTO_URL, () => HttpResponse.json({
        '80': DEFAULT_STØNADSKONTO,
        '100': {
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
        }
      }))]
    }
  },
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
    dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
    arbeidsforhold: [],
    mellomlagreSøknadOgNaviger: promiseAction(),
    avbrytSøknad: action('button-click')
  }
}`,...(oe=(ae=I.parameters)==null?void 0:ae.docs)==null?void 0:oe.source}}};var se,de,le;B.parameters={...B.parameters,docs:{...(se=B.parameters)==null?void 0:se.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.post(UTTAKSPLAN_ANNEN_URL, () => new HttpResponse(null, {
        status: 200
      })), http.post(STØNADSKONTO_URL, () => HttpResponse.json({
        '80': DEFAULT_STØNADSKONTO,
        '100': {
          kontoer: [{
            konto: StønadskontoType.Foreldrepenger,
            dager: 230
          }],
          minsteretter: {
            farRundtFødsel: 15,
            toTette: 0
          }
        }
      }))]
    }
  },
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
    dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
    arbeidsforhold: [],
    mellomlagreSøknadOgNaviger: promiseAction(),
    avbrytSøknad: action('button-click')
  }
}`,...(le=(de=B.parameters)==null?void 0:de.docs)==null?void 0:le.source}}};var ke,pe,ge;L.parameters={...L.parameters,docs:{...(ke=L.parameters)==null?void 0:ke.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.post(UTTAKSPLAN_ANNEN_URL, () => new HttpResponse(null, {
        status: 200
      })), http.post(STØNADSKONTO_URL, () => HttpResponse.json({
        '80': DEFAULT_STØNADSKONTO,
        '100': {
          kontoer: [{
            konto: StønadskontoType.Foreldrepenger,
            dager: 230
          }],
          minsteretter: {
            farRundtFødsel: 0,
            toTette: 0
          }
        }
      }))]
    }
  },
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
    dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
    arbeidsforhold: [],
    mellomlagreSøknadOgNaviger: promiseAction(),
    avbrytSøknad: action('button-click')
  }
}`,...(ge=(pe=L.parameters)==null?void 0:pe.docs)==null?void 0:ge.source}}};var ie,me,Te;M.parameters={...M.parameters,docs:{...(ie=M.parameters)==null?void 0:ie.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.post(UTTAKSPLAN_ANNEN_URL, () => new HttpResponse(null, {
        status: 200
      })), http.post(STØNADSKONTO_URL, () => HttpResponse.json({
        '80': DEFAULT_STØNADSKONTO,
        '100': {
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
        }
      }))]
    }
  },
  args: {
    søker: søkerInfoMann,
    søkersituasjon: {
      situasjon: 'fødsel',
      rolle: 'far'
    },
    barnet: {
      type: BarnType.UFØDT,
      antallBarn: 4,
      termindato: dayjs().subtract(2, 'months').format(ISO_DATE_FORMAT)
    },
    annenForelder: {
      fornavn: 'Hanne',
      etternavn: 'Utvikler',
      fnr: '1212121313',
      harRettPåForeldrepengerINorge: false,
      kanIkkeOppgis: false,
      erMorUfør: true
    },
    dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
    arbeidsforhold: [],
    mellomlagreSøknadOgNaviger: promiseAction(),
    avbrytSøknad: action('button-click')
  }
}`,...(Te=(me=M.parameters)==null?void 0:me.docs)==null?void 0:Te.source}}};var ue,Fe,Ne;K.parameters={...K.parameters,docs:{...(ue=K.parameters)==null?void 0:ue.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.post(UTTAKSPLAN_ANNEN_URL, () => new HttpResponse(null, {
        status: 200
      })), http.post(STØNADSKONTO_URL, () => HttpResponse.json({
        '80': DEFAULT_STØNADSKONTO,
        '100': {
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
        }
      }))]
    }
  },
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
    dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
    arbeidsforhold: [],
    mellomlagreSøknadOgNaviger: promiseAction(),
    avbrytSøknad: action('button-click')
  }
}`,...(Ne=(Fe=K.parameters)==null?void 0:Fe.docs)==null?void 0:Ne.source}}};var fe,Se,Oe;w.parameters={...w.parameters,docs:{...(fe=w.parameters)==null?void 0:fe.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.post(UTTAKSPLAN_ANNEN_URL, () => new HttpResponse(null, {
        status: 200
      })), http.post(STØNADSKONTO_URL, () => HttpResponse.json({
        '80': DEFAULT_STØNADSKONTO,
        '100': {
          kontoer: [{
            konto: StønadskontoType.Foreldrepenger,
            dager: 285
          }],
          minsteretter: {
            farRundtFødsel: 0,
            toTette: 0
          }
        }
      }))]
    }
  },
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
    dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
    arbeidsforhold: [],
    mellomlagreSøknadOgNaviger: promiseAction(),
    avbrytSøknad: action('button-click')
  }
}`,...(Oe=(Se=w.parameters)==null?void 0:Se.docs)==null?void 0:Oe.source}}};var ce,Re,ve;x.parameters={...x.parameters,docs:{...(ce=x.parameters)==null?void 0:ce.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.post(UTTAKSPLAN_ANNEN_URL, () => new HttpResponse(null, {
        status: 200
      })), http.post(STØNADSKONTO_URL, () => HttpResponse.json({
        '80': DEFAULT_STØNADSKONTO,
        '100': {
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
        }
      }))]
    }
  },
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
    dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
    arbeidsforhold: [],
    mellomlagreSøknadOgNaviger: promiseAction(),
    avbrytSøknad: action('button-click')
  }
}`,...(ve=(Re=x.parameters)==null?void 0:Re.docs)==null?void 0:ve.source}}};const qe=["MorAleneomsorgDekning80EttBarnFør1Okt2021","MorAleneomsorgEttBarnPrematurFødsel","MorAleneomsorgAdopsjonTrillinger","FarMedmorAleneomsorgFødtTvillinger","FarMedmorAleneomsorgFødtFireBarnFør1Okt2021","FarMedmorAleneomsorgFødtTreBarnFørWLB","FarMedmorAleneomsorgEttBarnTerminEtterWLB","FarMedmorAleneomsorgPrematurtFødtBarn","FarMedmorAleneomsorgAdopsjonFireBarn","MorDeltUttakEttBarnPrematurFødsel","MorDeltUttakEttBarnetter1Juli2024Med80ProsentDekning","MorDeltUttakEttBarnTermin","MorDeltUttakTvillingerFødt","MorDeltUttakFarSøkteMorsKvoteOgFellesperiode","FarMedmorSøkerDeltUttakEttBarnFødtFør1Okt2021","FarMedmorSøkerDeltUttakTrillingerFødtFørWLB","FarMedmorSøkerDeltUttakFireBarnTerminEtterWLB","FarMedmorSøkerDeltUttakEttBarnFødtPrematurt","FarSøkerDerMorHarTattUtFedrekvoteOgFellesperiode","FarSøkerAdopsjonToBarn","MorSøkerAdopsjonTreBarnFraUtlandetFør1Okt2021Dekningsgrad80","MorSøkerFarHarRettIEØSTerminDekningsgrad80","FarMedmorSøkerMorHarRettIEØSAdopsjon","BareMorHarRettTermin","BareMorHarRettAdopsjon","BareFarHarRettOgMorErUførTermin4Barn","BareFarHarRettOgMorErIkkeUførFødtBarn","BareFarHarRettTvillingerFødtFør1Okt2021","BareFarHarRettAdopsjonMorErUfør"];export{x as BareFarHarRettAdopsjonMorErUfør,K as BareFarHarRettOgMorErIkkeUførFødtBarn,M as BareFarHarRettOgMorErUførTermin4Barn,w as BareFarHarRettTvillingerFødtFør1Okt2021,L as BareMorHarRettAdopsjon,B as BareMorHarRettTermin,c as FarMedmorAleneomsorgAdopsjonFireBarn,S as FarMedmorAleneomsorgEttBarnTerminEtterWLB,N as FarMedmorAleneomsorgFødtFireBarnFør1Okt2021,f as FarMedmorAleneomsorgFødtTreBarnFørWLB,F as FarMedmorAleneomsorgFødtTvillinger,O as FarMedmorAleneomsorgPrematurtFødtBarn,E as FarMedmorSøkerDeltUttakEttBarnFødtFør1Okt2021,y as FarMedmorSøkerDeltUttakEttBarnFødtPrematurt,h as FarMedmorSøkerDeltUttakFireBarnTerminEtterWLB,b as FarMedmorSøkerDeltUttakTrillingerFødtFørWLB,I as FarMedmorSøkerMorHarRettIEØSAdopsjon,_ as FarSøkerAdopsjonToBarn,j as FarSøkerDerMorHarTattUtFedrekvoteOgFellesperiode,u as MorAleneomsorgAdopsjonTrillinger,m as MorAleneomsorgDekning80EttBarnFør1Okt2021,T as MorAleneomsorgEttBarnPrematurFødsel,R as MorDeltUttakEttBarnPrematurFødsel,A as MorDeltUttakEttBarnTermin,v as MorDeltUttakEttBarnetter1Juli2024Med80ProsentDekning,U as MorDeltUttakFarSøkteMorsKvoteOgFellesperiode,D as MorDeltUttakTvillingerFødt,H as MorSøkerAdopsjonTreBarnFraUtlandetFør1Okt2021Dekningsgrad80,P as MorSøkerFarHarRettIEØSTerminDekningsgrad80,qe as __namedExportsOrder,Ye as default};
