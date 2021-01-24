<template>
    <v-card
        class="mx-auto ab-card"
        :color="CardTheme.bgColor"
        dark
        :style="cardStyle"
        @mouseenter="showTitle"
        @mouseleave="hideTitle"
    >
        <v-card-title
            :style="{visibility: titleVisible ? 'visible' : 'hidden', padding: '4px'}"
            class="bg-title"
            @mousedown="active"
            @mouseup="save"
            @mousemove="move"
            @mouseleave="save">
            <div class="d-flex title" v-if="!pickColorVisible">
                <div class="mr-auto">
                    <v-btn icon :color="CardTheme.color" @click="add" :title="$t('message.add')">
                        <v-icon>mdi-plus</v-icon>
                    </v-btn>
                </div>
                <v-btn icon :color="CardTheme.color" @click="showPickColor" :title="$t('message.theme')">
                    <v-icon>mdi-palette</v-icon>
                </v-btn>
                <v-btn icon :color="CardTheme.color" @click="del" :title="$t('message.del')">
                    <v-icon>mdi-delete</v-icon>
                </v-btn>
            </div>
            <div class="d-flex flex-grow-1 flex-shrink-0 align-center pick-color" :style="{height: CardTitle.height + 'px'}" v-else>
                <div
                    class="color-block flex-grow-1"
                    v-for="(item,index) in theme"
                    :key="index"
                    :style="{
                        background: item.bgColor,
                        color:item.bgColor,
                        height: (CardTitle.height - 8) + 'px',
                        flex: 1,
                        width: '100%'
                    }"
                    @click="saveColor(index)"
                >pick</div>
            </div>
        </v-card-title>

        <v-card-text class="content" :style="'font-size:' + CardData.fontSize">
            <textarea-autosize
                class="input-area"
                :placeholder="$t('message.input_hint')"
                v-model="CardData.content"
                :min-height="CardInputAreaHeight"
                :max-height="CardInputAreaHeight"
                @blur.native="onBlurTextarea"
                :style="{
                    color: CardTheme.color
                }"
            />
        </v-card-text>

        <v-divider v-if="showTimeOnCard"></v-divider>
        <v-card-actions v-if="showTimeOnCard">
            <span class="time" :style="{
                    color: CardTheme.color
                }">{{ CardData.time }}</span>
        </v-card-actions>
    </v-card>
</template>

<script>

import {mapState} from 'vuex'
import theme from "@/plugins/theme";

export default {
    name: "card",
    props: {
        CardData: {
            type: Object,
            default: () => ({})
        },
        CardIndex: {
            type: Number,
            default: null
        }
    },
    data: () => ({
        allowMove: false,
        titleVisible: false,
        pickColorVisible: false,
        theme
    }),
    methods: {
        active() {
            // allow to move this card
            this.allowMove = true
        },
        move(e) {
            // move card by mouse
            if (this.allowMove) {
                this.$store.commit('changePosition', {
                    index: this.CardIndex,
                    data: {
                        x: this.CardData.position.x + e.movementX,
                        y: this.CardData.position.y + e.movementY
                    }
                })
            }
        },
        save() {
            // not allow toe move this card
            this.allowMove = false
        },
        add() {
            this.$store.commit('addNewCard', {
                x: this.CardData.position.x,
                y: this.CardData.position.y,
                first: false
            })
        },
        del() {
            // 删除
            this.$store.commit('delCard', this.CardIndex)
        },
        onBlurTextarea(){
            this.$store.commit('updateContent', {
                index: this.CardIndex,
                content: this.CardData.content
            })
        },
        showTitle(){
            this.titleVisible = true
        },
        hideTitle(){
            this.titleVisible = false
            this.pickColorVisible = false
        },
        showPickColor(){
            this.pickColorVisible = true
        },
        saveColor(index){
            this.pickColorVisible = false
            this.CardData.theme = index
            this.$store.commit('changeTheme', {
                CardIndex: this.CardIndex,
                index: index
            })
        }
    },
    mounted() {

    },
    computed: {
        ...mapState([
            'CardTitle',
            'CardAction',
            'showTimeOnCard'
        ]),
        cardStyle() {
            return 'left: ' + this.CardData.position.x +
                'px;top: ' + this.CardData.position.y +
                'px;width: ' + this.CardData.width +
                'px;height: ' + this.CardData.height +
                'px;'
        },
        CardInputAreaHeight(){
            if (this.showTimeOnCard){
                return this.CardData.height - this.CardAction.height - this.CardTitle.height - 26
            }else{
                return this.CardData.height - this.CardTitle.height - 26
            }

        },
        CardTheme(){
            return this.theme[this.CardData.theme]
        }
    }
}
</script>

<style lang="scss" scoped>
    .ab-card {
        position: absolute;
        display: flex;
        flex-direction: column;
    }

    .bg-title{
        background: rgb(0 0 0 / 10%);

        .pick-color{
            padding-left: 10px;
            padding-right: 10px;
            cursor: pointer;
        }
    }

    .title {
        width: 100%;
    }

    .content {
        line-height: 1.3em;
        word-spacing: 0.1em;
        letter-spacing: 0.04em;

        flex: 1;
        padding: 10px;
    }

    .time {
        text-align: right;
        display: block;
        width: 100%;
        user-select: none;
    }

    .input-area {
        width: 100%;
        border: none;
        outline: none;
        overflow-y: hidden !important;
        border-right: 6px solid #87898700;

        &:hover{
            overflow-y: auto !important;
            border-right: none;
        }

    }

</style>