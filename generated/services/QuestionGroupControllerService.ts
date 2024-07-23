/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseResponse_boolean_ } from '../models/BaseResponse_boolean_';
import type { BaseResponse_List_QuestionGroupVO_ } from '../models/BaseResponse_List_QuestionGroupVO_';
import type { BaseResponse_long_ } from '../models/BaseResponse_long_';
import type { BaseResponse_Page_QuestionGroup_ } from '../models/BaseResponse_Page_QuestionGroup_';
import type { BaseResponse_QuestionGroupVO_ } from '../models/BaseResponse_QuestionGroupVO_';
import type { DeleteRequest } from '../models/DeleteRequest';
import type { QuestionGroupAddRequest } from '../models/QuestionGroupAddRequest';
import type { QuestionGroupQueryRequest } from '../models/QuestionGroupQueryRequest';
import type { QuestionGroupUpdateRequest } from '../models/QuestionGroupUpdateRequest';
import type { QuestionGroupUpdateTimeRespquest } from '../models/QuestionGroupUpdateTimeRespquest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class QuestionGroupControllerService {
    /**
     * addQuestionGroup
     * @param questionGroupAddRequest questionGroupAddRequest
     * @returns BaseResponse_long_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static addQuestionGroupUsingPost(
        questionGroupAddRequest: QuestionGroupAddRequest,
    ): CancelablePromise<BaseResponse_long_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/question_group/add',
            body: questionGroupAddRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * addExpAndAnn
     * @param announcement
     * @param explanation
     * @param id
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static addExpAndAnnUsingPost(
        announcement?: string,
        explanation?: string,
        id?: number,
    ): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/question_group/addExpAndAnn',
            query: {
                'announcement': announcement,
                'explanation': explanation,
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
     * addQuestion
     * @param questionGroupId
     * @param questionIdList
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static addQuestionUsingPost1(
        questionGroupId?: number,
        questionIdList?: Array<number>,
    ): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/question_group/add_question',
            query: {
                'questionGroupId': questionGroupId,
                'questionIdList': questionIdList,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * addUserGroup
     * @param questionGroupId
     * @param userGroupIdList
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static addUserGroupUsingPost(
        questionGroupId?: number,
        userGroupIdList?: Array<number>,
    ): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/question_group/add_usergroup',
            query: {
                'questionGroupId': questionGroupId,
                'userGroupIdList': userGroupIdList,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * deleteQuestionGroup
     * @param deleteRequest deleteRequest
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static deleteQuestionGroupUsingPost(
        deleteRequest: DeleteRequest,
    ): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/question_group/deleteQuestionGroup',
            body: deleteRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * deleteQuestion
     * @param questionGroupId
     * @param questionIdList
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static deleteQuestionUsingPost1(
        questionGroupId?: number,
        questionIdList?: Array<number>,
    ): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/question_group/delete_question',
            query: {
                'questionGroupId': questionGroupId,
                'questionIdList': questionIdList,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * deleteUserGroup
     * @param questionGroupId
     * @param userGroupIdList
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static deleteUserGroupUsingPost(
        questionGroupId?: number,
        userGroupIdList?: Array<number>,
    ): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/question_group/delete_userGroup',
            query: {
                'questionGroupId': questionGroupId,
                'userGroupIdList': userGroupIdList,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * getQuestionGroupById
     * @param id id
     * @returns BaseResponse_QuestionGroupVO_ OK
     * @throws ApiError
     */
    public static getQuestionGroupByIdUsingGet(
        id?: number,
    ): CancelablePromise<BaseResponse_QuestionGroupVO_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/question_group/get',
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
     * getAuthorizationQuestionGroup
     * @param userGroupId userGroupId
     * @returns BaseResponse_List_QuestionGroupVO_ OK
     * @throws ApiError
     */
    public static getAuthorizationQuestionGroupUsingGet(
        userGroupId?: number,
    ): CancelablePromise<BaseResponse_List_QuestionGroupVO_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/question_group/getAuthorizationQG',
            query: {
                'userGroupId': userGroupId,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * getQuestionGroupCount
     * @returns BaseResponse_long_ OK
     * @throws ApiError
     */
    public static getQuestionGroupCountUsingGet(): CancelablePromise<BaseResponse_long_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/question_group/getCount',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * listQuestionGroupByPage
     * @param questionGroupQueryRequest questionGroupQueryRequest
     * @returns BaseResponse_Page_QuestionGroup_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static listQuestionGroupByPageUsingPost(
        questionGroupQueryRequest: QuestionGroupQueryRequest,
    ): CancelablePromise<BaseResponse_Page_QuestionGroup_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/question_group/list/page',
            body: questionGroupQueryRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * updateQuestionGroup
     * @param questionGroupUpdateRequest questionGroupUpdateRequest
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static updateQuestionGroupUsingPost(
        questionGroupUpdateRequest: QuestionGroupUpdateRequest,
    ): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/question_group/update',
            body: questionGroupUpdateRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * updateQuestionGroupTime
     * @param questionGroupUpdateTimeRespquest questionGroupUpdateTimeRespquest
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static updateQuestionGroupTimeUsingPost(
        questionGroupUpdateTimeRespquest: QuestionGroupUpdateTimeRespquest,
    ): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/question_group/updateTime',
            body: questionGroupUpdateTimeRespquest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
}
