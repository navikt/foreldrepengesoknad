import{j as e}from"./iframe-2Nr283LL.js";import{V as i}from"./VStack-BxnSnObx.js";import{H as l}from"./Label-EfR68mLv.js";import{M as d}from"./message-M-qqqW7t.js";import{L as c}from"./Link-BtzvQYST.js";import{B as m}from"./Box-BZ7txUw5.js";import"./preload-helper-D9Z9MdNV.js";import"./useId-WWazWfdV.js";import"./BasePrimitive-DR-gWIMq.js";const p="_background_1rl6v_1",u="_box_1rl6v_5",k="_lenkepanel_1rl6v_17",t={background:p,box:u,lenkepanel:k},a=({links:o})=>e.jsx("div",{className:t.background,children:e.jsx("div",{className:t.box,children:e.jsxs(i,{gap:"space-8",children:[o.length>1&&e.jsx(l,{size:"small",level:"2",children:e.jsx(d,{id:"AndreVeivisereLinkPanel.AndreVeivisere"})}),o.map(s=>e.jsx(c,{inlineText:!0,href:s.url,rel:"noreferrer",className:t.lenkepanel,children:e.jsx(m.New,{padding:"4",background:"default",borderRadius:"xlarge",children:s.content})},s.url))]})})});a.__docgenInfo={description:"",methods:[],displayName:"AndreVeivisereLinkPanel",props:{links:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    url: string;
    content: ReactElement;
}`,signature:{properties:[{key:"url",value:{name:"string",required:!0}},{key:"content",value:{name:"ReactElement",required:!0}}]}}],raw:"AndreVeivisereLink[]"},description:""}}};const V={title:"components/AndreVeivisereLinkPanel",component:a},n={args:{links:[{url:"test",content:e.jsx("div",{children:"Innhold lenke 1"})}]}},r={args:{links:[{url:"test",content:e.jsx("div",{children:"Innhold lenke 1"})},{url:"test2",content:e.jsx("div",{children:"Innhold lenke 2"})}]}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
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
}`,...r.parameters?.docs?.source}}};const y=["EnLenke","FlereLenker"];export{n as EnLenke,r as FlereLenker,y as __namedExportsOrder,V as default};
