import React , { useState ,useEffect} from 'react'
// @material-ui/core components
// core components
import {SaveDB,Test,TestDB } from '../../models/API/API';

export default function DbConnectionModal(props) {
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
      var res = await SaveDB (props.GameId,form);
        if (res) {
          if(res.connection_success){
              alert("Connection success");

            }else{
              alert("Connection failed");

            }
            // window.location.reload();
            // alert(JSON.stringify(res))
        }
    }

    const handleSubmitTest = async (e) => {
        e.preventDefault();
        var res = await TestDB(props.GameId,form);
          if (res) {
            if(res.connection_success){
              alert("Connection success");

            }else{
              alert("Connection failed");

            }
              // alert("Verify success");
              // window.location.reload();
              // alert(JSON.stringify(res))
          }
      }

    return (
     
            <div className={`modal text-left ${props.open ? "display-block" : "display-none"}`}
            id="inlineForm" tabIndex={-1} role="dialog" aria-labelledby="myModalLabel33" aria-hidden="true">
              <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <div className="modal-content">
                  <div className="modal-header">
                    <h4 className="modal-title" id="myModalLabel33">Db Connection</h4>
                    {/* <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                      <i className="bx bx-x" />
                    </button> */}
                  </div>
                  <form action="#">
                    <div className="modal-body">
                      <label>Host: </label>
                      <div className="form-group">
                        <input type="text"  onChange={handleChange}    placeholder="Host" name="Host" className="form-control" />
                      </div>
                      <label>Port: </label>
                      <div className="form-group">
                        <input type="text"  onChange={handleChange}    placeholder="Port" name="Port" className="form-control" />
                      </div>
                      <label>User: </label>
                      <div className="form-group">
                        <input type="text"  onChange={handleChange}    placeholder="User" name="User" className="form-control" />
                      </div>
                      <label>Password: </label>
                      <div className="form-group">
                        <input type="text"  onChange={handleChange}    placeholder="Password" name="Password" className="form-control" />
                      </div>
                      <label>Database: </label>
                      <div className="form-group">
                        <input type="text"  onChange={handleChange}    placeholder="Database" name="Database" className="form-control" />
                      </div>
                    </div>
                    <div className="modal-footer">
                
                      <button type="button" className="btn btn-light-secondary"onClick={props.handleClose}>
                        <i className="bx bx-x d-block d-sm-none" />
                        <span className="d-none d-sm-block">Close</span>
                      </button>
                      <button type="button" onClick={handleSubmit} className="btn btn-primary ml-1" >
                        <i className="bx bx-check d-block d-sm-none" />
                        <span className="d-none d-sm-block">Save DB config</span>
                      </button>

                      <button type="button" onClick={handleSubmitTest} className="btn btn-success ml-1" >
                        <i className="bx bx-check d-block d-sm-none" />
                        <span className="d-none d-sm-block">Test DB config</span>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
           
            </div>

    );
}
