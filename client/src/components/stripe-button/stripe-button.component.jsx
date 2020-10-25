import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';

const StripeCheckoutButton = ({ price }) => {
	const priceForStripe = price * 100;
	const publishableKey =
		'pk_test_51HBHSDKuCyBMO8txQdKsfDXyMtBf8YjeDO9zM2I1TffEsxGuqNa9LeDURmzxHfCUL9e0JzqPZdwhmb8ZKvW718G9006fCxTSZl';

	const onToken = (token) => {
		console.log(token);
		axios({
			url: 'payment',
			method: 'post',
			data: {
				amount: priceForStripe,
				token
			}
		})
			.then((response) => {
				alert('Payment successful');
			})
			.catch((error) => {
				console.log('Payment error: ', error);
				alert(
					'There was an issue with your payment. Please sure you use the provided credit card.'
				);
			});
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
