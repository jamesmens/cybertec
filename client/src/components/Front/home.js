import React from "react";




const Home=()=>{

    return(
        <div className="mainLayout" style={{minHeight:`${window.innerHeight}px`}}>
        
        <div className="maintop">
            <div className="navbar">
            <div className="navcontainer">
                <span className="sitename">
                    <p>TheLog</p>
                </span>

            </div>
            <div className="navcontainer">
                <span className="navspan">
                   Join Now
                </span>
            </div>

            </div>
            <div className="homeContent" 
            style={{backgroundImage:
            `url('https://cdn.pixabay.com/photo/2018/04/16/05/32/technology-3323683_1280.jpg')`}}>
                <div className="hcontent_l">
                    <p>Hi there, Join the Content sharing Revolution Powered By Secure access</p>
                    <div className="hcontent_l_intro">
                        <span>
                        Introducing the dawn of a revolutionary 
                    era in content sharing! Unlock the power of secure 
                    access and embark on a journey that will redefine 
                    the way you connect, collaborate, and explore. Join 
                    our vibrant community and be part of a digital revolution that ensures your privacy and protection are paramount. With cutting-edge technology and a seamless user experience, our platform invites you to discover a world where sharing knowledge, creativity, and ideas knows no boundaries. It's time to elevate your content sharing game and embrace the future. 
                    Register now and experience the thrill of secure access like never before!
                        </span>
                        <span className="membershipbtn">Join Our membership</span>
                   
                    </div>

                </div>
                <div  className="hcontent_r">
                    <div className="lform">

                    </div>
                    <div className="rform">
                        <p>Share</p>
                        <span className="uploadicon">Upload</span>
                        <div className="uploadspace">
                            <span>Choose a file</span>
                            <span>*Required </span>
                        </div>
                        <div>
                            <span>20% progress     pause</span>
                            <div><span></span></div>
                        </div>

                    </div>

                </div>

               

            </div>
          
            

        </div>
        <div className="footer">
            <p>Powered By Cybertec Inc<span style={{color:"green"}}> @ </span> 2023</p>
            

        </div>

        </div>
       
       
    )
}


export default Home