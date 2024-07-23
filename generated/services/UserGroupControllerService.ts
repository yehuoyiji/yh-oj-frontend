/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseResponse_boolean_ } from '../models/BaseResponse_boolean_';
import type { BaseResponse_List_UserGroup_ } from '../models/BaseResponse_List_UserGroup_';
import type { BaseResponse_long_ } from '../models/BaseResponse_long_';
import type { BaseResponse_Page_UserGroup_ } from '../models/BaseResponse_Page_UserGroup_';
import type { BaseResponse_UserGroupVO_ } from '../models/BaseResponse_UserGroupVO_';
import type { DeleteRequest } from '../models/DeleteRequest';
import type { UserGroupAddRequest } from '../models/UserGroupAddRequest';
import type { UserGroupQueryRequest } from '../models/UserGroupQueryRequest';
import type { UserGroupUpdateRequest } from '../models/UserGroupUpdateRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class UserGroupControllerService {
    /**
     * addUserGroup
     * @param userGroupAddRequest userGroupAddRequest
     * @returns BaseResponse_long_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static addUserGroupUsingPost1(
        userGroupAddRequest: UserGroupAddRequest,
    ): CancelablePromise<BaseResponse_long_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/user_group/add',
            body: userGroupAddRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * addUser
     * @param userGroupId
     * @param userIdList
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static addUserUsingPost1(
        userGroupId?: number,
        userIdList?: Array<number>,
    ): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/user_group/add_user',
            query: {
                'userGroupId': userGroupId,
                'userIdList': userIdList,
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
     * @param deleteRequest deleteRequest
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static deleteUserGroupUsingPost1(
        deleteRequest: DeleteRequest,
    ): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/user_group/delete',
            body: deleteRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * deleteUser
     * @param userGroupId
     * @param userIdList
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static deleteUserUsingPost1(
        userGroupId?: number,
        userIdList?: Array<number>,
    ): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/user_group/delete_user',
            query: {
                'userGroupId': userGroupId,
                'userIdList': userIdList,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * getUserGroupById
     * @param id id
     * @returns BaseResponse_UserGroupVO_ OK
     * @throws ApiError
     */
    public static getUserGroupByIdUsingGet(
        id?: number,
    ): CancelablePromise<BaseResponse_UserGroupVO_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/user_group/get',
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
     * getUserGroupCount
     * @returns BaseResponse_long_ OK
     * @throws ApiError
     */
    public static getUserGroupCountUsingGet(): CancelablePromise<BaseResponse_long_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/user_group/getCount',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * listUserGroupByPage
     * @param userGroupQueryRequest userGroupQueryRequest
     * @returns BaseResponse_Page_UserGroup_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static listUserGroupByPageUsingPost(
        userGroupQueryRequest: UserGroupQueryRequest,
    ): CancelablePromise<BaseResponse_Page_UserGroup_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/user_group/list/page',
            body: userGroupQueryRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * listUserGroupByUserId
     * @returns BaseResponse_List_UserGroup_ OK
     * @throws ApiError
     */
    public static listUserGroupByUserIdUsingGet(): CancelablePromise<BaseResponse_List_UserGroup_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/user_group/listUserGroupByUserId',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * updateUserGroup
     * @param userGroupUpdateRequest userGroupUpdateRequest
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static updateUserGroupUsingPost(
        userGroupUpdateRequest: UserGroupUpdateRequest,
    ): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/user_group/update',
            body: userGroupUpdateRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
}
