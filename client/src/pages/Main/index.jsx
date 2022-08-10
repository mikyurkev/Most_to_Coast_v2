import React, { useEffect, useState } from "react";
import { useQuery, useLazyQuery } from '@apollo/client';
import { useNavigate } from "react-router-dom";
import { QUERY_ALL_PLANS, QUERY_PLAN_BY_USER } from "../../utils/queries";
import "./index.css";

export default function Main() {
    const navigate = useNavigate();
    const { loading, error, data: allUserData } = useQuery(QUERY_ALL_PLANS);
    const [getPlans, { data: userData }] = useLazyQuery(QUERY_PLAN_BY_USER);
    const [findUser, setFindUser] = useState();
    const [searchedState, setSearchedState] = useState(false);
    const allTravelPlansData = allUserData?.allTravelPlans || [];

    if (loading) {
        return <div>Loading...</div>;
    }

    let searchPlanResult;

    if (userData && !userData.searchPlansByUser) {
        searchPlanResult = <div>The user does not exist. Try again!</div>;
    } else if (userData && userData.searchPlansByUser.myPlans.length === 0) {
        searchPlanResult = <div>No data yet</div>
    } else if (userData) {
        searchPlanResult = userData.searchPlansByUser.myPlans.map((plans) => {
            return (
                <div key={plans._id} className="text-left">
                    <h2>{plans.planTitle}</h2>
                    <p>{plans.descriptionText}</p>
                    <p>{plans.destination}</p>
                </div>
            );
        })
    }

    if (error) return `Error! ${error}`;

    return (
        <section className='main'>
            <img src="img/cloud1.png" className="cloud1" alt="cloud1" />
            <img src="img/cloud2.png" className="cloud2" alt="cloud2" />

            <form className='search-form'>
                <div className='search-wrap'>
                    
                    <label className='search-input-text'>
                        Explore Plans
                    </label>
                    <br></br>
                    <input 
                        type='text' required
                        className='search-field'
                        onChange={(event) => {
                            setFindUser(event.target.value)
                        }} 
                        defaultValue={findUser}
                    />
                    <br></br>
                    <button 
                        type='button' 
                        className='search-button' 
                        onClick={() => {
                            setSearchedState(true)
                            getPlans({ variables: { username: findUser } })
                        }}
                    >search</button>
                </div>
            </form>
            <div className="container-fluid">
                {!searchedState ? 
                    <div className='text-center'>
                        {allTravelPlansData ? allTravelPlansData.map((planData) => {
                            return (
                                <div key={planData._id} className="text-left">
                                    <h2 
                                        onClick={() => navigate(`/view-planner/${planData._id}`)}
                                        className='plan-title'
                                    >
                                        {planData.planTitle}
                                    </h2>
                                    <p>{planData.descriptionText}</p>
                                    <p>destination: {planData.destination}</p>
                                </div>
                            )
                        }) : ('No Data yet')}
                    </div> :  
                    <div className='text-center'>
                        {searchPlanResult}
                    </div> 
                }   
                </div>
        </section>
    )
}