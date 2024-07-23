/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseResponse_boolean_ } from '../models/BaseResponse_boolean_';
import type { BaseResponse_List_ExamAllSubmitVO_ } from '../models/BaseResponse_List_ExamAllSubmitVO_';
import type { BaseResponse_long_ } from '../models/BaseResponse_long_';
import type { ExamQueryRequest } from '../models/ExamQueryRequest';
import type { ExamSubmitAddRequest } from '../models/ExamSubmitAddRequest';
import type { ExamSubmitUpdateRequest } from '../models/ExamSubmitUpdateRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ExamSubmitControllerService {
    /**
     * listExamAllSubmitVO
     * @param examQueryRequest examQueryRequest
     * @returns BaseResponse_List_ExamAllSubmitVO_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static listExamAllSubmitVoUsingPost(
        examQueryRequest: ExamQueryRequest,
    ): CancelablePromise<BaseResponse_List_ExamAllSubmitVO_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/exam_submit/list/examAllSubmitVO',
            body: examQueryRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * submitExam
     * @param examSubmitAddRequest examSubmitAddRequest
     * @returns BaseResponse_long_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static submitExamUsingPost(
        examSubmitAddRequest: ExamSubmitAddRequest,
    ): CancelablePromise<BaseResponse_long_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/exam_submit/submit',
            body: examSubmitAddRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * updateExamSubmit
     * @param examSubmitUpdateRequest examSubmitUpdateRequest
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static updateExamSubmitUsingPost(
        examSubmitUpdateRequest: ExamSubmitUpdateRequest,
    ): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/exam_submit/update',
            body: examSubmitUpdateRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
}
