import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "../utilities/reducer"

const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);

store.subscribe(() => {
  console.log(store.getState());
});

export default store;
//   {
//     "data": [
//         {
//             "found_items_id": 1,
//             "name": "wallet",
//             "date": "2021-01-04 00:12:59",
//             "lat": null,
//             "lon": null,
//             "transport": "99",
//             "photo_url": "https://na.cx/SA2nh5jd"
//         },
//         {
//             "found_items_id": 2,
//             "name": "bottle",
//             "date": "2021-01-04 17:15:01",
//             "lat": null,
//             "lon": null,
//             "transport": "49",
//             "photo_url": "https://www.google.com/sndskfD54E"
//         },
//         {
//             "found_items_id": 3,
//             "name": "bottle",
//             "date": "2022-01-16 02:59:47",
//             "lat": 49.26073,
//             "lon": -123.24598,
//             "transport": null,
//             "photo_url": "www.dsjghdsj.com/sehgHUUGu"
//         },
//         {
//             "found_items_id": 4,
//             "name": "wallet",
//             "date": "2022-01-16 03:06:26",
//             "lat": null,
//             "lon": null,
//             "transport": "49",
//             "photo_url": "http://www.google.com/JHSJnewj28"
//         }
//     ]
// }