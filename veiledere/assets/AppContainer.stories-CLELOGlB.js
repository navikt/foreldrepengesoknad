import{u as x,j as e,F as R,e as f,h as I,E as C,i as D}from"./Infobox-u5L4UsZH.js";import{R as g,a,F,b as h,H as u,N as P,C as s,l as B,i as y,M as k}from"./AndreVeivisereLinkPanel-BFZtU4zN.js";import{r as o}from"./index-DVXBtNgz.js";import{a as Y,u as c,e as G,n as J}from"./nn_NO-CpdaOnll.js";import{A as K}from"./ArbeidssituasjonSide-Chkg83UK.js";import{H as U}from"./HvorMyeForside-B0zRfkzv.js";import{O as z}from"./OppsummeringSide-CYIfokzZ.js";import"./index-Dcs0RV0A.js";import"./tslib.es6-CMwweBXX.js";import"./VeilederPage-D_iwpRV3.js";const Q=n=>{const r=o.useRef(n);o.useEffect(()=>{r.current=n},[n]),o.useEffect(()=>(window.addEventListener("beforeunload",r.current),()=>window.removeEventListener("beforeunload",r.current)),[])},L=({locale:n,changeLocale:r})=>{const t=x();return e.jsx(R,{changeLocale:r,locale:n,titleLabel:t.formatMessage({id:"FpEllerEsForside.Title"}),minutesLabel:t.formatMessage({id:"FpEllerEsForside.Minutes"}),innholdLabel:t.formatMessage({id:"FpEllerEsForside.Innhold"}),goToNextDefaultStep:()=>{}})};L.__docgenInfo={description:"",methods:[],displayName:"FpEllerEsForside"};const N=({locale:n,changeLocale:r})=>e.jsx(g,{children:e.jsx(a,{path:F.OM,element:e.jsx(L,{locale:n,changeLocale:r})})});N.__docgenInfo={description:"",methods:[],displayName:"FpEllerEsRouter",props:{locale:{required:!0,tsType:{name:"union",raw:"LocaleNo | 'en'",elements:[{name:"union",raw:"'nb' | 'nn'",elements:[{name:"literal",value:"'nb'"},{name:"literal",value:"'nn'"}]},{name:"literal",value:"'en'"}]},description:""},changeLocale:{required:!0,tsType:{name:"signature",type:"function",raw:"(locale: LocaleAll) => void",signature:{arguments:[{type:{name:"union",raw:"LocaleNo | 'en'",elements:[{name:"union",raw:"'nb' | 'nn'",elements:[{name:"literal",value:"'nb'"},{name:"literal",value:"'nn'"}]},{name:"literal",value:"'en'"}]},name:"locale"}],return:{name:"void"}}},description:""},stønadskontoer:{required:!1,tsType:{name:"signature",type:"object",raw:`{
    '80': TilgjengeligeStønadskontoerForDekningsgrad;
    '100': TilgjengeligeStønadskontoerForDekningsgrad;
}`,signature:{properties:[{key:"80",value:{name:"signature",type:"object",raw:`{
    kontoer: Stønadskonto[];
    minsteretter: TilgjengeligeMinsterettskontoer;
}`,signature:{properties:[{key:"kontoer",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    konto: StønadskontoType;
    dager: number;
}`,signature:{properties:[{key:"konto",value:{name:"StønadskontoType",required:!0}},{key:"dager",value:{name:"number",required:!0}}]}}],raw:"Stønadskonto[]",required:!0}},{key:"minsteretter",value:{name:"signature",type:"object",raw:`{
    [MinsterettType.farRundtFødsel]: number;
    [MinsterettType.toTette]: number;
}`,signature:{properties:[]},required:!0}}]},required:!0}},{key:"100",value:{name:"signature",type:"object",raw:`{
    kontoer: Stønadskonto[];
    minsteretter: TilgjengeligeMinsterettskontoer;
}`,signature:{properties:[{key:"kontoer",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    konto: StønadskontoType;
    dager: number;
}`,signature:{properties:[{key:"konto",value:{name:"StønadskontoType",required:!0}},{key:"dager",value:{name:"number",required:!0}}]}}],raw:"Stønadskonto[]",required:!0}},{key:"minsteretter",value:{name:"signature",type:"object",raw:`{
    [MinsterettType.farRundtFødsel]: number;
    [MinsterettType.toTette]: number;
}`,signature:{properties:[]},required:!0}}]},required:!0}}]}},description:""}}};const A=({locale:n,changeLocale:r})=>{const t=x();return e.jsx(R,{changeLocale:r,locale:n,titleLabel:t.formatMessage({id:"HvaSkjerNårForside.Title"}),minutesLabel:t.formatMessage({id:"HvaSkjerNårForside.Minutes"}),innholdLabel:t.formatMessage({id:"HvaSkjerNårForside.Innhold"}),goToNextDefaultStep:()=>{}})};A.__docgenInfo={description:"",methods:[],displayName:"HvaSkjerNårForside"};const _=({locale:n,changeLocale:r})=>e.jsx(g,{children:e.jsx(a,{path:h.OM,element:e.jsx(A,{locale:n,changeLocale:r})})});_.__docgenInfo={description:"",methods:[],displayName:"HvaSkjerNårRouter",props:{locale:{required:!0,tsType:{name:"union",raw:"LocaleNo | 'en'",elements:[{name:"union",raw:"'nb' | 'nn'",elements:[{name:"literal",value:"'nb'"},{name:"literal",value:"'nn'"}]},{name:"literal",value:"'en'"}]},description:""},changeLocale:{required:!0,tsType:{name:"signature",type:"function",raw:"(locale: LocaleAll) => void",signature:{arguments:[{type:{name:"union",raw:"LocaleNo | 'en'",elements:[{name:"union",raw:"'nb' | 'nn'",elements:[{name:"literal",value:"'nb'"},{name:"literal",value:"'nn'"}]},{name:"literal",value:"'en'"}]},name:"locale"}],return:{name:"void"}}},description:""},stønadskontoer:{required:!1,tsType:{name:"signature",type:"object",raw:`{
    '80': TilgjengeligeStønadskontoerForDekningsgrad;
    '100': TilgjengeligeStønadskontoerForDekningsgrad;
}`,signature:{properties:[{key:"80",value:{name:"signature",type:"object",raw:`{
    kontoer: Stønadskonto[];
    minsteretter: TilgjengeligeMinsterettskontoer;
}`,signature:{properties:[{key:"kontoer",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    konto: StønadskontoType;
    dager: number;
}`,signature:{properties:[{key:"konto",value:{name:"StønadskontoType",required:!0}},{key:"dager",value:{name:"number",required:!0}}]}}],raw:"Stønadskonto[]",required:!0}},{key:"minsteretter",value:{name:"signature",type:"object",raw:`{
    [MinsterettType.farRundtFødsel]: number;
    [MinsterettType.toTette]: number;
}`,signature:{properties:[]},required:!0}}]},required:!0}},{key:"100",value:{name:"signature",type:"object",raw:`{
    kontoer: Stønadskonto[];
    minsteretter: TilgjengeligeMinsterettskontoer;
}`,signature:{properties:[{key:"kontoer",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    konto: StønadskontoType;
    dager: number;
}`,signature:{properties:[{key:"konto",value:{name:"StønadskontoType",required:!0}},{key:"dager",value:{name:"number",required:!0}}]}}],raw:"Stønadskonto[]",required:!0}},{key:"minsteretter",value:{name:"signature",type:"object",raw:`{
    [MinsterettType.farRundtFødsel]: number;
    [MinsterettType.toTette]: number;
}`,signature:{properties:[]},required:!0}}]},required:!0}}]}},description:""}}};const H=({locale:n,changeLocale:r})=>{const[t,i]=o.useState();return e.jsxs(g,{children:[e.jsx(a,{path:u.OM,element:e.jsx(U,{locale:n,changeLocale:r})}),e.jsx(a,{path:u.ARBEIDSSITUASJON,element:e.jsx(K,{arbeidssituasjon:t,setArbeidssituasjon:i})}),e.jsx(a,{path:u.OPPSUMMERING,element:e.jsx(z,{arbeidssituasjon:t})}),e.jsx(a,{path:"*",element:e.jsx(P,{to:s.HVOR_MYE+u.OM})})]})};H.__docgenInfo={description:"",methods:[],displayName:"HvorMyeRouter",props:{locale:{required:!0,tsType:{name:"union",raw:"LocaleNo | 'en'",elements:[{name:"union",raw:"'nb' | 'nn'",elements:[{name:"literal",value:"'nb'"},{name:"literal",value:"'nn'"}]},{name:"literal",value:"'en'"}]},description:""},changeLocale:{required:!0,tsType:{name:"signature",type:"function",raw:"(locale: LocaleAll) => void",signature:{arguments:[{type:{name:"union",raw:"LocaleNo | 'en'",elements:[{name:"union",raw:"'nb' | 'nn'",elements:[{name:"literal",value:"'nb'"},{name:"literal",value:"'nn'"}]},{name:"literal",value:"'en'"}]},name:"locale"}],return:{name:"void"}}},description:""},stønadskontoer:{required:!1,tsType:{name:"signature",type:"object",raw:`{
    '80': TilgjengeligeStønadskontoerForDekningsgrad;
    '100': TilgjengeligeStønadskontoerForDekningsgrad;
}`,signature:{properties:[{key:"80",value:{name:"signature",type:"object",raw:`{
    kontoer: Stønadskonto[];
    minsteretter: TilgjengeligeMinsterettskontoer;
}`,signature:{properties:[{key:"kontoer",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    konto: StønadskontoType;
    dager: number;
}`,signature:{properties:[{key:"konto",value:{name:"StønadskontoType",required:!0}},{key:"dager",value:{name:"number",required:!0}}]}}],raw:"Stønadskonto[]",required:!0}},{key:"minsteretter",value:{name:"signature",type:"object",raw:`{
    [MinsterettType.farRundtFødsel]: number;
    [MinsterettType.toTette]: number;
}`,signature:{properties:[]},required:!0}}]},required:!0}},{key:"100",value:{name:"signature",type:"object",raw:`{
    kontoer: Stønadskonto[];
    minsteretter: TilgjengeligeMinsterettskontoer;
}`,signature:{properties:[{key:"kontoer",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    konto: StønadskontoType;
    dager: number;
}`,signature:{properties:[{key:"konto",value:{name:"StønadskontoType",required:!0}},{key:"dager",value:{name:"number",required:!0}}]}}],raw:"Stønadskonto[]",required:!0}},{key:"minsteretter",value:{name:"signature",type:"object",raw:`{
    [MinsterettType.farRundtFødsel]: number;
    [MinsterettType.toTette]: number;
}`,signature:{properties:[]},required:!0}}]},required:!0}}]}},description:""}}};const O=({locale:n,changeLocale:r})=>e.jsxs(g,{children:[e.jsx(a,{path:s.HVOR_MYE+"/*",element:e.jsx(H,{locale:n,changeLocale:r})}),e.jsx(a,{path:s.HVA_SKJER+"/*",element:e.jsx(_,{locale:n,changeLocale:r})}),e.jsx(a,{path:s.FP_ELLER_ES+"/*",element:e.jsx(N,{locale:n,changeLocale:r})}),e.jsx(a,{path:"*",element:e.jsx("div",{children:"Veiledere"})})]});O.__docgenInfo={description:"",methods:[],displayName:"VeilederRouter",props:{locale:{required:!0,tsType:{name:"union",raw:"LocaleNo | 'en'",elements:[{name:"union",raw:"'nb' | 'nn'",elements:[{name:"literal",value:"'nb'"},{name:"literal",value:"'nn'"}]},{name:"literal",value:"'en'"}]},description:""},changeLocale:{required:!0,tsType:{name:"signature",type:"function",raw:"(locale: LocaleAll) => void",signature:{arguments:[{type:{name:"union",raw:"LocaleNo | 'en'",elements:[{name:"union",raw:"'nb' | 'nn'",elements:[{name:"literal",value:"'nb'"},{name:"literal",value:"'nn'"}]},{name:"literal",value:"'en'"}]},name:"locale"}],return:{name:"void"}}},description:""},stønadskontoer:{required:!1,tsType:{name:"signature",type:"object",raw:`{
    '80': TilgjengeligeStønadskontoerForDekningsgrad;
    '100': TilgjengeligeStønadskontoerForDekningsgrad;
}`,signature:{properties:[{key:"80",value:{name:"signature",type:"object",raw:`{
    kontoer: Stønadskonto[];
    minsteretter: TilgjengeligeMinsterettskontoer;
}`,signature:{properties:[{key:"kontoer",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    konto: StønadskontoType;
    dager: number;
}`,signature:{properties:[{key:"konto",value:{name:"StønadskontoType",required:!0}},{key:"dager",value:{name:"number",required:!0}}]}}],raw:"Stønadskonto[]",required:!0}},{key:"minsteretter",value:{name:"signature",type:"object",raw:`{
    [MinsterettType.farRundtFødsel]: number;
    [MinsterettType.toTette]: number;
}`,signature:{properties:[]},required:!0}}]},required:!0}},{key:"100",value:{name:"signature",type:"object",raw:`{
    kontoer: Stønadskonto[];
    minsteretter: TilgjengeligeMinsterettskontoer;
}`,signature:{properties:[{key:"kontoer",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    konto: StønadskontoType;
    dager: number;
}`,signature:{properties:[{key:"konto",value:{name:"StønadskontoType",required:!0}},{key:"dager",value:{name:"number",required:!0}}]}}],raw:"Stønadskonto[]",required:!0}},{key:"minsteretter",value:{name:"signature",type:"object",raw:`{
    [MinsterettType.farRundtFødsel]: number;
    [MinsterettType.toTette]: number;
}`,signature:{properties:[]},required:!0}}]},required:!0}}]}},description:""}}};const V=({locale:n,changeLocale:r})=>e.jsx(O,{locale:n,changeLocale:r});V.__docgenInfo={description:"",methods:[],displayName:"Veileder",props:{locale:{required:!0,tsType:{name:"union",raw:"LocaleNo | 'en'",elements:[{name:"union",raw:"'nb' | 'nn'",elements:[{name:"literal",value:"'nb'"},{name:"literal",value:"'nn'"}]},{name:"literal",value:"'en'"}]},description:""},changeLocale:{required:!0,tsType:{name:"signature",type:"function",raw:"(locale: LocaleAll) => void",signature:{arguments:[{type:{name:"union",raw:"LocaleNo | 'en'",elements:[{name:"union",raw:"'nb' | 'nn'",elements:[{name:"literal",value:"'nb'"},{name:"literal",value:"'nn'"}]},{name:"literal",value:"'en'"}]},name:"locale"}],return:{name:"void"}}},description:""}}};const W={...J,...c.nb},X={nb:W,nn:{...Y,...c.nn},en:{...G,...c.en}},Z=()=>{const n="nb";return f.locale(n),n},l=()=>{const[n,r]=o.useState(Z());Q(()=>{B("applikasjon-hendelse",{app:"veivisere",team:"foreldrepenger",pageKey:"page-unload"})});const t=o.useCallback(i=>{r(i),f.locale(i),document.documentElement.setAttribute("lang",i)},[]);return e.jsx(I,{locale:n,messagesGroupedByLocale:X,children:e.jsx(C,{appName:"Foreldrepengeveivisere",customErrorPage:e.jsx(D,{}),children:e.jsx(V,{locale:n,changeLocale:t})})})};l.__docgenInfo={description:"",methods:[],displayName:"AppContainer"};const le={title:"AppContainer",component:l},d={render:()=>(y(),e.jsx(o.StrictMode,{children:e.jsx(k,{initialEntries:[s.HVOR_MYE+u.OM],children:e.jsx(l,{})})}))},m={render:()=>(y(),e.jsx(o.StrictMode,{children:e.jsx(k,{initialEntries:[s.HVA_SKJER+h.OM],children:e.jsx(l,{})})}))},p={render:()=>(y(),e.jsx(o.StrictMode,{children:e.jsx(k,{initialEntries:[s.FP_ELLER_ES+F.OM],children:e.jsx(l,{})})}))};var v,j,b;d.parameters={...d.parameters,docs:{...(v=d.parameters)==null?void 0:v.docs,source:{originalSource:`{
  render: () => {
    initAmplitude();
    return <StrictMode>
                <MemoryRouter initialEntries={[ContextRoutes.HVOR_MYE + HvorMyeRoutes.OM]}>
                    <AppContainer />
                </MemoryRouter>
            </StrictMode>;
  }
}`,...(b=(j=d.parameters)==null?void 0:j.docs)==null?void 0:b.source}}};var S,M,T;m.parameters={...m.parameters,docs:{...(S=m.parameters)==null?void 0:S.docs,source:{originalSource:`{
  render: () => {
    initAmplitude();
    return <StrictMode>
                <MemoryRouter initialEntries={[ContextRoutes.HVA_SKJER + HvaSkjerNårRoutes.OM]}>
                    <AppContainer />
                </MemoryRouter>
            </StrictMode>;
  }
}`,...(T=(M=m.parameters)==null?void 0:M.docs)==null?void 0:T.source}}};var w,E,q;p.parameters={...p.parameters,docs:{...(w=p.parameters)==null?void 0:w.docs,source:{originalSource:`{
  render: () => {
    initAmplitude();
    return <StrictMode>
                <MemoryRouter initialEntries={[ContextRoutes.FP_ELLER_ES + FpEllerEsRoutes.OM]}>
                    <AppContainer />
                </MemoryRouter>
            </StrictMode>;
  }
}`,...(q=(E=p.parameters)==null?void 0:E.docs)==null?void 0:q.source}}};const de=["HvorMyeVeileder","HvaSkjerNårVeileder","FpEllerEsVeileder"];export{p as FpEllerEsVeileder,m as HvaSkjerNårVeileder,d as HvorMyeVeileder,de as __namedExportsOrder,le as default};
