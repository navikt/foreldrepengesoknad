import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{p as P}from"./planBemUtils-iB9QgqEi.js";import{B as T}from"./Label-Dx2I3kAQ.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./index-F2Fta7eo.js";const j=s=>e.jsx("svg",{focusable:"false",role:"img","aria-hidden":"true",width:24,height:24,...s,children:e.jsxs("g",{fill:"none",fillRule:"evenodd",children:[e.jsx("path",{fill:"#1C6937",d:"M12 .5C18.34.5 23.5 5.66 23.5 12S18.34 23.5 12 23.5C5.659 23.5.5 18.341.5 12S5.659.5 12 .5z"}),e.jsx("path",{fill:"#FFF",d:"M16.329 7.76a1 1 0 1 1 1.363 1.464l-7.52 7.007a1 1 0 0 1-1.388-.024L6.28 13.709a1 1 0 0 1 1.413-1.416l1.82 1.817 6.816-6.35z"})]})});j.__docgenInfo={description:"",methods:[],displayName:"CheckmarkIkon"};const N=({tittel:s,children:R,ikon:i,invertert:D,textValign:I="top"})=>{const t=P("personkort");return e.jsxs("div",{className:t.classNames(t.block,t.modifierConditional("invertert",D===!0),t.modifier(`valign-${I}`)),children:[i&&e.jsx("div",{className:t.element("ikon"),children:i}),e.jsxs("div",{className:t.element("innhold"),children:[s&&e.jsx(T,{className:"tittel",children:s}),e.jsx("div",{className:t.element("tekst"),children:R})]})]})};N.__docgenInfo={description:"",methods:[],displayName:"Personkort",props:{tittel:{required:!1,tsType:{name:"string"},description:""},children:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},ikon:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},invertert:{required:!1,tsType:{name:"boolean"},description:""},textValign:{required:!1,tsType:{name:"union",raw:"'top' | 'center' | 'bottom'",elements:[{name:"literal",value:"'top'"},{name:"literal",value:"'center'"},{name:"literal",value:"'bottom'"}]},description:"",defaultValue:{value:"'top'",computed:!1}}}};const _={title:"components/Personkort",component:N},r={args:{tittel:"Dette er en tittel",children:e.jsx("div",{children:"Dette er innholdet"})}},o={args:{...r.args,ikon:e.jsx(j,{})}},a={args:{...r.args,invertert:!0}},n={args:{...r.args,textValign:"bottom"}};var l,c,d;r.parameters={...r.parameters,docs:{...(l=r.parameters)==null?void 0:l.docs,source:{originalSource:`{
  args: {
    tittel: 'Dette er en tittel',
    children: <div>Dette er innholdet</div>
  }
}`,...(d=(c=r.parameters)==null?void 0:c.docs)==null?void 0:d.source}}};var m,p,u;o.parameters={...o.parameters,docs:{...(m=o.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    ikon: <CheckmarkIkon />
  }
}`,...(u=(p=o.parameters)==null?void 0:p.docs)==null?void 0:u.source}}};var g,k,f;a.parameters={...a.parameters,docs:{...(g=a.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    invertert: true
  }
}`,...(f=(k=a.parameters)==null?void 0:k.docs)==null?void 0:f.source}}};var h,v,x;n.parameters={...n.parameters,docs:{...(h=n.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    textValign: 'bottom'
  }
}`,...(x=(v=n.parameters)==null?void 0:v.docs)==null?void 0:x.source}}};const q=["Default","PersonkortMedIkon","PersonkortMedInvertertTekst","PersonkortMedTextAlignBottom"];export{r as Default,o as PersonkortMedIkon,a as PersonkortMedInvertertTekst,n as PersonkortMedTextAlignBottom,q as __namedExportsOrder,_ as default};
