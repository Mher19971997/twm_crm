import React, { useState, useRef, useEffect } from 'react';
import './LicensePlateInput.css';
import plate from 'assets/images/flag_plate.png';
import ArgonBox from 'components/ArgonBox';

const LicensePlateInput = ({ setLicensePlate }) => {
    const [segment1, setSegment1] = useState('');
    const [segment2, setSegment2] = useState('');
    const [segment3, setSegment3] = useState('');

    const input2Ref = useRef(null);
    const input3Ref = useRef(null);
    const input1Ref = useRef(null);

    // Handle changes for segment1 (numbers) with auto focus forward
    const handleSegment1Change = (e) => {
        const value = e.target.value.replace(/\D/g, ''); // Only digits
        setSegment1(value);
        if (value.length === 2) input2Ref.current.focus(); // Auto-focus on next input
    };

    // Handle changes for segment2 (letters) with auto focus forward
    const handleSegment2Change = (e) => {
        const value = e.target.value.replace(/[^A-Za-z]/g, '').toUpperCase(); // Only letters
        setSegment2(value);
        if (value.length === 2) input3Ref.current.focus(); // Auto-focus on next input
    };

    // Handle changes for segment3 (numbers)
    const handleSegment3Change = (e) => {
        const value = e.target.value.replace(/\D/g, ''); // Only digits
        setSegment3(value);
    };

    // Handle backspace navigation
    const handleKeyDown = (e, segment) => {
        if (e.key === 'Backspace') {
            if (segment === 'segment2' && !segment2) {
                input1Ref.current.focus(); // Go back to segment1 if segment2 is empty
            } else if (segment === 'segment3' && !segment3) {
                input2Ref.current.focus(); // Go back to segment2 if segment3 is empty
            }
        }
    };

    useEffect(() => {
        setLicensePlate(segment1 + segment2 + segment3)

    },[segment1,segment2,segment3])

    return (
        <ArgonBox className="license-plate-container">
            <ArgonBox className="license-plate">
                <ArgonBox className="license-plate-flag">
                    <img src={plate} alt="Flag" />
                </ArgonBox>
                <ArgonBox className="license-plate-number">
                    <input
                        type="text"
                        className="plate-input"
                        required
                        placeholder="00"
                        value={segment1}
                        onChange={handleSegment1Change}
                        maxLength="2"
                        ref={input1Ref}
                    />
                    <input
                        type="text"
                        className="plate-input"
                        placeholder="AA"
                        maxLength="2"
                        required
                        value={segment2}
                        onChange={handleSegment2Change}
                        ref={input2Ref}
                        onKeyDown={(e) => handleKeyDown(e, 'segment2')}
                    />
                    <input
                        type="text"
                        className="plate-input"
                        placeholder="000"
                        maxLength="3"
                        value={segment3}
                        required
                        ref={input3Ref}
                        onChange={handleSegment3Change}
                        onKeyDown={(e) => handleKeyDown(e, 'segment3')}
                    />
                </ArgonBox>
            </ArgonBox>
        </ArgonBox>
    );
};

export default LicensePlateInput;
