import{bu as q,bv as a,W as w,l as M,bF as G}from"./iframe-CdZNPN-I.js";import{M as z,S as X,A as n}from"./useFpNavigator-B_jvAqzC.js";import{F as Z,C as k}from"./FpDataContext-BZaxapJo.js";import{h as e,H as r}from"./index-CLJlB2eF.js";import{a as V}from"./FordelingSteg-BpRGxoaC.js";import"./preload-helper-D9Z9MdNV.js";import"./stønadskontoerUtils-BfV_NTpK.js";import"./BabyWrapped-DGbGpdvn.js";const{action:t}=__STORYBOOK_MODULE_ACTIONS__,$={dekningsgrad:"HUNDRE",perioder:[{fom:"2024-02-07",tom:"2024-02-19",kontoType:"MØDREKVOTE",overføringÅrsak:"INSTITUSJONSOPPHOLD_ANNEN_FORELDER",resultat:{innvilget:!0,trekkerMinsterett:!1,trekkerDager:!0,årsak:"ANNET"}},{fom:"2024-06-11",tom:"2024-06-30",kontoType:"FELLESPERIODE",resultat:{innvilget:!0,trekkerMinsterett:!1,trekkerDager:!0,årsak:"ANNET"}}]},nn={dekningsgrad:"HUNDRE",perioder:[{fom:"2024-07-07",tom:"2024-07-24",kontoType:"FEDREKVOTE",overføringÅrsak:"INSTITUSJONSOPPHOLD_ANNEN_FORELDER",resultat:{innvilget:!0,trekkerMinsterett:!1,trekkerDager:!0,årsak:"ANNET"}},{fom:"2024-08-11",tom:"2024-08-12",kontoType:"FELLESPERIODE",resultat:{innvilget:!0,trekkerMinsterett:!1,trekkerDager:!0,årsak:"ANNET"}}]},d={fnr:"19047815714",navn:{fornavn:"Hanne",etternavn:"Mygg"},kjønn:"K",fødselsdato:"1978-04-19",barn:[]},l={fnr:"19047815715",navn:{fornavn:"Hans",etternavn:"Mygg"},kjønn:"M",fødselsdato:"1972-06-07",barn:[]},o=()=>()=>(t("button-click")(),Promise.resolve()),kn={title:"steps/FordelingSteg",component:V,decorators:[q],render:({gåTilNesteSide:x,søkersituasjon:W,annenForelder:J,barnet:C,dekningsgrad:Q,...Y})=>M.jsx(z,{initialEntries:[X.FORDELING],children:M.jsx(Z,{onDispatch:x,initialState:{[k.SØKERSITUASJON]:W,[k.OM_BARNET]:C,[k.ARBEIDSFORHOLD_OG_INNTEKT]:{harHattAndreInntektskilder:!1,harJobbetSomFrilans:!1,harJobbetSomSelvstendigNæringsdrivende:!1},[k.ANNEN_FORELDER]:J,[k.PERIODE_MED_FORELDREPENGER]:Q},children:M.jsx(V,{...Y})})})},s={kontoer:[],minsteretter:{farRundtFødsel:0,toTette:0}},i={parameters:{msw:{handlers:[e.post(n.annenPartVedtak,()=>new r(null,{status:200})),e.post(n.konto,()=>r.json({80:{kontoer:[{konto:"FORELDREPENGER",dager:280},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},100:s}))]}},args:{person:d,erAleneOmOmsorg:!0,søkersituasjon:{situasjon:"fødsel",rolle:"mor"},barnet:{type:a.FØDT,fødselsdatoer:["2021-09-21"],antallBarn:1,termindato:"2021-09-24"},annenForelder:{fnr:"1",fornavn:"Hans",etternavn:"Utvikler",kanIkkeOppgis:!1,erAleneOmOmsorg:!0,datoForAleneomsorg:"2021-09-21"},dekningsgrad:"80",arbeidsforhold:[],mellomlagreSøknadOgNaviger:o(),avbrytSøknad:t("button-click")}},g={parameters:{msw:{handlers:[e.post(n.annenPartVedtak,()=>new r(null,{status:200})),e.post(n.konto,()=>r.json({80:s,100:{kontoer:[{konto:"FORELDREPENGER",dager:294},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:10,toTette:0},tillegg:{prematur:64,flerbarn:0}}}))]}},args:{person:d,erAleneOmOmsorg:!0,søkersituasjon:{situasjon:"fødsel",rolle:"mor"},barnet:{type:a.FØDT,fødselsdatoer:["2023-09-21"],antallBarn:1,termindato:"2023-12-20"},annenForelder:{fnr:"1",fornavn:"Hans",etternavn:"Utvikler",erAleneOmOmsorg:!0,datoForAleneomsorg:"2023-09-21",kanIkkeOppgis:!1},dekningsgrad:"100",arbeidsforhold:[],mellomlagreSøknadOgNaviger:o(),avbrytSøknad:t("button-click")}},p={parameters:{msw:{handlers:[e.post(n.annenPartVedtak,()=>new r(null,{status:200})),e.post(n.konto,()=>r.json({80:s,100:{kontoer:[{konto:"FORELDREPENGER",dager:460}],minsteretter:{farRundtFødsel:0,toTette:0}}}))]}},args:{person:d,erAleneOmOmsorg:!0,søkersituasjon:{situasjon:"adopsjon",rolle:"mor"},barnet:{type:a.ADOPTERT_STEBARN,fødselsdatoer:["2024-02-21"],antallBarn:3,adopsjonsdato:"2024-02-21"},annenForelder:{kanIkkeOppgis:!0},dekningsgrad:"100",arbeidsforhold:[],mellomlagreSøknadOgNaviger:o(),avbrytSøknad:t("button-click")}},m={parameters:{msw:{handlers:[e.post(n.annenPartVedtak,()=>new r(null,{status:200})),e.post(n.konto,()=>r.json({80:s,100:{kontoer:[{konto:"FORELDREPENGER",dager:385}],minsteretter:{farRundtFødsel:10,toTette:0}}}))]}},args:{person:l,erAleneOmOmsorg:!0,søkersituasjon:{situasjon:"fødsel",rolle:"far"},barnet:{type:a.FØDT,fødselsdatoer:["2023-09-21"],antallBarn:2,termindato:"2023-09-21"},annenForelder:{fnr:"1",fornavn:"Hanne",etternavn:"Utvikler",erAleneOmOmsorg:!0,datoForAleneomsorg:"2023-09-23",kanIkkeOppgis:!1},dekningsgrad:"100",arbeidsforhold:[],mellomlagreSøknadOgNaviger:o(),avbrytSøknad:t("button-click")}},E={parameters:{msw:{handlers:[e.post(n.annenPartVedtak,()=>new r(null,{status:200})),e.post(n.konto,()=>r.json({80:s,100:{kontoer:[{konto:"FORELDREPENGER",dager:460}],minsteretter:{farRundtFødsel:0,toTette:0}}}))]}},args:{person:l,erAleneOmOmsorg:!0,søkersituasjon:{situasjon:"fødsel",rolle:"far"},barnet:{type:a.FØDT,fødselsdatoer:["2021-09-21"],antallBarn:4,termindato:"2021-09-21"},annenForelder:{fnr:"1",fornavn:"Hanne",etternavn:"Utvikler",erAleneOmOmsorg:!0,datoForAleneomsorg:"2021-09-21",kanIkkeOppgis:!1},dekningsgrad:"100",arbeidsforhold:[],mellomlagreSøknadOgNaviger:o(),avbrytSøknad:t("button-click")}},f={parameters:{msw:{handlers:[e.post(n.annenPartVedtak,()=>new r(null,{status:200})),e.post(n.konto,()=>r.json({80:s,100:{kontoer:[{konto:"FORELDREPENGER",dager:460}],minsteretter:{farRundtFødsel:0,toTette:0}}}))]}},args:{person:l,erAleneOmOmsorg:!0,søkersituasjon:{situasjon:"fødsel",rolle:"far"},barnet:{type:a.FØDT,fødselsdatoer:["2022-07-21"],antallBarn:3,termindato:"2022-07-21"},annenForelder:{fnr:"1",fornavn:"Hanne",etternavn:"Utvikler",erAleneOmOmsorg:!0,datoForAleneomsorg:"2022-09-21",kanIkkeOppgis:!1},dekningsgrad:"100",arbeidsforhold:[],mellomlagreSøknadOgNaviger:o(),avbrytSøknad:t("button-click")}},R={parameters:{msw:{handlers:[e.post(n.annenPartVedtak,()=>new r(null,{status:200})),e.post(n.konto,()=>r.json({80:s,100:{kontoer:[{konto:"FORELDREPENGER",dager:230}],minsteretter:{farRundtFødsel:10,toTette:0}}}))]}},args:{person:l,erAleneOmOmsorg:!0,søkersituasjon:{situasjon:"fødsel",rolle:"far"},barnet:{type:a.UFØDT,antallBarn:3,termindato:"2024-07-21"},annenForelder:{fnr:"1",erAleneOmOmsorg:!0,fornavn:"Hanne",etternavn:"Utvikler",datoForAleneomsorg:"2024-09-21",kanIkkeOppgis:!1},dekningsgrad:"100",arbeidsforhold:[],mellomlagreSøknadOgNaviger:o(),avbrytSøknad:t("button-click")}},u={parameters:{msw:{handlers:[e.post(n.annenPartVedtak,()=>new r(null,{status:200})),e.post(n.konto,()=>r.json({80:s,100:{kontoer:[{konto:"FORELDREPENGER",dager:273}],minsteretter:{farRundtFødsel:0,toTette:0},tillegg:{prematur:64,flerbarn:0}}}))]}},args:{person:l,erAleneOmOmsorg:!0,søkersituasjon:{situasjon:"fødsel",rolle:"far"},barnet:{type:a.FØDT,antallBarn:1,fødselsdatoer:["2024-01-21"],termindato:"2024-04-21"},annenForelder:{fnr:"1",fornavn:"Hanne",etternavn:"Utvikler",erAleneOmOmsorg:!0,datoForAleneomsorg:"2024-01-21",kanIkkeOppgis:!1},dekningsgrad:"100",arbeidsforhold:[],mellomlagreSøknadOgNaviger:o(),avbrytSøknad:t("button-click")}},O={parameters:{msw:{handlers:[e.post(n.annenPartVedtak,()=>new r(null,{status:200})),e.post(n.konto,()=>r.json({80:s,100:{kontoer:[{konto:"FORELDREPENGER",dager:460}],minsteretter:{farRundtFødsel:0,toTette:0}}}))]}},args:{person:l,erAleneOmOmsorg:!0,søkersituasjon:{situasjon:"adopsjon",rolle:"far"},barnet:{type:a.ADOPTERT_ANNET_BARN,fødselsdatoer:["2021-08-21"],antallBarn:4,adopsjonsdato:"2021-08-23"},annenForelder:{fnr:"1",fornavn:"Hanne",etternavn:"Utvikler",erAleneOmOmsorg:!0,datoForAleneomsorg:"2024-01-21",kanIkkeOppgis:!1},dekningsgrad:"100",arbeidsforhold:[],mellomlagreSøknadOgNaviger:o(),avbrytSøknad:t("button-click")}},F={parameters:{msw:{handlers:[e.post(n.annenPartVedtak,()=>new r(void 0,{status:200})),e.post(n.konto,()=>r.json({80:s,100:{kontoer:[{konto:"MØDREKVOTE",dager:75},{konto:"FEDREKVOTE",dager:75},{konto:"FELLESPERIODE",dager:100},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:10,toTette:0},tillegg:{prematur:65,flerbarn:0}}}))]}},args:{person:d,søkersituasjon:{situasjon:"fødsel",rolle:"mor"},barnet:{type:a.FØDT,fødselsdatoer:["2023-09-21"],antallBarn:1,termindato:"2023-12-21"},annenForelder:{erAleneOmOmsorg:!1,fornavn:"Hans",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1},dekningsgrad:"100",arbeidsforhold:[],mellomlagreSøknadOgNaviger:o(),avbrytSøknad:t("button-click")}},T={parameters:{msw:{handlers:[e.post(n.annenPartVedtak,()=>new r(null,{status:200})),e.post(n.konto,()=>r.json({80:{kontoer:[{konto:"MØDREKVOTE",dager:95},{konto:"FEDREKVOTE",dager:95},{konto:"FELLESPERIODE",dager:101},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:10,toTette:0},tillegg:{prematur:0,flerbarn:0}},100:s}))]}},args:{person:d,søkersituasjon:{situasjon:"fødsel",rolle:"mor"},barnet:{type:a.UFØDT,antallBarn:1,termindato:"2024-08-21"},annenForelder:{fornavn:"Petter",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1,erAleneOmOmsorg:!1},dekningsgrad:"80",arbeidsforhold:[],mellomlagreSøknadOgNaviger:o(),avbrytSøknad:t("button-click")}},c={parameters:{msw:{handlers:[e.post(n.annenPartVedtak,()=>new r(null,{status:200})),e.post(n.konto,()=>r.json({80:s,100:{kontoer:[{konto:"MØDREKVOTE",dager:75},{konto:"FEDREKVOTE",dager:75},{konto:"FELLESPERIODE",dager:80},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:10,toTette:0}}}))]}},args:{person:d,søkersituasjon:{situasjon:"fødsel",rolle:"mor"},barnet:{type:a.UFØDT,antallBarn:1,termindato:"2024-06-21"},annenForelder:{fornavn:"Hans",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1,erAleneOmOmsorg:!1},dekningsgrad:"100",arbeidsforhold:[],mellomlagreSøknadOgNaviger:o(),avbrytSøknad:t("button-click")}},S={parameters:{msw:{handlers:[e.post(n.annenPartVedtak,()=>new r(null,{status:200})),e.post(n.konto,()=>r.json({80:s,100:{kontoer:[{konto:"MØDREKVOTE",dager:75},{konto:"FEDREKVOTE",dager:75},{konto:"FELLESPERIODE",dager:165},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:10,toTette:0},tillegg:{prematur:0,flerbarn:85}}}))]}},args:{person:d,søkersituasjon:{situasjon:"fødsel",rolle:"mor"},barnet:{type:a.FØDT,antallBarn:2,fødselsdatoer:["2024-02-21"],termindato:"2024-02-21"},annenForelder:{fornavn:"Hans",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1,erAleneOmOmsorg:!1},dekningsgrad:"100",arbeidsforhold:[],mellomlagreSøknadOgNaviger:o(),avbrytSøknad:t("button-click")}},D={parameters:{msw:{handlers:[e.post(n.annenPartVedtak,()=>r.json($)),e.post(n.konto,()=>r.json({80:s,100:{kontoer:[{konto:"MØDREKVOTE",dager:75},{konto:"FEDREKVOTE",dager:75},{konto:"FELLESPERIODE",dager:80},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:10,toTette:0}}}))]}},args:{person:d,søkersituasjon:{situasjon:"fødsel",rolle:"mor"},barnet:{type:a.UFØDT,antallBarn:1,termindato:"2024-07-21"},annenForelder:{fornavn:"Hans",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1,erAleneOmOmsorg:!1},dekningsgrad:"100",arbeidsforhold:[],mellomlagreSøknadOgNaviger:o(),avbrytSøknad:t("button-click")}},A={parameters:{msw:{handlers:[e.post(n.annenPartVedtak,()=>new r(null,{status:200})),e.post(n.konto,()=>r.json({80:s,100:{kontoer:[{konto:"MØDREKVOTE",dager:75},{konto:"FEDREKVOTE",dager:75},{konto:"FELLESPERIODE",dager:80},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}}))]}},args:{person:l,søkersituasjon:{situasjon:"fødsel",rolle:"far"},barnet:{type:a.FØDT,antallBarn:1,fødselsdatoer:["2021-07-21"],termindato:"2021-07-21"},annenForelder:{fornavn:"Hanne",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1,erAleneOmOmsorg:!1},dekningsgrad:"100",arbeidsforhold:[],mellomlagreSøknadOgNaviger:o(),avbrytSøknad:t("button-click")}},v={parameters:{msw:{handlers:[e.post(n.annenPartVedtak,()=>new r(null,{status:200})),e.post(n.konto,()=>r.json({80:s,100:{kontoer:[{konto:"MØDREKVOTE",dager:75},{konto:"FEDREKVOTE",dager:75},{konto:"FELLESPERIODE",dager:370},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0},tillegg:{prematur:0,flerbarn:230}}}))]}},args:{person:l,søkersituasjon:{situasjon:"fødsel",rolle:"far"},barnet:{type:a.FØDT,antallBarn:3,fødselsdatoer:["2022-07-21"],termindato:"2022-07-21"},annenForelder:{fornavn:"Hanne",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1,erAleneOmOmsorg:!1},dekningsgrad:"100",arbeidsforhold:[],mellomlagreSøknadOgNaviger:o(),avbrytSøknad:t("button-click")}},P={parameters:{msw:{handlers:[e.post(n.annenPartVedtak,()=>new r(null,{status:200})),e.post(n.konto,()=>r.json({80:s,100:{kontoer:[{konto:"MØDREKVOTE",dager:75},{konto:"FEDREKVOTE",dager:75},{konto:"FELLESPERIODE",dager:370},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:10,toTette:0}}}))]}},args:{person:l,søkersituasjon:{situasjon:"fødsel",rolle:"far"},barnet:{type:a.UFØDT,antallBarn:4,termindato:w().subtract(2,"months").format(G)},annenForelder:{fornavn:"Hanne",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1,erAleneOmOmsorg:!1},dekningsgrad:"100",arbeidsforhold:[],mellomlagreSøknadOgNaviger:o(),avbrytSøknad:t("button-click")}},N={parameters:{msw:{handlers:[e.post(n.annenPartVedtak,()=>new r(null,{status:200})),e.post(n.konto,()=>r.json({80:s,100:{kontoer:[{konto:"MØDREKVOTE",dager:75},{konto:"FEDREKVOTE",dager:75},{konto:"FELLESPERIODE",dager:100},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:10,toTette:0},tillegg:{flerbarn:0,prematur:64}}}))]}},args:{person:l,søkersituasjon:{situasjon:"fødsel",rolle:"far"},barnet:{type:a.FØDT,antallBarn:1,fødselsdatoer:["2024-02-21"],termindato:"2024-05-21"},annenForelder:{fornavn:"Hanne",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1,erAleneOmOmsorg:!1},dekningsgrad:"100",arbeidsforhold:[],mellomlagreSøknadOgNaviger:o(),avbrytSøknad:t("button-click")}},I={parameters:{msw:{handlers:[e.post(n.annenPartVedtak,()=>r.json(nn)),e.post(n.konto,()=>r.json({80:s,100:{kontoer:[{konto:"MØDREKVOTE",dager:75},{konto:"FEDREKVOTE",dager:75},{konto:"FELLESPERIODE",dager:80},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:10,toTette:0}}}))]}},args:{person:l,søkersituasjon:{situasjon:"fødsel",rolle:"far"},barnet:{type:a.FØDT,antallBarn:1,fødselsdatoer:["2024-02-21"],termindato:"2024-02-21"},annenForelder:{fornavn:"Hanne",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1,erAleneOmOmsorg:!1},dekningsgrad:"100",arbeidsforhold:[],mellomlagreSøknadOgNaviger:o(),avbrytSøknad:t("button-click")}},b={parameters:{msw:{handlers:[e.post(n.annenPartVedtak,()=>new r(null,{status:200})),e.post(n.konto,()=>r.json({80:s,100:{kontoer:[{konto:"MØDREKVOTE",dager:95},{konto:"FEDREKVOTE",dager:95},{konto:"FELLESPERIODE",dager:90}],minsteretter:{farRundtFødsel:0,toTette:0}}}))]}},args:{person:l,søkersituasjon:{situasjon:"adopsjon",rolle:"far"},barnet:{type:a.ADOPTERT_STEBARN,antallBarn:2,fødselsdatoer:["2024-02-21"],adopsjonsdato:"2024-02-21"},annenForelder:{fornavn:"Hanne",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1,erAleneOmOmsorg:!1},dekningsgrad:"100",arbeidsforhold:[],mellomlagreSøknadOgNaviger:o(),avbrytSøknad:t("button-click")}},L={parameters:{msw:{handlers:[e.post(n.annenPartVedtak,()=>new r(null,{status:200})),e.post(n.konto,()=>r.json({80:{kontoer:[{konto:"MØDREKVOTE",dager:95},{konto:"FEDREKVOTE",dager:95},{konto:"FELLESPERIODE",dager:370}],minsteretter:{farRundtFødsel:0,toTette:0}},100:s}))]}},args:{person:l,søkersituasjon:{situasjon:"adopsjon",rolle:"mor"},barnet:{type:a.ADOPTERT_ANNET_BARN,antallBarn:3,fødselsdatoer:["2021-02-21"],adopsjonsdato:"2021-02-21",ankomstdato:"2021-05-21"},annenForelder:{fornavn:"Hans",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1,erAleneOmOmsorg:!1},dekningsgrad:"80",arbeidsforhold:[],mellomlagreSøknadOgNaviger:o(),avbrytSøknad:t("button-click")}},h={parameters:{msw:{handlers:[e.post(n.annenPartVedtak,()=>new r(null,{status:200})),e.post(n.konto,()=>r.json({80:{kontoer:[{konto:"MØDREKVOTE",dager:95},{konto:"FEDREKVOTE",dager:95},{konto:"FELLESPERIODE",dager:90},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:10,toTette:0}},100:s}))]}},args:{person:d,søkersituasjon:{situasjon:"fødsel",rolle:"mor"},barnet:{type:a.UFØDT,antallBarn:1,termindato:"2024-07-21"},annenForelder:{fornavn:"Hans",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!1,harOppholdtSegIEØS:!0,harRettPåForeldrepengerIEØS:!0,kanIkkeOppgis:!1,erAleneOmOmsorg:!1},dekningsgrad:"80",arbeidsforhold:[],mellomlagreSøknadOgNaviger:o(),avbrytSøknad:t("button-click")}},j={parameters:{msw:{handlers:[e.post(n.annenPartVedtak,()=>new r(null,{status:200})),e.post(n.konto,()=>r.json({80:s,100:{kontoer:[{konto:"MØDREKVOTE",dager:95},{konto:"FEDREKVOTE",dager:95},{konto:"FELLESPERIODE",dager:90}],minsteretter:{farRundtFødsel:0,toTette:0}}}))]}},args:{person:l,søkersituasjon:{situasjon:"adopsjon",rolle:"far"},barnet:{type:a.ADOPTERT_STEBARN,antallBarn:1,adopsjonsdato:"2024-02-21",fødselsdatoer:["2024-02-21"]},annenForelder:{fornavn:"Hanne",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!1,harOppholdtSegIEØS:!0,harRettPåForeldrepengerIEØS:!0,kanIkkeOppgis:!1,erAleneOmOmsorg:!1},dekningsgrad:"100",arbeidsforhold:[],mellomlagreSøknadOgNaviger:o(),avbrytSøknad:t("button-click")}},U={parameters:{msw:{handlers:[e.post(n.annenPartVedtak,()=>new r(null,{status:200})),e.post(n.konto,()=>r.json({80:s,100:{kontoer:[{konto:"FORELDREPENGER",dager:230}],minsteretter:{farRundtFødsel:15,toTette:0}}}))]}},args:{person:d,søkersituasjon:{situasjon:"fødsel",rolle:"mor"},barnet:{type:a.UFØDT,antallBarn:1,termindato:"2024-07-21"},annenForelder:{fornavn:"Hans",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!1,kanIkkeOppgis:!1,erAleneOmOmsorg:!1},dekningsgrad:"100",arbeidsforhold:[],mellomlagreSøknadOgNaviger:o(),avbrytSøknad:t("button-click")}},_={parameters:{msw:{handlers:[e.post(n.annenPartVedtak,()=>new r(null,{status:200})),e.post(n.konto,()=>r.json({80:s,100:{kontoer:[{konto:"FORELDREPENGER",dager:230}],minsteretter:{farRundtFødsel:0,toTette:0}}}))]}},args:{person:d,søkersituasjon:{situasjon:"adopsjon",rolle:"mor"},barnet:{type:a.ADOPTERT_ANNET_BARN,antallBarn:1,adopsjonsdato:"2022-08-21",fødselsdatoer:["2022-01-01"]},annenForelder:{fornavn:"Hans",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!1,kanIkkeOppgis:!1,erAleneOmOmsorg:!1},dekningsgrad:"100",arbeidsforhold:[],mellomlagreSøknadOgNaviger:o(),avbrytSøknad:t("button-click")}},B={parameters:{msw:{handlers:[e.post(n.annenPartVedtak,()=>new r(null,{status:200})),e.post(n.konto,()=>r.json({80:s,100:{kontoer:[{konto:"FORELDREPENGER",dager:155},{konto:"AKTIVITETSFRI_KVOTE",dager:375}],minsteretter:{farRundtFødsel:10,toTette:0}}}))]}},args:{person:l,søkersituasjon:{situasjon:"fødsel",rolle:"far"},barnet:{type:a.UFØDT,antallBarn:4,termindato:w().subtract(2,"months").format(G)},annenForelder:{fornavn:"Hanne",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!1,kanIkkeOppgis:!1,erAleneOmOmsorg:!1,erMorUfør:!0},dekningsgrad:"100",arbeidsforhold:[],mellomlagreSøknadOgNaviger:o(),avbrytSøknad:t("button-click")}},y={parameters:{msw:{handlers:[e.post(n.annenPartVedtak,()=>new r(null,{status:200})),e.post(n.konto,()=>r.json({80:s,100:{kontoer:[{konto:"FORELDREPENGER",dager:210},{konto:"AKTIVITETSFRI_KVOTE",dager:40}],minsteretter:{farRundtFødsel:10,toTette:0}}}))]}},args:{person:l,søkersituasjon:{situasjon:"fødsel",rolle:"far"},barnet:{type:a.FØDT,antallBarn:1,fødselsdatoer:["2024-01-21"],termindato:"2024-01-21"},annenForelder:{fornavn:"Hanne",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!1,kanIkkeOppgis:!1,erAleneOmOmsorg:!1,erMorUfør:!1},dekningsgrad:"100",arbeidsforhold:[],mellomlagreSøknadOgNaviger:o(),avbrytSøknad:t("button-click")}},K={parameters:{msw:{handlers:[e.post(n.annenPartVedtak,()=>new r(null,{status:200})),e.post(n.konto,()=>r.json({80:s,100:{kontoer:[{konto:"FORELDREPENGER",dager:285}],minsteretter:{farRundtFødsel:0,toTette:0}}}))]}},args:{person:l,søkersituasjon:{situasjon:"fødsel",rolle:"far"},barnet:{type:a.FØDT,antallBarn:2,fødselsdatoer:["2021-07-21"],termindato:"2021-07-21"},annenForelder:{fornavn:"Hanne",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!1,kanIkkeOppgis:!1,erAleneOmOmsorg:!1,erMorUfør:!0},dekningsgrad:"100",arbeidsforhold:[],mellomlagreSøknadOgNaviger:o(),avbrytSøknad:t("button-click")}},H={parameters:{msw:{handlers:[e.post(n.annenPartVedtak,()=>new r(null,{status:200})),e.post(n.konto,()=>r.json({80:s,100:{kontoer:[{konto:"FORELDREPENGER",dager:125},{konto:"AKTIVITETSFRI_KVOTE",dager:75}],minsteretter:{farRundtFødsel:10,toTette:0}}}))]}},args:{person:l,søkersituasjon:{situasjon:"adopsjon",rolle:"far"},barnet:{type:a.ADOPTERT_STEBARN,antallBarn:1,fødselsdatoer:["2024-02-21"],adopsjonsdato:"2024-02-21"},annenForelder:{fornavn:"Hanne",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!1,erMorUfør:!0,kanIkkeOppgis:!1,erAleneOmOmsorg:!1},dekningsgrad:"100",arbeidsforhold:[],mellomlagreSøknadOgNaviger:o(),avbrytSøknad:t("button-click")}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.post(API_URLS.annenPartVedtak, () => new HttpResponse(null, {
        status: 200
      })), http.post(API_URLS.konto, () => HttpResponse.json({
        '80': {
          kontoer: [{
            konto: 'FORELDREPENGER',
            dager: 280
          }, {
            konto: 'FORELDREPENGER_FØR_FØDSEL',
            dager: 15
          }],
          minsteretter: {
            farRundtFødsel: 0,
            toTette: 0
          }
        } satisfies KontoBeregningDto,
        '100': DEFAULT_STØNADSKONTO
      }))]
    }
  },
  args: {
    person: søkerInfoKvinne,
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
      fnr: '1',
      fornavn: 'Hans',
      etternavn: 'Utvikler',
      kanIkkeOppgis: false,
      erAleneOmOmsorg: true,
      datoForAleneomsorg: '2021-09-21'
    },
    dekningsgrad: '80',
    arbeidsforhold: [],
    mellomlagreSøknadOgNaviger: promiseAction(),
    avbrytSøknad: action('button-click')
  }
}`,...i.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.post(API_URLS.annenPartVedtak, () => new HttpResponse(null, {
        status: 200
      })), http.post(API_URLS.konto, () => HttpResponse.json({
        '80': DEFAULT_STØNADSKONTO,
        '100': {
          kontoer: [{
            konto: 'FORELDREPENGER',
            dager: 294
          }, {
            konto: 'FORELDREPENGER_FØR_FØDSEL',
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
        } satisfies KontoBeregningDto
      }))]
    }
  },
  args: {
    person: søkerInfoKvinne,
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
      fnr: '1',
      fornavn: 'Hans',
      etternavn: 'Utvikler',
      erAleneOmOmsorg: true,
      datoForAleneomsorg: '2023-09-21',
      kanIkkeOppgis: false
    },
    dekningsgrad: '100',
    arbeidsforhold: [],
    mellomlagreSøknadOgNaviger: promiseAction(),
    avbrytSøknad: action('button-click')
  }
}`,...g.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.post(API_URLS.annenPartVedtak, () => new HttpResponse(null, {
        status: 200
      })), http.post(API_URLS.konto, () => HttpResponse.json({
        '80': DEFAULT_STØNADSKONTO,
        '100': {
          kontoer: [{
            konto: 'FORELDREPENGER',
            dager: 460
          }],
          minsteretter: {
            farRundtFødsel: 0,
            toTette: 0
          }
        } satisfies KontoBeregningDto
      }))]
    }
  },
  args: {
    person: søkerInfoKvinne,
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
    dekningsgrad: '100',
    arbeidsforhold: [],
    mellomlagreSøknadOgNaviger: promiseAction(),
    avbrytSøknad: action('button-click')
  }
}`,...p.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.post(API_URLS.annenPartVedtak, () => new HttpResponse(null, {
        status: 200
      })), http.post(API_URLS.konto, () => HttpResponse.json({
        '80': DEFAULT_STØNADSKONTO,
        '100': {
          kontoer: [{
            konto: 'FORELDREPENGER',
            dager: 385
          }],
          minsteretter: {
            farRundtFødsel: 10,
            toTette: 0
          }
        } satisfies KontoBeregningDto
      }))]
    }
  },
  args: {
    person: søkerInfoMann,
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
      fnr: '1',
      fornavn: 'Hanne',
      etternavn: 'Utvikler',
      erAleneOmOmsorg: true,
      datoForAleneomsorg: '2023-09-23',
      kanIkkeOppgis: false
    },
    dekningsgrad: '100',
    arbeidsforhold: [],
    mellomlagreSøknadOgNaviger: promiseAction(),
    avbrytSøknad: action('button-click')
  }
}`,...m.parameters?.docs?.source}}};E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.post(API_URLS.annenPartVedtak, () => new HttpResponse(null, {
        status: 200
      })), http.post(API_URLS.konto, () => HttpResponse.json({
        '80': DEFAULT_STØNADSKONTO,
        '100': {
          kontoer: [{
            konto: 'FORELDREPENGER',
            dager: 460
          }],
          minsteretter: {
            farRundtFødsel: 0,
            toTette: 0
          }
        } satisfies KontoBeregningDto
      }))]
    }
  },
  args: {
    person: søkerInfoMann,
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
      fnr: '1',
      fornavn: 'Hanne',
      etternavn: 'Utvikler',
      erAleneOmOmsorg: true,
      datoForAleneomsorg: '2021-09-21',
      kanIkkeOppgis: false
    },
    dekningsgrad: '100',
    arbeidsforhold: [],
    mellomlagreSøknadOgNaviger: promiseAction(),
    avbrytSøknad: action('button-click')
  }
}`,...E.parameters?.docs?.source}}};f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.post(API_URLS.annenPartVedtak, () => new HttpResponse(null, {
        status: 200
      })), http.post(API_URLS.konto, () => HttpResponse.json({
        '80': DEFAULT_STØNADSKONTO,
        '100': {
          kontoer: [{
            konto: 'FORELDREPENGER',
            dager: 460
          }],
          minsteretter: {
            farRundtFødsel: 0,
            toTette: 0
          }
        } satisfies KontoBeregningDto
      }))]
    }
  },
  args: {
    person: søkerInfoMann,
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
      fnr: '1',
      fornavn: 'Hanne',
      etternavn: 'Utvikler',
      erAleneOmOmsorg: true,
      datoForAleneomsorg: '2022-09-21',
      kanIkkeOppgis: false
    },
    dekningsgrad: '100',
    arbeidsforhold: [],
    mellomlagreSøknadOgNaviger: promiseAction(),
    avbrytSøknad: action('button-click')
  }
}`,...f.parameters?.docs?.source}}};R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.post(API_URLS.annenPartVedtak, () => new HttpResponse(null, {
        status: 200
      })), http.post(API_URLS.konto, () => HttpResponse.json({
        '80': DEFAULT_STØNADSKONTO,
        '100': {
          kontoer: [{
            konto: 'FORELDREPENGER',
            dager: 230
          }],
          minsteretter: {
            farRundtFødsel: 10,
            toTette: 0
          }
        } satisfies KontoBeregningDto
      }))]
    }
  },
  args: {
    person: søkerInfoMann,
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
      fnr: '1',
      erAleneOmOmsorg: true,
      fornavn: 'Hanne',
      etternavn: 'Utvikler',
      datoForAleneomsorg: '2024-09-21',
      kanIkkeOppgis: false
    },
    dekningsgrad: '100',
    arbeidsforhold: [],
    mellomlagreSøknadOgNaviger: promiseAction(),
    avbrytSøknad: action('button-click')
  }
}`,...R.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.post(API_URLS.annenPartVedtak, () => new HttpResponse(null, {
        status: 200
      })), http.post(API_URLS.konto, () => HttpResponse.json({
        '80': DEFAULT_STØNADSKONTO,
        '100': {
          kontoer: [{
            konto: 'FORELDREPENGER',
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
        } satisfies KontoBeregningDto
      }))]
    }
  },
  args: {
    person: søkerInfoMann,
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
      fnr: '1',
      fornavn: 'Hanne',
      etternavn: 'Utvikler',
      erAleneOmOmsorg: true,
      datoForAleneomsorg: '2024-01-21',
      kanIkkeOppgis: false
    },
    dekningsgrad: '100',
    arbeidsforhold: [],
    mellomlagreSøknadOgNaviger: promiseAction(),
    avbrytSøknad: action('button-click')
  }
}`,...u.parameters?.docs?.source}}};O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.post(API_URLS.annenPartVedtak, () => new HttpResponse(null, {
        status: 200
      })), http.post(API_URLS.konto, () => HttpResponse.json({
        '80': DEFAULT_STØNADSKONTO,
        '100': {
          kontoer: [{
            konto: 'FORELDREPENGER',
            dager: 460
          }],
          minsteretter: {
            farRundtFødsel: 0,
            toTette: 0
          }
        } satisfies KontoBeregningDto
      }))]
    }
  },
  args: {
    person: søkerInfoMann,
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
      fnr: '1',
      fornavn: 'Hanne',
      etternavn: 'Utvikler',
      erAleneOmOmsorg: true,
      datoForAleneomsorg: '2024-01-21',
      kanIkkeOppgis: false
    },
    dekningsgrad: '100',
    arbeidsforhold: [],
    mellomlagreSøknadOgNaviger: promiseAction(),
    avbrytSøknad: action('button-click')
  }
}`,...O.parameters?.docs?.source}}};F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.post(API_URLS.annenPartVedtak, () => new HttpResponse(undefined, {
        status: 200
      })), http.post(API_URLS.konto, () => HttpResponse.json({
        '80': DEFAULT_STØNADSKONTO,
        '100': {
          kontoer: [{
            konto: 'MØDREKVOTE',
            dager: 75
          }, {
            konto: 'FEDREKVOTE',
            dager: 75
          }, {
            konto: 'FELLESPERIODE',
            dager: 100
          }, {
            konto: 'FORELDREPENGER_FØR_FØDSEL',
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
        } satisfies KontoBeregningDto
      }))]
    }
  },
  args: {
    person: søkerInfoKvinne,
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
      erAleneOmOmsorg: false,
      fornavn: 'Hans',
      etternavn: 'Utvikler',
      fnr: '1212121313',
      harRettPåForeldrepengerINorge: true,
      kanIkkeOppgis: false
    },
    dekningsgrad: '100',
    arbeidsforhold: [],
    mellomlagreSøknadOgNaviger: promiseAction(),
    avbrytSøknad: action('button-click')
  }
}`,...F.parameters?.docs?.source}}};T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.post(API_URLS.annenPartVedtak, () => new HttpResponse(null, {
        status: 200
      })), http.post(API_URLS.konto, () => HttpResponse.json({
        '80': {
          kontoer: [{
            konto: 'MØDREKVOTE',
            dager: 95
          }, {
            konto: 'FEDREKVOTE',
            dager: 95
          }, {
            konto: 'FELLESPERIODE',
            dager: 101
          }, {
            konto: 'FORELDREPENGER_FØR_FØDSEL',
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
        } satisfies KontoBeregningDto,
        '100': DEFAULT_STØNADSKONTO
      }))]
    }
  },
  args: {
    person: søkerInfoKvinne,
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
      kanIkkeOppgis: false,
      erAleneOmOmsorg: false
    },
    dekningsgrad: '80',
    arbeidsforhold: [],
    mellomlagreSøknadOgNaviger: promiseAction(),
    avbrytSøknad: action('button-click')
  }
}`,...T.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.post(API_URLS.annenPartVedtak, () => new HttpResponse(null, {
        status: 200
      })), http.post(API_URLS.konto, () => HttpResponse.json({
        '80': DEFAULT_STØNADSKONTO,
        '100': {
          kontoer: [{
            konto: 'MØDREKVOTE',
            dager: 75
          }, {
            konto: 'FEDREKVOTE',
            dager: 75
          }, {
            konto: 'FELLESPERIODE',
            dager: 80
          }, {
            konto: 'FORELDREPENGER_FØR_FØDSEL',
            dager: 15
          }],
          minsteretter: {
            farRundtFødsel: 10,
            toTette: 0
          }
        } satisfies KontoBeregningDto
      }))]
    }
  },
  args: {
    person: søkerInfoKvinne,
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
      kanIkkeOppgis: false,
      erAleneOmOmsorg: false
    },
    dekningsgrad: '100',
    arbeidsforhold: [],
    mellomlagreSøknadOgNaviger: promiseAction(),
    avbrytSøknad: action('button-click')
  }
}`,...c.parameters?.docs?.source}}};S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.post(API_URLS.annenPartVedtak, () => new HttpResponse(null, {
        status: 200
      })), http.post(API_URLS.konto, () => HttpResponse.json({
        '80': DEFAULT_STØNADSKONTO,
        '100': {
          kontoer: [{
            konto: 'MØDREKVOTE',
            dager: 75
          }, {
            konto: 'FEDREKVOTE',
            dager: 75
          }, {
            konto: 'FELLESPERIODE',
            dager: 165
          }, {
            konto: 'FORELDREPENGER_FØR_FØDSEL',
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
        } satisfies KontoBeregningDto
      }))]
    }
  },
  args: {
    person: søkerInfoKvinne,
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
      kanIkkeOppgis: false,
      erAleneOmOmsorg: false
    },
    dekningsgrad: '100',
    arbeidsforhold: [],
    mellomlagreSøknadOgNaviger: promiseAction(),
    avbrytSøknad: action('button-click')
  }
}`,...S.parameters?.docs?.source}}};D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.post(API_URLS.annenPartVedtak, () => HttpResponse.json(vedtakFar)), http.post(API_URLS.konto, () => HttpResponse.json({
        '80': DEFAULT_STØNADSKONTO,
        '100': {
          kontoer: [{
            konto: 'MØDREKVOTE',
            dager: 75
          }, {
            konto: 'FEDREKVOTE',
            dager: 75
          }, {
            konto: 'FELLESPERIODE',
            dager: 80
          }, {
            konto: 'FORELDREPENGER_FØR_FØDSEL',
            dager: 15
          }],
          minsteretter: {
            farRundtFødsel: 10,
            toTette: 0
          }
        } satisfies KontoBeregningDto
      }))]
    }
  },
  args: {
    person: søkerInfoKvinne,
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
      kanIkkeOppgis: false,
      erAleneOmOmsorg: false
    },
    dekningsgrad: '100',
    arbeidsforhold: [],
    mellomlagreSøknadOgNaviger: promiseAction(),
    avbrytSøknad: action('button-click')
  }
}`,...D.parameters?.docs?.source}}};A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.post(API_URLS.annenPartVedtak, () => new HttpResponse(null, {
        status: 200
      })), http.post(API_URLS.konto, () => HttpResponse.json({
        '80': DEFAULT_STØNADSKONTO,
        '100': {
          kontoer: [{
            konto: 'MØDREKVOTE',
            dager: 75
          }, {
            konto: 'FEDREKVOTE',
            dager: 75
          }, {
            konto: 'FELLESPERIODE',
            dager: 80
          }, {
            konto: 'FORELDREPENGER_FØR_FØDSEL',
            dager: 15
          }],
          minsteretter: {
            farRundtFødsel: 0,
            toTette: 0
          }
        } satisfies KontoBeregningDto
      }))]
    }
  },
  args: {
    person: søkerInfoMann,
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
      kanIkkeOppgis: false,
      erAleneOmOmsorg: false
    },
    dekningsgrad: '100',
    arbeidsforhold: [],
    mellomlagreSøknadOgNaviger: promiseAction(),
    avbrytSøknad: action('button-click')
  }
}`,...A.parameters?.docs?.source}}};v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.post(API_URLS.annenPartVedtak, () => new HttpResponse(null, {
        status: 200
      })), http.post(API_URLS.konto, () => HttpResponse.json({
        '80': DEFAULT_STØNADSKONTO,
        '100': {
          kontoer: [{
            konto: 'MØDREKVOTE',
            dager: 75
          }, {
            konto: 'FEDREKVOTE',
            dager: 75
          }, {
            konto: 'FELLESPERIODE',
            dager: 370
          }, {
            konto: 'FORELDREPENGER_FØR_FØDSEL',
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
        } satisfies KontoBeregningDto
      }))]
    }
  },
  args: {
    person: søkerInfoMann,
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
      kanIkkeOppgis: false,
      erAleneOmOmsorg: false
    },
    dekningsgrad: '100',
    arbeidsforhold: [],
    mellomlagreSøknadOgNaviger: promiseAction(),
    avbrytSøknad: action('button-click')
  }
}`,...v.parameters?.docs?.source}}};P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.post(API_URLS.annenPartVedtak, () => new HttpResponse(null, {
        status: 200
      })), http.post(API_URLS.konto, () => HttpResponse.json({
        '80': DEFAULT_STØNADSKONTO,
        '100': {
          kontoer: [{
            konto: 'MØDREKVOTE',
            dager: 75
          }, {
            konto: 'FEDREKVOTE',
            dager: 75
          }, {
            konto: 'FELLESPERIODE',
            dager: 370
          }, {
            konto: 'FORELDREPENGER_FØR_FØDSEL',
            dager: 15
          }],
          minsteretter: {
            farRundtFødsel: 10,
            toTette: 0
          }
        } satisfies KontoBeregningDto
      }))]
    }
  },
  args: {
    person: søkerInfoMann,
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
      kanIkkeOppgis: false,
      erAleneOmOmsorg: false
    },
    dekningsgrad: '100',
    arbeidsforhold: [],
    mellomlagreSøknadOgNaviger: promiseAction(),
    avbrytSøknad: action('button-click')
  }
}`,...P.parameters?.docs?.source}}};N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.post(API_URLS.annenPartVedtak, () => new HttpResponse(null, {
        status: 200
      })), http.post(API_URLS.konto, () => HttpResponse.json({
        '80': DEFAULT_STØNADSKONTO,
        '100': {
          kontoer: [{
            konto: 'MØDREKVOTE',
            dager: 75
          }, {
            konto: 'FEDREKVOTE',
            dager: 75
          }, {
            konto: 'FELLESPERIODE',
            dager: 100
          }, {
            konto: 'FORELDREPENGER_FØR_FØDSEL',
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
        } satisfies KontoBeregningDto
      }))]
    }
  },
  args: {
    person: søkerInfoMann,
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
      kanIkkeOppgis: false,
      erAleneOmOmsorg: false
    },
    dekningsgrad: '100',
    arbeidsforhold: [],
    mellomlagreSøknadOgNaviger: promiseAction(),
    avbrytSøknad: action('button-click')
  }
}`,...N.parameters?.docs?.source}}};I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.post(API_URLS.annenPartVedtak, () => HttpResponse.json(vedtakMor)), http.post(API_URLS.konto, () => HttpResponse.json({
        '80': DEFAULT_STØNADSKONTO,
        '100': {
          kontoer: [{
            konto: 'MØDREKVOTE',
            dager: 75
          }, {
            konto: 'FEDREKVOTE',
            dager: 75
          }, {
            konto: 'FELLESPERIODE',
            dager: 80
          }, {
            konto: 'FORELDREPENGER_FØR_FØDSEL',
            dager: 15
          }],
          minsteretter: {
            farRundtFødsel: 10,
            toTette: 0
          }
        } satisfies KontoBeregningDto
      }))]
    }
  },
  args: {
    person: søkerInfoMann,
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
      kanIkkeOppgis: false,
      erAleneOmOmsorg: false
    },
    dekningsgrad: '100',
    arbeidsforhold: [],
    mellomlagreSøknadOgNaviger: promiseAction(),
    avbrytSøknad: action('button-click')
  }
}`,...I.parameters?.docs?.source}}};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.post(API_URLS.annenPartVedtak, () => new HttpResponse(null, {
        status: 200
      })), http.post(API_URLS.konto, () => HttpResponse.json({
        '80': DEFAULT_STØNADSKONTO,
        '100': {
          kontoer: [{
            konto: 'MØDREKVOTE',
            dager: 95
          }, {
            konto: 'FEDREKVOTE',
            dager: 95
          }, {
            konto: 'FELLESPERIODE',
            dager: 90
          }],
          minsteretter: {
            farRundtFødsel: 0,
            toTette: 0
          }
        } satisfies KontoBeregningDto
      }))]
    }
  },
  args: {
    person: søkerInfoMann,
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
      kanIkkeOppgis: false,
      erAleneOmOmsorg: false
    },
    dekningsgrad: '100',
    arbeidsforhold: [],
    mellomlagreSøknadOgNaviger: promiseAction(),
    avbrytSøknad: action('button-click')
  }
}`,...b.parameters?.docs?.source}}};L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.post(API_URLS.annenPartVedtak, () => new HttpResponse(null, {
        status: 200
      })), http.post(API_URLS.konto, () => HttpResponse.json({
        '80': {
          kontoer: [{
            konto: 'MØDREKVOTE',
            dager: 95
          }, {
            konto: 'FEDREKVOTE',
            dager: 95
          }, {
            konto: 'FELLESPERIODE',
            dager: 370
          }],
          minsteretter: {
            farRundtFødsel: 0,
            toTette: 0
          }
        } satisfies KontoBeregningDto,
        '100': DEFAULT_STØNADSKONTO
      }))]
    }
  },
  args: {
    person: søkerInfoMann,
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
      kanIkkeOppgis: false,
      erAleneOmOmsorg: false
    },
    dekningsgrad: '80',
    arbeidsforhold: [],
    mellomlagreSøknadOgNaviger: promiseAction(),
    avbrytSøknad: action('button-click')
  }
}`,...L.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.post(API_URLS.annenPartVedtak, () => new HttpResponse(null, {
        status: 200
      })), http.post(API_URLS.konto, () => HttpResponse.json({
        '80': {
          kontoer: [{
            konto: 'MØDREKVOTE',
            dager: 95
          }, {
            konto: 'FEDREKVOTE',
            dager: 95
          }, {
            konto: 'FELLESPERIODE',
            dager: 90
          }, {
            konto: 'FORELDREPENGER_FØR_FØDSEL',
            dager: 15
          }],
          minsteretter: {
            farRundtFødsel: 10,
            toTette: 0
          }
        } satisfies KontoBeregningDto,
        '100': DEFAULT_STØNADSKONTO
      }))]
    }
  },
  args: {
    person: søkerInfoKvinne,
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
      kanIkkeOppgis: false,
      erAleneOmOmsorg: false
    },
    dekningsgrad: '80',
    arbeidsforhold: [],
    mellomlagreSøknadOgNaviger: promiseAction(),
    avbrytSøknad: action('button-click')
  }
}`,...h.parameters?.docs?.source}}};j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.post(API_URLS.annenPartVedtak, () => new HttpResponse(null, {
        status: 200
      })), http.post(API_URLS.konto, () => HttpResponse.json({
        '80': DEFAULT_STØNADSKONTO,
        '100': {
          kontoer: [{
            konto: 'MØDREKVOTE',
            dager: 95
          }, {
            konto: 'FEDREKVOTE',
            dager: 95
          }, {
            konto: 'FELLESPERIODE',
            dager: 90
          }],
          minsteretter: {
            farRundtFødsel: 0,
            toTette: 0
          }
        } satisfies KontoBeregningDto
      }))]
    }
  },
  args: {
    person: søkerInfoMann,
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
      kanIkkeOppgis: false,
      erAleneOmOmsorg: false
    },
    dekningsgrad: '100',
    arbeidsforhold: [],
    mellomlagreSøknadOgNaviger: promiseAction(),
    avbrytSøknad: action('button-click')
  }
}`,...j.parameters?.docs?.source}}};U.parameters={...U.parameters,docs:{...U.parameters?.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.post(API_URLS.annenPartVedtak, () => new HttpResponse(null, {
        status: 200
      })), http.post(API_URLS.konto, () => HttpResponse.json({
        '80': DEFAULT_STØNADSKONTO,
        '100': {
          kontoer: [{
            konto: 'FORELDREPENGER',
            dager: 230
          }],
          minsteretter: {
            farRundtFødsel: 15,
            toTette: 0
          }
        } satisfies KontoBeregningDto
      }))]
    }
  },
  args: {
    person: søkerInfoKvinne,
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
      kanIkkeOppgis: false,
      erAleneOmOmsorg: false
    },
    dekningsgrad: '100',
    arbeidsforhold: [],
    mellomlagreSøknadOgNaviger: promiseAction(),
    avbrytSøknad: action('button-click')
  }
}`,...U.parameters?.docs?.source}}};_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.post(API_URLS.annenPartVedtak, () => new HttpResponse(null, {
        status: 200
      })), http.post(API_URLS.konto, () => HttpResponse.json({
        '80': DEFAULT_STØNADSKONTO,
        '100': {
          kontoer: [{
            konto: 'FORELDREPENGER',
            dager: 230
          }],
          minsteretter: {
            farRundtFødsel: 0,
            toTette: 0
          }
        } satisfies KontoBeregningDto
      }))]
    }
  },
  args: {
    person: søkerInfoKvinne,
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
      kanIkkeOppgis: false,
      erAleneOmOmsorg: false
    },
    dekningsgrad: '100',
    arbeidsforhold: [],
    mellomlagreSøknadOgNaviger: promiseAction(),
    avbrytSøknad: action('button-click')
  }
}`,..._.parameters?.docs?.source}}};B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.post(API_URLS.annenPartVedtak, () => new HttpResponse(null, {
        status: 200
      })), http.post(API_URLS.konto, () => HttpResponse.json({
        '80': DEFAULT_STØNADSKONTO,
        '100': {
          kontoer: [{
            konto: 'FORELDREPENGER',
            dager: 155
          }, {
            konto: 'AKTIVITETSFRI_KVOTE',
            dager: 375
          }],
          minsteretter: {
            farRundtFødsel: 10,
            toTette: 0
          }
        } satisfies KontoBeregningDto
      }))]
    }
  },
  args: {
    person: søkerInfoMann,
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
      erAleneOmOmsorg: false,
      erMorUfør: true
    },
    dekningsgrad: '100',
    arbeidsforhold: [],
    mellomlagreSøknadOgNaviger: promiseAction(),
    avbrytSøknad: action('button-click')
  }
}`,...B.parameters?.docs?.source}}};y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.post(API_URLS.annenPartVedtak, () => new HttpResponse(null, {
        status: 200
      })), http.post(API_URLS.konto, () => HttpResponse.json({
        '80': DEFAULT_STØNADSKONTO,
        '100': {
          kontoer: [{
            konto: 'FORELDREPENGER',
            dager: 210
          }, {
            konto: 'AKTIVITETSFRI_KVOTE',
            dager: 40
          }],
          minsteretter: {
            farRundtFødsel: 10,
            toTette: 0
          }
        } satisfies KontoBeregningDto
      }))]
    }
  },
  args: {
    person: søkerInfoMann,
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
      erAleneOmOmsorg: false,
      erMorUfør: false
    },
    dekningsgrad: '100',
    arbeidsforhold: [],
    mellomlagreSøknadOgNaviger: promiseAction(),
    avbrytSøknad: action('button-click')
  }
}`,...y.parameters?.docs?.source}}};K.parameters={...K.parameters,docs:{...K.parameters?.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.post(API_URLS.annenPartVedtak, () => new HttpResponse(null, {
        status: 200
      })), http.post(API_URLS.konto, () => HttpResponse.json({
        '80': DEFAULT_STØNADSKONTO,
        '100': {
          kontoer: [{
            konto: 'FORELDREPENGER',
            dager: 285
          }],
          minsteretter: {
            farRundtFødsel: 0,
            toTette: 0
          }
        } satisfies KontoBeregningDto
      }))]
    }
  },
  args: {
    person: søkerInfoMann,
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
      erAleneOmOmsorg: false,
      erMorUfør: true
    },
    dekningsgrad: '100',
    arbeidsforhold: [],
    mellomlagreSøknadOgNaviger: promiseAction(),
    avbrytSøknad: action('button-click')
  }
}`,...K.parameters?.docs?.source}}};H.parameters={...H.parameters,docs:{...H.parameters?.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.post(API_URLS.annenPartVedtak, () => new HttpResponse(null, {
        status: 200
      })), http.post(API_URLS.konto, () => HttpResponse.json({
        '80': DEFAULT_STØNADSKONTO,
        '100': {
          kontoer: [{
            konto: 'FORELDREPENGER',
            dager: 125
          }, {
            konto: 'AKTIVITETSFRI_KVOTE',
            dager: 75
          }],
          minsteretter: {
            farRundtFødsel: 10,
            toTette: 0
          }
        } satisfies KontoBeregningDto
      }))]
    }
  },
  args: {
    person: søkerInfoMann,
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
      kanIkkeOppgis: false,
      erAleneOmOmsorg: false
    },
    dekningsgrad: '100',
    arbeidsforhold: [],
    mellomlagreSøknadOgNaviger: promiseAction(),
    avbrytSøknad: action('button-click')
  }
}`,...H.parameters?.docs?.source}}};const gn=["MorAleneomsorgDekning80EttBarnFør1Okt2021","MorAleneomsorgEttBarnPrematurFødsel","MorAleneomsorgAdopsjonTrillinger","FarMedmorAleneomsorgFødtTvillinger","FarMedmorAleneomsorgFødtFireBarnFør1Okt2021","FarMedmorAleneomsorgFødtTreBarnFørWLB","FarMedmorAleneomsorgEttBarnTerminEtterWLB","FarMedmorAleneomsorgPrematurtFødtBarn","FarMedmorAleneomsorgAdopsjonFireBarn","MorDeltUttakEttBarnPrematurFødsel","MorDeltUttakEttBarnetter1Juli2024Med80ProsentDekning","MorDeltUttakEttBarnTermin","MorDeltUttakTvillingerFødt","MorDeltUttakFarSøkteMorsKvoteOgFellesperiode","FarMedmorSøkerDeltUttakEttBarnFødtFør1Okt2021","FarMedmorSøkerDeltUttakTrillingerFødtFørWLB","FarMedmorSøkerDeltUttakFireBarnTerminEtterWLB","FarMedmorSøkerDeltUttakEttBarnFødtPrematurt","FarSøkerDerMorHarTattUtFedrekvoteOgFellesperiode","FarSøkerAdopsjonToBarn","MorSøkerAdopsjonTreBarnFraUtlandetFør1Okt2021Dekningsgrad80","MorSøkerFarHarRettIEØSTerminDekningsgrad80","FarMedmorSøkerMorHarRettIEØSAdopsjon","BareMorHarRettTermin","BareMorHarRettAdopsjon","BareFarHarRettOgMorErUførTermin4Barn","BareFarHarRettOgMorErIkkeUførFødtBarn","BareFarHarRettTvillingerFødtFør1Okt2021","BareFarHarRettAdopsjonMorErUfør"];export{H as BareFarHarRettAdopsjonMorErUfør,y as BareFarHarRettOgMorErIkkeUførFødtBarn,B as BareFarHarRettOgMorErUførTermin4Barn,K as BareFarHarRettTvillingerFødtFør1Okt2021,_ as BareMorHarRettAdopsjon,U as BareMorHarRettTermin,O as FarMedmorAleneomsorgAdopsjonFireBarn,R as FarMedmorAleneomsorgEttBarnTerminEtterWLB,E as FarMedmorAleneomsorgFødtFireBarnFør1Okt2021,f as FarMedmorAleneomsorgFødtTreBarnFørWLB,m as FarMedmorAleneomsorgFødtTvillinger,u as FarMedmorAleneomsorgPrematurtFødtBarn,A as FarMedmorSøkerDeltUttakEttBarnFødtFør1Okt2021,N as FarMedmorSøkerDeltUttakEttBarnFødtPrematurt,P as FarMedmorSøkerDeltUttakFireBarnTerminEtterWLB,v as FarMedmorSøkerDeltUttakTrillingerFødtFørWLB,j as FarMedmorSøkerMorHarRettIEØSAdopsjon,b as FarSøkerAdopsjonToBarn,I as FarSøkerDerMorHarTattUtFedrekvoteOgFellesperiode,p as MorAleneomsorgAdopsjonTrillinger,i as MorAleneomsorgDekning80EttBarnFør1Okt2021,g as MorAleneomsorgEttBarnPrematurFødsel,F as MorDeltUttakEttBarnPrematurFødsel,c as MorDeltUttakEttBarnTermin,T as MorDeltUttakEttBarnetter1Juli2024Med80ProsentDekning,D as MorDeltUttakFarSøkteMorsKvoteOgFellesperiode,S as MorDeltUttakTvillingerFødt,L as MorSøkerAdopsjonTreBarnFraUtlandetFør1Okt2021Dekningsgrad80,h as MorSøkerFarHarRettIEØSTerminDekningsgrad80,gn as __namedExportsOrder,kn as default};
