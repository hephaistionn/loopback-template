export default {

    getQuery: function getQuery() {
        const search = location.search.split('?')[1];
        if(!search) return {};
        let list = search.split('&');
        let formated = {};
        while(list.length){
            const param = list.shift().split('=');
            formated[param[0]]  = param[1];
        }
        history.pushState('', '', location.pathname);
        return formated;
    }

}
