import{f as W,u as N,j as e,B as s,F as f,H as K}from"./Button-BkdplLyZ.js";import{r as b}from"./index-Dl6G-zuu.js";import{O as x,S as Y,B as Z,H as R}from"./SøkerOppsummeringspunkt-MQclSoei.js";import{B as E,d as z,b as Q}from"./Step-BcAv6Ooc.js";import{V as c,C as _,u as l,b as X,d as L,v as ee,H as P,j as V}from"./dateUtils-DAVVZO_E.js";import{n as T}from"./dateFormValidation-C6gfkS6-.js";import{u as p,C as g,b as te}from"./routes-D-wJVrwa.js";import{A as k,d as M,u as re,a as se,g as ne,f as ie}from"./useSvpNavigator-CImYrSO5.js";import{a as ae,g as oe}from"./dateUtils-7hWQs4lt.js";import{m as de}from"./tilretteleggingUtils-CqBzL5Gm.js";import{A as le}from"./ArbeidsforholdInformasjon-EmTixUl2.js";var ge=function(t,n){var i={};for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&n.indexOf(r)<0&&(i[r]=t[r]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var a=0,r=Object.getOwnPropertySymbols(t);a<r.length;a++)n.indexOf(r[a])<0&&Object.prototype.propertyIsEnumerable.call(t,r[a])&&(i[r[a]]=t[r[a]]);return i};const me=b.forwardRef((t,n)=>{var{title:i,titleId:r}=t,a=ge(t,["title","titleId"]);let o=W();return o=i?r||"title-"+o:void 0,b.createElement("svg",Object.assign({width:"1em",height:"1em",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",focusable:!1,role:"img",ref:n,"aria-labelledby":o},a),i?b.createElement("title",{id:o},i):null,b.createElement("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M6.5 3.25c-.69 0-1.25.56-1.25 1.25v15c0 .69.56 1.25 1.25 1.25h11c.69 0 1.25-.56 1.25-1.25V8a.75.75 0 0 0-.22-.53l-4-4a.75.75 0 0 0-.53-.22H6.5Zm6.75 4.25c0 .69.56 1.25 1.25 1.25h2.75v10.5H6.75V4.75h6.5V7.5Zm2.94-.25-1.44-1.44v1.44h1.44Z",fill:"currentColor"}))}),pe=me,ce=t=>!t.pågående&&t.tom?l(t.tom):"Pågående",U=({arbeidIUtlandet:t})=>{const n=N();return e.jsx(E,{padding:"4",background:"surface-action-subtle",borderRadius:"medium",children:e.jsxs(c,{gap:"4",children:[e.jsx(s,{style:{fontWeight:"bold"},children:t.arbeidsgiverNavn}),e.jsx(s,{children:_(t.land,n.locale)}),e.jsxs(s,{children:[l(t.fom)," - ",ce(t)]})]})})};U.__docgenInfo={description:"",methods:[],displayName:"ArbeidIUtlandetVisning",props:{arbeidIUtlandet:{required:!0,tsType:{name:"ArbeidIUtlandetInput"},description:""}}};const ue=t=>X(t)?!t||L(t).startOf("day").isAfter(ee,"day"):!0,w=({næring:t})=>{const n=N(),i=!t.pågående&&t.tomDato?l(t.tomDato):"Pågående",r=ue(t.fomDato);return e.jsx(E,{padding:"4",background:"surface-action-subtle",borderRadius:"medium",children:e.jsxs(c,{gap:"4",children:[e.jsx(s,{style:{fontWeight:"bold"},children:t.navnPåNæringen}),t.registrertINorge&&e.jsx(s,{children:e.jsx(f,{id:"egenNæring.visning.orgnr",values:{orgnr:t.organisasjonsnummer}})}),!t.registrertINorge&&t.registrertILand&&e.jsx(s,{children:_(t.registrertILand,n.locale)}),e.jsxs(s,{children:[l(t.fomDato)," - ",i]}),t.næringsinntekt&&e.jsx(s,{children:e.jsx(f,{id:"egenNæring.visning.inntekt",values:{inntekt:t.næringsinntekt}})}),!r&&t.hattVarigEndringAvNæringsinntektSiste4Kalenderår&&e.jsxs("div",{children:[e.jsx(s,{children:e.jsx(f,{id:"egenNæring.visning.varigEndring",values:{dato:t.varigEndringDato?l(t.varigEndringDato):"-",inntekt:t.varigEndringInntektEtterEndring}})}),e.jsx(s,{children:e.jsx(f,{id:"egenNæring.visning.varigEndring.beskrivelse",values:{beskrivelse:t.varigEndringBeskrivelse}})})]}),!r&&!t.hattVarigEndringAvNæringsinntektSiste4Kalenderår&&e.jsx(s,{children:e.jsx(f,{id:"egenNæring.visning.varigEndring.ingen"})}),r&&t.harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene&&e.jsx(s,{children:e.jsx(f,{id:"egenNæring.visning.yrkesaktivSiste3år",values:{dato:t.oppstartsdato?l(t.oppstartsdato):"-"}})}),r&&!t.harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene&&e.jsx(s,{children:e.jsx(f,{id:"egenNæring.visning.ikkeYrkesaktivSiste3år"})})]})})};w.__docgenInfo={description:"",methods:[],displayName:"EgenNæringVisning",props:{næring:{required:!0,tsType:{name:"EgenNæring"},description:""},setSelectedNæring:{required:!1,tsType:{name:"ReactDispatch",raw:"React.Dispatch<React.SetStateAction<EgenNæring | undefined>>",elements:[{name:"ReactSetStateAction",raw:"React.SetStateAction<EgenNæring | undefined>",elements:[{name:"union",raw:"EgenNæring | undefined",elements:[{name:"EgenNæring"},{name:"undefined"}]}]}]},description:""},deleteNæring:{required:!1,tsType:{name:"signature",type:"function",raw:"(næring: EgenNæring) => void",signature:{arguments:[{type:{name:"EgenNæring"},name:"næring"}],return:{name:"void"}}},description:""}}};const H=({frilans:t})=>{const n="Arbeid som frilanser",i=t.jobberFremdelesSomFrilans?"(Pågående)":"(Avsluttet)";return e.jsx(E,{padding:"4",background:"surface-action-subtle",borderRadius:"medium",children:e.jsxs(c,{gap:"4",children:[e.jsx(s,{style:{fontWeight:"bold"},children:n}),e.jsx(s,{children:`Startet: ${l(t.oppstart)} ${i}`})]})})};H.__docgenInfo={description:"",methods:[],displayName:"FrilansVisning",props:{frilans:{required:!0,tsType:{name:"signature",type:"object",raw:`{
    jobberFremdelesSomFrilans: boolean;
    oppstart: string;
}`,signature:{properties:[{key:"jobberFremdelesSomFrilans",value:{name:"boolean",required:!0}},{key:"oppstart",value:{name:"string",required:!0}}]}},description:""}}};const fe=(t,n,i,r)=>L(i.tom).isSame(n,"d")?r?t.formatMessage({id:"oppsummering.periode.fremTilTreUkerFørTermin"},{fraDato:l(i.fom)}):t.formatMessage({id:"oppsummering.periode.fremTilFødsel"},{fraDato:l(i.fom)}):t.formatMessage({id:"oppsummering.periode.fraTil"},{fraDato:l(i.fom),tilDato:l(i.tom)}),he=(t,n)=>t.type===M.HEL?n.formatMessage({id:"oppsummering.periode.tilbakeIFullJobb"}):t.type===M.INGEN?n.formatMessage({id:"oppsummering.periode.ikkeJobbe"}):n.formatMessage({id:"oppsummering.periode.stillingsprosent"},{stillingsprosent:t.stillingsprosent}),B=({periode:t,sisteDagForSvangerskapspenger:n,kanHaSvpFremTilTreUkerFørTermin:i})=>{const r=N(),a=fe(r,n,t,i),o=he(t,r),j=t.arbeidsforhold.type===k.SELVSTENDIG&&(!t.arbeidsforhold.navn||t.arbeidsforhold.navn.trim().length===0)?r.formatMessage({id:"egenNæring"}):t.arbeidsforhold.navn;return e.jsx(E,{padding:"4",background:"surface-action-subtle",borderRadius:"medium",children:e.jsxs(c,{gap:"4",children:[e.jsxs(P,{justify:"space-between",children:[e.jsx(s,{style:{fontWeight:"bold"},children:a}),e.jsx(s,{children:j==null?void 0:j.toUpperCase()})]}),e.jsx(s,{children:o})]})})};B.__docgenInfo={description:"",methods:[],displayName:"PeriodeVisning",props:{periode:{required:!0,tsType:{name:"TilretteleggingPeriode"},description:""},sisteDagForSvangerskapspenger:{required:!0,tsType:{name:"string"},description:""},kanHaSvpFremTilTreUkerFørTermin:{required:!0,tsType:{name:"boolean"},description:""}}};const je=({perioder:t,sisteDagForSvangerskapspenger:n,barn:i})=>{const r=ae(i);return t.map((a,o)=>e.jsx(B,{periode:a,sisteDagForSvangerskapspenger:n,kanHaSvpFremTilTreUkerFørTermin:r},o))},ve=(t,n)=>{switch(t.type){case k.FRILANSER:return n.formatMessage({id:"oppsummering.skjema.frilanser"});case k.SELVSTENDIG:return n.formatMessage({id:"oppsummering.skjema.selvstendig"});default:return`${n.formatMessage({id:"oppsummering.skjema.virksomhet"})} for ${t.navn}`}},xe=({tilrettelegging:t})=>{const n=N(),i=V("vedlegg-oppsummering");return t.map(r=>{const a=ve(r.arbeidsforhold,n);return e.jsxs("div",{className:i.element("tilrettelegging"),children:[e.jsx(s,{className:i.element("tittel"),children:a}),r.vedlegg.map(o=>e.jsx("div",{children:e.jsx(P,{children:e.jsxs(z,{className:i.element("link"),href:o.url,target:"_blank",children:[e.jsx(pe,{className:i.element("icon"),title:"Opplastet fil"}),e.jsxs(s,{children:[" ",o.filename]})]})})},o.id))]},r.id)})},be=({sendSøknad:t,mellomlagreSøknadOgNaviger:n,avbrytSøknad:i,søkerInfo:r})=>{const a=N(),o=re(r.arbeidsforhold),j=se(n,r.arbeidsforhold),S=V("oppsummering"),h=T(p(g.INNTEKTSINFORMASJON)),D=p(g.FRILANS),F=p(g.EGEN_NÆRING),A=p(g.ARBEID_I_UTLANDET),m=T(p(g.TILRETTELEGGINGER)),d=T(p(g.OM_BARNET)),G=T(p(g.UTENLANDSOPPHOLD)),C=p(g.UTENLANDSOPPHOLD_SENERE),$=p(g.UTENLANDSOPPHOLD_TIDLIGERE),q=te(g.VALGT_TILRETTELEGGING_ID),y=oe(d),J=b.useMemo(()=>de(m,y),[m,y]),O=ne(r.arbeidsforhold,d.termindato),I=m.find(u=>u.arbeidsforhold.type===k.FRILANSER),v=m.find(u=>u.arbeidsforhold.type===k.SELVSTENDIG);return e.jsxs(Q,{children:[e.jsx(K,{size:"large",children:e.jsx(f,{id:"søknad.pageheading"})}),e.jsxs(x,{appName:"Svangerskapspenger",stepConfig:o,sendSøknad:t,cancelApplication:i,goToPreviousStep:()=>{q(m[(m==null?void 0:m.length)-1].id),j.goToPreviousDefaultStep()},onContinueLater:j.fortsettSøknadSenere,children:[e.jsx(Y,{søker:r.søker}),e.jsx(x.Punkt,{tittel:a.formatMessage({id:"oppsummering.omBarnet"}),children:e.jsxs(c,{gap:"2",children:[e.jsx(s,{children:`Termindato: ${l(d.termindato)}`}),d.erBarnetFødt&&d.fødselsdato&&e.jsx(s,{children:`Fødselsdato: ${d.fødselsdato?l(d.fødselsdato):void 0}`})]})}),e.jsx(Z,{familiehendelseDato:d.erBarnetFødt&&d.fødselsdato?d.fødselsdato:d.termindato,hendelseType:d.erBarnetFødt?R.FØDSEL:R.TERMIN,utenlandsopphold:G,tidligereUtenlandsopphold:$,senereUtenlandsopphold:C}),e.jsx(x.Punkt,{tittel:a.formatMessage({id:"oppsummering.omArbeidsforhold"}),children:e.jsxs(c,{gap:"2",children:[O.length>0&&e.jsx(le,{visManglerInfo:!1,arbeidsforhold:O}),h.harJobbetSomFrilans&&D&&e.jsx(H,{frilans:D}),h.harJobbetSomSelvstendigNæringsdrivende&&F&&e.jsx(w,{næring:F}),h.harHattArbeidIUtlandet&&A&&A.arbeidIUtlandet.map(u=>e.jsx(U,{arbeidIUtlandet:u},`${u.fom}${u.tom}${u.arbeidsgiverNavn}`)),(!h.harJobbetSomFrilans||!h.harJobbetSomSelvstendigNæringsdrivende||!h.harHattArbeidIUtlandet)&&e.jsx(s,{children:ie(h,a)})]})}),e.jsx(x.Punkt,{tittel:a.formatMessage({id:"oppsummering.skjema"}),children:e.jsx(xe,{tilrettelegging:m})}),e.jsx(x.Punkt,{tittel:a.formatMessage({id:"oppsummering.periodeMedSvangerskapspenger"}),children:e.jsxs(c,{gap:"2",children:[I&&e.jsxs(c,{gap:"2",children:[e.jsxs("div",{children:[e.jsx(s,{className:S.element("label"),children:"Risikofaktorer i jobben din som frilanser:"}),e.jsx(s,{children:I.risikofaktorer})]}),e.jsxs("div",{children:[e.jsx(s,{className:S.element("label"),children:"Tilretteleggingstiltak i jobben din som frilanser:"}),e.jsx(s,{children:I.tilretteleggingstiltak})]})]}),v&&e.jsxs(c,{gap:"2",children:[e.jsxs("div",{children:[e.jsx(s,{className:S.element("label"),children:`Risikofaktorer i ${v.arbeidsforhold.navn}`}),e.jsx(s,{children:v.risikofaktorer})]}),e.jsxs("div",{children:[e.jsx(s,{className:S.element("label"),children:`Tilretteleggingstiltak i ${v.arbeidsforhold.navn}`}),e.jsx(s,{children:v.tilretteleggingstiltak})]})]}),e.jsx(je,{perioder:J,sisteDagForSvangerskapspenger:y,barn:d})]})})]})]})};be.__docgenInfo={description:"",methods:[],displayName:"Oppsummering"};export{be as O};
