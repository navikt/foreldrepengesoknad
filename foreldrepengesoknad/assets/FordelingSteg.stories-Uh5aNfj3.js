import{j as m}from"./jsx-runtime-Cw0GR0a5.js";import{a as t}from"./chunk-D5ZWXAHU-CGElDDNX.js";import{Q as ye,a as je}from"./index-DhiUgGeT.js";import{F as _e,C as g}from"./FpDataContext-BUlrLNeW.js";import{M as He,S as Pe}from"./useFpNavigator-BE5a89kk.js";import{h as e,H as r}from"./index-Ey0twAil.js";import{i as Ie,S as n,B as a,D as o}from"./Uttaksplan-O1uyt7Yu.js";import"./UttaksdagenString-Cr2wfXF3.js";import{F as C}from"./FordelingSteg-BJLiymb8.js";import"./index-CTjT7uj6.js";import"./v4-CQkTLCs1.js";import"./Label-CEor7wE8.js";import"./decorators-86JrGkCj.js";import"./iframe-NZlOt7MH.js";import"../sb-preview/runtime.js";import"./links-SJ-psabG.js";import"./VStack-BNla2fw4.js";import"./index-vZN_Bsf0.js";import"./index-BRV0Se7Z.js";import"./_baseAssignValue-BYq83q8P.js";import"./api-6Uru1b-d.js";import"./barnUtils-CtkONWTb.js";import"./eksisterendeSakUtils-CPBqFEyD.js";import"./guid-CsArkN6i.js";import"./Dekningsgrad-Bg_cIyqc.js";import"./stønadskontoerUtils-CnV6iZqQ.js";import"./ErrorSummaryHookForm-y6FfKDxp.js";import"./numberFormValidation-gI5PFvj5.js";import"./ExpansionCard-COlGl-js.js";import"./BabyWrapped-BIMDEM0F.js";const s="https://fp/rest/innsyn/v2/annenPartVedtak",d="https://fp/rest/konto",Be={dekningsgrad:"HUNDRE",perioder:[{fom:"2024-02-07",tom:"2024-02-19",kontoType:"MØDREKVOTE",overføringÅrsak:"INSTITUSJONSOPPHOLD_ANNEN_FORELDER",resultat:{innvilget:!0,trekkerMinsterett:!1,trekkerDager:!0,årsak:"ANNET"}},{fom:"2024-06-11",tom:"2024-06-30",kontoType:"FELLESPERIODE",resultat:{innvilget:!0,trekkerMinsterett:!1,trekkerDager:!0,årsak:"ANNET"}}]},Le={dekningsgrad:"HUNDRE",perioder:[{fom:"2024-07-07",tom:"2024-07-24",kontoType:"FEDREKVOTE",overføringÅrsak:"INSTITUSJONSOPPHOLD_ANNEN_FORELDER",resultat:{innvilget:!0,trekkerMinsterett:!1,trekkerDager:!0,årsak:"ANNET"}},{fom:"2024-08-11",tom:"2024-08-12",kontoType:"FELLESPERIODE",resultat:{innvilget:!0,trekkerMinsterett:!1,trekkerDager:!0,årsak:"ANNET"}}]},i={fnr:"19047815714",fornavn:"Hanne",etternavn:"Mygg",kjønn:"K",fødselsdato:"1978-04-19"},p={fnr:"19047815715",fornavn:"Hans",etternavn:"Mygg",kjønn:"M",fødselsdato:"1972-06-07"},Me=new ye({defaultOptions:{queries:{retry:!1}}}),l=()=>(...J)=>(t("button-click")(...J),Promise.resolve()),ur={title:"steps/FordelingSteg",component:C,render:({gåTilNesteSide:J,søkersituasjon:Ue,annenForelder:De,barnet:Ee,dekningsgrad:be,...he})=>(Ie(),m.jsx(je,{client:Me,children:m.jsx(He,{initialEntries:[Pe.FORDELING],children:m.jsx(_e,{onDispatch:J,initialState:{[g.SØKERSITUASJON]:Ue,[g.OM_BARNET]:Ee,[g.ARBEIDSFORHOLD_OG_INNTEKT]:{harHattAndreInntektskilder:!1,harJobbetSomFrilans:!1,harJobbetSomSelvstendigNæringsdrivende:!1},[g.ANNEN_FORELDER]:De,[g.PERIODE_MED_FORELDREPENGER]:be},children:m.jsx(C,{...he})})})}))},k={kontoer:[{}],minsteretter:{}},T={parameters:{msw:{handlers:[e.post(s,()=>new r(null,{status:200})),e.post(d,()=>r.json({80:{kontoer:[{konto:n.Foreldrepenger,dager:280},{konto:n.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},100:k}))]}},args:{søker:i,erAleneOmOmsorg:!0,søkersituasjon:{situasjon:"fødsel",rolle:"mor"},barnet:{type:a.FØDT,fødselsdatoer:["2021-09-21"],antallBarn:1,termindato:"2021-09-24"},annenForelder:{fornavn:"Hans",etternavn:"Utvikler",kanIkkeOppgis:!1,erAleneOmOmsorg:!0,datoForAleneomsorg:"2021-09-21"},dekningsgrad:o.ÅTTI_PROSENT,arbeidsforhold:[],mellomlagreSøknadOgNaviger:l(),avbrytSøknad:t("button-click")}},u={parameters:{msw:{handlers:[e.post(s,()=>new r(null,{status:200})),e.post(d,()=>r.json({80:k,100:{kontoer:[{konto:n.Foreldrepenger,dager:294},{konto:n.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:10,toTette:0},tillegg:{prematur:64,flerbarn:0}}}))]}},args:{søker:i,erAleneOmOmsorg:!0,søkersituasjon:{situasjon:"fødsel",rolle:"mor"},barnet:{type:a.FØDT,fødselsdatoer:["2023-09-21"],antallBarn:1,termindato:"2023-12-20"},annenForelder:{fornavn:"Hans",etternavn:"Utvikler",erAleneOmOmsorg:!0,datoForAleneomsorg:"2023-09-21",kanIkkeOppgis:!1},dekningsgrad:o.HUNDRE_PROSENT,arbeidsforhold:[],mellomlagreSøknadOgNaviger:l(),avbrytSøknad:t("button-click")}},F={parameters:{msw:{handlers:[e.post(s,()=>new r(null,{status:200})),e.post(d,()=>r.json({80:k,100:{kontoer:[{konto:n.Foreldrepenger,dager:460}],minsteretter:{farRundtFødsel:0,toTette:0}}}))]}},args:{søker:i,erAleneOmOmsorg:!0,søkersituasjon:{situasjon:"adopsjon",rolle:"mor"},barnet:{type:a.ADOPTERT_STEBARN,fødselsdatoer:["2024-02-21"],antallBarn:3,adopsjonsdato:"2024-02-21"},annenForelder:{kanIkkeOppgis:!0},dekningsgrad:o.HUNDRE_PROSENT,arbeidsforhold:[],mellomlagreSøknadOgNaviger:l(),avbrytSøknad:t("button-click")}},f={parameters:{msw:{handlers:[e.post(s,()=>new r(null,{status:200})),e.post(d,()=>r.json({80:k,100:{kontoer:[{konto:n.Foreldrepenger,dager:385}],minsteretter:{farRundtFødsel:10,toTette:0}}}))]}},args:{søker:p,erAleneOmOmsorg:!0,søkersituasjon:{situasjon:"fødsel",rolle:"far"},barnet:{type:a.FØDT,fødselsdatoer:["2023-09-21"],antallBarn:2,termindato:"2023-09-21"},annenForelder:{fornavn:"Hanne",etternavn:"Utvikler",erAleneOmOmsorg:!0,datoForAleneomsorg:"2023-09-23",kanIkkeOppgis:!1},dekningsgrad:o.HUNDRE_PROSENT,arbeidsforhold:[],mellomlagreSøknadOgNaviger:l(),avbrytSøknad:t("button-click")}},N={parameters:{msw:{handlers:[e.post(s,()=>new r(null,{status:200})),e.post(d,()=>r.json({80:k,100:{kontoer:[{konto:n.Foreldrepenger,dager:460}],minsteretter:{farRundtFødsel:0,toTette:0}}}))]}},args:{søker:p,erAleneOmOmsorg:!0,søkersituasjon:{situasjon:"fødsel",rolle:"far"},barnet:{type:a.FØDT,fødselsdatoer:["2021-09-21"],antallBarn:4,termindato:"2021-09-21"},annenForelder:{fornavn:"Hanne",etternavn:"Utvikler",erAleneOmOmsorg:!0,datoForAleneomsorg:"2021-09-21",kanIkkeOppgis:!1},dekningsgrad:o.HUNDRE_PROSENT,arbeidsforhold:[],mellomlagreSøknadOgNaviger:l(),avbrytSøknad:t("button-click")}},S={parameters:{msw:{handlers:[e.post(s,()=>new r(null,{status:200})),e.post(d,()=>r.json({80:k,100:{kontoer:[{konto:n.Foreldrepenger,dager:460}],minsteretter:{farRundtFødsel:0,toTette:0}}}))]}},args:{søker:p,erAleneOmOmsorg:!0,søkersituasjon:{situasjon:"fødsel",rolle:"far"},barnet:{type:a.FØDT,fødselsdatoer:["2022-07-21"],antallBarn:3,termindato:"2022-07-21"},annenForelder:{fornavn:"Hanne",etternavn:"Utvikler",erAleneOmOmsorg:!0,datoForAleneomsorg:"2022-09-21",kanIkkeOppgis:!1},dekningsgrad:o.HUNDRE_PROSENT,arbeidsforhold:[],mellomlagreSøknadOgNaviger:l(),avbrytSøknad:t("button-click")}},O={parameters:{msw:{handlers:[e.post(s,()=>new r(null,{status:200})),e.post(d,()=>r.json({80:k,100:{kontoer:[{konto:n.Foreldrepenger,dager:230}],minsteretter:{farRundtFødsel:10,toTette:0}}}))]}},args:{søker:p,erAleneOmOmsorg:!0,søkersituasjon:{situasjon:"fødsel",rolle:"far"},barnet:{type:a.UFØDT,antallBarn:3,termindato:"2024-07-21"},annenForelder:{erAleneOmOmsorg:!0,fornavn:"Hanne",etternavn:"Utvikler",datoForAleneomsorg:"2024-09-21",kanIkkeOppgis:!1},dekningsgrad:o.HUNDRE_PROSENT,arbeidsforhold:[],mellomlagreSøknadOgNaviger:l(),avbrytSøknad:t("button-click")}},c={parameters:{msw:{handlers:[e.post(s,()=>new r(null,{status:200})),e.post(d,()=>r.json({80:k,100:{kontoer:[{konto:n.Foreldrepenger,dager:273}],minsteretter:{farRundtFødsel:0,toTette:0},tillegg:{prematur:64,flerbarn:0}}}))]}},args:{søker:p,erAleneOmOmsorg:!0,søkersituasjon:{situasjon:"fødsel",rolle:"far"},barnet:{type:a.FØDT,antallBarn:1,fødselsdatoer:["2024-01-21"],termindato:"2024-04-21"},annenForelder:{fornavn:"Hanne",etternavn:"Utvikler",erAleneOmOmsorg:!0,datoForAleneomsorg:"2024-01-21",kanIkkeOppgis:!1},dekningsgrad:o.HUNDRE_PROSENT,arbeidsforhold:[],mellomlagreSøknadOgNaviger:l(),avbrytSøknad:t("button-click")}},R={parameters:{msw:{handlers:[e.post(s,()=>new r(null,{status:200})),e.post(d,()=>r.json({80:k,100:{kontoer:[{konto:n.Foreldrepenger,dager:460}],minsteretter:{farRundtFødsel:0,toTette:0}}}))]}},args:{søker:p,erAleneOmOmsorg:!0,søkersituasjon:{situasjon:"adopsjon",rolle:"far"},barnet:{type:a.ADOPTERT_ANNET_BARN,fødselsdatoer:["2021-08-21"],antallBarn:4,adopsjonsdato:"2021-08-23"},annenForelder:{fornavn:"Hanne",etternavn:"Utvikler",erAleneOmOmsorg:!0,datoForAleneomsorg:"2024-01-21",kanIkkeOppgis:!1},dekningsgrad:o.HUNDRE_PROSENT,arbeidsforhold:[],mellomlagreSøknadOgNaviger:l(),avbrytSøknad:t("button-click")}},v={parameters:{msw:{handlers:[e.post(s,()=>new r(void 0,{status:200})),e.post(d,()=>r.json({80:k,100:{kontoer:[{konto:n.Mødrekvote,dager:75},{konto:n.Fedrekvote,dager:75},{konto:n.Fellesperiode,dager:100},{konto:n.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:10,toTette:0},tillegg:{prematur:65,flerbarn:0}}}))]}},args:{søker:i,søkersituasjon:{situasjon:"fødsel",rolle:"mor"},barnet:{type:a.FØDT,fødselsdatoer:["2023-09-21"],antallBarn:1,termindato:"2023-12-21"},annenForelder:{fornavn:"Hans",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1},dekningsgrad:o.HUNDRE_PROSENT,arbeidsforhold:[],mellomlagreSøknadOgNaviger:l(),avbrytSøknad:t("button-click")}},A={parameters:{msw:{handlers:[e.post(s,()=>new r(null,{status:200})),e.post(d,()=>r.json({80:{kontoer:[{konto:n.Mødrekvote,dager:95},{konto:n.Fedrekvote,dager:95},{konto:n.Fellesperiode,dager:101},{konto:n.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:10,toTette:0},tillegg:{prematur:0,flerbarn:0}},100:k}))]}},args:{søker:i,søkersituasjon:{situasjon:"fødsel",rolle:"mor"},barnet:{type:a.UFØDT,antallBarn:1,termindato:"2024-08-21"},annenForelder:{fornavn:"Petter",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1},dekningsgrad:o.ÅTTI_PROSENT,arbeidsforhold:[],mellomlagreSøknadOgNaviger:l(),avbrytSøknad:t("button-click")}},U={parameters:{msw:{handlers:[e.post(s,()=>new r(null,{status:200})),e.post(d,()=>r.json({80:k,100:{kontoer:[{konto:n.Mødrekvote,dager:75},{konto:n.Fedrekvote,dager:75},{konto:n.Fellesperiode,dager:80},{konto:n.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:10,toTette:0}}}))]}},args:{søker:i,søkersituasjon:{situasjon:"fødsel",rolle:"mor"},barnet:{type:a.UFØDT,antallBarn:1,termindato:"2024-06-21"},annenForelder:{fornavn:"Hans",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1},dekningsgrad:o.HUNDRE_PROSENT,arbeidsforhold:[],mellomlagreSøknadOgNaviger:l(),avbrytSøknad:t("button-click")}},D={parameters:{msw:{handlers:[e.post(s,()=>new r(null,{status:200})),e.post(d,()=>r.json({80:k,100:{kontoer:[{konto:n.Mødrekvote,dager:75},{konto:n.Fedrekvote,dager:75},{konto:n.Fellesperiode,dager:165},{konto:n.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:10,toTette:0},tillegg:{prematur:0,flerbarn:85}}}))]}},args:{søker:i,søkersituasjon:{situasjon:"fødsel",rolle:"mor"},barnet:{type:a.FØDT,antallBarn:2,fødselsdatoer:["2024-02-21"],termindato:"2024-02-21"},annenForelder:{fornavn:"Hans",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1},dekningsgrad:o.HUNDRE_PROSENT,arbeidsforhold:[],mellomlagreSøknadOgNaviger:l(),avbrytSøknad:t("button-click")}},E={parameters:{msw:{handlers:[e.post(s,()=>r.json(Be)),e.post(d,()=>r.json({80:k,100:{kontoer:[{konto:n.Mødrekvote,dager:75},{konto:n.Fedrekvote,dager:75},{konto:n.Fellesperiode,dager:80},{konto:n.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:10,toTette:0}}}))]}},args:{søker:i,søkersituasjon:{situasjon:"fødsel",rolle:"mor"},barnet:{type:a.UFØDT,antallBarn:1,termindato:"2024-07-21"},annenForelder:{fornavn:"Hans",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1},dekningsgrad:o.HUNDRE_PROSENT,arbeidsforhold:[],mellomlagreSøknadOgNaviger:l(),avbrytSøknad:t("button-click")}},b={parameters:{msw:{handlers:[e.post(s,()=>new r(null,{status:200})),e.post(d,()=>r.json({80:k,100:{kontoer:[{konto:n.Mødrekvote,dager:75},{konto:n.Fedrekvote,dager:75},{konto:n.Fellesperiode,dager:80},{konto:n.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}}))]}},args:{søker:p,søkersituasjon:{situasjon:"fødsel",rolle:"far"},barnet:{type:a.FØDT,antallBarn:1,fødselsdatoer:["2021-07-21"],termindato:"2021-07-21"},annenForelder:{fornavn:"Hanne",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1},dekningsgrad:o.HUNDRE_PROSENT,arbeidsforhold:[],mellomlagreSøknadOgNaviger:l(),avbrytSøknad:t("button-click")}},h={parameters:{msw:{handlers:[e.post(s,()=>new r(null,{status:200})),e.post(d,()=>r.json({80:k,100:{kontoer:[{konto:n.Mødrekvote,dager:75},{konto:n.Fedrekvote,dager:75},{konto:n.Fellesperiode,dager:370},{konto:n.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0},tillegg:{prematur:0,flerbarn:230}}}))]}},args:{søker:p,søkersituasjon:{situasjon:"fødsel",rolle:"far"},barnet:{type:a.FØDT,antallBarn:3,fødselsdatoer:["2022-07-21"],termindato:"2022-07-21"},annenForelder:{fornavn:"Hanne",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1},dekningsgrad:o.HUNDRE_PROSENT,arbeidsforhold:[],mellomlagreSøknadOgNaviger:l(),avbrytSøknad:t("button-click")}},y={parameters:{msw:{handlers:[e.post(s,()=>new r(null,{status:200})),e.post(d,()=>r.json({80:k,100:{kontoer:[{konto:n.Mødrekvote,dager:75},{konto:n.Fedrekvote,dager:75},{konto:n.Fellesperiode,dager:370},{konto:n.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:10,toTette:0}}}))]}},args:{søker:p,søkersituasjon:{situasjon:"fødsel",rolle:"far"},barnet:{type:a.UFØDT,antallBarn:4,termindato:"2024-07-21"},annenForelder:{fornavn:"Hanne",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1},dekningsgrad:o.HUNDRE_PROSENT,arbeidsforhold:[],mellomlagreSøknadOgNaviger:l(),avbrytSøknad:t("button-click")}},j={parameters:{msw:{handlers:[e.post(s,()=>new r(null,{status:200})),e.post(d,()=>r.json({80:k,100:{kontoer:[{konto:n.Mødrekvote,dager:75},{konto:n.Fedrekvote,dager:75},{konto:n.Fellesperiode,dager:100},{konto:n.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:10,toTette:0},tillegg:{flerbarn:0,prematur:64}}}))]}},args:{søker:p,søkersituasjon:{situasjon:"fødsel",rolle:"far"},barnet:{type:a.FØDT,antallBarn:1,fødselsdatoer:["2024-02-21"],termindato:"2024-05-21"},annenForelder:{fornavn:"Hanne",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1},dekningsgrad:o.HUNDRE_PROSENT,arbeidsforhold:[],mellomlagreSøknadOgNaviger:l(),avbrytSøknad:t("button-click")}},_={parameters:{msw:{handlers:[e.post(s,()=>r.json(Le)),e.post(d,()=>r.json({80:k,100:{kontoer:[{konto:n.Mødrekvote,dager:75},{konto:n.Fedrekvote,dager:75},{konto:n.Fellesperiode,dager:80},{konto:n.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:10,toTette:0}}}))]}},args:{søker:p,søkersituasjon:{situasjon:"fødsel",rolle:"far"},barnet:{type:a.FØDT,antallBarn:1,fødselsdatoer:["2024-02-21"],termindato:"2024-02-21"},annenForelder:{fornavn:"Hanne",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1},dekningsgrad:o.HUNDRE_PROSENT,arbeidsforhold:[],mellomlagreSøknadOgNaviger:l(),avbrytSøknad:t("button-click")}},H={parameters:{msw:{handlers:[e.post(s,()=>new r(null,{status:200})),e.post(d,()=>r.json({80:k,100:{kontoer:[{konto:n.Mødrekvote,dager:95},{konto:n.Fedrekvote,dager:95},{konto:n.Fellesperiode,dager:90}],minsteretter:{farRundtFødsel:0,toTette:0}}}))]}},args:{søker:p,søkersituasjon:{situasjon:"adopsjon",rolle:"far"},barnet:{type:a.ADOPTERT_STEBARN,antallBarn:2,fødselsdatoer:["2024-02-21"],adopsjonsdato:"2024-02-21"},annenForelder:{fornavn:"Hanne",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1},dekningsgrad:o.HUNDRE_PROSENT,arbeidsforhold:[],mellomlagreSøknadOgNaviger:l(),avbrytSøknad:t("button-click")}},P={parameters:{msw:{handlers:[e.post(s,()=>new r(null,{status:200})),e.post(d,()=>r.json({80:{kontoer:[{konto:n.Mødrekvote,dager:95},{konto:n.Fedrekvote,dager:95},{konto:n.Fellesperiode,dager:370}],minsteretter:{farRundtFødsel:0,toTette:0}},100:k}))]}},args:{søker:p,søkersituasjon:{situasjon:"adopsjon",rolle:"mor"},barnet:{type:a.ADOPTERT_ANNET_BARN,antallBarn:3,fødselsdatoer:["2021-02-21"],adopsjonsdato:"2021-02-21",ankomstdato:"2021-05-21"},annenForelder:{fornavn:"Hans",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1},dekningsgrad:o.ÅTTI_PROSENT,arbeidsforhold:[],mellomlagreSøknadOgNaviger:l(),avbrytSøknad:t("button-click")}},I={parameters:{msw:{handlers:[e.post(s,()=>new r(null,{status:200})),e.post(d,()=>r.json({80:{kontoer:[{konto:n.Mødrekvote,dager:95},{konto:n.Fedrekvote,dager:95},{konto:n.Fellesperiode,dager:90},{konto:n.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:10,toTette:0}},100:k}))]}},args:{søker:i,søkersituasjon:{situasjon:"fødsel",rolle:"mor"},barnet:{type:a.UFØDT,antallBarn:1,termindato:"2024-07-21"},annenForelder:{fornavn:"Hans",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!1,harOppholdtSegIEØS:!0,harRettPåForeldrepengerIEØS:!0,kanIkkeOppgis:!1},dekningsgrad:o.ÅTTI_PROSENT,arbeidsforhold:[],mellomlagreSøknadOgNaviger:l(),avbrytSøknad:t("button-click")}},B={parameters:{msw:{handlers:[e.post(s,()=>new r(null,{status:200})),e.post(d,()=>r.json({80:k,100:{kontoer:[{konto:n.Mødrekvote,dager:95},{konto:n.Fedrekvote,dager:95},{konto:n.Fellesperiode,dager:90}],minsteretter:{farRundtFødsel:0,toTette:0}}}))]}},args:{søker:p,søkersituasjon:{situasjon:"adopsjon",rolle:"far"},barnet:{type:a.ADOPTERT_STEBARN,antallBarn:1,adopsjonsdato:"2024-02-21",fødselsdatoer:["2024-02-21"]},annenForelder:{fornavn:"Hanne",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!1,harOppholdtSegIEØS:!0,harRettPåForeldrepengerIEØS:!0,kanIkkeOppgis:!1},dekningsgrad:o.HUNDRE_PROSENT,arbeidsforhold:[],mellomlagreSøknadOgNaviger:l(),avbrytSøknad:t("button-click")}},L={parameters:{msw:{handlers:[e.post(s,()=>new r(null,{status:200})),e.post(d,()=>r.json({80:k,100:{kontoer:[{konto:n.Foreldrepenger,dager:230}],minsteretter:{farRundtFødsel:15,toTette:0}}}))]}},args:{søker:i,søkersituasjon:{situasjon:"fødsel",rolle:"mor"},barnet:{type:a.UFØDT,antallBarn:1,termindato:"2024-07-21"},annenForelder:{fornavn:"Hans",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!1,kanIkkeOppgis:!1},dekningsgrad:o.HUNDRE_PROSENT,arbeidsforhold:[],mellomlagreSøknadOgNaviger:l(),avbrytSøknad:t("button-click")}},M={parameters:{msw:{handlers:[e.post(s,()=>new r(null,{status:200})),e.post(d,()=>r.json({80:k,100:{kontoer:[{konto:n.Foreldrepenger,dager:230}],minsteretter:{farRundtFødsel:0,toTette:0}}}))]}},args:{søker:i,søkersituasjon:{situasjon:"adopsjon",rolle:"mor"},barnet:{type:a.ADOPTERT_ANNET_BARN,antallBarn:1,adopsjonsdato:"2022-08-21",fødselsdatoer:["2022-01-01"]},annenForelder:{fornavn:"Hans",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!1,kanIkkeOppgis:!1},dekningsgrad:o.HUNDRE_PROSENT,arbeidsforhold:[],mellomlagreSøknadOgNaviger:l(),avbrytSøknad:t("button-click")}},K={parameters:{msw:{handlers:[e.post(s,()=>new r(null,{status:200})),e.post(d,()=>r.json({80:k,100:{kontoer:[{konto:n.Foreldrepenger,dager:155},{konto:n.AktivitetsfriKvote,dager:375}],minsteretter:{farRundtFødsel:10,toTette:0}}}))]}},args:{søker:p,søkersituasjon:{situasjon:"fødsel",rolle:"far"},barnet:{type:a.UFØDT,antallBarn:4,termindato:"2024-07-21"},annenForelder:{fornavn:"Hanne",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!1,kanIkkeOppgis:!1,erMorUfør:!0},dekningsgrad:o.HUNDRE_PROSENT,arbeidsforhold:[],mellomlagreSøknadOgNaviger:l(),avbrytSøknad:t("button-click")}},w={parameters:{msw:{handlers:[e.post(s,()=>new r(null,{status:200})),e.post(d,()=>r.json({80:k,100:{kontoer:[{konto:n.Foreldrepenger,dager:210},{konto:n.AktivitetsfriKvote,dager:40}],minsteretter:{farRundtFødsel:10,toTette:0}}}))]}},args:{søker:p,søkersituasjon:{situasjon:"fødsel",rolle:"far"},barnet:{type:a.FØDT,antallBarn:1,fødselsdatoer:["2024-01-21"],termindato:"2024-01-21"},annenForelder:{fornavn:"Hanne",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!1,kanIkkeOppgis:!1,erMorUfør:!1},dekningsgrad:o.HUNDRE_PROSENT,arbeidsforhold:[],mellomlagreSøknadOgNaviger:l(),avbrytSøknad:t("button-click")}},x={parameters:{msw:{handlers:[e.post(s,()=>new r(null,{status:200})),e.post(d,()=>r.json({80:k,100:{kontoer:[{konto:n.Foreldrepenger,dager:285}],minsteretter:{farRundtFødsel:0,toTette:0}}}))]}},args:{søker:p,søkersituasjon:{situasjon:"fødsel",rolle:"far"},barnet:{type:a.FØDT,antallBarn:2,fødselsdatoer:["2021-07-21"],termindato:"2021-07-21"},annenForelder:{fornavn:"Hanne",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!1,kanIkkeOppgis:!1,erMorUfør:!0},dekningsgrad:o.HUNDRE_PROSENT,arbeidsforhold:[],mellomlagreSøknadOgNaviger:l(),avbrytSøknad:t("button-click")}},W={parameters:{msw:{handlers:[e.post(s,()=>new r(null,{status:200})),e.post(d,()=>r.json({80:k,100:{kontoer:[{konto:n.Foreldrepenger,dager:125},{konto:n.AktivitetsfriKvote,dager:75}],minsteretter:{farRundtFødsel:10,toTette:0}}}))]}},args:{søker:p,søkersituasjon:{situasjon:"adopsjon",rolle:"far"},barnet:{type:a.ADOPTERT_STEBARN,antallBarn:1,fødselsdatoer:["2024-02-21"],adopsjonsdato:"2024-02-21"},annenForelder:{fornavn:"Hanne",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!1,erMorUfør:!0,kanIkkeOppgis:!1},dekningsgrad:o.HUNDRE_PROSENT,arbeidsforhold:[],mellomlagreSøknadOgNaviger:l(),avbrytSøknad:t("button-click")}};var G,Q,V;T.parameters={...T.parameters,docs:{...(G=T.parameters)==null?void 0:G.docs,source:{originalSource:`{
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
}`,...(V=(Q=T.parameters)==null?void 0:Q.docs)==null?void 0:V.source}}};var q,z,X;u.parameters={...u.parameters,docs:{...(q=u.parameters)==null?void 0:q.docs,source:{originalSource:`{
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
}`,...(X=(z=u.parameters)==null?void 0:z.docs)==null?void 0:X.source}}};var Y,Z,$;F.parameters={...F.parameters,docs:{...(Y=F.parameters)==null?void 0:Y.docs,source:{originalSource:`{
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
}`,...($=(Z=F.parameters)==null?void 0:Z.docs)==null?void 0:$.source}}};var nn,en,rn;f.parameters={...f.parameters,docs:{...(nn=f.parameters)==null?void 0:nn.docs,source:{originalSource:`{
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
}`,...(rn=(en=f.parameters)==null?void 0:en.docs)==null?void 0:rn.source}}};var tn,an,on;N.parameters={...N.parameters,docs:{...(tn=N.parameters)==null?void 0:tn.docs,source:{originalSource:`{
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
}`,...(on=(an=N.parameters)==null?void 0:an.docs)==null?void 0:on.source}}};var sn,dn,ln;S.parameters={...S.parameters,docs:{...(sn=S.parameters)==null?void 0:sn.docs,source:{originalSource:`{
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
}`,...(ln=(dn=S.parameters)==null?void 0:dn.docs)==null?void 0:ln.source}}};var kn,pn,gn;O.parameters={...O.parameters,docs:{...(kn=O.parameters)==null?void 0:kn.docs,source:{originalSource:`{
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
}`,...(gn=(pn=O.parameters)==null?void 0:pn.docs)==null?void 0:gn.source}}};var mn,Tn,un;c.parameters={...c.parameters,docs:{...(mn=c.parameters)==null?void 0:mn.docs,source:{originalSource:`{
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
}`,...(un=(Tn=c.parameters)==null?void 0:Tn.docs)==null?void 0:un.source}}};var Fn,fn,Nn;R.parameters={...R.parameters,docs:{...(Fn=R.parameters)==null?void 0:Fn.docs,source:{originalSource:`{
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
}`,...(Nn=(fn=R.parameters)==null?void 0:fn.docs)==null?void 0:Nn.source}}};var Sn,On,cn;v.parameters={...v.parameters,docs:{...(Sn=v.parameters)==null?void 0:Sn.docs,source:{originalSource:`{
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
}`,...(cn=(On=v.parameters)==null?void 0:On.docs)==null?void 0:cn.source}}};var Rn,vn,An;A.parameters={...A.parameters,docs:{...(Rn=A.parameters)==null?void 0:Rn.docs,source:{originalSource:`{
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
}`,...(An=(vn=A.parameters)==null?void 0:vn.docs)==null?void 0:An.source}}};var Un,Dn,En;U.parameters={...U.parameters,docs:{...(Un=U.parameters)==null?void 0:Un.docs,source:{originalSource:`{
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
}`,...(En=(Dn=U.parameters)==null?void 0:Dn.docs)==null?void 0:En.source}}};var bn,hn,yn;D.parameters={...D.parameters,docs:{...(bn=D.parameters)==null?void 0:bn.docs,source:{originalSource:`{
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
}`,...(yn=(hn=D.parameters)==null?void 0:hn.docs)==null?void 0:yn.source}}};var jn,_n,Hn;E.parameters={...E.parameters,docs:{...(jn=E.parameters)==null?void 0:jn.docs,source:{originalSource:`{
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
}`,...(Hn=(_n=E.parameters)==null?void 0:_n.docs)==null?void 0:Hn.source}}};var Pn,In,Bn;b.parameters={...b.parameters,docs:{...(Pn=b.parameters)==null?void 0:Pn.docs,source:{originalSource:`{
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
}`,...(Bn=(In=b.parameters)==null?void 0:In.docs)==null?void 0:Bn.source}}};var Ln,Mn,Kn;h.parameters={...h.parameters,docs:{...(Ln=h.parameters)==null?void 0:Ln.docs,source:{originalSource:`{
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
}`,...(Kn=(Mn=h.parameters)==null?void 0:Mn.docs)==null?void 0:Kn.source}}};var wn,xn,Wn;y.parameters={...y.parameters,docs:{...(wn=y.parameters)==null?void 0:wn.docs,source:{originalSource:`{
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
      termindato: '2024-07-21'
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
}`,...(Wn=(xn=y.parameters)==null?void 0:xn.docs)==null?void 0:Wn.source}}};var Jn,Cn,Gn;j.parameters={...j.parameters,docs:{...(Jn=j.parameters)==null?void 0:Jn.docs,source:{originalSource:`{
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
}`,...(Gn=(Cn=j.parameters)==null?void 0:Cn.docs)==null?void 0:Gn.source}}};var Qn,Vn,qn;_.parameters={..._.parameters,docs:{...(Qn=_.parameters)==null?void 0:Qn.docs,source:{originalSource:`{
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
}`,...(qn=(Vn=_.parameters)==null?void 0:Vn.docs)==null?void 0:qn.source}}};var zn,Xn,Yn;H.parameters={...H.parameters,docs:{...(zn=H.parameters)==null?void 0:zn.docs,source:{originalSource:`{
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
}`,...(Yn=(Xn=H.parameters)==null?void 0:Xn.docs)==null?void 0:Yn.source}}};var Zn,$n,ne;P.parameters={...P.parameters,docs:{...(Zn=P.parameters)==null?void 0:Zn.docs,source:{originalSource:`{
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
}`,...(ne=($n=P.parameters)==null?void 0:$n.docs)==null?void 0:ne.source}}};var ee,re,te;I.parameters={...I.parameters,docs:{...(ee=I.parameters)==null?void 0:ee.docs,source:{originalSource:`{
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
}`,...(te=(re=I.parameters)==null?void 0:re.docs)==null?void 0:te.source}}};var ae,oe,se;B.parameters={...B.parameters,docs:{...(ae=B.parameters)==null?void 0:ae.docs,source:{originalSource:`{
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
}`,...(se=(oe=B.parameters)==null?void 0:oe.docs)==null?void 0:se.source}}};var de,le,ke;L.parameters={...L.parameters,docs:{...(de=L.parameters)==null?void 0:de.docs,source:{originalSource:`{
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
}`,...(ke=(le=L.parameters)==null?void 0:le.docs)==null?void 0:ke.source}}};var pe,ie,ge;M.parameters={...M.parameters,docs:{...(pe=M.parameters)==null?void 0:pe.docs,source:{originalSource:`{
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
}`,...(ge=(ie=M.parameters)==null?void 0:ie.docs)==null?void 0:ge.source}}};var me,Te,ue;K.parameters={...K.parameters,docs:{...(me=K.parameters)==null?void 0:me.docs,source:{originalSource:`{
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
    dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
    arbeidsforhold: [],
    mellomlagreSøknadOgNaviger: promiseAction(),
    avbrytSøknad: action('button-click')
  }
}`,...(ue=(Te=K.parameters)==null?void 0:Te.docs)==null?void 0:ue.source}}};var Fe,fe,Ne;w.parameters={...w.parameters,docs:{...(Fe=w.parameters)==null?void 0:Fe.docs,source:{originalSource:`{
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
}`,...(Ne=(fe=w.parameters)==null?void 0:fe.docs)==null?void 0:Ne.source}}};var Se,Oe,ce;x.parameters={...x.parameters,docs:{...(Se=x.parameters)==null?void 0:Se.docs,source:{originalSource:`{
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
}`,...(ce=(Oe=x.parameters)==null?void 0:Oe.docs)==null?void 0:ce.source}}};var Re,ve,Ae;W.parameters={...W.parameters,docs:{...(Re=W.parameters)==null?void 0:Re.docs,source:{originalSource:`{
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
}`,...(Ae=(ve=W.parameters)==null?void 0:ve.docs)==null?void 0:Ae.source}}};const Fr=["MorAleneomsorgDekning80EttBarnFør1Okt2021","MorAleneomsorgEttBarnPrematurFødsel","MorAleneomsorgAdopsjonTrillinger","FarMedmorAleneomsorgFødtTvillinger","FarMedmorAleneomsorgFødtFireBarnFør1Okt2021","FarMedmorAleneomsorgFødtTreBarnFørWLB","FarMedmorAleneomsorgEttBarnTerminEtterWLB","FarMedmorAleneomsorgPrematurtFødtBarn","FarMedmorAleneomsorgAdopsjonFireBarn","MorDeltUttakEttBarnPrematurFødsel","MorDeltUttakEttBarnetter1Juli2024Med80ProsentDekning","MorDeltUttakEttBarnTermin","MorDeltUttakTvillingerFødt","MorDeltUttakFarSøkteMorsKvoteOgFellesperiode","FarMedmorSøkerDeltUttakEttBarnFødtFør1Okt2021","FarMedmorSøkerDeltUttakTrillingerFødtFørWLB","FarMedmorSøkerDeltUttakFireBarnTerminEtterWLB","FarMedmorSøkerDeltUttakEttBarnFødtPrematurt","FarSøkerDerMorHarTattUtFedrekvoteOgFellesperiode","FarSøkerAdopsjonToBarn","MorSøkerAdopsjonTreBarnFraUtlandetFør1Okt2021Dekningsgrad80","MorSøkerFarHarRettIEØSTerminDekningsgrad80","FarMedmorSøkerMorHarRettIEØSAdopsjon","BareMorHarRettTermin","BareMorHarRettAdopsjon","BareFarHarRettOgMorErUførTermin4Barn","BareFarHarRettOgMorErIkkeUførFødtBarn","BareFarHarRettTvillingerFødtFør1Okt2021","BareFarHarRettAdopsjonMorErUfør"];export{W as BareFarHarRettAdopsjonMorErUfør,w as BareFarHarRettOgMorErIkkeUførFødtBarn,K as BareFarHarRettOgMorErUførTermin4Barn,x as BareFarHarRettTvillingerFødtFør1Okt2021,M as BareMorHarRettAdopsjon,L as BareMorHarRettTermin,R as FarMedmorAleneomsorgAdopsjonFireBarn,O as FarMedmorAleneomsorgEttBarnTerminEtterWLB,N as FarMedmorAleneomsorgFødtFireBarnFør1Okt2021,S as FarMedmorAleneomsorgFødtTreBarnFørWLB,f as FarMedmorAleneomsorgFødtTvillinger,c as FarMedmorAleneomsorgPrematurtFødtBarn,b as FarMedmorSøkerDeltUttakEttBarnFødtFør1Okt2021,j as FarMedmorSøkerDeltUttakEttBarnFødtPrematurt,y as FarMedmorSøkerDeltUttakFireBarnTerminEtterWLB,h as FarMedmorSøkerDeltUttakTrillingerFødtFørWLB,B as FarMedmorSøkerMorHarRettIEØSAdopsjon,H as FarSøkerAdopsjonToBarn,_ as FarSøkerDerMorHarTattUtFedrekvoteOgFellesperiode,F as MorAleneomsorgAdopsjonTrillinger,T as MorAleneomsorgDekning80EttBarnFør1Okt2021,u as MorAleneomsorgEttBarnPrematurFødsel,v as MorDeltUttakEttBarnPrematurFødsel,U as MorDeltUttakEttBarnTermin,A as MorDeltUttakEttBarnetter1Juli2024Med80ProsentDekning,E as MorDeltUttakFarSøkteMorsKvoteOgFellesperiode,D as MorDeltUttakTvillingerFødt,P as MorSøkerAdopsjonTreBarnFraUtlandetFør1Okt2021Dekningsgrad80,I as MorSøkerFarHarRettIEØSTerminDekningsgrad80,Fr as __namedExportsOrder,ur as default};
