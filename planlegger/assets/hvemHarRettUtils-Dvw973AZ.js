import{A as R}from"./Arbeidssituasjon-Bw9oRg1d.js";import{S as e,e as n}from"./HvemPlanleggerUtils-CHTffTZd.js";const S=t=>{const r=t.status===R.JOBBER&&t.jobberAnnenPart===!0,a=t.status===R.JOBBER&&t.jobberAnnenPart!==!0,k=t.status!==R.JOBBER&&t.jobberAnnenPart===!0;return r?"beggeHarRett":a?"kunSøker1HarRett":k?"kunSøker2HarRett":"ingenHarRett"},H=(t,r)=>t==="kunSøker2HarRett"&&(r.type===e.MOR_OG_MEDMOR||r.type===e.FAR_OG_FAR||r.type===e.MOR_OG_FAR),A=(t,r)=>(r.type===e.FAR||r.type===e.FAR_OG_FAR)&&t==="kunSøker1HarRett",s=(t,r)=>n(r)&&(t==="beggeHarRett"||t==="kunSøker1HarRett"),O=(t,r)=>n(r)&&t==="kunSøker1HarRett";export{O as a,H as b,s as c,A as h,S as u};
