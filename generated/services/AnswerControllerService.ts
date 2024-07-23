/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AnswerAddRequest } from '../models/AnswerAddRequest';
import type { AnswerQueryRequest } from '../models/AnswerQueryRequest';
import type { AnswerUpdateRequest } from '../models/AnswerUpdateRequest';
import type { BaseResponse_AnswerVO_ } from '../models/BaseResponse_AnswerVO_';
import type { BaseResponse_boolean_ } from '../models/BaseResponse_boolean_';
import type { BaseResponse_long_ } from '../models/BaseResponse_long_';
import type { BaseResponse_Page_Answer_ } from '../models/BaseResponse_Page_Answer_';
import type { BaseResponse_Page_AnswerVO_ } from '../models/BaseResponse_Page_AnswerVO_';
import type { DeleteRequest } from '../models/DeleteRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AnswerControllerService {
    /**
     * addAnswer
     * @param answerAddRequest answerAddRequest
     * @returns BaseResponse_long_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static addAnswerUsingPost(
        answerAddRequest: AnswerAddRequest,
    ): CancelablePromise<BaseResponse_long_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/answer/add',
            body: answerAddRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * deleteAnswer
     * @param deleteRequest deleteRequest
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static deleteAnswerUsingPost(
        deleteRequest: DeleteRequest,
    ): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/answer/delete',
            body: deleteRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * getAnswerById
     * @param id id
     * @returns BaseResponse_AnswerVO_ OK
     * @throws ApiError
     */
    public static getAnswerByIdUsingGet(
        id?: number,
    ): CancelablePromise<BaseResponse_AnswerVO_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/answer/get',
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
     * listAnswerByPage
     * @param answerQueryRequest answerQueryRequest
     * @returns BaseResponse_Page_AnswerVO_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static listAnswerByPageUsingPost(
        answerQueryRequest: AnswerQueryRequest,
    ): CancelablePromise<BaseResponse_Page_AnswerVO_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/answer/list/page',
            body: answerQueryRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * listMyAnswerByPage
     * @param answerQueryRequest answerQueryRequest
     * @returns BaseResponse_Page_Answer_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static listMyAnswerByPageUsingPost(
        answerQueryRequest: AnswerQueryRequest,
    ): CancelablePromise<BaseResponse_Page_Answer_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/answer/my/list/page',
            body: answerQueryRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * updateAnswer
     * @param answerUpdateRequest answerUpdateRequest
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static updateAnswerUsingPost(
        answerUpdateRequest: AnswerUpdateRequest,
    ): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/answer/update',
            body: answerUpdateRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
}
