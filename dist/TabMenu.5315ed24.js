import{c as x}from"./chunks/clsx.m.94787637.js";import{r as m}from"./chunks/index.ecebb80e.js";import{j as t,m as r}from"./chunks/jsx-runtime.3fad90ba.js";const d=o=>t.exports.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 49.468 28.879",...o,children:t.exports.jsx("path",{fill:"currentColor",d:"m24.735 28.879 2.476-2.365L49.468 5.147 44.516 0 24.734 19 4.952 0 0 5.147l22.257 21.367Z","data-name":"Trac\\xE9 48"})}),n={chevron:{open:{rotate:0,transition:{ease:"linear"}},close:{rotate:-90}},container:{open:{opacity:1,display:"block",translateY:0,transition:{delay:.2,duration:.3,ease:"easeOut"}},close:{opacity:0,translateY:50,transition:{duration:.3,ease:"easeIn"},transitionEnd:{display:"none"}}}},f=({items:o,initialKey:i,...l})=>{const[s,c]=m.exports.useState(i??null),p=o.map(e=>e.key).map(e=>({element:l[e]??null,key:e}));return t.exports.jsxs("div",{className:"relative z-10",children:[t.exports.jsx("div",{className:"flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-1 lg:px-14",children:o.map(e=>t.exports.jsxs("a",{href:"#",onClick:a=>{a.preventDefault(),c(e.key)},className:x("relative cursor-pointer flex-1 flex justify-start px-4 sm:px-0 sm:justify-center items-center text-center uppercase xl:text-lg py-4 transition-colors border-2 border-mini-blue",{"bg-white text-black":s===e.key},{"bg-mini-blue text-white":s!==e.key}),children:[e.title,t.exports.jsx("div",{className:"invisible sm:visible absolute top-0 right-4 bottom-0 flex justify-center items-center",children:t.exports.jsx(r.div,{variants:n.chevron,initial:e.key===s?"open":"close",animate:e.key===s?"open":"close",children:t.exports.jsx(d,{className:"w-6 h-auto"})})})]},e.key))}),p.map(({element:e,key:a})=>t.exports.jsx(r.div,{variants:n.container,initial:a===s?"open":"close",animate:a===s?"open":"close",children:e},a))]})};export{f as default};