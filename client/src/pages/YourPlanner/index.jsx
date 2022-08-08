import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from '@apollo/client';

import { QUERY_PLAN_BY_USER } from '../../utils/queries';
import Auth from '../../utils/auth';
import "./index.css";

export default function ViewYourPlanner() {
    const navigate = useNavigate();


    const [planState, setPlanState] = useState({});
    const [editState, setEditState] = useState('');
    const times = ['9am', '12pm', '3pm', '6pm'];



    const { loading, data } = useQuery(QUERY_PLAN_BY_USER, {
        // variables: { username: Auth.getProfile().data.username }
        variables: { username: 'Steve.Ruecker52' }
    });

    if (!Auth.loggedIn()) {
        navigate("/");
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    const plans = data?.searchPlansByUser.myPlans;



    function viewPlan(plan){
        const daysData = plan.days.map(day => {
            const activities = day.activities.map(activity => {
                return {
                    id: activity._id,
                    time: activity.startTime,
                    name: activity.name
                };
            });

            return {
                id: day._id,
                dayNumber: `Day ${day.dayNumber}`,
                activities: activities
            };
        });
        
        setPlanState({
            id: plan._id,
            title: plan.planTitle,
            destination: plan.destination,
            description: plan.descriptionText,
            days: daysData
        });
    }



    if (editState) {
        return (
            // <PlanTemplate editState={editState} setEditState={setEditState} />
            <p>Render PlanTemplate component</p>
        );
    } else {
        return (
            <section className="row px-5" >
                <article className="col-12 col-md-2 col-xl-3">
                    <h1>My Plans</h1>
                    <div className="vstack gap-3 mt-5">
                        {plans.length && plans.map(plan => {
                            return (
                                <button 
                                    key={plan.planTitle} 
                                    onClick={() => {viewPlan(plan)}} 
                                    className="user-plans data"
                                >
                                    {plan.planTitle}
                                </button>
                            );
                        })}
                    </div>
                </article>
    
                <article className="col-6 col-md-10 col-xl-9 mb-5">
                    <div className="px-3">
                        <div className='col-12 d-flex justify-content-center'>
                            <h1 className="plan-details">Plan Details</h1>
                            {planState.id && (
                                <div className='my-4'>
                                    <button 
                                        className="edit-btn" 
                                        onClick={() => {editPlan(planState.id)}}
                                    >
                                        Edit Plan
                                    </button>
                                </div>
                            )}
                        </div>
                        
                        {planState.id ? (
                            <div>
                                <div className="col-6 col-md-3 col-xl-3">
                                    <h2>Plan Title</h2>
                                    <p className='data'>{planState.title}</p>
    
                                    <h2 className='mt-5'>Destination</h2>
                                    <p className='data'>{planState.destination}</p>
    
                                    <h2 className='mt-5'>Description</h2>
                                    <p className='data description border border-secondary p-3 col-11'>
                                        {planState.description}
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
                                            {planState.days.map(day => {
                                                return (
                                                    <div key={day.id} className="mx-4 day-plan">
                                                        <div className='day-title pb-2'>
                                                            <h3>{day.dayNumber}</h3>
                                                        </div>
                                                        {times.map(time => {
                                                            return (
                                                                <div key={time} className='d-flex time-slot'>
                                                                    {day.activities && day.activities.map(activity => {
                                                                        if (activity.time === time) {
                                                                            return (
                                                                                <p key={activity.id} className='data'>
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
                        ) : (
                            <p className='mt-4'>Please select a title to see details.</p>
                        )}
                    </div>

}
