// src/components/ColonDiagram.jsx
import './ColonDiagram.css';

const regions = [
    { id: 'ascending', label: 'Ascending Colon', x: 120, y: 210, labelX: -10, labelY: 210, path: 'M120,280 L120,150' },
    { id: 'hepatic', label: 'Hepatic Flexure', x: 120, y: 100, labelX: 40, labelY: 68, path: 'M120,120 Q120,90 155,90' },
    { id: 'transverse', label: 'Transverse Colon', x: 270, y: 90, labelX: 220, labelY: 55, path: 'M175,90 L325,90' },
    { id: 'splenic', label: 'Splenic Flexure', x: 420, y: 100, labelX: 370, labelY: 60, path: 'M345,90 Q420,90 420,120' },
    { id: 'descending', label: 'Descending Colon', x: 420, y: 210, labelX: 430, labelY: 210, path: 'M420,140 L420,280' },
    { id: 'sigmoid', label: 'Sigmoid Colon', x: 360, y: 350, labelX: 370, labelY: 375, path: 'M420,300 Q420,345 375,352 L310,355' },
    { id: 'rectum', label: 'Rectum', x: 240, y: 365, labelX: 218, labelY: 392, path: 'M295,357 L250,363' },
];

const ColonDiagram = () => {
    return (
        <div className="colon-diagram">
            <svg viewBox="0 0 480 420" className="colon-diagram-svg" aria-labelledby="colon-diagram-title">
                <title id="colon-diagram-title">Diagram of the colon and its regions</title>

                {/* Base outline of the full colon shape, always faintly visible */}
                <path
                    d="M120,300 L120,130 Q120,90 160,90 L340,90 Q420,90 420,130 L420,300 Q420,340 380,350 L240,365"
                    className="colon-base-path"
                    fill="none"
                />

                {regions.map((region) => (
                    <g key={region.id} className="colon-region" tabIndex={0}>
                        <path d={region.path} className="colon-region-path" fill="none" />
                        <circle cx={region.x} cy={region.y} r="6" className="colon-region-dot" />
                        <text x={region.labelX} y={region.labelY} className="colon-region-label">
                            {region.label}
                        </text>
                    </g>
                ))}
            </svg>
            <p className="colon-diagram-caption">Hover or tap a section to explore the colon's path</p>
        </div>
    );
};

export default ColonDiagram;