import React , { useState ,useEffect} from 'react'
// @material-ui/core components
// core components
import { AddAdmin } from '../../models/API/API';

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
      form.AdminList = [form.Admin]
      var res = await AddAdmin  (form);
        if (res) {
            // alert("Verify success");
            window.location.reload();
            // alert(JSON.stringify(res))
        }
    }

    return (
     
            <div className={`modal text-left ${props.open ? "display-block" : "display-none"}`}
            id="inlineForm" tabIndex={-1} role="dialog" aria-labelledby="myModalLabel33" aria-hidden="true">
              <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <div className="modal-content">
                  <div className="modal-header">
                    <h4 className="modal-title" id="myModalLabel33">Add Admin</h4>
                    {/* <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                      <i className="bx bx-x" />
                    </button> */}
                  </div>
                  <form action="#">
                    <div className="modal-body">
                      <label>Admin: </label>
                      <div className="form-group">
                        <input type="text"  onChange={handleChange}    placeholder="Admin" name="Admin" className="form-control" />
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
