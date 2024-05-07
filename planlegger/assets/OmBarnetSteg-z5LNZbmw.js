import{j as e}from"./jsx-runtime-Du8NFWEI.js";import{i as x,d as v,e as J,f as Q,g as X,h as w,j as Z,k as $,u as ee,a as se,b as V,C as B,n as te,c as ae}from"./usePlanleggerNavigator-DFvQ4JT5.js";import{P}from"./routes-DI-Woyga.js";import{I as g}from"./Infobox-2dY1MjSC.js";import{P as re}from"./PlanleggerStepPage-CgQnGAng.js";import{d as i}from"./dayjs.min-a42Le6oL.js";import{a as T,D as S,f as A,R as j,u as oe,F as de,S as ne}from"./StepButtonsHookForm-DUdbmqm8.js";import{u as D,F as s}from"./index-e2vXP8VC.js";import{S as k,f as C,b as _,e as U,j as E,k as H,h as ie}from"./HvemPlanleggerUtils-CHTffTZd.js";import{e as le}from"./barnetUtils-Dtg6gkcN.js";import{u as me}from"./useScrollBehaviour-BhOrFi8k.js";import{L as ue,l as ce}from"./links-BAR-PZvy.js";import{a as b}from"./dateUtils-C_C2kvi-.js";import"./index-Dl6G-zuu.js";import"./calendarLabel.module-Bk8mFlZK.js";import"./amplitude.esm-JOtNIP3j.js";import{G as y}from"./GreenRadioGroup-DxUftn9i.js";import{G as R}from"./GreenPanel-CEPEejtT.js";import{V as h}from"./VStack-C-EA7mzX.js";import{T as I}from"./TasklistStart-BHosgMZk.js";import{a as f,B as F,H as fe}from"./Label-DKKZxAV5.js";import{S as xe}from"./Spacer-DYbme5k_.js";const q=({erAlenesøker:t,erOmBarnetIkkeOppgittFraFør:n,antallBarn:m,hvemPlanlegger:o})=>{const a=D(),d=m==="3"||m==="2",u=T(),r=u.watch("fødselsdato"),l=u.watch("overtakelsesdato"),c=o.type===k.MOR_OG_FAR||o.type===k.MOR_OG_MEDMOR;return e.jsxs(e.Fragment,{children:[e.jsx(R,{isDarkGreen:n,shouldFadeIn:!0,children:e.jsxs(h,{gap:"8",children:[e.jsx(S,{label:e.jsx(s,{id:"Adopsjon.Overtakelsesdato",values:{erAlenesøker:t,flereBarn:d}}),name:"overtakelsesdato",minDate:i().subtract(6,"month").toDate(),autofocusWhenEmpty:!0,validate:[x(a.formatMessage({id:"Overtakelsesdato.Required"},{erAlenesøker:t,flereBarn:d})),v(a.formatMessage({id:"ValidationMessage.ValidDate"})),J(a.formatMessage({id:"ValidationMessage.OlderThan6months"})),Q(a.formatMessage({id:"ValidationMessage.FødselsdatoMåVæreFørOmsorgovertakelse"}),r),X(a.formatMessage({id:"ValidationMessage.OmsorgsovertakelseKanIkkeVæreLengerEnn15ÅrEtterFødsel"}),r&&i(r).add(15,"years"))]}),e.jsx(S,{label:e.jsx(s,{id:"Adopsjon.Fødselsdato",values:{flereBarn:d}}),name:"fødselsdato",minDate:i().subtract(15,"years").toDate(),maxDate:i().toDate(),validate:[x(a.formatMessage({id:"Fødselsdato.Required"})),v(a.formatMessage({id:"ValidationMessage.ValidDate"})),w(a.formatMessage({id:"ValidationMessage.IdagEllerTidligere"}))]})]})}),l&&e.jsxs(g,{header:e.jsx(s,{id:"OmBarnetSteg.Adopsjon.ForeldrepengerInfo",values:{erAlenesøker:t}}),icon:e.jsx(I,{height:24,width:24,color:"#236B7D",fontSize:"1.5rem","aria-hidden":!0}),shouldFadeIn:!0,children:[e.jsx(f,{children:e.jsx(s,{id:"OmBarnetSteg.Adopsjon.ForeldrepengerInfoTekst"})}),e.jsx(f,{children:e.jsx(s,{id:"OmBarnetSteg.Adopsjon.ForeldrepengerInfoTekstDel2Deg",values:{erAlenesøker:t,erFarEllerMedmor:c,hvem:C(a,o)}})})]})]})};q.__docgenInfo={description:"",methods:[],displayName:"Adopsjon"};const L=({hvemPlanlegger:t,erOmBarnetIkkeOppgittFraFør:n,antallBarn:m,scrollToBottom:o})=>{const a=D(),u=T().watch("fødselsdato"),r=_(t),l=t.type!==k.MOR;return e.jsxs(h,{gap:"5",children:[e.jsx(R,{isDarkGreen:n,shouldFadeIn:!0,children:e.jsxs(h,{gap:"8",children:[e.jsx(S,{label:e.jsx(s,{id:"ErFødtPanel.Fødselsdato",values:{antallBarn:m}}),name:"fødselsdato",maxDate:i().toDate(),autofocusWhenEmpty:!0,useStrategyAbsolute:!0,validate:[x(a.formatMessage({id:"Fødselsdato.Required"})),v(a.formatMessage({id:"ValidationMessage.ValidDate"})),w(a.formatMessage({id:"ValidationMessage.InFuture"}))],customErrorFormatter:A,onChange:o}),e.jsx(S,{label:e.jsx(s,{id:"ErFødtPanel.NårVarTermin"}),name:"termindato",maxDate:i().add(18,"weeks").add(3,"days").toDate(),validate:[x(a.formatMessage({id:"Termindato.Required"})),v(a.formatMessage({id:"ValidationMessage.ValidDate"})),Z(a.formatMessage({id:"ValidationMessage.DuMåVæreIUke22"}))],customErrorFormatter:A,useStrategyAbsolute:!0,onChange:o})]})}),u!==void 0&&i(u).isAfter(b)&&e.jsxs(g,{header:e.jsx(s,{id:"ErFødtPanel.Født.InfoboksTittel",values:{erAlenesøker:r}}),icon:e.jsx(I,{height:24,width:24,color:"#236B7D",fontSize:"1.5rem","aria-hidden":!0}),shouldFadeIn:!0,children:[e.jsx(F,{children:e.jsx(s,{id:"ErFødtPanel.Født.Infoboks.ManKanSøkeTilbakeITid"})}),e.jsx(F,{children:e.jsx(s,{id:"ErFødtPanel.Født.InfoboksTekst.NAVanbefaler",values:{erMorDelAvSøknaden:U(t)}})}),E(t)&&e.jsx(F,{children:e.jsx(s,{id:"ErFødtPanel.Født.InfoboksTekst.toFørsteUkerDekket",values:{erFar:l,hvem:C(a,t)}})})]}),u!==void 0&&i(u).isBefore(b)&&e.jsxs(g,{header:e.jsx(s,{id:"ErFødtPanel.Født.InfoboksTittel.EldreEnnTreÅr",values:{erAlenesøker:r,antallBarn:m}}),icon:e.jsx(I,{height:24,width:24,color:"#236B7D",fontSize:"1.5rem"}),shouldFadeIn:!0,children:[e.jsx(F,{children:e.jsx(s,{id:"ErFødtPanel.Født.InfoboksTekst.EldreEnnTreÅr",values:{antallBarn:m}})}),e.jsx(F,{children:e.jsx(s,{id:"ErFødtPanel.Født.Infoboks.ManKanSøkeTilbakeITid",values:{erFar:l}})})]})]})};L.__docgenInfo={description:"",methods:[],displayName:"ErFødtPanel"};const G=i().startOf("days").add(3,"months").add(1,"day"),je=i().startOf("days"),N=(t,n)=>{if(n.type===k.MOR_OG_MEDMOR)return t.formatMessage({id:"OversiktSteg.Medmor"});if(E(n))return t.formatMessage({id:"OversiktSteg.Far"})},z=({hvemPlanlegger:t,erOmBarnetIkkeOppgittFraFør:n,scrollToBottom:m})=>{const o=D(),d=T().watch("termindato"),u=d!==void 0?i(d).subtract(18,"weeks").subtract(2,"days").toDate():void 0,r=_(t),l=E(t),c=H(t);return e.jsxs(h,{gap:"5",children:[e.jsx(R,{isDarkGreen:n,shouldFadeIn:!0,children:e.jsx(S,{label:e.jsx(s,{id:"ErIkkeFødtPanel.Termin"}),name:"termindato",minDate:i().subtract(3,"week").toDate(),maxDate:i().add(1,"year").toDate(),autofocusWhenEmpty:!0,useStrategyAbsolute:!0,validate:[x(o.formatMessage({id:"Termindato.Required"})),v(o.formatMessage({id:"ValidationMessage.ValidDate"})),$(o.formatMessage({id:"ValidationMessage.KanIkkeVære3UkerFraIdag"}))],customErrorFormatter:A,onChange:m})}),d!==void 0&&i(d).isAfter(G)&&e.jsx(e.Fragment,{children:e.jsxs(g,{header:e.jsx(s,{id:"ErIkkeFødtPanel.ForeldrepengerInfo",values:{erAlenesøker:r,dato:i(u).format("DD.MM.YY")}}),icon:e.jsx(I,{height:24,width:24,color:"#236B7D",fontSize:"1.5rem","aria-hidden":!0}),shouldFadeIn:!0,children:[e.jsx(f,{children:e.jsx(s,{id:"ErIkkeFødtPanel.ForeldrepengerInfoTekst.kanSøke",values:{erAlenesøker:r}})}),e.jsx(f,{children:e.jsx(s,{id:"ErIkkeFødtPanel.ForeldrepengerInfoTekst.NAVanbefaler",values:{erMorDelAvSøknaden:U(t)}})}),E(t)&&!c&&e.jsx(f,{children:e.jsx(s,{id:"ErIkkeFødtPanel.ForeldrepengerInfoTekst.toFørsteUkerDekket",values:{erFar:l,hvem:N(o,t)}})})]})}),d!==void 0&&i(d).isBefore(G)&&e.jsx(e.Fragment,{children:e.jsx(g,{header:e.jsx(e.Fragment,{children:i(d).isSameOrAfter(je)?e.jsx(s,{id:"ErIkkeFødtPanel.UnderTreMndTilTerminInfo",values:{erAlenesøker:r}}):e.jsx(s,{id:"ErIkkeFødtPanel.TerminErForbi",values:{erAlenesøker:r}})}),icon:e.jsx(I,{height:24,width:24,color:"#236B7D",fontSize:"1.5rem","aria-hidden":!0}),shouldFadeIn:!0,children:!c&&e.jsxs(e.Fragment,{children:[e.jsx(f,{children:t.type===k.MOR&&e.jsx(s,{id:"ErIkkeFødtPanel.UnderTreMndTilTermin",values:{erAlenesøker:r}})}),!r&&e.jsx(f,{children:e.jsx(s,{id:"ErIkkeFødtPanel.UnderTreMndTilTermin",values:{erAlenesøker:r,navn:ie(t,o)}})}),(!r||t.type===k.FAR)&&e.jsx(f,{children:e.jsx(s,{id:"ErIkkeFødtPanel.ForeldrepengerInfoTekst.toFørsteUkerDekket",values:{erAlenesøker:r,erFar:l,hvem:N(o,t)}})})]})})})]})};z.__docgenInfo={description:"",methods:[],displayName:"ErIkkeFødtPanel"};const K=({hvemPlanlegger:t,erOmBarnetIkkeOppgittFraFør:n,antallBarn:m,scrollToBottom:o})=>{const a=D(),d=T(),u=d.watch("erBarnetFødt");return e.jsxs(h,{gap:"8",children:[e.jsxs(y,{label:e.jsx(s,{id:"Fødsel.ErFødt",values:{antallBarn:m}}),name:"erBarnetFødt",shouldFadeIn:!0,validate:[x(a.formatMessage({id:"Fødsel.ErFødt.Required"},{antallBarn:m}))],onChange:()=>{d.resetField("fødselsdato"),d.resetField("termindato"),o()},children:[e.jsx(j,{value:!0,autoFocus:n,children:e.jsx(s,{id:"DefaultMessage.Ja"})}),e.jsx(j,{value:!1,children:e.jsx(s,{id:"DefaultMessage.Nei"})})]}),u&&e.jsx(L,{hvemPlanlegger:t,erOmBarnetIkkeOppgittFraFør:n,antallBarn:m,scrollToBottom:o}),u===!1&&e.jsx(z,{hvemPlanlegger:t,erOmBarnetIkkeOppgittFraFør:n,antallBarn:m,scrollToBottom:o})]})};K.__docgenInfo={description:"",methods:[],displayName:"Fødsel"};const Fe=(t,n)=>n?e.jsx(s,{id:"OmBarnetSteg.HvorMange",values:{erAlenesøker:t}}):e.jsx(s,{id:"OmBarnetSteg.Adopsjon.HvorMange",values:{erAlenesøker:t}}),he=()=>{const t=D(),n=ee(),m=se(),o=V(B.OM_BARNET),a=te(V(B.HVEM_PLANLEGGER)),d=ae(B.OM_BARNET),u=M=>{d(M),le(M)&&i(M.fødselsdato).isBefore(b)?n.goToNextStep(P.OPPSUMMERING):n.goToNextStep(P.ARBEIDSSITUASJON)},r=oe({shouldUnregister:!0,defaultValues:o}),l=r.watch("erFødsel"),c=r.watch("antallBarn"),p=_(a),W=H(a),{ref:Y,scrollToBottom:O}=me();return e.jsx(re,{ref:Y,steps:m,children:e.jsx(de,{formMethods:r,onSubmit:u,shouldUseFlexbox:!0,children:e.jsxs(h,{gap:"10",style:{flex:1},children:[e.jsxs(h,{gap:"8",children:[e.jsx(fe,{level:"2",size:"medium",children:e.jsx(s,{id:"OmBarnetSteg.Tittel"})}),e.jsxs(y,{name:"erFødsel",label:e.jsx(s,{id:"OmBarnetSteg.HvaGjelder",values:{erAlenesøker:p}}),validate:[x(t.formatMessage({id:"OmBarnetSteg.HvaGjelder.Required"},{erAlenesøker:p}))],onChange:()=>{r.resetField("antallBarn"),O()},children:[e.jsx(j,{value:!0,autoFocus:!0,children:e.jsx(s,{id:"OmBarnetSteg.Fødsel"})}),e.jsx(j,{value:!1,children:e.jsx(s,{id:"OmBarnetSteg.Adopsjon"})})]}),l!==void 0&&l===!0&&W&&e.jsxs(g,{header:e.jsx(s,{id:"OmBarnetSteg.Fødsel.Infoboks"}),children:[e.jsx(F,{children:e.jsx(s,{id:"OmBarnetSteg.Fødsel.Infoboks.DenSomErBiologiskFar"})}),e.jsx(F,{children:e.jsx(s,{id:"OmBarnetSteg.Fødsel.Infoboks.LesMer",values:{a:M=>e.jsx(ue,{href:ce.foreldrepenger,target:"_blank",inlineText:!0,children:M})}})})]}),l!==void 0&&e.jsxs(y,{name:"antallBarn",label:Fe(p,l),shouldFadeIn:!0,validate:[x(t.formatMessage({id:"OmBarnetSteg.HvorMange.Required"},{erAlenesøker:p,erFødsel:l}))],onChange:()=>{r.resetField("erBarnetFødt"),O()},children:[e.jsx(j,{value:"1",autoFocus:o===void 0,children:e.jsx(s,{id:"OmBarnetSteg.Ett"})}),e.jsx(j,{value:"2",children:l?e.jsx(s,{id:"OmBarnetSteg.Tvillinger"}):e.jsx(s,{id:"OmBarnetSteg.To"})}),e.jsx(j,{value:"3",children:e.jsx(s,{id:"OmBarnetSteg.FlereEnnTo"})})]}),l&&c&&e.jsx(K,{hvemPlanlegger:a,erOmBarnetIkkeOppgittFraFør:o===void 0,antallBarn:c,scrollToBottom:O}),l===!1&&c&&e.jsx(q,{erAlenesøker:p,erOmBarnetIkkeOppgittFraFør:o===void 0,antallBarn:c,hvemPlanlegger:a})]}),e.jsx(xe,{}),e.jsx(ne,{saveDataOnPreviousClick:d,goToPreviousStep:n.goToPreviousDefaultStep,useSimplifiedTexts:!0})]})})})};he.__docgenInfo={description:"",methods:[],displayName:"OmBarnetSteg"};export{he as O};
