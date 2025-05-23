
import React from 'react';
import Hexagon from './Hexagon';
import { HexCoordinates, hexToPixel, HexagonProps } from './utils';

interface HexGridProps {
  hexagons: Omit<HexagonProps, 'size'>[];
  hexSize?: number;
  width?: number;
  height?: number;
  className?: string;
}

const HexGrid: React.FC<HexGridProps> = ({
  hexagons,
  hexSize = 30,
  width = 800,
  height = 600,
  className = ""
}) => {
  // Calculate the center offset to center the grid
  const centerX = width / 2;
  const centerY = height / 2;

  return (
    <div className={`hex-grid-container ${className}`}>
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        className="border border-gray-200 rounded-lg bg-white"
      >
        <g transform={`translate(${centerX}, ${centerY})`}>
          {hexagons.map((hexProps, index) => {
            const pixelCoords = hexToPixel(hexProps.coordinates, hexSize);
            
            return (
              <g
                key={`hex-${hexProps.coordinates.q}-${hexProps.coordinates.r}`}
                transform={`translate(${pixelCoords.x}, ${pixelCoords.y})`}
              >
                <Hexagon
                  {...hexProps}
                  size={hexSize}
                />
              </g>
            );
          })}
        </g>
      </svg>
    </div>
  );
};

export default HexGrid;
