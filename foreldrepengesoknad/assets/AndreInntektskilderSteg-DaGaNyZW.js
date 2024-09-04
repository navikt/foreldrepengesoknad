import{j as e,d as u,e as V}from"./Uttaksdagen-CVi1UdfS.js";import{a as B,R as E,D as f,b as _,T as L,c as O,d as C,u as K,F as $,E as H,S as q}from"./ErrorSummaryHookForm-BSEElhq_.js";import{u as k,B as D,M as n}from"./Label-D9yH3wXA.js";import"./index-BP8_t0zE.js";import{V as g,H as j,c as r,d as I,e as c,N as S,O as J,P as N,R as m,Q as v,b as w}from"./Uttaksplan-C-q_5N0-.js";import{u as z,C as M,a as G}from"./FpDataContext-Bw3l41n2.js";import{A as d,u as Q,a as X,S as W}from"./useFpNavigator-BE1soRC3.js";import{B as h,S as Y}from"./Modal-Bf7Xci8e.js";import{S as Z}from"./Plus-B3Jq1k4K.js";const y=({index:a,inntektskilde:s})=>{const t=k();return e.jsxs(g,{gap:"10",children:[e.jsx(j,{gap:"6",children:e.jsx(B,{nameFrom:`andreInntektskilder.${a}.fom`,nameTo:`andreInntektskilder.${a}.tom`,labelFrom:t.formatMessage({id:"EtterlønnEllerSluttvederlagPanel.Fom"}),labelTo:t.formatMessage({id:"EtterlønnEllerSluttvederlagPanel.Tom"}),validateFrom:[r(t.formatMessage({id:"EtterlønnEllerSluttvederlagPanel.Validering.Required.Fom"})),I(t.formatMessage({id:"EtterlønnEllerSluttvederlagPanel.Validering.Valid.Fom"})),c(t.formatMessage({id:"EtterlønnEllerSluttvederlagPanel.FraOgMedDato.ErIFremtiden"})),S(t.formatMessage({id:"EtterlønnEllerSluttvederlagPanel.FraOgMedDato.FørTilDato"}),s.tom)],validateTo:[r(t.formatMessage({id:"EtterlønnEllerSluttvederlagPanel.Validering.Required.Tom"})),I(t.formatMessage({id:"EtterlønnEllerSluttvederlagPanel.Validering.Valid.Tom"}))]})}),e.jsx(J,{isDarkBlue:!0,children:e.jsxs(j,{gap:"2",wrap:!1,children:[e.jsx("div",{children:e.jsx(N,{fontSize:"1.5rem"})}),e.jsx(D,{children:e.jsx(n,{id:"EtterlønnEllerSluttvederlagPanel.Vedlegg"})})]})})]})};y.__docgenInfo={description:"",methods:[],displayName:"EtterlønnEllerSluttvederlagPanel"};const A=({index:a,inntektskilde:s})=>{const t=k();if(s.type!==d.MILITÆRTJENESTE)throw Error("Inntektskilde ikke av type MILITÆRTJENESTE");return e.jsxs(g,{gap:"10",children:[e.jsxs(E,{name:`andreInntektskilder.${a}.pågående`,label:e.jsx(n,{id:"FørstegangstjenestePanel.IFørstegangstjenesteNå"}),validate:[r(t.formatMessage({id:"FørstegangstjenestePanel.Validering.IFørstegangstjenesteNå"}))],children:[e.jsx(m,{value:!1,children:e.jsx(n,{id:"FørstegangstjenestePanel.RadioButton.Nei"})}),e.jsx(m,{value:!0,children:e.jsx(n,{id:"FørstegangstjenestePanel.RadioButton.Ja"})})]}),e.jsxs(j,{gap:"6",children:[e.jsx(f,{name:`andreInntektskilder.${a}.fom`,label:t.formatMessage({id:"FørstegangstjenestePanel.Fom"}),maxDate:u(),validate:[r(t.formatMessage({id:"FørstegangstjenestePanel.Validering.Required.Fom"})),I(t.formatMessage({id:"FørstegangstjenestePanel.Validering.Valid.Fom"})),c(t.formatMessage({id:"FørstegangstjenestePanel.FraOgMedDato.ErIFremtiden"})),S(t.formatMessage({id:"FørstegangstjenestePanel.FraOgMedDato.FørTilDato"}),s.pågående===!1?s.tom:u())]}),s.pågående===!1&&e.jsx(f,{name:`andreInntektskilder.${a}.tom`,label:t.formatMessage({id:"FørstegangstjenestePanel.Tom"}),maxDate:u(),validate:[r(t.formatMessage({id:"FørstegangstjenestePanel.Validering.Required.Tom"})),I(t.formatMessage({id:"FørstegangstjenestePanel.Validering.Valid.Tom"})),c(t.formatMessage({id:"FørstegangstjenestePanel.TilOgMedDato.ErIFremtiden"}))]})]}),e.jsx(J,{isDarkBlue:!0,children:e.jsxs(j,{gap:"2",wrap:!1,children:[e.jsx("div",{children:e.jsx(N,{fontSize:"1.5rem"})}),e.jsx(D,{children:e.jsx(n,{id:"FørstegangstjenestePanel.Vedlegg"})})]})})]})};A.__docgenInfo={description:"",methods:[],displayName:"FørstegangstjenestePanel"};const R=({index:a,inntektskilde:s})=>{const t=k();if(s.type!==d.JOBB_I_UTLANDET)throw Error("Inntektskilde ikke av type JOBB_I_UTLANDET");return e.jsxs(g,{gap:"10",children:[e.jsx(_,{name:`andreInntektskilder.${a}.land`,label:e.jsx(n,{id:"JobbIUtlandetPanel.LandDuHarJobbet"}),validate:[r(t.formatMessage({id:"JobbIUtlandetPanel.Validering.LandDuHarJobber"}))],children:V().map(i=>e.jsx("option",{value:i[0],children:i[1]},i[0]))}),e.jsx(L,{name:`andreInntektskilder.${a}.arbeidsgiverNavn`,label:e.jsx(n,{id:"JobbIUtlandetPanel.NavnPåArbeidsgiver"}),validate:[r(t.formatMessage({id:"JobbIUtlandetPanel.Validering.NavnPåArbeidsgiver"}))]}),e.jsxs(E,{name:`andreInntektskilder.${a}.pågående`,label:e.jsx(n,{id:"JobbIUtlandetPanel.JobberDuDerNå"}),validate:[r(t.formatMessage({id:"JobbIUtlandetPanel.Validering.JobberDuDerNå"}))],children:[e.jsx(m,{value:!1,children:e.jsx(n,{id:"JobbIUtlandetPanel.RadioButton.Nei"})}),e.jsx(m,{value:!0,children:e.jsx(n,{id:"JobbIUtlandetPanel.RadioButton.Ja"})})]}),e.jsxs(j,{gap:"6",children:[e.jsx(f,{name:`andreInntektskilder.${a}.fom`,label:t.formatMessage({id:"JobbIUtlandetPanel.Fom"}),maxDate:u(),validate:[r(t.formatMessage({id:"JobbIUtlandetPanel.Validering.Required.Fom"})),I(t.formatMessage({id:"JobbIUtlandetPanel.Validering.Valid.Fom"})),c(t.formatMessage({id:"JobbIUtlandetPanel.FraOgMedDato.ErIFremtiden"})),S(t.formatMessage({id:"JobbIUtlandetPanel.FraOgMedDato.FørTilDato"}),s.pågående===!1?s.tom:u())]}),s.pågående===!1&&e.jsx(f,{name:`andreInntektskilder.${a}.tom`,label:t.formatMessage({id:"JobbIUtlandetPanel.Tom"}),maxDate:u(),validate:[r(t.formatMessage({id:"JobbIUtlandetPanel.Validering.Required.Tom"})),I(t.formatMessage({id:"JobbIUtlandetPanel.Validering.Valid.Tom"})),c(t.formatMessage({id:"JobbIUtlandetPanel.TilOgMedDato.ErIFremtiden"}))]})]})]})};R.__docgenInfo={description:"",methods:[],displayName:"JobbIUtlandetPanel"};const U=()=>{const a=k(),{control:s,watch:t}=O(),{fields:i,append:x,remove:p}=C({control:s,name:"andreInntektskilder"}),b=t("andreInntektskilder");return e.jsxs(g,{gap:"10",children:[i.map((T,l)=>{const o=b[l];return e.jsxs(g,{gap:"10",children:[e.jsxs(E,{name:`andreInntektskilder.${l}.type`,label:e.jsx(n,{id:"AndreInntektskilderStep.HvilkenTypeAnnenInntekskilder"}),validate:[r(a.formatMessage({id:"AndreInntektskilderStep.Validering.OppgiType"}))],children:[e.jsx(m,{value:d.JOBB_I_UTLANDET,children:e.jsx(n,{id:"AndreInntektskilderStep.RadioButton.Utlandet"})}),e.jsx(m,{value:d.SLUTTPAKKE,children:e.jsx(n,{id:"AndreInntektskilderStep.RadioButton.Etterlønn"})}),e.jsx(m,{value:d.MILITÆRTJENESTE,children:e.jsx(n,{id:"AndreInntektskilderStep.RadioButton.Førstegangstjeneste"})})]}),o.type===d.JOBB_I_UTLANDET&&e.jsx(R,{index:l,inntektskilde:o}),o.type===d.SLUTTPAKKE&&e.jsx(y,{index:l,inntektskilde:o}),o.type===d.MILITÆRTJENESTE&&e.jsx(A,{index:l,inntektskilde:o}),l===0&&i.length>1&&e.jsx(v,{}),l!==0&&e.jsxs(g,{gap:"2",children:[e.jsx(j,{children:e.jsx(h,{icon:e.jsx(Y,{"aria-hidden":!0}),type:"button",variant:"tertiary",onClick:()=>p(l),children:e.jsx(n,{id:"AndreInntektskilderStep.Slett"})})}),e.jsx(v,{})]})]},T.id)}),e.jsx(j,{children:e.jsx(h,{icon:e.jsx(Z,{"aria-hidden":!0}),type:"button",variant:"secondary",onClick:()=>x({}),size:"small",children:e.jsx(n,{id:"AndreInntektskilderStep.LeggTil"})})})]})};U.__docgenInfo={description:"",methods:[],displayName:"AndreInntektskilderFieldArray"};const ee=({arbeidsforhold:a,mellomlagreSøknadOgNaviger:s,avbrytSøknad:t})=>{const i=k(),x=Q(a),p=X(a,s),b=z(M.ANDRE_INNTEKTSKILDER),T=G(M.ANDRE_INNTEKTSKILDER),l=K({defaultValues:{andreInntektskilder:b||[{}]},shouldUnregister:!0}),o=F=>(T(F.andreInntektskilder),F.andreInntektskilder.some(P=>P.type===d.MILITÆRTJENESTE||P.type===d.SLUTTPAKKE)?p.goToNextStep(W.DOKUMENTASJON):p.goToNextDefaultStep());return e.jsx(w,{bannerTitle:i.formatMessage({id:"søknad.pageheading"}),onCancel:t,onContinueLater:p.fortsettSøknadSenere,steps:x,children:e.jsx($,{formMethods:l,onSubmit:o,children:e.jsxs(g,{gap:"10",children:[e.jsx(H,{}),e.jsx(U,{}),e.jsx(q,{goToPreviousStep:p.goToPreviousDefaultStep})]})})})};ee.__docgenInfo={description:"",methods:[],displayName:"AndreInntektskilderSteg"};export{ee as A};
