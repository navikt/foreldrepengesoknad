import{j as e}from"./tslib.es6-D_L490Ab.js";import{u as E,C as T,a as U}from"./useVeiviserNavigator-DCyWpHcB.js";import{d as V,B as M,I as Y,l as R,b as _}from"./Infobox-D0dyQTcP.js";import{u as B,F as C,C as v,T as h}from"./TextField-Db0FGdso.js";import{u as z,V as u,f as d,M as n,B as m,L as H,a as F}from"./Link-BH5eL72-.js";import{f as L,R as P}from"./satserUtils-Dy-x2PEY.js";import{c as D,u as G,S as O,b as K}from"./useScrollBehaviour-CdZRlBA5.js";import"./index-CTjT7uj6.js";import{f as N}from"./currencyUtils-DCWwe-bG.js";import{V as W}from"./VeiviserPage-KnQXWij4.js";import{H as $}from"./HarIkkeRettTilFpInfobox-DEktgT5J.js";import{H as J}from"./HøyInntektInfobox-CtOlQTfw.js";import{S as Q}from"./Wallet-BFmk8Gdb.js";import{S as X}from"./Information-DpfxzyU1.js";const p=r=>r.charAt(0).toUpperCase()+r.slice(1),Z=/^\d+([,.]\d+)?$/,I=r=>Z.test(r.toString()),S=r=>t=>D(t)||I(t)?null:r,ee="_widthTextInput_kozrb_1",re="_description_kozrb_5",l={widthTextInput:ee,description:re},ne=r=>(r==null?void 0:r.erArbeidstakerEllerFrilanser)||(r==null?void 0:r.harUtbetalingFraNav)||(r==null?void 0:r.erSelvstendigNæringsdrivende),A=r=>r&&I(r),se=r=>{const{lønnMåned1:t,lønnMåned2:c,lønnMåned3:a}=r,b=A(t)?parseFloat(t):0,g=A(c)?parseFloat(c):0,j=A(a)?parseFloat(a):0,s=(b+g+j)/3;return s>0?s.toFixed(0):void 0},ie=({arbeidssituasjon:r,setArbeidssituasjon:t,satser:c})=>{const a=z(),{goToRoute:b}=E(T.HVOR_MYE),g=B({defaultValues:r}),j=w=>{t(w),b(U.OPPSUMMERING)},s=g.watch(),x=V().subtract(1,"month"),i=se(s),o=i?parseFloat(i)*12:void 0,f=L(c),k=f/2,y=f*6,{ref:q}=G();return e.jsx(W,{ref:q,label:a.formatMessage({id:"Tittel"}),icon:e.jsx(Q,{height:28,width:28,fontSize:"1.5rem","aria-hidden":!0}),children:e.jsx(C,{formMethods:g,onSubmit:j,shouldUseFlexbox:!0,children:e.jsxs(u,{gap:"10",style:{flex:1},children:[e.jsxs(M,{isDarkBlue:!ne(s),shouldFadeIn:!0,children:[e.jsx(d,{children:e.jsx(n,{id:"ArbeidssituasjonSide.Arbeidssituasjon"})}),e.jsx(m,{className:l.description,children:e.jsx(n,{id:"ArbeidssituasjonSide.VelgAlternativ"})}),e.jsx(v,{name:"erArbeidstakerEllerFrilanser",label:e.jsx(n,{id:"ArbeidssituasjonSide.ArbeidEllerFrilans"})}),e.jsx(v,{name:"harUtbetalingFraNav",label:e.jsx(n,{id:"ArbeidssituasjonSide.UtbetalingNav"})}),e.jsx(v,{name:"erSelvstendigNæringsdrivende",label:e.jsx(n,{id:"ArbeidssituasjonSide.SelvstendigNæringsdrivende"})})]}),s.erSelvstendigNæringsdrivende&&e.jsx(Y,{icon:e.jsx(X,{height:24,width:24,color:"#020C1CAD",fontSize:"1.5rem","aria-hidden":!0}),color:"gray",children:e.jsxs(u,{gap:"6",children:[e.jsx(m,{children:e.jsx(n,{id:"ArbeidssituasjonSide.SNKanIkkeBruke"})}),e.jsxs(m,{children:[e.jsx(n,{id:"ArbeidssituasjonSide.LesOm"}),e.jsx(H,{inlineText:!0,href:R.selvstendigNæringsdrivendeHvorMye,className:"lenke",rel:"noreferrer",children:e.jsx(n,{id:"ArbeidssituasjonSide.Lenke"})})]})]})}),!s.erSelvstendigNæringsdrivende&&(s.erArbeidstakerEllerFrilanser||s.harUtbetalingFraNav)&&e.jsxs(u,{gap:"2",children:[e.jsx(M,{isDarkBlue:i===void 0,shouldFadeIn:!0,children:e.jsxs(u,{gap:"6",children:[s.erArbeidstakerEllerFrilanser&&!s.harUtbetalingFraNav&&e.jsxs("div",{children:[e.jsx(d,{children:e.jsx(n,{id:"ArbeidssituasjonSide.TreSisteMåneder"})}),e.jsx(m,{className:l.description,children:e.jsx(n,{id:"ArbeidssituasjonSide.LønnFørSkatt"})})]}),s.harUtbetalingFraNav&&!s.erArbeidstakerEllerFrilanser&&e.jsx(d,{children:e.jsx(n,{id:"ArbeidssituasjonSide.UtbetaltTreSiste"})}),s.erArbeidstakerEllerFrilanser&&s.harUtbetalingFraNav&&e.jsxs("div",{children:[e.jsx(d,{children:e.jsx(n,{id:"ArbeidssituasjonSide.UtbetaltTreSiste"})}),e.jsx(m,{className:l.description,children:e.jsx(n,{id:"ArbeidssituasjonSide.LønnOgUtbetaling"})})]}),e.jsxs(u,{gap:"4",children:[e.jsx(h,{name:"lønnMåned1",label:p(x.subtract(2,"month").format("MMMM YYYY")),className:l.widthTextInput,validate:[S(a.formatMessage({id:"ArbeidssituasjonSide.ValidNumber"}))]}),e.jsx(h,{name:"lønnMåned2",label:p(x.subtract(1,"month").format("MMMM YYYY")),className:l.widthTextInput,validate:[S(a.formatMessage({id:"ArbeidssituasjonSide.ValidNumber"}))]}),e.jsx(h,{name:"lønnMåned3",label:p(x.format("MMMM YYYY")),className:l.widthTextInput,validate:[S(a.formatMessage({id:"ArbeidssituasjonSide.ValidNumber"}))]})]}),e.jsxs("div",{children:[e.jsx(d,{children:e.jsx(n,{id:"ArbeidssituasjonSide.Gjennomsnitt"})}),e.jsx(F,{size:"large",children:i?N(i):"-"})]}),e.jsxs("div",{children:[e.jsx(d,{children:e.jsx(n,{id:"ArbeidssituasjonSide.GjennomsnittÅrslønn"})}),e.jsx(F,{size:"large",children:i?N(parseInt(i,10)*12):"-"})]})]})}),e.jsxs(P,{header:e.jsx(n,{id:"ArbeidssituasjonSide.GirRett"}),children:[e.jsx(n,{id:"ArbeidssituasjonSide.EnAvDisse"}),e.jsxs("ul",{children:[e.jsx("li",{children:e.jsx(n,{id:"ArbeidssituasjonSide.Sykepenger"})}),e.jsx("li",{children:e.jsx(n,{id:"ArbeidssituasjonSide.Foreldrepenger"})}),e.jsx("li",{children:e.jsx(n,{id:"ArbeidssituasjonSide.Arbeidsavklaring"})}),e.jsx("li",{children:e.jsx(n,{id:"ArbeidssituasjonSide.Dagpenger"})}),e.jsx("li",{children:e.jsx(n,{id:"ArbeidssituasjonSide.OmsorgOgPleie"})})]})]})]}),s.erArbeidstakerEllerFrilanser&&o!==void 0&&o<k&&e.jsx($,{antattÅrslønn:o,minÅrslønn:k,showKrIcon:!0}),s.erArbeidstakerEllerFrilanser&&o!==void 0&&o>y&&e.jsx(J,{maxÅrslønnDekket:y,showKrIcon:!0}),e.jsx(O,{}),i&&e.jsx(_,{icon:e.jsx(K,{"aria-hidden":!0}),iconPosition:"right",type:"submit",style:{flex:1},children:e.jsx(n,{id:"ArbeidssituasjonSide.SeResultatet"})})]})})})};ie.__docgenInfo={description:"",methods:[],displayName:"ArbeidssituasjonSide",props:{arbeidssituasjon:{required:!1,tsType:{name:"signature",type:"object",raw:`{
    erArbeidstakerEllerFrilanser: boolean;
    harUtbetalingFraNav: boolean;
    erSelvstendigNæringsdrivende: boolean;
    lønnMåned1: string;
    lønnMåned2: string;
    lønnMåned3: string;
}`,signature:{properties:[{key:"erArbeidstakerEllerFrilanser",value:{name:"boolean",required:!0}},{key:"harUtbetalingFraNav",value:{name:"boolean",required:!0}},{key:"erSelvstendigNæringsdrivende",value:{name:"boolean",required:!0}},{key:"lønnMåned1",value:{name:"string",required:!0}},{key:"lønnMåned2",value:{name:"string",required:!0}},{key:"lønnMåned3",value:{name:"string",required:!0}}]}},description:""},setArbeidssituasjon:{required:!0,tsType:{name:"signature",type:"function",raw:"(arbeidssituasjon: Arbeidssituasjon) => void",signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    erArbeidstakerEllerFrilanser: boolean;
    harUtbetalingFraNav: boolean;
    erSelvstendigNæringsdrivende: boolean;
    lønnMåned1: string;
    lønnMåned2: string;
    lønnMåned3: string;
}`,signature:{properties:[{key:"erArbeidstakerEllerFrilanser",value:{name:"boolean",required:!0}},{key:"harUtbetalingFraNav",value:{name:"boolean",required:!0}},{key:"erSelvstendigNæringsdrivende",value:{name:"boolean",required:!0}},{key:"lønnMåned1",value:{name:"string",required:!0}},{key:"lønnMåned2",value:{name:"string",required:!0}},{key:"lønnMåned3",value:{name:"string",required:!0}}]}},name:"arbeidssituasjon"}],return:{name:"void"}}},description:""},satser:{required:!0,tsType:{name:"signature",type:"object",raw:`{
    engangstønad: Array<{
        fom: string;
        verdi: number;
    }>;
    grunnbeløp: Array<{
        fom: string;
        verdi: number;
    }>;
}`,signature:{properties:[{key:"engangstønad",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    fom: string;
    verdi: number;
}`,signature:{properties:[{key:"fom",value:{name:"string",required:!0}},{key:"verdi",value:{name:"number",required:!0}}]}}],raw:`Array<{
    fom: string;
    verdi: number;
}>`,required:!0}},{key:"grunnbeløp",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    fom: string;
    verdi: number;
}`,signature:{properties:[{key:"fom",value:{name:"string",required:!0}},{key:"verdi",value:{name:"number",required:!0}}]}}],raw:`Array<{
    fom: string;
    verdi: number;
}>`,required:!0}}]}},description:""}}};export{ie as A,p as c,se as f,I as i};
