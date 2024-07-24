import React, { useState } from 'react';

const ColorConverter = () => {
    const [hex, setHex] = useState('');
    const [rgb, setRgb] = useState('');
    const [error, setError] = useState('');

    const hexToRgb = (hex) => {
        if (hex.length === 7 && /^#[0-9A-F]{6}$/i.test(hex)) {
            const bigint = parseInt(hex.slice(1), 16);
            const r = (bigint >> 16) & 255;
            const g = (bigint >> 8) & 255;
            const b = bigint & 255;
            return `rgb(${r}, ${g}, ${b})`;
        } else {
            throw new Error('Invalid HEX color');
        }
    };

    const handleChange = (e) => {
        const value = e.target.value;
        setHex(value);
        if (value.length === 7) {
            try {
                const rgbValue = hexToRgb(value);
                setRgb(rgbValue);
                setError('');
                document.body.style.backgroundColor = rgbValue;
            } catch (err) {
                setError(err.message);
                setRgb('');
                document.body.style.backgroundColor = '';
            }
        }
    };

    return (
        <div>
            <h1>HEX to RGB Converter</h1>
            <input
                type="text"
                value={hex}
                onChange={handleChange}
                placeholder="#000000"
                maxLength="7"
            />
            {rgb && <p>RGB: {rgb}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default ColorConverter;
