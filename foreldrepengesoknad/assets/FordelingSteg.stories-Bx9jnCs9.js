import{bp as X,bA as a,bq as o,J as C,_ as J,bB as n,bC as G}from"./iframe-BUvESj0M.js";import{F as Z,C as i}from"./FpDataContext-CIfvUw7f.js";import{M as nn,S as en}from"./useFpNavigator-PXqm2ksa.js";import{h as e,H as r}from"./index-DLVHvHXf.js";import{a as W}from"./FordelingSteg-DzQLK8_w.js";import"./preload-helper-D9Z9MdNV.js";import"./api-DXGWqV1D.js";import"./queries-DcqIw9Tn.js";import"./annenForelderUtils-mu16vRXg.js";import"./eksisterendeSakUtils-BVURKaqn.js";import"./guid-CsArkN6i.js";import"./stønadskontoerUtils-5huw2N77.js";import"./BabyWrapped-EHwl1yey.js";const{action:t}=__STORYBOOK_MODULE_ACTIONS__,s=".//rest/innsyn/v2/annenPartVedtak",d=".//rest/konto",rn={dekningsgrad:"HUNDRE",perioder:[{fom:"2024-02-07",tom:"2024-02-19",kontoType:"MØDREKVOTE",overføringÅrsak:"INSTITUSJONSOPPHOLD_ANNEN_FORELDER",resultat:{innvilget:!0,trekkerMinsterett:!1,trekkerDager:!0,årsak:"ANNET"}},{fom:"2024-06-11",tom:"2024-06-30",kontoType:"FELLESPERIODE",resultat:{innvilget:!0,trekkerMinsterett:!1,trekkerDager:!0,årsak:"ANNET"}}]},tn={dekningsgrad:"HUNDRE",perioder:[{fom:"2024-07-07",tom:"2024-07-24",kontoType:"FEDREKVOTE",overføringÅrsak:"INSTITUSJONSOPPHOLD_ANNEN_FORELDER",resultat:{innvilget:!0,trekkerMinsterett:!1,trekkerDager:!0,årsak:"ANNET"}},{fom:"2024-08-11",tom:"2024-08-12",kontoType:"FELLESPERIODE",resultat:{innvilget:!0,trekkerMinsterett:!1,trekkerDager:!0,årsak:"ANNET"}}]},g={fnr:"19047815714",fornavn:"Hanne",etternavn:"Mygg",kjønn:"K",fødselsdato:"1978-04-19"},p={fnr:"19047815715",fornavn:"Hans",etternavn:"Mygg",kjønn:"M",fødselsdato:"1972-06-07"},l=()=>()=>(t("button-click")(),Promise.resolve()),fn={title:"steps/FordelingSteg",component:W,decorators:[X],render:({gåTilNesteSide:V,søkersituasjon:$,annenForelder:q,barnet:Q,dekningsgrad:Y,...z})=>J.jsx(nn,{initialEntries:[en.FORDELING],children:J.jsx(Z,{onDispatch:V,initialState:{[i.SØKERSITUASJON]:$,[i.OM_BARNET]:Q,[i.ARBEIDSFORHOLD_OG_INNTEKT]:{harHattAndreInntektskilder:!1,harJobbetSomFrilans:!1,harJobbetSomSelvstendigNæringsdrivende:!1},[i.ANNEN_FORELDER]:q,[i.PERIODE_MED_FORELDREPENGER]:Y},children:J.jsx(W,{...z})})})},k={kontoer:[{}],minsteretter:{}},m={parameters:{msw:{handlers:[e.post(s,()=>new r(null,{status:200})),e.post(d,()=>r.json({80:{kontoer:[{konto:n.Foreldrepenger,dager:280},{konto:n.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},100:k}))]}},args:{søker:g,erAleneOmOmsorg:!0,søkersituasjon:{situasjon:"fødsel",rolle:"mor"},barnet:{type:o.FØDT,fødselsdatoer:["2021-09-21"],antallBarn:1,termindato:"2021-09-24"},annenForelder:{fornavn:"Hans",etternavn:"Utvikler",kanIkkeOppgis:!1,erAleneOmOmsorg:!0,datoForAleneomsorg:"2021-09-21"},dekningsgrad:a.ÅTTI_PROSENT,arbeidsforhold:[],mellomlagreSøknadOgNaviger:l(),avbrytSøknad:t("button-click")}},T={parameters:{msw:{handlers:[e.post(s,()=>new r(null,{status:200})),e.post(d,()=>r.json({80:k,100:{kontoer:[{konto:n.Foreldrepenger,dager:294},{konto:n.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:10,toTette:0},tillegg:{prematur:64,flerbarn:0}}}))]}},args:{søker:g,erAleneOmOmsorg:!0,søkersituasjon:{situasjon:"fødsel",rolle:"mor"},barnet:{type:o.FØDT,fødselsdatoer:["2023-09-21"],antallBarn:1,termindato:"2023-12-20"},annenForelder:{fornavn:"Hans",etternavn:"Utvikler",erAleneOmOmsorg:!0,datoForAleneomsorg:"2023-09-21",kanIkkeOppgis:!1},dekningsgrad:a.HUNDRE_PROSENT,arbeidsforhold:[],mellomlagreSøknadOgNaviger:l(),avbrytSøknad:t("button-click")}},u={parameters:{msw:{handlers:[e.post(s,()=>new r(null,{status:200})),e.post(d,()=>r.json({80:k,100:{kontoer:[{konto:n.Foreldrepenger,dager:460}],minsteretter:{farRundtFødsel:0,toTette:0}}}))]}},args:{søker:g,erAleneOmOmsorg:!0,søkersituasjon:{situasjon:"adopsjon",rolle:"mor"},barnet:{type:o.ADOPTERT_STEBARN,fødselsdatoer:["2024-02-21"],antallBarn:3,adopsjonsdato:"2024-02-21"},annenForelder:{kanIkkeOppgis:!0},dekningsgrad:a.HUNDRE_PROSENT,arbeidsforhold:[],mellomlagreSøknadOgNaviger:l(),avbrytSøknad:t("button-click")}},F={parameters:{msw:{handlers:[e.post(s,()=>new r(null,{status:200})),e.post(d,()=>r.json({80:k,100:{kontoer:[{konto:n.Foreldrepenger,dager:385}],minsteretter:{farRundtFødsel:10,toTette:0}}}))]}},args:{søker:p,erAleneOmOmsorg:!0,søkersituasjon:{situasjon:"fødsel",rolle:"far"},barnet:{type:o.FØDT,fødselsdatoer:["2023-09-21"],antallBarn:2,termindato:"2023-09-21"},annenForelder:{fornavn:"Hanne",etternavn:"Utvikler",erAleneOmOmsorg:!0,datoForAleneomsorg:"2023-09-23",kanIkkeOppgis:!1},dekningsgrad:a.HUNDRE_PROSENT,arbeidsforhold:[],mellomlagreSøknadOgNaviger:l(),avbrytSøknad:t("button-click")}},N={parameters:{msw:{handlers:[e.post(s,()=>new r(null,{status:200})),e.post(d,()=>r.json({80:k,100:{kontoer:[{konto:n.Foreldrepenger,dager:460}],minsteretter:{farRundtFødsel:0,toTette:0}}}))]}},args:{søker:p,erAleneOmOmsorg:!0,søkersituasjon:{situasjon:"fødsel",rolle:"far"},barnet:{type:o.FØDT,fødselsdatoer:["2021-09-21"],antallBarn:4,termindato:"2021-09-21"},annenForelder:{fornavn:"Hanne",etternavn:"Utvikler",erAleneOmOmsorg:!0,datoForAleneomsorg:"2021-09-21",kanIkkeOppgis:!1},dekningsgrad:a.HUNDRE_PROSENT,arbeidsforhold:[],mellomlagreSøknadOgNaviger:l(),avbrytSøknad:t("button-click")}},f={parameters:{msw:{handlers:[e.post(s,()=>new r(null,{status:200})),e.post(d,()=>r.json({80:k,100:{kontoer:[{konto:n.Foreldrepenger,dager:460}],minsteretter:{farRundtFødsel:0,toTette:0}}}))]}},args:{søker:p,erAleneOmOmsorg:!0,søkersituasjon:{situasjon:"fødsel",rolle:"far"},barnet:{type:o.FØDT,fødselsdatoer:["2022-07-21"],antallBarn:3,termindato:"2022-07-21"},annenForelder:{fornavn:"Hanne",etternavn:"Utvikler",erAleneOmOmsorg:!0,datoForAleneomsorg:"2022-09-21",kanIkkeOppgis:!1},dekningsgrad:a.HUNDRE_PROSENT,arbeidsforhold:[],mellomlagreSøknadOgNaviger:l(),avbrytSøknad:t("button-click")}},S={parameters:{msw:{handlers:[e.post(s,()=>new r(null,{status:200})),e.post(d,()=>r.json({80:k,100:{kontoer:[{konto:n.Foreldrepenger,dager:230}],minsteretter:{farRundtFødsel:10,toTette:0}}}))]}},args:{søker:p,erAleneOmOmsorg:!0,søkersituasjon:{situasjon:"fødsel",rolle:"far"},barnet:{type:o.UFØDT,antallBarn:3,termindato:"2024-07-21"},annenForelder:{erAleneOmOmsorg:!0,fornavn:"Hanne",etternavn:"Utvikler",datoForAleneomsorg:"2024-09-21",kanIkkeOppgis:!1},dekningsgrad:a.HUNDRE_PROSENT,arbeidsforhold:[],mellomlagreSøknadOgNaviger:l(),avbrytSøknad:t("button-click")}},O={parameters:{msw:{handlers:[e.post(s,()=>new r(null,{status:200})),e.post(d,()=>r.json({80:k,100:{kontoer:[{konto:n.Foreldrepenger,dager:273}],minsteretter:{farRundtFødsel:0,toTette:0},tillegg:{prematur:64,flerbarn:0}}}))]}},args:{søker:p,erAleneOmOmsorg:!0,søkersituasjon:{situasjon:"fødsel",rolle:"far"},barnet:{type:o.FØDT,antallBarn:1,fødselsdatoer:["2024-01-21"],termindato:"2024-04-21"},annenForelder:{fornavn:"Hanne",etternavn:"Utvikler",erAleneOmOmsorg:!0,datoForAleneomsorg:"2024-01-21",kanIkkeOppgis:!1},dekningsgrad:a.HUNDRE_PROSENT,arbeidsforhold:[],mellomlagreSøknadOgNaviger:l(),avbrytSøknad:t("button-click")}},c={parameters:{msw:{handlers:[e.post(s,()=>new r(null,{status:200})),e.post(d,()=>r.json({80:k,100:{kontoer:[{konto:n.Foreldrepenger,dager:460}],minsteretter:{farRundtFødsel:0,toTette:0}}}))]}},args:{søker:p,erAleneOmOmsorg:!0,søkersituasjon:{situasjon:"adopsjon",rolle:"far"},barnet:{type:o.ADOPTERT_ANNET_BARN,fødselsdatoer:["2021-08-21"],antallBarn:4,adopsjonsdato:"2021-08-23"},annenForelder:{fornavn:"Hanne",etternavn:"Utvikler",erAleneOmOmsorg:!0,datoForAleneomsorg:"2024-01-21",kanIkkeOppgis:!1},dekningsgrad:a.HUNDRE_PROSENT,arbeidsforhold:[],mellomlagreSøknadOgNaviger:l(),avbrytSøknad:t("button-click")}},R={parameters:{msw:{handlers:[e.post(s,()=>new r(void 0,{status:200})),e.post(d,()=>r.json({80:k,100:{kontoer:[{konto:n.Mødrekvote,dager:75},{konto:n.Fedrekvote,dager:75},{konto:n.Fellesperiode,dager:100},{konto:n.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:10,toTette:0},tillegg:{prematur:65,flerbarn:0}}}))]}},args:{søker:g,søkersituasjon:{situasjon:"fødsel",rolle:"mor"},barnet:{type:o.FØDT,fødselsdatoer:["2023-09-21"],antallBarn:1,termindato:"2023-12-21"},annenForelder:{fornavn:"Hans",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1},dekningsgrad:a.HUNDRE_PROSENT,arbeidsforhold:[],mellomlagreSøknadOgNaviger:l(),avbrytSøknad:t("button-click")}},v={parameters:{msw:{handlers:[e.post(s,()=>new r(null,{status:200})),e.post(d,()=>r.json({80:{kontoer:[{konto:n.Mødrekvote,dager:95},{konto:n.Fedrekvote,dager:95},{konto:n.Fellesperiode,dager:101},{konto:n.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:10,toTette:0},tillegg:{prematur:0,flerbarn:0}},100:k}))]}},args:{søker:g,søkersituasjon:{situasjon:"fødsel",rolle:"mor"},barnet:{type:o.UFØDT,antallBarn:1,termindato:"2024-08-21"},annenForelder:{fornavn:"Petter",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1},dekningsgrad:a.ÅTTI_PROSENT,arbeidsforhold:[],mellomlagreSøknadOgNaviger:l(),avbrytSøknad:t("button-click")}},A={parameters:{msw:{handlers:[e.post(s,()=>new r(null,{status:200})),e.post(d,()=>r.json({80:k,100:{kontoer:[{konto:n.Mødrekvote,dager:75},{konto:n.Fedrekvote,dager:75},{konto:n.Fellesperiode,dager:80},{konto:n.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:10,toTette:0}}}))]}},args:{søker:g,søkersituasjon:{situasjon:"fødsel",rolle:"mor"},barnet:{type:o.UFØDT,antallBarn:1,termindato:"2024-06-21"},annenForelder:{fornavn:"Hans",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1},dekningsgrad:a.HUNDRE_PROSENT,arbeidsforhold:[],mellomlagreSøknadOgNaviger:l(),avbrytSøknad:t("button-click")}},D={parameters:{msw:{handlers:[e.post(s,()=>new r(null,{status:200})),e.post(d,()=>r.json({80:k,100:{kontoer:[{konto:n.Mødrekvote,dager:75},{konto:n.Fedrekvote,dager:75},{konto:n.Fellesperiode,dager:165},{konto:n.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:10,toTette:0},tillegg:{prematur:0,flerbarn:85}}}))]}},args:{søker:g,søkersituasjon:{situasjon:"fødsel",rolle:"mor"},barnet:{type:o.FØDT,antallBarn:2,fødselsdatoer:["2024-02-21"],termindato:"2024-02-21"},annenForelder:{fornavn:"Hans",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1},dekningsgrad:a.HUNDRE_PROSENT,arbeidsforhold:[],mellomlagreSøknadOgNaviger:l(),avbrytSøknad:t("button-click")}},U={parameters:{msw:{handlers:[e.post(s,()=>r.json(rn)),e.post(d,()=>r.json({80:k,100:{kontoer:[{konto:n.Mødrekvote,dager:75},{konto:n.Fedrekvote,dager:75},{konto:n.Fellesperiode,dager:80},{konto:n.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:10,toTette:0}}}))]}},args:{søker:g,søkersituasjon:{situasjon:"fødsel",rolle:"mor"},barnet:{type:o.UFØDT,antallBarn:1,termindato:"2024-07-21"},annenForelder:{fornavn:"Hans",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1},dekningsgrad:a.HUNDRE_PROSENT,arbeidsforhold:[],mellomlagreSøknadOgNaviger:l(),avbrytSøknad:t("button-click")}},E={parameters:{msw:{handlers:[e.post(s,()=>new r(null,{status:200})),e.post(d,()=>r.json({80:k,100:{kontoer:[{konto:n.Mødrekvote,dager:75},{konto:n.Fedrekvote,dager:75},{konto:n.Fellesperiode,dager:80},{konto:n.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}}))]}},args:{søker:p,søkersituasjon:{situasjon:"fødsel",rolle:"far"},barnet:{type:o.FØDT,antallBarn:1,fødselsdatoer:["2021-07-21"],termindato:"2021-07-21"},annenForelder:{fornavn:"Hanne",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1},dekningsgrad:a.HUNDRE_PROSENT,arbeidsforhold:[],mellomlagreSøknadOgNaviger:l(),avbrytSøknad:t("button-click")}},b={parameters:{msw:{handlers:[e.post(s,()=>new r(null,{status:200})),e.post(d,()=>r.json({80:k,100:{kontoer:[{konto:n.Mødrekvote,dager:75},{konto:n.Fedrekvote,dager:75},{konto:n.Fellesperiode,dager:370},{konto:n.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0},tillegg:{prematur:0,flerbarn:230}}}))]}},args:{søker:p,søkersituasjon:{situasjon:"fødsel",rolle:"far"},barnet:{type:o.FØDT,antallBarn:3,fødselsdatoer:["2022-07-21"],termindato:"2022-07-21"},annenForelder:{fornavn:"Hanne",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1},dekningsgrad:a.HUNDRE_PROSENT,arbeidsforhold:[],mellomlagreSøknadOgNaviger:l(),avbrytSøknad:t("button-click")}},h={parameters:{msw:{handlers:[e.post(s,()=>new r(null,{status:200})),e.post(d,()=>r.json({80:k,100:{kontoer:[{konto:n.Mødrekvote,dager:75},{konto:n.Fedrekvote,dager:75},{konto:n.Fellesperiode,dager:370},{konto:n.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:10,toTette:0}}}))]}},args:{søker:p,søkersituasjon:{situasjon:"fødsel",rolle:"far"},barnet:{type:o.UFØDT,antallBarn:4,termindato:C().subtract(2,"months").format(G)},annenForelder:{fornavn:"Hanne",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1},dekningsgrad:a.HUNDRE_PROSENT,arbeidsforhold:[],mellomlagreSøknadOgNaviger:l(),avbrytSøknad:t("button-click")}},y={parameters:{msw:{handlers:[e.post(s,()=>new r(null,{status:200})),e.post(d,()=>r.json({80:k,100:{kontoer:[{konto:n.Mødrekvote,dager:75},{konto:n.Fedrekvote,dager:75},{konto:n.Fellesperiode,dager:100},{konto:n.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:10,toTette:0},tillegg:{flerbarn:0,prematur:64}}}))]}},args:{søker:p,søkersituasjon:{situasjon:"fødsel",rolle:"far"},barnet:{type:o.FØDT,antallBarn:1,fødselsdatoer:["2024-02-21"],termindato:"2024-05-21"},annenForelder:{fornavn:"Hanne",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1},dekningsgrad:a.HUNDRE_PROSENT,arbeidsforhold:[],mellomlagreSøknadOgNaviger:l(),avbrytSøknad:t("button-click")}},j={parameters:{msw:{handlers:[e.post(s,()=>r.json(tn)),e.post(d,()=>r.json({80:k,100:{kontoer:[{konto:n.Mødrekvote,dager:75},{konto:n.Fedrekvote,dager:75},{konto:n.Fellesperiode,dager:80},{konto:n.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:10,toTette:0}}}))]}},args:{søker:p,søkersituasjon:{situasjon:"fødsel",rolle:"far"},barnet:{type:o.FØDT,antallBarn:1,fødselsdatoer:["2024-02-21"],termindato:"2024-02-21"},annenForelder:{fornavn:"Hanne",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1},dekningsgrad:a.HUNDRE_PROSENT,arbeidsforhold:[],mellomlagreSøknadOgNaviger:l(),avbrytSøknad:t("button-click")}},_={parameters:{msw:{handlers:[e.post(s,()=>new r(null,{status:200})),e.post(d,()=>r.json({80:k,100:{kontoer:[{konto:n.Mødrekvote,dager:95},{konto:n.Fedrekvote,dager:95},{konto:n.Fellesperiode,dager:90}],minsteretter:{farRundtFødsel:0,toTette:0}}}))]}},args:{søker:p,søkersituasjon:{situasjon:"adopsjon",rolle:"far"},barnet:{type:o.ADOPTERT_STEBARN,antallBarn:2,fødselsdatoer:["2024-02-21"],adopsjonsdato:"2024-02-21"},annenForelder:{fornavn:"Hanne",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1},dekningsgrad:a.HUNDRE_PROSENT,arbeidsforhold:[],mellomlagreSøknadOgNaviger:l(),avbrytSøknad:t("button-click")}},H={parameters:{msw:{handlers:[e.post(s,()=>new r(null,{status:200})),e.post(d,()=>r.json({80:{kontoer:[{konto:n.Mødrekvote,dager:95},{konto:n.Fedrekvote,dager:95},{konto:n.Fellesperiode,dager:370}],minsteretter:{farRundtFødsel:0,toTette:0}},100:k}))]}},args:{søker:p,søkersituasjon:{situasjon:"adopsjon",rolle:"mor"},barnet:{type:o.ADOPTERT_ANNET_BARN,antallBarn:3,fødselsdatoer:["2021-02-21"],adopsjonsdato:"2021-02-21",ankomstdato:"2021-05-21"},annenForelder:{fornavn:"Hans",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1},dekningsgrad:a.ÅTTI_PROSENT,arbeidsforhold:[],mellomlagreSøknadOgNaviger:l(),avbrytSøknad:t("button-click")}},P={parameters:{msw:{handlers:[e.post(s,()=>new r(null,{status:200})),e.post(d,()=>r.json({80:{kontoer:[{konto:n.Mødrekvote,dager:95},{konto:n.Fedrekvote,dager:95},{konto:n.Fellesperiode,dager:90},{konto:n.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:10,toTette:0}},100:k}))]}},args:{søker:g,søkersituasjon:{situasjon:"fødsel",rolle:"mor"},barnet:{type:o.UFØDT,antallBarn:1,termindato:"2024-07-21"},annenForelder:{fornavn:"Hans",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!1,harOppholdtSegIEØS:!0,harRettPåForeldrepengerIEØS:!0,kanIkkeOppgis:!1},dekningsgrad:a.ÅTTI_PROSENT,arbeidsforhold:[],mellomlagreSøknadOgNaviger:l(),avbrytSøknad:t("button-click")}},I={parameters:{msw:{handlers:[e.post(s,()=>new r(null,{status:200})),e.post(d,()=>r.json({80:k,100:{kontoer:[{konto:n.Mødrekvote,dager:95},{konto:n.Fedrekvote,dager:95},{konto:n.Fellesperiode,dager:90}],minsteretter:{farRundtFødsel:0,toTette:0}}}))]}},args:{søker:p,søkersituasjon:{situasjon:"adopsjon",rolle:"far"},barnet:{type:o.ADOPTERT_STEBARN,antallBarn:1,adopsjonsdato:"2024-02-21",fødselsdatoer:["2024-02-21"]},annenForelder:{fornavn:"Hanne",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!1,harOppholdtSegIEØS:!0,harRettPåForeldrepengerIEØS:!0,kanIkkeOppgis:!1},dekningsgrad:a.HUNDRE_PROSENT,arbeidsforhold:[],mellomlagreSøknadOgNaviger:l(),avbrytSøknad:t("button-click")}},B={parameters:{msw:{handlers:[e.post(s,()=>new r(null,{status:200})),e.post(d,()=>r.json({80:k,100:{kontoer:[{konto:n.Foreldrepenger,dager:230}],minsteretter:{farRundtFødsel:15,toTette:0}}}))]}},args:{søker:g,søkersituasjon:{situasjon:"fødsel",rolle:"mor"},barnet:{type:o.UFØDT,antallBarn:1,termindato:"2024-07-21"},annenForelder:{fornavn:"Hans",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!1,kanIkkeOppgis:!1},dekningsgrad:a.HUNDRE_PROSENT,arbeidsforhold:[],mellomlagreSøknadOgNaviger:l(),avbrytSøknad:t("button-click")}},L={parameters:{msw:{handlers:[e.post(s,()=>new r(null,{status:200})),e.post(d,()=>r.json({80:k,100:{kontoer:[{konto:n.Foreldrepenger,dager:230}],minsteretter:{farRundtFødsel:0,toTette:0}}}))]}},args:{søker:g,søkersituasjon:{situasjon:"adopsjon",rolle:"mor"},barnet:{type:o.ADOPTERT_ANNET_BARN,antallBarn:1,adopsjonsdato:"2022-08-21",fødselsdatoer:["2022-01-01"]},annenForelder:{fornavn:"Hans",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!1,kanIkkeOppgis:!1},dekningsgrad:a.HUNDRE_PROSENT,arbeidsforhold:[],mellomlagreSøknadOgNaviger:l(),avbrytSøknad:t("button-click")}},M={parameters:{msw:{handlers:[e.post(s,()=>new r(null,{status:200})),e.post(d,()=>r.json({80:k,100:{kontoer:[{konto:n.Foreldrepenger,dager:155},{konto:n.AktivitetsfriKvote,dager:375}],minsteretter:{farRundtFødsel:10,toTette:0}}}))]}},args:{søker:p,søkersituasjon:{situasjon:"fødsel",rolle:"far"},barnet:{type:o.UFØDT,antallBarn:4,termindato:C().subtract(2,"months").format(G)},annenForelder:{fornavn:"Hanne",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!1,kanIkkeOppgis:!1,erMorUfør:!0},dekningsgrad:a.HUNDRE_PROSENT,arbeidsforhold:[],mellomlagreSøknadOgNaviger:l(),avbrytSøknad:t("button-click")}},K={parameters:{msw:{handlers:[e.post(s,()=>new r(null,{status:200})),e.post(d,()=>r.json({80:k,100:{kontoer:[{konto:n.Foreldrepenger,dager:210},{konto:n.AktivitetsfriKvote,dager:40}],minsteretter:{farRundtFødsel:10,toTette:0}}}))]}},args:{søker:p,søkersituasjon:{situasjon:"fødsel",rolle:"far"},barnet:{type:o.FØDT,antallBarn:1,fødselsdatoer:["2024-01-21"],termindato:"2024-01-21"},annenForelder:{fornavn:"Hanne",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!1,kanIkkeOppgis:!1,erMorUfør:!1},dekningsgrad:a.HUNDRE_PROSENT,arbeidsforhold:[],mellomlagreSøknadOgNaviger:l(),avbrytSøknad:t("button-click")}},w={parameters:{msw:{handlers:[e.post(s,()=>new r(null,{status:200})),e.post(d,()=>r.json({80:k,100:{kontoer:[{konto:n.Foreldrepenger,dager:285}],minsteretter:{farRundtFødsel:0,toTette:0}}}))]}},args:{søker:p,søkersituasjon:{situasjon:"fødsel",rolle:"far"},barnet:{type:o.FØDT,antallBarn:2,fødselsdatoer:["2021-07-21"],termindato:"2021-07-21"},annenForelder:{fornavn:"Hanne",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!1,kanIkkeOppgis:!1,erMorUfør:!0},dekningsgrad:a.HUNDRE_PROSENT,arbeidsforhold:[],mellomlagreSøknadOgNaviger:l(),avbrytSøknad:t("button-click")}},x={parameters:{msw:{handlers:[e.post(s,()=>new r(null,{status:200})),e.post(d,()=>r.json({80:k,100:{kontoer:[{konto:n.Foreldrepenger,dager:125},{konto:n.AktivitetsfriKvote,dager:75}],minsteretter:{farRundtFødsel:10,toTette:0}}}))]}},args:{søker:p,søkersituasjon:{situasjon:"adopsjon",rolle:"far"},barnet:{type:o.ADOPTERT_STEBARN,antallBarn:1,fødselsdatoer:["2024-02-21"],adopsjonsdato:"2024-02-21"},annenForelder:{fornavn:"Hanne",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!1,erMorUfør:!0,kanIkkeOppgis:!1},dekningsgrad:a.HUNDRE_PROSENT,arbeidsforhold:[],mellomlagreSøknadOgNaviger:l(),avbrytSøknad:t("button-click")}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
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
}`,...m.parameters?.docs?.source}}};T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
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
}`,...T.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
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
}`,...u.parameters?.docs?.source}}};F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`{
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
}`,...F.parameters?.docs?.source}}};N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
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
}`,...N.parameters?.docs?.source}}};f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
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
}`,...f.parameters?.docs?.source}}};S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
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
}`,...S.parameters?.docs?.source}}};O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
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
}`,...O.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
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
}`,...c.parameters?.docs?.source}}};R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`{
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
}`,...R.parameters?.docs?.source}}};v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
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
}`,...v.parameters?.docs?.source}}};A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
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
}`,...A.parameters?.docs?.source}}};D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
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
}`,...D.parameters?.docs?.source}}};U.parameters={...U.parameters,docs:{...U.parameters?.docs,source:{originalSource:`{
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
}`,...U.parameters?.docs?.source}}};E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
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
}`,...E.parameters?.docs?.source}}};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
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
}`,...b.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
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
}`,...h.parameters?.docs?.source}}};y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
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
}`,...y.parameters?.docs?.source}}};j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
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
}`,...j.parameters?.docs?.source}}};_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
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
}`,..._.parameters?.docs?.source}}};H.parameters={...H.parameters,docs:{...H.parameters?.docs,source:{originalSource:`{
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
}`,...H.parameters?.docs?.source}}};P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
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
}`,...P.parameters?.docs?.source}}};I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`{
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
}`,...I.parameters?.docs?.source}}};B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`{
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
}`,...B.parameters?.docs?.source}}};L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`{
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
}`,...L.parameters?.docs?.source}}};M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
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
}`,...M.parameters?.docs?.source}}};K.parameters={...K.parameters,docs:{...K.parameters?.docs,source:{originalSource:`{
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
}`,...K.parameters?.docs?.source}}};w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
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
}`,...w.parameters?.docs?.source}}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
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
}`,...x.parameters?.docs?.source}}};const Sn=["MorAleneomsorgDekning80EttBarnFør1Okt2021","MorAleneomsorgEttBarnPrematurFødsel","MorAleneomsorgAdopsjonTrillinger","FarMedmorAleneomsorgFødtTvillinger","FarMedmorAleneomsorgFødtFireBarnFør1Okt2021","FarMedmorAleneomsorgFødtTreBarnFørWLB","FarMedmorAleneomsorgEttBarnTerminEtterWLB","FarMedmorAleneomsorgPrematurtFødtBarn","FarMedmorAleneomsorgAdopsjonFireBarn","MorDeltUttakEttBarnPrematurFødsel","MorDeltUttakEttBarnetter1Juli2024Med80ProsentDekning","MorDeltUttakEttBarnTermin","MorDeltUttakTvillingerFødt","MorDeltUttakFarSøkteMorsKvoteOgFellesperiode","FarMedmorSøkerDeltUttakEttBarnFødtFør1Okt2021","FarMedmorSøkerDeltUttakTrillingerFødtFørWLB","FarMedmorSøkerDeltUttakFireBarnTerminEtterWLB","FarMedmorSøkerDeltUttakEttBarnFødtPrematurt","FarSøkerDerMorHarTattUtFedrekvoteOgFellesperiode","FarSøkerAdopsjonToBarn","MorSøkerAdopsjonTreBarnFraUtlandetFør1Okt2021Dekningsgrad80","MorSøkerFarHarRettIEØSTerminDekningsgrad80","FarMedmorSøkerMorHarRettIEØSAdopsjon","BareMorHarRettTermin","BareMorHarRettAdopsjon","BareFarHarRettOgMorErUførTermin4Barn","BareFarHarRettOgMorErIkkeUførFødtBarn","BareFarHarRettTvillingerFødtFør1Okt2021","BareFarHarRettAdopsjonMorErUfør"];export{x as BareFarHarRettAdopsjonMorErUfør,K as BareFarHarRettOgMorErIkkeUførFødtBarn,M as BareFarHarRettOgMorErUførTermin4Barn,w as BareFarHarRettTvillingerFødtFør1Okt2021,L as BareMorHarRettAdopsjon,B as BareMorHarRettTermin,c as FarMedmorAleneomsorgAdopsjonFireBarn,S as FarMedmorAleneomsorgEttBarnTerminEtterWLB,N as FarMedmorAleneomsorgFødtFireBarnFør1Okt2021,f as FarMedmorAleneomsorgFødtTreBarnFørWLB,F as FarMedmorAleneomsorgFødtTvillinger,O as FarMedmorAleneomsorgPrematurtFødtBarn,E as FarMedmorSøkerDeltUttakEttBarnFødtFør1Okt2021,y as FarMedmorSøkerDeltUttakEttBarnFødtPrematurt,h as FarMedmorSøkerDeltUttakFireBarnTerminEtterWLB,b as FarMedmorSøkerDeltUttakTrillingerFødtFørWLB,I as FarMedmorSøkerMorHarRettIEØSAdopsjon,_ as FarSøkerAdopsjonToBarn,j as FarSøkerDerMorHarTattUtFedrekvoteOgFellesperiode,u as MorAleneomsorgAdopsjonTrillinger,m as MorAleneomsorgDekning80EttBarnFør1Okt2021,T as MorAleneomsorgEttBarnPrematurFødsel,R as MorDeltUttakEttBarnPrematurFødsel,A as MorDeltUttakEttBarnTermin,v as MorDeltUttakEttBarnetter1Juli2024Med80ProsentDekning,U as MorDeltUttakFarSøkteMorsKvoteOgFellesperiode,D as MorDeltUttakTvillingerFødt,H as MorSøkerAdopsjonTreBarnFraUtlandetFør1Okt2021Dekningsgrad80,P as MorSøkerFarHarRettIEØSTerminDekningsgrad80,Sn as __namedExportsOrder,fn as default};
