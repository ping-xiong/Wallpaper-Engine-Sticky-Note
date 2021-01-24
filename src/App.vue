<template>
    <div id="app">
        <v-app>
            <div class="d-flex setting-bar">
                <div class="mr-auto"></div>
                <v-btn icon color="#00000061" class="setting-btn" @click="add">
                    <v-icon>mdi-plus</v-icon>
                </v-btn>
                <v-dialog
                    v-model="dialog"
                    width="500"
                    :hide-overlay="true"
                >
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn icon
                               color="#00000061"
                               class="setting-btn"
                               v-bind="attrs"
                               v-on="on"
                        >
                            <v-icon>mdi-settings</v-icon>
                        </v-btn>
                    </template>

                    <v-card>
                        <v-card-title class="headline grey lighten-2">
                            <v-icon>mdi-settings</v-icon>
                            {{$t('message.setting')}}
                        </v-card-title>

                        <v-card-text>
                            <div style="padding: 10px">
                                <div class="setting-item">
                                    <div class="setting-title">
                                        <v-icon>mdi-translate</v-icon>
                                        {{$t('message.language')}}
                                    </div>

                                    <v-radio-group
                                        :value="language"
                                        row
                                        @change="changeLanguage"
                                    >
                                        <v-radio
                                            label="English"
                                            value="en"
                                        ></v-radio>
                                        <v-radio
                                            label="简体中文"
                                            value="zh"
                                        ></v-radio>
                                    </v-radio-group>

                                    <v-divider></v-divider>
                                </div>

                                <div  class="setting-item">
                                    <div class="setting-title">
                                        <v-icon>mdi-clock-outline</v-icon>
                                        {{$t('message.showTime')}}
                                    </div>

                                    <v-switch
                                        v-model="showTimeCheckStatus"
                                        :value="true"
                                        @change="changeShowTime"
                                    ></v-switch>

                                    <v-divider></v-divider>
                                </div>

                                <div  class="setting-item">
                                    <div class="setting-title">
                                        <v-icon>mdi-image-size-select-actual</v-icon>
                                        {{$t('message.bg')}}
                                    </div>

                                    <div class="select-image-mode">
                                        <v-radio-group
                                            :value="cardBgMode"
                                            row
                                            @change="changeBgMode"
                                        >
                                            <v-radio
                                                :label="$t('message.imageMode')"
                                                :value="0"
                                            ></v-radio>
                                            <v-radio
                                                :label="$t('message.pureColorMode')"
                                                :value="1"
                                            ></v-radio>
                                        </v-radio-group>
                                    </div>

                                    <div class="pick-image" v-if="cardBgMode === 0">
                                        <v-text-field :label="$t('message.imageUrlHint')" @change="updateImage" :value="imageUrl">
                                            <v-icon
                                                slot="prepend"
                                                color="green"
                                            >
                                                mdi-web
                                            </v-icon>
                                        </v-text-field>
                                    </div>

                                    <div class="pick-color" v-else>
                                        <v-color-picker
                                            @update:color="updateColor"
                                            dot-size="25"
                                            swatches-max-height="200"
                                            :value="pureColor"
                                        ></v-color-picker>
                                    </div>

                                </div>

                            </div>
                        </v-card-text>

                        <v-divider></v-divider>

                        <div class="copyright">
                            <p>{{ $t('message.sourceCode') }}</p>
                            <p>https://github.com/ping-xiong/Wallpaper-Engine-Sticky-Note</p>
                            <p>{{ $t('message.dataSave') }}</p>
                            <p>{{ $t('message.contact') }}: 597914752@qq.com</p>
                        </div>

                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                                color="primary"
                                text
                                @click="dialog = false"
                            >
                                {{$t('message.close')}}
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </div>

            <v-main>
                <router-view></router-view>
            </v-main>
        </v-app>
    </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
    name: 'App',
    components: {},
    data: () => ({
        dialog: false,
        showTimeCheckStatus: true
    }),
    mounted() {
        window.onresize = () => {
            return (() => {
                this.updateSize()
            })()
        }

        this.updateSize()

        this.showTimeCheckStatus = this.showTimeOnCard === true
    },
    methods:{
        updateSize(){
            this.$store.commit('updateWindowsSize', {
                width: document.body.clientWidth,
                height: document.body.clientHeight
            })
        },
        add(){
            this.$store.commit('addNewCard', {
                x: 10,
                y: 10,
                first: true
            })
        },
        changeLanguage(e){
            this.$i18n.locale = e
            this.$store.commit('changeLanguage', e)
        },
        changeShowTime(e){
            if (e != null){
                this.$store.commit('changeShowTime', true)
            }else{
                this.$store.commit('changeShowTime', false)
            }
        },
        changeBgMode(e){
            this.$store.commit('changeBgMode', e)
        },
        updateImage(e){
            this.$store.commit('updateImageUrl', e)
        },
        updateColor(e){
            this.$store.commit('updateColor', e.hexa)
        }
    },
    computed:{
        ...mapState([
            'language',
            'showTimeOnCard',
            'cardBgMode',
            'pureColor',
            'imageUrl'
        ])
    }
}
</script>

<style lang="scss">

    body::-webkit-scrollbar {
        display: none;
    }

    html, body{
        -ms-overflow-style: none;
    }

    html {
        overflow: -moz-hidden-unscrollable;
        height: 100%;
    }

    textarea{
        resize:none !important;
    }

    #app {

        .setting-bar{
            position: absolute;
            width: 100%;
            left: 0;
            top: 0;

            .setting-btn{
                z-index: 99;
            }


        }

        .setting-item{
            margin-bottom: 20px;
        }

        .copyright{
            padding: 20px;
            color: #909090;
        }

    }

    ::-webkit-scrollbar-track-piece {
        /*background-color: #fff;*/
        -webkit-border-radius: 0
    }
    ::-webkit-scrollbar {
        width: 6px;
        /*height: 10px*/
    }
    ::-webkit-scrollbar-thumb {
        /*height: 50px;*/
        background-color: #00000061;
        -webkit-border-radius: 6px;
        /*outline: 2px solid #fff;*/
        outline-offset: -2px;
        /*border: 2px solid #fff;*/
        filter: alpha(opacity = 50);
        -moz-opacity: 0.5;
        -khtml-opacity: 0.5;
        opacity: 0.5
    }
    ::-webkit-scrollbar-thumb:hover {
        /*height: 50px;*/
        background-color: #878987;
        -webkit-border-radius: 6px
    }
</style>
