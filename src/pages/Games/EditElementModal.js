import React , { useState ,useEffect} from 'react'
// @material-ui/core components
// core components
import { EditElement } from '../../models/API/API';

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
      var res = await EditElement  (props.gameId,form);
        if (res) {
            // alert(JSON.stringify(res))
            window.location.reload();
        }
    }

    useEffect(() => {
      setForm(props.formData)
    
  },[props.formData])

    return (
     
            <div className={`modal text-left ${props.formData ? "display-block" : "display-none"}`}
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
                      <label>ItemCode: </label>
                      <div className="form-group">
                        <input type="text"  onChange={handleChange} readOnly   placeholder="ItemCode" name="ItemCode"
                        defaultValue={form ? form.ItemCode : null}

                        className="form-control" />
                      </div>
                      <label>Name: </label>
                      <div className="form-group">
                        <input type="text"  onChange={handleChange}
                          defaultValue={form ? form.Name : null}

                        placeholder="Name" name="Name" className="form-control" />
                      </div>
                      <label>DefaultValue: </label>
                      <div className="form-group">
                        <input type="text"  onChange={handleChange}
                          defaultValue={form ? form.DefaultValue : null}

                        placeholder="DefaultValue" name="DefaultValue" className="form-control" />
                      </div>
                      <label>Category: </label>
                      <div className="form-group">
                        <input type="text"
                          defaultValue={form ? form.Category : null}

                        onChange={handleChange}    placeholder="Category" name="Category" className="form-control" />
                      </div>
                      <label>Description</label>
                      <div className="form-group">
                        <input type="text"
                          defaultValue={form ? form.Description : null}

                        onChange={handleChange}  placeholder="Description" name="Description" className="form-control" />
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
