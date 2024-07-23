/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseResponse_Array_string_ } from '../models/BaseResponse_Array_string_';
import type { BaseResponse_long_ } from '../models/BaseResponse_long_';
import type { BaseResponse_Page_QuestionSubmitVO_ } from '../models/BaseResponse_Page_QuestionSubmitVO_';
import type { BaseResponse_QuestionSubmit_ } from '../models/BaseResponse_QuestionSubmit_';
import type { BaseResponse_string_ } from '../models/BaseResponse_string_';
import type { QuestionRunAddRequest } from '../models/QuestionRunAddRequest';
import type { QuestionSubmitAddRequest } from '../models/QuestionSubmitAddRequest';
import type { QuestionSubmitQueryRequest } from '../models/QuestionSubmitQueryRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class QuestionSubmitControllerService {
    /**
     * doQuestionSubmit
     * @param questionSubmitAddRequest questionSubmitAddRequest
     * @returns BaseResponse_long_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static doQuestionSubmitUsingPost(
        questionSubmitAddRequest: QuestionSubmitAddRequest,
    ): CancelablePromise<BaseResponse_long_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/question_submit/',
            body: questionSubmitAddRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * getRunResult
     * @param redisId redisId
     * @returns BaseResponse_Array_string_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static getRunResultUsingPost(
        redisId?: string,
    ): CancelablePromise<BaseResponse_Array_string_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/question_submit/getRunResult',
            query: {
                'redisId': redisId,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * getSubmitResult
     * @param questionSubmitId questionSubmitId
     * @returns BaseResponse_QuestionSubmit_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static getSubmitResultUsingPost(
        questionSubmitId?: number,
    ): CancelablePromise<BaseResponse_QuestionSubmit_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/question_submit/getSubmitResult',
            query: {
                'questionSubmitId': questionSubmitId,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * listQuestionSubmitByPage
     * @param questionSubmitQueryRequest questionSubmitQueryRequest
     * @returns BaseResponse_Page_QuestionSubmitVO_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static listQuestionSubmitByPageUsingPost(
        questionSubmitQueryRequest: QuestionSubmitQueryRequest,
    ): CancelablePromise<BaseResponse_Page_QuestionSubmitVO_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/question_submit/list/page',
            body: questionSubmitQueryRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * runQuestion
     * @param questionRunAddRequest questionRunAddRequest
     * @returns BaseResponse_string_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static runQuestionUsingPost(
        questionRunAddRequest: QuestionRunAddRequest,
    ): CancelablePromise<BaseResponse_string_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/question_submit/run',
            body: questionRunAddRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
}
