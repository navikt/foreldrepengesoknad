import{j as e}from"./iframe-GAKCsdyP.js";import{V as i}from"./VStack-DL8RDrXR.js";import"./useId-P_lFS7nO.js";import{H as l}from"./Label-nWD2bbeC.js";import{M as d}from"./message-BKFFATpH.js";import{L as c}from"./Link-BPW8PbR4.js";import{B as m}from"./Box-CE6dBuUf.js";import"./BasePrimitive-CLK9kf-p.js";const p="_background_ycpd6_1",u="_box_ycpd6_6",k="_lenkepanel_ycpd6_18",t={background:p,box:u,lenkepanel:k},a=({links:o})=>e.jsx("div",{className:t.background,children:e.jsx("div",{className:t.box,children:e.jsxs(i,{gap:"2",children:[o.length>1&&e.jsx(l,{size:"small",level:"2",children:e.jsx(d,{id:"AndreVeivisereLinkPanel.AndreVeivisere"})}),o.map(s=>e.jsx(c,{inlineText:!0,href:s.url,rel:"noreferrer",className:t.lenkepanel,children:e.jsx(m,{padding:"4",background:"surface-default",borderRadius:"xlarge",shadow:"small",children:s.content})},s.url))]})})});a.__docgenInfo={description:"",methods:[],displayName:"AndreVeivisereLinkPanel",props:{links:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    url: string;
    content: ReactElement;
}`,signature:{properties:[{key:"url",value:{name:"string",required:!0}},{key:"content",value:{name:"ReactElement",required:!0}}]}}],raw:"AndreVeivisereLink[]"},description:""}}};const L={title:"components/AndreVeivisereLinkPanel",component:a},n={args:{links:[{url:"test",content:e.jsx("div",{children:"Innhold lenke 1"})}]}},r={args:{links:[{url:"test",content:e.jsx("div",{children:"Innhold lenke 1"})},{url:"test2",content:e.jsx("div",{children:"Innhold lenke 2"})}]}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    links: [{
      url: 'test',
      content: <div>Innhold lenke 1</div>
    }]
  }
}`,...n.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    links: [{
      url: 'test',
      content: <div>Innhold lenke 1</div>
    }, {
      url: 'test2',
      content: <div>Innhold lenke 2</div>
    }]
  }
}`,...r.parameters?.docs?.source}}};const y=["EnLenke","FlereLenker"];export{n as EnLenke,r as FlereLenker,y as __namedExportsOrder,L as default};
