import{j as e}from"./jsx-runtime-Cw0GR0a5.js";import{u as g,H as o}from"./VStack-CHPVCYB5.js";import{r as c}from"./index-CTjT7uj6.js";var u=function(l,t){var a={};for(var n in l)Object.prototype.hasOwnProperty.call(l,n)&&t.indexOf(n)<0&&(a[n]=l[n]);if(l!=null&&typeof Object.getOwnPropertySymbols=="function")for(var r=0,n=Object.getOwnPropertySymbols(l);r<n.length;r++)t.indexOf(n[r])<0&&Object.prototype.propertyIsEnumerable.call(l,n[r])&&(a[n[r]]=l[n[r]]);return a};const w=c.forwardRef((l,t)=>{var{title:a,titleId:n}=l,r=u(l,["title","titleId"]);let s=g();return s=a?n||"title-"+s:void 0,c.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",width:"1em",height:"1em",fill:"none",viewBox:"0 0 24 24",focusable:!1,role:"img",ref:t,"aria-labelledby":s},r),a?c.createElement("title",{id:s},a):null,c.createElement("path",{fill:"currentColor",d:"M12 4.969c1.399-1.242 2.776-1.844 4.125-1.844 1.519 0 2.823.763 3.905 1.845 2.373 2.372 2.206 6.354-1 9.56l-6.5 6.5a.75.75 0 0 1-1.06 0l-6.5-6.5c-3.207-3.206-3.373-7.188-1-9.56C5.05 3.888 6.355 3.125 7.874 3.125c1.349 0 2.726.602 4.125 1.844"}))}),f="_bluePanel_15wpg_1",h="_greenPanel_15wpg_12",x="_pinkPanel_15wpg_23",v="_purplePanel_15wpg_34",_="_margin_15wpg_45",i={bluePanel:f,greenPanel:h,pinkPanel:x,purplePanel:v,margin:_},p=()=>e.jsx("svg",{width:"16",height:"16",viewBox:"0 0 16 16",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:e.jsx("circle",{cx:"8.19192",cy:"8.00051",r:"7.69192",fill:"#66A5F4"})});p.__docgenInfo={description:"",methods:[],displayName:"BlåSirkel"};const d=()=>e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",viewBox:"0 0 16 16",fill:"none",children:e.jsx("circle",{cx:"8",cy:"8",r:"7",stroke:"#66C786",strokeWidth:"2"})});d.__docgenInfo={description:"",methods:[],displayName:"GrønnSirkel"};const m=()=>e.jsx("svg",{width:"16",height:"16",viewBox:"0 0 16 16",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:e.jsx("circle",{cx:"8.19192",cy:"8.00051",r:"7.69192",fill:"#8269A2"})});m.__docgenInfo={description:"",methods:[],displayName:"LillaSirkel"};const j=({children:l,iconType:t})=>t==="pink"?e.jsx("div",{className:i.pinkPanel,children:e.jsxs(o,{gap:"2",align:"center",children:[l,e.jsx(w,{color:"#F68282","aria-hidden":!0})]})}):t==="purple"?e.jsx("div",{className:i.purplePanel,children:e.jsxs(o,{gap:"2",align:"center",children:[l,e.jsxs("div",{className:i.margin,children:[e.jsx(m,{})," "]})]})}):e.jsx("div",{className:t==="blue"?i.bluePanel:i.greenPanel,children:e.jsxs(o,{gap:"2",align:"end",wrap:!1,children:[l,e.jsx("div",{className:i.margin,children:t==="blue"?e.jsx(p,{}):e.jsx(d,{})})]})});j.__docgenInfo={description:"",methods:[],displayName:"CalendarLabel",props:{children:{required:!0,tsType:{name:"union",raw:"React.ReactElement | React.ReactElement[]",elements:[{name:"ReactReactElement",raw:"React.ReactElement"},{name:"Array",elements:[{name:"ReactReactElement",raw:"React.ReactElement"}],raw:"React.ReactElement[]"}]},description:""},iconType:{required:!0,tsType:{name:"union",raw:"'blue' | 'green' | 'pink' | 'purple'",elements:[{name:"literal",value:"'blue'"},{name:"literal",value:"'green'"},{name:"literal",value:"'pink'"},{name:"literal",value:"'purple'"}]},description:""}}};export{j as C};
