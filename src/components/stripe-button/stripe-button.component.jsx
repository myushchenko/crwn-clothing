import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({ price }) => {
	const priceForStripe = price * 100;
	const publishableKey =
		'pk_test_51HBHSDKuCyBMO8txQdKsfDXyMtBf8YjeDO9zM2I1TffEsxGuqNa9LeDURmzxHfCUL9e0JzqPZdwhmb8ZKvW718G9006fCxTSZl';

	const onToken = (token) => {
		console.log(token);
		alert('Payment Successful');
	};

	return (
		<StripeCheckout
			label="Play Now"
			name="CRWN Clothing Ltd."
			billingAddress
			shippingAddress
			image="https://sendeyo.com/up/d/f3eb2117da"
			description={`Your total is ${price}`}
			amount={priceForStripe}
			panelLabel="Play Now"
			token={onToken}
			stripeKey={publishableKey}
		/>
	);
};
export default StripeCheckoutButton;
