import React from 'react';

const Alert = ({ alert }) => {
	if (alert === null) {
		return <></>;
	}
	return <div className={alert.className}>{alert.message}</div>;
};

export default Alert;
