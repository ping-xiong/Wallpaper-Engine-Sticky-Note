<template>
    <div id="panel" :style="bgStyle">
        <card v-for="(item, index) in Cards" :key="index" :card-data.sync="item" :card-index="index"></card>
    </div>
</template>

<script>
import {mapState} from 'vuex'
import card from "@/components/card";

export default {
    name: "homepage",
    components:{
        card
    },
    data: () => ({

    }),
    mounted() {

    },
    methods:{

    },
    computed:{
        ...mapState([
            'Cards',
            'cardBgMode',
            'imageUrl',
            'pureColor'
        ]),
        bgStyle(){
            if (this.cardBgMode === 0){
                // image
                return {
                    background: 'url(' + this.imageUrl + ')',
                    'background-position': 'center',
                    'background-repeat': 'no-repeat',
                    'background-size': 'cover'
                }
            }else{
                // color
                return {
                    background: this.pureColor
                }
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    #panel{
        height: 100vh;
        width: 100%;
        position: relative;
        left: 0;
        top: 0;
    }
</style>