import LoginImg from '../../assets/images/pages/login.png'
import React, { useState } from 'react'
import { loginWithEmail } from '../../models/API/API';
// import useUser from '../../hooks/useUser';
import OtpModal from './OtpModal';
import ResetPasswordModal from './ResetPasswordModal';
const Login = (props) => {

    // const { get_user, set_user } = useUser();
    const [form, setForm] = React.useState({
        Email: "",
        Password: ""
    });
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    const handleClose = () => {
        setIsOpenPassword(false);
        setIsOpen(false)
        // setEditGameData()
      }

    const [open, setIsOpen] = useState(false);
    const [email, setEmail] = useState('');
  
    const [isOpenPassword, setIsOpenPassword] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        let res = await loginWithEmail(form)
        if (res) {
            // alert(JSON.stringify(res.EmailVerified) );
            res = res.UserData;
            if (res.EmailVerified == 0) {
                alert("An OTP code has been sent to your email");
                setEmail(res.Email)
                setIsOpen(true)
                return;

            }
            localStorage.setItem('level',res.Level)
            localStorage.setItem('login_data', res)
            localStorage.setItem('country',res.Country)
            localStorage.setItem('token-tilt', res.SessionTicket)
            window.location.replace('http://' + window.location.host + '/tilt/games')
        }
    }
    return (
        <div class="app-content content" style={{
            marginLeft: 0
        }}>
            <div class="content-overlay"></div>
            <div class="content-wrapper">
                <div class="content-header row">
                </div>
                <div class="content-body">
                    <section id="auth-login" class="row flexbox-container" style={{
                        justifyContent: "center"
                    }}>
                        <div class="col-xl-8 col-11">
                            <div class="card bg-authentication mb-0">
                                <div class="row m-0">
                                    <div class="col-md-6 col-12 px-0">
                                        <div class="card disable-rounded-right mb-0 p-2 h-100 d-flex justify-content-center">
                                            <div class="card-header pb-1">
                                                <div class="card-title">
                                                    <h4 class="text-center mb-2">Welcome Back</h4>
                                                </div>
                                            </div>
                                            <div class="card-body">
                                                {/* <div class="d-flex flex-md-row flex-column justify-content-around">
                                                    <a href="javascript:void(0);" class="btn btn-social btn-google btn-block font-small-3 mr-md-1 mb-md-0 mb-1">
                                                        <i class="bx bxl-google font-medium-3"></i><span class="pl-50 d-block text-center">Google</span></a>
                                                    <a href="javascript:void(0);" class="btn btn-social btn-block mt-0 btn-facebook font-small-3">
                                                        <i class="bx bxl-facebook-square font-medium-3"></i><span class="pl-50 d-block text-center">Facebook</span></a>
                                                </div> */}
                                                <div class="divider">
                                                    <div class="divider-text text-uppercase text-muted"><small>Login with
                                                        email</small>
                                                    </div>
                                                </div>

                                                <div class="form-group mb-50">
                                                    <label class="text-bold-600" for="exampleInputEmail1">Email address</label>
                                                    <input name="Email" onChange={handleChange} type="email" class="form-control" id="exampleInputEmail1" placeholder="Email address" /></div>
                                                <div class="form-group">
                                                    <label class="text-bold-600" for="exampleInputPassword1">Password</label>
                                                    <input name="Password" onChange={handleChange} type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" />
                                                </div>
                                                <div class="form-group d-flex flex-md-row flex-column justify-content-between align-items-center" >
                                                    
                                                    <div class="text-right" onClick={() => {
                                                            setIsOpenPassword(true)
                                                        }}><a   class="card-link"><small>Forgot Password?</small></a></div>
                                                </div>
                                                <button onClick={handleSubmit} class="btn btn-primary glow w-100 position-relative">Login<i id="icon-arrow" class="bx bx-right-arrow-alt"></i></button>

                                                <hr />
                                                <div class="text-center"><small class="mr-25">Don't have an account?</small><a  onClick={(e) => {
                    window.location.replace('http://' + window.location.host + '/tilt/register')
                  }}><small>Sign up</small></a></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-6 d-md-block d-none text-center align-self-center p-3">
                                        <img class="img-fluid" src={LoginImg} alt="branding logo" />
                                    </div>

                                </div>
                            </div>
                        </div>
                    </section>



                </div>
            </div>
            <OtpModal
          open={open}
          email={email}
          handleClose={handleClose}
        ></OtpModal>

        <ResetPasswordModal
          open={isOpenPassword}
          email={email}
          handleClose={handleClose}
        ></ResetPasswordModal>
        </div>
        
    )
};

export default Login;