import React, { useEffect, useState } from 'react';
import './WorkShop.css';

const WorkShop = () => {
    const [workshop, setWorkshop] = useState([]);
    useEffect(() => {
        fetch('https://computer-club-team.herokuapp.com/events')
            .then(res => res.json())
            .then(data => {
                const workshop = data.filter(dt => dt.eventType === 'WorkShop')
                setWorkshop(workshop);
            })
    }, [])

    return (
        <div className='workshop-container text-light px-5'>
            <h1 className='my-4 workshop-heading'>Workshop</h1>
            <h4>RCC arrange 3 major <span className='text-warning'>Workshop</span> in every year.</h4>
            <ul>
                <li><h6>International Mother Language Day Programming Workshop</h6></li>
                <li><h6>RMSTU CSE Day Programming Contest</h6></li>
                <li><h6>Victory Day Programming Contest</h6></li>
            </ul>

        </div>
    );
};

export default WorkShop;