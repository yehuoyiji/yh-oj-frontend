/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ExamSubmitVO } from './ExamSubmitVO';
import type { QuestionGroup } from './QuestionGroup';
import type { UserVO } from './UserVO';
export type ExamVO = {
    actionTime?: string;
    examSubmitVOList?: Array<ExamSubmitVO>;
    id?: number;
    questionGroup?: QuestionGroup;
    score?: number;
    status?: number;
    submitTime?: string;
    userVO?: UserVO;
};

