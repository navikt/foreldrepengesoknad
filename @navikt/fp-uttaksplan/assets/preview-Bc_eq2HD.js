import{r as u,R as c}from"./index-BX3iQpgp.js";import{_ as h,s as E,i as v,P as _,D as I,c as C}from"./index-CjFEev4Y.js";import{c as p}from"./createIntl-aGYZkzk1.js";function i(e){return{locale:e.locale,timeZone:e.timeZone,fallbackOnEmptyString:e.fallbackOnEmptyString,formats:e.formats,textComponent:e.textComponent,messages:e.messages,defaultLocale:e.defaultLocale,defaultFormats:e.defaultFormats,onError:e.onError,onWarn:e.onWarn,wrapRichTextChunksInFragment:e.wrapRichTextChunksInFragment,defaultRichTextElements:e.defaultRichTextElements}}var R=function(e){h(t,e);function t(){var a=e!==null&&e.apply(this,arguments)||this;return a.cache=C(),a.state={cache:a.cache,intl:p(i(a.props),a.cache),prevConfig:i(a.props)},a}return t.getDerivedStateFromProps=function(a,r){var l=r.prevConfig,n=r.cache,s=i(a);return E(l,s)?null:{intl:p(s,n),prevConfig:s}},t.prototype.render=function(){return v(this.state.intl),u.createElement(_,{value:this.state.intl},this.props.children)},t.displayName="IntlProvider",t.defaultProps=I,t}(u.PureComponent);const{useGlobals:x,useEffect:P}=__STORYBOOK_MODULE_PREVIEW_API__;var O=(e,t)=>{let[a,r]=x();return P(()=>{let{parameters:{locale:l}}=t;l&&r({locale:l})},[]),e(t)},T={decorators:[O],initialGlobals:{locale:"",locales:{}}},o=T;const{useGlobals:F}=__STORYBOOK_MODULE_PREVIEW_API__;var y=(e,t)=>{let[{locale:a}]=F(),{parameters:{reactIntl:r,locale:l}}=t,n=a||l;if(n&&r){let{formats:s,messages:m,defaultRichTextElements:d}=r,f=s?s[n]:void 0;if(m)return c.createElement(R,{key:a,formats:f,messages:m[n],locale:n,defaultLocale:l,defaultRichTextElements:d},c.createElement(c.Fragment,null,e(t)))}return e(t)},L=o==null?void 0:o.decorators,b={...o,decorators:[...L,y]},G=b;export{G as default};
