import store from "@/store";
const Util = {}

Util.now = function (){
    let dayjs = require('dayjs')
    dayjs.locale(store.state.language)
    return dayjs().format('YYYY-MM-DD HH:mm:ss')
}

export default Util
