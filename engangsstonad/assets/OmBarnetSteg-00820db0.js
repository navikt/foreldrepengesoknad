import{j as e}from"./jsx-runtime-69eee039.js";import{r as T}from"./index-7c191284.js";import{a as E,R as A,D as P,b as _,c as N,u as M,F as I,E as q,S as w}from"./ErrorSummaryHookForm-0035e3d6.js";import{u as h,F as s,R as r,j as c,V as k,g as V}from"./IntlProvider-850d6775.js";import"./_baseToString-8992fead.js";import"./_createSet-409f46e6.js";import{i as d,g,p as R,q as J,r as K,s as L,t as C,a as G,u as U,b,E as v,c as O,o as H,P as S}from"./useEsNavigator-6dd7003a.js";import{S as D}from"./Søkersituasjon-b1a475fe.js";const $=(a,n)=>{const l={...a};return delete l[n],l},W=()=>{const{i18n:a}=h(),{watch:n}=E(),l=n("erBarnetFødt"),t=n("antallBarn");return e.jsxs(e.Fragment,{children:[e.jsxs(A,{name:"erBarnetFødt",label:e.jsx(s,{id:"FødselPanel.Spørsmål.ErBarnetFødt"}),validate:[d(a("FødselPanel.Spørsmål.ErBarnetFødt.Required"))],children:[e.jsx(r,{value:!0,children:e.jsx(s,{id:"FødselPanel.Radiobutton.Ja"})}),e.jsx(r,{value:!1,children:e.jsx(s,{id:"FødselPanel.Radiobutton.Nei"})})]}),l&&e.jsx(P,{name:"fødselsdatoer.0",label:e.jsx(s,{id:"FødselPanel.Fødselsdato"}),minDate:c().subtract(6,"month").toDate(),maxDate:c().toDate(),validate:[d(a("FødselPanel.Fødselsdato.DuMåOppgi")),g(a("FødselPanel.Fødselsdato.Gyldig")),R(a("FødselPanel.Fodselsdato.MåVæreIdagEllerTidligere")),J(a("FødselPanel.Fodselsdato.IkkeMerEnn6MånederTilbake"))]}),!l&&e.jsx(P,{name:"termindato",label:e.jsx(s,{id:"FødselPanel.Termindato"}),minDate:c().subtract(3,"week").toDate(),maxDate:c().add(18,"weeks").add(3,"days").toDate(),validate:[d(a("FødselPanel.Termindato.DuMåOppgi")),g(a("FødselPanel.Termindato.Gyldig")),K(a("FødselPanel.Termindato.TermindatoKanIkkeVære3UkerFraIdag")),L(a("FødselPanel.Termindato.DuMåVæreIUke22"))]}),e.jsxs(A,{name:"antallBarn",label:a(l?"FødselPanel.AntallBarn.Født":"FødselPanel.AntallBarn.Termin"),validate:[d(a(l?"FødselPanel.AntallBarn.Født.Required":"FødselPanel.AntallBarn.Venter.Required"))],children:[e.jsx(r,{value:1,children:e.jsx(s,{id:"FødselPanel.Radiobutton.Ettbarn"})}),e.jsx(r,{value:2,children:e.jsx(s,{id:"FødselPanel.Radiobutton.Tvillinger"})}),e.jsx(r,{value:3,children:e.jsx(s,{id:"FødselPanel.Radiobutton.Flere"})})]}),t>=3&&e.jsxs(_,{name:"antallBarnDropDown",label:a(l?"FødselPanel.AntallBarn.Født":"FødselPanel.AntallBarn.Termin"),validate:[d(a(l?"FødselPanel.AntallBarn.Født.Required":"FødselPanel.AntallBarn.Venter.Required"))],children:[e.jsx("option",{value:"3",children:"3"}),e.jsx("option",{value:"4",children:"4"}),e.jsx("option",{value:"5",children:"5"}),e.jsx("option",{value:"6",children:"6"}),e.jsx("option",{value:"7",children:"7"}),e.jsx("option",{value:"8",children:"8"}),e.jsx("option",{value:"9",children:"9"})]})]})};try{FdselPanel.displayName="FdselPanel",FdselPanel.__docgenInfo={description:"",displayName:"FdselPanel",props:{}}}catch{}const y=({adopsjonsdato:a,antallBarn:n,antallBarnDropDown:l})=>{const{i18n:t}=h(),{control:m}=E(),{fields:o,remove:F,append:i}=N({control:m,name:"fødselsdatoer"});return T.useEffect(()=>{if(!n||n===3&&!l)return;const j=n<3||!l?n:Number.parseInt(l,10),u=o.length-j;u>0&&[...new Array(u)].forEach((p,x)=>{F(o.length-x-1)}),u<0&&[...new Array(j-o.length)].forEach(()=>{i({dato:void 0})})},[n,l]),e.jsx(k,{gap:"10",children:o.map((j,u)=>e.jsx(P,{name:`fødselsdatoer.${u}.dato`,minDate:c().subtract(15,"year").toDate(),maxDate:c().toDate(),label:o.length===1?t("AdopsjonFodselFieldArray.Fødselsdato"):t(`AdopsjonFodselFieldArray.Spørsmål.Fødselsdato.${u+1}`),validate:[d(t("AdopsjonFodselFieldArray.Fodselsdato.DuMåOppgi")),g(t("AdopsjonFodselFieldArray.Fødselsdato.Gyldig")),p=>!p||!a?void 0:R(t("AdopsjonFodselFieldArray.fodselsdato.MåVæreIdagEllerTidligere"))(p)]},j.id))})};try{y.displayName="AdopsjonFodselFieldArray",y.__docgenInfo={description:"",displayName:"AdopsjonFodselFieldArray",props:{antallBarn:{defaultValue:null,description:"",name:"antallBarn",required:!1,type:{name:"number"}},antallBarnDropDown:{defaultValue:null,description:"",name:"antallBarnDropDown",required:!1,type:{name:"string"}},adopsjonsdato:{defaultValue:null,description:"",name:"adopsjonsdato",required:!1,type:{name:"string"}}}}}catch{}const B=({kjønn:a})=>{const{i18n:n}=h(),{watch:l}=E(),{adopsjonAvEktefellesBarn:t,adopsjonsdato:m,antallBarn:o,antallBarnDropDown:F}=l();return e.jsxs(e.Fragment,{children:[e.jsxs(A,{name:"adopsjonAvEktefellesBarn",label:e.jsx(s,{id:"AdopsjonPanel.Spørsmål.Stebarnsadopsjon"}),validate:[d(n("AdopsjonPanel.Spørsmål.Required"))],children:[e.jsx(r,{value:!0,children:e.jsx(s,{id:"AdopsjonPanel.Ja"})}),e.jsx(r,{value:!1,children:e.jsx(s,{id:"AdopsjonPanel.Nei"})})]}),e.jsx(P,{name:"adopsjonsdato",label:n(t?"AdopsjonPanel.Spørsmål.Stebarnsadopsjondato":"AdopsjonPanel.Spørsmål.Overtaomsorgdato"),minDate:c().subtract(6,"month").toDate(),validate:[d(n(t?"AdopsjonPanel.EktefellensBarn.DuMåOppgi":"AdopsjonPanel.OvertaOmsorg.DuMåOppgi")),g(n(t?"AdopsjonPanel.Adopsjonsdato.GyldigFormat":"AdopsjonPanel.Omsorgsovertakelsen.GyldigFormat")),C(n("AdopsjonPanel.AdopsjonDato.ForLangtFremITid"))]}),e.jsxs(A,{name:"antallBarn",label:e.jsx(s,{id:"AdopsjonPanel.Spørsmål.AntallBarnAdoptert"}),description:e.jsx(s,{id:"AdopsjonPanel.Spørsmål.AntallBarnAdoptert.Beskrivelse"}),validate:[d(n("AdopsjonPanel.Antallbarn.Required"))],children:[e.jsx(r,{value:1,children:e.jsx(s,{id:"AdopsjonPanel.Radiobutton.Ettbarn"})}),e.jsx(r,{value:2,children:e.jsx(s,{id:"AdopsjonPanel.Radiobutton.ToBarn"})}),e.jsx(r,{value:3,children:e.jsx(s,{id:"AdopsjonPanel.Radiobutton.Flere"})})]}),o&&o>=3&&e.jsxs(_,{name:"antallBarnDropDown",label:e.jsx(s,{id:"AdopsjonPanel.AntallBarn.Omsorgsovertakelse"}),validate:[d(n("AdopsjonPanel.Antallbarndropdown.Required"))],children:[e.jsx("option",{value:"3",children:"3"}),e.jsx("option",{value:"4",children:"4"}),e.jsx("option",{value:"5",children:"5"}),e.jsx("option",{value:"6",children:"6"}),e.jsx("option",{value:"7",children:"7"}),e.jsx("option",{value:"8",children:"8"}),e.jsx("option",{value:"9",children:"9"})]}),e.jsx(y,{adopsjonsdato:m,antallBarn:o,antallBarnDropDown:F}),a==="M"&&t===!1&&e.jsxs(A,{name:"søkerAdopsjonAlene",label:e.jsx(s,{id:"AdopsjonPanel.Spørsmål.AdoptererDuAlene"}),validate:[d(n("AdopsjonPanel.AdoptererDuAlene.Required"))],children:[e.jsx(r,{value:!0,children:e.jsx(s,{id:"AdopsjonPanel.Ja"})}),e.jsx(r,{value:!1,children:e.jsx(s,{id:"AdopsjonPanel.Nei"})})]})]})};try{B.displayName="AdopsjonPanel",B.__docgenInfo={description:"",displayName:"AdopsjonPanel",props:{kjønn:{defaultValue:null,description:"",name:"kjønn",required:!0,type:{name:"enum",value:[{value:'"M"'},{value:'"K"'}]}}}}}catch{}const Y=(a,n)=>n.situasjon===D.ADOPSJON?S.ADOPSJONSBEKREFTELSE:a.erBarnetFødt===!1?S.TERMINBEKREFTELSE:S.UTENLANDSOPPHOLD,f=({kjønn:a})=>{const{i18n:n}=h(),l=G(),t=U(),m=b(v.OM_BARNET),o=O(v.OM_BARNET),F=O(v.DOKUMENTASJON),i=H(b(v.SØKERSITUASJON)),j=T.useCallback(p=>{const{antallBarnDropDown:x}=p;o({...$(p,"antallBarnDropDown"),antallBarn:x?Number.parseInt(x,10):p.antallBarn}),p.erBarnetFødt===!0&&F(void 0),t.goToNextStep(Y(p,i))},[]),u=M({defaultValues:m});return e.jsx(V,{bannerTitle:n("Søknad.Pageheading"),pageTitle:n("OmBarnetSteg.OmBarnet"),onCancel:t.avbrytSøknad,steps:l.stepConfig,activeStepId:l.activeStepId,useNoTempSavingText:!0,children:e.jsx(I,{formMethods:u,onSubmit:j,children:e.jsxs(k,{gap:"10",children:[e.jsx(q,{}),(i==null?void 0:i.situasjon)===D.ADOPSJON&&e.jsx(B,{kjønn:a}),(i==null?void 0:i.situasjon)===D.FØDSEL&&e.jsx(W,{}),e.jsx(w,{goToPreviousStep:t.goToPreviousDefaultStep,saveDataOnPreviousClick:o})]})})})},le=f;try{f.displayName="OmBarnetSteg",f.__docgenInfo={description:"",displayName:"OmBarnetSteg",props:{kjønn:{defaultValue:null,description:"",name:"kjønn",required:!0,type:{name:"enum",value:[{value:'"M"'},{value:'"K"'}]}}}}}catch{}export{le as O};
//# sourceMappingURL=OmBarnetSteg-00820db0.js.map