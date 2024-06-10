import{j as e}from"./jsx-runtime-_e34SzbC.js";import{i as x,d as v,e as Q,f as X,g as Z,h as H,j as $,k as ee,u as se,a as te,b as P,C as E,n as ae,c as re}from"./usePlanleggerNavigator-Cc6QDZDj.js";import{P as G}from"./routes-Cp-2uEwO.js";import{I as F}from"./Infobox-4DkbJ68c.js";import{P as de}from"./PlanleggerStepPage-CG-Vt2ZG.js";import{d as n}from"./dayjs.min-Dkhc0ShP.js";import{a as T,D as I,f as B,R as j,u as oe,F as ne,S as ie}from"./StepButtonsHookForm-D9EJb97s.js";import{u as D,M as s}from"./index-Bomzi5Jd.js";import{S as g,f as R,b as y,e as b,j as S,k as q,h as le}from"./HvemPlanleggerUtils-CHTffTZd.js";import{e as me}from"./barnetUtils-Dtg6gkcN.js";import{L as ue,l as ce}from"./links-B0sJFGJm.js";import{a as A}from"./dateUtils--_TJ2jyJ.js";import"./index-DVXBtNgz.js";import"./infobox.module-COlA9bH3.js";import"./amplitude.esm-BThBy0fb.js";import{u as fe}from"./useScrollBehaviour-WVMBWXos.js";import{G as _}from"./GreenRadioGroup-dZQly406.js";import{G as V}from"./GreenPanel-h__UB972.js";import{V as h}from"./VStack-DzX3uTsq.js";import{S as k}from"./TasklistStart-06HzpnvP.js";import{a as N,B as m,H as xe}from"./Label-DFEFJLqZ.js";import{S as je}from"./Spacer-CmfZYR-2.js";import{S as Fe}from"./PersonGroup-DiEFwi66.js";const z=({erAlenesøker:t,erOmBarnetIkkeOppgittFraFør:i,antallBarn:u,hvemPlanlegger:d})=>{const a=D(),o=u==="3"||u==="2",c=T(),r=c.watch("fødselsdato"),l=c.watch("overtakelsesdato"),f=d.type===g.MOR_OG_FAR||d.type===g.MOR_OG_MEDMOR;return e.jsxs(e.Fragment,{children:[e.jsx(V,{isDarkGreen:i,shouldFadeIn:!0,children:e.jsxs(h,{gap:"8",children:[e.jsx(I,{label:e.jsx(s,{id:"Adopsjon.Overtakelsesdato",values:{erAlenesøker:t,flereBarn:o}}),name:"overtakelsesdato",minDate:n().subtract(6,"month").toDate(),validate:[x(a.formatMessage({id:"Overtakelsesdato.Required"},{erAlenesøker:t,flereBarn:o})),v(a.formatMessage({id:"ValidationMessage.ValidDate"})),Q(a.formatMessage({id:"ValidationMessage.OlderThan6months"})),X(a.formatMessage({id:"ValidationMessage.FødselsdatoMåVæreFørOmsorgovertakelse"}),r),Z(a.formatMessage({id:"ValidationMessage.OmsorgsovertakelseKanIkkeVæreLengerEnn15ÅrEtterFødsel"}),r&&n(r).add(15,"years"))]}),e.jsx(I,{label:e.jsx(s,{id:"Adopsjon.Fødselsdato",values:{flereBarn:o}}),name:"fødselsdato",minDate:n().subtract(15,"years").toDate(),maxDate:n().toDate(),validate:[x(a.formatMessage({id:"Fødselsdato.Required"})),v(a.formatMessage({id:"ValidationMessage.ValidDate"})),H(a.formatMessage({id:"ValidationMessage.IdagEllerTidligere"}))]})]})}),l&&e.jsxs(F,{header:e.jsx(s,{id:"OmBarnetSteg.Adopsjon.ForeldrepengerInfo",values:{erAlenesøker:t}}),icon:e.jsx(k,{height:24,width:24,color:"#236B7D",fontSize:"1.5rem","aria-hidden":!0}),shouldFadeIn:!0,children:[e.jsx(N,{children:e.jsx(s,{id:"OmBarnetSteg.Adopsjon.ForeldrepengerInfoTekst"})}),e.jsx(N,{children:e.jsx(s,{id:"OmBarnetSteg.Adopsjon.ForeldrepengerInfoTekstDel2Deg",values:{erAlenesøker:t,erFarEllerMedmor:f,hvem:R(a,d)}})})]})]})};z.__docgenInfo={description:"",methods:[],displayName:"Adopsjon"};const L=({hvemPlanlegger:t,erOmBarnetIkkeOppgittFraFør:i,antallBarn:u,scrollToBottom:d})=>{const a=D(),c=T().watch("fødselsdato"),r=y(t),l=t.type!==g.MOR;return e.jsxs(h,{gap:"5",children:[e.jsx(V,{isDarkGreen:i,shouldFadeIn:!0,children:e.jsxs(h,{gap:"8",children:[e.jsx(I,{label:e.jsx(s,{id:"ErFødtPanel.Fødselsdato",values:{antallBarn:u}}),name:"fødselsdato",maxDate:n().toDate(),useStrategyAbsolute:!0,validate:[x(a.formatMessage({id:"Fødselsdato.Required"})),v(a.formatMessage({id:"ValidationMessage.ValidDate"})),H(a.formatMessage({id:"ValidationMessage.InFuture"}))],customErrorFormatter:B,onChange:d}),e.jsx(I,{label:e.jsx(s,{id:"ErFødtPanel.NårVarTermin"}),name:"termindato",maxDate:n().add(18,"weeks").add(3,"days").toDate(),validate:[x(a.formatMessage({id:"Termindato.Required"})),v(a.formatMessage({id:"ValidationMessage.ValidDate"})),$(a.formatMessage({id:"ValidationMessage.DuMåVæreIUke22"}))],customErrorFormatter:B,useStrategyAbsolute:!0,onChange:d})]})}),c!==void 0&&n(c).isAfter(A)&&e.jsxs(F,{header:e.jsx(s,{id:"ErFødtPanel.Født.InfoboksTittel",values:{erAlenesøker:r}}),icon:e.jsx(k,{height:24,width:24,color:"#236B7D",fontSize:"1.5rem","aria-hidden":!0}),shouldFadeIn:!0,children:[e.jsx(m,{children:e.jsx(s,{id:"ErFødtPanel.Født.Infoboks.ManKanSøkeTilbakeITid"})}),e.jsx(m,{children:e.jsx(s,{id:"ErFødtPanel.Født.InfoboksTekst.NAVanbefaler",values:{erMorDelAvSøknaden:b(t)}})}),S(t)&&e.jsx(m,{children:e.jsx(s,{id:"ErFødtPanel.Født.InfoboksTekst.toFørsteUkerDekket",values:{erFar:l,hvem:R(a,t)}})})]}),c!==void 0&&n(c).isBefore(A)&&e.jsxs(F,{header:e.jsx(s,{id:"ErFødtPanel.Født.InfoboksTittel.EldreEnnTreÅr",values:{erAlenesøker:r,antallBarn:u}}),icon:e.jsx(k,{height:24,width:24,color:"#236B7D",fontSize:"1.5rem"}),shouldFadeIn:!0,children:[e.jsx(m,{children:e.jsx(s,{id:"ErFødtPanel.Født.InfoboksTekst.EldreEnnTreÅr",values:{antallBarn:u}})}),e.jsx(m,{children:e.jsx(s,{id:"ErFødtPanel.Født.Infoboks.ManKanSøkeTilbakeITid",values:{erFar:l}})})]})]})};L.__docgenInfo={description:"",methods:[],displayName:"ErFødtPanel"};const w=n().startOf("days").add(3,"months"),C=n().startOf("days").toDate(),U=(t,i)=>{if(i.type===g.MOR_OG_MEDMOR)return t.formatMessage({id:"OversiktSteg.Medmor"});if(S(i))return t.formatMessage({id:"OversiktSteg.Far"})},K=({hvemPlanlegger:t,erOmBarnetIkkeOppgittFraFør:i,scrollToBottom:u})=>{const d=D(),o=T().watch("termindato"),c=o!==void 0?n(o).subtract(18,"weeks").toDate():void 0,r=y(t),l=S(t),f=q(t);return e.jsxs(h,{gap:"5",children:[e.jsx(V,{isDarkGreen:i,shouldFadeIn:!0,children:e.jsx(I,{label:e.jsx(s,{id:"ErIkkeFødtPanel.Termin"}),name:"termindato",minDate:n().subtract(3,"week").toDate(),maxDate:n().add(1,"year").toDate(),useStrategyAbsolute:!0,validate:[x(d.formatMessage({id:"Termindato.Required"})),v(d.formatMessage({id:"ValidationMessage.ValidDate"})),ee(d.formatMessage({id:"ValidationMessage.KanIkkeVære3UkerFraIdag"}))],customErrorFormatter:B,onChange:u})}),o!==void 0&&n(o).isBefore(C)&&e.jsxs(F,{header:e.jsx(s,{id:"ErFødtPanel.Født.InfoboksTittel",values:{erAlenesøker:r}}),icon:e.jsx(k,{height:24,width:24,color:"#236B7D",fontSize:"1.5rem","aria-hidden":!0}),shouldFadeIn:!0,children:[e.jsx(m,{children:e.jsx(s,{id:"ErFødtPanel.Født.Infoboks.ManKanSøkeTilbakeITid"})}),e.jsx(m,{children:e.jsx(s,{id:"ErFødtPanel.Født.InfoboksTekst.NAVanbefaler",values:{erMorDelAvSøknaden:b(t)}})}),S(t)&&e.jsx(m,{children:e.jsx(s,{id:"ErFødtPanel.Født.InfoboksTekst.toFørsteUkerDekket",values:{erFar:l,hvem:R(d,t)}})})]}),o!==void 0&&n(o).isAfter(w)&&e.jsx(e.Fragment,{children:e.jsxs(F,{header:e.jsx(s,{id:"ErIkkeFødtPanel.ForeldrepengerInfo",values:{erAlenesøker:r,dato:n(c).format("DD.MM.YY")}}),icon:e.jsx(k,{height:24,width:24,color:"#236B7D",fontSize:"1.5rem","aria-hidden":!0}),shouldFadeIn:!0,children:[e.jsx(m,{children:e.jsx(s,{id:"ErIkkeFødtPanel.ForeldrepengerInfoTekst.kanSøke",values:{erAlenesøker:r}})}),e.jsx(m,{children:e.jsx(s,{id:"ErIkkeFødtPanel.ForeldrepengerInfoTekst.NAVanbefaler",values:{erMorDelAvSøknaden:b(t)}})}),S(t)&&!f&&e.jsx(m,{children:e.jsx(s,{id:"ErIkkeFødtPanel.ForeldrepengerInfoTekst.toFørsteUkerDekket",values:{erFar:l,hvem:U(d,t)}})})]})}),o!==void 0&&n(o).isSameOrAfter(C)&&n(o).isSameOrBefore(w)&&e.jsx(e.Fragment,{children:e.jsx(F,{header:e.jsx(s,{id:"ErIkkeFødtPanel.UnderTreMndTilTerminInfo",values:{erAlenesøker:r}}),icon:e.jsx(k,{height:24,width:24,color:"#236B7D",fontSize:"1.5rem","aria-hidden":!0}),shouldFadeIn:!0,children:!f&&e.jsxs(e.Fragment,{children:[e.jsx(m,{children:t.type===g.MOR&&e.jsx(s,{id:"ErIkkeFødtPanel.UnderTreMndTilTermin",values:{erAlenesøker:r}})}),!r&&e.jsx(m,{children:e.jsx(s,{id:"ErIkkeFødtPanel.UnderTreMndTilTermin",values:{erAlenesøker:r,navn:le(t,d)}})}),(!r||t.type===g.FAR)&&e.jsx(m,{children:e.jsx(s,{id:"ErIkkeFødtPanel.ForeldrepengerInfoTekst.toFørsteUkerDekket",values:{erAlenesøker:r,erFar:l,hvem:U(d,t)}})})]})})})]})};K.__docgenInfo={description:"",methods:[],displayName:"ErIkkeFødtPanel"};const Y=({hvemPlanlegger:t,erOmBarnetIkkeOppgittFraFør:i,antallBarn:u,scrollToBottom:d})=>{const a=D(),o=T(),c=o.watch("erBarnetFødt");return e.jsxs(h,{gap:"8",children:[e.jsxs(_,{label:e.jsx(s,{id:"Fødsel.ErFødt",values:{antallBarn:u}}),name:"erBarnetFødt",shouldFadeIn:!0,validate:[x(a.formatMessage({id:"Fødsel.ErFødt.Required"},{antallBarn:u}))],onChange:()=>{o.resetField("fødselsdato"),o.resetField("termindato"),d()},children:[e.jsx(j,{value:!0,children:e.jsx(s,{id:"DefaultMessage.Ja"})}),e.jsx(j,{value:!1,children:e.jsx(s,{id:"DefaultMessage.Nei"})})]}),c&&e.jsx(L,{hvemPlanlegger:t,erOmBarnetIkkeOppgittFraFør:i,antallBarn:u,scrollToBottom:d}),c===!1&&e.jsx(K,{hvemPlanlegger:t,erOmBarnetIkkeOppgittFraFør:i,antallBarn:u,scrollToBottom:d})]})};Y.__docgenInfo={description:"",methods:[],displayName:"Fødsel"};const he=(t,i)=>i?e.jsx(s,{id:"OmBarnetSteg.HvorMange",values:{erAlenesøker:t}}):e.jsx(s,{id:"OmBarnetSteg.Adopsjon.HvorMange",values:{erAlenesøker:t}}),ke=()=>{const t=D(),i=se(),u=te(),d=P(E.OM_BARNET),a=ae(P(E.HVEM_PLANLEGGER)),o=re(E.OM_BARNET),c=M=>{o(M),me(M)&&n(M.fødselsdato).isBefore(A)?i.goToNextStep(G.OPPSUMMERING):i.goToNextStep(G.ARBEIDSSITUASJON)},r=oe({shouldUnregister:!0,defaultValues:d}),l=r.watch("erFødsel"),f=r.watch("antallBarn"),p=y(a),J=q(a),{ref:W,scrollToBottom:O}=fe();return e.jsx(de,{ref:W,steps:u,children:e.jsx(ne,{formMethods:r,onSubmit:c,shouldUseFlexbox:!0,children:e.jsxs(h,{gap:"10",style:{flex:1},children:[e.jsxs(h,{gap:"8",children:[e.jsx(xe,{level:"2",size:"medium",children:e.jsx(s,{id:"OmBarnetSteg.Tittel"})}),e.jsxs(_,{name:"erFødsel",label:e.jsx(s,{id:"OmBarnetSteg.HvaGjelder",values:{erAlenesøker:p}}),validate:[x(t.formatMessage({id:"OmBarnetSteg.HvaGjelder.Required"},{erAlenesøker:p}))],onChange:()=>{r.resetField("antallBarn"),O()},children:[e.jsx(j,{value:!0,autoFocus:!0,children:e.jsx(s,{id:"OmBarnetSteg.Fødsel"})}),e.jsx(j,{value:!1,children:e.jsx(s,{id:"OmBarnetSteg.Adopsjon"})})]}),l!==void 0&&l===!0&&J&&e.jsxs(F,{header:e.jsx(s,{id:"OmBarnetSteg.Fødsel.Infoboks"}),icon:e.jsx(Fe,{height:24,width:24,color:"#236B7D",fontSize:"1.5rem","aria-hidden":!0}),children:[e.jsx(m,{children:e.jsx(s,{id:"OmBarnetSteg.Fødsel.Infoboks.DenSomErBiologiskFar"})}),e.jsx(m,{children:e.jsx(s,{id:"OmBarnetSteg.Fødsel.Infoboks.LesMer",values:{a:M=>e.jsx(ue,{href:ce.foreldrepenger,target:"_blank",inlineText:!0,children:M})}})})]}),l!==void 0&&e.jsxs(_,{name:"antallBarn",label:he(p,l),shouldFadeIn:!0,validate:[x(t.formatMessage({id:"OmBarnetSteg.HvorMange.Required"},{erAlenesøker:p,erFødsel:l}))],onChange:()=>{r.resetField("erBarnetFødt"),O()},children:[e.jsx(j,{value:"1",children:e.jsx(s,{id:"OmBarnetSteg.Ett"})}),e.jsx(j,{value:"2",children:l?e.jsx(s,{id:"OmBarnetSteg.Tvillinger"}):e.jsx(s,{id:"OmBarnetSteg.To"})}),e.jsx(j,{value:"3",children:e.jsx(s,{id:"OmBarnetSteg.FlereEnnTo"})})]}),l&&f&&e.jsx(Y,{hvemPlanlegger:a,erOmBarnetIkkeOppgittFraFør:d===void 0,antallBarn:f,scrollToBottom:O}),l===!1&&f&&e.jsx(z,{erAlenesøker:p,erOmBarnetIkkeOppgittFraFør:d===void 0,antallBarn:f,hvemPlanlegger:a})]}),e.jsx(je,{}),e.jsx(ie,{saveDataOnPreviousClick:o,goToPreviousStep:i.goToPreviousDefaultStep,useSimplifiedTexts:!0})]})})})};ke.__docgenInfo={description:"",methods:[],displayName:"OmBarnetSteg"};export{ke as O};
