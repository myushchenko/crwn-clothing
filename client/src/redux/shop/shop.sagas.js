import { takeLatest, all, call, put } from 'redux-saga/effects';

import ShopActionTypes from './shop.types';
import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';
import { fetchCollectionsSuccess, fetchCollectionsFailure } from './shop.actions';

export function* fetchCollectionsAsync() {
	try {
		const collectionRefs = firestore.collection('collections');
		const snapShot = yield collectionRefs.get();
		const collectionsMap = yield call(convertCollectionsSnapshotToMap, snapShot);

		yield put(fetchCollectionsSuccess(collectionsMap));
	} catch (error) {
		yield put(fetchCollectionsFailure(error.message));
	}
}

export function* fetchCollectionsStart() {
	yield takeLatest(ShopActionTypes.FETCH_COLLECTIONS_START, fetchCollectionsAsync);
}

export function* shopSagas() {
	yield all([call(fetchCollectionsStart)]);
}
