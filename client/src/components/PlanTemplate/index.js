import React, { useState } from "react";
import { useQuery, useLazyQuery, useMutation } from "@apollo/client";
import {CREATE_DAY} from "../../utils/mutations";
import {QUERY_PLAN_BY_ID} from "../../utils/queries";
import {CREATE_ACTIVITY} from "../../utils/mutations";

export default function PlanTemplate(props) {
    const [addDay] = useMutation(CREATE_DAY);
    const [addActivity] = useMutation(CREATE_DAY);
    const [getPlan, { data: planData }] = useLazyQuery(QUERY_PLAN_BY_ID);
    const [day, setDay] = useState(0);

    const [dayInfo, setdayInfo] = useState({
        0: {        
        9: '',
        12: '',
        3: '',
        6: '',
        } 
    });

    //Add Day Portion
    const handleAddDay = async(event) => {
        
        dayInfo[day] = {
            9: '',
            12: '',
            3: '',
            6: ''
        }

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

    //Add Activity Portion

    const handleChange = (event, dayToUpdate, fieldToUpdate) => {
        event.preventDefault();
        setdayInfo(prevState => {
            console.log(event);
            console.log(prevState);
            console.log(dayToUpdate);
            console.log(fieldToUpdate);
                prevState[dayToUpdate][fieldToUpdate]=event.target.value;
                console.log(prevState);
                return prevState;
            // ...prevState,
            // [fieldToUpdate]: event.target.value
        });
        console.log(dayInfo);
    };

    //     try {
    //         await addActivity({
    //           variables: { input: { } }
    //         });

    //       } catch (e) {
    //         console.error(e);
    //     }
    // };



    return (
        <div className="container">
            <button onClick={handleAddDay}>Add Day</button>
            <button onClick={handleFetch}>Check Day</button>
            <div>
            {planData ? planData.singlePlan.days.map((days) => {
                return (
                    <div className="text-left">
                        <h2>Day {days.dayNumber + 1} </h2>
                        <form>
                            <label>9am: </label>
                            <input type="text" autoComplete="off" onChange={event => handleChange(event,days.dayNumber,9)} value={dayInfo[days.dayNumber][9]}></input>
                            <br></br>
                            <label>12am: </label>
                            <input type="text" autoComplete="off" onChange={event =>handleChange(event,days.dayNumber,12)} value={dayInfo[days.dayNumber][12]}></input>
                            <br></br>
                            <label>3pm: </label>
                            <input type="text" autoComplete="off" onChange={event =>handleChange(event,days.dayNumber,3)} value={dayInfo[days.dayNumber][3]}></input>
                            <br></br>
                            <label>6pm: </label>
                            <input type="text" autoComplete="off" onChange={event =>handleChange(event,days.dayNumber,6)} value={dayInfo[days.dayNumber][6]}></input>
                        </form>
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