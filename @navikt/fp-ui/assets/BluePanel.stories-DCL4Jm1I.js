import{j as n}from"./iframe-DSz8ReYh.js";const f="_box_1cyn7_1",_="_animation_1cyn7_6",R="_darkBlue_1cyn7_10",b="_blue_1cyn7_14",e={box:f,animation:_,darkBlue:R,blue:b},i=({children:u,isDarkBlue:m=!1,shouldFadeIn:p=!1})=>n.jsx("div",{className:`${e.box} ${p?e.animation:void 0} ${m?e.darkBlue:e.blue}`,children:u});i.__docgenInfo={description:"",methods:[],displayName:"BluePanel",props:{children:{required:!0,tsType:{name:"union",raw:"React.ReactElement | React.ReactElement[]",elements:[{name:"ReactReactElement",raw:"React.ReactElement"},{name:"Array",elements:[{name:"ReactReactElement",raw:"React.ReactElement"}],raw:"React.ReactElement[]"}]},description:""},isDarkBlue:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},shouldFadeIn:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}}}};const k={title:"components/BluePanel",component:i},a={args:{isDarkBlue:!1,children:n.jsx("div",{children:"blue"})}},r={args:{isDarkBlue:!0,children:n.jsx("div",{children:"dark blue"})}};var t,s,l;a.parameters={...a.parameters,docs:{...(t=a.parameters)==null?void 0:t.docs,source:{originalSource:`{
  args: {
    isDarkBlue: false,
    children: <div>blue</div>
  }
}`,...(l=(s=a.parameters)==null?void 0:s.docs)==null?void 0:l.source}}};var o,c,d;r.parameters={...r.parameters,docs:{...(o=r.parameters)==null?void 0:o.docs,source:{originalSource:`{
  args: {
    isDarkBlue: true,
    children: <div>dark blue</div>
  }
}`,...(d=(c=r.parameters)==null?void 0:c.docs)==null?void 0:d.source}}};const x=["Default","DarkBlueHeader"];export{r as DarkBlueHeader,a as Default,x as __namedExportsOrder,k as default};
