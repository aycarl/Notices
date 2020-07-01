import React from 'react';

import { Button } from "react-bootstrap";

import './custom-button.styles.scss';


const CustomButton = ({children, isGoogleSignIn, ...otherProps}) => (
    <Button className={`${isGoogleSignIn ? 'google-sign-in' : '' } custom-button`} {...otherProps}>
        {children}
    </Button>
);

export default CustomButton;