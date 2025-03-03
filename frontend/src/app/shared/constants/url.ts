const BASE_URL = 'http://localhost:3000'

export const FOOD_URL = BASE_URL + '/api/foods';
export const FOOD_TAGS_URL = FOOD_URL + '/tags';
export const FOOD_BY_SEARCH_URL = FOOD_URL + '/search/';
export const FOODS_BY_TAG_URL = FOOD_URL + '/tag/';
export const FOOD_BY_ID_URL = FOOD_URL + '/';

export const ADMIN_URL = BASE_URL + '/api/admin'
export const ADMIN_ADD_FOOD_TO_LIST_URL = ADMIN_URL + '/addDish'
export const ADMIN_EDIT_USER_DATA = ADMIN_URL + '/editDataUser/'
export const ADMIN_DELETE_FOOD_URL = ADMIN_URL + '/deleteFood/'
export const ADMIN_EDIT_FOOD_DATA_URL = ADMIN_URL + '/editFoodData/'
export const ADMIN_DELETE_USER_URL = ADMIN_URL + '/deleteUserData/'

export const USER_URL = BASE_URL + '/api/users'
export const USER_LOGIN_URL = USER_URL + '/login'
export const USER_REGISTER_URL = USER_URL + '/register'
export const USER_GET_ALL_URL = USER_URL + '/getAll'
export const USER_BY_ID_URL = USER_URL + '/getUserById/';
export const USER_BY_SEARCH_URL = USER_URL + '/searchUsers/';

export const ORDER_URL = BASE_URL + '/api/order'
export const ORDER_CREATE_URL = ORDER_URL + "/createOrder"
export const ORDER_GET_ALL_URL = ORDER_URL + "/getAllOrdersForUser/"
export const ORDER_FOR_USER_URL = ORDER_URL + "/orderForUser/"
export const ORDER_UPDATE_URL = ORDER_URL + "/updateDataOfOrder/"