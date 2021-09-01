import React , { useState ,useEffect} from 'react'
// @material-ui/core components
// core components
import { ResetPassword } from '../../models/API/API';

import { ResendOTP } from '../../models/API/API';

export default function ResetPasswordModal(props) {

    const [form, setForm] = useState(props.formData)

    const handleChange = (e)=>{
        setForm({
            ...form,
            [e.target.name]:e.target.value
        })
    }
    
    const [open, setIsOpen] = useState(false);
    const [email, setEmail] = useState('');
    const handleSubmit = async (e) => {
      e.preventDefault();
      let res = await ResetPassword(form)
      if (res) {
        alert("Reset Password success");
        // alert(JSON.stringify(res))
        window.location.replace('http://' + window.location.host + '/rmadmin_staging/login')
    }
  }

  const ResendOTPFunc = async () =>{
    let postParam = {
      Email : form.Email
    }
    // alert(JSON.stringify(postParam))
    var res = await ResendOTP  (postParam);
    if (res) {
        alert("OTP Resended");
    }
}
    return (
     
                  <div className={`modal bg-dark text-left ${props.open ? "display-block" : "display-none"}`}
                  id="inlineForm" tabIndex={-1} role="dialog" aria-labelledby="myModalLabel33" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h4 className="modal-title" id="myModalLabel33">Reset Password </h4>
                         
                        </div>
                        <form action="#">
                          <div className="modal-body">
                            <label>Email: </label>
                            <div className="form-group">
                              <input type="text" placeholder="Email Address" name="Email" onChange={handleChange} className="form-control" />
                            </div>

                            <label>New Password: </label>
                            <div className="form-group mb-0">
                              <input type="password" placeholder="Password" name="NewPassword" onChange={handleChange} className="form-control" />
                            </div>
                            <label>OTP: </label>
                            <div className="form-group mb-0">
                              <input type="text" placeholder="OTP" name="OTP" onChange={handleChange} className="form-control" />
                            </div>
                          </div>
                          <div className="modal-footer">
                          <button type="button" onClick={()=> ResendOTPFunc()} className="btn btn-success ml-1">
                        <i className="bx bx-check d-block d-sm-none" />
                        <span className="d-none d-sm-block">Resend Otp</span>
                      </button>
                            <button type="button" className="btn btn-light-secondary" data-dismiss="modal">
                              <i className="bx bx-x d-block d-sm-none" />
                              <span className="d-none d-sm-block" onClick={props.handleClose}>Close</span>
                            </button>
                            <button type="button" onClick={handleSubmit} className="btn btn-primary ml-1" data-dismiss="modal">
                              <i className="bx bx-check d-block d-sm-none" />
                              <span className="d-none d-sm-block">Submit</span>
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                

    );
}
