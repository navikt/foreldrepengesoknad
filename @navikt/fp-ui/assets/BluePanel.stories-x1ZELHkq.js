import{j as n}from"./iframe-GAKCsdyP.js";const c="_box_1cyn7_1",d="_animation_1cyn7_6",i="_darkBlue_1cyn7_10",u="_blue_1cyn7_14",e={box:c,animation:d,darkBlue:i,blue:u},t=({children:s,isDarkBlue:l=!1,shouldFadeIn:o=!1})=>n.jsx("div",{className:`${e.box} ${o?e.animation:void 0} ${l?e.darkBlue:e.blue}`,children:s});t.__docgenInfo={description:"",methods:[],displayName:"BluePanel",props:{children:{required:!0,tsType:{name:"union",raw:"React.ReactElement | React.ReactElement[]",elements:[{name:"ReactReactElement",raw:"React.ReactElement"},{name:"Array",elements:[{name:"ReactReactElement",raw:"React.ReactElement"}],raw:"React.ReactElement[]"}]},description:""},isDarkBlue:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},shouldFadeIn:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}}}};const p={title:"components/BluePanel",component:t},a={args:{isDarkBlue:!1,children:n.jsx("div",{children:"blue"})}},r={args:{isDarkBlue:!0,children:n.jsx("div",{children:"dark blue"})}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    isDarkBlue: false,
    children: <div>blue</div>
  }
}`,...a.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    isDarkBlue: true,
    children: <div>dark blue</div>
  }
}`,...r.parameters?.docs?.source}}};const f=["Default","DarkBlueHeader"];export{r as DarkBlueHeader,a as Default,f as __namedExportsOrder,p as default};
