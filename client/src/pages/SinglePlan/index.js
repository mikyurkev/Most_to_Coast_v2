import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from '@apollo/client';

import { QUERY_PLAN_BY_ID } from '../../utils/queries';
import Auth from '../../utils/auth';
import "./index.css";

export default function PlanDetails() {
    const navigate = useNavigate();
    const { planId } = useParams();
    const times = [9, 12, 15, 18];
    
    const { loading, data } = useQuery(QUERY_PLAN_BY_ID, {
        variables: { id: planId }
    });

    if (!Auth.loggedIn()) {
        navigate("/");
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    const plan = data?.singlePlan;

    // function viewPlan(plan){
    //     const daysData = plan.days.map(day => {
    //         const activities = day.activities.map(activity => {
    //             return {
    //                 id: activity._id,
    //                 time: activity.startTime,
    //                 name: activity.name
    //             };
    //         });

    //         return {
    //             id: day._id,
    //             dayNumber: `Day ${day.dayNumber}`,
    //             activities: activities
    //         };
    //     });
        
    //     setPlanState({
    //         id: plan._id,
    //         title: plan.planTitle,
    //         destination: plan.destination,
    //         description: plan.descriptionText,
    //         days: daysData
    //     });
    // }

    return (
        <section className="row px-5" >
            <article className="col-12 col-md-2 col-xl-3"></article>
            <article className="col-6 col-md-10 col-xl-9 mb-5">
                <div className="px-3">
                    <div className='col-12 d-flex justify-content-center'>
                        <h1 className="plan-details">Plan Details</h1>
                    </div>
                    <div>
                        <div className="col-6 col-md-3 col-xl-3">
                            <h2>Plan Title</h2>
                            <p className='data'>{plan.planTitle}</p>

                            <h2 className='mt-5'>Destination</h2>
                            <p className='data'>{plan.destination}</p>

                            <h2 className='mt-5'>Description</h2>
                            <p className='data description border border-secondary p-3 col-11'>
                                {plan.descriptionText}
                            </p>
                        </div>

                        <div className="col-8 col-md-9 col-xl-8">
                            <div className='d-flex'>
                                <div>
                                    <div className='day-title pb-2'>
                                        <h3>Time</h3>
                                    </div>
                                    {times.map(time => {
                                        return (
                                            <div key={time} className='time-slot'>
                                                <p>{time}</p>
                                            </div> 
                                        );
                                    })}
                                </div>
                                <div className="d-flex flex-wrap">
                                    {plan.days.map(day => {
                                        return (
                                            <div key={day.id} className="mx-4 day-plan">
                                                <div className='day-title pb-2'>
                                                    <h3>Day {day.dayNumber}</h3>
                                                </div>
                                                {times.map(time => {
                                                    return (
                                                        <div key={time} className='d-flex time-slot'>
                                                            {day.activities && day.activities.map(activity => {
                                                                if (activity.startTime === time) {
                                                                    return (
                                                                        <p key={activity._id} className='data'>
                                                                            {activity.name}
                                                                        </p>
                                                                    );
                                                                }
                                                            })}
                                                        </div> 
                                                    );
                                                })}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </article>
        </section>
    );
}
