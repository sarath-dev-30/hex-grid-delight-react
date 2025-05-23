
import React, { useState } from 'react';
import { HexGrid } from '../components/HexGrid';
import { HexCoordinates, generateHexSpiral, interpolateColor } from '../components/HexGrid/utils';
import { Button } from '../components/ui/button';

const Index = () => {
  const [selectedHex, setSelectedHex] = useState<HexCoordinates | null>(null);
  const [hoveredHex, setHoveredHex] = useState<HexCoordinates | null>(null);

  // Generate sample data
  const generateSampleData = () => {
    const coordinates = generateHexSpiral(4);
    const maxValue = 100;
    const minValue = 0;
    
    return coordinates.map((coord) => {
      const value = Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
      const color = interpolateColor(value, minValue, maxValue, '#e3f2fd', '#1976d2');
      
      return {
        coordinates: coord,
        value,
        label: `${coord.q},${coord.r}`,
        color,
        onClick: (coords: HexCoordinates) => setSelectedHex(coords),
        onHover: (coords: HexCoordinates) => setHoveredHex(coords),
      };
    });
  };

  const [hexData, setHexData] = useState(generateSampleData());

  const refreshData = () => {
    setHexData(generateSampleData());
    setSelectedHex(null);
    setHoveredHex(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 text-gray-800">
            Hexagonal Data Visualization
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            Interactive hexagonal grid built with custom React components
          </p>
          <Button onClick={refreshData} className="mb-6">
            Generate New Data
          </Button>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main hexagonal grid */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                Data Grid
              </h2>
              <HexGrid
                hexagons={hexData}
                hexSize={25}
                width={700}
                height={500}
                className="mx-auto"
              />
            </div>
          </div>

          {/* Info panel */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">
                Information
              </h3>
              
              {selectedHex && (
                <div className="mb-4 p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">Selected Cell</h4>
                  <p className="text-sm text-blue-700">
                    Coordinates: ({selectedHex.q}, {selectedHex.r})
                  </p>
                  <p className="text-sm text-blue-700">
                    Value: {hexData.find(h => h.coordinates.q === selectedHex.q && h.coordinates.r === selectedHex.r)?.value}
                  </p>
                </div>
              )}

              {hoveredHex && (
                <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2">Hovered Cell</h4>
                  <p className="text-sm text-gray-600">
                    Coordinates: ({hoveredHex.q}, {hoveredHex.r})
                  </p>
                  <p className="text-sm text-gray-600">
                    Value: {hexData.find(h => h.coordinates.q === hoveredHex.q && h.coordinates.r === hoveredHex.r)?.value}
                  </p>
                </div>
              )}

              <div className="mb-4">
                <h4 className="font-semibold text-gray-800 mb-2">Legend</h4>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-blue-200 rounded"></div>
                    <span className="text-sm text-gray-600">Low values (0-25)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-blue-400 rounded"></div>
                    <span className="text-sm text-gray-600">Medium values (26-75)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-blue-700 rounded"></div>
                    <span className="text-sm text-gray-600">High values (76-100)</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Features</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Click hexagons to select</li>
                  <li>• Hover for quick info</li>
                  <li>• Color-coded by value</li>
                  <li>• Responsive SVG rendering</li>
                  <li>• No external dependencies</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
