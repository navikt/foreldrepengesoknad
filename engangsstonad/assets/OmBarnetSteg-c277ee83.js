import{u as P,j as e}from"./index-b829706d.js";import{V as O,d as u,e as i,m as A,o as _,F as n,p as k,q as R,r as N,s as I,u as q,a as w,b,C as x,c as T,n as C,S as V,P as M}from"./useEsNavigator-ae9c7adf.js";import{b as y,c as L,D as v,R as F,a as d,d as E,u as G,F as K,E as J,S as U}from"./ErrorSummaryHookForm-5e019214.js";import{r as H}from"./index-f1f2c4b1.js";const $=(a,s)=>{const t={...a};return delete t[s],t},B=({adopsjonsdato:a,antallBarn:s,antallBarnDropDown:t})=>{const l=P(),{control:m}=y(),{fields:o,remove:c,append:f}=L({control:m,name:"fødselsdatoer"});return H.useEffect(()=>{if(!s||s===3&&!t)return;const r=s<3||!t?s:Number.parseInt(t,10),p=o.length-r;p>0&&[...new Array(p)].forEach((j,h)=>{c(o.length-h-1)}),p<0&&[...new Array(r-o.length)].forEach(()=>{f({dato:void 0})})},[s,t,f,o.length,c]),e.jsx(O,{gap:"10",children:o.map((r,p)=>e.jsx(v,{name:`fødselsdatoer.${p}.dato`,minDate:u().subtract(15,"year").toDate(),maxDate:u().toDate(),label:o.length===1?l.formatMessage({id:"AdopsjonFodselFieldArray.Fødselsdato"}):l.formatMessage({id:`AdopsjonFodselFieldArray.Spørsmål.Fødselsdato.${p+1}`}),validate:[i(l.formatMessage({id:"AdopsjonFodselFieldArray.Fodselsdato.DuMåOppgi"})),A(l.formatMessage({id:"AdopsjonFodselFieldArray.Fødselsdato.Gyldig"})),j=>!j||!a?void 0:_(l.formatMessage({id:"AdopsjonFodselFieldArray.fodselsdato.MåVæreIdagEllerTidligere"}))(j)]},r.id))})};try{B.displayName="AdopsjonFodselFieldArray",B.__docgenInfo={description:"",displayName:"AdopsjonFodselFieldArray",props:{antallBarn:{defaultValue:null,description:"",name:"antallBarn",required:!1,type:{name:"number"}},antallBarnDropDown:{defaultValue:null,description:"",name:"antallBarnDropDown",required:!1,type:{name:"string"}},adopsjonsdato:{defaultValue:null,description:"",name:"adopsjonsdato",required:!1,type:{name:"string"}}}}}catch{}const S=({kjønn:a})=>{const s=P(),{watch:t}=y(),{adopsjonAvEktefellesBarn:l,adopsjonsdato:m,antallBarn:o,antallBarnDropDown:c}=t();return e.jsxs(e.Fragment,{children:[e.jsxs(F,{name:"adopsjonAvEktefellesBarn",label:e.jsx(n,{id:"AdopsjonPanel.Spørsmål.Stebarnsadopsjon"}),validate:[i(s.formatMessage({id:"AdopsjonPanel.Spørsmål.Required"}))],children:[e.jsx(d,{value:!0,children:e.jsx(n,{id:"AdopsjonPanel.Ja"})}),e.jsx(d,{value:!1,children:e.jsx(n,{id:"AdopsjonPanel.Nei"})})]}),e.jsx(v,{name:"adopsjonsdato",label:l?s.formatMessage({id:"AdopsjonPanel.Spørsmål.Stebarnsadopsjondato"}):s.formatMessage({id:"AdopsjonPanel.Spørsmål.Overtaomsorgdato"}),minDate:u().subtract(6,"month").toDate(),validate:[i(l?s.formatMessage({id:"AdopsjonPanel.EktefellensBarn.DuMåOppgi"}):s.formatMessage({id:"AdopsjonPanel.OvertaOmsorg.DuMåOppgi"})),A(l?s.formatMessage({id:"AdopsjonPanel.Adopsjonsdato.GyldigFormat"}):s.formatMessage({id:"AdopsjonPanel.Omsorgsovertakelsen.GyldigFormat"})),k(s.formatMessage({id:"AdopsjonPanel.AdopsjonDato.ForLangtFremITid"}))]}),e.jsxs(F,{name:"antallBarn",label:e.jsx(n,{id:"AdopsjonPanel.Spørsmål.AntallBarnAdoptert"}),description:e.jsx(n,{id:"AdopsjonPanel.Spørsmål.AntallBarnAdoptert.Beskrivelse"}),validate:[i(s.formatMessage({id:"AdopsjonPanel.Antallbarn.Required"}))],children:[e.jsx(d,{value:1,children:e.jsx(n,{id:"AdopsjonPanel.Radiobutton.Ettbarn"})}),e.jsx(d,{value:2,children:e.jsx(n,{id:"AdopsjonPanel.Radiobutton.ToBarn"})}),e.jsx(d,{value:3,children:e.jsx(n,{id:"AdopsjonPanel.Radiobutton.Flere"})})]}),o&&o>=3&&e.jsxs(E,{name:"antallBarnDropDown",label:e.jsx(n,{id:"AdopsjonPanel.AntallBarn.Omsorgsovertakelse"}),validate:[i(s.formatMessage({id:"AdopsjonPanel.Antallbarndropdown.Required"}))],children:[e.jsx("option",{value:"3",children:"3"}),e.jsx("option",{value:"4",children:"4"}),e.jsx("option",{value:"5",children:"5"}),e.jsx("option",{value:"6",children:"6"}),e.jsx("option",{value:"7",children:"7"}),e.jsx("option",{value:"8",children:"8"}),e.jsx("option",{value:"9",children:"9"})]}),e.jsx(B,{adopsjonsdato:m,antallBarn:o,antallBarnDropDown:c}),a==="M"&&l===!1&&e.jsxs(F,{name:"søkerAdopsjonAlene",label:e.jsx(n,{id:"AdopsjonPanel.Spørsmål.AdoptererDuAlene"}),validate:[i(s.formatMessage({id:"AdopsjonPanel.AdoptererDuAlene.Required"}))],children:[e.jsx(d,{value:!0,children:e.jsx(n,{id:"AdopsjonPanel.Ja"})}),e.jsx(d,{value:!1,children:e.jsx(n,{id:"AdopsjonPanel.Nei"})})]})]})};try{S.displayName="AdopsjonPanel",S.__docgenInfo={description:"",displayName:"AdopsjonPanel",props:{kjønn:{defaultValue:null,description:"",name:"kjønn",required:!0,type:{name:"enum",value:[{value:'"M"'},{value:'"K"'}]}}}}}catch{}const W=()=>{const a=P(),{watch:s}=y(),t=s("erBarnetFødt"),l=s("antallBarn");return e.jsxs(e.Fragment,{children:[e.jsxs(F,{name:"erBarnetFødt",label:e.jsx(n,{id:"FødselPanel.Spørsmål.ErBarnetFødt"}),validate:[i(a.formatMessage({id:"FødselPanel.Spørsmål.ErBarnetFødt.Required"}))],children:[e.jsx(d,{value:!0,children:e.jsx(n,{id:"FødselPanel.Radiobutton.Ja"})}),e.jsx(d,{value:!1,children:e.jsx(n,{id:"FødselPanel.Radiobutton.Nei"})})]}),t&&e.jsx(v,{name:"fødselsdato",label:e.jsx(n,{id:"FødselPanel.Fødselsdato"}),description:a.formatMessage({id:"FødselPanel.TermindatoFodselsdato.beskrivelse"}),minDate:u().subtract(6,"month").toDate(),maxDate:u().toDate(),validate:[i(a.formatMessage({id:"FødselPanel.Fødselsdato.DuMåOppgi"})),A(a.formatMessage({id:"FødselPanel.Fødselsdato.Gyldig"})),_(a.formatMessage({id:"FødselPanel.Fodselsdato.MåVæreIdagEllerTidligere"})),R(a.formatMessage({id:"FødselPanel.Fodselsdato.IkkeMerEnn6MånederTilbake"}))]}),!t&&e.jsx(v,{name:"termindato",label:e.jsx(n,{id:"FødselPanel.Termindato"}),description:a.formatMessage({id:"FødselPanel.TermindatoFodselsdato.beskrivelse"}),minDate:u().subtract(3,"week").toDate(),maxDate:u().add(18,"weeks").add(3,"days").toDate(),validate:[i(a.formatMessage({id:"FødselPanel.Termindato.DuMåOppgi"})),A(a.formatMessage({id:"FødselPanel.Termindato.Gyldig"})),N(a.formatMessage({id:"FødselPanel.Termindato.TermindatoKanIkkeVære3UkerFraIdag"})),I(a.formatMessage({id:"FødselPanel.Termindato.DuMåVæreIUke22"}))]}),e.jsxs(F,{name:"antallBarn",label:t?a.formatMessage({id:"FødselPanel.AntallBarn.Født"}):a.formatMessage({id:"FødselPanel.AntallBarn.Termin"}),description:a.formatMessage({id:"FødselPanel.AntallBarn.TerminBeskrivelse"}),validate:[i(t?a.formatMessage({id:"FødselPanel.AntallBarn.Født.Required"}):a.formatMessage({id:"FødselPanel.AntallBarn.Venter.Required"}))],children:[e.jsx(d,{value:1,children:e.jsx(n,{id:"FødselPanel.Radiobutton.Ettbarn"})}),e.jsx(d,{value:2,children:e.jsx(n,{id:"FødselPanel.Radiobutton.Tvillinger"})}),e.jsx(d,{value:3,children:e.jsx(n,{id:"FødselPanel.Radiobutton.Flere"})})]}),l>=3&&e.jsxs(E,{name:"antallBarnDropDown",label:t?a.formatMessage({id:"FødselPanel.AntallBarn.Født"}):a.formatMessage({id:"FødselPanel.AntallBarn.Termin"}),validate:[i(t?a.formatMessage({id:"FødselPanel.AntallBarn.Født.Required"}):a.formatMessage({id:"FødselPanel.AntallBarn.Venter.Required"}))],children:[e.jsx("option",{value:"3",children:"3"}),e.jsx("option",{value:"4",children:"4"}),e.jsx("option",{value:"5",children:"5"}),e.jsx("option",{value:"6",children:"6"}),e.jsx("option",{value:"7",children:"7"}),e.jsx("option",{value:"8",children:"8"}),e.jsx("option",{value:"9",children:"9"})]})]})};try{FdselPanel.displayName="FdselPanel",FdselPanel.__docgenInfo={description:"",displayName:"FdselPanel",props:{}}}catch{}const Y=(a,s)=>s.situasjon==="adopsjon"?M.ADOPSJONSBEKREFTELSE:a.erBarnetFødt===!1?M.TERMINBEKREFTELSE:M.UTENLANDSOPPHOLD,z=a=>({...$(a,"antallBarnDropDown"),antallBarn:a.antallBarn>2&&a.antallBarnDropDown?Number.parseInt(a.antallBarnDropDown,10):a.antallBarn}),Q=a=>({...a,antallBarn:a.antallBarn>2?3:a.antallBarn,antallBarnDropDown:a.antallBarn>2?a.antallBarn.toString():void 0}),D=({kjønn:a,mellomlagreOgNaviger:s})=>{const t=P(),l=q(),m=w(s),o=b(x.OM_BARNET),c=T(x.OM_BARNET),f=T(x.DOKUMENTASJON),r=C(b(x.SØKERSITUASJON)),p=g=>c(z(g)),j=g=>(p(g),g.erBarnetFødt===!0&&f(void 0),m.goToNextStep(Y(g,r))),h=G({defaultValues:o?Q(o):{}});return e.jsx(V,{bannerTitle:t.formatMessage({id:"Søknad.Pageheading"}),onCancel:m.avbrytSøknad,onContinueLater:m.fortsettSøknadSenere,steps:l,children:e.jsx(K,{formMethods:h,onSubmit:j,children:e.jsxs(O,{gap:"10",children:[e.jsx(J,{}),(r==null?void 0:r.situasjon)==="adopsjon"&&e.jsx(S,{kjønn:a}),(r==null?void 0:r.situasjon)==="fødsel"&&e.jsx(W,{}),e.jsx(U,{goToPreviousStep:m.goToPreviousDefaultStep,saveDataOnPreviousClick:p})]})})})},se=D;try{D.displayName="OmBarnetSteg",D.__docgenInfo={description:"",displayName:"OmBarnetSteg",props:{kjønn:{defaultValue:null,description:"",name:"kjønn",required:!0,type:{name:"enum",value:[{value:'"M"'},{value:'"K"'}]}},mellomlagreOgNaviger:{defaultValue:null,description:"",name:"mellomlagreOgNaviger",required:!0,type:{name:"() => Promise<void>"}}}}}catch{}export{se as O};
