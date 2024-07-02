import{j as e,V as h}from"./VStack-WHXoK350.js";import{i as j,d as v,e as Q,f as X,g as Z,h as H,j as $,k as ee,u as se,a as te,b as P,C as E,n as ae,c as re}from"./usePlanleggerNavigator-Ccj4KIMB.js";import{P as N}from"./routes-Cp-2uEwO.js";import{P as de}from"./PlanleggerStepPage-wobah_yV.js";import{u as D,M as s,d as n,a as w,c as B,B as u,H as oe}from"./Label-8FC7ZTne.js";import{a as O,D as I,f as b,R as f,u as ne,F as ie,S as le}from"./StepButtonsHookForm-3IFWmRNg.js";import{S as g,f as R,b as y,e as A,j as p,k as q,c as ue}from"./HvemPlanleggerUtils-CBBhcrhA.js";import{e as me}from"./barnetUtils-Dtg6gkcN.js";import{B as V,d as F,L as ce,l as xe}from"./Infobox-DetgtEDk.js";import"./index-DVXBtNgz.js";import{u as je}from"./useScrollBehaviour-WVMBWXos.js";import{B as _}from"./BlueRadioGroup-BNnnkB5D.js";import{S as k}from"./TasklistStart-B0h6AqDi.js";import{S as fe}from"./Spacer-CmfZYR-2.js";import{S as Fe}from"./PersonGroup-Cfb_4mVh.js";const z=({erAlenesøker:t,erOmBarnetIkkeOppgittFraFør:i,antallBarn:m,hvemPlanlegger:d})=>{const a=D(),o=m==="3"||m==="2",c=O(),r=c.watch("fødselsdato"),l=c.watch("overtakelsesdato"),x=d.type===g.MOR_OG_FAR||d.type===g.MOR_OG_MEDMOR;return e.jsxs(e.Fragment,{children:[e.jsx(V,{isDarkBlue:i,shouldFadeIn:!0,children:e.jsxs(h,{gap:"8",children:[e.jsx(I,{label:e.jsx(s,{id:"Adopsjon.Overtakelsesdato",values:{erAlenesøker:t,flereBarn:o}}),name:"overtakelsesdato",minDate:n().subtract(6,"month").toDate(),validate:[j(a.formatMessage({id:"Overtakelsesdato.Required"},{erAlenesøker:t,flereBarn:o})),v(a.formatMessage({id:"ValidationMessage.ValidDate"})),Q(a.formatMessage({id:"ValidationMessage.OlderThan6months"})),X(a.formatMessage({id:"ValidationMessage.FødselsdatoMåVæreFørOmsorgovertakelse"}),r),Z(a.formatMessage({id:"ValidationMessage.OmsorgsovertakelseKanIkkeVæreLengerEnn15ÅrEtterFødsel"}),r&&n(r).add(15,"years"))]}),e.jsx(I,{label:e.jsx(s,{id:"Adopsjon.Fødselsdato",values:{flereBarn:o}}),name:"fødselsdato",minDate:n().subtract(15,"years").toDate(),maxDate:n().toDate(),validate:[j(a.formatMessage({id:"Fødselsdato.Required"})),v(a.formatMessage({id:"ValidationMessage.ValidDate"})),H(a.formatMessage({id:"ValidationMessage.IdagEllerTidligere"}))]})]})}),l&&e.jsxs(F,{header:e.jsx(s,{id:"OmBarnetSteg.Adopsjon.ForeldrepengerInfo",values:{erAlenesøker:t}}),icon:e.jsx(k,{height:24,width:24,color:"#236B7D",fontSize:"1.5rem","aria-hidden":!0}),shouldFadeIn:!0,children:[e.jsx(w,{children:e.jsx(s,{id:"OmBarnetSteg.Adopsjon.ForeldrepengerInfoTekst"})}),e.jsx(w,{children:e.jsx(s,{id:"OmBarnetSteg.Adopsjon.ForeldrepengerInfoTekstDel2Deg",values:{erAlenesøker:t,erFarEllerMedmor:x,hvem:R(a,d)}})})]})]})};z.__docgenInfo={description:"",methods:[],displayName:"Adopsjon"};const L=({hvemPlanlegger:t,erOmBarnetIkkeOppgittFraFør:i,antallBarn:m,scrollToBottom:d})=>{const a=D(),c=O().watch("fødselsdato"),r=y(t),l=t.type!==g.MOR;return e.jsxs(h,{gap:"5",children:[e.jsx(V,{isDarkBlue:i,shouldFadeIn:!0,children:e.jsxs(h,{gap:"8",children:[e.jsx(I,{label:e.jsx(s,{id:"ErFødtPanel.Fødselsdato",values:{antallBarn:m}}),name:"fødselsdato",maxDate:n().toDate(),useStrategyAbsolute:!0,validate:[j(a.formatMessage({id:"Fødselsdato.Required"})),v(a.formatMessage({id:"ValidationMessage.ValidDate"})),H(a.formatMessage({id:"ValidationMessage.InFuture"}))],customErrorFormatter:b,onChange:d}),e.jsx(I,{label:e.jsx(s,{id:"ErFødtPanel.NårVarTermin"}),name:"termindato",maxDate:n().add(18,"weeks").add(3,"days").toDate(),validate:[j(a.formatMessage({id:"Termindato.Required"})),v(a.formatMessage({id:"ValidationMessage.ValidDate"})),$(a.formatMessage({id:"ValidationMessage.DuMåVæreIUke22"}))],customErrorFormatter:b,useStrategyAbsolute:!0,onChange:d})]})}),c!==void 0&&n(c).isAfter(B)&&e.jsxs(F,{header:e.jsx(s,{id:"ErFødtPanel.Født.InfoboksTittel",values:{erAlenesøker:r}}),icon:e.jsx(k,{height:24,width:24,color:"#236B7D",fontSize:"1.5rem","aria-hidden":!0}),shouldFadeIn:!0,children:[e.jsx(u,{children:e.jsx(s,{id:"ErFødtPanel.Født.Infoboks.ManKanSøkeTilbakeITid"})}),e.jsx(u,{children:e.jsx(s,{id:"ErFødtPanel.Født.InfoboksTekst.NAVanbefaler",values:{erMorDelAvSøknaden:A(t)}})}),p(t)&&e.jsx(u,{children:e.jsx(s,{id:"ErFødtPanel.Født.InfoboksTekst.toFørsteUkerDekket",values:{erFar:l,hvem:R(a,t)}})})]}),c!==void 0&&n(c).isBefore(B)&&e.jsxs(F,{header:e.jsx(s,{id:"ErFødtPanel.Født.InfoboksTittel.EldreEnnTreÅr",values:{erAlenesøker:r,antallBarn:m}}),icon:e.jsx(k,{height:24,width:24,color:"#236B7D",fontSize:"1.5rem"}),shouldFadeIn:!0,children:[e.jsx(u,{children:e.jsx(s,{id:"ErFødtPanel.Født.InfoboksTekst.EldreEnnTreÅr",values:{antallBarn:m}})}),e.jsx(u,{children:e.jsx(s,{id:"ErFødtPanel.Født.Infoboks.ManKanSøkeTilbakeITid",values:{erFar:l}})})]})]})};L.__docgenInfo={description:"",methods:[],displayName:"ErFødtPanel"};const C=n().startOf("days").add(3,"months"),U=n().startOf("days").toDate(),G=(t,i)=>{if(i.type===g.MOR_OG_MEDMOR)return t.formatMessage({id:"OversiktSteg.Medmor"});if(p(i))return t.formatMessage({id:"OversiktSteg.Far"})},K=({hvemPlanlegger:t,erOmBarnetIkkeOppgittFraFør:i,scrollToBottom:m})=>{const d=D(),o=O().watch("termindato"),c=o!==void 0?n(o).subtract(18,"weeks").toDate():void 0,r=y(t),l=p(t),x=q(t);return e.jsxs(h,{gap:"5",children:[e.jsx(V,{isDarkBlue:i,shouldFadeIn:!0,children:e.jsx(I,{label:e.jsx(s,{id:"ErIkkeFødtPanel.Termin"}),name:"termindato",minDate:n().subtract(3,"week").toDate(),maxDate:n().add(1,"year").toDate(),useStrategyAbsolute:!0,validate:[j(d.formatMessage({id:"Termindato.Required"})),v(d.formatMessage({id:"ValidationMessage.ValidDate"})),ee(d.formatMessage({id:"ValidationMessage.KanIkkeVære3UkerFraIdag"}))],customErrorFormatter:b,onChange:m})}),o!==void 0&&n(o).isBefore(U)&&e.jsxs(F,{header:e.jsx(s,{id:"ErFødtPanel.Født.InfoboksTittel",values:{erAlenesøker:r}}),icon:e.jsx(k,{height:24,width:24,color:"#236B7D",fontSize:"1.5rem","aria-hidden":!0}),shouldFadeIn:!0,children:[e.jsx(u,{children:e.jsx(s,{id:"ErFødtPanel.Født.Infoboks.ManKanSøkeTilbakeITid"})}),e.jsx(u,{children:e.jsx(s,{id:"ErFødtPanel.Født.InfoboksTekst.NAVanbefaler",values:{erMorDelAvSøknaden:A(t)}})}),p(t)&&e.jsx(u,{children:e.jsx(s,{id:"ErFødtPanel.Født.InfoboksTekst.toFørsteUkerDekket",values:{erFar:l,hvem:R(d,t)}})})]}),o!==void 0&&n(o).isAfter(C)&&e.jsxs(F,{header:e.jsx(s,{id:"ErIkkeFødtPanel.ForeldrepengerInfo",values:{erAlenesøker:r,dato:n(c).format("DD.MM.YY")}}),icon:e.jsx(k,{height:24,width:24,color:"#236B7D",fontSize:"1.5rem","aria-hidden":!0}),shouldFadeIn:!0,children:[e.jsx(u,{children:e.jsx(s,{id:"ErIkkeFødtPanel.ForeldrepengerInfoTekst.kanSøke",values:{erAlenesøker:r}})}),e.jsx(u,{children:e.jsx(s,{id:"ErIkkeFødtPanel.ForeldrepengerInfoTekst.NAVanbefaler",values:{erMorDelAvSøknaden:A(t)}})}),p(t)&&!x&&e.jsx(u,{children:e.jsx(s,{id:"ErIkkeFødtPanel.ForeldrepengerInfoTekst.toFørsteUkerDekket",values:{erFar:l,hvem:G(d,t)}})})]}),o!==void 0&&n(o).isSameOrAfter(U)&&n(o).isSameOrBefore(C)&&e.jsx(F,{header:e.jsx(s,{id:"ErIkkeFødtPanel.UnderTreMndTilTerminInfo",values:{erAlenesøker:r}}),icon:e.jsx(k,{height:24,width:24,color:"#236B7D",fontSize:"1.5rem","aria-hidden":!0}),shouldFadeIn:!0,children:!x&&e.jsxs(e.Fragment,{children:[e.jsx(u,{children:t.type===g.MOR&&e.jsx(s,{id:"ErIkkeFødtPanel.UnderTreMndTilTermin",values:{erAlenesøker:r}})}),!r&&e.jsx(u,{children:e.jsx(s,{id:"ErIkkeFødtPanel.UnderTreMndTilTermin",values:{erAlenesøker:r,navn:ue(t,d)}})}),(!r||t.type===g.FAR)&&e.jsx(u,{children:e.jsx(s,{id:"ErIkkeFødtPanel.ForeldrepengerInfoTekst.toFørsteUkerDekket",values:{erAlenesøker:r,erFar:l,hvem:G(d,t)}})})]})})]})};K.__docgenInfo={description:"",methods:[],displayName:"ErIkkeFødtPanel"};const Y=({hvemPlanlegger:t,erOmBarnetIkkeOppgittFraFør:i,antallBarn:m,scrollToBottom:d})=>{const a=D(),o=O(),c=o.watch("erBarnetFødt");return e.jsxs(h,{gap:"8",children:[e.jsxs(_,{label:e.jsx(s,{id:"Fødsel.ErFødt",values:{antallBarn:m}}),name:"erBarnetFødt",shouldFadeIn:!0,validate:[j(a.formatMessage({id:"Fødsel.ErFødt.Required"},{antallBarn:m}))],onChange:()=>{o.resetField("fødselsdato"),o.resetField("termindato"),d()},children:[e.jsx(f,{value:!0,children:e.jsx(s,{id:"DefaultMessage.Ja"})}),e.jsx(f,{value:!1,children:e.jsx(s,{id:"DefaultMessage.Nei"})})]}),c&&e.jsx(L,{hvemPlanlegger:t,erOmBarnetIkkeOppgittFraFør:i,antallBarn:m,scrollToBottom:d}),c===!1&&e.jsx(K,{hvemPlanlegger:t,erOmBarnetIkkeOppgittFraFør:i,antallBarn:m,scrollToBottom:d})]})};Y.__docgenInfo={description:"",methods:[],displayName:"Fødsel"};const he=(t,i)=>i?e.jsx(s,{id:"OmBarnetSteg.HvorMange",values:{erAlenesøker:t}}):e.jsx(s,{id:"OmBarnetSteg.Adopsjon.HvorMange",values:{erAlenesøker:t}}),ke=()=>{const t=D(),i=se(),m=te(),d=P(E.OM_BARNET),a=ae(P(E.HVEM_PLANLEGGER)),o=re(E.OM_BARNET),c=S=>{o(S),me(S)&&n(S.fødselsdato).isBefore(B)?i.goToNextStep(N.OPPSUMMERING):i.goToNextStep(N.ARBEIDSSITUASJON)},r=ne({shouldUnregister:!0,defaultValues:d}),l=r.watch("erFødsel"),x=r.watch("antallBarn"),M=y(a),J=q(a),{ref:W,scrollToBottom:T}=je();return e.jsx(de,{ref:W,steps:m,children:e.jsx(ie,{formMethods:r,onSubmit:c,shouldUseFlexbox:!0,children:e.jsxs(h,{gap:"10",style:{flex:1},children:[e.jsxs(h,{gap:"8",children:[e.jsx(oe,{level:"2",size:"medium",children:e.jsx(s,{id:"OmBarnetSteg.Tittel"})}),e.jsxs(_,{name:"erFødsel",label:e.jsx(s,{id:"OmBarnetSteg.HvaGjelder",values:{erAlenesøker:M}}),validate:[j(t.formatMessage({id:"OmBarnetSteg.HvaGjelder.Required"},{erAlenesøker:M}))],onChange:()=>{r.resetField("antallBarn"),T()},children:[e.jsx(f,{value:!0,autoFocus:!0,children:e.jsx(s,{id:"OmBarnetSteg.Fødsel"})}),e.jsx(f,{value:!1,children:e.jsx(s,{id:"OmBarnetSteg.Adopsjon"})})]}),l!==void 0&&l===!0&&J&&e.jsxs(F,{header:e.jsx(s,{id:"OmBarnetSteg.Fødsel.Infoboks"}),icon:e.jsx(Fe,{height:24,width:24,color:"#236B7D",fontSize:"1.5rem","aria-hidden":!0}),children:[e.jsx(u,{children:e.jsx(s,{id:"OmBarnetSteg.Fødsel.Infoboks.DenSomErBiologiskFar"})}),e.jsx(u,{children:e.jsx(s,{id:"OmBarnetSteg.Fødsel.Infoboks.LesMer",values:{a:S=>e.jsx(ce,{href:xe.foreldrepengerFarOgFar,target:"_blank",inlineText:!0,children:S})}})})]}),l!==void 0&&e.jsxs(_,{name:"antallBarn",label:he(M,l),shouldFadeIn:!0,validate:[j(t.formatMessage({id:"OmBarnetSteg.HvorMange.Required"},{erAlenesøker:M,erFødsel:l}))],onChange:()=>{r.resetField("erBarnetFødt"),T()},children:[e.jsx(f,{value:"1",children:e.jsx(s,{id:"OmBarnetSteg.Ett"})}),e.jsx(f,{value:"2",children:l?e.jsx(s,{id:"OmBarnetSteg.Tvillinger"}):e.jsx(s,{id:"OmBarnetSteg.To"})}),e.jsx(f,{value:"3",children:e.jsx(s,{id:"OmBarnetSteg.FlereEnnTo"})})]}),l&&x&&e.jsx(Y,{hvemPlanlegger:a,erOmBarnetIkkeOppgittFraFør:d===void 0,antallBarn:x,scrollToBottom:T}),l===!1&&x&&e.jsx(z,{erAlenesøker:M,erOmBarnetIkkeOppgittFraFør:d===void 0,antallBarn:x,hvemPlanlegger:a})]}),e.jsx(fe,{}),e.jsx(le,{saveDataOnPreviousClick:o,goToPreviousStep:i.goToPreviousDefaultStep,useSimplifiedTexts:!0})]})})})};ke.__docgenInfo={description:"",methods:[],displayName:"OmBarnetSteg"};export{ke as O};
