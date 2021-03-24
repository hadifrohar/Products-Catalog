import {ActionTypes} from "./actions";
import {ToastAndroid} from "react-native";


export const catalog = (state = {isLoading: false, allData: [], data: [], page: 0}, action) => {
    switch(action.type) {
        case ActionTypes.FETCH_CATALOG_SUCCESS:
            return {isLoading: false, data: state.allData.concat(action.data), allData: state.allData.concat(action.data), page: state.page+1};

        case ActionTypes.FETCH_CATALOG_LOADING:
            return {...state, isLoading: true};

        case ActionTypes.FETCH_CATALOG_FAILED:
            return {...state, isLoading: false};

        case ActionTypes.PRODUCT_SEARCH:
            return {...state, isLoading: state.isLoading,
                data: state.allData.filter(obj => obj.name.toLowerCase().includes(action.text.toLowerCase( )))};

        default:
            return state;
    }
}

export const product = (state = {isLoading: false, data: []}, action) => {
    switch (action.type) {
        case ActionTypes.FETCH_PRODUCT_SUCCESS:
            return {isLoading: false, data: action.data};
        case ActionTypes.FETCH_PRODUCT_LOADING:
            return {...state, isLoading: true};
        case ActionTypes.FETCH_PRODUCT_FAILED:
            return {...state, isLoading: false};

        default:
            return state;
    }
}
