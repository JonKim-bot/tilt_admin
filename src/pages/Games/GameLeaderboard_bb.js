import React, { useState , useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem";
import GridContainer from "components/Grid/GridContainer";
import Card from "components/Card/Card";
import CardHeader from "components/Card/CardHeader";
import CardBody from "components/Card/CardBody";


import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import Button from "@material-ui/core/Button";
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from "@material-ui/core/IconButton";
import AddIcon from '@material-ui/icons/Add';
import PageviewIcon from '@material-ui/icons/Pageview';
import DescriptionIcon from '@material-ui/icons/Description';
import AddGiftModal from './AddModal.js';
import EditGiftModal from './EditModal.js';
import { Gift_Get_All,Category_Get_All_Category,Gift_Search_Category,Gift_Delete_Gift,RemovePrize,Gift_Update_Gift,Gift_Upload_Gift_Image,Gift_Add_Gift } from "models/API";
import { CSVLink, CSVDownload } from "react-csv";
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import AddGiftImageModal from './AddGiftImageModal';
import DataModal from './DataModal';

import CardMedia from '@material-ui/core/CardMedia'
import TablePagination from '@material-ui/core/TablePagination';
import {country} from '../../models/countries'
import Autocomplete from '@material-ui/lab/Autocomplete'
import TextField from "@material-ui/core/TextField";
import styles from 'assets/jss/styles'
import defaultImage from '../../assets/img/Empty.svg'

const useStyles = makeStyles(styles);

const PicUpload = (props) =>{
    // alert(JSON.stringify(props.image))
  
    const [image, setImage] = useState(defaultImage)
    const [imageShow, setImageShow] = useState(false)

    useEffect(() => {
        props.image != undefined ? setImage(props.image) : setImage(defaultImage)
    }, [props.image])

    return (
        <div 
            style={{ position : 'relative' , maxHeight : 'auto' , minWidth : '100px' , maxWidth : '150px' , backgroundColor : '#e0e0e0'}} 
            onClick={()=>{
                props.setAddImageData({
                image: props.image,
                giftId : props.giftId
            })}}
        >
            <div 
                style={{ 
                    opacity: imageShow ? "0.75" : "0",
                    position: 'absolute', 
                    backgroundColor : 'black' , 
                    height : '100%' , 
                    width : '100%',
                    transitionProperty : 'all',
                    transitionDuration : '0.2s'
                }}
                onMouseOver={(e)=>{
                    e.target.style.cursor = 'pointer'
                    setImageShow(true)
                }}
                onMouseLeave={()=>{setImageShow(false)}}
            ></div>
            <div
                style={{ 
                    display: imageShow ? "flex" : "none",
                    justifyContent: "center",
                    alignItems: "center",
                    position: 'absolute', 
                    height : '100%' , 
                    width : '100%',
                }}
                onMouseOver={(e)=>{
                    e.target.style.cursor = 'pointer'
                    setImageShow(true)
                }}
                onMouseLeave={()=>{setImageShow(false)}}
            >
                
                <AddPhotoAlternateIcon style={{ color: 'white' }}/>
            </div>
            <CardMedia
                component="img"
                alt="Contemplative Reptile"
                image={image}
                title="Contemplative Reptile"
                style={{ 
                    padding: '10%',
                    maxHeight: 'calc(80% - 2px)' , 
                    maxWidth: 'calc(80% - 2px)' , 
                    border : '1px solid'
                }}
                onMouseOver={()=>{setImageShow(true)}}
                onMouseLeave={()=>{setImageShow(false)}}
            />
        </div>
    )
}

export default function Gift() {
    
    const classes = useStyles();

    const tableHead = [
        "ResourceId",
        "Image",
        "ResourceName",
        "Category",
        "Type",
        "Cost",
        "Description",

        "Size",
        "Stock",
        "Volume (cm³)",
        "Weight (kg)",
        "Country",
        "TicketType",

        "Status",
       
    ];
    const tableHeaderColor = "primary";

    const [gift, setGift] = useState([])
    const [descriptionData, setDescriptionData] = useState()
    const [addGift, setAddGift] = useState(false);
    const [editGiftData, setEditGiftData] = useState();
    const [addImageData, setAddImageData] = useState()
    const [orderBy, setOrderBy] = useState({
        "Column":"ResourceId",
        "Order":"asc",
    })
    const [filter, setFilter] = useState({Type : 'Gift'})
    const [defaultCategory,setDefaultCategory] = useState({})

    const handleClose = ()=>{
        
        setAddGift(false);
        setDescriptionData()
        setEditGiftData()

        setAddImageData()

    }
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(50);

    const [limit,setLimit] = useState(50)
    const[emptyRows,setEmptyRos] = useState(0)
    

    const handleChangePage = (event, newPage) => {
        // alert(newPage)
        let offset = (newPage) * 50

        setOffset(offset)
        // alert(offset);
        setPage(newPage);
    };


    const handleChangeRowsPerPage = (event) => {
        setLimit(parseInt(event.target.value, 10))
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    useEffect(()=>{
        setEmptyRos(rowsPerPage - Math.min(rowsPerPage, gift.length - page * rowsPerPage))
    },[gift])

    const delete_method = async (id)=>{
        // alert(JSON.stringify(id))
        let res = await Gift_Delete_Gift(id);
        if(res){
            window.location.reload()
        }else{
            alert('delete failed!')
        }
    }
    const [offset,setOffset] = useState(0)

    const get_data = async ()=>{
        
       
        // let res = await Gift_Search_Category({
        //     "OrderBy": {
        //         "Column":"ResourceId",
        //         "Order":"asc"
        //     },
        //     "Filter":filter,
        //     "Offset":offset,
        //     "Limit": 50
        // })
        
        // if(res){
        //     res  = res.results

        //     res.map((row,index)=>{
        //         //isactive 0/1 to readable

        //         if(row.IsActive){
        //             res[index].Status = 'Active'
        //         }else{
        //             res[index].Status = 'Inactive'
        //         }

        //         // description string to array
        //         if(row.Description.search('\n') != -1){
        //             res[index].ArrDescription = row.Description.split('\n')
        //         }else{
        //             res[index].ArrDescription = [row.Description]
        //         }
        //         // if(row.Type == "Prize"){
        //         //     delete res[index]

        //         //     // res.splice(index,1); // This will remove the object that first name equals to Test1
        //         //     // return false; // This will stop the execution of jQuery each loop.
        //         // }
                

        //     })

            
        // }

        let category_data = await  Category_Get_All_Category({})
        if(category_data){
            setDefaultCategory(category_data)
        }
    }

  


    const headers = [
        
        { label: "GiftId", key: "GiftId" },
        { label: "Size", key: "Size" },
        { label: "ResourceName", key: "ResourceName" },
        { label: "Cost", key: "Cost" },
        { label: "Description", key: "Description" },
        { label: "Country", key: "Country" },
    ];

    const [count,setCount] = useState(0)

    useEffect(() => {
        get_data()
    }, [])

    

    useEffect(()=>{
        Gift_Search_Category({Filter:filter,OrderBy:orderBy,Offset:offset,Limit: limit}).then(
            order_data=>{
                setCount(order_data.total)
                order_data = order_data.results
                // alert(JSON.stringify(order_data))
                order_data.map((row,index)=>{
                    if(row.IsActive){

                        order_data[index].Status = 'Active'

                    }else{
                        order_data[index].Status = 'Inactive'
                    }
    
                    if(row.Description.search('\n') != -1){
                        order_data[index].ArrDescription = row.Description.split('\n')
                    }else{
                        order_data[index].ArrDescription = [row.Description]
                    }
                    // if(row.Type == "Prize"){
                    //     delete order_data[index]
    
                    //     // res.splice(index,1); // This will remove the object that first name equals to Test1
                    //     // return false; // This will stop the execution of jQuery each loop.
                    // }
                })
                if(filter.hasOwnProperty("Country") || filter.hasOwnProperty("Category")){
                    setGift(prev => prev.concat(order_data))
                }else{
                    setGift(prev => prev.concat(order_data))
                }

            }
        )
    },[filter,orderBy,page,limit])
    
    const deleteGiftImage =  async(GiftId,Country) =>{

        let post_data = {
            ResourceId : GiftId,
            Country : Country,
        }


        var res = await RemovePrize(post_data);
        // var res2 = await Gift_Add_Image(formData);
        if (res) {
            window.location.reload();
        }else{
            alert("delete fail")
        }


    }

    const changeCountry = (country) =>{
        setGift([])
        if(country){
            setFilter({...filter,Country:country,Type : 'Gift'})
        }else{
            setFilter({...filter,Country:undefined,Type : 'Gift'})
        }
        setPage(0)
        setOffset(0)
    }
    const changeCategory = (category) =>{
        setGift([])
        if(category){
            setFilter({...filter,Category:category.Category,Type : 'Gift'})
        }else{
            setFilter({...filter,Category:undefined,Type : 'Gift'})
        }
        setOffset(0)

        setPage(0)

    }
    
    return (
        <React.Fragment>
            <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                    <Card>
                        <CardHeader color="primary">
                            <h4 className={classes.cardTitleWhite}>Gift</h4>
                        </CardHeader>
                        <CardBody>
                            
                      
                            <GridContainer>
                                <GridItem xs={12} style={{ textAlign: 'right' }}>
                                    
                                    {/* <Button variant="outlined" style={{ marginRight: 10 }}>
                                        <AddIcon/>          
                                        <CSVLink data={gift} headers={headers} filename={"gift.csv"} style={{ color: 'black' }}>
                                            Export To Csv
                                        </CSVLink>
                                    </Button> */}   

                                    <Button variant="outlined" onClick={() => { setAddGift(true) }} >
                                        <AddIcon/> Create New Gift
                                    </Button>
                                </GridItem>
                            </GridContainer>
                            <GridContainer>
                                <GridItem xs={12} md={6}>
                                    <br/>
                                    <Autocomplete
                                        id="tags-outlined"
                                        options={country}
                                        onChange={(e,value)=>value ? changeCountry(value.name) : changeCountry(null)}
                                        getOptionLabel={(option) => option.name ? option.name : '-'}
                                        filterSelectedOptions
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label="Country Name"
                                                placeholder="-- select Country name --"
                                            />
                                        )}
                                        
                                    />
                                    <br/>
                                </GridItem>
                                <GridItem xs={12} md={6}>
                                    <br/>

                                    <Autocomplete
                                        id="tags-outlined"
                                        options={defaultCategory}
                                        onChange={(e,value)=>value ? changeCategory(value) : changeCategory(null)  }
                                        getOptionLabel={(option) => option.Category ? option.Category : '-'}
                                        filterSelectedOptions
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label="Category Name"
                                                placeholder="-- select Category name --"
                                            />
                                        )}
                                    />
                                    <br/>

                                </GridItem>
                            </GridContainer>
                            <div style={{ width: '100%' , overflowX: 'auto'}}>
                                <Table className={classes.table} style={{ width:'100%' }}>
                                    {tableHead !== undefined ? (
                                        <TableHead className={classes[tableHeaderColor + "TableHeader"]}>
                                            <TableRow className={classes.tableHeadRow}>
                                                {tableHead.map((prop, key) => {
                                                    return (
                                                        <TableCell

                                                            className={classes.tableCell + " " + classes.tableHeadCell}
                                                            key={key}
                                                        >
                                                            {prop}
                                                        </TableCell>
                                                    );
                                                })}
                                                <TableCell> </TableCell>
                                            </TableRow>
                                        </TableHead>
                                    ) : null}
                                    <TableBody>
                                        {gift.length ?
                                            gift
                                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                            .map((prop, key) => {
                                                return (
                                                    <TableRow key={key} className={classes.tableBodyRow}>
                                                          
                                                        <TableCell className={classes.tableCell} key={key+'a'}>
                                                            {prop.ResourceId}
                                                        </TableCell>
                                                        <TableCell className={classes.tableCell} key={key+'b'}>
                                                            {(prop.Images).replace("[","").replace("]","").replace(/['"]+/g,"").split(",").map((img, key) => {
                                                                return (
                                                                   
                                           

                                                                    <PicUpload 
                                                                    key={key+'bb'}
                                                                    image={(img) ? (img) : undefined}

                                                                    // image={((prop.Images).replace("[","").replace("]","").replace(/['"]+/g,"").replace('"',"").split(",")[0]) ? ((prop.Images).replace("[","").replace("]","").replace(/['"]+/g,"").replace('"',"").split(",")[0]) : undefined}
                                                                    setAddImageData={setAddImageData}
                                                                    giftId={prop.ResourceId}
                                                                />
                                                                );

                                                                

                                                             })
                                                            } 
                                                        </TableCell>
                                                        <TableCell className={classes.tableCell} key={key+'c'}>
                                                            {prop.ResourceName}
                                                        </TableCell>
                                                        <TableCell className={classes.tableCell + " " + (prop.Category ? '' : classes.inactive)} key={key+'d'}>
                                                            {prop.Category ? prop.Category : 'No Category'}
                                                        </TableCell>  
                                                        <TableCell className={classes.tableCell} key={key+'e'}>
                                                            {prop.Type}
                                                        </TableCell>
                                                        <TableCell className={classes.tableCell} key={key+'f'}>
                                                            {prop.Cost}
                                                        </TableCell>  
                                                        
                                                        <TableCell className={classes.tableCell} key={key+'g'}>
                                                            <IconButton onClick={()=>{
                                                                setDescriptionData(prop.ArrDescription)
                                                            }}>
                                                                <PageviewIcon></PageviewIcon>
                                                            </IconButton>
                                                        </TableCell>
                                                        <TableCell className={classes.tableCell} key={key+'h'}>
                                                            {prop.Size}
                                                        </TableCell>
                                                        <TableCell className={classes.tableCell} key={key+'i'}>
                                                            {prop.Stock}
                                                        </TableCell>
                                                        
                                                        <TableCell className={classes.tableCell} key={key+'j'}>
                                                            {prop.Volume}
                                                        </TableCell>
                                                        <TableCell className={classes.tableCell} key={key+'k'}>
                                                            {prop.Weight}
                                                        </TableCell>
                                                        <TableCell className={classes.tableCell} key={key+'l'}>
                                                            {prop.Country}
                                                        </TableCell>  
                                                        <TableCell className={classes.tableCell} key={key+'l'}>
                                                            {prop.TicketType}
                                                        </TableCell>  
                                                        <TableCell 
                                                            className={classes.tableCell + " " + (prop.IsActive ? classes.active : classes.inactive)} 
                                                            style={{ fontWeight : 'normal' }} key={key+'m'}
                                                        >
                                                            {prop.Status}
                                                        </TableCell>
                                                        <TableCell align="right">
                                                            <IconButton onClick={()=>{
                                                                setEditGiftData(gift.find(arr=>arr.ResourceId == prop.ResourceId))
                                                            }}>
                                                                <CreateIcon></CreateIcon>
                                                            </IconButton>
                                                             <IconButton
                                                                onClick={()=>
                                                                    window.confirm('Delete?') ? 
                                                                        delete_method({GiftId : prop.ResourceId})
                                                                    : null
                                                                }
                                                            >
                                                                <DeleteIcon></DeleteIcon>
                                                            </IconButton> 
                                                            
                                                        </TableCell>
                                                    </TableRow>
                                                );

                                            })
                                        :null}
                                           {emptyRows > 0 && (
                                            <TableRow style={{ height: 53 * emptyRows }}>
                                            <TableCell colSpan={6} />
                                            </TableRow>
                                        )}
                                    </TableBody>

                                </Table>
                            </div>
                            <TablePagination
                                rowsPerPageOptions={[50, 100, 200]}
                                component="div"
                                count={count}
                                 rowsPerPage={rowsPerPage}
                                page={page}
                                onChangePage={handleChangePage}

                                onChangeRowsPerPage={handleChangeRowsPerPage}
                                style={{ marginTop: '15px' }}
                            />
                        </CardBody>
                        
                    </Card>
                </GridItem>
                <AddGiftModal
                    open={addGift}
                    defaultImage={defaultImage}
                    handleClose={handleClose}
                    category={defaultCategory}
                ></AddGiftModal>
                <EditGiftModal
                    formData={editGiftData}
                    handleClose={handleClose}
                    category={defaultCategory}
                ></EditGiftModal>
                 <AddGiftImageModal
                    imageData={addImageData}
                    handleClose={handleClose}
                ></AddGiftImageModal>
                <DataModal
                    formData={descriptionData}
                    handleClose={handleClose}
                ></DataModal>
            </GridContainer>

        </React.Fragment>
    );
}
