import{j as e}from"./iframe-COlAyNM_.js";import{p as u}from"./planBemUtils-B4aBWpid.js";import{B as g}from"./Label-YjwtnK4Z.js";import"./preload-helper-PPVm8Dsz.js";const l=s=>e.jsx("svg",{focusable:"false",role:"img","aria-hidden":"true",width:24,height:24,...s,children:e.jsxs("g",{fill:"none",fillRule:"evenodd",children:[e.jsx("path",{fill:"#1C6937",d:"M12 .5C18.34.5 23.5 5.66 23.5 12S18.34 23.5 12 23.5C5.659 23.5.5 18.341.5 12S5.659.5 12 .5z"}),e.jsx("path",{fill:"#FFF",d:"M16.329 7.76a1 1 0 1 1 1.363 1.464l-7.52 7.007a1 1 0 0 1-1.388-.024L6.28 13.709a1 1 0 0 1 1.413-1.416l1.82 1.817 6.816-6.35z"})]})});l.__docgenInfo={description:"",methods:[],displayName:"CheckmarkIkon"};const c=({tittel:s,children:d,ikon:i,invertert:m,textValign:p="top"})=>{const t=u("personkort");return e.jsxs("div",{className:t.classNames(t.block,t.modifierConditional("invertert",m===!0),t.modifier(`valign-${p}`)),children:[i&&e.jsx("div",{className:t.element("ikon"),children:i}),e.jsxs("div",{className:t.element("innhold"),children:[s&&e.jsx(g,{className:"tittel",children:s}),e.jsx("div",{className:t.element("tekst"),children:d})]})]})};c.__docgenInfo={description:"",methods:[],displayName:"Personkort",props:{tittel:{required:!1,tsType:{name:"string"},description:""},children:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},ikon:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},invertert:{required:!1,tsType:{name:"boolean"},description:""},textValign:{required:!1,tsType:{name:"union",raw:"'top' | 'center' | 'bottom'",elements:[{name:"literal",value:"'top'"},{name:"literal",value:"'center'"},{name:"literal",value:"'bottom'"}]},description:"",defaultValue:{value:"'top'",computed:!1}}}};const x={title:"components/Personkort",component:c},r={args:{tittel:"Dette er en tittel",children:e.jsx("div",{children:"Dette er innholdet"})}},o={args:{...r.args,ikon:e.jsx(l,{})}},a={args:{...r.args,invertert:!0}},n={args:{...r.args,textValign:"bottom"}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    tittel: 'Dette er en tittel',
    children: <div>Dette er innholdet</div>
  }
}`,...r.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    ikon: <CheckmarkIkon />
  }
}`,...o.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    invertert: true
  }
}`,...a.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    textValign: 'bottom'
  }
}`,...n.parameters?.docs?.source}}};const j=["Default","PersonkortMedIkon","PersonkortMedInvertertTekst","PersonkortMedTextAlignBottom"];export{r as Default,o as PersonkortMedIkon,a as PersonkortMedInvertertTekst,n as PersonkortMedTextAlignBottom,j as __namedExportsOrder,x as default};
