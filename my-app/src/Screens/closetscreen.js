import React, { useState } from "react";
import { useClothing } from "./clothingprovider";
import { Link } from "react-router-dom";
import "./closetscreen.css";

import preficon from "./Icons/preficon.png";
import questionicon from "./Icons/question.png";
import usericon from "./Icons/user.png";
import trashicon from "./Icons/trashicon.png";
import shirticon from "./Icons/shirticon.png";
import panticon from "./Icons/panticon.png";
import shoeicon from "./Icons/shoeicon.png";
import hearticon from "./Icons/whiteheart.png";
import closeticon from "./Icons/bluewardrobe.png";
import mixandmatchicon from "./Icons/mixandmatchicon.png";
import fitsicon from "./Icons/fitsicon.png";
import nextarrowicon from "./Icons/nextarrowicon.png";
import previousarrowicon from "./Icons/previousarrowicon.png";
import backarrowicon from "./Icons/backarrowicon.png";

function ClosetScreen() {
  const { likedItems, removeLikedItem, likeClothing } = useClothing();
  const [selectedType, setSelectedType] = useState("top");
  const [selectedItemId, setSelectedItemId] = useState(null); // for click-to-select
  const [trashStack, setTrashStack] = useState([]);

  const [showInfoPopup, setShowInfoPopup] = useState(false);
  

  const filteredItems = likedItems.filter((item) => item.category === selectedType);

  const handleItemClick = (itemId) => {
    setSelectedItemId((prev) => (prev === itemId ? null : itemId)); // toggle selection
  };

  const handleTrashClick = () => {
    if (selectedItemId) {
      removeLikedItem(selectedItemId);
      setTrashStack((prevStack) => [...prevStack, selectedItemId]);
      setSelectedItemId(null);
    }
  };

  const handleUndoClick = () => {
    if (trashStack.length === 0) return;
      
    const lastDeletedItem = trashStack[trashStack.length - 1];

    if (lastDeletedItem) {
      likeClothing(lastDeletedItem);
      setTrashStack((prev) => prev.slice(0, -1));
    }
  };

  return (
    <div className="container">
      {/* Header */}
      <div className="top-content row align-items-center">
        <div className="col-1">
          <Link to="/" state={{ from: 'closet' }}>
            <img className="d-block mx-auto" src={preficon} alt="Go to preferences screen" width="30"/>
          </Link>
        </div>
        <div className="col-1">
  <img
    className="d-block mx-auto"
    src={questionicon}
    alt="Info button"
    width="30"
    style={{ cursor: "pointer" }}
    onClick={() => setShowInfoPopup(true)}
  />
</div>
        <div className="col-8">
          <p className="pageheader">Closet</p>
        </div>
        <div className="col-2">
          <img className="d-block mx-auto" src={usericon} alt="Profile" width="40" />
        </div>
      </div>

      {/* prev and next screen arrows */}
      <div className="top-content row align-items-center next-arrows">
        <div className="col-1">
          <Link to="/" className="nav-link" state={{ from: 'closet' }}> 
            <img className="d-block mx-auto" src={previousarrowicon} alt="Go to previous screen" width="27" />
          </Link>
        </div>
        <div className="col-1"></div>
        <div className="col-8"></div>
        <div className="col-2">
          <Link to="/swipe" className="nav-link"> 
            <img className="d-block mx-auto" src={nextarrowicon} alt="Go to next screen" width="30"/>
          </Link>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="topnav row">
        <div className={`col ${selectedType === "top" ? "selected" : ""}`} onClick={() => setSelectedType("top")}>
          <img className="d-block mx-auto" src={shirticon} alt="Shirts" width="30" />
        </div>
        <div className={`col ${selectedType === "bottom" ? "selected" : ""}`} onClick={() => setSelectedType("bottom")}>
          <img className="d-block mx-auto" src={panticon} alt="Pants" width="30" />
        </div>
        <div className={`col ${selectedType === "shoe" ? "selected" : ""}`} onClick={() => setSelectedType("shoe")}>
          <img className="d-block mx-auto" src={shoeicon} alt="Shoes" width="30" />
        </div>
      </div>

      {/* Undo Button */}
      <div className="row undo-swipe">
        <div className="col-2">
          <img src={backarrowicon}
            alt="Undo"
            width="40"
            style={{
              opacity: trashStack.length === 0 ? 0.3 : 1,
            }}
            onClick={handleUndoClick}
          />

        </div>
        
      </div>

      {/* Display Liked Clothes */}
      <div className="container liked-items">
        <div className="row g-3">
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <div
                key={item.id}
                className={`col-4 col-md-3 col-lg-2 d-flex justify-content-center`}
                onClick={() => handleItemClick(item.id)}
              >
                <div
                  className={`border rounded p-2 closet-item ${selectedItemId === item.id ? "selected-glow" : ""}`}
                  style={{ width: "100px", height: "140px", backgroundColor: "#fff" }}
                >
                  <img
                    src={item.img}
                    alt={item.name}
                    className="img-fluid rounded"
                    style={{ objectFit: "contain", height: "100%" }}
                  />
                </div>
              </div>
            ))
          ) : (
            <div className="swipe-container">
              <p className="text-center mt-3">No {selectedType}s in your closet yet.</p>
              <Link to="/swipe">
                <button className="goto-swipe">Add to your closet!</button>
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Trash Can */}
      <div className="text-end px-3 mt-3 fixed-bottom" onClick={handleTrashClick}>
        <img className="trashcan" src={trashicon} alt="Delete" width="60" />
      </div>

      {/* Bottom Navigation */}
      <div className={`row navbar fixed-bottom ${selectedType}-selected`}>
        
        <div className="col text-center">
          <Link to="/closet" className="nav-link-current">
            <img src={closeticon} alt="Closet" width="40" />
            <div>Closet</div>
          </Link>
        </div>

        <div className="col text-center">
          <Link to="/swipe" className="nav-link">
            <img src={hearticon} alt="Swipe" width="40" />
            <div>Swipe</div>
          </Link>
        </div>

        <div className="col text-center">
          <Link to="/mix-and-match" className="nav-link">
            <img src={mixandmatchicon} alt="Mix & Match" width="40" />
            <div>Mix & Match</div>
          </Link>
        </div>

        <div className="col text-center">
          <Link to="/lookbook" className="nav-link">
            <img src={fitsicon} alt="Lookbook" width="40" />
            <div>Lookbook</div>
          </Link>
        </div>

      </div>
      {showInfoPopup && (
  <div className="info-popup-overlay" onClick={() => setShowInfoPopup(false)}>
    <div className="info-popup" onClick={(e) => e.stopPropagation()}>
      <h5>How to use Closet</h5>
      <p>👕 Look at all clothes that you swiped right on </p>
      <p>👖 Delete clothes you have changed your mind on </p>
      <p>👟 make your outfit in Mix and Match</p>
      <button className="btn btn-primary mt-2" onClick={() => setShowInfoPopup(false)}>
        Got it!
      </button>
    </div>
  </div>
)}
    </div>
  );
}

export default ClosetScreen;
