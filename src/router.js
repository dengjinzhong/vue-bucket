import Home from './components/Home'
import Coupon from './components/Marketing/Coupon'
import Questionnaire from './components/Marketing/Questionnaire'
import Analysis from './components/Marketing/Analysis'

import CouponHandle from './components/Marketing/CouponHandle'

import QuestionnaireDetails from "./components/Marketing/QuestionnaireDetails";
import QuestionnaireHandle from "./components/Marketing/QuestionnaireHandle";

import Text from './components/Marketing/Text'

export const routes = [
    { path: '/', component: Home },

    { path: '/coupon', component: Coupon },
    { path: '/coupon/handle', component: CouponHandle },

    { path: '/questionnaire', component: Questionnaire },
    { path: '/questionnaire/details', component: QuestionnaireDetails },
    { path: '/questionnaire/handle', component: QuestionnaireHandle },

    { path: '/analysis', component: Analysis },

    { path: '/text', component: Text},

    { path: '*', redirect: '/' }
]