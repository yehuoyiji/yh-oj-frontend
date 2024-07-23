/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Question } from './Question';
import type { UserGroupVO } from './UserGroupVO';
export type QuestionGroupVO = {
    actionTime?: string;
    announcement?: string;
    createTime?: string;
    endTime?: string;
    explanation?: string;
    groupName?: string;
    id?: number;
    isDelete?: number;
    latestTime?: string;
    limitTime?: number;
    questionList?: Array<Question>;
    score?: number;
    status?: number;
    updateTime?: string;
    userGroupList?: Array<UserGroupVO>;
    userId?: number;
};

