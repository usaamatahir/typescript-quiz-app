import React from 'react';
import EmailIcon from '@material-ui/icons/Email';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import GitHubIcon from '@material-ui/icons/GitHub';


const Footer = () => {
    return (
        <div className='footer'>
            <h2>Developer : Usama Tahir</h2>
            <div className='social'>
                <EmailIcon />
                <label>usamatahir8330@gmail.com</label>
            </div>
            <div className='social'>
                <a href='https://www.linkedin.com/in/usamatahir0/'><LinkedInIcon /></a>
                <a href='https://github.com/usaamatahir'><GitHubIcon /></a>
            </div>
        </div>
    )
}

export default Footer
