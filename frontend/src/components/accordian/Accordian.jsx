import React, { useState } from 'react';
import { IoAdd } from "react-icons/io5";


const Accordian = ({title, summary}) => {
    const [expanded, setExpanded] = useState(false);

    const handleExpansion = () => {
        setExpanded((prev) => !prev);
    }
    return (
        <div className='accordian-master-container'>
            <div className="title" onClick={handleExpansion}>
                <div id="icon" 
                    style={
                        {
                            'transform' : expanded? 'rotate(45deg)' : 'rotate(0deg)',
                            'transition' : 'transform 0.3s ease-out'
                        }
                    }
                ><IoAdd /></div>
                <p>{title}</p>
            </div>
            <div className="summary"
                style={{
                    maxHeight: expanded && summary ? '200px' : '0', // or any max height that fits the content
                    overflow: 'hidden',
                    transition: 'max-height 0.3s ease-in-out',
                }}        >
                <p>{summary}</p>
            </div>
        </div>
    )
}

export default Accordian