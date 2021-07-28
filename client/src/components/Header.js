import React from 'react';
import {Link} from 'react-router-dom';

import GoogleAuth from './GoogleAuth';

class Header extends React.Component{
    render(){
        return (
            <ul className="nav-bar">
                <li><Link to="/"><span>Streamy</span></Link></li>
                <li><Link to="/">All strems</Link></li>
                <li className="auth"><GoogleAuth /></li>

            </ul>
        );
    }
}

export default Header;