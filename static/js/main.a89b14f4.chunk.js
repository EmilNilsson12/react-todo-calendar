(this["webpackJsonpreact-todo-calender"]=this["webpackJsonpreact-todo-calender"]||[]).push([[0],[,,,,,,,,,,,,,function(t,e,n){},,,function(t,e,n){},function(t,e,n){},function(t,e,n){},function(t,e,n){},function(t,e,n){},function(t,e,n){},function(t,e,n){"use strict";n.r(e);var o=n(1),c=n.n(o),d=n(8),a=n.n(d),i=n(4),s=n(3),r=(n(13),n(2)),l=n.n(r),j=n(0);var u=function(t){var e=t.day,n=t.placeHolder,o=t.today,c=t.active,d=t.cbFunc,a=t.numOfTodos;return Object(j.jsx)(j.Fragment,{children:n?Object(j.jsx)("div",{className:"placeholder grid-child"}):Object(j.jsxs)("button",{id:e+"|day of this month",className:"\n\t\t\t\t\t\t".concat(o?"today":"","\n\t\t\t\t\t\t").concat(c?"active-day":"","\n\t\t\t\t\t\t").concat(a?"has-todos":"","\n\t\t\t\t\t\tday-div\n\t\t\t\t\t\tgrid-child\n\t\t\t\t\t"),onClick:d,children:[a?Object(j.jsx)("div",{className:"notch-container",children:"This day has ".concat(a," todo").concat(a>1?"s":"")}):Object(j.jsx)(j.Fragment,{children:" "}),Object(j.jsx)("div",{className:"date-num",children:e})]})})};n(16);var b=function(){return Object(j.jsx)("div",{className:"grid-container week-days",children:function(){for(var t=[],e=0;e<7;e++){var n=l()();n.set("day",e),t.push(Object(j.jsx)("div",{className:"week-day-label",children:n.format("dddd")},n.format("dddd")))}return t}()})},O=(n(17),n(24));n(18);var h=function(t){var e=t.addTodo,n=t.updateTodo,c=t.dayToShow,d=t.updateMode,a=t.updateParams,i=t.setCurrentlyUpdating,r=Object(o.useState)(""),u=Object(s.a)(r,2),b=u[0],h=u[1],f=Object(o.useState)(""),p=Object(s.a)(f,2),m=p[0],x=p[1],v=Object(o.useState)(l()()),T=Object(s.a)(v,2),g=T[0],S=T[1],y=Object(o.useState)(l()().toISOString().split("T")[0]),w=Object(s.a)(y,2),N=w[0],C=w[1],M=Object(o.useState)(c),I=Object(s.a)(M,2),k=I[0],Y=I[1],D=Object(o.useRef)(null);return Object(o.useEffect)((function(){c&&(S(c),C(c.toISOString().split("T")[0])),Y(k)}),[c]),Object(o.useEffect)((function(){D.current.focus(),a&&(h(a.title),x(a.description))}),[d]),Object(j.jsxs)("form",{onSubmit:function(t){t.preventDefault();var o=l()().toISOString().split("T")[1];d?(i(!1),n({title:b,description:m,deadline:g.toISOString().split("T")[0].concat("T",o),id:a.id})):e({title:b,description:m,deadline:g.toISOString().split("T")[0].concat("T",o),id:Object(O.a)()}),h(""),x(""),S(l()()),C(l()().toISOString().split("T")[0]),D.current.focus()},children:[Object(j.jsxs)("label",{children:["Title",Object(j.jsx)("input",{type:"text",value:b,onChange:function(t){var e=t.target;h(e.value)},required:!0,autoFocus:!0,ref:D})]}),Object(j.jsxs)("label",{children:["Additional info",Object(j.jsx)("textarea",{value:m,onChange:function(t){var e=t.target;x(e.value)}})]}),Object(j.jsxs)("label",{children:["Deadline: ",Object(j.jsx)("b",{children:g.endOf("days").fromNow()}),Object(j.jsx)("input",{type:"date",value:N,onChange:function(t){var e=t.target.value,n=e+"T"+l()(g).toISOString().split("T")[1],o=l()(n);S(o),C(e)},required:!0})]}),Object(j.jsxs)("div",{className:"submit-btn-div",children:[Object(j.jsx)("button",{type:"submit",children:d?"Update todo":"Add new Todo"}),d&&Object(j.jsx)("button",{type:"button",onClick:function(){i(!1),h(""),x(""),S(l()()),C(l()().toISOString().split("T")[0])},children:"Cancel"})]})]})};n(19),n(20);var f=function(t){var e=t.todoObj,n=t.toggleCompleteTodo,c=t.deleteTodo,d=t.beginEdit,a=Object(o.useState)(!1),i=Object(s.a)(a,2),r=i[0],l=i[1];return Object(j.jsxs)("div",{className:"\n\t\t\ttodo-view\n\t\t\t".concat(e.completed?"todo-completed":"","\n\t\t"),children:[Object(j.jsxs)("div",{children:[Object(j.jsx)("h4",{children:e.title}),Object(j.jsx)("p",{children:e.description}),Object(j.jsx)("span",{children:e.dateAdded})]}),Object(j.jsx)("div",{className:"todo-btns",children:r?Object(j.jsxs)(j.Fragment,{children:[Object(j.jsx)("button",{onClick:function(){c(e.id),l(!1)},children:"Confirm delete"}),Object(j.jsx)("button",{onClick:function(){l(!1)},children:"Cancel delete"})]}):Object(j.jsxs)(j.Fragment,{children:[Object(j.jsx)("button",{onClick:function(){l(!0)},children:"Delete"}),Object(j.jsx)("button",{onClick:function(){d(e)},children:"Update"}),Object(j.jsx)("button",{onClick:function(){n(e)},children:e.completed?"Unmark as complete":"Mark as complete"})]})})]})};var p=function(t){var e=t.todos,n=t.crudOperations,c=t.insideDayWithTodos,d=t.showingText,a=t.dayToShow,r=Object(o.useState)(!1),u=Object(s.a)(r,2),b=u[0],O=u[1],p=Object(o.useState)({}),x=Object(s.a)(p,2),v=x[0],T=x[1],g=Object(o.useState)(!1),S=Object(s.a)(g,2),y=S[0],w=S[1],N=function(t){O(!0),T(t)},C=Object(i.a)(e.sort(m));return y&&(C=Object(i.a)(C.filter((function(t){return!t.completed})))),b?Object(j.jsx)(h,{addTodo:n.addTodo,updateTodo:n.updateTodo,updateParams:v,updateMode:!0,setCurrentlyUpdating:O,dayToShow:l()(v.deadline)}):Object(j.jsxs)("div",{className:"\n\t\t\t".concat(d?"testing-grid":"","\n\t\t"),children:[d?Object(j.jsx)(h,{addTodo:n.addTodo,dayToShow:a}):Object(j.jsx)(j.Fragment,{}),Object(j.jsxs)("div",{className:"".concat(c?"list-todos-component-inside-day-with-todos":"list-todos-component"),children:[Object(j.jsxs)("label",{children:["".concat(y?d?"Showing only incomplete todos due on ".concat(d):"Showing: All":d?"Showing all todos due on: ".concat(d):"Showing: Only incomplete"),Object(j.jsx)("br",{}),y?"Click to show all":"Click to show only incomplete",Object(j.jsx)("input",{type:"checkbox",onClick:function(){return w(!y)}})]}),Object(j.jsx)("div",{className:"\n\t\t\tall-todos-listed\n\t\t\t".concat(c?"inside-day-with-todos":"","\n\t\t\t"),children:C.map((function(t){var e=l()(t.deadline);return Object(j.jsx)(f,{todoObj:t,toggleCompleteTodo:n.toggleCompleteTodo,deleteTodo:n.deleteTodo,momentObjFromTodo:e,beginEdit:N},t.id)}))})]})]})};function m(t,e){var n=l()(t.deadline),o=l()(e.deadline);return n.isBefore(o)?-1:o.isBefore(n)?1:0}var x=function(t){var e=t.dayToShow,n=t.todos,c=t.crudOperations,d=n.filter((function(t){return e.isSame(t.deadline,"date")})),a=Object(o.useState)(!1),i=Object(s.a)(a,2),r=i[0],l=i[1],u=Object(o.useState)({}),b=Object(s.a)(u,2),O=b[0];return b[1],r?Object(j.jsx)(h,{addTodo:c.addTodo,updateTodo:c.updateTodo,updateParams:O,updateMode:!0,setCurrentlyUpdating:l,dayToShow:e}):Object(j.jsx)("div",{className:"day-with-todos",children:Object(j.jsx)("div",{className:"grid-day-with-todos",children:d.length>0?Object(j.jsx)(p,{todos:d,crudOperations:c,insideDayWithTodos:!0,showingText:e.format("D [of] MMMM, YYYY"),dayToShow:e}):Object(j.jsxs)("div",{className:"day-w-out-todos",children:[Object(j.jsx)(h,{addTodo:c.addTodo,dayToShow:e}),Object(j.jsxs)("div",{children:[Object(j.jsx)("i",{children:"No todos due this day..."})," ",Object(j.jsx)("u",{children:e.format("D [of] MMMM, YYYY")}),Object(j.jsx)("p",{children:"Use the form to add a new todo on this day!"})]})]})})})};var v=function(t){var e=t.todos,n=t.crudOperations,c=Object(o.useState)((function(){return l()()})),d=Object(s.a)(c,2),a=d[0],i=d[1],r=Object(o.useState)(l()()),O=Object(s.a)(r,2),h=O[0],f=(O[1],Object(o.useState)(h.toString().split(" ")[4])),p=Object(s.a)(f,2),m=p[0],v=p[1];Object(o.useEffect)((function(){v(a.toString().split(" ")[4])}),[a]);var y=function(t){var e,n=t.target;e="|"===n.textContent?parseInt(n.parentNode.parentNode.id.split("|")[0]):""===n.id?parseInt(n.parentNode.id.split("|")[0]):parseInt(n.id.split("|")[0]);var o=a.clone().date(e).toISOString().split("T")[0],c=l()(o+"T"+m);i(c)};return Object(j.jsxs)("div",{className:"calendar",children:[Object(j.jsxs)("div",{className:"month-view",children:[Object(j.jsxs)("div",{className:"month-navigator",children:[Object(j.jsx)("button",{onClick:function(){var t=a.clone().subtract(1,"M").toISOString().split("T")[0],e=l()(t+"T"+m);i(e)},children:"Prev month"}),Object(j.jsx)("h2",{className:"current-month",children:Object(j.jsxs)("i",{children:[a.format("MMMM")," - ",a.format("YYYY")]})}),Object(j.jsx)("button",{onClick:function(){var t=a.clone().add(1,"M").toISOString().split("T")[0],e=l()(t+"T"+m);i(e)},children:"Next month"})]}),Object(j.jsx)(b,{}),Object(j.jsx)("div",{className:"grid-container calender-days",children:function(){for(var t=[],n=a.clone().startOf("month").format("e"),o=1;o<=n;o++)t.push(Object(j.jsx)(u,{placeHolder:!0},"null ".concat(o," of month")));for(var c=1;c<=a.daysInMonth();c++)t.push(Object(j.jsx)(u,{placeHolder:!1,day:c,today:S(h,c),active:g(a,c),cbFunc:y,numOfTodos:T(a,e,c)},"Day ".concat(c," of month")));return t}()})]}),Object(j.jsx)(x,{dayToShow:a,todos:e,crudOperations:n})]})};function T(t,e,n){var o=t.clone().set("date",n).format("YYYY-MM-DD");return e.filter((function(t){return t.deadline.split("T")[0]===o})).length}function g(t,e){return parseInt(t.clone().format("D"),10)===e}function S(t,e){return parseInt(t.clone().format("D"),10)===e}var y=function(){var t=Object(o.useState)(JSON.parse(localStorage.getItem("todos"))||[]),e=Object(s.a)(t,2),n=e[0],c=e[1];Object(o.useEffect)((function(){localStorage.setItem("todos",JSON.stringify(n))}),[n]);var d={addTodo:function(t){w(Object(i.a)(n),c,t)},deleteTodo:function(t){w(Object(i.a)(n).filter((function(e){return e.id!==t})),c)},toggleCompleteTodo:function(t){var e=t.id,o=n.find((function(t){return t.id===e}));o.completed=!o.completed,w(Object(i.a)(n).filter((function(t){return t.id!==e})),c,o)},updateTodo:function(t){w(Object(i.a)(n).filter((function(e){return e.id!==t.id})),c,t)}};return Object(j.jsxs)("div",{className:"App",children:[Object(j.jsx)(p,{todos:n,crudOperations:d}),Object(j.jsx)(v,{todos:n,crudOperations:d})]})};function w(t,e,n){n&&t.push(n),e(t)}n(21);a.a.render(Object(j.jsx)(c.a.StrictMode,{children:Object(j.jsx)(y,{})}),document.getElementById("root"))}],[[22,1,2]]]);
//# sourceMappingURL=main.a89b14f4.chunk.js.map