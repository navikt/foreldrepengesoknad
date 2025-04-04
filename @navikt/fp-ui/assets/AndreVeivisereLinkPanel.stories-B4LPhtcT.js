import{j as e}from"./jsx-runtime-CLpGMVip.js";import"./index-Bv0NUv48.js";import{V as u}from"./VStack-DRnT_Rrz.js";import"./index-CZMpeKRu.js";import"./Theme-JKiW9dZF.js";import{H as k}from"./Label-Ci105u78.js";import{M as g}from"./message-Dgb3GyQu.js";import{L as x}from"./Link-ds-tgy9L.js";import{B as v}from"./Box-wTZlJka5.js";import"./useId-C4o4GVcR.js";import"./BasePrimitive-Dyo2R59Y.js";const h="_background_ycpd6_1",j="_box_ycpd6_6",_="_lenkepanel_ycpd6_18",t={background:h,box:j,lenkepanel:_},p=({links:o})=>e.jsx("div",{className:t.background,children:e.jsx("div",{className:t.box,children:e.jsxs(u,{gap:"2",children:[o.length>1&&e.jsx(k,{size:"small",level:"2",children:e.jsx(g,{id:"AndreVeivisereLinkPanel.AndreVeivisere"})}),o.map(s=>e.jsx(x,{inlineText:!0,href:s.url,rel:"noreferrer",className:t.lenkepanel,children:e.jsx(v,{padding:"4",background:"surface-default",borderRadius:"xlarge",shadow:"small",children:s.content})},s.url))]})})});p.__docgenInfo={description:"",methods:[],displayName:"AndreVeivisereLinkPanel",props:{links:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
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
