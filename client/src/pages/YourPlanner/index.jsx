import React, { useEffect, useState }from "react";
import "./ViewPlanner.css";
import {useNavigate} from "react-router-dom"
import { QUERY_PLAN_BY_USER } from '../../utils/queries';
import { useQuery } from '@apollo/client';
import Auth from '../../utils/auth';

export default function ViewPlanner() {
    const navigate = useNavigate();
    // const [timeState, setTimePost] = useState(
    //     [{
    //         time : '9am', 
    //         activity : ''},
    //         {time : '12pm',
    //         activity : ''},
    //         {time : '3pm',
    //         activity : ''},
    //         {time : '7pm',
    //         activity : ''},
    //         {time : '11pm',
    //         activity : ''},
    //     ] 
    // );
    const [planState, setPlanState] = useState({});
    const times = ['9am', '12pm', '3pm', '6pm'];

    // useEffect(()=>{

    //     // here grab all of the data from the backend and set it to state
    //     // setUserPost({posts: data from backend})
    // }, [planState])

    const { loading, data } = useQuery(QUERY_PLAN_BY_USER, {
        // variables: { username: Auth.getProfile().data.username }
        //  variables: { username: 'Taylor.Jaskolski' }
        variables: { username: 'Steve.Ruecker52' }
    });

    if (!Auth.loggedIn()) {
        navigate("/");
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    const plans = data?.searchPlansByUser.myPlans;

    console.log(plans);
    console.log(planState[0]);

    const handleFilter = (event) => {
        // check out event.target.value and .filter method.
        // youre going to need to filter and set event.target.value to filteredPosts
        // filteredPosts is what youre going to want to display and map over down below
        console.log(event.target.value)

    }

    function viewPlan(plan){
        console.log(plan);
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
            description: plan.descriptionText,
            days: daysData
        });

        // setUserPost(
        //     [{
        //         time : '10am', 
        //         activity : ''
        //     },]
        // )
    }

    // const days = planState[1]
    console.log(planState.days && planState.days[0]);

    return (
        <section className="viewplan row px-5" >
            <article className="col-12 col-md-2 col-xl-3">
                <div className="">

                    <div className='parent'>
                        <h2 className="plan-title">My Plans</h2>

                        <button className="plan-nickname" onClick={function(){
                            navigate("/Planner")
                        }} >Edit Plan</button>
                    </div>

                    <div className="vstack gap-3">
                        <br></br>
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
                </div>
                
            </article>
        

            <article className="col-6 col-md-10 col-xl-9">

                <div className="row">
                    <div className='col-12 d-flex justify-content-center'>
                        <h2 className="plan-details">Plan Details</h2>
                    </div>
                
                    <div className='col-12 mx-5 px-3 pt-4'>

                        <div className="col-6 col-md-3 col-xl-3 row">
                            <h3 className='details-subtitle col-12'>Description</h3>
                            <div className='description border border-secondary col-11'>
                                <p>
                                    {planState.description ? 
                                        planState.description 
                                        : 
                                        'Please select a title to see details.'
                                    }
                                </p>
                            </div>
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
                </div>
            </article>

            <br></br>

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

// when user comes to page, they see list of plans, when they click the it populates - this will fetch plan
// when edit button is clicked, you go to create plan 
//  make component for pop up 
// activity has unuqie id, the relationahip is that the base of the plan has the days array, which is day model which has day activity , activity must know whuch activity and at 9am the days 
// is the master relationship
// implement the back end to make the buttons work 