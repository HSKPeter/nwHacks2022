export const FETCH_items_BEGIN = 'FETCH_items_BEGIN';
export const FETCH_items_SUCCESS = 'FETCH_items_SUCCESS';
export const FETCH_items_FAILURE = 'FETCH_items_FAILURE';

export const loadDataBegin = () => ({
    type: FETCH_items_BEGIN
});

export const loadDataSuccess = items => ({
    type: FETCH_items_SUCCESS,
    payload: { items }
});

export const loadDataFailure = error => ({
    type: FETCH_items_FAILURE,
    payload: { error }
});

export function loadData() {
    return dispatch => {
        dispatch(loadDataBegin());
        return fetch("http://localhost:8080/items-found")
            .then(handleErrors)
            .then(res => res.json())
            .then(json => {
                console.log(json)
                dispatch(loadDataSuccess(json.data));
                return json.items;
            })
            .catch(error => dispatch(loadDataFailure(error)));
    };
}


function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}