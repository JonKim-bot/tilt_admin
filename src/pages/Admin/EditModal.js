import React , { useState ,useEffect} from 'react'
// @material-ui/core components
// core components
import { VerifyOTP } from '../../models/API/API';

export default function AddModal(props) {
    // alert(JSON.stringify(props))
    const [form, setForm] = useState(props.formData)

    const handleChange = (e)=>{
        setForm({
            ...form,
            [e.target.name]:e.target.value
        })
    }
  

    const handleSubmit = async (e) => {
      e.preventDefault();
      form.Email = props.email;
      var res = await VerifyOTP  (form);
        if (res) {
            alert("Verify success");
            // alert(JSON.stringify(res))
            window.location.replace('http://' + window.location.host + '/tilt_admin/login')
        }
    }

    return (
     
            <div className={`modal text-left ${props.open ? "display-block" : "display-none"}`}
            id="inlineForm" tabIndex={-1} role="dialog" aria-labelledby="myModalLabel33" aria-hidden="true">
              <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <div className="modal-content">
                  <div className="modal-header">
                    <h4 className="modal-title" id="myModalLabel33">Verify OTP</h4>
                    {/* <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                      <i className="bx bx-x" />
                    </button> */}
                  </div>
                  <form action="#">
                    <div className="modal-body">
                      <label>Email: </label>
                      <div className="form-group">
                        <input type="text" readOnly onChange={handleChange}  value={props.email}  placeholder="Email Address" name="Email" className="form-control" />
                      </div>
                      <label>OTP: </label>
                      <div className="form-group mb-0">
                        <input type="text" onChange={handleChange}  placeholder="OTP" name="OTP" className="form-control" />
                      </div>
                    </div>
                    <div className="modal-footer">
                 
                      <button type="button" className="btn btn-light-secondary"onClick={props.handleClose}>
                        <i className="bx bx-x d-block d-sm-none" />
                        <span className="d-none d-sm-block">Close</span>
                      </button>
                      <button type="button" onClick={handleSubmit} className="btn btn-primary ml-1" >
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
