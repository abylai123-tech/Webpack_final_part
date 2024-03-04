import React, { useState } from 'react';
import classes  from './App.module.scss';
import {Link, Outlet} from "react-router-dom";
import About from '@/pages/about/About';
import avatarPng from '@/assets/avatar.png';
import avatarJpg from '@/assets/avatar.jpg';
import Image from '@/assets/app-image.svg'

// TREE SHAKING
function TODO(a: number) {
    console.log('TODOFUNCTION');
}

export const App = () => {
    const [count, setCount] = useState<number>(0);

    const increment = () => setCount(prev => prev + 1)
    TODO(51235);

    if(__PLATFORM__ === 'desktop') {
        return <div>ISDESKTOPLATFORM</div>
    }

    if(__PLATFORM__ === 'mobile') {
        return <div>ISMOBILEPLATFORM</div>
    }

    if(__PLATFORM__ === 'development') {
        
    }

    return (
        <div>
            <h1>PLATFORM={__PLATFORM__}</h1>
            <div>   
                <img width={100} height={100} src={avatarPng} alt=""/>
                <img width={100} height={100} src={avatarJpg} alt=""/>
            </div>
            <div>
                <Image color={'red'} width={50} height={50} />
            </div>
            <Link to={'/about'}>about</Link>
            <br/>
            <Link to={'/shop'}>shop</Link>
            <h1 className={classes.value}>{count}</h1>
            <button className={classes.button} onClick={increment}><span>
                asdasd
            </span></button>
            <About/>
        </div>
    );
};