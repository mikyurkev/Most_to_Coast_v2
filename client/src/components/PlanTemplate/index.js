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
    //text from 9am

    // const [dayInfo1, setdayInfo1] = useState();
    // const handleChange1 = (event) => {
    //     setdayInfo1(event.target.value);
    // };
    // //text from 1pm
    // const [dayInfo2, setdayInfo2] = useState();
    // const handleChange2 = (event) => {
    //     setdayInfo2(event.target.value);
    // };
    // //text from 3pm
    // const [dayInfo3, setdayInfo3] = useState();
    // const handleChange3 = (event) => {
    //     setdayInfo3(event.target.value);
    // };
    // //text from 5pm
    // const [dayInfo4, setdayInfo4] = useState();
    // const handleChange4 = (event) => {
    //     setdayInfo4(event.target.value);
    // };

    const [dayInfo, setdayInfo] = useState({
        1: {
            9: '',
            12: '',
            3: '',
            6: '',
        }
    });
    
    const handleChange = (event, fieldToUpdate) => {
        setdayInfo(prevState => {
            prevState[fieldToUpdate] = event.target.value;
            return prevState;
            // ...prevState,
            // [fieldToUpdate]: event.target.value
        });
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
                            <input type="text" onChange={handleChange} value={dayInfo[days.dayNumber][9]}></input>
                            <br></br>
                            <label>12am: </label>
                            <input type="text" onChange={handleChange} value={dayInfo[days.dayNumber][12]}></input>
                            <br></br>
                            <label>3pm: </label>
                            <input type="text" onChange={handleChange} value={dayInfo[days.dayNumber][3]}></input>
                            <br></br>
                            <label>6pm: </label>
                            <input type="text" onChange={handleChange} value={dayInfo[days.dayNumber][9]}></input>
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