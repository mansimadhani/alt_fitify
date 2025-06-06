import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { FunctionComponent } from 'react';

import MultiSelect from "./Components/MultiSelect.js"
import previousarrowicon from "./Icons/previousarrowicon.png";
import { useClothing } from "./clothingprovider";
import './filterscreen.css';


const FilterScreen = () => {
	const { preferences, setPreferences } = useClothing();	

	const [gender, setGender] = useState(preferences.gender || []);
	const [color, setColor] = useState(preferences.color || []);
	const [aesthetic, setAesthetic] = useState(preferences.aesthetic || []);

	const location = useLocation();
	const navigate = useNavigate();

	const from = location.state?.from || 'closet'; // default fallback

	const handleGoBack = () => {
		navigate(from === 'closet' ? '/closet' : '/swipe');
	};

	const handleSave = () => {
		// Save preferences to context
		setPreferences({
		  gender,
		  color,
		  aesthetic
		});
		handleGoBack();
	  };

	const handleReset = () => {
		setGender([]);
		setColor([]);
		setAesthetic([]);
		setPreferences({
			gender: [],
			color: [],
			aesthetic: []
		});
	};

  	return (
		<div className="container">
			<div className="row">
				<div className="col-1">
					<Link to="/swipe">
						<img className="back-arrow" src={previousarrowicon}/>
					</Link>
				</div>
			</div>

			<div className="row">
				<div className="header-text">Welcome!</div>
			</div>
			<div className="row">
				<div className="desc-text">Tell Us Your Style</div>
			</div>

			{/* Dropdown Area */}
			<div className="row">
				<MultiSelect 
					label="Gender"
					options={["feminine", "masculine", "unisex"]}
					onChange={setGender}
					selected={gender}/>
					
			</div>
			<div className="row">
				<MultiSelect
				label="Color"
				options={['black','white','brown','blue','green','grey','beige',,'red','orange','yellow','pink','purple','multi']}
				onChange={setColor}
				selected={color}/>
				
			</div>
			<div className="row">
				<MultiSelect
					label="Style"
					options={['casual/comfy', 'streetwear', 'business/professional', 'formal/elegant', 'going-out/cute']}
					onChange={setAesthetic}
					selected={aesthetic}/>
			</div>
			
			<div className="col">
				<button className="save-button" onClick={handleSave}>Save</button>
			</div>
			<button className="reset-button" onClick={handleReset}>Reset</button>
			
		</div>);
};

export default FilterScreen;
