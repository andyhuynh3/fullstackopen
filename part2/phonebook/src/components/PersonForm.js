import React from 'react';

const PersonForm = ({
	handleNameChange,
	name,
	handleNumberChange,
	nummber,
	handleAdd
}) => {
	return (
		<form>
			<div>
				name: <input onChange={handleNameChange} value={name} />
			</div>
			<div>
				number: <input onChange={handleNumberChange} value={nummber} />
			</div>
			<div>
				<button type='submit' onClick={handleAdd}>
					add
				</button>
			</div>
		</form>
	);
};

export default PersonForm;
