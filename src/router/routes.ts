import {RouteRecordRaw} from "vue-router";
import HomeView from "@/views/ExampleView.vue";
import AdminView from "@/views/AdminView.vue";
import NoAuthView from "@/views/NoAuthView.vue";
import AccessEnum from "@/access/accessEnum";
import ACCESS_ENUM from "@/access/accessEnum";
import UserLayout from "@/layouts/UserLayout.vue";
import UserLoginView from "@/views/user/UserLoginView.vue";
import UserRegisterView from "@/views/user/UserRegisterView.vue";
import UserLoginView2 from "@/views/user/UserLoginView2.vue";
import AddQuestionView from "@/views/question/AddQuestionView.vue";
import ManageQuestionView from "@/views/question/ManageQuestionView.vue";
import ManageQuestionView2 from "@/views/question/ManageQuestionView2.vue";
import QuestionView from "@/views/question/QuestionView.vue";
import ViewQuestionView from "@/views/question/ViewQuestionView.vue";
import UserManager from "@/views/user/UserManager.vue";
import ExamineView from "@/views/exam/ExamineView.vue";
import OverviewView from "@/views/exam/OverviewView.vue";
import ProblemsSetView from "@/views/exam/ProblemsSetView.vue";
import UserGroupView from "@/views/exam/UserGroupView.vue";

import QuestionBankListView from "@/views/exam/QuestionBankListView.vue";
import UserExamineView from "@/views/exam/UserExamineView.vue";
import UserExamineView2 from "@/views/exam/UserExamineView2.vue";
import ExamineDetailView from "@/views/exam/ExamineDetailView.vue";
import ExaminePaperView from "@/views/exam/ExaminePaperView.vue";
import ExamineeView from "@/views/exam/ExamineeView.vue";
import ExamineRankingView from "@/views/exam/ExamineRankingView.vue";
import ExamineSubmitListView from "@/views/exam/ExamineSubmitListView.vue";
import ExamineManageView from "@/views/exam/ExamineManageView.vue";
import userGroupDetailsView from "@/views/exam/UserGroupDetailsView.vue";
import ExamineManageEditView from "@/views/exam/ExamineManageEditView.vue";
import component from "*.vue";
import UserExamView from "@/views/user/UserExamView.vue";
import UserExamQuestionView from "@/views/user/UserExamQuestionView.vue";

