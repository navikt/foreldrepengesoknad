import{a as r}from"./axios-Cm0UX6qg.js";import{E as o}from"./Environment-O62Hvuhd.js";const a=o.REST_API_URL,t=r.create({baseURL:a}),i=s=>{t.defaults.headers.common["Accept-Language"]=s},u=s=>(t.interceptors.request.use(e=>(e.timeout=60*1e3,s&&(e.headers.fnr=s),e)),t.interceptors.response.use(e=>e,e=>Promise.reject(e)),t);export{t as A,u as g,i as s};
