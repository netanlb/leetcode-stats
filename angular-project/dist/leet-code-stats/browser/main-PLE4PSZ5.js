import{a as k}from"./chunk-XBQC6EPQ.js";import{A as c,E as s,J as d,P as f,T as n,U as t,V as i,W as u,Y as a,ea as C,ma as v,na as g,pa as x,r as l,sa as h}from"./chunk-6GQOCBRG.js";var A=[{path:"",loadComponent:()=>import("./chunk-UT7MM2HZ.js")},{path:"user/:profile",loadComponent:()=>import("./chunk-BVLQK77Y.js")}];var _={providers:[C({eventCoalescing:!0}),h(A),v()]};function M(e,r){e&1&&(n(0,"span"),a(1," LIGHT "),i(2,"i",2),t())}function S(e,r){e&1&&(n(0,"span"),a(1," DARK "),i(2,"i",3),t())}var p=class e{title="leet-code-stats";darkModeService=l(k);ngOnInit(){this.darkModeService.applyTheme()}static \u0275fac=function(o){return new(o||e)};static \u0275cmp=s({type:e,selectors:[["app-root"]],decls:5,vars:1,consts:[[1,"mx-auto","min-h-screen","text-textLight","dark:text-textDark"],[1,"absolute","top-4","right-4","py-2","px-4","hover:text-primary","text-sm",3,"click"],[1,"fa-solid","fa-sun"],[1,"fa-solid","fa-moon"]],template:function(o,m){o&1&&(n(0,"div",0)(1,"button",1),u("click",function(){return m.darkModeService.toggleTheme()}),d(2,M,3,0,"span")(3,S,3,0,"span"),t(),i(4,"router-outlet"),t()),o&2&&(c(2),f(m.darkModeService.darkMode()?2:3))},dependencies:[x],encapsulation:2})};g(p,_).catch(e=>console.error(e));
