import React, { useState, useImperativeHandle } from 'react';
import { Button } from '@material-ui/core';

const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(ref, () => ({
    toggleVisibility,
  }));

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button type="submit" variant="outlined" size="small" color="primary" onClick={toggleVisibility}>{props.buttonLabel}</Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <Button type="submit" variant="outlined" size="small" color="primary" onClick={toggleVisibility}>cancel</Button>
      </div>
    </div>
  );
});

export default Togglable;
