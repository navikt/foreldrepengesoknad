import{j as e}from"./jsx-runtime-Cw0GR0a5.js";import"./index-Bo6hejM9.js";import{V as u}from"./VStack-Bd1wS6ci.js";import"./index-CTjT7uj6.js";import{H as k}from"./Label-oPV7DuXz.js";import{M as g}from"./message-Cb07H1bc.js";import{L as x}from"./Link-Cq_02NdE.js";import{B as h}from"./Box-NsBh_7cn.js";import"./useId-BGzI-o9Y.js";import"./BasePrimitive-D4NMUMeT.js";import"./useMergeRefs-Bb4JH14W.js";const v="_background_ycpd6_1",j="_box_ycpd6_6",_="_lenkepanel_ycpd6_18",t={background:v,box:j,lenkepanel:_},p=({links:o})=>e.jsx("div",{className:t.background,children:e.jsx("div",{className:t.box,children:e.jsxs(u,{gap:"2",children:[o.length>1&&e.jsx(k,{size:"small",children:e.jsx(g,{id:"AndreVeivisereLinkPanel.AndreVeivisere"})}),o.map(s=>e.jsx(x,{inlineText:!0,href:s.url,rel:"noreferrer",className:t.lenkepanel,children:e.jsx(h,{padding:"4",background:"surface-default",borderRadius:"xlarge",shadow:"small",children:s.content})},s.url))]})})});p.__docgenInfo={description:"",methods:[],displayName:"AndreVeivisereLinkPanel",props:{links:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    url: string;
    content: ReactElement;
}`,signature:{properties:[{key:"url",value:{name:"string",required:!0}},{key:"content",value:{name:"ReactElement",required:!0}}]}}],raw:"AndreVeivisereLink[]"},description:""}}};const q={title:"components/AndreVeivisereLinkPanel",component:p},n={args:{links:[{url:"test",content:e.jsx("div",{children:"Innhold lenke 1"})}]}},r={args:{links:[{url:"test",content:e.jsx("div",{children:"Innhold lenke 1"})},{url:"test2",content:e.jsx("div",{children:"Innhold lenke 2"})}]}};var a,i,l;n.parameters={...n.parameters,docs:{...(a=n.parameters)==null?void 0:a.docs,source:{originalSource:`{
  args: {
    links: [{
      url: 'test',
      content: <div>Innhold lenke 1</div>
    }]
  }
}`,...(l=(i=n.parameters)==null?void 0:i.docs)==null?void 0:l.source}}};var d,c,m;r.parameters={...r.parameters,docs:{...(d=r.parameters)==null?void 0:d.docs,source:{originalSource:`{
  args: {
    links: [{
      url: 'test',
      content: <div>Innhold lenke 1</div>
    }, {
      url: 'test2',
      content: <div>Innhold lenke 2</div>
    }]
  }
}`,...(m=(c=r.parameters)==null?void 0:c.docs)==null?void 0:m.source}}};const w=["EnLenke","FlereLenker"];export{n as EnLenke,r as FlereLenker,w as __namedExportsOrder,q as default};
