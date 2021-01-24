import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";
import SecureLS from "secure-ls";
const ls = new SecureLS({isCompression: false});

// import default card
import card from "@/plugins/card";

import Util from "@/plugins/util";

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        Cards: [
            {
                content: '',
                type: 'text',
                time: '',
                theme: 0,
                position:{
                    x: 10,
                    y: 10
                },
                width: 400,
                height: 400,
                fontSize: '14px'
            }
        ],
        Windows: {
            width: 0,
            height: 0
        },
        CardTitle:{
            height: 36
        },
        CardAction:{
            height: 40
        },
        language: 'en',
        showTimeOnCard: true,
        cardBgMode: 0, // 0 for image or 1 for pure color
        imageUrl: '',
        pureColor: '#7AE9FFFF'
    },
    mutations: {
        changePosition(state, position){
            state.Cards[position.index].position = position.data
        },
        addNewCard(state, position){
            let tempCard = JSON.parse(JSON.stringify(card))

            tempCard.time = Util.now()

            tempCard.position.y = position.y

            if (position.first){
                tempCard.position.x = position.x
            }else{
                let offsetXRight = position.x + tempCard.width + 10
                let offsetXLeft = position.x - tempCard.width - 10

                if ( (position.x + (tempCard.width * 2) + 10) < state.Windows.width){
                    tempCard.position.x = offsetXRight
                }else{
                    tempCard.position.x = offsetXLeft
                }
            }

            state.Cards.push(tempCard)
        },
        delCard(state, index){
            state.Cards.splice(index, 1)
        },
        updateWindowsSize(state, size){
            state.Windows = size
        },
        updateContent(state, data){
            state.Cards[data.index].content = data.content
            state.Cards[data.index].time = Util.now()
        },
        changeTheme(state, data){
            state.Cards[data.CardIndex].theme = data.index
        },
        changeLanguage(state, language){
            state.language = language
        },
        changeShowTime(state, show){
            state.showTimeOnCard = show
        },
        changeBgMode(state, mode){
            state.cardBgMode = mode
        },
        updateImageUrl(state, url){
            state.imageUrl = url
        },
        updateColor(state, color){
            state.pureColor = color
        }
    },
    plugins: [
        createPersistedState({
            key: 'wallpaper_sticky_note_data',
            storage: {
                getItem: (key) => ls.get(key),
                setItem: (key, value) => ls.set(key, value),
                removeItem: (key) => ls.remove(key),
            },
        }),
    ]
})

export default store