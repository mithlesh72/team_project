import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import API from '../services/API';
import moment from 'moment';
import Layout from '../components/shared/Layout/Layout';

const Donation = () => {
    const {user}= useSelector(state=>state.auth)
    const [data,setData]=useState([]);//array aa raha hai isliye array kar diya
    //find donar records
    const getDonars=async()=>{
        try{
         const {data}=await API.post("/inventory/get-inventory-hospital",{
            filters:{
               inventoryType:"in",
               donar:user?._id, 
            }
         });
       
        if(data?.success){
            setData(data?.inventory)
              console.log(data);
        }
        }catch(error){
            console.log(error);
        }
    };
    useEffect(()=>{
        getDonars();
    })
  return (
    <Layout>
       <div className='container' mg="4">
       <table className="table ">
              <thead>
                <tr>
                  <th scope="col">Blood group</th>
                  <th scope="col">Iventory Type</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Email</th>
                  <th scope="col"> Date</th>
                </tr>
              </thead>
              <tbody>
                {data?.map((record) => (
                  <tr key={record._id}>
                    <td>{record.bloodGroup}</td>
                    <td>{record.inventoryType}</td>
                    <td>{record.quantity}</td>
                    <td>{record.email}</td>
                    <td>
                      {moment(record.createdAt).format("DD/MM/YYYY hh:mm A")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
    </Layout>
   
  )
}

export default Donation