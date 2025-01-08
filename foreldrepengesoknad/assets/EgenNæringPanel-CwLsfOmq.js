import{j as e}from"./jsx-runtime-DCY474Ph.js";import{d as o,b as L,a as G,c as $}from"./dates-uONhOBCI.js";import{i as d,m as U,o as W,p as X,R as l,q as V,r as O,c as N,d as x,s as z,t as D,u as q,v as y,w as J,x as Q,b as Z,y as ee,z as ne,A as re,E as ie}from"./Uttaksplan-D3KRHfzI.js";import{c as E,d as ae,b as f,a as c,e as te,u as se,R as ge,E as de,S as le}from"./ErrorSummaryHookForm-B7X4WiGP.js";import{u as I,M as g,a as F}from"./Label-BPBaHb1Y.js";import"./index-f9CH5uyH.js";import{N as u}from"./EgenNæring-bnb8Ikwh.js";import{i as oe,h as P,a as me}from"./numberFormValidation-BvYX5GHW.js";import{V as ve}from"./VStack-CP-TSM5f.js";const ue=/^[0-9]*$/,fe=n=>{let t=2,a=0;for(let i=n.length-2;i>=0;--i)a+=parseInt(n.charAt(i),10)*t,++t>7&&(t=2);const s=11-a%11;return s===11?0:s},pe=n=>ue.test(n)&&n.length===9,ke=n=>n.startsWith("8")||n.startsWith("9"),Ne=n=>!n||pe(n)===!1||ke(n)===!1||n==="999999999"?!1:fe(n)===parseInt(n.charAt(8),10),ce=(n,t)=>a=>{const s=(a||"").trim();if(!t&&!s)return n.formatMessage({id:"valideringsfeil.egenNæringOrgnr.påkrevd"});if(s.length>0&&X(a||""))return n.formatMessage({id:"valideringsfeil.egenNæringOrgnr.inneholderMellomrom"});if(s.length>0&&!Ne(s))return n.formatMessage({id:"valideringsfeil.egenNæringOrgnr.ugyldigFormat"})},w=({orgNummerErValgfritt:n,registrertINorge:t})=>{const a=I(),s=a.formatMessage({id:"egenNæring.orgnr"}),i=n?`${s} ${a.formatMessage({id:"valgfritt"})}`:s;return e.jsxs(e.Fragment,{children:[t&&e.jsx(E,{name:"organisasjonsnummer",label:i,validate:[ce(a,n)]}),t===!1&&e.jsx(ae,{name:"registrertILand",label:a.formatMessage({id:"egenNæring.registrertILand"}),validate:[d(a.formatMessage({id:"valideringsfeil.egenNæringLand.påkrevd"})),U(a.formatMessage({id:"valideringsfeil.egenNæringLand.ikkeNorge"}),"NO")],children:W().filter(m=>m[0]!=="NO").map(m=>e.jsx("option",{value:m[0],children:m[1]},m[0]))})]})};w.__docgenInfo={description:"",methods:[],displayName:"OrgnummerEllerLand",props:{orgNummerErValgfritt:{required:!0,tsType:{name:"boolean"},description:""},registrertINorge:{required:!0,tsType:{name:"union",raw:"boolean | undefined",elements:[{name:"boolean"},{name:"undefined"}]},description:""}}};const ye=10,Ee=1e3,B=({egenNæringFom:n,egenNæringTom:t,varigEndring:a,appOrigin:s})=>{const i=I();return e.jsxs(e.Fragment,{children:[e.jsxs(f,{name:"hattVarigEndringAvNæringsinntektSiste4Kalenderår",label:i.formatMessage({id:"egenNæring.egenNæringHattVarigEndringDeSiste4Årene"}),validate:[d(i.formatMessage({id:"valideringsfeil.egenNæringHattVarigEndringDeSiste4Årene.påkrevd"}))],children:[e.jsx(l,{value:!0,children:e.jsx(g,{id:"ja"})}),e.jsx(l,{value:!1,children:e.jsx(g,{id:"nei"})})]}),e.jsx(V,{onOpenChange:m=>O({origin:s,eventName:m?"readmore åpnet":"readmore lukket",eventData:{tittel:"egenNæring.egenNæringHattVarigEndringDeSiste4Årene.info.åpneLabel"}}),header:i.formatMessage({id:"egenNæring.egenNæringHattVarigEndringDeSiste4Årene.info.åpneLabel"}),children:e.jsx(F,{children:e.jsx(g,{id:"egenNæring.egenNæringHattVarigEndringDeSiste4Årene.info"})})}),a&&e.jsxs(e.Fragment,{children:[e.jsx(c,{name:"varigEndringDato",label:i.formatMessage({id:"egenNæring.egenNæringVarigEndringDato"}),validate:[d(i.formatMessage({id:"valideringsfeil.varigEndringDato.påkrevd"})),N(i.formatMessage({id:"valideringsfeil.varigEndringDato.gyldigDato"})),x(i.formatMessage({id:"valideringsfeil.varigEndringDato.erIFremtiden"})),z(i.formatMessage({id:"valideringsfeil.varigEndringDato.mindreEnn4ÅrSiden"}),L),D(i.formatMessage({id:"valideringsfeil.varigEndringDato.førFraDato"}),n),q(i.formatMessage({id:"valideringsfeil.varigEndringDato.etterTilDato"}),t)],maxDate:o(),minDate:n}),e.jsx(E,{name:"varigEndringInntektEtterEndring",label:i.formatMessage({id:"egenNæring.egenNæringVarigEndringInntektEtterEndring"}),description:i.formatMessage({id:"egenNæring.egenNæringVarigEndringInntektEtterEndring.description"}),validate:[d(i.formatMessage({id:"valideringsfeil.varigEndringInntekt.påkrevd"})),y(i.formatMessage({id:"valideringsfeil.varigEndringInntekt.forLang"}),9),oe(i.formatMessage({id:"valideringsfeil.varigEndringInntekt.ugyldigFormat"})),P(i.formatMessage({id:"valideringsfeil.varigEndringInntekt.mindreEnnNull"}),0)]}),e.jsx(te,{name:"varigEndringBeskrivelse",label:i.formatMessage({id:"egenNæring.varigEndringBeskrivelse.label"}),validate:[d(i.formatMessage({id:"valideringsfeil.egenNæringVarigEndringBeskrivelse.påkrevd"})),y(i.formatMessage({id:"valideringsfeil.egenNæringVarigEndringBeskrivelse.forLang"}),Ee),J(i.formatMessage({id:"valideringsfeil.egenNæringVarigEndringBeskrivelse.forKort"}),ye)]})]})]})};B.__docgenInfo={description:"",methods:[],displayName:"VarigEndringSpørsmål",props:{egenNæringFom:{required:!0,tsType:{name:"string"},description:""},egenNæringTom:{required:!0,tsType:{name:"string"},description:""},varigEndring:{required:!0,tsType:{name:"union",raw:"boolean | undefined",elements:[{name:"boolean"},{name:"undefined"}]},description:""},appOrigin:{required:!0,tsType:{name:"union",raw:`| 'engangsstonad'
| 'foreldrepengeoversikt'
| 'foreldrepengesoknad'
| 'planlegger'
| 'svangerskapspengesoknad'
| 'veiviser-fp-eller-es'
| 'veiviser-hva-skjer-nar'
| 'veiviser-hvor-mye'`,elements:[{name:"literal",value:"'engangsstonad'"},{name:"literal",value:"'foreldrepengeoversikt'"},{name:"literal",value:"'foreldrepengesoknad'"},{name:"literal",value:"'planlegger'"},{name:"literal",value:"'svangerskapspengesoknad'"},{name:"literal",value:"'veiviser-fp-eller-es'"},{name:"literal",value:"'veiviser-hva-skjer-nar'"},{name:"literal",value:"'veiviser-hvor-mye'"}]},description:""}}};o.extend(Q);const he=n=>n!==""&&n!==void 0&&n!==null,Me=(n,t)=>{let a=t;if(n&&he(n)){const s=o.max([o(t),o(n)]);a=s?s.toDate():t}return a},je=n=>ie(n)?!n||o(n).startOf("day").isAfter(L,"day"):!0,be=(n,t)=>a=>!t&&!a?n.formatMessage({id:"valideringsfeil.egenNæringNavn.påkrevd"}):a&&a.length>100?n.formatMessage({id:"valideringsfeil.egenNæringNavn.forLang"}):null,xe=({egenNæring:n,saveOnNext:t,saveOnPrevious:a,cancelApplication:s,onContinueLater:i,onStepChange:m,goToPreviousStep:R,stepConfig:_,appOrigin:h})=>{const r=I(),v=se({shouldUnregister:!0,defaultValues:n}),S=r.formatMessage({id:"egenNæring.navnPåNæring"}),M=v.watch("næringstype"),p=v.watch("navnPåNæringen"),k=v.watch("fom"),T=v.watch("tom"),Y=v.watch("registrertINorge"),K=v.watch("pågående"),C=v.watch("hattVarigEndringAvNæringsinntektSiste4Kalenderår"),H=v.watch("harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene"),j=M===u.FISKER?`${S} ${r.formatMessage({id:"valgfritt"})}`:S,A=je(k);return e.jsx(Z,{onCancel:s,steps:_,onContinueLater:i,onStepChange:m,someFieldsOptional:!0,children:e.jsx(ge,{formMethods:v,onSubmit:t,children:e.jsxs(ve,{gap:"10",children:[e.jsx(de,{}),e.jsxs(f,{name:"næringstype",label:r.formatMessage({id:"egenNæring.næringstype"}),validate:[d(r.formatMessage({id:"valideringsfeil.egenNæringType.påkrevd"}))],children:[e.jsx(l,{value:u.DAGMAMMA,children:e.jsx(g,{id:"egenNæring.næringstype.dagmamma"})}),e.jsx(l,{value:u.FISKER,children:e.jsx(g,{id:"egenNæring.næringstype.fiske"})}),e.jsx(l,{value:u.JORDBRUK,children:e.jsx(g,{id:"egenNæring.næringstype.jordbrukSkogbruk"})}),e.jsx(l,{value:u.ANNET,children:e.jsx(g,{id:"egenNæring.næringstype.annen"})})]}),e.jsx(E,{name:"navnPåNæringen",label:j,validate:[be(r,M===u.FISKER),ee(b=>r.formatMessage({id:"valideringsfeil.fritekst.kanIkkeInneholdeTegn"},{feltNavn:j,ugyldigeTegn:b})),y(r.formatMessage({id:"valideringsfeil.navnPåNæringen.forLang"},{feltNavn:j}),100)],shouldReplaceInvisibleChars:!0}),e.jsxs(f,{name:"registrertINorge",label:r.formatMessage({id:"egenNæring.erNæringenRegistrertINorge"},{navnPåNæringen:p}),validate:[d(r.formatMessage({id:"valideringsfeil.egenNæringRegistrertINorge.påkrevd"}))],children:[e.jsx(l,{value:!0,children:e.jsx(g,{id:"ja"})}),e.jsx(l,{value:!1,children:e.jsx(g,{id:"nei"})})]}),e.jsx(w,{orgNummerErValgfritt:M===u.FISKER,registrertINorge:Y}),e.jsx(c,{name:"fom",label:r.formatMessage({id:"egenNæring.næring.fom"},{navnPåNæringen:p}),validate:[d(r.formatMessage({id:"valideringsfeil.fraOgMedDato.påkrevd"})),N(r.formatMessage({id:"valideringsfeil.fraOgMedDato.gyldigDato"})),x(r.formatMessage({id:"valideringsfeil.fraOgMedDato.erIFremtiden"})),q(r.formatMessage({id:"valideringsfeil.fraOgMedDato.førTilDato"}),T)],maxDate:o(),minDate:G,showMonthAndYearDropdowns:!0}),e.jsxs(f,{name:"pågående",label:r.formatMessage({id:"egenNæring.næring.pågående"},{navnPåNæringen:p}),validate:[d(r.formatMessage({id:"valideringsfeil.egenNæringPågående.påkrevd"}))],children:[e.jsx(l,{value:!0,children:e.jsx(g,{id:"ja"})}),e.jsx(l,{value:!1,children:e.jsx(g,{id:"nei"})})]}),K===!1&&e.jsx(c,{name:"tom",label:r.formatMessage({id:"egenNæring.næring.tom"},{navnPåNæringen:p}),description:h==="svangerskapspengesoknad"?r.formatMessage({id:"egenNæring.næring.tom.description"}):void 0,validate:[d(r.formatMessage({id:"valideringsfeil.tilOgMedDato.påkrevd"})),N(r.formatMessage({id:"valideringsfeil.tilOgMedDato.gyldigDato"})),q(r.formatMessage({id:"valideringsfeil.tilOgMedDato.erIFremtiden"}),o().add(9,"month")),D(r.formatMessage({id:"valideringsfeil.tilOgMedDato.egenNæring.merEnn5MånederSiden"}),ne()),D(r.formatMessage({id:"valideringsfeil.tilOgMedDato.etterFraDato"}),k)],maxDate:o().add(9,"month"),minDate:Me(k,$),showMonthAndYearDropdowns:!0}),!A&&e.jsx(B,{varigEndring:C,egenNæringFom:k,egenNæringTom:T,appOrigin:h}),A&&e.jsxs(e.Fragment,{children:[e.jsx(E,{name:"næringsinntekt",label:r.formatMessage({id:"egenNæring.næringsinntekt"}),description:r.formatMessage({id:"egenNæring.næringsinntekt.description"}),validate:[d(r.formatMessage({id:"valideringsfeil.egenNæringInntekt.påkrevd"})),me(r.formatMessage({id:"valideringsfeil.næringsinntekt.ugyldigFormat"})),y(r.formatMessage({id:"valideringsfeil.næringsinntekt.forLang"}),9),P(r.formatMessage({id:"valideringsfeil.næringsinntekt.mindreEnnNull"}),0)]}),e.jsx(V,{onOpenChange:b=>O({origin:h,eventName:b?"readmore åpnet":"readmore lukket",eventData:{tittel:"egenNæring.næringsinntekt.info.apneLabel"}}),header:r.formatMessage({id:"egenNæring.næringsinntekt.info.apneLabel"}),children:e.jsx(F,{children:e.jsx(g,{id:"egenNæring.næringsinntekt.info"})})}),e.jsxs(f,{name:"harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene",label:r.formatMessage({id:"egenNæring.blittYrkesaktivSiste3År"}),validate:[d(r.formatMessage({id:"valideringsfeil.egenNæringBlittYrkesaktivDe3SisteÅrene.påkrevd"}))],children:[e.jsx(l,{value:!0,children:e.jsx(g,{id:"ja"})}),e.jsx(l,{value:!1,children:e.jsx(g,{id:"nei"})})]}),H===!0&&e.jsx(c,{name:"oppstartsdato",label:r.formatMessage({id:"egenNæring.yrkesaktivDato"}),validate:[d(r.formatMessage({id:"valideringsfeil.yrkesaktiv.påkrevd"})),N(r.formatMessage({id:"valideringsfeil.yrkesaktiv.gyldigDato"})),x(r.formatMessage({id:"valideringsfeil.yrkesaktiv.erIFremtiden"}))],maxDate:o()})]}),e.jsx(re,{variant:"info",children:r.formatMessage({id:"egenNæring.veileder"})}),e.jsx(le,{goToPreviousStep:R,saveDataOnPreviousClick:a})]})})})};xe.__docgenInfo={description:"",methods:[],displayName:"EgenNæringPanel",props:{egenNæring:{required:!1,tsType:{name:"signature",type:"object",raw:`{
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
| 'veiviser-hvor-mye'`,elements:[{name:"literal",value:"'engangsstonad'"},{name:"literal",value:"'foreldrepengeoversikt'"},{name:"literal",value:"'foreldrepengesoknad'"},{name:"literal",value:"'planlegger'"},{name:"literal",value:"'svangerskapspengesoknad'"},{name:"literal",value:"'veiviser-fp-eller-es'"},{name:"literal",value:"'veiviser-hva-skjer-nar'"},{name:"literal",value:"'veiviser-hvor-mye'"}]},description:""}}};export{xe as E};
