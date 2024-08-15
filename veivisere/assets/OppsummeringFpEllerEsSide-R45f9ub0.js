import{j as e}from"./tslib.es6-D_L490Ab.js";import{u as G,S as Q,h as X,a as f,I as S,d as u,c as m,l as B}from"./Infobox-DT3SIpwF.js";import{V as a,a as g,b as j,H as o,M as r,B as x,u as q}from"./Link-GGFi66nI.js";import{f as R,b as C,u as Y}from"./useScrollBehaviour-C4t3pDI_.js";import{V as Z}from"./VeiviserPage-DkA6vJaY.js";import{u as F,C as P,F as E}from"./useVeiviserNavigator-mrip5Z04.js";import{r as O}from"./index-CTjT7uj6.js";import{f as p,a as y}from"./currencyUtils-DCWwe-bG.js";import{E as c,a as M,S as $}from"./ExpansionCard-Da-o6Lxr.js";import{L as b}from"./SituasjonSide-DuJjNrFE.js";import{S as D}from"./Stroller-BCG81cRm.js";import{S as T}from"./BabyWrapped-B6HiUQLv.js";import{S as K}from"./Information-D1UldfXr.js";import{A as ee}from"./AndreVeivisereLinkPanel-C86iGU29.js";var re=function(s,n){var d={};for(var i in s)Object.prototype.hasOwnProperty.call(s,i)&&n.indexOf(i)<0&&(d[i]=s[i]);if(s!=null&&typeof Object.getOwnPropertySymbols=="function")for(var t=0,i=Object.getOwnPropertySymbols(s);t<i.length;t++)n.indexOf(i[t])<0&&Object.prototype.propertyIsEnumerable.call(s,i[t])&&(d[i[t]]=s[i[t]]);return d};const k=O.forwardRef((s,n)=>{var{title:d,titleId:i}=s,t=re(s,["title","titleId"]);let l=G();return l=d?i||"title-"+l:void 0,O.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",width:"1em",height:"1em",fill:"none",viewBox:"0 0 24 24",focusable:!1,role:"img",ref:n,"aria-labelledby":l},t),d?O.createElement("title",{id:l},d):null,O.createElement("path",{fill:"currentColor",fillRule:"evenodd",d:"M9.75 9A2.25 2.25 0 0 1 12 6.75h.172a2.078 2.078 0 0 1 1.47 3.548l-1 1a4.75 4.75 0 0 0-1.392 3.359.75.75 0 0 0 1.5 0c0-.862.342-1.689.952-2.298l1-1a3.579 3.579 0 0 0-2.53-6.109H12A3.75 3.75 0 0 0 8.25 9v.5a.75.75 0 0 0 1.5 0zM12 16.5a1 1 0 1 0 0 2 1 1 0 0 0 0-2",clipRule:"evenodd"}))}),h=({headerText:s,boxBodyText:n,erOppfylt:d,testId:i,jobberIkkeINorge:t})=>e.jsxs(a,{gap:"1","data-testid":i,children:[e.jsx(g,{size:"small",children:s}),e.jsx(j,{background:"surface-alt-3-subtle",padding:"4",borderRadius:"large",children:e.jsxs(o,{gap:"2",wrap:!1,children:[e.jsxs("div",{children:[d&&e.jsx(Q,{height:24,width:24,fontSize:"1.5rem","aria-hidden":!0,color:"#06893A"}),!d&&e.jsx(X,{height:24,width:24,fontSize:"1.5rem","aria-hidden":!0,fill:"#010B18"})]}),e.jsxs(a,{gap:"2",children:[e.jsxs(g,{size:"xsmall",children:[d&&e.jsx(r,{id:"KravinfoBoks.DuOppfyllerKravet"}),!d&&e.jsx(e.Fragment,{children:t?e.jsx(r,{id:"KravinfoBoks.DuIkkeMestSannsynligOppfyllerKravet"}):e.jsx(r,{id:"KravinfoBoks.DuIkkeOppfyllerKravet"})})]}),e.jsx(x,{children:n})]})]})})]});h.__docgenInfo={description:"",methods:[],displayName:"KravinfoBoks"};const A=({fpEllerEsSituasjon:s,grunnbeløpet:n})=>{const d=s.situasjon==="mor",i=s.borDuINorge!==void 0&&s.jobberDuINorge===!1,t="https://www.nav.no/no/person/flere-tema/arbeid-og-opphold-i-norge/relatert-informasjon/medlemskap-i-folketrygden";return e.jsxs(c,{"aria-label":"",size:"small",children:[e.jsx(c.Header,{children:e.jsxs(o,{gap:"6",align:"center",wrap:!1,children:[e.jsx(f,{size:"medium",color:"lightBlue",children:e.jsx(k,{height:24,width:24,fontSize:"1.5rem","aria-hidden":!0})}),e.jsx(c.Title,{size:"small",children:e.jsx(r,{id:"HvorforHarJegRettPanel.HvorforHarJegIkkeRettPåEs"})})]})}),e.jsx(c.Content,{children:e.jsxs(a,{gap:"5",children:[e.jsx(x,{children:e.jsx(r,{id:"HvorforHarJegRettPanel.OppfylleKravEs"})}),e.jsxs(a,{gap:"4",children:[e.jsx(h,{testId:"harIkkeRettEs",headerText:e.jsx(r,{id:"HvorforHarJegRettPanel.DuMåHaInntekt"}),boxBodyText:e.jsx(r,{id:"HvorforHarJegRettPanel.DuHarOppgittInntekt"}),erOppfylt:!!s.harHattInntekt}),e.jsx(h,{testId:"harIkkeRettEs",headerText:e.jsx(r,{id:"HvorforHarJegRettPanel.DuMåTeneOver",values:{minstelønn:p(n/2)}}),boxBodyText:e.jsx(r,{id:"HvorforHarJegRettPanel.DuHarOppgittMånedslønn",values:{månedslønn:p(s.lønnPerMåned),minstelønn:p(n/2)}}),erOppfylt:s.lønnPerMåned*12>n/2}),e.jsx(h,{testId:"harIkkeRettEs",headerText:e.jsx(r,{id:"HvorforHarJegRettPanel.DuMåVæreMedlem"}),boxBodyText:e.jsx(e.Fragment,{children:i?e.jsx(r,{id:"HvorforHarJegRettPanel.IkkeMedlem",values:{a:l=>e.jsx("a",{href:t,target:"_blank",rel:"noreferrer",children:l})}}):e.jsx(r,{id:"HvorforHarJegRettPanel.OppgittAtDuBorINorge"})}),erOppfylt:s.jobberDuINorge,jobberIkkeINorge:s.jobberDuINorge===!1&&s.borDuINorge===!1}),!d&&e.jsxs(e.Fragment,{children:[e.jsx(g,{size:"small",children:e.jsx(r,{id:"HvorforHarJegRettPanel.FarEllerMedmor"})}),e.jsx(S,{icon:e.jsx(k,{height:24,width:24,color:"#020C1CAD",fontSize:"1.5rem","aria-hidden":!0}),color:"gray",children:e.jsxs(a,{gap:"2",children:[e.jsx(x,{children:e.jsx(r,{id:"HvorforHarJegRettPanel.HvisDuErFarEllerMedmor"})}),e.jsxs(b,{as:"ul",children:[e.jsx(b.Item,{children:e.jsx(r,{id:"HvorforHarJegRettPanel.AdoptererAlene"})}),e.jsx(b.Item,{children:e.jsx(r,{id:"HvorforHarJegRettPanel.OvertarOmsorgMorDød",values:{a:l=>e.jsx("a",{href:"https://lovdata.no/dokument/NL/lov/1981-04-08-7",target:"_blank",rel:"noreferrer",children:l})}})}),e.jsx(b.Item,{children:e.jsx(r,{id:"HvorforHarJegRettPanel.OvertarOmsorgMorDødFødsel"})}),e.jsx(b.Item,{children:e.jsx(r,{id:"HvorforHarJegRettPanel.Innen56Uker"})})]}),e.jsx(x,{children:e.jsx(r,{id:"HvorforHarJegRettPanel.DersomEtAvTilfellene"})})]})})]})]})]})})]})};A.__docgenInfo={description:"",methods:[],displayName:"HvorforHarJegIkkeRettEsPanel"};const w=({fpEllerEsSituasjon:s,grunnbeløpet:n})=>{const d=s.borDuINorge!==void 0&&s.jobberDuINorge===!1,i="https://www.nav.no/no/person/flere-tema/arbeid-og-opphold-i-norge/relatert-informasjon/medlemskap-i-folketrygden";return e.jsxs(c,{"aria-label":"",size:"small",children:[e.jsx(c.Header,{children:e.jsxs(o,{gap:"6",align:"center",wrap:!1,children:[e.jsx(f,{size:"medium",color:"lightBlue",children:e.jsx(k,{height:24,width:24,fontSize:"1.5rem","aria-hidden":!0})}),e.jsx(c.Title,{size:"small",children:e.jsx(r,{id:"HvorforHarJegRettPanel.HvorforHarJegIkkeRett"})})]})}),e.jsx(c.Content,{children:e.jsxs(a,{gap:"5",children:[e.jsx(x,{children:e.jsx(r,{id:"HvorforHarJegRettPanel.OppfylleKrav"})}),e.jsxs(a,{gap:"4",children:[e.jsx(h,{testId:"harIkkeRettFp",headerText:e.jsx(r,{id:"HvorforHarJegRettPanel.DuMåHaInntekt"}),boxBodyText:e.jsx(r,{id:"HvorforHarJegRettPanel.DuHarOppgittInntekt"}),erOppfylt:!!s.harHattInntekt}),e.jsx(h,{testId:"harIkkeRettFp",headerText:e.jsx(r,{id:"HvorforHarJegRettPanel.DuMåTeneOver",values:{minstelønn:p(n/2)}}),boxBodyText:e.jsx(r,{id:"HvorforHarJegRettPanel.DuHarOppgittMånedslønn",values:{månedslønn:p(s.lønnPerMåned),minstelønn:p(n/2)}}),erOppfylt:s.lønnPerMåned*12>n/2}),e.jsx(h,{testId:"harIkkeRettFp",headerText:e.jsx(r,{id:"HvorforHarJegRettPanel.DuMåVæreMedlem"}),boxBodyText:e.jsx(e.Fragment,{children:d?e.jsx(r,{id:"HvorforHarJegRettPanel.IkkeMedlem",values:{a:t=>e.jsx("a",{href:i,target:"_blank",rel:"noreferrer",children:t})}}):e.jsx(r,{id:"HvorforHarJegRettPanel.OppgittAtDuBorINorge"})}),erOppfylt:s.jobberDuINorge,jobberIkkeINorge:s.jobberDuINorge===!1&&s.borDuINorge===!1})]})]})})]})};w.__docgenInfo={description:"",methods:[],displayName:"HvorforHarJegIkkeRettPanel"};const L=({fpEllerEsSituasjon:s,satser:n})=>{const{goToRoute:d}=F(P.FP_ELLER_ES),i=s.borDuINorge===!1&&s.jobberDuINorge===!1,t=R(n,u());return e.jsxs(e.Fragment,{children:[e.jsx(j,{background:"bg-subtle",padding:"8",borderRadius:"large",children:e.jsxs(a,{gap:"8",children:[e.jsxs(a,{gap:"8",align:"center",children:[e.jsx(D,{height:48,width:48,fontSize:"1.5rem","aria-hidden":!0,color:"#66A3C4"}),e.jsx(g,{size:"medium",align:"center",className:"m-6",children:e.jsx(r,{id:"OppsummeringFpEllerEsSide.DuHarIkkeRett"})})]}),e.jsx(j,{background:"bg-subtle",borderColor:"border-info",borderWidth:"2",padding:"4",borderRadius:"large",children:e.jsx(a,{gap:"4",children:e.jsxs(o,{gap:"8",justify:"space-between",wrap:!1,children:[e.jsx(x,{children:i?e.jsx(r,{id:"OppsummeringFpEllerEsSide.SidenDuIkkeJobberINorge"}):e.jsx(r,{id:"OppsummeringFpEllerEsSide.DuHarIkkeRett.Folketrygden"})}),e.jsx(f,{size:"medium",color:"blue",children:e.jsx(T,{height:24,width:24,color:"#236B7D",fontSize:"1.5rem","aria-hidden":!0})})]})})})]})}),e.jsxs(o,{justify:"space-around",children:[e.jsx(m,{type:"submit",variant:"secondary",children:e.jsx(r,{id:"OppsummeringFpEllerEsSide.MerOmFp"})}),e.jsx(m,{type:"submit",variant:"secondary",children:e.jsx(r,{id:"OppsummeringFpEllerEsSide.MerOmEs"})})]}),e.jsxs(a,{gap:"4",children:[e.jsx(A,{fpEllerEsSituasjon:s,grunnbeløpet:t}),e.jsx(w,{fpEllerEsSituasjon:s,grunnbeløpet:t})]}),e.jsx(o,{children:e.jsx(m,{variant:"secondary",onClick:()=>d(E.SITUASJON),icon:e.jsx(M,{"aria-hidden":!0,height:24,width:24}),children:e.jsx(r,{id:"OppsummeringFpEllerEsSide.Tilbake"})})})]})};L.__docgenInfo={description:"",methods:[],displayName:"HarIkkeRett"};const z=({fpEllerEsSituasjon:s,grunnbeløpet:n})=>{const d=s.situasjon==="mor";return e.jsxs(c,{"aria-label":"",size:"small",children:[e.jsx(c.Header,{children:e.jsxs(o,{gap:"6",align:"center",wrap:!1,children:[e.jsx(f,{size:"medium",color:"lightBlue",children:e.jsx(k,{height:24,width:24,fontSize:"1.5rem","aria-hidden":!0})}),e.jsx(c.Title,{size:"small",children:d?e.jsx(r,{id:"HvorforHarJegRettPanel.HvorforHarJegRett"}):e.jsx(r,{id:"HvorforHarJegRettPanel.HvorforKanJegHaRett"})})]})}),e.jsx(c.Content,{children:e.jsxs(a,{gap:"5",children:[e.jsx(x,{children:e.jsx(r,{id:"HvorforHarJegRettPanel.OppfylleKrav"})}),e.jsxs(a,{gap:"4",children:[e.jsx(h,{testId:"harRettFp",headerText:e.jsx(r,{id:"HvorforHarJegRettPanel.DuMåHaInntekt"}),boxBodyText:e.jsx(r,{id:"HvorforHarJegRettPanel.DuHarOppgittInntekt"}),erOppfylt:!!s.harHattInntekt}),e.jsx(h,{testId:"harRettFp",headerText:e.jsx(r,{id:"HvorforHarJegRettPanel.DuMåTeneOver",values:{minstelønn:p(n/2)}}),boxBodyText:e.jsx(r,{id:"HvorforHarJegRettPanel.DuHarOppgittMånedslønn",values:{månedslønn:p(s.lønnPerMåned),minstelønn:p(n/2)}}),erOppfylt:s.lønnPerMåned*12>n/2}),e.jsx(h,{testId:"harRettFp",headerText:e.jsx(r,{id:"HvorforHarJegRettPanel.DuMåVæreMedlem"}),boxBodyText:e.jsx(r,{id:"HvorforHarJegRettPanel.OppgittAtDuBorINorge"}),erOppfylt:s.borDuINorge||s.jobberDuINorge})]})]})})]})};z.__docgenInfo={description:"",methods:[],displayName:"HvorforHarJegRettPanel"};const N=({fpEllerEsSituasjon:s,satser:n})=>{const{goToRoute:d}=F(P.FP_ELLER_ES),i=R(n,u()),t=s.situasjon==="mor";return e.jsxs(e.Fragment,{children:[e.jsx(j,{background:"surface-alt-3-subtle",padding:"8",borderRadius:"large",children:e.jsxs(a,{gap:"8",children:[e.jsxs(a,{gap:"8",align:"center",children:[e.jsx(D,{height:48,width:48,fontSize:"1.5rem","aria-hidden":!0,color:"#66A3C4"}),e.jsx(g,{size:"medium",align:"center",className:"m-6",children:t?e.jsx(r,{id:"OppsummeringFpEllerEsSide.DuHarRett"}):e.jsx(r,{id:"OppsummeringFpEllerEsSide.DuKanHaRett"})})]}),e.jsx(j,{background:"bg-default",padding:"4",borderRadius:"large",children:e.jsxs(a,{gap:"2",children:[e.jsx(g,{size:"xsmall",children:e.jsx(r,{id:"OppsummeringFpEllerEsSide.HvaErFp"})}),e.jsxs(x,{children:[e.jsx(r,{id:"FpEllerEsForside.FpErstatte"})," ",e.jsx(r,{id:"OppsummeringFpEllerEsSide.HvaErFp.KanVelgeMellom",values:{b:l=>e.jsx("b",{children:l})}})]})]})})]})}),t&&e.jsx(S,{icon:e.jsx(K,{height:24,width:24,color:"#020C1CAD",fontSize:"1.5rem","aria-hidden":!0}),color:"gray",children:e.jsx(x,{children:e.jsx(r,{id:"OppsummeringFpEllerEsSide.KanOgsåHarRettTilEs"})})}),e.jsxs(o,{justify:"space-around",children:[e.jsx(m,{type:"submit",children:e.jsx(r,{id:"OppsummeringFpEllerEsSide.SøkOmFp"})}),e.jsx(m,{variant:"secondary",type:"submit",children:e.jsx(r,{id:"OppsummeringFpEllerEsSide.MerOmFp"})})]}),e.jsx(z,{fpEllerEsSituasjon:s,grunnbeløpet:i}),e.jsx(o,{children:e.jsx(m,{variant:"secondary",onClick:()=>d(E.SITUASJON),icon:e.jsx(M,{"aria-hidden":!0,height:24,width:24}),children:e.jsx(r,{id:"OppsummeringFpEllerEsSide.Tilbake"})})})]})};N.__docgenInfo={description:"",methods:[],displayName:"HarRett"};const _=({fpEllerEsSituasjon:s,grunnbeløpet:n})=>{const d=s.situasjon==="mor",i=n/2;return e.jsxs(c,{"aria-label":"",size:"small",children:[e.jsx(c.Header,{children:e.jsxs(o,{gap:"6",align:"center",wrap:!1,children:[e.jsx(f,{size:"medium",color:"lightBlue",children:e.jsx(k,{height:24,width:24,fontSize:"1.5rem","aria-hidden":!0})}),e.jsx(c.Title,{size:"small",children:d?e.jsx(r,{id:"HvorforHarJegRettPanel.HvorforHarJegRettPåEs"}):e.jsx(r,{id:"HvorforHarJegRettPanel.HvorforKanJegHaRettPåEs"})})]})}),e.jsx(c.Content,{children:e.jsxs(a,{gap:"5",children:[e.jsx(x,{children:e.jsx(r,{id:"HvorforHarJegRettPanel.OppfylleKravEs"})}),e.jsxs(a,{gap:"4",children:[s.harHattInntekt&&e.jsx(h,{testId:"harRettEs",headerText:e.jsx(r,{id:"HvorforHarJegRettPanel.DuMåHaInntekt"}),boxBodyText:e.jsx(r,{id:"HvorforHarJegRettPanel.DuHarOppgittInntekt"}),erOppfylt:!!s.harHattInntekt}),s.lønnPerMåned>i&&e.jsx(h,{testId:"harRettEs",headerText:e.jsx(r,{id:"HvorforHarJegRettPanel.DuMåTeneOver",values:{minstelønn:p(n/2)}}),boxBodyText:e.jsx(r,{id:"HvorforHarJegRettPanel.DuHarOppgittMånedslønn",values:{månedslønn:p(s.lønnPerMåned),minstelønn:p(n/2)}}),erOppfylt:s.lønnPerMåned*12>n/2}),(s.borDuINorge||s.jobberDuINorge)&&e.jsx(h,{testId:"harRettEs",headerText:e.jsx(r,{id:"HvorforHarJegRettPanel.DuMåVæreMedlem"}),boxBodyText:e.jsx(r,{id:"HvorforHarJegRettPanel.OppgittAtDuBorINorge"}),erOppfylt:s.borDuINorge||s.jobberDuINorge})]})]})})]})};_.__docgenInfo={description:"",methods:[],displayName:"HvorforHarJegRettEsPanel"};const V=({fpEllerEsSituasjon:s,satser:n})=>{const{goToRoute:d}=F(P.FP_ELLER_ES),i=R(n,u()),t=C(n,u()),l=s.situasjon==="mor";return e.jsxs(e.Fragment,{children:[e.jsx(j,{background:"surface-alt-3-subtle",padding:"8",borderRadius:"large",children:e.jsxs(a,{gap:"8",children:[e.jsxs(a,{gap:"8",align:"center",children:[e.jsx(D,{height:48,width:48,fontSize:"1.5rem","aria-hidden":!0,color:"#66A3C4"}),e.jsx(g,{size:"medium",align:"center",className:"m-6",children:l?e.jsx(r,{id:"OppsummeringFpEllerEsSide.DuHarRettPåEs"}):e.jsx(r,{id:"OppsummeringFpEllerEsSide.DuKanHaRettPåEs"})})]}),e.jsx(j,{background:"bg-default",padding:"4",borderRadius:"large",children:e.jsxs(a,{gap:"2",children:[e.jsx(g,{size:"xsmall",children:e.jsx(r,{id:"OppsummeringSide.HvaErEs"})}),e.jsx(x,{children:e.jsx(r,{id:"OppsummeringFpEllerEsSide.EsSkalBidra",values:{engangsstønad:y(t),b:H=>e.jsx("b",{children:H})}})})]})})]})}),e.jsxs(o,{justify:"space-around",children:[e.jsx(m,{type:"submit",children:e.jsx(r,{id:"OppsummeringFpEllerEsSide.SøkOmEs"})}),e.jsx(m,{variant:"secondary",type:"submit",children:e.jsx(r,{id:"OppsummeringFpEllerEsSide.MerOmEs"})})]}),e.jsxs(a,{gap:"4",children:[e.jsx(_,{fpEllerEsSituasjon:s,grunnbeløpet:i}),e.jsx(w,{fpEllerEsSituasjon:s,grunnbeløpet:i})]}),e.jsx(o,{children:e.jsx(m,{variant:"secondary",onClick:()=>d(E.SITUASJON),icon:e.jsx(M,{"aria-hidden":!0,height:24,width:24}),children:e.jsx(r,{id:"OppsummeringFpEllerEsSide.Tilbake"})})})]})};V.__docgenInfo={description:"",methods:[],displayName:"HarRettEs"};const U=({fpEllerEsSituasjon:s,satser:n})=>{const{goToRoute:d}=F(P.FP_ELLER_ES),i=R(n,u()),t=C(n,u());return e.jsxs(e.Fragment,{children:[e.jsx(j,{background:"surface-alt-3-subtle",padding:"8",borderRadius:"large",children:e.jsxs(a,{gap:"6",children:[e.jsxs(a,{gap:"8",align:"center",children:[e.jsx(D,{height:48,width:48,fontSize:"1.5rem","aria-hidden":!0,color:"#66A3C4"}),e.jsx(g,{size:"medium",align:"center",className:"m-6",children:e.jsx(r,{id:"OppsummeringFpEllerEsSide.DuHarRettFpEllerEs"})})]}),e.jsx(j,{background:"surface-alt-3-subtle",borderColor:"border-info",borderWidth:"2",padding:"4",borderRadius:"large",children:e.jsxs(a,{gap:"3",children:[e.jsxs(o,{justify:"space-between",children:[e.jsx(g,{size:"small",children:e.jsx(r,{id:"OppsummeringFpEllerEsSide.DuHarRettFpEllerEs.KanVelgeMellom"})}),e.jsx(f,{size:"medium",color:"blue",children:e.jsx(T,{height:24,width:24,color:"#236B7D",fontSize:"1.5rem","aria-hidden":!0})})]}),e.jsxs(a,{gap:"2",children:[e.jsx(g,{size:"xsmall",children:e.jsx(r,{id:"FpEllerEsForside.Engangsstønad"})}),e.jsx(x,{children:e.jsx(r,{id:"OppsummeringFpEllerEsSide.DuFårUtbetaltEs",values:{engangsstønad:y(t)}})})]}),e.jsxs(a,{gap:"2",children:[e.jsx(g,{size:"xsmall",children:e.jsx(r,{id:"FpEllerEsForside.Foreldrepenger"})}),e.jsx(x,{children:e.jsx(r,{id:"OppsummeringFpEllerEsSide.BasertPåSvarene",values:{utbetaling:y(s.lønnPerMåned)}})})]})]})}),e.jsxs(a,{gap:"2",children:[e.jsx(j,{background:"bg-default",padding:"4",borderRadius:"large",children:e.jsxs(a,{gap:"2",children:[e.jsx(g,{size:"xsmall",children:e.jsx(r,{id:"OppsummeringFpEllerEsSide.HvaErFp"})}),e.jsxs(x,{children:[e.jsx(r,{id:"FpEllerEsForside.FpErstatte"})," ",e.jsx(r,{id:"OppsummeringFpEllerEsSide.HvaErFp.KanVelgeMellom",values:{b:l=>e.jsx("b",{children:l})}})]})]})}),e.jsx(j,{background:"bg-default",padding:"4",borderRadius:"large",children:e.jsxs(a,{gap:"2",children:[e.jsx(g,{size:"xsmall",children:e.jsx(r,{id:"OppsummeringSide.HvaErEs"})}),e.jsx(x,{children:e.jsx(r,{id:"OppsummeringFpEllerEsSide.EsSkalBidra",values:{engangsstønad:y(t),b:l=>e.jsx("b",{children:l})}})})]})})]})]})}),e.jsx(S,{icon:e.jsx(K,{height:24,width:24,color:"#020C1CAD",fontSize:"1.5rem","aria-hidden":!0}),color:"gray",children:e.jsx(x,{children:e.jsx(r,{id:"OppsummeringFpEllerEsSide.KanOgsåHarRettTilEs"})})}),e.jsxs(o,{justify:"space-around",children:[e.jsx(m,{type:"submit",children:e.jsx(r,{id:"OppsummeringFpEllerEsSide.SøkOmFp"})}),e.jsx(m,{variant:"secondary",type:"submit",children:e.jsx(r,{id:"OppsummeringFpEllerEsSide.MerOmFp"})})]}),e.jsxs(a,{gap:"4",children:[e.jsx(z,{fpEllerEsSituasjon:s,grunnbeløpet:i}),e.jsx(_,{fpEllerEsSituasjon:s,grunnbeløpet:i})]}),e.jsx(o,{children:e.jsx(m,{variant:"secondary",onClick:()=>d(E.SITUASJON),icon:e.jsx(M,{"aria-hidden":!0,height:24,width:24}),children:e.jsx(r,{id:"OppsummeringFpEllerEsSide.Tilbake"})})})]})};U.__docgenInfo={description:"",methods:[],displayName:"HarRettFpEllerEs"};const W=()=>e.jsx(ee,{links:[{url:B.veiviser,content:e.jsxs(o,{gap:"5",align:"center",wrap:!1,children:[e.jsx(T,{"aria-hidden":!0,height:45,width:45}),e.jsx(g,{level:"3",size:"small",children:e.jsx(r,{id:"HvorMyeOgHvaSkjerNåLinkPanel.HvorMye"})})]})},{url:B.hvaSkjerNår,content:e.jsxs(o,{gap:"5",align:"center",wrap:!1,children:[e.jsx($,{"aria-hidden":!0,height:45,width:45}),e.jsx(g,{level:"3",size:"small",children:e.jsx(r,{id:"HvorMyeOgHvaSkjerNåLinkPanel.HvaSkjer"})})]})}]});W.__docgenInfo={description:"",methods:[],displayName:"HvorMyeOgHvaSkjerNåLinkPanel"};const se=(s,n)=>{const i=R(n,u())/2,{situasjon:t,lønnPerMåned:l,borDuINorge:H,jobberDuINorge:I}=s,J=l*12>=2e5,v=l*12>=i;return t==="mor"&&J&&v&&(H||I)?"morTjener200000EllerMerOgHarRett":t==="mor"&&!J&&v&&(H||I)?"morTjenerUnder200000OgKanHaRettFpEllerEs":t!=="mor"&&v&&(H||I)?"farEllerMedmorKanHaRettFp":t==="mor"&&(!J&&!v||v)&&(H||I)?"morHarRettEs":"harIkkeRett"},ne=({fpEllerEsSituasjon:s,satser:n})=>{const d=q(),{ref:i}=Y(),t=se(s,n),l=s.situasjon!=="mor";return console.log(l),e.jsxs(e.Fragment,{children:[e.jsx(Z,{ref:i,label:d.formatMessage({id:"OppsummeringFpEllerEsSide.Oppsummering"}),children:e.jsxs(a,{gap:"8",children:[t==="morTjener200000EllerMerOgHarRett"&&e.jsx(N,{fpEllerEsSituasjon:s,satser:n}),t==="farEllerMedmorKanHaRettFp"&&e.jsx(N,{fpEllerEsSituasjon:s,satser:n}),t==="morTjenerUnder200000OgKanHaRettFpEllerEs"&&e.jsx(U,{fpEllerEsSituasjon:s,satser:n}),t==="morHarRettEs"&&e.jsx(V,{fpEllerEsSituasjon:s,satser:n}),t==="harIkkeRett"&&e.jsx(L,{fpEllerEsSituasjon:s,satser:n})]})}),e.jsx(W,{})]})};ne.__docgenInfo={description:"",methods:[],displayName:"OppsummeringFpEllerEsSide"};export{ne as O};
