import React, { Component } from 'react';

const CustomPinnedRowRenderer = props => {
        return <span style={props.style}>{props.value}</span>;
}

export default CustomPinnedRowRenderer