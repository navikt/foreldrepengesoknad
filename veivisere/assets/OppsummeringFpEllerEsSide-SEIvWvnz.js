import{j as e}from"./tslib.es6-D_L490Ab.js";import{V as i,a as c,b as v,H as x,M as r,B as h,L as k,u as Q}from"./Link-D5ZPm6Rv.js";import{a as y,f as I,d as K,b as X}from"./satserUtils-DuOe4M1u.js";import{u as q}from"./useScrollBehaviour-R9CMo-2c.js";import{V as Y}from"./VeiviserPage-CiYu_n9m.js";import{u as P,C as M,F as J}from"./useVeiviserNavigator-Bn71U7Xz.js";import{S as Z,j as $,a as E,l as H,I as T,b as m}from"./Infobox-BWTFR4k9.js";import"./index-CTjT7uj6.js";import{f as u,a as S}from"./currencyUtils-Cbm1oTt-.js";import{E as j}from"./ExpansionCard-BwQTG8ov.js";import{S as O}from"./Questionmark-DLRenP_O.js";import{L as F}from"./SituasjonSide-BoT1SJvs.js";import{S as D}from"./Stroller-Bk-fF6hu.js";import{S as z}from"./BabyWrapped-CYOXZaPO.js";import{d as N}from"./NumericField-CmsTZLxU.js";import{S as C}from"./Information-BUhGXA3a.js";import{A as ee}from"./AndreVeivisereLinkPanel-B0XCaAIi.js";import{S as re}from"./MagnifyingGlass-BQs82zjI.js";const f=({headerText:n,boxBodyText:l,erOppfylt:a,testId:t,jobberINorge:s})=>e.jsxs(i,{gap:"1","data-testid":t,children:[e.jsx(c,{size:"small",children:n}),e.jsx(v,{background:"surface-alt-3-subtle",padding:"4",borderRadius:"large",children:e.jsxs(x,{gap:"2",wrap:!1,children:[e.jsxs("div",{children:[a&&e.jsx(Z,{height:24,width:24,fontSize:"1.5rem","aria-hidden":!0,color:"#06893A"}),!a&&e.jsx($,{height:24,width:24,fontSize:"1.5rem","aria-hidden":!0,fill:"#010B18"})]}),e.jsxs(i,{gap:"2",children:[e.jsxs(c,{size:"xsmall",children:[a&&e.jsx(r,{id:"KravinfoBoks.DuOppfyllerKravet"}),!a&&e.jsx(e.Fragment,{children:s!==void 0&&s===!1?e.jsx(r,{id:"KravinfoBoks.DuIkkeMestSannsynligOppfyllerKravet"}):e.jsx(r,{id:"KravinfoBoks.DuIkkeOppfyllerKravet"})})]}),e.jsx(h,{children:l})]})]})})]});f.__docgenInfo={description:"",methods:[],displayName:"KravinfoBoks"};const L=({fpEllerEsSituasjon:n,grunnbeløpet:l})=>{const{borDuINorge:a,jobberDuINorge:t,lønnPerMåned:s,harHattInntekt:o}=n,d=l/2,g=y(s)?Number(s)*12:0,p=o&&(a||t);return e.jsxs(j,{"aria-label":"",size:"small",children:[e.jsx(j.Header,{children:e.jsxs(x,{gap:"6",align:"center",wrap:!1,children:[e.jsx(E,{size:"medium",color:"lightBlue",children:e.jsx(O,{height:24,width:24,fontSize:"1.5rem","aria-hidden":!0})}),e.jsx(j.Title,{size:"small",children:e.jsx(r,{id:"HvorforHarJegRettPanel.HvorforHarJegIkkeRettPåEs"})})]})}),e.jsx(j.Content,{children:e.jsxs(i,{gap:"5",children:[e.jsx(h,{children:e.jsx(r,{id:"HvorforHarJegRettPanel.OppfylleKravEs",values:{erFlereKrav:p}})}),e.jsxs(i,{gap:"4",children:[e.jsx(f,{testId:"harIkkeRettEs",headerText:e.jsx(r,{id:"HvorforHarJegRettPanel.DuMåHaInntekt"}),boxBodyText:e.jsx(r,{id:"HvorforHarJegRettPanel.DuHarOppgittInntekt",values:{harHatt:o}}),erOppfylt:!!o}),e.jsx(f,{testId:"harIkkeRettEs",headerText:e.jsx(r,{id:"HvorforHarJegRettPanel.DuMåTeneOver",values:{minstelønn:u(d)}}),boxBodyText:e.jsx(r,{id:"HvorforHarJegRettPanel.DuHarOppgittMånedslønn",values:{månedslønn:u(s),minstelønn:u(d),hvorMye:g>d}}),erOppfylt:g>d}),e.jsx(f,{testId:"harIkkeRettEs",headerText:e.jsx(r,{id:"HvorforHarJegRettPanel.DuMåVæreMedlem"}),boxBodyText:e.jsx(e.Fragment,{children:a===!1&&t===!1?e.jsx(r,{id:"HvorforHarJegRettPanel.IkkeMedlem",values:{a:b=>e.jsx("a",{href:H.folketrygden,target:"_blank",rel:"noreferrer",children:b})}}):e.jsx(r,{id:"HvorforHarJegRettPanel.OppgittAtDuBorINorge",values:{borINorge:a}})}),erOppfylt:t||a,jobberINorge:t}),n.situasjon!=="mor"&&e.jsxs(e.Fragment,{children:[e.jsx(c,{size:"small",children:e.jsx(r,{id:"HvorforHarJegRettPanel.FarEllerMedmor"})}),e.jsx(T,{icon:e.jsx(O,{height:24,width:24,color:"#020C1CAD",fontSize:"1.5rem","aria-hidden":!0}),color:"gray",children:e.jsxs(i,{gap:"2",children:[e.jsx(h,{children:e.jsx(r,{id:"HvorforHarJegRettPanel.HvisDuErFarEllerMedmor"})}),e.jsxs(F,{as:"ul",children:[e.jsx(F.Item,{children:e.jsx(r,{id:"HvorforHarJegRettPanel.AdoptererAlene"})}),e.jsx(F.Item,{children:e.jsx(r,{id:"HvorforHarJegRettPanel.OvertarOmsorgMorDød",values:{a:b=>e.jsx("a",{href:"https://lovdata.no/dokument/NL/lov/1981-04-08-7",target:"_blank",rel:"noreferrer",children:b})}})}),e.jsx(F.Item,{children:e.jsx(r,{id:"HvorforHarJegRettPanel.OvertarOmsorgMorDødFødsel"})}),e.jsx(F.Item,{children:e.jsx(r,{id:"HvorforHarJegRettPanel.Innen56Uker"})})]}),e.jsx(h,{children:e.jsx(r,{id:"HvorforHarJegRettPanel.DersomEtAvTilfellene"})})]})})]})]})]})})]})};L.__docgenInfo={description:"",methods:[],displayName:"HvorforHarJegIkkeRettEsPanel"};const _=({fpEllerEsSituasjon:n,grunnbeløpet:l})=>{const{borDuINorge:a,jobberDuINorge:t,lønnPerMåned:s,harHattInntekt:o}=n,d=l/2,g=y(s)?Number(s)*12:0,p=o&&(a||t);return e.jsxs(j,{"aria-label":"",size:"small",children:[e.jsx(j.Header,{children:e.jsxs(x,{gap:"6",align:"center",wrap:!1,children:[e.jsx(E,{size:"medium",color:"lightBlue",children:e.jsx(O,{height:24,width:24,fontSize:"1.5rem","aria-hidden":!0})}),e.jsx(j.Title,{size:"small",children:e.jsx(r,{id:"HvorforHarJegRettPanel.HvorforHarJegIkkeRett"})})]})}),e.jsx(j.Content,{children:e.jsxs(i,{gap:"5",children:[e.jsx(h,{children:e.jsx(r,{id:"HvorforHarJegRettPanel.OppfylleKrav",values:{erFlereKrav:p}})}),e.jsxs(i,{gap:"4",children:[e.jsx(f,{testId:"harIkkeRettFp",headerText:e.jsx(r,{id:"HvorforHarJegRettPanel.DuMåHaInntekt"}),boxBodyText:e.jsx(r,{id:"HvorforHarJegRettPanel.DuHarOppgittInntekt",values:{harHatt:o}}),erOppfylt:!!o}),e.jsx(f,{testId:"harIkkeRettFp",headerText:e.jsx(r,{id:"HvorforHarJegRettPanel.DuMåTeneOver",values:{minstelønn:u(d)}}),boxBodyText:e.jsx(r,{id:"HvorforHarJegRettPanel.DuHarOppgittMånedslønn",values:{månedslønn:u(s),minstelønn:u(d),hvorMye:g>d}}),erOppfylt:g>d}),e.jsx(f,{testId:"harIkkeRettFp",headerText:e.jsx(r,{id:"HvorforHarJegRettPanel.DuMåVæreMedlem"}),boxBodyText:e.jsx(e.Fragment,{children:a===!1&&t===!1?e.jsx(r,{id:"HvorforHarJegRettPanel.IkkeMedlem",values:{a:b=>e.jsx("a",{href:H.folketrygden,target:"_blank",rel:"noreferrer",children:b})}}):e.jsx(r,{id:"HvorforHarJegRettPanel.OppgittAtDuBorINorge",values:{borINorge:a}})}),erOppfylt:t||a,jobberINorge:t})]})]})})]})};_.__docgenInfo={description:"",methods:[],displayName:"HvorforHarJegIkkeRettPanel"};const A=({fpEllerEsSituasjon:n,satser:l})=>{const{goToRoute:a}=P(M.FP_ELLER_ES),t=n.borDuINorge===!1&&n.jobberDuINorge===!1,s=I(l);return e.jsxs(e.Fragment,{children:[e.jsx(v,{background:"bg-subtle",padding:"8",borderRadius:"large",children:e.jsxs(i,{gap:"8",children:[e.jsxs(i,{gap:"8",align:"center",children:[e.jsx(D,{height:48,width:48,fontSize:"1.5rem","aria-hidden":!0,color:"#66A3C4"}),e.jsx(c,{size:"medium",align:"center",className:"m-6",children:t?e.jsx(r,{id:"OppsummeringFpEllerEsSide.DuHarIkkeRettNorge"}):e.jsx(r,{id:"OppsummeringFpEllerEsSide.DuHarIkkeRett"})})]}),e.jsx(v,{background:"bg-subtle",borderColor:"border-info",borderWidth:"2",padding:"4",borderRadius:"large",children:e.jsx(i,{gap:"4",children:e.jsxs(x,{gap:"8",justify:"space-between",wrap:!1,children:[e.jsx(h,{children:t?e.jsx(r,{id:"OppsummeringFpEllerEsSide.SidenDuIkkeJobberINorge"}):e.jsx(r,{id:"OppsummeringFpEllerEsSide.DuHarIkkeRett.Folketrygden"})}),e.jsx(E,{size:"medium",color:"blue",children:e.jsx(z,{height:24,width:24,color:"#236B7D",fontSize:"1.5rem","aria-hidden":!0})})]})})})]})}),e.jsxs(x,{justify:"space-around",children:[e.jsx(k,{href:H.omForeldrepenger,target:"_blank",rel:"norefferer",underline:!1,children:e.jsx(m,{type:"submit",variant:"secondary",children:e.jsx(r,{id:"OppsummeringFpEllerEsSide.MerOmFp"})})}),e.jsx(k,{href:H.engangsstonad,target:"_blank",rel:"norefferer",underline:!1,children:e.jsx(m,{type:"submit",variant:"secondary",children:e.jsx(r,{id:"OppsummeringFpEllerEsSide.MerOmEs"})})})]}),e.jsxs(i,{gap:"4",children:[e.jsx(L,{fpEllerEsSituasjon:n,grunnbeløpet:s}),e.jsx(_,{fpEllerEsSituasjon:n,grunnbeløpet:s})]}),e.jsx(x,{children:e.jsx(m,{variant:"secondary",onClick:()=>a(J.SITUASJON),icon:e.jsx(N,{"aria-hidden":!0,height:24,width:24}),children:e.jsx(r,{id:"OppsummeringFpEllerEsSide.Tilbake"})})})]})};A.__docgenInfo={description:"",methods:[],displayName:"HarIkkeRett"};const B=({fpEllerEsSituasjon:n,grunnbeløpet:l})=>{const{borDuINorge:a,jobberDuINorge:t,lønnPerMåned:s,harHattInntekt:o}=n,d=l/2,g=y(s)?Number(s)*12:0,p=o&&(a||t);return e.jsxs(j,{"aria-label":"",size:"small",children:[e.jsx(j.Header,{children:e.jsxs(x,{gap:"6",align:"center",wrap:!1,children:[e.jsx(E,{size:"medium",color:"lightBlue",children:e.jsx(O,{height:24,width:24,fontSize:"1.5rem","aria-hidden":!0})}),e.jsx(j.Title,{size:"small",children:n.situasjon==="mor"?e.jsx(r,{id:"HvorforHarJegRettPanel.HvorforHarJegRett"}):e.jsx(r,{id:"HvorforHarJegRettPanel.HvorforKanJegHaRett"})})]})}),e.jsx(j.Content,{children:e.jsxs(i,{gap:"5",children:[e.jsx(h,{children:e.jsx(r,{id:"HvorforHarJegRettPanel.OppfylleKrav",values:{erFlereKrav:p}})}),e.jsxs(i,{gap:"4",children:[e.jsx(f,{testId:"harRettFp",headerText:e.jsx(r,{id:"HvorforHarJegRettPanel.DuMåHaInntekt"}),boxBodyText:e.jsx(r,{id:"HvorforHarJegRettPanel.DuHarOppgittInntekt",values:{harHatt:n.harHattInntekt}}),erOppfylt:!!n.harHattInntekt}),e.jsx(f,{testId:"harRettFp",headerText:e.jsx(r,{id:"HvorforHarJegRettPanel.DuMåTeneOver",values:{minstelønn:u(d)}}),boxBodyText:e.jsx(r,{id:"HvorforHarJegRettPanel.DuHarOppgittMånedslønn",values:{månedslønn:u(s),minstelønn:u(d),hvorMye:g>d}}),erOppfylt:g>d}),e.jsx(f,{testId:"harRettFp",headerText:e.jsx(r,{id:"HvorforHarJegRettPanel.DuMåVæreMedlem"}),boxBodyText:e.jsx(r,{id:"HvorforHarJegRettPanel.OppgittAtDuBorINorge",values:{borINorge:a}}),erOppfylt:a||t})]})]})})]})};B.__docgenInfo={description:"",methods:[],displayName:"HvorforHarJegRettPanel"};const V=({fpEllerEsSituasjon:n,satser:l})=>{const{goToRoute:a}=P(M.FP_ELLER_ES),t=I(l),s=n.situasjon==="mor";return e.jsxs(e.Fragment,{children:[e.jsx(v,{background:"surface-alt-3-subtle",padding:"8",borderRadius:"large",children:e.jsxs(i,{gap:"8",children:[e.jsxs(i,{gap:"8",align:"center",children:[e.jsx(D,{height:48,width:48,fontSize:"1.5rem","aria-hidden":!0,color:"#66A3C4"}),e.jsx(c,{size:"medium",align:"center",className:"m-6",children:s?e.jsx(r,{id:"OppsummeringFpEllerEsSide.DuHarRett"}):e.jsx(r,{id:"OppsummeringFpEllerEsSide.DuKanHaRett"})})]}),e.jsx(v,{background:"bg-default",padding:"4",borderRadius:"large",children:e.jsxs(i,{gap:"2",children:[e.jsx(c,{size:"xsmall",children:e.jsx(r,{id:"OppsummeringFpEllerEsSide.HvaErFp"})}),e.jsxs(h,{children:[e.jsx(r,{id:"FpEllerEsForside.FpErstatte"})," ",e.jsx(r,{id:"OppsummeringFpEllerEsSide.HvaErFp.KanVelgeMellom",values:{b:o=>e.jsx("b",{children:o})}})]})]})})]})}),s&&e.jsx(T,{icon:e.jsx(C,{height:24,width:24,color:"#020C1CAD",fontSize:"1.5rem","aria-hidden":!0}),color:"gray",children:e.jsx(h,{children:e.jsx(r,{id:"OppsummeringFpEllerEsSide.KanOgsåHarRettTilEs"})})}),e.jsxs(x,{justify:"space-around",children:[e.jsx(k,{href:H.søknadForeldrepenger,target:"_blank",rel:"norefferer",children:e.jsx(m,{children:e.jsx(r,{id:"OppsummeringFpEllerEsSide.SøkOmFp"})})}),e.jsx(k,{href:H.omForeldrepenger,target:"_blank",rel:"norefferer",underline:!1,children:e.jsx(m,{variant:"secondary",children:e.jsx(r,{id:"OppsummeringFpEllerEsSide.MerOmFp"})})})]}),e.jsx(B,{fpEllerEsSituasjon:n,grunnbeløpet:t}),e.jsx(x,{children:e.jsx(m,{variant:"secondary",onClick:()=>a(J.SITUASJON),icon:e.jsx(N,{"aria-hidden":!0,height:24,width:24}),children:e.jsx(r,{id:"OppsummeringFpEllerEsSide.Tilbake"})})})]})};V.__docgenInfo={description:"",methods:[],displayName:"HarRett"};const w=({fpEllerEsSituasjon:n,grunnbeløpet:l})=>{const{borDuINorge:a,jobberDuINorge:t,lønnPerMåned:s,harHattInntekt:o}=n,d=l/2,g=y(s)?Number(s)*12:0,p=o&&(a||t);return e.jsxs(j,{"aria-label":"",size:"small",children:[e.jsx(j.Header,{children:e.jsxs(x,{gap:"6",align:"center",wrap:!1,children:[e.jsx(E,{size:"medium",color:"lightBlue",children:e.jsx(O,{height:24,width:24,fontSize:"1.5rem","aria-hidden":!0})}),e.jsx(j.Title,{size:"small",children:n.situasjon==="mor"?e.jsx(r,{id:"HvorforHarJegRettPanel.HvorforHarJegRettPåEs"}):e.jsx(r,{id:"HvorforHarJegRettPanel.HvorforKanJegHaRettPåEs"})})]})}),e.jsx(j.Content,{children:e.jsxs(i,{gap:"5",children:[e.jsx(h,{children:e.jsx(r,{id:"HvorforHarJegRettPanel.OppfylleKravEs",values:{erFlereKrav:p}})}),e.jsxs(i,{gap:"4",children:[g>d&&e.jsx(f,{testId:"harRettEs",headerText:e.jsx(r,{id:"HvorforHarJegRettPanel.DuMåTeneOver",values:{minstelønn:u(d)}}),boxBodyText:e.jsx(r,{id:"HvorforHarJegRettPanel.DuHarOppgittMånedslønn",values:{månedslønn:u(s),minstelønn:u(d),hvorMye:g>d}}),erOppfylt:g>d}),(a||t)&&e.jsx(f,{testId:"harRettEs",headerText:e.jsx(r,{id:"HvorforHarJegRettPanel.DuMåVæreMedlem"}),boxBodyText:e.jsx(r,{id:"HvorforHarJegRettPanel.OppgittAtDuBorINorge",values:{borINorge:a}}),erOppfylt:a||t})]})]})})]})};w.__docgenInfo={description:"",methods:[],displayName:"HvorforHarJegRettEsPanel"};const U=({fpEllerEsSituasjon:n,satser:l})=>{const{goToRoute:a}=P(M.FP_ELLER_ES),t=I(l),s=K(l),o=n.situasjon==="mor";return e.jsxs(e.Fragment,{children:[e.jsx(v,{background:"surface-alt-3-subtle",padding:"8",borderRadius:"large",children:e.jsxs(i,{gap:"8",children:[e.jsxs(i,{gap:"8",align:"center",children:[e.jsx(D,{height:48,width:48,fontSize:"1.5rem","aria-hidden":!0,color:"#66A3C4"}),e.jsx(c,{size:"medium",align:"center",className:"m-6",children:o?e.jsx(r,{id:"OppsummeringFpEllerEsSide.DuHarRettPåEs"}):e.jsx(r,{id:"OppsummeringFpEllerEsSide.DuKanHaRettPåEs"})})]}),e.jsx(v,{background:"bg-default",padding:"4",borderRadius:"large",children:e.jsxs(i,{gap:"2",children:[e.jsx(c,{size:"xsmall",children:e.jsx(r,{id:"OppsummeringSide.HvaErEs"})}),e.jsx(h,{children:e.jsx(r,{id:"OppsummeringFpEllerEsSide.EsSkalBidra",values:{engangsstønad:S(s),b:d=>e.jsx("b",{children:d})}})})]})})]})}),e.jsxs(x,{justify:"space-around",children:[e.jsx(k,{href:H.søknadEngangsstønad,target:"_blank",rel:"norefferer",children:e.jsx(m,{children:e.jsx(r,{id:"OppsummeringFpEllerEsSide.SøkOmEs"})})}),e.jsx(k,{href:H.engangsstonad,target:"_blank",rel:"norefferer",underline:!1,children:e.jsx(m,{variant:"secondary",children:e.jsx(r,{id:"OppsummeringFpEllerEsSide.MerOmEs"})})})]}),e.jsxs(i,{gap:"4",children:[e.jsx(w,{fpEllerEsSituasjon:n,grunnbeløpet:t}),e.jsx(_,{fpEllerEsSituasjon:n,grunnbeløpet:t})]}),e.jsx(x,{children:e.jsx(m,{variant:"secondary",onClick:()=>a(J.SITUASJON),icon:e.jsx(N,{"aria-hidden":!0,height:24,width:24}),children:e.jsx(r,{id:"OppsummeringFpEllerEsSide.Tilbake"})})})]})};U.__docgenInfo={description:"",methods:[],displayName:"HarRettEs"};const W=({fpEllerEsSituasjon:n,satser:l})=>{const{goToRoute:a}=P(M.FP_ELLER_ES),t=I(l),s=K(l);return e.jsxs(e.Fragment,{children:[e.jsx(v,{background:"surface-alt-3-subtle",padding:"8",borderRadius:"large",children:e.jsxs(i,{gap:"6",children:[e.jsxs(i,{gap:"8",align:"center",children:[e.jsx(D,{height:48,width:48,fontSize:"1.5rem","aria-hidden":!0,color:"#66A3C4"}),e.jsx(c,{size:"medium",align:"center",className:"m-6",children:e.jsx(r,{id:"OppsummeringFpEllerEsSide.DuHarRettFpEllerEs"})})]}),e.jsx(v,{background:"surface-alt-3-subtle",borderColor:"border-info",borderWidth:"2",padding:"4",borderRadius:"large",children:e.jsxs(i,{gap:"3",children:[e.jsxs(x,{justify:"space-between",children:[e.jsx(c,{size:"small",children:e.jsx(r,{id:"OppsummeringFpEllerEsSide.DuHarRettFpEllerEs.KanVelgeMellom"})}),e.jsx(E,{size:"medium",color:"blue",children:e.jsx(z,{height:24,width:24,color:"#236B7D",fontSize:"1.5rem","aria-hidden":!0})})]}),e.jsxs(i,{gap:"2",children:[e.jsx(c,{size:"xsmall",children:e.jsx(r,{id:"FpEllerEsForside.Engangsstønad"})}),e.jsx(h,{children:e.jsx(r,{id:"OppsummeringFpEllerEsSide.DuFårUtbetaltEs",values:{engangsstønad:S(s)}})})]}),e.jsxs(i,{gap:"2",children:[e.jsx(c,{size:"xsmall",children:e.jsx(r,{id:"FpEllerEsForside.Foreldrepenger"})}),e.jsx(h,{children:e.jsx(r,{id:"OppsummeringFpEllerEsSide.BasertPåSvarene",values:{utbetaling:S(n.lønnPerMåned)}})})]})]})}),e.jsxs(i,{gap:"2",children:[e.jsx(v,{background:"bg-default",padding:"4",borderRadius:"large",children:e.jsxs(i,{gap:"2",children:[e.jsx(c,{size:"xsmall",children:e.jsx(r,{id:"OppsummeringFpEllerEsSide.HvaErFp"})}),e.jsxs(h,{children:[e.jsx(r,{id:"FpEllerEsForside.FpErstatte"})," ",e.jsx(r,{id:"OppsummeringFpEllerEsSide.HvaErFp.KanVelgeMellom",values:{b:o=>e.jsx("b",{children:o})}})]})]})}),e.jsx(v,{background:"bg-default",padding:"4",borderRadius:"large",children:e.jsxs(i,{gap:"2",children:[e.jsx(c,{size:"xsmall",children:e.jsx(r,{id:"OppsummeringSide.HvaErEs"})}),e.jsx(h,{children:e.jsx(r,{id:"OppsummeringFpEllerEsSide.EsSkalBidra",values:{engangsstønad:S(s),b:o=>e.jsx("b",{children:o})}})})]})})]})]})}),e.jsx(T,{icon:e.jsx(C,{height:24,width:24,color:"#020C1CAD",fontSize:"1.5rem","aria-hidden":!0}),color:"gray",children:e.jsx(h,{children:e.jsx(r,{id:"OppsummeringFpEllerEsSide.KanOgsåHarRettTilEs"})})}),e.jsxs(x,{justify:"space-around",children:[e.jsx(k,{href:H.søknadForeldrepenger,target:"_blank",rel:"norefferer",children:e.jsx(m,{children:e.jsx(r,{id:"OppsummeringFpEllerEsSide.SøkOmFp"})})}),e.jsx(k,{href:H.omForeldrepenger,target:"_blank",rel:"norefferer",underline:!1,children:e.jsx(m,{variant:"secondary",children:e.jsx(r,{id:"OppsummeringFpEllerEsSide.MerOmFp"})})})]}),e.jsxs(i,{gap:"4",children:[e.jsx(B,{fpEllerEsSituasjon:n,grunnbeløpet:t}),e.jsx(w,{fpEllerEsSituasjon:n,grunnbeløpet:t})]}),e.jsx(x,{children:e.jsx(m,{variant:"secondary",onClick:()=>a(J.SITUASJON),icon:e.jsx(N,{"aria-hidden":!0,height:24,width:24}),children:e.jsx(r,{id:"OppsummeringFpEllerEsSide.Tilbake"})})})]})};W.__docgenInfo={description:"",methods:[],displayName:"HarRettFpEllerEs"};const G=()=>e.jsx(ee,{links:[{url:H.hvorMye,content:e.jsxs(x,{gap:"5",align:"center",wrap:!1,children:[e.jsx(z,{"aria-hidden":!0,height:45,width:45}),e.jsx(c,{level:"3",size:"small",children:e.jsx(r,{id:"HvorMyeOgHvaSkjerNåLinkPanel.HvorMye"})})]})},{url:H.hvaSkjerNår,content:e.jsxs(x,{gap:"5",align:"center",wrap:!1,children:[e.jsx(re,{"aria-hidden":!0,height:45,width:45}),e.jsx(c,{level:"3",size:"small",children:e.jsx(r,{id:"HvorMyeOgHvaSkjerNåLinkPanel.HvaSkjer"})})]})}]});G.__docgenInfo={description:"",methods:[],displayName:"HvorMyeOgHvaSkjerNåLinkPanel"};const se=(n,l)=>{const t=I(l)/2,{situasjon:s,lønnPerMåned:o,borDuINorge:d,jobberDuINorge:g}=n,p=X(o),b=p!==void 0&&p*12>=2e5,R=p!==void 0&&p*12>=t;return s==="mor"&&b&&R&&(d||g)?"morTjener200000EllerMerOgHarRett":s==="mor"&&!b&&R&&(d||g)?"morTjenerUnder200000OgKanHaRettFpEllerEs":s!=="mor"&&R&&(d||g)?"farEllerMedmorKanHaRettFp":s==="mor"&&(!b&&!R||R)&&(d||g)?"morHarRettEs":"harIkkeRett"},ne=({fpEllerEsSituasjon:n,satser:l})=>{const a=Q(),{ref:t}=q(),s=se(n,l);return e.jsxs(e.Fragment,{children:[e.jsx(Y,{ref:t,label:a.formatMessage({id:"OppsummeringFpEllerEsSide.Oppsummering"}),children:e.jsxs(i,{gap:"8",children:[(s==="morTjener200000EllerMerOgHarRett"||s==="farEllerMedmorKanHaRettFp")&&e.jsx(V,{fpEllerEsSituasjon:n,satser:l}),s==="morTjenerUnder200000OgKanHaRettFpEllerEs"&&e.jsx(W,{fpEllerEsSituasjon:n,satser:l}),s==="morHarRettEs"&&e.jsx(U,{fpEllerEsSituasjon:n,satser:l}),s==="harIkkeRett"&&e.jsx(A,{fpEllerEsSituasjon:n,satser:l})]})}),e.jsx(G,{})]})};ne.__docgenInfo={description:"",methods:[],displayName:"OppsummeringFpEllerEsSide"};export{ne as O};
