import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import {CREATE_DAY} from "../../utils/mutations";
import {CREATE_ACTIVITY} from "../../utils/mutations";

export default function PlanTemplate(props) {
    const [addDay] = useMutation(CREATE_DAY);
    const [addActivity] = useMutation(CREATE_DAY);

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
    };

    const handleFormSubmit = async(event) => {
        try {
            await addActivity({
              variables: { input: {  } }
            });

          } catch (e) {
            console.error(e);
        }
    };



    return (
        <div className="container">
            <button onClick={handleAddDay}>Add Day</button>
            <h1>Day 1</h1>
            <p>9am</p>
            <p>12am</p>
            <p>3pm</p>
            <p>6pm</p>

            <h1>{day}</h1>
        </div>
    )
};