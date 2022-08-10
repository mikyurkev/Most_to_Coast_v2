import React, { useState } from "react";
import { useQuery, useLazyQuery, useMutation } from "@apollo/client";
import { CREATE_DAY, CREATE_ACTIVITY } from "../../utils/mutations";
import { QUERY_PLAN_BY_ID } from "../../utils/queries";


export default function PlanTemplate({ planId, editMode }) {
    const [addDay] = useMutation(CREATE_DAY);
    const [addActivity] = useMutation(CREATE_ACTIVITY);
    const [getPlan, { data: planData }] = useLazyQuery(QUERY_PLAN_BY_ID);
    const [day, setDay] = useState(0);

    const [dayInfo, setDayInfo] = useState({
        0: {        
            9: '',
            12: '',
            15: '',
            18: '',
        } 
    });

    //Add Day Portion
    const handleAddDay = async(event) => {
        
        dayInfo[day] = {
            9: '',
            12: '',
            15: '',
            18: ''
        }

        setDay(day + 1);
        
        console.log(planId);

        try {
            await addDay({
              variables: { planId: planId, input: {dayNumber: day}}
            });


          } catch (e) {
            console.error(e);
        }

        console.log(planId);

    };

    const handleFetch = async(event) => {
        event.preventDefault();
        getPlan({ variables: { id: planId } })
    }

    //Add Activity Portion

    const handleChange = (event, dayToUpdate, fieldToUpdate) => {
        event.preventDefault();
        setDayInfo(prevState => {
            console.log(prevState);
            console.log(dayToUpdate);
            console.log(fieldToUpdate);
            console.log(event.target.value);
                prevState[dayToUpdate][fieldToUpdate]=event.target.value;
                
                return prevState;
            // ...prevState,
            // [fieldToUpdate]: event.target.value
        });
        console.log(dayInfo);
    };

    const handleClick = async(dayToSubmit,fieldToSubmit) => {
 
        try {
            await addActivity({
              variables: {input: {name: dayInfo[dayToSubmit][fieldToSubmit], startTime: fieldToSubmit}, dayId: planData.singlePlan.days[dayToSubmit]._id, planId:planId}
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
                        <form>
                            <label>9:00 </label>
                            <input type="text" autoComplete="off" onBlur={event => handleChange(event,days.dayNumber,9)} defaultValue={dayInfo[days.dayNumber][9]}></input>
                            <button type="button" onClick={()=>handleClick(days.dayNumber,9)}>OK</button>
                            <br></br>
                            <label>12:00: </label>
                            <input type="text" autoComplete="off" onBlur={event =>handleChange(event,days.dayNumber,12)} defaultValue={dayInfo[days.dayNumber][12]}></input>
                            <button type="button" onClick={()=>handleClick(days.dayNumber,12)}>OK</button>
                            <br></br>
                            <label>15:00 </label>
                            <input type="text" autoComplete="off" onBlur={event =>handleChange(event,days.dayNumber,15)} defaultValue={dayInfo[days.dayNumber][15]}></input>
                            <button type="button" onClick={()=>handleClick(days.dayNumber,15)}>OK</button>
                            <br></br>
                            <label>18:00 </label>
                            <input type="text" autoComplete="off" onBlur={event =>handleChange(event,days.dayNumber,18)} defaultValue={dayInfo[days.dayNumber][18]}></input>
                            <button type="button" onClick={()=>handleClick(days.dayNumber,18)}>OK</button>
                        </form>
                    </div>
                )
            }) : ('No Data yet')
            }
            </div>
            <h1>Number of days: {day}</h1>
            <button type="button" onClick={()=>document.location.reload()}>I'm done!</button>
        </div>
    )
};