import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { useParams } from 'react-router-dom';

import { CREATE_PLAN, EDIT_PLAN } from "../../utils/mutations";
import PlanTemplate from "../../components/PlanTemplate"
import "./Planner.css";
import { QUERY_PLAN_BY_ID } from '../../utils/queries';

export default function Planner() {
  const { planId: paramId } = useParams();

  const [destination, setDestination] = useState("");
  const [planTitle, setPlanTitle] = useState("");
  const [descriptionText, setDescriptionText] = useState("");
  const [planCreated, setPlanCreated] = useState(false);

  const [addPlan, { data, error }] = useMutation(CREATE_PLAN);
  const [editPlan, { data: edittedData }] = useMutation(EDIT_PLAN);
  const { data: planData } = useQuery(QUERY_PLAN_BY_ID, {
    variables: { id: paramId }
  });

  useEffect(() => {
    console.log(planTitle, destination, descriptionText);
  }, [planTitle, descriptionText, destination]);

  const queriedPlan = planData?.singlePlan || [];

  const handleTitleChange = (event) => {
    console.log(event.target.value)
    setPlanTitle(event.target.value);
  };

  const handleDestinationChange = (event) => {
    setDestination(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescriptionText(event.target.value);
  };

  const handleFormSubmit = async (event) => {
    console.log(`planTitle${planTitle}`, `destination${destination}`, `description ${descriptionText}`);
    event.preventDefault();

    try {
      if (!paramId) {
        await addPlan({
          variables: { input: { destination, planTitle, descriptionText } }
        });
      } else {
        let title, dest, description;
        if (planTitle === '') {
          title = queriedPlan.planTitle;
        } else {
          title = planTitle;
        }

        if (destination === '') {
          dest = queriedPlan.destination;
        } else {
          dest = destination;
        }

        if (descriptionText === '') {
          description = queriedPlan.descriptionText;
        } else  {
          description = descriptionText;
        }
        
        console.log(`planTitle${title}`, `destination${dest}`, `description ${description}`);
        await editPlan({
          variables: { id: paramId, input: { 
            planTitle: title, 
            destination: dest, 
            descriptionText: description 
          } }
        });
      }

      setPlanCreated(true);

      //clear form value
      setDestination('');
      setPlanTitle('');
      setDescriptionText('');
    } catch (e) {
      console.error(e);
    }
  };
  

  return (
    <div className="plannerContainer">
      <h1 className="title">
        {!paramId ? 'Create' : 'Edit'} A Plan!
      </h1>
      {(planCreated) ?
        <PlanTemplate 
          planId={paramId ? paramId : data.createPlan._id} 
          editMode={paramId ? true : false}
        />
      :
        <form 
          name="tripInfo" action="/" method="post" 
          onSubmit={handleFormSubmit}
        >
          <div align="center">
            <label className="subtitle" htmlFor="planTitle">
              Plan Title<span className="req"></span>
            </label>
            <input
              type="text"
              required
              autoComplete="off"
              className="col-4 input-field"
              id="planTitle"
              name="planTitle"
              onChange={handleTitleChange}
              defaultValue={queriedPlan? queriedPlan.planTitle : planTitle}
            />
          </div>
          <div align="center">
            <label className="subtitle" htmlFor="planDestination">
              Plan Destination<span className="req"></span>
            </label>
            <input
              type="text"
              required
              autoComplete="off"
              className="col-4 input-field"
              id="planDestination"
              name="planDestination"
              onChange={handleDestinationChange}
              defaultValue={queriedPlan? queriedPlan.destination : destination}
            />
          </div>
          <div align="center">
            <textarea
              type="text"
              required
              autoComplete="off"
              className="textarea"
              onChange={handleDescriptionChange}
              defaultValue={queriedPlan? queriedPlan.descriptionText : descriptionText}
              placeholder="Plan Description"
            ></textarea>
          </div>
          <div align="center">
            <button
              type="submit"
              id="submitBtn"
              htmlFor="tripInfo"
              className="col-4 btn"
            >
              Submit Trip
            </button>
          </div>
        </form>
      }
    </div>
  );
}
