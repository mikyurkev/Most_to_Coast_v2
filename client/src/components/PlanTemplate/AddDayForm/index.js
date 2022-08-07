import React, { useState } from "react";

export default function DayForm(props) {
    return (
        <form>
            <label>9am: </label>
            <input type="text" onChange={handleChange} value={dayInfo}></input>
            <br></br>
            <label>12am: </label>
            <input type="text" onChange={handleChange} value={dayInfo}></input>
            <br></br>
            <label>3pm: </label>
            <input type="text" onChange={handleChange} value={dayInfo}></input>
            <br></br>
            <label>6pm: </label>
            <input type="text" onChange={handleChange} value={dayInfo}></input>
        </form>
    )


}