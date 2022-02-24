import Vue from "vue";
import Router from "vue-router";
import index from "@/components/index";
import query from "@/components/query";
import book from "@/components/book";
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err);
};
Vue.use(Router);

export default new Router({
    routes: [{
            path: "/",
            name: "index",
            component: index
        },
        {
            path: "/query",
            name: "query",
            component: query
        },
        {
            path: "/book",
            name: "book",
            component: book
        }
    ]
});