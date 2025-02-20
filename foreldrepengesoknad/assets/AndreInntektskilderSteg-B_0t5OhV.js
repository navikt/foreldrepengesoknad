import{j as e}from"./jsx-runtime-CLpGMVip.js";import{u as A,C as h,a as V}from"./FpDataContext-DWIUkGg8.js";import{A as o,u as B,a as q}from"./useFpNavigator-k7_YTMy2.js";import{g as _,b as T,a as b,d as L,c as O,h as w,i as C,u as $,R as K,E as H,S as z}from"./ErrorSummaryHookForm-CXgubBrz.js";import{u as c,a as P,M as a}from"./Link-gP2v3_my.js";import"./index-DI2V0i71.js";import{i as s,c as k,d as j,u as S,J as M,K as y,R as g,o as G,M as E,b as X}from"./Uttaksplan-DwgX_qWV.js";import{d as p}from"./dates-Bq8T6S-m.js";import{V as m,H as u,B as F,S as Q}from"./VStack-BuWRMdWF.js";import{S as W}from"./Plus-D6I6ClOl.js";const J=({index:n,inntektskilde:r})=>{const t=c();return e.jsxs(m,{gap:"10",children:[e.jsx(u,{gap:"6",children:e.jsx(_,{nameFrom:`andreInntektskilder.${n}.fom`,nameTo:`andreInntektskilder.${n}.tom`,labelFrom:t.formatMessage({id:"EtterlønnEllerSluttvederlagPanel.Fom"}),labelTo:t.formatMessage({id:"EtterlønnEllerSluttvederlagPanel.Tom"}),validateFrom:[s(t.formatMessage({id:"EtterlønnEllerSluttvederlagPanel.Validering.Required.Fom"})),k(t.formatMessage({id:"EtterlønnEllerSluttvederlagPanel.Validering.Valid.Fom"})),j(t.formatMessage({id:"EtterlønnEllerSluttvederlagPanel.FraOgMedDato.ErIFremtiden"})),S(t.formatMessage({id:"EtterlønnEllerSluttvederlagPanel.FraOgMedDato.FørTilDato"}),r.tom)],validateTo:[s(t.formatMessage({id:"EtterlønnEllerSluttvederlagPanel.Validering.Required.Tom"})),k(t.formatMessage({id:"EtterlønnEllerSluttvederlagPanel.Validering.Valid.Tom"}))]})}),e.jsx(M,{isDarkBlue:!0,children:e.jsxs(u,{gap:"2",wrap:!1,children:[e.jsx("div",{children:e.jsx(y,{fontSize:"1.5rem"})}),e.jsx(P,{children:e.jsx(a,{id:"EtterlønnEllerSluttvederlagPanel.Vedlegg"})})]})})]})};J.__docgenInfo={description:"",methods:[],displayName:"EtterlønnEllerSluttvederlagPanel",props:{index:{required:!0,tsType:{name:"number"},description:""},inntektskilde:{required:!0,tsType:{name:"union",raw:"SluttpakkeInntekt | MilitærtjenesteInntekt | JobbIUtlandetInntekt",elements:[{name:"SluttpakkeInntekt"},{name:"MilitærtjenesteInntekt"},{name:"JobbIUtlandetInntekt"}]},description:""}}};const D=({index:n,inntektskilde:r})=>{const t=c();if(r.type!==o.MILITÆRTJENESTE)throw Error("Inntektskilde ikke av type MILITÆRTJENESTE");return e.jsxs(m,{gap:"10",children:[e.jsxs(T,{name:`andreInntektskilder.${n}.pågående`,label:e.jsx(a,{id:"FørstegangstjenestePanel.IFørstegangstjenesteNå"}),validate:[s(t.formatMessage({id:"FørstegangstjenestePanel.Validering.IFørstegangstjenesteNå"}))],children:[e.jsx(g,{value:!1,children:e.jsx(a,{id:"FørstegangstjenestePanel.RadioButton.Nei"})}),e.jsx(g,{value:!0,children:e.jsx(a,{id:"FørstegangstjenestePanel.RadioButton.Ja"})})]}),e.jsxs(u,{gap:"6",children:[e.jsx(b,{name:`andreInntektskilder.${n}.fom`,label:t.formatMessage({id:"FørstegangstjenestePanel.Fom"}),maxDate:p(),validate:[s(t.formatMessage({id:"FørstegangstjenestePanel.Validering.Required.Fom"})),k(t.formatMessage({id:"FørstegangstjenestePanel.Validering.Valid.Fom"})),j(t.formatMessage({id:"FørstegangstjenestePanel.FraOgMedDato.ErIFremtiden"})),S(t.formatMessage({id:"FørstegangstjenestePanel.FraOgMedDato.FørTilDato"}),r.pågående===!1?r.tom:p())]}),r.pågående===!1&&e.jsx(b,{name:`andreInntektskilder.${n}.tom`,label:t.formatMessage({id:"FørstegangstjenestePanel.Tom"}),maxDate:p(),validate:[s(t.formatMessage({id:"FørstegangstjenestePanel.Validering.Required.Tom"})),k(t.formatMessage({id:"FørstegangstjenestePanel.Validering.Valid.Tom"})),j(t.formatMessage({id:"FørstegangstjenestePanel.TilOgMedDato.ErIFremtiden"}))]})]}),e.jsx(M,{isDarkBlue:!0,children:e.jsxs(u,{gap:"2",wrap:!1,children:[e.jsx("div",{children:e.jsx(y,{fontSize:"1.5rem"})}),e.jsx(P,{children:e.jsx(a,{id:"FørstegangstjenestePanel.Vedlegg"})})]})})]})};D.__docgenInfo={description:"",methods:[],displayName:"FørstegangstjenestePanel",props:{index:{required:!0,tsType:{name:"number"},description:""},inntektskilde:{required:!0,tsType:{name:"union",raw:"SluttpakkeInntekt | MilitærtjenesteInntekt | JobbIUtlandetInntekt",elements:[{name:"SluttpakkeInntekt"},{name:"MilitærtjenesteInntekt"},{name:"JobbIUtlandetInntekt"}]},description:""}}};const R=({index:n,inntektskilde:r})=>{const t=c();if(r.type!==o.JOBB_I_UTLANDET)throw Error("Inntektskilde ikke av type JOBB_I_UTLANDET");return e.jsxs(m,{gap:"10",children:[e.jsx(L,{name:`andreInntektskilder.${n}.land`,label:e.jsx(a,{id:"JobbIUtlandetPanel.LandDuHarJobbet"}),validate:[s(t.formatMessage({id:"JobbIUtlandetPanel.Validering.LandDuHarJobber"}))],children:G().map(l=>e.jsx("option",{value:l[0],children:l[1]},l[0]))}),e.jsx(O,{name:`andreInntektskilder.${n}.arbeidsgiverNavn`,label:e.jsx(a,{id:"JobbIUtlandetPanel.NavnPåArbeidsgiver"}),validate:[s(t.formatMessage({id:"JobbIUtlandetPanel.Validering.NavnPåArbeidsgiver"}))]}),e.jsxs(T,{name:`andreInntektskilder.${n}.pågående`,label:e.jsx(a,{id:"JobbIUtlandetPanel.JobberDuDerNå"}),validate:[s(t.formatMessage({id:"JobbIUtlandetPanel.Validering.JobberDuDerNå"}))],children:[e.jsx(g,{value:!1,children:e.jsx(a,{id:"JobbIUtlandetPanel.RadioButton.Nei"})}),e.jsx(g,{value:!0,children:e.jsx(a,{id:"JobbIUtlandetPanel.RadioButton.Ja"})})]}),e.jsxs(u,{gap:"6",children:[e.jsx(b,{name:`andreInntektskilder.${n}.fom`,label:t.formatMessage({id:"JobbIUtlandetPanel.Fom"}),maxDate:p(),validate:[s(t.formatMessage({id:"JobbIUtlandetPanel.Validering.Required.Fom"})),k(t.formatMessage({id:"JobbIUtlandetPanel.Validering.Valid.Fom"})),j(t.formatMessage({id:"JobbIUtlandetPanel.FraOgMedDato.ErIFremtiden"})),S(t.formatMessage({id:"JobbIUtlandetPanel.FraOgMedDato.FørTilDato"}),r.pågående===!1?r.tom:p())]}),r.pågående===!1&&e.jsx(b,{name:`andreInntektskilder.${n}.tom`,label:t.formatMessage({id:"JobbIUtlandetPanel.Tom"}),maxDate:p(),validate:[s(t.formatMessage({id:"JobbIUtlandetPanel.Validering.Required.Tom"})),k(t.formatMessage({id:"JobbIUtlandetPanel.Validering.Valid.Tom"})),j(t.formatMessage({id:"JobbIUtlandetPanel.TilOgMedDato.ErIFremtiden"}))]})]})]})};R.__docgenInfo={description:"",methods:[],displayName:"JobbIUtlandetPanel",props:{index:{required:!0,tsType:{name:"number"},description:""},inntektskilde:{required:!0,tsType:{name:"union",raw:"SluttpakkeInntekt | MilitærtjenesteInntekt | JobbIUtlandetInntekt",elements:[{name:"SluttpakkeInntekt"},{name:"MilitærtjenesteInntekt"},{name:"JobbIUtlandetInntekt"}]},description:""}}};const N=()=>{const n=c(),{control:r,watch:t}=w(),{fields:l,append:f,remove:I}=C({control:r,name:"andreInntektskilder"}),v=t("andreInntektskilder");return e.jsxs(m,{gap:"10",children:[l.map((x,i)=>{const d=v[i];return e.jsxs(m,{gap:"10",children:[e.jsxs(T,{name:`andreInntektskilder.${i}.type`,label:e.jsx(a,{id:"AndreInntektskilderStep.HvilkenTypeAnnenInntekskilder"}),validate:[s(n.formatMessage({id:"AndreInntektskilderStep.Validering.OppgiType"}))],children:[e.jsx(g,{value:o.JOBB_I_UTLANDET,children:e.jsx(a,{id:"AndreInntektskilderStep.RadioButton.Utlandet"})}),e.jsx(g,{value:o.SLUTTPAKKE,children:e.jsx(a,{id:"AndreInntektskilderStep.RadioButton.Etterlønn"})}),e.jsx(g,{value:o.MILITÆRTJENESTE,children:e.jsx(a,{id:"AndreInntektskilderStep.RadioButton.Førstegangstjeneste"})})]}),d.type===o.JOBB_I_UTLANDET&&e.jsx(R,{index:i,inntektskilde:d}),d.type===o.SLUTTPAKKE&&e.jsx(J,{index:i,inntektskilde:d}),d.type===o.MILITÆRTJENESTE&&e.jsx(D,{index:i,inntektskilde:d}),i===0&&l.length>1&&e.jsx(E,{}),i!==0&&e.jsxs(m,{gap:"2",children:[e.jsx(u,{children:e.jsx(F,{icon:e.jsx(Q,{"aria-hidden":!0}),type:"button",variant:"tertiary",onClick:()=>I(i),children:e.jsx(a,{id:"AndreInntektskilderStep.Slett"})})}),e.jsx(E,{})]})]},x.id)}),e.jsx(u,{children:e.jsx(F,{icon:e.jsx(W,{"aria-hidden":!0}),type:"button",variant:"secondary",onClick:()=>f({}),size:"small",children:e.jsx(a,{id:"AndreInntektskilderStep.LeggTil"})})})]})};N.__docgenInfo={description:"",methods:[],displayName:"AndreInntektskilderFieldArray"};const Y=({arbeidsforhold:n,mellomlagreSøknadOgNaviger:r,avbrytSøknad:t})=>{const l=c(),f=B(n),I=q(n,r),v=A(h.ANDRE_INNTEKTSKILDER),x=V(h.ANDRE_INNTEKTSKILDER),i=$({defaultValues:{andreInntektskilder:v||[{}]},shouldUnregister:!0}),d=U=>(x(U.andreInntektskilder),I.goToNextDefaultStep());return e.jsx(X,{bannerTitle:l.formatMessage({id:"søknad.pageheading"}),onCancel:t,onContinueLater:I.fortsettSøknadSenere,steps:f,children:e.jsx(K,{formMethods:i,onSubmit:d,children:e.jsxs(m,{gap:"10",children:[e.jsx(H,{}),e.jsx(N,{}),e.jsx(z,{goToPreviousStep:I.goToPreviousDefaultStep})]})})})};Y.__docgenInfo={description:"",methods:[],displayName:"AndreInntektskilderSteg",props:{mellomlagreSøknadOgNaviger:{required:!0,tsType:{name:"signature",type:"function",raw:"() => Promise<void>",signature:{arguments:[],return:{name:"Promise",elements:[{name:"void"}],raw:"Promise<void>"}}},description:""},avbrytSøknad:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},arbeidsforhold:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    arbeidsgiverNavn: string;
    arbeidsgiverId: string;
    arbeidsgiverIdType: string;
    fom: string;
    tom?: string;
    stillingsprosent: number;
}`,signature:{properties:[{key:"arbeidsgiverNavn",value:{name:"string",required:!0}},{key:"arbeidsgiverId",value:{name:"string",required:!0}},{key:"arbeidsgiverIdType",value:{name:"string",required:!0}},{key:"fom",value:{name:"string",required:!0}},{key:"tom",value:{name:"string",required:!1}},{key:"stillingsprosent",value:{name:"number",required:!0}}]}}],raw:"Arbeidsforhold[]"},description:""}}};export{Y as A};
