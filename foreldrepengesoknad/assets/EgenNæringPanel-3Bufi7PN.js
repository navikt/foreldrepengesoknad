import{j as e}from"./jsx-runtime-Cw0GR0a5.js";import{h as J,d as o,j as L,a as W,k as X,l as z,m as Q}from"./Uttaksdagen-Cq_fjHH8.js";import{R as l,m as Z}from"./Tidsperioden-Bwm_FIru.js";import{T as y,a as ee,R as p,d as V,D as N,e as ne,u as re,F as ie,E as ae,S as te}from"./ErrorSummaryHookForm-DsXPVMwo.js";import{u as b}from"./index-DSgjoNiG.js";import"./index-CTjT7uj6.js";import{l as P,S as se,A as ge}from"./ByttBrowserModal-Db6MxZXB.js";import"./index-CCQ3W5xA.js";import{i as d,e as de,f as le,a as c,b as M,g as oe,h,d as D,j,k as me,l as ue}from"./dateFormValidation-pcF71gb3.js";import{i as B,h as R}from"./numberFormValidation-C-hbme7F.js";import{M as g}from"./message-CjkJih2D.js";import{B as x}from"./Label-C_UMiHsP.js";import{V as ve}from"./VStack-BeCluNci.js";const fe=/^[0-9]*$/,pe=n=>{let t=2,a=0;for(let i=n.length-2;i>=0;--i)a+=parseInt(n.charAt(i),10)*t,++t>7&&(t=2);const s=11-a%11;return s===11?0:s},ke=n=>fe.test(n)&&n.length===9,Ne=n=>n.startsWith("8")||n.startsWith("9"),ce=n=>!n||ke(n)===!1||Ne(n)===!1||n==="999999999"?!1:pe(n)===parseInt(n.charAt(8),10),ye=(n,t)=>a=>{const s=(a||"").trim();if(!t&&!s)return n.formatMessage({id:"valideringsfeil.egenNæringOrgnr.påkrevd"});if(s.length>0&&le(s))return n.formatMessage({id:"valideringsfeil.egenNæringOrgnr.inneholderMellomrom"});if(s.length>0&&!ce(s))return n.formatMessage({id:"valideringsfeil.egenNæringOrgnr.ugyldigFormat"})},_=({orgNummerErValgfritt:n,registrertINorge:t})=>{const a=b(),s=a.formatMessage({id:"egenNæring.orgnr"}),i=n?`${s} ${a.formatMessage({id:"valgfritt"})}`:s;return e.jsxs(e.Fragment,{children:[t&&e.jsx(y,{name:"organisasjonsnummer",label:i,validate:[ye(a,n)]}),t===!1&&e.jsx(ee,{name:"registrertILand",label:a.formatMessage({id:"egenNæring.registrertILand"}),validate:[d(a.formatMessage({id:"valideringsfeil.egenNæringLand.påkrevd"})),de(a.formatMessage({id:"valideringsfeil.egenNæringLand.ikkeNorge"}),"NO")],children:J().map(v=>e.jsx("option",{value:v[0],children:v[1]},v[0]))})]})};_.__docgenInfo={description:"",methods:[],displayName:"OrgnummerEllerLand",props:{orgNummerErValgfritt:{required:!0,tsType:{name:"boolean"},description:""},registrertINorge:{required:!0,tsType:{name:"union",raw:"boolean | undefined",elements:[{name:"boolean"},{name:"undefined"}]},description:""}}};const A=10,F=1e3,w=({egenNæringFom:n,egenNæringTom:t,varigEndring:a,stønadstype:s})=>{const i=b(),v=i.formatMessage({id:"egenNæring.varigEndringBeskrivelse.label"});return e.jsxs(e.Fragment,{children:[e.jsxs(p,{name:"hattVarigEndringAvNæringsinntektSiste4Kalenderår",label:i.formatMessage({id:"egenNæring.egenNæringHattVarigEndringDeSiste4Årene"}),validate:[d(i.formatMessage({id:"valideringsfeil.egenNæringHattVarigEndringDeSiste4Årene.påkrevd"}))],children:[e.jsx(l,{value:!0,children:e.jsx(g,{id:"ja"})}),e.jsx(l,{value:!1,children:e.jsx(g,{id:"nei"})})]}),e.jsx(V,{onOpenChange:P(s,"Varig_endring"),header:i.formatMessage({id:"egenNæring.egenNæringHattVarigEndringDeSiste4Årene.info.åpneLabel"}),children:e.jsx(x,{children:e.jsx(g,{id:"egenNæring.egenNæringHattVarigEndringDeSiste4Årene.info"})})}),a&&e.jsxs(e.Fragment,{children:[e.jsx(N,{name:"varigEndringDato",label:i.formatMessage({id:"egenNæring.egenNæringVarigEndringDato"}),validate:[d(i.formatMessage({id:"valideringsfeil.varigEndringDato.påkrevd"})),c(i.formatMessage({id:"valideringsfeil.varigEndringDato.gyldigDato"})),M(i.formatMessage({id:"valideringsfeil.varigEndringDato.erIFremtiden"})),oe(i.formatMessage({id:"valideringsfeil.varigEndringDato.mindreEnn4ÅrSiden"}),L),h(i.formatMessage({id:"valideringsfeil.varigEndringDato.førFraDato"}),n),D(i.formatMessage({id:"valideringsfeil.varigEndringDato.etterTilDato"}),t)],maxDate:o(),minDate:n}),e.jsx(y,{name:"varigEndringInntektEtterEndring",label:i.formatMessage({id:"egenNæring.egenNæringVarigEndringInntektEtterEndring"}),description:i.formatMessage({id:"egenNæring.egenNæringVarigEndringInntektEtterEndring.description"}),validate:[d(i.formatMessage({id:"valideringsfeil.varigEndringInntekt.påkrevd"})),j(i.formatMessage({id:"valideringsfeil.varigEndringInntekt.forLang"}),9),B(i.formatMessage({id:"valideringsfeil.varigEndringInntekt.ugyldigFormat"})),R(i.formatMessage({id:"valideringsfeil.varigEndringInntekt.mindreEnnNull"}),0)]}),e.jsx(ne,{name:"varigEndringBeskrivelse",label:v,minLength:A,maxLength:F,validate:[d(i.formatMessage({id:"valideringsfeil.egenNæringVarigEndringBeskrivelse.påkrevd"})),j(i.formatMessage({id:"valideringsfeil.egenNæringVarigEndringBeskrivelse.forLang"}),F),me(i.formatMessage({id:"valideringsfeil.egenNæringVarigEndringBeskrivelse.forKort"}),A)]})]})]})};w.__docgenInfo={description:"",methods:[],displayName:"VarigEndringSpørsmål",props:{egenNæringFom:{required:!0,tsType:{name:"string"},description:""},egenNæringTom:{required:!0,tsType:{name:"string"},description:""},varigEndring:{required:!0,tsType:{name:"union",raw:"boolean | undefined",elements:[{name:"boolean"},{name:"undefined"}]},description:""},stønadstype:{required:!0,tsType:{name:"union",raw:`| 'Foreldrepenger'
| 'Engangsstønad'
| 'Svangerskapspenger'
| 'Foreldrepengeplanlegger'
| 'Foreldrepengeveivisere'`,elements:[{name:"literal",value:"'Foreldrepenger'"},{name:"literal",value:"'Engangsstønad'"},{name:"literal",value:"'Svangerskapspenger'"},{name:"literal",value:"'Foreldrepengeplanlegger'"},{name:"literal",value:"'Foreldrepengeveivisere'"}]},description:""}}};var u=(n=>(n.FISKER="FISKE",n.JORDBRUK="JORDBRUK_SKOGBRUK",n.DAGMAMMA="DAGMAMMA",n.ANNET="ANNEN",n))(u||{});o.extend(Z);const Ee=n=>n!==""&&n!==void 0&&n!==null,Me=(n,t)=>{let a=t;if(n&&Ee(n)){const s=o.max([o(t),o(n)]);a=s?s.toDate():t}return a},O=n=>z(n)?!n||o(n).startOf("day").isAfter(L,"day"):!0,he=(n,t)=>a=>!t&&!a?n.formatMessage({id:"valideringsfeil.egenNæringNavn.påkrevd"}):a&&a.length>100?n.formatMessage({id:"valideringsfeil.egenNæringNavn.forLang"}):null,De=({egenNæring:n,saveOnNext:t,saveOnPrevious:a,cancelApplication:s,onContinueLater:i,onStepChange:v,goToPreviousStep:K,stepConfig:Y,stønadstype:q})=>{const r=b(),m=re({shouldUnregister:!0,defaultValues:n}),I=r.formatMessage({id:"egenNæring.navnPåNæring"}),E=m.watch("næringstype"),k=m.watch("navnPåNæringen"),f=m.watch("fomDato"),S=m.watch("tomDato"),G=m.watch("registrertINorge"),C=m.watch("pågående"),H=m.watch("hattVarigEndringAvNæringsinntektSiste4Kalenderår"),U=m.watch("harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene"),T=E===u.FISKER?`${I} ${r.formatMessage({id:"valgfritt"})}`:I;return e.jsx(se,{onCancel:s,steps:Y,onContinueLater:i,onStepChange:v,children:e.jsx(ie,{formMethods:m,onSubmit:t,children:e.jsxs(ve,{gap:"10",children:[e.jsx(ae,{}),e.jsx(x,{children:e.jsx(g,{id:"harValgfrieFelt"})}),e.jsxs(p,{name:"næringstype",label:r.formatMessage({id:"egenNæring.næringstype"}),validate:[d(r.formatMessage({id:"valideringsfeil.egenNæringType.påkrevd"}))],children:[e.jsx(l,{value:u.DAGMAMMA,children:e.jsx(g,{id:"egenNæring.næringstype.dagmamma"})}),e.jsx(l,{value:u.FISKER,children:e.jsx(g,{id:"egenNæring.næringstype.fiske"})}),e.jsx(l,{value:u.JORDBRUK,children:e.jsx(g,{id:"egenNæring.næringstype.jordbrukSkogbruk"})}),e.jsx(l,{value:u.ANNET,children:e.jsx(g,{id:"egenNæring.næringstype.annen"})})]}),e.jsx(y,{name:"navnPåNæringen",label:T,maxLength:100,validate:[he(r,E===u.FISKER),ue($=>r.formatMessage({id:"valideringsfeil.fritekst.kanIkkeInneholdeTegn"},{feltNavn:T,ugyldigeTegn:$}))],shouldReplaceInvisibleChars:!0}),e.jsxs(p,{name:"registrertINorge",label:r.formatMessage({id:"egenNæring.erNæringenRegistrertINorge"},{navnPåNæringen:k}),validate:[d(r.formatMessage({id:"valideringsfeil.egenNæringRegistrertINorge.påkrevd"}))],children:[e.jsx(l,{value:!0,children:e.jsx(g,{id:"ja"})}),e.jsx(l,{value:!1,children:e.jsx(g,{id:"nei"})})]}),e.jsx(_,{orgNummerErValgfritt:E===u.FISKER,registrertINorge:G}),e.jsx(N,{name:"fomDato",label:r.formatMessage({id:"egenNæring.næring.fom"},{navnPåNæringen:k}),validate:[d(r.formatMessage({id:"valideringsfeil.fraOgMedDato.påkrevd"})),c(r.formatMessage({id:"valideringsfeil.fraOgMedDato.gyldigDato"})),M(r.formatMessage({id:"valideringsfeil.fraOgMedDato.erIFremtiden"})),D(r.formatMessage({id:"valideringsfeil.fraOgMedDato.førTilDato"}),S)],maxDate:o(),minDate:W}),e.jsxs(p,{name:"pågående",label:r.formatMessage({id:"egenNæring.næring.pågående"},{navnPåNæringen:k}),validate:[d(r.formatMessage({id:"valideringsfeil.egenNæringPågående.påkrevd"}))],children:[e.jsx(l,{value:!0,children:e.jsx(g,{id:"ja"})}),e.jsx(l,{value:!1,children:e.jsx(g,{id:"nei"})})]}),C===!1&&e.jsx(N,{name:"tomDato",label:r.formatMessage({id:"egenNæring.næring.tom"},{navnPåNæringen:k}),description:r.formatMessage({id:"egenNæring.næring.tom.description"}),validate:[d(r.formatMessage({id:"valideringsfeil.tilOgMedDato.påkrevd"})),c(r.formatMessage({id:"valideringsfeil.tilOgMedDato.gyldigDato"})),D(r.formatMessage({id:"valideringsfeil.tilOgMedDato.erIFremtiden"}),o().add(9,"month")),h(r.formatMessage({id:"valideringsfeil.tilOgMedDato.egenNæring.merEnn5MånederSiden"}),X()),h(r.formatMessage({id:"valideringsfeil.tilOgMedDato.etterFraDato"}),f)],maxDate:o().add(9,"month"),minDate:Me(f,Q)}),!O(f)&&e.jsx(w,{varigEndring:H,egenNæringFom:f,egenNæringTom:S,stønadstype:q}),e.jsx(y,{name:"næringsinntekt",label:r.formatMessage({id:"egenNæring.næringsinntekt"}),description:r.formatMessage({id:"egenNæring.næringsinntekt.description"}),validate:[d(r.formatMessage({id:"valideringsfeil.egenNæringInntekt.påkrevd"})),j(r.formatMessage({id:"valideringsfeil.næringsinntekt.forLang"}),9),B(r.formatMessage({id:"valideringsfeil.næringsinntekt.ugyldigFormat"})),R(r.formatMessage({id:"valideringsfeil.næringsinntekt.mindreEnnNull"}),0)]}),e.jsx(V,{onOpenChange:P(q,"Mer_om_næringsresultat"),header:r.formatMessage({id:"egenNæring.næringsinntekt.info.apneLabel"}),children:e.jsx(x,{children:e.jsx(g,{id:"egenNæring.næringsinntekt.info"})})}),e.jsxs(p,{name:"harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene",label:r.formatMessage({id:"egenNæring.blittYrkesaktivSiste3År"}),validate:[d(r.formatMessage({id:"valideringsfeil.egenNæringBlittYrkesaktivDe3SisteÅrene.påkrevd"}))],children:[e.jsx(l,{value:!0,children:e.jsx(g,{id:"ja"})}),e.jsx(l,{value:!1,children:e.jsx(g,{id:"nei"})})]}),O(f)&&U===!0&&e.jsx(N,{name:"oppstartsdato",label:r.formatMessage({id:"egenNæring.yrkesaktivDato"}),validate:[d(r.formatMessage({id:"valideringsfeil.yrkesaktiv.påkrevd"})),c(r.formatMessage({id:"valideringsfeil.yrkesaktiv.gyldigDato"})),M(r.formatMessage({id:"valideringsfeil.yrkesaktiv.erIFremtiden"}))],maxDate:o()}),e.jsx(ge,{variant:"info",children:r.formatMessage({id:"egenNæring.veileder"})}),e.jsx(te,{goToPreviousStep:K,saveDataOnPreviousClick:a})]})})})};De.__docgenInfo={description:"",methods:[],displayName:"EgenNæringPanel",props:{egenNæring:{required:!1,tsType:{name:"signature",type:"object",raw:`{
    næringstype: Næringstype;
    fomDato: string;
    tomDato: string;
    næringsinntekt?: number;
    pågående: boolean;
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
}`,signature:{properties:[{key:"næringstype",value:{name:"Næringstype",required:!0}},{key:"fomDato",value:{name:"string",required:!0}},{key:"tomDato",value:{name:"string",required:!0}},{key:"næringsinntekt",value:{name:"number",required:!1}},{key:"pågående",value:{name:"boolean",required:!0}},{key:"navnPåNæringen",value:{name:"string",required:!1}},{key:"organisasjonsnummer",value:{name:"string",required:!1}},{key:"registrertINorge",value:{name:"boolean",required:!0}},{key:"registrertILand",value:{name:"string",required:!1}},{key:"harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene",value:{name:"boolean",required:!1}},{key:"oppstartsdato",value:{name:"string",required:!1}},{key:"hattVarigEndringAvNæringsinntektSiste4Kalenderår",value:{name:"boolean",required:!1}},{key:"varigEndringDato",value:{name:"string",required:!1}},{key:"varigEndringInntektEtterEndring",value:{name:"string",required:!1}},{key:"varigEndringBeskrivelse",value:{name:"string",required:!1}}]}},description:""},saveOnNext:{required:!0,tsType:{name:"signature",type:"function",raw:"(formValues: EgenNæring) => void",signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    næringstype: Næringstype;
    fomDato: string;
    tomDato: string;
    næringsinntekt?: number;
    pågående: boolean;
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
}`,signature:{properties:[{key:"næringstype",value:{name:"Næringstype",required:!0}},{key:"fomDato",value:{name:"string",required:!0}},{key:"tomDato",value:{name:"string",required:!0}},{key:"næringsinntekt",value:{name:"number",required:!1}},{key:"pågående",value:{name:"boolean",required:!0}},{key:"navnPåNæringen",value:{name:"string",required:!1}},{key:"organisasjonsnummer",value:{name:"string",required:!1}},{key:"registrertINorge",value:{name:"boolean",required:!0}},{key:"registrertILand",value:{name:"string",required:!1}},{key:"harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene",value:{name:"boolean",required:!1}},{key:"oppstartsdato",value:{name:"string",required:!1}},{key:"hattVarigEndringAvNæringsinntektSiste4Kalenderår",value:{name:"boolean",required:!1}},{key:"varigEndringDato",value:{name:"string",required:!1}},{key:"varigEndringInntektEtterEndring",value:{name:"string",required:!1}},{key:"varigEndringBeskrivelse",value:{name:"string",required:!1}}]}},name:"formValues"}],return:{name:"void"}}},description:""},saveOnPrevious:{required:!0,tsType:{name:"signature",type:"function",raw:"(formValues: EgenNæring | undefined) => void",signature:{arguments:[{type:{name:"union",raw:"EgenNæring | undefined",elements:[{name:"signature",type:"object",raw:`{
    næringstype: Næringstype;
    fomDato: string;
    tomDato: string;
    næringsinntekt?: number;
    pågående: boolean;
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
}`,signature:{properties:[{key:"næringstype",value:{name:"Næringstype",required:!0}},{key:"fomDato",value:{name:"string",required:!0}},{key:"tomDato",value:{name:"string",required:!0}},{key:"næringsinntekt",value:{name:"number",required:!1}},{key:"pågående",value:{name:"boolean",required:!0}},{key:"navnPåNæringen",value:{name:"string",required:!1}},{key:"organisasjonsnummer",value:{name:"string",required:!1}},{key:"registrertINorge",value:{name:"boolean",required:!0}},{key:"registrertILand",value:{name:"string",required:!1}},{key:"harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene",value:{name:"boolean",required:!1}},{key:"oppstartsdato",value:{name:"string",required:!1}},{key:"hattVarigEndringAvNæringsinntektSiste4Kalenderår",value:{name:"boolean",required:!1}},{key:"varigEndringDato",value:{name:"string",required:!1}},{key:"varigEndringInntektEtterEndring",value:{name:"string",required:!1}},{key:"varigEndringBeskrivelse",value:{name:"string",required:!1}}]}},{name:"undefined"}]},name:"formValues"}],return:{name:"void"}}},description:""},cancelApplication:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},onContinueLater:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},onStepChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(id: TYPE) => void",signature:{arguments:[{type:{name:"TYPE"},name:"id"}],return:{name:"void"}}},description:""},goToPreviousStep:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},stepConfig:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    id: TYPE;
    label: string;
    isSelected: boolean;
}`,signature:{properties:[{key:"id",value:{name:"TYPE",required:!0}},{key:"label",value:{name:"string",required:!0}},{key:"isSelected",value:{name:"boolean",required:!0}}]}}],raw:"Array<ProgressStep<TYPE>>"},description:""},stønadstype:{required:!0,tsType:{name:"union",raw:`| 'Foreldrepenger'
| 'Engangsstønad'
| 'Svangerskapspenger'
| 'Foreldrepengeplanlegger'
| 'Foreldrepengeveivisere'`,elements:[{name:"literal",value:"'Foreldrepenger'"},{name:"literal",value:"'Engangsstønad'"},{name:"literal",value:"'Svangerskapspenger'"},{name:"literal",value:"'Foreldrepengeplanlegger'"},{name:"literal",value:"'Foreldrepengeveivisere'"}]},description:""}}};export{De as E};
