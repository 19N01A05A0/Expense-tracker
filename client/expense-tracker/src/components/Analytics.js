import { all } from "axios"
import React from "react"
import {Progress} from "antd"
const Analytics=({allTransaction})=>
{   console.log(allTransaction,typeof(allTransaction))


    const categories=[
        "salary",
        "tip",
        "project",
        "food",
        "movie",
        "bills",
        "medical",
        "fee",
        "tax"
    ]
    const totalTransactions=allTransaction.length
    console.log(totalTransactions)
    const totIncomeTrns=allTransaction.filter((transaction)=>transaction.type==='income')
    const totExpTrns=allTransaction.filter((transaction)=>transaction.type==='expense')
    const totIncomePer=(totIncomeTrns.length/totalTransactions)*100
    const totExpPer=(totExpTrns.length/totalTransactions)*100
    const totTurnOver=allTransaction.reduce((acc,transaction)=>
    
        acc + Number(transaction.amount)
    ,0)
    console.log(totTurnOver)
    const totIncomeTurnOver=allTransaction.filter(
        (transaction)=>transaction.type==='income'
    ).reduce((acc,transaction)=>acc + Number(transaction.amount),0)

    const totExpenseTurnOver=allTransaction.
    filter((transaction)=>transaction.type==='expense')
    .reduce((acc,transaction)=>acc+Number(transaction.amount),0)
    const totIncomeTurnOverPercent=(totIncomeTurnOver/totTurnOver)*100
    const totExpenseTurnOverPercent=(totExpenseTurnOver/totTurnOver)*100
    return(
        <>
       <div className="container">
        <br></br>
        <div className="row">
            <div className="col-sm-3 col-md-6">
                <div className="card">
                    <div className="card-header">
                        Total Transaction:{totalTransactions}
                    </div>
                    <div className="card-body mt-2">
                        <h5 className="text-success">Income:{totIncomeTrns.length}</h5>
                        <h5 className="text-danger">Expense:{totExpTrns.length}</h5>
                        <div>
                            <Progress type="dashboard"
                           
                            className="mx-2"
                            //success={{percent:totIncomePer}}
                           percent={totIncomePer.toFixed(0)}
                           strokeColor={'green'}
                            color="green"/>
                        
                            <Progress type="dashboard"
                            
                            className="mx-2"
                            percent={totExpPer.toFixed(0)}
                            strokeColor={'red'}
                            color="red"/>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-sm-3 col-md-6">
                <div className="card">
                    <div className="card-header">
                        Total TurnOver:{totTurnOver}
                    </div>
                    <div className="card-body mt-2">
                        <h5 className="text-success">Total Income Turnover:{totIncomeTurnOver}</h5>
                        <h5 className="text-danger">Total Expense Turnover:{totExpenseTurnOver}</h5>
                        {/*exp:{totExpenseTurnOverPercent}
                        <br></br>
    {totIncomeTurnOverPercent}*/}
                        <div>
                            <Progress type="dashboard"
                            className="mx-2"                         
                            percent={totIncomeTurnOverPercent.toFixed(1)}
                            strokeColor={'green'}
                            color="green"/>                       
                            <Progress type="dashboard"                          
                            className="mx-2"
                            percent={totExpenseTurnOverPercent.toFixed(1)}
                            strokeColor={'red'}
                            color="red"/>
                       </div>
                    </div>
                </div>
            </div>
        </div>
        <br></br>
        <div className="row">
            <div className="col">
                
                    <h4>Category wise Income</h4>
                    
                    {categories.map((category)=>
                    {
                        const amount= allTransaction
                        .filter(
                            (transaction)=>
                            
                                transaction.type==='income' && transaction.category===category
                            )
                            .reduce((acc,transaction)=> acc + Number(transaction.amount),0)
                            console.log(amount)
                            return(
                                console.log(amount),
                                amount>0&&(
                                <div className="card mt-2">
                                    <div className="card-body">
                                        <h5>{category}</h5>
                                        <Progress
                                        percent={((amount/totIncomeTurnOver)*100).toFixed(0)}/>
                                    </div>
                                    </div>
                                )
                            )
                    })}
            </div>
            <div className="col-sm-12 col-md-6">
                <div className="col">
                    <h4>Category wise Expense</h4>
                    {categories.map((category)=>
                    {
                        const amount= allTransaction
                        .filter(
                            (transaction)=>
                            
                                transaction.type==='expense' && transaction.category===category
                            )
                            .reduce((acc,transaction)=> acc + Number(transaction.amount),0)
                            console.log(amount)
                            return(
                                console.log(amount),
                                amount>0&&(
                                <div className="card">
                                    <div className="card-body">
                                        <h5>{category}</h5>
                                        <Progress
                                        percent={((amount/totIncomeTurnOver)*100).toFixed(0)}/>
                                    </div>
                                    </div>
                                )
                            )
                    })}
                </div>
            </div>
        </div>
               
            
           
        
        </div>
        </>
    )
}
export default Analytics