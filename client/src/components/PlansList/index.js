import React, { useEffect, useState } from "react";
import { useQuery, useLazyQuery } from '@apollo/client';
import { QUERY_ALL_PLANS, QUERY_PLAN_BY_USER } from "../../utils/queries";
import "./index.css";

export default function PlansList(props) {
    const {
        searchedState,
        plansData
    } = props;

    return (
        <div className="container-fluid">
            {!searchedState &&
                <div className='text-center'>
                    {plansData ? plansData.map((data) => {
                        return (
                            <div className="text-left">
                                <h2>{data.planTitle}</h2>
                                <p>{data.descriptionText}</p>
                                <p>{data.destination}</p>
                            </div>
                        )
                    }) : ('No Data yet')}
            </div> 
            // :  
            // <div className='text-center'>
            //     {userData ? userData.searchPlansByUser.myPlans.map((plans) => {
            //         return (
            //             <div className="text-left">
            //                 <h2>{plans.planTitle}</h2>
            //                 <p>{plans.descriptionText}</p>
            //                 <p>{plans.destination}</p>
            //             </div>
            //         )
            //     }) : ('No Data yet')
            //     }
            // </div> 
            }   
        </div>
    )
}