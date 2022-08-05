import React, { useState } from "react";
import { useQuery, useLazyQuery, useMutation } from "@apollo/client";
import {CREATE_DAY} from "../../utils/mutations";
import {QUERY_PLAN_BY_ID} from "../../utils/queries";
import {CREATE_ACTIVITY} from "../../utils/mutations";

export default function PlanTemplate(props) {
    const [addDay] = useMutation(CREATE_DAY);
    const [addActivity] = useMutation(CREATE_DAY);
    const [getPlan, { data: planData }] = useLazyQuery(QUERY_PLAN_BY_ID);
    const [day, setDay] = useState(1);
    // console.log(props.planId.createPlan._id);
    // let planId = props.planId.createPlan._id;
    // console.log(planId);
    
    const handleAddDay = async(event) => {
        
        setDay(day + 1);
        
        console.log(props.planId.createPlan._id);

        try {
            await addDay({
              variables: { planId: props.planId.createPlan._id, input: {dayNumber: day} }
            });


          } catch (e) {
            console.error(e);
        }

        console.log(props.planId.createPlan._id);

    };

    const handleFetch = async(event) => {
        event.preventDefault();
        getPlan({ variables: { id: props.planId.createPlan._id } })
        console.log(planData);
    }

    const handleFormSubmit = async(event) => {
        try {
            await addActivity({
              variables: { input: { } }
            });

          } catch (e) {
            console.error(e);
        }
    };



    return (
        <div className="container">
            <button onClick={handleAddDay}>Add Day</button>
            <button onClick={handleFetch}>Check Day</button>
            <div>
            {planData ? planData.singlePlan.days.map((days) => {
                return (
                    <div className="text-left">
                        <h2>{days.dayNumber}</h2>
                        <p>9am</p>
                        <p>12am</p>
                        <p>3pm</p>
                        <p>6pm</p>
                    </div>
                )
            }) : ('No Data yet')
            }
            </div>

            <h1>{day}</h1>
        </div>
    )
};