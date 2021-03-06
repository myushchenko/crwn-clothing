import { createSelector } from 'reselect';

const selectShop = (state) => state.shop;

export const selectColletions = createSelector([selectShop], (shop) => shop.collections);

export const selectColletionsForPreview = createSelector([selectColletions], (collections) =>
	collections ? Object.keys(collections).map((key) => collections[key]) : []
);

export const selectCollection = (collectionUrlParam) =>
	createSelector([selectColletions], (collections) =>
		collections ? collections[collectionUrlParam] : null
	);

export const selectIsCollectionFetching = createSelector([selectShop], (shop) => shop.isFetching);

export const selectIsCollectionLoaded = createSelector([selectShop], (shop) => !!shop.collections);
