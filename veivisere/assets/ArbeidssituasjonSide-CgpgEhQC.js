import{j as e}from"./tslib.es6-D_L490Ab.js";import{u as q,C as w,H as T}from"./useVeiviserNavigator-9AGaRA2h.js";import{d as E,b as y,I as U,l as Y,c as R}from"./Infobox-Bb7e1V3S.js";import{u as V,F as _,C as h,T as p}from"./TextField-XfaL5C4T.js";import{u as C,V as l,f as t,M as r,B as o,L as H,a as M}from"./Link-BuA0hc-i.js";import{f as z,u as B,R as L,S as P,a as D}from"./useScrollBehaviour-Cxevv2KK.js";import"./index-CTjT7uj6.js";import{f as F}from"./currencyUtils-DCWwe-bG.js";import{V as G}from"./VeiviserPage-Bb4olftk.js";import{H as O}from"./HarIkkeRettTilFpInfobox-CZLtqB7J.js";import{H as K}from"./HøyInntektInfobox-CsAY2JR0.js";import{S as W}from"./Wallet-CdwpMoaZ.js";import{S as $}from"./Information-CXAuotQ2.js";const v=n=>n.charAt(0).toUpperCase()+n.slice(1),J=/^\d+([,.]\d+)?$/,Q=n=>J.test(n.toString()),X="_widthTextInput_kozrb_1",Z="_description_kozrb_5",a={widthTextInput:X,description:Z},ee=n=>(n==null?void 0:n.erArbeidstakerEllerFrilanser)||(n==null?void 0:n.harUtbetalingFraNav)||(n==null?void 0:n.erSelvstendigNæringsdrivende),S=n=>n&&Q(n),re=n=>{const{lønnMåned1:u,lønnMåned2:m,lønnMåned3:c}=n,j=S(u)?parseFloat(u):0,g=S(m)?parseFloat(m):0,b=S(c)?parseFloat(c):0,s=(j+g+b)/3;return s>0?s.toFixed(0):void 0},ne=({arbeidssituasjon:n,setArbeidssituasjon:u,satser:m})=>{const c=C(),{goToRoute:j}=q(w.HVOR_MYE),g=V({defaultValues:n}),b=I=>{u(I),j(T.OPPSUMMERING)},s=g.watch(),x=E().subtract(1,"month"),i=re(s),d=i?parseFloat(i)*12:void 0,A=z(m),k=A/2,f=A*6,{ref:N}=B();return e.jsx(G,{ref:N,label:c.formatMessage({id:"Tittel"}),icon:e.jsx(W,{height:28,width:28,fontSize:"1.5rem","aria-hidden":!0}),children:e.jsx(_,{formMethods:g,onSubmit:b,shouldUseFlexbox:!0,children:e.jsxs(l,{gap:"10",style:{flex:1},children:[e.jsxs(y,{isDarkBlue:!ee(s),shouldFadeIn:!0,children:[e.jsx(t,{children:e.jsx(r,{id:"ArbeidssituasjonSide.Arbeidssituasjon"})}),e.jsx(o,{className:a.description,children:e.jsx(r,{id:"ArbeidssituasjonSide.VelgAlternativ"})}),e.jsx(h,{name:"erArbeidstakerEllerFrilanser",label:e.jsx(r,{id:"ArbeidssituasjonSide.ArbeidEllerFrilans"})}),e.jsx(h,{name:"harUtbetalingFraNav",label:e.jsx(r,{id:"ArbeidssituasjonSide.UtbetalingNav"})}),e.jsx(h,{name:"erSelvstendigNæringsdrivende",label:e.jsx(r,{id:"ArbeidssituasjonSide.SelvstendigNæringsdrivende"})})]}),s.erSelvstendigNæringsdrivende&&e.jsx(U,{icon:e.jsx($,{height:24,width:24,color:"#020C1CAD",fontSize:"1.5rem","aria-hidden":!0}),color:"gray",children:e.jsxs(l,{gap:"6",children:[e.jsx(o,{children:e.jsx(r,{id:"ArbeidssituasjonSide.SNKanIkkeBruke"})}),e.jsxs(o,{children:[e.jsx(r,{id:"ArbeidssituasjonSide.LesOm"}),e.jsx(H,{inlineText:!0,href:Y.selvstendigNæringsdrivendeHvorMye,className:"lenke",rel:"noreferrer",children:e.jsx(r,{id:"ArbeidssituasjonSide.Lenke"})})]})]})}),!s.erSelvstendigNæringsdrivende&&(s.erArbeidstakerEllerFrilanser||s.harUtbetalingFraNav)&&e.jsxs(l,{gap:"2",children:[e.jsx(y,{isDarkBlue:i===void 0,shouldFadeIn:!0,children:e.jsxs(l,{gap:"6",children:[s.erArbeidstakerEllerFrilanser&&!s.harUtbetalingFraNav&&e.jsxs("div",{children:[e.jsx(t,{children:e.jsx(r,{id:"ArbeidssituasjonSide.TreSisteMåneder"})}),e.jsx(o,{className:a.description,children:e.jsx(r,{id:"ArbeidssituasjonSide.LønnFørSkatt"})})]}),s.harUtbetalingFraNav&&!s.erArbeidstakerEllerFrilanser&&e.jsx(t,{children:e.jsx(r,{id:"ArbeidssituasjonSide.UtbetaltTreSiste"})}),s.erArbeidstakerEllerFrilanser&&s.harUtbetalingFraNav&&e.jsxs("div",{children:[e.jsx(t,{children:e.jsx(r,{id:"ArbeidssituasjonSide.UtbetaltTreSiste"})}),e.jsx(o,{className:a.description,children:e.jsx(r,{id:"ArbeidssituasjonSide.LønnOgUtbetaling"})})]}),e.jsxs(l,{gap:"4",children:[e.jsx(p,{name:"lønnMåned1",label:v(x.subtract(2,"month").format("MMMM YYYY")),className:a.widthTextInput}),e.jsx(p,{name:"lønnMåned2",label:v(x.subtract(1,"month").format("MMMM YYYY")),className:a.widthTextInput}),e.jsx(p,{name:"lønnMåned3",label:v(x.format("MMMM YYYY")),className:a.widthTextInput})]}),e.jsxs("div",{children:[e.jsx(t,{children:e.jsx(r,{id:"ArbeidssituasjonSide.Gjennomsnitt"})}),e.jsx(M,{size:"large",children:i?F(i):"-"})]}),e.jsxs("div",{children:[e.jsx(t,{children:e.jsx(r,{id:"ArbeidssituasjonSide.GjennomsnittÅrslønn"})}),e.jsx(M,{size:"large",children:i?F(parseInt(i,10)*12):"-"})]})]})}),e.jsxs(L,{header:e.jsx(r,{id:"ArbeidssituasjonSide.GirRett"}),children:[e.jsx(r,{id:"ArbeidssituasjonSide.EnAvDisse"}),e.jsxs("ul",{children:[e.jsx("li",{children:e.jsx(r,{id:"ArbeidssituasjonSide.Sykepenger"})}),e.jsx("li",{children:e.jsx(r,{id:"ArbeidssituasjonSide.Foreldrepenger"})}),e.jsx("li",{children:e.jsx(r,{id:"ArbeidssituasjonSide.Arbeidsavklaring"})}),e.jsx("li",{children:e.jsx(r,{id:"ArbeidssituasjonSide.Dagpenger"})}),e.jsx("li",{children:e.jsx(r,{id:"ArbeidssituasjonSide.OmsorgOgPleie"})})]})]})]}),s.erArbeidstakerEllerFrilanser&&d!==void 0&&d<k&&e.jsx(O,{antattÅrslønn:d,minÅrslønn:k,showKrIcon:!0}),s.erArbeidstakerEllerFrilanser&&d!==void 0&&d>f&&e.jsx(K,{maxÅrslønnDekket:f,showKrIcon:!0}),e.jsx(P,{}),i&&e.jsx(R,{icon:e.jsx(D,{"aria-hidden":!0}),iconPosition:"right",type:"submit",style:{flex:1},children:e.jsx(r,{id:"ArbeidssituasjonSide.SeResultatet"})})]})})})};ne.__docgenInfo={description:"",methods:[],displayName:"ArbeidssituasjonSide",props:{arbeidssituasjon:{required:!1,tsType:{name:"signature",type:"object",raw:`{
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
}>`,required:!0}}]}},description:""}}};export{ne as A,v as c,re as f,Q as i};
