import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {
	selectIsCollectionFetching,
	selectColletionsForPreview
} from '../../redux/shop/shop.selectors';
import CollectionsOverview from './collections-overview.component';
import WithSpinner from '../../components/with-spinner/with-spinner.component';

const mapStateToProps = createStructuredSelector({
	isLoading: selectIsCollectionFetching,
	collections: selectColletionsForPreview
});

const CollectionsOverviewContainer = compose(
	connect(mapStateToProps),
	WithSpinner
)(CollectionsOverview);

export default CollectionsOverviewContainer;
