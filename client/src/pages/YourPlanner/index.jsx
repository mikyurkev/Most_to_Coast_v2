import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from '@apollo/client';

import { QUERY_PLAN_BY_USER } from '../../utils/queries';
import Auth from '../../utils/auth';
import "./index.css";

export default function ViewPlanner() {
    const navigate = useNavigate();
    const [planState, setPlanState] = useState({});
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

    return (
        <section className="row px-5" >
            <article className="col-12 col-md-2 col-xl-3">
                <h2>My Plans</h2>
                <div className="vstack gap-3 mt-4">
                    {plans.length && plans.map(plan => {
                        return (
                            <button 
                                key={plan._id} 
                                onClick={() => {viewPlan(plan)}} 
                                className="user-plans"
                            >
                                {plan.planTitle}
                            </button>
                        );
                    })}
                </div>
            </article>

            <article className="col-6 col-md-10 col-xl-9">
                <div className="row px-3">
                    <div className='col-12 d-flex justify-content-center'>
                        <h2 className="plan-details">Plan Details</h2>
                        {planState.id && (
                            <div className='my-4'>
                                <button 
                                    className="edit-btn" 
                                    onClick={function(){navigate("/Planner")}}
                                >
                                    Edit Plan
                                </button>
                            </div>
                        )}
                    </div>
                    
                    {planState.id ? (
                        <div className='col-12 mx-4'>
                            <div className="col-6 col-md-3 col-xl-3 row">
                                <h3>Plan Title</h3>
                                <p>{planState.title}</p>

                                <h3 className='mt-3'>Destination</h3>
                                <p>{planState.destination}</p>

                                <h3 className='mt-3'>Description</h3>
                                <p className='description border border-secondary p-3 col-11'>
                                    {planState.description}
                                </p>
                            </div>

                            <div className="col-8 col-md-9 col-xl-8 row">
                                <h3 className='details-subtitle col-12'>Time Schedule</h3>
                                <div className="col-12 d-flex">

                                    {planState.days && planState.days.map(day => {
                                        return (
                                            <div key={day.id} className="mx-4 w-50">
                                                <h4>{day.dayNumber}</h4>
                                                {times.map(time => {
                                                    return (
                                                        <div key={time} className='row'>
                                                            <p className='col-3'>{time}</p>
                                                            {day.activities && day.activities.map(activity => {
                                                                if (activity.time === time) {
                                                                    return (
                                                                        <p key={activity.id} className='col-7'>{activity.name}</p>
                                                                    );
                                                                }
                                                            })}
                                                        </div> 
                                                    );
                                                })}

                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <p className='mt-4'>Please select a title to see details.</p>
                    )}
                </div>
            </article>

            {/* <div className="row">
                <div className="col-12">
                    <div className='grandparent'>

                        <div className='plan-title'>Plan Created by:  user123</div>

                        <div className='plan-likes'>
                            <div className="vote roundrect">
                                <div className="increment up"></div>
                                <div className="increment down"></div>
                                <button className="likes">This Travel Plan has been liked by  : 105 Travel Addicts</button>
                            </div>
                        </div>

                    </div>
                </div>
            </div> */}
        </section>
    );
}
