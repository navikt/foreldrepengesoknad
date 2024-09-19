import{j as e}from"./jsx-runtime-Cw0GR0a5.js";import{u as Q,a as Z,b as N,C as A,c as $}from"./usePlanleggerNavigator-D6g4VCti.js";import{P as w}from"./routes-Cp-2uEwO.js";import{P as ee}from"./PlanleggerStepPage-DKsuJSsX.js";import{u as D,M as s,d as n,c as G,g as B,B as u,b as se,H as te}from"./Label-R9sLPhMW.js";import{c as O,g as T,f as R,a as x,u as ae,R as re,S as de}from"./StepButtonsHookForm-B6JLgrCq.js";import{S as j,f as V,b as y,e as H,j as I,k as q,c as oe}from"./HvemPlanleggerUtils-D1xsqW5u.js";import{e as ne}from"./barnetUtils-Dtg6gkcN.js";import{B as P,d as k,L as ie,l as le}from"./VeiviserPage-D3AeDTCR.js";import"./index-CTjT7uj6.js";import{i as F,a as E,b as ue,c as ce,d as me,e as z,f as fe,g as Fe,u as xe}from"./dateFormValidation-Bslk1wJI.js";import{n as je}from"./validation-4HO0J-zV.js";import{B as _}from"./BlueRadioGroup-CbWem8oN.js";import{V as h}from"./VStack-BOynvu-T.js";import{S}from"./TasklistStart-KGfYUET_.js";import{S as ke}from"./Spacer-BW3tgveW.js";import{S as he}from"./PersonGroup-D_DyOkqX.js";const L=({erAlenesøker:t,erOmBarnetIkkeOppgittFraFør:c,antallBarn:i,hvemPlanlegger:d})=>{const a=D(),r=i==="3"||i==="2",o=O(),l=o.watch("fødselsdato"),f=o.watch("overtakelsesdato"),m=d.type===j.MOR_OG_FAR||d.type===j.MOR_OG_MEDMOR;return e.jsxs(e.Fragment,{children:[e.jsx(P,{isDarkBlue:c,shouldFadeIn:!0,children:e.jsxs(h,{gap:"8",children:[e.jsx(T,{label:e.jsx(s,{id:"Adopsjon.Overtakelsesdato",values:{erAlenesøker:t,flereBarn:r}}),name:"overtakelsesdato",minDate:n().subtract(6,"month").toDate(),validate:[F(a.formatMessage({id:"Overtakelsesdato.Required"},{erAlenesøker:t,flereBarn:r})),E(a.formatMessage({id:"ValidationMessage.ValidDate"})),ue(a.formatMessage({id:"ValidationMessage.OlderThan6months"})),ce(a.formatMessage({id:"ValidationMessage.FødselsdatoMåVæreFørOmsorgovertakelse"}),l),me(a.formatMessage({id:"ValidationMessage.OmsorgsovertakelseKanIkkeVæreLengerEnn15ÅrEtterFødsel"}),l&&n(l).add(15,"years"))]}),e.jsx(T,{label:e.jsx(s,{id:"Adopsjon.Fødselsdato",values:{flereBarn:r}}),name:"fødselsdato",minDate:n().subtract(15,"years").toDate(),maxDate:n().toDate(),validate:[F(a.formatMessage({id:"Fødselsdato.Required"})),E(a.formatMessage({id:"ValidationMessage.ValidDate"})),z(a.formatMessage({id:"ValidationMessage.IdagEllerTidligere"}))]})]})}),f&&e.jsxs(k,{header:e.jsx(s,{id:"OmBarnetSteg.Adopsjon.ForeldrepengerInfo",values:{erAlenesøker:t}}),icon:e.jsx(S,{height:24,width:24,color:"#7F8900",fontSize:"1.5rem","aria-hidden":!0}),shouldFadeIn:!0,color:"green",children:[e.jsx(G,{children:e.jsx(s,{id:"OmBarnetSteg.Adopsjon.ForeldrepengerInfoTekst"})}),e.jsx(G,{children:e.jsx(s,{id:"OmBarnetSteg.Adopsjon.ForeldrepengerInfoTekstDel2Deg",values:{erAlenesøker:t,erFarEllerMedmor:m,hvem:V(a,d)}})})]})]})};L.__docgenInfo={description:"",methods:[],displayName:"Adopsjon"};const C=t=>se.test(t),K=({hvemPlanlegger:t,erOmBarnetIkkeOppgittFraFør:c,antallBarn:i,scrollToBottom:d})=>{const a=D(),o=O().watch("fødselsdato"),l=y(t),f=t.type!==j.MOR;return e.jsxs(h,{gap:"5",children:[e.jsx(P,{isDarkBlue:c,shouldFadeIn:!0,children:e.jsxs(h,{gap:"8",children:[e.jsx(T,{label:e.jsx(s,{id:"ErFødtPanel.Fødselsdato",values:{antallBarn:i}}),name:"fødselsdato",maxDate:n().toDate(),useStrategyAbsolute:!0,validate:[F(a.formatMessage({id:"Fødselsdato.Required"})),E(a.formatMessage({id:"ValidationMessage.ValidDate"})),z(a.formatMessage({id:"ValidationMessage.InFuture"}))],customErrorFormatter:R,onChange:d}),e.jsx(T,{label:e.jsx(s,{id:"ErFødtPanel.NårVarTermin"}),name:"termindato",maxDate:n().add(18,"weeks").add(3,"days").toDate(),validate:[F(a.formatMessage({id:"Termindato.Required"})),E(a.formatMessage({id:"ValidationMessage.ValidDate"})),fe(a.formatMessage({id:"ValidationMessage.DuMåVæreIUke22"}))],customErrorFormatter:R,useStrategyAbsolute:!0,onChange:d})]})}),o!==void 0&&C(o)&&n(o).isAfter(B)&&e.jsxs(k,{header:e.jsx(s,{id:"ErFødtPanel.Født.InfoboksTittel",values:{erAlenesøker:l}}),icon:e.jsx(S,{height:24,width:24,color:"#7F8900",fontSize:"1.5rem","aria-hidden":!0}),shouldFadeIn:!0,color:"green",children:[e.jsx(u,{children:e.jsx(s,{id:"ErFødtPanel.Født.Infoboks.ManKanSøkeTilbakeITid"})}),e.jsx(u,{children:e.jsx(s,{id:"ErFødtPanel.Født.InfoboksTekst.NAVanbefaler",values:{erMorDelAvSøknaden:H(t)}})}),I(t)&&e.jsx(u,{children:e.jsx(s,{id:"ErFødtPanel.Født.InfoboksTekst.toFørsteUkerDekket",values:{erFar:f,hvem:V(a,t)}})})]}),o!==void 0&&C(o)&&n(o).isBefore(B)&&e.jsxs(k,{header:e.jsx(s,{id:"ErFødtPanel.Født.InfoboksTittel.EldreEnnTreÅr",values:{erAlenesøker:l,antallBarn:i}}),icon:e.jsx(S,{height:24,width:24,color:"#7F8900",fontSize:"1.5rem"}),shouldFadeIn:!0,color:"green",children:[e.jsx(u,{children:e.jsx(s,{id:"ErFødtPanel.Født.InfoboksTekst.EldreEnnTreÅr",values:{antallBarn:i}})}),e.jsx(u,{children:e.jsx(s,{id:"ErFødtPanel.Født.Infoboks.ManKanSøkeTilbakeITid",values:{erFar:f}})})]})]})};K.__docgenInfo={description:"",methods:[],displayName:"ErFødtPanel"};const v=n().startOf("day").toDate(),U=(t,c)=>{if(c.type===j.MOR_OG_MEDMOR)return t.formatMessage({id:"OversiktSteg.Medmor"});if(I(c))return t.formatMessage({id:"OversiktSteg.Far"})},Y=({hvemPlanlegger:t,erOmBarnetIkkeOppgittFraFør:c,scrollToBottom:i})=>{const d=D(),r=O().watch("termindato"),o=r!==void 0?n(r).subtract(18,"weeks").subtract(3,"days").toDate():void 0,l=y(t),f=I(t),m=q(t),g=t.type===j.FAR;return e.jsxs(h,{gap:"5",children:[e.jsx(P,{isDarkBlue:c,shouldFadeIn:!0,children:e.jsx(T,{label:e.jsx(s,{id:"ErIkkeFødtPanel.Termin"}),name:"termindato",minDate:n().subtract(3,"week").toDate(),maxDate:n().add(1,"year").toDate(),useStrategyAbsolute:!0,validate:[F(d.formatMessage({id:"Termindato.Required"})),E(d.formatMessage({id:"ValidationMessage.ValidDate"})),Fe(d.formatMessage({id:"ValidationMessage.KanIkkeVære3UkerFraIdag"}))],customErrorFormatter:R,onChange:i})}),r!==void 0&&n(r).isBefore(v)&&e.jsxs(k,{header:e.jsx(s,{id:"ErFødtPanel.Født.InfoboksTittel",values:{erAlenesøker:l}}),icon:e.jsx(S,{height:24,width:24,color:"#7F8900",fontSize:"1.5rem","aria-hidden":!0}),shouldFadeIn:!0,color:"green",children:[e.jsx(u,{children:e.jsx(s,{id:"ErFødtPanel.Født.Infoboks.ManKanSøkeTilbakeITid"})}),e.jsx(u,{children:e.jsx(s,{id:"ErFødtPanel.Født.InfoboksTekst.NAVanbefaler",values:{erMorDelAvSøknaden:H(t)}})}),I(t)&&e.jsx(u,{children:e.jsx(s,{id:"ErFødtPanel.Født.InfoboksTekst.toFørsteUkerDekket",values:{erFar:f,hvem:V(d,t)}})})]}),r!==void 0&&n(r).isSameOrAfter(v)&&n(v).isSameOrAfter(o)&&e.jsxs(k,{header:e.jsx(s,{id:"ErIkkeFødtPanel.UnderTreMndTilTerminInfo",values:{erAlenesøker:l}}),icon:e.jsx(S,{height:24,width:24,color:"#7F8900",fontSize:"1.5rem","aria-hidden":!0}),shouldFadeIn:!0,color:"green",children:[e.jsxs(u,{children:[e.jsx(s,{id:"ErIkkeFødtPanel.ForeldrepengerInfoTekst.kanSøke"}),m||g?e.jsx(s,{id:"ErFødtPanel.Født.InfoboksTekst.NAVanbefaler",values:{erMorDelAvSøknaden:!1}}):e.jsx(s,{id:"ErFødtPanel.Født.InfoboksTekst.NAVanbefaler",values:{erMorDelAvSøknaden:!0}})]}),!m&&e.jsxs(e.Fragment,{children:[e.jsx(u,{children:t.type===j.MOR&&e.jsx(s,{id:"ErIkkeFødtPanel.UnderTreMndTilTermin",values:{erAlenesøker:l}})}),!l&&e.jsx(u,{children:e.jsx(s,{id:"ErIkkeFødtPanel.UnderTreMndTilTermin",values:{erAlenesøker:l,navn:oe(t,d)}})}),(!l||t.type===j.FAR)&&e.jsx(u,{children:e.jsx(s,{id:"ErIkkeFødtPanel.ForeldrepengerInfoTekst.toFørsteUkerDekket",values:{erAlenesøker:l,erFar:f,hvem:U(d,t)}})})]})]}),r!==void 0&&n(r).isAfter(v)&&n(v).isBefore(o)&&e.jsxs(k,{header:e.jsx(s,{id:"ErIkkeFødtPanel.ForeldrepengerInfo",values:{erAlenesøker:l,dato:n(o).format("DD.MM.YY")}}),icon:e.jsx(S,{height:24,width:24,color:"#7F8900",fontSize:"1.5rem","aria-hidden":!0}),shouldFadeIn:!0,color:"green",children:[e.jsx(u,{children:e.jsx(s,{id:"ErIkkeFødtPanel.ForeldrepengerInfoTekst.kanSøke"})}),e.jsx(u,{children:m?e.jsx(s,{id:"ErFødtPanel.Født.InfoboksTekst.NAVanbefaler",values:{erMorDelAvSøknaden:!1}}):e.jsx(s,{id:"ErFødtPanel.Født.InfoboksTekst.NAVanbefaler",values:{erMorDelAvSøknaden:!0}})}),I(t)&&!m&&e.jsx(u,{children:e.jsx(s,{id:"ErIkkeFødtPanel.ForeldrepengerInfoTekst.toFørsteUkerDekket",values:{erFar:f,hvem:U(d,t)}})})]})]})};Y.__docgenInfo={description:"",methods:[],displayName:"ErIkkeFødtPanel"};const J=({hvemPlanlegger:t,erOmBarnetIkkeOppgittFraFør:c,antallBarn:i,scrollToBottom:d})=>{const a=D(),r=O(),o=r.watch("erBarnetFødt");return e.jsxs(h,{gap:"8",children:[e.jsxs(_,{label:e.jsx(s,{id:"Fødsel.ErFødt",values:{antallBarn:i}}),name:"erBarnetFødt",shouldFadeIn:!0,validate:[F(a.formatMessage({id:"Fødsel.ErFødt.Required"},{antallBarn:i}))],onChange:()=>{r.resetField("fødselsdato"),r.resetField("termindato"),d()},children:[e.jsx(x,{value:!0,children:e.jsx(s,{id:"DefaultMessage.Ja"})}),e.jsx(x,{value:!1,children:e.jsx(s,{id:"DefaultMessage.Nei"})})]}),o&&e.jsx(K,{hvemPlanlegger:t,erOmBarnetIkkeOppgittFraFør:c,antallBarn:i,scrollToBottom:d}),o===!1&&e.jsx(Y,{hvemPlanlegger:t,erOmBarnetIkkeOppgittFraFør:c,antallBarn:i,scrollToBottom:d})]})};J.__docgenInfo={description:"",methods:[],displayName:"Fødsel"};const ge=(t,c)=>c?e.jsx(s,{id:"OmBarnetSteg.HvorMange",values:{erAlenesøker:t}}):e.jsx(s,{id:"OmBarnetSteg.Adopsjon.HvorMange",values:{erAlenesøker:t}}),Se=({locale:t})=>{const c=D(),i=Q(t),d=Z(),a=N(A.OM_BARNET),r=je(N(A.HVEM_PLANLEGGER)),o=$(A.OM_BARNET),l=p=>{o(p),ne(p)&&n(p.fødselsdato).isBefore(B)?i.goToNextStep(w.OPPSUMMERING):i.goToNextStep(w.ARBEIDSSITUASJON)},f=ae({shouldUnregister:!0,defaultValues:a}),m=f.watch("erFødsel"),g=f.watch("antallBarn"),M=y(r),W=q(r),{ref:X,scrollToBottom:b}=xe();return e.jsx(ee,{ref:X,steps:d,goToStep:i.goToNextStep,children:e.jsx(re,{formMethods:f,onSubmit:l,shouldUseFlexbox:!0,children:e.jsxs(h,{gap:"10",style:{flex:1},children:[e.jsxs(h,{gap:"8",children:[e.jsx(te,{level:"2",size:"medium",children:e.jsx(s,{id:"OmBarnetSteg.Tittel"})}),e.jsxs(_,{name:"erFødsel",label:e.jsx(s,{id:"OmBarnetSteg.HvaGjelder",values:{erAlenesøker:M}}),validate:[F(c.formatMessage({id:"OmBarnetSteg.HvaGjelder.Required"},{erAlenesøker:M}))],onChange:()=>{f.resetField("antallBarn"),b()},children:[e.jsx(x,{value:!0,autoFocus:!0,children:e.jsx(s,{id:"OmBarnetSteg.Fødsel"})}),e.jsx(x,{value:!1,children:e.jsx(s,{id:"OmBarnetSteg.Adopsjon"})})]}),m!==void 0&&m===!0&&W&&e.jsxs(k,{header:e.jsx(s,{id:"OmBarnetSteg.Fødsel.Infoboks"}),icon:e.jsx(he,{height:24,width:24,color:"#7F8900",fontSize:"1.5rem","aria-hidden":!0}),color:"green",children:[e.jsx(u,{children:e.jsx(s,{id:"OmBarnetSteg.Fødsel.Infoboks.DenSomErBiologiskFar"})}),e.jsx(u,{children:e.jsx(s,{id:"OmBarnetSteg.Fødsel.Infoboks.LesMer",values:{a:p=>e.jsx(ie,{href:le.foreldrepengerFarOgFar,target:"_blank",inlineText:!0,children:p})}})})]}),m!==void 0&&e.jsxs(_,{name:"antallBarn",label:ge(M,m),shouldFadeIn:!0,validate:[F(c.formatMessage({id:"OmBarnetSteg.HvorMange.Required"},{erAlenesøker:M,erFødsel:m}))],onChange:()=>{f.resetField("erBarnetFødt"),b()},children:[e.jsx(x,{value:"1",children:e.jsx(s,{id:"OmBarnetSteg.Ett"})}),e.jsx(x,{value:"2",children:m?e.jsx(s,{id:"OmBarnetSteg.Tvillinger"}):e.jsx(s,{id:"OmBarnetSteg.To"})}),e.jsx(x,{value:"3",children:e.jsx(s,{id:"OmBarnetSteg.FlereEnnTo"})})]}),m&&g&&e.jsx(J,{hvemPlanlegger:r,erOmBarnetIkkeOppgittFraFør:a===void 0,antallBarn:g,scrollToBottom:b}),m===!1&&g&&e.jsx(L,{erAlenesøker:M,erOmBarnetIkkeOppgittFraFør:a===void 0,antallBarn:g,hvemPlanlegger:r})]}),e.jsx(ke,{}),e.jsx(de,{saveDataOnPreviousClick:o,goToPreviousStep:i.goToPreviousDefaultStep,useSimplifiedTexts:!0})]})})})};Se.__docgenInfo={description:"",methods:[],displayName:"OmBarnetSteg"};export{Se as O};
