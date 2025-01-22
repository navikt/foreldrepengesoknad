import{j as e}from"./index-CSZAu0_d.js";import{a as b}from"./useEsNavigator-Bm75jzhl.js";import{r as c}from"./index-CZMpeKRu.js";import{u as I,C as y,V as r,L,H as D,M as n,G as S,B as s,a,l as i,E as l,b as d,c as C}from"./dateFormValidation-Bytmj32C.js";import{C as w}from"./ConfirmationPanel-Bn_I2iXT.js";const E=({locale:x,onChangeLocale:j,startSøknad:u,erVelkommen:h,mellomlagreOgNaviger:g})=>{const t=I(),k=b(g),[p,f]=c.useState(!1),[o,V]=c.useState(h),v=()=>{o?(u(!0),k.goToNextDefaultStep()):f(!0)};return e.jsx(y,{children:e.jsxs(r,{gap:"10",children:[e.jsx(L,{locale:x,availableLocales:["en","nb","nn"],toggleLanguage:m=>j(m)}),e.jsx(D,{size:"large",children:e.jsx(n,{id:"Søknad.Pageheading"})}),e.jsxs(S,{poster:!0,children:[e.jsxs(r,{gap:"5",children:[e.jsx(s,{children:e.jsx(n,{id:"Velkommen.Ingress.Del1"})}),e.jsxs(s,{children:[e.jsx(n,{id:"Velkommen.Ingress.Del2"}),e.jsx(a,{href:i.farMedmor,children:e.jsx(n,{id:"Velkommen.Bobletekst.Del2.link"})})]})]}),e.jsxs("ul",{children:[e.jsx("li",{children:e.jsx(n,{id:"Velkommen.Bobletekst.Del1"})}),e.jsx("li",{children:e.jsx(n,{id:"Velkommen.Bobletekst.Del2"})})]}),e.jsxs(r,{gap:"5",children:[e.jsx(s,{children:e.jsx(n,{id:"Velkommen.Ingress.Del3"})}),e.jsx(a,{href:i.engangsstonad,children:e.jsx(s,{children:e.jsx(n,{id:"Velkommen.Ingress.Link"})})})]})]}),e.jsxs(l,{size:"medium","aria-label":t.formatMessage({id:"Velkommen.Info.Header"}),children:[e.jsx(l.Header,{children:e.jsx(l.Title,{size:"small",children:e.jsx(n,{id:"Velkommen.Info.Header"})})}),e.jsx(l.Content,{children:e.jsxs(r,{gap:"5",children:[e.jsx(s,{children:e.jsx(n,{id:"Velkommen.Info.Del1"})}),e.jsx(s,{children:e.jsx(n,{id:"Velkommen.Info.Del2"})}),e.jsx(s,{children:e.jsx(n,{id:"Velkommen.Info.Del3"})}),e.jsx(s,{children:e.jsx(n,{id:"Velkommen.Info.Del4"})}),e.jsxs(d,{gap:"1",children:[e.jsx(s,{children:e.jsx(n,{id:"Velkommen.Info.Del5"})}),e.jsx(s,{children:e.jsx(a,{href:i.barn,children:e.jsx(n,{id:"Velkommen.Info.Del5.Link"})})})]}),e.jsx(a,{href:i.veiviser,children:e.jsx(n,{id:"Velkommen.Info.Veiviser.Link"})})]})})]}),e.jsx(w,{label:t.formatMessage({id:"Velkommen.Samtykke"}),onChange:()=>V(m=>!m),checked:o,error:p&&!o&&t.formatMessage({id:"Velkommen.Validering.BekreftLestOgForståttRettigheter"}),children:e.jsxs(r,{gap:"5",children:[e.jsxs(d,{gap:"1",children:[e.jsx(s,{children:e.jsx(n,{id:"Velkommen.Plikter.ApneLabel"})}),e.jsx(s,{children:e.jsx(a,{href:i.plikter,style:{color:"var(--a-text-action)"},children:e.jsx(n,{id:"Velkommen.LestOgForstått.Link"})})})]}),e.jsx(s,{children:e.jsx(n,{id:"Velkommen.KunEnStønad"})})]})}),e.jsx(d,{justify:"center",children:e.jsx(C,{type:"button",onClick:v,children:e.jsx(n,{id:"Velkommen.StartSøknad"})})})]})})};E.__docgenInfo={description:"",methods:[],displayName:"Velkommen",props:{onChangeLocale:{required:!0,tsType:{name:"signature",type:"function",raw:"(locale: LocaleAll) => void",signature:{arguments:[{type:{name:"union",raw:"LocaleNo | 'en'",elements:[{name:"union",raw:"'nb' | 'nn'",elements:[{name:"literal",value:"'nb'"},{name:"literal",value:"'nn'"}]},{name:"literal",value:"'en'"}]},name:"locale"}],return:{name:"void"}}},description:""},locale:{required:!0,tsType:{name:"union",raw:"LocaleNo | 'en'",elements:[{name:"union",raw:"'nb' | 'nn'",elements:[{name:"literal",value:"'nb'"},{name:"literal",value:"'nn'"}]},{name:"literal",value:"'en'"}]},description:""},startSøknad:{required:!0,tsType:{name:"signature",type:"function",raw:"(start: boolean) => void",signature:{arguments:[{type:{name:"boolean"},name:"start"}],return:{name:"void"}}},description:""},erVelkommen:{required:!0,tsType:{name:"boolean"},description:""},mellomlagreOgNaviger:{required:!0,tsType:{name:"signature",type:"function",raw:"() => Promise<void>",signature:{arguments:[],return:{name:"Promise",elements:[{name:"void"}],raw:"Promise<void>"}}},description:""}}};export{E as V};
