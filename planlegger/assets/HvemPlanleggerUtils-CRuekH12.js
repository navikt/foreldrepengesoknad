var t=(r=>(r.MOR_OG_FAR="morOgFar",r.MOR_OG_MEDMOR="morOgMedmor",r.FAR_OG_FAR="farOgFar",r.MOR="mor",r.FAR="far",r))(t||{});const O=r=>r.type===t.MOR_OG_FAR||r.type===t.FAR_OG_FAR||r.type===t.MOR_OG_MEDMOR,f=r=>O(r)===!1,s=r=>r.type===t.MOR_OG_FAR||r.type===t.MOR_OG_MEDMOR||r.type===t.MOR,n=r=>r.type===t.MOR_OG_FAR||r.type===t.FAR_OG_FAR||r.type===t.FAR,F=r=>r.type===t.MOR_OG_MEDMOR,_=r=>r.type===t.FAR_OG_FAR,i=r=>r.type===t.FAR_OG_FAR||r.type===t.MOR_OG_FAR,o=(r,e)=>{if(s(r))return r.navnPåMor||e.formatMessage({id:"HvemPlanlegger.DefaultMorNavn"});if(n(r))return r.navnPåFar||e.formatMessage({id:"HvemPlanlegger.DefaultFarNavn"});throw new Error("Feil i kode: Ugyldig hvemPlanlegger")},M=(r,e)=>{if(r.type===t.MOR_OG_MEDMOR)return r.navnPåMedmor||e.formatMessage({id:"HvemPlanlegger.DefaultMedMorNavn"});if(r.type===t.MOR_OG_FAR)return r.navnPåFar||e.formatMessage({id:"HvemPlanlegger.DefaultFarNavn"});if(r.type===t.FAR_OG_FAR)return r.navnPåMedfar||e.formatMessage({id:"HvemPlanlegger.DefaultFarNavn"})},u=(r,e)=>{if(s(r))return e.formatMessage({id:"HvemPlanlegger.DefaultMorNavn"});if(n(r))return e.formatMessage({id:"HvemPlanlegger.DefaultFarNavn"});throw new Error("Feil i kode: Ugyldig hvemPlanlegger")},d=(r,e)=>{if(r.type===t.MOR_OG_MEDMOR)return e.formatMessage({id:"HvemPlanlegger.DefaultMedMorNavn"});if(r.type===t.MOR_OG_FAR)return e.formatMessage({id:"HvemPlanlegger.DefaultFarNavn"});if(r.type===t.FAR_OG_FAR)return e.formatMessage({id:"HvemPlanlegger.DefaultFarNavn"})},k=(r,e)=>o(r,e).split(" ")[0],A=(r,e)=>{const a=M(r,e);return a?a.split(" ")[0]:void 0},y=(r,e)=>s(e)?r.formatMessage({id:"OversiktSteg.Mor"}):r.formatMessage({id:"OversiktSteg.Far"}),p=(r,e)=>{if(e.type===t.MOR_OG_MEDMOR)return r.formatMessage({id:"OversiktSteg.Medmor"});if(n(e))return r.formatMessage({id:"OversiktSteg.Far"})},D=(r,e,a)=>{if(f(r))return a.formatMessage({id:"Du"});if(e==="kunSøker1HarRett")return o(r,a);if(e==="kunSøker2HarRett")return M(r,a);if(e==="beggeHarRett")return a.formatMessage({id:"Dere"});throw new Error("Ugyldig tilstand")},R=r=>{const e=r.charAt(r.length-1).toLowerCase();return e==="s"||e==="x"||e==="z"},G=(r,e)=>{if(e!=="nb"&&e!=="nn"&&e!=="en")return r;const a=R(r);return a&&e==="en"?`${r}'s`:a?`${r}'`:`${r}s`},S=(r,e)=>r.type===t.FAR||r.type===t.MOR_OG_FAR&&e==="kunSøker2HarRett"||r.type===t.FAR_OG_FAR||r.type===t.MOR_OG_MEDMOR&&e==="kunSøker2HarRett";export{t as S,y as a,f as b,k as c,D as d,s as e,p as f,A as g,S as h,i,F as j,n as k,_ as l,u as m,d as n,O as o,M as p,o as q,G as r};
