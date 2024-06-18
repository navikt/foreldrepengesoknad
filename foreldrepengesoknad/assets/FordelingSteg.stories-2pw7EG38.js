import{j as a}from"./jsx-runtime-_e34SzbC.js";import{a as fe}from"./chunk-MZXVCX43-CM0pFb8Z.js";import{A as Ie}from"./AxiosMock-C4Zycm12.js";import"./Tidsperioden-CBU4jtV4.js";import"./index--IHLcpuH.js";import{B as e,M as Be}from"./index-BI6FGWNT.js";import{a as n,D as r,S as Ae}from"./useFpNavigator-Bts19Tif.js";import"./index-DVXBtNgz.js";import"./_baseToString-CUxX9raG.js";import"./_createSet-BJbToUt4.js";import{i as Pe}from"./infobox.module-CEohyy7k.js";import{F as He}from"./uttaksplanInfoUtils-mPCYp8oG.js";import{F as Me,C as s}from"./FpDataContext-BcznBdmF.js";import{F as me}from"./FordelingSteg-D_aAboKW.js";import"./v4-CQkTLCs1.js";import"./index-C4x6kqll.js";import"./apiInterceptor-ChqlQpSB.js";import"./index-Dcs0RV0A.js";import"./Link-SOWRV7cb.js";import"./index-Cbx7Fas8.js";import"./iframe-CgpBWDQf.js";import"../sb-preview/runtime.js";import"./message-7S5F936x.js";import"./links-BFd19Kxc.js";import"./Accordion-BnHB9JsT.js";import"./extends-CF3RwP-h.js";import"./VStack-DueXo9sZ.js";import"./dateFormValidation-Bmatx0XA.js";import"./amplitude.esm-BThBy0fb.js";import"./useRequest-DZS6KsAA.js";import"./barnUtils-CzrFcN1F.js";import"./eksisterendeSakUtils-QoOxCzFA.js";import"./velkommenUtils-DJXEdjiC.js";import"./dateUtils-D95WVZnc.js";import"./ErrorSummaryHookForm-aTy7Vxot.js";import"./BabyWrapped-Tv8A6lRd.js";const _e="/rest/innsyn/v2/annenPartVedtak",be="/rest/konto",he={dekningsgrad:"HUNDRE",perioder:[{fom:"2024-02-07",tom:"2024-02-19",kontoType:"MØDREKVOTE",overføringÅrsak:"INSTITUSJONSOPPHOLD_ANNEN_FORELDER",resultat:{innvilget:!0,trekkerMinsterett:!1,trekkerDager:!0,årsak:"ANNET"}},{fom:"2024-06-11",tom:"2024-06-30",kontoType:"FELLESPERIODE",resultat:{innvilget:!0,trekkerMinsterett:!1,trekkerDager:!0,årsak:"ANNET"}}]},Ke={dekningsgrad:"HUNDRE",perioder:[{fom:"2024-07-07",tom:"2024-07-24",kontoType:"FEDREKVOTE",overføringÅrsak:"INSTITUSJONSOPPHOLD_ANNEN_FORELDER",resultat:{innvilget:!0,trekkerMinsterett:!1,trekkerDager:!0,årsak:"ANNET"}},{fom:"2024-08-11",tom:"2024-08-12",kontoType:"FELLESPERIODE",resultat:{innvilget:!0,trekkerMinsterett:!1,trekkerDager:!0,årsak:"ANNET"}}]},o={fnr:"19047815714",fornavn:"Hanne",etternavn:"Mygg",kjønn:"K",fødselsdato:"1978-04-19"},t={fnr:"19047815715",fornavn:"Hans",etternavn:"Mygg",kjønn:"M",fødselsdato:"1972-06-07"},Le=()=>(...M)=>(fe("button-click")(...M),Promise.resolve()),We=({mellomlagreSøknadOgNaviger:M=Le(),avbrytSøknad:ue=fe("button-click"),gåTilNesteSide:xe,søker:Te,søkersituasjon:ve,annenForelder:Re,barnet:Oe,stønadskonto100:Ee,stønadskonto80:ce,annenPartVedtak:Se,dekningsgrad:De,arbeidsforhold:Ne=[]})=>{Pe();const ye=Ee||{kontoer:{},minsteretter:{}},je=ce||{kontoer:{},minsteretter:{}},Ue=_=>{_.onPost(_e).replyOnce(200,Se),_.onPost(be).replyOnce(200,{80:je,100:ye})};return a.jsx(Be,{initialEntries:[Ae.FORDELING],children:a.jsx(Ie,{mock:Ue,children:a.jsx(He,{children:a.jsx(Me,{onDispatch:xe,initialState:{[s.SØKERSITUASJON]:ve,[s.OM_BARNET]:Oe,[s.SØKER_DATA]:{harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1,harHattAnnenInntektSiste10Mnd:!1},[s.ANNEN_FORELDER]:Re,[s.PERIODE_MED_FORELDREPENGER]:{dekningsgrad:De}},children:a.jsx(me,{arbeidsforhold:Ne,søker:Te,mellomlagreSøknadOgNaviger:M,avbrytSøknad:ue})})})})})},Sr={title:"steps/FordelingSteg",component:me,render:We},d={args:{søker:o,erAleneOmOmsorg:!0,søkersituasjon:{situasjon:"fødsel",rolle:"mor"},barnet:{type:e.FØDT,fødselsdatoer:["2021-09-21"],antallBarn:1,termindato:"2021-09-24"},annenForelder:{fornavn:"Hans",etternavn:"Utvikler",kanIkkeOppgis:!1,erAleneOmOmsorg:!0,datoForAleneomsorg:"2021-09-21"},stønadskonto100:void 0,stønadskonto80:{kontoer:[{konto:n.Foreldrepenger,dager:280},{konto:n.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},dekningsgrad:r.ÅTTI_PROSENT}},k={args:{søker:o,erAleneOmOmsorg:!0,søkersituasjon:{situasjon:"fødsel",rolle:"mor"},barnet:{type:e.FØDT,fødselsdatoer:["2023-09-21"],antallBarn:1,termindato:"2023-12-20"},annenForelder:{fornavn:"Hans",etternavn:"Utvikler",erAleneOmOmsorg:!0,datoForAleneomsorg:"2023-09-21",kanIkkeOppgis:!1},stønadskonto100:{kontoer:[{konto:n.Foreldrepenger,dager:294},{konto:n.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:10,toTette:0}},stønadskonto80:void 0,dekningsgrad:r.HUNDRE_PROSENT}},l={args:{søker:o,erAleneOmOmsorg:!0,søkersituasjon:{situasjon:"adopsjon",rolle:"mor"},barnet:{type:e.ADOPTERT_STEBARN,fødselsdatoer:["2024-02-21"],antallBarn:3,adopsjonsdato:"2024-02-21"},annenForelder:{kanIkkeOppgis:!0},stønadskonto80:void 0,stønadskonto100:{kontoer:[{konto:n.Foreldrepenger,dager:460}],minsteretter:{farRundtFødsel:0,toTette:0}},dekningsgrad:r.HUNDRE_PROSENT}},F={args:{søker:t,erAleneOmOmsorg:!0,søkersituasjon:{situasjon:"fødsel",rolle:"far"},barnet:{type:e.FØDT,fødselsdatoer:["2023-09-21"],antallBarn:2,termindato:"2023-09-21"},annenForelder:{fornavn:"Hanne",etternavn:"Utvikler",erAleneOmOmsorg:!0,datoForAleneomsorg:"2023-09-23",kanIkkeOppgis:!1},stønadskonto100:{kontoer:[{konto:n.Foreldrepenger,dager:385}],minsteretter:{farRundtFødsel:10,toTette:0}},stønadskonto80:void 0,dekningsgrad:r.HUNDRE_PROSENT}},i={args:{søker:t,erAleneOmOmsorg:!0,søkersituasjon:{situasjon:"fødsel",rolle:"far"},barnet:{type:e.FØDT,fødselsdatoer:["2021-09-21"],antallBarn:4,termindato:"2021-09-21"},annenForelder:{fornavn:"Hanne",etternavn:"Utvikler",erAleneOmOmsorg:!0,datoForAleneomsorg:"2021-09-21",kanIkkeOppgis:!1},stønadskonto100:{kontoer:[{konto:n.Foreldrepenger,dager:460}],minsteretter:{farRundtFødsel:0,toTette:0}},stønadskonto80:void 0,dekningsgrad:r.HUNDRE_PROSENT}},g={args:{søker:t,erAleneOmOmsorg:!0,søkersituasjon:{situasjon:"fødsel",rolle:"far"},barnet:{type:e.FØDT,fødselsdatoer:["2022-07-21"],antallBarn:3,termindato:"2022-07-21"},annenForelder:{fornavn:"Hanne",etternavn:"Utvikler",erAleneOmOmsorg:!0,datoForAleneomsorg:"2022-09-21",kanIkkeOppgis:!1},stønadskonto100:{kontoer:[{konto:n.Foreldrepenger,dager:460}],minsteretter:{farRundtFødsel:0,toTette:0}},stønadskonto80:void 0,dekningsgrad:r.HUNDRE_PROSENT}},p={args:{søker:t,erAleneOmOmsorg:!0,søkersituasjon:{situasjon:"fødsel",rolle:"far"},barnet:{type:e.UFØDT,antallBarn:3,termindato:"2024-07-21"},annenForelder:{erAleneOmOmsorg:!0,fornavn:"Hanne",etternavn:"Utvikler",datoForAleneomsorg:"2024-09-21",kanIkkeOppgis:!1},stønadskonto100:{kontoer:[{konto:n.Foreldrepenger,dager:230}],minsteretter:{farRundtFødsel:10,toTette:0}},stønadskonto80:void 0,dekningsgrad:r.HUNDRE_PROSENT}},f={args:{søker:t,erAleneOmOmsorg:!0,søkersituasjon:{situasjon:"fødsel",rolle:"far"},barnet:{type:e.FØDT,antallBarn:1,fødselsdatoer:["2024-01-21"],termindato:"2024-04-21"},annenForelder:{fornavn:"Hanne",etternavn:"Utvikler",erAleneOmOmsorg:!0,datoForAleneomsorg:"2024-01-21",kanIkkeOppgis:!1},stønadskonto100:{kontoer:[{konto:n.Foreldrepenger,dager:273}],minsteretter:{farRundtFødsel:0,toTette:0}},stønadskonto80:void 0,dekningsgrad:r.HUNDRE_PROSENT}},m={args:{søker:t,erAleneOmOmsorg:!0,søkersituasjon:{situasjon:"adopsjon",rolle:"far"},barnet:{type:e.ADOPTERT_ANNET_BARN,fødselsdatoer:["2021-08-21"],antallBarn:4,adopsjonsdato:"2021-08-23"},annenForelder:{fornavn:"Hanne",etternavn:"Utvikler",erAleneOmOmsorg:!0,datoForAleneomsorg:"2024-01-21",kanIkkeOppgis:!1},stønadskonto100:{kontoer:[{konto:n.Foreldrepenger,dager:460}],minsteretter:{farRundtFødsel:0,toTette:0}},stønadskonto80:void 0,dekningsgrad:r.HUNDRE_PROSENT}},u={args:{søker:o,søkersituasjon:{situasjon:"fødsel",rolle:"mor"},barnet:{type:e.FØDT,fødselsdatoer:["2023-09-21"],antallBarn:1,termindato:"2023-12-21"},annenForelder:{fornavn:"Hans",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1},stønadskonto100:{kontoer:[{konto:n.Mødrekvote,dager:75},{konto:n.Fedrekvote,dager:75},{konto:n.Fellesperiode,dager:100},{konto:n.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:10,toTette:0}},stønadskonto80:void 0,dekningsgrad:r.HUNDRE_PROSENT}},x={args:{søker:o,søkersituasjon:{situasjon:"fødsel",rolle:"mor"},barnet:{type:e.UFØDT,antallBarn:1,termindato:"2024-06-21"},annenForelder:{fornavn:"Hans",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1},stønadskonto100:{kontoer:[{konto:n.Mødrekvote,dager:75},{konto:n.Fedrekvote,dager:75},{konto:n.Fellesperiode,dager:80},{konto:n.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:10,toTette:0}},stønadskonto80:void 0,dekningsgrad:r.HUNDRE_PROSENT}},T={args:{søker:o,søkersituasjon:{situasjon:"fødsel",rolle:"mor"},barnet:{type:e.FØDT,antallBarn:2,fødselsdatoer:["2024-02-21"],termindato:"2024-02-21"},annenForelder:{fornavn:"Hans",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1},stønadskonto100:{kontoer:[{konto:n.Mødrekvote,dager:75},{konto:n.Fedrekvote,dager:75},{konto:n.Fellesperiode,dager:165},{konto:n.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:10,toTette:0}},stønadskonto80:void 0,dekningsgrad:r.HUNDRE_PROSENT}},v={args:{søker:o,søkersituasjon:{situasjon:"fødsel",rolle:"mor"},barnet:{type:e.UFØDT,antallBarn:1,termindato:"2024-07-21"},annenForelder:{fornavn:"Hans",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1},stønadskonto100:{kontoer:[{konto:n.Mødrekvote,dager:75},{konto:n.Fedrekvote,dager:75},{konto:n.Fellesperiode,dager:80},{konto:n.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:10,toTette:0}},stønadskonto80:void 0,dekningsgrad:r.HUNDRE_PROSENT,annenPartVedtak:he}},R={args:{søker:t,søkersituasjon:{situasjon:"fødsel",rolle:"far"},barnet:{type:e.FØDT,antallBarn:1,fødselsdatoer:["2021-07-21"],termindato:"2021-07-21"},annenForelder:{fornavn:"Hanne",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1},stønadskonto100:{kontoer:[{konto:n.Mødrekvote,dager:75},{konto:n.Fedrekvote,dager:75},{konto:n.Fellesperiode,dager:80},{konto:n.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},stønadskonto80:void 0,dekningsgrad:r.HUNDRE_PROSENT}},O={args:{søker:t,søkersituasjon:{situasjon:"fødsel",rolle:"far"},barnet:{type:e.FØDT,antallBarn:3,fødselsdatoer:["2022-07-21"],termindato:"2022-07-21"},annenForelder:{fornavn:"Hanne",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1},stønadskonto100:{kontoer:[{konto:n.Mødrekvote,dager:75},{konto:n.Fedrekvote,dager:75},{konto:n.Fellesperiode,dager:370},{konto:n.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},stønadskonto80:void 0,dekningsgrad:r.HUNDRE_PROSENT}},E={args:{søker:t,søkersituasjon:{situasjon:"fødsel",rolle:"far"},barnet:{type:e.UFØDT,antallBarn:4,termindato:"2024-07-21"},annenForelder:{fornavn:"Hanne",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1},stønadskonto100:{kontoer:[{konto:n.Mødrekvote,dager:75},{konto:n.Fedrekvote,dager:75},{konto:n.Fellesperiode,dager:370},{konto:n.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:10,toTette:0}},stønadskonto80:void 0,dekningsgrad:r.HUNDRE_PROSENT}},c={args:{søker:t,søkersituasjon:{situasjon:"fødsel",rolle:"far"},barnet:{type:e.FØDT,antallBarn:1,fødselsdatoer:["2024-02-21"],termindato:"2024-05-21"},annenForelder:{fornavn:"Hanne",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1},stønadskonto100:{kontoer:[{konto:n.Mødrekvote,dager:75},{konto:n.Fedrekvote,dager:75},{konto:n.Fellesperiode,dager:100},{konto:n.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:10,toTette:0}},stønadskonto80:void 0,dekningsgrad:r.HUNDRE_PROSENT}},S={args:{søker:t,søkersituasjon:{situasjon:"fødsel",rolle:"far"},barnet:{type:e.FØDT,antallBarn:1,fødselsdatoer:["2024-02-21"],termindato:"2024-02-21"},annenForelder:{fornavn:"Hanne",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1},stønadskonto100:{kontoer:[{konto:n.Mødrekvote,dager:75},{konto:n.Fedrekvote,dager:75},{konto:n.Fellesperiode,dager:80},{konto:n.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:10,toTette:0}},stønadskonto80:void 0,dekningsgrad:r.HUNDRE_PROSENT,annenPartVedtak:Ke}},D={args:{søker:t,søkersituasjon:{situasjon:"adopsjon",rolle:"far"},barnet:{type:e.ADOPTERT_STEBARN,antallBarn:2,fødselsdatoer:["2024-02-21"],adopsjonsdato:"2024-02-21"},annenForelder:{fornavn:"Hanne",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1},stønadskonto100:{kontoer:[{konto:n.Mødrekvote,dager:95},{konto:n.Fedrekvote,dager:95},{konto:n.Fellesperiode,dager:90}],minsteretter:{farRundtFødsel:0,toTette:0}},stønadskonto80:void 0,dekningsgrad:r.HUNDRE_PROSENT}},N={args:{søker:t,søkersituasjon:{situasjon:"adopsjon",rolle:"mor"},barnet:{type:e.ADOPTERT_ANNET_BARN,antallBarn:3,fødselsdatoer:["2021-02-21"],adopsjonsdato:"2021-02-21",ankomstdato:"2021-05-21"},annenForelder:{fornavn:"Hans",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1},stønadskonto100:void 0,stønadskonto80:{kontoer:[{konto:n.Mødrekvote,dager:95},{konto:n.Fedrekvote,dager:95},{konto:n.Fellesperiode,dager:370}],minsteretter:{farRundtFødsel:0,toTette:0}},dekningsgrad:r.ÅTTI_PROSENT}},y={args:{søker:o,søkersituasjon:{situasjon:"fødsel",rolle:"mor"},barnet:{type:e.UFØDT,antallBarn:1,termindato:"2024-07-21"},annenForelder:{fornavn:"Hans",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!1,harOppholdtSegIEØS:!0,harRettPåForeldrepengerIEØS:!0,kanIkkeOppgis:!1},stønadskonto100:void 0,stønadskonto80:{kontoer:[{konto:n.Mødrekvote,dager:95},{konto:n.Fedrekvote,dager:95},{konto:n.Fellesperiode,dager:90},{konto:n.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:10,toTette:0}},dekningsgrad:r.ÅTTI_PROSENT}},j={args:{søker:t,søkersituasjon:{situasjon:"adopsjon",rolle:"far"},barnet:{type:e.ADOPTERT_STEBARN,antallBarn:1,adopsjonsdato:"2024-02-21",fødselsdatoer:["2024-02-21"]},annenForelder:{fornavn:"Hanne",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!1,harOppholdtSegIEØS:!0,harRettPåForeldrepengerIEØS:!0,kanIkkeOppgis:!1},stønadskonto100:{kontoer:[{konto:n.Mødrekvote,dager:95},{konto:n.Fedrekvote,dager:95},{konto:n.Fellesperiode,dager:90}],minsteretter:{farRundtFødsel:0,toTette:0}},stønadskonto80:void 0,dekningsgrad:r.HUNDRE_PROSENT}},U={args:{søker:o,søkersituasjon:{situasjon:"fødsel",rolle:"mor"},barnet:{type:e.UFØDT,antallBarn:1,termindato:"2024-07-21"},annenForelder:{fornavn:"Hans",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!1,kanIkkeOppgis:!1},stønadskonto100:{kontoer:[{konto:n.Foreldrepenger,dager:230}],minsteretter:{farRundtFødsel:15,toTette:0}},stønadskonto80:void 0,dekningsgrad:r.HUNDRE_PROSENT}},I={args:{søker:o,søkersituasjon:{situasjon:"adopsjon",rolle:"mor"},barnet:{type:e.ADOPTERT_ANNET_BARN,antallBarn:1,adopsjonsdato:"2022-08-21",fødselsdatoer:["2022-01-01"]},annenForelder:{fornavn:"Hans",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!1,kanIkkeOppgis:!1},stønadskonto100:{kontoer:[{konto:n.Foreldrepenger,dager:230}],minsteretter:{farRundtFødsel:0,toTette:0}},stønadskonto80:void 0,dekningsgrad:r.HUNDRE_PROSENT}},B={args:{søker:t,søkersituasjon:{situasjon:"fødsel",rolle:"far"},barnet:{type:e.UFØDT,antallBarn:4,termindato:"2024-07-21"},annenForelder:{fornavn:"Hanne",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!1,kanIkkeOppgis:!1,erMorUfør:!0},stønadskonto100:{kontoer:[{konto:n.Foreldrepenger,dager:155},{konto:n.AktivitetsfriKvote,dager:375}],minsteretter:{farRundtFødsel:10,toTette:0}},stønadskonto80:void 0,dekningsgrad:r.HUNDRE_PROSENT}},A={args:{søker:t,søkersituasjon:{situasjon:"fødsel",rolle:"far"},barnet:{type:e.FØDT,antallBarn:1,fødselsdatoer:["2024-01-21"],termindato:"2024-01-21"},annenForelder:{fornavn:"Hanne",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!1,kanIkkeOppgis:!1,erMorUfør:!1},stønadskonto100:{kontoer:[{konto:n.Foreldrepenger,dager:210},{konto:n.AktivitetsfriKvote,dager:40}],minsteretter:{farRundtFødsel:10,toTette:0}},stønadskonto80:void 0,dekningsgrad:r.HUNDRE_PROSENT}},P={args:{søker:t,søkersituasjon:{situasjon:"fødsel",rolle:"far"},barnet:{type:e.FØDT,antallBarn:2,fødselsdatoer:["2021-07-21"],termindato:"2021-07-21"},annenForelder:{fornavn:"Hanne",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!1,kanIkkeOppgis:!1,erMorUfør:!0},stønadskonto100:{kontoer:[{konto:n.Foreldrepenger,dager:285}],minsteretter:{farRundtFødsel:0,toTette:0}},stønadskonto80:void 0,dekningsgrad:r.HUNDRE_PROSENT}},H={args:{søker:t,søkersituasjon:{situasjon:"adopsjon",rolle:"far"},barnet:{type:e.ADOPTERT_STEBARN,antallBarn:1,fødselsdatoer:["2024-02-21"],adopsjonsdato:"2024-02-21"},annenForelder:{fornavn:"Hanne",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!1,erMorUfør:!0,kanIkkeOppgis:!1},stønadskonto100:{kontoer:[{konto:n.Foreldrepenger,dager:125},{konto:n.AktivitetsfriKvote,dager:75}],minsteretter:{farRundtFødsel:10,toTette:0}},stønadskonto80:void 0,dekningsgrad:r.HUNDRE_PROSENT}};var b,h,K;d.parameters={...d.parameters,docs:{...(b=d.parameters)==null?void 0:b.docs,source:{originalSource:`{
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
}`,...(K=(h=d.parameters)==null?void 0:h.docs)==null?void 0:K.source}}};var L,W,C;k.parameters={...k.parameters,docs:{...(L=k.parameters)==null?void 0:L.docs,source:{originalSource:`{
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
      }
    },
    stønadskonto80: undefined,
    dekningsgrad: Dekningsgrad.HUNDRE_PROSENT
  }
}`,...(C=(W=k.parameters)==null?void 0:W.docs)==null?void 0:C.source}}};var V,J,G;l.parameters={...l.parameters,docs:{...(V=l.parameters)==null?void 0:V.docs,source:{originalSource:`{
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
}`,...(G=(J=l.parameters)==null?void 0:J.docs)==null?void 0:G.source}}};var q,w,z;F.parameters={...F.parameters,docs:{...(q=F.parameters)==null?void 0:q.docs,source:{originalSource:`{
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
}`,...(z=(w=F.parameters)==null?void 0:w.docs)==null?void 0:z.source}}};var Q,X,Y;i.parameters={...i.parameters,docs:{...(Q=i.parameters)==null?void 0:Q.docs,source:{originalSource:`{
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
}`,...(Y=(X=i.parameters)==null?void 0:X.docs)==null?void 0:Y.source}}};var Z,$,nn;g.parameters={...g.parameters,docs:{...(Z=g.parameters)==null?void 0:Z.docs,source:{originalSource:`{
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
}`,...(nn=($=g.parameters)==null?void 0:$.docs)==null?void 0:nn.source}}};var en,rn,tn;p.parameters={...p.parameters,docs:{...(en=p.parameters)==null?void 0:en.docs,source:{originalSource:`{
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
}`,...(tn=(rn=p.parameters)==null?void 0:rn.docs)==null?void 0:tn.source}}};var on,an,sn;f.parameters={...f.parameters,docs:{...(on=f.parameters)==null?void 0:on.docs,source:{originalSource:`{
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
      }
    },
    stønadskonto80: undefined,
    dekningsgrad: Dekningsgrad.HUNDRE_PROSENT
  }
}`,...(sn=(an=f.parameters)==null?void 0:an.docs)==null?void 0:sn.source}}};var dn,kn,ln;m.parameters={...m.parameters,docs:{...(dn=m.parameters)==null?void 0:dn.docs,source:{originalSource:`{
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
}`,...(ln=(kn=m.parameters)==null?void 0:kn.docs)==null?void 0:ln.source}}};var Fn,gn,pn;u.parameters={...u.parameters,docs:{...(Fn=u.parameters)==null?void 0:Fn.docs,source:{originalSource:`{
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
      }
    },
    stønadskonto80: undefined,
    dekningsgrad: Dekningsgrad.HUNDRE_PROSENT
  }
}`,...(pn=(gn=u.parameters)==null?void 0:gn.docs)==null?void 0:pn.source}}};var fn,mn,un;x.parameters={...x.parameters,docs:{...(fn=x.parameters)==null?void 0:fn.docs,source:{originalSource:`{
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
}`,...(un=(mn=x.parameters)==null?void 0:mn.docs)==null?void 0:un.source}}};var xn,Tn,vn;T.parameters={...T.parameters,docs:{...(xn=T.parameters)==null?void 0:xn.docs,source:{originalSource:`{
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
      }
    },
    stønadskonto80: undefined,
    dekningsgrad: Dekningsgrad.HUNDRE_PROSENT
  }
}`,...(vn=(Tn=T.parameters)==null?void 0:Tn.docs)==null?void 0:vn.source}}};var Rn,On,En;v.parameters={...v.parameters,docs:{...(Rn=v.parameters)==null?void 0:Rn.docs,source:{originalSource:`{
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
}`,...(En=(On=v.parameters)==null?void 0:On.docs)==null?void 0:En.source}}};var cn,Sn,Dn;R.parameters={...R.parameters,docs:{...(cn=R.parameters)==null?void 0:cn.docs,source:{originalSource:`{
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
}`,...(Dn=(Sn=R.parameters)==null?void 0:Sn.docs)==null?void 0:Dn.source}}};var Nn,yn,jn;O.parameters={...O.parameters,docs:{...(Nn=O.parameters)==null?void 0:Nn.docs,source:{originalSource:`{
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
      }
    },
    stønadskonto80: undefined,
    dekningsgrad: Dekningsgrad.HUNDRE_PROSENT
  }
}`,...(jn=(yn=O.parameters)==null?void 0:yn.docs)==null?void 0:jn.source}}};var Un,In,Bn;E.parameters={...E.parameters,docs:{...(Un=E.parameters)==null?void 0:Un.docs,source:{originalSource:`{
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
}`,...(Bn=(In=E.parameters)==null?void 0:In.docs)==null?void 0:Bn.source}}};var An,Pn,Hn;c.parameters={...c.parameters,docs:{...(An=c.parameters)==null?void 0:An.docs,source:{originalSource:`{
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
      }
    },
    stønadskonto80: undefined,
    dekningsgrad: Dekningsgrad.HUNDRE_PROSENT
  }
}`,...(Hn=(Pn=c.parameters)==null?void 0:Pn.docs)==null?void 0:Hn.source}}};var Mn,_n,bn;S.parameters={...S.parameters,docs:{...(Mn=S.parameters)==null?void 0:Mn.docs,source:{originalSource:`{
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
}`,...(bn=(_n=S.parameters)==null?void 0:_n.docs)==null?void 0:bn.source}}};var hn,Kn,Ln;D.parameters={...D.parameters,docs:{...(hn=D.parameters)==null?void 0:hn.docs,source:{originalSource:`{
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
}`,...(Ln=(Kn=D.parameters)==null?void 0:Kn.docs)==null?void 0:Ln.source}}};var Wn,Cn,Vn;N.parameters={...N.parameters,docs:{...(Wn=N.parameters)==null?void 0:Wn.docs,source:{originalSource:`{
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
}`,...(Vn=(Cn=N.parameters)==null?void 0:Cn.docs)==null?void 0:Vn.source}}};var Jn,Gn,qn;y.parameters={...y.parameters,docs:{...(Jn=y.parameters)==null?void 0:Jn.docs,source:{originalSource:`{
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
}`,...(qn=(Gn=y.parameters)==null?void 0:Gn.docs)==null?void 0:qn.source}}};var wn,zn,Qn;j.parameters={...j.parameters,docs:{...(wn=j.parameters)==null?void 0:wn.docs,source:{originalSource:`{
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
}`,...(Qn=(zn=j.parameters)==null?void 0:zn.docs)==null?void 0:Qn.source}}};var Xn,Yn,Zn;U.parameters={...U.parameters,docs:{...(Xn=U.parameters)==null?void 0:Xn.docs,source:{originalSource:`{
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
}`,...(Zn=(Yn=U.parameters)==null?void 0:Yn.docs)==null?void 0:Zn.source}}};var $n,ne,ee;I.parameters={...I.parameters,docs:{...($n=I.parameters)==null?void 0:$n.docs,source:{originalSource:`{
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
}`,...(ee=(ne=I.parameters)==null?void 0:ne.docs)==null?void 0:ee.source}}};var re,te,oe;B.parameters={...B.parameters,docs:{...(re=B.parameters)==null?void 0:re.docs,source:{originalSource:`{
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
}`,...(oe=(te=B.parameters)==null?void 0:te.docs)==null?void 0:oe.source}}};var ae,se,de;A.parameters={...A.parameters,docs:{...(ae=A.parameters)==null?void 0:ae.docs,source:{originalSource:`{
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
}`,...(de=(se=A.parameters)==null?void 0:se.docs)==null?void 0:de.source}}};var ke,le,Fe;P.parameters={...P.parameters,docs:{...(ke=P.parameters)==null?void 0:ke.docs,source:{originalSource:`{
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
}`,...(Fe=(le=P.parameters)==null?void 0:le.docs)==null?void 0:Fe.source}}};var ie,ge,pe;H.parameters={...H.parameters,docs:{...(ie=H.parameters)==null?void 0:ie.docs,source:{originalSource:`{
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
}`,...(pe=(ge=H.parameters)==null?void 0:ge.docs)==null?void 0:pe.source}}};const Dr=["MorAleneomsorgDekning80EttBarnFør1Okt2021","MorAleneomsorgEttBarnPrematurFødsel","MorAleneomsorgAdopsjonTrillinger","FarMedmorAleneomsorgFødtTvillinger","FarMedmorAleneomsorgFødtFireBarnFør1Okt2021","FarMedmorAleneomsorgFødtTreBarnFørWLB","FarMedmorAleneomsorgEttBarnTerminEtterWLB","FarMedmorAleneomsorgPrematurtFødtBarn","FarMedmorAleneomsorgAdopsjonFireBarn","MorDeltUttakEttBarnPrematurFødsel","MorDeltUttakEttBarnTermin","MorDeltUttakTvillingerFødt","MorDeltUttakFarSøkteMorsKvoteOgFellesperiode","FarMedmorSøkerDeltUttakEttBarnFødtFør1Okt2021","FarMedmorSøkerDeltUttakTrillingerFødtFørWLB","FarMedmorSøkerDeltUttakFireBarnTerminEtterWLB","FarMedmorSøkerDeltUttakEttBarnFødtPrematurt","FarSøkerDerMorHarTattUtFedrekvoteOgFellesperiode","FarSøkerAdopsjonToBarn","MorSøkerAdopsjonTreBarnFraUtlandetFør1Okt2021Dekningsgrad80","MorSøkerFarHarRettIEØSTerminDekningsgrad80","FarMedmorSøkerMorHarRettIEØSAdopsjon","BareMorHarRettTermin","BareMorHarRettAdopsjon","BareFarHarRettOgMorErUførTermin4Barn","BareFarHarRettOgMorErIkkeUførFødtBarn","BareFarHarRettTvillingerFødtFør1Okt2021","BareFarHarRettAdopsjonMorErUfør"];export{H as BareFarHarRettAdopsjonMorErUfør,A as BareFarHarRettOgMorErIkkeUførFødtBarn,B as BareFarHarRettOgMorErUførTermin4Barn,P as BareFarHarRettTvillingerFødtFør1Okt2021,I as BareMorHarRettAdopsjon,U as BareMorHarRettTermin,m as FarMedmorAleneomsorgAdopsjonFireBarn,p as FarMedmorAleneomsorgEttBarnTerminEtterWLB,i as FarMedmorAleneomsorgFødtFireBarnFør1Okt2021,g as FarMedmorAleneomsorgFødtTreBarnFørWLB,F as FarMedmorAleneomsorgFødtTvillinger,f as FarMedmorAleneomsorgPrematurtFødtBarn,R as FarMedmorSøkerDeltUttakEttBarnFødtFør1Okt2021,c as FarMedmorSøkerDeltUttakEttBarnFødtPrematurt,E as FarMedmorSøkerDeltUttakFireBarnTerminEtterWLB,O as FarMedmorSøkerDeltUttakTrillingerFødtFørWLB,j as FarMedmorSøkerMorHarRettIEØSAdopsjon,D as FarSøkerAdopsjonToBarn,S as FarSøkerDerMorHarTattUtFedrekvoteOgFellesperiode,l as MorAleneomsorgAdopsjonTrillinger,d as MorAleneomsorgDekning80EttBarnFør1Okt2021,k as MorAleneomsorgEttBarnPrematurFødsel,u as MorDeltUttakEttBarnPrematurFødsel,x as MorDeltUttakEttBarnTermin,v as MorDeltUttakFarSøkteMorsKvoteOgFellesperiode,T as MorDeltUttakTvillingerFødt,N as MorSøkerAdopsjonTreBarnFraUtlandetFør1Okt2021Dekningsgrad80,y as MorSøkerFarHarRettIEØSTerminDekningsgrad80,Dr as __namedExportsOrder,Sr as default};
