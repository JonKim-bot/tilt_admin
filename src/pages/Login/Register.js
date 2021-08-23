import React, { useState } from 'react'
import { RegisterAccount } from '../../models/API/API';
// import useUser from '../../hooks/useUser';
import RegisterImg from '../../assets/images/pages/register.png'

import OtpModal from './OtpModal';

const Register = (props) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleClose = ()=>{
          
      setIsOpen(false);
      // setEditGameData()
  
  }
    // const { get_user, set_user } = useUser();
    const [form, setForm] = React.useState({
        Email: "",
        Password: ""
    });
    const [email, setEmail] = useState('');

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        let res = await RegisterAccount(form)
        if(res){
          alert("An OTP code has been sent to your email");
          setEmail(form.Email)
          setIsOpen(true)

          // window.location.replace('http://' + window.location.host + '/login')
        }
    }
    return (
        <div class="app-content content" style={{
            marginLeft: 0
        }}>
                <div className="content-overlay" />
                <div className="content-wrapper">
                <div className="content-header row">
                </div>
                <div className="content-body">
                    {/* register section starts */}
                    <section id="auth-login" class="row flexbox-container" style={{
                        justifyContent: "center"
                    }}>                    <div className="col-xl-8 col-10">
                        <div className="card bg-authentication mb-0">
                        <div className="row m-0">
                            {/* register section left */}
                            <div className="col-md-6 col-12 px-0">
                            <div className="card disable-rounded-right mb-0 p-2 h-100 d-flex justify-content-center">
                                <div className="card-header pb-1">
                                <div className="card-title">
                                    <h4 className="text-center mb-2">Sign Up</h4>
                                </div>
                                </div>
                                <div className="text-center">
                                <p> <small> Please enter your details to sign up and be part of our great community</small>
                                </p>
                                </div>
                                <div className="card-body">
                                <form action="index.html">
                                
                                    <div className="form-group mb-50">
                                    <label className="text-bold-600" htmlFor="exampleInputEmail1">Email address</label>
                                    <input type="text" placeholder="Email Address" name="Email" onChange={handleChange} className="form-control" />
</div>
<div className="form-group mb-50">
                                    <label className="text-bold-600" htmlFor="exampleInputEmail1">Clan</label>
                                    <input type="text" placeholder="Clan " name="Clan" onChange={handleChange} className="form-control" />
</div>
                                    <div className="form-group mb-2">
                                    <label className="text-bold-600" htmlFor="exampleInputPassword1">Password</label>
                                    <input type="password" placeholder="Password" name="Password" onChange={handleChange} className="form-control" />
                                    </div>
                                    <div class="form-group d-flex flex-md-row flex-column justify-content-between align-items-center" >
                                                    
                                        <div class="text-right" onClick={() => {
                                                 setIsOpen(true)
                                            }}><a   class="card-link"><small>Verify OTP</small></a></div>
                                    </div>
                                    <button onClick={handleSubmit} className="btn btn-primary glow position-relative w-100">SIGN UP<i id="icon-arrow" className="bx bx-right-arrow-alt" /></button>
                                </form>
                                <hr />
                                <div className="text-center"><small className="mr-25">Already have an account?</small><a  onClick={(e) => {
                    window.location.replace('http://' + window.location.host + '/tilt_admin/login')
                  }}><small>Sign in</small> </a></div>
                                </div>
                            </div>
                            </div>
                            {/* image section right */}
                            <div className="col-md-6 d-md-block d-none text-center align-self-center p-3">
                            <img class="img-fluid" src={RegisterImg} alt="branding logo" />
                            </div>
                        </div>
                        </div>
                    </div>
                    </section>
                    {/* register section endss */}
                </div>
                </div>
                <OtpModal
          open={isOpen}
          email={form.Email}
          handleClose={handleClose}
        ></OtpModal>

            </div>
            
    )
};

export default Register;