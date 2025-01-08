import{j as e}from"./jsx-runtime-DwRxq3ZX.js";import{u as I,x as $,M as g,c as V,O as L,d as o,b as U,V as W,g as X,z,A as J,i as Q,J as Z}from"./VeiviserPage-6gb9KOZj.js";import{o as O,i as d,p as ee,q as ne,a as N,b as x,g as re,e as D,j as q,h as y,r as ie,m as ae,N as v,f as te}from"./minMax-BAsqJuFg.js";import{g as E,f as se,a as f,b as l,c,j as ge,u as de,R as le,E as oe,S as me}from"./ErrorSummaryHookForm-DxOk_rQK.js";import"./index-BX3iQpgp.js";import{l as F}from"./amplitude-DFYcRhpr.js";import{R as P}from"./ReadMore-WZd3rRP0.js";const ue=/^[0-9]*$/,ve=n=>{let a=2,t=0;for(let i=n.length-2;i>=0;--i)t+=parseInt(n.charAt(i),10)*a,++a>7&&(a=2);const s=11-t%11;return s===11?0:s},fe=n=>ue.test(n)&&n.length===9,pe=n=>n.startsWith("8")||n.startsWith("9"),ke=n=>!n||fe(n)===!1||pe(n)===!1||n==="999999999"?!1:ve(n)===parseInt(n.charAt(8),10),Ne=/^\d+([,.]\d+)?$/,ce=n=>Ne.test(n.toString()),ye=/^\s*\d+\s*$/,Ee=n=>a=>O(a)||ce(a)?null:n,he=n=>a=>O(a)||ye.test(a.toString())?null:n,w=(n,a)=>t=>t>=a?null:n,Me=(n,a)=>t=>{const s=(t||"").trim();if(!a&&!s)return n.formatMessage({id:"valideringsfeil.egenNæringOrgnr.påkrevd"});if(s.length>0&&ne(t||""))return n.formatMessage({id:"valideringsfeil.egenNæringOrgnr.inneholderMellomrom"});if(s.length>0&&!ke(s))return n.formatMessage({id:"valideringsfeil.egenNæringOrgnr.ugyldigFormat"})},B=({orgNummerErValgfritt:n,registrertINorge:a})=>{const t=I(),s=t.formatMessage({id:"egenNæring.orgnr"}),i=n?`${s} ${t.formatMessage({id:"valgfritt"})}`:s;return e.jsxs(e.Fragment,{children:[a&&e.jsx(E,{name:"organisasjonsnummer",label:i,validate:[Me(t,n)]}),a===!1&&e.jsx(se,{name:"registrertILand",label:t.formatMessage({id:"egenNæring.registrertILand"}),validate:[d(t.formatMessage({id:"valideringsfeil.egenNæringLand.påkrevd"})),ee(t.formatMessage({id:"valideringsfeil.egenNæringLand.ikkeNorge"}),"NO")],children:$().filter(m=>m[0]!=="NO").map(m=>e.jsx("option",{value:m[0],children:m[1]},m[0]))})]})};B.__docgenInfo={description:"",methods:[],displayName:"OrgnummerEllerLand",props:{orgNummerErValgfritt:{required:!0,tsType:{name:"boolean"},description:""},registrertINorge:{required:!0,tsType:{name:"union",raw:"boolean | undefined",elements:[{name:"boolean"},{name:"undefined"}]},description:""}}};const je=10,be=1e3,R=({egenNæringFom:n,egenNæringTom:a,varigEndring:t,appOrigin:s})=>{const i=I();return e.jsxs(e.Fragment,{children:[e.jsxs(f,{name:"hattVarigEndringAvNæringsinntektSiste4Kalenderår",label:i.formatMessage({id:"egenNæring.egenNæringHattVarigEndringDeSiste4Årene"}),validate:[d(i.formatMessage({id:"valideringsfeil.egenNæringHattVarigEndringDeSiste4Årene.påkrevd"}))],children:[e.jsx(l,{value:!0,children:e.jsx(g,{id:"ja"})}),e.jsx(l,{value:!1,children:e.jsx(g,{id:"nei"})})]}),e.jsx(P,{onOpenChange:m=>F({origin:s,eventName:m?"readmore åpnet":"readmore lukket",eventData:{tittel:"egenNæring.egenNæringHattVarigEndringDeSiste4Årene.info.åpneLabel"}}),header:i.formatMessage({id:"egenNæring.egenNæringHattVarigEndringDeSiste4Årene.info.åpneLabel"}),children:e.jsx(V,{children:e.jsx(g,{id:"egenNæring.egenNæringHattVarigEndringDeSiste4Årene.info"})})}),t&&e.jsxs(e.Fragment,{children:[e.jsx(c,{name:"varigEndringDato",label:i.formatMessage({id:"egenNæring.egenNæringVarigEndringDato"}),validate:[d(i.formatMessage({id:"valideringsfeil.varigEndringDato.påkrevd"})),N(i.formatMessage({id:"valideringsfeil.varigEndringDato.gyldigDato"})),x(i.formatMessage({id:"valideringsfeil.varigEndringDato.erIFremtiden"})),re(i.formatMessage({id:"valideringsfeil.varigEndringDato.mindreEnn4ÅrSiden"}),L),D(i.formatMessage({id:"valideringsfeil.varigEndringDato.førFraDato"}),n),q(i.formatMessage({id:"valideringsfeil.varigEndringDato.etterTilDato"}),a)],maxDate:o(),minDate:n}),e.jsx(E,{name:"varigEndringInntektEtterEndring",label:i.formatMessage({id:"egenNæring.egenNæringVarigEndringInntektEtterEndring"}),description:i.formatMessage({id:"egenNæring.egenNæringVarigEndringInntektEtterEndring.description"}),validate:[d(i.formatMessage({id:"valideringsfeil.varigEndringInntekt.påkrevd"})),y(i.formatMessage({id:"valideringsfeil.varigEndringInntekt.forLang"}),9),Ee(i.formatMessage({id:"valideringsfeil.varigEndringInntekt.ugyldigFormat"})),w(i.formatMessage({id:"valideringsfeil.varigEndringInntekt.mindreEnnNull"}),0)]}),e.jsx(ge,{name:"varigEndringBeskrivelse",label:i.formatMessage({id:"egenNæring.varigEndringBeskrivelse.label"}),validate:[d(i.formatMessage({id:"valideringsfeil.egenNæringVarigEndringBeskrivelse.påkrevd"})),y(i.formatMessage({id:"valideringsfeil.egenNæringVarigEndringBeskrivelse.forLang"}),be),ie(i.formatMessage({id:"valideringsfeil.egenNæringVarigEndringBeskrivelse.forKort"}),je)]})]})]})};R.__docgenInfo={description:"",methods:[],displayName:"VarigEndringSpørsmål",props:{egenNæringFom:{required:!0,tsType:{name:"string"},description:""},egenNæringTom:{required:!0,tsType:{name:"string"},description:""},varigEndring:{required:!0,tsType:{name:"union",raw:"boolean | undefined",elements:[{name:"boolean"},{name:"undefined"}]},description:""},appOrigin:{required:!0,tsType:{name:"union",raw:`| 'engangsstonad'
| 'foreldrepengeoversikt'
| 'foreldrepengesoknad'
| 'planlegger'
| 'svangerskapspengesoknad'
| 'veiviser-fp-eller-es'
| 'veiviser-hva-skjer-nar'
| 'veiviser-hvor-mye'`,elements:[{name:"literal",value:"'engangsstonad'"},{name:"literal",value:"'foreldrepengeoversikt'"},{name:"literal",value:"'foreldrepengesoknad'"},{name:"literal",value:"'planlegger'"},{name:"literal",value:"'svangerskapspengesoknad'"},{name:"literal",value:"'veiviser-fp-eller-es'"},{name:"literal",value:"'veiviser-hva-skjer-nar'"},{name:"literal",value:"'veiviser-hvor-mye'"}]},description:""}}};o.extend(ae);const xe=n=>n!==""&&n!==void 0&&n!==null,De=(n,a)=>{let t=a;if(n&&xe(n)){const s=o.max([o(a),o(n)]);t=s?s.toDate():a}return t},qe=n=>Q(n)?!n||o(n).startOf("day").isAfter(L,"day"):!0,Ie=(n,a)=>t=>!a&&!t?n.formatMessage({id:"valideringsfeil.egenNæringNavn.påkrevd"}):t&&t.length>100?n.formatMessage({id:"valideringsfeil.egenNæringNavn.forLang"}):null,Se=({egenNæring:n,saveOnNext:a,saveOnPrevious:t,cancelApplication:s,onContinueLater:i,onStepChange:m,goToPreviousStep:_,stepConfig:Y,appOrigin:h})=>{const r=I(),u=de({shouldUnregister:!0,defaultValues:n}),S=r.formatMessage({id:"egenNæring.navnPåNæring"}),M=u.watch("næringstype"),p=u.watch("navnPåNæringen"),k=u.watch("fom"),T=u.watch("tom"),K=u.watch("registrertINorge"),C=u.watch("pågående"),H=u.watch("hattVarigEndringAvNæringsinntektSiste4Kalenderår"),G=u.watch("harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene"),j=M===v.FISKER?`${S} ${r.formatMessage({id:"valgfritt"})}`:S,A=qe(k);return e.jsx(U,{onCancel:s,steps:Y,onContinueLater:i,onStepChange:m,someFieldsOptional:!0,children:e.jsx(le,{formMethods:u,onSubmit:a,children:e.jsxs(W,{gap:"10",children:[e.jsx(oe,{}),e.jsxs(f,{name:"næringstype",label:r.formatMessage({id:"egenNæring.næringstype"}),validate:[d(r.formatMessage({id:"valideringsfeil.egenNæringType.påkrevd"}))],children:[e.jsx(l,{value:v.DAGMAMMA,children:e.jsx(g,{id:"egenNæring.næringstype.dagmamma"})}),e.jsx(l,{value:v.FISKER,children:e.jsx(g,{id:"egenNæring.næringstype.fiske"})}),e.jsx(l,{value:v.JORDBRUK,children:e.jsx(g,{id:"egenNæring.næringstype.jordbrukSkogbruk"})}),e.jsx(l,{value:v.ANNET,children:e.jsx(g,{id:"egenNæring.næringstype.annen"})})]}),e.jsx(E,{name:"navnPåNæringen",label:j,validate:[Ie(r,M===v.FISKER),te(b=>r.formatMessage({id:"valideringsfeil.fritekst.kanIkkeInneholdeTegn"},{feltNavn:j,ugyldigeTegn:b})),y(r.formatMessage({id:"valideringsfeil.navnPåNæringen.forLang"},{feltNavn:j}),100)],shouldReplaceInvisibleChars:!0}),e.jsxs(f,{name:"registrertINorge",label:r.formatMessage({id:"egenNæring.erNæringenRegistrertINorge"},{navnPåNæringen:p}),validate:[d(r.formatMessage({id:"valideringsfeil.egenNæringRegistrertINorge.påkrevd"}))],children:[e.jsx(l,{value:!0,children:e.jsx(g,{id:"ja"})}),e.jsx(l,{value:!1,children:e.jsx(g,{id:"nei"})})]}),e.jsx(B,{orgNummerErValgfritt:M===v.FISKER,registrertINorge:K}),e.jsx(c,{name:"fom",label:r.formatMessage({id:"egenNæring.næring.fom"},{navnPåNæringen:p}),validate:[d(r.formatMessage({id:"valideringsfeil.fraOgMedDato.påkrevd"})),N(r.formatMessage({id:"valideringsfeil.fraOgMedDato.gyldigDato"})),x(r.formatMessage({id:"valideringsfeil.fraOgMedDato.erIFremtiden"})),q(r.formatMessage({id:"valideringsfeil.fraOgMedDato.førTilDato"}),T)],maxDate:o(),minDate:X,showMonthAndYearDropdowns:!0}),e.jsxs(f,{name:"pågående",label:r.formatMessage({id:"egenNæring.næring.pågående"},{navnPåNæringen:p}),validate:[d(r.formatMessage({id:"valideringsfeil.egenNæringPågående.påkrevd"}))],children:[e.jsx(l,{value:!0,children:e.jsx(g,{id:"ja"})}),e.jsx(l,{value:!1,children:e.jsx(g,{id:"nei"})})]}),C===!1&&e.jsx(c,{name:"tom",label:r.formatMessage({id:"egenNæring.næring.tom"},{navnPåNæringen:p}),description:h==="svangerskapspengesoknad"?r.formatMessage({id:"egenNæring.næring.tom.description"}):void 0,validate:[d(r.formatMessage({id:"valideringsfeil.tilOgMedDato.påkrevd"})),N(r.formatMessage({id:"valideringsfeil.tilOgMedDato.gyldigDato"})),q(r.formatMessage({id:"valideringsfeil.tilOgMedDato.erIFremtiden"}),o().add(9,"month")),D(r.formatMessage({id:"valideringsfeil.tilOgMedDato.egenNæring.merEnn5MånederSiden"}),z()),D(r.formatMessage({id:"valideringsfeil.tilOgMedDato.etterFraDato"}),k)],maxDate:o().add(9,"month"),minDate:De(k,Z),showMonthAndYearDropdowns:!0}),!A&&e.jsx(R,{varigEndring:H,egenNæringFom:k,egenNæringTom:T,appOrigin:h}),A&&e.jsxs(e.Fragment,{children:[e.jsx(E,{name:"næringsinntekt",label:r.formatMessage({id:"egenNæring.næringsinntekt"}),description:r.formatMessage({id:"egenNæring.næringsinntekt.description"}),validate:[d(r.formatMessage({id:"valideringsfeil.egenNæringInntekt.påkrevd"})),he(r.formatMessage({id:"valideringsfeil.næringsinntekt.ugyldigFormat"})),y(r.formatMessage({id:"valideringsfeil.næringsinntekt.forLang"}),9),w(r.formatMessage({id:"valideringsfeil.næringsinntekt.mindreEnnNull"}),0)]}),e.jsx(P,{onOpenChange:b=>F({origin:h,eventName:b?"readmore åpnet":"readmore lukket",eventData:{tittel:"egenNæring.næringsinntekt.info.apneLabel"}}),header:r.formatMessage({id:"egenNæring.næringsinntekt.info.apneLabel"}),children:e.jsx(V,{children:e.jsx(g,{id:"egenNæring.næringsinntekt.info"})})}),e.jsxs(f,{name:"harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene",label:r.formatMessage({id:"egenNæring.blittYrkesaktivSiste3År"}),validate:[d(r.formatMessage({id:"valideringsfeil.egenNæringBlittYrkesaktivDe3SisteÅrene.påkrevd"}))],children:[e.jsx(l,{value:!0,children:e.jsx(g,{id:"ja"})}),e.jsx(l,{value:!1,children:e.jsx(g,{id:"nei"})})]}),G===!0&&e.jsx(c,{name:"oppstartsdato",label:r.formatMessage({id:"egenNæring.yrkesaktivDato"}),validate:[d(r.formatMessage({id:"valideringsfeil.yrkesaktiv.påkrevd"})),N(r.formatMessage({id:"valideringsfeil.yrkesaktiv.gyldigDato"})),x(r.formatMessage({id:"valideringsfeil.yrkesaktiv.erIFremtiden"}))],maxDate:o()})]}),e.jsx(J,{variant:"info",children:r.formatMessage({id:"egenNæring.veileder"})}),e.jsx(me,{goToPreviousStep:_,saveDataOnPreviousClick:t})]})})})};Se.__docgenInfo={description:"",methods:[],displayName:"EgenNæringPanel",props:{egenNæring:{required:!1,tsType:{name:"signature",type:"object",raw:`{
    næringstype: Næringstype;
    fom: string;
    tom: string;
    næringsinntekt?: number;
    pågående: boolean; // Brukes ikke backend
    navnPåNæringen?: string;
    organisasjonsnummer?: string;
    registrertINorge: boolean;
    registrertILand?: string;
    harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene?: boolean;
    oppstartsdato?: string;
    hattVarigEndringAvNæringsinntektSiste4Kalenderår?: boolean;
    varigEndringDato?: string;
    varigEndringInntektEtterEndring?: string;
    varigEndringBeskrivelse?: string;
}`,signature:{properties:[{key:"næringstype",value:{name:"Næringstype",required:!0}},{key:"fom",value:{name:"string",required:!0}},{key:"tom",value:{name:"string",required:!0}},{key:"næringsinntekt",value:{name:"number",required:!1}},{key:"pågående",value:{name:"boolean",required:!0}},{key:"navnPåNæringen",value:{name:"string",required:!1}},{key:"organisasjonsnummer",value:{name:"string",required:!1}},{key:"registrertINorge",value:{name:"boolean",required:!0}},{key:"registrertILand",value:{name:"string",required:!1}},{key:"harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene",value:{name:"boolean",required:!1}},{key:"oppstartsdato",value:{name:"string",required:!1}},{key:"hattVarigEndringAvNæringsinntektSiste4Kalenderår",value:{name:"boolean",required:!1}},{key:"varigEndringDato",value:{name:"string",required:!1}},{key:"varigEndringInntektEtterEndring",value:{name:"string",required:!1}},{key:"varigEndringBeskrivelse",value:{name:"string",required:!1}}]}},description:""},saveOnNext:{required:!0,tsType:{name:"signature",type:"function",raw:"(formValues: EgenNæring) => void",signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    næringstype: Næringstype;
    fom: string;
    tom: string;
    næringsinntekt?: number;
    pågående: boolean; // Brukes ikke backend
    navnPåNæringen?: string;
    organisasjonsnummer?: string;
    registrertINorge: boolean;
    registrertILand?: string;
    harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene?: boolean;
    oppstartsdato?: string;
    hattVarigEndringAvNæringsinntektSiste4Kalenderår?: boolean;
    varigEndringDato?: string;
    varigEndringInntektEtterEndring?: string;
    varigEndringBeskrivelse?: string;
}`,signature:{properties:[{key:"næringstype",value:{name:"Næringstype",required:!0}},{key:"fom",value:{name:"string",required:!0}},{key:"tom",value:{name:"string",required:!0}},{key:"næringsinntekt",value:{name:"number",required:!1}},{key:"pågående",value:{name:"boolean",required:!0}},{key:"navnPåNæringen",value:{name:"string",required:!1}},{key:"organisasjonsnummer",value:{name:"string",required:!1}},{key:"registrertINorge",value:{name:"boolean",required:!0}},{key:"registrertILand",value:{name:"string",required:!1}},{key:"harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene",value:{name:"boolean",required:!1}},{key:"oppstartsdato",value:{name:"string",required:!1}},{key:"hattVarigEndringAvNæringsinntektSiste4Kalenderår",value:{name:"boolean",required:!1}},{key:"varigEndringDato",value:{name:"string",required:!1}},{key:"varigEndringInntektEtterEndring",value:{name:"string",required:!1}},{key:"varigEndringBeskrivelse",value:{name:"string",required:!1}}]}},name:"formValues"}],return:{name:"void"}}},description:""},saveOnPrevious:{required:!0,tsType:{name:"signature",type:"function",raw:"(formValues: EgenNæring | undefined) => void",signature:{arguments:[{type:{name:"union",raw:"EgenNæring | undefined",elements:[{name:"signature",type:"object",raw:`{
    næringstype: Næringstype;
    fom: string;
    tom: string;
    næringsinntekt?: number;
    pågående: boolean; // Brukes ikke backend
    navnPåNæringen?: string;
    organisasjonsnummer?: string;
    registrertINorge: boolean;
    registrertILand?: string;
    harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene?: boolean;
    oppstartsdato?: string;
    hattVarigEndringAvNæringsinntektSiste4Kalenderår?: boolean;
    varigEndringDato?: string;
    varigEndringInntektEtterEndring?: string;
    varigEndringBeskrivelse?: string;
}`,signature:{properties:[{key:"næringstype",value:{name:"Næringstype",required:!0}},{key:"fom",value:{name:"string",required:!0}},{key:"tom",value:{name:"string",required:!0}},{key:"næringsinntekt",value:{name:"number",required:!1}},{key:"pågående",value:{name:"boolean",required:!0}},{key:"navnPåNæringen",value:{name:"string",required:!1}},{key:"organisasjonsnummer",value:{name:"string",required:!1}},{key:"registrertINorge",value:{name:"boolean",required:!0}},{key:"registrertILand",value:{name:"string",required:!1}},{key:"harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene",value:{name:"boolean",required:!1}},{key:"oppstartsdato",value:{name:"string",required:!1}},{key:"hattVarigEndringAvNæringsinntektSiste4Kalenderår",value:{name:"boolean",required:!1}},{key:"varigEndringDato",value:{name:"string",required:!1}},{key:"varigEndringInntektEtterEndring",value:{name:"string",required:!1}},{key:"varigEndringBeskrivelse",value:{name:"string",required:!1}}]}},{name:"undefined"}]},name:"formValues"}],return:{name:"void"}}},description:""},cancelApplication:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},onContinueLater:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},onStepChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(id: TYPE) => void",signature:{arguments:[{type:{name:"TYPE"},name:"id"}],return:{name:"void"}}},description:""},goToPreviousStep:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},stepConfig:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    id: TYPE;
    label: string;
    isSelected: boolean;
}`,signature:{properties:[{key:"id",value:{name:"TYPE",required:!0}},{key:"label",value:{name:"string",required:!0}},{key:"isSelected",value:{name:"boolean",required:!0}}]}}],raw:"Array<ProgressStep<TYPE>>"},description:""},appOrigin:{required:!0,tsType:{name:"union",raw:`| 'engangsstonad'
| 'foreldrepengeoversikt'
| 'foreldrepengesoknad'
| 'planlegger'
| 'svangerskapspengesoknad'
| 'veiviser-fp-eller-es'
| 'veiviser-hva-skjer-nar'
| 'veiviser-hvor-mye'`,elements:[{name:"literal",value:"'engangsstonad'"},{name:"literal",value:"'foreldrepengeoversikt'"},{name:"literal",value:"'foreldrepengesoknad'"},{name:"literal",value:"'planlegger'"},{name:"literal",value:"'svangerskapspengesoknad'"},{name:"literal",value:"'veiviser-fp-eller-es'"},{name:"literal",value:"'veiviser-hva-skjer-nar'"},{name:"literal",value:"'veiviser-hvor-mye'"}]},description:""}}};export{Se as E};
