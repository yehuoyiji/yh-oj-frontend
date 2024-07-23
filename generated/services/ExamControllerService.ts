/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseResponse_boolean_ } from '../models/BaseResponse_boolean_';
import type { BaseResponse_ExamVO_ } from '../models/BaseResponse_ExamVO_';
import type { BaseResponse_long_ } from '../models/BaseResponse_long_';
import type { BaseResponse_Page_ExamVO_ } from '../models/BaseResponse_Page_ExamVO_';
import type { ExamQueryRequest } from '../models/ExamQueryRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ExamControllerService {
    /**
     * getExamVOById
     * @param id id
     * @returns BaseResponse_ExamVO_ OK
     * @throws ApiError
     */
    public static getExamVoByIdUsingGet(
        id?: number,
    ): CancelablePromise<BaseResponse_ExamVO_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/exam/get/vo',
            query: {
                'id': id,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * listExamVOByPage
     * @param examQueryRequest examQueryRequest
     * @returns BaseResponse_Page_ExamVO_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static listExamVoByPageUsingPost(
        examQueryRequest: ExamQueryRequest,
    ): CancelablePromise<BaseResponse_Page_ExamVO_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/exam/list/pageVO',
            body: examQueryRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * getRemainingTime
     * @param id id
     * @returns BaseResponse_long_ OK
     * @throws ApiError
     */
    public static getRemainingTimeUsingGet(
        id?: number,
    ): CancelablePromise<BaseResponse_long_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/exam/remaining-time',
            query: {
                'id': id,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * startExam
     * @param questionGroupId questionGroupId
     * @returns BaseResponse_long_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static startExamUsingPost(
        questionGroupId?: number,
    ): CancelablePromise<BaseResponse_long_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/exam/start',
            query: {
                'questionGroupId': questionGroupId,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * submitExam
     * @param examId examId
     * @returns BaseResponse_boolean_ OK
     * @throws ApiError
     */
    public static submitExamUsingGet(
        examId?: number,
    ): CancelablePromise<BaseResponse_boolean_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/exam/submitExam',
            query: {
                'examId': examId,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
}
