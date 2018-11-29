import * as React from 'react';

interface RangeIconState {
    isHovered: boolean;
}

interface RangeIconProps {
    type: 'plus' | 'minus';
}

type RangeIconBackgroundCode = '#0067C5' | '#005B82';

export default class RangeIcon extends React.Component<RangeIconProps, RangeIconState> {
    constructor(props: RangeIconProps) {
        super(props);

        this.state = {
            isHovered: false
        };

        this.onMouseEnterHandler = this.onMouseEnterHandler.bind(this);
        this.onMouseLeaveHandler = this.onMouseLeaveHandler.bind(this);
        this.renderBackground = this.renderBackground.bind(this);
    }

    onMouseEnterHandler() {
        this.setState({
            isHovered: true
        });
    }

    onMouseLeaveHandler() {
        this.setState({
            isHovered: false
        });
    }

    renderPlusIcon() {
        return (
            <path
                d="M18.2616283,12.5217391 L12.5222595,12.5217391 L12.5222595,18.2608696 C12.5222595,18.5488696 12.2874672,18.7826087 12.0004988,18.7826087 C11.7124868,18.7826087 11.478738,18.5488696 11.478738,18.2608696 L11.478738,12.5217391 L5.73936926,12.5217391 C5.4513573,12.5206957 5.21656494,12.288 5.21760846,12 C5.21760846,11.7130435 5.4513573,11.4782609 5.73936926,11.4782609 L11.478738,11.4782609 L11.478738,5.73913043 C11.478738,5.45113043 11.7124868,5.2173913 12.0004988,5.2173913 C12.2874672,5.2173913 12.5222595,5.45113043 12.5222595,5.73913043 L12.5222595,11.4782609 L18.2616283,11.4782609 C18.5485967,11.4782609 18.7844326,11.712 18.783389,12 C18.783389,12.288 18.5496402,12.5217391 18.2616283,12.5217391 Z"
                id="Inner"
                fill="#FFFFFF"
            />
        );
    }

    renderMinusIcon() {
        return (
            <path
                d="M18.2616283,12.5217391 L5.73936926,12.5217391 C5.4513573,12.5206957 5.21656494,12.288 5.21760846,12 C5.21760846,11.7130435 5.4513573,11.4782609 5.73936926,11.4782609 L18.2616283,11.4782609 C18.5485967,11.4782609 18.7844326,11.712 18.783389,12 C18.783389,12.288 18.5496402,12.5217391 18.2616283,12.5217391 Z"
                id="Inner"
                fill="#FFFFFF"
            />
        );
    }

    renderBackground(background: RangeIconBackgroundCode) {
        return (
            <path
                d="M20.1468152,3.884 C17.9787252,1.707 15.0946055,0.506 11.999477,0.5 C5.67021422,0.5 0.512000078,5.648 0.49999958,11.977 C0.493999331,15.049 1.68404874,17.939 3.85213875,20.116 C6.02022876,22.292 8.90534853,23.494 11.9784761,23.5 L12.000477,23.5 C18.3287398,23.5 23.4879539,18.351 23.4999544,12.021 C23.5059547,8.95 22.3149052,6.06 20.1468152,3.884 Z"
                id="Background"
                fill={background}
            />
        );
    }

    render() {
        const { type } = this.props;
        const { isHovered } = this.state;

        const background = isHovered ? '#005B82' : '#0067C5';
        const icon = type === 'minus' ? this.renderMinusIcon() : this.renderPlusIcon();

        return (
            <svg
                width="24px"
                height="24px"
                viewBox="0 0 24 24"
                className="rangeIcon"
                onMouseEnter={this.onMouseEnterHandler}
                onMouseLeave={this.onMouseLeaveHandler}>
                <g id="Icons/subtract/default" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                    {this.renderBackground(background)}
                    {icon}
                </g>
            </svg>
        );
    }
}
