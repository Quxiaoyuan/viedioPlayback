import { $post } from '../axios';

export default {
    login(params) {
        return $post('/user/userLogin', params);
    },
    register(params) {
        return $post('/user/register', params);
    }
}