import{j as e}from"./jsx-runtime-Cw0GR0a5.js";import{u as X,a as Q,b as P,C as b,c as Z}from"./usePlanleggerNavigator-bfolbdq0.js";import{P as N}from"./routes-Cp-2uEwO.js";import{P as $}from"./PlanleggerStepPage-B-k2kdCS.js";import{u as E,M as s,d as n,e as w,g as A,B as c,c as ee,H as se}from"./Label-ne8aFYav.js";import{a as D,D as I,f as B,R as j,u as te,F as ae,S as re}from"./StepButtonsHookForm-Dttpjjrm.js";import{S as k,f as R,b as V,e as U,j as v,k as H,c as de}from"./HvemPlanleggerUtils-D1xsqW5u.js";import{e as oe}from"./barnetUtils-Dtg6gkcN.js";import{B as y,d as h,L as ne,l as ie}from"./Infobox-CtPDPZ_e.js";import"./index-CTjT7uj6.js";import{i as f,a as T,b as le,c as ue,d as ce,e as q,f as me,g as Fe,u as fe}from"./useScrollBehaviour-CuUH4c1L.js";import{n as xe}from"./validation-4HO0J-zV.js";import{B as _}from"./BlueRadioGroup-KpxmQA_m.js";import{V as g}from"./useId-Dvu9sbXS.js";import{S}from"./TasklistStart-CEmPP61o.js";import{S as je}from"./Spacer-BW3tgveW.js";import{S as ke}from"./PersonGroup-bIWPBeqr.js";const z=({erAlenesøker:t,erOmBarnetIkkeOppgittFraFør:i,antallBarn:m,hvemPlanlegger:r})=>{const a=E(),o=m==="3"||m==="2",l=D(),d=l.watch("fødselsdato"),u=l.watch("overtakelsesdato"),F=r.type===k.MOR_OG_FAR||r.type===k.MOR_OG_MEDMOR;return e.jsxs(e.Fragment,{children:[e.jsx(y,{isDarkBlue:i,shouldFadeIn:!0,children:e.jsxs(g,{gap:"8",children:[e.jsx(I,{label:e.jsx(s,{id:"Adopsjon.Overtakelsesdato",values:{erAlenesøker:t,flereBarn:o}}),name:"overtakelsesdato",minDate:n().subtract(6,"month").toDate(),validate:[f(a.formatMessage({id:"Overtakelsesdato.Required"},{erAlenesøker:t,flereBarn:o})),T(a.formatMessage({id:"ValidationMessage.ValidDate"})),le(a.formatMessage({id:"ValidationMessage.OlderThan6months"})),ue(a.formatMessage({id:"ValidationMessage.FødselsdatoMåVæreFørOmsorgovertakelse"}),d),ce(a.formatMessage({id:"ValidationMessage.OmsorgsovertakelseKanIkkeVæreLengerEnn15ÅrEtterFødsel"}),d&&n(d).add(15,"years"))]}),e.jsx(I,{label:e.jsx(s,{id:"Adopsjon.Fødselsdato",values:{flereBarn:o}}),name:"fødselsdato",minDate:n().subtract(15,"years").toDate(),maxDate:n().toDate(),validate:[f(a.formatMessage({id:"Fødselsdato.Required"})),T(a.formatMessage({id:"ValidationMessage.ValidDate"})),q(a.formatMessage({id:"ValidationMessage.IdagEllerTidligere"}))]})]})}),u&&e.jsxs(h,{header:e.jsx(s,{id:"OmBarnetSteg.Adopsjon.ForeldrepengerInfo",values:{erAlenesøker:t}}),icon:e.jsx(S,{height:24,width:24,color:"#7F8900",fontSize:"1.5rem","aria-hidden":!0}),shouldFadeIn:!0,color:"green",children:[e.jsx(w,{children:e.jsx(s,{id:"OmBarnetSteg.Adopsjon.ForeldrepengerInfoTekst"})}),e.jsx(w,{children:e.jsx(s,{id:"OmBarnetSteg.Adopsjon.ForeldrepengerInfoTekstDel2Deg",values:{erAlenesøker:t,erFarEllerMedmor:F,hvem:R(a,r)}})})]})]})};z.__docgenInfo={description:"",methods:[],displayName:"Adopsjon"};const G=t=>ee.test(t),L=({hvemPlanlegger:t,erOmBarnetIkkeOppgittFraFør:i,antallBarn:m,scrollToBottom:r})=>{const a=E(),l=D().watch("fødselsdato"),d=V(t),u=t.type!==k.MOR;return e.jsxs(g,{gap:"5",children:[e.jsx(y,{isDarkBlue:i,shouldFadeIn:!0,children:e.jsxs(g,{gap:"8",children:[e.jsx(I,{label:e.jsx(s,{id:"ErFødtPanel.Fødselsdato",values:{antallBarn:m}}),name:"fødselsdato",maxDate:n().toDate(),useStrategyAbsolute:!0,validate:[f(a.formatMessage({id:"Fødselsdato.Required"})),T(a.formatMessage({id:"ValidationMessage.ValidDate"})),q(a.formatMessage({id:"ValidationMessage.InFuture"}))],customErrorFormatter:B,onChange:r}),e.jsx(I,{label:e.jsx(s,{id:"ErFødtPanel.NårVarTermin"}),name:"termindato",maxDate:n().add(18,"weeks").add(3,"days").toDate(),validate:[f(a.formatMessage({id:"Termindato.Required"})),T(a.formatMessage({id:"ValidationMessage.ValidDate"})),me(a.formatMessage({id:"ValidationMessage.DuMåVæreIUke22"}))],customErrorFormatter:B,useStrategyAbsolute:!0,onChange:r})]})}),l!==void 0&&G(l)&&n(l).isAfter(A)&&e.jsxs(h,{header:e.jsx(s,{id:"ErFødtPanel.Født.InfoboksTittel",values:{erAlenesøker:d}}),icon:e.jsx(S,{height:24,width:24,color:"#7F8900",fontSize:"1.5rem","aria-hidden":!0}),shouldFadeIn:!0,color:"green",children:[e.jsx(c,{children:e.jsx(s,{id:"ErFødtPanel.Født.Infoboks.ManKanSøkeTilbakeITid"})}),e.jsx(c,{children:e.jsx(s,{id:"ErFødtPanel.Født.InfoboksTekst.NAVanbefaler",values:{erMorDelAvSøknaden:U(t)}})}),v(t)&&e.jsx(c,{children:e.jsx(s,{id:"ErFødtPanel.Født.InfoboksTekst.toFørsteUkerDekket",values:{erFar:u,hvem:R(a,t)}})})]}),l!==void 0&&G(l)&&n(l).isBefore(A)&&e.jsxs(h,{header:e.jsx(s,{id:"ErFødtPanel.Født.InfoboksTittel.EldreEnnTreÅr",values:{erAlenesøker:d,antallBarn:m}}),icon:e.jsx(S,{height:24,width:24,color:"#7F8900",fontSize:"1.5rem"}),shouldFadeIn:!0,color:"green",children:[e.jsx(c,{children:e.jsx(s,{id:"ErFødtPanel.Født.InfoboksTekst.EldreEnnTreÅr",values:{antallBarn:m}})}),e.jsx(c,{children:e.jsx(s,{id:"ErFødtPanel.Født.Infoboks.ManKanSøkeTilbakeITid",values:{erFar:u}})})]})]})};L.__docgenInfo={description:"",methods:[],displayName:"ErFødtPanel"};const p=n().startOf("day").toDate(),C=(t,i)=>{if(i.type===k.MOR_OG_MEDMOR)return t.formatMessage({id:"OversiktSteg.Medmor"});if(v(i))return t.formatMessage({id:"OversiktSteg.Far"})},K=({hvemPlanlegger:t,erOmBarnetIkkeOppgittFraFør:i,scrollToBottom:m})=>{const r=E(),o=D().watch("termindato"),l=o!==void 0?n(o).subtract(18,"weeks").subtract(3,"days").toDate():void 0,d=V(t),u=v(t),F=H(t),x=t.type===k.FAR;return e.jsxs(g,{gap:"5",children:[e.jsx(y,{isDarkBlue:i,shouldFadeIn:!0,children:e.jsx(I,{label:e.jsx(s,{id:"ErIkkeFødtPanel.Termin"}),name:"termindato",minDate:n().subtract(3,"week").toDate(),maxDate:n().add(1,"year").toDate(),useStrategyAbsolute:!0,validate:[f(r.formatMessage({id:"Termindato.Required"})),T(r.formatMessage({id:"ValidationMessage.ValidDate"})),Fe(r.formatMessage({id:"ValidationMessage.KanIkkeVære3UkerFraIdag"}))],customErrorFormatter:B,onChange:m})}),o!==void 0&&n(o).isBefore(p)&&e.jsxs(h,{header:e.jsx(s,{id:"ErFødtPanel.Født.InfoboksTittel",values:{erAlenesøker:d}}),icon:e.jsx(S,{height:24,width:24,color:"#7F8900",fontSize:"1.5rem","aria-hidden":!0}),shouldFadeIn:!0,color:"green",children:[e.jsx(c,{children:e.jsx(s,{id:"ErFødtPanel.Født.Infoboks.ManKanSøkeTilbakeITid"})}),e.jsx(c,{children:e.jsx(s,{id:"ErFødtPanel.Født.InfoboksTekst.NAVanbefaler",values:{erMorDelAvSøknaden:U(t)}})}),v(t)&&e.jsx(c,{children:e.jsx(s,{id:"ErFødtPanel.Født.InfoboksTekst.toFørsteUkerDekket",values:{erFar:u,hvem:R(r,t)}})})]}),o!==void 0&&n(o).isSameOrAfter(p)&&n(p).isSameOrAfter(l)&&e.jsxs(h,{header:e.jsx(s,{id:"ErIkkeFødtPanel.UnderTreMndTilTerminInfo",values:{erAlenesøker:d}}),icon:e.jsx(S,{height:24,width:24,color:"#7F8900",fontSize:"1.5rem","aria-hidden":!0}),shouldFadeIn:!0,color:"green",children:[e.jsxs(c,{children:[e.jsx(s,{id:"ErIkkeFødtPanel.ForeldrepengerInfoTekst.kanSøke"}),F||x?e.jsx(s,{id:"ErFødtPanel.Født.InfoboksTekst.NAVanbefaler",values:{erMorDelAvSøknaden:!1}}):e.jsx(s,{id:"ErFødtPanel.Født.InfoboksTekst.NAVanbefaler",values:{erMorDelAvSøknaden:!0}})]}),!F&&e.jsxs(e.Fragment,{children:[e.jsx(c,{children:t.type===k.MOR&&e.jsx(s,{id:"ErIkkeFødtPanel.UnderTreMndTilTermin",values:{erAlenesøker:d}})}),!d&&e.jsx(c,{children:e.jsx(s,{id:"ErIkkeFødtPanel.UnderTreMndTilTermin",values:{erAlenesøker:d,navn:de(t,r)}})}),(!d||t.type===k.FAR)&&e.jsx(c,{children:e.jsx(s,{id:"ErIkkeFødtPanel.ForeldrepengerInfoTekst.toFørsteUkerDekket",values:{erAlenesøker:d,erFar:u,hvem:C(r,t)}})})]})]}),o!==void 0&&n(o).isAfter(p)&&n(p).isBefore(l)&&e.jsxs(h,{header:e.jsx(s,{id:"ErIkkeFødtPanel.ForeldrepengerInfo",values:{erAlenesøker:d,dato:n(l).format("DD.MM.YY")}}),icon:e.jsx(S,{height:24,width:24,color:"#7F8900",fontSize:"1.5rem","aria-hidden":!0}),shouldFadeIn:!0,color:"green",children:[e.jsx(c,{children:e.jsx(s,{id:"ErIkkeFødtPanel.ForeldrepengerInfoTekst.kanSøke"})}),e.jsx(c,{children:F?e.jsx(s,{id:"ErFødtPanel.Født.InfoboksTekst.NAVanbefaler",values:{erMorDelAvSøknaden:!1}}):e.jsx(s,{id:"ErFødtPanel.Født.InfoboksTekst.NAVanbefaler",values:{erMorDelAvSøknaden:!0}})}),v(t)&&!F&&e.jsx(c,{children:e.jsx(s,{id:"ErIkkeFødtPanel.ForeldrepengerInfoTekst.toFørsteUkerDekket",values:{erFar:u,hvem:C(r,t)}})})]})]})};K.__docgenInfo={description:"",methods:[],displayName:"ErIkkeFødtPanel"};const Y=({hvemPlanlegger:t,erOmBarnetIkkeOppgittFraFør:i,antallBarn:m,scrollToBottom:r})=>{const a=E(),o=D(),l=o.watch("erBarnetFødt");return e.jsxs(g,{gap:"8",children:[e.jsxs(_,{label:e.jsx(s,{id:"Fødsel.ErFødt",values:{antallBarn:m}}),name:"erBarnetFødt",shouldFadeIn:!0,validate:[f(a.formatMessage({id:"Fødsel.ErFødt.Required"},{antallBarn:m}))],onChange:()=>{o.resetField("fødselsdato"),o.resetField("termindato"),r()},children:[e.jsx(j,{value:!0,children:e.jsx(s,{id:"DefaultMessage.Ja"})}),e.jsx(j,{value:!1,children:e.jsx(s,{id:"DefaultMessage.Nei"})})]}),l&&e.jsx(L,{hvemPlanlegger:t,erOmBarnetIkkeOppgittFraFør:i,antallBarn:m,scrollToBottom:r}),l===!1&&e.jsx(K,{hvemPlanlegger:t,erOmBarnetIkkeOppgittFraFør:i,antallBarn:m,scrollToBottom:r})]})};Y.__docgenInfo={description:"",methods:[],displayName:"Fødsel"};const he=(t,i)=>i?e.jsx(s,{id:"OmBarnetSteg.HvorMange",values:{erAlenesøker:t}}):e.jsx(s,{id:"OmBarnetSteg.Adopsjon.HvorMange",values:{erAlenesøker:t}}),ge=()=>{const t=E(),i=X(),m=Q(),r=P(b.OM_BARNET),a=xe(P(b.HVEM_PLANLEGGER)),o=Z(b.OM_BARNET),l=M=>{o(M),oe(M)&&n(M.fødselsdato).isBefore(A)?i.goToNextStep(N.OPPSUMMERING):i.goToNextStep(N.ARBEIDSSITUASJON)},d=te({shouldUnregister:!0,defaultValues:r}),u=d.watch("erFødsel"),F=d.watch("antallBarn"),x=V(a),J=H(a),{ref:W,scrollToBottom:O}=fe();return e.jsx($,{ref:W,steps:m,goToStep:i.goToNextStep,children:e.jsx(ae,{formMethods:d,onSubmit:l,shouldUseFlexbox:!0,children:e.jsxs(g,{gap:"10",style:{flex:1},children:[e.jsxs(g,{gap:"8",children:[e.jsx(se,{level:"2",size:"medium",children:e.jsx(s,{id:"OmBarnetSteg.Tittel"})}),e.jsxs(_,{name:"erFødsel",label:e.jsx(s,{id:"OmBarnetSteg.HvaGjelder",values:{erAlenesøker:x}}),validate:[f(t.formatMessage({id:"OmBarnetSteg.HvaGjelder.Required"},{erAlenesøker:x}))],onChange:()=>{d.resetField("antallBarn"),O()},children:[e.jsx(j,{value:!0,autoFocus:!0,children:e.jsx(s,{id:"OmBarnetSteg.Fødsel"})}),e.jsx(j,{value:!1,children:e.jsx(s,{id:"OmBarnetSteg.Adopsjon"})})]}),u!==void 0&&u===!0&&J&&e.jsxs(h,{header:e.jsx(s,{id:"OmBarnetSteg.Fødsel.Infoboks"}),icon:e.jsx(ke,{height:24,width:24,color:"#7F8900",fontSize:"1.5rem","aria-hidden":!0}),color:"green",children:[e.jsx(c,{children:e.jsx(s,{id:"OmBarnetSteg.Fødsel.Infoboks.DenSomErBiologiskFar"})}),e.jsx(c,{children:e.jsx(s,{id:"OmBarnetSteg.Fødsel.Infoboks.LesMer",values:{a:M=>e.jsx(ne,{href:ie.foreldrepengerFarOgFar,target:"_blank",inlineText:!0,children:M})}})})]}),u!==void 0&&e.jsxs(_,{name:"antallBarn",label:he(x,u),shouldFadeIn:!0,validate:[f(t.formatMessage({id:"OmBarnetSteg.HvorMange.Required"},{erAlenesøker:x,erFødsel:u}))],onChange:()=>{d.resetField("erBarnetFødt"),O()},children:[e.jsx(j,{value:"1",children:e.jsx(s,{id:"OmBarnetSteg.Ett"})}),e.jsx(j,{value:"2",children:u?e.jsx(s,{id:"OmBarnetSteg.Tvillinger"}):e.jsx(s,{id:"OmBarnetSteg.To"})}),e.jsx(j,{value:"3",children:e.jsx(s,{id:"OmBarnetSteg.FlereEnnTo"})})]}),u&&F&&e.jsx(Y,{hvemPlanlegger:a,erOmBarnetIkkeOppgittFraFør:r===void 0,antallBarn:F,scrollToBottom:O}),u===!1&&F&&e.jsx(z,{erAlenesøker:x,erOmBarnetIkkeOppgittFraFør:r===void 0,antallBarn:F,hvemPlanlegger:a})]}),e.jsx(je,{}),e.jsx(re,{saveDataOnPreviousClick:o,goToPreviousStep:i.goToPreviousDefaultStep,useSimplifiedTexts:!0})]})})})};ge.__docgenInfo={description:"",methods:[],displayName:"OmBarnetSteg"};export{ge as O};