export const routes: Array<RouteRecordRaw> = [
    {
        path: '/user',
        name: '用户',
        component: UserLayout,
        children: [
            {
                path: '/user/login',
                name: '用户登录',
                component: UserLoginView2
            },
            {
                path: '/user/register',
                name: '用户注册',
                component: UserRegisterView
            }
        ],
        meta: {
            hideInMenu: true
        }
    }, {
        path: '/',
        name: '题库',
        component: QuestionView,

    },
    {
        path: '/manage/question',
        name: '管理题目',
        component: ManageQuestionView2,
        meta: {
            access: [ACCESS_ENUM.ADMIN]
        }
    },
    {
        path: '/manager/user',
        name: '用户管理',
        component: UserManager,
        meta: {
            access: [ACCESS_ENUM.ADMIN]
        }
    },

    {
        path: '/examine',
        name: '题目集 ',
        component: UserExamQuestionView,
        meta: {
            access: [ACCESS_ENUM.ADMIN, ACCESS_ENUM.TEACHER, ACCESS_ENUM.USER]
        },
        children: [
            {
                path: '/examine/doExamine/:id',
                name: '考试页',
                component: UserExamView,
                props: true,
                meta: {
                    hideInMenu: true
                }
            }
        ]
    },
    {
        path: '/examine/doExamine/:id',
        name: '考试页',
        component: UserExamView,
        props: true,
        meta: {
            hideInMenu: true
        }
    },
    {
        path: '/user/student/practice/question/:id',
        name: '考试',
        props: true,
        meta: {
            hideInMenu: true
        },
        component: UserExamineView2
    },
    {
        path: '/practice/question/examineDetailView/:id',
        name: '试卷详情',

        component: ExamineDetailView,
        props: true,
        meta: {
            access: [ACCESS_ENUM.ADMIN, ACCESS_ENUM.TEACHER],
            hideInMenu: true
        }
    },
    {
        path: '/practice/question/problemsSetView/examineManageView/:id',
        name: '题目集管理',
        component: ExamineManageView,
        props: true,
        meta: {
            access: [ACCESS_ENUM.ADMIN, ACCESS_ENUM.TEACHER],
            hideInMenu: true
        }
    },
    {
        path: '/practice/question/problemsSetView/examineManageView/edit/:id',
        name: "题目集编辑题目",
        component: ExamineManageEditView,
        props: true,
        meta: {
            access: [ACCESS_ENUM.ADMIN, ACCESS_ENUM.TEACHER],
            hideInMenu: true
        }
    },
    {
        path: '/practice/question/examineDetailView/examinePaperView/:id',
        name: '试卷',
        component: ExaminePaperView,
        props: true,
        meta: {
            access: [ACCESS_ENUM.ADMIN, ACCESS_ENUM.TEACHER],
            hideInMenu: true
        }
    },
    {
        path: '/practice/question/examineDetailView/examineeView/:id',
        name: '考生页',
        component: ExamineeView,
        props: true,
        meta: {
            access: [ACCESS_ENUM.ADMIN, ACCESS_ENUM.TEACHER],
            hideInMenu: true
        }
    }, {
        path: '/practice/question/examineDetailView/examineRankingView/:id',
        name: '排名页',
        component: ExamineRankingView,
        props: true,
        meta: {
            access: [ACCESS_ENUM.ADMIN, ACCESS_ENUM.TEACHER],
            hideInMenu: true
        }
    }, {
        path: '/practice/question/examineDetailView/examineSubmitListView/:id',
        name: '提交页',
        component: ExamineSubmitListView,
        props: true,
        meta: {
            access: [ACCESS_ENUM.ADMIN, ACCESS_ENUM.TEACHER],
            hideInMenu: true
        }
    },
    {
        path: '/practice/question/overviewView',
        name: '考试与练习',
        component: ExamineView,
        meta: {
            access: [ACCESS_ENUM.ADMIN, ACCESS_ENUM.TEACHER]
        },
        children: [
            {
                path: '/practice/question/overviewView',
                name: '概览',
                component: OverviewView,
                meta: {
                    access: [ACCESS_ENUM.ADMIN, ACCESS_ENUM.TEACHER]
                },
            }, {
                path: '/practice/question/problemsSetView',
                name: '题目集',
                component: ProblemsSetView
            }, {
                path: '/practice/question/userGroupView',
                name: '用户组',
                component: UserGroupView,
            }, {
                path: '/practice/question/questionBankListView',
                name: '教师题库',
                component: QuestionBankListView
            },
            {
                path: '/practice/question/userGroupView/userGroupDetailsView/:id',
                name: '用户组详情',
                props: true,
                component: userGroupDetailsView
            }
        ]
    },
    {
        path: '/view/question/:id',
        name: '在线做题',
        props: true,
        component: ViewQuestionView,
        meta: {
            // access: ACCESS_ENUM.USER,
            hideInMenu: true
        }
    },
    // {
    //     path: '/examination',
    //     name: '考试',
    //     component: HomeView
    // },
    // {
    //     path: '/add/question',
    //     name: '创建题目',
    //     component: AddQuestionView,
    //     meta: {
    //         access: ACCESS_ENUM.ADMIN
    //     }
    // },
    {
        path: '/update/question',
        name: '更新题目',
        component: AddQuestionView,
        // meta: {
        //     access: ACCESS_ENUM.ADMIN
        // }
        meta: {
            hideInMenu: true
        }
    }

    , {
        path: '/admin',
        name: '管理员界面',
        component: AdminView,
        meta: {
            access: ACCESS_ENUM.ADMIN,
            hideInMenu: true
        }
    },
    {
        path: '/about',
        name: '个人中心',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
        meta: {
            hideInMenu: true
        }
    }

    ,
    {
        path: '/noAuth',
        name: '无权限',
        component: NoAuthView,
        meta: {
            hideInMenu: true
        }
    }
]