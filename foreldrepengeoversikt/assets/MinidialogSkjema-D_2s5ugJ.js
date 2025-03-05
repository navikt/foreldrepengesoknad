import{j as i}from"./jsx-runtime-CLpGMVip.js";import{u as ge}from"./useQuery-D4bRZ7iC.js";import{r as c,R as a}from"./index-CR__hKHy.js";import{u as re}from"./index-DjWdgH6H.js";import{k as ve,u as W}from"./api-BLZsujro.js";import{S as ae}from"./skjemanummer-DfIZjofp.js";import"./dates-Ch5Wtujs.js";import{u as Y,a as pe,R as Ce,t as he,b as be,d as ye,e as J,F as Ee}from"./dateFormValidation-ChpnClpd.js";import{a as xe}from"./UttaksdagenString-Du8CFmse.js";import{Y as Q}from"./Ytelse-7td-ciMh.js";import{b as ke,L as G}from"./chunk-SYFQ2XB5-D9pMU80H.js";import{u as N,D as $,b as le,a as Oe,e as ie,H as we,B as q,d as je,L as Se,E as Le}from"./Label-vuqQZ1tj.js";import{c as U}from"./composeEventHandlers-BV8udL3-.js";import{u as _e,S as Re}from"./ChevronDown-CtB47T9y.js";import{A as D}from"./Alert-BICRsfrW.js";import{H as se,V as F}from"./VStack-BZkCtxmu.js";import{u as B,L as Ve,B as Ne}from"./Button-DEopYVou.js";import{M as I}from"./message-CzTHpKKo.js";import{r as Me}from"./stringUtils-xBoGBqui.js";import{a as He,o as Te}from"./useId-CID_lvh_.js";import{M as Ie}from"./index-D2e_E8nu.js";var oe=(e=>(e.OMSORGSOVERTAKELSE="omsorgsovertakelse",e.ADOPSJONSVEDTAK="adopsjonsvedtak",e.TERMINBEKREFTELSE="terminbekreftelse",e.FØDSELSATTEST="fødselsattest",e.ANNEN_INNTEKT="anneninntektDokumentasjon",e.UTSETTELSE_SYKDOM="utsettelseSykdomUttaksplan",e.MORS_AKTIVITET_DOKUMENTASJON="morsaktivitetdokumentasjon",e.OVERFØRING_KVOTE="dokumentasjonOverføringAvKvote",e.ALENEOMSORG="dokumentasjonAvAleneomsorg",e.HV_ØVELSE="hvØvelse",e.NAV_TILTAK="navTiltak",e.TILBAKEBETALING="tilbakebetaling",e.TILRETTELEGGING="tilrettelegging",e))(oe||{});function de(e,l=166,r=!1){let t;function n(...s){const o=()=>{t=void 0,e.apply(this,s)};!t&&r&&o(),clearTimeout(t),t=setTimeout(o,l)}return n.clear=()=>{clearTimeout(t)},n}var Pe=function(e,l){var r={};for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&l.indexOf(t)<0&&(r[t]=e[t]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var n=0,t=Object.getOwnPropertySymbols(e);n<t.length;n++)l.indexOf(t[n])<0&&Object.prototype.propertyIsEnumerable.call(e,t[n])&&(r[t[n]]=e[t[n]]);return r};const Fe=c.forwardRef((e,l)=>{var{children:r,className:t,name:n,timestamp:s,toptextPosition:o}=e,d=Pe(e,["children","className","name","timestamp","toptextPosition"]);const{cn:g}=N();return a.createElement("div",Object.assign({ref:l,className:g("navds-chat__bubble",t)},d),(s||n)&&a.createElement("h3",{className:g("navds-chat__top-text",o&&`navds-chat__top-text--${o}`)},n&&a.createElement($,{as:"span"},n),n&&s&&a.createElement($,{as:"span","aria-hidden":!0},"•"),s&&a.createElement($,{as:"span"},s)),r)});var Ae=function(e,l){var r={};for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&l.indexOf(t)<0&&(r[t]=e[t]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var n=0,t=Object.getOwnPropertySymbols(e);n<t.length;n++)l.indexOf(t[n])<0&&Object.prototype.propertyIsEnumerable.call(e,t[n])&&(r[t[n]]=e[t[n]]);return r};const Z=c.forwardRef((e,l)=>{var{children:r,className:t,name:n,timestamp:s,avatar:o,position:d="left",variant:g="neutral",toptextPosition:u,size:C="medium"}=e,f=Ae(e,["children","className","name","timestamp","avatar","position","variant","toptextPosition","size"]);const{cn:h}=N();return a.createElement("div",Object.assign({ref:l,className:h("navds-chat",t,`navds-chat--${d}`,`navds-chat--top-text-${u??d}`,`navds-chat--${C}`,`navds-chat--${g}`)},f),o&&a.createElement("div",{className:h("navds-chat__avatar"),"aria-hidden":!0},o),a.createElement("ol",{className:h("navds-chat__bubble-wrapper")},a.Children.map(r,(v,y)=>{if(a.isValidElement(v))return a.createElement(le,{as:"li",size:C},a.cloneElement(v,Object.assign({name:n&&y===0?n:void 0,timestamp:s&&y===0?s:void 0},v.props)))})))});Z.Bubble=Fe;const De=()=>{const e=B("GuidePanel");return a.createElement("svg",{width:"56",height:"85",viewBox:"0 0 56 85",fill:"none",xmlns:"http://www.w3.org/2000/svg","aria-label":e("illustrationLabel"),focusable:!1,role:"img"},a.createElement("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M43.1888 40.4308C41.795 44.9808 39.0663 48.7576 35.5693 51.069L35.7484 53.0952L35.7474 53.1777L33.857 69.8797H21.8679L21.8181 69.5289L19.5004 53.1489L19.5862 51.1002C16.0715 48.795 13.3274 45.0119 11.9257 40.4499C11.8781 40.4544 11.83 40.4566 11.7812 40.4566C10.8745 40.4566 10.1562 39.6595 10.1562 38.6939V33.2298C10.1562 32.5825 10.479 32.0106 10.9648 31.7039C11.7229 21.5028 18.8443 13.4855 27.554 13.4855C36.2401 13.4855 43.3472 21.4596 44.1376 31.6211C44.7049 31.8986 45.0937 32.5184 45.0937 33.2298V38.6939C45.0937 39.66 44.3765 40.4566 43.4687 40.4566C43.3731 40.4566 43.2796 40.4478 43.1888 40.4308Z",fill:"#F7F7F7"}),a.createElement("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M35.1471 51.6345C35.0789 55.2819 31.7373 59.0239 27.625 59.0239C23.4949 59.0239 20.142 55.2493 20.1022 51.5869C17.9622 52.1325 14.6956 53.7781 11.9995 56.5281C9.38852 59.1912 7.3125 63.1941 7.3125 66.2993V85.0001H47.9375V66.2993C47.9375 63.1878 45.8167 59.178 43.1575 56.5119C40.4983 53.8458 37.3007 52.2225 35.1471 51.6345Z",fill:"#005B82"}),a.createElement("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M19.9671 51.7134C17.9959 52.4333 14.6891 54.0068 12.1875 56.3964C4.875 54.7595 1.625 50.87 1.625 50.87C1.625 50.87 8.36213 44.2596 8.3662 32.698V32.6857C8.3662 19.1478 15.6319 9.80762 27.6022 9.80762C39.5742 9.80762 46.8399 19.1478 46.8399 32.6857H46.883C46.883 44.2555 53.625 50.87 53.625 50.87C53.625 50.87 50.375 54.7595 43.0625 56.3942L43.0515 56.3964C40.6353 54.1853 37.1309 52.4799 35.2243 51.7589L35.2265 51.7582L35.1508 50.9012L35.1917 50.8302C38.7891 48.5155 41.5804 44.6159 42.9262 39.904C43.0909 39.9961 43.277 40.048 43.4739 40.048C44.1476 40.048 44.6928 39.4431 44.6928 38.6939V33.2298C44.6928 32.5887 44.2936 32.0528 43.7564 31.9114C43.7559 31.904 43.7554 31.8966 43.7549 31.8892C26.7466 33.7984 20.6199 22.068 20.117 22.0672C20.117 22.0672 14.4686 26.1538 11.769 31.0124C11.769 31.0124 11.3576 31.9296 11.3556 31.9605C10.8934 32.1527 10.5637 32.648 10.5637 33.2298V38.6939C10.5637 39.4431 11.1103 40.048 11.7826 40.048C11.9316 40.048 12.0743 40.0184 12.2062 39.9642C13.5668 44.6785 16.3759 48.5738 19.9901 50.8732L20.0035 50.9012L19.9695 51.7134H19.9671Z",fill:"#F25C5C"}),a.createElement("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M21.8159 35.8563C20.766 35.9417 20.4722 34.2696 20.7885 33.1776C20.848 32.9706 21.1956 32.0283 21.8109 32.0283C22.4254 32.0283 22.6968 32.5434 22.7345 32.632C23.1865 33.6965 22.9645 35.7622 21.8159 35.8563",fill:"#262626"}),a.createElement("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M33.9927 35.8563C35.0425 35.9417 35.3364 34.2696 35.0201 33.1776C34.9606 32.9706 34.613 32.0283 33.9977 32.0283C33.3832 32.0283 33.1118 32.5434 33.0741 32.632C32.6221 33.6965 32.8441 35.7622 33.9927 35.8563",fill:"#262626"}),a.createElement("path",{d:"M28.2935 37.5041C28.9213 37.396 29.3501 37.4638 29.5036 37.6748C30.0833 38.4721 29.8979 39.3156 28.9035 40.0081C28.3806 40.372 27.661 40.5001 27.28 40.3114C27.0937 40.2191 26.8758 40.3133 26.7934 40.5218C26.7109 40.7304 26.7951 40.9742 26.9814 41.0665C27.6111 41.3784 28.5794 41.206 29.2931 40.7092C30.6445 39.7682 30.9537 38.3611 30.0758 37.1534C29.7042 36.643 29.0465 36.5389 28.1812 36.688C27.9799 36.7227 27.8418 36.9335 27.8728 37.1589C27.9038 37.3842 28.0921 37.5388 28.2935 37.5041Z",fill:"#262626"}),a.createElement("path",{d:"M32.8337 42.9837C32.7968 43.0623 32.7122 43.2128 32.5763 43.411C32.3463 43.7465 32.0574 44.0829 31.7066 44.3966C30.6611 45.3314 29.3002 45.872 27.5683 45.8225C25.8795 45.7743 24.5247 45.2421 23.4626 44.3839C23.0726 44.0688 22.7506 43.7314 22.4933 43.395C22.3415 43.1967 22.2468 43.0463 22.2053 42.9679C22.1056 42.7794 21.8606 42.7018 21.6581 42.7946C21.4555 42.8873 21.3721 43.1153 21.4718 43.3039C21.5318 43.4174 21.6487 43.6029 21.8273 43.8363C22.1206 44.2196 22.4852 44.6018 22.9266 44.9584C24.1256 45.9272 25.6579 46.5292 27.5432 46.583C29.5064 46.6391 31.0759 46.0156 32.273 44.9453C32.6733 44.5874 33.0023 44.2042 33.2656 43.8202C33.4257 43.5867 33.5298 43.4014 33.5829 43.2881C33.6733 43.0955 33.5788 42.8713 33.3719 42.7872C33.165 42.7032 32.924 42.7911 32.8337 42.9837Z",fill:"#262626"}),a.createElement("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M41.8629 70.5H30.8865C30.3966 70.5 30 70.0974 30 69.6001V63.609C30 63.1117 30.3966 62.7084 30.8865 62.7084H41.8629C42.3527 62.7084 42.75 63.1117 42.75 63.609V69.6001C42.75 70.0974 42.3527 70.5 41.8629 70.5",fill:"white"}),a.createElement("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M37.0345 63.9451H35.8971C35.8128 63.9451 35.7449 63.8775 35.7449 63.7937V63.6029C35.7449 63.5197 35.8128 63.4515 35.8971 63.4515H37.0345C37.1188 63.4515 37.1867 63.5197 37.1867 63.6029V63.7937C37.1867 63.8775 37.1188 63.9451 37.0345 63.9451",fill:"#262626"}),a.createElement("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M36.1365 63.7708H36.7955V62H36.1365V63.7708Z",fill:"#8F8F8F"}),a.createElement("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M40.5417 65.5H39.6457C39.6457 65.5 39.5839 65.5 39.5621 65.5545L39.0662 67.0725L38.5708 65.5545C38.5489 65.5 38.4868 65.5 38.4868 65.5H36.764C36.7267 65.5 36.6954 65.5311 36.6954 65.5682V66.0837C36.6954 65.6748 36.2603 65.5 36.0055 65.5C35.4349 65.5 35.053 65.8758 34.934 66.4472C34.9276 66.0681 34.8961 65.9323 34.794 65.7932C34.7471 65.7251 34.6793 65.6678 34.6055 65.6204C34.4535 65.5314 34.317 65.5 34.0237 65.5H33.6794C33.6794 65.5 33.6171 65.5 33.5952 65.5545L33.2818 66.331V65.5682C33.2818 65.5311 33.2508 65.5 33.2136 65.5H32.4167C32.4167 65.5 32.3552 65.5 32.3328 65.5545L32.0071 66.362C32.0071 66.362 31.9746 66.4427 32.0489 66.4427H32.3552V67.9813C32.3552 68.0195 32.3853 68.0497 32.4236 68.0497H33.2136C33.2508 68.0497 33.2818 68.0195 33.2818 67.9813V66.4427H33.5898C33.7664 66.4427 33.8039 66.4475 33.8726 66.4796C33.914 66.4952 33.9513 66.5268 33.9716 66.5633C34.0133 66.6417 34.0237 66.7359 34.0237 67.0135V67.9813C34.0237 68.0195 34.0544 68.0497 34.0923 68.0497H34.8494C34.8494 68.0497 34.935 68.0497 34.9688 67.9652L35.1366 67.5505C35.3597 67.863 35.7269 68.0497 36.1833 68.0497H36.283C36.283 68.0497 36.3691 68.0497 36.4032 67.9652L36.6954 67.2415V67.9813C36.6954 68.0195 36.7267 68.0497 36.764 68.0497H37.5368C37.5368 68.0497 37.6221 68.0497 37.6564 67.9652C37.6564 67.9652 37.9655 67.1978 37.9667 67.192H37.9671C37.979 67.1281 37.8983 67.1281 37.8983 67.1281H37.6225V65.8113L38.4904 67.9652C38.5243 68.0497 38.6097 68.0497 38.6097 68.0497H39.5228C39.5228 68.0497 39.6087 68.0497 39.6426 67.9652L40.6048 65.5826C40.6381 65.5 40.5417 65.5 40.5417 65.5V65.5ZM36.6954 67.128H36.1763C35.9696 67.128 35.8015 66.9607 35.8015 66.7538C35.8015 66.5473 35.9696 66.3789 36.1763 66.3789H36.3215C36.5276 66.3789 36.6954 66.5473 36.6954 66.7538V67.128Z",fill:"#C30000"}))},ze=()=>{const e=B("GuidePanel");return a.createElement("svg",{width:"80",height:"80",viewBox:"0 0 80 80",fill:"none",xmlns:"http://www.w3.org/2000/svg","aria-label":e("illustrationLabel"),focusable:!1,role:"img"},a.createElement("g",{clipPath:"url(#clip0_1387_21067)"},a.createElement("rect",{width:"80",height:"80",rx:"40",fill:"var(--ax-bg-info-moderate)"}),a.createElement("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M55.1888 40.4309C53.795 44.9809 51.0663 48.7578 47.5693 51.0691L47.7484 53.0953L47.7474 53.1777L45.857 69.8798H33.8679L33.8181 69.5289L31.5004 53.149L31.5862 51.1003C28.0715 48.7951 25.3274 45.012 23.9257 40.4499C23.8781 40.4544 23.83 40.4567 23.7812 40.4567C22.8745 40.4567 22.1562 39.6596 22.1562 38.694V33.2299C22.1562 32.5826 22.479 32.0107 22.9648 31.704C23.7229 21.5029 30.8443 13.4856 39.554 13.4856C48.2401 13.4856 55.3472 21.4598 56.1376 31.6212C56.7049 31.8987 57.0938 32.5185 57.0938 33.2299V38.694C57.0938 39.6601 56.3765 40.4567 55.4688 40.4567C55.3731 40.4567 55.2796 40.4479 55.1888 40.4309Z",fill:"#F5F6F7"}),a.createElement("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M47.1471 51.6344C47.0789 55.2818 43.7373 59.0238 39.625 59.0238C35.4948 59.0238 32.142 55.2492 32.1022 51.5868C29.9622 52.1324 26.6956 53.778 23.9995 56.528C21.3885 59.191 19.3125 63.194 19.3125 66.2992V85H59.9375V66.2992C59.9375 63.1877 57.8167 59.1779 55.1575 56.5118C52.4983 53.8457 49.3007 52.2224 47.1471 51.6344Z",fill:"#156389"}),a.createElement("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M31.9671 51.7135C29.9959 52.4334 26.6891 54.0069 24.1875 56.3965C16.875 54.7596 13.625 50.8701 13.625 50.8701C13.625 50.8701 20.3621 44.2597 20.3662 32.698V32.6858C20.3662 19.1479 27.6319 9.80769 39.6022 9.80769C51.5742 9.80769 58.8399 19.1479 58.8399 32.6858H58.883C58.883 44.2556 65.625 50.8701 65.625 50.8701C65.625 50.8701 62.375 54.7596 55.0625 56.3942L55.0515 56.3965C52.6353 54.1854 49.1309 52.48 47.2243 51.759L47.2265 51.7583L47.1508 50.9013L47.1917 50.8303C50.7891 48.5155 53.5804 44.616 54.9262 39.904C55.0909 39.9962 55.277 40.0481 55.4739 40.0481C56.1476 40.0481 56.6928 39.4432 56.6928 38.694V33.2299C56.6928 32.5888 56.2936 32.0529 55.7564 31.9115C55.7559 31.9041 55.7554 31.8967 55.7549 31.8893C38.7466 33.7984 32.6199 22.0681 32.117 22.0673C32.117 22.0673 26.4686 26.1538 23.769 31.0125C23.769 31.0125 23.3576 31.9297 23.3556 31.9605C22.8934 32.1528 22.5637 32.648 22.5637 33.2299V38.694C22.5637 39.4432 23.1103 40.0481 23.7826 40.0481C23.9316 40.0481 24.0743 40.0185 24.2062 39.9643C25.5668 44.6786 28.3759 48.5739 31.9901 50.8733L32.0035 50.9013L31.9695 51.7135H31.9671Z",fill:"#A93D70"}),a.createElement("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M33.8159 35.8563C32.766 35.9417 32.4722 34.2696 32.7885 33.1775C32.848 32.9706 33.1956 32.0283 33.8109 32.0283C34.4254 32.0283 34.6968 32.5433 34.7345 32.6319C35.1865 33.6965 34.9645 35.7622 33.8159 35.8563",fill:"#202733"}),a.createElement("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M45.9927 35.8563C47.0425 35.9417 47.3364 34.2696 47.0201 33.1775C46.9606 32.9706 46.613 32.0283 45.9977 32.0283C45.3832 32.0283 45.1118 32.5433 45.0741 32.6319C44.6221 33.6965 44.8441 35.7622 45.9927 35.8563",fill:"#202733"}),a.createElement("path",{d:"M40.2935 37.5041C40.9213 37.396 41.3501 37.4638 41.5036 37.6748C42.0833 38.4721 41.8979 39.3156 40.9035 40.0081C40.3806 40.372 39.661 40.5001 39.28 40.3114C39.0937 40.2191 38.8758 40.3133 38.7934 40.5218C38.7109 40.7304 38.7951 40.9742 38.9814 41.0665C39.6111 41.3784 40.5794 41.206 41.2931 40.7092C42.6445 39.7682 42.9537 38.3611 42.0758 37.1534C41.7042 36.643 41.0465 36.5389 40.1812 36.688C39.9799 36.7227 39.8418 36.9335 39.8728 37.1589C39.9038 37.3842 40.0921 37.5388 40.2935 37.5041Z",fill:"#202733"}),a.createElement("path",{d:"M44.8337 42.9837C44.7968 43.0623 44.7122 43.2128 44.5763 43.4111C44.3463 43.7466 44.0574 44.083 43.7066 44.3967C42.6611 45.3315 41.3002 45.8721 39.5683 45.8226C37.8795 45.7744 36.5247 45.2422 35.4626 44.384C35.0726 44.0689 34.7506 43.7315 34.4933 43.3951C34.3415 43.1967 34.2468 43.0464 34.2053 42.968C34.1056 42.7795 33.8606 42.7019 33.6581 42.7946C33.4555 42.8874 33.3721 43.1154 33.4718 43.3039C33.5318 43.4175 33.6487 43.6029 33.8273 43.8364C34.1206 44.2197 34.4852 44.6019 34.9266 44.9585C36.1256 45.9273 37.6579 46.5293 39.5432 46.5831C41.5064 46.6391 43.0759 46.0157 44.273 44.9453C44.6733 44.5875 45.0023 44.2043 45.2656 43.8203C45.4257 43.5868 45.5298 43.4015 45.5829 43.2882C45.6733 43.0956 45.5788 42.8714 45.3719 42.7873C45.165 42.7033 44.924 42.7912 44.8337 42.9837Z",fill:"#202733"}),a.createElement("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M53.8629 70.5H42.8865C42.3966 70.5 42 70.0974 42 69.6V63.609C42 63.1117 42.3966 62.7083 42.8865 62.7083H53.8629C54.3527 62.7083 54.75 63.1117 54.75 63.609V69.6C54.75 70.0974 54.3527 70.5 53.8629 70.5",fill:"white"}),a.createElement("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M49.0346 63.9451H47.8971C47.8128 63.9451 47.7449 63.8775 47.7449 63.7937V63.6029C47.7449 63.5197 47.8128 63.4515 47.8971 63.4515H49.0346C49.1188 63.4515 49.1867 63.5197 49.1867 63.6029V63.7937C49.1867 63.8775 49.1188 63.9451 49.0346 63.9451",fill:"#202733"}),a.createElement("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M48.1365 63.7708H48.7955V62H48.1365V63.7708Z",fill:"#818997"}),a.createElement("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M52.5417 65.5H51.6457C51.6457 65.5 51.5839 65.5 51.5621 65.5545L51.0662 67.0725L50.5708 65.5545C50.5489 65.5 50.4868 65.5 50.4868 65.5H48.764C48.7267 65.5 48.6954 65.5311 48.6954 65.5682V66.0837C48.6954 65.6748 48.2603 65.5 48.0055 65.5C47.4349 65.5 47.053 65.8758 46.934 66.4472C46.9276 66.0681 46.8961 65.9323 46.794 65.7932C46.7471 65.7251 46.6793 65.6678 46.6055 65.6204C46.4535 65.5314 46.317 65.5 46.0237 65.5H45.6794C45.6794 65.5 45.6171 65.5 45.5952 65.5545L45.2818 66.331V65.5682C45.2818 65.5311 45.2508 65.5 45.2136 65.5H44.4167C44.4167 65.5 44.3552 65.5 44.3328 65.5545L44.0071 66.362C44.0071 66.362 43.9746 66.4427 44.0489 66.4427H44.3552V67.9813C44.3552 68.0195 44.3853 68.0497 44.4236 68.0497H45.2136C45.2508 68.0497 45.2818 68.0195 45.2818 67.9813V66.4427H45.5898C45.7664 66.4427 45.8039 66.4475 45.8726 66.4796C45.914 66.4952 45.9513 66.5268 45.9716 66.5633C46.0133 66.6417 46.0237 66.7359 46.0237 67.0135V67.9813C46.0237 68.0195 46.0544 68.0497 46.0923 68.0497H46.8494C46.8494 68.0497 46.935 68.0497 46.9688 67.9652L47.1366 67.5505C47.3597 67.863 47.7269 68.0497 48.1833 68.0497H48.283C48.283 68.0497 48.3691 68.0497 48.4032 67.9652L48.6954 67.2415V67.9813C48.6954 68.0195 48.7267 68.0497 48.764 68.0497H49.5368C49.5368 68.0497 49.6221 68.0497 49.6564 67.9652C49.6564 67.9652 49.9655 67.1978 49.9667 67.192H49.9671C49.979 67.1281 49.8983 67.1281 49.8983 67.1281H49.6225V65.8113L50.4904 67.9652C50.5243 68.0497 50.6097 68.0497 50.6097 68.0497H51.5228C51.5228 68.0497 51.6087 68.0497 51.6426 67.9652L52.6048 65.5826C52.6381 65.5 52.5417 65.5 52.5417 65.5V65.5ZM48.6954 67.128H48.1763C47.9696 67.128 47.8015 66.9607 47.8015 66.7538C47.8015 66.5473 47.9696 66.3789 48.1763 66.3789H48.3215C48.5276 66.3789 48.6954 66.5473 48.6954 66.7538V67.128Z",fill:"#C30000"})),a.createElement("defs",null,a.createElement("clipPath",{id:"clip0_1387_21067"},a.createElement("rect",{width:"80",height:"80",rx:"40",fill:"white"}))))};var Be=function(e,l){var r={};for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&l.indexOf(t)<0&&(r[t]=e[t]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var n=0,t=Object.getOwnPropertySymbols(e);n<t.length;n++)l.indexOf(t[n])<0&&Object.prototype.propertyIsEnumerable.call(e,t[n])&&(r[t[n]]=e[t[n]]);return r};const $e=c.forwardRef((e,l)=>{var{children:r,className:t,illustration:n,poster:s}=e,o=Be(e,["children","className","illustration","poster"]);const{cn:d}=N(),g=Oe(!1);return a.createElement("div",Object.assign({},o,{ref:l,className:d("navds-guide-panel",t,{"navds-guide-panel--poster":s===!0,"navds-guide-panel--not-poster":s===!1,"navds-guide-panel--responsive-poster":s===void 0}),"data-responsive":s===void 0,"data-poster":s}),a.createElement("div",{className:d("navds-guide")},n??(g?a.createElement(ze,null):a.createElement(De,null))),a.createElement("div",{className:d("navds-guide-panel__content")},g&&a.createElement("svg",{viewBox:"0 0 33 22",width:"33",height:"22",fill:"none",xmlns:"http://www.w3.org/2000/svg",className:d("navds-guide-panel__tail")},a.createElement("path",{d:"M8.74229e-08 22L0 20L33 20V22L8.74229e-08 22Z",fill:"var(--ax-bg-raised)"}),a.createElement("path",{d:"M31 20.0001L2 20.0001C2.09817 10.0296 3 7.00011 6 2.00011C8 12.5001 20 20.0001 31 20.0001Z",fill:"var(--ax-bg-raised)"}),a.createElement("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M0 20C-2.87106e-10 19.9934 3.21047e-05 19.987 9.68646e-05 19.9804C0.0494722 14.9659 0.299239 11.5341 0.964025 8.68212C1.64231 5.77217 2.72947 3.56367 4.28501 0.971094C4.71185 0.259692 5.53358 -0.114327 6.35038 0.0310157C7.16718 0.176359 7.80944 0.810884 7.96467 1.62586C8.84145 6.22896 11.9453 10.3172 16.2599 13.2908C20.5715 16.2623 25.9294 18.0001 31 18.0001C32.1046 18.0001 33 18.8954 33 20L0 20ZM6.755 4.70521C8.97688 10.7068 14.4934 15.469 20.8803 18.0001C24.1345 19.2897 27.6146 20.0001 31 20.0001L2 20.0001C2.00689 19.3003 2.01774 18.6346 2.033 18.0001C2.19625 11.2107 2.86405 7.98363 4.58479 4.54371C4.9944 3.72487 5.46367 2.89399 6 2.00011C6.17639 2.92619 6.43058 3.82889 6.755 4.70521Z",fill:"var(--ax-border-info)"})),g?a.createElement("div",{className:d("navds-guide-panel__content-inner")},r):r))});var Ge=function(e,l){var r={};for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&l.indexOf(t)<0&&(r[t]=e[t]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var n=0,t=Object.getOwnPropertySymbols(e);n<t.length;n++)l.indexOf(t[n])<0&&Object.prototype.propertyIsEnumerable.call(e,t[n])&&(r[t[n]]=e[t[n]]);return r};const Ze=c.forwardRef((e,l)=>{var{className:r,header:t,children:n,open:s,defaultOpen:o=!1,onClick:d,size:g="medium",onOpenChange:u}=e,C=Ge(e,["className","header","children","open","defaultOpen","onClick","size","onOpenChange"]);const{cn:f}=N(),[h,v]=_e({defaultValue:o,value:s,onChange:u}),y=g==="small"?"small":"medium";return a.createElement("div",{className:f("navds-read-more",`navds-read-more--${g}`,r,{"navds-read-more--open":h}),"data-volume":"low"},a.createElement("button",Object.assign({},C,{ref:l,type:"button",className:f("navds-read-more__button","navds-body-short",{"navds-body-short--small":g==="small"}),onClick:U(d,()=>v(w=>!w)),"aria-expanded":h,"data-state":h?"open":"closed"}),a.createElement(Re,{className:f("navds-read-more__expand-icon"),"aria-hidden":!0}),a.createElement("span",null,t)),a.createElement(le,{as:"div","aria-hidden":!h,className:f("navds-read-more__content",{"navds-read-more__content--closed":!h}),size:y,"data-state":h?"open":"closed"},n))});var Ke=function(e,l){var r={};for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&l.indexOf(t)<0&&(r[t]=e[t]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var n=0,t=Object.getOwnPropertySymbols(e);n<t.length;n++)l.indexOf(t[n])<0&&Object.prototype.propertyIsEnumerable.call(e,t[n])&&(r[t[n]]=e[t[n]]);return r};const qe=c.forwardRef((e,l)=>{var{children:r,as:t="a",className:n}=e,s=Ke(e,["children","as","className"]);const{cn:o}=N();return a.createElement("li",null,a.createElement(t,Object.assign({},s,{ref:l,className:o(n,"navds-error-summary__item","navds-link")}),r))});var Ue=function(e,l){var r={};for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&l.indexOf(t)<0&&(r[t]=e[t]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var n=0,t=Object.getOwnPropertySymbols(e);n<t.length;n++)l.indexOf(t[n])<0&&Object.prototype.propertyIsEnumerable.call(e,t[n])&&(r[t[n]]=e[t[n]]);return r};const K=c.forwardRef((e,l)=>{var{children:r,className:t,size:n="medium",headingTag:s="h2",heading:o}=e,d=Ue(e,["children","className","size","headingTag","heading"]);const{cn:g}=N(),u=B("ErrorSummary"),C=c.useRef(null),f=c.useRef(null),h=ie(l,C);return a.createElement("div",Object.assign({ref:h},d,{className:g(t,"navds-error-summary",`navds-error-summary--${n}`),tabIndex:-1,onFocus:U(d.onFocus,v=>{var y;v.target===C.current&&((y=f==null?void 0:f.current)===null||y===void 0||y.focus())})}),a.createElement(we,{className:g("navds-error-summary__heading"),as:s,size:"small",ref:f,tabIndex:-1},o??u("heading")),a.createElement(q,{as:"ul",size:n,className:g("navds-error-summary__list")},r))});K.Item=qe;var We=function(e,l){var r={};for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&l.indexOf(t)<0&&(r[t]=e[t]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var n=0,t=Object.getOwnPropertySymbols(e);n<t.length;n++)l.indexOf(t[n])<0&&Object.prototype.propertyIsEnumerable.call(e,t[n])&&(r[t[n]]=e[t[n]]);return r};const X=(e,l,r)=>{const{outerHeightStyle:t,overflow:n}=l;return r.current<20&&(t>0&&Math.abs((e.outerHeightStyle||0)-t)>1||e.overflow!==n)?(r.current+=1,l):e},ee=e=>((e==null?void 0:e.ownerDocument)||document).defaultView||window;function A(e){return parseInt(e,10)||0}const Ye=c.forwardRef((e,l)=>{var r,t,{className:n,onChange:s,maxRows:o,minRows:d=1,autoScrollbar:g,style:u,value:C}=e,f=We(e,["className","onChange","maxRows","minRows","autoScrollbar","style","value"]);const{current:h}=c.useRef(C!=null),v=c.useRef(null),y=ie(v,l),w=c.useRef(null),j=c.useRef(0),[S,M]=c.useState({outerHeightStyle:0}),k=a.useCallback(()=>{const m=v.current,E=ee(m).getComputedStyle(m);if(E.width==="0px")return{outerHeightStyle:0};const O=w.current;O.style.width=E.width,O.value=m.value||f.placeholder||"x",O.value.slice(-1)===`
`&&(O.value+=" ");const _=E.boxSizing,x=A(E.paddingBottom)+A(E.paddingTop),H=A(E.borderBottomWidth)+A(E.borderTopWidth),T=O.scrollHeight-x;O.value="x";const P=O.scrollHeight-x;let V=T;d&&(V=Math.max(Number(d)*P,V)),o&&(V=Math.min(Number(o)*P,V)),V=Math.max(V,P);const fe=V+(_==="border-box"?x+H:0),me=Math.abs(V-T)<=1;return{outerHeightStyle:fe,overflow:me}},[o,d,f.placeholder]),b=()=>{const m=k();te(m)||M(p=>X(p,m,j))};Y(()=>{const m=()=>{const x=k();te(x)||Ie.flushSync(()=>{M(H=>X(H,x,j))})},p=de(()=>{var x,H,T;if(j.current=0,!((x=v.current)===null||x===void 0)&&x.style.height||!((H=v.current)===null||H===void 0)&&H.style.width){((T=v.current)===null||T===void 0?void 0:T.style.overflow)==="hidden"&&M(P=>Object.assign(Object.assign({},P),{overflow:!1}));return}m()},166,!0),E=v.current,O=ee(E);O.addEventListener("resize",p);let _;return typeof ResizeObserver<"u"&&(_=new ResizeObserver(p),_.observe(E)),()=>{p.clear(),O.removeEventListener("resize",p),_&&_.disconnect()}},[k]),Y(()=>{b()}),c.useEffect(()=>{j.current=0},[C]);const L=m=>{j.current=0,h||b(),s&&s(m)},R=Object.assign({"--__ac-textarea-height":S.outerHeightStyle+"px","--__axc-textarea-height":S.outerHeightStyle+"px",overflow:S.overflow&&!g&&!(!((r=v.current)===null||r===void 0)&&r.style.height)&&!(!((t=v.current)===null||t===void 0)&&t.style.width)?"hidden":void 0},u);return a.createElement(a.Fragment,null,a.createElement("textarea",Object.assign({value:C,onChange:L,ref:y,rows:d,style:R},f,{className:n})),a.createElement("textarea",{"aria-hidden":!0,className:n,readOnly:!0,ref:w,tabIndex:-1,style:Object.assign({visibility:"hidden",position:"absolute",overflow:"hidden",height:0,top:0,left:0,transform:"translateZ(0)"},u)}))});function te(e){return e==null||Object.keys(e).length===0||e.outerHeightStyle===0&&!e.overflow}const Je=({maxLengthId:e,maxLength:l,currentLength:r,size:t,i18n:n})=>{const{cn:s}=N(),o=B("Textarea",{charsLeft:n!=null&&n.counterLeft?`{chars} ${n.counterLeft}`:void 0,charsTooMany:n!=null&&n.counterTooMuch?`{chars} ${n.counterTooMuch}`:void 0}),d=l-r,[g,u]=c.useState(d);return c.useEffect(()=>{const C=de(()=>{u(d)},2e3);return C(),()=>{C.clear()}},[d]),a.createElement(a.Fragment,null,a.createElement("span",{id:e,className:s("navds-sr-only")},o("maxLength",{maxLength:l})),d<20&&a.createElement("span",{role:"status",className:s("navds-textarea__sr-counter navds-sr-only")},ne(g,o)),a.createElement(q,{className:s("navds-textarea__counter",{"navds-textarea__counter--error":d<0}),size:t},ne(d,o)))},ne=(e,l)=>e<0?l("charsTooMany",{chars:Math.abs(e)}):l("charsLeft",{chars:e});var Qe=function(e,l){var r={};for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&l.indexOf(t)<0&&(r[t]=e[t]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var n=0,t=Object.getOwnPropertySymbols(e);n<t.length;n++)l.indexOf(t[n])<0&&Object.prototype.propertyIsEnumerable.call(e,t[n])&&(r[t[n]]=e[t[n]]);return r};const Xe=c.forwardRef((e,l)=>{var r,t,n;const{inputProps:s,errorId:o,showErrorMsg:d,hasError:g,size:u,inputDescriptionId:C}=pe(e,"textarea"),{label:f,className:h,description:v,maxLength:y,hideLabel:w=!1,resize:j,UNSAFE_autoScrollbar:S,i18n:M,readOnly:k}=e,b=Qe(e,["label","className","description","maxLength","hideLabel","resize","UNSAFE_autoScrollbar","i18n","readOnly"]),{cn:L}=N(),R=He(),m=y!==void 0&&y>0,[p,E]=c.useState((r=e==null?void 0:e.defaultValue)!==null&&r!==void 0?r:""),O=()=>{let x=b!=null&&b.minRows?b==null?void 0:b.minRows:3;return u==="small"&&(x=b!=null&&b.minRows?b==null?void 0:b.minRows:2),x},_=je(s["aria-describedby"],{[R??""]:m});return a.createElement("div",{className:L(h,"navds-form-field",`navds-form-field--${u}`,{"navds-form-field--disabled":!!s.disabled,"navds-form-field--readonly":k,"navds-textarea--readonly":k,"navds-textarea--error":g,"navds-textarea--autoscrollbar":S,[`navds-textarea--resize-${j===!0?"both":j}`]:j})},a.createElement(Se,{htmlFor:s.id,size:u,className:L("navds-form-field__label",{"navds-sr-only":w})},k&&a.createElement(Ce,null),f),!!v&&a.createElement(q,{className:L("navds-form-field__description",{"navds-sr-only":w}),id:C,size:u,as:"div"},v),a.createElement(Ye,Object.assign({},Te(b,["error","errorId","size"]),s,{onChange:U(e.onChange,e.value===void 0?x=>E(x.target.value):void 0),minRows:O(),autoScrollbar:S,ref:l,readOnly:k,className:L("navds-textarea__input","navds-body-short",`navds-body-short--${u??"medium"}`)},_?{"aria-describedby":_}:{})),m&&!k&&!s.disabled&&a.createElement(Je,{maxLengthId:R,maxLength:y,currentLength:(n=(t=e.value)===null||t===void 0?void 0:t.length)!==null&&n!==void 0?n:p.length,size:u,i18n:M}),a.createElement("div",{className:L("navds-form-field__error"),id:o,"aria-relevant":"additions removals","aria-live":"polite"},d&&a.createElement(Le,{size:u,showIcon:!0},e.error)))}),z=()=>{const{pathname:e}=ke();return c.useEffect(()=>{window.scrollTo(0,0)},[e]),null},e3=(e,l)=>async r=>{const t=new FormData;t.append("id",r.id),t.append("vedlegg",r.file,r.filename);const n=await ve.post(`${e}/rest/storage/${l}/vedlegg`,{body:t});return{headers:{location:n.headers.get("Location")},data:await n.text()}},t3=e=>{const l=e.replace(be,""),r=new Set(l.split(""));return Array.from(r).join("")},n3=(e,l,r)=>{const t=t3(e).replace(/\t/g,"Tabulatortegn");return r.formatMessage({id:"valideringsfeil.fritekst.kanIkkeInneholdeTegn"},{feltNavn:l,ugyldigeTegn:t})},r3=e=>he.test(e),a3=(e,l,r)=>{if(!r3(e))return n3(e,l,r)},l3=(e,l,r)=>r==null||r.length===0||r.length<25?e.formatMessage({id:"valideringsfeil.fritekst.forKort"},{feltNavn:l}):r.length>1e3?e.formatMessage({id:"valideringsfeil.fritekst.forLang"},{feltNavn:l}):a3(r,l,e),i3=e=>[e.formatMessage({id:"minidialog.hvaLeggerNAVVektPå.tilbakekreving.punkt1"}),e.formatMessage({id:"minidialog.hvaLeggerNAVVektPå.tilbakekreving.punkt2"}),e.formatMessage({id:"minidialog.hvaLeggerNAVVektPå.tilbakekreving.punkt3"}),e.formatMessage({id:"minidialog.hvaLeggerNAVVektPå.tilbakekreving.punkt4"}),e.formatMessage({id:"minidialog.hvaLeggerNAVVektPå.tilbakekreving.punkt5"}),e.formatMessage({id:"minidialog.hvaLeggerNAVVektPå.tilbakekreving.punkt6"})],ce=()=>{const e=re();return i.jsx(Ze,{header:e.formatMessage({id:"minidialog.hvaLeggerNAVVektPå.tilbakekreving.tittel"}),children:i.jsx("ul",{className:"text-medium",children:i3(e).map(l=>i.jsx("li",{children:l},`${l}`))})})};ce.__docgenInfo={description:"",methods:[],displayName:"HvaLeggerNAVVektPå"};const ue=({fetchCounter:e,allowedToFetch:l,saksnummer:r})=>e<30&&l?i.jsxs(i.Fragment,{children:[i.jsx(z,{}),i.jsx(D,{variant:"info",children:i.jsxs(se,{gap:"4",justify:"center",children:[i.jsx(Ve,{}),"Svaret ditt registreres i våre systemer."]})})]}):e<30&&!l?i.jsxs(i.Fragment,{children:[i.jsx(z,{}),i.jsxs(F,{gap:"2",children:[i.jsx(D,{variant:"success",children:"Svaret ditt er registrert"}),i.jsx(G,{to:`/sak/${r}`,children:i.jsx(I,{id:"miniDialog.kvittering.gåTilbakeTilSaken"})})]})]}):i.jsxs(i.Fragment,{children:[i.jsx(z,{}),i.jsxs(F,{gap:"2",children:[i.jsx(D,{variant:"info",children:"Vi har fått svaret ditt, men det tar litt lenger tid enn vanlig å oppdatere saken. Du trenger ikke å sende igjen."}),i.jsx(G,{to:`/sak/${r}`,children:i.jsx(I,{id:"miniDialog.kvittering.gåTilbakeTilSaken"})})]})]});ue.__docgenInfo={description:"",methods:[],displayName:"MinidialogVenterPåSvar",props:{fetchCounter:{required:!0,tsType:{name:"number"},description:""},allowedToFetch:{required:!0,tsType:{name:"boolean"},description:""},saksnummer:{required:!0,tsType:{name:"string"},description:""}}};const s3=({pending:e,uploaded:l,filesize:r})=>e===!1&&l===!1||r===0,o3=(e,l,r,t,n,s)=>({vedlegg:t&&n?n.filter(o=>!s3(o)):[],saksnummer:e,type:l,dialogId:r,brukerTekst:{dokumentType:ae.TILBAKEBETALING,overskrift:"Svar på tilbakebetalingen",tekst:t&&s!==void 0&&s!==null?Me(s)??"":"Jeg ønsker ikke å uttale meg. Saken vil bli behandlet med de opplysningene som Nav har tilgjengelig."}}),d3=e=>e===Q.ENGANGSSTØNAD?"engangsstonad":e===Q.FORELDREPENGER?"foreldrepenger":"svangerskapspenger",c3=({ettersendelseErSendt:e,isSendingEttersendelse:l,sakstype:r,minidialog:t,ettersendelseError:n,onSubmit:s})=>{const o=re(),[d,g]=c.useState([]),[u,C]=c.useState(!1),[f,h]=c.useState(),[v,y]=c.useState(),[w,j]=c.useState(),[S,M]=c.useState(0),[k,b]=c.useState(!0),L=(m,p)=>{g(m),C(p)};ge({queryKey:["minidialog"],queryFn:async()=>(M(m=>m+1),await fetch(`${W}/rest/minidialog`,{credentials:"include"}).then(m=>m.json())),refetchInterval:m=>{const p=m.state.data;return!p||p!=null&&p.find(E=>E.dialogId===(t==null?void 0:t.dialogId))?1e3:(e&&b(!1),!1)},enabled:e&&S<30&&k});const R=m=>{m.preventDefault();const p=f?l3(o,o.formatMessage({id:"minidialog.tilbakekreving.tilbakekreving.label"}).replace(":",""),v):void 0;if(p)j(p);else if(f!==void 0){const E=o3(t.saksnr,r,t.dialogId,f,d,v);s(E)}};return e?i.jsx(ue,{fetchCounter:S,allowedToFetch:k,saksnummer:t.saksnr}):n?i.jsxs(F,{gap:"4",children:[i.jsx(z,{}),i.jsxs(D,{variant:"error",children:[" ",n]}),i.jsx(G,{to:`/sak/${t.saksnr}`,children:i.jsx(I,{id:"miniDialog.kvittering.gåTilbakeTilSaken"})})]}):i.jsx("form",{onSubmit:R,children:i.jsxs(F,{gap:"8",children:[i.jsxs(F,{gap:"5",children:[i.jsx(Z,{avatar:"Nav",name:"Nav",timestamp:xe(t.opprettet),children:i.jsx(Z.Bubble,{children:i.jsx(I,{id:"miniDialog.tilbakekreving.tittel",values:{sakstype:r}})})}),i.jsx(ce,{})]}),i.jsxs(ye,{legend:o.formatMessage({id:"miniDialog.tilbakekreving.radioPanelGruppe.legend"}),onChange:h,children:[i.jsx(J,{value:!0,children:"Ja"}),i.jsx(J,{value:!1,children:"Nei"})]}),f===!0&&i.jsxs(i.Fragment,{children:[i.jsx("div",{children:i.jsx(Xe,{label:o.formatMessage({id:"minidialog.tilbakekreving.tilbakekreving.label"}),onChange:m=>y(m.target.value),error:w})}),i.jsx(Ee,{label:o.formatMessage({id:"minidialog.dokumenter"}),updateAttachments:L,attachmentType:oe.TILBAKEBETALING,skjemanummer:ae.TILBAKEBETALING,saveAttachment:e3(W,d3(r))})]}),f===!1&&i.jsx($e,{children:i.jsx(I,{id:"minidialog.tilbakekreving.veilederpanel"})}),f!==void 0&&i.jsx(se,{children:i.jsx(Ne,{type:"submit",loading:l||u,disabled:l||u,children:i.jsx(I,{id:"miniDialog.tilbakekreving.sendButton"})})}),f&&w&&i.jsx(K,{heading:"Feil i skjema",children:i.jsx(K.Item,{href:"#1",children:w})})]})})};c3.__docgenInfo={description:"",methods:[],displayName:"MinidialogSkjema",props:{ettersendelseErSendt:{required:!0,tsType:{name:"boolean"},description:""},isSendingEttersendelse:{required:!0,tsType:{name:"boolean"},description:""},minidialog:{required:!0,tsType:{name:"MinidialogInnslag"},description:""},onSubmit:{required:!0,tsType:{name:"signature",type:"function",raw:"(ettersendelse: EttersendingDto) => void",signature:{arguments:[{type:{name:"EttersendingDto"},name:"ettersendelse"}],return:{name:"void"}}},description:""},sakstype:{required:!0,tsType:{name:"Ytelse"},description:""},ettersendelseError:{required:!0,tsType:{name:"union",raw:"string | undefined",elements:[{name:"string"},{name:"undefined"}]},description:""}}};export{oe as A,$e as G,c3 as M,Ze as R,z as S,e3 as g};
