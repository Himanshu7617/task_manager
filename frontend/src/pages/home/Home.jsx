import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import {useNavigate} from 'react-router-dom';
import Cookies from 'js-cookie'

//importing images
import heroIMG from '../../../assets/images/hero.png'
import aboutLeft from '../../../assets/images/imgLeft.png'
import aboutRight from '../../../assets/images/imgRight.png'

//importing accordian
import Accordian from '../../components/accordian/Accordian';
import faqs from '../../../assets/text/faq';


const Home = () => {

    const navigate = useNavigate();

    //checking for access token in the cookies 
    useEffect(()=>{
        const token = Cookies.get('access_token');
        if(token){
            navigate('/dashboard', {replace: true});
        }

    },[navigate])

    return (
        <div className='master-home-container'>
            {/*Desiging the header */}

            <section className='hero-container'>
                <header className='header-container'>
                    <h1>TeamFlow</h1>
                    <div className="tagline-container">
                        <p>Where teams Sync and Succeed</p>
                        <Button variant="contained" size="large" onClick={()=>{navigate("/signup")}}>
                            Get Started
                        </Button>
                    </div>
                </header>

                <div className="hero-img-container">
                    <img src={heroIMG} alt="organizing tasks image" />
                </div>

            </section>

            {/*Designin the about us section */}

            <section className='aboutus-container'>
                <div className="content-container">
                    <div className="wrap-content1">
                        <div className="img1">
                            <img src={aboutLeft} alt="organizing tasks" />
                        </div>
                        <div className="content1">
                            <h2>Track Project Progres in Real Time</h2>
                            <p>With real-time updates, you'll always know where your project stands and what needs attention to keep it moving forward.</p>
                        </div>

                    </div>
                    <div className="wrap-content2">
                        <div className="content2">
                            <h2>Task Assignment and Management</h2>
                            <p>Assing tasks to specific team members with clear deadlines and priorties. Team members can view their responsibilities, mark tasks as complete, and keep the whole team updated on their progress.</p>
                        </div>

                        <div className="img2">
                            <img src={aboutRight} alt="checking list" />
                        </div>
                    </div>
                </div>
            </section>

            {/*Designing the FAQ container*/}

            <section className='faq-container'>
                <h3>FAQ</h3>
                <div className="questions">
                    {faqs && faqs.map((item, i) => {
                        return <Accordian title={item.ques} summary={item.ans} key={i}></Accordian>
                    })}
                </div>
            </section>

            {/*Designin the footer section */}
            <footer className='footer-container'>
                <h2>Stay on Track Together</h2>
                <Button variant="contained" size="large" onClick={()=>{navigate("/signup")}}>
                    Get Started
                </Button>
            </footer>
        </div>
    )
}

export default Home