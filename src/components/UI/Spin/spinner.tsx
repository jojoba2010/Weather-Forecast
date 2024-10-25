import React from 'react';

interface IProps {
    fillColor?: string;
    size?: number
    width?: string | number
}

const spinner= (props: IProps) => {
    const {fillColor,size,width}=props
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={width}
            height="100%"
            version="1"
            viewBox="0 0 128 32"
        >
            <circle r={size} fill={fillColor} transform="translate(16 16)">
                <animateTransform
                    additive="sum"
                    attributeName="transform"
                    dur="1200ms"
                    repeatCount="indefinite"
                    type="scale"
                    values="1;1.42;1;1;1;1;1;1;1;1"
                ></animateTransform>
            </circle>
            <circle r={size} fill={fillColor} transform="translate(64 16)">
                <animateTransform
                    additive="sum"
                    attributeName="transform"
                    dur="1200ms"
                    repeatCount="indefinite"
                    type="scale"
                    values="1;1;1;1;1.42;1;1;1;1;1"
                ></animateTransform>
            </circle>
            <circle r={size} fill={fillColor} transform="translate(112 16)">
                <animateTransform
                    additive="sum"
                    attributeName="transform"
                    dur="1200ms"
                    repeatCount="indefinite"
                    type="scale"
                    values="1;1;1;1;1;1;1;1.42;1;1"
                ></animateTransform>
            </circle>
        </svg>
    );
};

export default spinner;
