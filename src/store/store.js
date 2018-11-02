import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        couponData: [
            {
                name: '中秋浓情购',
                value: 100,
                date1: '2018-9-20',
                date2: '14:20'
            },
            {
                name: '国庆大优惠',
                value: 200,
                date1: '2018-9-25',
                date2: '14:20'
            },
            {
                name: '双11购物狂欢',
                value: 1000,
                date1: '2018-11-11',
                date2: '14:20'
            },
        ],
        questData: [
            {
                name: '如何有效保持身材',
                value: 3,
                date: '2018-11-1',
                questList: [
                    {
                        name: '锻炼方式',
                        type: '2',
                        answerList: ['跑步', '游泳', '健身', '葛优躺']
                    },
                    {
                        name: '主食',
                        type: '1',
                        answerList: ['米饭', '面类', '肉类', '空气']
                    },
                    {
                        name: '谈谈你减肥的诀窍',
                        type: '3',
                    }
                ]
            }
        ]
    },
    mutations: {
        setData(state, data) {
            switch (data.type) {
                case 'add':
                    state[data.class].push(data.data)
                    break;
                case 'handle':
                    state[data.class].splice(data.index, 1, data.data);
                    break;
                case 'delete':
                    state[data.class].splice(data.index, 1);
                    break;
                default:
                    console.log('此函数未被定义 ！')
                    break;
            }
        }
    }
})