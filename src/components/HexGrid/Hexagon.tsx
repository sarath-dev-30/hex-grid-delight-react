
import React from 'react';
import { HexagonProps, getHexagonPath } from './utils';

const Hexagon: React.FC<HexagonProps> = ({
  coordinates,
  size,
  value,
  label,
  color = '#e3f2fd',
  onClick,
  onHover
}) => {
  const hexPath = getHexagonPath(size);
  
  const handleClick = () => {
    onClick?.(coordinates);
  };
  
  const handleMouseEnter = () => {
    onHover?.(coordinates);
  };

  return (
    <g
      className="hexagon-group cursor-pointer transition-all duration-200 hover:scale-105"
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
    >
      {/* Hexagon shape */}
      <polygon
        points={hexPath}
        fill={color}
        stroke="#ffffff"
        strokeWidth="2"
        className="hexagon-shape"
      />
      
      {/* Value text */}
      {value !== undefined && (
        <text
          x="0"
          y="0"
          textAnchor="middle"
          dominantBaseline="middle"
          className="text-sm font-semibold fill-gray-800 pointer-events-none"
        >
          {value}
        </text>
      )}
      
      {/* Label text */}
      {label && (
        <text
          x="0"
          y={value !== undefined ? "12" : "0"}
          textAnchor="middle"
          dominantBaseline="middle"
          className="text-xs fill-gray-600 pointer-events-none"
        >
          {label}
        </text>
      )}
    </g>
  );
};

export default Hexagon;
