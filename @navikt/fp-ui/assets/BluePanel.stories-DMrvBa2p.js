import{j as t}from"./iframe-BQhQ0Dqx.js";import"./preload-helper-PPVm8Dsz.js";const c="_box_1393w_1",i="_animation_1393w_6",d="_darkBlue_1393w_10",u="_blue_1393w_14",e={box:c,animation:i,darkBlue:d,blue:u},s=({children:n,isDarkBlue:l=!1,shouldFadeIn:o=!1})=>t.jsx("div",{className:`${e.box} ${o?e.animation:void 0} ${l?e.darkBlue:e.blue}`,children:n});s.__docgenInfo={description:"",methods:[],displayName:"BluePanel",props:{children:{required:!0,tsType:{name:"union",raw:"React.ReactElement | React.ReactElement[]",elements:[{name:"ReactReactElement",raw:"React.ReactElement"},{name:"Array",elements:[{name:"ReactReactElement",raw:"React.ReactElement"}],raw:"React.ReactElement[]"}]},description:""},isDarkBlue:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},shouldFadeIn:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}}}};const f={title:"components/BluePanel",component:s},a={args:{isDarkBlue:!1,children:t.jsx("div",{children:"blue"})}},r={args:{isDarkBlue:!0,children:t.jsx("div",{children:"dark blue"})}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    isDarkBlue: false,
    children: <div>blue</div>
  }
}`,...a.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    isDarkBlue: true,
    children: <div>dark blue</div>
  }
}`,...r.parameters?.docs?.source}}};const _=["Default","DarkBlueHeader"];export{r as DarkBlueHeader,a as Default,_ as __namedExportsOrder,f as default};
