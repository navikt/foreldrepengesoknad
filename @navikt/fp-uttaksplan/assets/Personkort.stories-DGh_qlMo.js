import{j as e}from"./jsx-runtime-QvZ8i92b.js";import{p as y}from"./planBemUtils-Bdbu0z9K.js";import{B as I}from"./Label-DNmfoi2y.js";import"./index-uubelm5h.js";const P=r=>e.jsx("svg",{focusable:"false",role:"img","aria-hidden":"true",width:24,height:24,...r,children:e.jsxs("g",{fill:"none",fillRule:"evenodd",children:[e.jsx("path",{fill:"#1C6937",d:"M12 .5C18.34.5 23.5 5.66 23.5 12S18.34 23.5 12 23.5C5.659 23.5.5 18.341.5 12S5.659.5 12 .5z"}),e.jsx("path",{fill:"#FFF",d:"M16.329 7.76a1 1 0 1 1 1.363 1.464l-7.52 7.007a1 1 0 0 1-1.388-.024L6.28 13.709a1 1 0 0 1 1.413-1.416l1.82 1.817 6.816-6.35z"})]})});P.__docgenInfo={description:"",methods:[],displayName:"CheckmarkIkon"};const N=({tittel:r,children:D,ikon:l,invertert:R,textValign:T="top"})=>{const t=y("personkort");return e.jsxs("div",{className:t.classNames(t.block,t.modifierConditional("invertert",R===!0),t.modifier(`valign-${T}`)),children:[l&&e.jsx("div",{className:t.element("ikon"),children:l}),e.jsxs("div",{className:t.element("innhold"),children:[r&&e.jsx(I,{className:"tittel",children:r}),e.jsx("div",{className:t.element("tekst"),children:D})]})]})},b=N;N.__docgenInfo={description:"",methods:[],displayName:"Personkort",props:{tittel:{required:!1,tsType:{name:"string"},description:""},children:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},ikon:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},invertert:{required:!1,tsType:{name:"boolean"},description:""},textValign:{required:!1,tsType:{name:"union",raw:"'top' | 'center' | 'bottom'",elements:[{name:"literal",value:"'top'"},{name:"literal",value:"'center'"},{name:"literal",value:"'bottom'"}]},description:"",defaultValue:{value:"'top'",computed:!1}}}};const q={title:"components/Personkort",component:b},i=r=>e.jsx(b,{...r}),s=i.bind({});s.args={tittel:"Dette er en tittel",children:e.jsx("div",{children:"Dette er innholdet"})};const o=i.bind({});o.args={tittel:"Dette er en tittel",children:e.jsx("div",{children:"Dette er innholdet"}),ikon:e.jsx(P,{})};const a=i.bind({});a.args={tittel:"Dette er en tittel",children:e.jsx("div",{children:"Dette er innholdet"}),invertert:!0};const n=i.bind({});n.args={tittel:"Dette er en tittel",children:e.jsx("div",{children:"Dette er innholdet"}),textValign:"bottom"};var d,c,m;s.parameters={...s.parameters,docs:{...(d=s.parameters)==null?void 0:d.docs,source:{originalSource:"args => <Personkort {...args} />",...(m=(c=s.parameters)==null?void 0:c.docs)==null?void 0:m.source}}};var p,u,h;o.parameters={...o.parameters,docs:{...(p=o.parameters)==null?void 0:p.docs,source:{originalSource:"args => <Personkort {...args} />",...(h=(u=o.parameters)==null?void 0:u.docs)==null?void 0:h.source}}};var k,g,x;a.parameters={...a.parameters,docs:{...(k=a.parameters)==null?void 0:k.docs,source:{originalSource:"args => <Personkort {...args} />",...(x=(g=a.parameters)==null?void 0:g.docs)==null?void 0:x.source}}};var f,v,j;n.parameters={...n.parameters,docs:{...(f=n.parameters)==null?void 0:f.docs,source:{originalSource:"args => <Personkort {...args} />",...(j=(v=n.parameters)==null?void 0:v.docs)==null?void 0:j.source}}};const B=["Default","PersonkortMedIkon","PersonkortMedInvertertTekst","PersonkortMedTextAlignBottom"];export{s as Default,o as PersonkortMedIkon,a as PersonkortMedInvertertTekst,n as PersonkortMedTextAlignBottom,B as __namedExportsOrder,q as default};
