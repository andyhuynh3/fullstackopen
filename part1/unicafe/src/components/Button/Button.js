import React from 'react';

const Button = ({ text, handleClick }) => (
	<div>
		<button onClick={handleClick}>{text}</button>
	</div>
);

export default Button;
