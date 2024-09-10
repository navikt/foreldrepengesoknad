import{j as e}from"./jsx-runtime-Cw0GR0a5.js";import{a as R,R as T,D as f,b as U,T as B,c as _,d as L,u as O,F as C,E as $,S as H}from"./ErrorSummaryHookForm-BdkGgRXP.js";import{u as k,B as h,M as n}from"./Label-DlDsESPM.js";import"./index-CTjT7uj6.js";import{c as r,d as u,e as I,M as E,N as M,O as D,R as g,P,b as K}from"./Uttaksplan-DU_NS1xW.js";import{d as p,e as q}from"./Uttaksdagen-Uuolrvsk.js";import{u as w,C as S,a as z}from"./FpDataContext-DbGuQRR8.js";import{A as o,u as G,a as X}from"./useFpNavigator-h_qiivFX.js";import{V as m,H as j,B as v,S as Q}from"./VStack-CrTlUGgl.js";import{S as W}from"./Plus-C8AnIoR5.js";const J=({index:a,inntektskilde:s})=>{const t=k();return e.jsxs(m,{gap:"10",children:[e.jsx(j,{gap:"6",children:e.jsx(R,{nameFrom:`andreInntektskilder.${a}.fom`,nameTo:`andreInntektskilder.${a}.tom`,labelFrom:t.formatMessage({id:"EtterlønnEllerSluttvederlagPanel.Fom"}),labelTo:t.formatMessage({id:"EtterlønnEllerSluttvederlagPanel.Tom"}),validateFrom:[r(t.formatMessage({id:"EtterlønnEllerSluttvederlagPanel.Validering.Required.Fom"})),u(t.formatMessage({id:"EtterlønnEllerSluttvederlagPanel.Validering.Valid.Fom"})),I(t.formatMessage({id:"EtterlønnEllerSluttvederlagPanel.FraOgMedDato.ErIFremtiden"})),E(t.formatMessage({id:"EtterlønnEllerSluttvederlagPanel.FraOgMedDato.FørTilDato"}),s.tom)],validateTo:[r(t.formatMessage({id:"EtterlønnEllerSluttvederlagPanel.Validering.Required.Tom"})),u(t.formatMessage({id:"EtterlønnEllerSluttvederlagPanel.Validering.Valid.Tom"}))]})}),e.jsx(M,{isDarkBlue:!0,children:e.jsxs(j,{gap:"2",wrap:!1,children:[e.jsx("div",{children:e.jsx(D,{fontSize:"1.5rem"})}),e.jsx(h,{children:e.jsx(n,{id:"EtterlønnEllerSluttvederlagPanel.Vedlegg"})})]})})]})};J.__docgenInfo={description:"",methods:[],displayName:"EtterlønnEllerSluttvederlagPanel"};const N=({index:a,inntektskilde:s})=>{const t=k();if(s.type!==o.MILITÆRTJENESTE)throw Error("Inntektskilde ikke av type MILITÆRTJENESTE");return e.jsxs(m,{gap:"10",children:[e.jsxs(T,{name:`andreInntektskilder.${a}.pågående`,label:e.jsx(n,{id:"FørstegangstjenestePanel.IFørstegangstjenesteNå"}),validate:[r(t.formatMessage({id:"FørstegangstjenestePanel.Validering.IFørstegangstjenesteNå"}))],children:[e.jsx(g,{value:!1,children:e.jsx(n,{id:"FørstegangstjenestePanel.RadioButton.Nei"})}),e.jsx(g,{value:!0,children:e.jsx(n,{id:"FørstegangstjenestePanel.RadioButton.Ja"})})]}),e.jsxs(j,{gap:"6",children:[e.jsx(f,{name:`andreInntektskilder.${a}.fom`,label:t.formatMessage({id:"FørstegangstjenestePanel.Fom"}),maxDate:p(),validate:[r(t.formatMessage({id:"FørstegangstjenestePanel.Validering.Required.Fom"})),u(t.formatMessage({id:"FørstegangstjenestePanel.Validering.Valid.Fom"})),I(t.formatMessage({id:"FørstegangstjenestePanel.FraOgMedDato.ErIFremtiden"})),E(t.formatMessage({id:"FørstegangstjenestePanel.FraOgMedDato.FørTilDato"}),s.pågående===!1?s.tom:p())]}),s.pågående===!1&&e.jsx(f,{name:`andreInntektskilder.${a}.tom`,label:t.formatMessage({id:"FørstegangstjenestePanel.Tom"}),maxDate:p(),validate:[r(t.formatMessage({id:"FørstegangstjenestePanel.Validering.Required.Tom"})),u(t.formatMessage({id:"FørstegangstjenestePanel.Validering.Valid.Tom"})),I(t.formatMessage({id:"FørstegangstjenestePanel.TilOgMedDato.ErIFremtiden"}))]})]}),e.jsx(M,{isDarkBlue:!0,children:e.jsxs(j,{gap:"2",wrap:!1,children:[e.jsx("div",{children:e.jsx(D,{fontSize:"1.5rem"})}),e.jsx(h,{children:e.jsx(n,{id:"FørstegangstjenestePanel.Vedlegg"})})]})})]})};N.__docgenInfo={description:"",methods:[],displayName:"FørstegangstjenestePanel"};const y=({index:a,inntektskilde:s})=>{const t=k();if(s.type!==o.JOBB_I_UTLANDET)throw Error("Inntektskilde ikke av type JOBB_I_UTLANDET");return e.jsxs(m,{gap:"10",children:[e.jsx(U,{name:`andreInntektskilder.${a}.land`,label:e.jsx(n,{id:"JobbIUtlandetPanel.LandDuHarJobbet"}),validate:[r(t.formatMessage({id:"JobbIUtlandetPanel.Validering.LandDuHarJobber"}))],children:q().map(d=>e.jsx("option",{value:d[0],children:d[1]},d[0]))}),e.jsx(B,{name:`andreInntektskilder.${a}.arbeidsgiverNavn`,label:e.jsx(n,{id:"JobbIUtlandetPanel.NavnPåArbeidsgiver"}),validate:[r(t.formatMessage({id:"JobbIUtlandetPanel.Validering.NavnPåArbeidsgiver"}))]}),e.jsxs(T,{name:`andreInntektskilder.${a}.pågående`,label:e.jsx(n,{id:"JobbIUtlandetPanel.JobberDuDerNå"}),validate:[r(t.formatMessage({id:"JobbIUtlandetPanel.Validering.JobberDuDerNå"}))],children:[e.jsx(g,{value:!1,children:e.jsx(n,{id:"JobbIUtlandetPanel.RadioButton.Nei"})}),e.jsx(g,{value:!0,children:e.jsx(n,{id:"JobbIUtlandetPanel.RadioButton.Ja"})})]}),e.jsxs(j,{gap:"6",children:[e.jsx(f,{name:`andreInntektskilder.${a}.fom`,label:t.formatMessage({id:"JobbIUtlandetPanel.Fom"}),maxDate:p(),validate:[r(t.formatMessage({id:"JobbIUtlandetPanel.Validering.Required.Fom"})),u(t.formatMessage({id:"JobbIUtlandetPanel.Validering.Valid.Fom"})),I(t.formatMessage({id:"JobbIUtlandetPanel.FraOgMedDato.ErIFremtiden"})),E(t.formatMessage({id:"JobbIUtlandetPanel.FraOgMedDato.FørTilDato"}),s.pågående===!1?s.tom:p())]}),s.pågående===!1&&e.jsx(f,{name:`andreInntektskilder.${a}.tom`,label:t.formatMessage({id:"JobbIUtlandetPanel.Tom"}),maxDate:p(),validate:[r(t.formatMessage({id:"JobbIUtlandetPanel.Validering.Required.Tom"})),u(t.formatMessage({id:"JobbIUtlandetPanel.Validering.Valid.Tom"})),I(t.formatMessage({id:"JobbIUtlandetPanel.TilOgMedDato.ErIFremtiden"}))]})]})]})};y.__docgenInfo={description:"",methods:[],displayName:"JobbIUtlandetPanel"};const A=()=>{const a=k(),{control:s,watch:t}=_(),{fields:d,append:x,remove:c}=L({control:s,name:"andreInntektskilder"}),b=t("andreInntektskilder");return e.jsxs(m,{gap:"10",children:[d.map((F,l)=>{const i=b[l];return e.jsxs(m,{gap:"10",children:[e.jsxs(T,{name:`andreInntektskilder.${l}.type`,label:e.jsx(n,{id:"AndreInntektskilderStep.HvilkenTypeAnnenInntekskilder"}),validate:[r(a.formatMessage({id:"AndreInntektskilderStep.Validering.OppgiType"}))],children:[e.jsx(g,{value:o.JOBB_I_UTLANDET,children:e.jsx(n,{id:"AndreInntektskilderStep.RadioButton.Utlandet"})}),e.jsx(g,{value:o.SLUTTPAKKE,children:e.jsx(n,{id:"AndreInntektskilderStep.RadioButton.Etterlønn"})}),e.jsx(g,{value:o.MILITÆRTJENESTE,children:e.jsx(n,{id:"AndreInntektskilderStep.RadioButton.Førstegangstjeneste"})})]}),i.type===o.JOBB_I_UTLANDET&&e.jsx(y,{index:l,inntektskilde:i}),i.type===o.SLUTTPAKKE&&e.jsx(J,{index:l,inntektskilde:i}),i.type===o.MILITÆRTJENESTE&&e.jsx(N,{index:l,inntektskilde:i}),l===0&&d.length>1&&e.jsx(P,{}),l!==0&&e.jsxs(m,{gap:"2",children:[e.jsx(j,{children:e.jsx(v,{icon:e.jsx(Q,{"aria-hidden":!0}),type:"button",variant:"tertiary",onClick:()=>c(l),children:e.jsx(n,{id:"AndreInntektskilderStep.Slett"})})}),e.jsx(P,{})]})]},F.id)}),e.jsx(j,{children:e.jsx(v,{icon:e.jsx(W,{"aria-hidden":!0}),type:"button",variant:"secondary",onClick:()=>x({}),size:"small",children:e.jsx(n,{id:"AndreInntektskilderStep.LeggTil"})})})]})};A.__docgenInfo={description:"",methods:[],displayName:"AndreInntektskilderFieldArray"};const Y=({arbeidsforhold:a,mellomlagreSøknadOgNaviger:s,avbrytSøknad:t})=>{const d=k(),x=G(a),c=X(a,s),b=w(S.ANDRE_INNTEKTSKILDER),F=z(S.ANDRE_INNTEKTSKILDER),l=O({defaultValues:{andreInntektskilder:b||[{}]},shouldUnregister:!0}),i=V=>(F(V.andreInntektskilder),c.goToNextDefaultStep());return e.jsx(K,{bannerTitle:d.formatMessage({id:"søknad.pageheading"}),onCancel:t,onContinueLater:c.fortsettSøknadSenere,steps:x,children:e.jsx(C,{formMethods:l,onSubmit:i,children:e.jsxs(m,{gap:"10",children:[e.jsx($,{}),e.jsx(A,{}),e.jsx(H,{goToPreviousStep:c.goToPreviousDefaultStep})]})})})};Y.__docgenInfo={description:"",methods:[],displayName:"AndreInntektskilderSteg"};export{Y as A};
