import{j as r}from"./jsx-runtime-DwRxq3ZX.js";import"./index-BX3iQpgp.js";const f="_box_1cyn7_1",_="_animation_1cyn7_6",R="_darkBlue_1cyn7_10",b="_blue_1cyn7_14",e={box:f,animation:_,"fade-in":"_fade-in_1cyn7_1",darkBlue:R,blue:b},i=({children:u,isDarkBlue:m=!1,shouldFadeIn:p=!1})=>r.jsx("div",{className:`${e.box} ${p?e.animation:void 0} ${m?e.darkBlue:e.blue}`,children:u});i.__docgenInfo={description:"",methods:[],displayName:"BluePanel",props:{children:{required:!0,tsType:{name:"union",raw:"React.ReactElement | React.ReactElement[]",elements:[{name:"ReactReactElement",raw:"React.ReactElement"},{name:"Array",elements:[{name:"ReactReactElement",raw:"React.ReactElement"}],raw:"React.ReactElement[]"}]},description:""},isDarkBlue:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},shouldFadeIn:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}}}};const x={title:"components/BluePanel",component:i},a={args:{isDarkBlue:!1,children:r.jsx("div",{children:"blue"})}},n={args:{isDarkBlue:!0,children:r.jsx("div",{children:"dark blue"})}};var t,s,l;a.parameters={...a.parameters,docs:{...(t=a.parameters)==null?void 0:t.docs,source:{originalSource:`{
  args: {
    isDarkBlue: false,
    children: <div>blue</div>
  }
}`,...(l=(s=a.parameters)==null?void 0:s.docs)==null?void 0:l.source}}};var c,o,d;n.parameters={...n.parameters,docs:{...(c=n.parameters)==null?void 0:c.docs,source:{originalSource:`{
  args: {
    isDarkBlue: true,
    children: <div>dark blue</div>
  }
}`,...(d=(o=n.parameters)==null?void 0:o.docs)==null?void 0:d.source}}};const y=["Default","DarkBlueHeader"];export{n as DarkBlueHeader,a as Default,y as __namedExportsOrder,x as default};
