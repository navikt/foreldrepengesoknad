import{j as l}from"./jsx-runtime-_e34SzbC.js";const a="_mediumCircle_44l11_1",u="_largeCircle_44l11_10",t="_xlCircle_44l11_19",m="_green_44l11_28",d="_mediumGreen_44l11_31",s="_darkGreen_44l11_35",c="_gray_44l11_39",_="_blue_44l11_43",g="_lightBlue_44l11_46",o="_darkBlue_44l11_49",r={mediumCircle:a,largeCircle:u,xlCircle:t,green:m,mediumGreen:d,darkGreen:s,gray:c,blue:_,lightBlue:g,darkBlue:o},p=e=>e==="green"?r.green:e==="gray"?r.gray:e==="blue"?r.blue:e==="lightBlue"?r.lightBlue:e==="darkBlue"?r.darkBlue:e==="mediumGreen"?r.mediumGreen:r.darkGreen,C=e=>e==="medium"?r.mediumCircle:e==="large"?r.largeCircle:r.xlCircle,B=({children:e,color:i,size:n})=>l.jsx("div",{children:l.jsx("div",{className:`${C(n)} ${p(i)}`,children:e})});B.__docgenInfo={description:"",methods:[],displayName:"IconCircleWrapper",props:{children:{required:!0,tsType:{name:"ReactNode"},description:""},color:{required:!0,tsType:{name:"union",raw:"'darkGreen' | 'mediumGreen' | 'green' | 'gray' | 'blue' | 'lightBlue' | 'darkBlue'",elements:[{name:"literal",value:"'darkGreen'"},{name:"literal",value:"'mediumGreen'"},{name:"literal",value:"'green'"},{name:"literal",value:"'gray'"},{name:"literal",value:"'blue'"},{name:"literal",value:"'lightBlue'"},{name:"literal",value:"'darkBlue'"}]},description:""},size:{required:!0,tsType:{name:"union",raw:"'medium' | 'large' | 'xl'",elements:[{name:"literal",value:"'medium'"},{name:"literal",value:"'large'"},{name:"literal",value:"'xl'"}]},description:""}}};export{B as I};
