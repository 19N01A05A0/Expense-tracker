import React ,{useState,useEffect}from "react"
import {Modal,Form, Input, Select} from 'antd'
import Layout from "../components/Layout"
import {message,Table} from "antd"
import {UnorderedListOutlined,AreaChartOutlined,EditOutlined,DeleteOutlined} from '@ant-design/icons'
import axios from "axios"
import Spinner from "../components/Spinner"
import '../index.css';
import Analytics from "../components/Analytics"
const HomePage=()=>
{   const[showModal,setShowModal]=useState(false)
    const[loading,setLoading]=useState(false)
    const[editable,setEditable]=useState(false)
    const[allTranactions,setAllTransactions]=useState([])
    //const[frequency,setFrequency]=useState("365")
    const [selectedOption, setSelectedOption] = useState('');
    const [viewData,setViewData]=useState('table')
    const columns=[
        {
            title:'Date',
            dataIndex:'date'
        },{
            title:'Amount',
            dataIndex:'amount'
        },
        {
            title:'Type',
            dataIndex:'type'
        },
        {
            title:'Reference',
            dataIndex:'reference'
        },
        {
            title:'Category',
            dataIndex:'category'
        },
        {
            title:'Actions',
            render:(text,record)=>
            (
                <div className="d-flex">
                    <EditOutlined
                    onClick={()=>{
                        setEditable(record)
                        setShowModal(true)
                    }}/>
                    <DeleteOutlined className="mx-2" onClick={()=>
                    {
                        handleDelete(record)
                    }}/>
                    
                </div>
            
        ),
                }

    ]
    const getAllTransactions=async(req,res)=>
        {
            try
            {
                const user= JSON.parse(localStorage.getItem('user'))
                setLoading(true)
                const response=await axios.post('http://localhost:3000/transactions/get-transactions',
                {userid:user._id,
                    
               })
                //message.success("Transactions added successfully")
                console.log(response.data)
                setLoading(false)
                setAllTransactions(response.data.transactions)
            }
            catch(error)
            {
                setLoading(false)
                message.error("Failed to fetch transactions")
            }
        }
    useEffect(()=>
    {   
        getAllTransactions()
    },[])
    const handleSelection = async (event) => {
        const selectedOption = event.target.value;
        console.log("65",selectedOption)
        const user= JSON.parse(localStorage.getItem('user'))
        try {
          const response = await axios.post('http://localhost:3000/transactions/get-all-transactions', { userid:user._id,option: selectedOption });
         // const serverResponse = response.data.selectedOption;
         console.log("70",response)
          setSelectedOption(event.target.value);
          setAllTransactions(response.data.transactions)
        } catch (error) {
          console.error('Error handling selection:', error);
        }
      };
      const handleDelete=async(record)=>
      {
        try
        {
            setLoading(true)
            await axios.post("http://localhost:3000/transactions/delete-transaction",
            {transactionId:record._id})
            setLoading(false)
            message.success("Transaction deleted successfully")
        }
        catch(error)
        {
            setLoading(false)
            message.error("Error in deleting Transaction ")
        }
        window.location.reload();
      }
    const handleSubmit=async (values)=>
    {
        //console.log(values)
        try
        {
            const user= JSON.parse(localStorage.getItem('user'))
            setLoading(true)
            if(editable){
            const resp=await axios.post('http://localhost:3000/transactions/edit-transaction',{
            payload:{...values,userid:user._id},
            transactionId:editable._id
            }
            )
            console.log(resp)
            message.success("Transaction edited successfully")
            setLoading(false)
            }
            else{
                await axios.post('http://localhost:3000/transactions/add-transaction',{...values,userid:user._id})
            
            message.success("Transaction added successfully")
            setLoading(false)
            }
            setShowModal(false)
            setEditable(null)
            window.location.reload();
        }
        catch(error)
        {
            setLoading(false)
            message.error("Failed to add transaction")
        }
    }
    return(
        <Layout>
            {loading && <Spinner/>}
            <div className="container-fluid">
            <div className="filters">
                <div>
                    {/*<Select value={frequency} onChanage={(values)=>setFrequency(values)}>
                        <Select.Option value="7">LAST 1 WEEK</Select.Option>
                        <Select.Option value="30">LAST 1 MONTH</Select.Option>
                        <Select.Option value="365">LAST 1 YEAR</Select.Option>
                        <Select.Option value="custom">CUSTOM</Select.Option>
    </Select>*/}
                <select onChange={handleSelection}  class="form-select" aria-label="Default select example">

  <option value="7">LAST 1 WEEK</option>
  <option value="30">LAST 1 MONTH</option>
  <option value="365">LAST 1 YEAR</option>
</select>
    </div>
    <div >Selected Option: {selectedOption}</div>
    <div className="switched-icon">
                    <UnorderedListOutlined className={`mx-2 ${viewData==='table'?'active-icon':'inactive-icon'}`}  onClick={()=>setViewData('table')}/>
                    <AreaChartOutlined className={`mx-2 ${viewData==='analytics'?'active-icon':'inactive-icon'}`} onClick={()=>setViewData('analytics')}/>
                </div>
                <div>
                
                    <button className="btn" style={{border:" 2px solid black",color:"black"}} onClick={()=>setShowModal(true)}>Add New</button>
                </div>
            </div>
            <div className="content">
                
                {viewData==='table'?
                <Table className="table table-stripped" columns={columns} dataSource={allTranactions}/>:
                <Analytics allTransaction={allTranactions}/>}
            </div>
            <Modal title= {editable? 'Edit Transaction':'Add Transaction'}
                open={showModal}
                onCancel={()=>setShowModal(false)}
                footer={false}>
                    <Form layout="vertical" onFinish={handleSubmit} initialValues={editable}>
                        <Form.Item label="Amount" name="amount">
                            <Input type="text"/>
                        </Form.Item>
                        <Form.Item label="Type" name="type">
                            <Select>
                                <Select.Option value="income">Income</Select.Option>
                                <Select.Option value="expense">Expense</Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item label="Category" name="category">
                            <Select>
                                <Select.Option value="salary">Salary</Select.Option>
                                <Select.Option value="tip">Tip</Select.Option>
                                <Select.Option value="project">Project</Select.Option>
                                <Select.Option value="food">Food</Select.Option>
                                <Select.Option value="movie">Movie</Select.Option>
                                <Select.Option value="bills">Bills</Select.Option>
                                <Select.Option value="medical">Medical</Select.Option>
                                <Select.Option value="fee">Fee</Select.Option>
                                <Select.Option value="tax">Tax</Select.Option>
                                
                            </Select>
                        </Form.Item>
                        <Form.Item label="Date" name="date">
                            <Input type="date"/>
                        </Form.Item>
                        <Form.Item label="Reference" name="reference">
                            <Input type="text"/>
                        </Form.Item>
                        <Form.Item label="Description" name="description">
                            <Input type="text"/>
                        </Form.Item>
                        <div className="d-flex justify-content-end">
                            <button className="btn btn-primary" type="submit">SAVE</button>
                        </div>
                    </Form>
                </Modal>
                </div>
        </Layout>
    )
}
export default HomePage