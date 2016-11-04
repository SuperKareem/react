import React from 'react';
import classes from './styles.css'
import classNamesBind from 'classnames/bind';
var classNames = classNamesBind.bind(classes);

export default class CircularProgress extends React.Component {
    static defaultProps ={
      radius: 50,
      percentage: 50,
      strokeWidth: 1
    }
    render() {
        const radius = this.props.radius - this.props.strokeWidth / 2;
        const width = this.props.radius * 2;
        const height = this.props.radius * 2;
        const viewBox = `0 0 ${width} ${height}`;
        const dashArray = radius * Math.PI * 2;
        const dashOffset = dashArray - dashArray * this.props.percentage / 100;
        let {color} = this.props
        return (
            <svg
                className={classNames("CircularProgress")}
                width={this.props.radius * 2}
                height={this.props.radius * 2}
                viewBox={viewBox}>
                <circle
                    className={classNames("CircularProgressBg")}
                    cx={this.props.radius}
                    cy={this.props.radius}
                    r={radius}
                    strokeWidth={`${this.props.strokeWidth}px`} />
                <circle
                    className={classNames("CircularProgressFg")}
                    cx={this.props.radius}
                    cy={this.props.radius}
                    r={radius}
                    strokeWidth={`${this.props.strokeWidth}px`}
                    style={{
                        stroke: color,
                        strokeDasharray: dashArray,
                        strokeDashoffset: dashOffset
                    }} />
                <text
                    className={classNames("CircularProgressText")}
                    x={this.props.radius}
                    y={this.props.radius}
                    dy=".4em"
                    textAnchor="middle">
                    {`${this.props.percentage}%`}
                </text>
            </svg>
        );
    }
}
