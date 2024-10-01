import{j as e}from"./jsx-runtime-Cw0GR0a5.js";import{u as D,K as $,M as g,d as F,e as A,$ as O,f as o,c as U,V as W,m as X,O as z,F as J,k as Q,R as Z}from"./VeiviserPage-Bp8J8YE0.js";import{q as ee,i as d,r as ne,s as re,a as N,b as j,j as ie,e as x,l as q,h as y,t as ae,m as te,g as se}from"./minMax-DHtEFl1B.js";import{h as E,g as ge,a as f,b as l,c,i as de,u as le,R as oe,E as me,S as ue}from"./ErrorSummaryHookForm-q2mkZ3ta.js";import"./index-CTjT7uj6.js";import{N as v}from"./EgenNæring-DdBVG6ty.js";import{R as V}from"./ReadMore-D7Hfn7By.js";const ve=/^[0-9]*$/,fe=n=>{let t=2,a=0;for(let i=n.length-2;i>=0;--i)a+=parseInt(n.charAt(i),10)*t,++t>7&&(t=2);const s=11-a%11;return s===11?0:s},pe=n=>ve.test(n)&&n.length===9,ke=n=>n.startsWith("8")||n.startsWith("9"),Ne=n=>!n||pe(n)===!1||ke(n)===!1||n==="999999999"?!1:fe(n)===parseInt(n.charAt(8),10),ce=/^\d+([,.]\d+)?$/,ye=n=>ce.test(n.toString()),L=n=>t=>ee(t)||ye(t)?null:n,P=(n,t)=>a=>a>=t?null:n,Ee=(n,t)=>a=>{const s=(a||"").trim();if(!t&&!s)return n.formatMessage({id:"valideringsfeil.egenNæringOrgnr.påkrevd"});if(s.length>0&&re(s))return n.formatMessage({id:"valideringsfeil.egenNæringOrgnr.inneholderMellomrom"});if(s.length>0&&!Ne(s))return n.formatMessage({id:"valideringsfeil.egenNæringOrgnr.ugyldigFormat"})},B=({orgNummerErValgfritt:n,registrertINorge:t})=>{const a=D(),s=a.formatMessage({id:"egenNæring.orgnr"}),i=n?`${s} ${a.formatMessage({id:"valgfritt"})}`:s;return e.jsxs(e.Fragment,{children:[t&&e.jsx(E,{name:"organisasjonsnummer",label:i,validate:[Ee(a,n)]}),t===!1&&e.jsx(ge,{name:"registrertILand",label:a.formatMessage({id:"egenNæring.registrertILand"}),validate:[d(a.formatMessage({id:"valideringsfeil.egenNæringLand.påkrevd"})),ne(a.formatMessage({id:"valideringsfeil.egenNæringLand.ikkeNorge"}),"NO")],children:$().filter(m=>m[0]!=="NO").map(m=>e.jsx("option",{value:m[0],children:m[1]},m[0]))})]})};B.__docgenInfo={description:"",methods:[],displayName:"OrgnummerEllerLand",props:{orgNummerErValgfritt:{required:!0,tsType:{name:"boolean"},description:""},registrertINorge:{required:!0,tsType:{name:"union",raw:"boolean | undefined",elements:[{name:"boolean"},{name:"undefined"}]},description:""}}};const he=10,Me=1e3,w=({egenNæringFom:n,egenNæringTom:t,varigEndring:a,stønadstype:s})=>{const i=D(),m=i.formatMessage({id:"egenNæring.varigEndringBeskrivelse.label"});return e.jsxs(e.Fragment,{children:[e.jsxs(f,{name:"hattVarigEndringAvNæringsinntektSiste4Kalenderår",label:i.formatMessage({id:"egenNæring.egenNæringHattVarigEndringDeSiste4Årene"}),validate:[d(i.formatMessage({id:"valideringsfeil.egenNæringHattVarigEndringDeSiste4Årene.påkrevd"}))],children:[e.jsx(l,{value:!0,children:e.jsx(g,{id:"ja"})}),e.jsx(l,{value:!1,children:e.jsx(g,{id:"nei"})})]}),e.jsx(V,{onOpenChange:F(s,"Varig_endring"),header:i.formatMessage({id:"egenNæring.egenNæringHattVarigEndringDeSiste4Årene.info.åpneLabel"}),children:e.jsx(A,{children:e.jsx(g,{id:"egenNæring.egenNæringHattVarigEndringDeSiste4Årene.info"})})}),a&&e.jsxs(e.Fragment,{children:[e.jsx(c,{name:"varigEndringDato",label:i.formatMessage({id:"egenNæring.egenNæringVarigEndringDato"}),validate:[d(i.formatMessage({id:"valideringsfeil.varigEndringDato.påkrevd"})),N(i.formatMessage({id:"valideringsfeil.varigEndringDato.gyldigDato"})),j(i.formatMessage({id:"valideringsfeil.varigEndringDato.erIFremtiden"})),ie(i.formatMessage({id:"valideringsfeil.varigEndringDato.mindreEnn4ÅrSiden"}),O),x(i.formatMessage({id:"valideringsfeil.varigEndringDato.førFraDato"}),n),q(i.formatMessage({id:"valideringsfeil.varigEndringDato.etterTilDato"}),t)],maxDate:o(),minDate:n}),e.jsx(E,{name:"varigEndringInntektEtterEndring",label:i.formatMessage({id:"egenNæring.egenNæringVarigEndringInntektEtterEndring"}),description:i.formatMessage({id:"egenNæring.egenNæringVarigEndringInntektEtterEndring.description"}),validate:[d(i.formatMessage({id:"valideringsfeil.varigEndringInntekt.påkrevd"})),y(i.formatMessage({id:"valideringsfeil.varigEndringInntekt.forLang"}),9),L(i.formatMessage({id:"valideringsfeil.varigEndringInntekt.ugyldigFormat"})),P(i.formatMessage({id:"valideringsfeil.varigEndringInntekt.mindreEnnNull"}),0)]}),e.jsx(de,{name:"varigEndringBeskrivelse",label:m,validate:[d(i.formatMessage({id:"valideringsfeil.egenNæringVarigEndringBeskrivelse.påkrevd"})),y(i.formatMessage({id:"valideringsfeil.egenNæringVarigEndringBeskrivelse.forLang"}),Me),ae(i.formatMessage({id:"valideringsfeil.egenNæringVarigEndringBeskrivelse.forKort"}),he)]})]})]})};w.__docgenInfo={description:"",methods:[],displayName:"VarigEndringSpørsmål",props:{egenNæringFom:{required:!0,tsType:{name:"string"},description:""},egenNæringTom:{required:!0,tsType:{name:"string"},description:""},varigEndring:{required:!0,tsType:{name:"union",raw:"boolean | undefined",elements:[{name:"boolean"},{name:"undefined"}]},description:""},stønadstype:{required:!0,tsType:{name:"union",raw:`| 'Foreldrepenger'
| 'Engangsstønad'
| 'Svangerskapspenger'
| 'Foreldrepengeplanlegger'
| 'Foreldrepengeveivisere'`,elements:[{name:"literal",value:"'Foreldrepenger'"},{name:"literal",value:"'Engangsstønad'"},{name:"literal",value:"'Svangerskapspenger'"},{name:"literal",value:"'Foreldrepengeplanlegger'"},{name:"literal",value:"'Foreldrepengeveivisere'"}]},description:""}}};o.extend(te);const be=n=>n!==""&&n!==void 0&&n!==null,je=(n,t)=>{let a=t;if(n&&be(n)){const s=o.max([o(t),o(n)]);a=s?s.toDate():t}return a},xe=n=>Q(n)?!n||o(n).startOf("day").isAfter(O,"day"):!0,qe=(n,t)=>a=>!t&&!a?n.formatMessage({id:"valideringsfeil.egenNæringNavn.påkrevd"}):a&&a.length>100?n.formatMessage({id:"valideringsfeil.egenNæringNavn.forLang"}):null,De=({egenNæring:n,saveOnNext:t,saveOnPrevious:a,cancelApplication:s,onContinueLater:i,onStepChange:m,goToPreviousStep:R,stepConfig:_,stønadstype:h})=>{const r=D(),u=le({shouldUnregister:!0,defaultValues:n}),I=r.formatMessage({id:"egenNæring.navnPåNæring"}),M=u.watch("næringstype"),p=u.watch("navnPåNæringen"),k=u.watch("fom"),S=u.watch("tom"),Y=u.watch("registrertINorge"),K=u.watch("pågående"),C=u.watch("hattVarigEndringAvNæringsinntektSiste4Kalenderår"),H=u.watch("harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene"),b=M===v.FISKER?`${I} ${r.formatMessage({id:"valgfritt"})}`:I,T=xe(k);return e.jsx(U,{onCancel:s,steps:_,onContinueLater:i,onStepChange:m,someFieldsOptional:!0,children:e.jsx(oe,{formMethods:u,onSubmit:t,children:e.jsxs(W,{gap:"10",children:[e.jsx(me,{}),e.jsxs(f,{name:"næringstype",label:r.formatMessage({id:"egenNæring.næringstype"}),validate:[d(r.formatMessage({id:"valideringsfeil.egenNæringType.påkrevd"}))],children:[e.jsx(l,{value:v.DAGMAMMA,children:e.jsx(g,{id:"egenNæring.næringstype.dagmamma"})}),e.jsx(l,{value:v.FISKER,children:e.jsx(g,{id:"egenNæring.næringstype.fiske"})}),e.jsx(l,{value:v.JORDBRUK,children:e.jsx(g,{id:"egenNæring.næringstype.jordbrukSkogbruk"})}),e.jsx(l,{value:v.ANNET,children:e.jsx(g,{id:"egenNæring.næringstype.annen"})})]}),e.jsx(E,{name:"navnPåNæringen",label:b,validate:[qe(r,M===v.FISKER),se(G=>r.formatMessage({id:"valideringsfeil.fritekst.kanIkkeInneholdeTegn"},{feltNavn:b,ugyldigeTegn:G})),y(r.formatMessage({id:"valideringsfeil.navnPåNæringen.forLang"},{feltNavn:b}),100)],shouldReplaceInvisibleChars:!0}),e.jsxs(f,{name:"registrertINorge",label:r.formatMessage({id:"egenNæring.erNæringenRegistrertINorge"},{navnPåNæringen:p}),validate:[d(r.formatMessage({id:"valideringsfeil.egenNæringRegistrertINorge.påkrevd"}))],children:[e.jsx(l,{value:!0,children:e.jsx(g,{id:"ja"})}),e.jsx(l,{value:!1,children:e.jsx(g,{id:"nei"})})]}),e.jsx(B,{orgNummerErValgfritt:M===v.FISKER,registrertINorge:Y}),e.jsx(c,{name:"fom",label:r.formatMessage({id:"egenNæring.næring.fom"},{navnPåNæringen:p}),validate:[d(r.formatMessage({id:"valideringsfeil.fraOgMedDato.påkrevd"})),N(r.formatMessage({id:"valideringsfeil.fraOgMedDato.gyldigDato"})),j(r.formatMessage({id:"valideringsfeil.fraOgMedDato.erIFremtiden"})),q(r.formatMessage({id:"valideringsfeil.fraOgMedDato.førTilDato"}),S)],maxDate:o(),minDate:X,showMonthAndYearDropdowns:!0}),e.jsxs(f,{name:"pågående",label:r.formatMessage({id:"egenNæring.næring.pågående"},{navnPåNæringen:p}),validate:[d(r.formatMessage({id:"valideringsfeil.egenNæringPågående.påkrevd"}))],children:[e.jsx(l,{value:!0,children:e.jsx(g,{id:"ja"})}),e.jsx(l,{value:!1,children:e.jsx(g,{id:"nei"})})]}),K===!1&&e.jsx(c,{name:"tom",label:r.formatMessage({id:"egenNæring.næring.tom"},{navnPåNæringen:p}),description:h==="Svangerskapspenger"?r.formatMessage({id:"egenNæring.næring.tom.description"}):void 0,validate:[d(r.formatMessage({id:"valideringsfeil.tilOgMedDato.påkrevd"})),N(r.formatMessage({id:"valideringsfeil.tilOgMedDato.gyldigDato"})),q(r.formatMessage({id:"valideringsfeil.tilOgMedDato.erIFremtiden"}),o().add(9,"month")),x(r.formatMessage({id:"valideringsfeil.tilOgMedDato.egenNæring.merEnn5MånederSiden"}),z()),x(r.formatMessage({id:"valideringsfeil.tilOgMedDato.etterFraDato"}),k)],maxDate:o().add(9,"month"),minDate:je(k,Z),showMonthAndYearDropdowns:!0}),!T&&e.jsx(w,{varigEndring:C,egenNæringFom:k,egenNæringTom:S,stønadstype:h}),T&&e.jsxs(e.Fragment,{children:[e.jsx(E,{name:"næringsinntekt",label:r.formatMessage({id:"egenNæring.næringsinntekt"}),description:r.formatMessage({id:"egenNæring.næringsinntekt.description"}),validate:[d(r.formatMessage({id:"valideringsfeil.egenNæringInntekt.påkrevd"})),y(r.formatMessage({id:"valideringsfeil.næringsinntekt.forLang"}),9),L(r.formatMessage({id:"valideringsfeil.næringsinntekt.ugyldigFormat"})),P(r.formatMessage({id:"valideringsfeil.næringsinntekt.mindreEnnNull"}),0)]}),e.jsx(V,{onOpenChange:F(h,"Mer_om_næringsresultat"),header:r.formatMessage({id:"egenNæring.næringsinntekt.info.apneLabel"}),children:e.jsx(A,{children:e.jsx(g,{id:"egenNæring.næringsinntekt.info"})})}),e.jsxs(f,{name:"harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene",label:r.formatMessage({id:"egenNæring.blittYrkesaktivSiste3År"}),validate:[d(r.formatMessage({id:"valideringsfeil.egenNæringBlittYrkesaktivDe3SisteÅrene.påkrevd"}))],children:[e.jsx(l,{value:!0,children:e.jsx(g,{id:"ja"})}),e.jsx(l,{value:!1,children:e.jsx(g,{id:"nei"})})]}),H===!0&&e.jsx(c,{name:"oppstartsdato",label:r.formatMessage({id:"egenNæring.yrkesaktivDato"}),validate:[d(r.formatMessage({id:"valideringsfeil.yrkesaktiv.påkrevd"})),N(r.formatMessage({id:"valideringsfeil.yrkesaktiv.gyldigDato"})),j(r.formatMessage({id:"valideringsfeil.yrkesaktiv.erIFremtiden"}))],maxDate:o()})]}),e.jsx(J,{variant:"info",children:r.formatMessage({id:"egenNæring.veileder"})}),e.jsx(ue,{goToPreviousStep:R,saveDataOnPreviousClick:a})]})})})};De.__docgenInfo={description:"",methods:[],displayName:"EgenNæringPanel",props:{egenNæring:{required:!1,tsType:{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"id",value:{name:"TYPE",required:!0}},{key:"label",value:{name:"string",required:!0}},{key:"isSelected",value:{name:"boolean",required:!0}}]}}],raw:"Array<ProgressStep<TYPE>>"},description:""},stønadstype:{required:!0,tsType:{name:"union",raw:`| 'Foreldrepenger'
| 'Engangsstønad'
| 'Svangerskapspenger'
| 'Foreldrepengeplanlegger'
| 'Foreldrepengeveivisere'`,elements:[{name:"literal",value:"'Foreldrepenger'"},{name:"literal",value:"'Engangsstønad'"},{name:"literal",value:"'Svangerskapspenger'"},{name:"literal",value:"'Foreldrepengeplanlegger'"},{name:"literal",value:"'Foreldrepengeveivisere'"}]},description:""}}};export{De as E};
