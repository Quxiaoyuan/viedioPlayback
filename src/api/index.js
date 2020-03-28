import { $post, $get } from '../axios';

export default {
    login(params) {
        
        return $post('/user/userLogin', params);
    },
    register(params) {
        return $post('/user/register', params);
    },
    /**
     * 
     * @param {objectId} params 
     * @param {userName} params 
     * @param {introduction} params 
     * @param {address} params 
     * @param {age} params 
     * @param {educational} params 
     */
    updateUserInfo(params) {
        return $post('/user/updateInfo', params);
    },
    /**
     * 
     * @param {objectId} params 
     */
    queryUserInfo(params) {
        return $post('/user/getUser', params);
    },
    /**
     * @param {headFile} params 
     * @param {email} params
     */
    updateUserHead(params) {
        return $post('/user/updateUserHeader', params);
    },
    /**
     * @param {objectId} params 
     * @param {password} params
     */
    updateUserPassword(params) {
        return $post('/user/updateUserPassword', params);
    },
    /**
     * 首页
     */
    dynamicList(params) {
        return $get('/dynamic/dynamicOut', params);
    },
    /**
     * 发表动态
     * @param {viedo} params 
     * @param {sendId} params 
     * @param {title} params 
     * @param {description} params 
     */
    dynamicPost(params) {
        debugger
        return $post('/dynamic/saveDynamic', params);
    },
    /**
     * 我关注的
     * @param {objectId} params 
     */
    myAttention(params) {
        return $post('/dynamic/myAttentionDynamic', params);
    },
    /**
     * 我发表的
     * @param {objectId} params 
     */
    myPost(params) {
        return $post('/dynamic/myDynamic', params);
    },
    /**
     * 关注他人
     * @param {userId} params 
     * @param {attentionId} params
     */
    attentionOther(params) {
        return $post('/user/addRelation', params);
    },
    /**
     * 我的关注列表
     * @param {userId} params
     */
    myAttentionList(params) {
        return $post('/user/relationOut', params);
    },
    /**
     * 取消关注
     * @param {objectId} params
     */
    cancelAttention(params) {
        return $post('/user/deleteRelation', params);
    },
    /**
     * 我的收藏
     * @param {userId} params
     */
    myFavorite(params) {
        return $post('/user/myFavoriteDynainc', params);
    },
    /**
     * 取消收藏
     * @param {objectId} params
     */
    cancelFavorite(params) {
        return $post('/user/deleteFavDy', params);
    },
    /**
     * 添加收藏
     * @param {objectId} params
     */
    addFavorite(params) {
        return $post('/user/addFav', params);
    },
    /**
     * 输出评论
     * @param {dyId} params
     */
    commentInput(params) {
        return $post('/comment/commentOut', params);
    },
    /**
     * 添加评论（对动态）
     * @param {objectId} params
     */
    addcommentDynamic(params) {
        return $post('/comment/addComment', params);
    },
    /**
     * 添加评论（对评论）
     * @param {objectId} params
     */
    addcomment(params) {
        return $post('/comment/addCommentForCom', params);
    }
}