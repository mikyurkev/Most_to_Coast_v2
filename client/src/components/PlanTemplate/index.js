import React, { useState } from "react";
import { useQuery, useLazyQuery, useMutation } from "@apollo/client";
import {CREATE_DAY} from "../../utils/mutations";
import {QUERY_PLAN_BY_ID} from "../../utils/queries";
import {CREATE_ACTIVITY} from "../../utils/mutations";
import {DayForm} from "./AddDayForm";

export default function PlanTemplate(props) {
    const [addDay] = useMutation(CREATE_DAY);
    const [addActivity] = useMutation(CREATE_DAY);
    const [getPlan, { data: planData }] = useLazyQuery(QUERY_PLAN_BY_ID);
    const [day, setDay] = useState(0);

    //Add Day Portion
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

    if(planData){
        console.log(planData.singlePlan.days.length);
        for (var i = 0; i< planData.singlePlan.days.length; i++) {
            
        }
    }



    //Add Activity Portion
    const [dayInfo, setDayInfo] = useState({
        9: '',
        12: '',
        3: '',
        6: '',
    });

    const handleChange = (event, fieldToUpdate) => {
        setDayInfo(prevState => {
            ...prevState,
            [fieldToUpdate]: event.target.value,
        });
    };

    const handleFormSubmit = async(event) => {
        try {
            await addActivity({
              variables: { input: {} }
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
                        <h2>Day {days.dayNumber + 1} </h2>
                        <DayForm />
                    </div>
                )
            }) : ('No Data yet')
            }
            </div>
            <button>Rock and Roll!</button>
            <h1>Number of days: {day}</h1>
            
        </div>
    )
};